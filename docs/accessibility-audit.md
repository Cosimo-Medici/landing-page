# Accessibility review — 14 October 2026

Scope: all twelve marketing pages and the exported product example. Target: WCAG 2.2 AA. This is a practical code and browser review, not an accessibility certification or a legal opinion.

## Repairs

- All pages now provide a keyboard skip link to a programmatically focusable main landmark. Source checks confirm one main landmark, one H1, unique IDs, English language metadata, and alternatives for all marketing images.
- Shared focus outlines, header clearance for focused controls, minimum button target dimensions, and forced-colors focus treatment. Legal prose links are underlined and readable in both themes; secondary body text and small accent labels use stronger contrast tokens.
- Explicit “Pause animations” control on every page, retained across navigation. It stops headline rotation, logo motion, CSS motion, and the homepage automatic walkthrough; operating-system reduced motion is respected independently. The embedded example also receives the pause preference.
- Exported example company records have native keyboard-operated expand/collapse buttons, state labels, contextual names on financial source buttons, and table column scopes.
- The exported queue strip nested filter buttons inside an outer button. Its generated JSX now uses a named group containing a separate native “Review items” toggle and the existing filter buttons. Retain this semantic change when regenerating the export; no functions were removed.
- Source-panel focus moves to a named close control when opened, Escape closes it, and focus returns to the originating financial figure. The bridge observes application portals as well as the main root.
- Exported workflow provenance is readable, explicitly illustrative text instead of a link to a nonexistent application run. Automated review findings prompted darker example secondary text, actual hidden table-header text, and decorative-only pause icons.
- Short mobile menus scroll independently, beginning below the header. Increased text spacing no longer pushes typewriter headings, proof metrics or source controls outside the viewport. The animation control uses normal document flow to preserve scarce space when zoomed.
- Existing mobile drawer uses keyboard focus containment, Escape dismissal, focus return and background isolation. Existing FAQ uses native details/summary with exclusive expansion; existing document viewers use native modal dialogs.

## Evidence

- `npm run build`, JavaScript syntax checks for modified scripts and existing six theme tests passed; `git diff --check` passed.
- Static HTML parser checks passed on all eleven pages: unique IDs, exactly one main and H1, no missing image alternatives.
- Chrome at 320 × 800: all eleven pages have document width 320 CSS pixels. The wide product workspace remains a separately named scrollable region, with instructions; two-dimensional report tables retain their dedicated scroll containers.
- Chrome light and dark: computed rendered leaf text measured against composited CSS backgrounds on all eleven pages. No active text failures found. Disabled previous-page buttons measured below 4.5:1 but inactive controls are exempt under WCAG 1.4.3. This measurement is supplementary, not equivalent to a full automated accessibility engine.
- About skip link activated with Enter: active element becomes `MAIN#main`.
- Mobile FAQ menu: Open menu moves focus to first link; Shift+Tab returns to close toggle; Escape closes and returns focus to toggle. Menu toggle is 44 × 44 CSS pixels.
- Exported example: Enter on “Expand Arno Precision company record” expands the actual record and updates the control to “Collapse …”, `aria-expanded=true`.
- Global pause switches to pressed “Resume animations”; preference persists on navigation.
- With global pause pressed, the logo satellite coordinate stayed fixed across manual report navigation; the automatic walkthrough control is hidden, while the manual “See the report” control still works. Resuming restores the default motion state.
- At a 320 × 256 CSS pixel viewport (the equivalent of 400% zoom on a 1280 × 1024 viewport), imposed WCAG text spacing: line height 1.5, letter spacing 0.12em, word spacing 0.16em and paragraph spacing 2em. All eleven original routes have no document horizontal overflow after repairs; no clipped active text or controls found in the scanned elements. The temporary override was removed by rebuilding.
- At that same short viewport, homepage document and real-estate citation dialogs remain within the screen and scroll internally. Enter opens them, Escape closes, and focus returns to the exact opener. Next-page activation moves focus to the new report heading.
- `python3 scripts/check-accessibility.py` validates the actual twelve built pages and fails on missing skip destinations, fragment targets, ARIA reference targets, main/H1 landmarks, alternative text, iframe titles and duplicate IDs.

## Automated final pass

Axe-core 4.14.0 completed 24 checks: all twelve marketing pages in light and dark themes, with the embedded example included in the homepage check. Final result: **zero rule violations** for WCAG 2 A/AA, WCAG 2.1 A/AA, WCAG 2.2 AA and best-practice tags in the rendered default states. Initial findings in the embedded example and real-estate proof cards were fixed and rescanned. Results are in [accessibility-scan-results.json](accessibility-scan-results.json). Interactive states are covered by the manual evidence above, not by this default-state total.

The scanner ran against an isolated copy of the actual build with locally hosted axe scripts. No audit library or QA harness is included in production.

## Release follow-up

- Run a specialist independent screen-reader review with VoiceOver/Safari and NVDA/Firefox, including every expanded company panel, document reader chapter, citation dialog and iframe transition. No full WCAG conformance claim should be published from this review alone.
- Repeat the verified browser interactions on the final deployed domain after deployment; production has not been replaced by this local review.
- The generated application example needs accessible exported-source maintenance when it is regenerated; retain the companion accessibility bridge and regression-check its selectors.

## Standards used

- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/): keyboard access, bypass blocks, contrast, reflow, focus visibility/obscuration, target size, name/role/value.
- [W3C Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide): an explicit persistent pause, not only stopping while focused.
- [W3C Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum): 24 CSS pixel targets or permitted exceptions.
