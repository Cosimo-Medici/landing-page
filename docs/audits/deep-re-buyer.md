# RE landing page: independent buyer audit

Reviewed 7 October 2026. Scope: a skeptical CFO, COO or founder of a small or midsize real estate fund, already using an administrator and spreadsheets. This is an expert review, not buyer research or a conversion experiment. No source files were changed.

## Verdict

The page communicates **draft investor documents, using existing records, with human approval**. That is understandable and potentially useful. The cream/purple design, COSIMO wordmark and document stack make the offer tangible. The inspectable sample is better evidence than an unexplained dashboard mockup, and its arithmetic is sound.

It does not yet establish **why a fund with an administrator and Excel should add Cosimo**, or what buying it entails. Most of the proof demonstrates adding clean spreadsheet columns, rewriting four short notes and checking a capital roll-forward. Those tasks are real but, as presented, easy to mistake for spreadsheet formulas plus document templates. The hardest likely work—getting inconsistent property records into a reviewable investor narrative—is described more convincingly than demonstrated.

I would understand the proposition and inspect the sample. I would still need a real product walkthrough and operating-model answers before treating it as a credible shortlist candidate. This is a specificity and evidence problem, not a reason to replace the approved brand or animation.

## How this was verified

- Read `CLAUDE.md`, the required frontend-design skill, `src/re/index.html`, `src/js/re-report.js`, `src/js/re.js`, relevant `src/css/re.css`, then `docs/re-design-direction.md` for approved choices and scope. Did not use prior audit files to form the initial assessment.
- The prescribed Claude memory index was unavailable at its `/home/shariq/...` path. No product capability was inferred from missing memory.
- Inspected six parent-supplied screenshots in `/private/tmp/cosimo-deep-audit/`: desktop hero, full page, workbench, reader, mobile hero and mobile full page. The full-page images establish relative hierarchy and length; close screenshots establish readable detail. They are not user testing. This agent did not operate the shared browser or independently verify every interaction state.
- Independently recomputed property and investor values with Node from the authored arrays. All listed calculations below reconcile.
- Examined four primary sources from industry/vendor sites, listed below. Vendor descriptions establish competitive offers, not independent proof of their quality or results. No conversion or time-saving statistic is inferred.
- Line references are to the reviewed local source snapshot. `HTML`, `report JS`, `hero JS` and `CSS` below mean `src/re/index.html`, `src/js/re-report.js`, `src/js/re.js` and `src/css/re.css` respectively.

## Five-second understanding and buyer questions

**What is immediately clear:** quarterly LP reporting; less document assembly; a sample to inspect. The initial mobile screenshot includes the complete headline, explanatory paragraph and primary CTA. It is wrong to say that the CTA is buried below the mobile fold. On desktop the document stack gives useful subject-matter context without needing to read its smallest text.

**What remains unclear:** whether this is a subscription product, a configured agent, a managed reporting service, or a bespoke automation engagement. “AI agent for fund operations” at HTML 50 supplies a technology label, not a buying model. “Together, we’ll identify a first task to automate” at HTML 136 sounds like a services discovery call. Neither interpretation is necessarily wrong, but the buyer cannot tell which is intended.

**The skeptical internal conversation:** “Our administrator already produces the capital statements and notices. We keep the operating numbers in Excel. The quarterly commentary still takes us time, but who sets this up, how do we review it, and is reviewing its output less work than preparing the report ourselves?” The present page answers the last question with a nice-looking draft, not with evidence of the review workload.

The permanently visible lede should carry the operating proposition. Keep the two independent randomized typewriter tracks and existing promise language; they are approved creative choices. Their speed language creates an expectation to substantiate later, but this audit does not recommend removing them or pairing the tracks mechanically. There is no measured turnaround evidence in the inspected source.

## Ranked changes

### 1. Define the job Cosimo does beside the administrator — high priority

**Evidence:** HTML 48, 97, 125–130 and 136; report JS 84. The page lists outputs repeatedly but mentions the administrator only inside the internal example. This leaves the competitive context almost entirely to the visitor.

Juniper Square explicitly offers fund administration and investor management for real estate firms; its workshop describes personalized investor statements and PDF capital/distribution notices. Yardi markets investment accounting, transaction automation and investor reporting. These are vendor claims about their own offerings, sufficient to show that a list of document types is not a distinctive proposition. They do not show that every target fund owns or successfully uses those tools. [Juniper Square real estate](https://www.junipersquare.com/solutions/real-estate), [Juniper Square workshop](https://pages.junipersquare.com/InvestmentOperationsEssentials.html), [Yardi Investment Suite](https://www.yardi.com/suite/investment-suite/).

**Recommended positioning:** first-draft assembly between property reporting and investor communications. Lead with bringing approved figures and manager commentary into the report the fund team still prepares. Treat notices/statements as adjacent jobs, not equal reasons to believe the central proposition. This is the strongest defensible positioning hypothesis from this page; it is not a proven competitive advantage.

**Replacement lede, consistent with the existing advertised scope:**

> Cosimo brings your property figures and manager updates into a draft LP report, with the source records and open questions alongside it for review. Your team checks the figures and approves the commentary before it goes to investors.

That explains the useful handoff, rather than just listing files. Verify that actual product output includes usable source references before publishing the source-record claim as a product promise; the current page proves only the authored example.

**Replace the standalone pain section with a short qualification near the proof:**

> Your property managers have sent their updates. The operating figures are in a workbook. There is still an investor report to put together. This example follows those records into the first draft and shows what remains for the fund team to confirm.

If product delivery truly works beside an existing administrator, explicitly state that and name the handoff. Do not invent an integration, promise “no migration,” or claim to replace fund accounting. Confirm the actual arrangement first.

### 2. Replace simulation-as-proof with evidence of real preparation and review — high priority

**Evidence:** HTML 103, 116; report JS 1, 5–24, 35–108 and 116–125. The disclosure is commendably explicit: authored records and prewritten commentary. All rendered figures and sources come from the same JavaScript constants. A correct example establishes internal consistency and demonstrates an intended workflow; it does not establish extraction accuracy, repeatability, usable exports or reliable exception handling in Cosimo.

The source workbook is already a consolidated eight-property table with common columns. The manager note explicitly says the budget/date is not approved. The four investor rows all match. There is no conflicting file, old version, missing property, sign-convention problem or numerical discrepancy. The buyer sees the easy path only.

**Concrete next proof:** a short actual run on a permissioned or synthetic-but-realistic reporting pack, showing the original file shapes, generated draft, a source reference and one unresolved item. Include the reviewer correction and regenerated result if that is supported. Distinguish software output from human edits. Time claims must identify start/end conditions and include setup/review rather than implying coffee-length end-to-end turnaround.

If actual-run evidence is not ready, keep the current example openly illustrative. Strengthen it with one plausible exception that the example explains honestly. A mismatched recorded balance is more informative than four green matches: show expected balance, recorded balance, difference and the unresolved action. Never have the illustration silently “fix” the ledger. Do not add a fake exception merely for drama; select one the real product can genuinely surface.

**Immediate wording at report JS 123–125:**

> Check the capital roll-forward against the recorded balance.

> Each account’s opening balance plus contributions, less distributions, is compared with its recorded closing balance. These checks cover the supplied ledger; they do not confirm cash settlement or approved allocations.

This is a precise boundary, not a new claim of comprehensive reconciliation. Put the recorded balance in the visible input comparison so the buyer can inspect the claimed check without opening another source. Currently that decisive column is omitted from the visible table at report JS 124, even though “4 of 4” is prominent.

### 3. Supply the missing operating model before asking for a discovery email — high priority

**Evidence:** HTML 134–136. Human approval is clear. Everything around that approval is unclear: intake method, supported output formats, setup ownership, template adaptation, who resolves exceptions, and what the first engagement consists of.

This is not a request for a long FAQ or an enterprise compliance wall. Add a compact factual block answering:

| Buyer decision | Minimum useful answer to establish internally |
| --- | --- |
| What am I buying? | Actual commercial model: product access, configured workflow, service, or a defined combination. |
| What do I provide? | Supported file types and records; whether a prior report/template is used. |
| What do I get? | Actual editable/exportable deliverables and review surface. |
| What stays with our team/admin? | Accounting close, valuations, allocation approval, exception resolution and release, as applicable. |
| What does starting involve? | Who configures it, first-task scope and the next concrete step. |
| Can I entrust the records to it? | Link to verified product data-handling information appropriate to investor/property records. |

Do not fill these with generic “secure,” “seamless,” “works with your systems,” or invented turnaround/pricing. Missing answers are a product-fact dependency, not something stronger copy can manufacture. The footer privacy link alone does not explain handling of supplied investor ledgers.

### 4. Make the proof sequence serve the investor-report story — medium/high priority

**Evidence:** HTML 94–117, 124–136; report JS 116–125; CSS 133–145, 195–203, 344–386. The full screenshots show a long dark middle occupying most of the page. The reader is legible, but substantial source/result panels precede it; the capital worksheet changes the subject before the LP report arrives. The hero, intro, workbench intro, reader heading and workflow section repeat the same offer.

Recommended sequence using the existing material:

1. Keep the branded hero and independently randomized tracks. Use the stable lede to define the specific preparation/review handoff. Retain the direct sample CTA.
2. Delete the standalone “Stop copying figures…” section and fold its useful context into the workbench introduction.
3. Keep **two visible source/result comparisons**: property figures into the report; manager notes into commentary with an open question. Keep actual data visible. Reduce repeated card labels and vertical heading space, rather than shrinking the numbers or hiding sources again.
4. Bring the report reader next. Explain that it is an illustrative operating update with a separate internal review appendix. Visually group investor pages 1–4 and internal pages 5–6 in the contents.
5. Put the capital roll-forward after the investor-report proof as a separate internal check. It is useful evidence, but not a necessary third step in drafting property commentary. Preserve access to the full ledger.
6. Replace the large second paper-cover illustration in “What we prepare” with concise input/output requirements or an actual notice excerpt. The hero has already done the document-cover job. The random unlabeled bars at CSS 365–381 supply no notice-specific information.
7. Use the space recovered from the giant C / approval section for the factual operating model. Keep the approval sentence near the draft and final contact invitation.
8. End on one specific email invitation.

This preserves the useful visible comparisons and six-page reader. It does not return to hidden previews, timed walkthroughs or stacked report dialogs.

**Brevity versus the user's preference for substance:** a much shorter teaser would be a possible acquisition-page strategy, but it would discard the inspectable detail the user deliberately asked for. That is not the recommendation. Retain all eight property rows, four investor rows, source records and six report pages. Shorten duplicated framing, repeated document covers and decorative section height. The direct hero sample link continues to let a visitor skip the explanation; the normal scroll path retains substantive evidence. Moving the internal capital check after the reader changes its role and timing, not its availability. If the user wants all three comparisons before the reader, keep that sequence and clearly label the third “Separate internal check”; resolving its role matters more than enforcing this audit's preferred order.

### 5. Clean up sample scope and cross-document chronology — medium priority

**Evidence:** HTML 65–85; report JS 6, 19, 41–44, 77–99.

- The hero capital call is labelled Q3 and due **15 October 2026**, for **Arno Court acquisition**. Arno already has Q2 NOI and Q3 operating results in the report. The same investor’s $125,000 appears as a Q3 contribution in the ledger and statement. These might be independent illustrative events, but identical fund/investor/amounts invite a single-story interpretation. The sample never explains an early payment or acquisition bridge. Make the call due within Q3 and use a purpose consistent with an already-owned asset, such as approved property works, then align the source narrative if needed. Alternatively explicitly separate unrelated examples. Do not change real financial records; these are authored samples.
- Page 1 says the following pages cover investor capital activity (report JS 44). Pages 5–6 are expressly internal, while 1–4 are the investor report. Replace the final sentence with “The following pages cover portfolio performance and updates from the property teams.” Keep LP-specific data out of the investor copy. The current internal labels are useful and should stay.
- The hero “Investor statement” is accurately qualified as a capital-movement example, excluding income and valuation changes. Nevertheless, it is not evidence of a full investor statement. Keep its scope legible. Use “Capital activity excerpt” in the preview or supply a supported complete statement example; do not remove the caveat to make the offer sound broader.
- The sample is an operating update for an apartment portfolio. It does not show debt, fund-level fees, valuations, NAV or investor return calculations. That is acceptable for a selected excerpt, less convincing as “the LP report” for all RE strategies. Label the example “Multifamily operating update” or “Selected LP report pages,” and ask actual target buyers what their complete package needs. Do not bolt on invented metrics. NCREIF/PREA addresses reporting consistency across accounting, valuation and performance/risk; its institutional scope is a reason to be precise about this sample, not to claim that every small fund needs the full framework. [NCREIF reporting standards](https://ncreif.org/standards/).

### 6. Make the contact request more concrete, without adding friction by default — medium priority

**Evidence:** HTML 49, 136. The visible mail address and “a few sentences” instruction are good. The CTA truthfully opens email. A mailto-only action can depend on the visitor’s configured email application, but no failure is established by these screenshots. Do not invent a broken funnel or automatically add a long form.

The current question is broad enough to make the visitor design the use case. Suggested ending:

> **Start with the report your team still assembles.**
>
> Tell us which report you prepare, where its figures come from, and which part takes the most manual work. We’ll discuss the first draft you need and the checks your team would keep.
>
> **Email us about your reporting**

Prefilled body:

> We prepare:
>
> The figures and updates come from:
>
> The part we still do by hand is:

This asks for a description, not sensitive attachments. Add a named response owner, scheduling option, pricing basis or trial description only if real and supported. Consistent secondary CTA wording (“Discuss your reporting”) would be more concrete than generic “workflow.”

## Section-by-section buyer assessment

| Section | Keep / change | Buyer reason and source reference |
| --- | --- | --- |
| Navigation and sector bar | Keep COSIMO and clear Real estate state. Secondary sector links are not a lead finding. | They occupy two rows on mobile but the principal CTA still fits in the supplied initial view. HTML 28–41. |
| Hero headline and illustration | Keep visual direction and both independent typewriter tracks. Change stable proposition and repair document chronology. | Recognizable output; strong hierarchy. Illustrative documents are labelled. Do not make legibility of tiny decorative text carry the sales case. HTML 44–90; hero JS 30–31, 198–204. |
| Hero actions | Keep ungated sample first; make conversation label specific. | Gives a skeptical visitor something to judge before contacting sales. HTML 49. |
| Pain intro | Remove as a full section; retain one context paragraph. | “Again” and “stop copying” repeat hero relief without advancing the case. It assumes records have already arrived, which limits the claimed chasing benefit. HTML 94–98. |
| Workbench intro | Shorten, retaining disclosure. | “Follow…” is clear but the ledger aside complicates a simple LP-report promise. HTML 100–104. |
| Property figures comparison | Keep real rows, weighted occupancy and explicit NOI definition. Clarify that the input is already consolidated. | Useful inspectable example; not evidence of aggregation across heterogeneous PM packages. report JS 117–119. |
| Manager note comparison | Make this the primary differentiating proof alongside the figures. Show a real generated version when available. | Preserves an unresolved fact and avoids inventing a date/budget. Current paraphrase is competent but adds limited analytical value. report JS 120–122. |
| Capital comparison | Demote to distinct internal-review use case; show recorded balances. | All-green arithmetic on four rows is easy to reproduce in Excel and cannot establish bank/admin reconciliation. report JS 123–125. |
| Report reader | Keep readable inline artifact, source access and self-paced pages. Group internal material separately. | Content can be judged; this is the strongest credibility surface. HTML 106–116, CSS 195–212. |
| Other workflows | Keep accurate approved-allocation inputs. Remove redundant LP-report pitch and large cover graphic; show meaningful fields. | Calls and distributions are mainly document preparation given approved amounts. State that plainly. HTML 124–131. |
| Human approval | Keep the control boundary close to the draft; remove the oversized separate C panel. | Approval is reassurance only if the reviewer can efficiently inspect sources and exceptions. “Check the numbers” alone can sound like all the effort is handed back. HTML 134; CSS 383–387. |
| Contact and footer | Keep visible email and low initial ask. Add buying/next-step facts above it. | Appropriate early inquiry route, but uncertain commercial scope currently weakens the reason to initiate it. HTML 136–138. |

## Every report page and source

| Item | Assessment |
| --- | --- |
| Page 1, investor letter — report JS 36–46 | Restrained, understandable, cites operating figures and notes. Avoids claiming NOI is a fund return. Opening metrics are useful. Final reference to investor capital pages conflicts with the internal-only split. “Cash distributions” relies on the ledger supplied; no bank settlement confirmation is demonstrated. |
| Page 2, portfolio overview — 47–55 | Weighted physical occupancy is correct and explicitly defined. Lowest-occupancy assets and 24/58 vacant-unit concentration are useful prioritization. Vacancy alone supports a leasing focus; it does not demonstrate investment advice or comprehensive asset management. |
| Page 3, operating results — 56–67 | Shows both positive quarter-over-quarter NOI and the budget shortfall, a good balance. Correctly says the full Oltrarno decline needs more explanation. No budget revenue/expense bridge is available, so the sample cannot diagnose the $90,000 budget gap. This is a realistic example of a remaining question, potentially more valuable than another generic missing-info flag. |
| Page 4, asset commentary — 68–76 | Four named updates are faithful to the source, and coverage limitation is disclosed. There are no manager notes for the other four properties; avoid implying complete commentary coverage. Preserve “not approved” and do not infer a completion promise. |
| Page 5, capital activity — 77–86 | Correct movement-only arithmetic and an explicit administrator signoff boundary. It is neither full capital accounting nor independent reconciliation. Keep investor names confined to the internal appendix in the demonstrated publication model. |
| Page 6, checks and sources — 87–99 | Useful source register and review item. Several checks repeat the same source-derived identities, so their count is not an accuracy measure. It could more candidly distinguish checked arithmetic, absent information, and things not checked. |
| Operating workbook — 105–106 | The shown source supports portfolio occupancy, NOI, prior-period and budget calculations. Already normalized, not eight raw manager packages. No extraction capability has been demonstrated. |
| Capital ledger — 107 | Includes recorded balances and exposes the scope limitation. Source-to-output matching is inspectable. Same-file matching does not independently validate allocations, transactions or cash. |
| Manager notes — 108 | Source supports each property's reported facts. Oltrarno missing data is explicit in the source; preserving it is useful, but not evidence of discovering a subtle inconsistency. |

## Arithmetic verified

No arithmetic defect found in the authored example. Do not use “accuracy concerns” as shorthand for a calculation error here; the concern is what correct calculations do and do not prove.

| Calculation | Recomputed result |
| --- | --- |
| Units / occupied / vacant | 1,000 / 942 / 58 |
| Weighted physical occupancy | 942 ÷ 1,000 = 94.2% |
| Q3 revenue less expenses | $3,860,000 − $1,500,000 = $2,360,000 NOI |
| Prior NOI | $2,280,000; consistent with $3,780,000 revenue − $1,500,000 expenses |
| NOI change | $80,000 / 3.5088%, appropriately rounded to 3.5% |
| Budget shortfall | $2,450,000 − $2,360,000 = $90,000 |
| Arno and Pitti NOI improvement | $22,000 + $21,000 = $43,000 |
| Oltrarno NOI decline | $295,000 − $284,000 = $11,000 |
| Porta Romana and Oltrarno vacant units | 10 + 14 = 24 of 58 |
| Capital movement totals | $32,000,000 + $2,000,000 − $850,000 = $33,150,000 |
| Strozzi movement | $1,000,000 + $125,000 − $42,500 = $1,082,500 |
| Four recorded closing balances | All match their computed movements, with zero difference |

## Evidence needed to change the verdict

The main unknown is **actual product execution**, not the illustrative math. A real run showing usable source references, a realistic exception, editable output and a bounded reviewer task would materially strengthen this page. A clear account of setup, supported inputs/outputs and the administrator handoff would resolve the buying uncertainty. Evidence that target managers specifically lack notice generation would justify giving notices more prominence; otherwise the reporting/commentary assembly story should lead.

Test with target operators who already use an administrator and Excel. After the initial view, ask what they think they are buying and which task leaves their desk. After the example, ask what they believe has been verified and what they would still check. Then ask why they would use this alongside their current process. Treat uncertainty or a mistaken interpretation as evidence to revise the page; do not convert this expert audit into an invented conversion forecast.
