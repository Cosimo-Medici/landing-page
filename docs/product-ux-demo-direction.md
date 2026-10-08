# Product UX demonstrations — 8 October 2026

Status: homepage now imports actual product components and stylesheet. The initial visual reconstruction was rejected and replaced; sector rollout remains a subsequent step.

## Brief

The user identified that the website presents operational interfaces as paperwork. Gathering fund figures, inspecting missing submissions, and monitoring a process should look like software; the resulting report should look like a document. Inspect the dashboard branch and workflow designs, use the existing fictional Signet Equity data, and discuss the direction before building. The user explicitly requested subagents to protect context and improve quality.

Three read-only research lanes covered dashboard implementation, workflow implementation, and the current website examples. The parent reviewed saved application screenshots and synthesized the findings. Application source was inspected on `ecp/dashboard-feeds` at `ce730ac7`; marketing source was at `6272049`. This was not a new live-service or browser validation. The canonical memory index was unavailable on this machine.

## Why the current examples feel like paperwork

- Homepage `src/index.html:99–113` puts all three stages inside a Draft/Internal review wrapper and `.home-paper` articles. `src/css/home.css:62,78` adds paper shadows and rotation even to gathered data.
- `src/js/home.js:207–218` switches authored stage panels. It does not demonstrate the application's interactions.
- All fifteen sector examples pass through paper-styled `resultCard()` rendering (`src/js/re-report.js:125` and sector equivalents), including operational queues and exceptions. Shared treatment lives in `src/css/re.css:150–156`.
- Existing sources, arithmetic, and multi-page reports remain valuable. Change the presentation of work, retaining documents as sources and final outputs.

## Recommended first prototype

Build one homepage walkthrough, then review it before propagating the pattern to RE and the other sectors. Keep one recognizable Cosimo workspace and fund identity throughout.

| Beat | What the visitor sees | What it communicates |
| --- | --- | --- |
| Your fund, together | A focused view of the real Overview/Companies interface with Signet Equity figures and record status | This is a workspace where the team can see the fund |
| Inspect a figure | Select a figure; its real docked detail panel reveals inputs and source records | The numbers have an inspectable basis |
| Follow the work | The actual run interface shows the reporting task and a specific unresolved question | Cosimo does work and brings decisions back to the team |
| Open the result | A report output opens from the run into the existing full report | The work produces a usable deliverable |

The first two beats can sit within the existing first step rather than adding four mandatory navigation steps. Preserve the step-1 initial state. Keep the discrepancy inside the detailed walkthrough: prior user testing established that unexplained conflicting figures are distracting and confusing in the hero.

Homepage data remains consistent: Arno revenue 12.4m vs budget 12.0m; Pitti 8.6m vs 9.0m; Fiesole 6.0m vs 6.5m; total 27.0m vs 27.5m. The Fiesole email's 6.4m remains an unresolved conflict. Do not animate an invented resolution or a completed approval. Preserve the three-page draft and source drill-downs.

## Verified dashboard building blocks

Application paths below are relative to the parent monorepo, not this marketing checkout.

| Component | Source | Suitable demonstration |
| --- | --- | --- |
| Overview and fund tiles | `frontend/app/routes/application/portfolio-overview.tsx:95`; `frontend/app/components/portfolio/overview/TilesRow.tsx:26` | A fund-level view and selected headline figure |
| Clickable figures and supporting inputs | `frontend/app/components/portfolio/RichFactChip.tsx:39`; `frontend/app/components/portfolio/SidePanel.tsx:55` | Open a value's calculation, inputs, sources, and producing run |
| Attention queue | `frontend/app/components/portfolio/Queue.tsx:61,183,297` | A named issue, its consequence, and next action |
| Property register and details | `frontend/app/components/portfolio/register/PositionsTable.tsx:138,345` | Select a property, inspect performance and missing/current records |
| Investor details | `frontend/app/components/portfolio/investors/InvestorDrawer.tsx:22,130,188,253` | Capital calls, side letters, tax forms, correspondence |
| Statements | `frontend/app/components/portfolio/statements/ReStatements.tsx:652` | Fund/by-position and consolidated/at-share views |

Preserve the application's dark sidebar, purple selection, compact tables, top attention bar, dashed-underlined figures, and right detail panel. App typography is ChicagoFLF, IBM Plex Mono, and DM Sans; app surfaces use a pale lavender background, white panels, and purple accents (`frontend/app/app.css:15–79`). Keep the website's approved exterior styling. Resolve the marketing repository's no-new-font constraint explicitly when choosing capture versus reconstruction; do not silently substitute fonts or add dependencies.

Saved captures inspected: `dashboards/screens/pairs/ardsley-overview.png`, `positions-re-drawer-app.jpg`, `shell-3-chain-app.jpg`, and `shell-2-sheet-app.jpg`. Full-screen queue captures are too dense for a marketing inset: show a relevant row and its detail at readable scale.

## Verified workflow building blocks

The current run view uses a transcript and a shared right panel, not a document page or a workflow-builder graph. The parent and workflow agent inspected these source paths:

- `frontend/app/components/wf3/RunView.tsx:663–675` configures the shared panel's Workflow tab. The header shows workflow/run identity and status; the transcript receives step state, run state, input callbacks, file-opening callbacks, and live work (`:778–795`).
- `frontend/app/components/wf3/RunPanel.tsx:269–302` embeds the real step rail and its click-to-step behavior within the shared panel. Viewer/Files/Cloud belong to that shared panel; do not reproduce the older standalone file-panel layout as the current design.
- `frontend/app/components/wf3/transcript/rows.tsx:68–98` renders live work and tool activity; `:108–137` renders the active step and waiting-on-a-person state. Select the smallest readable portion for the demo, rather than exposing the full technical transcript.
- `RunView.tsx:800–820` contains provider-action approvals and the run composer. These are not a universal approval of every report; do not invent a generic approval gate.
- `transcript/rows.tsx:175–207` uses the shared file card and checks real file identity and availability before allowing preview. `RunView.tsx:632–635` opens the identified file in the real viewer. This is the strongest implemented bridge from process to document.

Suggested run scene: named quarterly-report task → relevant active step and short work summary → a clearly identified unresolved question → report file card → viewer. Preserve unresolved findings in the draft rather than making the animation silently resolve them.

## Apply by fund type

| Page | Software to show | Documents to retain |
| --- | --- | --- |
| RE | Property figures, package coverage, selected issue, reporting run | LP commentary and six-page report |
| VC | Company submission dates, cash/burn/runway, missing-data follow-up | LP report; unsigned financing remains excluded |
| PE | Actual/budget company table, variance evidence, unresolved operating-plan question | Portfolio commentary and report |
| Credit | Borrower coverage, adjustment-support review, cash versus PIK | Draft borrower reminder and credit report |
| Hedge | Return-version status, open cash exception, supported versus held allocator answers | Investor letter and DDQ responses |

Preserve established calculations and uncertainty. RE: eight properties, four of eight manager updates, Arno/Pitti Q3 NOI 440k/393k, combined 43k improvement. Credit: 48m debt against 9m/10m EBITDA remains a conditional adjustment review, not an automatic covenant verdict. Hedge: 125k cash difference stays open; approved 2.10% and preliminary 1.90% remain distinct versions.

## Implementation boundaries found in research

- Dedicated dashboard verticals currently exist for RE and PE only (`frontend/convex/portfolio.ts:39–43`). VC/Credit/Hedge specialist views would be adaptations of verified patterns, not captures of existing sector dashboards.
- Dashboard data can come from a saved snapshot or the facts/findings/assets store (`portfolio.ts:46–65`). Distinguish authored demo state from a recorded live run.
- Dashboard draft-review Send currently emits a toast and closes the panel (`SidePanel.tsx:225–228`). Do not use it as evidence of delivered email.
- Dashboard figure corrections use session state (`panel-context.tsx:81–89`), not demonstrated persistent writes.
- The Overnight card exists, but the RE store return does not currently supply its ledger (`buildVerticalFromStore.ts:617–652`). Prefer the actual run interface when showing work in progress.
- Statement source facsimiles are reproductions. Do not label them as captured source-file viewers.
- `dashboards/briefs/PARITY.md` is a historical gap inventory; current code and subsequent U9–U14 work supersede it.

## Interaction and quality criteria

- Use faithful captures or small reconstructions of verified product components; avoid inventing a new marketing-only dashboard. Decide the technique for the first prototype before extending it everywhere.
- One understandable action per animation beat. Let visitors pause, replay, and inspect; honor reduced motion. Never skip the opening state before it is visible.
- Crop and recompose on mobile instead of shrinking a full desktop dashboard into illegibility.
- Keep fund, period, figures, status, source, and output consistent across every view.
- Preserve source access and full report readers. Documents are the payoff, not the visual treatment for every step.
- Keep a clear demo-data disclosure and avoid implying that fast animation is measured execution time.
- First acceptance question: can a new visitor identify what is software, what Cosimo is doing, what needs their input, and what they receive?

No application code, website code, tenant data, or running processes changed in this research pass. No commit, push, merge, or deployment requested or performed for this proposal.

## Initial homepage implementation — rejected visual approximation

The user approved implementation on the working preview. Replaced the homepage walkthrough's paper-styled input/check panels with a full-width product workspace in `src/index.html`, `src/css/home.css`, and `src/js/home.js`.

- Three visitor-controlled scenes: See your fund, Follow the work, Open the report. The first scene stays selected on a fresh load.
- Overview shows the existing three-company actual/budget dataset. Clicking revenue opens a docked calculation/source panel; on small screens that panel replaces the dashboard content at readable scale.
- The Workflows scene uses a run header, conversation, progress rail, and source-linked question. The discrepancy remains unresolved.
- The output appears as a file card alongside a report preview. The card opens the existing complete three-page report. All three authored source records remain available.
- User-started playback has six beats: overview, figure detail, reading activity, matched commentary, the outstanding question, then the draft file. Pause/resume preserves remaining time. Leaving the viewport or hiding the tab pauses playback. Reduced motion removes timed playback and animation; switching it on mid-tour reveals the complete current scene.
- The embed uses the real light app background, charcoal sidebar, purple selection, Chicago headings, and IBM Plex Mono figures. Space Grotesk remains the interface body font under the site's existing no-new-font rule; this is a simplified reconstruction, not a pixel-identical capture. Disclosure identifies fictional records and prewritten outputs.
- Existing hero, independently cycling headline, theme preference, sector pages, and report/source content remain intact.

Independent source review corrected navigation terminology, number typography, app palette, a premature mobile progress label, and a reduced-motion transition edge case. Browser inspection covered desktop light/dark, 390px and 320px widths, opening/closing figure detail, sources, Escape dismissal, complete report access, initial state after reload, and playback pause/resume. No horizontal page overflow observed at either mobile width. Reduced-motion behavior was checked in source; browser media emulation was not used.

Validation: static build, JavaScript syntax check, whitespace check, and all six existing theme tests passed. This is a local authored demonstration, not a fresh end-to-end run of the underlying fund processes. No app backend, tenant state, dependency, or external publishing changed.

## Actual component implementation — 8 October 2026

User correction: the demo must look exactly like the actual app; an approximation is unacceptable because customers must recognize the same product when they enter the application.

Removed the invented app sidebar, cards, panel, transcript, and their CSS. The homepage now embeds a bundle importing the real company-register route, attention queue, side panel, workflow transcript, step rail, breadcrumbs, and file cards from the dashboard branch. It loads the untouched application stylesheet and actual fonts; website styling cannot bleed into the iframe. Only presentation data and demonstration controls are authored. The visible product is a focused excerpt, not the entire authenticated app shell.

Build sources and reproducibility details are in [product-demo/README.md](../product-demo/README.md). The generated bundle is stored in `src/public/product-demo` so ordinary marketing builds remain independent of the app checkout. App component source was not modified. No new dependencies installed; environment-file loading disabled. The build explicitly registers production files with Tailwind after visual QA caught missing utilities in the first export.

Data: three Signet Equity companies; original typed LTM metrics remain labeled LTM, while the Q3 report retains 12.4/8.6/6.0m revenue and its unresolved discrepancy. The company descriptions and the attention queue connect to that Q3 story. Period differences are explained in the scene caption. The actual backend-dependent Ask and run links are guarded with a demo notice; no fabricated sends or live backend calls occur.

Browser verification covers production styling, native figure-panel opening, run-step expansion, transcript disclosures, output-card access to all three report pages, and the guarded Ask control. The parent theme is forwarded to the app's native dark-mode class without changing the selected view.

Final checks: full six-beat playback reached the actual report card and stopped; native company heading computes to ChicagoFLF at 24px; 390px and 320px parent pages have no horizontal overflow (the exact-size product excerpt scrolls within its own viewport). Both app themes inspected. Static site and component builds pass, homepage JavaScript syntax and whitespace checks pass, and all six existing theme tests pass. Temporary frontend demo-entry files were removed after moving the reproducible entry into this marketing repository. No production application component was edited. Screenshot: `/private/tmp/cosimo-deep-audit/home-actual-product-components.png`.


### Direct report display

The final homepage scene now shows the full three-page report inline as soon as visitors select “See the report” or playback reaches that step. The actual app UI remains in the portfolio and reporting-task scenes; the deliverable itself is a document. The inline view reuses the existing report markup, with no file-card click or modal required. It starts at page one on each visit, supports scrolling through all pages, and adapts to narrow screens.
