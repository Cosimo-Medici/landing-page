# Demo data completeness and reconciliation

Audit date: 8 October 2026. Records are fictional; example reporting dates can extend beyond the audit date. Scope: all six current marketing routes, homepage app register and expanded records, workflow, three-page homepage report, twenty sector hero documents, fifteen source/result comparisons, thirty sector report pages, and their source records.

Three implementation agents owned the homepage, RE/VC/PE, and Credit/Hedge respectively. The sector agents independently checked one another’s work and the homepage fixture. Parent review covers integration, direct browser inspection, and repeatable numeric checks.

## Problems corrected

- Homepage: missing EBITDA history, debt details, governance dates, valuation inputs and supporting calculations. A three-company register retained totals and references from an older seven-company fixture; June data was mixed with September commentary.
- Homepage and PE: the same Signet Equity identity contained two different portfolios. Both now use the same six companies and Q3 actuals/budgets. The homepage retains a clearly identified example source discrepancy, rather than presenting contradictory values as reconciled facts.
- Several hero charts were decorative and had no relationship to the schedules. New VC, PE, Credit and Hedge plots show labeled observations from the accompanying records.
- Source and result panels sometimes displayed selected rows without enough context. Added complete schedules, totals, date coverage, calculation bridges and individual variances.
- RE/VC/PE capital-call previews lacked clear chronology relative to received cash. Pre-payment notices are distinguished from the September receipt/distribution ledger.
- The retired `demo-data.js` chat dataset is no longer published by the build. No current page references it. It remains historical source, outside the current demonstrator; it should not be reintroduced without a fresh review.

## Arithmetic ledger

| Example | Reconciliation |
| --- | --- |
| Loggia occupancy | 942 occupied + 58 vacant = 1,000 units; 94.2% weighted occupancy |
| Loggia NOI | $3.86m revenue − $1.50m operating expenses = $2.36m |
| Loggia movement | $2.36m − $2.28m = $80k / 3.5% improvement; $90k below $2.45m budget |
| Loggia property explanations | Arno +$22k and Pitti +$21k = +$43k; Oltrarno −$11k |
| Telescope comparable ARR | Five September reporters: $14.4m versus their June $11.3m; +27.4%. August-only Oltrarno excluded from that cohort. |
| Telescope liquidity | September reporters: $21.6m cash, $1.65m monthly burn. Separate companies’ cash is not treated as a pooled runway. |
| Telescope individual runway | Arno 12, Pitti 15, Fiesole 6, Oltrarno 8 (August), Cascine 18, Porta 12 months |
| Signet Q3 operations | $70m revenue versus $72m budget; $9.6m EBITDA versus $10.4m budget; −$800k / −7.7% EBITDA variance |
| Signet margins | $9.6m / $70m = 13.7%; $10.4m / $72m = 14.4%; unrounded gap 0.73 percentage points |
| Signet Fiesole explanation | $1.4m budget EBITDA − $180k utilization − $120k freight = $1.1m actual |
| Signet dashboard | LTM EBITDA $38.4m against $40.5m budget; net debt $108.8m / $38.4m = 2.83× aggregate leverage |
| Signet valuation | Six ownership-adjusted equity marks $210.48m + fund cash $12.90m − liabilities $2.10m = $221.28m NAV. Company cash stays within company net debt and is not added again to fund cash. |
| RE/VC/PE cash movements | Each illustrative ledger: $32m opening + $2m contributed − $850k distributed = $33.15m after movements. This excludes income/valuation allocations and is not NAV. |
| Fiorino principal | $100m opening + $4m advances − $4m repayments = $100m closing; all six borrower rows reconcile individually |
| Fiorino interest | Cash $660k + $550k + $495k + $440k + $330k + $275k = $2.75m; PIK $60k + $40k + $30k + $20k = $150k separately |
| Fiorino Pitti review | $48m / $10m = 4.80×; $48m / $9m = 5.33×; $48m / 5 − $9m = $600k minimum eligible adjustment under the supplied simplified formula |
| Anamorphic class performance | NAV/unit $100 → $101.4000 → $100.7916 → $102.9082 supports +1.40%, −0.60%, +2.10% monthly returns; rounded compounding gives +2.91% for the quarter |
| Anamorphic fund result | $2.34m − $0.42m + $0.18m − $0.21m − $0.08m − $0.10m − $0.03m = $1.68m |
| Anamorphic NAV | $82m opening + $3m subscriptions − $1.5m redemptions + $1.68m result = $85.18m closing |
| Anamorphic exposure | $76.662m long / $85.18m = 90%; $34.072m short = 40%; gross $110.734m = 130%; net $42.590m = 50% |
| Anamorphic open cash item | USD $535k − $410k = $125k. EUR balances remain separate. Pending October $250k redemption is excluded from September flows. |

## Deliberately unresolved information

The demonstrations need real review questions. Missing manager submissions, supporting adjustment schedules, certificates, financing timetables and source discrepancies remain visibly open. They are not filled with invented approvals. A nonapplicable metric should say why it does not apply; it should not display an unexplained blank or a fabricated zero.

Performance periods and bases remain distinct: quarterly operating results versus LTM dashboard metrics; company results versus ownership-adjusted equity marks; capital movements versus NAV; cash received versus noncash PIK; class returns versus whole-fund NAV; approved figures versus preliminary versions.

## Verification

- `node scripts/check-demo-data.cjs` reads the current source data and generated report strings. Checks include row/total arithmetic, capital movements, runways, leverage, principal bridges, NAV, performance rounding, source citations, homepage/PE agreement, and populated company records. No service mocks or duplicate fixture dataset.
- Rebuild the actual-component bundle with `node product-demo/build.mjs /Users/eliotpuplett/Documents/Cosimo/cosimo/frontend`, then run `npm run build`.
- Browser pass read all thirty sector report pages: no empty table cells or invalid numeric values. Wider financial tables were checked at a 390px viewport on all five sectors: internal table scrolling works without overflowing the page.
- Final numeric check: 464 assertions passed, including the homepage report’s separate data array against the dashboard fixture and PE page. Independent final homepage review approved the arithmetic, periods, source discrepancy and narrow component adapters.
- Rebuilt homepage inspected in the browser: all six company records populated, monthly sparklines visible, portfolio budget/leverage totals present, actual figure derivation accessible, expanded workflow calculations correct, and all three report pages contain matching revenue/EBITDA tables. Nonapplicable ARR and cash-generative runway now display their meaning rather than a blank.
- Intentional exceptions must remain open in future edits. Changing an input means changing every derived number and explanation that uses it, including hero cards, source records, workflow commentary and investor drafts.

No commit, push, or merge was performed in this audit.
