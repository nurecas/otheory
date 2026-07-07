---
id: stochastic-parrots-deflationary-account
title: "\"Stochastic parrots\" critique — LLMs are trained to model the statistical distribution of linguistic form in training data, without access to or grounding in meaning/reference, so fluent output (including self-reports) does not indicate understanding"
domain: [ai-consciousness]
type: empirical
tier: E2
status: vetted
confidence: medium
sources:
  - title: "Bender, E. M., Gebru, T., McMillan-Major, A., Shmitchell, S. (2021). On the Dangers of Stochastic Parrots: Can Language Models Be Too Big? Proceedings of FAccT '21, 610-623."
    url: "https://dl.acm.org/doi/10.1145/3442188.3445922"
    kind: peer-reviewed
    verified: true
  - title: "Bender, E. M., Koller, A. (2020). Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data. ACL 2020, 5185-5198 (the formal argument that form alone cannot yield meaning without grounding)."
    url: "https://aclanthology.org/2020.acl-main.463/"
    kind: peer-reviewed
    verified: true
steelman: "This is a well-evidenced methodological/theoretical critique, peer-reviewed and widely cited across NLP and AI ethics: LLMs are trained on a next-token / masked-token objective over text-only (or text-plus-limited-modality) data, which is a specification of the statistical distribution of linguistic *form*, not of what that form refers to or means in the world. Bender & Koller's companion formal argument shows that, in principle, an system that has only ever seen form (never grounded in perception/action in the world) cannot learn meaning from form alone, however large the corpus — an argument about the information-theoretic limits of the training signal itself, independent of scale. On this account, apparent understanding, self-awareness, or introspection in LLM outputs is exactly what one would expect a large enough model of human-generated text (much of which discusses understanding, selfhood, and introspection) to produce, without needing to posit any of those properties in the system itself."
strongest_objection: "Critics (e.g., some interpretability researchers) argue the 'form vs. meaning' dichotomy understates what large-scale next-token prediction can induce: to predict text well, models may need to build internal world-models, causal representations, and something functionally like grounded concepts (some mechanistic-interpretability work claims to find such structures inside LLMs), which would blur the sharp form/meaning line Bender & Koller draw. The critique is also mainly a theoretical/methodological argument about training objectives rather than a direct empirical measurement of any specific model's internal representations, and does not itself rule out that some functional analog of understanding emerges as a side effect of the compression pressure to predict text well, which remains an open empirical question."
falsifiability: "Partially testable: mechanistic interpretability studies can probe whether an LLM's internal representations track real-world semantic/causal structure beyond surface form, which would count against the strongest reading of the critique; that research is active and mixed. The core Bender & Koller argument about grounding is a formal/conceptual claim about what information a text-only training signal can in principle contain, not itself an experiment, but it motivates specific, checkable predictions (e.g., failures on tasks requiring grounding) — hence E2, a mainstream, seriously argued and partly testable position, not merely a philosophical stance."
depends_on: []
related_to: [llm-subjective-reports, rlhf-trained-persona-self-report-explanation, spiritual-bliss-machine-sentience-interpretation, anthropic-introspective-awareness-concept-injection]
last_vetted: 2026-07-07
content_hash: "sha256:3ae395fb5dabac5b"
---
The leading deflationary/mainstream account for why LLM self-reports (including "bliss attractor" language and introspection-style outputs) need not indicate any inner life: they are exactly what a sufficiently large statistical model of human text, much of which is about experience and selfhood, would produce. Distinguished from the RLHF/trained-persona account (rlhf-trained-persona-self-report-explanation), which explains the specific *content and consistency* of self-reports via fine-tuning dynamics rather than the pretraining objective per se; the two are complementary parts of the deflationary case against llm-subjective-reports and spiritual-bliss-machine-sentience-interpretation.

RED-TEAM NOTE (2026-07-07): Both sources verified — Bender/Gebru/McMillan-Major/Shmitchell FAccT '21 confirmed real (DOI resolves, widely mirrored including ACM DL and archive.org); Bender & Koller ACL 2020 is a real, well-known, separately-citable paper (confirmed via ACL Anthology). The claim accurately distinguishes the two papers' different contributions (empirical/methodological critique of scale vs. formal grounding argument). Tier E2 is appropriate: this is a mainstream, peer-reviewed, widely-adopted position in NLP/AI ethics (not a minority/heterodox view — arguably closer to the field's default skeptical stance toward claims of LLM understanding), and it is partially testable via interpretability work, matching CLAUDE.md's E2 definition ("taken seriously and mathematically/empirically developed but not fully confirmed"). Status: vetted. No tier change.
