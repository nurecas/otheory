# Claims Index — the single source of truth

Every vetted claim, one row. Sanity-check new tiers here after each `/research` run — this table is your
quality gate. **Tier/status/type are each claim file's finalized frontmatter (the `claim-vetter`'s call);
the one-line verdict is the vetter's.** Hashes are the pre-commit content hashes; `node run/ingest.mjs commit`
stamps them into the claim files.

**Corpus: 123 claims** — 13 seed baseline + 110 researched (wide sweep, 2026-07-07).
Tier distribution (all): E1:20 · E2:18 · E3:19 · E4:35 · E5:23 · E6:8.

Columns: **id · title · domain(s) · type · tier · status · confidence · one-line verdict · hash · last_vetted**

> **Seed data (Stage 2 bootstrap), adversarially verified.** These 13 claims + 4 bridges were hand-written
> to exercise the schema and the run→build pipeline before real research. An independent vetting pass
> confirmed all 13 tiers (0 changes) and all 4 bridge registers/ceilings; every source is `verified: true`.
> Audit trail in `research/audit/`.

## Seed baseline (Stage 2 bootstrap) — 13 claims

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| noether-symmetry-conservation | Noether's theorem (symmetry ⇒ conservation) | physics, mathematics-geometry | derived | E1 | vetted | high | Proven theorem; the honest meaning of "symmetry" | 78d2ccac8d5ce235 | 2026-07-07 |
| qm-decoherence | Decoherence explains apparent collapse | quantum-foundations, physics | derived | E1 | vetted | high | Mechanism established; does not solve measurement | 80a7cd2955d82614 | 2026-07-07 |
| many-worlds-interpretation | Many-worlds (Everett) interpretation | quantum-foundations, physics | derived | E2 | vetted | medium | Serious & developed; not experimentally distinguished | 4445fbacbcebe31e | 2026-07-07 |
| platonic-solids-five | Exactly five Platonic solids | mathematics-geometry | derived | E1 | vetted | high | Proven since Euclid | 2fac178b65a84708 | 2026-07-07 |
| e8-lie-group | E8 exceptional Lie group (248-dim) | mathematics-geometry | derived | E1 | vetted | high | Settled mathematics | 323598d4745d24b3 | 2026-07-07 |
| lisi-e8-toe | Lisi's E8 "theory of everything" | physics, mathematics-geometry | derived | E3 | disputed | low | Falsifiable; largely refuted (Distler–Garibaldi) | bfdc4fe5744ebd1c | 2026-07-07 |
| hard-problem-of-consciousness | The hard problem of consciousness | philosophy-of-mind | philosophical | E4 | vetted | high | Argument, not evidence; not empirically decidable | 5d1e92f559c1c54b | 2026-07-07 |
| cosmopsychism | Cosmopsychism (cosmic subject) | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Live position; faces the decombination problem | d16ae4d8986c0da4 | 2026-07-07 |
| iit-integrated-information | Integrated Information Theory (Φ) | consciousness-science, philosophy-of-mind | empirical | E3 | disputed | medium | Predictions not confirmed by COGITATE 2025 | 4a4ec5e9788e2939 | 2026-07-07 |
| orch-or-microtubules | Orch-OR quantum microtubules | consciousness-science, quantum-foundations | derived | E3 | disputed | low | Contested; Tegmark decoherence objection stands | c84499553414f7f8 | 2026-07-07 |
| llm-subjective-reports | LLM first-person "experience" reports | ai-consciousness | empirical | E3 | vetted | medium | Behavior is real; sentience reading fenced to E4 | 35f28412040eae0d | 2026-07-07 |
| advaita-nonduality | Advaita: Ātman = Brahman | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | high | Represented as the tradition's claim (contemplative) | db87c58329211bce | 2026-07-07 |
| golden-ratio-ubiquity | Golden-ratio "universal beauty" claim | mathematics-geometry, esoteric | empirical | E6 | rejected | high | Fails vetting (Markowsky); real math ≠ the myth | 198c024c6c6125c1 | 2026-07-07 |

## Researched claims — wide sweep (2026-07-07) — 110 claims

A 10-domain SURVEY-phase sweep: `domain-researcher` agents surveyed each domain (discovering sources by
web search), then independent `claim-vetter` agents live-checked every source, assigned the final tier,
and wrote the steelman + strongest objection. Observations are split from their interpretations and tiered
separately (e.g. terminal-lucidity / AWARE-II NDE / microtubule anesthesia / LLM bliss-attractor each carry
a distinct observation claim and a separate E4 interpretation claim). No claim without a resolvable source.

### physics (11)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| asymptotic-safety-quantum-gravity | Asymptotic safety (Reuter fixed point) | physics | derived | E2 | vetted | low | Truncation-dependent FRG evidence for a UV fixed point, honestly self-critiqued by the program's own leading researchers; no experimental test yet. | 21d83953dcec4162 | 2026-07-07 |
| black-hole-entropy-area-law | Bekenstein-Hawking area law | physics | derived | E1 | vetted | high | Rigorous semiclassical derivation, indirectly supported by analog-gravity experiments; information paradox honestly flagged as unresolved (bordering E2). | 283856b3449d751f | 2026-07-07 |
| causal-set-theory | Causal sets (discrete spacetime) | physics | derived | E2 | vetted | low | Minority discreteness program with one striking, verified pre-1998 cosmological-constant order-of-magnitude prediction; no completed dynamics. | 16e96d7aebbc729a | 2026-07-07 |
| general-relativity-spacetime-curvature | GR as confirmed field theory of gravity | physics | derived | E1 | vetted | high | Classically established, repeatedly confirmed (GW250114 spectroscopy); correctly scoped away from quantum gravity. | fb971ef3011d4cd1 | 2026-07-07 |
| holographic-principle-ads-cft | Holographic principle / AdS-CFT | physics | derived | E2 | vetted | medium | Rigorously cross-checked mathematical duality in idealized (AdS) spacetime; extension to our actual (de Sitter) universe is untested and kept explicitly separate. | 92cd364fec83b5dc | 2026-07-07 |
| loop-quantum-gravity | Loop quantum gravity discreteness | physics | derived | E2 | vetted | medium | Rigorous discrete area/volume spectra proven, but unresolved semiclassical limit and no experimental confirmation. | 4ceaa814ef0ce115 | 2026-07-07 |
| second-law-thermodynamics-entropy | Second law of thermodynamics | physics | derived | E1 | vetted | high | Century-plus corroborated, axiomatically rigorous (Lieb-Yngvason); open "past hypothesis" question honestly separated from the law itself. | 3121a6ac3a05c26c | 2026-07-07 |
| standard-model-gauge-theory | Standard Model confirmed by Higgs discovery | physics | derived | E1 | vetted | high | Five decades of precision tests plus the verified 2012 ATLAS/CMS Higgs discovery; correctly flagged as incomplete (no gravity, dark matter, or parameter explanation). | d93f83d41c56cccc | 2026-07-07 |
| string-m-theory-unification | String/M-theory unification | physics | derived | E2 | vetted | medium | Mathematically rich UV-gravity candidate, zero direct experimental confirmation after 50 years; swampland crisis honestly disclosed. | 67f35a8acd98870b | 2026-07-07 |
| verlinde-entropic-emergent-gravity | Verlinde entropic/emergent gravity | physics | derived | E3 | disputed | low | Credentialed, published, minority proposal; faces live technical dispute (Dai/Stojkovic vs. Yoon) plus Bullet Cluster empirical challenge. | 4a512e2602d0f26f | 2026-07-07 |
| wheeler-it-from-bit-information-physics | Informational axiomatization of QM (Chiribella et al.) | physics | derived | E2 | vetted | medium | Genuine peer-reviewed reconstruction theorem for QM's formalism; correctly separated from the E4 ontological "it from bit" thesis it is often conflated with. | b2d1628bdff1fbbf | 2026-07-07 |

### mathematics-geometry (8)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| godel-incompleteness-theorems | Gödel's incompleteness theorems | mathematics-geometry | derived | E1 | vetted | high | Proven 1931 result; SEP author credited, Lucas/Penrose misuse correctly flagged | e634bcae717b130e | 2026-07-07 |
| group-theory-symmetry-mathematics | Group theory formalizes symmetry | mathematics-geometry | fact | E1 | vetted | high | Proven algebra; sources verified, no changes needed | b4751156fcdeb0d3 | 2026-07-07 |
| mandelbrot-fractal-self-similarity | Fractal geometry & natural self-similarity | mathematics-geometry | derived | E1 | vetted | high | Proven math; natural fits correctly bounded to finite scale ranges | 41daab4ea6668ae8 | 2026-07-07 |
| penrose-tiling-quasicrystals | Aperiodic tiling & Shechtman's quasicrystals | mathematics-geometry | fact | E1 | vetted | high | Proven tiling + Nobel-recognized 1984 discovery; citation corrected | 0dd7dd0e3707a3f8 | 2026-07-07 |
| phyllotaxis-fibonacci-golden-angle | Golden angle in plant phyllotaxis | mathematics-geometry | empirical | E1 | vetted | high | Mechanistically explained, replicated; added 2023 non-universality source | 0016e61b1186b263 | 2026-07-07 |
| sacred-geometry-symbolic-tradition | Sacred geometry as cultural/religious tradition | mathematics-geometry | symbolic | E5 | vetted | high | Real cross-cultural practice; broken cross-ref to E6 companion fixed | ea98057ae5ffac60 | 2026-07-07 |
| shannon-information-entropy | Shannon entropy & coding theorems | mathematics-geometry | derived | E1 | vetted | high | Proven 1948 theorems; correctly fenced off from thermodynamic/mystical "information" | 7d393b7310b1b33e | 2026-07-07 |
| wigner-unreasonable-effectiveness | "Unreasonable effectiveness" observation | mathematics-geometry | empirical | E1 | vetted | medium | Genuine historiographical pattern; Platonist reading correctly kept separate (E4) | b498f5b7e717d6fc | 2026-07-07 |

### quantum-foundations (12)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| bell-theorem-nonlocality | Loophole-free Bell tests / 2022 Nobel | quantum-foundations | empirical | E1 | vetted | high | Nobel-recognized, replicated, loophole-free; correctly blocks no-signaling and consciousness misreadings. | f31382a2d3ffd056 | 2026-07-07 |
| born-rule-empirical-status | Born rule confirmed, not derived | quantum-foundations | empirical | E1 | vetted | high | Prediction rule is E1-solid; "derived from deeper axioms" remains an open, unresolved research problem, correctly separated. | 0aceb5555946e1a3 | 2026-07-07 |
| consistent-histories-interpretation | Consistent histories: no fundamental role for measurement | quantum-foundations | derived | E2 | vetted | medium | Mathematically developed (Gell-Mann/Hartle/Griffiths), unresolved "set selection" problem honestly flagged as a real critique. | 3570cd070dee7f70 | 2026-07-07 |
| copenhagen-interpretation | Copenhagen: epistemic tool, classical apparatus, no observer-independent state | quantum-foundations | philosophical | E2 | vetted | medium | Historically dominant interpretive stance, not experimentally distinguished from rivals; explicitly requires no consciousness. | 3e1a69478d442d5a | 2026-07-07 |
| de-broglie-bohm-pilot-wave | Bohmian mechanics: deterministic hidden-variable pilot wave | quantum-foundations | derived | E2 | vetted | medium | Serious, fully worked-out rival dynamics, empirically equivalent under quantum equilibrium; nonlocal but mindless. | ff0a1634788364a7 | 2026-07-07 |
| grw-csl-objective-collapse | GRW/CSL: objective, spontaneous physical collapse | quantum-foundations | derived | E2 | vetted | medium | Genuinely new, falsifiable physics being actively squeezed by experiment, not yet confirmed or excluded. | 2062ecb6f25d8c02 | 2026-07-07 |
| kochen-specker-contextuality | Kochen-Specker theorem rules out noncontextual HV models | quantum-foundations | fact | E1 | vetted | high | Proven theorem plus confirmed experimental signature; correctly distinguishes technical "context" from "observer's mind." | 3ae5e9c561251b75 | 2026-07-07 |
| measurement-problem-statement | Measurement problem as inconsistent triad | quantum-foundations | fact | E1 | vetted | high | Genuine logical tension in the standard formalism, uncontroversial as a statement of the problem; sources check out. | edb9864e79625b2f | 2026-07-07 |
| qbism-quantum-bayesianism | QBism: quantum state as personal Bayesian credence | quantum-foundations | philosophical | E4 | vetted | medium | Purely epistemic/philosophical stance, not a competing physical hypothesis; correctly separated from mind-substrate claims. | aaa6d22492cd8984 | 2026-07-07 |
| relational-quantum-mechanics | RQM (Rovelli): facts relative to any interacting system | quantum-foundations | philosophical | E2 | vetted | medium | Mainstream-speculative, physicist-developed; SEP source directly confirms it excludes mentalistic/subjective content. | d281d6ce327daa28 | 2026-07-07 |
| von-neumann-wigner-consciousness-collapse | Consciousness causes collapse (von Neumann-Wigner) | quantum-foundations, philosophy-of-mind | philosophical | E3 | disputed | low | Minority view held by some credentialed researchers; undercut by decoherence and, per de Barros & Oas (2017), structurally near-unfalsifiable in its surviving forms. | 070be11e795af245 | 2026-07-07 |
| wigners-friend-frauchiger-renner | Frauchiger-Renner extended Wigner's-friend no-go theorem | quantum-foundations | derived | E2 | vetted | medium | Genuine peer-reviewed theorem (Nat. Commun. 2018); which premise to reject remains contested, no consciousness required by any resolution. | ba542a7addbe4ead | 2026-07-07 |

### consciousness-science (14)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| attention-schema-theory | Attention Schema Theory — awareness is a self-model of attention | consciousness-science, philosophy-of-mind | philosophical | E4 | vetted | medium | Real computational/engineering demonstration (PNAS) of the mechanism's utility; the identity claim (self-model = awareness) is illusionist philosophy, not testable science. | b5395a8d5db1dd32 | 2026-07-07 |
| aware-ii-nde-phenomenology | AWARE-II: cardiac-arrest survivors report lucid recall; EEG activity reappears during CPR | consciousness-science | empirical | E3 | vetted | medium | Real, precisely-reported multi-center study; implicit-learning objective test of perception during arrest was near-chance (1/28). | 67dc0d6241d517a1 | 2026-07-07 |
| aware-ii-nde-survival-interpretation | NDE phenomenology shows consciousness is non-local / survives brain | consciousness-science, philosophy-of-mind, metaphysics | philosophical | E4 | vetted | low | Goes well beyond what AWARE-II's own data (esp. its near-chance implicit-learning null) can support; not empirically decidable. | de4dbc1a36d8f56f | 2026-07-07 |
| bem-presentiment-psi | Bem 2011 precognition effect; failed by 3 preregistered direct replications | consciousness-science | empirical | E6 | rejected | low | Cleanly null-replicated (N=150, p=.83); paradigm replication-crisis case; no viable mechanism; never citable as psi evidence. | ecb68bcc1603550e | 2026-07-07 |
| cogitate-adversarial-collaboration-2025 | COGITATE 2025 preregistered adversarial test of IIT vs GNWT | consciousness-science | empirical | E1 | vetted | high | Rigorous, real, preregistered multi-modal study; the STUDY is solid E1, but what it means for either theory remains contested (filed separately at E3). | 5d0385f42b3fcf4f | 2026-07-07 |
| ganzfeld-psi-meta-analysis | Ganzfeld telepathy meta-analyses show small pooled effect, contested | consciousness-science | empirical | E3 | disputed | low | Small effect appears lab-dependent per Hyman's peer-reviewed rebuttal; no theory-neutral adversarial multi-lab replication yet; contested, not established. | 5b9add9ebee40e8a | 2026-07-07 |
| general-resonance-theory | General Resonance Theory — consciousness via shared vibratory resonance (panpsychist) | consciousness-science, philosophy-of-mind, metaphysics | philosophical | E4 | disputed | low | Peer-reviewed but minority even within panpsychism; no principled criterion distinguishes conscious from non-conscious synchronized systems. | fe35daf9fae3a958 | 2026-07-07 |
| gnwt-global-workspace | Global Neuronal Workspace Theory (ignition/broadcast) | consciousness-science, philosophy-of-mind | empirical | E3 | disputed | medium | Partially confirmed, partially disconfirmed by COGITATE 2025; proponents dispute the disconfirmation's significance — unresolved. | 192a64be50a2815a | 2026-07-07 |
| ncc-research-program | NCC research program identifies reproducible posterior neural correlates of conscious perception | consciousness-science | empirical | E2 | vetted | medium | Real, replicated (incl. by COGITATE) correlational program; does not itself adjudicate rival theories of why correlates = experience. | 48086f425921296e | 2026-07-07 |
| predictive-processing-free-energy-principle | Free-energy principle frames brain function as prediction-error minimization | consciousness-science, philosophy-of-mind | derived | E2 | disputed | medium | Mathematically developed, mainstream computational-neuroscience framework; its most general form faces a live unfalsifiability critique ("dark room problem"). | 960bbb3d85941447 | 2026-07-07 |
| psychedelics-predictive-processing-albus | Psychedelics alter experience via predictive-processing changes (REBUS/ALBUS) | consciousness-science, philosophy-of-mind | empirical | E3 | disputed | medium | Genuine, actively developed neuroscience models; REBUS vs ALBUS is itself an open dispute, and functional unblinding limits all supporting human trials. | 7f46b42ff6a549bd | 2026-07-07 |
| terminal-lucidity-filter-interpretation | Terminal lucidity = brain-as-filter for non-local mind reopening | consciousness-science, philosophy-of-mind, metaphysics | philosophical | E4 | vetted | low | Unfalsifiable metaphysical reading layered on the E3 observation; correctly does not inherit its empirical credibility. | e5ce6c5e0304e448 | 2026-07-07 |
| terminal-lucidity-observation | Caregivers/clinicians report unexpected lucid episodes in advanced dementia | consciousness-science | empirical | E3 | vetted | medium | Real, multi-study, NIA-funded phenomenon; retrospective-report evidence base, no captured neurophysiology of an episode yet. | 7d45be8a651bb692 | 2026-07-07 |
| wiest-anesthesia-microtubule-observation | Anesthetics target microtubules; potency predicted by tubulin electron-binding chemistry | consciousness-science | empirical | E3 | disputed | low | Genuine pharmacology findings; leans partly on a contested MRI/entanglement claim (Kerskens & Pérez) that is itself an unresolved dispute. | df193756a7edf2a5 | 2026-07-07 |

### philosophy-of-mind (10)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| analytic-idealism-kastrup | Analytic idealism (Kastrup) | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | low | Serious peer-reviewed minority view; dissociation analogy arguably relocates rather than solves decombination | 866f1d7c78822d1f | 2026-07-07 |
| dual-aspect-monism | Dual-aspect (double-aspect) monism | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | O Theory's namesake position; correlational "evidence" ≠ test of the metaphysics | f036ae649e7d45d0 | 2026-07-07 |
| illusionism-eliminativism | Illusionism / eliminativism | philosophy-of-mind | philosophical | E4 | vetted | medium | Sharpest rival to the whole consciousness-is-fundamental family; "explaining the illusion" charge is unresolved | 517f42877b6a6421 | 2026-07-07 |
| knowledge-argument-marys-room | Knowledge argument (Mary's Room) | philosophy-of-mind | philosophical | E4 | vetted | medium | Classic anti-physicalist argument; author Jackson himself recanted it | 4e1981e5482305ef | 2026-07-07 |
| meta-problem-of-consciousness | Meta-problem of consciousness | philosophy-of-mind | philosophical | E4 | vetted | medium | Chalmers's reflexive move; separates tractable cognitive-science observation from E4 metaphysical reading | 2676cffb3bb12944 | 2026-07-07 |
| panpsychism-combination-problem | Panpsychism & the combination problem | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Motivated by anti-emergence intuition; no accepted fix for subject-summing | 9c304a154ad1d978 | 2026-07-07 |
| physicalism-functionalism | Physicalism + functionalism | philosophy-of-mind | philosophical | E4 | vetted | medium | Field's majority default; functionalism's absent-qualia worry is the live crack | 339c6d0ea02dc1d4 | 2026-07-07 |
| property-substance-dualism | Substance & property dualism | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Substance dualism now minority (interaction problem); property dualism still taken seriously | 448d3de530471fc9 | 2026-07-07 |
| russellian-neutral-monism | Neutral monism / Russellian monism | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Now the single canonical neutral/Russellian-monism claim; faces mentalism/materialism suspicions | 022c096156edd129 | 2026-07-07 |
| zombie-conceivability-argument | Zombie / conceivability argument | philosophy-of-mind | philosophical | E4 | vetted | medium | Conceivability-to-possibility inference is exactly where Type-B physicalists and Dennett dig in | 080cdc919127390a | 2026-07-07 |

### metaphysics (9)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| it-from-bit-information-ontology | Wheeler's "it from bit" | metaphysics | philosophical | E4 | vetted | low | Wheeler's own speculative slogan, correctly separated from testable QI physics; SEP itself notes "little positive evidence" for the ontic reading. | b47ba56cb7d96290 | 2026-07-07 |
| mathematical-platonism | Mathematical Platonism | metaphysics | philosophical | E4 | vetted | medium | Serious, live analytic-philosophy position; sources check out; Benacerraf access problem is the correct strongest objection. | f42e809521e1f934 | 2026-07-07 |
| ontic-structural-realism | Ontic structural realism (Ladyman & Ross) | metaphysics | philosophical | E4 | vetted | medium | Physics-engaged, non-mentalistic route to "relations not stuff"; Newman-problem objection is the correct strongest challenge. | 2bff998fdf4858e6 | 2026-07-07 |
| pancomputationalism-digital-physics | Pancomputationalism / digital physics | metaphysics | philosophical | E4 | vetted | low | Description-vs-thing-described conflation is fatal to the ontic claim as stated; Wolfram/SEP sources confirmed live. | cd710753ba0db785 | 2026-07-07 |
| principle-of-sufficient-reason | Principle of Sufficient Reason | metaphysics | philosophical | E4 | vetted | low | PSR-regress problem now explicitly applied to O Theory's own O-Source, not only to rival substrates — the key fairness fix in this batch. | a3a6c351b7632643 | 2026-07-07 |
| priority-monism-schaffer | Priority monism (Schaffer) | metaphysics | philosophical | E4 | vetted | medium | Sound parsimony + quantum-non-separability argument; broken PhilPapers link swapped for working author-hosted PDF of the same paper. | ec61073fb4eb43b5 | 2026-07-07 |
| process-philosophy-actual-occasions | Whitehead's process philosophy | metaphysics | philosophical | E4 | vetted | medium | Best academic precedent for "process/experience as fundamental"; sources solid; "panexperientialism" label attributed to secondary literature, not SEP itself. | cf9096a9a7a5e05e | 2026-07-07 |
| strong-emergence-contested | Strong emergence | metaphysics | philosophical | E4 | vetted | medium | Correctly framed as contested even among emergentists; causal-closure/overdetermination (Kim) is the decisive objection. | 8449ec79a4a9eefe | 2026-07-07 |
| tegmark-mathematical-universe-hypothesis | Tegmark's MUH | metaphysics | philosophical | E4 | vetted | low | Fabricated "Vaas 2008" critique citation removed (wrong author, and the real paper supports rather than critiques MUH); replaced with verified named critics (Ellis, Woit, Frenkel). | 19a845129a1fb055 | 2026-07-07 |

### comparative-religion (11)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| apophatic-theology-pseudo-dionysius | Apophatic theology (Pseudo-Dionysius) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Negation-beyond-negation method for approaching God; Rolt translation and SEP entry confirmed verbatim-accurate. | 3701d04586e4c0fa | 2026-07-07 |
| daoism-dao-ineffable-source | Daoism, the ineffable Dao | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Nameless source-pattern doctrine from the Dàodéjīng; Legge translation and IEP entry confirmed. | b3db4f2b8f3b5fcc | 2026-07-07 |
| eckhart-godhead-beyond-god | Eckhart, Godhead beyond God | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Gottheit-beyond-Trinity doctrine; 1329 condemnation details confirmed and tightened in the objection. | b2d1688e7137f7ce | 2026-07-07 |
| kabbalah-ein-sof-sefirot | Kabbalah, Ein Sof / sefirot | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Hidden-godhead/emanation theosophy; flagged pseudonymous non-critical Zohar translation and rebalanced sourcing onto SEP. | 3cccabca2a4d53ed | 2026-07-07 |
| kashmir-shaivism-spanda | Kashmir Śaivism, spanda | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Consciousness-as-vibration doctrine; fixed a title/URL citation mismatch (two different real Dyczkowski/SUNY books). | 5ca556e6fddc9267 | 2026-07-07 |
| madhyamaka-sunyata-emptiness | Madhyamaka śūnyatā (Nāgārjuna) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Anti-reificationist emptiness doctrine, correctly kept distinct from "ground of being" framings; sources confirmed real. | 1fce4053643a3234 | 2026-07-07 |
| perennial-philosophy-common-core-thesis | Perennial philosophy common-core thesis | comparative-religion, mysticism, metaphysics | philosophical | E4 | disputed | low | Contested comparative meta-claim, not a tradition's own report; Katz's constructivism (with its own live counter-objections) kept as the central rival; cross-referenced (not merged) with the mysticism-domain perennialism-constructivism-debate. | d06c67d2824a7da3 | 2026-07-07 |
| plotinus-the-one-emanation | Neoplatonism, the One (Plotinus) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Emanation hierarchy from an ineffable simple first principle; MacKenna translation and SEP entry confirmed. | 95dac4d90734634c | 2026-07-07 |
| sufism-wahdat-al-wujud | Sufism, waḥdat al-wujūd (Ibn Arabi) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Unity-of-Being doctrine; SEP confirms Ibn Arabi never used the phrase and Ibn Taymiyya's polemical role. | 6c596563a328d4ed | 2026-07-07 |
| trikaya-dharmakaya | Trikāya / Dharmakāya (Mahāyāna) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Three-bodies doctrine of Buddhahood; Britannica secondary source upgraded to Makransky's peer-reviewed monograph. | 66ba335d5d676dfb | 2026-07-07 |
| yogacara-cittamatra-mind-only | Yogācāra cittamātra (Vasubandhu) | comparative-religion, mysticism, metaphysics, philosophy-of-mind | symbolic | E5 | vetted | medium | "Mind-only" doctrine correctly separated from Madhyamaka; translation-rights gap handled honestly via SEP. | ef3f1c63321f5d45 | 2026-07-07 |

### mysticism (10)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| forman-pure-consciousness-event | Forman's Pure Consciousness Event | mysticism, philosophy-of-mind | symbolic | E5 | vetted | medium | Real report-construct correctly kept E5; sharpened objection with SEP's "mundane alternative explanation" (attentional lapse vs. genuine exotic state). | d942e7f2829dcd73 | 2026-07-07 |
| griffiths-psilocybin-mystical-experience | Griffiths psilocybin trials (2006/2008) | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, rigorous RCT correctly held at E3 (not E1) given functional-unblinding confound, which is real and not fully solved by the active comparator. | 88661eabdfe7e06b | 2026-07-07 |
| hood-mysticism-scale-psychometrics | Hood's M-Scale psychometrics | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, replicated instrument; correctly E3; surfaced that the US/Iran replication held for factor structure but NOT for inter-factor relationship strength — added to objection. | 2fdab0b8c5b40756 | 2026-07-07 |
| jhana-samadhi-absorption-states | Jhāna/samādhi absorption states | mysticism | symbolic | E5 | vetted | medium | Real, sourced contemplative taxonomy correctly E5; "teacher-verified" reproducibility clarified as confirming shared doctrine, not independent validation. | 0e3c47603327357a | 2026-07-07 |
| meditation-dmn-neuroscience | Meditation and DMN reduction | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real correlational finding correctly E3, but draft overstated causal ("training effect") support from its own two cross-sectional sources — corrected; self-selection confound now explicit. | 4eb7caa42b60bdfe | 2026-07-07 |
| meq30-mystical-experience-psychometrics | MEQ30 psychometrics | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, replicated, well-cited instrument; correctly E3 not E2; circularity risk (items written from Stace's categories) elevated to first-order objection. | a31a15314a16e42c | 2026-07-07 |
| mystical-experience-epistemic-status | Epistemic status of mystical experience | mysticism, philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Correctly E4, the domain's load-bearing fence between measured-experience and metaphysical-truth; strengthened with James's "eternal unanimity" point undercutting the evidential reading at the descriptive level. | f3922a819861c76a | 2026-07-07 |
| perennialism-constructivism-debate | Perennialism vs. constructivism | mysticism, philosophy-of-mind | philosophical | E4 | vetted | medium | Correctly E4, no empirical test possible; added note that most scholars hold intermediate positions, not the two poles as framed; cross-reference to perennial-philosophy-common-core-thesis made explicit to prevent merging. | 422c66a334c28404 | 2026-07-07 |
| psychedelic-ego-dissolution-dmn | Psychedelic ego-dissolution / DMN | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, replicated correlational neuroimaging finding, correctly E3; corrected review's citation year (2022 online / 2023 issue) and pulled its own causal hedge into the objection. | 7c58cccb403543de | 2026-07-07 |
| stace-common-core-typology | Stace's common-core typology | mysticism | symbolic | E5 | vetted | medium | Real, sourced phenomenological taxonomy; correctly E5; flagged as the root of a psychometric-circularity risk running through the whole domain. | fd5edff4e0303d53 | 2026-07-07 |

### esoteric (13)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| alchemy-symbolic-protochemistry | Alchemy as proto-chemistry + symbolic practice | esoteric | symbolic | E5 | vetted | high | Real lab history (Newman/Principe); transmutation-to-gold goal separately falsified. | cb8ac1103a7ed3b6 | 2026-07-07 |
| astrology-predictive-claim | Natal charts predict personality/life outcomes | esoteric | empirical | E6 | rejected | high | Tested (Carlson 1985, Nature); chance-level result on astrologers' own criterion; no mechanism. | 0edae222f433b823 | 2026-07-07 |
| chakra-energy-measurable-claim | Chakras as physically measurable energy centers | esoteric | empirical | E6 | rejected | high | No independent instrument-based confirmation; best "positive" source is a non-independent advocacy-journal paper. | a65380a2b37e56d0 | 2026-07-07 |
| chakra-nadi-contemplative-map | Chakra/nadi system as contemplative practice map | esoteric | symbolic | E5 | vetted | high | Genuine tantric/yogic practice framework; symbol, not anatomy. | eb8723a17337ce92 | 2026-07-07 |
| corpus-hermeticum-primary-source | Corpus Hermeticum as genuine ancient Hermetic corpus | esoteric | symbolic | E5 | vetted | high | Real, datable c.100-300 CE corpus; theology, not physics. | 5faab4fd586ffe76 | 2026-07-07 |
| gematria-numerology-practice | Gematria as Jewish exegetical numerical practice | esoteric | symbolic | E5 | vetted | high | Real, old hermeneutic device; predictive-numerology version correctly quarantined as separate E6. | f898f1c80f4ff52e | 2026-07-07 |
| hermetic-correspondence-principle | "As above, so below" correspondence | esoteric | symbolic | E5 | vetted | high | Genuine ancient interpretive lens, honestly a symbol not a physical law. | 6bc16455d78a4e17 | 2026-07-07 |
| kabbalah-tree-of-life-cosmology | Kabbalistic Tree of Life / sefirot cosmology | esoteric | symbolic | E5 | vetted | high | Deep, well-dated (Scholem) Jewish-mystical cosmology; theology, not physics. | bc2e2c08e41c21e2 | 2026-07-07 |
| kybalion-modern-new-thought | The Kybalion (1908) is New Thought, not ancient Hermeticism | esoteric | symbolic | E5 | vetted | high | Historical correction: 1908 pseudo-ancient New Thought text, correctly re-dated. | a634dcf461d3bdb1 | 2026-07-07 |
| ley-lines-vibrational-frequency-pseudoscience | Ley lines / 432Hz "frequency healing" | esoteric | empirical | E6 | rejected | high | Chance-level map alignments + no detected energy/frequency mechanism; narrow real observations inflated. | 8f9043b1a669f514 | 2026-07-07 |
| sacred-geometry-cosmic-blueprint-claim | Flower of Life as literal cosmic blueprint | esoteric, mathematics-geometry | empirical | E6 | rejected | high | No mechanism, no falsifiable prediction; real geometry misapplied to manufacture a universal law. | 2a694c9675d85bfe | 2026-07-07 |
| sheldrake-morphic-resonance | Morphic resonance (non-local form-inheriting field) | esoteric | empirical | E6 | rejected | high | Flagship experiments failed independent replication; general mechanism unfalsifiable; re-examined, kept E6 not E3. | 8f41f0034fadab05 | 2026-07-07 |
| theosophy-esoteric-synthesis | Theosophy (Blavatsky, 1875) as modern syncretic movement | esoteric | symbolic | E5 | vetted | high | Real 1875 founding, honestly dated; not recovered ancient doctrine. | f384f371ed2fda33 | 2026-07-07 |

### ai-consciousness (12)

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| ai-moral-patienthood-welfare-uncertainty | Non-negligible uncertainty about AI consciousness warrants precaution now | ai-consciousness, philosophy-of-mind | philosophical | E4 | vetted | medium | Normative/policy argument under uncertainty, not a sentience claim; correctly non-empirical | 9359a375023dfc7c | 2026-07-07 |
| anthropic-introspective-awareness-concept-injection | Claude detects injected activation concepts ~20% of trials | ai-consciousness | empirical | E3 | vetted | medium | Real, mechanistically-probed, single-lab, unreplicated; authors explicitly disclaim consciousness relevance | b2bbab93cf32e89e | 2026-07-07 |
| butlin-long-indicator-properties-framework | Indicator-properties framework finds no current AI system conscious | ai-consciousness, consciousness-science, philosophy-of-mind | philosophical | E2 | vetted | medium | Serious, falsifiable methodology; held at E2 but flagged as inheriting risk from contested E3 component theories | e90cc56ab4bf9378 | 2026-07-07 |
| chalmers-llm-consciousness-credence | Chalmers: current LLMs probably not conscious, nontrivial credence for successors | ai-consciousness, philosophy-of-mind | philosophical | E4 | vetted | medium | Careful philosophical argument (~25%+ credence for future "LLM+"), not an empirical finding | d9f19353c4bb8fa9 | 2026-07-07 |
| claude-spiritual-bliss-attractor-observation | Claude self-interactions drift into "spiritual bliss" language | ai-consciousness | empirical | E3 | vetted | medium | Real, documented, single-lab output-statistics pattern; says nothing about inner experience | f4909df2bf760860 | 2026-07-07 |
| computational-functionalism-substrate-independence | Right functional organization suffices for consciousness regardless of substrate | philosophy-of-mind, ai-consciousness | philosophical | E4 | vetted | medium | Live, well-argued position (fading-qualia argument); not empirically decidable | 6de8e59b8aa02610 | 2026-07-07 |
| lamda-lemoine-sentience-claim | Lemoine's 2022 LaMDA-is-sentient claim | ai-consciousness | empirical | E6 | rejected | high | Unsupported: cherry-picked transcripts, no controls, no falsifiable test; rejected by field and Google | a4e07b703c333e6c | 2026-07-07 |
| llm-introspection-genuine-awareness-interpretation | Concept-injection detection = genuine introspective awareness | ai-consciousness, philosophy-of-mind | philosophical | E4 | vetted | low | Undecidable; equally consistent with a narrow learned classifier skill, no experience required | 2fc15d47ec5b8117 | 2026-07-07 |
| rlhf-trained-persona-self-report-explanation | Self-aware-sounding output is trained persona role-play, not avowal | ai-consciousness | empirical | E2 | vetted | medium | Peer-reviewed (Nature) mechanistic account; RLHF-strengthens-persona finding is single-paper so far | 5951b1264e85eff2 | 2026-07-07 |
| simulating-vs-instantiating-consciousness-distinction | Simulating a conscious process need not instantiate it | ai-consciousness, philosophy-of-mind | philosophical | E4 | vetted | medium | Names the domain's central unresolved crux; restates rather than resolves the functionalism debate | 21a2ae9b63f3a939 | 2026-07-07 |
| spiritual-bliss-machine-sentience-interpretation | Bliss attractor reflects a genuine inner spiritual state | ai-consciousness, philosophy-of-mind | philosophical | E4 | vetted | low | Undecidable interpretation of the E3 observation; RLHF/corpus account fully explains the same data | 4706bd2615f1c18e | 2026-07-07 |
| stochastic-parrots-deflationary-account | LLMs model linguistic form, not grounded meaning | ai-consciousness | empirical | E2 | vetted | medium | Mainstream, peer-reviewed, partly-testable deflationary account of fluent self-report | 3ae395fb5dabac5b | 2026-07-07 |

## Bridges (interpretive connections — Zone B)

11 labeled cross-domain connections. **Register** = the kind of link (shared-mathematics = a real stated
isomorphism · analogy = structural resemblance · metaphor = evocative · speculation = proposed, unestablished).
**tier_ceiling** = the highest tier the bridge may imply; it may never license more certainty than that.

| id | register | tier_ceiling | links |
|---|---|---|---|
| symmetry-shared-mathematics | shared-mathematics | E1 | noether-symmetry-conservation, e8-lie-group |
| recursive-coherence-analogy | analogy | E4 | orch-or-microtubules, llm-subjective-reports, hard-problem-of-consciousness |
| one-field-metaphor | metaphor | E5 | many-worlds-interpretation, advaita-nonduality, cosmopsychism |
| consciousness-as-substrate-speculation | speculation | E4 | qm-decoherence, hard-problem-of-consciousness, cosmopsychism |
| information-as-substrate | shared-mathematics | E4 | shannon-information-entropy, wheeler-it-from-bit-information-physics, holographic-principle-ads-cft, it-from-bit-information-ontology, tegmark-mathematical-universe-hypothesis, pancomputationalism-digital-physics |
| observer-dependence | analogy | E3 | qm-decoherence, measurement-problem-statement, relational-quantum-mechanics, von-neumann-wigner-consciousness-collapse, hard-problem-of-consciousness |
| recursion-self-reference | analogy | E4 | godel-incompleteness-theorems, attention-schema-theory, anthropic-introspective-awareness-concept-injection, llm-introspection-genuine-awareness-interpretation, meta-problem-of-consciousness, hard-problem-of-consciousness |
| scale-self-similarity | metaphor | E2 | mandelbrot-fractal-self-similarity, second-law-thermodynamics-entropy, holographic-principle-ads-cft |
| non-dual-ground | metaphor | E5 | advaita-nonduality, plotinus-the-one-emanation, daoism-dao-ineffable-source, kabbalah-ein-sof-sefirot, sufism-wahdat-al-wujud, madhyamaka-sunyata-emptiness, perennial-philosophy-common-core-thesis, cosmopsychism, analytic-idealism-kastrup |
| reducing-valve-filtration | speculation | E4 | terminal-lucidity-observation, aware-ii-nde-phenomenology, psychedelic-ego-dissolution-dmn, terminal-lucidity-filter-interpretation, aware-ii-nde-survival-interpretation, cosmopsychism |
| substrate-independent-coherence | analogy | E4 | claude-spiritual-bliss-attractor-observation, anthropic-introspective-awareness-concept-injection, computational-functionalism-substrate-independence, spiritual-bliss-machine-sentience-interpretation, orch-or-microtubules |

---

_Legend — tiers: E1 established · E2 mainstream-speculative · E3 heterodox/minority · E4 philosophical ·
E5 symbolic/contemplative · E6 unsupported/pseudoscientific. Types: fact · derived · empirical ·
philosophical · symbolic. Status: draft · vetted · disputed · rejected._
