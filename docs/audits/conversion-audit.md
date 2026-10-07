# Independent conversion and copy audit

7 October 2026. Read-only review of homepage, five sector pages, generated report copy, FAQ, About, and existing positioning/research documents. No source edits. Source inspection, not a visual/browser audit or prospect study.

## Verdict

The site has a credible, differentiated visual concept and the right commercial entry point: familiar recurring documents, existing records, less manual preparation. The sector examples have real explanatory substance. It is ready for sharper copy and a controlled prospect test, **not a defensible claim that conversion is proven or that the product shown is verified**. The largest preventable failure is that the FAQ sends an interested reader into a different, inflated product story. The largest unsolved commercial weakness is proof: an authored example demonstrates the idea, not actual execution.

A fund manager can infer the main task quickly from the sector heroes. The answer to “what exactly happens if I contact you?” takes too much inference. A homepage visitor can still wonder whether this is software, bespoke consulting, or an outsourced reporting service. These are fixable without flattening the design or removing the approved two-track animation.

## P0 — fix before promoting the site

### 1. FAQ/About undo the trust earned by the new pages (confirmed contradiction)

Locations: `src/faq.html:148` onward; mirrored FAQ schema at lines 39–111. `src/about.html:57` and `:60`.

FAQ asserts audit-ready outputs, every figure source-linked, 1,200+ documents in hours, three weeks of temp work replaced, $500K/18-month in-house benchmark, twelve-month human-equivalent learning, platform-independent adaptation, and a fixed two-quarter/no-lock-in pilot. These are not substantiated in the inspected project. It says “Cosimo cites — it does not summarize,” while the new pages explicitly sell summarized commentary and investor letters. It omits hedge funds. About repeats absolute data residency and audit claims. This is a commercial trust blocker, not an aesthetic disagreement.

Action: replace FAQ with answers supported by the current offer; replace matching JSON-LD at the same time. Preserve Google OAuth disclosures unless implementation has been checked; do not invent replacement security guarantees. Suggested core Q&A:

- **What does Cosimo do?** “Cosimo prepares draft investor reports, portfolio updates, and responses from the records your fund already keeps. We configure each workflow around your sources, reporting format, and review process.”
- **Which funds is it for?** “Our examples cover real estate, venture capital, private equity, private credit, and hedge funds. The starting point is a recurring document or reporting task your team still prepares by hand.”
- **Do we have to change our reporting format?** “Your existing report is the starting point. We agree the sources, figures, commentary, and checks needed for the draft.”
- **Does it send reports to investors?** “The workflows shown here prepare drafts for your team to review. Your team approves the final version and sends it through your usual process.”
- **Are the examples live product runs?** “No. They use fictional records and prewritten outputs to show the proposed workflow. We configure and test the workflow for your fund before agreeing what it can handle.”
- **How do we start?** “Tell us which report or process takes too much of your team’s time. We’ll discuss the records involved, the output you need, and a first workflow to test.”
- **What about our systems and data requirements?** “Before starting, we agree how records will be supplied, who needs access, and the requirements for your fund’s data. Contact us to discuss your setup.”

About opening replacement: “Cosimo is fund operations software from Medici & Company. It helps fund teams prepare investor reports, portfolio updates, and responses from the records they already keep. We configure workflows around each fund’s sources, reporting format, and review process.” Avoid claims that broader K-1 and diligence work is already proven simply because it appears in a legacy page.

### 2. Interested visitors encounter broken legacy navigation (confirmed)

Locations: `src/faq.html:127–128`, `src/about.html:38–39`. `/#architecture` and `/#cases` no longer exist. Check privacy/terms shared navigation too.

Exact fix: match homepage nav labels/anchors: “How it works” → `/#product`; “Your workflow” → `/#fit`; “What it does” → `/#work`; FAQ; “Talk to us” → `/#contact`. Also ensure About's homepage link remains in the current preview rather than sending the user to the older public cosimo.work page (`src/about.html:68`).

## P1 — changes likely to improve comprehension and response

### 3. Make the first sales action explicit, shorter, and concrete (strong recommendation, conversion effect unmeasured)

Locations: `src/index.html:60,129–132`; final contact section on every sector, e.g. `src/re/index.html` contact, `src/vc/index.html:137`, `src/credit/index.html:108`.

“Show us your most time-consuming process” is a long button label that hides whether the action is a form, demo, upload, or meeting. “Tell us about your workflow” has the same ambiguity. The destination is an email, not a scheduling tool. Existing helper text partially fixes this, but the button should carry its own meaning.

Recommended homepage hero: primary **“See the reporting example”** → `#product`; secondary **“Discuss your process”** → `#contact`. This is a preference to test, not a factual blocker; sector pages already use sample-first hierarchy successfully.

At every final CTA: button **“Email us your process”**. Keep the visible email fallback.

Homepage headline: **“Which job would you take off your team’s plate?”** This covers quarterly as well as monthly work; current “every month” is needlessly narrower than the offer.

Supporting copy: **“Tell us what you prepare, where the information comes from, and which part takes the most time. We’ll work through a first workflow to test with your team.”**

Helper: **“A few sentences are enough. The button opens an email draft.”**

Do not manufacture a booking link, free pilot, promised response time, fixed implementation time, or “live demo” offer without a real destination/capability. Email can remain the MVP; a functioning form/calendar with verified delivery is a later improvement.

### 4. Say what the product is once, then let outcomes sell it (strong recommendation)

Location: `src/index.html:58`; sector hero footnotes, e.g. `src/re/index.html` `.re-hero-footnote`.

Homepage says what it produces but never quite says what customers are buying. Sector footnote calls it an AI agent; people still must infer who sets it up. Avoid making prospects reverse-engineer the business model.

Homepage lede replacement: **“Cosimo is fund operations software that turns your records into draft investor reports, portfolio updates, and replies. Less copying between files. Less rebuilding the same report.”**

One short setup line in fit/contact: **“We configure the first workflow with your team, using your records and reporting format.”** This matches the existing configuration description; it is not a promise of arbitrary system integrations. Retain the approved hero/kicker and independent randomized animation.

### 5. Sector scope promises and workflow lists do not line up (confirmed content mismatch; recommended correction)

Locations: VC/PE `#fund-page-config` hero includes portfolio updates/KPI packs; `src/vc/index.html:126–131` and PE same lines show LP reports, investor statements, calls, distributions. Three quarters of the deeper workflow list is investor-document boilerplate shared with RE, while the most differentiated sector job disappears.

VC recommendation: replace “Investor statements” slot with **“Portfolio monitoring”**, copy **“Bring founder updates into one dated view of company metrics, cash, and runway. Keep missing submissions and follow-up questions visible.”**, output **“Portfolio metrics + follow-up list”**. The existing sample actually illustrates this.

PE recommendation: replace same slot with **“Portfolio performance packs”**, copy **“Compare company actuals with budget and carry management’s explanations into the pack. Keep unexplained variances and outstanding updates visible.”**, output **“Company KPIs + variance commentary”**.

Update matching deliverable config/preview and aria labels, not just heading. Investor statements need not disappear from product scope; they simply should not displace the page’s best specific reason to care.

### 6. Dense examples need a buyer payoff, not another description of the page (strong recommendation)

Homepage `src/index.html:64`: “The report is the easy part” may dismiss a real pain when reporting itself is painful. Replacement **“Stop rebuilding the report every quarter.”** Supporting text **“Bring the figures, commentary, and last quarter’s format together. See what needs checking before the draft goes to investors.”**

Homepage `src/index.html:108`: “Less assembling. More moving things forward.” is the weakest headline: no task, no outcome. Replacement **“Reports, updates, and investor replies.”** Subcopy **“Start with the recurring job that takes too much of your team’s week.”** Keep existing cards.

Homepage stage description `:76`: “A draft your team can finish” makes the work sound partially abandoned. Use **“The draft, with open questions marked.”** (Also update stage text in `src/js/home.js`.)

Credit hero `src/credit/index.html:49`: two invented scene sentences delay the actual proposition. Replace with **“Cosimo turns borrower financials and servicing records into draft credit packs, covenant worksheets, and follow-up lists. Spend less time assembling the pack before the meeting.”** Preserve actual agreed calculation/review boundaries below.

PE pain intro `src/pe/index.html:98`: “Six management packs. Six different spreadsheets.” confuses fictional example size with the visitor’s situation. Replace with **“Every portfolio company sends a different pack. Your team still has to compare the KPIs, explain the misses, and pull the results into the LP report.”**

### 7. The proof gap needs real proof, not more aggressive language (commercial limitation, cannot be solved in this edit)

Locations: all disclosures; homepage `src/index.html:103`; docs explicitly state no live capability verification.

Keep the honest fictional-example disclosures. The authored reports are good explanations, but they cannot substantiate execution quality, time saved, data isolation, reliability, or integration scope. A buyer may reasonably ask “did software actually do this?” The site should not answer with implied proof.

Next real evidence asset: record one successful application workflow using publishable sample inputs; show those inputs, actual generated draft, human corrections, final output, and actual elapsed steps. Label what was configured and where review occurred. Link it beside the interactive example once it exists. A real proof run on RE is more commercially useful than another illustrative industry page. No invented logos/testimonials/numbers.

## P2 — consider after the above

- The home example is company-revenue based; RE/credit/hedge visitors need to see their sector links before inferring it is only portfolio-company reporting. Links already exist at top and after workflow cards. Add a small direct prompt near the example if visual review finds this ambiguous: “Looking for property, borrower, or hedge-fund reporting? Choose your fund type.” Do not add five competing demos to homepage.
- Much of the site repeats “draft,” “review,” and “approve.” This is appropriate for the product but can dominate the benefit. Keep one clear review boundary and specific unresolved questions; remove redundant explanatory sentences rather than removing material limitations.
- Page-count CTAs (“Read the six-page report”) communicate substance but not benefit. “Explore the full sample report” is more human; optional page count can remain metadata. Not a blocker and user explicitly requested document depth.
- Sector sample-report CTAs intentionally skip to the reader. Keep that behavior; user explicitly asked for it. If adding a separate “See how it works” action, point it to the source-to-output comparisons and label it differently.
- Do not overhaul the approved typography, Florentine fiction, kicker, independent hero animation, or cream/purple identity on the strength of subjective conversion opinions.

## What already works

Concrete outputs above the fold; familiar source records; real math rather than decorative statistics; exceptions kept visible; human approval; inspectable sample records; sector navigation; fictional-data disclosure; focused one-process entry point. Credit and hedge examples are especially well differentiated because they show a decision-relevant unresolved item, not merely a prettier letter.

## Go/no-go for top-of-funnel use

After P0 and immediate P1 edits, suitable for a small targeted outreach test. Not enough evidence to call it a proven lead-generation engine. Test unaided comprehension with actual prospects: who is it for; what gets prepared; what work is reduced; what happens on contact. Track example engagement and actual inquiries once a real measurement/lead-capture setup is approved. Agent agreement is not buyer validation.
