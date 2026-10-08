# Integrated visual and interaction QA

Date: 7 October 2026. Independent review of the rebuilt site served at `http://localhost:3000/`, using actual Chrome browser interactions through CUA. No application source edits, emails, publication, or merge were performed by this reviewer. Read the frontend-design skill and the earlier visual/journey reports before testing the changed implementation.

## Verdict

The revisions are a material improvement. The homepage now shows a recognizable piece of the work immediately: two conflicting records and the question retained in a draft. Sector demonstrations show more convincing preparation problems, rather than merely adding tidy totals. The separate report chapter and the explicit investor/internal groups make the long examples easier to understand. The practical setup sequence earns its space more than the removed decorative cover and giant approval monogram did.

Two visual defects were found in this integrated pass, reported to the parent, fixed, rebuilt, and verified. No further reproducible blocking layout or navigation defect remained in the paths below. This is a browser QA result and an informed design judgment, not evidence of conversion performance or product capability.

The experience is still deliberately long, particularly on mobile. It is now clearer depth; it is not a short landing page. That tradeoff remains something to test with prospective buyers.

## Actual coverage

| Viewport / path | Observed coverage | Result |
| --- | --- | --- |
| 1440 × 900, homepage | Paused full headline, revised product-bearing hero, both actions, artifact link into the demo; complete rendered-page capture | Stronger immediate product explanation. Artifact opens `#product`. No hero clipping in settled state. Latest explicit “fund operations software” copy was recaptured. |
| 1440 × 900, all five sectors | Route navigation, rendered full-page compositions, revised proof headings and all three source/result stories; reader boundaries and lower layout | No colliding panels or broken typography observed. Different sources and unresolved decisions are substantially more convincing. Source-link defects below were found here. |
| 1440 × 900, RE reader | Open page 4, scroll midway, select page 2 | New “Portfolio overview” heading at y≈316, below fixed navigation, and keyboard focus moves to the heading. Previously reproduced context-loss defect is fixed. |
| 1440 × 900, credit reader | Open page 3, scroll midway, select page 2 | New “Where the principal sits” heading at y≈316 and focused. Same context-loss correction confirmed independently on this route. |
| RE source modal, light and dark site themes | Open full operating source from the reader, close, switch theme, reopen | Dark modal toolbar and light source paper remain legible in both themes. Close and reopening work. This samples the shared source modal; it is not a complete two-theme audit of every page. |
| 390 × 844, all six pages | Actual first-fold heroes and full rendered-page captures | Sector choice and CTA remain legible. Document width equals 390 on each sector. Home’s paper artifact begins entering the lower first fold. |
| 390 × 844, RE | Source comparison, sample-report entry, audience groups, substantive portfolio chapter | Source tables fit their cards. Reader groups are clear. Chapter selection positions the new document heading correctly. Report-entry tradeoff noted below. |
| 320 × 740, homepage | Latest hero copy, navigation wrap, artifact link | Document width 320. Settled text wraps correctly. Immediate screenshot after viewport change briefly appeared clipped, but a fresh settled observation and DOM measurements showed the full 288px text column within x16–304; this is not recorded as a site defect. |
| 320 × 740, all five sectors | Substantive reader chapters: RE operations, VC cash/runway, PE actuals/budget, credit Pitti/covenants, hedge close exceptions | Document width 320 on all five routes. No clipped document heading or page-wide overflow. Dense tables stay inside their scroll containers. |
| 320 × 740, hedge sources | Allocator-request modal, close and return to proof; revised inline citation spacing | Filename wraps rather than pushing Close away. Modal text remains readable. Inline source colors and spacing corrected. |
| 320 × 740, credit sources | Financials excerpt and full servicing ledger source; horizontal keyboard movement | Two-column financial excerpt wraps within the modal. Wider source tables have `overflow-x:auto`, `tabindex=0`, 240px viewports with 370px/444px content. ArrowRight changed horizontal scroll position. Close remains visible. |
| 760 × 900, home and RE | Hero breakpoints; RE stacked proof introduction | No horizontal overflow or headline clipping. Home retains its full navigation at this width; RE reduces to its established compact header. |
| Setup / FAQ / contact | Hedge setup anchor and actual Setup questions → FAQ navigation; read contact mailto targets on sector pages; credit new preparation link | Setup reaches an actionable three-step explanation and FAQ opens correctly. Email links have prefilled subjects/bodies; none were opened or sent. “See how it’s prepared” leads to `#workbench`; primary sample action still leads to the report. |

The original independently randomized headline engine, replay interruption, menu focus rules, and every bottom reader transition were already covered by earlier stress testing. This pass concentrated on the changed composition, audience grouping, source presentation, and chapter context; it does not claim exhaustive retesting of unchanged behaviors.

## Issues found and closed during QA

### 1. Low-contrast inline citations in dark proof cards

Observed on VC: “Inspect all six dated submissions” and “Compare September cash and burn in the workbook” appeared in dark purple on the dark source card. Rendered color was `rgb(116, 65, 143)` at 11px. The separate “View source” control was readable, but the additional source paths were visually easy to miss.

The parent scoped proof-source citations to the existing light purple token and increased citation text to 12px. Reloaded PE showed `rgb(198, 166, 219)` at 12px; the corrected treatment was visibly readable on the hedge proof scenes. Cream-paper citations retain the darker color.

Status: fixed and verified after rebuild.

### 2. Adjacent source labels ran together

Observed in hedge proof 3: “Valuation policy ↗Cash-control policy ↗Continuity test report ↗” lacked useful separation. PE had the same multi-citation pattern.

The parent added adjacent-citation inline spacing. Reloaded hedge showed a 12px inline-start margin on the following citation, with the corrected light source color. Labels remain able to wrap at narrow widths.

Status: fixed and verified after rebuild.

## What the revised visual hierarchy communicates well

- The homepage paper composition makes the outcome and the need for review concrete without pretending to be a screenshot of a live application.
- RE makes differing monthly/quarterly units visible before showing the common figures. Its manager-note example retains an unconfirmed quote and schedule rather than silently completing the story.
- VC distinguishes email receipt date from the date of the company figures. That is a recognizable operational nuisance, and the internal follow-up list has a clear purpose.
- PE connects the normalization step, management explanation, and unresolved plan. The three sections now have different substantive jobs even though they share the two-column visual grammar.
- Credit leads with the consequential adjustment question and labels its main outputs for the team. The investor draft is separately grouped at page 6.
- Hedge distinguishes an approved return from the earlier version, keeps a plausible cash explanation unresolved, and does not invent NAV approval authority or current continuity evidence.
- The source modal still feels like inspecting records. The separate cream reader is a useful boundary between inspecting preparation and reading the resulting document.
- Lower setup explains the first engagement: choose one task, configure and test against records, review each draft. It reduces the earlier leap from an authored example to imagining implementation.

## Remaining design tradeoffs and evidence limits

1. **Mobile length is not solved.** In the captured default report state at 390px, the sectors measured roughly 12,071–12,907px in height, around 14–15 screens at 844px. The full reports, source records, and three scenes preserve the depth the user asked for. Sticky Contact us, direct sample access, the preparation link, and the reader CTA provide alternate routes through it. Do not describe the outcome as a shorter mobile journey.
2. **Source and output are still sequential on mobile.** RE’s first source card occupies almost a viewport, with the output following. Desktop side-by-side comparison is much faster to scan. A future prospect test should establish whether people understand the transformation before losing interest. This pass does not recommend deleting records merely to reduce height.
3. **The sample action enters through a report index.** At 390px, RE’s report title, scope note, and grouped contents fill most of the destination screen; the paper starts near the bottom. This is coherent and accurately lands in the sample section, but it is not an immediate full-screen letter. Chapter buttons then correctly bring the selected document into view. Watch this in user testing.
4. **The three proof stories retain a shared layout grammar.** Content is more differentiated and the independent reader breaks up the long dark block, but the design does not implement every compositional variation proposed in the earlier visual audit. This is a conscious consistency-versus-drama tradeoff, not a technical failure.
5. **Authored examples are still authored examples.** The site labels them honestly. They do not establish live generation quality, exact setup effort, integration coverage, or sales results. A real product walkthrough and conversations with real fund operators would answer those questions better than further self-assessment.

## Evidence files

Saved under `/private/tmp/cosimo-deep-audit/`:

- `final-home-desktop-hero.png` — latest paused desktop hero with explicit software-category copy; suitable for user review.
- `final-home-mobile-hero.png` — latest homepage at 390px.
- `final-{home,re,vc,pe,credit,hedge}-desktop-full.png` — rendered composition captures. Some initial sector captures caught the introductory document entrance in progress; use the settled mobile heroes or targeted proof/reader captures for fine-detail conclusions.
- `final-{home,re,vc,pe,credit,hedge}-mobile-full.png` — 390px page captures.
- `final-{re,vc,pe,credit,hedge}-mobile-hero.png` — settled paused sector first folds.
- `final-re-desktop-proof.png`, `final-re-desktop-reader.png`, `final-re-dark-source.png`.
- `final-re-mobile-proof.png`, `final-re-mobile-reader-entry.png`, `final-re-mobile-reader.png`.
- `final-{re,vc,pe,credit,hedge}-320-reader.png` — substantive minimum-width document views.
- `final-hedge-320-source.png`, `final-hedge-setup.png`.

The parent made small copy and citation corrections during this pass and rebuilt them; the specific corrections described above were reloaded and verified. The latest homepage hero images were recaptured after the final copy correction. Full-page captures document the integrated structure at capture time and may precede these small changes. Temporary viewport overrides were reset and this reviewer's browser tab was closed on completion.
