# RUNBOOK — day-to-day

How to grow the theory, build the site, review quality, deploy, and extend the schemas. One-time setup is
in **SETUP.md**; the rules everything obeys are in **CLAUDE.md**.

## The loop you'll actually use

1. **Add input.** Drop a PDF / link / note into `run/inbox/`, and/or add queries to `run/sources.yaml`, or
   just pick a domain to survey.
2. **Run research** (in a Claude Code session rooted in this repo):
   ```
   /research                     # process new inbox items
   /research quantum-foundations # survey a specific domain
   /research dry-run             # preview the plan; write nothing
   ```
3. **Review tiers.** Skim `research/claims-index.md` — the single table of every claim, its tier, verdict,
   and status. This is your quality gate.
4. **Build.**
   ```
   /build            # or:  node build/generate.mjs
   ```
   Review `docs/` locally (`open docs/index.html`).
5. **Deploy.** Commit + push. GitHub Pages (main `/docs`) updates. Every change to the theory is a diff in
   git history.

Running `/research` twice with no new input changes nothing (idempotent).

---

## Adding knowledge

**Inbox (one-off sources).** Put anything actionable in `run/inbox/`:
- a PDF (`run/inbox/some-paper.pdf`)
- a link or note (`run/inbox/idea.md` containing a URL + a sentence)

`/research` treats each new inbox item as work, researches it, then moves it to `run/ingested/` with a
receipt. It won't reprocess an item it has already ingested (tracked by content hash in
`run/ingested/.manifest.json`).

**Standing sources (`run/sources.yaml`).** Reference material — arXiv queries, reading lists, URLs —
consulted by researchers. Editing it does not auto-fire a run; act on it with `/research <domain>` or by
dropping a specific source into `run/inbox/`.

## Running `/research` — what happens

`/research` orchestrates: **plan → agents → commit.**

```
node run/ingest.mjs plan            # diff: what's new/changed? (read-only)
   → domain-researcher  (survey / deep-dive; writes research/claims/ + research/domains/)
   → claim-vetter       (SEPARATE pass; verifies sources, assigns FINAL tier, updates claims-index.md)
   → synthesizer        (rebuilds synthesis/*, bridges/*, and the existence-prompt)
   → skeptic-auditor    (red-team + citation audit → research/audit/)
node run/ingest.mjs commit --note "…"   # move inbox→ingested + receipts, stamp content_hash, append run log
```

Rules the agents enforce (from CLAUDE.md): every claim needs ≥1 real, resolvable source; a claim is never
vetted by the agent that authored it; observation and interpretation are filed as separate claims when
their tiers differ; never fabricate a citation.

You can run the deterministic pieces by hand too:
```
node run/ingest.mjs plan            # preview
node run/ingest.mjs hash            # show computed content hashes (read-only)
node run/ingest.mjs hash --write    # stamp content_hash into claim files
node run/ingest.mjs commit --note "…"
```

## Reviewing tiers (your quality gate)

Open `research/claims-index.md`. Columns: **id · title · domain(s) · type · tier · status · confidence ·
verdict · hash · last_vetted.** Look for:
- anything tiered higher than its evidence supports (push it down — E1 is only for proven/confirmed);
- an observation dressed as its interpretation (they should be separate rows);
- a bridge implying more than its `tier_ceiling` (see `research/synthesis/bridges/`);
- `research/audit/red-team.md` and `citations.md` should show **no unresolved criticals** before publishing.

## Building the site

```
node build/generate.mjs           # research/ → docs/ (index.html, data/graph.json, data/art.json, assets/)
node build/generate.mjs --check   # build in memory, diff vs committed docs/ → proves determinism
```

The generator preserves `docs/videos/`, uses relative paths only, and is a pure function of `research/`.
The **Portrait of Existence** is reseeded from the corpus each build (its version tag = a hash of the
knowledge base), so it changes whenever the research changes.

## Deploying

```
git add -A
git commit -m "research: <what changed>"
git push
```
GitHub Pages (main `/docs`) redeploys automatically. Confirm at `https://nurecas.github.io/otheory/`.

## Extending the schemas

**Add a claim by hand** — create `research/claims/<id>.md`:
```yaml
---
id: your-claim-id
title: One-sentence statement
domain: [physics]                 # any of the domains in research-plan.md
type: derived                     # fact | derived | empirical | philosophical | symbolic
tier: E2                          # E1..E6 (see CLAUDE.md)
status: vetted                    # draft | vetted | disputed | rejected
confidence: medium                # high | medium | low
sources:
  - title: "Author (Year). Title. Venue."
    url: "https://…"
    kind: peer-reviewed           # peer-reviewed | preprint | book | primary-text | secondary | web
    verified: true
steelman: "The strongest honest version."
strongest_objection: "The single strongest objection or disconfirming evidence."
falsifiability: "Required if empirical or derived-as-physics; what would confirm/falsify it."
depends_on: [other-claim-id]      # → solid derivation edges in the graph
related_to: [claim-a, claim-b]    # 2–4 REAL conceptual links (rivals, same debate, lineage,
                                  #   observation↔interpretation) → thin "relation" edges in the graph
last_vetted: 2026-07-07
content_hash: "seed"              # ingest stamps a real hash on commit
---
Prose body (optional notes).
```
Then add a row to `research/claims-index.md`, run `node run/ingest.mjs hash --write`, and `/build`.

**Add a bridge** — create `research/synthesis/bridges/<id>.md`:
```yaml
---
id: your-bridge-id
title: What the connection is
links: [claim-a, claim-b]         # claim ids
register: analogy                 # shared-mathematics | analogy | metaphor | speculation
tier_ceiling: E4                  # the highest tier this connection may imply — never exceeded
narrative: >
  The pattern-match, argued honestly, showing the actual shared structure/concept.
---
```

**Add a new claim field or bridge field:** update `build/generate.mjs` where claims/bridges are parsed
(`loadClaims` / `loadBridges`) and where cards are rendered (`claimCard` / `bridgeCards`). The front-matter
parser handles scalars, inline `[arrays]`, block-sequence `sources:`, and folded `>` narratives.

**Add a new visualization:** add a container in `build/templates/index.template.html`, an `init*()` in
`build/assets/app.js` (guard it in `boot()`), and any needed data to `graph.json`/`art.json` in
`build/generate.mjs`. Keep the "reduced-motion → render one static frame" pattern so the page is accessible
and screenshot-friendly.

**Add a domain:** add a row to the domains table in `research/research-plan.md` and a color in
`build/generate.mjs` (`DOMAINS`). Everything else keys off the domain string.
