# Citation Audit — seed corpus (Stage 2)

_Produced by the adversarial verification pass (one independent vetter per claim, live source checks via
WebFetch/WebSearch). Mirrors what the `skeptic-auditor` writes during `/research`. Date: 2026-07-07._

**Result: PASS with fixes applied.** Every cited source resolves to a real, correctly-attributed work.
No fabricated citations. A few URLs were unreachable to the automated fetcher due to publisher/anti-bot
blocks (paywalls, JS-rendered pages, site-wide 403s); in each case the citation itself was cross-confirmed
accurate by independent means (DOI, ISBN, encyclopedia cross-reference, PubMed/ERIC records), so the source
is real and the `verified: true` flag is warranted.

| claim | source | status | note |
|---|---|---|---|
| noether-symmetry-conservation | arXiv physics/0503066 (Tavel trans.) | ✅ resolves + supports | confirmed Noether 1918 English translation |
| noether-symmetry-conservation | Wikipedia: Noether's theorem | ✅ resolves + supports | states theorem + all three examples |
| qm-decoherence | Zurek 2003, RMP 75, 715 | ✅ resolves + supports | canonical decoherence review |
| qm-decoherence | Schlosshauer, RMP 76, 1267 | ✅ resolves + supports | **fixed year 2005→2004**, pp. 1267–1305 |
| many-worlds-interpretation | Everett 1957, RMP 29, 454 | ✅ citation confirmed (APS 403) | DOI 10.1103/RevModPhys.29.454 verified |
| many-worlds-interpretation | SEP: Many-Worlds (Vaidman) | ✅ resolves + supports | corroborates steelman + objection point-for-point |
| platonic-solids-five | Euclid, Elements XIII (Joyce) | ✅ resolves + supports | Props 13–18 + completeness remark |
| platonic-solids-five | Cromwell, Polyhedra (CUP 1997) | ✅ citation confirmed (CUP 403) | ISBN 9780521664059 verified |
| e8-lie-group | Atlas of Lie Groups (liegroups.org) | ✅ live over HTTP | orientation source; 200 OK via curl |
| e8-lie-group | Wikipedia: E8 (mathematics) | ✅ resolves + supports | **fixed steelman: Weyl order 696,729,600 (was "~696 billion")** |
| lisi-e8-toe | Lisi 2007, arXiv:0711.0770 | ✅ resolves + supports | abstract matches |
| lisi-e8-toe | Distler & Garibaldi 2010, CMP 298 | ✅ resolves + supports | the peer-reviewed no-go objection |
| hard-problem-of-consciousness | Chalmers 1995 (consc.net) | ✅ resolves + supports | canonical "something it is like" |
| hard-problem-of-consciousness | SEP: Consciousness | ✅ resolves + supports | backs framing + illusionist objection |
| cosmopsychism | Goff 2017 (OUP) | ✅ citation confirmed (OUP bot-block) | ISBN 9780190677015; SEP cross-cites |
| cosmopsychism | SEP: Panpsychism | ✅ resolves + supports | §2.4 defines cosmopsychism, cites Goff |
| iit-integrated-information | Tononi et al. 2016, NRN 17, 450 | ✅ resolves + supports (Φ/identity/PCI) | did not localize hot zone → added source below |
| iit-integrated-information | **Koch et al. 2016, NRN 17, 307 (added)** | ✅ correct source for posterior "hot zone" | fix for a title sub-claim mis-attribution |
| iit-integrated-information | Cogitate Consortium 2025, Nature | ✅ resolves + supports objection | neither IIT nor GNWT confirmed |
| orch-or-microtubules | Hameroff & Penrose 2014, PLR 11, 39 | ✅ live (Elsevier 403) | DOI + PMID 24070914 confirm |
| orch-or-microtubules | Tegmark 2000, arXiv:quant-ph/9907009 | ✅ resolves + supports objection | decoherence 10⁻¹³–10⁻²⁰ s |
| orch-or-microtubules | Wiest 2025, niaf011 | ✅ resolves + supports | framed as suggestive proponent advocacy |
| llm-subjective-reports | arXiv:2510.24797 | ✅ resolves + supports | authors themselves disclaim "direct evidence of consciousness" |
| llm-subjective-reports | Anthropic Claude 4 System Card | ✅ resolves + supports | §5.5.2 "spiritual bliss" attractor (PDF parsed) |
| advaita-nonduality | Chāndogya Up. / SBE vol.1 (Müller) | ✅ citation confirmed (site-wide 403) | "Tat tvam asi", Ch. 6.8–6.16 |
| advaita-nonduality | SEP: Śaṅkara | ✅ resolves + supports | ātman=brahman, adhyāsa, jñāna |
| golden-ratio-ubiquity | Markowsky 1992, CMJ 23(1), 2–19 | ✅ real (**dead URL repointed** to T&F DOI) | thesis confirmed via ERIC EJ445071 |
| golden-ratio-ubiquity | Wikipedia: Golden ratio §Disputed | ✅ resolves + supports | Devlin/Livio; Parthenon claim discredited |

**Criticals: 0 remaining.** All flagged items were mechanical (one dead URL, one wrong-companion citation,
one numeric error in prose) and are fixed. Sources unreachable to the fetcher are publisher blocks, not
fabrications, and were cross-confirmed real.
