# Real-estate landing page: design direction

2026-09-30. Branch: `marketing/re-landing-page`. Route: `/re/`.

## Brief
Keep Medici's original branding and approved reporting message. Replace the first pass's static text and repeated card grids with a distinctive, interactive experience. No merge into main.

## References and observations
- https://cosimo.work/ — EB Garamond at dramatic scale, IBM Plex Mono details, Space Grotesk body, Chicago wordmark; cream/plum palette, scanlines, architectural lines, dark interactive terminal, paper artifact previews, and animated reporting tasks. Retain that visual family. Avoid copying unsupported performance or security claims.
- https://mercury.com/ — visually distinctive finance presentation, a tangible work setting, and explorable product demonstrations. Translate the idea of tangible financial work into an animated reporting desk, rather than borrowing its scenery or branding.
- https://www.bennelson.net/work/mercury-command — the designer describes financial tools coming together through motion and an explorable product narrative. Adopt the assembly metaphor at a smaller, lightweight scale.
- https://linear.app/ — inspected public content for its product-led narrative. The authenticated browser redirected into the app, so no claim of reviewing the public site's animations.

## Design system
- Paper #F5F3EF; ink #1A1A18; plum #74418F; terminal #0C0C0B; muted paper #EDEAE4; white #FFFFFF. Keep existing theme tokens, add page-specific tokens only where needed.
- EB Garamond for display and report headings; Space Grotesk for reading; IBM Plex Mono for document metadata; Chicago for the wordmark.
- Hero: left-aligned message beside a spatial composition of property records and a report. Preserve real content and a visible CTA above the fold.
- Workbench: dark stage with source files, report preview, and user-controlled preparation stages. This is the one major interactive centerpiece.
- Workflows: asymmetric navigation and changing document preview, rather than four identical boxes.
- Close: a large, direct invitation with a functioning email action.

```
wordmark                 workflow / use cases / contact / theme
reporting headline       stacked report + property drawing
supporting copy          sample label
explore / contact
-----------------------------------------------------------
Your quarter has         incoming records / report / review
many moving parts.       [01 inputs] [02 draft] [03 review]
-----------------------------------------------------------
recurring workflows      selected deliverable preview
-----------------------------------------------------------
Show us the process you hate repeating.        contact
```

## Critique before implementation
The first concept risked becoming another editorial page full of borders and labels. Concentrate the visual drama in the physical report and its transformation; use fewer sections, readable body text, and meaningful controls. No fabricated metrics, testimonials, integration guarantees, or time-saving claims. Clearly label the interactive scene as illustrative sample data, not live product output. The real recorded workflow remains separate work under EXE-45.

## Behavior and verification
- A short entrance sequence, responsive report layers, interactive preparation stages, and explicit replay. The hero now cycles through four workflows at the user’s request; the reporting desk remains user-controlled.
- Mobile gets stacked layouts, readable report content, and controls that remain available.
- Keyboard operation, visible focus, reduced-motion support, and content readable if animation dependencies fail.
- Preserve the homepage. Isolate RE styles and behavior into dedicated assets and keep content hashing.

## Implementation and review
- Replaced the first-pass page with a layered document hero, architectural property drawing, and interactive reporting desk.
- Added user-controlled gather/prepare/review stages, a short replayable assembly sequence, source-to-report highlighting, and changing workflow deliverables.
- Restored light/dark switching with the existing preference key. The paper artifacts remain light in either theme.
- Isolated RE CSS/JS from homepage behavior. No new packages, CDN scripts, or image downloads.
- Verified the real local page at 1728px and 390px: no horizontal overflow; stage navigation, keyboard arrow selection, source highlighting, single-open workflow details, and theme switching work. Fixed inherited mobile navigation styling during review.
- Build, JavaScript syntax, and whitespace checks pass. Console errors observed were from installed wallet browser extensions, not the RE page.
- Reduced motion is supported in CSS and the interactive sequence; automatic hero rotation stops for reduced motion, manual selection, inspection, hidden tabs, and when the hero leaves view. This branch remains unmerged.
- Local preview: http://localhost:3000/re/


## Hero rotation and clarity pass — 2026-09-30
- Added synchronized headlines and four full document designs: quarterly LP reports, capital call notices, distribution notices, and investor statements.
- Each 6.5-second interval brings the matching document forward and moves the others behind it. The promise and headline dimensions remain fixed to prevent layout shifts.
- Added direct selectors, pause/play, and a progress indicator. Manual selection pauses rotation. Mouse inspection, focus on controls, leaving the hero, and background tabs pause it too. Reduced-motion preferences disable autoplay and transitions; manual selection remains available. The accessible heading is stable rather than announcing each rotation.
- Rewrote the page around identifiable manual work, named outputs, and explicit next steps. See [the copy audit](re-copy-audit.md) for criticism, rationale, and evidence limits.
- Final browser review: desktop and 390px mobile show no horizontal overflow. Manual selection and autoplay keep the headline and foreground document synchronized; explicit Play resumes after selection, and Pause holds the selected document. The sample CTA reaches the reporting desk, and the distribution accordion updates its preview. The contact section clearly describes the email action. Build, syntax, and whitespace checks passed; original homepage assets remain unchanged.


## Independent headline tracks — 2026-09-30
- Corrected the earlier interpretation: the workflow and ending rotate independently, not as fixed pairs. Every ending works with every workflow. The original homepage's two separate randomized text tracks are the behavioral reference.
- Workflow choices shuffle on a 6–7.2 second schedule and bring their matching document forward. Endings shuffle independently every 8.3–9.8 seconds: “Before your morning coffee,” “In a jiffy,” “On your desk today,” and “Off your to-do list.” Neither timer resets the other. No immediate repeats.
- Both tracks retain the existing fade/slide transition. Pause, manual workflow selection, inspection, reduced motion, background tabs, and leaving the hero stop both clocks.
- Removed the text clipping mask, increased line height and reserved descender space, and scaled the narrow-mobile heading to fit the longest ending. Both tracks retain stable two-line dimensions.
- Checked the rendered headline in light and dark themes, desktop and mobile dimensions, matching foreground documents, and pause/play. Build, syntax, and whitespace checks pass. The homepage remains unchanged.
- These endings use the user's requested marketing language; they are not measured turnaround guarantees. Real workflow demo evidence remains outstanding.


## Exact homepage typewriter correction — 2026-09-30
The preceding independent-track change was incomplete: it retained whole-phrase fades. The reference is the actual `createTypewriter` implementation and `typewriterCoord` in `src/js/main.js`, not just its randomized phrase selection.

- Ported the homepage engine into the isolated RE script: character deletion every 20–40ms, a 200ms empty pause, typing every 40–80ms, and the existing `.typewriter-cursor` block caret (600ms blink).
- Preserved shuffled phrase queues, repeat avoidance at queue boundaries, 8-second top / 11-second bottom cycles, the minimum 1.5-second hold, and the original shared 3-second quiet-window coordinator.
- Matched startup: 2.8-second reveal allowance, then 2-second / 5.5-second initial holds. Removed fade/slide phrase transitions and the unrelated cycle progress bar.
- RE-specific additions are cancellation for pause/reduced-motion/background/offscreen states and a completed-workflow hook that brings the matching document forward. Hovering the documents no longer changes headline timing. Explicit pause settles both lines to complete phrases; manual selection remains available.
- Kept the descender clearance and fixed two-line dimensions; newlines are preserved during typing. The original homepage files are unchanged.
- Verified live DOM samples showing deletion to an empty string and character-by-character typing, cursor removal on completion/pause, document matching, and no horizontal overflow at 320px. Build, JavaScript syntax, and diff checks pass.


## Fictional demo names — 2026-10-05
Use subtle Florentine and Renaissance references for fictional entities, paired with recognizable business roles. Reserve Medici and Cosimo for the actual company and product; never use them as sample clients, investors, or properties. Preserve explicit fictional-data labels.

- RE fund: Renaissance Real Estate Fund I; short document brand: Renaissance.
- LP: Strozzi Family Trust, consistent across the capital call, distribution notice, statement, and report commentary.
- Properties: Arno Court, Pitti Gardens, Oltrarno Place, Fiesole Terrace. Use these names in the future RE workflow demo too.
- Homepage examples: Rucellai Capital Fund III, Tornabuoni Credit Fund II, Brunelleschi Acquisition; portfolio companies use similarly restrained names. Source filenames, citations, tables, and document text use matching names.
- Keep functional labels such as “Capital account ledger” explicit. Names provide texture; they should not make the workflow harder to understand.


## Simplified LP report example — 2026-10-05
The previous reporting desk mixed workflow tabs, source highlighting, and a small document preview. User feedback: the section did not make its purpose or interactions clear. Replaced it with a direct input/output demonstration.

- “Your property updates. Turned into your quarterly LP report.”
- “You provide”: three static source files, each with a recognizable document type, fictional filename, and plain description.
- One “Prepare the LP report” button reveals the fictional report; the illustration is explicitly labeled, and it makes no API call. Reduced motion skips the reveal delay. On mobile, preparation scrolls to the result.
- “You get”: a readable report preview and “Open full report” native modal. Escape/Close dismiss it and return focus. The modal reuses the same report markup.
- Sample-report links reveal and target the result directly, including direct fragment URLs.
- Removed the old stage tabs, selectable sources, source-highlighting logic, and their CSS. Kept a single approval sentence below the demonstration.
- Verified desktop, 390px and 320px layouts, both themes, preparation, direct sample-report links, modal opening/closing and focus return. Build, JS syntax, and whitespace checks pass.


## Worked example and six-page report — 2026-10-05
User feedback: the simplified layout was clear, but a one-page reveal lacked substance and did not show how a report is created. The section now preserves a single primary action while providing an animated, inspectable worked example.

- Five narrated steps: read property records, calculate NOI, connect manager notes, reconcile investor capital, assemble the report. Active source cards, calculation evidence, progressive document reveals and a changing page preview connect each step to its output. Autoplay can be paused, advanced manually, replayed or skipped; opening a source or hiding the browser tab pauses it. Reduced motion starts in manual mode.
- Three inspectable fictional source records: operating workbook (eight properties), capital ledger (four LP accounts with recorded closing balances), and manager notes (four properties, one unapproved contractor quote). No network or AI request is made.
- Six distinct report pages: investor letter, portfolio overview, operating performance, asset commentary, capital activity, review/source schedule. Full report uses a chapter reader, previous/next controls, and citations that open source records without losing the current report page.
- Shared authored data drives workbook tables, calculations, report figures and walkthrough evidence in `src/js/re-report.js`. Weighted occupancy is 942 / 1,000 = 94.2%; Q3 NOI is $3.86m revenue less $1.50m expenses = $2.36m (up 3.5% from $2.28m). Four LP accounts reconcile to $32m + $2m − $0.85m = $33.15m before income/valuation adjustments.
- The outstanding Oltrarno quote is preserved as an explicit review item. No complete capital-account, NAV or audited-results claim is made.
- Browser validation covered six distinct pages, source modals over the report reader, Escape/focus return, all five manual walkthrough steps, desktop and 390px/320px layouts, dark/light themes, and the final six-chapter state. Source-table arithmetic was checked against rendered report figures.
- Fixed inherited global navigation styles and mobile grid minimum widths during visual review. Tables scroll within their containers on narrow screens. Build, script syntax and whitespace checks pass.

## Visibility and comprehension audit — 2026-10-07
User feedback: the worked-example data is good, but its presentation hides the information and remains confusing. Reviewed the paused capital step in the live browser at 1728×906 and 390×844 before editing.

### Observed problems
- Desktop: a 1,028px document is clipped into a 330px preview with an 85px fade and 10px body text. Most useful evidence is hidden while the masthead and titles remain prominent.
- Mobile: the same document grows to 1,249px but its viewport shrinks to 260px. The input list and output are separated vertically, so the source-to-result relationship requires memory.
- A visitor can be offered source-file buttons, replay, skip, inspect source, continue, next, and full-report controls. The five-step counter and six-page counter describe different things without a useful hierarchy.
- Key source data lives in modals; output data lives in another modal, with citations opening a second dialog above it. The interface hides the comparison that should be the central selling point.
- Timed whole-page replacement changes the subject every 5.2 seconds. It gives motion priority over reading and inspection.
- The same message is repeated in narration, an evidence box and a cropped report heading. The evidence gets less space than the explanation around it.

### Selected design direction
Preserve the cream/plum palette and existing typefaces. Turn the section into three visible source/result comparisons followed by an inline six-page reader. This is a marketing explanation with optional detail, not a simulated application the visitor must learn.

1. Property data → portfolio summary. Show the eight property rows and totals directly beside the report’s 94.2% occupancy, $2.36m NOI and a short investor paragraph. Highlight the exact source totals and matching destination values.
2. Asset-manager note → investor commentary. Show the original Oltrarno note beside the drafted paragraph and unresolved quote. Distinguish supplied facts from missing information without asking the visitor to open a file.
3. Capital ledger → reconciliation. Show the four LP account movements beside the $33.15m reconciliation and the Strozzi row calculation. Keep amounts and units explicit and readable.
4. Full report. Render the existing six-page report inline with its contents always available. Page changes remain user-controlled. A source link may open the underlying file, but there is no report-modal/source-modal stack.

Motion: one brief highlight and connector trace when a comparison enters view. Keep the actual content present before, during and after animation. Normal scrolling, no scroll capture, no countdown, no forced autoplay. Reduced-motion mode shows the same evidence without animation. Mobile pairs each source immediately with its result.

### Acceptance criteria
- With no clicks, the visitor can see a real property table, a real manager note, a real ledger and the corresponding outputs.
- No clipped/faded body text in the main proof. Main explanatory text is at least 14px; tables remain readable and scroll only within their own containers when necessary.
- Sources and their outputs share concrete labels and numbers. Decorative motion never substitutes for a visible relationship.
- Six report pages remain accessible without watching an animation. The hero sample-report CTA targets the inline reader directly.
- User can read every section at their own pace; all content remains available with reduced motion.

### Research used to challenge the design
- NN/g, Progressive Disclosure: important/common information belongs in the first view; secondary detail can be deferred. https://www.nngroup.com/articles/progressive-disclosure/
- NN/g, Animation for Attention and Comprehension: motion can communicate relationships and state changes once attention is established. https://www.nngroup.com/articles/animation-usability/
- NN/g, Scroll-Triggered Text Animations Delay Users: do not make readers wait for primary text to become available. https://www.nngroup.com/articles/scroll-animations/
These support the interaction principles, not a prediction of conversion lift. Validate comprehension with the user and subsequently a target fund operator.

### Implementation and verification
Implemented the three comparisons and inline reader in `src/re/index.html`, `src/js/re-report.js`, and `src/css/re.css`. Retained the existing fictional dataset and all six report pages. Removed timed scene replacement, preview clipping/fades, the report dialog, and obsolete CSS that was shrinking chapter labels. The approved hero animation is unchanged.

- Desktop review at 1728px: full source tables beside readable output; chapter labels 13px, report body 15px, sticky contents. Checked both themes.
- Phone review at 390px and 320px: paired source/output blocks, two-column contents, no page-level horizontal overflow. Fixed capital metrics overflowing at 320px by using labeled metric rows. Wide tables scroll independently, expose a hint only when overflowing, and can receive keyboard focus.
- Exercised every chapter, previous/next controls, bottom next control, each example-to-report destination, sample-report navigation, source opening and Escape closing. First/last page controls disable appropriately.
- The first example now opens the investor letter containing its quoted paragraph. Other examples open asset commentary and capital activity respectively.
- Motion is CSS-gated to `prefers-reduced-motion: no-preference`; content remains visible without animation. No new dependencies or live AI calls.
- `npm run build`, `node --check src/js/re-report.js`, and `git diff --check` pass.
- Preview: http://localhost:3000/re/#workbench. Screenshot: `/private/tmp/re-report-proof-redesign.png`. Changes remain local and unmerged.

## Plain-language copy pass — 2026-10-07

User feedback: page language felt awkward and inhuman, especially the report introduction beginning “Six pages, with the figures, commentary, and sources together.”

Rewrote the `/re` marketing copy and six-page sample report. Main issue: too much commentary about the demo itself, repeated review language, and clipped slogans standing in for explanations. The page now names the work: pulling together property numbers, drafting the LP update, reconciling investor balances, and preparing individual notices. The contact invitation asks which task takes too much time; the prefilled email is shorter too.

Examples:
- “The figures. The context. The report, written.” → “See how your records become an LP report.”
- “The note becomes commentary. The gap stays visible.” → “Draft the property update for your LPs.”
- Report introduction → “Read the LP letter, explore the property results, or check a figure against the original records.”
- Sample report headings now name their contents (“Quarterly operating results”, “Investor capital activity”) instead of pitching the product.

Kept the approved hero rotation and “Grow your fund. Not your workload.” line. Preserved fictional names, figures, calculations, source links, capital-schedule scope, and the disclosure that this is a prewritten example rather than a live session. Report excerpts still match their full-report paragraphs. No layout or interaction changes.

Verified the revised text in the browser, desktop report introduction, contact copy at 390px, and workbench headings at 320px. No page-level horizontal overflow at either mobile width. Restored desktop viewport. Build, JavaScript syntax check, and `git diff --check` pass. Changes remain local and unmerged.
