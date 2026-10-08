# Hedge fund landing page: research and execution

## Deep-review revision

Fourteen separate source records now expose the preliminary/approved returns, PM note, same-cutoff cash comparison, unverified settlement explanation, allocator request and supporting policies/evidence. DDQ result: two drafts (NAV authority incomplete), one hold. Internal quarterly compound and superseded-file comparison are on page4; investor pages1–3 use approved supplied figures. Pending October request is separate from September processed flows. See [deep review](website-audit.md); initial details below are historical where they differ.


7 October 2026. Route: `/hedge`. Fictional manager: Anamorphic Capital. Audience: lean hedge fund COO/CFO, operations and IR teams; the same document workflows also apply to larger managers.

## Evidence behind the message

- [AIMA / Marex, Standing Strong release, September 2024](https://www.aima.org/article/press-release-how-are-emerging-hedge-fund-managers-attracting-capital-and-keeping-their-edge.html): Research covers emerging managers up to $500 million. It identifies lean operations, cost pressure, and higher allocator expectations for communication and diligence. Implication: lead with repetitive operational work, not investment performance or a generic technology pitch. This dated survey is evidence of the problem, not a claim about current market-wide percentages.
- [AIMA, DDQ overview and FAQs](https://www.aima.org/sound-practices/due-diligence-questionnaires.html): Standard questions help managers reduce duplicated work and maintain consistent answers. DDQs inform further diligence rather than complete it. Implication: draft allocator responses from approved materials, retain references, and flag stale or missing evidence. We do not reproduce AIMA's licensed questionnaire or claim platform licensing.
- [SBAI, Administrator Transparency Reporting](https://www.sbai.org/resource/administrator-transparency-reporting-september.html): Allocators seek independent verification of NAV, valuation sources, assets/liabilities and counterparties. Implication: preserve the administrator's role; position Cosimo as preparing communications and review workpapers from approved records, not as independent assurance.
- [AIMA, institutional investor preferences guide](https://www.aima.org/static/uploaded/7fe04dd4-1149-4415-a707a233374597b2.pdf): Older guidance describes reconciliation across manager, administrator and broker, named accountability and escalation of unsettled transactions. Used as durable workflow context, not current law or a new survey. Implication: make differences and follow-up evidence visible; do not silently resolve them.
- [SBAI, Standards overview](https://www.sbai.org/standards.html): Separate valuation oversight, risk reporting and liquidity management from portfolio decisions. Implication: use a dated exposure snapshot and supplied NAV data, while avoiding the claim that a marketing example performs complete risk management or valuation.

## Positioning and language

“Grow your fund. Not your back office.” The monthly close is a recognizable operational trigger. Lead with investor letters, then close exceptions and allocator questionnaires; subscription/redemption summaries round out the four workflows. Avoid translating closed-end capital calls or property reporting into hedge terminology. CTA asks which concrete month-end task is still manual.

The six-page pack deliberately separates investor-facing drafts (letter, performance, exposure) from internal workpapers (cash exceptions, named investor flows, allocator responses). Internal pages are labeled in the document itself. The surrounding page calls this a monthly review pack, rather than suggesting every page goes to every investor.

## Design plan and review

Retain the approved RE visual language: existing cream/purple theme variables, EB Garamond headlines, Space Grotesk body, IBM Plex Mono metadata, Chicago logo, rotating document stack and independently rotating headline tracks. Use the existing source-to-output comparison layout and six-page reader. No new dependencies, fonts or stylesheets. Replace the property drawing with a restrained exposure-like stepped line drawing; its purpose is document character, not an unsupported performance graph.

The memorable experience is the visible connection between actual input records and the prepared output. Three distinct examples avoid making this a find-and-replace RE page: an approved class return becomes a letter; a cash discrepancy stays open; outdated continuity evidence stops an affirmative DDQ answer. Hero lines remain short for the shared mobile typewriter layout.

## Sample data and claim boundaries

- Class A USD approved monthly returns: July +1.40%, August −0.60%, September +2.10%, all net of management and performance fees. Quarterly return is calculated by compounding those monthly returns, not adding them. No annualized or invented YTD return.
- Approved equity exposure: 90% long, 40% short magnitude; gross 130%, net 50%. Five sectors sum to those amounts. Market value / fund NAV, equity-only, no derivatives. This is not a complete risk report.
- Approved fund movement: $82m opening NAV + $3m subscriptions − $1.5m redemptions + $1.68m net investment result = $85.18m closing NAV. Class performance is supplied separately; it is not derived from this movement.
- Four processed investor flow records total $3m subscriptions and $1.5m redemptions. The named schedule is internal, not a general investor disclosure.
- Cash workpaper uses a separate 2 October snapshot, after the September reporting period. Two sample accounts match; PB-02 broker $410,000 versus administrator $535,000 leaves $125,000 open. An expected settlement is only an explanation awaiting verification. EUR account values remain in EUR and are not added to USD.
- DDQ example uses authored illustrative questions and approved fictional policy extracts. A request for 2026 continuity testing cannot be answered from a November 2025 record. Owner/follow-up remains visible.
- No live trading, portfolio optimization, performance improvement, official NAV production, assurance, autonomous regulatory filings, payment execution, or unsupported savings claims. The interface discloses authored fictional data and commentary. These are proposed workflows; production capability must be verified before stronger marketing promises.

## Implementation and checks

Owned files: `src/hedge/index.html`, `src/js/hedge-report.js`, this document. Shared animation, theme, responsive CSS and report-reader interactions follow the RE template. Source dialogs retain complete supporting records; all six report sections include substantive content. Hero metadata/config and visible/accessible text are hedge-specific.

`node --check src/js/hedge-report.js` passed. Root agent owns final shared build, responsive/theme/browser verification and industry navigation. No commit, push or merge performed.
