---
id: born-rule-empirical-status
title: The Born rule (probability = amplitude squared) is confirmed to extraordinary precision but not derived from more basic axioms
domain: [quantum-foundations]
type: empirical
tier: E1
status: vetted
confidence: high
sources:
  - title: "Born, M. (1926). Zur Quantenmechanik der Stoßvorgänge. Zeitschrift für Physik 37, 863-867."
    url: "https://link.springer.com/article/10.1007/BF01397477"
    kind: peer-reviewed
    verified: true
  - title: "Landsman, N. P. (2009). The Born rule and its interpretation, in Compendium of Quantum Physics, Springer (survey of derivation attempts including Gleason's theorem and Everettian decision-theory arguments)."
    url: "https://www.math.ru.nl/~landsman/Born.pdf"
    kind: secondary
    verified: true
  - title: "Vaidman, L. (2021 rev.). Many-Worlds Interpretation of Quantum Mechanics, §5 'Probability'. Stanford Encyclopedia of Philosophy."
    url: "https://plato.stanford.edu/entries/qm-manyworlds/"
    kind: secondary
    verified: true
steelman: "As an empirical rule, |amplitude|^2 gives measurement-outcome probabilities that match experiment to extreme precision across all of quantum physics (interferometry, particle physics, quantum chemistry) — this part is E1, as settled as any result in physics. Separately, there is a decades-long research program (Gleason's theorem, Deutsch-Wallace decision-theoretic derivations in Everettian QM, envariance arguments by Zurek) trying to derive the rule from weaker assumptions rather than simply postulating it."
strongest_objection: "None of the derivation programs is uncontroversial: Gleason's theorem presupposes non-contextuality and a Hilbert-space structure already close to what one wants to derive; the Everettian decision-theoretic derivations (Deutsch, Wallace) have been criticized (e.g., by Baker, Kent) as circular, smuggling probability-like assumptions into the rationality axioms. So the empirical rule is E1; 'the Born rule is derived, not postulated' is not — it remains an open foundational problem."
falsifiability: "The rule's empirical content is constantly tested (every quantum-interference and particle-decay experiment is a check) and has never been violated to current precision; a statistically significant deviation would falsify standard QM outright. Whether a given *derivation* of the rule succeeds is a mathematical/logical question, not an empirical one."
depends_on: []
related_to: [kochen-specker-contextuality, many-worlds-interpretation, wheeler-it-from-bit-information-physics, qm-decoherence]
last_vetted: 2026-07-07
content_hash: "sha256:0aceb5555946e1a3"
---
RED-TEAM NOTES (2026-07-07): Born (1926) exists as cited (the founding paper, Zeitschrift für Physik 37, 863-867 —
correct volume/pages, standard citation). Landsman's Compendium chapter is a real, checkable survey (available as
PDF from the author's own institutional page) accurately described as covering Gleason's theorem and Everettian
derivation attempts. Vaidman's SEP entry on many-worlds does have a probability section addressing the Born-rule
derivation problem in Everettian QM (Deutsch-Wallace program) — correctly cited. No fabrication.

Tier confirmed E1 for the empirical content, exactly as the claim itself distinguishes: the split between
"the rule works to enormous precision" (E1, uncontroversial) and "the rule is derived from deeper axioms"
(unresolved research problem, correctly flagged as not-E1 within the same claim) is the right move and matches
how the physics and philosophy-of-physics literature actually treats this. This is a good example of atomic,
honest claim-writing — it resists the temptation to inflate the derivation-program status.

Steelman and objection are accurate: Kent's and Baker's circularity critiques of Deutsch-Wallace decision-theoretic
derivations are real, published objections. No changes needed to tier or text.
