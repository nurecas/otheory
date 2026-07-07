/* O Theory — client interactions. Reads inlined graph/art JSON. Vendored libs (cytoscape, THREE). */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const readJSON = (id) => { try { return JSON.parse($('#' + id).textContent); } catch (e) { return null; } };
  const graph = readJSON('graph-data') || { nodes: [], edges: [] };
  const art = readJSON('art-data') || {};
  const PAL = art.palette || { tiers: {}, registers: {}, domains: {} };
  const TIERS = PAL.tiers, REGS = PAL.registers, DOMS = PAL.domains;
  const tierRank = (t) => Number(String(t).replace('E', '')) || 9;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cssVar = (n) => getComputedStyle(document.body).getPropertyValue(n).trim();

  /* ---------------- theme ---------------- */
  (function theme() {
    const btn = $('#theme-toggle');
    const saved = localStorage.getItem('otheory-theme');
    const initial = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', initial);
    btn && btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('otheory-theme', next);
      window.dispatchEvent(new CustomEvent('otheory-theme', { detail: next }));
    });
  })();

  /* ================= HERO GRAPH (Cytoscape) ================= */
  let cy = null;
  function graphStyle() {
    const text = cssVar('--text-dim') || '#aaa', bg = cssVar('--bg-2') || '#111', accent = cssVar('--accent') || '#ffd479';
    return [
      { selector: 'node', style: {
        'background-color': 'data(dcolor)', 'border-color': 'data(tcolor)', 'border-width': 4,
        'width': 'mapData(deg, 0, 6, 24, 62)', 'height': 'mapData(deg, 0, 6, 24, 62)',
        'label': 'data(label)', 'color': text, 'font-size': 9, 'font-family': 'system-ui, sans-serif',
        'text-valign': 'bottom', 'text-margin-y': 4, 'text-wrap': 'wrap', 'text-max-width': 92,
        'text-outline-color': bg, 'text-outline-width': 2, 'transition-property': 'opacity', 'transition-duration': '0.2s' } },
      { selector: 'edge', style: { 'width': 2, 'curve-style': 'bezier', 'line-color': 'data(ecolor)', 'target-arrow-color': 'data(ecolor)', 'opacity': 0.65 } },
      { selector: 'edge.derivation', style: { 'target-arrow-shape': 'triangle', 'line-style': 'solid', 'width': 2.4, 'arrow-scale': 0.8 } },
      { selector: 'edge.bridge', style: { 'line-style': 'dashed' } },
      { selector: 'edge.reg-shared-mathematics', style: { 'line-style': 'solid', 'width': 3 } },
      { selector: 'edge.reg-metaphor', style: { 'line-style': 'dotted', 'width': 2.4 } },
      { selector: 'edge.reg-speculation', style: { 'line-style': 'dashed', 'line-dash-pattern': [3, 7] } },
      { selector: '.faded', style: { 'opacity': 0.06, 'text-opacity': 0 } },
      { selector: 'node.sel', style: { 'border-color': accent, 'border-width': 6 } },
      { selector: 'edge.hidden', style: { 'display': 'none' } },
    ];
  }
  function initGraph() {
    const host = $('#cy');
    if (!host || typeof cytoscape === 'undefined' || !graph.nodes.length) return;
    const elements = [];
    graph.nodes.forEach((n) => elements.push({ data: {
      id: n.id, label: n.label, title: n.title, domain: n.domain, tier: n.tier, type: n.type,
      dcolor: DOMS[n.domain] || '#8a94a6', tcolor: (TIERS[n.tier] || {}).color || '#888' } }));
    graph.edges.forEach((e, i) => elements.push({
      data: { id: 'e' + i, source: e.source, target: e.target, kind: e.kind, register: e.register,
        ecolor: e.kind === 'bridge' ? ((REGS[e.register] || {}).color || '#888') : 'rgba(150,160,180,0.45)' },
      classes: e.kind === 'bridge' ? ('bridge reg-' + e.register) : 'derivation' }));
    cy = cytoscape({ container: host, elements, style: graphStyle(),
      layout: { name: 'cose', animate: !reduceMotion, animationDuration: 700, idealEdgeLength: 115, nodeRepulsion: 9000, padding: 34, nodeOverlap: 14, gravity: 0.9 },
      minZoom: 0.3, maxZoom: 2.5, wheelSensitivity: 0.2 });
    cy.nodes().forEach((n) => n.data('deg', n.degree()));
    cy.on('tap', 'node', (ev) => { cy.nodes().removeClass('sel'); ev.target.addClass('sel'); showPanel(ev.target.id()); });
    cy.on('tap', (ev) => { if (ev.target === cy) { cy.nodes().removeClass('sel'); hidePanel(); } });
    window.addEventListener('otheory-theme', () => cy.style(graphStyle()));

    // filters
    const dsel = $('#filter-domain'); const tsel = $('#filter-tier'); const btoggle = $('#toggle-bridges');
    if (dsel) { Object.keys(DOMS).filter((d) => graph.nodes.some((n) => n.domain === d))
      .forEach((d) => { const o = document.createElement('option'); o.value = d; o.textContent = d.replace(/-/g, ' '); dsel.appendChild(o); }); }
    const apply = () => {
      const dom = dsel ? dsel.value : ''; const maxRank = tsel && tsel.value ? tierRank(tsel.value) : 99; const showBridges = !btoggle || btoggle.checked;
      cy.batch(() => {
        cy.nodes().forEach((n) => {
          const ok = (!dom || n.data('domain') === dom) && tierRank(n.data('tier')) <= maxRank;
          n.toggleClass('faded', !ok);
        });
        cy.edges().forEach((e) => {
          const vis = !e.source().hasClass('faded') && !e.target().hasClass('faded');
          e.toggleClass('faded', !vis);
          e.toggleClass('hidden', e.hasClass('bridge') && !showBridges);
        });
      });
    };
    dsel && dsel.addEventListener('change', apply);
    tsel && tsel.addEventListener('change', apply);
    btoggle && btoggle.addEventListener('change', apply);
    $('#graph-reset') && $('#graph-reset').addEventListener('click', () => {
      if (dsel) dsel.value = ''; if (tsel) tsel.value = ''; if (btoggle) btoggle.checked = true;
      apply(); cy.animate({ fit: { padding: 34 } }, { duration: reduceMotion ? 0 : 400 });
    });
    // expose for layer-stack cross-filtering
    window.__otheoryFilterTier = (tiers) => {
      const ranks = tiers.map(tierRank); const max = Math.max(...ranks);
      if (tsel) { tsel.value = 'E' + max; }
      apply();
    };
  }
  function showPanel(id) {
    const card = document.getElementById('claim-' + id); const panel = $('#claim-panel');
    if (!panel) return;
    if (!card) { hidePanel(); return; }
    const title = (card.querySelector('.claim-h h4') || {}).textContent || id;
    const badges = (card.querySelector('.badges') || {}).innerHTML || '';
    const rows = $$('.cc-row', card).map((r) =>
      `<span class="cp-k">${r.querySelector('.cc-k').textContent}</span><div class="cp-v">${r.querySelector('.cc-v').innerHTML}</div>`).join('');
    const sources = (card.querySelector('.sources ul') || {}).outerHTML || '';
    panel.innerHTML = `<button class="cp-close" aria-label="Close panel">×</button><div class="badges">${badges}</div><h4>${title}</h4>${rows}<span class="cp-k">Sources</span>${sources}`;
    panel.hidden = false;
    panel.querySelector('.cp-close').addEventListener('click', hidePanel);
  }
  function hidePanel() { const p = $('#claim-panel'); if (p) p.hidden = true; }

  /* ================= CHORD (SVG) ================= */
  function initChord() {
    const host = $('#chord'); if (!host || !art.bridges) return;
    const nodeDomain = {}; (art.nodes || []).forEach((n) => { nodeDomain[n.id] = n.domain; });
    const domains = [...new Set((art.nodes || []).map((n) => n.domain))];
    const N = domains.length; if (!N) return;
    const S = 500, cx = S / 2, cy0 = S / 2, R = S / 2 - 70;
    const pos = {}; domains.forEach((d, i) => { const a = (i / N) * 2 * Math.PI - Math.PI / 2; pos[d] = { x: cx + R * Math.cos(a), y: cy0 + R * Math.sin(a), a }; });
    let ribbons = '';
    (art.bridges || []).forEach((b) => {
      const reg = REGS[b.register] || { color: '#888', style: 'solid' };
      const dash = reg.style === 'dashed' ? '8 7' : reg.style === 'dotted' ? '2 7' : reg.style === 'wavy' ? '3 8' : '0';
      const doms = [...new Set(b.links.map((l) => nodeDomain[l]).filter(Boolean))];
      for (let i = 0; i < doms.length; i++) for (let j = i + 1; j < doms.length; j++) {
        const A = pos[doms[i]], B = pos[doms[j]]; if (!A || !B) continue;
        ribbons += `<path d="M${A.x.toFixed(1)},${A.y.toFixed(1)} Q${cx},${cy0} ${B.x.toFixed(1)},${B.y.toFixed(1)}" fill="none" stroke="${reg.color}" stroke-width="2.4" stroke-dasharray="${dash}" opacity="0.7"><title>${b.title || b.id} — ${reg.label || b.register}</title></path>`;
      }
    });
    let hubs = '';
    domains.forEach((d) => { const p = pos[d]; const c = DOMS[d] || '#889';
      const lx = cx + (R + 22) * Math.cos(p.a), ly = cy0 + (R + 22) * Math.sin(p.a);
      const anchor = Math.cos(p.a) > 0.3 ? 'start' : Math.cos(p.a) < -0.3 ? 'end' : 'middle';
      hubs += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="7" fill="${c}"/>`;
      hubs += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" dominant-baseline="middle" font-size="11" fill="${cssVar('--text-dim') || '#999'}" font-family="system-ui">${d.replace(/-/g, ' ')}</text>`;
    });
    host.innerHTML = `<svg viewBox="0 0 ${S} ${S}" role="img">${ribbons}${hubs}</svg>`;
  }

  /* ================= LAYER STACK ================= */
  function initLayerStack() {
    $$('.layer').forEach((layer) => {
      const head = layer.querySelector('.layer-head');
      head && head.addEventListener('click', () => {
        const collapsed = layer.getAttribute('aria-collapsed') === 'true';
        layer.setAttribute('aria-collapsed', String(!collapsed));
        head.setAttribute('aria-expanded', String(collapsed));
        const tiers = (layer.getAttribute('data-tiers') || '').split(',').filter(Boolean);
        if (!collapsed && window.__otheoryFilterTier && tiers.length) {
          // clicking to focus this layer filters the graph to it
          window.__otheoryFilterTier(tiers);
          $('#rigorous-core') && document.querySelector('.hero').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    });
  }

  /* ================= THREE.js shared ================= */
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
    const ro = () => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
    window.addEventListener('resize', ro); return ro;
  }
  function hex(c) { return new THREE.Color(c); }

  /* ================= GEOMETRY VISUALIZER ================= */
  function initGeometry() {
    const host = $('#geo'); if (!host || typeof THREE === 'undefined' || !hasWebGL) { host && (host.innerHTML = fallback('geometry')); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 9);
    const renderer = makeRenderer(host);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false; controls.autoRotate = !reduceMotion; controls.autoRotate = false;
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const pl = new THREE.PointLight(0xffffff, 0.8); pl.position.set(6, 8, 10); scene.add(pl);

    const groups = { solids: new THREE.Group(), golden: new THREE.Group(), e8: new THREE.Group() };
    Object.values(groups).forEach((g) => scene.add(g));

    // --- Platonic solids ---
    const solidDefs = [
      ['Tetrahedron', new THREE.TetrahedronGeometry(0.95)],
      ['Cube', new THREE.BoxGeometry(1.3, 1.3, 1.3)],
      ['Octahedron', new THREE.OctahedronGeometry(1.05)],
      ['Dodecahedron', new THREE.DodecahedronGeometry(1.05)],
      ['Icosahedron', new THREE.IcosahedronGeometry(1.05)],
    ];
    solidDefs.forEach(([name, geo], i) => {
      const a = (i / solidDefs.length) * Math.PI * 2;
      const mesh = new THREE.Group();
      const face = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x2a3350, transparent: true, opacity: 0.28, metalness: 0.3, roughness: 0.5, flatShading: true }));
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x9db4ff }));
      mesh.add(face); mesh.add(edge);
      mesh.position.set(Math.cos(a) * 3.2, Math.sin(a) * 3.2, 0);
      mesh.userData.spin = 0.004 + i * 0.001;
      groups.solids.add(mesh);
    });

    // --- Golden ratio: nested golden rectangles + spiral + pentagram ---
    (function golden() {
      const phi = (1 + Math.sqrt(5)) / 2; const gmat = new THREE.LineBasicMaterial({ color: 0xffd479 });
      // spiral
      const pts = []; let r = 0.06; for (let t = 0; t < Math.PI * 6; t += 0.12) { r *= Math.pow(phi, 0.12 / (Math.PI / 2)); pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, 0)); }
      groups.golden.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gmat));
      // pentagon + pentagram (φ lives in the diagonal/side ratio)
      const pent = []; for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; pent.push(new THREE.Vector3(Math.cos(a) * 2.4, Math.sin(a) * 2.4, 0)); }
      const pentLoop = pent.concat([pent[0]]);
      groups.golden.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pentLoop), new THREE.LineBasicMaterial({ color: 0x3fd6c0 })));
      const star = [0, 2, 4, 1, 3, 0].map((i) => pent[i]);
      groups.golden.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(star), new THREE.LineBasicMaterial({ color: 0xffd479, transparent: true, opacity: 0.8 })));
    })();

    // --- E8 root system projected to 2D ---
    (function e8() {
      const roots = e8Roots();
      const basis = e8ProjectionBasis();
      const positions = [], colors = [];
      const col = hex(0x9db4ff);
      roots.forEach((v) => {
        let x = 0, y = 0; for (let k = 0; k < 8; k++) { x += v[k] * basis[0][k]; y += v[k] * basis[1][k]; }
        positions.push(x * 1.4, y * 1.4, 0); colors.push(col.r, col.g, col.b);
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const m = new THREE.PointsMaterial({ size: 0.12, map: glowTexture(), transparent: true, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending });
      groups.e8.add(new THREE.Points(g, m));
    })();

    let mode = 'solids';
    const setMode = (m) => { mode = m; Object.entries(groups).forEach(([k, g]) => { g.visible = k === m; }); const cap = { solids: 'The five convex regular polyhedra — a proven theorem since Euclid (claim: platonic-solids-five, E1).', golden: 'The golden ratio φ in the pentagon/pentagram and a logarithmic spiral. The mathematics is E1; the "universal beauty" claim is E6 (golden-ratio-ubiquity).', e8: 'The 240 roots of E8 projected to 2D — settled mathematics (claim: e8-lie-group, E1). Not asserted as physics.' }; const el = $('#geo-caption'); if (el) el.textContent = cap[m]; };
    $$('.geo-btn').forEach((b) => b.addEventListener('click', () => { $$('.geo-btn').forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); setMode(b.dataset.geo); }));
    setMode('solids');
    onResize(host, renderer, camera);
    const animate = () => { groups.solids.children.forEach((m) => { m.rotation.x += m.userData.spin; m.rotation.y += m.userData.spin * 1.3; }); groups.golden.rotation.z += 0.002; groups.e8.rotation.z += 0.0016; };
    if (reduceMotion) { controls.enableDamping = false; controls.update(); renderer.render(scene, camera); }
    else { (function loop() { animate(); controls.update(); renderer.render(scene, camera); requestAnimationFrame(loop); })(); }
  }

  function e8Roots() {
    const roots = [];
    // type 1: (±1,±1,0,...,0) permutations — 112 roots
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) for (const si of [1, -1]) for (const sj of [1, -1]) {
      const v = new Array(8).fill(0); v[i] = si; v[j] = sj; roots.push(v);
    }
    // type 2: (±1/2)^8 with an even number of minus signs — 128 roots
    for (let m = 0; m < 256; m++) {
      let neg = 0; const v = new Array(8);
      for (let k = 0; k < 8; k++) { const bit = (m >> k) & 1; v[k] = bit ? -0.5 : 0.5; if (bit) neg++; }
      if (neg % 2 === 0) roots.push(v);
    }
    return roots; // 240
  }
  function e8ProjectionBasis() {
    // two orthonormal 8D vectors chosen to reveal the root system's symmetry as concentric rings
    const c = (k) => Math.cos((2 * Math.PI * k) / 8 + 0.35), s = (k) => Math.sin((2 * Math.PI * k) / 8 + 0.35);
    let u = [], w = [];
    for (let k = 0; k < 8; k++) { u.push(c(k)); w.push(s(k)); }
    const norm = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
    u = norm(u); w = norm(w);
    return [u, w];
  }

  /* ================= PORTRAIT OF EXISTENCE ================= */
  function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function initPortrait() {
    const host = $('#portrait-canvas'); if (!host || typeof THREE === 'undefined' || !hasWebGL) { host && (host.innerHTML = fallback('portrait')); return; }
    const seedHex = (art.corpusHash || '0').slice(0, 8); const rng = mulberry32(parseInt(seedHex, 16) || 1);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, host.clientWidth / host.clientHeight, 0.1, 200);
    camera.position.set(0, 2, 26);
    const renderer = makeRenderer(host);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.enablePan = false; controls.minDistance = 10; controls.maxDistance = 60;
    const root = new THREE.Group(); scene.add(root);
    const glow = glowTexture();

    // tier geometry parameters (inner→outer): radius, point size, opacity
    const tierCfg = {
      E1: { r: 3.2, size: 0.22, op: 0.95 }, E2: { r: 6.0, size: 0.20, op: 0.6 }, E3: { r: 8.6, size: 0.20, op: 0.5 },
      E4: { r: 11.4, size: 0.34, op: 0.32 }, E5: { r: 14.2, size: 0.26, op: 0.7 }, E6: { r: 17.0, size: 0.16, op: 0.18 },
    };
    const DENSITY = 26; // points per claim
    const anchors = {}; // claim id -> Vector3 (for bridge filaments)
    const shellGroups = {};

    (art.nodes || []).forEach((n) => {
      const cfg = tierCfg[n.tier] || tierCfg.E4; const col = hex(DOMS[n.domain] || '#8a94a6');
      const positions = [], colors = []; let ax = 0, ay = 0, az = 0;
      for (let i = 0; i < DENSITY; i++) {
        // seeded point on a jittered spherical shell
        const u = rng(), v = rng(); const th = Math.acos(2 * u - 1), ph = 2 * Math.PI * v;
        const jitter = (rng() - 0.5) * (cfg.r * 0.14);
        const r = cfg.r + jitter;
        const x = r * Math.sin(th) * Math.cos(ph), y = r * Math.cos(th) * 0.72, z = r * Math.sin(th) * Math.sin(ph);
        positions.push(x, y, z); colors.push(col.r, col.g, col.b);
        if (i === 0) { ax = x; ay = y; az = z; }
      }
      anchors[n.id] = new THREE.Vector3(ax, ay, az);
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      const key = n.tier; (shellGroups[key] = shellGroups[key] || []).push({ g, cfg });
      const wire = (n.tier === 'E2' || n.tier === 'E3');
      const m = new THREE.PointsMaterial({ size: cfg.size, map: glow, transparent: true, opacity: cfg.op, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending });
      root.add(new THREE.Points(g, m));
      if (n.tier === 'E1') { // crystalline anchor for established claims
        const geo = new THREE.IcosahedronGeometry(0.5 + rng() * 0.3, 0);
        const em = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.8 }));
        em.position.set(anchors[n.id].x, anchors[n.id].y, anchors[n.id].z); root.add(em);
      }
    });

    // O-Source core: translucent icosphere + additive glow
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.7, 1), new THREE.MeshBasicMaterial({ color: 0xbfd0ff, transparent: true, opacity: 0.10, wireframe: true }));
    root.add(core);
    (function coreGlow() {
      const pos = [], colr = []; const cc = hex('#eaf0ff');
      for (let i = 0; i < 140; i++) { const r = rng() * 1.6; const th = Math.acos(2 * rng() - 1), ph = 2 * Math.PI * rng(); pos.push(r * Math.sin(th) * Math.cos(ph), r * Math.cos(th), r * Math.sin(th) * Math.sin(ph)); colr.push(cc.r, cc.g, cc.b); }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
      root.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 0.5, map: glow, transparent: true, opacity: 0.55, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending })));
    })();

    // bridge filaments by register
    (art.bridges || []).forEach((b) => {
      const reg = REGS[b.register] || { color: '#888', style: 'solid' }; const col = hex(reg.color);
      const linked = b.links.filter((l) => anchors[l]);
      for (let i = 0; i < linked.length; i++) for (let j = i + 1; j < linked.length; j++) {
        const A = anchors[linked[i]], B = anchors[linked[j]]; const mid = A.clone().add(B).multiplyScalar(0.5).multiplyScalar(0.55);
        const curve = new THREE.QuadraticBezierCurve3(A, mid, B); const pts = curve.getPoints(24);
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        let mat;
        if (reg.style === 'solid') mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.5 });
        else { mat = new THREE.LineDashedMaterial({ color: col, transparent: true, opacity: 0.5, dashSize: reg.style === 'dotted' ? 0.15 : 0.5, gapSize: reg.style === 'dotted' ? 0.35 : 0.5 }); }
        const line = new THREE.Line(g, mat); if (mat.isLineDashedMaterial) line.computeLineDistances(); root.add(line);
      }
    });

    // E8 dust in the core (rigorous anchor)
    (function e8dust() {
      const roots = e8Roots(); const basis = e8ProjectionBasis(); const pos = [], colr = []; const cc = hex('#9db4ff');
      roots.forEach((v) => { let x = 0, y = 0; for (let k = 0; k < 8; k++) { x += v[k] * basis[0][k]; y += v[k] * basis[1][k]; } pos.push(x * 0.9, y * 0.9, (rng() - 0.5) * 0.6); colr.push(cc.r, cc.g, cc.b); });
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(colr, 3));
      const p = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.09, map: glow, transparent: true, opacity: 0.5, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      p.position.y = 0; root.add(p);
    })();

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    onResize(host, renderer, camera);
    let t = 0;
    const animate = () => { t += 0.01; root.rotation.y += 0.0016; const b = 1 + Math.sin(t) * 0.02; root.scale.setScalar(b); core.rotation.y -= 0.003; };
    if (reduceMotion) { controls.enableDamping = false; root.rotation.y = 0.6; controls.update(); renderer.render(scene, camera); }
    else { (function loop() { animate(); controls.update(); renderer.render(scene, camera); requestAnimationFrame(loop); })(); }
  }

  function fallback(kind) {
    return `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-dim);text-align:center;padding:2rem;font-size:0.9rem">This ${kind} visualization needs WebGL, which isn't available in this browser. The underlying claims are all listed above with full provenance.</div>`;
  }

  /* ---------------- boot ---------------- */
  function boot() {
    try { initGraph(); } catch (e) { console.error('graph', e); }
    try { initChord(); } catch (e) { console.error('chord', e); }
    try { initLayerStack(); } catch (e) { console.error('layers', e); }
    try { initGeometry(); } catch (e) { console.error('geometry', e); }
    try { initPortrait(); } catch (e) { console.error('portrait', e); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
