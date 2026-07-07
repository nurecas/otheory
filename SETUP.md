# SETUP — one-time

Everything here is done once. Day-to-day work is in **RUNBOOK.md**.

## Prerequisites

| Need | For | Notes |
|---|---|---|
| **Node.js 18+** | running `build/generate.mjs` and `run/ingest.mjs` | Zero npm dependencies — nothing to `npm install`. Both scripts use only Node built-ins (`fs`, `crypto`, `path`). Check: `node --version`. |
| **Claude Code** | running `/research` (the agents) | The RUN module orchestrates the four agents in `.claude/agents/`. `/build` does **not** need Claude Code — it's just `node`. |
| **A browser** | viewing `docs/` locally | The page renders from `file://` directly (data is inlined). |
| **Git + a GitHub repo** | publishing via Pages | This repo is `github.com/nurecas/otheory`. |

No build toolchain, bundler, or package manager is required. The visualization libraries (three.js,
Cytoscape) are already vendored in `build/assets/vendor/`.

## 1. Get the repo

```bash
git clone https://github.com/nurecas/otheory.git
cd otheory
node --version          # expect v18 or newer
```

## 2. Build and preview locally

```bash
node build/generate.mjs   # reads research/ → writes docs/
open docs/index.html      # macOS; or just double-click the file
```

You should see the O Theory page. Because the data is inlined and all paths are relative, it works straight
from `file://` — no local server needed. (If you prefer a server: `cd docs && python3 -m http.server` then
visit `http://localhost:8000/`.)

## 3. Configure GitHub Pages (serve from `main` → `/docs`)

1. Push to GitHub (`main` branch).
2. On GitHub: **Settings → Pages**.
3. **Source:** *Deploy from a branch.*
4. **Branch:** `main`, **Folder:** `/docs`. Save.
5. Wait ~1 minute. The site appears at **`https://nurecas.github.io/otheory/`**.

The site is fully static. The agents never run on Pages — they run locally in Claude Code and produce
`docs/`, which Pages serves. Nothing here needs a server.

> **Note — the site now serves from `/docs`, not the repo root.** The original root files
> (`index.html`, `style.css`, `script.js`, `ovideo.mp4`, `KnowledgeSource.txt`) are preserved but are no
> longer what Pages publishes. The video was migrated to `docs/videos/ovideo.mp4`. After you flip the Pages
> source to `/docs`, the new build is what goes live.

## 4. (Optional) Run Claude Code in the repo

To use `/research`, open a Claude Code session **rooted in this repo** so the command and agents are
discovered:

```bash
cd ~/Desktop/otheory
claude
```

Then `/research` (and `/build`) are available as slash commands. See RUNBOOK.md.

## Sanity check

```bash
node build/generate.mjs --check   # confirms docs/ is a pure function of research/ (no drift)
node run/ingest.mjs plan          # confirms the RUN diff works (empty inbox → idempotent no-op)
```
