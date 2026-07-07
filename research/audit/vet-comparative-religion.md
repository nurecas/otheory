# Red-team audit: comparative-religion (11 claims)

Vetter: independent claim-vetter (red-team), 2026-07-07.

## Summary

All 11 claims arrived in unusually good shape: correct E5 tiering for tradition-claims, E4 for the
perennialism meta-claim, honest falsifiability entries ("not an empirical claim -> category error to
state as physics"), and steelman/objection pairs that were already substantive rather than pro-forma.
No fabricated citations were found anywhere in this batch. Every source resolved to a real, checkable
document; where a direct WebFetch hit a 403 (ResearchGate, several sacred-texts.com pages, SEP
Monotheism on one pass), the content and attribution were independently corroborated via search and/or
a second fetch, so nothing here is "sole-source-unverifiable" or rejected outright.

Tier changes: **none of the 11 tiers changed.** All tradition-claims remain E5; the perennial
philosophy thesis remains E4, `status: disputed`, correctly distinguished as a *comparative
metaphysical* meta-claim rather than a tradition's own E5 self-report. This is a case where the
provisional tiering was already calibrated — I did not find grounds to inflate or deflate any of them.

### Source and translation-rights flags (the substantive findings)

1. **Kabbalah (`kabbalah-ein-sof-sefirot`) — pseudonymous, non-critical translation, flagged per
   instructions.** The cited Zohar excerpt (Nurho de Manhar, sacred-texts.com) is confirmed
   pseudonymous — "probably British, actual identity unknown" — uses idiosyncratic Theosophical
   vocabulary ("Karma," "Planes of Existence") not native to Kabbalah, covers only the first ~200 pages
   of the Zohar, and is explicitly *not recommended* as an introductory text by the hosting archive's
   own editorial note. This is exactly the translation-rights/reliability risk the brief anticipated.
   Fix applied: kept the source (it is real and legitimately public domain, not fabricated) but
   demoted it in the source list to "illustrative primary-text color, not load-bearing," and made the
   substantive claim rest on SEP "Monotheism" §7.1 (Ein Sof / sefirot / Rabbi Azriel of Gerona's
   in-potentia defense against the multiplicity charge), which is independently confirmed accurate and
   on-topic. Steelman strengthened with the Azriel of Gerona detail; objection strengthened with the
   "three hidden lights" / crypto-Trinitarianism charge, both drawn directly from the verified SEP
   entry.

2. **Kashmir Śaivism (`kashmir-shaivism-spanda`) — citation/URL mismatch, corrected.** The prior
   citation named the title "The Doctrine of Vibration" (Dyczkowski's real but *separate* 1987 SUNY
   Press monograph, ISBN 9780887064326) while linking to a URL that actually resolves to a
   *different* Dyczkowski/SUNY Press book, "The Stanzas on Vibration" (1992, ISBN 9780791412626) — the
   actual translation of the Spanda Kārikā with its four traditional commentaries. Both books are real
   and both are legitimate scholarship, but they are not interchangeable, and citing one title while
   linking the other is a sourcing error, not a fabrication. Fixed by renaming the citation to match
   the linked URL/content ("The Stanzas on Vibration," 1992). IEP "Kashmiri Shaiva Philosophy"
   independently confirmed live and on-topic (Spanda, Vasugupta, Śiva/Śakti, prakāśa-vimarśa).

3. **Trikāya (`trikaya-dharmakaya`) — weak secondary source upgraded, as invited by the brief.**
   Britannica's "Trikaya" overview was replaced with John Makransky's *Buddhahood Embodied: Sources of
   Controversy in India and Tibet* (SUNY Press, 1997), a peer-reviewed monograph specifically on the
   India-Tibet Dharmakāya controversy, confirmed as a real book at the cited SUNY Press URL. This also
   strengthened the `strongest_objection`, which now cites a named scholarly controversy (the
   Abhisamayālaṃkāra dispute) rather than a generic "ontological status is debated" assertion. Kern's
   1884 Lotus Sūtra translation (Sacred Books of the East vol. 21) is confirmed public domain and
   correctly attributed and retained unchanged.

4. **MMK 24.18 (`madhyamaka-sunyata-emptiness`) — ResearchGate access-restricted, not fabricated.**
   Direct WebFetch of the cited ResearchGate paper "On MMK 24.18" returned HTTP 403 (login wall), but
   independent search confirmed the paper exists at that exact identifier and is substantively about
   MMK 24.18's interpretation. Retained as `verified: true` with a note that it is access-restricted
   (paywalled/gated) rather than freely fetchable — this is a source-quality caveat, not grounds for
   rejection, since its existence and topic were corroborated through a different channel.

5. **Yogācāra (`yogacara-cittamatra-mind-only`) — correct handling of translation-rights gap, no
   change needed.** The claim already honestly notes no stable public-domain English translation of
   Vasubandhu's Triṃśikā was found; independent search confirmed the standard English translation
   (Stefan Anacker, in *Seven Works of Vasubandhu*, Motilal Banarsidass, 1984/2002) remains under
   copyright, so relying on SEP's "Yogācāra" entry (Dan Lusthaus) as the accessible secondary source —
   rather than linking an informally hosted PDF of a copyrighted translation — was the correct call
   under the project's IP rules. Left as-is; flagged here only as a confirmed-correct pattern worth
   noting for other claim files with similar translation gaps.

### Other verifications (no changes needed)

- **Plotinus**: MacKenna's Enneads (1917-1930) confirmed public domain; SEP "Plotinus" confirmed live.
- **Daoism**: Legge's 1891 Dàodéjīng (Sacred Books of the East vol. 39) confirmed public domain
  (independently corroborated via Internet Archive scan of the original volume after a direct 403);
  IEP "Daoism" confirmed live and on-topic.
- **Apophatic theology / Pseudo-Dionysius**: Rolt's 1920 Mystical Theology confirmed public domain
  (also mirrored at CCEL); SEP entry (Corrigan and Harrington) confirmed live, with "divine darkness"
  and negation-of-negations language quoted almost verbatim from the actual entry.
- **Eckhart**: SEP "Meister Eckhart" confirmed live and directly on-topic for God/Godhead, Seelengrund,
  Gelassenheit, and the 1329 bull *In agro dominico*; the 28-articles / 17-heretical / 11-suspect
  breakdown and the fact that Eckhart himself was never personally declared a heretic (he died in 1328,
  before the bull) were independently corroborated. `strongest_objection` tightened with the exact
  article counts.
- **Sufism / waḥdat al-wujūd**: SEP "Ibn ‘Arabī" (William Chittick) confirmed live; directly verifies
  both load-bearing claims — that Ibn Arabi himself never used the phrase, and that Ibn Taymiyya was
  the first to attribute the doctrine to him and call it "worse than unbelief." Noted (not fixed, since
  no better alternative was found) that the "primary-text" source row has no independent link — no
  public-domain Fuṣūṣ al-Ḥikam translation was locatable, so both rows currently point to the same SEP
  URL. This is an honest gap, not a fabrication, but future research could look for a public-domain
  partial Fuṣūṣ translation if one exists.
- **Perennial philosophy**: Huxley 1945 confirmed via the cited Aeon essay (accurately summarizes his
  three-point convergence claim); SEP "Mysticism" confirmed live and directly covers both Stace's
  essentialism and Katz's 1978 hard constructivism. Added to `strongest_objection`: SEP's own note that
  Katz's hard constructivism has live counter-objections (thin pre-cultural descriptions, meditative
  disciplines that strip cultural content) — omitting these would have understated that this is a
  genuinely two-sided, unresolved debate rather than one where Katz has simply won. Added an explicit
  scope note distinguishing this claim from the mysticism-domain's `perennialism-constructivism-debate`
  (referent-metaphysics vs. experience-epistemology), per the brief's instruction to keep them
  cross-referenced, not merged. `status` confirmed as `disputed`, tier confirmed as **E4** (comparative
  meta-claim argued by reason, not a tradition's own E5 self-report, and not empirically decidable even
  in principle).

### Flattening check (guard against smuggling distinct traditions into one identity)

Checked every claim body and steelman for the specific failure mode of collapsing distinct traditions'
ultimates into a single referent. None were found:
- Madhyamaka śūnyatā is correctly represented as anti-reificationist — the claim explicitly states
  emptiness is not to be read as a synonym for Brahman/the One/Ein Sof, and that Madhyamaka's own logic
  treats emptiness itself as empty specifically to block that move.
- Yogācāra "mind-only" is kept distinct from Madhyamaka emptiness (the claim notes they are "sometimes
  conflated in popular accounts" and explicitly separates them).
- Trikāya's Dharmakāya is kept tied to Buddhology (the nature of Buddhahood) rather than generalized
  into a cross-tradition cosmological substrate.
- Kashmir Śaivism's "vibration" (spanda) is repeatedly and explicitly flagged as technical/symbolic,
  not physical, and distinguished from Advaita's māyā doctrine and Śaiva Siddhānta dualism.
- Every claim's closing lines independently state that any O-Theory mapping onto "O-Source" is
  metaphor/analogy only, never shared structure or evidence — this pattern was consistent and correct
  across all 11 files and did not need correction.

### Rejections

None. All 11 claims retain real, checkable sources; no claim was moved to `status: rejected`.

## Table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| madhyamaka-sunyata-emptiness | Madhyamaka śūnyatā (Nāgārjuna) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Anti-reificationist emptiness doctrine, correctly kept distinct from "ground of being" framings; sources confirmed real. |
| trikaya-dharmakaya | Trikāya / Dharmakāya (Mahāyāna) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Three-bodies doctrine of Buddhahood; Britannica secondary source upgraded to Makransky's peer-reviewed monograph. |
| yogacara-cittamatra-mind-only | Yogācāra cittamātra (Vasubandhu) | comparative-religion, mysticism, metaphysics, philosophy-of-mind | symbolic | E5 | vetted | medium | "Mind-only" doctrine correctly separated from Madhyamaka; translation-rights gap handled honestly via SEP. |
| plotinus-the-one-emanation | Neoplatonism, the One (Plotinus) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Emanation hierarchy from an ineffable simple first principle; MacKenna translation and SEP entry confirmed. |
| kashmir-shaivism-spanda | Kashmir Śaivism, spanda | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Consciousness-as-vibration doctrine; fixed a title/URL citation mismatch (two different real Dyczkowski/SUNY books). |
| daoism-dao-ineffable-source | Daoism, the ineffable Dao | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Nameless source-pattern doctrine from the Dàodéjīng; Legge translation and IEP entry confirmed. |
| kabbalah-ein-sof-sefirot | Kabbalah, Ein Sof / sefirot | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Hidden-godhead/emanation theosophy; flagged pseudonymous non-critical Zohar translation and rebalanced sourcing onto SEP. |
| apophatic-theology-pseudo-dionysius | Apophatic theology (Pseudo-Dionysius) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Negation-beyond-negation method for approaching God; Rolt translation and SEP entry confirmed verbatim-accurate. |
| eckhart-godhead-beyond-god | Eckhart, Godhead beyond God | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Gottheit-beyond-Trinity doctrine; 1329 condemnation details confirmed and tightened in the objection. |
| sufism-wahdat-al-wujud | Sufism, waḥdat al-wujūd (Ibn Arabi) | comparative-religion, mysticism, metaphysics | symbolic | E5 | vetted | medium | Unity-of-Being doctrine; SEP confirms Ibn Arabi never used the phrase and Ibn Taymiyya's polemical role. |
| perennial-philosophy-common-core-thesis | Perennial philosophy common-core thesis | comparative-religion, mysticism, metaphysics | philosophical | E4 | disputed | low | Contested comparative meta-claim, not a tradition's own report; Katz's constructivism (with its own live counter-objections) kept as the central rival; cross-referenced (not merged) with the mysticism-domain perennialism-constructivism-debate. |
