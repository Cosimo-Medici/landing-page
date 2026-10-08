# Independent fund-buyer and claims audit

7 October 2026. Scope: source-level review of all five sector pages, their authored report scripts, and the research/sector documentation. This is a skeptical buyer and content review, not a browser visual/accessibility review or a real-user conversion study. No project files changed.

## Verdict

The pain points are recognizable and most finance details are unusually careful. Private credit and hedge are the most differentiated. RE, VC and PE start strongly but drift into the same generic investor-document offer. The pages can support an exploratory sales conversation; they do not yet prove a repeatable product that deserves a purchase. The key gap is product evidence, not more adjectives or another animation.

A skeptical buyer's unanswered question is: “I already have an administrator, Excel, templates and an AI writing tool. What does Cosimo reliably do between receiving the files and approving the final pack?” The sample shows attractive outputs and helpful review questions. It does not show an actual configured Cosimo workflow processing files, recovering from discrepancies, retaining the template, or repeating next month.

## P1: Fix in this editing pass

### 1. Separate investor-facing pages from internal workpapers in the reader's framing

Files: src/{re,vc,pe}/index.html, src/js/{re,vc,pe}-report.js.

The surrounding page promises a six-page “LP report”, but page 5 displays every named LP's balances and page 6 internal checks. The individual pages do contain internal-use notes, so this is not an unqualified disclosure claim. Nevertheless, the navigation and wrapper teach the wrong distribution model. A fund operator will notice.

Recommended exact changes:
- Reader heading: “The LP report, with your team's review notes.”
- Reader intro: “Pages 1–4 draft the investor update. Pages 5–6 are internal checks for your team.”
- Navigation titles: “Internal · investor capital activity” and “Internal · checks and open items”.
- Workbench intro: “See how property figures and manager updates become the LP report—and how your team checks the investor ledger alongside it.” Adapt company/founder nouns for VC/PE.
- Keep the short hero CTA “See a sample LP report”; its initial destination genuinely is the letter. Avoid calling all six pages a finished investor package.

### 2. Make the demonstration status visible before a visitor watches the supposed transformation

All pages use affirmative “Cosimo calculates/compares/reconciles” copy above a disclaimer after the full reader. The credit page does best at explicit qualification. A visitor sees authored source/result text, not a recorded Cosimo run. “Fictional fund” alone does not explain that distinction.

Put one short sentence immediately above the source/result comparisons: “Illustrative example with fictional records; the outputs are prewritten.” Keep the fuller explanation below the reader. This is a modest, honest label, not a wall of caution. Do not remove the demo's confidence everywhere else or repeat caveats under every sentence.

### 3. Say what the next conversation produces

All five pages end in “Tell us about your workflow” and “We'll walk through how Cosimo could help.” A busy buyer is asked to do discovery work without knowing the payoff. The code only offers mailto; it is not a scheduling or intake system.

Recommended CTA: “Show us your reporting process”. Supporting copy: “Tell us what you prepare, where the files come from, and where the work gets stuck. We'll map out one workflow to automate first.” Explicitly label the action “Email our team” or keep the existing visible email cue. Do not call a mailto button “Book a demo”. This offer is clearer and does not invent pricing, an SLA or a free implementation promise.

### 4. Replace the hedge administrator-ownership claim

src/hedge/index.html: “Your administrator owns the official NAV.” This simplifies a governance relationship into a universal ownership assertion. SBAI describes valuation segregation, oversight and defined sign-off roles; it does not support this absolute language.

Replace the full paragraph with: “Use your administrator's approved figures. Your team resolves exceptions, approves commentary, and signs off before anything goes to investors.”

### 5. Narrow the RE reconciliation labels to the check actually demonstrated

src/js/re-report.js: “Reconcile each investor's balance” / “4 of 4 account balances match the ledger” sounds broader than a contribution/distribution roll-forward, even though the fine print correctly excludes income and valuation. VC/PE have a better story heading (“Check the LP capital schedule”) but the output still says “Capital reconciliation”.

Use “Check each LP's capital movements”; result heading “Capital movement check”; success line “4 of 4 contribution-and-distribution roll-forwards match the ledger.” Do not imply complete capital-account reconciliation or final statements from this arithmetic alone. Hero RE card could say “After capital movements” instead of “Closing balance”. Retain the clear short exclusions.

## P2: Stronger proof and positioning after these fixes

### 6. Demonstrate the hard part, not a cleaned spreadsheet plus arithmetic

The RE workbook already consolidates eight properties. VC/PE source workbooks already consolidate six companies. Credit supplies a covenant workbook with ratios and maximums. Much of the transformation is sums and paraphrasing. That makes the first skeptic's objection “my spreadsheet already does this” reasonable.

Next evidence artifact: one short recording from a validated Cosimo run showing two differently formatted inputs, a conflict/missing record, the generated document in the manager's format, and the reviewer resolving or leaving the exception open. Include the actual input, output and elapsed preparation/review time when measured. Do not fabricate processing animation and call it a product recording. Existing samples can remain the inspectable companion.

### 7. Lead VC/PE with what is specific to their team

VC's strongest moment is stale founder data plus runway/funding follow-up. PE's is a sourced budget variance plus unresolved management explanation. Both then advertise the same RE-like statements/call/distribution accordion, while their sector-specific portfolio document is not a corresponding workflow item.

Make VC's second workflow “Portfolio updates and founder follow-ups” with deliverable “Company metrics + missing-update list”. Make PE's second workflow “Portfolio KPI packs” with deliverable “Actuals vs budget + management commentary”. Keep calls/distributions available. This gives their distinctive hero documents a clear commercial home.

### 8. Give visitors a concise implementation explanation

Add a compact three-part “Start with one recurring report” section or sentence near the CTA: “Choose the report. Agree the source files and checks. Review the first run together.” This describes an engagement approach rather than unsupported current integrations. A buyer should not need to infer whether they are buying SaaS access, consulting or a configured operational workflow.

### 9. Reduce redundant disclaimers inside the examples

The financial boundaries are correct, but credit/hedge reports devote many paragraphs to what the example does not do. Group repeated details into a visible “Scope of this example” note and retain immediate caveats where the figure would otherwise mislead. Keep the unresolved covenant input and internal/external labels prominent. Do not turn the page into compliance prose.

## What is already working—preserve it

- Credit's 4.80× versus 5.33× add-back example shows a genuine review question, not a fake green compliance tick.
- VC preserves reporting dates and does not count an unsigned financing as cash. That demonstrates judgment better than generic automation copy.
- PE's $180k utilization plus $120k freight explanation accounts for the $300k miss and does not invent an approved recovery plan.
- Hedge separates class returns, fund NAV movement and exposure; an unexplained cash difference remains open; stale DDQ evidence is flagged.
- RE distinguishes property NOI from fund return and weights occupancy by units.
- Human approval is concise and credible. Preserve “Cosimo drafts. Your team approves.”
- Fictional Renaissance names add character without fake customer testimonials.
- The approved independent hero rotation can stay. No need to undo the user's established design preference to fix commercial clarity.

## Arithmetic / scope review

No substantive calculation error found in the reviewed examples. RE 942/1000 occupancy, $3.86m−$1.50m NOI, +$80k/$2.28m prior NOI; VC cash/burn; PE $800k/$10.4m miss; credit cash/PIK split and Pitti leverage; hedge compounded returns, exposure and fund movement are coherent. The limited scope of the examples matters more than the arithmetic.

## Primary-source checks

- [ILPA quarterly reporting guidelines](https://ilpa.org/wp-content/uploads/2017/03/ILPA-Best-Practices-Quarterly-Reporting-Standards_Version-1.1_optimized.pdf) distinguishes the broader financial package, capital statements, portfolio updates and management discussion. This supports identifying these examples as selected reporting workflows, not a complete LP financial package. Older guidance used for structure, not a new mandatory standard.
- [ILPA's current reporting template](https://ilpa.org/industry-guidance/templates-standards-model-documents/ilpa-templates-hub/ilpa-reporting-template/) addresses fees, expenses and carried interest. No ILPA-compliance claim should be inferred from these simpler demonstrations.
- [SBAI Standards](https://www.sbai.org/standards.html) emphasizes valuation separation and governance; [2026 Standards](https://www.sbai.org/static/c26702ef-b6c4-44fa-9c57413913f6b253/Standards-2026.pdf) includes defined NAV sign-off responsibilities. These support replacing “administrator owns the official NAV”.

These recommendations are expert inferences from the page and source material. They are not evidence of conversion uplift or buyer willingness to pay.

## Implemented after review

At the parent agent's request, applied the immediate fixes to the five sector HTML files and their five report scripts only. Kept shared styling/behavior and all six-page content.

- Explicit reader audience: investor drafts versus internal review. Chapter names, document headers, result-card labels, and result buttons reinforce it.
- Honest prewritten/fictional label before source comparisons.
- Precise capital-movement labels; RE hero says “After capital movements”.
- RE investor letter no longer infers renewals caused financial performance; the factual leasing activity now cites manager notes directly.
- Hedge administrator sentence now refers to approved figures rather than NAV ownership.
- Uniform contact labels and concrete first-task/records/output outcome.
- VC portfolio-monitoring and PE portfolio-performance workflow slots and matching preview configuration replace generic statement slots.
- Direct credit proposition and PE intro that does not project the fictional six-company size onto the visitor.

Verification: all five report scripts pass node --check; unique IDs, local anchors, JSON configs, precise CTA/disclosure counts pass; git diff --check passes. Parent owns combined build/browser verification. Nothing committed or merged. Actual product-run evidence remains outstanding and cannot be created by rewriting these samples.

## Second review: investor voice and visual impression

Removed remaining internal imperatives from VC/PE investor pages. VC now describes Oltrarno's dated figures and Fiesole's unclosed financing as facts; reviewer instructions and the internal nine-month screening threshold live on page 6. PE investor commentary states unconfirmed shipping timing and missing variance explanations; definition/timing checks live on page 6. This makes the new investor/internal page labels accurate. Both scripts pass syntax checks, and diff whitespace checks pass.

Viewed /private/tmp/cosimo-audit-home-light.png and reviewed updated home.css/re.css. Desktop first impression is premium, coherent, restrained and immediately understandable: investor reporting leaves the to-do list, product type is stated, the primary action is obvious. No visual blocker found in that screenshot. It is confident rather than theatrical. Conversion effectiveness remains unproven.

Concrete mobile regression targets for parent QA: the longer contact CTA, wrapped internal chapter names, and RE hero's “After capital movements” label. Their CSS permits wrapping; inspect the rendered result rather than assuming an overflow. The full desktop screenshot shows no proof-section heading, only the hero and a divider. An optional 70–90px reduction in desktop hero whitespace could reveal the start of the example earlier. This is a preference to test, not a must-fix defect, and does not justify changing the established hero concept.
