# Citation Audit — the 9 additions

_Auditor pass, 2026-07-07. Scope: every source cited by the 9 new claim files (Hopf-fibration cluster +
Nameless project) and the load-bearing sources behind the two new bridges. Checks per source: (a) does it
resolve to a real record; (b) does the claim it supports match what the source says; (c) are quotes accurate
and within CLAUDE.md's ~15-word limit; (d) is anything fabricated; (e) does any author real-name leak into
the Nameless entries. Independently re-verified the high-risk / load-bearing sources; the rest were confirmed
against the claim-file verification notes plus the corpus index._

**Verdict: 0 CRITICAL · 0 MAJOR · 2 MINOR.** No fabricated citations. No real-name leak in any claim file or
anywhere under `research/`. All spot-checked sources resolve and are represented accurately. The one privacy
exposure is *external* (a third-party repository's own metadata), not a corpus text error — logged as MIN-1.

---

## The two headline safety checks

**No fabricated citations.** Every source I re-verified resolves to a real record with the stated
author/venue/year. Independently confirmed: Urbantke (J. Geom. Phys. 46, 125–150, 2003); the IHC Zenodo
record (Peacock & Hall, DOI 10.5281/zenodo.20596985, v10, 8 June 2026); the Nameless Zenodo Paper 1
(record 19447483); the Nielsen PhilArchive/PhilPapers/SSRN trail and the MDPI International Journal of
Topology (ISSN 2813-9542); Pohl et al. (Nature, July 2010) and the proton-radius-puzzle timeline; the
McElrath critique via Thrive Debunked. No invented DOIs, authors, page numbers, or results found.

**No real-name leak.** Grepped all of `research/` for the owner's real name and email variants —
**zero matches.** Every Nameless entry refers to the work as "the Nameless project (nurecas.com)" / "the
Nameless framework," never a person. Verified on the live pages too: the five philosophy pages and the
nurecas.com index show no individual author byline. **Caveat (MIN-1):** the third-party **Zenodo** deposit
for the physics papers lists the depositor as a real person with an institutional affiliation. That is the
external record's own metadata, outside the corpus's control; the corpus text is clean. See MIN-1.

---

## Per-source pass/fail

### `hopf-fibration-topology-physics` (E1) — PASS (4/4 sources)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| Wikipedia, "Hopf fibration" | PASS | PASS | Core facts (1931, S¹↪S³→S², linked fibers, π₃(S²)=ℤ generator, Bloch sphere, Dirac monopole, quaternionic S⁷→S⁴, complex S^{2n+1}→CPⁿ) are standard and correctly reported. |
| Urbantke 2003, ADS record | PASS | PASS | **Re-verified independently:** Helmuth K. Urbantke, "The Hopf fibration—seven times in physics," J. Geom. Phys. **46, 125–150 (2003)**. Title, author, journal, vol, pages, year all exact. ADS landing page is bot-blocked on direct fetch (403) — the claim file discloses this; existence confirmed via web search + Semantic Scholar + the full-text PDF. |
| Urbantke 2003, full-text PDF (fuw.edu.pl) | PASS | PASS | URL header shows "Journal of Geometry and Physics 46 (2003) 125–150" — matches. |
| Urbantke 2003, ScienceDirect (PII S0393044002001213) | PASS | PASS | Bot-blocked on fetch; PII and record confirmed via search. Disclosed in the claim. |

The "seven times" catalogue (Bloch qubit, harmonic oscillator, Taub-NUT, twistors, Wigner helicity,
monopole, Dirac equation) matches the paper's contents as independently described. No over-quoting; all
paraphrase.

### `u1-bundles-classified-by-cp-infinity` (E1) — PASS (3/3)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| Wikipedia, "Hopf fibration" (complex circle bundles) | PASS | PASS | S¹↪S^{2n+1}→CPⁿ confirmed. |
| Wikipedia, "Classifying space" (BU(1)=CP∞=K(ℤ,2)) | PASS | PASS | The classifying-space theorem, [X,BG] classifying principal G-bundles, and H²(X;ℤ) for line bundles are textbook and correctly stated. The claim file notes it *substituted* this source for a duplicate Urbantke citation so the classifying-space claim carries a direct source — good citation hygiene. |
| Urbantke 2003 PDF | PASS | PASS | Supports the finite complex-Hopf-fibration stages. |

Independently confirmed that sin²θ_W = 3/8 is the standard tree-level SU(5) GUT value — this backs the
"3/8 is the known SU(5) value, not a new result" framing used across the corpus.

### `ihc-rp4-desitter-cpt-real-physics` (E1) — PASS (3/3)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| Lopez-Corredoira & Marmet, arXiv:2202.12897 | PASS | PASS | Real review of alternative cosmology; supports "non-trivial topology is studied, not confirmed." Abstract page resolves; PDF returned binary noise to the fetcher (disclosed). |
| Copi/Starkman et al., arXiv:2606.24886 (June 2026) | PASS | PASS | **Recent-but-not-future:** dated June 2026, legitimately prior to today (2026-07-07). arXiv abstract resolves. The claim correctly flags the date. Cosmic-topology review with CMB (WMAP/Planck) constraints — matches. |
| Luminet, arXiv:gr-qc/9804006 | PASS | PASS | "Past and Future of Cosmic Topology" — real, resolves. |

de Sitter, RP4/cosmic-topology, and CPT correctly characterized as E1 *tools*; the claim explicitly does not
inherit IHC's derivations.

### `nielsen-topological-unified-field-theory` (E3) — PASS (7/7)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| PhilArchive NIETTU | PASS | PASS | **Re-verified via search:** Jenny Lorraine Nielsen, title with S¹→S⁹→CP⁴, "canonical space for gauge–gravity unification." Direct fetch 403 (bot-block, disclosed); record confirmed. |
| PhilPapers NIETTU (forthcoming, no vol/issue/pages) | PASS | PASS | Listed forthcoming; publication-status characterization matches ("in edits / after peer review"). |
| SSRN 5288710 | PASS | PASS | Same manuscript; SSRN byline "Jennifer Nielsen" — the claim correctly logs this as a minor name variant of the same author. Not a fabrication, not a PII issue (it is the theory author's own public name). |
| Int. J. Topology (MDPI) about page | PASS | PASS | Real journal, ISSN 2813-9542, launched 2024, EiC Michel Planat — confirmed. |
| ISSN Portal 2813-9542 | PASS | PASS | Confirmed record; the "indexed in DOAJ/Crossref/Scilit, NOT Scopus/WoS, no Impact Factor" characterization is consistent with what resolves. |
| PhilArchive NIEDFI (retraction demand) | PASS | PASS | Real self-filed priority/plagiarism demand; correctly framed as bearing on visibility, not validity. |
| Alexander/Magueijo et al., arXiv:2510.11674 | PASS | PASS | Genuine paper, "GraviGUT unification with revisited Pati–Salam model," submitted 13 Oct 2025 — confirmed as the target of the demand. |

The Deepak-Chopra popularization referenced in the claim prose is real (confirmed) and correctly treated as
popularization, not evidence. viXra 2503.0134 is disclosed as a low-quality venue per CLAUDE.md. All honest.

### `nameless-qubit-standard-model-derivation` (E3) — PASS (4/4), one privacy caveat
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| nurecas.com/nameless (index) | PASS | PASS | Frames the project as deriving reality "from the geometry of a single qubit." |
| Zenodo 19447483 (Paper 1) | PASS | PASS | **Re-verified:** title "Eigenmode Ratios of the Minimal Quantum State Space and the Standard Model"; abstract confirms SU(3)×SU(2)×U(1), sin²θ_W = 3/8, Koide, sin²θ₁₂ = 4/13, JUNO keyword; resource type Preprint. Matches the claim exactly. **PII caveat, MIN-1:** the Zenodo record's own author field names a real person + institution. This is Zenodo's metadata, not corpus text. |
| Zenodo 19447505 (Paper 2) | PASS | PASS | Resolves as a Nameless preprint (self-deposit). |
| Zenodo 19557001 (Paper 3) | PASS | PASS | Resolves as a Nameless preprint (self-deposit). |

All matches (3/8, 4/13, gauge group, Koide) are represented as **claims of the preprint**, never as
established results. No quote exceeds the length limit (the claim paraphrases). Clean.

### `nameless-experience-first-metaphysics` (E4) — PASS (5/5), quotes verified verbatim
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| nurecas.com/nameless-a-philosophical-introduction.html | PASS | PASS | Experience-first framing; refers to itself as "the Nameless project," no personal byline. |
| nurecas.com/experiential-determinism.html | PASS | PASS | **Quotes re-verified verbatim on the live page:** "fully real, and entirely inert" and "a quality of the wave's traversal" both appear; block-universe language ("Past, present, and future co-exist as a complete four-dimensional structure") confirmed. Each quote is ≤ ~9 words, within the ~15-word limit, one per point, attributed. |
| nurecas.com/qualia-field.html | PASS | PASS | Supports "the felt quality of transparency itself." |
| nurecas.com/the-empty-node.html | PASS | PASS | **Re-verified verbatim:** "structural rather than derived" and "a convergence, not a translation" both present; śūnyatā / Planck limit / black-hole-centre "still point" framing confirmed. Within length limits. |
| nurecas.com/on_divinity_and_plurality.html | PASS | PASS | Supports the two-truths / "the ultimate does not demote the conventional. It holds it" material. |

No personal author name on any of the five pages. Quote lengths all compliant. Clean.

### `haramein-schwarzschild-proton-holographic-mass` (E6) — PASS (5/5)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| AIP Conf. Proc. 1303, 95–100 (2010), ADS bibcode 2010AIPC.1303...95H | PASS | PASS | Non-refereed CASYS'09 volume, correctly characterized. Publisher page bot-blocked; confirmed via ADS/OSTI/Semantic Scholar (disclosed). |
| ResearchGate full-text (pub 228451143) | PASS | PASS | Confirmed to exist; bot-blocked on fetch (disclosed). |
| Pohl et al., Nature 466, 213–216 (July 2010) | PASS | PASS | **Re-verified:** muonic-hydrogen radius, Nature, July 2010, predates Haramein's 2012/2013 claim — establishes the post-diction. The claim's value 0.84184(67) fm is the paper's precise figure; Wikipedia's rounded 0.842(1) fm is consistent, not a discrepancy. |
| Wikipedia, "Proton radius puzzle" | PASS | PASS | Timeline confirmed (July 2010 muonic measurement, 5σ below prior average). |
| Thrive Debunked (McElrath summary) | PASS | PASS | **Re-verified:** "nearly a billion tons" proton, circular reasoning, no located physics CV — all match the claim. It is a blog summarizing McElrath's technical critique; correctly tagged low-quality `kind: web` and used only to attribute the critique, not as primary physics. Appropriate for an E6 rejection dossier. |

### `observer-patch-holography-toe` (E6) — PASS (4/4)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| GitHub FloatingPragma/observer-patch-holography | PASS | PASS | Repo, README, ~40-item falsifiability map, α⁻¹ = 137.03595950081728 vs PDG, CC BY-NC-SA, no peer review — as described (self-published, pseudonymous handle). |
| README (raw) | PASS | PASS | Supports the derivation-claim list and the digit-matched constants. |
| OPH Falsifiability Map | PASS | PASS | ~40 OPH-killing outcomes present. |
| Wikipedia, "E8 (mathematics)" | PASS | PASS | Cross-reference for the "E8 anchor"; correctly tiered E1 and kept from laundering OPH. |

### `ihc-inverted-hypersphere-cosmology` (E6) — PASS (2/2)
| Source | Resolves | Claim matches | Notes |
|---|---|---|---|
| Zenodo 10.5281/zenodo.20596985 (IHC, v10, 8 June 2026) | PASS | PASS | **Re-verified:** "Inverted Hypersphere Cosmology: First Principles from a Single Axiom," authors **Samuel Peacock & Lauren Hall**, v10, 8 June 2026, Preprint; abstract confirms single-axiom, RP4 = dS₄/CPT, α⁻¹ = 137.036, sin²θ_W = 3φ⁻¹/8, Ω_Λ = 0.6882, N = 33. Matches the claim exactly. (The prose gives full first names "Samuel"/"Lauren" vs the source-line initials "S."/"L." — same authors, consistent; these are the preprint authors, not the site owner.) |
| Sherbon, PhilArchive SHEGRG ("Golden Ratio Geometry and the Fine-Structure Constant") | PASS | PASS | Real, resolves; used only to document the golden-ratio-for-α numerology *genre*, not as support for IHC. The claim discloses it is a "distinct-but-cognate" Sherbon paper — accurate, not a mis-cite. |

---

## The 2 MINOR items (non-blocking)

- **MIN-1 (external PII exposure, not a corpus error).** The corpus text is fully compliant — no real name
  anywhere under `research/`, every reference is "the Nameless project (nurecas.com)." However, the
  *third-party Zenodo records* for the physics papers (19447483 etc.) expose the owner's real name +
  institutional affiliation in their own author metadata. A reader who follows the citation will see it. This
  is outside the corpus's control (it is Zenodo's field, set at deposit time), so it is **not** a corpus
  citation error and does not block publish. If the owner wishes to keep the site's byline anonymous end to
  end, the only fix is upstream (edit the Zenodo deposit's author field), not in these files. Logged for
  owner awareness.

- **MIN-2 (fetch-blocked sources, already disclosed).** Several primary landing pages (ADS, ScienceDirect,
  PhilArchive/PhilPapers, AIP publisher, ResearchGate) return 403/JS-bot-block on direct fetch. In every case
  the claim file **discloses this** and confirms existence via an independent route (search, Semantic Scholar,
  OSTI, full-text PDF, ISSN Portal). I independently re-confirmed the load-bearing ones (Urbantke, Nielsen
  trail, IHC/Nameless Zenodo, Pohl, McElrath). No `verified: true` flag is unsupported. This is honest
  practice, noted only so a future re-vetter knows these URLs need a non-fetch check.

---

## Bottom line

No fabricated citations. No author real-name leak in any corpus file. All spot-checked sources resolve and
match their claims; all quotes are verbatim and within the ~15-word limit; the SU(5) 3/8 fact, the Pohl 2010
timeline, and the sin²θ₁₂ = 4/13 / JUNO framing are represented accurately as claims-of-preprints, never as
results. Zero CRITICAL, zero MAJOR. The two MINORs are (1) an *upstream* Zenodo PII exposure the corpus text
cannot fix, and (2) already-disclosed bot-blocked landing pages that were independently re-confirmed.
