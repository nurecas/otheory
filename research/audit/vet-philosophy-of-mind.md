# Red-team vetting audit — philosophy-of-mind (10 claims)

**Vetter:** independent claim-vetter (adversarial pass)
**Date:** 2026-07-07

## Summary

All 10 assigned claims were already drafted to a high standard by the researcher: correct provisional
tier (E4) throughout, `type: philosophical` correctly set, and steelman/objection pairs that generally
named the right rival positions rather than straw-manning them. This pass verified every cited source by
direct fetch (or, where the fetch tool returned encoded/unreadable PDF bytes or an HTTP 403, by
independent corroborating web search against PhilPapers/PhilArchive/publisher listings) and checked that
each source actually says what the claim reports. **No fabricated citations, no dead links, no source
misrepresentations were found.** No claim was downgraded to E6 and none needed rejection — all 10 are live,
fairly-represented positions in the professional literature.

**Tier changes: none.** All 10 remain E4, `type: philosophical`. This is the correct outcome — every one of
these is a metaphysical dispute over interpretation of agreed-upon facts (behavioral/neural data,
introspective reports), not an empirically adjudicable question, and each file's `falsifiability` field
correctly states this with a specific "why" rather than a boilerplate line.

**Status:** all 10 set to `vetted` (previously `draft`). None required `disputed` status in the sense of
"the representation here is contested" — I found no case where the claim file itself mischaracterized a
position. (Distinct from the fact that the *positions themselves* are, of course, contested by rival
philosophers — that contestation is precisely what each `strongest_objection` field documents, as it
should.)

**Source fixes (minor, non-substantive):**
- `physicalism-functionalism`: no fix needed beyond confirming both SEP entries directly; tightened one
  source-title year format (SEP entries have both an original and revision date; used "orig/rev" format
  for clarity across all files).
- `property-substance-dualism`: **reworded** the strongest_objection's "no longer a respectable option"
  line. SEP (Robinson) reports this as a "widely accepted opinion" citing Weir 2023, and explicitly notes
  the claim "is itself regularly challenged." The provisional draft stated it in SEP's voice without that
  hedge; now attributed correctly as a reported professional consensus, not an uncontested fact. This
  matters because substance dualism still has real defenders (SEP names several, plus "some distinguished
  neuroscientists") and the file should not make the minority position sound more dead than the source
  says it is.
- `russellian-neutral-monism`: expanded steelman/objection with direct quotes/section references
  confirmed via fetch (Russell 1959 structuralism quote; SEP's "unsolved and serious" characterization of
  the combination problem for Russellian monism), and made explicit in the body text that this file is now
  the **single canonical claim** covering both neutral monism proper and Russellian monism, consolidating
  the previously separate `neutral-monism-ontology` (confirmed removed — no such file exists in
  `research/claims/`).
- `dual-aspect-monism`: added an explicit guard sentence in the objection field noting that SEP's mention
  of "empirically documented mind-matter correlations" (Pauli-Jung / synchronicity literature) is evidence
  about correlational psychology, not a test of the dual-aspect metaphysical claim itself — this
  distinction was implicit in the draft but is now stated so a synthesis pass cannot accidentally launder
  a correlational-psychology citation into support for the metaphysics.
- `analytic-idealism-kastrup`: no misrepresentation found; independently corroborated (via search, since
  direct PDF text extraction failed) that Kastrup's paper explicitly claims the three-way comparative
  advantage (avoiding the hard problem / combination problem / decombination problem respectively) — this
  is a strong, specific, checkable claim and it holds up. Added a note confirming the SEP panpsychism
  source is used only for general cosmopsychism background, not as third-party endorsement of Kastrup by
  name (SEP's panpsychism entry does not discuss Kastrup specifically).
- `illusionism-eliminativism`: no misrepresentation found; added a scoping note that "illusionism" (targets
  phenomenal properties specifically) is narrower than classical Churchland-style "eliminative
  materialism" (targets folk-psychological categories like belief/desire) — the claim's title already
  scopes this correctly, note added for future editors.
- `knowledge-argument-marys-room`: confirmed via direct fetch that SEP documents Jackson's own 1995/2003/
  2007 recantation exactly as the draft states — this is the single most important fact in this claim file
  (widely omitted in popular treatments) and it was already correctly and prominently present.
- `zombie-conceivability-argument`: confirmed via direct fetch of SEP's Zombies entry (Kirk) that
  two-dimensional semantics, Type-B a-posteriori-necessity responses, and Dennett's objection are all
  represented accurately, including the near-verbatim Dennett line ("the putative contrast... is
  illusory").
- `meta-problem-of-consciousness`: philarchive.org blocked direct WebFetch (403); independently
  corroborated via web search (PhilPapers, ANU research portal, philosophyofbrains.com CFP) that the paper
  exists exactly as cited and argues what the claim says. Swapped the source URL from a PhilArchive "rec"
  landing page to the direct PDF link, which search results confirm is the actual paper.

**No claim required `status: rejected`.** All 10 have at least one independently verifiable, non-sole
source (most have two), consistent with the "no source, no claim" rule.

**Falsifiability check:** all 10 falsifiability fields state a specific, non-boilerplate reason why the
claim is not empirically decidable (e.g., "correlational data is equally compatible with both readings,"
"conceivability-to-possibility is a question of modal epistemology," "no possible measurement... detect[s]
proto-experiential properties in electrons"). None simply asserts undecidability without cause. Correctly
classified E4 rather than reclassified as physics.

**Consciousness-specific caution (CLAUDE.md) compliance:** none of these 10 claims report an empirical
observation (that caution applies more to hard-problem-of-consciousness, iit-integrated-information,
orch-or-microtubules, llm-subjective-reports — outside this domain assignment). Where these files touch
empirical-adjacent material (e.g., meta-problem's "why people report puzzlement" being in-principle
cognitive science), the claim correctly separates the tractable empirical component from the E4
metaphysical interpretation, exactly per the mandated pattern.

**Majority-position guard:** confirmed `physicalism-functionalism`'s body text explicitly states
physicalism/functionalism is "the majority position among analytic philosophers of mind," backed by SEP's
own characterization ("an overwhelmingly physicalist or materialist intellectual culture"). Confirmed
`analytic-idealism-kastrup` explicitly states idealism "remains a minority position relative to
physicalism, panpsychism, and cosmopsychism" and added an explicit sentence that "consciousness is
fundamental" is not the mainstream view. No claim file in this set implies otherwise.

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| physicalism-functionalism | Physicalism + functionalism | philosophy-of-mind | philosophical | E4 | vetted | medium | Field's majority default; functionalism's absent-qualia worry is the live crack |
| property-substance-dualism | Substance & property dualism | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Substance dualism now minority (interaction problem); property dualism still taken seriously |
| panpsychism-combination-problem | Panpsychism & the combination problem | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Motivated by anti-emergence intuition; no accepted fix for subject-summing |
| russellian-neutral-monism | Neutral monism / Russellian monism | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | Now the single canonical neutral/Russellian-monism claim; faces mentalism/materialism suspicions |
| dual-aspect-monism | Dual-aspect (double-aspect) monism | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | medium | O Theory's namesake position; correlational "evidence" ≠ test of the metaphysics |
| analytic-idealism-kastrup | Analytic idealism (Kastrup) | philosophy-of-mind, metaphysics | philosophical | E4 | vetted | low | Serious peer-reviewed minority view; dissociation analogy arguably relocates rather than solves decombination |
| illusionism-eliminativism | Illusionism / eliminativism | philosophy-of-mind | philosophical | E4 | vetted | medium | Sharpest rival to the whole consciousness-is-fundamental family; "explaining the illusion" charge is unresolved |
| knowledge-argument-marys-room | Knowledge argument (Mary's Room) | philosophy-of-mind | philosophical | E4 | vetted | medium | Classic anti-physicalist argument; author Jackson himself recanted it |
| zombie-conceivability-argument | Zombie / conceivability argument | philosophy-of-mind | philosophical | E4 | vetted | medium | Conceivability-to-possibility inference is exactly where Type-B physicalists and Dennett dig in |
| meta-problem-of-consciousness | Meta-problem of consciousness | philosophy-of-mind | philosophical | E4 | vetted | medium | Chalmers's reflexive move; separates tractable cognitive-science observation from E4 metaphysical reading |
