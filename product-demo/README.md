# Actual Cosimo component demo

The homepage embeds a static React bundle built from the application's own components and stylesheet. It does not recreate their visual design in marketing CSS. The iframe isolates production typography, Tailwind utilities, tokens, controls, and layouts from the surrounding website.

The current excerpt includes the real company register, attention queue, figure panel, workflow transcript, step rail, breadcrumbs, and file cards. It crops out the authenticated application's global sidebar/composer. Fictional presentation inputs drive it; it has no live agent, account, backend connection, or approval/sending operation.

## Regenerate

With the `ecp/dashboard-feeds` frontend checkout and its existing dependencies available:

```sh
node product-demo/build.mjs /absolute/path/to/cosimo/frontend
npm run build
```

The default frontend path matches the local monorepo worktree arrangement. No package installation or environment-file loading occurs. Normal website builds only copy `src/public/product-demo`; they do not need the application checkout.

`build.mjs` imports the real `app/app.css` and registers the full application source with Tailwind. Omitting that explicit source registration drops utilities and breaks visual fidelity. It relocates font URLs for the nested static path and copies the actual font files. It adds no product-style overrides.

## Source ownership

- `main.tsx`: demo data/provider wiring; imports production `PortfolioRegisterRoute`, `QueueStrip`, `SidePanel`, `PortfolioPanelProvider`, and `VerticalProvider`.
- `WorkflowDemo.tsx`: authored state sequence around production `Wf3TranscriptView`, `Wf3Rail`, `Wf3Crumbs`, and `Wf3Chip`; the run-header container uses the production header classes. The full authenticated run shell is outside this excerpt.
- `signet-equity.json`: fictional company data adapted from the app's PE snapshot. LTM figures at September 30 are distinct from the Q3 reporting example; captions explicitly name both periods. No client data or credentials are included.
- `styles.css`: import entry only. The actual app stylesheet, DM Sans, IBM Plex Mono, Chicago font, and component classes are authoritative.
- `src/public/product-demo`: generated deployment artifact, intentionally stored with the static website for independent hosting.

The parent page controls scene/phase/theme through same-origin, source-checked messages. File opening sends a message back to the existing report reader. Native company expansion, sorting, figure inspection, and transcript disclosure remain actual component behavior. Backend-only Ask and run-navigation actions display a demo notice; they never initialize live backend hooks or pretend to send anything.

On narrow screens the product retains native readable dimensions inside a horizontally scrollable viewport. Do not squeeze it into a restyled mobile imitation. User-triggered playback is pausable; reduced motion removes automatic progression. Demonstration timing and file metadata are illustrative, not measured production performance.

Reference app revision when built: `ce730ac7` on `ecp/dashboard-feeds`. Refresh this bundle when the corresponding production UI changes.

The register route’s hardcoded asset-class eyebrow is bound to `signet-equity.json` → `org` during the demo build. Its markup and styling remain the production component’s. This adapter fails if the upstream label changes; the application checkout is not edited. Both the register identity and side panel read the same fixture name.


## Numeric dataset — October 2026 audit

The register, workflow, source records and three-page report use the same six Signet Equity companies as `/pe/`, at September 30, 2026. Q3 revenue is $70.0M against $72.0M budget; EBITDA is $9.6M against $10.4M budget. The only deliberate disagreement is explicitly labeled: Fiesole accounts revenue $9.0M versus an earlier sales update’s $9.4M. The draft provisionally uses the accounts.

The dashboard shows LTM revenue $280.0M and EBITDA $38.4M (budget $40.5M, variance −5.2%). Its six-month sparklines contain April–September monthly EBITDA; each last-three-point sum matches that company’s Q3 EBITDA. Each LTM EBITDA figure is supported by four quarterly inputs in its fact panel.

Company equity values total $210.48M against $153.00M invested (1.38× gross unrealized MOIC). Each equity mark is `(LTM EBITDA × valuation multiple − net debt) × fund ownership`; net leverage is `net debt / LTM EBITDA`. Fund NAV is $210.48M + $12.90M fund cash − $2.10M liabilities = $221.28M. Company `% of NAV` uses this fund NAV denominator; company cash is not added to fund NAV twice. This NAV is distinct from the PE page’s capital-movement worksheet, which explicitly excludes valuation/income/expense adjustments.

The adapter preserves production markup/styling while naming the debt cell **Net debt**, clarifying **LTM vs budget**, filling the portfolio’s EBITDA-budget variance and aggregate net leverage (2.83×), and using **Cash-generative** for companies where burn-based runway is inapplicable. Non-subscription businesses explicitly show **Not applicable** in ARR, with an inspectable explanation. An empty Open cell means no finding, not missing financial data. The generic production footer’s blank trend/package fields are non-additive metadata, not missing totals.

All companies now have sourced numeric chains, valuation and covenant math, monthly history, entry value, liquidity breakdown, debt terms, board dates, named key people, an add-on already included in invested cost, and specific review findings. No real application checkout is modified. The fixture does not claim unsupported IRRs or carry calculations.
