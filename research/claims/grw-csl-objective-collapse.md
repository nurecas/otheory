---
id: grw-csl-objective-collapse
title: Objective-collapse models (GRW, CSL) modify the Schrödinger equation to make wavefunction collapse a real, spontaneous physical process with testable parameters
domain: [quantum-foundations]
type: derived
tier: E2
status: vetted
confidence: medium
sources:
  - title: "Ghirardi, G. C., Rimini, A. & Weber, T. (1986). Unified dynamics for microscopic and macroscopic systems. Physical Review D 34, 470."
    url: "https://journals.aps.org/prd/abstract/10.1103/PhysRevD.34.470"
    kind: peer-reviewed
    verified: true
  - title: "Bassi, A., Lochan, K., Satin, S., Singh, T. P. & Ulbricht, H. (2013). Models of wave-function collapse, underlying theories, and experimental tests. Reviews of Modern Physics 85, 471."
    url: "https://arxiv.org/abs/1204.4325"
    kind: peer-reviewed
    verified: true
  - title: "Vinante, A. et al. (2020). Narrowing the Parameter Space of Collapse Models with Ultracold Layered Force Sensors. Physical Review Letters 125, 100404."
    url: "https://arxiv.org/abs/2002.09030"
    kind: peer-reviewed
    verified: true
steelman: "GRW (1986) postulates that every particle undergoes rare, spontaneous, random localization ('hits') at a mean rate ~10^-16/s per particle with localization width ~10^-7 m; because macroscopic objects contain ~10^23 particles entangled together, at least one hit occurs almost instantly, collapsing the whole macroscopic superposition — explaining the quantum/classical boundary from new physics rather than interpretation alone. The continuous version (CSL, Pearle/Ghirardi-Pearle-Rimini) smooths this into a stochastic nonlinear term in the dynamics. Crucially this modifies claim (2) of the measurement-problem triad (unitarity fails, exactly as needed) and makes genuinely new, falsifiable predictions distinct from standard QM — spontaneous heating, radiation emission, and loss of coherence in ultra-isolated mesoscopic systems."
strongest_objection: "The collapse rate and localization-width parameters are free parameters chosen (not derived) to reproduce known quantum/classical behavior, which critics call ad hoc; current experiments (X-ray/gamma-ray emission bounds, cold-atom and optomechanical interferometry, gravitational-wave-detector bounds) have already ruled out large swaths of GRW/CSL parameter space (e.g., Vinante et al. 2020) without yet reaching the theoretically 'natural' regions, so the theory is being actively squeezed but not yet excluded or confirmed."
falsifiability: "Explicitly and unusually falsifiable among interpretations: it predicts a specific, nonzero deviation from unitary quantum mechanics (spontaneous heating/decoherence at a rate set by GRW/CSL parameters). Ongoing experiments (matter-wave interferometry of large molecules, optomechanical resonators, underground low-background radiation detectors) are actively constraining or could in principle rule the theory out entirely — the clearest falsifiability case of any interpretation in this domain."
depends_on: [measurement-problem-statement, born-rule-empirical-status]
related_to: [many-worlds-interpretation, de-broglie-bohm-pilot-wave, copenhagen-interpretation, von-neumann-wigner-consciousness-collapse]
last_vetted: 2026-07-07
content_hash: "sha256:2062ecb6f25d8c02"
---
RED-TEAM NOTES (2026-07-07): All three sources verified. Ghirardi, Rimini & Weber (1986), Physical Review D 34,
470, is the correct, canonical original GRW paper. Bassi, Lochan, Satin, Singh & Ulbricht (2013), Reviews of
Modern Physics 85, 471, is the standard comprehensive review of collapse models and experimental tests — correctly
cited (arXiv:1204.4325 mirrors the published RMP version). Vinante et al. (2020), Physical Review Letters 125,
100404, confirmed independently — ultracold cantilever force-sensor bounds on CSL, correct venue and volume.

Tier confirmed E2. This is the standout case in the domain for falsifiability, and the claim correctly emphasizes
this per CLAUDE.md's instruction to "reflect that in falsifiability, not tier" — GRW/CSL genuinely modifies the
dynamics (denies unitarity, i.e. denies claim 2 of the measurement-problem triad) and makes quantitatively specific
predictions (spontaneous heating/decoherence rates) that are being actively experimentally constrained (Vinante
2020 and related work by the same and other groups, e.g. Carlesso, Donadi, Bassi have pushed bounds further since,
and XENONnT/Majorana Demonstrator dark-matter detectors have also been repurposed to bound CSL parameters — this
is a genuinely live, still-narrowing experimental program, correctly represented as neither confirmed nor excluded).
This remains E2 rather than E1 precisely because the modification itself has not been confirmed — it has survived
some but not all of its natural parameter space, and free parameters remain a legitimate ad-hoc-ness objection,
accurately stated.

The closing note is an important and correct corrective: if GRW/CSL parameters were ever confirmed, this would
close off, not support, a consciousness-based reading of collapse, since the collapse mechanism here is a mindless
stochastic modification of the dynamics, identical for a rock, a Geiger counter, or a brain. No changes needed
beyond confirming status.
