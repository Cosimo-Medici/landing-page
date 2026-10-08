# Independent PE buyer audit

7 October 2026. Read-only review of `src/pe/index.html`, `src/js/pe-report.js`, shared `re.js` / `re.css`, `CLAUDE.md`, frontend-design skill, and `docs/vc-pe-research.md`. Prior audit conclusions were not read. The configured canonical memory index was unavailable. This is an adversarial buyer hypothesis, not an interview with a CFO or a finding of product malfunction. No application capability was independently tested.

## Decision

The page makes a credible case that reporting assembly is tedious and shows a thoughtful illustrative output. It does not yet make a sufficiently concrete case for buying Cosimo. The central gap is between **different company packs arriving at the fund** and **an already-clean six-row spreadsheet becoming prose**. A skeptical buyer can reasonably conclude: “My analyst can sum this in Excel, my administrator handles the capital ledger, and a general AI tool can rewrite these notes.”

The best existing proof is the Fiesole example: a numerical explanation, an unapproved plan, and a draft that preserves the distinction. Build the sales argument around reducing the checking and rewriting between source records and approved commentary. Preserve the approved fonts, cream/purple palette, COSIMO wordmark, and independent headline animation. A visual rebrand would not resolve the buying objection.

## Evidence strength

- **Observed:** directly present in the reviewed source; high confidence about the page, no implied live-product validation.
- **Supported interpretation:** a commercial inference tied to source evidence and primary industry material; medium confidence until buyer testing.
- **Test hypothesis:** a proposed conversion or preference change, not a proven improvement.

### Primary context and alternatives

1. [ILPA Quarterly Portfolio Company Reporting Checklist](https://ilpa.org/wp-content/uploads/2015/07/Quarterly-Portfolio-Company-Reporting-Checklist.pdf), October 2011. Includes company results, EBITDA margin, leverage, covenant headroom, valuation, ownership, and risk updates. It establishes the breadth of a reporting package and why an EBITDA narrative is only a component. It does not measure current manual workload or require every landing-page sample to contain every field.
2. [ILPA Reporting Template](https://ilpa.org/industry-guidance/templates-standards-model-documents/ilpa-templates-hub/ilpa-reporting-template/), updated January 2025. Addresses fees, expenses, and carried interest; its stated transition covers funds still investing in Q1 2026 or commencing operations from January 2026. This reinforces the need to distinguish the page's operating update from a complete LP reporting package. It is industry guidance, not evidence that this sample violates a legal requirement.
3. [73 Strings](https://www.73strings.com/). Its own positioning combines extraction, harmonization, monitoring, valuations, source traceability, and human validation. These are **vendor claims**, not independently tested results. Their existence means “documents into reports, with source links” occupies an established category. Do not repeat its accuracy or saving numbers as market facts; no price comparison was established.
4. [Intapp DealCloud private equity page](https://www.intapp.com/private-capital/private-equity/) and [its 2023 Untap announcement](https://investors.intapp.com/news-releases/news-release-details/seamless-deal-portfolio-analysis-now-available-dealcloud). The current page lists configurable reporting, portfolio monitoring, and system integrations. The historical announcement describes acquiring company data from spreadsheets or ERP systems through Untap. These are **vendor descriptions**, not proof of current package availability, implementation ease, or economic fit for a small fund. They identify an existing-stack objection Cosimo should answer.

The industry sources support recognizable work and reporting scope. They do not prove that small/mid-market firms will pay for this exact drafting workflow, that LP reporting is their highest-priority pain, or that the proposed copy will convert.

## First five seconds

**Observed:** visible headline starts with “Quarter-end LP reporting” and a coffee promise (`index.html:45–49`); Private equity is in the sector navigation and screen-reader headline (`:42`, `:46`). The explanatory paragraph specifies company financials, management updates, and fund records. The CTA offers an immediate sample. The right-hand documents show LP reporting and investor notices (`:53–90`).

**Likely interpretation:** a polished reporting/drafting service for funds, with PE specificity carried mostly by supporting copy and sample figures. The coffee phrase is memorable but not evidence. Keep its approved animation; ensure the static copy carries the differentiated work independently of the rotation. Do not add another broad growth slogan.

**Proposed static lede:** “Turn portfolio-company accounts and management notes into a draft quarterly update. Review the variances, their explanations, and the questions still open before the pack goes to LPs.”

This is a messaging proposal, not a new product claim. Validate that the actual product can perform each stated step before publication. A safer pre-validation description is: “Explore a worked example of company accounts and management notes becoming a quarterly update, with the variances and open questions visible for review.”

## Priority findings

### 1. The proof skips the part buyers would pay to stop doing

**Rank: highest commercial importance; observed gap, high confidence.**

`index.html:98` says every company sends a different pack. Yet `pe-report.js:21–28`, `:83`, and `:93–95` present one normalized workbook containing all six companies, the same quarter, one currency, consistent columns, and ready-to-use budgets. The first proof is aggregation and copying. The hard work implied by the introduction has already happened offscreen. It is not dishonest—the example is explicitly fictional—but it is commercially weak evidence.

**Fix:** make the first source comparison one company account extract plus a separately dated management note, then show the destination fields and one unresolved item. Retain the six-company table as the portfolio output. Use a genuine product run if available; otherwise label the authored sequence as an illustrative workflow and do not make it look like a live extraction.

**Exact heading:** “From company packs to the review draft.”

**Exact support:** “See which figures came from the accounts, which explanations came from management, and what still needs an answer.”

**Concrete fixture:** one source has Q3 revenue/EBITDA; the note has the $180k utilization/$120k freight explanation and an unapproved plan; the output has the numerical bridge plus an explicit open item. If testing mapping or definition handling, introduce a real supported case such as reported versus adjusted EBITDA, retain both labels, and flag the unresolved basis. Do not invent automatic normalization just to make a better demo.

**Acceptance evidence:** a buyer can name the preparation step Cosimo removed without saying merely “it wrote a report.” Ideally measure preparation and review time on the same actual records, with all correction effort included.

### 2. “LP report” sets a broader expectation than the demonstration fulfills

**Rank: high; observed scope mismatch, high confidence; effect on trust medium confidence.**

The hero, navigation and reader call the output an LP report (`index.html:32`, `:46`, `:50`, `:103–108`). The first four pages are an operating update; two are internal review. There is no fund performance/valuation schedule, financial statements, fees/expenses/carry disclosure, or full capital account. The internal research admits this boundary (`docs/vc-pe-research.md:86–88`), and the visible reader explains some of it, but the clearest full-package limitation arrives in the last page's note (`pe-report.js:79`). ILPA's sources support the breadth objection; they do not justify adding fabricated NAV, IRR or leverage fields.

**Fix:** consistently name the artifact “sample quarterly portfolio update” or “operating section of the LP report.” Keep “LP reporting” as the wider workflow category if validated. State the scope next to the reader heading.

**Exact reader heading:** “The portfolio update. The review notes behind it.”

**Exact introduction:** “Explore the operating section of a fictional quarterly LP report, followed by the fund team's internal checks. Fund performance, valuations and financial statements are outside this example.”

**Exact CTA:** “See the sample portfolio update.”

**Remove from investor letter (`pe-report.js:37`):** “The capital-movement schedule reconciles all four investor accounts before income, expense and valuation adjustments.” This is internal preparation status, not useful LP-facing commentary. Retain the contribution/distribution totals if the letter needs them; keep the reconciliation status in internal review.

### 3. The page does not explain its place alongside the administrator, Excel or monitoring platform

**Rank: high; observed absence, high confidence; exact answer requires product evidence.**

The administrator appears only in an internal report paragraph (`pe-report.js:69`). There is no account of input access, file/template reuse, editing, export, revisions, or repeat-cycle effort. The workflow accordion (`index.html:128–132`) identifies deliverables, but not what changes in the team's process. The lowest-common-denominator capital-movement example (`pe-report.js:99–101`) encourages the objection that an existing administrator or spreadsheet already does it.

**Fix:** add one compact “Where Cosimo fits” block before the CTA, not a large FAQ inventory. Answer only verified capabilities: source formats/access, output format and template reuse, who resolves questions, what remains with the administrator, and what happens on an updated source version. If these are still being defined, make scoping the offer explicit instead of asserting integration.

**Safe exact copy for current maturity:** “Start with one reporting workflow. We’ll map the records your team already receives, the checks you need, and the draft you want to review.”

**Product-validated version only:** “Use the company packs you already receive. Cosimo prepares the operating update and its review notes; your team and administrator retain the fund accounts and final sign-off.” Add a concrete output-format sentence only after verification. Do not promise “no migration,” Excel sync, one-click export, or retained quarterly mappings without evidence.

**Remove/reorder:** move the capital roll-forward out of the three main proof stories and leave it as an optional internal worksheet in the reader. Use that saved space for “what changed / what is unresolved / what the reviewer sees,” supported by the product. The movement check is valid; the recommendation is about prominence and buyer relevance.

### 4. Arithmetic is correct, but comparability remains a disclaimer rather than demonstrated control

**Rank: medium-high; no arithmetic defect found.**

Observed and independently recomputed from `pe-report.js:21–29`:

| Quantity | Result | Assessment |
|---|---:|---|
| Revenue actual / budget | $70m / $72m | Correct |
| EBITDA actual / budget | $9.6m / $10.4m | Correct |
| EBITDA variance | −$0.8m | Correct; actual minus budget |
| Budget shortfall | 7.6923%, shown 7.7% | Correct denominator and rounding |
| Combined EBITDA margin | 13.7143%, shown 13.7% | Correct weighted-by-revenue aggregate, not mean of margins |
| Fiesole bridge | $1.4m − $0.18m − $0.12m = $1.1m | Correct |
| Capital movements | $32m + $2m − $0.85m = $33.15m | Correct; all four individual rows also reconcile |

The report explicitly distinguishes company operations from ownership-weighted fund results, valuation, cash, NAV and investment returns (`:34`, `:39–46`, `:72`). Preserve those boundaries. Do not accuse it of calling EBITDA a return; it does not.

The source defines EBITDA broadly while page 6 asks the reviewer to confirm company definitions (`:77`, `:83`). It never demonstrates that actual and budget use the same adjustment policy or how a definition change is identified. A CFO may accept the math yet question whether the comparison is meaningful. The research does not establish whether Cosimo has that control.

**Fix:** show the reporting basis adjacent to the variance, not solely in the final checks. For this consistent fictional case: “Q3 2026 · USD · management-reported EBITDA. Actual and budget shown on the supplied basis.” If the underlying fixture does not establish a comparable basis, flag “Confirm actual and budget use the same EBITDA definition” and avoid implying it has been checked.

For a stronger later fixture, use one definition mismatch and show how it stays out of a supposedly comparable aggregate pending review. Do not add leverage/covenant calculations without authoritative source data; ILPA's breadth is a reason to delimit this sample, not to manufacture a larger dashboard.

### 5. The sample is honest illustration, but the capability claim still lacks operating evidence

**Rank: high trust importance; observed, high confidence.**

`index.html:104` and `:117` disclose fictional records/prewritten outputs. `pe-report.js:1` contains the same boundary. The internal research explicitly says the sector workflows have not been established by this demonstration (`docs/vc-pe-research.md:86`). Yet the page uses present-tense “Cosimo compares,” “Cosimo drafts” and “Cosimo prepares” (`pe-report.js:93–98`; `index.html:128`). Neither a static source modal nor a correct deterministic calculation validates document extraction, repeatability or review effort.

**Fix:** secure one actual, permissioned or synthetic product run and publish a short inspectable excerpt: original source, output, source location, surfaced exception, and actual human correction. If only the mock is available, keep the disclosure adjacent and describe it as the intended review workflow. Do not replace missing evidence with anonymous testimonials, guessed hours saved, or security badges.

**Exact disclosure:** “Illustrative workflow using fictional records and prewritten outputs. Ask us to evaluate the same steps on your reporting process.”

**Objection coverage:** “Your team approves” is valuable, but does not answer “Does reviewing this create more work than writing it?” The evidence needed is corrections and review effort, not one more reassurance paragraph.

### 6. The next step is easy to start but has no defined payoff

**Rank: medium; observed CTA content, conversion effect untested.**

The mailto is transparent and low-friction (`index.html:137`). “Together, we’ll identify a first task” leaves the buyer doing discovery and does not say what evidence the conversation will produce. There is no stated scope/time/cost, so do not invent a free pilot or response SLA.

**Exact proposed heading:** “Bring one reporting bottleneck.”

**Exact body:** “Tell us which part of quarter-end your team still assembles by hand. We’ll discuss the source records, the draft you need, and how to judge whether Cosimo would reduce the work.”

**Exact CTA:** “Discuss one reporting workflow.”

**Exact hint:** “A few sentences are enough to start.”

If the business can commit to a defined evaluation, replace this with a concrete offered result: one agreed input set, one draft and exception list, and an agreed way to compare total preparation/review time. Establish that offer operationally before advertising it. Add an alternate contact route only if mailto failure is observed in target-buyer testing; a calendar embed is not inherently better.

## Section-by-section purpose and disposition

| Section | Job for the buyer | Current assessment | Action |
|---|---|---|---|
| Navigation / sector rail (`index.html:29–42`) | Confirm audience and find proof/contact | Clear destinations; shared identity is coherent | Keep. No structural redesign |
| Hero (`:43–93`) | Identify task/outcome and earn a deeper look | Concrete category; broad benefit, decorative reports | Keep approved animation and design; make static copy carry the review benefit |
| Manual work (`:95–99`) | Create recognition | Strongest pain sentence is different packs; claim is not yet shown | Shorten visual distance to actual example; retain that sentence |
| Workbench heading (`:101–105`) | Explain the demonstration | Scope mixes LP report and separate ledger | Name operating update and internal review clearly |
| Proof 1 (`pe-report.js:93–95`) | Show normalized financial comparison | Arithmetic correct, source already tidy | Rebuild proof around a source-to-field check when validated |
| Proof 2 (`:96–98`) | Explain a miss without converting plans into results | Strongest existing proof; visible uncertainty | Promote; preserve source, bridge, and unresolved plan |
| Proof 3 (`:99–101`) | Show capital reconciliation | Correct narrow check, limited PE differentiation | Demote to optional internal reader page |
| Six-page reader (`index.html:107–117`) | Let a serious buyer inspect output quality | Useful depth, but could be mistaken for complete reporting scope | Keep as optional depth; rename scope; default to a short meaningful excerpt |
| Workflows (`:125–133`) | Show adjacent recurring work | Repeats categories; preview is a cover/title, not actual notice content | Compress into a smaller adjacent-work section; show real notice fields only if useful and validated |
| Human approval (`:135`) | Establish responsibility | Good boundary, generic evidence | Move a concise approval statement beside proof; avoid another full-height reassurance block |
| Contact (`:137`) | Convert interest into a bounded next step | Easy email, vague evaluation | State what discussion will resolve, then develop a real evaluation offer |
| Footer (`:139`) | Corporate/legal destinations | No material source-based issue | Keep |

**Recommended order:** hero → brief pain/fit statement → Fiesole source-to-draft example with variance/basis and open item → optional portfolio reader → where it fits with current process → compact adjacent workflows → bounded contact offer. The recommendation does not depend on synchronized headlines or additional animation.

## Stakeholder test

- **Fund CFO / finance team:** likely buyer for assembly/reconciliation, wants reporting basis, traceable revisions, administrator handoff and total review burden. Current page partly answers traceability and responsibility; integration and process cost remain absent.
- **COO:** wants onboarding effort, data access, roles, repeat-cycle behavior and vendor/security diligence. Current page does not answer these. Publish verified product facts, not an invented enterprise-security claim.
- **Operating partner / deal team:** wants company-level exceptions, cash/leverage/covenants where relevant, and action ownership. Current example offers budget commentary but not a portfolio operating system. Do not market it as one. Test whether this persona should be a contributor/reviewer rather than the main purchaser.
- **IR / partner approving LP communications:** wants an editable narrative, agreed house format, consistent metrics and no internal material leaking into investor copy. Current scope labels help; remove the internal reconciliation-status sentence from the investor letter.
- **Administrator:** should receive a clear boundary and handoff. Page currently introduces it very late; explicitly discuss working around the existing administrator, subject to actual capability.

## What requires real buyer/product testing

High confidence: source data is pre-normalized; arithmetic is correct; source inspection opens authored HTML; full reporting scope is not present; no product run is established; CTA is a mailto; reporting/approval language repeats. Medium confidence: capital reconciliation deserves less prominence, scope naming would improve trust, and a narrower preparation proposition would beat broad LP-report language. Low confidence without interviews: willingness to pay, preferred primary persona, monthly versus quarterly entry point, ideal proof length, email versus calendar conversion, and precise security/implementation objections.

Conduct five-second recall with small/mid-market PE fund finance leaders, then task-based review: “What work would this remove?”, “What would you still have to check?”, “Where would this sit with your administrator and workbook?”, “What would you need to see before sharing a redacted pack?” Compare actual process and review effort on a real or representative source set. Do not use liking the design or finding the sums correct as purchase validation.

## Concrete replacement proof sequence that can be authored now

This can be a better **authored worked example**, without implying a product recording or inventing integrations. The current deterministic renderer and source modals can display these records. Keep the visible disclosure: “Worked example · fictional source records and prewritten outputs.” Use an ordinary two-column source/result comparison and click-to-inspect sources; no theatrical processing progress, typing agent, or completed-status badges that imply a live run.

Use one connected Fiesole story across the first two stages, then show how unresolved items leave a separate review queue. All figures below reuse the current case; no new performance claims are needed.

### Stage 1 — Assemble the comparison

**Heading:** “The actuals and budget arrive in different files.”

**Support:** “Bring the quarter, units and reporting basis into view before comparing the numbers.”

**Left:** two miniature fictional records, each separately inspectable. `Fiesole_Q3_Management_Accounts.xlsx`, sheet `Quarterly P&L`, period “Three months ended 30 September 2026,” currency USD, units dollars, Revenue $9,000,000, Reported EBITDA $1,100,000. `Fiesole_FY26_Budget.xlsx`, sheet `Q3 budget`, same quarter/currency, units $000s, Revenue 10,000, EBITDA 1,400. State in both authored source notes: EBITDA before additional fund adjustments. These are excerpt presentations, not downloadable files unless those actual assets are also created.

**Right heading:** “One comparable company row.”

**Right table:** Revenue actual $9.0m / budget $10.0m / variance −$1.0m; EBITDA actual $1.1m / budget $1.4m / variance −$0.3m. Small basis line: “Q3 2026 · USD · budget figures converted from $000s.” Explicit source links by metric; one visible check: “Same quarter. Same supplied EBITDA basis.” This is a statement about the authored fixture, not proof of automatic classification in the real product.

**Why better:** the source/result difference is preparation a team recognizes, rather than asking them to admire six-row addition. The visible units conversion is deterministic and inspectable. Do not add fabricated mismatch-detection capabilities to the copy; later product validation determines whether “Cosimo checks…” may replace the neutral “Bring… into view.”

### Stage 2 — Carry the explanation into the draft

**Heading:** “The explanation stays attached to the numbers.”

**Left record:** `Fiesole_Q3_Management_Update.docx`, received 5 October 2026. “Q3 EBITDA $300k below budget: lower utilization $180k; expedited freight $120k. Revised production plan awaiting board review. No recovery date confirmed.” Preserve the current source wording and numerical bridge.

**Right heading:** “Draft company update.”

**Exact draft:** “Fiesole reported Q3 EBITDA of $1.1 million against a $1.4 million budget. Management attributed the $300,000 shortfall to lower utilization ($180,000) and expedited freight ($120,000). A revised production plan is awaiting board review; no recovery date has been confirmed.”

**Review note beneath:** “The explanation accounts for the $300,000 miss. The proposed recovery remains unapproved.” Give the result two links: “Inspect the figures” and “Inspect management's explanation.” No new claim that the causes are independently verified.

**Why better:** it demonstrates a useful editorial transformation and fidelity to evidence. It is stronger than presenting the same paragraph with different formatting alone.

### Stage 3 — Separate the draft from the questions

**Heading:** “Keep open questions out of confident prose.”

**Left:** three short source exceptions already present in `pe-report.js:86`: Arno revised shipping schedule to follow; Fiesole plan awaiting board review; Porta written explanation not received. Do not invent owners or due dates in the records.

**Right:** compact internal review queue with “Item / What is known / What to confirm.” Arno: $300k below budget; obtain revised shipping schedule. Fiesole: $300k miss explained; confirm board decision and recovery timing. Porta: $100k below budget; request management explanation. Label: “For the fund team. Not part of the investor letter.”

**Exact investor-copy excerpt:** “Porta Logistics reported EBITDA $100,000 below budget. Management's explanation remains outstanding.”

**Exact supporting line:** “The draft can move forward without inventing a cause. Your team decides what to resolve before sign-off.” This is a property of the authored draft, not a claim of an implemented approval engine. Avoid a checked/approved icon until the example actually depicts approval.

**Why better:** the output is something a reviewer can act on, not a clean document whose missing work is hidden. A future validated feature could add owners and due dates; do not market that now.

### Reader and page reduction

After these three stages, retain one “Read the portfolio update” entry into the reader. Keep the six-company overview and detailed budget math as depth. Move the capital-movement schedule to the end of the internal portion; it no longer needs a full main-page story. Remove the separate oversized human-approval block and put its message beside Stage 3. Compress the accordion's LP-report entry, which repeats the demonstrated product, and retain the two notice workflows as concise adjacent-use examples.

This replaces three loosely related operations with a continuous chain: **source figures → comparison → sourced explanation → draft plus open questions**. It remains possible to test this value proposition before a live product video exists, provided the authorship boundary stays explicit.

## Screenshot observations

Inspected parent-supplied `pe-desktop-hero.png`, `pe-desktop-workbench.png`, `pe-desktop-reader.png`, `pe-desktop-full.png`, `pe-mobile-hero.png`, and `pe-mobile-full.png` in `/private/tmp/cosimo-deep-audit/`.

- **Observed:** desktop hero is legible and composed; cream/purple, Garamond and the document stack give a consistent identity. The CTA and primary lede are visible in the supplied desktop viewport. No reason from these images to change the brand system.
- **Observed:** mobile hero also exposes the full lede and both actions before the document art. It remains understandable without waiting for the cards. Do not claim a mobile fold failure.
- **Observed:** the desktop workbench's first source/result pair is cut by the bottom of its viewport; the top of the section spends substantial space on the section heading and explanation before the financial example. The full-page capture shows the workbench and reader dominate the page, then the workflow covers and approval block repeat concepts below.
- **Observed:** on mobile, sources stack above outputs. Across three large stories plus the expanded reader, the proof becomes a very long reading task. This is a consequence of content volume and stacking, not demonstrated broken responsiveness. The full-mobile screenshot is too downscaled for reliable small-text/contrast judgements.
- **Recommendation / test hypothesis:** put the connected example closer to the hero, shorten the heading area, and make the full report optional depth after the three concise proof stages. Preserve the mobile hero layout. Use source/result headings to retain relationship when the two columns stack; no extra scroll animation is needed.
- These static screenshots do not validate keyboard behavior, modal focus, animation timing, dark-theme contrast, or interaction completion. Those remain the parent's browser audit, not observed failures here.
