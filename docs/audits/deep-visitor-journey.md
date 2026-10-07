# Deep visitor journey audit

Audited 7 October 2026 against `http://localhost:3000/` using the actual Chrome UI through CUA. No source edits, emails, form submissions, or external settings changes. Default desktop viewport was approximately 1728 × 906; mobile override was 390 × 844 and was reset afterward. The browser tab was closed when testing finished.

This is an independent visitor-path assessment, written after observing the site. Previous audit verdicts were not consulted. Source was inspected only afterward to explain the reproduced chapter-navigation defect. This was a browser viewport test, not a physical touch-device test or assistive-technology certification.

## Verdict

The site now makes its immediate job understandable: supplied fund records become draft reports and supporting workpapers that a human checks. Sector-specific examples are substantial enough to inspect, and source buttons usually answer the natural question, “Where did that number or explanation come from?” The fictional, prewritten nature of the demonstration is clearly disclosed.

The remaining conversion weakness is the transition from a convincing example to imagining the product in the buyer’s operating model. A cold visitor can explain the output much better than they can explain the administrator relationship, the daily user interaction, or the practical setup commitment. There is also a reproducible desktop report-navigation defect that causes the newly selected chapter to begin above the viewport.

## Actual journeys exercised

| Path | What was actually inspected | Outcome |
|---|---|---|
| Home → private credit → report → source → contact | Six-loan summary; ledger source; covenant worksheet; loan book; lower Next page; contact anchor; browser Back | Clear record-to-working-paper proposition. Source close restores focus. Chapter selection loses the new page’s beginning. Contact destination verified as email only. |
| Direct real estate | Hero; sample LP letter; Oltrarno manager-note source; asset-management chapter; portfolio chapter after scrolling | Good explicit distinction between investor pages and internal checks. Reproduced chapter context loss. |
| Direct venture capital | Hero; LP letter; cash/runway page; complete company-metrics source; repeated source opening and closing | Reader explains six-month runway and stale August data. Opening, Escape, reopening, and Close all work. |
| Direct private equity | Hero; LP letter; actuals/budget page; management explanations source | Financial results and management attribution are distinguishable. Fiesole explanation can be traced to the supplied notes. |
| Direct hedge | Hero; monthly letter; internal close-exception page; source cash comparison | Most concrete administrator relationship on the site: compares broker/custodian and administrator files; names operations and controller follow-up. |
| Mobile home | First fold; menu open and Escape; demo entry; gather/draft controls; three-page report overlay | Legible. Core proposition and both CTAs fit within the first screen. Demo changes work. Source/input controls are not in the first demo viewport. |
| Mobile sectors | RE, VC, PE, credit, hedge report entry and a substantive report chapter | Two-column contents, readable prose, contained horizontally scrolling tables. Credit source modal, keyboard horizontal scrolling, contact and Back also exercised. |
| Home → FAQ | Systems/data setup question; starting question | Answers explain agreement on inputs, access, data requirements, scope and terms, but remain high-level. No explicit administrator-fit answer found. |
| Keyboard | Homepage first Tab/skip link; credit source modal Tab and Escape; mobile overflow table ArrowRight | Visible 2px focus ring. Skip link’s next Tab reaches All funds. Modal Escape restores source trigger. Table scrollLeft moved to 40px after ArrowRight. |

## Reproducible functional issue

### P2 — Selecting a chapter while reading midway leaves the new chapter’s beginning offscreen

Reproduction, desktop credit:

1. Open `/credit/` and click **See a sample credit pack**.
2. Select **03 Internal · covenant worksheet**.
3. Scroll about three-quarters of one viewport into the page, until the covenant table and Pitti explanation are visible. The chapter contents remain sticky on the left.
4. Select **02 Internal · loan book** in the sticky contents.
5. The selected chapter changes, but the viewport remains at the old vertical reading position. It starts with loan-book table rows; the title, introductory paragraph, page number and top paging controls are above the viewport.

DOM-backed measurement after the observed click: **The loan book** heading top was **−113px**. The user has to infer what changed from the highlighted sidebar entry, then scroll upward to start reading.

The same problem reproduced on RE by selecting **04 Asset management update**, scrolling roughly half a viewport, then choosing **02 Portfolio at a glance**. Its **Portfolio overview** title was at approximately **0.5px**, hidden beneath the fixed navigation.

The bottom **Next page** behaves better: credit page 2 → 3 returned to the reader start, placing the new heading at approximately 458px in the viewport. Browser Back from contact also returned to the report anchor and preserved the selected chapter during that visit.

Source explanation: `src/js/credit-report.js` calls `renderReader(index)` from chapter buttons, with its default `moveToReader=false`. Only selected entry points, including the bottom Next page button, pass `true`. The same calling pattern exists in the five sector-reader scripts. This code corroborates the credit/RE observations; this audit does not claim to have reproduced the midway defect independently on all five pages.

Recommended behavior: after a chapter change, keep the new chapter title and first paragraph below the fixed navigation. Preserve the selected contents affordance, move keyboard focus deliberately, and use the same predictable policy for contents, top pagination and bottom pagination.

Evidence: `/private/tmp/cosimo-deep-audit/journey-credit-chapter-context.png`.

## Buyer inference and information hierarchy

These are conversion judgments, not broken controls.

### 1. Administrator fit is still an unanswered general buyer question

The homepage says “fund operations software” and explains records, format, drafts and approval. The direct sector pages say “AI agent for fund operations.” Neither formulation directly establishes which work stays with the administrator, where Cosimo receives approved figures, or whether it complements the fund’s accounting/reporting stack.

Hedge provides enough detail to infer this through its administrator-file cash comparison and approved performance source. RE, VC, PE and credit do not provide an equally explicit operational relationship. A reader could reasonably finish the sample thinking “this produces a well-sourced document,” while still wondering whether it duplicates the administrator’s service.

Recommendation: one concise, concrete explanation of fit near the approval/setup area, using only verified product facts. Answer who supplies records, who owns accounting/NAV or other authoritative calculations, what Cosimo prepares, and who approves/distributes. Avoid requiring readers to extrapolate the operating model from a fictional report.

### 2. Direct sector entry explains outputs better than implementation

The sector heroes name appropriate inputs: borrower financials and servicing records, company financials and management updates, founder updates and portfolio spreadsheets. Their closing CTA promises identification of a first task, its records and desired draft. That is enough to begin a conversation, but not enough to estimate the buyer’s involvement in setup.

The homepage improves this with the existing report, headings, terminology, source agreement, review process, and “configured and tested with your team.” FAQ adds agreement on data supply, access, requirements, scope and commercial terms. It does not commit to supported connection methods, delivery time, or review/export mechanics. These may legitimately require discovery; the missing piece is a clearer sequence and responsibility split, rather than unsupported promises.

Sector navigation contains Sample report, What we prepare and Contact us on desktop. On mobile only Contact us survives in the fixed header. The sector footer has Meet Cosimo, Privacy, Terms and Back to top, without FAQ. A direct cold-email visitor must return home and find FAQ to obtain even the additional setup explanation.

Recommendation: expose a short “how the first workflow starts” explanation within the sector route or link to the relevant setup answer. Keep the next step small and explicit.

### 3. The demonstration proves a deliverable, not the daily product experience

The sources and report are credible authored examples. There is no observed representation of uploading/connecting records, asking for a draft, reviewing an exception in the real product, making an edit, or handing the result back to the normal reporting process. Because the disclaimer is accurate, this is not deception. It is an evidence limit: visitors should not be expected to infer the actual application interaction from the document reader.

The homepage is better at articulating the process than a sector hero, but even its demo is a staged walkthrough. When first reached during this visit, it had already progressed to **03 Prepare the draft**. Manual steps and Replay are available; a visitor reading slowly may miss the sequence unless they choose to replay it.

Recommendation: if the actual product is ready to demonstrate, add one compact genuine interaction or explicit description of the normal user steps. If not, keep the illustration but state concretely what working with the configured workflow looks like.

### 4. Mobile reading works, but the report introduction consumes the destination screen

At 390 × 844, credit’s sample-report anchor spends most of the first screen on its section title, explanatory copy and six contents buttons. The report title first appears near the bottom, partly below the fold. RE has the same structure. This is coherent and not a layout failure, but **See a sample report** leads first to a contents/index screen, then the document.

On mobile the large sector headline and coffee line occupy substantial space; nevertheless the main sample CTA and Discuss your workflow link remained visible in the first fold in the observed RE/VC/credit states. The homepage fits its explanation more efficiently.

Dense tables correctly stay inside the document instead of widening the page. Key right-hand columns such as maximum covenant, runway, variance and administrator balance require horizontal scrolling. A visible “Scroll the table sideways…” cue exists beneath the table. The cue only appears after reading all rows on tall tables, so it would be easier to discover above the table too. Keyboard focus and horizontal movement were confirmed on credit.

## What works well

- Source inspections contain enough detail to substantiate the report, rather than opening empty previews. Credit includes supplied definitions and the unresolved add-back; VC includes metric definitions/reporting dates; PE preserves management attribution; hedge distinguishes a later internal cash check from approved performance.
- Internal and investor-facing pages are labelled explicitly, with persistent review/distribution caveats. Credit’s LP page is clearly separate from its internal working papers.
- Contact is a clear low-friction next step. The homepage explicitly says the button opens an email draft; sector CTAs say Email us about your workflow. The visible alternative address is available. No email was opened or sent in this audit.
- Modal open, Escape, Close and repeat-open behavior worked in sampled paths. The mobile source modal’s latest observed state kept its Close toolbar visible while scrolling; backdrop dismissal also worked.
- Homepage mobile menu is legible, opens and dismisses with Escape. The skip link appears visibly on first keyboard Tab and correctly skips navigation.

## Evidence and uncertainty

Screenshots saved directly under `/private/tmp/cosimo-deep-audit/`:

- `journey-credit-chapter-context.png` — reproducible desktop context loss.
- `journey-home-mobile-fold.png` — homepage first fold.
- `journey-credit-mobile-fold.png` — sector first fold.
- `journey-credit-mobile-reader-entry.png` — report index consumes most of destination screen.
- `journey-credit-mobile-source.png` — mobile source table and close control.
- `journey-mobile-modal-close-lost.png` — diagnostic capture only; despite its filename, do **not** treat this as a confirmed issue. One earlier immediate screenshot appeared to omit the modal toolbar after scrolling. Subsequent repeated observation showed the sticky toolbar visible, with Close at y=33px and working. No code/build changes occurred during the audit. This transient capture could not be established as a stable defect.

The audit establishes specific observed browser behavior and buyer inference. It does not establish actual product integration capabilities, security claims, service commitments, live generation quality, or the conversion rate of any wording.
