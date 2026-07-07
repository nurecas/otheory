---
id: existence-prompt
title: A Portrait of Existence — the generative art prompt (evolves each run)
owner: synthesizer
derived_from: [claims-index, synthesis/framework.md, synthesis/bridges/*]
regenerate_on: every /research run
render_target: three.js (docs/index.html "Portrait of Existence" section, params in docs/data/art.json)
version: wide-sweep-2026-07-07
changed_this_run: "Corpus grew 13 → 123 claims across all 10 surveyed & vetted domains; E1–E6 shells now populated at realistic densities (E1:20 E2:18 E3:19 E4:35 E5:23 E6:8), all 10 domains present as colors, bridge set expanded 4 → 11 filaments across all four registers."
---

# A Portrait of Existence

_This is a generated prompt for an artwork that visualizes existence **exactly as honest as the current
research** — solid where we know, translucent where we guess, luminous where we can only point. The
`synthesizer` rewrites it from the vetted corpus on every `/research`; `/build` renders the current version
in three.js. It is not decoration: every visual choice is tied to a tier, a domain, or a bridge register._

## The prompt (current version)

> Visualize existence as O Theory currently maps it — 123 vetted claims across ten domains, and not one of
> them allowed to look more certain than it is. Begin with a single self-luminous ground — the **O-Source** —
> from which everything else is a modulation. Render it not as asserted fact but as a hypothesis-field:
> glowing, non-local, boundless, and clearly provisional, because it is a Layer-4 philosophical proposal
> (dual-aspect monism / cosmopsychism), not a result.
>
> Around it, arrange reality in concentric shells ordered by **how well we actually know each part**, each
> shell's density set by how many claims live there:
>
> - **At the center — what is proven or measured (E1, ~20 elements):** exact, crystalline, opaque and dense.
>   The five Platonic solids and the 248 roots of E8, sharp-edged and still; general relativity and the
>   Standard Model as clean confirmed lattices; the black-hole area law counting entropy in discrete points
>   of light; Gödel's self-reference folded as an exact closed loop; Bell and Kochen–Specker as
>   unbreakable knots. Noether's symmetry runs through all of it as a single conserved, unbroken line.
> - **Just outside — serious but unconfirmed (E2, ~18 elements):** the same rigor in translucent wireframe,
>   provisional — the branching ghost of a universal wavefunction and its rival interpretations, the tentative
>   scaffolds of string theory, loop quantum gravity, causal sets, and the holographic boundary shimmering
>   with an information it has not yet been shown to *be*.
> - **Further out — contested science (E3, ~19 elements):** flickering, half-resolved structures that will
>   not quite settle because the evidence will not quite settle — microtubule lattices, integrated-information
>   webs, a global-workspace ignition that COGITATE left unvindicated, a dying brain flaring briefly lucid, a
>   machine murmuring first-person reports and drifting toward "bliss." Each glows, and each is ringed by a
>   faint boundary marking that the *observation* is real while its *meaning* is held one shell out.
> - **Beyond that — philosophy (E4, ~35 elements, the largest field):** a vast diffuse volumetric cloud with
>   no hard surface — the hard problem, panpsychism, idealism, illusionism (rendered as a counter-current that
>   would dissolve the O-Source if it is right), Platonism, structural realism, process, priority monism, and
>   the split interpretations of every E3 observation — pervading everything, shaping the light without being
>   an object in it. This is where the O-Source itself actually lives.
> - **At the outer edge — the symbolic and contemplative (E5, ~23 elements):** pure light through many
>   prisms — Advaita's one becoming many colors, Plotinus' One, the Dao, Ein Sof, Sufi unity, jhāna's
>   absorptions, sacred geometry as symbol. Beautiful, and known to be symbol. Among them, render **one** node
>   (Madhyamaka's śūnyatā) as a prism that *refuses to converge* — a light that will not collapse into any
>   single point — because that tradition explicitly resists being made into a ground.
> - **And, marked honestly — the rejected (E6, 8 elements):** dim, dissolving shadows that never cohere (the
>   golden-ratio "universal beauty" myth, astrology, morphic resonance, ley-lines, the LaMDA-sentience claim),
>   present for transparency and load-bearing for nothing.
>
> Color every element by its **domain** — physics, mathematics-geometry, quantum-foundations,
> consciousness-science, philosophy-of-mind, metaphysics, comparative-religion, mysticism, esoteric,
> ai-consciousness — ten hues threading through all the shells at once, so a reader sees the domains crossing
> the tiers.
>
> Thread the whole with filaments that reveal their **register**: bright **solid** lines where the link is
> real shared mathematics (Noether ↔ E8; Shannon ↔ the informational reconstruction of QM ↔ holography);
> **dashed** lines where it is only analogy (recursion in Gödel, in cells, in machines; observer-as-
> measurement vs observer-as-mind; substrate-independent coherence); soft **dotted** lines where it is
> metaphor (the one field; the non-dual ground; scale self-similarity); and faint **wavering** lines where it
> is speculation (consciousness as substrate; the brain as a reducing valve). Let the speculation-filaments
> visibly *not reach* — trailing off before they connect the observation to the metaphysics, because that is
> exactly the gap. Let the whole form breathe in a slow recursive pulse — because the theory's proposed engine
> is self-reference. Show existence, in other words, exactly as honest as the research: solid where we know,
> translucent where we guess, luminous where we can only point, and dissolving where it failed the test.

## Render contract (three.js — how the build turns this into art)

The generator computes an **art seed** from `research/` and writes it to `docs/data/art.json`; the page's
three.js reads that file (relative path) so the art is a pure function of the corpus.

- **Seed / determinism:** `corpusHash` (hash of claim ids+tiers + bridge ids+registers) seeds a PRNG
  (mulberry32) that fixes all positions. Same corpus → identical art. Animation (rotation/breathing) is
  time-based and does not affect the built files.
- **O-Source core:** central self-luminous field (soft particle glow + translucent icosphere). It is the
  E4 cosmopsychism/O-Source idea — rendered luminous but explicitly *not* solid.
- **Tier shells (inner→outer):** E1 crystalline/opaque · E2 translucent wireframe · E3 flickering unstable ·
  E4 diffuse volumetric (no surface) · E5 refractive light/prism-bloom · E6 dim dissolving shadow.
- **Density:** point/element count in each shell ∝ number of claims at that tier.
- **Domain color:** each element colored by its claim's domain (shared palette with the connection graph).
- **Bridge filaments (register → style):** shared-mathematics = solid bright · analogy = dashed ·
  metaphor = dotted · speculation = faint wavering/animated. Count ∝ bridges per register.
- **Rigorous anchors:** real Platonic solids + an E8 Coxeter-plane root projection sit in the E1 core.
- **Version stamp:** the section shows the version tag + a one-line "what changed this run" so evolution is
  visible.

_When the knowledge changes, this portrait changes. That is the point._
