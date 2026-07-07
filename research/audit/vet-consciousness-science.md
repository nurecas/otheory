# Red-team audit: consciousness-science domain (14 claims)

Vetter: independent claim-vetter (adversarial). Date: 2026-07-07.

## Summary

All 14 assigned claims were already drafted to an unusually high standard: every cited source was checked
against the live/archived record (WebSearch + WebFetch against PubMed, Nature, Oxford Academic/PMC, PLOS ONE,
Frontiers, PNAS, and the IIT Wiki), and every source resolves and supports the claim as stated. No fabricated
citation, no invented author/date/result, and no sole-source-unverifiable claim was found across this batch.
No claim was downgraded to rejected for source failure. One claim (bem-presentiment-psi) was already correctly
provisioned at E6 and is confirmed **rejected** as instructed. No other status was forced to rejected.

**Sources individually verified this session** (fetched or searched and cross-checked against the claim text):
Koch/Massimini/Boly/Tononi 2016 NRN; Cogitate Consortium 2025 Nature (642:133-142) plus its bioRxiv
preregistration and the IIT Wiki's own post-hoc adversarial-collaboration supplement; Mashour/Roelfsema/
Changeux/Dehaene 2020 Neuron; Wiest 2025 Neuroscience of Consciousness (niaf011) plus the Kerskens & Pérez
2022 J. Phys. Commun. paper it leans on and the Warren 2023 critique/Kerskens & López-Pérez 2023 reply
dispute; Parnia et al. 2023 AWARE-II (Resuscitation 191:109903) — confirmed exact figures (567 arrests, 53
survivors/9.3%, 28 interviews/52.8%, 11/28=39.3% reporting memories, 1/28=3.5% correct on auditory implicit
learning, 0/28 visual, EEG activity 35-60 min into CPR at mean rSO2 43%); Griffin et al. 2024 Alzheimer's &
Dementia typology paper; the NIA news item (confirmed it actually reports Karlawish et al. 2024 Gerontologist,
not the Griffin paper — corrected); Carhart-Harris & Friston 2019 REBUS (Pharmacological Reviews); Safron et
al. 2025 ALBUS (Neuroscience of Consciousness niae038, full author list confirmed); Friston 2010 free-energy
principle (NRN); Graziano & Webb 2015 and Wilterson & Graziano 2021 PNAS attention-schema papers (corrected
author list — no "Kemper" co-author on the PNAS piece); Hunt & Schooler 2019 Frontiers in Human Neuroscience
GRT paper and Hunt 2020 JCS follow-up; Bem 2011, Ritchie/Wiseman/French 2012 PLOS ONE (confirmed exact null
result: N=150, one-tailed p=.83), and Bem/Tressoldi/Rabeyron/Duggan 2015 meta-analysis; Storm/Tressoldi/Di
Risio 2010 Ganzfeld meta-analysis and Hyman's 2010 comment (confirmed exact quotes and effect size 0.142,
Z=5.48).

## Fixes made

1. **terminal-lucidity-observation** — the draft's source list cited three real papers (Griffin et al. 2024
   typology; a health-care-professional pilot study; an NIA news item) but the prose blended their distinct
   findings without attributing which fact belongs to which study, and mischaracterized the NIA news item as
   covering the Griffin paper when it actually reports a third, uncited study (Karlawish et al. 2024, *The
   Gerontologist*, "Caregiver Accounts of Lucid Episodes in Persons With Advanced Dementia" — 30
   caregivers/29 patients, 83% reporting an episode, 21/34 episodes lasting seconds, longest ~45 min). Added
   the missing Karlawish citation and re-attributed each figure to its correct source. This was a
   sourcing-precision fix, not a fabrication (all facts were true, just mis-attributed); tier (E3) unchanged.
2. **attention-schema-theory** — corrected the Wilterson et al. PNAS citation; the published paper is a
   two-author paper (Wilterson & Graziano 2021), not "Wilterson, Kemper, Graziano et al." as the draft listed.
   Minor citation-precision fix; tier (E4) unchanged.
3. **wiest-anesthesia-microtubule-observation** — added an explicit, citable source for the Kerskens & Pérez
   MRI/entanglement claim referenced only in prose in the draft (Kerskens & Pérez 2022, J. Phys. Commun.),
   and confirmed via search that the "challenged" characterization is accurate (Warren 2023 methodological
   critique; Kerskens & López-Pérez 2023 response; genuinely unresolved). Tier (E3) unchanged; status set to
   disputed given this load-bearing citation is itself an active scientific dispute.
4. **cogitate-adversarial-collaboration-2025** — noted, via the IIT Wiki supplement fetch, that BOTH theory
   camps (not only GNWT's Naccache et al.) engage in post-hoc reconciliation of their own null results (IIT's
   Boly/Koch/Tononi reconcile the missing gamma-synchrony prediction via electrode-coverage/ROI arguments).
   Added this for balance; tier (E1 for the study itself) unchanged.
5. **psychedelics-predictive-processing-albus** — added functional unblinding (subjects/raters can almost
   always tell active psychedelic from placebo) as an explicit strongest-objection point; this is one of the
   most important, generalizable confounds in human psychedelic-trial phenomenology and was previously
   absent from this claim's objection. Tier (E3) unchanged; status set to disputed (REBUS vs. ALBUS is an
   active disagreement about direction of the belief-precision effect, not a settled succession).

## Observation vs. interpretation splits — confirmed correctly enforced

Per CLAUDE.md's consciousness-specific caution, three paired observation/interpretation claims were checked
line by line to ensure the interpretation does NOT inherit the observation's empirical tier:

- **terminal-lucidity-observation (E3)** vs. **terminal-lucidity-filter-interpretation (E4)** — correctly
  split. The filter/transmission reading is explicitly shown to make no distinct testable prediction beyond
  the observation itself ("a filter loosened" and "localized neural circuits transiently regained function"
  are observationally identical), so E4 is correct and does not borrow E3 credibility.
- **aware-ii-nde-phenomenology (E3)** vs. **aware-ii-nde-survival-interpretation (E4)** — correctly split.
  The interpretation claim explicitly foregrounds the near-chance implicit-learning null (1/28 auditory,
  0/28 visual) as undermining, not supporting, any survival/non-locality reading — exactly the discipline
  CLAUDE.md calls for on AWARE-II specifically.
- **wiest-anesthesia-microtubule-observation (E3)** is explicitly separated from the pre-existing
  orch-or-microtubules claim (not in this batch, filed separately) covering the further Orch-OR quantum-
  consciousness interpretation; this claim's own text repeatedly refuses to let the anesthesia/pharmacology
  findings imply anything about quantum information processing or non-local reception.

No claim in this batch conflated an observation's tier with its interpretation's tier. This is the strongest
structural feature of this domain's claim set as authored.

## Psi claims — replication status logged and tiered honestly

- **bem-presentiment-psi**: E6, **status: rejected**. Original result (9/10 experiments positive, JPSP 2011)
  vs. three independent preregistered direct replications (Ritchie/Wiseman/French 2012, N=150, one-tailed
  p=.83 — essentially exactly null). Confirmed this is a paradigm case in the replication-crisis literature.
  The 2015 pro-psi meta-analysis (Bem et al.) does not rescue this — it aggregates a different, more
  heterogeneous 90-study set rather than replicating away the specific direct-replication null. No physical
  mechanism proposed; retrocausal information transfer would violate established thermodynamic/causal
  asymmetries. Never to be cited by O Theory's synthesis as evidence for psi or non-local mind.
- **ganzfeld-psi-meta-analysis**: E3-with-heavy-caveats, **status: disputed**. Storm/Tressoldi/Di Risio 2010
  meta-analysis (29 studies, ES=0.142, Z=5.48, p=2.13e-8) vs. Hyman's peer-reviewed rebuttal in the same
  issue, which documents the effect is lab-dependent ("appears not to work for most researchers") and argues
  the meta-analysis manufactured apparent homogeneity by excluding outliers. No theory-neutral adversarial
  multi-lab replication (comparable to COGITATE) has been run. Explicitly and correctly distinguished from
  Bem: contested-but-unresolved (no clean disconfirming replication of comparable rigor), not cleanly null.
  Never to be presented as confirmed evidence for a shared/non-local consciousness substrate.

## Falsifiability check (physics/empirical claims)

Every claim in this batch that asserts an empirical or mechanistic position states an explicit falsifiability
entry, and none was found to be an unfalsifiable claim masquerading as science:
- ncc-research-program, cogitate-adversarial-collaboration-2025, aware-ii-nde-phenomenology,
  terminal-lucidity-observation, wiest-anesthesia-microtubule-observation, bem-presentiment-psi,
  ganzfeld-psi-meta-analysis: all specify concrete tests already run or runnable.
- gnwt-global-workspace: falsifiable and was in fact partially disconfirmed by COGITATE (contested).
- predictive-processing-free-energy-principle: correctly flags that its most general formulation risks
  unfalsifiability (the "dark room problem"), which is exactly why it is capped at E2 rather than treated as
  confirmed, and why status is set to disputed rather than a clean vetted E2.
- The two E4 interpretation claims (terminal-lucidity-filter-interpretation,
  aware-ii-nde-survival-interpretation) and the two E4 philosophical theories (attention-schema-theory,
  general-resonance-theory) correctly state that they are NOT empirically decidable as stated and are
  reclassified as philosophical (E4) rather than physics — consistent with the falsifiability rule.

## Tier/status table

| id | title (short) | domain(s) | type | tier | status | conf. | one-line verdict |
|---|---|---|---|---|---|---|---|
| ncc-research-program | NCC research program identifies reproducible posterior neural correlates of conscious perception | consciousness-science | empirical | E2 | vetted | medium | Real, replicated (incl. by COGITATE) correlational program; does not itself adjudicate rival theories of why correlates = experience. |
| gnwt-global-workspace | Global Neuronal Workspace Theory (ignition/broadcast) | consciousness-science, philosophy-of-mind | empirical | E3 | disputed | medium | Partially confirmed, partially disconfirmed by COGITATE 2025; proponents dispute the disconfirmation's significance — unresolved. |
| cogitate-adversarial-collaboration-2025 | COGITATE 2025 preregistered adversarial test of IIT vs GNWT | consciousness-science | empirical | E1 | vetted | high | Rigorous, real, preregistered multi-modal study; the STUDY is solid E1, but what it means for either theory remains contested (filed separately at E3). |
| wiest-anesthesia-microtubule-observation | Anesthetics target microtubules; potency predicted by tubulin electron-binding chemistry | consciousness-science | empirical | E3 | disputed | low | Genuine pharmacology findings; leans partly on a contested MRI/entanglement claim (Kerskens & Pérez) that is itself an unresolved dispute. |
| terminal-lucidity-observation | Caregivers/clinicians report unexpected lucid episodes in advanced dementia | consciousness-science | empirical | E3 | vetted | medium | Real, multi-study, NIA-funded phenomenon; retrospective-report evidence base, no captured neurophysiology of an episode yet. |
| terminal-lucidity-filter-interpretation | Terminal lucidity = brain-as-filter for non-local mind reopening | consciousness-science, philosophy-of-mind, metaphysics | philosophical | E4 | vetted | low | Unfalsifiable metaphysical reading layered on the E3 observation; correctly does not inherit its empirical credibility. |
| aware-ii-nde-phenomenology | AWARE-II: cardiac-arrest survivors report lucid recall; EEG activity reappears during CPR | consciousness-science | empirical | E3 | vetted | medium | Real, precisely-reported multi-center study; implicit-learning objective test of perception during arrest was near-chance (1/28). |
| aware-ii-nde-survival-interpretation | NDE phenomenology shows consciousness is non-local / survives brain | consciousness-science, philosophy-of-mind, metaphysics | philosophical | E4 | vetted | low | Goes well beyond what AWARE-II's own data (esp. its near-chance implicit-learning null) can support; not empirically decidable. |
| psychedelics-predictive-processing-albus | Psychedelics alter experience via predictive-processing changes (REBUS/ALBUS) | consciousness-science, philosophy-of-mind | empirical | E3 | disputed | medium | Genuine, actively developed neuroscience models; REBUS vs ALBUS is itself an open dispute, and functional unblinding limits all supporting human trials. |
| predictive-processing-free-energy-principle | Free-energy principle frames brain function as prediction-error minimization | consciousness-science, philosophy-of-mind | derived | E2 | disputed | medium | Mathematically developed, mainstream computational-neuroscience framework; its most general form faces a live unfalsifiability critique ("dark room problem"). |
| attention-schema-theory | Attention Schema Theory — awareness is a self-model of attention | consciousness-science, philosophy-of-mind | philosophical | E4 | vetted | medium | Real computational/engineering demonstration (PNAS) of the mechanism's utility; the identity claim (self-model = awareness) is illusionist philosophy, not testable science. |
| general-resonance-theory | General Resonance Theory — consciousness via shared vibratory resonance (panpsychist) | consciousness-science, philosophy-of-mind, metaphysics | philosophical | E4 | disputed | low | Peer-reviewed but minority even within panpsychism; no principled criterion distinguishes conscious from non-conscious synchronized systems. |
| bem-presentiment-psi | Bem 2011 precognition effect; failed by 3 preregistered direct replications | consciousness-science | empirical | E6 | rejected | low | Cleanly null-replicated (N=150, p=.83); paradigm replication-crisis case; no viable mechanism; never citable as psi evidence. |
| ganzfeld-psi-meta-analysis | Ganzfeld telepathy meta-analyses show small pooled effect, contested | consciousness-science | empirical | E3 | disputed | low | Small effect appears lab-dependent per Hyman's peer-reviewed rebuttal; no theory-neutral adversarial multi-lab replication yet; contested, not established. |
