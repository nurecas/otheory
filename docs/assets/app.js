/* O Theory — client app v2. Chaptered router · claim drawer · graph · chord · geometry · two-mode Portrait.
   Reads inlined JSON (graph-data, art-data, claims-data). Vendored libs only (cytoscape, THREE). */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const readJSON = (id) => { try { return JSON.parse($('#' + id).textContent); } catch (e) { return null; } };
  const graph = readJSON('graph-data') || { nodes: [], edges: [] };
  const art = readJSON('art-data') || {};
  const CLAIMS = readJSON('claims-data') || {};
  const PAL = art.palette || { tiers: {}, registers: {}, domains: {} };
  const TIERS = PAL.tiers, REGS = PAL.registers, DOMS = PAL.domains;
  // canvas visualizations keep a deep-space background in both themes → always use dark variants there
  const domCanvas = (d) => (DOMS[d] || {}).dark || '#8a94a6';
  const tierCanvas = (t) => (TIERS[t] || {}).dark || '#888';
  const regCanvas = (r) => (REGS[r] || {}).dark || '#888';
  const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';
  const domPage = (d) => { const x = DOMS[d] || {}; return (isLight() ? x.color : x.dark) || '#8a94a6'; };
  const tierRank = (t) => Number(String(t).replace('E', '')) || 9;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ═══════════ theme ═══════════ */
  (function theme() {
    const saved = localStorage.getItem('otheory-theme-v2');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    $('#theme-toggle') && $('#theme-toggle').addEventListener('click', () => {
      const next = isLight() ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('otheory-theme-v2', next);
      window.dispatchEvent(new CustomEvent('otheory-theme-v2', { detail: next }));
    });
  })();

  /* ═══════════ router ═══════════ */
  const inits = {}; // chapter slug -> lazy init fn (run once)
  const onShow = {}; // chapter slug -> run every activation
  function currentSlug() {
    const m = location.hash.match(/^#\/([a-z-]+)/);
    return m && $(`.chapter[data-chapter="${m[1]}"]`) ? m[1] : 'synthesis';
  }
  function activate(slug) {
    $$('.chapter').forEach((ch) => {
      const on = ch.dataset.chapter === slug;
      ch.hidden = !on;
      ch.classList.toggle('is-active', on);
      if (on && !reduceMotion) { ch.classList.remove('is-entering'); void ch.offsetWidth; ch.classList.add('is-entering'); }
    });
    $$('.nav-chapter').forEach((a) => a.classList.toggle('is-active', a.dataset.chapterLink === slug));
    $('.site-nav') && $('.site-nav').classList.remove('is-open');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    requestAnimationFrame(() => {
      if (inits[slug]) { const fn = inits[slug]; delete inits[slug]; try { fn(); } catch (e) { console.error(slug, e); } }
      if (onShow[slug]) { try { onShow[slug](); } catch (e) { console.error(slug, e); } }
      observeReveals();
    });
  }
  window.addEventListener('hashchange', () => activate(currentSlug()));
  $('#nav-toggle') && $('#nav-toggle').addEventListener('click', () => {
    const nav = $('.site-nav'); const open = nav.classList.toggle('is-open');
    $('#nav-toggle').setAttribute('aria-expanded', String(open));
  });

  /* ═══════════ reveal on scroll ═══════════ */
  let revealObserver = null;
  function observeReveals() {
    if (reduceMotion) { $$('.reveal').forEach((el) => el.classList.add('is-in')); return; }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); revealObserver.unobserve(e.target); } });
      }, { threshold: 0.08 });
    }
    $$('.chapter:not([hidden]) .reveal:not(.is-in)').forEach((el) => revealObserver.observe(el));
  }
  // tag revealables
  function tagReveals() {
    $$('.claim-card, .bridge, .layer, .interp-group, .register-group, .key-fold, .landscape-block, .chord-block, .geo-block').forEach((el) => el.classList.add('reveal'));
  }

  /* ═══════════ claim drawer ═══════════ */
  const drawer = $('#claim-drawer'), backdrop = $('#drawer-backdrop');
  let lastFocus = null;
  function openClaim(id) {
    const c = CLAIMS[id];
    if (!c || !drawer) return;
    lastFocus = document.activeElement;
    const tier = TIERS[c.tier] || {};
    const badges = [
      `<span class="badge tier" style="--tc:${isLight() ? tier.color : tier.dark}">${c.tier} · ${tier.label || ''}</span>`,
      c.status && c.status !== 'vetted' ? `<span class="badge status status-${c.status}">${c.status}</span>` : '',
      `<span class="badge">${c.type}</span>`,
      c.confidence ? `<span class="badge">confidence: ${c.confidence}</span>` : '',
    ].join('');
    const doms = (c.domains || []).map((d) => `<span class="dom-tag" style="--dc:${domPage(d)}">${d.replace(/-/g, ' ')}</span>`).join('');
    const srcs = (c.sources || []).map((s) =>
      `<li><a href="${esc(s.u)}" rel="noopener" target="_blank">${esc(s.t)}</a> <span class="src-kind">${esc(s.k || '')}</span> ${s.v ? '<span class="src-ok" title="source verified">✓</span>' : ''}</li>`).join('');
    const relChips = [...new Set([...(c.depends_on || []), ...(c.related_to || [])])]
      .filter((r) => CLAIMS[r])
      .map((r) => `<button class="chip claim-chip" data-claim="${r}" style="--dc:${domPage((CLAIMS[r].domains || [])[0] || '')}">${esc(CLAIMS[r].title.split(/\s+[—–]\s+/)[0].slice(0, 46))} <span class="mini-tier" style="--tc:${isLight() ? (TIERS[CLAIMS[r].tier] || {}).color : (TIERS[CLAIMS[r].tier] || {}).dark}">${CLAIMS[r].tier}</span></button>`).join('');
    drawer.innerHTML = `
      <button class="cd-close" aria-label="Close">×</button>
      <div class="cd-badges">${badges}</div>
      <h3 class="cd-title">${esc(c.title)}</h3>
      <div class="cd-domains">${doms}</div>
      <span class="cd-k">Steelman — the strongest honest version</span>
      <p class="cd-v">${esc(c.steelman)}</p>
      <span class="cd-k">Strongest objection</span>
      <p class="cd-v">${esc(c.objection)}</p>
      ${c.falsifiability ? `<span class="cd-k">Falsifiability</span><p class="cd-v">${esc(c.falsifiability)}</p>` : ''}
      <span class="cd-k">Sources — full provenance</span>
      <ul class="cd-sources">${srcs}</ul>
      ${relChips ? `<span class="cd-k">Connected claims</span><div class="cd-related">${relChips}</div>` : ''}
      <a class="cd-maplink" href="#/map" data-maplink="${id}">See it in the map →</a>`;
    drawer.hidden = false; backdrop.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add('is-open'); backdrop.classList.add('is-open'); });
    drawer.querySelector('.cd-close').focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open'); backdrop.classList.remove('is-open');
    setTimeout(() => { drawer.hidden = true; backdrop.hidden = true; }, 320);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-claim]');
    if (chip) { openClaim(chip.dataset.claim); return; }
    const ml = e.target.closest('[data-maplink]');
    if (ml) { closeDrawer(); pendingMapFocus = ml.dataset.maplink; return; }
    if (e.target.closest('.cd-close') || e.target === backdrop) closeDrawer();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

  /* ═══════════ evidence rail ═══════════ */
  function initEvidenceRail() {
    $$('.rail-item').forEach((btn) => btn.addEventListener('click', () => {
      $$('.rail-item').forEach((b) => b.classList.toggle('is-on', b === btn));
      $$('.domain-panel').forEach((p) => p.classList.toggle('is-on', p.dataset.panel === btn.dataset.panel));
      observeReveals();
    }));
  }

  /* ═══════════ graph (lazy: map chapter) ═══════════ */
  let cy = null, pendingMapFocus = null;
  function graphStyle() {
    return [
      { selector: 'node', style: {
        'background-color': 'data(dcolor)',
        'background-fill': 'radial-gradient',
        'background-gradient-stop-colors': 'data(grad)',
        'background-gradient-stop-positions': '0 52 100',
        'border-color': 'data(tcolor)', 'border-width': 1.3, 'border-opacity': 0.85,
        'width': 'mapData(deg, 0, 10, 7, 26)', 'height': 'mapData(deg, 0, 10, 7, 26)',
        'label': 'data(label)', 'color': '#dfe4f0', 'font-size': 8, 'font-family': 'system-ui, sans-serif', 'font-weight': 500,
        'text-valign': 'bottom', 'text-margin-y': 2, 'text-wrap': 'wrap', 'text-max-width': 78,
        'text-outline-color': '#080a10', 'text-outline-width': 2.5, 'text-opacity': 0, 'min-zoomed-font-size': 6,
        'transition-property': 'text-opacity, border-width', 'transition-duration': '0.15s' } },
      { selector: 'edge', style: { 'width': 1.6, 'curve-style': 'haystack', 'haystack-radius': 0.4, 'line-color': 'data(ecolor)', 'opacity': 0.5 } },
      { selector: 'edge.derivation', style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle', 'target-arrow-color': 'data(ecolor)', 'arrow-scale': 0.6, 'width': 1.8, 'opacity': 0.8 } },
      { selector: 'edge.relation', style: { 'width': 0.8, 'opacity': 0.22 } },
      { selector: 'edge.bridge', style: { 'curve-style': 'bezier', 'line-style': 'dashed', 'width': 2, 'opacity': 0.85 } },
      { selector: 'edge.reg-shared-mathematics', style: { 'line-style': 'solid', 'width': 2.6 } },
      { selector: 'edge.reg-metaphor', style: { 'line-style': 'dotted' } },
      { selector: 'edge.reg-speculation', style: { 'line-dash-pattern': [2, 6] } },
      { selector: 'node.hub', style: { 'text-opacity': 0.9 } },
      { selector: 'node.hover', style: { 'text-opacity': 1, 'border-width': 2.4, 'border-opacity': 1, 'z-index': 30 } },
      { selector: 'node.sel', style: { 'text-opacity': 1, 'border-color': '#e0a92e', 'border-width': 3, 'border-opacity': 1, 'z-index': 40 } },
      { selector: '.faded', style: { 'opacity': 0.045, 'text-opacity': 0 } },
      { selector: 'edge.hidden', style: { 'display': 'none' } },
    ];
  }
  function initGraph() {
    const host = $('#cy');
    if (!host || typeof cytoscape === 'undefined' || !graph.nodes.length) return;
    const elements = [];
    graph.nodes.forEach((n) => elements.push({ data: {
      id: n.id, label: n.label, title: n.title || n.label, domain: n.domain, tier: n.tier,
      dcolor: domCanvas(n.domain), tcolor: tierCanvas(n.tier),
      grad: '#ffffff ' + domCanvas(n.domain) + ' ' + domCanvas(n.domain) } }));
    graph.edges.forEach((e, i) => elements.push({
      data: { id: 'e' + i, source: e.source, target: e.target, kind: e.kind,
        ecolor: e.kind === 'bridge' ? regCanvas(e.register) : e.kind === 'relation' ? 'rgba(150,158,175,0.5)' : 'rgba(170,178,196,0.55)' },
      classes: e.kind === 'bridge' ? ('bridge reg-' + e.register) : e.kind }));
    cy = cytoscape({ container: host, elements, style: graphStyle(),
      layout: { name: 'cose', animate: false, idealEdgeLength: 115, nodeRepulsion: 20000, padding: 34, nodeOverlap: 18, gravity: 0.8, componentSpacing: 90, numIter: 2200 },
      minZoom: 0.18, maxZoom: 3, wheelSensitivity: 0.2, pixelRatio: Math.min(devicePixelRatio, 2) });
    cy.nodes().forEach((n) => n.data('deg', Math.min(n.degree(), 10)));
    cy.nodes().toArray().sort((a, b) => b.degree() - a.degree()).slice(0, 16).forEach((n) => n.addClass('hub')); // keep only the ~16 busiest labels on by default
    const tip = $('#graph-tip');
    cy.on('mouseover', 'node', (ev) => {
      const n = ev.target; n.addClass('hover');
      if (tip) {
        const t = TIERS[n.data('tier')] || {};
        tip.innerHTML = `<span class="tip-title">${esc(n.data('title'))}</span>`
          + `<span class="tip-meta"><span class="tip-tier" style="--tc:${tierCanvas(n.data('tier'))}">${n.data('tier')} · ${esc(t.label || '')}</span>`
          + `<span class="tip-dom" style="--dc:${domCanvas(n.data('domain'))}">${n.data('domain').replace(/-/g, ' ')}</span>`
          + `<span class="tip-deg">${n.degree()} links</span></span>`;
        tip.hidden = false;
      }
    });
    cy.on('mouseout', 'node', (ev) => { ev.target.removeClass('hover'); if (tip) tip.hidden = true; });
    cy.on('mousemove', (ev) => {
      if (tip && !tip.hidden) {
        const p = ev.renderedPosition || { x: 0, y: 0 };
        const w = host.clientWidth;
        tip.style.left = Math.min(p.x + 14, w - 220) + 'px'; tip.style.top = (p.y + 14) + 'px';
      }
    });
    cy.on('tap', 'node', (ev) => { cy.nodes().removeClass('sel'); ev.target.addClass('sel'); openClaim(ev.target.id()); });

    const dsel = $('#filter-domain'), tsel = $('#filter-tier'), btog = $('#toggle-bridges'), rtog = $('#toggle-relations');
    if (dsel) Object.keys(DOMS).filter((d) => graph.nodes.some((n) => n.domain === d))
      .forEach((d) => { const o = document.createElement('option'); o.value = d; o.textContent = d.replace(/-/g, ' '); dsel.appendChild(o); });
    const search = $('#graph-search');
    const apply = () => {
      const dom = dsel ? dsel.value : ''; const maxRank = tsel && tsel.value ? tierRank(tsel.value) : 99;
      const showB = !btog || btog.checked, showR = !rtog || rtog.checked;
      const q = search ? search.value.trim().toLowerCase() : '';
      const matches = [];
      cy.batch(() => {
        cy.nodes().forEach((n) => {
          const ok = (!dom || n.data('domain') === dom) && tierRank(n.data('tier')) <= maxRank
            && (!q || (n.data('title') + ' ' + n.id()).toLowerCase().includes(q));
          n.toggleClass('faded', !ok);
          if (ok && q) matches.push(n);
        });
        cy.edges().forEach((e) => {
          e.toggleClass('faded', e.source().hasClass('faded') || e.target().hasClass('faded'));
          e.toggleClass('hidden', (e.hasClass('bridge') && !showB) || (e.hasClass('relation') && !showR));
        });
      });
      if (q && matches.length && matches.length <= 5) cy.animate({ fit: { eles: cy.collection(matches), padding: 90 } }, { duration: reduceMotion ? 0 : 420 });
    };
    [dsel, tsel, btog, rtog].forEach((el) => el && el.addEventListener('change', apply));
    search && search.addEventListener('input', apply);
    $('#graph-reset') && $('#graph-reset').addEventListener('click', () => {
      if (dsel) dsel.value = ''; if (tsel) tsel.value = ''; if (btog) btog.checked = true; if (rtog) rtog.checked = true; if (search) search.value = '';
      apply(); cy.animate({ fit: { padding: 30 } }, { duration: reduceMotion ? 0 : 450 });
    });
  }
  function focusMapNode(id) {
    if (!cy) return;
    const n = cy.$id(id);
    if (!n.length) return;
    cy.nodes().removeClass('sel'); n.addClass('sel');
    cy.animate({ center: { eles: n }, zoom: 1.4 }, { duration: reduceMotion ? 0 : 500 });
  }
  inits.map = initGraph;
  onShow.map = () => { if (cy) { cy.resize(); if (pendingMapFocus) { focusMapNode(pendingMapFocus); pendingMapFocus = null; } } };

  /* ═══════════ chord (lazy: interpretations) ═══════════ */
  function drawChord() {
    const host = $('#chord'); if (!host || !art.bridges) return;
    const nodeDomain = {}; (art.nodes || []).forEach((n) => { nodeDomain[n.id] = n.domain; });
    const domains = [...new Set((art.nodes || []).map((n) => n.domain))];
    const N = domains.length; if (!N) return;
    const S = 500, cx = S / 2, cy0 = S / 2, R = S / 2 - 74;
    const pos = {}; domains.forEach((d, i) => { const a = (i / N) * 2 * Math.PI - Math.PI / 2; pos[d] = { x: cx + R * Math.cos(a), y: cy0 + R * Math.sin(a), a }; });
    const regColor = (r) => { const x = REGS[r] || {}; return (isLight() ? x.color : x.dark) || '#888'; };
    let ribbons = '';
    (art.bridges || []).forEach((b) => {
      const reg = REGS[b.register] || { style: 'solid' };
      const dash = reg.style === 'dashed' ? '8 7' : reg.style === 'dotted' ? '2 7' : reg.style === 'wavy' ? '3 8' : '0';
      const doms = [...new Set(b.links.map((l) => nodeDomain[l]).filter(Boolean))];
      for (let i = 0; i < doms.length; i++) for (let j = i + 1; j < doms.length; j++) {
        const A = pos[doms[i]], B = pos[doms[j]]; if (!A || !B) continue;
        ribbons += `<path d="M${A.x.toFixed(1)},${A.y.toFixed(1)} Q${cx},${cy0} ${B.x.toFixed(1)},${B.y.toFixed(1)}" fill="none" stroke="${regColor(b.register)}" stroke-width="2.2" stroke-dasharray="${dash}" opacity="0.68"><title>${esc(b.title || b.id)} — ${b.register}</title></path>`;
      }
    });
    let hubs = '';
    const labelColor = isLight() ? '#5c564a' : '#a5aaba';
    domains.forEach((d) => {
      const p = pos[d];
      const lx = cx + (R + 24) * Math.cos(p.a), ly = cy0 + (R + 24) * Math.sin(p.a);
      const anchor = Math.cos(p.a) > 0.3 ? 'start' : Math.cos(p.a) < -0.3 ? 'end' : 'middle';
      hubs += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="${domPage(d)}"/>`;
      hubs += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="11" fill="${labelColor}" font-family="system-ui">${d.replace(/-/g, ' ')}</text>`;
    });
    host.innerHTML = `<svg viewBox="0 0 ${S} ${S}" role="img">${ribbons}${hubs}</svg>`;
  }
  window.addEventListener('otheory-theme-v2', drawChord);

  /* ═══════════ THREE shared ═══════════ */
  const hasWebGL = (() => { try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; } })();
  function glowTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.25, 'rgba(255,255,255,0.7)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c);
  }
  function makeRenderer(host) {
    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    r.setSize(host.clientWidth, host.clientHeight); r.setPixelRatio(Math.min(devicePixelRatio, 2));
    host.appendChild(r.domElement); return r;
  }
  function onResize(host, renderer, camera) {
    const fit = () => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', fit);
    // ResizeObserver catches a host that was 0-sized at init (e.g. mobile layout not yet
    // settled) or reflows on orientation change — without it the canvas can stick at 0px.
    if (typeof ResizeObserver !== 'undefined') { const ro = new ResizeObserver(fit); ro.observe(host); }
    fit();
  }
  const hex = (c) => new THREE.Color(c);
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function e8Roots() {
    const roots = [];
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) for (const si of [1, -1]) for (const sj of [1, -1]) {
      const v = new Array(8).fill(0); v[i] = si; v[j] = sj; roots.push(v);
    }
    for (let m = 0; m < 256; m++) {
      let neg = 0; const v = new Array(8);
      for (let k = 0; k < 8; k++) { const bit = (m >> k) & 1; v[k] = bit ? -0.5 : 0.5; if (bit) neg++; }
      if (neg % 2 === 0) roots.push(v);
    }
    return roots;
  }
  function e8Basis() {
    // the TRUE E8 Coxeter-plane projection — computed from the Coxeter element and verified offline to be
    // perfectly 30-fold symmetric (8 rings × 30 roots). This is the genuine "E8 mandala", not an approximation.
    return [
      [-0.075643, -0.436276, -0.305414, -0.136021, 0.064499, 0.287382, 0.522889, -0.576195],
      [-0.060561, -0.196697, 0.002379, 0.169897, 0.298535, 0.382672, 0.418630, 0.719694],
    ];
  }
  function e8Edges(roots) {            // 6720 root pairs at squared-distance 2 — the rosette edges (Gosset 4_21)
    const E = [];
    for (let i = 0; i < roots.length; i++)
      for (let j = i + 1; j < roots.length; j++) {
        let d2 = 0; for (let k = 0; k < 8; k++) { const dd = roots[i][k] - roots[j][k]; d2 += dd * dd; }
        if (Math.abs(d2 - 2) < 1e-6) E.push([i, j]);
      }
    return E;                          // length 6720 (verified 30-fold symmetric: 224 edge-midpoints / 12° sector)
  }
  const fallbackMsg = (kind) => `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9aa2b5;text-align:center;padding:2rem;font-size:0.9rem">This ${kind} needs WebGL, which isn't available in this browser. Every claim it draws from is listed with full provenance.</div>`;

  /* ═══════════ geometry (lazy: interpretations) ═══════════ */
  function initGeometry() {
    const host = $('#geo'); if (!host) return;
    if (typeof THREE === 'undefined' || !hasWebGL) { host.innerHTML = fallbackMsg('geometry visualizer'); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);
    const renderer = makeRenderer(host);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false;
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pl = new THREE.PointLight(0xffffff, 0.8); pl.position.set(6, 8, 10); scene.add(pl);
    const groups = { solids: new THREE.Group(), golden: new THREE.Group(), e8: new THREE.Group() };
    Object.values(groups).forEach((g) => scene.add(g));

    [['Tetrahedron', new THREE.TetrahedronGeometry(0.95)], ['Cube', new THREE.BoxGeometry(1.3, 1.3, 1.3)],
     ['Octahedron', new THREE.OctahedronGeometry(1.05)], ['Dodecahedron', new THREE.DodecahedronGeometry(1.05)],
     ['Icosahedron', new THREE.IcosahedronGeometry(1.05)]].forEach(([name, geo], i, arr) => {
      const a = (i / arr.length) * Math.PI * 2;
      const mesh = new THREE.Group();
      mesh.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x2a3350, transparent: true, opacity: 0.28, metalness: 0.3, roughness: 0.5, flatShading: true })));
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x9db4ff })));
      mesh.position.set(Math.cos(a) * 3.2, Math.sin(a) * 3.2, 0);
      mesh.userData.spin = 0.004 + i * 0.001;
      groups.solids.add(mesh);
    });
    (function golden() {
      const phi = (1 + Math.sqrt(5)) / 2;
      const pts = []; let r = 0.06;
      for (let t = 0; t < Math.PI * 6; t += 0.12) { r *= Math.pow(phi, 0.12 / (Math.PI / 2)); pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0)); }
      groups.golden.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0xffd479 })));
      const pent = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; pent.push(new THREE.Vector3(Math.cos(a) * 2.4, Math.sin(a) * 2.4, 0)); }
      groups.golden.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pent.concat([pent[0]])), new THREE.LineBasicMaterial({ color: 0x3fd6c0 })));
      groups.golden.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([0, 2, 4, 1, 3, 0].map((i) => pent[i])), new THREE.LineBasicMaterial({ color: 0xffd479, transparent: true, opacity: 0.8 })));
    })();
    (function e8() {
      const roots = e8Roots(); const basis = e8Basis();
      const positions = [], colors = []; const col = hex(0x9db4ff);
      roots.forEach((v) => { let x = 0, y = 0; for (let k = 0; k < 8; k++) { x += v[k] * basis[0][k]; y += v[k] * basis[1][k]; } positions.push(x * 1.4, y * 1.4, 0); colors.push(col.r, col.g, col.b); });
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      groups.e8.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.12, map: glowTexture(), transparent: true, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending })));
    })();

    const caps = {
      solids: 'The five convex regular polyhedra — a proven theorem since Euclid (platonic-solids-five, E1).',
      golden: 'φ in the pentagon and the logarithmic spiral. The mathematics is E1; the "universal beauty" claim is E6.',
      e8: 'The 240 roots of E8 projected to the plane — settled mathematics (e8-lie-group, E1). Never asserted as physics.',
    };
    const setMode = (m) => { Object.entries(groups).forEach(([k, g]) => { g.visible = k === m; }); const el = $('#geo-caption'); if (el) el.textContent = caps[m]; if (reduceMotion) renderer.render(scene, camera); };
    $$('.geo-btn').forEach((b) => b.addEventListener('click', () => { $$('.geo-btn').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); setMode(b.dataset.geo); }));
    onResize(host, renderer, camera);
    setMode('solids');
    if (reduceMotion) { controls.enableDamping = false; controls.addEventListener('change', () => renderer.render(scene, camera)); renderer.render(scene, camera); return; }
    (function loop() {
      groups.solids.children.forEach((m) => { m.rotation.x += m.userData.spin; m.rotation.y += m.userData.spin * 1.3; });
      groups.golden.rotation.z += 0.002; groups.e8.rotation.z += 0.0016;
      controls.update(); renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  }

  /* ═══════════ the Portrait — two modes ═══════════ */
  function initPortrait() {
    const host = $('#portrait-canvas'); if (!host) return;
    if (typeof THREE === 'undefined' || !hasWebGL) { host.innerHTML = fallbackMsg('portrait'); return; }
    const seed = parseInt((art.corpusHash || '1').slice(0, 8), 16) || 1;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.1, 200);
    camera.position.set(0, 2, 26);
    const renderer = makeRenderer(host);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false; controls.minDistance = 9; controls.maxDistance = 60;
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const glow = glowTexture();
    const honest = new THREE.Group(), unified = new THREE.Group();
    scene.add(honest); scene.add(unified);

    // register material for crossfade: remembers its native opacity
    const registry = { honest: [], unified: [] };
    const reg = (side, mat) => { mat.transparent = true; mat.userData.baseOp = mat.opacity; registry[side].push(mat); return mat; };

    /* — mode A: as evidenced (tier shells) — */
    (function buildHonest() {
      const rng = mulberry32(seed);
      const tierCfg = {
        E1: { r: 3.2, size: 0.22, op: 0.95 }, E2: { r: 6.0, size: 0.2, op: 0.6 }, E3: { r: 8.6, size: 0.2, op: 0.5 },
        E4: { r: 11.4, size: 0.34, op: 0.32 }, E5: { r: 14.2, size: 0.26, op: 0.7 }, E6: { r: 17.0, size: 0.16, op: 0.18 },
      };
      const DENSITY = 14;
      const anchors = {};
      (art.nodes || []).forEach((n) => {
        const cfg = tierCfg[n.tier] || tierCfg.E4; const col = hex(domCanvas(n.domain));
        const positions = [], colors = [];
        for (let i = 0; i < DENSITY; i++) {
          const u = rng(), v = rng(); const th = Math.acos(2 * u - 1), ph = 2 * Math.PI * v;
          const r = cfg.r + (rng() - 0.5) * (cfg.r * 0.14);
          const x = r * Math.sin(th) * Math.cos(ph), y = r * Math.cos(th) * 0.72, z = r * Math.sin(th) * Math.sin(ph);
          positions.push(x, y, z); colors.push(col.r, col.g, col.b);
          if (i === 0) anchors[n.id] = new THREE.Vector3(x, y, z);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        honest.add(new THREE.Points(g, reg('honest', new THREE.PointsMaterial({ size: cfg.size, map: glow, opacity: cfg.op, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }))));
        if (n.tier === 'E1') {
          const em = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.5 + rng() * 0.3, 0)), reg('honest', new THREE.LineBasicMaterial({ color: col, opacity: 0.8 })));
          em.position.copy(anchors[n.id]); honest.add(em);
        }
      });
      honest.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), reg('honest', new THREE.MeshBasicMaterial({ color: 0xbfd0ff, opacity: 0.1, wireframe: true }))));
      const pos = [], colr = []; const cc = hex('#eaf0ff');
      for (let i = 0; i < 140; i++) { const r = rng() * 1.6; const th = Math.acos(2 * rng() - 1), ph = 2 * Math.PI * rng(); pos.push(r * Math.sin(th) * Math.cos(ph), r * Math.cos(th), r * Math.sin(th) * Math.sin(ph)); colr.push(cc.r, cc.g, cc.b); }
      const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); cg.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
      honest.add(new THREE.Points(cg, reg('honest', new THREE.PointsMaterial({ size: 0.5, map: glow, opacity: 0.55, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }))));
      (art.bridges || []).forEach((b) => {
        const rc = REGS[b.register] || { style: 'solid' }; const col = hex(regCanvas(b.register));
        const linked = b.links.filter((l) => anchors[l]);
        for (let i = 0; i < linked.length; i++) for (let j = i + 1; j < linked.length; j++) {
          const A = anchors[linked[i]], B = anchors[linked[j]];
          const mid = A.clone().add(B).multiplyScalar(0.5).multiplyScalar(0.55);
          const pts = new THREE.QuadraticBezierCurve3(A, mid, B).getPoints(24);
          const g = new THREE.BufferGeometry().setFromPoints(pts);
          let mat;
          if (rc.style === 'solid') mat = new THREE.LineBasicMaterial({ color: col, opacity: 0.5 });
          else mat = new THREE.LineDashedMaterial({ color: col, opacity: 0.5, dashSize: rc.style === 'dotted' ? 0.15 : 0.5, gapSize: rc.style === 'dotted' ? 0.35 : 0.5 });
          const line = new THREE.Line(g, reg('honest', mat));
          if (mat.isLineDashedMaterial) line.computeLineDistances();
          honest.add(line);
        }
      });
      const roots = e8Roots(); const basis = e8Basis(); const dust = [], dcol = []; const cc2 = hex('#9db4ff');
      roots.forEach((v) => { let x = 0, y = 0; for (let k = 0; k < 8; k++) { x += v[k] * basis[0][k]; y += v[k] * basis[1][k]; } dust.push(x * 0.9, y * 0.9, (rng() - 0.5) * 0.6); dcol.push(cc2.r, cc2.g, cc2.b); });
      const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.Float32BufferAttribute(dust, 3)); dg.setAttribute('color', new THREE.Float32BufferAttribute(dcol, 3));
      honest.add(new THREE.Points(dg, reg('honest', new THREE.PointsMaterial({ size: 0.09, map: glow, opacity: 0.5, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }))));
    })();

    /* — mode B: "as if all were true" — the dream, pared to three shapes that share one centre and axis:
       the 3D E8 (two 600-cells), the Hopf-fibration veil (thick tubes), and the cuboctahedron heart.
       Aesthetics, not a claim. — */
    try { (function buildUnified() {
      const GA = Math.PI * (3 - Math.sqrt(5));                 // golden angle — the fibre twist
      // The veil is NOT one-fibre-per-claim (that count is arbitrary). It is a fixed, self-consistent number set
      // by the geometry itself: COUNT = 144 = Fibonacci F(12) = 12². Under golden-angle phyllotaxis a Fibonacci
      // count is exactly where the spiral arms (parastichies) close cleanly, and 12 is the cuboctahedron's vertex
      // count and the 600-cell's vertex degree — so the veil resonates with the two solids it wraps.
      const COUNT = 144;
      const GR = 0.6180339887498949;                          // 1/φ — golden-ratio hue step (max-distinct colours)
      // Hopf fiber: base point (theta,phi) on S^2 -> a circle in S^3, stereographically projected to R^3.
      // NO clamp — theta is restricted to a band (0.17π..0.47π) where d=1-y2 stays >= 0.328, so every fiber is a
      // complete SMOOTH Villarceau circle: no singularity walls (the old "rounded-square" look), no far-flung spikes.
      // A d<CULL guard splits the strip as belt-and-suspenders; verified to fire on 0 segments in-band.
      const SEG = 220, CULL = 0.28, TLO = 0.17, THI = 0.47;
      const fiber = (theta, phi) => {                        // array of {v, d}
        const a = Math.cos(theta / 2), b = Math.sin(theta / 2), out = [];
        for (let k = 0; k <= SEG; k++) {
          const psi = (k / SEG) * 2 * Math.PI;
          const x1 = a * Math.cos(psi), y1 = a * Math.sin(psi);
          const x2 = b * Math.cos(psi + phi), y2 = b * Math.sin(psi + phi);
          const d = 1 - y2;
          out.push({ v: new THREE.Vector3(x1 / d, y1 / d, x2 / d), d });
        }
        return out;
      };
      // first pass — raw rings + max extent (from kept samples only) for scaling
      const raw = []; let maxLen = 0.001;
      for (let i = 0; i < COUNT; i++) {
        const theta = TLO * Math.PI + (THI - TLO) * Math.PI * ((i + 0.5) / COUNT);
        const ring = fiber(theta, GA * i);
        ring.forEach((s) => { if (s.d >= CULL) maxLen = Math.max(maxLen, s.v.length()); });
        raw.push(ring);
      }
      const scale = 9.6 / maxLen;                            // veil halo at ~9.6, nearly 2× the rosette (5.5)
      // second pass — each fiber as a THICK tube (a Villarceau circle swept into a solid ring). Colour is set by a
      // golden-ratio walk of the hue wheel (h = frac(i/φ)): every theory blended into one full spectrum, no domain
      // buckets, adjacent fibres maximally distinct. Tubes (not 1px lines) because WebGL line width is unreliable.
      const TUBE_R = 0.06;
      const fiberMat = reg('unified', new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending }));
      for (let i = 0; i < COUNT; i++) {
        const col = new THREE.Color().setHSL((i * GR) % 1, 0.58, 0.62);
        const pts = [];
        for (let k = 0; k < SEG; k++) { const s = raw[i][k]; if (s.d < CULL) continue; pts.push(s.v.clone().multiplyScalar(scale)); }
        if (pts.length < 6) continue;                        // degenerate ring — skip (never happens in-band)
        const curve = new THREE.CatmullRomCurve3(pts, true); // closed loop, no duplicate endpoint
        const geo = new THREE.TubeGeometry(curve, Math.min(pts.length, 132), TUBE_R, 6, true);
        const cnt = geo.attributes.position.count, ca = new Float32Array(cnt * 3);
        for (let k = 0; k < cnt; k++) { ca[3 * k] = col.r; ca[3 * k + 1] = col.g; ca[3 * k + 2] = col.b; }
        geo.setAttribute('color', new THREE.Float32BufferAttribute(ca, 3));
        unified.add(new THREE.Mesh(geo, fiberMat));
      }

      // core — nested vector equilibrium (cuboctahedron), gold
      const core = new THREE.Group(); unified.add(core); unified.userData.core = core;
      const goldLines = (verts, edges, s, op) => {
        const pos = []; edges.forEach(([i, j]) => { pos.push(verts[i].x * s, verts[i].y * s, verts[i].z * s, verts[j].x * s, verts[j].y * s, verts[j].z * s); });
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        core.add(new THREE.LineSegments(g, reg('unified', new THREE.LineBasicMaterial({ color: 0xffe4a0, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending }))));
      };
      const ve = [[1,1,0],[1,-1,0],[-1,1,0],[-1,-1,0],[1,0,1],[1,0,-1],[-1,0,1],[-1,0,-1],[0,1,1],[0,1,-1],[0,-1,1],[0,-1,-1]].map((v) => new THREE.Vector3(v[0], v[1], v[2]));
      const veEdges = []; for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) if (Math.abs(ve[i].distanceTo(ve[j]) - Math.SQRT2) < 0.02) veEdges.push([i, j]);
      goldLines(ve, veEdges, 2.3, 0.7); goldLines(ve, veEdges, 1.42, 0.55); goldLines(ve, veEdges, 0.78, 0.4); // fractal nesting, brighter so it reads as a structure
      // the E8 CENTREPIECE — now genuinely THREE-DIMENSIONAL, so it belongs inside the Hopf weave instead of
      // hanging as a flat disc. E8 folds exactly onto the H4 Coxeter group: its 240 roots split into two
      // concentric 600-cells (the icosians) whose circumradii sit in the golden ratio 1 : φ. The 600-cell is the
      // discrete Hopf fibration of S³ — 120 unit quaternions — so its 4D→3D shadow is literally a nest of Hopf
      // rings, sharing geometry with the Villarceau fibres woven around it. Settled mathematics (e8-lie-group,
      // E1). Never asserted as physics.
      (function e8Polytope() {
        const phi = (1 + Math.sqrt(5)) / 2, inv = 1 / phi;
        // 120 icosians = vertices of the unit 600-cell (circumradius 1)
        const cell = (() => {
          const map = new Map(); const key = (a) => a.map((x) => Math.round(x * 1e4)).join(',');
          const add = (a) => { const k = key(a); if (!map.has(k)) map.set(k, a); };
          for (let i = 0; i < 4; i++) for (const sgn of [1, -1]) { const v = [0, 0, 0, 0]; v[i] = sgn; add(v); } // (±1,0,0,0)
          for (let m = 0; m < 16; m++) add([0, 1, 2, 3].map((k) => ((m >> k) & 1 ? -0.5 : 0.5)));               // (±½,±½,±½,±½)
          const base = [phi / 2, 0.5, inv / 2, 0];                                                             // even perms of ½(φ,1,1/φ,0)
          const perms = []; (function gen(rem, acc) { if (!rem.length) { perms.push(acc); return; } for (let i = 0; i < rem.length; i++) gen(rem.slice(0, i).concat(rem.slice(i + 1)), acc.concat(rem[i])); })([0, 1, 2, 3], []);
          perms.forEach((p) => { let iv = 0; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (p[i] > p[j]) iv++; if (iv % 2) return; const v0 = p.map((k) => base[k]); for (let sg = 0; sg < 16; sg++) add(v0.map((x, k) => ((sg >> k) & 1 ? -x : x))); });
          return [...map.values()];                                                                            // exactly 120
        })();
        // 600-cell edges: the nearest-neighbour pairs (720 of them at circumradius 1)
        let dmin = Infinity;
        const d2 = (a, b) => { let s = 0; for (let k = 0; k < 4; k++) { const t = a[k] - b[k]; s += t * t; } return s; };
        for (let i = 0; i < cell.length; i++) for (let j = i + 1; j < cell.length; j++) dmin = Math.min(dmin, d2(cell[i], cell[j]));
        const edges = [];
        for (let i = 0; i < cell.length; i++) for (let j = i + 1; j < cell.length; j++) if (Math.abs(d2(cell[i], cell[j]) - dmin) < 1e-3) edges.push([i, j]);
        // 4D→3D perspective shadow from a viewpoint on the w-axis (F beyond the outer shell so it stays bounded)
        const F = phi + 1.3;
        const proj = (q, R) => { const sc = F / (F - q[3] * R); return new THREE.Vector3(q[0] * R * sc, q[1] * R * sc, q[2] * R * sc); };
        const shells = [{ R: 1, hub: hex('#e8a13c'), rim: hex('#ffe0a0') }, { R: phi, hub: hex('#ffc65a'), rim: hex('#fff2c8') }];
        let mx = 0.001; shells.forEach(({ R }) => cell.forEach((q) => { mx = Math.max(mx, proj(q, R).length()); }));
        const s = 5.7 / mx;                                             // outer shell lands near the veil's inner reach
        const e8grp = new THREE.Group(); unified.add(e8grp); unified.userData.e8 = e8grp;
        const lerp = (a, c, t) => ({ r: a.r + (c.r - a.r) * t, g: a.g + (c.g - a.g) * t, b: a.b + (c.b - a.b) * t });
        // draw each shell's 720 edges as thin MERGED tubes (not 1px lines), so the lattice reads as solid and
        // matches the Hopf veil's thickness. One BufferGeometry per shell → one draw call.
        const EDGE_R = 0.032, SIDES = 5;
        const AX = new THREE.Vector3(), U = new THREE.Vector3(), W = new THREE.Vector3(), DIR = new THREE.Vector3();
        shells.forEach(({ R, hub, rim }) => {
          const V = cell.map((q) => proj(q, R).multiplyScalar(s));
          const tp = [], tc = [];
          edges.forEach(([i, j]) => {
            const A = V[i], B = V[j], t = Math.min(1, (A.length() + B.length()) / 2 / 5.7), c = lerp(hub, rim, t);
            DIR.subVectors(B, A); const L = DIR.length(); if (L < 1e-6) return; DIR.multiplyScalar(1 / L);
            AX.set(Math.abs(DIR.x) < 0.9 ? 1 : 0, Math.abs(DIR.x) < 0.9 ? 0 : 1, 0);
            U.crossVectors(DIR, AX).normalize(); W.crossVectors(DIR, U);
            for (let sIdx = 0; sIdx < SIDES; sIdx++) {
              const a0 = (sIdx / SIDES) * 2 * Math.PI, a1 = ((sIdx + 1) / SIDES) * 2 * Math.PI;
              const o0 = U.clone().multiplyScalar(Math.cos(a0) * EDGE_R).addScaledVector(W, Math.sin(a0) * EDGE_R);
              const o1 = U.clone().multiplyScalar(Math.cos(a1) * EDGE_R).addScaledVector(W, Math.sin(a1) * EDGE_R);
              const p = [A.clone().add(o0), B.clone().add(o0), B.clone().add(o1), A.clone().add(o0), B.clone().add(o1), A.clone().add(o1)];
              p.forEach((v) => { tp.push(v.x, v.y, v.z); tc.push(c.r, c.g, c.b); });
            }
          });
          const eg = new THREE.BufferGeometry();
          eg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3));
          eg.setAttribute('color', new THREE.Float32BufferAttribute(tc, 3));
          e8grp.add(new THREE.Mesh(eg, reg('unified', new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.2, depthWrite: false, blending: THREE.AdditiveBlending }))));
          const pp = [], pc = [];
          V.forEach((v) => { pp.push(v.x, v.y, v.z); pc.push(rim.r, rim.g, rim.b); });
          const pg = new THREE.BufferGeometry();
          pg.setAttribute('position', new THREE.Float32BufferAttribute(pp, 3));
          pg.setAttribute('color', new THREE.Float32BufferAttribute(pc, 3));
          e8grp.add(new THREE.Points(pg, reg('unified', new THREE.PointsMaterial({ size: 0.3, map: glow, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }))));
        });
      })();
    })(); } catch (e) { console.error('unified art', e); }

    /* — crossfade + loop — */
    let mix = 1, target = 1; // 0 = honest, 1 = unified (DEFAULT: the combined "as if all were true" view)
    const applyMix = () => {
      registry.honest.forEach((m) => { m.opacity = m.userData.baseOp * (1 - mix); });
      registry.unified.forEach((m) => { m.opacity = m.userData.baseOp * mix; });
      honest.visible = mix < 0.995; unified.visible = mix > 0.005;
    };
    applyMix();
    const captions = {
      honest: 'Solid where we know, translucent where we guess, luminous where we can only point.',
      unified: 'Every claim rendered as true — one radiant, counterfactual whole. This is the dream, drawn as art; the evidence lives one toggle away.',
    };
    $$('.art-mode').forEach((b) => b.addEventListener('click', () => {
      $$('.art-mode').forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', String(x === b)); });
      target = b.dataset.mode === 'unified' ? 1 : 0;
      const cap = $('#art-caption'); if (cap) cap.textContent = captions[b.dataset.mode];
      $$('.art-prompt').forEach((p) => { p.hidden = p.dataset.mode !== b.dataset.mode; }); // swap the drawer's prompt to match
      if (reduceMotion) { mix = target; applyMix(); renderer.render(scene, camera); }
    }));
    onResize(host, renderer, camera);
    let t = 0;
    if (reduceMotion) {
      honest.rotation.y = unified.rotation.y = 0.6;
      controls.enableDamping = false;
      controls.addEventListener('change', () => renderer.render(scene, camera));
      renderer.render(scene, camera);
      return;
    }
    (function loop() {
      t += 0.01;
      mix += (target - mix) * 0.06;
      if (Math.abs(target - mix) > 0.001) applyMix();
      honest.rotation.y += 0.0016;
      unified.rotation.y += 0.0011;
      if (unified.userData.core) { unified.userData.core.rotation.y -= 0.005; unified.userData.core.rotation.x += 0.0025; }
      if (unified.userData.e8) { unified.userData.e8.rotation.y += 0.0011; unified.userData.e8.rotation.x += 0.0015; } // gentle tumble reveals the 600-cell's depth
      const b = 1 + Math.sin(t) * 0.02;
      honest.scale.setScalar(b);
      unified.scale.setScalar(1 + Math.sin(t * 0.8) * 0.03);
      controls.update(); renderer.render(scene, camera);
      requestAnimationFrame(loop);
    })();
  }

  /* ═══════════ chapter wiring + boot ═══════════ */
  inits.interpretations = () => { drawChord(); initGeometry(); };
  function boot() {
    tagReveals();
    initEvidenceRail();
    try { initPortrait(); } catch (e) { console.error('portrait', e); }
    activate(currentSlug());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
