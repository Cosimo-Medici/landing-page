# Independent private-credit buyer audit

Reviewed 7 October 2026. Read-only review of `src/credit/index.html`, `src/js/credit-report.js`, shared `src/js/re.js` and `src/css/re.css`, `docs/credit-research.md`, and `CLAUDE.md`. Applied the frontend-design skill while preserving the approved brand. Inspected all six supplied screenshots: desktop hero/full/workbench/reader and mobile hero/full. No earlier audit was consulted. No source files were changed. The canonical memory index path supplied by AGENTS.md was unavailable.

This is a buyer/content/visual audit, not a claim of live browser interaction testing or product validation. All six reader pages and all three source records were inspected in their authored JavaScript; the supplied reader screenshot shows page 1. Arithmetic was independently recomputed from the six rows. Vendor pages describe vendors' own offerings, not independently verified outcomes.

## Verdict

The page understands the administrative work around direct lending and handles the distinction between an arithmetic worksheet and a covenant conclusion unusually well. The brand is convincing and the reader is worth retaining. But it currently demonstrates the preparation of attractive summaries from spreadsheets that already contain the answer. A skeptical credit buyer can reasonably ask: “Our servicer has these totals and our analyst already flagged that add-back. What expensive step have you removed?”

The best improvement is to make Pitti the first proof, replace the pre-digested Pitti worksheet with two borrower excerpts plus a supplied terms record, and show exactly why the issue remains open. Keep the demonstration fictional and prewritten. It can become substantially more persuasive without implying any live integration, deployed monitoring product, or automated legal interpretation.

## Ranked findings

Severity concerns buyer trust and conversion, not a formal compliance assessment. **Evidenced** means visible in source/screenshots; **judgment** means a buyer-response hypothesis requiring validation.

| Priority | Finding and evidence | Buyer implication | Concrete action |
|---|---|---|---|
| P1 | **Evidenced:** first proof is ledger summation; the Pitti source already says the $1m add-back is unresolved (`credit-report.js:35–48`). Both source and result covenant tables reuse `covenantRows`. | **Judgment:** looks like formatting work rather than discovery or cross-document review. | Lead with Pitti and separate original reported figures, supplied terms, the missing support, and derived sensitivity. See source specification below. |
| P1 | **Evidenced:** “Borrower review packs,” “borrower pages,” and “Show what changed” are promised, but the six pages contain a portfolio summary, exposure table, current covenant table, cash table, LP letter, and open-items list. There is no prior-period comparison or complete borrower page. | **Judgment:** a head of portfolio monitoring may expect a more useful credit meeting pack than this sample delivers. | Make page 3 a worked Pitti borrower review with current numbers, bridge, sensitivity and owner. Replace “Show what changed” until a sourced comparator exists. Call the package a “credit review draft” or “monitoring working papers,” not a complete credit assessment. |
| P1 | **Evidenced:** LP draft says “we are following up” while page 6 and source tracker say no follow-up sent. | An external narrative silently promotes an intended action into an action underway. This is precisely the error an approval boundary should prevent. | LP copy: “Bardi Logistics has supplied its financial statements; its compliance certificate remains outstanding as of 17 November.” Keep pending actions in the internal queue. |
| P1 | **Evidenced:** no explanation of where Cosimo sits beside the administrator, loan servicer, and existing workbook. | **Judgment, supported by vendor scope:** a buyer may see a redundant system, or fear a replacement project. | Add a short section naming records maintained by the existing providers and the recurring preparation task being evaluated. Do not claim integrations or replacement capabilities. |
| P2 | **Evidenced:** all Q3 certificates due 5 October; five received 1–3 October; all financials received by 6 October, only six days after period end. Dates are internally consistent. | **Judgment:** an unusually compressed quarter-end close distracts experienced readers, even though the calendar is fictional. | Keep Q3 figures; change supplied deadline to 16 November, review date to 17 November, and received certificates to 12–13 November. Label a fixed fictional example. This is an agreed sample calendar, not a universal deadline. |
| P2 | **Evidenced:** page 2 includes sector values absent from the inspectable ledger source. All citations open whole records, without a sheet/cell/page locator. | Traceability is partial; “inspect source” does not mean a reviewer can locate every presented fact. | Add sector to loan master/ledger source, source version and locator to records, and targeted highlighting for Pitti/Bardi citations. |
| P2 | **Evidenced:** the hero's large speed promise is immediate, while the configuration/validation limitation appears after the example. Research notes expressly say processing time is not evidenced. | **Judgment:** “Before your morning coffee” can sound more production-ready than this proposed workflow. | Preserve approved independent typewriters. Add static microcopy near the CTA: “Illustrative credit workflow. We configure and validate it around your records.” Do not invent a turnaround guarantee. |
| P2 | **Evidenced:** the first source/result panels occupy substantial scroll distance before Pitti; on mobile every source stacks above its result. | **Judgment:** the most persuasive moment arrives too late for a scanning prospect. | Put Pitti first. Retain a compact ledger example as second proof and condense the missing-certificate example. Keep the full table in the reader/source dialog. |
| P2 | **Evidenced:** the bottom CTA asks broadly about manual tasks; the mailto provides almost no context for qualification. | **Judgment:** the buyer does not know what a first conversation produces. | Offer one borrower review as the starting unit; specify records, calculation rules, reviewer and desired output to agree. Exact copy below. |
| P3 | **Evidenced:** workflow preview changes title and decorative bars, without becoming an actual covenant worksheet or follow-up email. The bars have no labels/data meaning. | **Judgment:** after a detailed reader, this feels less useful and repeats the same sale. | Use brief, meaningful example fields per selection, or reduce the preview's size. Keep the paper treatment/fonts/palette. |

## First five seconds and complete section review

### Navigation and sector chooser

Private credit is clearly selected. The restrained COSIMO wordmark, light theme, purple action, and serif document stack look deliberate and appropriate. Keep them. “Sample report” is generic compared with the more precise hero “sample credit pack”; change navigation text to “Sample credit pack” without changing its structure. The sector chooser occupies two rows on the supplied 390px mobile view, but the audience remains identifiable. It should not grow further.

### Hero

The desktop hierarchy successfully communicates borrower review packs and rapid preparation; the document imagery provides category recognition. The mobile screenshot includes the descriptive paragraph and primary CTA within the initial view, which is a good outcome. The detail in the document artwork is below the first mobile viewport and too small to be proof on desktop; it should remain supporting imagery.

The proposition is readable but generic: financials in, draft packs out. It does not say what survives into the output that makes review easier. Add “figures, sources, and unresolved questions” to the lede. The first visible speed promise cannot be substantiated by authored constants. Preserve the approved rotating phrases and their independently shuffled tracks; qualify the illustrative workflow in fixed copy rather than altering animation behavior or binding the tracks together.

Suggested lede: **“Bring borrower financials, servicing records, and review notes into one credit pack—with the figures, sources, and unresolved questions together. Configure Cosimo around the working papers your team already reviews.”**

Suggested CTA pair: **“Inspect the sample credit pack”** / **“Discuss one borrower review.”** Suggested small line: **“Illustrative credit workflow. We configure and validate it around your records.”** Keep product identity nearby. Do not describe the sample as an actual Cosimo run.

The hero's diagram “Borrower → credit team → investor” is visually clean but implies one linear route. An internal issue does not automatically become investor commentary. More accurate small artwork text: **“Borrower records → internal review”**; keep the separate investor card's draft label.

### Intro/pain

“The financials are in one folder. The covenant terms are in another” identifies a recognizable coordination task. “Not rebuild the pack” is a useful outcome, but this section largely restates the hero. Spend the same space explaining the operating boundary:

**“Your administrator and servicer maintain the records. Your team still has to bring borrower submissions, covenant calculations, and unresolved questions into the same review. That preparation work is the starting point for Cosimo.”**

Then: **“Start with your existing workbook, reporting calendar, and review template. Agree the calculations and the questions that must stay open before deciding what to automate.”**

This is a proposed engagement scope, not a claim that any named provider is connected. Do not say administrators only do accounting; some explicitly provide covenant monitoring and reporting.

### Workbench introduction

The dark surface successfully marks the change from marketing to inspectable evidence. Source left/result right is understandable. The fictional/prewritten disclosure appears before the examples; keep it. However, “Follow six loans from the servicing ledger, through a covenant worksheet” conflates independent source families: servicing principal does not feed borrower net debt.

Replace body with: **“Inspect a borrower’s submitted figures, the supplied covenant limit, and the review question carried into the pack. Then see the portfolio totals and missing-document follow-up.”** Replace title with **“A credit pack you can work back through.”** Keep current typography and source/result construction.

### Proof 1: existing ledger scene

The sums and cash/PIK separation are correct; the scene earns confidence in restraint, not unique capability. A six-row ledger being summarized into two totals is a weak opening. Move it second, compress the visible table to a total plus selected rows, and retain all six in the source dialog and reader. Label a shortened table “Selected rows · open source for all six,” never silently omit records.

The panel's “See the internal worksheet” lands on the cash/PIK page, which is logically correct but vague. Use **“Inspect the cash and PIK schedule.”** Add reconciliation status to the source/result: **“Servicer ledger only · administrator/bank reconciliation not included in this sample.”** This is a scope statement, not an invented warning or feature.

### Proof 2: existing covenant scene

This is the best commercial moment. Moving 4.80× to 5.33× makes a small-looking adjustment consequential. But the source currently hands the tool the conclusion. It says the eligibility is unresolved before any work happens. Showing source financials at $9m, a certificate claiming $10m, and a $1m bridge would demonstrate assembly and review preparation much more clearly.

The current headline question, “Does the agreement permit this add-back?”, is binary. The decision may concern part of the adjustment. With $48m debt and a 5.00× threshold, at least **$0.60m** of the $1m adjustment is needed to reach the threshold under the simplified formula. Do not label this a breach test. A useful output says:

**“The certificate includes a $1m restructuring adjustment. Supporting detail is missing. The submitted ratio is 4.80×; excluding the adjustment gives 5.33×. Under the supplied formula, $0.60m of eligible adjustment would produce 5.00×. Credit review remains open until the amount and its agreement treatment are confirmed.”**

That is a conditional sensitivity, not a legal conclusion. The words “eligible” and “approved” must refer to a future human determination, not to what the demo has established.

### Proof 3: missing certificate

The reminder is credible, small and safe. Owner, missing document, supplied deadline, draft text and unsent status are all visible. “Follow-up ready to send” is slightly too final while the record still needs checking; use **“Draft follow-up for portfolio operations.”** Keep “No email has been sent.” This is secondary utility, not a reason to buy a platform by itself. It can be shorter on the page, with full text on reader page 5 after the proposed reordering.

### Report library and reader

The reader is a tangible output and a good alternative to an uninformative video. Desktop chapter navigation and full-width paper are legible. The supplied mobile full screenshot is necessarily too reduced to judge individual citations, but source CSS provides 14px reader body, overflow hints, and 44px pagination controls. Do not claim mobile citation interaction passed from that screenshot alone.

Current flow places an investor draft between internal cash data and the internal follow-up queue. It is labeled correctly, but strengthens the impression of one mixed packet. Put all internal pages first and the investor draft last; change library copy to **“Five internal working papers, plus a separate investor draft.”** Mark the investor chapter **“Separate draft · LP update.”** Keep its own internal/external label and “not for distribution” footer. No export approval workflow should be implied unless built.

### Workflow accordion

All four topics belong. “Agreement-specific checks” and “approved formulas” are appropriately narrower than legal covenant monitoring. “Borrower pages” and “Show what changed” currently overpromise the sample. Proposed first body:

**“Bring borrower financials, servicing data, and review notes into the same working papers. Keep calculations, source references, and open items beside the commentary your team needs to review.”** Deliverable label: **“Portfolio summary + worked borrower review.”**

Quarterly LP body should say **“Use figures and commentary cleared for investor use to prepare a separate draft update.”** The existing “questions still under review clearly separated” is ambiguous about whether unresolved internal detail is being sent to investors. Put that detail in the internal approval note.

### Human approval section

“Cosimo drafts. Your team approves.” is correct and worth keeping. Repeated declarations of human responsibility should become an operational step in the sample, not just more reassurance. Show an internal approval note next to Pitti: **“Open · credit analyst to confirm adjustment support and agreement treatment.”** The page does not need a dashboard or a fake approval button.

### Contact and footer

The email route is low-friction and the address remains available if mailto fails. Avoid inventing booking links, response times, client outcomes or security accreditations. Replace the broad CTA with:

Heading: **“Start with one borrower review.”**

Body: **“Tell us which monitoring pack your team still assembles by hand. We’ll map the source records, calculation rules, reviewer, and draft you need, then agree what a first workflow should cover.”**

Button: **“Discuss a borrower review”**.

Hint: **“A short description of the current process is enough to start.”**

Prefilled subject: **“Private credit — one borrower review”**.

Prefilled body: **“Hi Medici team,\n\nThe review pack we prepare is:\nThe records we use are:\nThe step that takes most time is:\n\nI’d like to discuss a first workflow.”**

This makes the next step concrete without asking for sensitive borrower files in an initial email. Footer structure is fine; no change needed.

## Six-page forensic review

| Page | Verified content | Remaining problem | Minimum useful improvement |
|---|---|---|---|
| 1 — Internal credit summary | Six loans; $100m principal; $2.75m cash; $150k PIK; exactly two authored open items. | No source date/review date beside the headline; “two open items” could sound like full portfolio completeness. | “Two open items in this sample”; balance date 30 Sep, review date 17 Nov. Add owner and a jump to worked Pitti review. |
| 2 — Loan book | Shares 24/20/18/16/12/10%; sum 100%; top two 44%. Correctly distinguishes held principal from borrower debt and NAV. | Sector values not present in inspectable source; no maturity/risk/trend information, so this is an exposure schedule, not a complete loan review. | Add sector to the source or remove sector from output; retain “Exposure schedule” scope. Do not fabricate risk ratings or maturity dates for decorative completeness. |
| 3 — Covenant worksheet | Ratios 4.50/4.80/4.00/3.50/4.00/5.00×. Limits 5/5/5/4.5/5/5.5×. Pitti 0.20× below threshold as submitted; ex-adjustment 5.33×. Bardi ratio is provisional from financials, not certified. | Same table is source and output. All loans use one simplified formula. No original signed certificate/bridge; no permitted cash netting calculation; no prior period. | Retain portfolio table as supplied figures, add worked Pitti block with distinct sources and conditional sensitivity. Mark agreement interpretation and other tests outside scope. |
| 4 — Cash/PIK | Correct sum; four borrowers accrue PIK; principal excludes current uncapitalized accrual; cash and PIK are not called fund return or distribution. | All six cash figures equal 2.75% of quarter-end principal. Not an arithmetic error, but conspicuously tidy. No terms, cash movements or bank reconciliation support an interest recomputation. | Keep figures and state they are supplied receipts. Do not annualize, describe as yield, or invent SOFR/day-count terms. Reconciliation status visible. |
| 5 — LP draft | Principal, concentration, cash and PIK facts tie to sample. No false NAV/net-return presentation. | “We are following up” lacks support; unresolved borrower-specific details are automatically promoted into LP prose without a depicted selection/approval step. | Make this page 6, remove unsupported action wording, identify commentary awaiting external-use approval outside the letter. Preserve explicit draft/fictional labels. |
| 6 — Follow-ups/sources | Pitti/Bardi owners and next actions are consistent; missing certificate is one calendar day overdue under current dates. No message sent. | Generic role owners, no review-by date, and source register lacks provenance beyond filenames. | Make page 5; add role owner and agreed next review date if authored in sample tracker, not inferred. Add received/version/sheet-or-page metadata to sources. |

## Arithmetic, dates and provenance

Independently recomputed: principal = $100m; cash = $2.75m; PIK = $150k; 4 PIK borrowers; top two = 44%; six ratios and all percentage shares correct. The $100.00m display is unnecessary precision but not an error. $48m / $9m = 5.3333×, correctly rounded 5.33×. The supplied ratio's 0.20× headroom is a ratio-point difference, not an available borrowing amount.

More informative Pitti sensitivity under the supplied formula:

| Adjustment accepted for the illustrative calculation | EBITDA | Net leverage |
|---|---:|---:|
| $0 | $9.0m | 5.33× |
| $0.6m | $9.6m | 5.00× |
| $1.0m | $10.0m | 4.80× |

The $0.6m is derived as $48m / 5.00 − $9m. This sensitivity must not establish actual compliance: definitions, supporting evidence, additional tests, amendments and review decisions remain unresolved. It shows why “some or all of the adjustment” matters, beyond recalculating one ratio.

Current dates are mathematically coherent, not a demonstrated bug. Smallest coherent plausibility improvement: retain Q3 2026 and 30 September balances; change every calendar due date to **16 November 2026** and every review/as-of date to **17 November 2026**; certificates received **12 or 13 November**, Bardi not received. Then Bardi remains one calendar day overdue. Apply across hero card, summary, follow-up scene, source tracker, source register metadata and email. Say **“Fictional Q3 example · review date 17 November 2026”**. Future fictional dates are acceptable and must not be represented as actual current records. No claim that 16 November is an industry-standard or universally contractual deadline.

The $48m Pitti borrower net debt versus $20m fund holding is not a discrepancy; page 2 properly explains the different bases. Keep that explanation. The source calls net debt post permitted cash netting but supplies no gross debt/cash bridge: either explicitly identify it as a submitted amount or add actual fictional bridge inputs. Do not imply the demo checked cash eligibility.

## Exact source example to implement now

Keep the demonstration deterministic, fictional and inspectable. Better source structure does not require claiming a functioning extraction backend.

1. **`Pitti_Q3_2026_Financials.pdf`, page 4, received 12 Nov, borrower-submitted.** Show “LTM period ended 30 September 2026,” base EBITDA **$9m**, and an explicit definition that this is before the separately claimed restructuring adjustment. Do not call it audited or accountant-approved. If net debt remains in the certificate, do not pretend the financials independently reconcile it.
2. **`Pitti_Q3_2026_Compliance_Certificate.pdf`, page 2, received 13 Nov, borrower-submitted certificate.** Show submitted net debt **$48m**, base EBITDA **$9m**, restructuring adjustment **$1m**, adjusted EBITDA **$10m**, submitted ratio **4.80×**. A fictional signature/status may be labeled “Submitted”; do not invent a real signature or evidential claim about validation. Include the borrower’s reference to “supporting restructuring schedule” without asserting its eligibility is unresolved inside the source itself.
3. **`Approved_Covenant_Terms.xlsx`, sheet `Pitti`, explicit row locator/version.** Show loan/facility identifier, test date **30 September 2026**, supplied metric “Net debt / LTM EBITDA,” maximum **5.00×**, rule owner “Credit team,” and **“Adjustment eligibility: review against executed agreement.”** Distinguish supplied terms from actual extracted agreement clauses. If no executed agreement is shown, say so. Do not invent a document parser, legal confirmation, or amendment completeness.
4. **`Borrower_Reporting_Tracker.xlsx`, sheet `Q3`, Pitti row.** Separate source artifacts expected and received: financials received, certificate received, restructuring support not received. Owner “Credit analyst”; action “Obtain support; confirm treatment against agreement.” This missing-document status, plus the EBITDA bridge, produces the review question. The source no longer simply pre-writes the output conclusion.
5. **`Renaissance_Loan_Ledger_Q3.xlsx`, sheet `Loan book`, six borrower rows.** Add sector, USD, senior-secured designation, held principal at 30 Sep, cash receipts covering 1 Jul–30 Sep, PIK accrual over the same period, version/date and supplied-record owner. Keep current numbers. Declare bank/admin reconciliation absent. If owner identity is fictional use a role, not a real institution name.

Make each citation specific: **“Certificate p. 2 · EBITDA bridge”**, **“Terms sheet · Pitti maximum”**, **“Reporting tracker · missing support”**. A click should expose the cited excerpt first and highlight its relevant values. A source dialog can support multiple excerpts with a small active section; this need not become a PDF viewer. Avoid showing `.xlsx` as though an actual downloadable workbook exists unless one is provided. “Sample excerpt” is sufficient.

Use visible output labels: **Submitted** ($48m/$10m), **Calculated** (4.80×/5.33×/5.00× sensitivity), **Missing** (restructuring schedule), **For review** (amount and agreement treatment). These categories describe the provenance of information; they do not pretend Cosimo has performed legal review.

Do not add a fabricated borrower trend simply to make the pack feel larger. If a prior-quarter comparator is desired, author and expose the prior source with its own test date, net debt, EBITDA, approved adjustment treatment and covenant maximum. A mathematically neat “up from 4.2×” without those records would repeat the current provenance weakness.

## Reader order and proof narrative

Recommended marketing order: hero → short operating-boundary intro → Pitti proof → compact ledger/cash proof → compact missing-certificate proof → inline reader → smaller workflow scope/approval section → concrete email CTA. Preserve nav/footer structure, palette, fonts, paper stack and independent random typewriter scheduling.

Recommended six reader pages: **1 internal summary; 2 exposure schedule; 3 worked covenant review; 4 cash/PIK schedule; 5 follow-ups and source register; 6 separate LP draft.** The covenant panel opens page 3, cash panel page 4, follow-up panel page 5. The general sample CTA opens page 1. A clear “Return to credit summary” control is useful after deep inspection, but must not silently reset a source dialog or reader selection mid-use.

LP revision using existing facts:

> Renaissance Direct Lending Fund I ended the third quarter with $100 million of principal outstanding across six senior secured loans. The two largest positions represented 44% of principal.
>
> The servicing ledger records $2.75 million of cash interest received in the quarter and $150,000 of PIK interest accrued. PIK is non-cash. These figures do not represent net fund performance or cash available for distribution.
>
> The credit team is reviewing the support for a restructuring adjustment in Pitti Packaging’s reported EBITDA. Bardi Logistics has supplied its financial statements; its compliance certificate remains outstanding as of 17 November.

Outside the letter: **“Draft excerpt. Borrower commentary requires approval for investor use; administrator reconciliation and complete fund performance reporting are outside this sample.”** Keeping this note outside the salutation/signoff separates the review instruction from proposed external prose. The Pitti/Bardi paragraph should not be called approved commentary until approval evidence exists.

## Primary-source calibration and objections

1. **Alternative Credit Council, Borrower’s guide to private credit, pp. 28–29.** Describes post-loan financial reporting, certifications and ongoing engagement/monitoring. Supports the relevance of intake and follow-up work. It is older UK educational context, not evidence of Cosimo capability or a universal reporting deadline. [Primary guide](https://acc.aima.org/asset/88500338-12EF-417D-99ABA9DEE0C988BF/).
2. **Deloitte, Private credit valuations: Leading practices that stand up to scrutiny, pp. 1–2.** Connects timely financial/covenant intake and consistent borrower trend monitoring to defensible credit/valuation processes; emphasizes documented judgment. Supports source/review discipline, not a claim that this sample values loans. [Primary paper](https://www.deloitte.com/content/dam/assets-zone3/us/en/docs/industries/financial-services/2026/private-credit-valuation-perspective.pdf).
3. **Allvue, Portfolio Intelligence.** Advertises borrower detail, covenant status, period comparisons, generated commentary and reporting from data maintained in Credit Front Office. The relevant objection is “Why a separate preparation tool when our existing platform already offers monitoring and commentary?” This is a vendor claim, not verified performance. [Vendor product page](https://www.allvuesystems.com/solutions/portfolio-intelligence/).
4. **Alter Domus, Private Credit Fund Solutions.** Offers fund administration, loan operations, reconciliation/reporting and specialized technology. The relevant objection is “Which work remains after the administrator/loan-services provider does its job?” The page should specify an incremental preparation workflow, not presume those providers leave all borrower monitoring manual. [Vendor service page](https://alterdomus.com/services/private-credit-solutions/).

**Positioning inference:** the defensible opening is a narrowly configured preparation workflow across the records the fund already uses: assemble a reviewable draft, retain provenance, distinguish submitted from derived amounts, and keep incomplete work visibly open. This is a proposed differentiator to demonstrate and validate, not evidence of a unique capability. Excel already performs the illustrated arithmetic; admins and monitoring platforms already offer much of the surrounding service. The demo must therefore show avoided copying, source chasing, and cross-document assembly more clearly than a polished totals page.

## Completion and priorities

No arithmetic defect found. One unsupported action statement found in the LP letter; one clear source coverage gap found for sector data. The largest issues are evidenced demonstration gaps with buyer-response judgments: preprocessed sources, generic positioning against existing systems, absent prior-period/borrower detail, and proof sequencing.

Implement first: fix LP wording; expose complete source metadata/sector coverage; put the worked Pitti case first with certificate/financials/terms/support records; use the conditional $0.6m sensitivity; make the fictional November calendar coherent; move investor draft after internal working papers; tighten CTA. These changes materially improve the current artifact without a rebrand, invented product proof, new integrations, or a request for a live video.
