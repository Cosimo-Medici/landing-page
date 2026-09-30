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
