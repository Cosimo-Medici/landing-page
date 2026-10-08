# Independent visual design and information hierarchy critique

## Scope and verdict

Reviewed the supplied 1728px desktop and 390px mobile hero/full-page captures for home, real estate, venture capital, private equity, private credit, and hedge funds; all five desktop workbench and reader captures; and the home demo capture. Read `CLAUDE.md`, the requested frontend-design skill, and relevant HTML/CSS/rendering code. No other audit verdict informed this pass. No browser interaction or source changes were performed. The canonical memory path in AGENTS.md was unavailable. These captures establish light-theme appearance and dark proof-section appearance, not a complete dark-theme or animation audit.

**The sector pages have a credible, distinctive visual foundation. They are not yet captivating across the whole journey.** Their strongest idea is actual financial working material becoming a composed investor document. Their main weakness is treating every piece of that material as equally important to the scrolling visitor. The pages alternate from elegant promise to an unusually long demonstration, then return to generic reassurance. Home is clearer and shorter, but visually less accomplished than the pages it introduces.

Preserve the exact existing independently randomized headline behavior, font families, palette, and document depth. Nothing below requires substituting generic SaaS cards, making the two headline lines into matched slogans, or tying their random selection to document rotation. The proposed memorable moment belongs to the source-to-document demonstration, not a rewrite of the headline.

## What already earns its place

- **The sector document theatre:** slanted paper, restrained purple diagrams, real document titles, and the black “Draft ready / For your approval” tag make the product legible without screenshots of an invented application. This is more persuasive than an abstract AI orb or a generic dashboard. Real estate's architectural line drawing is especially characteristic; the other sectors' generic plots are weaker but coherent.
- **The dark workbench / light deliverable contrast:** it immediately distinguishes working records from presentation material. This is an information-bearing use of theme, not mere decoration. Retain it.
- **Specific adverse information:** the missing VC update, PE shortfall, credit add-back question, and hedge cash discrepancy are valuable proof. They suggest a tool that surfaces work for a person to resolve. These are visually and commercially more interesting than smooth success-only statistics.
- **Real document depth:** the inline report, source links, chapter list, and internal review pages make the site inspectable. This is an asset, not material to delete to make a shorter landing page.
- **Institutional type personality:** large Garamond, quieter Space Grotesk, and small mono controls form a recognizable register. The solution is a clearer hierarchy within that system, not replacement fonts or brighter colors.

## High-impact findings

### 1. Home undersells the product at the moment it should establish the visual world

**Observed:** in `home-desktop-hero.png`, an enormous pale C occupies the right half while the product remains entirely verbal. The first actual artifact arrives in the next section. On every sector page, the same area contains a recognizable report and supporting documents. Home therefore feels like a spare placeholder for the more mature sector site. Its navigation, theme control placement, button casing, and generous single-column headline also make the transition feel like changing sites rather than narrowing a view.

**Consequence:** the brand mark is receiving the compositional space that could answer “what will my team get?” The visitor needs prose and another scroll to form that picture.

**Concrete direction:** retain the headline at its current semantic priority, but replace the hero's oversized decorative glyph with one cropped, typographic deliverable composition drawn from the existing home sample. Show the title, one meaningful number, one sourced sentence, and a visible review question. Keep it quiet enough not to compete with the purple line. At wide widths use a deliberately overlapping lower-right artifact, or a 58/42 composition only if the longest existing headline strings fit comfortably. Do not force long random phrases into a narrow text column. Use the same paper/shadow vocabulary as `.re-hero-report`, not another miniature app frame.

`src/css/home.css` `.home-hero .hero-glyph`, `.hero-content`, and `.hero-headline` are the layout points. The exact random strings and their independence must remain in JS. Unify the *styling and action names* of existing home/sector chrome without altering nav/footer structure prohibited by CLAUDE.md.

**Classification:** art-direction recommendation, with a concrete information-hierarchy cost. A large C is not a functional defect.

### 2. The sector hero is good, but mobile spends its entire first screen on setup

**Observed:** each 390×844 sector capture has header, two rows of sector links, eyebrow, four headline lines, 4–5 body lines, two actions, and cycle controls. The document illustration begins below that screen. The typography is legible, but almost all initial evidence of the product is deferred. Desktop also starts the sector hero below two separate navigational bands; the action lands near the bottom edge of the 906px capture.

**Concrete direction:** recover space from infrastructure before shrinking the main type. Bring the sector chooser into a compact single-row, horizontally scrollable selection rail on mobile, with the current sector visible and a real edge cue. Reduce the vertical gaps surrounding the eyebrow and secondary action. Give the primary action a compact adjacent document-detail cue or let the top of the real paper composition enter the lower edge after that action. Do not shrink a whole desktop report into unreadable miniature proof. Preserve the main headline's complete text and all cycle controls.

The relevant rules are `.fund-sectors`, `.re-hero-copy`, `.re-hero h1`, `.re-hero-controls`, and the <=640/480 hero-art layout in `src/css/re.css`. If a rail is used, ensure it does not hide which sector is selected; a clipped set of mystery links is worse than the present wrap.

**Classification:** hierarchy/rhythm improvement, not a claim that every hero must contain a full illustration above the fold.

### 3. The proof is deep but its visual rhythm is too uniform

**Observed:** all five sector full-page captures follow virtually the same cadence: spacious hero; spacious pain statement; dark introduction; three large source/result pairs; six-page reader; cream workflow accordion; giant C approval message; contact. The dark section dominates the middle. Captured page heights are 7,792–8,021px desktop and 11,872–12,280px mobile, around 14–15 mobile screen heights at 844px. These heights describe the captured state, not a guaranteed runtime length.

The three proof stories are independently valuable. However, `.re-proof-comparison` gives all of them equal-width columns and `.re-proof-source` / `.re-proof-result` equal visual mass. The page consequently asks the eye to perform the same left/right comparison three times. On mobile, every full source precedes its output, so the answer may be more than a screen away from the premise. The visitor gets volume without a corresponding increase in dramatic emphasis.

**Concrete direction:** retain all three stories and all records, but give the scenes different editorial jobs:

1. **One flagship transformation:** keep the strongest source/output pairing large. Persistently mark the same figures on both sides; the result should make the connection understandable even after any entrance animation has finished.
2. **One exception in focus:** make the missing fact or conflicting figure the large focal element, with the relevant source excerpt alongside and the draft wording beneath. This is the moment where the product's judgment boundary becomes visible. Avoid rendering another equally large generic metric sheet.
3. **One reconciliation or follow-up:** use a wide ledger/equation or short action list, depending on the sector, with a narrow margin for the resulting instruction. Maintain links to the complete source and corresponding report page.

Allow the reader to remain deep and expansive; reduce repeated introduction and framing around it. Render scene variants through the existing `story(...)` builders in `src/js/*-report.js`, adding a purpose class rather than more specificity overrides. Use semantic variants such as `is-exception` and `is-reconciliation` on `.re-proof-story` and corresponding grid layouts.

On mobile, put the result summary next to the story heading, then a compact source excerpt with the exact rows needed to understand it. Full sources remain available through the existing source dialog. Where a complete table is essential, keep it with a visible horizontal-scroll cue. This is progressive detail, not removal of the user's requested depth.

**Classification:** strong structural recommendation. Long pages are not inherently bad; repeating the same compositional task at this length is the problem.

### 4. The most valuable exception is visually subordinate to the easiest number

**Observed:** desktop proof outputs lead with two very large figures, while the human-review flag is lower in a smaller tinted panel. The credit comparison of 4.80× versus 5.33× and the question about the add-back are the actual story; the exception deserves at least as much attention as cash-interest totals. Similarly, the VC missing-update name is presented with the same figure treatment as runway, despite having a different meaning. Hedge “cash difference” is a stronger differentiator than the otherwise familiar performance letter.

**Concrete direction:** use a visible text status and typographic weight to separate “confirmed from source” from “needs your decision.” Within the existing palette, a stronger border, a left margin note, and one larger Garamond question are sufficient. Put the unresolved question above explanatory footnotes. Leave the underlying calculation readable. The visual system should show what is draftable and what must be resolved without requiring every paragraph to be read.

Target `.re-proof-review-flag`, `.re-proof-big-figures`, and `.re-proof-result`; keep colors token-based. Do not add a fabricated risk score or imply that an unresolved item has been approved.

**Classification:** information-hierarchy weakness supported by the visible arrangements, not a request for a new feature claim.

### 5. The full reader looks substantial, but enters as the fourth similar demonstration

**Observed:** all reader captures retain the same dark surroundings and paper treatment as the preceding proof. The title, descriptive paragraph, fund edition, chapter list, pagination, paper masthead, paper metadata, document title, and metric row all appear before substantive prose. The RE/VC/PE captures show essentially the salutation at the bottom edge. This is handsome but a slow start after three preceding proof stories. The 240px chapter rail is useful, although its quiet 13px labels and 11px page counter do not make movement through the report a strong invitation.

**Concrete direction:** mark the reader as a distinct chapter with a stronger boundary and a compact “Read the complete six-page example” entry, then let the paper dominate. Keep the cover identity once; reduce duplicated edition metadata outside/inside the paper. Separate chapter groups visibly into “For investors” and “For your team” where those groups apply; credit should lead with internal review and show the LP update as a separate draft. This improves comprehension using content already present.

For prose pages, constrain the reading measure to roughly 65–80 characters using an inner text wrapper; let tables and key figures use the wider paper. `.re-inline-reader .re-document-page p` currently spans most of a broad desktop sheet. Keep body text at least its current 15px desktop and 14px mobile; further shrinking would undermine the very depth being demonstrated. Consider a compact sticky reader toolbar on mobile showing current chapter and next action, with a contents control, rather than relying only on the grid of six chapter buttons above a long page. Preserve the existing bottom next action.

**Classification:** reader-entry and hierarchy improvement. The inline reader itself is a strength and should not be replaced by a decorative PDF thumbnail.

### 6. The ending explains breadth and human control after the visitor has already seen both

**Observed:** the cream workflow section repeats quarterly reporting as its open item and displays a generic tilted report with purple bars. This is lower fidelity than the actual report immediately above. Then a huge C introduces “Cosimo drafts. Your team approves.” The point is sound but has already appeared in the hero status and review flags. The last contact section has similar size/weight to the prior two sections, so the page eases out rather than resolving.

**Concrete direction:** keep the workflow accordion as a breadth selector but begin with a genuinely additional deliverable; show a recognizably different notice, statement, covenant worksheet, or allocator response for each selected item. Do not use identical bars to stand in for documents with different purposes. Bring human approval into the reader's ending as an actual margin/sign-off note. Use the recovered space for a larger, single closing composition: one manual task, the records required, the draft returned, and the email action. The current email expectation is refreshingly explicit; keep it.

Targets: `.re-workflows`, `.re-deliverable-graphic`, `.re-human`, `.re-contact`, and their per-sector content. Remove or reduce ornamental repetition, not report content. Home's “use existing records / keep format / check / approve” section has the same issue to a lesser degree: four similar prose rows need one concrete miniature example connecting them, not four more icons.

**Classification:** editorial/design recommendation; no evidence here establishes poor conversion.

## Sector-specific art direction

| Page | Existing strongest material | Highest-value visual emphasis |
| --- | --- | --- |
| Home | Conflicting $6.0m / $6.4m source figures beside the draft | Make that traceable discrepancy the memorable product moment, and use a real paper artifact in the hero. |
| Real estate | Eight properties becoming occupancy/NOI and commentary | Keep the architectural linework; show property rows collecting into a portfolio total, then the capital movement check as a different wide composition. |
| Venture capital | One missing update and a six-month runway | Show reporting recency and the missing company's place in the portfolio. An always-rising decorative plot is much less specific than the actual uncertainty. |
| Private equity | Actual-versus-budget shortfall and unconfirmed operating plan | Emphasize the variance bridge and source of the explanation. Carry the same two shortfall figures visibly into the drafted sentence. |
| Private credit | Reported versus adjusted leverage and overdue certificate | Make the add-back question the central exception scene; use the follow-up as a short actionable output, distinct from the full numeric scene. |
| Hedge funds | Approved performance, cash difference, allocator answer | Give reconciliation the visual climax. Keep approved class/period/performance basis legible, and let the DDQ answer look like an answer with evidence, not another report cover. |

## Priority and guardrails

1. Fix verified interaction/layout defects from the journey audit first. The supplied `home-mobile-hero.png` shows a menu layer covering much of the hero, whereas `home-mobile-full.png` shows a closed menu. This pass does **not** infer that the obstructed state is the default; the journey owner should establish the cause.
2. Recompose proof stories by purpose and improve mobile source/result proximity. This has the greatest effect across five pages without changing the brand.
3. Give home a product-bearing hero visual and bring home/sector styling into one recognizable family.
4. Improve reader entry, contents hierarchy, and prose measure while preserving all pages and source access.
5. Replace the weak repeated ending with one clear next step and genuinely differentiated additional deliverables.

The desired “epic” quality should come from one exceptionally clear transformation with believable financial detail, not more animations, larger numbers everywhere, stock finance photography, gradients, or arbitrary dark/light alternation. The current paper/ledger world is worth developing. It needs a focal event and a more deliberate reading sequence, not a new aesthetic.
