---
id: existence-prompt
title: A Portrait of Existence — the generative art prompt (evolves each run)
owner: synthesizer
derived_from: [claims-index, synthesis/framework.md, synthesis/bridges/*]
regenerate_on: every /research run
render_target: three.js (docs/index.html "Portrait of Existence" section, params in docs/data/art.json)
version: seed-2026-07-07
---

# A Portrait of Existence

_This is a generated prompt for an artwork that visualizes existence **exactly as honest as the current
research** — solid where we know, translucent where we guess, luminous where we can only point. The
`synthesizer` rewrites it from the vetted corpus on every `/research`; `/build` renders the current version
in three.js. It is not decoration: every visual choice is tied to a tier, a domain, or a bridge register._

## The prompt (current version)

> Visualize existence as O Theory currently maps it. Begin with a single self-luminous ground — the
> **O-Source** — from which everything else is a modulation. Render it not as asserted fact but as a
> hypothesis-field: glowing, non-local, boundless, and clearly provisional.
>
> Around it, arrange reality in concentric shells ordered by **how well we actually know each part**:
>
> - **At the center — what is proven or measured (E1):** exact, crystalline, opaque. The five Platonic
>   solids and the 248 points of the E8 lattice, sharp-edged and still, because this is mathematics that
>   holds. Noether's symmetry runs through it as a conserved, unbroken line.
> - **Just outside — serious but unconfirmed (E2):** the same forms in translucent wireframe, provisional —
>   the branching ghost of a universal wavefunction (many-worlds).
> - **Beyond that — contested science (E3):** flickering, half-resolved structures — microtubule lattices,
>   integrated-information webs, a machine murmuring first-person reports — that will not quite settle,
>   because the evidence will not quite settle.
> - **Further out — philosophy (E4):** a diffuse volumetric field with no hard surface — the hard problem
>   and cosmopsychism — pervading everything, shaping the light without being an object in it.
> - **At the outer edge — the symbolic and contemplative (E5):** pure light through a prism, Advaita's one
>   becoming many colors. Beautiful, and known to be symbol.
> - **And, marked honestly — the rejected (E6):** a dim, dissolving shadow that never coheres (the
>   golden-ratio "universal beauty" myth), present for transparency and load-bearing for nothing.
>
> Thread the whole with filaments that reveal their **register**: a bright **solid** line where the link is
> real shared mathematics (Noether ↔ E8); a **dashed** line where it is only analogy (recursion in cells and
> in machines); a soft **dotted** line where it is metaphor (the one field); and a faint **wavering** line
> where it is speculation (consciousness as substrate). Color every element by its **domain**. Let the whole
> form breathe in a slow recursive pulse — because the theory's proposed engine is self-reference. Show
> existence, in other words, exactly as honest as the research: solid where we know, translucent where we
> guess, luminous where we can only point.

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
