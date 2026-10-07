# Independent VC buyer audit

7 October 2026. Audience: small and mid-sized venture funds whose partners, CFOs or COOs already use a fund administrator, Excel, and founder emails. Read-only source review; only this audit document was written. No earlier audit conclusions were consulted.

## Judgment

The page makes the task legible and the fictional calculations are sound. The most persuasive idea is the dated company update with a missing September submission and an unresolved financing. The least persuasive idea is that a neat LP report plus an elementary capital roll-forward establishes a reason to buy another system.

A buyer can understand **what comes out**, but cannot yet judge **how much work disappears**, **where it fits beside the administrator**, or **why this is better than a saved prompt and their current reporting template**. This is the main conversion problem. More reassurance paragraphs will not solve it. A more demanding, less repetitive worked example and a concrete next step would.

The page is strongest as an offer to prepare the portfolio narrative and review list that accompany the administrator's financial package. It is weaker as an offer to deliver a complete quarterly LP reporting package, and weaker still when capital notices receive equal prominence to the venture-specific work.

This is a buyer inference, not a measured conversion result. No prospective customer was interviewed and no live product workflow was verified.

## Evidence and scope

Read `CLAUDE.md`, the installed frontend-design skill, `src/vc/index.html`, `src/js/vc-report.js`, shared `src/js/re.js` and relevant `src/css/re.css`, and `docs/vc-pe-research.md`. The canonical memory path supplied in AGENTS.md was unavailable. Existing brand, four typefaces, document illustration and approved typewriter style are constraints, not targets for replacement.

Four primary sources were opened directly:

| Source | Relevant evidence | What it does and does not establish |
|---|---|---|
| [NVCA Operating Principles](https://nvca.org/operating-principles/) | LP reporting should communicate fund activities and performance accurately, with financial reporting and valuation governed by the LPA. | Supports dependable communication and a clear boundary between company metrics and fund reporting. Does not establish demand for Cosimo. |
| [NVCA Accounting & Auditing Standards](https://nvca.org/accounting-auditing-standards/) | The LPA generally determines quarterly reporting content and sometimes form; fund finance teams provide information about funds and portfolio companies. | Supports retaining the manager's existing report format. Does not imply one universal VC report template. |
| [Carta unaudited fund administration scope](https://support.carta.com/kb/guide/en/scope-of-services-carta-fund-administration-for-unaudited-funds-neLf04KNbp/Steps/3724482) | Its stated services include financial statements, PCAPs, fund performance metrics, capital-call calculations/notices and distribution notices. Clients still supply information and approvals. | Establishes a credible incumbent alternative and overlap. This is one vendor's contractual scope, not proof that every administrator provides identical service or quality. |
| [Visible for Investors](https://visible.vc/for-investors/) | The vendor advertises extracting founder documents, collection reminders, source links, monitoring, metric alerts and LP reporting. | Establishes that aggregation, source traceability and reporting are already marketed in this category. Vendor claims are not independent performance evidence or a validated comparison with Cosimo. |

The competitive implication is an inference: “drafts from your records, with sources” is a useful capability description, but cannot itself establish a defensible distinction. The page must show the particular work the manager can stop doing, in their existing process.

## Ranked changes

### 1. Own a narrower, immediately recognizable job

**Priority: high.** `src/vc/index.html:49`, `:95–108`, `:125–137`.

The hero mixes LP reports and notices. The full example is principally a software-company operating update, without holdings, cost, carrying values, ownership, fund performance or a fund financial package. The internal qualifications are responsible, but the buyer must first understand the scope without reading six pages. Missing fund metrics are not an arithmetic defect and should not be fabricated merely to fill the layout.

Candidate hero lede:

> Turn founder emails and company spreadsheets into the portfolio section of your quarterly LP report. Cosimo prepares the first draft and a dated list of missing figures for your team to review.

Candidate short fit statement beneath the introductory copy:

> Your administrator prepares the fund accounts. Your team still has to explain what happened across the portfolio. Start with that part of quarter-end.

This wording targets funds with that division of labor; it should not claim all administrators operate this way. If the actual product supports assembling a broader package, show approved administrator outputs entering the workflow rather than silently inferring fund performance from company data.

Keep the typewriter and its approved playful timing phrases. Clarify the substantive job in the static lede, which remains readable throughout rotation. Do not add a second speed guarantee. `docs/vc-pe-research.md:86–88` explicitly says the workflows and turnaround are not validated product evidence.

### 2. Replace the easy arithmetic showcase with the actual reconciliation burden

**Priority: high.** `src/js/vc-report.js:81`, `:90–99`.

The lead “company submissions” source is already one clean, consolidated spreadsheet. The second source repeats identical Fiesole cash and burn figures. The third source has four perfect roll-forwards. The difficult gathering, interpretation and version choice have already happened before the supposed automation begins.

A skeptical CFO can reasonably say: “If I hand you that table, most of my work is done.” A partner can reasonably say: “A general-purpose model could rewrite that founder note.” These are specific objections to the demo, not claims that Cosimo lacks capability.

Keep six companies, but show one genuinely different source and one unresolved decision: a spreadsheet reporting date versus an email received date, a later correction to a figure, or conflicting definitions that require review. The system should show which figure it used and why, or decline to choose. Use only a behavior demonstrated in the actual product before presenting it as product proof.

Candidate scene headline:

> The email arrived in October. The figures are still from August.

Candidate result copy, supported by the existing records:

> Oltrarno's note arrived on 3 October, but its cash and ARR are dated 31 August. The draft keeps those dates and leaves September open.

This explains useful judgment more concretely than “a cash estimate with a date and a clear follow-up.” Do not add autonomous founder chasing unless it actually exists; the present example identifies missing material but does not obtain it.

### 3. Make the LP-facing and internal material genuinely separate in the demonstration

**Priority: high for credibility, not a live data incident.** `src/js/vc-report.js:36`, `:68`, `:76`, `:79`, `:82`; `src/vc/index.html:108`.

Page 1, explicitly headed “Investor draft,” includes a citation that opens the combined four-LP ledger. Page 5 then says each investor should only receive their own account details. Everything is fictional and the demo is a review environment, so this is not evidence of an actual confidentiality breach. It nevertheless models an ambiguous handoff at precisely the point where the page claims review controls.

For the demo, either mark all source buttons as internal review tools or give the investor letter an aggregate fund cash-activity source containing no LP identities. Group pages 5–6 visually under “Internal review” rather than treating the six-page bundle as a sendable LP report.

Candidate library copy:

> Four pages of draft portfolio commentary, with a separate review worksheet for your team. Source links shown here are part of the review copy.

A true export or recipient-permission control remains unverified. Do not promise one on the basis of this static reader.

### 4. Cut repetition and promote the useful exception list

**Priority: high.** `src/js/vc-report.js:33–35`, `:42–53`, `:56–60`, `:73–75`, `:91–96`.

Fiesole's six-month runway, its unclosed financing, and Oltrarno's stale data recur across both proof scenes and almost every report page. The repetition makes the example appear longer without demonstrating more coverage. On the cash page, the final “snapshot” paragraph repeats the opening assumptions and the preceding Oltrarno paragraph.

Delete `:51`'s repeated snapshot subsection. Shorten investor-facing caveats about not inventing explanations and not adding recognition assumptions; keep that reasoning in the internal review. Preserve dated values, cash assumptions and unaudited status where they matter.

Move the review list ahead of the simple capital reconciliation in the persuasion sequence. Show the next action, record needed and unresolved status. This is where the team sees what it still owns.

Candidate review entries:

> **Oltrarno — September metrics missing.** Latest figures: 31 August. Obtain the September submission before replacing the dated figures.
>
> **Fiesole — financing plan incomplete.** Obtain the cash forecast and financing timetable. Keep the proposed round out of reported cash until it closes.
>
> **Pitti, Cascine and Porta — no narrative supplied.** Confirm whether the quarter's letter needs company commentary beyond the submitted metrics.

The last item is a scope decision, not automatically a blocking error. Current page 4 says these narratives are pending, while page 6 announces only “Two follow-ups before sign-off.” Either include that decision or change “pending” to “not supplied; metrics-only coverage in this sample.”

### 5. Resolve the capital-call chronology

**Priority: medium; concrete consistency defect/ambiguity.** `src/vc/index.html:66–70`; `src/js/vc-report.js:9`, `:64`, `:82`.

The hero shows a $125,000 Strozzi call due 15 October 2026. The Q3 ledger records $125,000 as already contributed by that same investor. An early payment or separate identical call is possible, but neither is stated. In one coherent fictional example, the natural reading is that a future call has been included in historical contributions.

Simplest repair: if it is the ledger's historical call, change the due date to “15 September 2026” and label it an illustrative Q3 notice. If it is a new call, label it “Q4 follow-on call” and use a distinguishable amount with a source note saying it is excluded from Q3 receipts. Do not treat a call notice as evidence of cash received.

The $42,500 distribution is consistent numerically. “Realization proceeds” in the hero has no corresponding realization source in the worked example. That is acceptable as a separately labelled fictional notice, but should not be implied to have been derived from the capital ledger alone.

### 6. Reduce prominence of commodity notice work

**Priority: medium.** `src/vc/index.html:23`, `:51`, `:125–132`; `src/js/vc-report.js:97–99`.

Call/distribution drafting is a real task, but the page explicitly requires approved per-investor allocations and payment details. That leaves the apparent output close to a mail merge. The third main proof scene further shifts the pitch toward work an administrator already covers.

Keep the notices as optional workflows. Put the workflow order at LP reporting → portfolio updates → capital calls → distributions. If altering the hero order, update the corresponding documents and accessible labels together; preserve the four-document animation. Move the capital roll-forward to the internal worksheet rather than retaining it as a full-height flagship proof scene.

Candidate heading for the lower accordion:

> Other recurring drafts your team prepares

Candidate notice description:

> Prepare individual notices from your approved allocation schedule, using the wording your team has agreed.

“Using your wording” requires demonstrated template support. If unavailable, keep the existing narrower claim and do not imply template fidelity.

### 7. Offer a specific next step tied to the sample

**Priority: medium.** `src/vc/index.html:50`, `:137`.

The mailto CTA is functional and low commitment. Its weakness is the vague promise of a discussion about automation. After a long worked example the buyer still does not know what they will see next, what records are needed or whether adoption is a software purchase or a bespoke project.

Candidate contact heading:

> Start with your next LP update.

Candidate paragraph:

> Tell us how you prepare it today, how many companies you report on, and where the work gets stuck. We'll identify the records needed and show you the draft and review steps for that workflow.

Candidate button: **Discuss an LP reporting trial**. Candidate email subject: **VC LP reporting trial**. The trial language is conditional on the business actually offering a trial; otherwise use **Discuss your next LP update**. Do not invent duration, price, turnaround or a free offer.

The first reply can establish handling of sensitive documents; no need to request confidential fund records in an unsolicited email prefill. A small, factual “what happens next” sentence is more useful here than a broad guarantee.

## Full section and paragraph review

### Navigation and first five seconds

`src/vc/index.html:29–51`; `src/js/re.js:23–31`, `:180–236`; `src/css/re.css:48–72`, `:474–485`.

The sector selector establishes VC, the headline establishes quarter-end reporting, and the sample CTA offers something tangible. Keep those. “Grow your fund. Not your workload.” is general-purpose framing rather than evidence; it need not carry the positioning because the lede can.

The product identity appears as Cosimo in the nav and as Medici's agent in an 11px footnote. That is adequate for a first encounter if the surrounding page consistently uses Cosimo as the product. The title/metadata can remain company branded. Do not create another fictional client brand near the actual logo; Renaissance is correctly confined to the sample documents.

The initial headline begins deleting at approximately 4.8 seconds after initialization (2.8-second entrance gate plus a 2-second initial delay), with randomized character timing. That is a design fact, not automatically a defect. The fixed lede needs to retain the substantive message during that transition. Pause, explicit workflow selection and reduced-motion behavior are implemented; preserve them.

The timing language gives personality but no proof of turnaround. Do not “fix” the approved style by turning it into a literal service-level assertion. The hero currently mentions AI in a small footnote despite CLAUDE.md's general above-fold ban; that is a repository-copy inconsistency, not the material buyer objection. The user's approved site direction takes precedence.

### Hero documents and baseline

`src/vc/index.html:53–92`.

The cash/runway card is the most venture-specific artifact. Its $1.8m / $300k = six months is credible and qualified. “Current updates 05/6” is initially ambiguous between written narratives and metric submissions; use “September metrics 5/6,” because only three narrative notes exist. The visual portfolio line rises almost monotonically without units or data; it is decorative, not evidence of fund performance. Replace it with a meaningful dated coverage motif if touching the illustration; do not read an investment return claim into it as a confirmed defect.

The notice cards show tangible amounts but weak purchase distinction. Correct the Q3/Q4 call ambiguity above. “Draft ready / For your approval” is useful control language. “Sample documents / fictional fund” is appropriately explicit.

“Less time chasing updates” promises more than the illustrated workflow proves: it flags gaps but sends no reminders. Better baseline: **Less time assembling the update. More time with your founders.** Keep the forward path to the sample.

### Pain section

`src/vc/index.html:95–98`.

“Stop rebuilding your portfolio update every quarter” fits the audience. The first paragraph names concrete friction—format, date, missing data, writing—and is stronger than a generic efficiency claim. The second paragraph repeats the hero's first-draft promise. Replace that paragraph with the administrator-fit statement above, so it answers a new question rather than adding a third version of “we draft.” No quantified savings should be added without evidence.

### Workbench introduction

`src/vc/index.html:101–108`.

“See how your records become an LP report” makes a testable promise, but the example only shows authored records mapped to authored output. The prewritten/fictional disclosure is honest and should stay. “Investor ledger checked separately” introduces a second job before the principal one has been established. Shorten it to **Follow the reporting dates, company figures and founder notes into a draft portfolio update.** Introduce the internal ledger only where it is used.

### Proof scene 1

`src/js/vc-report.js:91–93`.

Five current reports and one stale report are easy to understand; the output makes the missing company visible. The input table is denser than necessary for that lesson. Date-preservation is the persuasive point, not six cash/burn divisions. Use the October-email/August-data contrast above and let the full source modal hold the six-company detail.

The result title “Runway and reporting gaps” matches its contents. The source button is useful. The footer “a cash estimate with a date and a clear follow-up” can be deleted because the panel already demonstrates those elements.

### Proof scene 2

`src/js/vc-report.js:94–96`.

Preserving uncertainty around a financing is relevant. But “without turning a financing conversation into cash in the bank” makes the bar sound like avoiding an elementary error. The output largely repeats the source; it adds no judgment beyond asking for the forecast already promised in that source. Reframe as **Draft the update. Keep the financing question open.** Show the original fact, investor-facing wording and separate internal action with less text. Keep the manager's funding decision explicit without implying a reserve model exists.

### Proof scene 3

`src/js/vc-report.js:97–99`.

The arithmetic is correct and the capital-only boundary is responsible. As a headline product proof, it is unconvincing: four rows all matching a sum is something the buyer already expects their workbook or administrator to handle. Move it into the optional internal worksheet. If reconciliation is genuinely central to the product, demonstrate an actual mismatch and the unresolved source, not an all-green synthetic schedule; do not invent “automatically fixed” accounting.

### Report page 1: letter

`src/js/vc-report.js:31–38`.

The page leads with data collection completeness rather than investment activity. That is a useful internal status but a weak opening for a GP's letter. “Dear Limited Partners” and the signoff establish a familiar format. The Arno and Fiesole paragraph contains concrete facts and is the best letter content. The priorities paragraph turns an administrative chase into a headline fund priority; separate operational follow-ups from the GP's actual investor message.

Candidate opening, supported by existing records:

> Arno Systems ended September at $6 million ARR, up 25% from June, and signed three enterprise contracts during the quarter. Fiesole Labs reported six months of runway at its recent burn rate; discussions with potential lead investors remain ongoing.

Then briefly identify dated coverage. Keep the planned financing excluded. The “no carrying value implication” sentence belongs in the methodology/review note unless the GP actually wants that phrasing in the letter. The cash contribution/distribution paragraph is correct but needs a fund-level source free of other LP account detail.

### Report page 2: portfolio overview

`src/js/vc-report.js:39–45`.

A clean company table is useful. Same ARR definition, dated columns and June comparator make the example internally coherent. The source defines ARR as contracted recurring revenue annualized, which can differ from a manager's own ARR convention; the page must not imply universal comparability. It correctly limits the definition to the example.

“Growth without mixing periods” reads as a lesson to the auditor, not an LP section heading. Use **Quarterly change** and leave Oltrarno visibly dated August. Do not calculate or headline a portfolio-wide growth rate from mixed dates. The stale-date callout and note can be condensed rather than stated three ways.

### Report page 3: cash and runway

`src/js/vc-report.js:46–53`.

This is the strongest substantive table. Three-month average net cash burn, unchanged-burn assumption, unrestricted cash definition and exclusion of unclosed financing are clear. Six months means an estimate as of September-end, not a promise of solvency through a particular date. The page appropriately avoids mechanically decrementing an August estimate.

Keep one methodology sentence, the table, and one exception box. Delete the repeated snapshot paragraph. “Current burn rate” in the Fiesole subhead is slightly looser than the defined three-month average; use **Six months at the reported average burn**. No need to introduce zero/negative burn edge cases into this six-positive-burn marketing example, though a live workflow would need to handle them.

### Report page 4: company updates

`src/js/vc-report.js:54–60`.

Arno's signed contracts and implementation timing make a credible narrative. “No revenue recognition assumption has been added” is meta-commentary about drafting and should move to internal review. Fiesole repeats scene 2 almost verbatim; keep one concise investment-status paragraph. Oltrarno's missing period is honest; it can be one short dated status instead of another explanation. The last three companies are grouped together because narrative sources are absent: that is defensible, but “pending” implies a request or expected delivery not present in the source.

Use **No narrative supplied** and confirm internally whether more is required. The note “no operating explanation has been invented” is useful in the review pane, awkward in an LP letter. Do not invent explanatory narrative to make the fictional example look finished.

### Report page 5: capital movements

`src/js/vc-report.js:61–70`.

Correct arithmetic, explicit internal scope and a good reminder that fund allocations and valuations remain absent. Keep the caution. “Accounts checked 4 of 4” could be read broadly; use **Movement checks 4/4** to describe exactly what was tested. The output's calculated closing values are compared against separate hard-coded recorded closing values, so this is a real arithmetic comparison within the fixture, not merely comparing a number to itself. It still does not validate transactions or bank receipts.

“Reconcile with the administrator” reinforces that Cosimo's simple check does not replace the accounting source. This is one reason the schedule should not dominate the product story.

### Report page 6: checks and open items

`src/js/vc-report.js:72–77`.

This is potentially the most valuable output for the CFO. It currently mixes a short follow-up list, already-repeated calculations, threshold methodology and a source register. Promote unresolved records and decisions, compress the successful calculation checks, and keep the register accessible. The nine-month threshold is appropriately labeled a manager preference. Keep this qualification; do not call it an industry standard.

Source citations open whole authored source records, not highlighted cells or passage-level references. That is still useful inspection, but not evidence of pinpoint provenance. Keep source scope accurately described. “Not a complete quarterly financial reporting package” appears only late in the sample; explain the positive scope earlier.

### Additional workflows, approval and contact

`src/vc/index.html:125–139`.

The quarterly-report accordion repeats earlier copy; shorten or remove that item if the whole page already demonstrated it. Portfolio monitoring offers a dated view and follow-up list, credible but static in this sample. Use “Portfolio update” if the product does not provide continuous monitoring/refresh. Capital call and distribution copy is responsibly restricted to supplied approved inputs; retain that boundary.

The lower document preview changes a title and decorative graphic, not a meaningful output. The visitor has already seen substantially richer sample pages. It adds visual length without new proof; delete the extra large preview or show an actual condensed sample notice if a notice workflow remains important.

“Cosimo drafts. Your team approves.” is clear and worth keeping, but the accompanying paragraph tells the team to check all numbers again. Explain how sources and open items focus review so that the value is not “you still redo everything.” Candidate: **Review the source figures and open items alongside the draft, then adjust the commentary and approve the final version.** This describes the sample; it must not be upgraded into an automatic approval workflow claim without product evidence.

The contact section is respectful, with no fake urgency or lead form. Keep that restraint. Tie the next step to a named deliverable rather than asking the buyer to design the automation engagement. Footer/legal links and email fallback are sensible; legal content itself was outside this audit.

## Numerical and conceptual checks

Recomputed independently with Python; no service tests or source code changes were made.

| Item | Result | Assessment |
|---|---:|---|
| Arno runway | $4.2m / $350k = 12 months | Correct |
| Pitti runway | $6.0m / $400k = 15 months | Correct |
| Fiesole runway | $1.8m / $300k = 6 months | Correct |
| Oltrarno runway | $3.6m / $450k = 8 months | Correct, explicitly August |
| Cascine runway | $7.2m / $400k = 18 months | Correct |
| Porta runway | $2.4m / $200k = 12 months | Correct |
| Arno ARR growth | ($6.0m − $4.8m) / $4.8m = 25% | Correct, matched June/September |
| Current submissions | 5 September; 1 August | Correct for metric submissions, not narrative count |
| Rucellai | $16m + $1m − $425k = $16.575m | Correct |
| Bardi | $8m + $500k − $212.5k = $8.2875m | Correct |
| Tornabuoni | $7m + $375k − $170k = $7.205m | Correct |
| Strozzi | $1m + $125k − $42.5k = $1.0825m | Correct |
| Aggregate | $32m + $2m − $850k = $33.15m | Correct |

No allocation ratios are inferred from balances; that is correct because the source does not supply commitments, allocation rules or ownership. No fund IRR, TVPI, DPI, NAV or carrying-value change is inferred from ARR; that boundary is correct. All positive burn values divide exactly, so displayed integer months introduce no rounding distortion here. The Fiesole founder source is received 3 October and explicitly reports September cash; receipt date and economic date are distinguishable. Only the hero call chronology remains unexplained.

## Suggested page sequence

1. Existing branded hero and typewriter, with the narrower static lede and direct sample CTA.
2. Short pain section that explains fit beside the administrator.
3. Two strong source-to-output examples: stale reporting date, then financing uncertainty with a separate internal action.
4. Concise review list demonstrating what the team still needs before approval.
5. Optional full portfolio-update reader, visibly separate from internal worksheets.
6. Compact additional workflows, with notices secondary.
7. Human approval plus the specific next step.

Do not add an elaborate new dashboard, a standard SaaS feature-card grid, invented customer proof, or an unverified performance statistic. The existing document aesthetic is appropriate; the issue is the evidence and information hierarchy within it.

## Concrete narrative that can be built from the current records

This proposal does not depend on a new product video or invented financial data. The current three source records are sufficient to demonstrate a more valuable handoff. Keep the existing fictional/prewritten disclosure, so an improved example remains an example rather than false evidence of a live result.

**Single argument:** The administrator's accounts still leave the manager with a pile of founder material and an LP narrative to write. Cosimo's proposed job is to turn those records into one reviewable draft, with every missing or stale item kept out of the way of sign-off.

### Opening

Retain the approved “Quarter-end / LP reporting” and timing typewriter. Use the narrower lede from priority 1. Keep **See a sample LP report** as the primary action because it promises an artifact the page actually contains; use **Discuss your next LP update** as the secondary action.

Replace the second pain paragraph with:

> The fund accounts are one part of the pack. The company updates still need dates, context and a clear explanation. Cosimo prepares that draft, with the questions your team needs to resolve alongside it.

This version avoids asserting that every prospect's administrator performs a specific task while remaining intelligible to an admin-equipped fund.

### Proof A: show coverage before calculation

Heading: **Five September submissions. One August figure that needs to stay in August.**

Source side: three clearly distinguished facts already present in `vc-report.js:81–84`:

- Metrics workbook: Oltrarno cash $3.6m and ARR $4.8m, dated 31 August.
- Founder note: received 3 October; September close still in progress.
- Remaining workbook rows: five companies dated 30 September.

Result side:

> **Ready to draft: five companies.** Oltrarno can be included only with its August reporting date. Its October email is not a September financial submission.

Below, show a compact six-row coverage table with **Metric date / Narrative received / Review status**, rather than another full cash-and-burn table. Values are derivable without invention: Arno and Fiesole have current metrics plus notes; Oltrarno has old metrics plus a status note; the other three have current metrics and no narrative. Distinguish “narrative supplied” from “current financial submission.” This joins two sources into one useful worklist and makes the work the page currently hides visible.

### Proof B: turn a company update into two different deliverables

Heading: **One founder note. The investor update and the question for your team.**

Use the existing Fiesole note and its September metrics. Result pane should explicitly split:

> **In the LP draft**
>
> Fiesole reported $1.8 million in cash at September-end, equivalent to six months at its reported average monthly net burn. Discussions with two potential lead investors continue; no term sheet is signed.
>
> **In your review list**
>
> Cash forecast and financing timetable outstanding. Confirm the company's funding plan before finalizing the commentary or considering follow-on support.

Add one unobtrusive source label for each: “September metric submission” and “Founder note received 3 October.” This provides more visible value than paraphrase alone: it assembles the investor message and the internal action without placing the entire diligence to-do list into the LP letter. It does not claim a financing forecast or make a funding decision.

### Proof C: deliver the package the fund team actually reviews

Heading: **The portfolio draft, with the unfinished work kept visible.**

Open the current report reader with the improved letter first. Alongside the chapter navigation, surface a short review checklist: Oltrarno's current metrics; Fiesole's cash forecast/timetable; decision on the three missing narratives. Move the simple capital check into the internal-review group.

The letter can contain the aggregate $2m contributed / $850k distributed only if its citation opens a fund-level aggregate view. That view can be generated from the existing ledger; no new records are needed. Full four-LP details stay in the internal worksheet. Label the source-link mode **Review copy**. This clarifies the handoff without pretending the static page implements secure distribution.

The payoff sentence below the reader:

> The first draft is assembled. Your team reviews the source figures, resolves the open items and decides what the LPs need to hear.

### Differentiated workflow descriptions

“Differentiated” here means distinct jobs with clear inputs/outputs, not unsupported claims of exclusivity versus competitors.

| Job | Candidate copy | Current example support |
|---|---|---|
| Quarterly LP commentary | “Combine dated company metrics and founder notes into the portfolio section of your LP update.” | Four investor-draft pages and linked metric/narrative sources. |
| Portfolio review | “See which figures are current, which companies need follow-up and where financing assumptions remain unresolved.” | Six company dates, Fiesole financing note, Oltrarno missing submission. |
| Capital notices | “Prepare individual drafts from the amounts and details your team has approved.” | Existing notice illustrations; keep illustrative, not a proven product workflow. |

There is no need for separate large capital-call and distribution cards in this narrative. They can remain separate accordion items if service breadth is commercially important, but should not crowd out the two higher-value jobs.

### Next step

Heading: **Start with your next LP update.**

Paragraph:

> Tell us how many companies you report on, what your administrator already prepares, and which part still lands on your desk. We'll use that to scope the draft and review steps with you.

Button: **Discuss your next LP update**. Retain the visible email address and “A few sentences by email are all we need to start.” This is specific without inventing a trial program or service commitment.

### Remove or demote

- Remove the third full-height capital-roll-forward proof scene; retain the internal worksheet.
- Remove duplicate cash/runway explanation and “we did not invent this” wording from investor-facing copy.
- Remove the repeated lower “Quarterly LP reports” accordion description or reduce it to a link back to the worked example.
- Remove the second oversized decorative report preview at the bottom; the real reader has already established document appearance.
- Demote narrative collection count from the opening GP letter; keep it prominent in internal review.
- Retain source buttons, dates, definitions, human approval, fictional disclosure, approved typewriter and existing typography/colors.

The result supports a concrete value proposition beside an administrator: **assembly of company narrative plus a review worklist**. It does not prove a unique technical moat, and should not say that an administrator or general-purpose model is incapable of the work. The intended buyer response is “this is a coherent task I still own,” before “show me it working on my process.”

## Visual evidence supplied by the parent

Inspected `/private/tmp/cosimo-deep-audit/vc-desktop-hero.png`, `vc-desktop-workbench.png`, `vc-desktop-reader.png`, `vc-desktop-full.png`, `vc-mobile-hero.png` and `vc-mobile-full.png` using the image viewer. These are visual/buyer inferences from supplied static screenshots; the parent owns runtime interaction and responsive testing.

- The desktop hero gives the words and document stack equal authority. It is composed and readable, with the primary sample action visible near the bottom of the captured viewport. Preserve the treatment. It does not visually need another feature grid or a bigger badge.
- On the mobile hero, sector navigation takes two rows but the headline, lede and sample action remain visible in the supplied capture. The document stack is below that first view. Therefore the static lede must carry the benefit; the illustration cannot repair an unclear mobile pitch.
- The workbench's dark input/light output treatment clearly communicates transformation. This is a strong visual device worth preserving. However, the first screenshot needs the viewer to read much of the input table before the relationship is fully apparent; a two-source date contrast and coverage table would sharpen it.
- In the full desktop image, the three worked scenes plus reader dominate the page. In the mobile full capture, each source and result stacks into a long sequence of tall panels. This makes repetition materially costly: the same Fiesole example is encountered multiple times before the lower offer. Reducing one scene and repeated explanations is a buyer-attention improvement, not a request to shrink readable type.
- The reader looks like a credible draft with clear chapter controls. Internal pages are labeled, but their grouping is visually the same as investor pages; a separate internal-review group would clarify the intended handoff.
- The bottom miniature report preview is visibly a lower-information repeat of the richer paper artifacts above it. Removing it would bring the human-approval and contact sections closer without sacrificing evidence.
- The mobile full screenshot is too compressed to support fine claims about table legibility or clipping. No such defect is asserted here. Hero and desktop detail screenshots were sufficient for hierarchy judgments, not accessibility conformance certification.

## What remains unproven

- Actual input integrations, accepted file types, export formats and template fidelity.
- Live extraction, conflicting-source handling, correction propagation and source precision.
- Repeatability across quarters, heterogeneous business models and real fund structures.
- Approval, distribution and recipient-permission behavior in the product.
- Time saved, implementation burden, pricing, procurement/data handling and trial terms.
- Whether the target buyers view narrative preparation as a sufficiently costly independent job to fund another tool.

These are questions for product validation and buyer research, not invitations to fill the website with speculative claims. The source notes themselves acknowledge that this is a deterministic proposed workflow (`docs/vc-pe-research.md:84–88`). A real, permissioned proof run against an anonymized prior-quarter pack would improve credibility more than further polishing the same four-row arithmetic.
