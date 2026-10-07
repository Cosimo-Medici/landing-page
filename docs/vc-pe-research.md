# Venture capital and private equity landing pages

## Deep-review revision

VC now has seven inspectable sources and proofs about receipt-vs-metric dates, financing uncertainty, and combined follow-up/narrative scope. PE now has six sources and proofs about differing workbook units, attributed EBITDA variance, and open management questions. Capital worksheets remain internal page5; investor cash citations open aggregate totals. Six report pages retained, audiences grouped. See [deep review](website-audit.md); initial build details below describe the prior version.


Research and implementation notes · 7 October 2026

## Positioning

These pages target fund partners and small finance/operations teams that assemble recurring investor communications from company updates and fund records. Larger teams can recognize the same work. The message is about preparing a useful first draft from existing records, with the fund team retaining approval.

- **VC:** Stop rebuilding the portfolio update each quarter. Bring founder submissions together, preserve reporting dates, identify missing updates, and draft the LP letter. Cash and runway make the demonstration concrete.
- **PE:** Stop rebuilding the reporting pack each quarter. Compare company actuals against budget, explain the variance from management’s notes, and assemble the LP update.

These are messaging choices inferred from the evidence below, not claims that a survey proved these exact headlines convert. No customer interviews, conversion experiment, live product validation, or willingness-to-pay study was performed for this pass.

## Evidence and its application

### Venture capital

[NVCA: Operating Principles](https://nvca.org/operating-principles/) calls for timely, relevant reporting to LPs, transparent allocation information, and fair-value reporting under the fund’s agreed standards. This supports leading with dependable investor communication and keeping operating updates separate from valuation decisions. It does not establish demand for a particular software product.

[NVCA: Accounting & Auditing Standards](https://nvca.org/accounting-auditing-standards/) describes fund finance professionals’ responsibility to give LPs useful information about both funds and portfolio companies. The page therefore shows the work between company submissions and the LP letter, rather than promising investment selection or valuation automation.

[SVB: Understanding What Your Startup’s Burn Rate Really Means](https://www.svb.com/business-growth/cash-flow-management/startup-burn-rate-cash-flow/) discusses regular cash-flow review and runway. Search-indexed primary-source text was accessible; opening the article redirected to First Citizens and failed in the browsing tool. It is supporting context, not a source for a current market statistic.

[Bessemer: Scaling to $100 Million](https://www.bvp.com/atlas/scaling-to-100-million) discusses cash generation, burn and capital efficiency in cloud businesses. This supports a software-focused fictional VC portfolio, with company-level ARR, cash and burn rather than mixing incompatible metrics across unrelated business models. The demonstration is illustrative, not a universal VC reporting template.

**Inferred pain:** a fund team cannot safely write a current portfolio update if it has quietly mixed August and September submissions or treated a hoped-for financing as cash. The example makes those common reporting tasks visible without claiming a quantified prevalence.

### Private equity

[ILPA: Quarterly Portfolio Company Reporting Checklist](https://ilpa.org/wp-content/uploads/2015/07/Quarterly-Portfolio-Company-Reporting-Checklist.pdf), version 1.0 from October 2011, includes company financial results, EBITDA, margin, recent events, and risk updates. It is a long-standing reference for the kinds of information LPs use, not a newly issued 2026 requirement. The page applies this to a company-by-company reporting pack and management commentary.

[ILPA: Quarterly Reporting Standards, version 1.1](https://ilpa.org/wp-content/uploads/2017/03/ILPA-Best-Practices-Quarterly-Reporting-Standards-Version-1.1_optimized.pdf) describes a broader quarterly package comprising management discussion, financial statements, supplemental schedules and company updates. This supports an LP-report entry point, while making clear that our six-page sample is only an illustrative operating update and internal review schedule.

[ILPA: Reporting Template](https://ilpa.org/industry-guidance/templates-standards-model-documents/ilpa-templates-hub/ilpa-reporting-template/) describes the updated template released in January 2025 and its focus on fees, expenses and carried interest. It helps define a boundary: this demo does **not** implement the ILPA template and must not claim ILPA compliance. Its simplified capital schedule excludes allocations and valuation adjustments.

**Inferred pain:** company submissions need checking, comparison and explanation before they can become a coherent investor pack. The proof centers on actuals versus budget and an unresolved operating plan, rather than a generic promise to “streamline operations.”

## Design and copy decisions

Reuse the approved `/re` design without altering shared CSS: cream and purple tokens, Garamond display type, Space Grotesk body, IBM Plex Mono labels, Chicago COSIMO wordmark. Preserve independent hero headline/timing animation, four foreground/background documents, source-to-output comparisons, inline six-page reader, optional source dialog, and reduced-motion behavior.

Page order stays: outcome and documents → familiar manual work → three worked examples → full report → additional recurring workflows → human approval → email CTA. Comparisons stay visible, avoiding a timed slideshow that hides the useful data.

Specific differences:

- VC’s fourth hero document is a Fiesole Labs cash/runway update; first document shows five of six current submissions. Its decorative graphic is a line plot, not an RE building.
- PE’s fourth hero document is a portfolio KPI pack; first document shows six companies and $9.6m quarterly EBITDA. Its decorative graphic is an operating bar chart.
- Hero document index order is LP report, capital call, distribution notice, then sector-specific portfolio document. Configured workflow lines match those documents.
- Names are fictional Renaissance/Florentine references; Medici and Cosimo remain the company/product brands, never fictional clients.
- Primary CTA opens the actual inline sample. Report-page links open the appropriate page, and citations open authored source tables/notes.
- Shared capital examples demonstrate the same valid reconciliation task in both industries. The front half of each report carries the sector-specific work.

## Fictional data and arithmetic

### VC

Six fictional B2B software companies. All ARR is defined in the source as annualized contracted recurring subscription revenue, excluding services. Five submissions are dated 30 September; Oltrarno’s is dated 31 August.

| Company | Cash | Average monthly net burn | Runway | Latest submission |
|---|---:|---:|---:|---|
| Arno Systems | $4.2m | $350k | 12 months | September |
| Pitti Cloud | $6.0m | $400k | 15 months | September |
| Fiesole Labs | $1.8m | $300k | 6 months | September |
| Oltrarno Security | $3.6m | $450k | 8 months | August |
| Cascine Analytics | $7.2m | $400k | 18 months | September |
| Porta Data | $2.4m | $200k | 12 months | September |

Runway = cash / three-month average monthly net burn, assuming unchanged burn, excluding proposed financing. The nine-month follow-up threshold is explicitly an example fund-team preference. Oltrarno’s old estimate is not presented as a September figure. Arno ARR growth is ($6m − $4.8m) / $4.8m = 25%.

Pages: letter, portfolio metrics, cash/runway, founder updates, investor capital activity, checks/open items. Three full source records include reporting dates and metric definitions.

### PE

Six fictional companies; all figures cover Q3 2026 in USD on management-reported bases. Revenue sums to $70m versus $72m budget. EBITDA sums to $9.6m versus $10.4m budget; shortfall $800k / $10.4m = 7.7%. Combined EBITDA margin = $9.6m / $70m = 13.7%.

Individual EBITDA variances: Arno −$300k, Pitti +$100k, Fiesole −$300k, Oltrarno $0, Cascine −$200k, Porta −$100k. These sum to −$800k. Fiesole’s management explanation splits its $300k miss into $180k utilization and $120k freight.

Pages: letter, portfolio metrics, budget comparison, company updates, investor capital activity, checks/open items. Supporting sources contain full company actual/budget values and the original explanations; missing explanations and unapproved plans remain visible.

### Shared investor example

$32m opening + $2m contributions − $850k distributions = $33.15m after capital movements. All four LP rows reconcile. This excludes income, expenses and valuation changes and is never called NAV or a complete capital account statement. The combined LP schedule is labeled internal; investor communications require each LP’s own details.

## Product claim boundaries

The website demonstrates proposed document-processing and drafting workflows in a fictional, deterministic example. It does not establish that these exact sector workflows have been run successfully in the application. The prior RE work provides the base document workflow positioning; actual VC/PE workflow configuration and proof runs should precede customer-specific capability promises.

No live agent call, integration connection, investor delivery, automated valuation, investment decision, compliance certification, guaranteed turnaround, time-saving statistic, or fabricated testimonial was added. The approved playful rotating timing phrases remain shared site branding, not measured performance evidence. Human review remains explicit. The illustrative report is not a complete financial reporting package.

## Files and checks

Owned files only:

- `src/vc/index.html`
- `src/pe/index.html`
- `src/js/vc-report.js`
- `src/js/pe-report.js`
- `docs/vc-pe-research.md`

Both report scripts pass `node --check`. HTML/config sanity checks confirm unique IDs, four hero choices/documents, matching four configured workflow lines and correct report script paths. Source review found no inherited RE property, occupancy or building content; CSS class names remain shared intentionally. Parent integration owns the common navigation, build, cross-page browser QA and any responsive corrections. No commit, push or merge was performed by this worker.
