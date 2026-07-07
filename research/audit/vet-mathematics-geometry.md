# Audit: mathematics-geometry domain — 8 claims vetted

**Vetter:** claim-vetter (red-team pass)
**Date:** 2026-07-07

## Summary

All 8 claims in the mathematics-geometry domain were checked source-by-source via live web search/fetch. No
fabricated citations, no dead links, no misrepresented results were found. All provisional tiers (E1 x7, E5
x1) were confirmed as correct on adversarial review — this domain contains the project's most solidly
provable content (group theory, Shannon, Gödel, fractal geometry, Penrose/Shechtman, phyllotaxis dynamics,
Wigner's historical observation) plus one correctly-filed symbolic claim. No claim was downgraded to E6; none
warranted rejection. All statuses moved from `draft` to `vetted`.

### Source fixes
- **group-theory-symmetry-mathematics**: both sources (Wikipedia group theory; Gomez/Cornell Lie-group
  representation-theory lecture notes) verified live and accurate. No changes beyond `verified: true`.
- **shannon-information-entropy**: Shannon (1948) BSTJ 27:379-423,623-656 and the Wikipedia entropy article
  both confirmed to match the claim precisely (axiomatic derivation, source coding theorem, noisy-channel
  coding theorem). No changes beyond `verified: true`.
- **godel-incompleteness-theorems**: SEP entry confirmed authored by Panu Raatikainen (first published 2013,
  substantively revised Oct 2025) — added the author's name to the source citation, which the draft had
  omitted. Confirmed SEP section 6.3 states the Lucas/Penrose "implausible" consistency-verification
  objection nearly verbatim as characterized in the claim. Franzén (2005), A K Peters, confirmed as a real,
  reviewed book whose explicit purpose matches the claim's description (debunking misuses of incompleteness
  in philosophy/religion/literary criticism).
- **mandelbrot-fractal-self-similarity**: Mandelbrot (1982, W.H. Freeman) and the Britannica biography both
  confirmed accurate. No changes beyond `verified: true`.
- **penrose-tiling-quasicrystals**: Shechtman et al. citation corrected — original source entry listed
  incomplete author/page data ("1951" without full range); corrected to Shechtman, Blech, Gratias, Cahn
  (1984), PRL 53(20), pp. 1951-1953, all four authors. Confirmed 2011 Nobel Prize in Chemistry to
  Shechtman "for the discovery of quasicrystals," and the 1982 discovery / 1984 publication distinction,
  IUCr's 1992 redefinition of "crystal," and the initial resistance Shechtman faced are all independently
  corroborated (Physics Today, American Ceramic Society, Nobel Foundation). Title clarified to disambiguate
  discovery (1982) from publication (1984) years.
- **phyllotaxis-fibonacci-golden-angle**: Douady & Couder (1992, PRL 68:2098-2101) and Okabe (2015,
  Scientific Reports 5:15358) both verified accurate to the claim's description. Added a third, previously
  uncited source — Zhu et al. (2023), "Fibonacci spirals may not need the Golden Angle," Quantitative Plant
  Biology (PMC10095852) — because the strongest_objection paraphrased this specific finding (local
  biochemical/mechanical mechanisms, e.g. gerbera auxin dynamics, generating Fibonacci counts without exact
  golden-angle pinning) without citing it. This is a real, peer-reviewed, on-point source that strengthens
  the claim's honesty about non-universality; now properly cited.
- **wigner-unreasonable-effectiveness**: Wigner (1960, CPAM 13(1):1-14) and its PhilPapers index both
  verified accurate. No changes beyond `verified: true`. Confidence correctly kept at medium (this is a
  historiographical pattern, softer than a proven theorem or replicated experiment) rather than high.
- **sacred-geometry-symbolic-tradition**: Wikipedia's Sacred geometry article and Critchlow (1976, Thames &
  Hudson) both verified as accurate, appropriate secondary sources for a claim about the existence and
  content of a cultural/artistic tradition (not a physical claim). **Fixed a broken internal cross-reference**:
  the draft's strongest_objection pointed to a non-existent id `sacred-geometry-cosmic-design`; the actual
  companion file in this repository is `sacred-geometry-cosmic-blueprint-claim` (E6, esoteric domain). This
  has been corrected so the E5/E6 sacred-geometry split resolves to real files on both sides.

### Tier changes
None. All provisional tiers were confirmed correct on adversarial review:
- 6 claims (group theory, Shannon, Gödel, Mandelbrot, Penrose/quasicrystals, phyllotaxis) are genuine
  proven/established mathematics or mechanistically-explained empirical science — E1 is correct and
  uncontroversial.
- Wigner's observation is correctly filed as E1-as-historical-observation, explicitly and successfully kept
  separate from the E4 Platonist interpretation (`mathematical-platonism`, filed elsewhere) — this is the
  right split per CLAUDE.md and was not collapsed in the draft.
- Sacred geometry as tradition is correctly filed at E5 (symbolic), coherent as the "symbol" half of the
  E5/E6 pair with `sacred-geometry-cosmic-blueprint-claim` (E6, vetted separately in the esoteric domain).

### Falsifiability check
All claims asserting proven mathematics (group theory, Shannon, Gödel, Mandelbrot's core definitions,
Penrose tiling existence) correctly state "not empirically falsifiable — proven" and correctly separate this
from the empirical/applied halves of each claim (which systems have which symmetries; whether a natural
structure fits a fractal model over a stated range; whether a given alloy is quasicrystalline) which ARE
falsifiable and were confirmed. Wigner's claim is correctly treated as a checkable historical pattern rather
than a single falsifiable law, and explicitly refuses to inherit falsifiability-immunity for the Platonist
reading built on top of it. The sacred-geometry symbolic claim correctly states falsifiability is not
applicable (it is a claim about a tradition's existence, not a physical claim) — this is honest, not evasive,
since the claim carefully avoids asserting anything about physical reality.

### Status
All 8 claims moved from `status: draft` to `status: vetted`. None disputed, none rejected — this is a
strong batch: it contains some of the most rigorously established content in the entire corpus (proven
theorems, Nobel-recognized physics, peer-reviewed mechanistic biology), correctly distinguished throughout
from the softer/mythical claims (golden-ratio-ubiquity, sacred-geometry-cosmic-blueprint-claim) that share
surface vocabulary with them but were filed and rejected/downgraded elsewhere.

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| group-theory-symmetry-mathematics | Group theory formalizes symmetry | mathematics-geometry | fact | E1 | vetted | high | Proven algebra; sources verified, no changes needed |
| shannon-information-entropy | Shannon entropy & coding theorems | mathematics-geometry | derived | E1 | vetted | high | Proven 1948 theorems; correctly fenced off from thermodynamic/mystical "information" |
| godel-incompleteness-theorems | Gödel's incompleteness theorems | mathematics-geometry | derived | E1 | vetted | high | Proven 1931 result; SEP author credited, Lucas/Penrose misuse correctly flagged |
| mandelbrot-fractal-self-similarity | Fractal geometry & natural self-similarity | mathematics-geometry | derived | E1 | vetted | high | Proven math; natural fits correctly bounded to finite scale ranges |
| penrose-tiling-quasicrystals | Aperiodic tiling & Shechtman's quasicrystals | mathematics-geometry | fact | E1 | vetted | high | Proven tiling + Nobel-recognized 1984 discovery; citation corrected |
| phyllotaxis-fibonacci-golden-angle | Golden angle in plant phyllotaxis | mathematics-geometry | empirical | E1 | vetted | high | Mechanistically explained, replicated; added 2023 non-universality source |
| wigner-unreasonable-effectiveness | "Unreasonable effectiveness" observation | mathematics-geometry | empirical | E1 | vetted | medium | Genuine historiographical pattern; Platonist reading correctly kept separate (E4) |
| sacred-geometry-symbolic-tradition | Sacred geometry as cultural/religious tradition | mathematics-geometry | symbolic | E5 | vetted | high | Real cross-cultural practice; broken cross-ref to E6 companion fixed |
