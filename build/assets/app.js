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
    const saved = localStorage.getItem('otheory-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    $('#theme-toggle') && $('#theme-toggle').addEventListener('click', () => {
      const next = isLight() ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('otheory-theme', next);
      window.dispatchEvent(new CustomEvent('otheory-theme', { detail: next }));
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
        'background-color': 'data(dcolor)', 'border-color': 'data(tcolor)', 'border-width': 3,
        'width': 'mapData(deg, 0, 10, 16, 52)', 'height': 'mapData(deg, 0, 10, 16, 52)',
        'label': 'data(label)', 'color': '#c9cede', 'font-size': 8, 'font-family': 'system-ui, sans-serif',
        'text-valign': 'bottom', 'text-margin-y': 3, 'text-wrap': 'wrap', 'text-max-width': 88,
        'text-outline-color': '#0b0d14', 'text-outline-width': 2, 'min-zoomed-font-size': 7 } },
      { selector: 'edge', style: { 'width': 1.8, 'curve-style': 'haystack', 'haystack-radius': 0.3, 'line-color': 'data(ecolor)', 'opacity': 0.6 } },
      { selector: 'edge.derivation', style: { 'curve-style': 'bezier', 'target-arrow-shape': 'triangle', 'target-arrow-color': 'data(ecolor)', 'arrow-scale': 0.7, 'width': 2.2, 'opacity': 0.85 } },
      { selector: 'edge.relation', style: { 'width': 1, 'opacity': 0.35 } },
      { selector: 'edge.bridge', style: { 'curve-style': 'bezier', 'line-style': 'dashed', 'width': 2.2, 'opacity': 0.9 } },
      { selector: 'edge.reg-shared-mathematics', style: { 'line-style': 'solid', 'width': 3 } },
      { selector: 'edge.reg-metaphor', style: { 'line-style': 'dotted' } },
      { selector: 'edge.reg-speculation', style: { 'line-dash-pattern': [2, 6] } },
      { selector: '.faded', style: { 'opacity': 0.05, 'text-opacity': 0 } },
      { selector: 'node.sel', style: { 'border-color': '#ffd479', 'border-width': 5 } },
      { selector: 'edge.hidden', style: { 'display': 'none' } },
    ];
  }
  function initGraph() {
    const host = $('#cy');
    if (!host || typeof cytoscape === 'undefined' || !graph.nodes.length) return;
    const elements = [];
    graph.nodes.forEach((n) => elements.push({ data: {
      id: n.id, label: n.label, domain: n.domain, tier: n.tier,
      dcolor: domCanvas(n.domain), tcolor: tierCanvas(n.tier) } }));
    graph.edges.forEach((e, i) => elements.push({
      data: { id: 'e' + i, source: e.source, target: e.target, kind: e.kind,
        ecolor: e.kind === 'bridge' ? regCanvas(e.register) : e.kind === 'relation' ? 'rgba(150,158,175,0.5)' : 'rgba(170,178,196,0.55)' },
      classes: e.kind === 'bridge' ? ('bridge reg-' + e.register) : e.kind }));
    cy = cytoscape({ container: host, elements, style: graphStyle(),
      layout: { name: 'cose', animate: false, idealEdgeLength: 90, nodeRepulsion: 12000, padding: 30, nodeOverlap: 10, gravity: 1.2, numIter: 1600 },
      minZoom: 0.22, maxZoom: 3, wheelSensitivity: 0.2, pixelRatio: Math.min(devicePixelRatio, 2) });
    cy.nodes().forEach((n) => n.data('deg', Math.min(n.degree(), 10)));
    cy.on('tap', 'node', (ev) => { cy.nodes().removeClass('sel'); ev.target.addClass('sel'); openClaim(ev.target.id()); });

    const dsel = $('#filter-domain'), tsel = $('#filter-tier'), btog = $('#toggle-bridges'), rtog = $('#toggle-relations');
    if (dsel) Object.keys(DOMS).filter((d) => graph.nodes.some((n) => n.domain === d))
      .forEach((d) => { const o = document.createElement('option'); o.value = d; o.textContent = d.replace(/-/g, ' '); dsel.appendChild(o); });
    const apply = () => {
      const dom = dsel ? dsel.value : ''; const maxRank = tsel && tsel.value ? tierRank(tsel.value) : 99;
      const showB = !btog || btog.checked, showR = !rtog || rtog.checked;
      cy.batch(() => {
        cy.nodes().forEach((n) => n.toggleClass('faded', !((!dom || n.data('domain') === dom) && tierRank(n.data('tier')) <= maxRank)));
        cy.edges().forEach((e) => {
          e.toggleClass('faded', e.source().hasClass('faded') || e.target().hasClass('faded'));
          e.toggleClass('hidden', (e.hasClass('bridge') && !showB) || (e.hasClass('relation') && !showR));
        });
      });
    };
    [dsel, tsel, btog, rtog].forEach((el) => el && el.addEventListener('change', apply));
    $('#graph-reset') && $('#graph-reset').addEventListener('click', () => {
      if (dsel) dsel.value = ''; if (tsel) tsel.value = ''; if (btog) btog.checked = true; if (rtog) rtog.checked = true;
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
  window.addEventListener('otheory-theme', drawChord);

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
    window.addEventListener('resize', () => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); });
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
    const c = (k) => Math.cos((2 * Math.PI * k) / 8 + 0.35), s = (k) => Math.sin((2 * Math.PI * k) / 8 + 0.35);
    let u = [], w = [];
    for (let k = 0; k < 8; k++) { u.push(c(k)); w.push(s(k)); }
    const norm = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
    return [norm(u), norm(w)];
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

    /* — mode B: as if all were true (one radiant whole) — */
    (function buildUnified() {
      const rng = mulberry32(seed ^ 0x5f5f5f);
      const nodes = art.nodes || [];
      const N = nodes.length || 1;
      const GA = Math.PI * (3 - Math.sqrt(5)); // golden angle
      const anchors = {};
      const positions = [], colors = [];
      nodes.forEach((n, i) => {
        // Fibonacci sphere: every claim an equal petal of one form
        const y = 1 - (i / (N - 1)) * 2;
        const rr = Math.sqrt(Math.max(0, 1 - y * y));
        const th = GA * i;
        const R0 = 9.5;
        const p = new THREE.Vector3(Math.cos(th) * rr * R0, y * R0 * 0.78, Math.sin(th) * rr * R0);
        anchors[n.id] = p;
        const col = hex(domCanvas(n.domain));
        positions.push(p.x, p.y, p.z); colors.push(col.r, col.g, col.b);
      });
      const pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      pg.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      unified.add(new THREE.Points(pg, reg('unified', new THREE.PointsMaterial({ size: 0.85, map: glow, opacity: 0.95, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }))));
      // halo ring of finer dust along the same spiral
      const halo = [], hcol = [];
      nodes.forEach((n, i) => {
        const base = anchors[n.id]; const col = hex(domCanvas(n.domain));
        for (let k = 0; k < 6; k++) {
          halo.push(base.x + (rng() - 0.5) * 1.3, base.y + (rng() - 0.5) * 1.3, base.z + (rng() - 0.5) * 1.3);
          hcol.push(col.r, col.g, col.b);
        }
      });
      const hg = new THREE.BufferGeometry();
      hg.setAttribute('position', new THREE.Float32BufferAttribute(halo, 3));
      hg.setAttribute('color', new THREE.Float32BufferAttribute(hcol, 3));
      unified.add(new THREE.Points(hg, reg('unified', new THREE.PointsMaterial({ size: 0.22, map: glow, opacity: 0.5, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }))));
      // every connection — bridge pairs AND relations — as bright convergent filaments through the core
      const drawFil = (a, b, color, op) => {
        const A = anchors[a], B = anchors[b]; if (!A || !B) return;
        const mid = A.clone().add(B).multiplyScalar(0.5).setLength(2.2 + rng() * 1.6);
        const pts = new THREE.QuadraticBezierCurve3(A, mid, B).getPoints(28);
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        unified.add(new THREE.Line(g, reg('unified', new THREE.LineBasicMaterial({ color, opacity: op }))));
      };
      (art.bridges || []).forEach((b) => {
        const col = hex(regCanvas(b.register));
        for (let i = 0; i < b.links.length; i++) for (let j = i + 1; j < b.links.length; j++) drawFil(b.links[i], b.links[j], col, 0.55);
      });
      (art.relationPairs || []).forEach(([a, b]) => drawFil(a, b, hex('#cdd6ea'), 0.16));
      // the O-Source at full radiance
      unified.add(new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 2), reg('unified', new THREE.MeshBasicMaterial({ color: 0xfff3d0, opacity: 0.16, wireframe: true }))));
      const cpos = [], ccol = []; const gold = hex('#ffe9b3'), white = hex('#ffffff');
      for (let i = 0; i < 420; i++) {
        const r = Math.pow(rng(), 0.6) * 2.4; const th = Math.acos(2 * rng() - 1), ph = 2 * Math.PI * rng();
        cpos.push(r * Math.sin(th) * Math.cos(ph), r * Math.cos(th), r * Math.sin(th) * Math.sin(ph));
        const c = rng() < 0.5 ? gold : white; ccol.push(c.r, c.g, c.b);
      }
      const cg = new THREE.BufferGeometry(); cg.setAttribute('position', new THREE.Float32BufferAttribute(cpos, 3)); cg.setAttribute('color', new THREE.Float32BufferAttribute(ccol, 3));
      unified.add(new THREE.Points(cg, reg('unified', new THREE.PointsMaterial({ size: 0.6, map: glow, opacity: 0.85, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }))));
    })();

    /* — crossfade + loop — */
    let mix = 0, target = 0; // 0 = honest, 1 = unified
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
