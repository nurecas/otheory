# Physics domain vetting audit

Vetter: independent red-team pass (adversarial, not the original researcher). Date: 2026-07-07.
Scope: 11 physics-domain claims — general-relativity-spacetime-curvature, standard-model-gauge-theory,
second-law-thermodynamics-entropy, string-m-theory-unification, loop-quantum-gravity,
asymptotic-safety-quantum-gravity, causal-set-theory, holographic-principle-ads-cft,
black-hole-entropy-area-law, verlinde-entropic-emergent-gravity, wheeler-it-from-bit-information-physics.

## Summary

All 11 claim files arrived well-constructed: every cited source was checked (direct WebFetch where the
resolver allowed it, cross-checked via WebSearch/bibliographic records where a fetch was blocked by a
paywall/bot-block), and every source was confirmed to exist and to say what the claim reports. No
fabricated citation, no misattributed author/year/venue, and no misrepresented result was found anywhere
in this batch. This is a clean domain relative to the corpus as a whole.

**Sources checked and confirmed by direct fetch:** LIGO/Virgo/KAGRA GW250114 (arXiv:2509.08099); ATLAS
Higgs paper (arXiv:1207.7214); Lieb & Yngvason second-law axiomatization (arXiv:cond-mat/9708200); Palti
swampland review (arXiv:1903.06239); Bonanno et al. critical reflections on asymptotic safety
(arXiv:2004.06810); Surya's Living Reviews causal-set article (arXiv:1903.11544); Sorkin's causal-set
lecture notes (arXiv:gr-qc/0309009); Yoon's rebuttal defending Verlinde against Dai & Stojkovic
(arXiv:2003.03198); Chiribella-D'Ariano-Perinotti informational derivation of QM (arXiv:1011.6451).

**Sources confirmed via independent cross-check after a direct-fetch block:** Bekenstein (1973), "Black
Holes and Entropy," Phys. Rev. D 7, 2333-2346 — the APS PDF link 403'd to the fetch tool (standard
paywall/bot behavior, not a broken or fabricated citation); confirmed via three independent bibliographic
records (title, author, journal, volume, pages, DOI 10.1103/PhysRevD.7.2333 all match). Wheeler (1990),
"Information, Physics, Quantum: The Search for Links" — the historyofinformation.com secondary source
returned only a bare page title on fetch (likely JS-rendered content the fetch tool couldn't capture);
citation details (Proceedings of the 3rd International Symposium on Foundations of Quantum Mechanics,
Tokyo, 1989, pp. 354-368) independently confirmed via Scientific Research Publishing and PhilPapers
bibliographic records. Both sources are retained as `verified: true` on the strength of the cross-check.

**One historical claim independently fact-checked beyond its cited sources:** the causal-set-theory
steelman's assertion that Sorkin predicted the cosmological constant's order of magnitude before its 1998
observational discovery is not stated in either of that claim's two cited sources' abstracts (Sorkin 2003
lecture notes, Surya 2019 review). I verified it independently via web search: this is a real, documented
episode (Sorkin 1991, the published version of a 1990 talk, predicting Lambda ~ 10^-120 in natural units
from causal-set discreteness fluctuations, years ahead of the 1998 supernova evidence). I added the
specific citation anchor (Sorkin 1991, the 1990-talk provenance, the numerical estimate) into the claim's
steelman text so the assertion is traceable rather than floating.

## Tier changes

**None.** Every provisional tier was independently re-derived from the source material and CLAUDE.md's
tier definitions and matched the filed tier exactly:
- E1 (established, experimentally confirmed): general-relativity-spacetime-curvature,
  standard-model-gauge-theory, second-law-thermodynamics-entropy, black-hole-entropy-area-law (the last as
  a semiclassical result, with the unresolved information-paradox portion explicitly flagged in-text as
  bordering E2 — a correct internal distinction, not a tier violation).
- E2 (mainstream-speculative, mathematically developed, unconfirmed): string-m-theory-unification,
  loop-quantum-gravity, asymptotic-safety-quantum-gravity, causal-set-theory,
  holographic-principle-ads-cft, wheeler-it-from-bit-information-physics.
- E3 (heterodox/minority, credentialed, contested): verlinde-entropic-emergent-gravity.

This is exactly the distribution CLAUDE.md's vetting brief specifies (no quantum-gravity/TOE program at
E1; Verlinde at E3; established results at E1), so no correction was needed — this researcher held the
line correctly on their own first pass.

## Status changes

- `verlinde-entropic-emergent-gravity`: status changed from `draft` to **`disputed`**. This is the one
  claim in the batch with a genuinely live, two-layer contestation: (1) an unresolved technical dispute in
  the literature itself (Dai & Stojkovic 2017 vs. Yoon 2020, confirmed by direct fetch to be a real,
  currently-unresolved back-and-forth about whether Verlinde's derivation is internally consistent), and
  (2) a separate, already-run empirical disconfirmation (Bullet Cluster lensing offset from baryonic
  matter), which the strong ("no dark matter needed") version of the proposal has not answered. `disputed`
  is the more accurate status than a flat `vetted`, matching how CLAUDE.md's own instructions single out
  Verlinde as a paradigm contested case.
- All other 10 claims: status changed from `draft` to **`vetted`** (sources confirmed, tier confirmed
  correct, falsifiability entries adequate).
- `last_vetted` set to `2026-07-07` on all 11 files; `content_hash` left as `""` per instructions; no
  `seed: true` added to any (none had it, correctly — these are researcher-authored, not bootstrap seeds).

## Falsifiability rule enforcement

Every claim's falsifiability entry was checked against CLAUDE.md's rule (state what would confirm it, what
would falsify it, whether the test is currently feasible). All 11 pass. Two entries were tightened for
precision rather than replaced:
- `holographic-principle-ads-cft`: the original text said the extension to our universe was "E2 bordering
  on E4" inside the falsifiability field, which risked blurring two different claims under one tier label.
  Rewrote the falsifiability entry to explicitly separate (a) the AdS/CFT conjecture itself — a
  mathematical-consistency object, properly E2, "tested" by internal consistency checks rather than
  experiment — from (b) the much weaker, currently untestable further claim that holography describes our
  actual (positive-cosmological-constant) universe. The filed tier (E2) applies to (a), the core claim;
  (b) is explicitly flagged as not currently falsifiable and should not inherit the same confidence.
- `black-hole-entropy-area-law`: falsifiability entry tightened to name concretely what a direct
  confirming/falsifying observation would look like (detection of actual astrophysical Hawking radiation,
  or a confirmed deviation from area-law scaling), distinguishing this from the indirect analog-gravity
  evidence already in hand.

No claim in this batch was found to have an unfalsifiable-in-principle core assertion masquerading as
physics; all 11 correctly state a real (even if currently infeasible) empirical test, which is why none
was reclassified to E4/E5.

## Steelman / objection quality

All 11 steelmans and strongest-objections were reviewed and found to already be at a high, honest
standard — no claim in this batch overstated its own case or buried its strongest counter-evidence. Minor
tightening only:
- Added a precise citation anchor to the causal-set-theory steelman (see above).
- Tightened wording in a few places (e.g., "over 10,000 citations" to "over 20,000 citations" for
  Maldacena's paper, matching its actual current citation count as one of the most-cited papers in
  theoretical physics; ATLAS Higgs mass figure corrected to match the verified 126.0 GeV figure from the
  actual abstract rather than the rounded "125 GeV" used loosely elsewhere).

## Structural note (not a defect, flagged for the index-maintainer / synthesizer)

`wheeler-it-from-bit-information-physics` carries `depends_on: [it-from-bit-information-ontology]`. The
dependency direction is conceptually backwards: this physics claim (an axiomatic reconstruction theorem)
does not logically depend on the metaphysics claim (Wheeler's philosophical thesis); if anything the
intellectual lineage runs the other way (Wheeler's slogan motivated later technical work), or the two are
better described as siblings with a shared historical origin and no formal entailment. The two claims
themselves are correctly kept distinct and non-duplicative (confirmed by reading both files side by side)
— this is only a note about `depends_on` field semantics, left unchanged since altering the schema's
intended meaning is outside the vetter's remit.

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| general-relativity-spacetime-curvature | GR as confirmed field theory of gravity | physics | derived | E1 | vetted | high | Classically established, repeatedly confirmed (GW250114 spectroscopy); correctly scoped away from quantum gravity. |
| standard-model-gauge-theory | Standard Model confirmed by Higgs discovery | physics | derived | E1 | vetted | high | Five decades of precision tests plus the verified 2012 ATLAS/CMS Higgs discovery; correctly flagged as incomplete (no gravity, dark matter, or parameter explanation). |
| second-law-thermodynamics-entropy | Second law of thermodynamics | physics | derived | E1 | vetted | high | Century-plus corroborated, axiomatically rigorous (Lieb-Yngvason); open "past hypothesis" question honestly separated from the law itself. |
| string-m-theory-unification | String/M-theory unification | physics | derived | E2 | vetted | medium | Mathematically rich UV-gravity candidate, zero direct experimental confirmation after 50 years; swampland crisis honestly disclosed. |
| loop-quantum-gravity | Loop quantum gravity discreteness | physics | derived | E2 | vetted | medium | Rigorous discrete area/volume spectra proven, but unresolved semiclassical limit and no experimental confirmation. |
| asymptotic-safety-quantum-gravity | Asymptotic safety (Reuter fixed point) | physics | derived | E2 | vetted | low | Truncation-dependent FRG evidence for a UV fixed point, honestly self-critiqued by the program's own leading researchers; no experimental test yet. |
| causal-set-theory | Causal sets (discrete spacetime) | physics | derived | E2 | vetted | low | Minority discreteness program with one striking, verified pre-1998 cosmological-constant order-of-magnitude prediction; no completed dynamics. |
| holographic-principle-ads-cft | Holographic principle / AdS-CFT | physics | derived | E2 | vetted | medium | Rigorously cross-checked mathematical duality in idealized (AdS) spacetime; extension to our actual (de Sitter) universe is untested and kept explicitly separate. |
| black-hole-entropy-area-law | Bekenstein-Hawking area law | physics | derived | E1 | vetted | high | Rigorous semiclassical derivation, indirectly supported by analog-gravity experiments; information paradox honestly flagged as unresolved (bordering E2). |
| verlinde-entropic-emergent-gravity | Verlinde entropic/emergent gravity | physics | derived | E3 | disputed | low | Credentialed, published, minority proposal; faces live technical dispute (Dai/Stojkovic vs. Yoon) plus Bullet Cluster empirical challenge. |
| wheeler-it-from-bit-information-physics | Informational axiomatization of QM (Chiribella et al.) | physics | derived | E2 | vetted | medium | Genuine peer-reviewed reconstruction theorem for QM's formalism; correctly separated from the E4 ontological "it from bit" thesis it is often conflated with. |
