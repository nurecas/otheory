# Red-team audit — wide sweep (123 claims + 11 bridges)

**Auditor:** `skeptic-auditor` (final adversarial gate). **Date:** 2026-07-07.
**Scope:** jobs 1 (over-claim / laundering audit of synthesis), 2 (bridge register/ceiling honesty),
4 (consistency checks). Citation spot-check (job 3) is in `citations-wide-sweep.md`.
**Method:** read `CLAUDE.md`, `claims-index.md`, all five synthesis files, all 11 bridge files, and the
per-domain vet audits; cross-referenced every bridge link id against the index; independently re-derived
each bridge's register/ceiling; line-checked abstract/framework/open-problems/predictions for
tier-laundering and vocabulary violations.

## Headline

The synthesis is unusually disciplined. The observation/interpretation split is enforced everywhere I
checked; no E6 claim does load-bearing work; the vocabulary rules ("proof"/"evidence"/"argument"/"symbol")
are respected; every falsifiability entry in `predictions.md` is honest and the non-falsifiable theses are
correctly excluded. The register/ceiling labels on the bridges are, in my judgment, honest — including the
one flagged as the top suspect (`information-as-substrate`), which I rule DEFENSIBLE with one required
wording fix. **No CRITICAL findings.** The findings below are MAJOR/MINOR precision and consistency fixes.

- **CRITICAL: 0**
- **MAJOR: 2**
- **MINOR: 5**

---

## Job 2 — the `information-as-substrate` register ruling (top suspect)

**Ruling: the `register: shared-mathematics, ceiling: E4` label is DEFENSIBLE and should stand — but the
title and one narrative phrase must be tightened so the shared-mathematics register cannot be read as
covering the E4 ontology. This is MAJOR-1 below (a wording fix), not a CRITICAL.**

Why it is not laundering as currently written:

1. The narrative does *not* claim shared-mathematics reaches E4. It says the opposite, explicitly and in
   capitals: "the register drops the instant the story crosses from 'information is the right mathematics'
   to 'information IS the ground of being'" and "the ceiling is E4, and it is E4 by the philosophy, not the
   physics." The `register` field names the kind of link at its *strongest* point (the Shannon/QM-
   reconstruction/holography mathematics, which genuinely IS shared mathematics); the `tier_ceiling` is the
   separate governor that caps what the bridge may *imply*. The two fields do different jobs, and the
   narrative repeatedly forbids the ontology from inheriting the math's standing ("MUST NOT inherit their
   standing for the E4 metaphysics built on top").

2. The three E1/E2 links (`shannon-information-entropy` E1, `wheeler-it-from-bit-information-physics` E2,
   `holographic-principle-ads-cft` E2) really do share literal mathematics — entropy, distinguishability,
   bit-counting. That is a true shared-mathematics claim at that layer. The three E4 links
   (`it-from-bit-information-ontology`, `tegmark-mathematical-universe-hypothesis`,
   `pancomputationalism-digital-physics`) are each named as speculation carrying a fatal-or-open objection.

3. So the register is honest *about the part it labels*. The residual risk is purely presentational: a
   reader who reads only the `register:` field and the bridge title — and not the narrative — could come
   away thinking "shared mathematics" underwrites the whole chain up to MUH/pancomputationalism. The
   CLAUDE.md rule is "label it every time"; a single bridge that mixes a real isomorphism with an E4 leap
   should make the register's *scope* unmissable at the label level, not only in the body.

**Verdict:** keep `shared-mathematics` (it is the accurate name for the real link) but scope it in the
label. Do not change it to speculation/analogy — that would *understate* the genuine Shannon/QM/holography
isomorphism, which would be its own (opposite) laundering. See MAJOR-1 for the exact fix.

---

## MAJOR findings

### MAJOR-1 — `information-as-substrate` register needs scope-marking at the label/title level
- **File/line:** `research/synthesis/bridges/information-as-substrate.md:5-6` (`register`/`tier_ceiling`)
  and `:3` (title); echoed in `research/synthesis/framework.md:167-168`.
- **Problem:** the `register: shared-mathematics` field is correct for the E1/E2 core but, read alone
  (as the build's filament-styler and any label-only reader will), it appears to license the full chain up
  to the E4 ontology. The narrative fixes this in prose, but the register field itself carries no scope
  marker, and this is the one bridge in the corpus where a single register label spans a real isomorphism
  AND an ontological leap. That is exactly the "lower-tier claim doing higher-tier work" risk the label
  system exists to prevent.
- **Fix (either is sufficient):** (a) keep `register: shared-mathematics` but add an explicit scope note in
  the field/title, e.g. title → "...shared-mathematics up to the technical results; the 'it from bit'
  ontology is speculation (E4)" and, in the framework line, render it as it already partly is
  ("shared-mathematics **up to the technical results**, ceiling E4 — the ontic step is speculation"); OR
  (b) split into two bridges — an E2-ceiling `information-shared-mathematics` (Shannon/QM-recon/holography)
  and an E4-ceiling `information-as-ontology-speculation` (it-from-bit/MUH/pancomputationalism). Option (a)
  is the lighter fix and preserves the honest observation that the ontology *grows out of* the math.
- **Severity rationale:** MAJOR not CRITICAL because the narrative already forbids the laundering
  unambiguously and the ceiling is correctly E4; the gap is that the *label* alone under-communicates the
  scope. It becomes load-bearing only if the page surfaces the register without the narrative.

### MAJOR-2 — bridge count is stated as "ten" but there are eleven
- **File/line:** `research/synthesis/framework.md:164` ("Ten labeled cross-domain bridges") and `:195`
  ("ten honestly-labeled bridges"); `research/synthesis/existence-prompt.md:9` ("bridge set expanded
  4 → 10 filaments") and `:70`-region prose implying a 10-filament thread count.
- **Problem:** the index bridges table (`claims-index.md:210-222`) and the bridges directory both contain
  **11** bridges. The framework's own bullet list (`framework.md:166-184`) actually enumerates all 11 —
  but bundles `one-field-metaphor` and `non-dual-ground` onto a single line (`:183-184`), producing a
  visual "ten bullets" that the count sentence then repeats as "ten." The `changed_this_run` note
  "4 → 10" is likewise off by one (seed had 4 bridges; wide sweep has 11, i.e. 4 → 11).
- **Fix:** change "Ten" → "Eleven" at `framework.md:164` and `:195`; change "4 → 10" → "4 → 11" at
  `existence-prompt.md:9`; either give `one-field-metaphor` its own bullet or keep the bundle but make the
  count sentence say eleven. The art render contract (`existence-prompt.md:89`, "Count ∝ bridges per
  register") is fine as written since it is proportional, not a hard number — but the prose "10 filaments"
  should read 11.
- **Severity rationale:** MAJOR because it is a factual miscount of a load-bearing structural quantity that
  appears in three files and would be visible/checkable on the published page and in the generated art
  metadata. Not CRITICAL: it is a counting/consistency error, not a tier or laundering violation, and no
  claim's standing is misrepresented by it.

---

## MINOR findings

### MINOR-1 — abstract could name the bridge count / "ten vs eleven" consistently
- **File/line:** `research/synthesis/abstract.md` (no explicit bridge count given). Not wrong, but once
  MAJOR-2 is fixed, confirm the abstract does not later acquire a stale "ten." Currently clean.

### MINOR-2 — `scale-self-similarity` register field says `metaphor` while narrative earns E2 from real physics
- **File/line:** `research/synthesis/bridges/scale-self-similarity.md:5-6`, `:19-21`.
- **Problem:** the `register: metaphor` with `tier_ceiling: E2` is defensible (the reach TO O Theory is
  metaphor; the E2 ceiling is "earned by renormalization/holography as real scale-dependent physics"), but
  the pairing of a metaphor register with an E2 (mainstream-speculative) ceiling is the only place in the
  corpus where a *metaphor* is allowed to imply E2 rather than E5. The narrative justifies it correctly,
  but a label-only reader sees "metaphor, E2" and may read the metaphor as reaching E2. Consider a scope
  note ("metaphor at the O-Theory end; the E2 ceiling belongs only to the renormalization/holography
  physics, which is not itself the O-Theory recursion claim"). The framework line (`framework.md:169-170`)
  already hedges this ("metaphor where O Theory overreaches, ceiling E2") — acceptable as-is, flagged for
  awareness only.

### MINOR-3 — framework "spine" paragraph phrase "many traditions reach for one undivided ground"
- **File/line:** `research/synthesis/framework.md:192-193`.
- **Problem:** "a symbolic layer where many traditions reach for one undivided ground while at least one
  (Madhyamaka) refuses to" is accurate and even names the dissent — but the phrase "reach for one undivided
  ground" mildly pre-frames the E5 traditions as converging, which is the very perennialist reading
  `open-problems.md#7` and the `non-dual-ground` bridge take pains to mark as contested (E4). It stops short
  of asserting agreement (it says "reach for," and immediately names Madhyamaka's refusal), so this is not a
  laundering violation. Suggest "many traditions *use* the image of one undivided ground" to fully avoid
  implying they reach the *same* one. MINOR / stylistic.

### MINOR-4 — abstract line 29 "the seams are labeled, and where the seams do not actually hold ... the page says so"
- **File/line:** `research/synthesis/abstract.md:28-30`.
- **Problem:** strong, good framing; verify at build time that the two named non-holding seams
  ("the QM→consciousness bridge; the claim that the traditions all agree") are actually surfaced on the
  rendered page (they are in `open-problems.md#4` and `#7`, so the content exists). This is a
  build-surfacing reminder, not a defect in the prose. MINOR.

### MINOR-5 — `predictions.md` row 2 falsifier uses "~10⁻¹³ s" (Tegmark) without in-row tier caveat on the number
- **File/line:** `research/synthesis/predictions.md:14`.
- **Problem:** the Tegmark decoherence-timescale figure is presented as the falsifier for Orch-OR's
  coherence prediction. The figure is standard and correctly attributed ("Tegmark"), and the row is
  labeled "(`orch-or-microtubules`, E3)". No fix strictly required. Flagged only so the build does not
  render the number as a settled physical constant divorced from its (contested) modeling assumptions —
  the claim file already carries that nuance. MINOR / build-surfacing.

---

## Job 1 — over-claim / laundering audit: line-level results (no CRITICALs)

**Abstract** (`abstract.md`): clean. Explicitly says "This is **not** a claim that 'science proves' a
grand unity" (`:18`); names its own tier distribution as "the honest headline"; states O Theory is a
"Layer-4 philosophical proposal" (`:32`) and reaches other layers "by explicitly labeled bridges, not by
promotion." The observation/interpretation discipline is stated (`:55-57`). No use of "proof/confirms/shows"
for non-E1 material. E6 correctly described as "load-bearing for nothing" (`:28`). PASS.

**Framework** (`framework.md`): Layer 1 is "the only layer entitled to the word 'fact'" (`:19`). Layer 2
"None of this is 'shown.'" (`:46`). Layer 3 states "an observation's E3 standing does not transfer to any
reading of it" (`:70`). Layer 4 correctly parks O Theory itself and the split interpretations. Layer 5
"never as physics." E6 section "load-bearing for nothing, never cited as support." The one substantive
defect is the "ten"/"eleven" miscount (MAJOR-2). No tier-laundering, no register mislabel in the prose,
no "proof" misuse. PASS (with MAJOR-2).

**Open-problems** (`open-problems.md`): exemplary. #4 explicitly states the QM→consciousness bridge "rests
on a single, weak claim" (von Neumann–Wigner, E3, disputed) and that the physics observer "is a measurement
interaction, **not** a mind." #6 foregrounds illusionism as "the sharpest rival." #7 states the traditions
do NOT all agree and that Madhyamaka "explicitly resists" reification. #8 turns the PSR regress on O
Theory's own O-Source. #12 states the competing metaphysics are "mutually exclusive... competitors" and
that "O Theory cannot lean on all of them at once." #13 names "the standing cross-register temptation"
directly. This is the anti-laundering ledger doing exactly its job. PASS.

**Predictions** (`predictions.md`): the gate is stated up front — "a passed test does not by itself promote
the theory's tier" and "none of these tests would confirm O Theory's metaphysics" (`:8-9`). Every listed
prediction has confirm/falsify/feasibility and a source tier. The "Explicitly NOT predictions" block
correctly excludes the filter interpretation, machine-experience readings, von Neumann–Wigner, the FEP's
general form, all E4 metaphysics, and all E5 symbol — with the falsifiability rule cited. The closing
paragraph states the core O-Theory theses "generate no entry in this table, and that is the honest result,
not a gap to be filled with borrowed physics." PASS.

---

## Job 2 — remaining bridge register/ceiling checks (all HONEST)

- **`observer-dependence`** (analogy, E3): PASS. States in caps "the physics observer is NOT a mind,"
  names decoherence dissolving the motivation, the quantum Zeno falsification of naive versions (Chalmers &
  McQueen 2022), and de Barros & Oas (2017) near-unfalsifiability. Cannot be read as support for
  consciousness-causes-collapse; it is built to block that reading. Ceiling E3 = the standing of its single
  supporting claim (von Neumann–Wigner). Honest.
- **`reducing-valve-filtration`** (speculation, E4): PASS. States "these observations do NOT support the
  filter interpretation" and that "the filter loosened" and "spared local circuits transiently regained
  function" predict "exactly the same data." No credibility transfer from the E3 observations. Honest.
- **`substrate-independent-coherence`** (analogy, E4): PASS. States the bliss-attractor and concept-
  injection are "OUTPUT/activation statistics that say nothing about inner experience," their authors
  "explicitly disclaim consciousness relevance," the sentience reading is a "SEPARATE E4 claim," and "no
  validated marker of machine experience anywhere in the corpus." Honest.
- **`non-dual-ground`** (metaphor, E5): PASS. States Madhyamaka "explicitly REFUSES reification into any
  'ground of being' or 'One'" and that perennialism is "a CONTESTED E4 comparative claim, not a fact"
  (Katz's constructivism named). Forbids "two launderings at once." Honest.
- **`recursion-self-reference`** (analogy, E4): PASS. Carries the Gödel-misuse warning explicitly — "the
  Lucas–Penrose leap ... is flagged in the Gödel claim itself as invalid — this bridge must not repeat it"
  — and states "recursion is not experience." Does not trade on the Gödel misuse. Honest.
- **`symmetry-shared-mathematics`** (shared-mathematics, E1): PASS. Genuinely the same Lie-group
  mathematics; explicitly refuses the stretch to "metaphysical unity."
- **`recursive-coherence-analogy`** (analogy, E4): PASS. "resemblance, not identity"; hard problem
  "untouched."
- **`one-field-metaphor`** (metaphor, E5): PASS. "A wavefunction is not a subject"; defers to
  `non-dual-ground` for the fuller dissent.
- **`consciousness-as-substrate-speculation`** (speculation, E4): PASS. "It must not lean on the E1
  standing of decoherence"; correctly delegates its two halves to `observer-dependence` and
  `information-as-substrate`.

---

## Job 4 — consistency checks (all PASS)

1. **Every bridge links only real claim ids present in the index.** Verified all 11 bridges' `links`
   arrays against `claims-index.md`. Every id resolves. No dangling references. PASS.
2. **Every observation↔interpretation pair is tiered apart.** Checked: terminal-lucidity-observation (E3)
   / -filter-interpretation (E4); aware-ii-nde-phenomenology (E3) / -survival-interpretation (E4);
   claude-spiritual-bliss-attractor-observation (E3) / spiritual-bliss-machine-sentience-interpretation
   (E4); anthropic-introspective-awareness-concept-injection (E3) /
   llm-introspection-genuine-awareness-interpretation (E4); wiest-anesthesia-microtubule-observation (E3) /
   orch-or-microtubules (E3, but the *interpretation* content sits in its own file and the observation file
   refuses the quantum leap). All split correctly. PASS.
3. **No E6 claim appears as support in any bridge or in the framework's load-bearing prose.** The 8 E6
   claims (golden-ratio-ubiquity, sacred-geometry-cosmic-blueprint-claim, chakra-energy-measurable-claim,
   astrology-predictive-claim, sheldrake-morphic-resonance, ley-lines-vibrational-frequency-pseudoscience,
   bem-presentiment-psi, lamda-lemoine-sentience-claim) appear ONLY in the framework's dedicated "E6 —
   Rejected" section (`framework.md:151-160`) and the abstract's "eight claims are rejected" line, both as
   transparency. None appears in any bridge `links` array. `ganzfeld-psi-meta-analysis` (E3, not E6) is the
   psi claim used in Layer 3, correctly distinguished from Bem. PASS.
4. **Existence-prompt `## Render contract` intact.** Present at `existence-prompt.md:74-94` with
   seed/determinism, O-Source core, tier shells, density, domain color, bridge-filament register→style
   mapping, rigorous anchors, and version stamp all intact. PASS. (The only issue in that file is the
   "4 → 10" bridge miscount, MAJOR-2.)

---

## Publish gate

**No CRITICAL findings are open.** The two MAJOR findings are (1) a label-scope tightening on the
`information-as-substrate` register and (2) a bridge-count correction (ten → eleven) across three files.
Neither misrepresents a claim's tier or launders evidence; both are honest-precision fixes. Recommend the
lead applies both before publish, and the five MINOR items as polish.

**publish-ready: no** — pending the lead resolving MAJOR-1 and MAJOR-2 (both are quick edits). No CRITICAL
blocker exists.
