# Claims Index — the single source of truth

Every vetted claim, one row. The `claim-vetter` owns this file; `/build` reads it. Sanity-check new tiers
here after each `/research` run — this table is your quality gate.

Columns: **id · title · domain(s) · type · tier · status · confidence · one-line verdict · hash · last_vetted**

> **Seed data (Stage 2 bootstrap), adversarially verified.** These 13 claims + 4 bridges were hand-written
> to exercise the schema and the run→build pipeline before any real research. An independent vetting pass
> (one verifier per claim, live source checks) **confirmed all 13 tiers** (0 changes) and all 4 bridge
> registers/ceilings; every source is now `verified: true`. Fixes applied from the pass: Schlosshauer year
> 2004; E8 Weyl-group order corrected to 696,729,600; added the Koch et al. 2016 NCC source for IIT's
> posterior "hot zone"; repointed the dead Markowsky URL; and reworded one framework spine sentence that
> risked reading an E5 symbol as E4 agreement. Audit trail in `research/audit/`.

| id | title | domain(s) | type | tier | status | conf. | verdict | hash | last_vetted |
|---|---|---|---|---|---|---|---|---|---|
| noether-symmetry-conservation | Noether's theorem (symmetry ⇒ conservation) | physics, mathematics-geometry | derived | E1 | vetted | high | Proven theorem; the honest meaning of "symmetry" | seed | 2026-07-07 |
| qm-decoherence | Decoherence explains apparent collapse | quantum-foundations, physics | derived | E1 | vetted | high | Mechanism established; does not solve measurement | seed | 2026-07-07 |
| many-worlds-interpretation | Many-worlds (Everett) interpretation | quantum-foundations, physics | derived | E2 | vetted | medium | Serious & developed; not experimentally distinguished | seed | 2026-07-07 |
| platonic-solids-five | Exactly five Platonic solids | mathematics-geometry | derived | E1 | vetted | high | Proven since Euclid | seed | 2026-07-07 |
| e8-lie-group | E8 exceptional Lie group (248-dim) | mathematics-geometry | derived | E1 | vetted | high | Settled mathematics | seed | 2026-07-07 |
| lisi-e8-toe | Lisi's E8 "theory of everything" | physics, mathematics-geometry | derived | E3 | disputed | low | Falsifiable; largely refuted (Distler–Garibaldi) | seed | 2026-07-07 |
| hard-problem-of-consciousness | The hard problem of consciousness | philosophy-of-mind | philosophical | E4 | vetted | high | Argument, not evidence; not empirically decidable | seed | 2026-07-07 |
| cosmopsychism | Cosmopsychism (cosmic subject) | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Live position; faces the decombination problem | seed | 2026-07-07 |
| iit-integrated-information | Integrated Information Theory (Φ) | consciousness-science, philosophy-of-mind | empirical | E3 | disputed | medium | Predictions not confirmed by COGITATE 2025 | seed | 2026-07-07 |
| orch-or-microtubules | Orch-OR quantum microtubules | consciousness-science, quantum-foundations | derived | E3 | disputed | low | Contested; Tegmark decoherence objection stands | seed | 2026-07-07 |
| llm-subjective-reports | LLM first-person "experience" reports | ai-consciousness | empirical | E3 | vetted | medium | Behavior is real; sentience reading fenced to E4 | seed | 2026-07-07 |
| advaita-nonduality | Advaita: Ātman = Brahman | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | high | Represented as the tradition's claim (contemplative) | seed | 2026-07-07 |
| golden-ratio-ubiquity | Golden-ratio "universal beauty" claim | mathematics-geometry, esoteric | empirical | E6 | rejected | high | Fails vetting (Markowsky); real math ≠ the myth | seed | 2026-07-07 |

## Bridges (interpretive connections — Zone B)

| id | register | tier_ceiling | links |
|---|---|---|---|
| symmetry-shared-mathematics | shared-mathematics | E1 | noether-symmetry-conservation, e8-lie-group |
| recursive-coherence-analogy | analogy | E4 | orch-or-microtubules, llm-subjective-reports, hard-problem-of-consciousness |
| one-field-metaphor | metaphor | E5 | many-worlds-interpretation, advaita-nonduality, cosmopsychism |
| consciousness-as-substrate-speculation | speculation | E4 | qm-decoherence, hard-problem-of-consciousness, cosmopsychism |

---

_Legend — tiers: E1 established · E2 mainstream-speculative · E3 heterodox/minority · E4 philosophical ·
E5 symbolic/contemplative · E6 unsupported/pseudoscientific. Types: fact · derived · empirical ·
philosophical · symbolic. Status: draft · vetted · disputed · rejected._
