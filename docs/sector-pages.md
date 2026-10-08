# Fund-sector landing pages

## Deep-review revision — current implementation

The initial build/verification notes below are historical. Current layout: sector tabs → animated hero → compact fit statement → three substantive proof scenes → separate themed six-page reader with audience groups → related workflow disclosures → configure/test/review setup → email contact. Decorative lower document previews and giant-C approval section were removed. `re.js` retains the original hero engine; lower workflow disclosures use native details. Sources now vary by sector (RE6, VC7, PE6, credit7, hedge14); see scripts and [deep review](website-audit.md). Metadata/sitemap now target the agreed medici.ai host, with no deployment.


## Brief and design direction — 2026-10-07

Extend the approved `/re` experience to `/vc`, `/pe`, `/credit`, and `/hedge`. Target lean small and midsize fund teams without excluding larger managers. Preserve the established brand and independent two-track headline animation. The user requested research and parallel agents, and expressly prohibits merging.

All pages use the existing cream/plum palette, EB Garamond display type, Space Grotesk body, IBM Plex Mono controls and Chicago COSIMO wordmark. No new fonts, packages, CDN scripts or backend services. Source records and resulting draft documents remain the centerpiece. Industry specificity comes from the actual records, calculations, exceptions and language, not new visual themes.

Layout: sector links → rotating workflow/document hero → recognizable manual task → three source/result comparisons → six-page document reader → four related workflows → human approval → email CTA. Sector links sit outside the original main navigation and footer, preserving their structure. They wrap at small sizes and identify the current page.

## Ownership and implementation

- One agent researches and builds VC and PE; one builds private credit; one builds hedge funds. Each owns only its sector HTML, example JavaScript and research document.
- Root handles build integration, shared behavior/navigation, copy/claims review and browser verification.
- `src/js/re.js` remains the shared interaction engine. New pages provide four headline phrases and workflow document labels through `#fund-page-config` JSON. RE uses its existing defaults. Animation schedules, shuffle, character timing, pause behavior and document transitions are unchanged.
- Each page has its own deterministic example in `src/js/{sector}-report.js`, using the established reader/source-dialog contract and shared CSS. This keeps industry data and commentary independently editable.
- Build hashes and includes every sector script and nested route. Relative root asset URLs support local preview and the existing deployment.

## Research and claim boundaries

See [VC and PE research](vc-pe-research.md), [private credit research](credit-research.md), and [hedge-fund research](hedge-research.md) for sources and specific messaging choices.

The research validates pain points, not Cosimo implementation status. Examples are fictional, prewritten demonstrations of proposed document workflows. They do not establish a tested integration, turnaround SLA, investment decision engine, fund valuation engine or compliance certification. Actual workflow configuration and proof runs remain necessary before making implementation-specific promises to prospects. Public examples identify themselves as illustrative. Human review remains explicit; missing information stays unresolved.

`/credit` is private credit/direct lending, not consumer credit. The fictional managers are Loggia Property Group (RE), Telescope Ventures (VC), Signet Equity (PE and the homepage), Fiorino Debt Partners (private credit), and Anamorphic Capital (hedge). Portfolio companies, properties, and investors retain the Florentine theme; Medici and Cosimo remain the actual company/product names.

## Preview

- http://localhost:3000/re/
- http://localhost:3000/vc/
- http://localhost:3000/pe/
- http://localhost:3000/credit/
- http://localhost:3000/hedge/

Changes are local on `marketing/re-landing-page`; no merge is authorized. Production domain migration and sitemap changes are outside this page-building pass.

## Final review and verification

All four pages completed and integrated. Final copy review simplified the PE variance example to “Explain what drove the shortfall” and the credit walkthrough heading to “From borrower files to your credit review pack.” Reduced hero statement-note top margin from 22px to 12px: the shared inherited layout had a 2px overlap with its footer; all four new cards now have 8px clearance, including at 320px.

- Build succeeds; shared interaction/build scripts and all four new example scripts pass `node --check`; `git diff --check` passes.
- Built-output HTML audit passes for all five sectors: unique IDs, all local asset/link targets, anchor IDs, current-sector link, exactly four hero cards/choices, valid JSON config and matching initial headline.
- Browser exercised all 24 new report sections, all 12 source dialogs, all 16 hero selectors and all 16 workflow disclosure previews. Each document page has substantive visible content, and each source opens the expected sample record.
- Source-to-report buttons reach the intended report section on all four pages. Previous, bottom-next and sample-report reset controls pass. Native Escape closes the source dialog.
- Cross-sector links navigate correctly and preserve theme preference. RE retains its default headline/config and document matching behavior.
- At 320px all four headline choices on each new page fit, all 24 report sections keep page scroll width at 320px, and wide tables scroll inside their own containers. Mobile sector links wrap; 390px reader/hero visually inspected. Desktop 1728px and light/dark visuals inspected. Viewport override reset afterward.
- Browser console contained pre-existing wallet-extension provider conflicts; no page-script errors observed in the inspected output. No dependencies added to work around browser extensions.
- Reduced-motion handling inherited unchanged and code-reviewed; an OS-level reduced-motion override was not exercised in this pass.
- Independent read-only agent review recomputed VC runway/date coverage, PE budget variance, investor ledger movements, hedge linked returns/exposure/NAV movement/cash difference. No substantive arithmetic or period mismatch found.

Research documentation names source dates and separates findings from positioning inferences. The demos remain fictional authored examples, not proof runs of new live sector workflows. No commit, push or merge was performed in this pass.


## Fund naming update — 8 October 2026

| Example | Approved name |
| --- | --- |
| Real estate | Loggia Property Group |
| Venture capital | Telescope Ventures |
| Private equity and homepage product demo | Signet Equity |
| Private credit | Fiorino Debt Partners |
| Hedge funds | Anamorphic Capital |

Applied to all hero documents, 30 sector report pages, letters and signoffs, source record filenames and citations, proof-card monograms, the homepage report and prior-report source, the actual-component app demo and its rebuilt bundle, legacy chat examples, and machine-readable site content. The app fixture is now `product-demo/signet-equity.json`. Research and design documentation use the updated fund identities. Florentine property, company, and LP names remain unchanged; Bellosguardo House is a property, not the retired hedge fund identity.

Verification: rebuilt the product demo and website; scanned 68 source/build text assets with no retired fund identities; checked all website JavaScript syntax and `git diff --check`. Browser checks covered every page of each six-page sector report, all hero brands and proof-card initials, the homepage app and workflow identity, and its three-page report. All five sector pages and document headers fit at 390px with no horizontal overflow.

Follow-up correction: the first rename pass missed the imported register component’s hardcoded “Private equity fund” identity label. The demo build now binds that label to the Signet Equity fixture, sharing the same name as the side panel. Verified the rendered register, expanded fund panel, workflow, and report on the All funds page. Future naming checks must inspect generic identity placeholders in imported components as well as search for retired proper names.
