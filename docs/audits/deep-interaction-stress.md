# Deep interaction stress audit

Date: 7 October 2026. Tested the already-served `http://localhost:3000/` build in Chrome through CUA. Source edits by other agents were not built during this pass. No source files or build outputs were changed by this auditor.

## Result

No additional reproducible interaction defect was found in this pass. The initially suspected partially exposed homepage drawer did **not** reproduce as a settled default state. The known reader chapter scroll-context problem was excluded from new findings because the parent had already confirmed it and prepared an unbuilt fix.

## Actual browser cases

| Case | Expected | Observed |
| --- | --- | --- |
| Homepage at 320×568 | Closed drawer, reachable toggle, no page overflow | Settled screenshot showed a closed drawer; AX said “Open menu”, collapsed. Document scroll width was exactly 320. |
| Open homepage menu → 760×800 → 320×568 | Clear mobile modal state on desktop; return to a closed mobile menu | At 760, `aria-expanded=false`, no inert background elements, desktop links visible. Returning to 320 focused the collapsed menu toggle. |
| Homepage Escape and focus loop | Escape closes and returns focus; keyboard remains within open menu | Escape returned focus to “Open menu”. Shift+Tab from first link reached “Close menu”; Tab returned to first link. |
| Homepage menu at 640×360 landscape | All items and close control fit | Link bounds ran from y=16 to y=344 within 360px. Close toggle occupied x=576–620, y=4–48. Screenshot saved. |
| Homepage nav at 641×360 | Desktop navigation fits immediately above breakpoint | Toggle display was `none`; links occupied x=188.98–601, logo x=40–117.79. Document scroll width was 641. No overlap. |
| RE select “Show distributions” during active rotation, 320×568 | Complete selected phrase, paused state, matching front document | Control became “Play headline rotation”; exactly “Show distributions” was pressed. Headline settled to “Distribution notices. Before your morning coffee.” Distribution notice was foreground, opacity 1 and z translation 30. Scroll width was 320. |
| VC select portfolio updates → resize 320 to 760×640 → resume → pause | Selection persists through resize; resumed rotation remains pausable and matches document | Selected headline was “Portfolio updates. Off your to-do list.” After resume/pause it landed on “Investor capital calls. On your desk today.” “Show capital calls” was pressed; capital call notice had opacity 1 and foreground transform. |
| PE select portfolio KPI pack, 320×568 | Long phrase wraps without page overflow | Full “Portfolio KPI packs. Off your to-do list.” rendered; corresponding control pressed; document scroll width 320. |
| Credit select covenant worksheets, 320×568 | Long phrase wraps and document selection agrees | Full “Covenant worksheets. Off your to-do list.” rendered; covenant control pressed and corresponding card moving to foreground. Scroll width 320. Screenshot saved. |
| Hedge select allocator responses → 640×360 | Selection survives landscape resize and matches document | “Allocator responses. In a jiffy.” remained selected; allocator document opacity 1, others below 1. H1 bounds x=32–608; document scroll width 640. The tall hero requires normal vertical scrolling at this height. |
| All five sector readers: select chapter 6, then hero sample-entry link | Explicit sample entry starts the sample at page 1 | RE, VC, PE, credit, and hedge each returned status “Page 1 of 6”. |
| RE reader source at 320×568 | Modal fits viewport, Escape restores exact citation trigger | Dialog bounds x=19–301, y=20–548. Escape returned focus to “Inspect source: Operating workbook · rows 2–9”; no open dialog or inert residue. |
| VC source table at 320×568 | Keyboard can reach and horizontally scroll table; Close restores source trigger | Tab focused “Scrollable data table”. Two Right presses moved scrollLeft to 80 on a 517px table inside a 240px viewport. Close returned focus to “View source ↗”; open-dialog count zero. |
| Homepage replay → select stage 2 before automatic advance | Manual choice cancels replay and remains selected | “02 Check the figures” and “Keep discrepancies in view.” remained selected in a later observation beyond the 6.5-second full replay duration. Button reverted to “Replay the walkthrough”. |
| Homepage replay → open management accounts source immediately | Opening source interrupts replay; close returns to source trigger | After source inspection and Escape, stage remained “Gather the records.”, replay stopped, and focus returned to XLS management accounts trigger. |

## Screenshot evidence

- `/private/tmp/cosimo-deep-audit/stress-re-source-320.png`
- `/private/tmp/cosimo-deep-audit/stress-vc-paused-tablet.png`
- `/private/tmp/cosimo-deep-audit/stress-credit-headline-320.png`
- `/private/tmp/cosimo-deep-audit/stress-hedge-landscape.png`
- `/private/tmp/cosimo-deep-audit/stress-home-menu-landscape.png`
- `/private/tmp/cosimo-deep-audit/stress-vc-source-keyboard.png`

Screenshots capture actual browser state, including the scroll position produced by interaction; some are supporting context rather than full-hero views. Assertions above use observed DOM text, geometry, attributes, or focus, not screenshots alone.

## Scope and limits

This was a desktop Chrome viewport-resize audit, not a physical mobile-device or touch audit. It did not change OS settings. The exposed viewport capability did not provide reduced-motion emulation, so reduced-motion behavior was inspected in code only: home and sector headline controllers stop under `prefers-reduced-motion: reduce`; home replay shows stage 1 without scheduling playback; CSS supplies reduced-motion rules. This is not a browser-verified reduced-motion pass.

The menu was checked at the 640/641 boundary and 760; the sector content was checked at 320 and 640/760 as described, rather than every route at every width. This pass used the existing light theme and did not repeat the broader theme audit. Native dialog focus remained inside the dialog (Shift+Tab reached the dialog itself in RE); exact OS/browser tab traversal may differ.

Temporary viewport override was reset and the audit-created tab closed before releasing browser ownership to the parent.
