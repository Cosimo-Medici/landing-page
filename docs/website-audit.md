# Website deep review and changes

7 October 2026 · `marketing/re-landing-page` · local preview only · no merge or deployment.

## Assessment

The first pass did not justify calling the website ready. The deeper review found substantive problems in the demonstrations, investor/internal audience separation, reader navigation, setup explanation, and page pacing. The implemented changes below address those problems. This is a reviewed marketing prototype, not evidence of conversion or a verified demonstration of every live product capability.

The commercial argument is now concrete: use records the fund already receives to prepare a recurring report or response, preserve the fund’s format, and leave the team with a draft and the questions to resolve. The sector examples show work a prospect can inspect instead of relying on claims about AI or clean totals.

## Review coverage and evidence

Eight independent initial review lanes covered five fund buyers, visual design, visitor journeys, and interaction stress. A subsequent cross-page copy review challenged the integrated revisions; a separate browser reviewer checks the revised layouts and interactions. Sector reviewers read the complete fictional reports and source records, checked the arithmetic, inspected desktop/mobile captures, and consulted relevant primary industry sources. Browser reviewers operated the actual local site.

These are expert reviews using simulated buyer perspectives. They are not interviews, user research, or measured conversion tests. See [review plan](audits/deep-review-plan.md).

| Lane | Detailed evidence |
| --- | --- |
| Real estate | [Buyer and source review](audits/deep-re-buyer.md) |
| Venture capital | [Buyer and source review](audits/deep-vc-buyer.md) |
| Private equity | [Buyer and source review](audits/deep-pe-buyer.md) |
| Private credit | [Buyer and source review](audits/deep-credit-buyer.md) |
| Hedge funds | [Buyer and source review](audits/deep-hedge-buyer.md) |
| Visual hierarchy and pacing | [Desktop/mobile design review](audits/deep-visual-design.md) |
| Actual visitor journeys | [Browser journey findings](audits/deep-visitor-journey.md) |
| Interaction resilience | [Browser stress results](audits/deep-interaction-stress.md) |
| Revised copy and cross-page consistency | [Adversarial integration review](audits/deep-integration-copy.md) |
| Revised browser experience | [Integrated visual QA](audits/deep-integrated-visual-qa.md) |

## Findings and disposition

| Finding | Implemented change | Verification |
| --- | --- | --- |
| Homepage decorative C did not demonstrate the offer | Replaced it with a linked fictional source conflict and draft-report preview. Kept brand/typewriter and made it open the walkthrough. | Desktop/mobile browser inspection |
| Clean source tables skipped the difficult work | Rebuilt all 15 sector proof scenes around original excerpts, definitions, provenance, uncertainty, and next actions. Detailed tables remain available. | Independent sector and integration reviews; executed source/math checks |
| RE illustrated aggregation more than preparation | Compare monthly dollars with quarterly thousands, trace manager commentary, and show missing reporting inputs. Separate aggregate investor cash from named LP ledger. | Eight properties, four investors, units and $43k/$11k movements checked |
| VC confused receipt date with metric date | October email explicitly contains August metrics. Fiesole’s unsigned financing remains uncertain; worklist includes missing metrics and narrative scope. | Six companies, seven sources, dates and coverage checked |
| PE normalized away its central problem | Actual USD dollars vs budget $000s; $300k variance explained by $180k utilization/$120k freight; unapproved recovery stays open. | Six companies/sources; conversion, totals and commentary checked |
| Credit calculation started with prediagnosed data | Separate financials, certificate, supplied terms, and missing-support manifest. Conditional $0.6m accepted adjustment produces 5.00×, alongside 4.80×/5.33× scenarios. | Six loans/seven sources; portfolio totals and ratios checked; no compliance conclusion |
| Hedge records were already merged/diagnosed | Separate preliminary/approved admin figures, PM note, same-cutoff cash records, and original allocator request/policies. Two drafts plus one hold; NAV approval authority unresolved. | Fourteen sources; returns, exposures, cash and flows checked |
| Source-supported wording sometimes exceeded evidence | Removed unsupported sent/requested status and unsupported causal claims; internal quarter-return calculation moved out of investor page. | Independent integration reviewer rechecked four concrete contradictions |
| Simplified capital activity presented as full statement | RE hero renamed “Capital activity”; report scope and exclusions remain explicit. September call dates/purpose align with quarter’s activity. | HTML/report cross-check |
| Fund-specific pages did not explain administrator fit/setup | Compact sector-specific fit statement, three practical setup steps, direct FAQ link. Homepage explains existing administrator/finance records and agreed responsibilities. | Copy and visitor-journey review |
| Repetition and one long dark block made the pages tiring | Removed repeated lower document covers and giant decorative approval panel. Shortened intro; separated walkthrough and themed reader; kept substantive report depth. | Desktop/mobile visual review |
| Six-page reader mixed audiences | Grouped investor drafts and internal workpapers in contents; retained page-level labels; investor cash citations avoid named LP ledger. Credit pages 1–5 internal/page 6 LP; hedge pages 1–3 investor/4–6 internal. | Executed templates and browser chapter inspection |
| Selecting a chapter midway down left its heading offscreen | Move to the reading pane below sticky navigation and focus the new heading after chapter/prev/next changes. | Reproduced original bug; revised PE pane y≈103 and heading y≈329 at1440px; independent final browser check |
| New inline citations were too dark on source cards | Added surface-specific light-purple links/focus outlines on dark cards and increased citation text to 12px. Paper citations remain dark. | Independent browser reviewer reproduced; fix rebuilt for recheck |
| Sample labels overstated scope | RE CTA says LP update; VC/PE say portfolio update. Homepage’s editorial-outline source labeled as an outline. | HTML/script checks |
| Different canonical hosts and incomplete sitemap | Aligned metadata, organization URL, robots, public summaries and sitemap to user’s chosen medici.ai. Included all 10 actual routes; supporting pages use .html paths. Legal body changes limited to website hostname. | Static built-output checks; live domain configuration not performed |

## Design decisions retained

- Existing cream/charcoal/purple palette, four font roles, Chicago COSIMO wordmark, independent randomized headline engines and timing. No new libraries, fonts, or dependencies.
- Detailed six-page sector readers, inspectable source records, table scrolling, source dialogs, and human review. More depth is available without forcing a second decorative explanation of the same benefit.
- Primary sample actions still go to the sample. The formerly duplicate link at the foot of each hero now says “See how it’s prepared” and opens the walkthrough. The reviewer’s idea of routing those to the walkthrough is a conversion hypothesis, not a proven improvement; changing a “sample” link to an unexpected destination would repeat a prior user complaint.
- Email is the real MVP contact action, with visible address fallback and specific information to send. No invented calendar, silent form failure, fake client proof, numerical savings, or free-pilot promise.

The structural choices are consistent with [NNGroup’s progressive disclosure guidance](https://www.nngroup.com/articles/progressive-disclosure/) and [homepage guidance](https://www.nngroup.com/articles/homepage-design-principles/): make the offer and starting action clear, and make detail accessible at the point it is useful. These references support design reasoning, not a forecast of sales.

## Verification

- Build passes. All source JavaScript passes syntax checks; whitespace diff check passes.
- All 10 built HTML pages: unique IDs, local assets/links, and fragment targets pass.
- Executed report-template checks cover financial totals, source-index bounds, page counts, conditional calculations, and audience separation. These are authored examples, not app/backend tests.
- Baseline stress pass operated all five reader resets, mobile menus, keyboard source-table scrolling, headline selection and interrupted walkthrough replay; no new reproducible failure beyond the separately documented chapter context bug.
- Separate integrated browser pass inspected all six main desktop/mobile pages; all five sector readers fit at 320px, with contained tables and usable source dialogs. RE and credit chapter changes from mid-page kept the heading visible and focused. Source-link contrast and spacing findings were fixed and rechecked. See the linked final QA report for full coverage and limits.
- Reduced motion is inspected in code; no operating-system setting or assistive-technology certification is claimed.
- No email sent, production deployment, commit, push, or merge during this deep-review turn.

## Remaining design tradeoff

At 390px the sector pages still span roughly 12–13k pixels, around 14–15 screens in the reviewer’s viewport. Separating the reader, reducing repeated framing, and removing decorative repeats improved hierarchy; they did not make this a short mobile page. We retain substantive documents because the user specifically rejected shallow examples. Sticky contact, the primary sample action, the new walkthrough link, setup links, and a reader-level contact action let visitors choose their path. Test where actual prospects stop or lose context before collapsing the evidence or adding more motion.

## What still needs real-world evidence

1. Record a successful application workflow with publishable inputs: messy records, generated draft, open question, human review, final document. The authored site examples must not substitute for this proof.
2. Verify the receiving inbox and assign lead ownership. Confirm live deployment/redirects/metadata when releasing to medici.ai. Local code changes cannot validate DNS, delivery, or production hosting.
3. Put the prototype in front of a few actual target managers. Observe whether they identify the task, understand the administrator relationship, inspect the right proof, and know the next step. Ask what would stop them trying one workflow. Use that evidence to choose the first sector/outbound message.
4. Add funnel measurement and a booking/form destination only when the actual tools, destination, and delivery path are agreed. The current site has no conversion telemetry.

Do not call these outstanding evidence needs website bugs, and do not call the absence of remaining reproduced UI bugs proof that the site will sell.
