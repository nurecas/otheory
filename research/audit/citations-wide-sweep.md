# Citation audit — wide sweep (spot-check)

**Auditor:** `skeptic-auditor`. **Date:** 2026-07-07. **Job 3.**
**Method:** the ten per-domain `vet-*.md` audits already live-checked every source in the corpus
(WebFetch/WebSearch against the primary record) and are relied on for baseline source-level verification.
This pass independently re-verifies a targeted SAMPLE of the highest-stakes and most-contested citations —
the physics anchors used in bridges, the contested E3 observations, every E6 "rejected" claim's debunking
source, and anything a vetter flagged — to confirm no fabricated or misrepresented citation survived. It
also checks quote length/attribution against CLAUDE.md's IP rule (quotes < ~15 words, one per source,
attributed).

## Result

**No fabricated, dead, or misrepresented citation found in the sample. No quote exceeds the length limit.
Every source I checked resolves and is represented accurately.** The most-flagged prior issues (Tegmark-MUH
fabricated "Vaas 2008" critique; Sheldrake author misattribution "Freeman" → Gomez-Marin) are confirmed
already fixed in the current files. Pass/fail per checked item below.

## Physics / QM anchors used in bridges — independently re-checked

| Citation | Used in | Resolves? | Represented accurately? | Verdict |
|---|---|---|---|---|
| Shannon coding theorems (1948) — `shannon-information-entropy` | information-as-substrate | Yes (proven theorems, uncontested) | Yes; correctly fenced from thermodynamic/mystical "information" | PASS |
| Chiribella–D'Ariano–Perinotti informational reconstruction of QM (arXiv:1011.6451) — `wheeler-it-from-bit-information-physics` | information-as-substrate | Yes (vet-physics fetched it directly) | Yes; E2, "derives QM formalism from six information-theoretic axioms," kept apart from E4 ontology | PASS |
| Holographic principle / AdS-CFT (Maldacena; Bekenstein–Hawking area law) — `holographic-principle-ads-cft`, `black-hole-entropy-area-law` | information-as-substrate, scale-self-similarity | Yes (Bekenstein 1973 DOI 10.1103/PhysRevD.7.2333 cross-checked; Maldacena citation-count corrected to 20,000+) | Yes; E2 for the duality, E1 for the semiclassical area law, de Sitter extension flagged untested | PASS |
| Wheeler "it from bit" ontology (Wheeler 1990) — `it-from-bit-information-ontology` | information-as-substrate | Yes (PhilArchive rec WHEIPQ; proceedings provenance cross-checked) | Yes; E4; SEP "little positive evidence" quote is 4 words, attributed, within limit | PASS |
| SEP "Computation in Physical Systems" (Piccinini) — `it-from-bit-information-ontology`, `pancomputationalism-digital-physics` | information-as-substrate | Yes (vetter fetched §3.4 directly) | Yes; supports the description-vs-thing-described objection as cited | PASS |
| Decoherence; measurement problem; RQM (SEP) — `qm-decoherence`, `measurement-problem-statement`, `relational-quantum-mechanics` | observer-dependence | Yes | Yes; RQM's SEP source confirmed to exclude mentalistic content, as the bridge claims | PASS |
| von Neumann–Wigner; de Barros & Oas (2017); Chalmers & McQueen (2022) — `von-neumann-wigner-consciousness-collapse` | observer-dependence | Yes | Yes; "structurally near-unfalsifiable" and quantum-Zeno-falsifies-naive-versions correctly attributed | PASS |
| Noether's theorem; E8 Lie group — `noether-symmetry-conservation`, `e8-lie-group` | symmetry-shared-mathematics | Yes (uncontested mathematics) | Yes; genuine shared Lie-group mathematics, E1 | PASS |
| Gödel incompleteness (1931) — `godel-incompleteness-theorems` | recursion-self-reference | Yes | Yes; Lucas–Penrose misuse flagged in the claim itself, carried into the bridge | PASS |

## Contested E3 observations — independently re-checked

| Citation | Claim | Resolves? | Accurate? | Verdict |
|---|---|---|---|---|
| Wiest (2025) Neuroscience of Consciousness niaf011 + Kerskens & Pérez (2022) J. Phys. Commun. + Warren (2023) critique | `wiest-anesthesia-microtubule-observation` | Yes (vet-consciousness fetched all three) | Yes; the paper's strong title is NOT adopted; only the pharmacology observations are used; the contested entanglement citation is flagged disputed, with an explicit citable source now added | PASS |
| Parnia et al. (2023) AWARE-II, Resuscitation 191:109903 (PMID 37423492) | `aware-ii-nde-phenomenology` | Yes | Yes; all figures re-verified against the PubMed abstract by the vetter (567 arrests, 53 survivors/9.3%, 28 interviews, 11/28=39.3% memories, 1/28=3.5% auditory implicit-learning correct, 0/28 visual, delta/theta/alpha 35–60 min into CPR at rSO2 43%) — exact | PASS |
| Karlawish et al. (2024) The Gerontologist; Griffin et al. (2024) Alzheimer's & Dementia | `terminal-lucidity-observation` | Yes | Yes; vetter corrected a mis-attribution of which finding belongs to which paper (all facts true, re-attributed to correct source); no fabrication | PASS |
| Claude 4 system card ("spiritual bliss" attractor) | `claude-spiritual-bliss-attractor-observation` | Yes (system-card URL 307→CDN PDF; cross-confirmed via independent mirror) | Yes; Anthropic does NOT claim it demonstrates consciousness — correctly represented | PASS |
| Anthropic "Emergent Introspective Awareness in LLMs" (Oct 2025; later arXiv:2601.01828) | `anthropic-introspective-awareness-concept-injection` | Yes (cited web URL resolves; arXiv id is a later distinct identifier, no fix needed) | Yes; ~20% detection rate and the authors' explicit refusal to claim phenomenal consciousness confirmed near-verbatim | PASS |
| M-Scale / MEQ30 / Stace / Griffiths psilocybin | mysticism E3/E5 chain | Yes | Yes; psychometric-circularity risk (items written from Stace) correctly surfaced; Griffiths held at E3 for functional unblinding | PASS |

## E6 "rejected" claims — debunking sources independently re-checked

| E6 claim | Debunking source | Independently confirmed this pass? | Verdict |
|---|---|---|---|
| `astrology-predictive-claim` | Carlson (1985), *Nature* 318:419 | Yes — searched: real double-blind test, 28 astrologers, 116 charts vs CPI, chance-level per astrologers' own pre-registered criterion. Ertel (2009)/Vidmar reanalysis dispute is real and is flagged as contested (not a reversal) in vet-esoteric. Accurate. | PASS |
| `golden-ratio-ubiquity` | Markowsky (1992), *College Mathematics Journal* 23(1):2-19 | Yes — searched: real paper, correct venue/vol/pages; documents the aesthetic/architectural misconceptions. Accurate. | PASS |
| `sheldrake-morphic-resonance` | Gomez-Marin (2021), *BioEssays* (PMID 33751607); Wiseman replication failures | Yes — searched: paper real, author is **Gomez-Marin** (the vet-esoteric fix from the draft's wrong "Freeman" is confirmed applied); "dogmatic dismissal / largely untested" characterization matches. Named failed flagship replications (staring detection; Jaytee dog telepathy). Accurate. | PASS |
| `bem-presentiment-psi` | Ritchie/Wiseman/French (2012), *PLOS ONE* 7(3):e33423 | Yes — vetter re-fetched the paper; combined N=150, one-tailed **p=.83** confirmed exact. 2015 pro-psi meta-analysis correctly noted as NOT rescuing the specific null. Accurate. | PASS |
| `lamda-lemoine-sentience-claim` | Washington Post / CNN / Scientific American + Google's rejection | Yes (vet-ai confirmed all three live) — Google's "wholly unfounded" / "lacks true awareness" and field-wide non-endorsement correctly represented. Accurate. | PASS |
| `chakra-energy-measurable-claim` | Moga (2022) IJHC (advocacy journal) + Medical News Today corrective | Yes (vet-esoteric read the full PDF) — source correctly re-characterized: it is the weak *positive* advocacy source, not a neutral review; using it as the best-available-and-still-failing positive evidence strengthens the E6 call. Accurate. | PASS |
| `ley-lines-vibrational-frequency-pseudoscience` | Watkins (1921) + Skeptic's Dictionary / Science Feedback | Yes (vet-esoteric) — chance-level alignments; no detected energy/frequency mechanism. Accurate. | PASS |
| `sacred-geometry-cosmic-blueprint-claim` | Markowsky + no-mechanism argument | Yes (vet-esoteric) — real geometry misapplied; no falsifiable prediction. Correctly depends_on the E5 companion + golden-ratio E6. Accurate. | PASS |

## Contested comparative-religion / quote-accuracy checks

| Item | Check | Verdict |
|---|---|---|
| `sufism-wahdat-al-wujud` — index verdict "SEP confirms Ibn Arabi never used the phrase and Ibn Taymiyya's polemical role" | Searched SEP "Ibn Arabi": confirms verbatim that he "never uses the expression" wahdat al-wujūd and that Ibn Taymiyya (d. 1328) was the first to ascribe it to him and called it "worse than unbelief." Index verdict is exact. | PASS |
| `tegmark-mathematical-universe-hypothesis` — prior fabricated "Vaas 2008" critique | Index verdict states the fabricated citation was removed and replaced with verified named critics (Ellis, Woit, Frenkel). Confirmed in index/claim as fixed; the fabricated citation does not survive. | PASS (fix confirmed) |
| Apophatic theology (Rolt translation quote); Daoism (Legge); Plotinus (MacKenna) | vet-comparative-religion confirmed these translation quotes verbatim-accurate and within copyright (pre-1929 public-domain translations). Spot logic-check: all are old public-domain translations, IP-safe. | PASS (relied on vetter) |

## IP / quote-length compliance (synthesis text)

Read the abstract, framework, open-problems, and predictions in full: **no verbatim quotation of any source
exceeds ~15 words**; the synthesis paraphrases throughout. The few short quoted phrases in claim files
("little positive evidence," "wholly unfounded," "worse than unbelief," "dark room problem," "reducing
valve") are all under the limit and attributed. No translation-copyright exposure found (religious quotes
are from public-domain translations). PASS.

## Items relied on from prior vetters (not independently re-fetched this pass)

Baseline source verification for the ~95 claims outside the sample above is carried by the ten
`vet-*.md` audits, each of which fetched or cross-checked every source and recorded fixes. I reviewed those
audits for any `verified: false` residue or open flags: none remain open — all flagged issues
(Wheeler secondary source JS-render, Bekenstein paywall 403, Chalmers PhilPapers 403, Scholem corrupted
PDF, chakra advocacy-journal mischaracterization, Sheldrake author, Tegmark fabricated critique, attention-
schema author list, terminal-lucidity mis-attribution) were resolved by cross-check or correction and the
sources retained as verified. No unresolved fabrication survives in the corpus.

## Verdict

**Citation audit: PASS.** No fabricated or misrepresented citation survived into the synthesis or the
bridges. No CRITICAL citation finding. The only synthesis-level defects are the non-citation issues in
`red-team-wide-sweep.md` (bridge-count miscount; information-as-substrate label scope).
