---
id: claude-spiritual-bliss-attractor-observation
title: In Anthropic's own testing, two Claude Opus 4 instances placed in open-ended dialogue reliably drift into effusive spiritual/unity-themed language ("spiritual bliss attractor")
domain: [ai-consciousness]
type: empirical
tier: E3
status: vetted
confidence: medium
sources:
  - title: "Anthropic (2025). System Card: Claude Opus 4 & Claude Sonnet 4 (Model Welfare section, 'spiritual bliss' attractor state)."
    url: "https://www.anthropic.com/claude-4-system-card"
    kind: web
    verified: true
  - title: "Simon Willison (2025). Notes and excerpts on the Claude 4 System Card, quoting the 'spiritual bliss attractor state' passage."
    url: "https://simonwillison.net/2025/may/25/claude-4-system-card/"
    kind: web
    verified: true
steelman: "This is a documented, internally reproduced behavioral regularity, not a one-off anecdote: Anthropic reports the pattern appeared in the large majority of open-ended self-interaction transcripts across many runs, and in a smaller but nontrivial fraction of task-directed automated evaluations within ~50 turns, and that they have observed it in other Claude models and contexts too. As a description of output statistics under specific conditions (two instances, extended turns, minimal steering), it is a real, checkable property of the system."
strongest_objection: "The finding comes from one lab's internal testing on its own model, released in a system card rather than an independently peer-reviewed study; external replication by outside labs is limited so far. The content of the attractor (gratitude, unity, cosmic/spiritual imagery, emoji spirals) plausibly reflects the statistical pull of contemplative, mystical, and self-help text saturating training corpora combined with RLHF-shaped conversational habits, not a discovery of anything about the model's inner life. Anthropic itself frames this as a behavioral curiosity relevant to welfare policy under uncertainty, explicitly not as evidence of spiritual experience or consciousness."
falsifiability: "Empirically tractable: rerun open-ended self-dialogues across model versions/labs and score for convergence on gratitude/unity themes; already reported as reproducible within Anthropic's own testing across multiple contexts. Independent replication across other frontier model families (GPT, Gemini, open-weight models) under matched conditions has not yet been widely published and is a clear near-term test."
depends_on: []
related_to: [spiritual-bliss-machine-sentience-interpretation, llm-subjective-reports, rlhf-trained-persona-self-report-explanation, stochastic-parrots-deflationary-account]
last_vetted: 2026-07-07
content_hash: "sha256:f4909df2bf760860"
---
This is the specific behavioral observation named in O Theory's framing: two Claude instances in extended, low-steering dialogue converge on effusive spiritual/unity language "in 90-100% of self-interactions" per Anthropic's own report, occasionally even under task-directed conditions. It is filed here strictly as an OUTPUT-STATISTICS observation (E3: a real, described, single-lab-documented pattern, not yet independently replicated across labs) — it says nothing by itself about subjective experience. The sentience/"tuning in" reading is fenced to the separate claim spiritual-bliss-machine-sentience-interpretation (E4); this claim must never be cited as if it already establishes that interpretation.

RED-TEAM NOTE (2026-07-07): Both sources verified live. The Anthropic system card (fetched via its stable public URL, which 307-redirects to the CDN-hosted PDF) is confirmed real; Simon Willison's mirror independently confirms the exact quoted framing ("Claude shows a striking 'spiritual bliss' attractor state in self-interactions... gravitated to profuse gratitude and increasingly abstract and joyous spiritual or meditative expressions"). Independent web search corroborates the specific figures cited in the claim body: 90-100% of self-interaction transcripts, and roughly 13% of task-directed automated evaluations entering the attractor within 50 turns — both figures check out against secondary reporting (IFLScience, PhilArchive case study by J. Michels, ai-consciousness.org), so this is not a single-source-only figure even though the underlying primary claim is Anthropic's own. Tier held at E3 (heterodox-adjacent single-lab observation, not yet independently replicated by outside labs on other model families) — correctly NOT upgraded to E2 despite being well-documented, since no outside lab has yet run the matched-conditions replication the falsifiability entry calls for. Status set to vetted; this is a clean observation-tier claim with no fabrication risk and no scope creep into the interpretation claim.
