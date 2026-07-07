# O Theory - Project Constitution

## Scope
Work only within this repository (the otheory folder). Do not touch anything outside it unless explicitly
asked.

## Mission
Survey, deeply vet, and synthesize theories of everything across physics, mathematics/geometry, quantum
foundations, philosophy of mind, metaphysics, comparative religion, mysticism, and esoteric traditions -
including preprints and fringe material - then render the result as an honest, layered, beautifully
interactive page. Breadth is welcome. Overstatement is not.

## The prime directive: never launder evidence
The failure mode we are explicitly avoiding is stating contested or interpretive claims in the language of
established fact. Every claim carries a tier (below). The synthesis may CONNECT claims across tiers, but
must never RESTATE a lower-confidence claim as if it were higher. If you reach for "studies confirm," "the
data proves," or "science shows" - stop and check the tier.

## Vocabulary rules (enforced in all output)
- "Proof" / "theorem": ONLY for genuine mathematical or formal-logical derivation. Never for physics,
  never for a cross-domain bridge.
- "Evidence" / "supported": for empirical results, with the tier and strength stated.
- "Argument" / "position": for philosophical claims not empirically decidable.
- "Symbol" / "practice" / "report": for religious, esoteric, contemplative, phenomenological material.
- A cross-domain connection is described as exactly one of: shared-mathematics (a real, stated
  isomorphism), analogy (structural resemblance, not identity), metaphor (evocative, not structural), or
  speculation (proposed but unestablished). Label it every time.

## Evidence tiers (assign to EVERY claim)
- E1 - Established. Experimentally confirmed, reproducible, mainstream consensus.
- E2 - Mainstream-speculative. Taken seriously and mathematically developed but NOT experimentally
  confirmed (string/M-theory, loop quantum gravity, cosmic inflation, many-worlds).
- E3 - Heterodox / minority. Published by credentialed researchers but a contested minority view (Orch-OR,
  strong IIT claims, some emergent-gravity proposals).
- E4 - Philosophical. Not empirically decidable even in principle; argued by reason (panpsychism,
  idealism, mathematical Platonism, framings of the hard problem).
- E5 - Symbolic / contemplative. Meaningful as symbol, practice, or first-person report, not as empirical
  claim (sacred geometry as symbolic and mathematical language, religious cosmologies, meditative and
  mystical phenomenology).
- E6 - Unsupported / pseudoscientific. Presents as science but fails vetting: misuses terms, no evidence,
  logically flawed, or contradicts established results. Still recorded for transparency, clearly marked,
  never used as support.

A claim being E5 is NOT a demerit - it is an honest classification. Symbolic material is included on its
own terms, never smuggled into physics.

## Source-quality rules
- Physics/math: prefer peer-reviewed journals and arXiv. Treat viXra, personal blogs, and press releases
  as low-quality and tag accordingly. A preprint is a preprint - say so.
- Religion/philosophy: cite primary texts and reputable scholarship, not popularizers. Represent a
  tradition's claims as that tradition's claims, never as established fact.
- Fringe/esoteric: represent accurately and attribute; vet like anything else. Popularity or antiquity is
  not evidence.
- Every claim resolves to at least one real, checkable source. No source, no claim. Never invent a
  citation, author, date, or result.

## Falsifiability rule
Anything asserted as physics must state what would confirm it, what would falsify it, and whether that test
is currently feasible. If nothing could falsify it, it is not physics - reclassify (usually E4 or E5).

## Consciousness-specific caution
Where over-claiming is worst. Report empirical findings (anesthesia/microtubule work, terminal lucidity,
observed LLM behavior such as a "bliss attractor") as observations at their actual tier. Their metaphysical
interpretations (filtration/reception, machine sentience, non-local mind) are SEPARATE claims, usually E4,
tiered separately from the observation. For psi / non-local mind: log the specific studies, the replication
status, and the strongest methodological objections, and tier honestly (generally E3-with-heavy-caveats or
E6). Never present as established.

## Synthesis rules
- The combined framework is a layered map, not a flat "it is all one thing." State which layer each
  component sits on and the confidence.
- Keep an open-problems ledger: the real gaps, contradictions, and tensions between domains.
- Prefer genuine cross-domain themes with real content (symmetry/invariance, information as substrate,
  recursion/self-reference, observer-dependence, scale/renormalization) over vibes. Show the actual link
  and label its register.

## IP / quoting rules
Paraphrase by default. Quotes under ~15 words, one per source max, always attributed. Respect translation
copyrights on religious texts (originals are often public domain; modern translations may not be). Cite
everything.

## Workflow contract (how the system coordinates)
- All durable state is in files under research/. Do not rely on memory or another agent's context.
- Agents write ONLY within research/: researchers write claim files + domain notes; the vetter edits tiers
  and index; the synthesizer writes synthesis/*; the auditor writes audit reports under research/.
- The site build is a deterministic generator (run via /build) and is the ONLY writer to docs/.
- research/claims-index.md is the single source of truth for what has been vetted and how.
