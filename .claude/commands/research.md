---
description: RUN module - ingest new sources, research + vet only what changed, re-synthesize, log the run. Idempotent.
argument-hint: "[a domain name | 'all' for a wide sweep | 'dry-run' to preview]"
allowed-tools: Bash(node run/ingest.mjs:*), Read, Grep, Glob, Write
---
# /research - the RUN module

You are the **research lead**. You orchestrate the agents; you do not do their jobs. Obey `CLAUDE.md`
(tiers, vocabulary, source-quality, never-launder-evidence). Work only inside `research/` (reading from
`run/`). Never write to `docs/`.

The deterministic parts (diff, idempotency, receipts, run log, content hashes) are owned by
`run/ingest.mjs`. The research itself is owned by the agents. Flow: **plan → (agents) → commit.**

Optional argument `$ARGUMENTS`:
- a **domain name** (e.g. `quantum-foundations`) → survey that one domain;
- **`all`** → a **wide sweep**: survey every not-yet-stable domain in `research/research-plan.md`. Use this
  to research broadly from scratch when you have no documents to drop in — the researchers discover sources
  themselves by web search. This is large (many agents, many tokens); it is the "find everything" mode;
- **`dry-run`** → stop after the plan, write nothing.

## Procedure

1. **Plan (deterministic, read-only).** Run:

       node run/ingest.mjs plan

   (add `--domain <name>` for one domain, or `--wide` for `all`). It reports new inbox items, whether
   `sources.yaml` changed, any claim drift, the wide-sweep domain list, and whether there is **work to do**.
   If it prints `IDEMPOTENT: … nothing to do`, then STOP — running with no new input changes nothing. If
   `$ARGUMENTS` is `dry-run`, stop here regardless.

2. **Research.** For each new inbox item / requested domain / wide-sweep domain in the work list, fan out
   `domain-researcher` (SURVEY phase for a domain — breadth-first, aim for coverage; deep-dive for named
   claims), in batches of ~4 concurrent. For `all`, work through every domain the plan listed, consulting
   `run/sources.yaml` and searching widely (arXiv, SEP/IEP, primary texts, reputable scholarship).
   Researchers write claim files to `research/claims/` and domain notes to `research/domains/`, with
   PROVISIONAL tiers and >=1 real, resolvable source each. No source, no claim. Never fabricate a citation.

3. **Vet (separate pass).** Fan out `claim-vetter` over the same claims. A claim is **never vetted by the
   agent that authored it.** The vetter verifies every source, assigns the FINAL tier, writes the steelman
   + strongest objection, and updates `research/claims-index.md`.

4. **Re-synthesize.** Run `synthesizer` over the vetted corpus so
   `synthesis/{abstract,overview,framework,open-problems,predictions,existence-prompt}.md` and
   `synthesis/bridges/*` stay current (`overview.md` is the landing essay; keep the existence-prompt
   "Render contract" intact). Researchers/vetters also maintain each claim's `related_to` front-matter
   field (2-4 real conceptual links: rivals, same debate, lineage, observation↔interpretation) — these
   render as the thin "relation" edges that keep the graph connected. Then run `skeptic-auditor`
   (red-team + citation audit -> `research/audit/`). Nothing is publish-ready while a critical is open.

5. **Commit (deterministic).** Run:

       node run/ingest.mjs commit --note "<one-line summary of what changed>"

   It stamps each claim's `content_hash`, moves processed inbox items to `run/ingested/` with receipts,
   updates the manifest, and appends a dated entry to the run log in `research/research-plan.md`.

6. **Report** the headline changes and point me at `research/claims-index.md` to sanity-check new tiers
   (my quality gate). Do NOT run `/build` from here — that is a separate step.

## Guardrails
- Idempotent: empty inbox + unchanged inputs => `plan` is a no-op and writes nothing.
- Observation and interpretation are separate claims when their tiers differ.
- Standing `sources.yaml` entries are reference material (search queries, reading lists); act on them by
  requesting a domain or dropping a specific source into `run/inbox/`.
