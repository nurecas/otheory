# Metaphysics — Domain Survey

Scope: "what is fundamental" positions — the ontology of ultimate reality. This survey covers candidate
answers to the question of what the basic furniture of the world is (matter, mind, information,
mathematics, process, structure, or the whole itself), plus two framing questions that cut across all of
them (emergence, and why there is anything at all). All content in this domain is philosophical argument,
not empirical science; tiers here are almost entirely **E4** by definition (per CLAUDE.md: "Philosophical.
Not empirically decidable even in principle; argued by reason"). A few positions (Tegmark's MUH,
pancomputationalism) are argued using mathematics or presented in physics venues but remain non-decidable
and are explicitly flagged as such rather than promoted to E1/E2.

## Coverage in this pass (SURVEY phase)

10 new claim files, plus the pre-seeded `cosmopsychism` (not duplicated here):

| id | position | one-line stance |
|---|---|---|
| mathematical-platonism | Mathematical Platonism | Abstract mathematical objects exist mind-independently |
| it-from-bit-information-ontology | Wheeler's "it from bit" | Information (binary yes/no acts) is the ultimate substrate of physical existence |
| pancomputationalism-digital-physics | Pancomputationalism / digital physics | The universe literally is a computation (e.g. cellular automaton) |
| tegmark-mathematical-universe-hypothesis | Tegmark's MUH | The universe IS a mathematical structure, not merely described by one |
| process-philosophy-actual-occasions | Whitehead's process philosophy | Momentary experiential "actual occasions," not substances, are basic |
| ontic-structural-realism | Ladyman & Ross OSR | Relational structure, not objects with intrinsic properties, is fundamental |
| priority-monism-schaffer | Schaffer's priority monism | The whole cosmos is the one basic entity; parts are dependent fragments |
| neutral-monism-ontology | Neutral monism | The ultimate stuff is neither mental nor physical but a common neutral base |
| strong-emergence-contested | Strong vs. weak emergence | Some higher properties (e.g. consciousness) may be in-principle irreducible novelties — contested |
| principle-of-sufficient-reason | PSR / "why something not nothing" | Every fact, including existence itself, may (or may not) require an explanation |

(Pre-existing, not duplicated: `cosmopsychism` — the universe as a whole is a conscious subject; filed
under both metaphysics and philosophy-of-mind.)

## The landscape, organized by candidate fundamental "stuff"

- **Matter / physical stuff**: the default background assumption of physicalism is not separately filed
  here as a metaphysics claim (it is the implicit baseline against which the other positions argue); it
  shows up as the target of objections throughout (e.g. what strong emergence and neutral monism react
  against).
- **Mind**: cosmopsychism (seeded) and, adjacent to it, neutral monism (which denies mind is basic in favor
  of a prior neutral category) and process philosophy (which builds proto-experience into the basic units
  of reality, panexperientialism, without making the *whole cosmos* a subject the way cosmopsychism does).
- **Information**: Wheeler's "it from bit" and its stronger cousin, pancomputationalism/digital physics.
  These are the positions closest to O Theory's own vocabulary ("information as substrate") and are
  explicitly filed as E4 argument, not physics, despite originating with a physicist.
- **Mathematics**: mathematical Platonism (the general ontological claim about abstracta) and Tegmark's MUH
  (the specific, mathematically developed claim that the physical universe just *is* one such abstract
  structure). MUH depends on Platonism being at least coherent — flagged via `depends_on`.
- **Structure/relations**: ontic structural realism, a physics-engaged but still-philosophical claim that
  relational structure (not objects-plus-intrinsic-properties) is what physics is fundamentally about.
- **Process**: Whitehead's process philosophy — momentary events of becoming, not enduring substances, are
  basic. Directly relevant to O Theory's "process/experience as fundamental" framing.
- **The Whole**: priority monism (Schaffer) — the cosmos as a whole is the one basic entity; distinguished
  from cosmopsychism by NOT attributing mentality to that whole.
- **Framing questions**: strong-vs-weak emergence (does the fundamental level even need to explain
  everything, or can genuinely novel properties arise?) and the Principle of Sufficient Reason /
  "why is there something rather than nothing" (the deepest-level question any candidate fundamental
  answer is implicitly trying to resolve).

## Observation vs. interpretation (kept separate per project rules)

- "Physics is highly successfully described by mathematics" (uncontroversial observation) is distinct from
  "the universe IS a mathematical structure" (Tegmark's MUH, contested interpretation) and from "abstract
  mathematical objects exist mind-independently" (Platonism, a further, logically prior contested claim).
- "Quantum information theory and the holographic principle are mathematically fruitful and empirically
  well-supported formalisms" (E1/E2, not filed as a metaphysics claim here) is distinct from "information is
  therefore the ultimate stuff of reality" (Wheeler's ontological interpretation, E4).
- "Complex, practically unpredictable patterns arise from simple rules" (weak emergence, uncontroversial) is
  distinct from "some higher-level properties are in-principle irreducible novelties with their own causal
  powers" (strong emergence, contested, E4).

## Tier distribution

All 10 new claims are **E4** (philosophical/not empirically decidable), consistent with CLAUDE.md's
definition of the tier and with this being a metaphysics-domain survey. None were assigned E1-E3 (no
empirical confirmation is possible for these theses by their own nature) and none are E5/E6 (they are
argued as philosophy/reason, not as religious/contemplative symbol or as failed pseudoscience). Two claims
(Tegmark's MUH, pancomputationalism) are explicitly flagged as *presented* in physics-adjacent language
while remaining E4, per the domain brief's instruction not to let mathematical development smuggle a
non-decidable thesis into E1/E2.

Confidence is mixed: `medium` where the position is a major, actively-defended contemporary academic view
with clear primary sources (process philosophy, OSR, priority monism, mathematical Platonism, strong
emergence); `low` where the position is either a minority/historical view with thin current defense
(neutral monism), a suggestive slogan more than a developed theory (it-from-bit, pancomputationalism), or a
single-author program whose central claim is explicitly non-testable despite formal development (Tegmark's
MUH), or where the question of well-formedness is itself contested (PSR).

## Sources used

All claims cite at least one real, resolvable source; Stanford Encyclopedia of Philosophy entries were the
primary secondary source (platonism-mathematics, process-philosophy, structural-realism, monism,
neutral-monism, properties-emergent, sufficient-reason, nothingness, computation-physicalsystems), backed by
primary texts/papers where feasible (Whitehead's *Process and Reality*; Wheeler's "Information, Physics,
Quantum"; Tegmark's arXiv:0704.0646 plus the published critical response Vaas arXiv:0803.0944; Schaffer's
"Monism: The Priority of the Whole"; Ladyman's 1998 paper and Ladyman & Ross's *Every Thing Must Go*).
Several book-form primary sources (Ladyman & Ross monograph, Wolfram's *A New Kind of Science*, Russell's
*The Analysis of Mind*) are cited but marked `verified: false` pending direct-text confirmation in a
deep-dive pass — their existence and content are well-established via the secondary sources, but I have not
personally read the primary text, so a vetter should treat those specific citation lines as needing a
closer check rather than treat the claim itself as unverified.

## Coverage gaps / candidates for a future pass

- **Physicalism/materialism** itself was not filed as a standalone claim — it is the implicit default
  against which most of the above positions argue, but a dedicated claim stating its content, its main
  argument (causal closure, explanatory success of physical science), and its main objection (the hard
  problem, already filed under philosophy-of-mind) would round out the picture and should be considered.
- **Idealism** (Berkeley-style: mind is the only fundamental category, matter derivative) is closely related
  to neutral monism and cosmopsychism but was not separately filed; it overlaps heavily with
  philosophy-of-mind's territory and may belong there or need explicit scoping to avoid duplication.
- **Bundle theory vs. substance-attribute metaphysics** (the object-level debate one level below priority
  monism/OSR) was not covered.
- **Modal realism** (David Lewis: all possible worlds are equally real) was not covered and is a natural
  companion to Tegmark's Level IV multiverse / MUH.
- Wolfram's specific "ruliad"/cellular-automaton physics program is gestured at inside
  `pancomputationalism-digital-physics` but not given its own deep claim; a deep-dive pass could separate
  Wolfram's specific technical program from the general pancomputationalist thesis.
- 't Hooft's cellular-automaton interpretation of quantum mechanics (mentioned in the steelman of
  pancomputationalism) is a named, credentialed-physicist heterodox program that could get its own claim,
  likely tiered E3 (heterodox but published by a Nobel laureate) rather than E4, since it makes more
  concrete physical commitments than generic pancomputationalism.

## Domain-level tensions (for the synthesizer, not resolved here)

- **Mathematics vs. mind vs. information as "most fundamental"**: Platonism/MUH, process philosophy, and
  it-from-bit/pancomputationalism are not merely different flavors of one idea — they are competing,
  largely incompatible answers to what is ontologically prior (abstract structure vs. experience vs.
  information-bearing physical acts), all invoked loosely by "substrate" language in the wild without
  acknowledging the conflict.
- **OSR vs. priority monism vs. process philosophy** all reject "little individual substances with intrinsic
  properties" as fundamental, but disagree on what replaces it (relations without relata; one undivided
  whole; discrete momentary experiential events) — these are not the same position and should not be
  collapsed together in synthesis.
- **Strong emergence is in tension with, and sometimes invoked to rescue, both physicalism and substrate
  monism**: it can be used either to defend physicalism against the hard problem (mind is a strongly
  emergent-but-still-physical novelty) or, awkwardly, borrowed by non-physicalist substrate views to explain
  how a simple ground produces rich apparent diversity — the same concept is doing opposite argumentative
  work in different places.
- **The Principle of Sufficient Reason cuts against ungrounded "brute fact" substrates**: any claim that
  some substrate (informational, mathematical, experiential) simply IS fundamental and requires no further
  explanation is in implicit tension with PSR-style demands for a reason why that substrate rather than
  another, or rather than nothing; O Theory's O-Source, like every rival candidate here, has this same
  regress problem and is not a special exception to it.
