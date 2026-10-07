# Private credit landing page: research and implementation

## Deep-review revision

Pitti now leads the walkthrough with separate financials, certificate, supplied terms and missing-support manifest. $48m / ($9m + $0.6m) =5.00× is explicitly conditional on agreement eligibility. Seven inspectable sources; six reader pages, internal1–5 and LP draft6. Bardi’s fictional due date is16November, review17November, statements received13November. Follow-up remains unsent. Main proof links now reach pages3,4,5. See [deep review](website-audit.md); initial notes below are historical where they differ.


Date: 7 October 2026. Route: `/credit`. Audience: small and midsize private credit / direct lending fund teams, with the same workflow logic applicable to larger managers. This page deliberately does not attempt to cover liquid credit trading, CLO administration, or all asset-based lending structures.

## Research and positioning

[Alternative Credit Council, Borrower’s guide to private credit, pp. 28–29](https://acc.aima.org/asset/88500338-12EF-417D-99ABA9DEE0C988BF/) explains ongoing borrower monitoring, regular financial-information obligations, financial analysis, certifications, and enhanced monitoring where risk increases. These are continuing responsibilities after origination. This is an older UK educational guide, used for durable workflow context rather than current market statistics or jurisdiction-specific legal advice.

[Deloitte, Private credit valuations: Leading practices that stand up to scrutiny, pp. 1–2](https://www.deloitte.com/content/dam/assets-zone3/us/en/docs/industries/financial-services/2026/private-credit-valuation-perspective.pdf) identifies timely borrower-financial and covenant-package intake, repeatable monitoring, documented inputs, and review of subjective adjustments as important elements of defensible processes. The paper concerns valuation governance; this page uses its operational lessons and does not claim to automate valuations.

**Our positioning inference:** the strongest first demonstration is the work between receiving borrower records and convening a credit review. It lets the prospect recognize recurring preparation work and inspect specific outputs. We should sell the review pack and the visible open questions, rather than imply that a system decides whether a borrower is safe or legally compliant. Research establishes relevance, not willingness to pay, conversion rates, or verified Cosimo capability.

Chosen message: **Private credit. Less reporting grind.**

- Borrower review packs: assemble the supplied loan ledger and borrower records.
- Covenant worksheets: show approved calculations, supplied thresholds, and unresolved inputs.
- Reporting follow-ups: compare the received-document list with the supplied calendar and prepare draft emails.
- LP updates: convert approved portfolio figures into readable draft commentary.

## Design plan and critique

Preserve the approved RE visual system: cream and charcoal foundations, purple accent, EB Garamond headlines, Space Grotesk body, IBM Plex Mono operational labels, and Chicago only for the COSIMO wordmark. Shared stylesheet tokens remain authoritative; no CSS, fonts, or dependencies added.

The hero keeps the independently scheduled typewriter tracks and four-document stack. Credit-specific art replaces the property illustration with a small loan-book graphic, covenant worksheet, reporting follow-up, and LP summary.

Layout remains left-aligned source/result comparisons followed by an inline six-page reader. The distinctive moment is the Pitti worksheet: 4.80× using submitted EBITDA, 5.33× without an unresolved add-back. This communicates why source context matters much more clearly than a generic green compliance badge.

Critique applied: a renamed RE report would miss the point. Replaced the underlying sample completely; changed investor-only reporting into an internal credit review pack with a separately identified LP draft; kept missing data visible; removed occupancy, properties, capital-account examples, and building art. No testimonials or fabricated time-saved statistics.

## Fictional data and arithmetic

Fund: Renaissance Direct Lending Fund I. Manager: Renaissance Credit Partners. Six senior secured USD positions.

| Borrower | Principal | Q3 cash interest received | Q3 PIK accrued | Net debt | LTM EBITDA | Max ratio |
|---|---:|---:|---:|---:|---:|---:|
| Arno Components | $24m | $660k | $60k | $54m | $12m | 5.00× |
| Pitti Packaging | $20m | $550k | $40k | $48m | $10m | 5.00× |
| Fiesole Software | $18m | $495k | $30k | $36m | $9m | 5.00× |
| Bardi Logistics | $16m | $440k | $20k | $28m | $8m | 4.50× |
| Cascine Healthcare | $12m | $330k | $0 | $32m | $8m | 5.00× |
| Strozzi Services | $10m | $275k | $0 | $30m | $6m | 5.50× |

Totals: $100m principal, $2.75m cash interest received, $150k PIK accrued. Principal excludes the uncapitalized PIK accrual. Largest two positions: $44m / $100m = 44%.

Pitti: $48m / $10m = 4.80×. The $10m EBITDA includes a $1m restructuring add-back whose eligibility has not been confirmed. Removing it gives $48m / $9m = 5.33×. Difference from the 5.00× maximum under the submitted calculation is 0.20×. This is a review question, not a declaration of compliance or breach.

Bardi: financials received, certificate due 5 October and not received as of 6 October. Five of six certificates received. All dates are explicitly fictional reporting-calendar inputs; this is not a statement of standard contractual deadlines. There are two open items: Pitti adjustment review and Bardi certificate.

The six report pages cover credit summary, loan book, covenant worksheet, cash/PIK, draft LP update, and follow-ups/sources. Three inspectable sources contain the underlying ledger, covenant workbook, and reporting tracker. Source/result buttons target report pages 4, 3, and 6 respectively.

## Claim boundaries

- These credit workflows have not been verified against a production Cosimo environment. The page labels them as illustrative, requiring configuration and validation for the fund.
- Numbers and commentary are authored constants; no live model, integrations, borrower data, or API calls.
- The covenant example uses a simplified supplied formula. Reviewers must confirm definitions, adjustments, testing dates, amendments, and relevant contractual provisions. No default, waiver, cure, risk rating, or lending decision is automated.
- Principal is not fair value or NAV. Cash interest received and PIK accruals are separate; neither is a net fund return or distributable cash calculation.
- Source links open sample records. They do not prove live bank reconciliation or agreement extraction.
- Draft borrower email is displayed only; nothing is sent. Internal borrower worksheets are distinguished from LP communications.
- Homepage-style timing phrases retain the approved creative treatment; they are not supported processing-time guarantees.

## Validation

- `node --check src/js/credit-report.js` passes.
- HTML parser check: unique IDs, four hero cards, correct credit script/config, all local hash links resolve.
- Dataset arithmetic checked directly against all six authored rows.
- Shared reader/pagination/source-dialog behavior reused from the RE page; no new dependencies or shared file changes by this agent.
- Root agent owns build integration and browser QA for desktop, mobile, both themes, and all routes.
