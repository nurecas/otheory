# Vetting audit: quantum-foundations (12 claims)

Vetted 2026-07-07. Independent red-team pass — I did not author these claims. All 12 assigned claim files
already carried well-reasoned provisional tiers from the researcher; my job was to verify every cited source
actually exists and says what is reported, confirm the tier assignments against the evidence, and check that
the three senses of "observer" (physics measurement/decoherence E1, technical/interpretive E2, literal
consciousness-causes-collapse E3) are never conflated or allowed to inherit each other's confidence.

## Summary of findings

**No fabricated or dead citations found.** Every source across all 12 claims — Born (1926), Bell (1964),
Kochen & Specker (1967), von Neumann (1932), Wigner (1961), Bohm (1952), Ghirardi-Rimini-Weber (1986), Rovelli
(1996), Griffiths (1984), Gell-Mann & Hartle (1990), Frauchiger & Renner (2018), de Barros & Oas (2017),
Chalmers & McQueen (2022), Vinante et al. (2020), Hensen et al. (2015), Kirchmair et al. (2009), plus all cited
Stanford Encyclopedia of Philosophy entries — was independently confirmed via web search and/or fetch to exist,
resolve, and accurately match the claimed author/year/venue/result. The 2022 Nobel Prize in Physics citation
(Clauser, Aspect, Zeilinger, "for experiments with entangled photons, establishing the violation of Bell
inequalities and pioneering quantum information science") is confirmed verbatim. The Frauchiger-Renner paper is
confirmed as Nature Communications 9, 3711 (2018), correctly titled and summarized.

**No tier changes were required against the researcher's provisional tiers.** The four foundational-physics
claims (measurement-problem-statement, born-rule-empirical-status, bell-theorem-nonlocality,
kochen-specker-contextuality) were already correctly and conservatively pinned to E1, with careful language
distinguishing the established physics from any interpretive or mentalistic over-reading. The seven
interpretation claims (copenhagen-interpretation, de-broglie-bohm-pilot-wave, grw-csl-objective-collapse,
relational-quantum-mechanics, consistent-histories-interpretation, wigners-friend-frauchiger-renner) were
already correctly pinned to E2, each with an honest falsifiability field stating no experiment distinguishes it
from rivals (GRW/CSL is the one partial exception, correctly flagged as genuinely testable in its parameters
while still E2 as an interpretation/modification, exactly per instruction to reflect this in falsifiability
rather than tier). qbism-quantum-bayesianism was already correctly pinned to E4 (purely epistemic/philosophical
stance, not a physical hypothesis competing on physical grounds). von-neumann-wigner-consciousness-collapse was
already correctly pinned to E3.

**One status change:** von-neumann-wigner-consciousness-collapse moved from `status: draft` to
`status: disputed`, per explicit instruction and on the merits — it is a minority position defended by a small
number of credentialed researchers (Wigner, Stapp, and a serious recent technical treatment by Chalmers &
McQueen 2022) but rejected by the mainstream, and its surviving (non-naive) versions are, per de Barros & Oas's
own 2017 conclusion, structurally resistant to falsification, not merely practically hard to test. This tension
is the reason it sits at E3 rather than E2 and is flagged disputed rather than presented as settled heterodox
physics: I tightened the falsifiability and strongest-objection fields to state precisely what de Barros & Oas
(2017) and Chalmers & McQueen (2022) actually conclude (the paper's own words are that the hypothesis is
"unfalsifiable" under reasonable assumptions about consciousness for its general/surviving forms, while the
simplest naive version is already refuted by the observed quantum Zeno effect). All 11 other claims moved from
`status: draft` to `status: vetted`.

**Falsifiability audit:** every claim asserted as physics in this batch states a real confirm/falsify/feasibility
triple. GRW/CSL is the standout genuinely falsifiable, actively-tested case among the interpretations (correctly
distinguished from the rest, which are honestly stated as empirically underdetermined). Von Neumann-Wigner is
the one claim where the falsifiability field required strengthening: it is not cleanly "falsifiable" or
"unfalsifiable" but split — naive versions are refuted (quantum Zeno effect), surviving complex versions resist
falsification for structural, not just practical, reasons (de Barros & Oas 2017). This mixed verdict is now
stated explicitly rather than smoothed over in either direction, which is the reason the tier stays at E3
(bordering E4) rather than being bumped to E2.

**Guardrail check (three senses of "observer"):** confirmed intact across all 12 files. copenhagen-interpretation,
relational-quantum-mechanics, and consistent-histories-interpretation each explicitly and correctly state their
"observer"/"measurement" requires no consciousness (RQM's SEP entry was directly quoted-confirmed: "There is
nothing subjective, idealistic, or mentalistic, in RQM"). kochen-specker-contextuality and
bell-theorem-nonlocality both explicitly flag and reject the common popular conflation of "contextual"/
"nonlocal" with "mind-dependent." Only von-neumann-wigner-consciousness-collapse makes the literal
consciousness-causes-collapse claim, and it alone carries E3/disputed status — none of the E1 or E2 claims in
this set license or inherit that reading, and each cross-references it explicitly to prevent it being smuggled
in through a side door.

**No claims required rejection.** No sole-source-unverifiable claims found; every claim has 2-4 independently
checkable sources, all of which resolved and matched.

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| measurement-problem-statement | Measurement problem as inconsistent triad | quantum-foundations | fact | E1 | vetted | high | Genuine logical tension in the standard formalism, uncontroversial as a statement of the problem; sources check out. |
| born-rule-empirical-status | Born rule confirmed, not derived | quantum-foundations | empirical | E1 | vetted | high | Prediction rule is E1-solid; "derived from deeper axioms" remains an open, unresolved research problem, correctly separated. |
| bell-theorem-nonlocality | Loophole-free Bell tests / 2022 Nobel | quantum-foundations | empirical | E1 | vetted | high | Nobel-recognized, replicated, loophole-free; correctly blocks no-signaling and consciousness misreadings. |
| kochen-specker-contextuality | Kochen-Specker theorem rules out noncontextual HV models | quantum-foundations | fact | E1 | vetted | high | Proven theorem plus confirmed experimental signature; correctly distinguishes technical "context" from "observer's mind." |
| copenhagen-interpretation | Copenhagen: epistemic tool, classical apparatus, no observer-independent state | quantum-foundations | philosophical | E2 | vetted | medium | Historically dominant interpretive stance, not experimentally distinguished from rivals; explicitly requires no consciousness. |
| de-broglie-bohm-pilot-wave | Bohmian mechanics: deterministic hidden-variable pilot wave | quantum-foundations | derived | E2 | vetted | medium | Serious, fully worked-out rival dynamics, empirically equivalent under quantum equilibrium; nonlocal but mindless. |
| grw-csl-objective-collapse | GRW/CSL: objective, spontaneous physical collapse | quantum-foundations | derived | E2 | vetted | medium | Genuinely new, falsifiable physics being actively squeezed by experiment, not yet confirmed or excluded. |
| qbism-quantum-bayesianism | QBism: quantum state as personal Bayesian credence | quantum-foundations | philosophical | E4 | vetted | medium | Purely epistemic/philosophical stance, not a competing physical hypothesis; correctly separated from mind-substrate claims. |
| relational-quantum-mechanics | RQM (Rovelli): facts relative to any interacting system | quantum-foundations | philosophical | E2 | vetted | medium | Mainstream-speculative, physicist-developed; SEP source directly confirms it excludes mentalistic/subjective content. |
| consistent-histories-interpretation | Consistent histories: no fundamental role for measurement | quantum-foundations | derived | E2 | vetted | medium | Mathematically developed (Gell-Mann/Hartle/Griffiths), unresolved "set selection" problem honestly flagged as a real critique. |
| wigners-friend-frauchiger-renner | Frauchiger-Renner extended Wigner's-friend no-go theorem | quantum-foundations | derived | E2 | vetted | medium | Genuine peer-reviewed theorem (Nat. Commun. 2018); which premise to reject remains contested, no consciousness required by any resolution. |
| von-neumann-wigner-consciousness-collapse | Consciousness causes collapse (von Neumann-Wigner) | quantum-foundations, philosophy-of-mind | philosophical | E3 | disputed | low | Minority view held by some credentialed researchers; undercut by decoherence and, per de Barros & Oas (2017), structurally near-unfalsifiable in its surviving forms. |
