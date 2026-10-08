# Interaction and accessibility audit — 7 October 2026

Scope: all-funds homepage and /re, /vc, /pe, /credit, /hedge in landing-page-preview. Static source audit only; root agent owns browser verification. Read project CLAUDE.md and frontend-design skill. Canonical auto-memory path unavailable on this Mac.

## Verdict

The core interaction model is much stronger than a generic brochure: immediately readable examples, inspectable sources, native source dialogs, substantial reports, and deliberate reduced-motion treatment. It is not yet fair to call the site conversion-proven. The largest practical conversion dependency is that all contact paths still terminate in mailto, without a form/booking endpoint or funnel measurement. There were also concrete accessibility defects that deserve correction before launch.

## Findings and actions

### P1 — Closed mobile homepage menu remains in keyboard navigation

Evidence: src/css/styles.css:2404–2423 moves the full-screen drawer offscreen using transform only. Original src/js/home.js:140–143 merely toggled classes; no inert/hidden state or focus management. A keyboard visitor could tab into invisible links; an open full-screen drawer let focus move behind it.

Implemented in src/js/home.js: matchMedia at the actual 640px drawer breakpoint, inert closed menu, inert page background while open, focus first menu link, Tab/Shift+Tab loop, Escape/close-button return focus, breakpoint cleanup. Preserves existing nav markup and CSS. Root must exercise on mobile and while resizing to desktop.

### P1 — Homepage secondary copy has insufficient contrast

Evidence: src/css/home.css uses var(--cream-dim) throughout body copy, sources, navigation and instructions. styles.css defines light cream-dim as rgba(26,26,24,.55). Calculated sRGB contrast is 3.79:1 on #F5F3EF and 3.90:1 on white, below 4.5 for ordinary small text. Most affected copy is 11–16px, sometimes the only explanation of an action. This is especially counterproductive for rushed readers.

Fix: home-only solid muted token with >=4.5 contrast, use it consistently. Root owns CSS. Do not globally change shared legacy appearance by accident.

### P2 — Homepage overflowing tables lack reliable keyboard access or a visible clue

Evidence: src/css/home.css .home-table-scroll has overflow-x:auto; the HTML and JS-generated versions had no tabindex/label/hint. At narrow widths, amounts can be hidden beyond the viewport. Sector report engines already handle this better.

Implemented home.js updateTableHints(): identify actual overflow, add tabindex=0 / role=region / accessible name when needed, insert .home-scroll-hint after each wrapper, update on stage switch, source/report modal, resize and font load. Root adds CSS and visible focus rule for these regions.

### P2 — Focus indicator colors fail in specific theme/surface combinations

Evidence: home.css focus outline uses --accent (#74418F), only 2.70:1 against dark #0C0C0B. re.css:27 uses --re-accent-strong; in dark theme this is light #C6A6DB, but reports/source sheets stay light #F5F3EF, making focus only 1.92:1. Sector paper-muted #77716F on paper is 4.33:1, narrowly below normal text contrast.

Fix: homepage focus uses home-accent; sector light paper/source focus uses dark purple regardless of page theme. Slightly darken sector paper-muted. Root owns CSS.

### P2 — Contact path depends entirely on visitor's email setup

Evidence: homepage index.html:131–132 and all sector contact sections use mailto:info@medici.ai; no form or booking URL. The visible address is a useful fallback, but visitors without a configured handler receive no onsite acknowledgment or alternative submission flow. Main CTA 'Show us your most time-consuming process' does not itself say it opens email.

Recommendation: keep honest visible email fallback and make action say 'Email us ...' until a real booking/form destination exists. Do not invent a backend or a scheduling URL. This is a launch dependency/business choice, not a broken-link claim.

### P2 — Search discovery configuration omits all five new sector pages

Evidence: src/public/sitemap.xml contains only home/faq/about/privacy/terms. New sector links are crawlable in HTML, so pages are not blocked, but sitemap is stale. Update once deployment host is settled (cosimo.work vs medici.ai); keep canonical/sitemap/OG host consistent. No changes made within this agent's ownership.

### P3 — Mobile visual order differs from DOM order in homepage demonstration

Evidence: home.css last mobile override puts .home-output before .home-sources using CSS order; HTML sources still precede output. Keyboard users move from stage selectors down to source file buttons below the visible document, then back into document citation links. Not a blocker by itself, but somewhat disorienting.

Recommendation: browser-test keyboard scrolling; consider DOM output-first with desktop layout placement if the actual interaction feels confusing. Do not rebuild without that evidence.

## Things that already work well in source

- Native <dialog>.showModal() provides baseline modal semantics and focus containment; explicit close buttons and Escape work through platform behavior.
- Sector tables already have overflow hints and keyboard focus when needed.
- Hero rotations have pause controls, screen-reader-readable fixed headings, and stop when out of view/hidden/reduced-motion.
- Hero independent timing/user-approved rotation untouched by this audit.
- All sector report page-number labels use role=status and chapter controls use aria-current.
- Six-page sector reports use actual source attributions and explicit fictional/prewritten disclosure.
- Visible email address fallback exists on all contact sections.

## Validation by this agent

- node --check src/js/home.js passes after changes.
- Static source inspection across six pages and shared report engines.
- Contrast ratios calculated from declared colors and alpha composition, not guessed from screenshots.
- No browser verification by this agent, to avoid interfering with root's browser session.
- Modified only src/js/home.js. No commit, push, merge, dependency additions, or changes to approved typewriter implementation.
