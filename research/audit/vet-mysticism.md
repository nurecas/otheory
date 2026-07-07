# Red-team audit: mysticism domain (10 claims)

**Vetter:** independent claim-vetter (red-team), not the author of these claims
**Date:** 2026-07-07

## Summary

All 10 assigned claims were well-constructed by the original researcher(s): every citation resolved to a
real, checkable source, and every source said approximately what the claim file reported it as saying. No
claim required rejection, no citation was fabricated, and no claim required a tier change. This is a
domain where the original drafting already respected the CLAUDE.md three-way split (report vs. measure vs.
metaphysical conclusion) carefully. My job was therefore mostly (a) independent source verification, (b)
sharpening a few objections where the draft was too gentle on a real confound, (c) one non-trivial
methodological correction (meditation-dmn-neuroscience overstated what its own two cited sources establish
about causation), and (d) formal finalization (status, confidence, last_vetted).

### Register split confirmed (per assignment's core instruction)

The three-way split the assignment asked me to police is intact across this set:

- **First-person report / typology (E5):** stace-common-core-typology, forman-pure-consciousness-event,
  jhana-samadhi-absorption-states. These correctly describe phenomenology as *report*, never as measured
  fact or metaphysical conclusion. Falsifiability fields correctly state these are not third-person
  testable hypotheses (appropriately E5, not smuggled into E2/E3).
- **Empirical measures of mystical/altered states (E3):** meq30-mystical-experience-psychometrics,
  hood-mysticism-scale-psychometrics, griffiths-psilocybin-mystical-experience,
  psychedelic-ego-dissolution-dmn, meditation-dmn-neuroscience. All five are real, replicated
  psychometric/neuroimaging findings, correctly held at E3 (not inflated to E1/E2) given open confounds
  (functional unblinding, self-selection, small-N, coarse proxies). None of the five claims is written in a
  way that lets the measurement imply the metaphysics — each explicitly fences off the metaphysical reading
  into mystical-experience-epistemic-status.
- **Metaphysical/epistemological conclusions (E4):** perennialism-constructivism-debate,
  mystical-experience-epistemic-status. Both correctly held as philosophical, not-empirically-decidable
  disputes with no consensus resolution, and both correctly state that a real/measurable experience does
  not make its metaphysical content true — this is the domain's load-bearing fence and it holds.

### Cross-reference check: perennialism-constructivism-debate vs. perennial-philosophy-common-core-thesis

Confirmed these remain properly distinct, per the assignment's explicit instruction. I read
perennial-philosophy-common-core-thesis (comparative-religion domain) and confirmed it is the Traditionalist
metaphysical thesis (Huxley/Schuon: traditions converge on the same non-dual ultimate reality), while
perennialism-constructivism-debate (mysticism domain, my assignment) is the narrower scholarly-epistemology
question of whether the *experiences themselves* are culture-independent in structure (Stace/Forman vs.
Katz). Both correctly cite Katz and the SEP entry but from different angles. I added an explicit
cross-reference paragraph to perennialism-constructivism-debate's body text making this distinction
unambiguous for future editors, since the two claims share sourcing and a careless future edit could merge
them.

### Source verification

Every source across all 10 claims was independently checked via WebSearch/WebFetch:

- Stace (1960), *Mysticism and Philosophy* — archive.org link resolves, confirmed title/author/year/publisher.
- SEP "Mysticism" entry — fetched directly; independently confirmed it covers Stace's typology, Forman's PCE
  and the objections to it, Katz's constructivism (Premise A/B) and objections, and the epistemic-status
  debate (Swinburne, Alston, Fales, religious diversity, James's "eternal unanimity" observation) exactly as
  the claim files represent it.
- Forman (1990), *The Problem of Pure Consciousness*, Oxford University Press — confirmed via independent
  search (editor, publisher, year, twelve contributors, DOI).
- Katz (1978), "Language, Epistemology, and Mysticism" — confirmed via PhilPapers and independent search
  (Oxford University Press, pp. 22-74, 1978).
- Gunaratana, *The Jhanas in Theravada Buddhist Meditation* (Access to Insight) — fetched directly, confirmed
  content matches (four fine-material jhānas, four immaterial attainments).
- Hood (1975) and Hood/Ghorbani et al. (2001) — both confirmed via independent search; recovered exact
  sample sizes (US N=1,379/188, Iran N=185) not stated in the original draft, and surfaced a real nuance the
  draft smoothed over: the phenomenology-interpretation *relationship* (not just the factor structure) was
  NOT identical across the two cultures in the 2001 study — added to the objection field.
- Barrett, Johnson & Griffiths (2015) and MacLean et al. (2012) — both confirmed (SAGE, PMC), matching the
  claim's n=184, four-factor CFA, and external-validity description precisely.
- Griffiths et al. (2006, PMID 16826400) and Griffiths et al. (2008) — both confirmed via PubMed/SAGE and
  independent search; design details (30 mg/70kg, methylphenidate comparator, 14-month follow-up) all match.
- Carhart-Harris et al. (2012, PNAS 109(6)) and (2016, PNAS 113(17)) — both confirmed directly against PNAS
  and independent search.
- Gattuso et al., DMN systematic review — fetched directly; confirmed authorship, journal (International
  Journal of Neuropsychopharmacology), and findings. Found a minor citation-year ambiguity: published online
  22 Oct 2022, appearing in the issue dated March 2023 (26(3):155-188). The draft cited it only as "(2023)."
  Not a fabrication (both years are legitimately attached to the same DOI depending on which date convention
  is used) but I corrected the sources block to show both, and pulled a direct quote from the review's own
  text ("unclear how central the DMN is to therapeutic potential") into the objection field, since the
  review is more hedged than the claim file's confidence implied.
- Brewer et al. (2011, PNAS 108(50)) and Garrison et al. (2015) — both confirmed via independent search and
  fetch, matching the claim's description of design and findings.

No source was found to be fabricated, dead, or materially misrepresented. No claim required `status:
rejected`.

### Most significant correction: meditation-dmn-neuroscience

The draft's falsifiability field asserted "several such [longitudinal randomized] studies exist and
generally support a training effect" as if this were established by the cited sources. Both Brewer et al.
(2011) and Garrison et al. (2015) — the only two sources actually cited — are cross-sectional
(experienced-meditators-vs-novices) designs, not longitudinal randomized trials. This does not make the
claim false (longitudinal meditation-training RCTs with DMN outcomes do exist in the wider literature) but
the claim file was citing a causal-training-effect conclusion its own two sources cannot support. I rewrote
the objection and falsifiability fields to state plainly that self-selection is a live, unaddressed confound
in the sources actually cited, and that establishing the training-effect (causal) reading would require
additional sources not currently in the file. This is the sharpest instance across the set of the
self-selection confound the assignment specifically asked me to check for.

### Psychometric circularity risk (explicitly flagged per assignment)

The MEQ30 and Hood's M-Scale are both built by operationalizing Stace's own phenomenological categories into
questionnaire items. The original drafts already gestured at this (both had a sentence noting item content
"presupposes Stace-derived... categories"), but I judged the treatment too soft for a risk this central —
confirmatory factor analysis "validating" these instruments' structure partially confirms that Stace's
taxonomy is internally coherent once turned into a questionnaire, not that the taxonomy is an
independently-discovered cross-cultural natural kind. I elevated this into an explicit, first-order sentence
in the objection field of stace-common-core-typology (the root claim), meq30-mystical-experience-psychometrics,
and hood-mysticism-scale-psychometrics, and cross-referenced it from griffiths-psilocybin-mystical-experience
(whose acute scoring uses the same Stace/Pahnke-derived criteria).

### Confounds now explicit in the objection fields (per assignment requirement)

- **Functional unblinding** in psychedelic trials: explicit in griffiths-psilocybin-mystical-experience
  (strengthened: noted the active comparator, methylphenidate, does not fully solve this since its acute
  effects are also discriminable from psilocybin's).
- **Self-selection** in meditator-vs-novice designs: explicit and strengthened in
  meditation-dmn-neuroscience (see correction above) and referenced in jhana-samadhi-absorption-states
  (teacher-verified reports confirm shared doctrine, not independent third-person validation).
- **Constructivist critique**: central to perennialism-constructivism-debate, and referenced from
  stace-common-core-typology, forman-pure-consciousness-event, jhana-samadhi-absorption-states, and both
  psychometric claims.
- **Non-veridicality / religious diversity problem**: central to mystical-experience-epistemic-status, with
  James's "eternal unanimity" point (surfaced from the SEP fetch) added as a sharper version of the
  diversity objection than the draft stated.

### Falsifiability checks (physics-adjacent framing)

None of these 10 claims asserts anything as physics. All E5 claims correctly state they are not
third-person-testable hypotheses (reports/typologies, evaluated as useful-or-not, not true-or-false by
measurement). All E3 claims correctly state a real falsification criterion (factor-analytic replication
failure, failure of DMN-correlation to replicate, etc.) and are tiered accordingly. The two E4 claims
correctly state that the *philosophical arguments* are subject to critique and revision, but the
*metaphysical content itself* has no falsification criterion — which is the correct treatment (this is
exactly the "if nothing could falsify it, it is not physics — reclassify as E4/E5" rule working as intended,
not a gap).

### Tier changes

**None.** All 10 provisional tiers (E5 x 3, E3 x 5, E4 x 2) were confirmed correct on independent review.
This is a case where the calibration was already sound; my role was source-verification, sharpening
objections, and one methodological correction (meditation-dmn-neuroscience), not re-tiering.

### Status

All 10 set to `status: vetted` (none disputed — no claim had an unresolved factual or sourcing problem after
correction; the corrections made were incorporated directly into each file's objection/falsifiability
fields rather than leaving them as open disputes).

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| stace-common-core-typology | Stace's common-core typology | mysticism | symbolic | E5 | vetted | medium | Real, sourced phenomenological taxonomy; correctly E5; flagged as the root of a psychometric-circularity risk running through the whole domain. |
| forman-pure-consciousness-event | Forman's Pure Consciousness Event | mysticism, philosophy-of-mind | symbolic | E5 | vetted | medium | Real report-construct correctly kept E5; sharpened objection with SEP's "mundane alternative explanation" (attentional lapse vs. genuine exotic state). |
| jhana-samadhi-absorption-states | Jhāna/samādhi absorption states | mysticism | symbolic | E5 | vetted | medium | Real, sourced contemplative taxonomy correctly E5; "teacher-verified" reproducibility clarified as confirming shared doctrine, not independent validation. |
| perennialism-constructivism-debate | Perennialism vs. constructivism | mysticism, philosophy-of-mind | philosophical | E4 | vetted | medium | Correctly E4, no empirical test possible; added note that most scholars hold intermediate positions, not the two poles as framed; cross-reference to perennial-philosophy-common-core-thesis made explicit to prevent merging. |
| meq30-mystical-experience-psychometrics | MEQ30 psychometrics | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, replicated, well-cited instrument; correctly E3 not E2; circularity risk (items written from Stace's categories) elevated to first-order objection. |
| hood-mysticism-scale-psychometrics | Hood's M-Scale psychometrics | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, replicated instrument; correctly E3; surfaced that the US/Iran replication held for factor structure but NOT for inter-factor relationship strength — added to objection. |
| griffiths-psilocybin-mystical-experience | Griffiths psilocybin trials (2006/2008) | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, rigorous RCT correctly held at E3 (not E1) given functional-unblinding confound, which is real and not fully solved by the active comparator. |
| psychedelic-ego-dissolution-dmn | Psychedelic ego-dissolution / DMN | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real, replicated correlational neuroimaging finding, correctly E3; corrected review's citation year (2022 online / 2023 issue) and pulled its own causal hedge into the objection. |
| meditation-dmn-neuroscience | Meditation and DMN reduction | mysticism, consciousness-science | empirical | E3 | vetted | medium | Real correlational finding correctly E3, but draft overstated causal ("training effect") support from its own two cross-sectional sources — corrected; self-selection confound now explicit. |
| mystical-experience-epistemic-status | Epistemic status of mystical experience | mysticism, philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Correctly E4, the domain's load-bearing fence between measured-experience and metaphysical-truth; strengthened with James's "eternal unanimity" point undercutting the evidential reading at the descriptive level. |
