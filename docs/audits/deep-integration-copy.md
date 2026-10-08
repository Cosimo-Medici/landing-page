# Adversarial integration copy review

7 October 2026. Read-only inspection of the revised homepage, all five sector HTML files, all five report scripts, the homepage source/report content in `home.js`, and the linked FAQ. Earlier deep audits were consulted only after independent inspection. No browser, source edits, build, product run, or new market study was performed. Root was editing concurrently; line references identify the inspected content and may move.

## Decision and remaining blockers

The revised examples now describe actual preparation decisions rather than relying only on tidy totals and document covers. That does **not** establish that the software executes the examples. The visible authored-example disclosures and configure/test language make that boundary understandable. I would not add more disclaimers; I would obtain real product evidence next.

Four concrete integration inconsistencies were found and reported during this pass. All four are now corrected in source. I found no remaining arithmetic/source-correctness blocker in the reviewed scenarios. Browser behavior, final source grouping and product capability remain separate verification tasks.

The remaining copy issues below are smaller consistency/proof-quality fixes, not reasons to invent another major redesign or claim that the site is commercially validated.

## Findings corrected during this pass

| Finding | Evidence and risk | Disposition |
|---|---|---|
| Credit hero used an obsolete reporting calendar | `src/credit/index.html:58` initially said Bardi due 5 October / as of 6 October. Revised `credit-report.js:29`, `:33`, `:42`, `:59` use due 16 November / review 17 November, with financials received 13 November. This was an actual cross-page contradiction. | Root changed hero to 16/17 November; re-read and confirmed. Q3 financial period remains distinct from November review date. |
| RE simplified movement preview was titled a full investor statement | `src/re/index.html:82–85` displayed only opening + contributions − distributions, while the reader excludes a complete capital account (`:109`). | Root renamed card “Capital activity”; re-read and confirmed. Keep the exclusions. |
| Homepage selected one revenue figure but over-attributed its variance | `home.js:232` supplies Fiesole revenue of $6.4m in the management note; accounts use $6.0m. The former draft at `:265` attributed the selected $0.5m miss to delayed launches without a quantified source bridge. The total was correctly marked provisional; the causal sentence still exceeded that evidence. | Root changed both HTML `index.html:105` and modal `home.js:265` to say management reported delays while their revenue impact remains unconfirmed. Re-read and confirmed. |
| Hedge internal quarter calculation appeared inside an investor-classified page | `hedge-report.js` performance page originally contained the unapproved quarterly compound and preliminary-file discussion, although HTML calls pages 1–3 investor drafts. | Worker moved the compound/file review into internal close exceptions (`hedge-report.js:53` in latest read); no longer in monthly investor performance page. Re-read and confirmed. |

A mixed canonical-domain snapshot was also observed while root was integrating metadata. The latest read consistently uses `medici.ai` across the six pages. It is not an outstanding finding.

## Remaining changes worth making

### 1. Name the sample consistently at the first click

**Medium copy consistency; high confidence about text, untested conversion effect.**

`re/index.html:49`, `vc/index.html:50`, and `pe/index.html:50` still say “See a sample LP report.” Their ledes and reader introductions now correctly describe an operating/portfolio section, and their workbench content delivers that narrower artifact. “LP reporting” can remain the workflow category; the specific sample action should name what opens.

Proposed labels: RE **“See a sample LP update”**; VC/PE **“See a portfolio update.”** The accordion output labels at RE `:130`, VC/PE `:131` still say “LP letter + quarterly report.” Prefer **“LP letter + portfolio update.”** Do not add NAV, IRR or financial statements merely to justify a broader label.

### 2. The homepage's “last quarter's report” source is an editorial outline

**Medium proof-quality issue; observed.**

The source button at `index.html:82` calls its PDF “Last quarter’s report.” `home.js:233` opens instructions such as opening with combined revenue and following with management commentary. It explicitly identifies itself as a format reference, so this is not hidden fabrication, but it does not demonstrate preserving an actual prior report's formatting or tone.

Fast accurate fix: label the button **“Prior report outline”**, sublabel **“Q2 headings and editorial conventions”**, and modal title **“Q2 report outline.”** Stronger later proof: author an actual fictional Q2 excerpt and carry its recognizable headings and structure into Q3. Do not claim pixel-perfect format preservation from this instruction-only source.

### 3. Route buyers through the new proof, not only around it

**Test hypothesis, not a correctness blocker.**

All five sector primary hero buttons point to `#sample-lp-report`, bypassing the new source-to-draft stories. That matches the current button labels, so it is not a broken link. However, those stories now contain the reason to consider Cosimo; a primary-click visitor instead enters a lengthy authored report whose arithmetic an existing workbook can reproduce.

Consider primary **“See the reporting workflow” → `#workbench`**, retaining the nav's sample link and workbench's reader link for buyers who want the whole document. For credit use **“See the credit review workflow”**. Validate with task-based buyer observation before asserting higher conversion.

## Six-page experience: scope versus evidence

| Experience | Current promise and demonstrated job | Remaining boundary |
|---|---|---|
| All funds | Assemble a draft from accounts, commentary and house-format guidance; retain the revenue disagreement | Three-company revenue and variance arithmetic is coherent; provisional total remains flagged. Format reuse is illustrated through an outline, not an actual prior report. No evidence of production extraction is presented. |
| Real estate | Property reports and manager notes into an operating update around administrator accounts | Monthly/quarterly periods and dollars/thousands are explicit. Missing narratives, unapproved pricing and unquantified NOI causes remain open. The example is multifamily operations; it does not prove valuation, complete capital accounting or all RE strategies. The reader now says so. |
| Venture capital | Founder records into a portfolio update and dated missing-information review | Five September submissions plus August Oltrarno are consistently distinguished. Fiesole financing is excluded from cash/runway; six-month estimate and 25% Arno ARR growth have coherent bases. Missing commentary for three firms is a scope decision, not invented narrative. No new fund-performance claim found. |
| Private equity | Accounts and management explanations into an operating update | Separate actuals dollars and budget thousands support the $300k Fiesole miss. $180k/$120k explanations tie, while recovery stays unapproved. Six-company totals remain company operating figures, not fund return/NAV. Aggregate LP cash citation no longer exposes an internal account ledger. No new comparison-basis claim exceeds the explicit fictional fixture. |
| Private credit | Internal borrower review with a separate proposed LP update | $9m base plus a claimed $1m adjustment yields 4.80× versus 5.33× without it; $0.6m reaches the supplied 5.00× threshold. All remain conditional, and missing cost support is evidenced by the manifest. Principal, cash receipts and PIK are distinct. The example does not claim an executed-agreement interpretation, compliance certification or completed reconciliation. |
| Hedge funds | Approved figures into a letter; a cash difference and incomplete DDQ answers into review workpapers | Final versus preliminary return versions are explicit. Cash cutoff, currency and basis match; expected receipt does not close the gap. NAV authority and current continuity evidence remain unconfirmed. Investor/internal quarter-calculation placement is now corrected. No return-from-flows claim found. |

The headers are now broadly faithful to these jobs. Credit's “review pack” is appropriately internal; hedge's investor-letter/close/DDQ language matches the three examples. VC/PE ledes narrow broad LP-report category language to portfolio/operating sections. RE's revised capital preview no longer implies a complete account. Keep the independently rotating approved headlines, fonts and colors unchanged.

## What the site still cannot establish

The site can demonstrate a sensible workflow and transparent fictional output. It cannot establish the actual setup burden, extraction reliability, repeated-quarter behavior, correction effort, file export quality or time saved. The new setup sections and FAQ describe agreeing and testing those things, which is a reasonable next-step offer. They do not need invented integrations, universal Excel support, security certifications, customer quotes or a guessed pilot duration.

The commercial question still requiring evidence is whether a fund team completes **preparation plus review** faster with the configured workflow than with its current staff, administrator and tools. A real trial should include corrections, source changes and the next reporting cycle. Further cosmetic changes cannot answer that question.

No recommendation here treats a static source modal as a live product feature, an authored owner label as an implemented task system, or correct arithmetic as proof of buyer demand.

## Final copy disposition

Root subsequently aligned RE/VC/PE hero sample labels to LP/portfolio updates and renamed the homepage source to “Prior report outline” in its button and modal. Primary sample destinations remain the reader; walkthrough-first routing remains an untested hypothesis.
