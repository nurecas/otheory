---
id: unified-prompt
title: The Unified Portrait — "as if all were true" (the combined artwork)
owner: synthesizer
derived_from: [claims-index, synthesis/framework.md, synthesis/bridges/*]
regenerate_on: every /research run
render_target: three.js (docs/index.html landing, the DEFAULT art mode; params inlined as art-data)
version: rosette-redesign-2026-07-07
changed_this_run: "Rewritten as a PRECISE, replicable prompt (parity with the evidenced 'Portrait of Existence' prompt): every element now names its exact geometry, count, color, layer and motion, so any renderer can reproduce it. Matches the redesigned art — E8 rosette (240 roots, 6720 Coxeter-plane edges, 8 rings of 30) as the legible centrepiece; smooth Hopf Villarceau veil (band 0.17π..0.47π, no singularity clamp); nested vector-equilibrium heart; soft center. No new claims; aesthetics only."
---

# The Unified Portrait

_This is the DEFAULT view of the landing artwork: existence rendered **as if every claim in the corpus were
true at once** — the dream the whole map is reaching for, drawn as one radiant, coherent whole. It is
explicitly a counterfactual, not the evidence; the honest, tiered "as evidenced" portrait (the
`existence-prompt`) is one toggle away, seeded identically from the same corpus. The `synthesizer` rewrites
this prompt from the corpus on every `/research` run. It is written to be **replicable**: every visual choice
below names a concrete form, count, color, layer, or motion, so another renderer could reproduce it._

## The prompt (current version)

> Render existence as O Theory dreams it — the **same 132 vetted claims across ten domains** as the honest
> portrait beside it, from the same seed, but with every tier dissolved and every claim taken as true at once,
> so the whole snaps into a single coherent architecture. It proves nothing; it is the shape the mind reaches
> for when it wants the pieces to fit, drawn here in full for its own sake. Build it on the deepest real
> geometry we possess, used purely as a loom, in three nested shells that share one center and one axis.
>
> **The centrepiece — the E8 rosette, the shape of symmetry itself.** Take the **240 roots of E8**, the most
> intricate exceptional symmetry mathematics knows, and project them onto their **Coxeter plane** — the one
> two-dimensional view in which their order becomes visible: **eight concentric rings of exactly thirty
> points**, a perfect thirty-fold star. Draw all **6720 minimal-distance edges** between them as fine gold
> threads — each thread almost invisible alone, but where dozens meet at each of the 240 vertices they bloom
> into bright nodes, so the eye locks at once onto the radiant lattice. Grade the gold from a **deep amber hub**
> through warm gold to a **pale rim**. Lay it nearly flat, facing the viewer, on a gentle bowl. This is the
> mandala that keeps reappearing whenever anyone reaches for a theory of everything; here it is the still,
> luminous ground of the whole image.
>
> **The heart — the vector equilibrium.** At the exact center, in the rosette's naturally dark well, set a
> heart of gold: the **cuboctahedron** whose every direction is in perfect balance, **nested inside itself at
> three shrinking scales**, turning slowly against the rest.
>
> **The veil — the Hopf weave.** Give every one of the 132 claims a second body: a fiber of the **Hopf
> fibration**, a circle threaded over the surface of a hidden four-dimensional sphere and cast into space as a
> smooth, closed ring, so that no two ever cross and none can be pulled apart. Color each ring by the **domain**
> it came from — ten hues braided evenly through the weave, none ranked above another. Nest the rings into
> interlocking tori and hang them as a **translucent halo about twice the width of the rosette**, so the gold
> mandala shines through a soft mist of colored light. On each fiber, where its claim rides, set a single
> bright bead — the proven theorem and the whispered mystical report burning with the **same steady
> intensity**, because in this vision they are all true.
>
> **The web.** Light every kinship between ideas as a fine filament that **bows gently inward** — bridges of
> shared mathematics, analogy, metaphor, and even the honest speculations, all of them here allowed to
> connect — curving toward the golden heart but never piling through the exact center, so the connections read
> as a quiet web and never as glare. Keep the center luminous but **never a white blank**: a small, soft, warm
> glow, no more. Let the whole turn and breathe slowly, entire and untroubled — a universe that has, for the
> length of a glance, closed into sense, and is beautiful enough to want.

## Render contract (three.js — the combined mode, exact parameters)

Reads the same inlined `art-data` (nodes, bridges, relations, palette, `corpusHash`) as the honest mode; both
are pure functions of the corpus. All materials use **additive blending with `depthWrite: false`**, so the
image is the sum of its layers and draw-order does not affect the result. The opacities below are tuned as a
budget so nothing blows out.

- **Seed / determinism:** the same `corpusHash`-seeded `mulberry32` PRNG as the honest mode. In this mode the
  only random draw is the anchor-vertex chosen on each claim's fiber, so the whole is reproducible.
- **Layer 1 — E8 rosette (the focal centrepiece).** `e8Roots()` → 240 roots; project each with the true
  Coxeter-plane basis (`e8Basis()`, two fixed 8-vectors, verified 30-fold: 224 edge-midpoints per 12° sector).
  `e8Edges()` → the **6720** root pairs at squared-distance 2. Scale `5.5 / maxRadius` so the outer ring lands
  at r ≈ 5.5; depth is a radius-only bowl `Z = r²·0.05 − 1` (symmetry-preserving). **Edges:** one
  `LineSegments`, opacity **0.10**, vertex color ramped by mean root radius `#e8a13c` (hub) → `#ffc65a` →
  `#fff2c8` (rim). **Ring-circles:** eight 30-fold circles tracing the rings, color `#ffe4a0`, opacity **0.08**.
  **Root stars:** 240 `Points`, size **0.30**, opacity **0.92**, alternating `#ffe0a0` / `#fff6e0`.
- **Layer 2 — Hopf veil.** One fiber per claim: base angle `theta = 0.17π + 0.30π·(i+0.5)/N` (a band that
  keeps the projection denominator `1 − y₂ ≥ 0.328`, so **no singularity clamp and no spikes**), twist
  `phi = goldenAngle · i`. Each fiber is a circle in S³ `(a·cosψ, a·sinψ, b·cos(ψ+φ), b·sin(ψ+φ))`,
  `a = cos(θ/2)`, `b = sin(θ/2)`, stereographically projected by dividing `(x₁, y₁, x₂)` by `1 − y₂`, sampled
  at **SEG = 220** (any segment with `d < 0.28` is dropped — a guard that fires on 0 segments in this band).
  One vertex-colored `LineSegments` in domain colors (`domCanvas`), opacity **0.18**; halo scale
  `9.6 / maxExtent` (≈ 4.25, nearly 2× the rosette). One anchor `Point` per claim, size **0.55**, opacity 0.95.
- **Layer 3 — vector-equilibrium heart.** A 12-vertex cuboctahedron (edges at distance √2), three nested
  scales **2.3 / 1.42 / 0.78**, color `#ffe4a0`, opacities **0.7 / 0.55 / 0.4**, in a slowly counter-rotating
  group at the exact center (inside the rosette's dark well).
- **Center glow:** 90 soft warm `Points`, radius ≤ 1.25, size 0.42, opacity **0.30**, colors `#ffe9b3` /
  `#fff3d6` — luminous, never a white blob.
- **Connection filaments:** every bridge pair (colored by `register`) at opacity **0.24** and every
  `related_to` relation (`#cdd6ea`) at opacity **0.05**, drawn as quadratic-bezier curves whose control point
  is pulled inward (`mid × 0.55`) so they bow toward — but never through — the exact center.
- **Motion:** slow y-rotation + gentle breathing scale; the VE heart counter-rotates. Under
  `prefers-reduced-motion`, a single still frame is rendered at `rotation.y = 0.6` (a ~34° tilt that presents
  the flat rosette as a facing dish, so the 30-fold symmetry is crisp even frozen).
- **Framing:** this is the DEFAULT mode; the toggle swaps to the honest tiered portrait, and the drawer below
  swaps to that mode's prompt.

_This is the dream the corpus is honest about not having proven. That honesty is the point; so is the dream._
