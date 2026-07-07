#!/usr/bin/env node
// build/generate.mjs — the deterministic O Theory site generator (the ONLY writer to docs/).
//
// Contract: docs/ is a PURE FUNCTION of research/. No agents, no network, no Date.now()/Math.random().
// Reads research/ (claims + claims-index + synthesis + bridges) and emits:
//   docs/index.html · docs/data/graph.json · docs/data/art.json · docs/assets/*  (copied from build/assets)
// Preserves docs/videos/. Relative paths only (publishes under /otheory/).
//
// Usage:  node build/generate.mjs         (build)
//         node build/generate.mjs --check  (build in memory, diff vs committed docs/, report drift)

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, statSync, copyFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const R = (...p) => join(ROOT, ...p);
const CHECK = process.argv.includes('--check');

// ---------------------------------------------------------------------------
// Shared vocabulary (kept in sync with CLAUDE.md; also emitted into art.json so
// the client uses identical colors/labels — single source of truth).
// ---------------------------------------------------------------------------
const TIERS = {
  E1: { label: 'Established', color: '#66e39a', blurb: 'Experimentally confirmed or mathematically proven; mainstream consensus.' },
  E2: { label: 'Mainstream-speculative', color: '#7ec8ff', blurb: 'Taken seriously and mathematically developed, but not experimentally confirmed.' },
  E3: { label: 'Heterodox / minority', color: '#ffce6a', blurb: 'Published by credentialed researchers, but a contested minority view.' },
  E4: { label: 'Philosophical', color: '#c6a5ff', blurb: 'Argued by reason; not empirically decidable even in principle.' },
  E5: { label: 'Symbolic / contemplative', color: '#ff9ed0', blurb: 'Meaningful as symbol, practice, or first-person report — not an empirical claim.' },
  E6: { label: 'Unsupported', color: '#ff6f6f', blurb: 'Presents as science but fails vetting; recorded transparently, never used as support.' },
};
const REGISTERS = {
  'shared-mathematics': { label: 'Shared mathematics', color: '#66e39a', style: 'solid', blurb: 'a real, stated shared mathematical structure' },
  analogy: { label: 'Analogy', color: '#ffce6a', style: 'dashed', blurb: 'structural resemblance, not identity' },
  metaphor: { label: 'Metaphor', color: '#ff9ed0', style: 'dotted', blurb: 'evocative, not structural' },
  speculation: { label: 'Speculation', color: '#7ec8ff', style: 'wavy', blurb: 'proposed but unestablished' },
};
const DOMAINS = {
  physics: '#5b8cff',
  'mathematics-geometry': '#3fd6c0',
  'quantum-foundations': '#8a7dff',
  'consciousness-science': '#ff7ac2',
  'philosophy-of-mind': '#ffb354',
  metaphysics: '#c9a3ff',
  'comparative-religion': '#ffd76a',
  mysticism: '#ff9d6a',
  esoteric: '#aeb7c9',
  'ai-consciousness': '#5fe08a',
};
const domainColor = (d) => DOMAINS[d] || '#9aa4b2';
const domainLabel = (d) => d.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// ---------------------------------------------------------------------------
// Minimal, format-specific front-matter parser (handles our controlled subset:
// scalars, inline [flow] arrays, block sequences of maps, folded ">" scalars).
// ---------------------------------------------------------------------------
const stripQuotes = (s) => {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) return s.slice(1, -1);
  return s;
};
function splitFrontMatter(text) {
  if (text.startsWith('---')) {
    const end = text.indexOf('\n---', 3);
    if (end !== -1) {
      const fm = text.slice(text.indexOf('\n') + 1, end);
      const body = text.slice(end + 4).replace(/^\s*\n/, '');
      return { front: parseYaml(fm), body };
    }
  }
  return { front: {}, body: text };
}
function parseYaml(yaml) {
  const lines = yaml.split('\n');
  const obj = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const m = line.match(/^([A-Za-z0-9_]+):\s?(.*)$/);
    if (!m) { i++; continue; }
    const key = m[1];
    const rest = m[2];
    if (rest === '>' || rest === '|') {
      const block = [];
      i++;
      while (i < lines.length && (/^\s{2,}\S/.test(lines[i]) || lines[i].trim() === '')) {
        block.push(lines[i].replace(/^\s{2}/, ''));
        i++;
      }
      obj[key] = block.join(rest === '>' ? ' ' : '\n').replace(/\s+/g, rest === '>' ? ' ' : '\n').trim();
      continue;
    }
    if (rest === '') {
      if (i + 1 < lines.length && /^\s*-\s/.test(lines[i + 1])) {
        const arr = [];
        i++;
        let cur = null;
        while (i < lines.length && (/^\s*-\s/.test(lines[i]) || /^\s{3,}\S/.test(lines[i]))) {
          const item = lines[i].match(/^\s*-\s+(.*)$/);
          if (item) {
            if (cur) arr.push(cur);
            cur = {};
            const kv = item[1].match(/^([A-Za-z0-9_]+):\s?(.*)$/);
            if (kv) cur[kv[1]] = stripQuotes(kv[2]);
          } else {
            const kv = lines[i].match(/^\s+([A-Za-z0-9_]+):\s?(.*)$/);
            if (kv && cur) cur[kv[1]] = stripQuotes(kv[2]);
          }
          i++;
        }
        if (cur) arr.push(cur);
        obj[key] = arr;
        continue;
      }
      obj[key] = '';
      i++;
      continue;
    }
    if (rest.startsWith('[') && rest.endsWith(']')) {
      const inner = rest.slice(1, -1).trim();
      obj[key] = inner ? inner.split(',').map((s) => stripQuotes(s.trim())) : [];
      i++;
      continue;
    }
    obj[key] = stripQuotes(rest);
    i++;
  }
  return obj;
}

// ---------------------------------------------------------------------------
// Tiny, controlled Markdown -> HTML (headings, lists, tables, blockquote, hr,
// bold/italic/code/links). Sufficient for our synthesis prose.
// ---------------------------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(s) {
  s = esc(s);
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}" rel="noopener">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  s = s.replace(/(^|[^_])_([^_\n]+)_/g, '$1<em>$2</em>');
  return s;
}
function renderMarkdown(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  const flushPara = (buf) => { if (buf.length) { out.push(`<p>${inline(buf.join(' '))}</p>`); buf.length = 0; } };
  const para = [];
  while (i < lines.length) {
    let line = lines[i];
    if (!line.trim()) { flushPara(para); i++; continue; }
    if (/^#{1,6}\s/.test(line)) {
      flushPara(para);
      const lvl = line.match(/^#+/)[0].length;
      out.push(`<h${lvl}>${inline(line.replace(/^#+\s/, ''))}</h${lvl}>`);
      i++; continue;
    }
    if (/^(---|===)\s*$/.test(line)) { flushPara(para); out.push('<hr>'); i++; continue; }
    if (/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[-:\s|]+\|\s*$/.test(lines[i + 1])) {
      flushPara(para);
      const rows = [];
      while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) { rows.push(lines[i]); i++; }
      const cells = (r) => r.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
      const head = cells(rows[0]);
      const body = rows.slice(2);
      let t = '<div class="table-wrap"><table><thead><tr>' + head.map((h) => `<th>${inline(h)}</th>`).join('') + '</tr></thead><tbody>';
      for (const r of body) t += '<tr>' + cells(r).map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
      t += '</tbody></table></div>';
      out.push(t); continue;
    }
    if (/^\s*>\s?/.test(line)) {
      flushPara(para);
      const buf = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
      out.push(`<blockquote>${renderMarkdown(buf.join('\n'))}</blockquote>`);
      continue;
    }
    if (/^\s*[-*]\s/.test(line)) {
      flushPara(para);
      const items = [];
      while (i < lines.length) {
        if (/^\s*[-*]\s/.test(lines[i])) { items.push(lines[i].replace(/^\s*[-*]\s/, '')); i++; }
        else if (lines[i].trim() && /^\s+\S/.test(lines[i])) { items[items.length - 1] += ' ' + lines[i].trim(); i++; }
        else break;
      }
      out.push('<ul>' + items.map((it) => `<li>${inline(it)}</li>`).join('') + '</ul>');
      continue;
    }
    if (/^\s*\d+\.\s/.test(line)) {
      flushPara(para);
      const items = [];
      while (i < lines.length) {
        if (/^\s*\d+\.\s/.test(lines[i])) { items.push(lines[i].replace(/^\s*\d+\.\s/, '')); i++; }
        else if (lines[i].trim() && /^\s+\S/.test(lines[i])) { items[items.length - 1] += ' ' + lines[i].trim(); i++; }
        else break;
      }
      out.push('<ol>' + items.map((it) => `<li>${inline(it)}</li>`).join('') + '</ol>');
      continue;
    }
    para.push(line.trim());
    i++;
  }
  flushPara(para);
  return out.join('\n');
}

// ---------------------------------------------------------------------------
// Load the knowledge base
// ---------------------------------------------------------------------------
function loadClaims() {
  const dir = R('research', 'claims');
  return readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .sort()
    .map((f) => {
      const { front } = splitFrontMatter(readFileSync(join(dir, f), 'utf8'));
      front.domain = Array.isArray(front.domain) ? front.domain : (front.domain ? [front.domain] : []);
      front.depends_on = Array.isArray(front.depends_on) ? front.depends_on : [];
      front.sources = Array.isArray(front.sources) ? front.sources : [];
      return front;
    })
    .filter((c) => c.id);
}
function loadBridges() {
  const dir = R('research', 'synthesis', 'bridges');
  return readdirSync(dir).filter((f) => f.endsWith('.md') && !f.startsWith('.'))
    .sort()
    .map((f) => {
      const { front } = splitFrontMatter(readFileSync(join(dir, f), 'utf8'));
      front.links = Array.isArray(front.links) ? front.links : [];
      return front;
    })
    .filter((b) => b.id);
}
const readSynth = (name) => {
  const p = R('research', 'synthesis', name);
  return existsSync(p) ? readFileSync(p, 'utf8') : '';
};
// Strip authoring scaffolding (a leading H1, owner/seed/placeholder notes, HTML comments)
// so internal working notes never leak onto the public page.
function stripAuthoring(md) {
  const { body } = splitFrontMatter(md);
  const lines = (body || md).split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;
  if (i < lines.length && /^#\s/.test(lines[i])) i++;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) { i++; continue; }
    if (/^_.*_$/.test(t) && /(owned by|placeholder|seed version|owner:)/i.test(t)) { i++; continue; }
    if (/^<!--.*-->$/.test(t)) { i++; continue; }
    break;
  }
  return lines.slice(i).join('\n').replace(/^<!--[\s\S]*?-->\s*$/gm, '').trim();
}
const truncateBefore = (md, marker) => { const idx = md.indexOf(marker); return idx === -1 ? md : md.slice(0, idx).trim(); };

// ---------------------------------------------------------------------------
// Build graph.json + art.json
// ---------------------------------------------------------------------------
const shortLabel = (title) => {
  let t = title.split(/\s+[—–-]\s+/)[0].split(/\s+\(/)[0];
  if (t.length > 42) t = t.slice(0, 40).trim() + '…';
  return t;
};
function pairs(arr) { const out = []; for (let a = 0; a < arr.length; a++) for (let b = a + 1; b < arr.length; b++) out.push([arr[a], arr[b]]); return out; }

function buildGraph(claims, bridges) {
  const ids = new Set(claims.map((c) => c.id));
  const nodes = claims.map((c) => ({
    id: c.id,
    label: shortLabel(c.title),
    title: c.title,
    domain: c.domain[0] || 'metaphysics',
    domains: c.domain,
    type: c.type,
    tier: c.tier,
    status: c.status,
    confidence: c.confidence,
  }));
  const edges = [];
  for (const c of claims) for (const dep of c.depends_on) {
    if (ids.has(dep)) edges.push({ source: c.id, target: dep, kind: 'derivation', register: null, tier: c.tier });
  }
  for (const b of bridges) {
    const linked = b.links.filter((l) => ids.has(l));
    for (const [s, t] of pairs(linked)) {
      edges.push({ source: s, target: t, kind: 'bridge', bridge: b.id, register: b.register, tier: b.tier_ceiling });
    }
  }
  return { nodes, edges };
}

function countBy(arr, key) {
  const m = {};
  for (const x of arr) { const k = typeof key === 'function' ? key(x) : x[key]; m[k] = (m[k] || 0) + 1; }
  return m;
}

function buildArt(claims, bridges, graph) {
  const tierCounts = countBy(claims, 'tier');
  const domainCounts = countBy(claims, (c) => c.domain[0] || 'metaphysics');
  const registerCounts = countBy(bridges, 'register');
  // deterministic signature of the corpus
  const sig = JSON.stringify({
    c: claims.map((c) => [c.id, c.tier, c.type, c.status, c.confidence, c.domain, c.depends_on, c.sources.map((s) => s.url)]).sort(),
    b: bridges.map((b) => [b.id, b.register, b.tier_ceiling, b.links]).sort(),
    p: readSynth('existence-prompt.md'),
  });
  const corpusHash = createHash('sha256').update(sig).digest('hex');
  const asOf = claims.map((c) => c.last_vetted).filter(Boolean).sort().pop() || '';
  // extract the prompt blockquote text from existence-prompt.md
  const { body: epBody } = splitFrontMatter(readSynth('existence-prompt.md'));
  const promptText = (epBody.match(/^>.*$/gm) || []).map((l) => l.replace(/^>\s?/, '')).join('\n').trim();
  return {
    version: 'v-' + corpusHash.slice(0, 8),
    corpusHash,
    asOf,
    generated: { claims: claims.length, bridges: bridges.length, edges: graph.edges.length },
    tierCounts, domainCounts, registerCounts,
    palette: { tiers: TIERS, registers: REGISTERS, domains: DOMAINS },
    nodes: graph.nodes.map((n) => ({ id: n.id, tier: n.tier, domain: n.domain, type: n.type })),
    bridges: bridges.map((b) => ({ id: b.id, register: b.register, tier_ceiling: b.tier_ceiling, links: b.links })),
    prompt: promptText,
  };
}

// ---------------------------------------------------------------------------
// HTML section builders
// ---------------------------------------------------------------------------
const tierBadge = (t) => `<span class="badge tier" data-tier="${t}" style="--tc:${TIERS[t]?.color || '#888'}">${t} · ${TIERS[t]?.label || ''}</span>`;
const typeBadge = (t) => `<span class="badge type">${t}</span>`;
const statusBadge = (s) => s && s !== 'vetted' ? `<span class="badge status status-${s}">${s}</span>` : '';

function claimCard(c) {
  const domTags = c.domain.map((d) => `<span class="dom-tag" style="--dc:${domainColor(d)}">${domainLabel(d)}</span>`).join('');
  const srcs = c.sources.map((s) => {
    const kind = s.kind ? ` <span class="src-kind">${esc(s.kind)}</span>` : '';
    const ok = String(s.verified) === 'true' ? '<span class="src-ok" title="source verified">✓</span>' : '';
    return `<li><a href="${esc(s.url)}" rel="noopener">${esc(s.title)}</a>${kind} ${ok}</li>`;
  }).join('');
  const fal = c.falsifiability ? `<div class="cc-row"><span class="cc-k">Falsifiability</span><span class="cc-v">${inline(c.falsifiability)}</span></div>` : '';
  return `<article class="claim" id="claim-${c.id}" data-tier="${c.tier}" data-domain="${c.domain[0] || ''}" data-type="${c.type}" tabindex="0">
    <header class="claim-h">
      <h4>${esc(c.title)}</h4>
      <div class="badges">${tierBadge(c.tier)} ${typeBadge(c.type)} ${statusBadge(c.status)}</div>
    </header>
    <div class="dom-tags">${domTags}</div>
    <div class="cc-row"><span class="cc-k">Steelman</span><span class="cc-v">${inline(c.steelman || '')}</span></div>
    <div class="cc-row"><span class="cc-k">Strongest objection</span><span class="cc-v">${inline(c.strongest_objection || '')}</span></div>
    ${fal}
    <details class="sources"><summary>Sources &amp; provenance (${c.sources.length})</summary><ul>${srcs}</ul></details>
  </article>`;
}

function evidenceKey() {
  const items = Object.entries(TIERS).map(([k, v]) =>
    `<li class="ek" style="--tc:${v.color}"><span class="ek-badge">${k}</span><span class="ek-body"><strong>${v.label}</strong><span>${esc(v.blurb)}</span></span></li>`).join('');
  const regs = Object.entries(REGISTERS).map(([k, v]) =>
    `<li class="rk" style="--rc:${v.color}"><span class="rk-swatch reg-${v.style}"></span><span><strong>${v.label}</strong> — ${esc(v.blurb)}</span></li>`).join('');
  return `<div class="evidence-key" aria-label="Evidence key">
    <h3>The Evidence Key</h3>
    <p class="ek-note">Every claim carries a tier. A claim's tier is never restated as higher than it is.</p>
    <ul class="ek-list">${items}</ul>
    <h4>Cross-domain connections are labeled by register</h4>
    <ul class="rk-list">${regs}</ul>
  </div>`;
}

function zoneA(claims) {
  const core = claims.filter((c) => ['fact', 'derived', 'empirical'].includes(c.type));
  const byDomain = {};
  for (const c of core) { const d = c.domain[0] || 'other'; (byDomain[d] = byDomain[d] || []).push(c); }
  const order = Object.keys(DOMAINS).filter((d) => byDomain[d]);
  return order.map((d) =>
    `<section class="domain-group" data-domain="${d}">
      <h3 class="domain-h"><span class="dom-dot" style="--dc:${domainColor(d)}"></span>${domainLabel(d)}</h3>
      <div class="claim-grid">${byDomain[d].map(claimCard).join('')}</div>
    </section>`).join('');
}

function zoneBInterpretiveClaims(claims) {
  const interp = claims.filter((c) => ['philosophical', 'symbolic'].includes(c.type));
  if (!interp.length) return '';
  return `<div class="interp-claims"><h3>Interpretive claims — argued or symbolic, on their own terms</h3>
    <div class="claim-grid">${interp.map(claimCard).join('')}</div></div>`;
}

function bridgeCards(bridges, claimsById) {
  return bridges.map((b) => {
    const reg = REGISTERS[b.register] || { label: b.register, color: '#888', style: 'solid' };
    const links = b.links.map((l) => {
      const c = claimsById[l];
      return c ? `<a href="#claim-${l}" class="bridge-link">${esc(shortLabel(c.title))} <span class="mini-tier" style="--tc:${TIERS[c.tier]?.color}">${c.tier}</span></a>` : `<span class="bridge-link">${esc(l)}</span>`;
    }).join('');
    return `<article class="bridge" style="--rc:${reg.color}">
      <header><h4>${esc(b.title)}</h4>
        <span class="reg-badge reg-${reg.style}">${reg.label}</span>
        <span class="ceiling">ceiling ${b.tier_ceiling}</span>
      </header>
      <p>${inline(b.narrative || '')}</p>
      <div class="bridge-links">${links}</div>
    </article>`;
  }).join('');
}

function layerStack(claims) {
  const layers = [
    { key: 'L1', title: 'Established core', tiers: ['E1'], blurb: 'Proven or measured. Mathematics and confirmed physics.' },
    { key: 'L2', title: 'Speculative extensions', tiers: ['E2', 'E3'], blurb: 'Serious but unconfirmed, or contested science.' },
    { key: 'L3', title: 'Philosophical interpretation', tiers: ['E4'], blurb: 'Argued by reason; not empirically decidable.' },
    { key: 'L4', title: 'Symbolic / contemplative', tiers: ['E5'], blurb: 'Symbol, practice, and first-person report, on their own terms.' },
    { key: 'L6', title: 'Recorded, not supported', tiers: ['E6'], blurb: 'Failed vetting. Kept for transparency; never used as support.' },
  ];
  const byTier = {};
  for (const c of claims) (byTier[c.tier] = byTier[c.tier] || []).push(c);
  return layers.map((L) => {
    const cs = L.tiers.flatMap((t) => byTier[t] || []);
    if (!cs.length) return '';
    const color = TIERS[L.tiers[0]].color;
    const chips = cs.map((c) => `<a href="#claim-${c.id}" class="layer-chip" style="--dc:${domainColor(c.domain[0])}" data-tier="${c.tier}">${esc(shortLabel(c.title))}</a>`).join('');
    return `<div class="layer" data-tiers="${L.tiers.join(',')}" style="--lc:${color}">
      <button class="layer-head" aria-expanded="true"><span class="layer-title">${L.title}</span><span class="layer-tiers">${L.tiers.join(' · ')}</span><span class="layer-count">${cs.length}</span></button>
      <div class="layer-body"><p class="layer-blurb">${esc(L.blurb)}</p><div class="layer-chips">${chips}</div></div>
    </div>`;
  }).join('');
}

function landscape(claims) {
  // domain × tier matrix — honesty as a picture
  const domains = Object.keys(DOMAINS).filter((d) => claims.some((c) => (c.domain[0] || '') === d));
  const tiers = Object.keys(TIERS);
  let max = 1;
  const cell = {};
  for (const c of claims) { const d = c.domain[0]; const k = d + '|' + c.tier; cell[k] = (cell[k] || 0) + 1; max = Math.max(max, cell[k]); }
  const head = '<tr><th class="corner"></th>' + tiers.map((t) => `<th style="--tc:${TIERS[t].color}"><span class="ls-th">${t}</span></th>`).join('') + '</tr>';
  const rows = domains.map((d) => {
    const tds = tiers.map((t) => {
      const n = cell[d + '|' + t] || 0;
      const a = n ? (0.18 + 0.82 * (n / max)).toFixed(3) : 0;
      return `<td class="ls-cell" ${n ? `data-n="${n}" style="background:color-mix(in srgb, ${TIERS[t].color} ${Math.round(a * 100)}%, transparent)"` : ''}>${n || ''}</td>`;
    }).join('');
    return `<tr><th class="ls-dom"><span class="dom-dot" style="--dc:${domainColor(d)}"></span>${domainLabel(d)}</th>${tds}</tr>`;
  }).join('');
  return `<div class="table-wrap"><table class="landscape"><thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
}

// ---------------------------------------------------------------------------
// Assemble the page
// ---------------------------------------------------------------------------
function assemble({ claims, bridges, graph, art }) {
  const claimsById = Object.fromEntries(claims.map((c) => [c.id, c]));
  const template = readFileSync(R('build', 'templates', 'index.template.html'), 'utf8');
  const abstract = renderMarkdown(truncateBefore(stripAuthoring(readSynth('abstract.md')), '## How to read the evidence'));
  const framework = renderMarkdown(stripAuthoring(readSynth('framework.md')));
  const openProblems = renderMarkdown(stripAuthoring(readSynth('open-problems.md')));
  const predictions = renderMarkdown(stripAuthoring(readSynth('predictions.md')));
  const promptHtml = art.prompt ? renderMarkdown(art.prompt) : '';

  const repl = {
    BUILD_VERSION: art.version,
    BUILD_HASH: art.corpusHash.slice(0, 12),
    BUILD_ASOF: art.asOf,
    N_CLAIMS: String(art.generated.claims),
    N_BRIDGES: String(art.generated.bridges),
    ABSTRACT: abstract,
    EVIDENCE_KEY: evidenceKey(),
    ZONE_A: zoneA(claims),
    ZONE_B_CLAIMS: zoneBInterpretiveClaims(claims),
    BRIDGES: bridgeCards(bridges, claimsById),
    LAYER_STACK: layerStack(claims),
    LANDSCAPE: landscape(claims),
    FRAMEWORK: framework,
    OPEN_PROBLEMS: openProblems,
    PREDICTIONS: predictions,
    EXISTENCE_PROMPT: promptHtml,
    GRAPH_JSON: JSON.stringify(graph).replace(/</g, '\\u003c'),
    ART_JSON: JSON.stringify(art).replace(/</g, '\\u003c'),
  };
  let html = template;
  for (const [k, v] of Object.entries(repl)) html = html.split(`{{${k}}}`).join(v);
  return html;
}

// ---------------------------------------------------------------------------
// FS helpers
// ---------------------------------------------------------------------------
function copyDir(src, dst) {
  mkdirSync(dst, { recursive: true });
  for (const e of readdirSync(src)) {
    if (e === '.gitkeep' || e === '.DS_Store') continue;
    const s = join(src, e), d = join(dst, e);
    if (statSync(s).isDirectory()) copyDir(s, d); else copyFileSync(s, d);
  }
}
function writeIfChanged(path, content, drift) {
  const prev = existsSync(path) ? readFileSync(path, 'utf8') : null;
  if (prev === content) return false;
  if (CHECK) { drift.push(relative(ROOT, path)); return true; }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  return true;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const claims = loadClaims();
  const bridges = loadBridges();
  const graph = buildGraph(claims, bridges);
  const art = buildArt(claims, bridges, graph);
  const html = assemble({ claims, bridges, graph, art });

  const drift = [];
  const changed = [];
  if (writeIfChanged(R('docs', 'index.html'), html, drift)) changed.push('index.html');
  if (writeIfChanged(R('docs', 'data', 'graph.json'), JSON.stringify(graph, null, 2), drift)) changed.push('data/graph.json');
  if (writeIfChanged(R('docs', 'data', 'art.json'), JSON.stringify(art, null, 2), drift)) changed.push('data/art.json');
  if (!CHECK) copyDir(R('build', 'assets'), R('docs', 'assets'));

  const tierLine = Object.keys(TIERS).map((t) => `${t}:${art.tierCounts[t] || 0}`).join('  ');
  const regLine = Object.keys(REGISTERS).map((r) => `${r}:${art.registerCounts[r] || 0}`).join('  ');
  console.log('\n[o-theory build] deterministic generate.mjs');
  console.log(`  version    ${art.version}  (corpus ${art.corpusHash.slice(0, 12)}, as of ${art.asOf})`);
  console.log(`  claims     ${claims.length}   [ ${tierLine} ]`);
  console.log(`  bridges    ${bridges.length}   [ ${regLine} ]`);
  console.log(`  graph      ${graph.nodes.length} nodes / ${graph.edges.length} edges`);
  if (CHECK) {
    if (drift.length) { console.log(`  CHECK: DRIFT in ${drift.join(', ')} — docs/ is NOT in sync with research/.`); process.exitCode = 1; }
    else console.log('  CHECK: docs/ is identical to a fresh build — deterministic ✓');
  } else {
    console.log(`  wrote      ${changed.length ? changed.join(', ') : '(no changes)'} + docs/assets/ (docs/videos/ preserved)`);
  }
}
main();
