---
description: BUILD module - deterministically render research/ into docs/ (site + graph.json). Safe to run anytime.
argument-hint: "(no args) - optionally 'check' to build and validate without writing"
allowed-tools: Bash(node build/generate.mjs), Bash(node build/generate.mjs --check), Read, Glob
---
# /build - the BUILD module

The site build is a **deterministic script, not an agent.** Its whole job is to make `docs/` a pure
function of `research/` so the site never drifts between builds. You do not "creatively" rebuild the page;
you run the generator and report what it produced.

## Procedure

1. Run the generator:

       node build/generate.mjs

   It reads `research/` (claims + `claims-index.md` + `synthesis/` + `synthesis/bridges/`), then:
   - emits `docs/data/graph.json` (nodes = claims, edges = `depends_on` derivations + bridges) and any
     other data files the visualizations need;
   - emits `docs/data/art.json` — the deterministic **art seed** for the "Portrait of Existence" section:
     a `corpusHash`, claim counts by tier/domain, bridge counts by register, the palette, and the current
     `existence-prompt.md` text. This makes the three.js artwork a pure function of the corpus, so it
     evolves whenever the research does;
   - renders `docs/index.html` and copies `build/assets/` -> `docs/`;
   - **preserves `docs/videos/`** (never deletes migrated media);
   - uses **relative paths only** (the site publishes under `nurecas.github.io/otheory/`).

2. If `$ARGUMENTS` is `check`, run `node build/generate.mjs --check`: build to a temp dir and diff against
   the committed `docs/` to prove the output is deterministic (rebuilding without research changes yields
   identical output). Report any drift.

3. Report the counts (claims rendered by tier, bridges by register, data files written) and remind me to
   review `docs/` locally, then commit + push (GitHub Pages serves `main` `/docs`).

## Guardrails
- The generator is the ONLY writer to `docs/`. Agents never write there.
- No absolute paths in output. No network calls at page load beyond what is vendored into `build/assets/`.
- Do not edit `research/` from here - `/build` is read-only with respect to the knowledge base.
