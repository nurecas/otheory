# Red-Team Audit — seed corpus (Stage 2)

_Steelman-then-attack of the synthesis + bridges. Mirrors the `skeptic-auditor`'s red-team output. Date:
2026-07-07._

## Tiers: all confirmed

Every one of the 13 seed claims was independently re-tiered; **all 13 verdicts were `agree` (0 tier
changes).** Notably the reviewers confirmed the deliberate re-tiering of the source essay's over-claims:
Orch-OR, IIT, and the LLM self-reports all sit at **E3 (contested)**, not the "vindicated / confirmed"
framing of `KnowledgeSource.txt`; the microtubule *anesthesia observation* is treated as suggestive, its
*Orch-OR interpretation* as contested, and the "quantum antenna for the O-Source" reading is fenced out.

## Bridges: all four registers honest

| bridge | register | ceiling | verdict |
|---|---|---|---|
| symmetry-shared-mathematics | shared-mathematics | E1 | ✅ genuinely earned (Noether & E8 both live in Lie theory) |
| recursive-coherence-analogy | analogy | E4 | ✅ "resemblance, not identity"; caps two E3 claims + one E4 |
| one-field-metaphor | metaphor | E5 | ✅ ceiling set *below* its E2/E4 endpoints — correct firewall direction |
| consciousness-as-substrate-speculation | speculation | E4 | ✅ explicitly forbids borrowing decoherence's E1 standing |

Reviewer note on `symmetry-shared-mathematics`: strictly, CLAUDE.md defines shared-mathematics as "a real,
stated *isomorphism*." The bridge demonstrates a shared *framework* (Lie theory), not an isomorphism
between Noether's theorem and E8. This does not mislead about tier; the narrative's own wording is accurate.
Logged for precision.

## Criticals found and resolved

1. **[FIXED] framework.md spine sentence laundered an E5 metaphor into E4 corroboration.** The line "a
   symbolic tradition that has said so for millennia (E5)" implied Advaita's non-duality is millennia-old
   *agreement* with the E4 proposal that consciousness is fundamental — exactly the move
   `one-field-metaphor` forbids ("metaphorical, not structural"). Reworded to "reached for the same *image*
   for millennia … not by mistaking the shared image for shared agreement."
2. **[FIXED] framework.md lumped many-worlds (E2) with attempts to "physically ground experience."**
   Many-worlds is a QM interpretation, not a consciousness-grounding program. Separated in the reworded
   spine.

## Standing watch-items (not blockers)

- The Wiest 2025 paper's own title asserts consciousness "is experimentally supported"; downstream
  synthesis must **not** inherit that title-level certainty. The claim file already uses the correct
  E3 register ("a proponent argues recent experiments are consistent with"). Keep it that way.
- On E4 claims, `confidence: high` means "high confidence in the *classification*," not endorsement of the
  position's truth. The prose mitigates this; keep the distinction explicit on the page.

**Publish-readiness (seed):** no unresolved criticals. This is bootstrap/demo data; real domains still
require a full `domain-researcher` → independent `claim-vetter` pass via `/research`.
