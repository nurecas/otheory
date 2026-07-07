#!/usr/bin/env node
// run/ingest.mjs — deterministic ingest / diff / bookkeeping for the /research (RUN) module.
//
// The RESEARCH itself is done by agents (domain-researcher, claim-vetter, synthesizer,
// skeptic-auditor). THIS script owns the deterministic parts so the pipeline is idempotent:
//   - diff run/inbox + run/sources.yaml against what has already been ingested (content hashes)
//   - guarantee "empty inbox + no new inputs => zero changes" (nothing written on a no-op)
//   - on commit: move processed inbox items to run/ingested/ with receipts, stamp claim
//     content_hash, and append a dated entry to the run log in research/research-plan.md
//
// Subcommands:
//   plan            (default) read-only. Prints the work list; detects the no-op case. WRITES NOTHING.
//   commit          After agents have created/updated claims: move inbox->ingested + receipts,
//                   stamp content_hash on claims, append the run log. Use --note "..." for the log line.
//   hash [--write]  Recompute claim content hashes; --write stamps them into the files.
//
// Flags: --json (machine output for plan), --note "text", --domain <name> (explicit research request)

import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const P = (...p) => join(ROOT, ...p);
const INBOX = P('run', 'inbox'), INGESTED = P('run', 'ingested');
const MANIFEST = P('run', 'ingested', '.manifest.json');
const SOURCES = P('run', 'sources.yaml'), CLAIMS = P('research', 'claims'), PLAN = P('research', 'research-plan.md');

const args = process.argv.slice(2);
const cmd = (args[0] && !args[0].startsWith('--')) ? args[0] : 'plan';
const flag = (name) => { const i = args.indexOf('--' + name); return i !== -1 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : undefined; };
const JSONOUT = args.includes('--json');
const sha = (s) => 'sha256:' + createHash('sha256').update(s).digest('hex').slice(0, 16);

// deterministic date only used by commit (a real side-effecting action, not the pure build)
function today() { const d = new Date(); return d.toISOString().slice(0, 10); }

const IGNORE = new Set(['.gitkeep', '.DS_Store', '.manifest.json']);
function listInbox() {
  if (!existsSync(INBOX)) return [];
  return readdirSync(INBOX).filter((f) => !IGNORE.has(f) && !f.endsWith('.receipt.md'))
    .map((f) => ({ name: f, path: join(INBOX, f), hash: sha(readFileSync(join(INBOX, f))) }));
}
function readManifest() {
  if (existsSync(MANIFEST)) { try { return JSON.parse(readFileSync(MANIFEST, 'utf8')); } catch (e) { /* fall through */ } }
  return { version: 1, inbox: {}, sourcesHash: null, lastRun: null };
}
const writeManifest = (m) => writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + '\n');

// content hash of a claim = hash of the file with the volatile fields (content_hash, last_vetted) removed
function claimContentHash(text) {
  const stripped = text.split('\n').filter((l) => !/^\s*(content_hash|last_vetted)\s*:/.test(l)).join('\n');
  return sha(stripped);
}
// domains + their phase, parsed from the research-plan.md table (for wide surveys)
function listPlanDomains() {
  if (!existsSync(PLAN)) return [];
  const out = [];
  for (const line of readFileSync(PLAN, 'utf8').split('\n')) {
    const m = line.match(/^\|\s*([a-z][a-z-]+)\s*\|.*\|\s*(not-started|survey|deep-dive|stable)\s*\|\s*$/);
    if (m) out.push({ domain: m[1], phase: m[2] });
  }
  return out;
}
function listClaims() {
  if (!existsSync(CLAIMS)) return [];
  return readdirSync(CLAIMS).filter((f) => f.endsWith('.md') && !f.startsWith('.')).sort().map((f) => {
    const text = readFileSync(join(CLAIMS, f), 'utf8');
    const id = (text.match(/^id:\s*(.+)$/m) || [])[1] || f.replace(/\.md$/, '');
    const stored = (text.match(/^content_hash:\s*"?([^"\n]+)"?\s*$/m) || [])[1] || '';
    return { file: f, path: join(CLAIMS, f), id: id.trim(), text, stored: stored.trim(), computed: claimContentHash(text) };
  });
}

function plan() {
  const m = readManifest();
  const inbox = listInbox();
  const newItems = inbox.filter((it) => m.inbox[it.name] !== it.hash);
  const srcHash = existsSync(SOURCES) ? sha(readFileSync(SOURCES)) : null;
  const srcChanged = srcHash !== m.sourcesHash;
  const domain = flag('domain');
  const wide = args.includes('--wide') || domain === 'all';
  const claims = listClaims();
  const drift = claims.filter((c) => c.stored && c.stored !== 'seed' && c.stored !== c.computed);
  const seedClaims = claims.filter((c) => c.stored === 'seed').length;
  const sweepDomains = wide ? listPlanDomains().filter((d) => d.phase !== 'stable').map((d) => d.domain) : [];
  const workToDo = newItems.length > 0 || (!!domain && domain !== 'all') || sweepDomains.length > 0 || drift.length > 0;

  const report = {
    inbox_new: newItems.map((i) => i.name),
    inbox_total: inbox.length,
    sources_changed: srcChanged,
    domain_requested: domain && domain !== 'all' ? domain : null,
    wide_sweep: sweepDomains,
    claim_drift: drift.map((c) => c.id),
    seed_claims: seedClaims,
    claims_total: claims.length,
    work_to_do: workToDo,
    last_run: m.lastRun,
  };
  if (JSONOUT) { console.log(JSON.stringify(report, null, 2)); return workToDo ? 0 : 0; }

  console.log('\n[o-theory /research · plan]  (read-only — nothing is written)');
  console.log(`  inbox            ${inbox.length} item(s); ${newItems.length} new  ${newItems.length ? '-> ' + newItems.map((i) => i.name).join(', ') : ''}`);
  console.log(`  sources.yaml     ${srcChanged ? 'CHANGED since last run' : 'unchanged since last run'}`);
  console.log(`  domain request   ${wide ? 'ALL — wide sweep' : (domain || '(none)')}`);
  if (sweepDomains.length) console.log(`  wide sweep       ${sweepDomains.length} domain(s): ${sweepDomains.join(', ')}`);
  console.log(`  claims           ${claims.length} total; ${seedClaims} seed(baseline); drift: ${drift.length ? drift.map((c) => c.id).join(', ') : 'none'}`);
  console.log(`  last run         ${m.lastRun || '(never)'}`);
  if (!workToDo) {
    console.log('\n  IDEMPOTENT: no new inbox items, no domain request, no claim drift — nothing to do.');
    if (srcChanged) console.log('  (note: sources.yaml changed. Standing sources are reference material; run  /research <domain>  or drop a specific source into run/inbox/ to act on them.)');
    console.log('  No files written. Run log untouched.\n');
  } else {
    console.log('\n  WORK LIST:');
    if (newItems.length) console.log('   • research new inbox items: ' + newItems.map((i) => i.name).join(', '));
    if (sweepDomains.length) console.log('   • WIDE survey of ' + sweepDomains.length + ' domain(s): ' + sweepDomains.join(', '));
    else if (domain && domain !== 'all') console.log('   • (re)survey domain: ' + domain);
    if (drift.length) console.log('   • re-vet drifted claims: ' + drift.map((c) => c.id).join(', '));
    console.log('   Then: fan out domain-researcher -> claim-vetter (batches ~4), re-run synthesizer + skeptic-auditor, then:  node run/ingest.mjs commit --note "…"\n');
  }
  return 0;
}

function commit() {
  const m = readManifest();
  const inbox = listInbox();
  const note = typeof flag('note') === 'string' ? flag('note') : 'research run';
  const date = today();
  mkdirSync(INGESTED, { recursive: true });

  // 1) stamp content_hash on every claim so future diffs are meaningful
  let stamped = 0;
  for (const c of listClaims()) {
    if (c.stored !== c.computed) {
      const text = c.text.match(/^content_hash:/m)
        ? c.text.replace(/^content_hash:.*$/m, `content_hash: "${c.computed}"`)
        : c.text.replace(/^(---[\s\S]*?)\n---/, `$1\ncontent_hash: "${c.computed}"\n---`);
      writeFileSync(c.path, text); stamped++;
    }
  }
  // 2) move inbox items -> ingested with a receipt
  const moved = [];
  for (const it of inbox) {
    const receipt = `# Ingest receipt — ${it.name}\n\n- date: ${date}\n- source hash: ${it.hash}\n- note: ${note}\n- processed by: /research (see research-plan.md run log)\n`;
    writeFileSync(join(INGESTED, it.name + '.receipt.md'), receipt);
    renameSync(it.path, join(INGESTED, it.name));
    m.inbox[it.name] = it.hash; moved.push(it.name);
  }
  // 3) update manifest
  m.sourcesHash = existsSync(SOURCES) ? sha(readFileSync(SOURCES)) : null;
  m.lastRun = date;
  writeManifest(m);
  // 4) append run log
  if (existsSync(PLAN)) {
    const line = `- ${date} — **/research run.** ${note} Ingested: ${moved.length ? moved.join(', ') : '(no inbox items)'}. Claims re-hashed: ${stamped}.`;
    const plan = readFileSync(PLAN, 'utf8').replace(/\s*$/, '');
    writeFileSync(PLAN, plan + '\n' + line + '\n');
  }
  console.log(`[o-theory /research · commit] moved ${moved.length} inbox item(s), stamped ${stamped} claim hash(es), appended run log for ${date}.`);
  return 0;
}

function hash() {
  const write = args.includes('--write');
  for (const c of listClaims()) {
    if (write && c.stored !== c.computed) {
      const text = c.text.match(/^content_hash:/m)
        ? c.text.replace(/^content_hash:.*$/m, `content_hash: "${c.computed}"`)
        : c.text.replace(/^(---[\s\S]*?)\n---/, `$1\ncontent_hash: "${c.computed}"\n---`);
      writeFileSync(c.path, text);
    }
    console.log(`${c.id.padEnd(34)} ${c.computed}${c.stored && c.stored !== c.computed ? '   (stored: ' + c.stored + ')' : ''}`);
  }
  if (write) console.log('\nstamped content_hash into claim files.');
  return 0;
}

const table = { plan, commit, hash };
process.exit((table[cmd] || plan)());
