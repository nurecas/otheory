---
id: unified-prompt
title: The Unified Portrait — "as if all were true" (the combined artwork)
owner: synthesizer
derived_from: [claims-index, synthesis/framework.md, synthesis/bridges/*]
regenerate_on: every /research run
render_target: three.js (docs/index.html landing, the DEFAULT art mode; params inlined as art-data)
version: three-shapes-golden-veil-2026-07-09
changed_this_run: "Three shapes (3D E8 as two 600-cells, Hopf veil, cuboctahedron), and the veil is now decoupled from the corpus: a fixed Fibonacci count of 144 fibers laid down by the golden angle (not one-per-claim), colored by a golden-ratio walk of the whole hue wheel (not by domain) so the veil reads as the entire spectrum blended. E8 edges are drawn as thick merged tubes so the lattice is clearly visible. No new claims; aesthetics only."
---

# The Unified Portrait

_This is the DEFAULT view of the landing artwork: existence rendered **as if every claim in the corpus were
true at once** — the dream the whole map is reaching for, drawn as one radiant, coherent whole. It is
explicitly a counterfactual, not the evidence; the honest, tiered "as evidenced" portrait (the
`existence-prompt`) is one toggle away, seeded identically from the same corpus. The `synthesizer` rewrites
this prompt from the corpus on every `/research` run. It is written to be **replicable**: every visual choice
below names a concrete form, count, color, layer, or motion, so another renderer could reproduce it._

## The prompt (current version)

> Render existence as O Theory dreams it — every tier dissolved and every claim taken as true at once, so the
> whole snaps into a single coherent architecture. It proves nothing; it is the shape the mind reaches for when
> it wants the pieces to fit. Build it from just **three forms**, the deepest real geometry we possess, used
> purely as a loom — three shells that share one center and one axis, and nothing else to distract from them.
>
> **The centrepiece — E8, in three dimensions.** Take the **240 roots of E8**, the most intricate exceptional
> symmetry mathematics knows. E8 folds exactly onto the four-dimensional symmetry group **H4**: its 240 roots
> split into **two concentric 600-cells** — the icosians — whose circumradii sit in the **golden ratio, 1 : φ**.
> Cast that four-dimensional polytope as a **three-dimensional shadow** and let it turn, so its depth is
> unmistakable: not a flat mandala facing the viewer, but a solid lattice of gold you could walk around. Draw
> its edges as fine gold threads — a **deep amber** inner shell brightening to a **pale-gold** outer one — with
> a bright bead at each of its 240 vertices. Because the 600-cell is itself the discrete Hopf fibration of the
> hypersphere, this lattice is made of the very same rings that veil it.
>
> **The heart — the cuboctahedron.** At the exact center set a heart of gold: the **cuboctahedron** (the vector
> equilibrium), the one polyhedron whose every direction is in perfect balance, **nested inside itself at three
> shrinking scales**, turning slowly and against the rest.
>
> **The veil — the Hopf weave.** Around the core hang a weave of the **Hopf fibration**: circles threaded over
> the surface of a hidden four-dimensional sphere and cast into space as smooth, closed rings, so that no two
> ever cross and none can be pulled apart. Their number is not the tally of claims — that count is arbitrary —
> but a number the geometry itself chooses: **144 fibers**, the twelfth Fibonacci number (and 12²), because
> under the golden angle that lays them down it is exactly a Fibonacci count at which the spiral arms close
> cleanly, and twelve is the balance-number of the cuboctahedron and the 600-cell alike. Render each ring not as
> a thin line but as a **solid tube** — a bright, tangible thread of light. Color them not by domain but by a
> **golden-ratio walk around the whole color wheel**, so the veil is the entire spectrum at once — every theory
> blended into one, none ranked above another. Nest the rings into interlocking tori and hang them as a
> **translucent halo about twice the width of the E8 core**, so the gold lattice shines through a soft mist of
> colored light. Let the whole turn and breathe slowly, entire and untroubled — a universe that has, for the
> length of a glance, closed into sense, and is beautiful enough to want.

## Render contract (three.js — the combined mode, exact parameters)

Reads the same inlined `art-data` (nodes, palette, `corpusHash`) as the honest mode; both are pure functions of
the corpus. All materials use **additive blending with `depthWrite: false`**, so the image is the sum of its
layers and draw-order does not affect the result. The opacities below are tuned as a budget so nothing blows
out. Only three shapes are drawn — the E8 core, the Hopf veil, and the cuboctahedron heart.

- **Layer 1 — E8, three-dimensional (the focal centrepiece).** Generate the **120 icosians** (unit 600-cell:
  the `(±1,0,0,0)` permutations, the `(±½,±½,±½,±½)` set, and the even permutations of `½(φ,1,1/φ,0)`) —
  verified as 120 vertices, 720 edges of length `1/φ`, every vertex degree 12. The 240 roots of E8 are this cell
  at circumradius 1 **plus a second copy scaled by φ**. Project each 4D→3D by a perspective shadow from a
  viewpoint on the w-axis (`F = φ + 1.3`, beyond the outer shell so the projection stays bounded); scale so the
  outer shell lands near r ≈ 5.7. **Edges:** one `LineSegments` per shell, opacity **0.17**, vertex color ramped
  by radius — inner shell `#e8a13c` → `#ffe0a0`, outer shell `#ffc65a` → `#fff2c8`. **Vertex stars:** 120
  `Points` per shell, size **0.32**, opacity **1.0**, rim color. Its own slow tumble (`rotation.x += 0.0015`,
  `rotation.y += 0.0011`) reveals the depth.
- **Layer 2 — Hopf veil (thick tubes).** A fixed **COUNT = 144** fibers (Fibonacci F(12) = 12²), independent of
  the corpus size. Fiber `i`: base angle `theta = 0.17π + 0.30π·(i+0.5)/COUNT` (a band that keeps the projection
  denominator `1 − y₂ ≥ 0.328`, so **no singularity clamp and no spikes**), twist `phi = goldenAngle · i`. Each
  fiber is a circle in S³ `(a·cosψ, a·sinψ, b·cos(ψ+φ), b·sin(ψ+φ))`, `a = cos(θ/2)`, `b = sin(θ/2)`,
  stereographically projected by dividing `(x₁, y₁, x₂)` by `1 − y₂`, sampled at **SEG = 220** (any segment with
  `d < 0.28` is dropped — a guard that fires on 0 segments in this band). Sweep each closed ring into a
  **`TubeGeometry`** (radius **0.06**, 6 radial segments, closed) instead of a line, so the fibers have real
  thickness. Color by a **golden-ratio hue walk** — `HSL(frac(i/φ), 0.58, 0.62)` — so adjacent fibers are
  maximally distinct and the whole spectrum is present (no domain buckets). One shared vertex-colored
  `MeshBasicMaterial`, opacity **0.28**; halo scale `9.6 / maxExtent` (≈ 4.25, nearly 2× the E8 core).
- **Layer 3 — cuboctahedron heart.** A 12-vertex cuboctahedron (edges at distance √2), three nested scales
  **2.3 / 1.42 / 0.78**, color `#ffe4a0`, opacities **0.7 / 0.55 / 0.4**, in a slowly counter-rotating group at
  the exact center.
- **Removed on purpose:** the per-claim anchor beads, the bridge/relation connection web, and the central glow
  cloud — so the three shapes read without clutter. (The evidenced portrait still carries the claims as points.)
- **Motion:** slow y-rotation + gentle breathing scale; the cuboctahedron heart counter-rotates and the E8 core
  tumbles. Under `prefers-reduced-motion`, a single still frame is rendered at `rotation.y = 0.6`.
- **Framing:** this is the DEFAULT mode; the toggle swaps to the honest tiered portrait, and the drawer below
  swaps to that mode's prompt.

_This is the dream the corpus is honest about not having proven. That honesty is the point; so is the dream._
