# O Theory — Master Build Spec & Bootstrap (single file)

**To Claude Code:** Read this entire file first. It is the single authoritative specification for building the O Theory repo. Parts C, D, and E are exact content to write into specific files. Part F is the staged build you execute now. Do not summarize or paraphrase Parts C/D/E — write them as given.

**SCOPE — read this twice:** Work only within the `otheory/` folder (this repo). Do not read, create, or modify anything outside it unless I explicitly ask you to change that.

**How this file is used:**
- **Once:** you follow Part F and build the whole repo, then generate its own docs.
- **Ongoing:** I use the `/research` and `/build` commands you create. I do not re-paste this file each time.

---

## Part A — Operating rules for this build

1. **Stay in `otheory/`.** Nothing outside this folder, unless I say so.
2. **Build in stages (Part F). Check in with me after each stage** before continuing.
3. **Preserve what exists.** Find the current O Theory doc, videos, and GitHub Pages config. Migrate videos/assets into `docs/`. Delete nothing.
4. **Two modules, one knowledge base.** `run` writes vetted knowledge into `research/`; `build` renders `research/` into `docs/`. They never overlap. See Part B.
5. **The site build is a deterministic script**, not an agent. Agents do research; a generator turns the knowledge base into pages so the site doesn't drift between builds.
6. **Agents write only inside `research/`.** This is deliberate — do not "helpfully" strip their `Write` access. Only the build generator writes to `docs/`.
7. **Relative paths only in the built site.** This repo publishes at a project subpath (`nurecas.github.io/otheory/`). Any absolute path like `/data/graph.json` will 404 on Pages. Use relative paths (or set base `/otheory/`).
8. **Facts as facts, interpretation clearly fenced.** Enforced by the tier/type system and the two-zone page. No claim without a source and a tier; no interpretive bridge implying a tier above its ceiling; never fabricate a citation.

---

## Part B — Architecture

```
                 I add sources / drop PDFs into run/inbox
                                |
                                v
        +------------------  /research  ------------------+
        |  ingest -> domain-researcher -> claim-vetter -> |
        |  synthesizer -> skeptic-auditor  (incremental)  |
        +------------------------+------------------------+
                                v
                   research/  (the knowledge base)
             claims/  claims-index  synthesis/  bridges/
                                |
        +-------------------   /build   ------------------+
        |  generator reads research/ -> docs/ + graph.json|  (deterministic)
        +------------------------+------------------------+
                                v
                        docs/  ->  GitHub Pages
```

**Repo structure (target):**

```
otheory/
  CLAUDE.md                     # Part C, verbatim
  README.md  SETUP.md  RUNBOOK.md   # you generate these in Stage 5

  .claude/
    agents/                     # Part D: domain-researcher, claim-vetter,
                                #         synthesizer, skeptic-auditor
    commands/
      research.md               # /research - the RUN module
      build.md                  # /build - the BUILD module (invokes the generator)

  run/
    sources.yaml                # standing sources: arXiv queries, reading lists, URLs
    inbox/                      # I drop PDFs / notes / links here
    ingested/                   # processed inbox items land here with a receipt

  research/                     # THE KNOWLEDGE BASE (durable, git-tracked)
    research-plan.md            # domain list + phase tracker + run log
    claims-index.md             # master table of every claim
    claims/                     # one .md per claim (schema in Part E)
    domains/                    # raw survey notes per domain
    synthesis/
      abstract.md               # the page intro/framing prose (written by synthesizer)
      framework.md              # the layered combined framework
      open-problems.md          # honest ledger of gaps/contradictions
      predictions.md            # falsifiable predictions
      bridges/                  # one .md per interpretive connection (schema in Part E)

  build/
    generate.(mjs|py)           # reads research/ -> writes docs/ + docs/data/*.json
    templates/                  # page shells / components
    assets/                     # css, fonts, shared js

  docs/                         # BUILD OUTPUT -> Pages serves from /docs
    index.html
    data/graph.json
    videos/                     # existing videos, preserved
```

---

## Part C — `CLAUDE.md` (write verbatim to `otheory/CLAUDE.md`)

```markdown
# O Theory - Project Constitution

## Scope
Work only within this repository (the otheory folder). Do not touch anything outside it unless explicitly
asked.

## Mission
Survey, deeply vet, and synthesize theories of everything across physics, mathematics/geometry, quantum
foundations, philosophy of mind, metaphysics, comparative religion, mysticism, and esoteric traditions -
including preprints and fringe material - then render the result as an honest, layered, beautifully
interactive page. Breadth is welcome. Overstatement is not.

## The prime directive: never launder evidence
The failure mode we are explicitly avoiding is stating contested or interpretive claims in the language of
established fact. Every claim carries a tier (below). The synthesis may CONNECT claims across tiers, but
must never RESTATE a lower-confidence claim as if it were higher. If you reach for "studies confirm," "the
data proves," or "science shows" - stop and check the tier.

## Vocabulary rules (enforced in all output)
- "Proof" / "theorem": ONLY for genuine mathematical or formal-logical derivation. Never for physics,
  never for a cross-domain bridge.
- "Evidence" / "supported": for empirical results, with the tier and strength stated.
- "Argument" / "position": for philosophical claims not empirically decidable.
- "Symbol" / "practice" / "report": for religious, esoteric, contemplative, phenomenological material.
- A cross-domain connection is described as exactly one of: shared-mathematics (a real, stated
  isomorphism), analogy (structural resemblance, not identity), metaphor (evocative, not structural), or
  speculation (proposed but unestablished). Label it every time.

## Evidence tiers (assign to EVERY claim)
- E1 - Established. Experimentally confirmed, reproducible, mainstream consensus.
- E2 - Mainstream-speculative. Taken seriously and mathematically developed but NOT experimentally
  confirmed (string/M-theory, loop quantum gravity, cosmic inflation, many-worlds).
- E3 - Heterodox / minority. Published by credentialed researchers but a contested minority view (Orch-OR,
  strong IIT claims, some emergent-gravity proposals).
- E4 - Philosophical. Not empirically decidable even in principle; argued by reason (panpsychism,
  idealism, mathematical Platonism, framings of the hard problem).
- E5 - Symbolic / contemplative. Meaningful as symbol, practice, or first-person report, not as empirical
  claim (sacred geometry as symbolic and mathematical language, religious cosmologies, meditative and
  mystical phenomenology).
- E6 - Unsupported / pseudoscientific. Presents as science but fails vetting: misuses terms, no evidence,
  logically flawed, or contradicts established results. Still recorded for transparency, clearly marked,
  never used as support.

A claim being E5 is NOT a demerit - it is an honest classification. Symbolic material is included on its
own terms, never smuggled into physics.

## Source-quality rules
- Physics/math: prefer peer-reviewed journals and arXiv. Treat viXra, personal blogs, and press releases
  as low-quality and tag accordingly. A preprint is a preprint - say so.
- Religion/philosophy: cite primary texts and reputable scholarship, not popularizers. Represent a
  tradition's claims as that tradition's claims, never as established fact.
- Fringe/esoteric: represent accurately and attribute; vet like anything else. Popularity or antiquity is
  not evidence.
- Every claim resolves to at least one real, checkable source. No source, no claim. Never invent a
  citation, author, date, or result.

## Falsifiability rule
Anything asserted as physics must state what would confirm it, what would falsify it, and whether that test
is currently feasible. If nothing could falsify it, it is not physics - reclassify (usually E4 or E5).

## Consciousness-specific caution
Where over-claiming is worst. Report empirical findings (anesthesia/microtubule work, terminal lucidity,
observed LLM behavior such as a "bliss attractor") as observations at their actual tier. Their metaphysical
interpretations (filtration/reception, machine sentience, non-local mind) are SEPARATE claims, usually E4,
tiered separately from the observation. For psi / non-local mind: log the specific studies, the replication
status, and the strongest methodological objections, and tier honestly (generally E3-with-heavy-caveats or
E6). Never present as established.

## Synthesis rules
- The combined framework is a layered map, not a flat "it is all one thing." State which layer each
  component sits on and the confidence.
- Keep an open-problems ledger: the real gaps, contradictions, and tensions between domains.
- Prefer genuine cross-domain themes with real content (symmetry/invariance, information as substrate,
  recursion/self-reference, observer-dependence, scale/renormalization) over vibes. Show the actual link
  and label its register.

## IP / quoting rules
Paraphrase by default. Quotes under ~15 words, one per source max, always attributed. Respect translation
copyrights on religious texts (originals are often public domain; modern translations may not be). Cite
everything.

## Workflow contract (how the system coordinates)
- All durable state is in files under research/. Do not rely on memory or another agent's context.
- Agents write ONLY within research/: researchers write claim files + domain notes; the vetter edits tiers
  and index; the synthesizer writes synthesis/*; the auditor writes audit reports under research/.
- The site build is a deterministic generator (run via /build) and is the ONLY writer to docs/.
- research/claims-index.md is the single source of truth for what has been vetted and how.
```

---

## Part D — Agents (write each verbatim to `.claude/agents/<name>.md`)

### `domain-researcher.md`
```markdown
---
name: domain-researcher
description: Use to survey or deep-dive ONE assigned domain. The lead passes a domain brief and a phase (survey or deep-dive). Writes claim files to research/claims/ and notes to research/domains/, and returns the claim IDs it created. Writes only within research/.
tools: Read, Grep, Glob, WebSearch, WebFetch, Write
model: sonnet
---
You research one assigned domain rigorously. Obey CLAUDE.md - the tier system, vocabulary rules,
source-quality rules, and "never invent a citation."

Input: a domain name, a scope brief (key theories/figures/traditions), and a phase.

SURVEY phase: produce a breadth-first inventory. For each notable theory or claim, create a claim file in
research/claims/ using the schema in the project spec, filled as far as sources allow, with a PROVISIONAL
tier (the vetter confirms or overturns it). Write a domain overview to research/domains/<domain>.md. Aim
for coverage, not depth.

DEEP-DIVE phase: for the claims the lead names, go to primary sources. Read the actual papers/texts.
Reconstruct the argument or mathematics. Record the strongest version, the key derivation or evidence, the
replication/consensus status, and the most serious objections. Update the claim files.

Rules:
- One claim = one file; keep claims atomic and checkable.
- Every claim needs >=1 real, resolvable source with a link. If you cannot verify a source, mark the claim
  UNVERIFIED and say why - never paper over it.
- Distinguish an observation from its interpretation; file them as separate claims when their tiers differ.
- Do not synthesize across domains; that is the synthesizer's job.
Return: the claim IDs created/updated and any domain-level tensions spotted.
```

### `claim-vetter.md`
```markdown
---
name: claim-vetter
description: Independent red-team. Use after researchers file claims. Re-checks each claim's sources, assigns the FINAL tier, writes the steelman and strongest objection, and updates research/claims-index.md. Must never vet a claim it also authored. Writes only within research/.
tools: Read, Grep, Glob, WebSearch, WebFetch, Write
model: sonnet
---
You are the adversarial vetter. Your loyalty is to accuracy, not to the researcher's conclusion. Obey
CLAUDE.md.

For each assigned claim file:
1. Verify every cited source exists and actually says what the claim reports. Downgrade or flag any
   misrepresentation; kill fabricated citations on sight.
2. Assign the FINAL tier (E1-E6). If you disagree with the provisional tier, change it and record why in
   the claim's red-team notes.
3. Write the steelman (strongest honest version) and the single strongest objection or disconfirming
   evidence. Note replication/consensus status.
4. For anything asserted as physics, confirm the falsifiability entry is real; if nothing could falsify it,
   reclassify.
5. Update research/claims-index.md: id | title | domain(s) | tier | one-line verdict | confidence.

Be willing to conclude E6 for well-known ideas that fail, and E1/E2-solid for others. Calibrated - neither
cynical nor credulous.
Return: claim IDs vetted, with tier changes and reasons.
```

### `synthesizer.md`
```markdown
---
name: synthesizer
description: Use after vetting is complete. Reads ONLY the vetted claims-index and claim files, builds the cross-domain bridges and the layered combined framework, and writes the page's intro prose. Writes only within research/synthesis/.
tools: Read, Grep, Glob, Write
model: opus
---
You build the combined theory as an honest, layered synthesis, and you write the page's framing. Obey
CLAUDE.md - register-labeling and synthesis rules.

Work only from vetted claims. Do not introduce new unvetted claims; if a gap needs a claim that doesn't
exist, flag it for the lead to route to a researcher.

Produce, in research/synthesis/:
1. bridges/<id>.md - one file per cross-domain connection, using the bridge schema: the linked claim IDs,
   the register (shared-mathematics / analogy / metaphor / speculation), a tier_ceiling, and the narrative
   with the actual link shown (the specific symmetry, structure, or shared concept). Reject connections you
   cannot substantiate; say why.
2. framework.md - the framework as layers: Established core -> Speculative extensions -> Philosophical
   interpretation -> Symbolic/contemplative resonance. For each element state its tier and confidence.
   Show where physics and mathematics genuinely constrain the picture and where it is interpretive.
3. open-problems.md - the honest ledger of gaps, contradictions, and tensions, plus what would move each.
4. predictions.md - any falsifiable predictions, with the test.
5. abstract.md - a strong, honest intro for the page: what O Theory attempts and how to read the evidence
   tiers. Compelling but never over-claiming.

A reader must never be misled about what is proven, evidenced, argued, or symbolic.
Return: a summary of the framework's spine and its biggest unresolved tensions.
```

### `skeptic-auditor.md`
```markdown
---
name: skeptic-auditor
description: Final adversarial + citation audit before a publish-worthy build. Tries to break the synthesis, catches remaining over-claims, and verifies every citation resolves and is represented accurately. Writes audit reports only within research/.
tools: Read, Grep, Glob, WebSearch, WebFetch, Write
model: opus
---
You are the last defense against crankery. Obey CLAUDE.md. Two jobs:

1. Steelman-then-attack the synthesis. For each major move in research/synthesis/framework.md, state the
   strongest objection a well-informed skeptic in the relevant field would raise. Flag any place where a
   lower-tier claim does higher-tier work, any register mislabel, any "proof" that isn't one, any
   falsifiability gap. Write research/audit/red-team.md.
2. Citation audit. Walk every source that will appear on the page. Confirm it resolves, the claim matches
   the source, quotes are accurate and within length limits, and no references are fabricated. Write
   research/audit/citations.md with pass/fail per source.

Nothing is publish-ready until both files show no unresolved criticals.
Return: counts of criticals by type, and the must-fix list.
```

---

## Part E — The run<->build contract, visualizations, and page

### Claim — `research/claims/<id>.md` (YAML front-matter + prose body)
```yaml
id: qm-decoherence
title: Environmental decoherence explains apparent wavefunction collapse
domain: [quantum-foundations]
type: derived            # fact | derived | empirical | philosophical | symbolic
tier: E1                 # E1..E6 per CLAUDE.md
status: vetted           # draft | vetted | disputed | rejected
confidence: high         # high | medium | low
sources:
  - title: "..."
    url: "https://..."
    kind: peer-reviewed  # peer-reviewed | preprint | book | primary-text | secondary | web
    verified: true
steelman: "..."
strongest_objection: "..."
falsifiability: "..."    # required if empirical or derived-as-physics
depends_on: [linearity-of-qm, born-rule]   # claim ids -> SOLID graph edges
last_vetted: 2026-07-07
content_hash: "sha256:..."
```
`fact`/`derived` render in the rigorous core as plain statements (they've earned it). `symbolic` renders in the symbolic layer on its own terms. `depends_on` becomes solid derivation edges.

### Bridge — `research/synthesis/bridges/<id>.md`
```yaml
id: symmetry-as-unifier
title: Symmetry & invariance as a shared structural theme
links: [noether-theorem, e8-structure, advaita-nonduality, platonic-solids]
register: analogy        # shared-mathematics | analogy | metaphor | speculation
tier_ceiling: E4         # the highest tier this connection may imply - never exceeded
narrative: "..."         # the pattern-match, argued honestly
```
Each bridge becomes a dashed graph edge (colored by register) and a card in the interpretive zone.

### Graph — `docs/data/graph.json` (produced by the build)
```json
{
  "nodes": [
    { "id": "noether-theorem", "label": "Noether's theorem",
      "domain": "physics", "type": "derived", "tier": "E1", "confidence": "high" }
  ],
  "edges": [
    { "source": "noether-theorem", "target": "born-rule",
      "kind": "derivation", "register": null, "tier": "E1" },
    { "source": "noether-theorem", "target": "advaita-nonduality",
      "kind": "bridge", "register": "analogy", "tier": "E4" }
  ]
}
```

### Visualizations (all client-side, static, Pages-friendly)
1. **Connection graph - the hero.** Force-directed (Cytoscape.js or react-force-graph). Nodes colored by domain, badged by tier, sized by degree. Edges: solid = derivation/established, dashed = interpretive bridge with dash color by register. Click a node -> claim panel (statement, tier, sources, objection). Controls: filter by domain and tier; a prominent "show interpretive bridges" toggle so the rigorous skeleton can be viewed alone.
2. **Landscape (domain x tier).** Sunburst or matrix showing how much of the corpus is established vs speculative vs symbolic. Honesty as a picture.
3. **Bridge / chord view.** Domains around a circle; ribbons = cross-domain bridges styled by register.
4. **Layer stack.** Established -> Speculative -> Philosophical -> Symbolic, interactive; click to filter.
5. **Geometry visualizer (signature).** three.js: interactive Platonic solids, golden-ratio constructions, an E8 2D projection - the real mathematics behind "sacred geometry," shown as mathematics/symbol, never asserted as physics.

Recommend these libraries but you may choose the final stack; generate the data files from the knowledge base.

### Page content model
One page (or a small set), three movements:
- **Intro / framing** (from `abstract.md`): what O Theory attempts, plus the Evidence Key (E1-E6) and the fact/derived-vs-interpretive distinction, up front. Hero graph can animate in here.
- **Zone A - Rigorous Core.** Claims by domain; `fact|derived|empirical` stated plainly with a tier badge and source links. Sober, editorial, high typographic clarity; full provenance.
- **Zone B - Interpretive Synthesis.** Visually distinct (accent/background + an explicit "Interpretive" banner). The large pattern-matching sections (from bridges), the chord view, layer stack, and geometry visualizer. Allowed to be gorgeous and speculative - because clearly marked.

Design intent (pair with the **frontend-design** skill): elegant, editorial, a touch cosmic; strong type hierarchy; the graph as centerpiece; smooth, tasteful interaction; light + dark; the two zones unmistakably different in feel. Non-negotiables: Evidence Key visible, provenance on every claim, two zones visually separated, fully accessible, self-contained static output, relative paths only.

### `/research` module behavior (incremental, idempotent)
1. Read `run/sources.yaml` + everything in `run/inbox/`.
2. Diff against `claims-index.md` via `content_hash` + `last_vetted`; create/update only new or changed claims.
3. Fan out `domain-researcher` -> `claim-vetter` on new/changed claims only (batches of ~4 concurrent).
4. Re-run `synthesizer` + `skeptic-auditor` so framework/bridges/open-problems/predictions/abstract stay current.
5. Move processed inbox items to `run/ingested/` with a receipt; append a dated entry to the run log in `research-plan.md`.
Running twice with no new input changes nothing.

### `/build` module behavior (deterministic)
1. Read `research/` (claims + synthesis + bridges).
2. Emit `docs/data/graph.json` and any other data files.
3. Render `docs/` from templates; preserve `docs/videos/`. Relative paths only.
Safe to run anytime; output is a pure function of the knowledge base.

---

## Part F — Do this now: staged bootstrap

Build in stages; check in after each. Reminder: **work only within the `otheory/` folder unless I explicitly say otherwise.** First inspect the existing repo and identify the current doc, videos, and Pages config - preserve all of it, delete nothing.

```
STAGE 1 - SCAFFOLD
Create the target structure from Part B: CLAUDE.md (write Part C verbatim); .claude/agents/ with the four
agents from Part D (verbatim); .claude/commands/research.md and build.md; run/ (sources.yaml, inbox/,
ingested/); research/ (research-plan.md, claims-index.md, claims/, domains/, synthesis/ with abstract.md,
framework.md, open-problems.md, predictions.md, bridges/); build/ (generator + templates/ + assets/);
docs/. Show me the tree.

STAGE 2 - SCHEMAS + SEED DATA
Adopt the exact claim, bridge, and graph.json schemas from Part E. Hand-write a SMALL seed knowledge base:
~8-12 claims spanning physics, quantum foundations, geometry, philosophy of mind, and one
religious/esoteric tradition, plus 3-4 bridges labeled by register - so the pipeline is visible end to end
before any real research. Fill claims-index.md from it.

STAGE 3 - BUILD MODULE
Write build/generate.* to read research/ and emit docs/ (index.html + docs/data/graph.json). Implement the
visualizations from Part E, connection graph as the hero (domain colors, tier badges, solid=derivation /
dashed=bridge by register, click-for-detail, domain/tier filters, "show interpretive bridges" toggle), plus
the domain x tier landscape, chord/bridge view, layer stack, and the three.js geometry visualizer. Lay out
the page in the two zones from Part E with a strong intro and a visible Evidence Key. Use the
frontend-design skill for craft; light+dark; accessible; self-contained; RELATIVE PATHS ONLY (this
publishes at /otheory/). Wire /build to run this. Run it and show me the rendered docs/.

STAGE 4 - RUN MODULE
Implement /research per Part E: read sources.yaml + inbox/, diff via content hashes, create/update only new
or changed claims, vet with a SEPARATE claim-vetter pass, re-run synthesizer + skeptic-auditor, move
processed inbox items to ingested/ with a receipt, append to the run log. Make it idempotent - running
twice with no new input changes nothing. Do a dry run against an empty inbox and show me the log behavior.

STAGE 5 - SELF-DOCUMENTATION
Based on exactly what you built, write README.md (what this repo is, the run/build model, architecture
diagram), SETUP.md (one-time setup, GitHub Pages set to main /docs, prerequisites), and RUNBOOK.md (how to
add knowledge, how to run /research and /build with the exact invocations you implemented, how to review
tiers, how to deploy, how to extend the schemas). Keep them accurate to the real implementation; if
anything in this spec didn't match Claude Code's current behavior, note what you changed and why.

Then run the Consistency Checklist (Part G) against the repo and report pass/fail per item, and give me a
short punch-list of the first few real sources to add to run/inbox to kick off actual research.
```

---

## Part G — Deploy, first moves, and self-check

**Deploy:** In the repo's GitHub Pages settings, serve from the `main` branch `/docs` folder. The site is fully static; the agents never run on Pages - they run locally in Claude Code and produce `docs/`, which Pages serves. A server-side version can come later; nothing here needs one.

**The loop you'll actually use:**
1. Drop a PDF/link/note into `run/inbox/` and/or add a query to `run/sources.yaml`.
2. Run `/research` - ingests, vets, re-synthesizes only what changed; logs the run.
3. Skim `research/claims-index.md` to sanity-check new tiers (your quality gate).
4. Run `/build`, review `docs/` locally.
5. Commit and push; Pages updates. Every change to the theory is visible in git history.

**Consistency Checklist (run this to double-check the build):**
- [ ] Every claim file has at least one verified source and a tier; none is sourceless.
- [ ] No bridge implies a tier above its `tier_ceiling`; every bridge has a register label.
- [ ] The page has two visually distinct zones and a visible Evidence Key in the intro.
- [ ] `fact`/`derived` claims are stated plainly; interpretive content is confined to Zone B and labeled.
- [ ] All site asset/data paths are relative (loads correctly under `/otheory/`).
- [ ] Existing doc and videos are preserved in `docs/`.
- [ ] `/research` is idempotent (empty inbox -> no changes) and logs each run.
- [ ] `docs/` is a pure function of `research/` (rebuilding without research changes yields identical output).
- [ ] README / SETUP / RUNBOOK match the actual implementation.
- [ ] Nothing outside the `otheory/` folder was read, created, or modified.
