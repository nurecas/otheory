# O Theory

An honest, layered synthesis of **theories of everything** — across physics, mathematics/geometry, quantum
foundations, philosophy of mind, metaphysics, comparative religion, mysticism, and esoteric traditions —
rendered as a beautiful, interactive page where **every claim carries an evidence tier**. Facts are stated
as facts; interpretation is clearly fenced. The prime directive is: *never launder evidence.*

The site publishes via GitHub Pages at **`nurecas.github.io/otheory/`** (served from `main` → `/docs`).

---

## The model: two modules, one knowledge base

O Theory is not a hand-maintained website. It is a **knowledge base** (`research/`) plus two modules that
never overlap:

```
        I add sources / drop files into run/inbox/  +  run/sources.yaml
                                 │
                                 ▼
        ┌───────────────────  /research  ───────────────────┐
        │  run/ingest.mjs plan (diff)                        │   RUN module
        │   → domain-researcher → claim-vetter (separate)    │   (agents; non-deterministic)
        │   → synthesizer → skeptic-auditor                  │
        │  run/ingest.mjs commit (receipts + run log)        │
        └───────────────────────┬───────────────────────────┘
                                 ▼
                    research/   (THE KNOWLEDGE BASE — durable, git-tracked)
             claims/  claims-index.md  synthesis/  synthesis/bridges/  audit/
                                 │
        ┌───────────────────   /build   ─────────────────────┐
        │  build/generate.mjs  reads research/  →  docs/       │   BUILD module
        │  emits index.html + data/graph.json + data/art.json │   (deterministic script)
        └───────────────────────┬───────────────────────────┘
                                 ▼
                         docs/  ──►  GitHub Pages (main /docs)
```

- **`/research` (RUN)** — agents survey, vet, and synthesize knowledge **into `research/`**. The
  deterministic parts (diff, idempotency, receipts, run log, content hashes) live in `run/ingest.mjs`.
- **`/build` (BUILD)** — a deterministic Node script renders `research/` **into `docs/`**. It is the ONLY
  writer to `docs/`, so the site never drifts between builds.

Agents write only inside `research/`. The generator writes only inside `docs/`. `research/` is the single
source of truth; `docs/` is a pure function of it.

## The honesty machine (why tiers)

Every claim is tagged **E1–E6** and every cross-domain link is tagged with a **register**:

| Tier | Meaning | | Register | Meaning |
|---|---|---|---|---|
| **E1** | Established (proven/confirmed) | | **shared-mathematics** | a real shared structure |
| **E2** | Mainstream-speculative | | **analogy** | structural resemblance, not identity |
| **E3** | Heterodox / minority | | **metaphor** | evocative, not structural |
| **E4** | Philosophical (not decidable) | | **speculation** | proposed but unestablished |
| **E5** | Symbolic / contemplative | | | |
| **E6** | Unsupported (recorded, never used as support) | | | |

The synthesis may **connect** claims across tiers but never **restate** a lower-confidence claim as higher.
A bridge may never imply a tier above its `tier_ceiling`. See `CLAUDE.md` for the full constitution.

## Repo layout

```
otheory/
  CLAUDE.md                     # project constitution (tiers, vocabulary, rules)
  README.md  SETUP.md  RUNBOOK.md
  .claude/
    agents/                     # domain-researcher, claim-vetter, synthesizer, skeptic-auditor
    commands/                   # research.md (/research), build.md (/build)
  run/
    sources.yaml                # standing sources (arXiv queries, reading lists, URLs)
    inbox/                      # drop PDFs / notes / links here
    ingested/                   # processed items land here with a receipt (+ .manifest.json)
    ingest.mjs                  # deterministic diff / idempotency / receipts / run log
  research/                     # THE KNOWLEDGE BASE
    research-plan.md            # domain list + phase tracker + run log
    claims-index.md             # master table of every claim (your quality gate)
    claims/                     # one .md per claim (YAML front-matter + prose)
    domains/                    # raw survey notes per domain
    synthesis/
      abstract.md framework.md open-problems.md predictions.md
      existence-prompt.md       # the evolving "Portrait of Existence" art prompt
      bridges/                  # one .md per cross-domain connection
    audit/                      # skeptic-auditor: red-team.md, citations.md
  build/
    generate.mjs                # the deterministic generator (zero npm deps)
    templates/index.template.html
    assets/                     # style.css, app.js, vendor/ (three.js, cytoscape)
  docs/                         # BUILD OUTPUT → Pages serves from /docs
    index.html
    data/graph.json  data/art.json
    videos/                     # preserved media (ovideo.mp4)
```

## Quick start

```bash
# one-time: see SETUP.md (Node 18+, GitHub Pages → main /docs)
node build/generate.mjs          # render research/ → docs/
open docs/index.html             # view locally (works as a file:// — data is inlined)
```

To add knowledge and grow the theory, see **RUNBOOK.md**. In short: drop sources into `run/inbox/`, run
`/research`, skim `research/claims-index.md`, run `/build`, commit + push.

## What's on the page

Two visually distinct zones: **Zone A — Rigorous Core** (claims by domain, tier-badged, full provenance +
a domain×tier landscape) and **Zone B — Interpretive Synthesis** (bridges, a chord diagram, an interactive
layer stack, a three.js geometry visualizer, and the **Portrait of Existence** — a generative artwork that
is a pure function of the corpus and evolves with every research run). The Evidence Key is visible up front;
every claim links its sources.

## Notes on this implementation (deviations from the original spec)

The spec allowed choices; here is what was chosen and what was added:

- **Generator is Node** (`build/generate.mjs`, `.mjs`), zero npm dependencies — keeps generator and
  visualizations in one language with no install step.
- **Deterministic RUN helper** `run/ingest.mjs` was added so `/research` is genuinely idempotent
  (an LLM can't hash-diff reliably); the agents do the research, the script does the bookkeeping.
- **`research/audit/`** holds the skeptic-auditor's `red-team.md` + `citations.md` (referenced by the
  agents but not in the original folder tree).
- **Portrait of Existence** (`research/synthesis/existence-prompt.md` → `docs/data/art.json` → three.js) is
  an addition beyond the original spec, requested to visualize existence from the research and evolve each run.
- **Self-contained** by choice: visualization libraries are vendored into `build/assets/vendor/` and system
  fonts are used (no CDN / Google Fonts), so the site works offline and under `/otheory/`. Data is inlined
  into `index.html` (and also emitted to `docs/data/*.json`) so it also renders from `file://`.
```
