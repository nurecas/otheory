#!/usr/bin/env node
// build/generate.mjs — the deterministic O Theory site generator (the ONLY writer to docs/).
//
// Contract: docs/ is a PURE FUNCTION of research/. No agents, no network, no Date.now()/Math.random().
// Reads research/ (claims + claims-index + synthesis + bridges) and emits:
//   docs/index.html · docs/data/graph.json · docs/data/art.json · docs/assets/*  (copied from build/assets)
// Preserves docs/videos/. Relative paths only (publishes under /otheory/).
//
// Page model (v2): a chaptered reading experience —
//   01 Synthesis (landing: overview essay + the Portrait, honest/unified toggle)
//   02 Map (connection graph: derivations + relations + bridges)
//   03 Evidence (rigorous core by domain + landscape)
//   04 Interpretations (bridges by register, chord, layers, interpretive claims)
//   05 Open Questions (open problems + predictions)
//   06 Method (how it works, evidence key, video, colophon)
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
// Shared vocabulary (kept in sync with CLAUDE.md; emitted into art.json so the
// client uses identical colors/labels — single source of truth).
// Two palettes: light (default page theme) and dark (toggle + canvas art).
// ---------------------------------------------------------------------------
const TIERS = {
  E1: { label: 'Established', color: '#1b7f4d', dark: '#66e39a', blurb: 'Experimentally confirmed or mathematically proven; mainstream consensus.' },
  E2: { label: 'Mainstream-speculative', color: '#2b64b5', dark: '#7ec8ff', blurb: 'Taken seriously and mathematically developed, but not experimentally confirmed.' },
  E3: { label: 'Heterodox / minority', color: '#a86a10', dark: '#ffce6a', blurb: 'Published by credentialed researchers, but a contested minority view.' },
  E4: { label: 'Philosophical', color: '#7148b8', dark: '#c6a5ff', blurb: 'Argued by reason; not empirically decidable even in principle.' },
  E5: { label: 'Symbolic / contemplative', color: '#b83d78', dark: '#ff9ed0', blurb: 'Meaningful as symbol, practice, or first-person report — not an empirical claim.' },
  E6: { label: 'Unsupported', color: '#bb3a3a', dark: '#ff6f6f', blurb: 'Presents as science but fails vetting; recorded transparently, never used as support.' },
};
const REGISTERS = {
  'shared-mathematics': { label: 'Shared mathematics', color: '#1b7f4d', dark: '#66e39a', style: 'solid', blurb: 'a real, stated shared mathematical structure' },
  analogy: { label: 'Analogy', color: '#a86a10', dark: '#ffce6a', style: 'dashed', blurb: 'structural resemblance, not identity' },
  metaphor: { label: 'Metaphor', color: '#b83d78', dark: '#ff9ed0', style: 'dotted', blurb: 'evocative, not structural' },
  speculation: { label: 'Speculation', color: '#2b64b5', dark: '#7ec8ff', style: 'wavy', blurb: 'proposed but unestablished' },
};
const DOMAINS = {
  physics: { color: '#3b63d8', dark: '#5b8cff' },
  'mathematics-geometry': { color: '#0f9d8a', dark: '#3fd6c0' },
  'quantum-foundations': { color: '#6c58e0', dark: '#8a7dff' },
  'consciousness-science': { color: '#d84f9f', dark: '#ff7ac2' },
  'philosophy-of-mind': { color: '#c47a18', dark: '#ffb354' },
  metaphysics: { color: '#8f5fd6', dark: '#c9a3ff' },
  'comparative-religion': { color: '#a8860b', dark: '#ffd76a' },
  mysticism: { color: '#d0662f', dark: '#ff9d6a' },
  esoteric: { color: '#6e7b8f', dark: '#aeb7c9' },
  'ai-consciousness': { color: '#25904e', dark: '#5fe08a' },
};
const domainColor = (d) => (DOMAINS[d] || { color: '#8a94a6' }).color;
const domainLabel = (d) => d.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const CHAPTERS = [
  { slug: 'synthesis', num: '01', title: 'The Synthesis' },
  { slug: 'map', num: '02', title: 'Method & Map' },
  { slug: 'evidence', num: '03', title: 'The Evidence' },
  { slug: 'interpretations', num: '04', title: 'The Interpretations' },
  { slug: 'questions', num: '05', title: 'Open Questions' },
];

// ---------------------------------------------------------------------------
// Front-matter parser (controlled subset: scalars, inline [flow] arrays,
// block sequences of maps, folded ">" scalars).
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
// Controlled Markdown -> HTML (headings, lists w/ continuations, tables,
// blockquote, hr, bold/italic/code/links).
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
      front.related_to = Array.isArray(front.related_to) ? front.related_to : [];
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
// Strip authoring scaffolding (leading H1, owner/seed notes, HTML comments).
function stripAuthoring(md) {
  const { body } = splitFrontMatter(md);
  const lines = (body || md).split('\n');
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;
  if (i < lines.length && /^#\s/.test(lines[i])) i++;
  while (i < lines.length) {
    const t = lines[i].trim();
    if (!t) { i++; continue; }
    if (/^_/.test(t) && /(owned by|placeholder|seed version|wide-sweep version|owner:)/i.test(t)) {
      // authoring note in italics — may wrap across lines; consume until the closing underscore
      while (i < lines.length && !/_$/.test(lines[i].trim())) i++;
      i++; continue;
    }
    if (/^<!--.*-->$/.test(t)) { i++; continue; }
    break;
  }
  return lines.slice(i).join('\n').replace(/^<!--[\s\S]*?-->\s*$/gm, '').trim();
}
const truncateBefore = (md, marker) => { const idx = md.indexOf(marker); return idx === -1 ? md : md.slice(0, idx).trim(); };
// Extract a leading H1 as the piece's display title.
function titleAndBody(md) {
  const { body } = splitFrontMatter(md);
  const m = (body || md).match(/^#\s+(.+)$/m);
  return { title: m ? m[1].trim() : '', body: stripAuthoring(md) };
}

// ---------------------------------------------------------------------------
// Graph + art data
// ---------------------------------------------------------------------------
const shortLabel = (title) => {
  let t = title.split(/\s+[—–-]\s+/)[0].split(/\s+\(/)[0];
  if (t.length > 42) t = t.slice(0, 40).trim() + '…';
  return t;
};
function pairs(arr) { const out = []; for (let a = 0; a < arr.length; a++) for (let b = a + 1; b < arr.length; b++) out.push([arr[a], arr[b]]); return out; }
const pairKey = (a, b) => (a < b ? a + '|' + b : b + '|' + a);

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
  const seen = new Set();
  for (const c of claims) for (const dep of c.depends_on) {
    if (ids.has(dep)) { edges.push({ source: c.id, target: dep, kind: 'derivation', register: null, tier: c.tier }); seen.add(pairKey(c.id, dep)); }
  }
  for (const b of bridges) {
    const linked = b.links.filter((l) => ids.has(l));
    for (const [s, t] of pairs(linked)) {
      if (seen.has(pairKey(s, t))) continue;
      seen.add(pairKey(s, t));
      edges.push({ source: s, target: t, kind: 'bridge', bridge: b.id, register: b.register, tier: b.tier_ceiling });
    }
  }
  for (const c of claims) for (const rel of c.related_to) {
    if (!ids.has(rel) || rel === c.id) continue;
    if (seen.has(pairKey(c.id, rel))) continue;
    seen.add(pairKey(c.id, rel));
    edges.push({ source: c.id, target: rel, kind: 'relation', register: null, tier: null });
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
  const sig = JSON.stringify({
    c: claims.map((c) => [c.id, c.tier, c.type, c.status, c.confidence, c.domain, c.depends_on, c.related_to, c.sources.map((s) => s.url)]).sort(),
    b: bridges.map((b) => [b.id, b.register, b.tier_ceiling, b.links]).sort(),
    p: readSynth('existence-prompt.md'),
  });
  const corpusHash = createHash('sha256').update(sig).digest('hex');
  const asOf = claims.map((c) => c.last_vetted).filter(Boolean).sort().pop() || '';
  const blockquote = (name) => { const { body } = splitFrontMatter(readSynth(name)); return (body.match(/^>.*$/gm) || []).map((l) => l.replace(/^>\s?/, '')).join('\n').trim(); };
  const promptText = blockquote('existence-prompt.md');
  const unifiedText = blockquote('unified-prompt.md');
  const relationPairs = graph.edges.filter((e) => e.kind === 'relation').map((e) => [e.source, e.target]);
  return {
    version: 'v-' + corpusHash.slice(0, 8),
    corpusHash,
    asOf,
    generated: { claims: claims.length, bridges: bridges.length, edges: graph.edges.length },
    tierCounts, domainCounts, registerCounts,
    palette: { tiers: TIERS, registers: REGISTERS, domains: DOMAINS },
    nodes: graph.nodes.map((n) => ({ id: n.id, tier: n.tier, domain: n.domain, type: n.type })),
    bridges: bridges.map((b) => ({ id: b.id, register: b.register, tier_ceiling: b.tier_ceiling, links: b.links })),
    relationPairs,
    prompt: promptText,
    unifiedPrompt: unifiedText,
  };
}

// Claims payload for the client-side detail drawer.
function buildClaimsJson(claims) {
  const out = {};
  for (const c of claims) {
    out[c.id] = {
      title: c.title, tier: c.tier, type: c.type, status: c.status, confidence: c.confidence,
      domains: c.domain, steelman: c.steelman || '', objection: c.strongest_objection || '',
      falsifiability: c.falsifiability || '', depends_on: c.depends_on, related_to: c.related_to,
      sources: c.sources.map((s) => ({ t: s.title, u: s.url, k: s.kind, v: String(s.verified) === 'true' })),
    };
  }
  return out;
}

// ---------------------------------------------------------------------------
// HTML builders
// ---------------------------------------------------------------------------
const tierBadge = (t) => `<span class="badge tier" data-tier="${t}" style="--tc:${TIERS[t]?.color || '#888'}">${t}</span>`;
const tierBadgeFull = (t) => `<span class="badge tier" data-tier="${t}" style="--tc:${TIERS[t]?.color || '#888'}">${t} · ${TIERS[t]?.label || ''}</span>`;
const statusBadge = (s) => s && s !== 'vetted' ? `<span class="badge status status-${s}">${s}</span>` : '';

function claimCard(c) {
  return `<button class="claim-card" data-claim="${c.id}" data-tier="${c.tier}" data-domain="${c.domain[0] || ''}">
    <span class="cc-top">${tierBadge(c.tier)}${statusBadge(c.status)}<span class="cc-type">${c.type}</span></span>
    <span class="cc-title">${esc(c.title)}</span>
    <span class="cc-steel">${esc((c.steelman || '').slice(0, 170))}${(c.steelman || '').length > 170 ? '…' : ''}</span>
    <span class="cc-more">Read the claim →</span>
  </button>`;
}

function evidenceKey(full) {
  const items = Object.entries(TIERS).map(([k, v]) =>
    `<li class="ek" style="--tc:${v.color}"><span class="ek-badge">${k}</span><span class="ek-body"><strong>${v.label}</strong><span>${esc(v.blurb)}</span></span></li>`).join('');
  const regs = Object.entries(REGISTERS).map(([k, v]) =>
    `<li class="rk" style="--rc:${v.color}"><span class="rk-swatch reg-${v.style}"></span><span><strong>${v.label}</strong> — ${esc(v.blurb)}</span></li>`).join('');
  return `<div class="evidence-key" aria-label="Evidence key">
    <ul class="ek-list">${items}</ul>
    ${full ? `<h4>Cross-domain connections are labeled by register</h4><ul class="rk-list">${regs}</ul>` : ''}
  </div>`;
}

// Evidence chapter: domain rail + per-domain claim panels (rigorous types only).
function evidenceChapter(claims) {
  const core = claims.filter((c) => ['fact', 'derived', 'empirical'].includes(c.type));
  const byDomain = {};
  for (const c of core) { const d = c.domain[0] || 'other'; (byDomain[d] = byDomain[d] || []).push(c); }
  const order = Object.keys(DOMAINS).filter((d) => byDomain[d]);
  const rail = order.map((d, i) =>
    `<button class="rail-item${i === 0 ? ' is-on' : ''}" data-panel="${d}" style="--dc:${domainColor(d)}">
      <span class="rail-dot"></span><span class="rail-name">${domainLabel(d)}</span><span class="rail-count">${byDomain[d].length}</span>
    </button>`).join('');
  const panels = order.map((d, i) =>
    `<div class="domain-panel${i === 0 ? ' is-on' : ''}" data-panel="${d}">
      <div class="claim-grid">${byDomain[d].map(claimCard).join('')}</div>
    </div>`).join('');
  return `<div class="evidence-layout">
    <nav class="domain-rail" aria-label="Domains">${rail}</nav>
    <div class="domain-panels">${panels}</div>
  </div>`;
}

// Interpretations: interpretive claims grouped by domain (collapsible).
function interpretiveGroups(claims) {
  const interp = claims.filter((c) => ['philosophical', 'symbolic'].includes(c.type));
  const byDomain = {};
  for (const c of interp) { const d = c.domain[0] || 'other'; (byDomain[d] = byDomain[d] || []).push(c); }
  const order = Object.keys(DOMAINS).filter((d) => byDomain[d]);
  return order.map((d, i) =>
    `<details class="interp-group"${i === 0 ? ' open' : ''} style="--dc:${domainColor(d)}">
      <summary><span class="rail-dot"></span>${domainLabel(d)}<span class="rail-count">${byDomain[d].length}</span></summary>
      <div class="claim-grid">${byDomain[d].map(claimCard).join('')}</div>
    </details>`).join('');
}

function graphLegend() {
  const doms = Object.keys(DOMAINS).map((d) => `<span class="lg-item"><span class="lg-dot" style="--c:${domainColor(d)}"></span>${domainLabel(d)}</span>`).join('');
  const tiers = Object.entries(TIERS).map(([t, v]) => `<span class="lg-item" title="${esc(v.label)}"><span class="lg-rim" style="--c:${v.color}"></span>${t}</span>`).join('');
  const edges = `<span class="lg-item"><span class="lg-line solid"></span>derivation</span>`
    + `<span class="lg-item"><span class="lg-line thin"></span>relation</span>`
    + `<span class="lg-item"><span class="lg-line dashed"></span>bridge</span>`;
  return `<div class="legend-group"><h4>Field</h4><div class="lg-items">${doms}</div></div>`
    + `<div class="legend-group"><h4>Certainty (rim)</h4><div class="lg-items">${tiers}</div></div>`
    + `<div class="legend-group"><h4>Link</h4><div class="lg-items">${edges}</div></div>`;
}
function registersKey() {
  return '<ul class="rk-list rk-key">' + Object.entries(REGISTERS).map(([k, v]) =>
    `<li class="rk" style="--rc:${v.color}"><span class="rk-swatch reg-${v.style}"></span><span><strong>${v.label}.</strong> ${esc(v.blurb)}.</span></li>`).join('') + '</ul>';
}
function bridgesByRegister(bridges, claimsById) {
  const order = ['shared-mathematics', 'analogy', 'metaphor', 'speculation'];
  return order.filter((r) => bridges.some((b) => b.register === r)).map((r) => {
    const reg = REGISTERS[r];
    const inReg = bridges.filter((b) => b.register === r);
    const entries = inReg.map((b) => {
      const links = b.links.map((l) => {
        const c = claimsById[l];
        return c ? `<button class="chip claim-chip" data-claim="${l}">${esc(shortLabel(c.title))} <span class="mini-tier" style="--tc:${TIERS[c.tier]?.color}">${c.tier}</span></button>` : '';
      }).join('');
      return `<article class="bridge-entry">
        <p class="be-ceiling">implies no more than <strong>${b.tier_ceiling}</strong></p>
        <h4 class="be-title">${esc(b.title)}</h4>
        <p class="be-narrative">${inline(b.narrative || '')}</p>
        <div class="be-links"><span class="be-links-label">Connects</span>${links}</div>
      </article>`;
    }).join('');
    return `<section class="register-block" style="--rc:${reg.color}">
      <header class="register-header">
        <span class="register-swatch reg-${reg.style}"></span>
        <div class="register-head-text"><h3 class="register-name">${reg.label}</h3><p class="register-blurb">${esc(reg.blurb)}</p></div>
        <span class="register-count">${inReg.length}</span>
      </header>
      <div class="bridge-entries">${entries}</div>
    </section>`;
  }).join('');
}

function layerStack(claims) {
  const layers = [
    { title: 'Established core', tiers: ['E1'], blurb: 'Proven or measured. Mathematics and confirmed physics.' },
    { title: 'Speculative extensions', tiers: ['E2', 'E3'], blurb: 'Serious but unconfirmed, or contested science.' },
    { title: 'Philosophical interpretation', tiers: ['E4'], blurb: 'Argued by reason; not empirically decidable.' },
    { title: 'Symbolic / contemplative', tiers: ['E5'], blurb: 'Symbol, practice, and first-person report, on their own terms.' },
    { title: 'Recorded, not supported', tiers: ['E6'], blurb: 'Failed vetting. Kept for transparency; never used as support.' },
  ];
  const byTier = {};
  for (const c of claims) (byTier[c.tier] = byTier[c.tier] || []).push(c);
  return layers.map((L, idx) => {
    const cs = L.tiers.flatMap((t) => byTier[t] || []);
    if (!cs.length) return '';
    const color = TIERS[L.tiers[0]].color;
    const chips = cs.map((c) => `<button class="chip claim-chip" data-claim="${c.id}" style="--dc:${domainColor(c.domain[0])}">${esc(shortLabel(c.title))}</button>`).join('');
    return `<details class="layer"${idx === 0 ? ' open' : ''} style="--lc:${color}">
      <summary><span class="layer-title">${L.title}</span><span class="layer-tiers">${L.tiers.join(' · ')}</span><span class="rail-count">${cs.length}</span></summary>
      <div class="layer-body"><p class="layer-blurb">${esc(L.blurb)}</p><div class="layer-chips">${chips}</div></div>
    </details>`;
  }).join('');
}

function landscape(claims) {
  const domains = Object.keys(DOMAINS).filter((d) => claims.some((c) => (c.domain[0] || '') === d));
  const tiers = Object.keys(TIERS);
  let max = 1;
  const cell = {};
  for (const c of claims) { const d = c.domain[0]; const k = d + '|' + c.tier; cell[k] = (cell[k] || 0) + 1; max = Math.max(max, cell[k]); }
  const head = '<tr><th class="corner"></th>' + tiers.map((t) => `<th style="--tc:${TIERS[t].color}"><span class="ls-th">${t}</span></th>`).join('') + '</tr>';
  const rows = domains.map((d) => {
    const tds = tiers.map((t) => {
      const n = cell[d + '|' + t] || 0;
      const a = n ? (0.14 + 0.86 * (n / max)) : 0;
      return `<td class="ls-cell" ${n ? `data-n="${n}" style="background:color-mix(in srgb, ${TIERS[t].color} ${Math.round(a * 60)}%, transparent)"` : ''}>${n || ''}</td>`;
    }).join('');
    return `<tr><th class="ls-dom"><span class="rail-dot" style="--dc:${domainColor(d)}"></span>${domainLabel(d)}</th>${tds}</tr>`;
  }).join('');
  return `<div class="table-wrap"><table class="landscape"><thead>${head}</thead><tbody>${rows}</tbody></table></div>`;
}

function chapterNav() {
  return CHAPTERS.map((c) =>
    `<a class="nav-chapter" href="#/${c.slug}" data-chapter-link="${c.slug}"><span class="nav-num">${c.num}</span><span class="nav-title">${c.title}</span></a>`).join('');
}
function nextLink(slug) {
  const i = CHAPTERS.findIndex((c) => c.slug === slug);
  const n = CHAPTERS[i + 1];
  if (!n) return `<a class="next-link" href="#/synthesis"><span class="next-label">Return to</span><span class="next-title">${CHAPTERS[0].title} ↺</span></a>`;
  return `<a class="next-link" href="#/${n.slug}"><span class="next-label">Next — ${n.num}</span><span class="next-title">${n.title} →</span></a>`;
}

// ---------------------------------------------------------------------------
// Assemble
// ---------------------------------------------------------------------------
function assemble({ claims, bridges, graph, art }) {
  const claimsById = Object.fromEntries(claims.map((c) => [c.id, c]));
  const template = readFileSync(R('build', 'templates', 'index.template.html'), 'utf8');
  // content-hash of the mutable assets → cache-busting query so browsers never serve a stale app.js/style.css
  const assetHash = createHash('sha256').update(readFileSync(R('build', 'assets', 'app.js'))).update(readFileSync(R('build', 'assets', 'style.css'))).digest('hex').slice(0, 10);

  const overviewRaw = readSynth('overview.md');
  const ov = overviewRaw ? titleAndBody(overviewRaw) : { title: 'The Synthesis', body: stripAuthoring(readSynth('abstract.md')) };
  // Split the essay: the THEORY (landing) vs "How the theory was assembled, and what it rests on" (Method & Map).
  const _ovSplit = ov.body.indexOf('## How the theory was assembled');
  const theoryBody = (_ovSplit === -1 ? ov.body : ov.body.slice(0, _ovSplit)).replace(/^##\s+The theory\s*$/m, '').trim();
  const assemblyBody = _ovSplit === -1 ? '' : ov.body.slice(_ovSplit).trim();
  // Split the abstract's "what O Theory is" narrative: lead (→ landing intro) + rest (→ method framing).
  const absClean = truncateBefore(stripAuthoring(readSynth('abstract.md')), '## How to read the evidence');
  const absBlocks = absClean.split(/\n\s*\n/).filter((b) => b.trim());
  const intro = renderMarkdown(absBlocks.slice(0, 2).join('\n\n'));
  const methodFraming = renderMarkdown(absBlocks.slice(2).join('\n\n'));
  const framework = renderMarkdown(stripAuthoring(readSynth('framework.md')));
  const openProblems = renderMarkdown(stripAuthoring(readSynth('open-problems.md')));
  const predictions = renderMarkdown(stripAuthoring(readSynth('predictions.md')));
  const promptHtml = art.prompt ? renderMarkdown(art.prompt) : '';
  const unifiedPromptHtml = art.unifiedPrompt ? renderMarkdown(art.unifiedPrompt) : '';

  const repl = {
    BUILD_VERSION: art.version,
    BUILD_HASH: art.corpusHash.slice(0, 12),
    BUILD_ASOF: art.asOf,
    N_CLAIMS: String(art.generated.claims),
    N_BRIDGES: String(art.generated.bridges),
    N_DOMAINS: String(Object.keys(art.domainCounts).length),
    N_EDGES: String(graph.edges.length),
    ASSET_V: assetHash,
    GRAPH_LEGEND: graphLegend(),
    CHAPTER_NAV: chapterNav(),
    OVERVIEW_TITLE: esc(ov.title || 'The Synthesis'),
    OVERVIEW: renderMarkdown(theoryBody),
    ASSEMBLY: renderMarkdown(assemblyBody),
    EVIDENCE_KEY_MINI: evidenceKey(false),
    EVIDENCE_KEY_FULL: evidenceKey(true),
    EVIDENCE_CHAPTER: evidenceChapter(claims),
    LANDSCAPE: landscape(claims),
    INTERP_GROUPS: interpretiveGroups(claims),
    BRIDGES_BY_REGISTER: bridgesByRegister(bridges, claimsById),
    REGISTERS_KEY: registersKey(),
    LAYER_STACK: layerStack(claims),
    FRAMEWORK: framework,
    OPEN_PROBLEMS: openProblems,
    PREDICTIONS: predictions,
    EXISTENCE_PROMPT: promptHtml,
    UNIFIED_PROMPT: unifiedPromptHtml,
    NEXT_SYNTHESIS: nextLink('synthesis'),
    NEXT_MAP: nextLink('map'),
    NEXT_EVIDENCE: nextLink('evidence'),
    NEXT_INTERPRETATIONS: nextLink('interpretations'),
    NEXT_QUESTIONS: nextLink('questions'),
    GRAPH_JSON: JSON.stringify(graph).replace(/</g, '\\u003c'),
    ART_JSON: JSON.stringify(art).replace(/</g, '\\u003c'),
    CLAIMS_JSON: JSON.stringify(buildClaimsJson(claims)).replace(/</g, '\\u003c'),
  };
  let html = template;
  for (const [k, v] of Object.entries(repl)) html = html.split(`{{${k}}}`).join(v);
  return html;
}

// ---------------------------------------------------------------------------
// FS helpers + main
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

  const kinds = countBy(graph.edges, 'kind');
  const iso = (() => { const d = {}; graph.nodes.forEach((n) => d[n.id] = 0); graph.edges.forEach((e) => { d[e.source]++; d[e.target]++; }); return Object.values(d).filter((x) => x === 0).length; })();
  const tierLine = Object.keys(TIERS).map((t) => `${t}:${art.tierCounts[t] || 0}`).join('  ');
  console.log('\n[o-theory build] deterministic generate.mjs (page model v2 — chaptered)');
  console.log(`  version    ${art.version}  (corpus ${art.corpusHash.slice(0, 12)}, as of ${art.asOf})`);
  console.log(`  claims     ${claims.length}   [ ${tierLine} ]`);
  console.log(`  bridges    ${bridges.length}   edges: derivation:${kinds.derivation || 0} bridge:${kinds.bridge || 0} relation:${kinds.relation || 0}`);
  console.log(`  graph      ${graph.nodes.length} nodes / ${graph.edges.length} edges — isolated: ${iso}`);
  if (CHECK) {
    if (drift.length) { console.log(`  CHECK: DRIFT in ${drift.join(', ')} — docs/ is NOT in sync with research/.`); process.exitCode = 1; }
    else console.log('  CHECK: docs/ is identical to a fresh build — deterministic ✓');
  } else {
    console.log(`  wrote      ${changed.length ? changed.join(', ') : '(no changes)'} + docs/assets/ (docs/videos/ preserved)`);
  }
}
main();
