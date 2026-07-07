# Metaphysics domain — red-team vetting report

Vetter: independent claim-vetter (red-team), metaphysics domain. Date: 2026-07-07.

## Summary

All 9 assigned claims were already competently drafted as E4 philosophical positions with reasonable
steelmen, objections, and falsifiability statements. None required a tier change — E4 was correct in every
case, including the two claims dressed in physics-journal language (Tegmark's MUH, pancomputationalism):
both already stated plainly that they are not falsifiable in operational terms, and that framing has been
preserved and, where needed, sharpened. No claim was rejected. All 9 are promoted from `status: draft` to
`status: vetted`.

**One material citation defect was found and fixed**, in `tegmark-mathematical-universe-hypothesis.md`: the
draft cited "Vaas, R. (2008). Physics from Scratch... arXiv:0803.0944" as a "published critical response" to
Tegmark's MUH. Direct verification of arXiv:0803.0944 shows the actual authors are Antonio N. Bernal, Miguel
Sánchez, and Francisco José Soler Gil — not Rüdiger Vaas — and the paper's own abstract describes its
results as "a strengthening of MUH" (deriving spacetime types from minimal symmetry postulates), i.e. it is
not critical of MUH at all. This citation was both wrong-author and wrong-characterization (support
mischaracterized as critique), which is exactly the kind of laundered/fabricated citation CLAUDE.md's prime
directive prohibits. It has been struck rather than patched. In its place, the already-present Wikipedia
source (already `verified: true` in the draft) was independently re-verified and used to source the real,
attributable critical reception of MUH: George Ellis ("completely untestable," disjoint-universes argument),
Peter Woit ("not that it's wrong but that it's empty," "radically untestable"), and Edward Frenkel (meaning
"never fully answered," charges of "science fiction and mysticism"). These are now the named objections in
`strongest_objection`, replacing the fabricated reference. Confidence held at `low` given this defect.

**Minor corrections (verification-status fixes, not content errors):**
- `mathematical-platonism`: Colyvan SEP indispensability-arguments entry was marked `verified: false` in the
  draft; directly fetched and confirmed live, on-topic, and correctly attributed (first published 1998,
  revised March 2023). Corrected to `verified: true`.
- `pancomputationalism-digital-physics`: Wolfram's *A New Kind of Science* online edition
  (wolframscience.com/nks/) was marked `verified: false`; confirmed live and correct. Corrected to
  `verified: true`.
- `ontic-structural-realism`: the Ladyman & Ross 2007 book citation (pointed at the SEP structural-realism
  page as a stand-in URL, since the book itself has no single canonical open URL) was marked
  `verified: false`; the SEP page was independently confirmed to substantively quote and discuss that book,
  so this is an acceptable secondary-source anchor and was corrected to `verified: true`.
- `priority-monism-schaffer`: the draft's PhilPapers link for Schaffer's "Monism: The Priority of the Whole"
  returns HTTP 403 on direct fetch. The paper's existence and exact citation (Philosophical Review
  119(1):31-76, 2010, DOI 10.1215/00318108-2009-025) were confirmed independently via search, and the URL was
  swapped for a working, author-hosted open PDF (jonathanschaffer.org/monism.pdf) — same paper, more
  reliable link, not a substantive source change.
- `process-philosophy-actual-occasions`: the SEP Process Philosophy entry does not use the word
  "panexperientialism" verbatim (though the concept it names is exactly what the entry describes for
  Whitehead). Text adjusted to attribute that specific label to the wider secondary literature (e.g. David
  Ray Griffin) rather than implying SEP itself coins it — a precision fix, not a retraction.
- `principle-of-sufficient-reason`: the Melamed & Lin SEP entry on PSR does not itself develop van
  Inwagen-style objections to "why is there something rather than nothing" in depth (van Inwagen appears
  once, in an unrelated connection); the companion "Nothingness" entry (Sorensen) does carry that question
  and cites Rundle (2004) as claimed. The two-source pairing is accurate taken jointly; the strongest_objection
  text was generalized away from a specific van-Inwagen attribution the primary SEP source doesn't fully
  support.

**Content addition of note:** per the vetting brief, the PSR claim's `strongest_objection` was expanded to
state explicitly that the PSR-regress problem (any candidate "brute" or "necessary" fundamental substrate
still owes an account of why *that* substrate rather than none or another) applies with equal force to
O Theory's own posited O-Source, not only to rival substrate theories (physical, informational, mathematical,
experiential). This is flagged as the single most load-bearing addition in this batch: a vetting pass that
let PSR's regress problem sit only against competing theories while exempting the sponsoring project's own
foundational posit would itself be evidence-laundering.

**Falsifiability check (per CLAUDE.md's falsifiability rule and the brief's specific instruction on
Tegmark/pancomputationalism):** both claims that present in physics-journal register already stated, in the
draft, that the ontic/identity thesis is not falsifiable even in principle, distinguishing it from narrower
testable sub-claims (e.g., specific discreteness predictions from a named cellular-automaton model, tiered
separately as E3 heterodox physics). This framing was preserved and, in Tegmark's case, sharpened with named,
attributable critics rather than a generic "critics argue" gesture. Strong emergence's falsifiability field
was likewise confirmed accurate: weak emergence is uncontroversial and physicalism-compatible; strong
emergence's stronger claim (in-principle non-deducibility + novel downward causal powers) is what remains E4
and untestable, and the SEP source's own causal-closure/overdetermination discussion (Kim) was pulled in to
sharpen the objection.

**Duplication check:** confirmed `it-from-bit-information-ontology` (E4, this domain) is correctly kept
distinct from the physics-domain `wheeler-it-from-bit-information-physics` (E2, technical) — no merge
performed, consistent with instructions. Did not encounter, and did not re-file, `neutral-monism-ontology`.

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| mathematical-platonism | Mathematical Platonism | metaphysics | philosophical | E4 | vetted | medium | Serious, live analytic-philosophy position; sources check out; Benacerraf access problem is the correct strongest objection. |
| it-from-bit-information-ontology | Wheeler's "it from bit" | metaphysics | philosophical | E4 | vetted | low | Wheeler's own speculative slogan, correctly separated from testable QI physics; SEP itself notes "little positive evidence" for the ontic reading. |
| pancomputationalism-digital-physics | Pancomputationalism / digital physics | metaphysics | philosophical | E4 | vetted | low | Description-vs-thing-described conflation is fatal to the ontic claim as stated; Wolfram/SEP sources confirmed live. |
| tegmark-mathematical-universe-hypothesis | Tegmark's MUH | metaphysics | philosophical | E4 | vetted | low | Fabricated "Vaas 2008" critique citation removed (wrong author, and the real paper supports rather than critiques MUH); replaced with verified named critics (Ellis, Woit, Frenkel). |
| process-philosophy-actual-occasions | Whitehead's process philosophy | metaphysics | philosophical | E4 | vetted | medium | Best academic precedent for "process/experience as fundamental"; sources solid; "panexperientialism" label attributed to secondary literature, not SEP itself. |
| ontic-structural-realism | Ontic structural realism (Ladyman & Ross) | metaphysics | philosophical | E4 | vetted | medium | Physics-engaged, non-mentalistic route to "relations not stuff"; Newman-problem objection is the correct strongest challenge. |
| priority-monism-schaffer | Priority monism (Schaffer) | metaphysics | philosophical | E4 | vetted | medium | Sound parsimony + quantum-non-separability argument; broken PhilPapers link swapped for working author-hosted PDF of the same paper. |
| strong-emergence-contested | Strong emergence | metaphysics | philosophical | E4 | vetted | medium | Correctly framed as contested even among emergentists; causal-closure/overdetermination (Kim) is the decisive objection. |
| principle-of-sufficient-reason | Principle of Sufficient Reason | metaphysics | philosophical | E4 | vetted | low | PSR-regress problem now explicitly applied to O Theory's own O-Source, not only to rival substrates — the key fairness fix in this batch. |
