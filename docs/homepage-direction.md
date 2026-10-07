# All-funds homepage — 7 October 2026

## Deep-review revision — current implementation

The hero now pairs the unchanged independent typewriter with a linked fictional source conflict and report preview, replacing the decorative C. Setup identifies fund operations software and the administrator/finance handoff. Fiesole’s delayed launches are no longer asserted to explain an unsupported dollar variance. The third source is labeled “Prior report outline.” All10 routes now have consistent medici.ai metadata/sitemap; live hosting is unchanged. See [deep review](website-audit.md) for evidence and limits.


## Purpose and agreed direction

The homepage should make a complete commercial case without requiring a visitor to select a fund type. The sector pages provide the fund-specific documents, metrics, and workflow detail. Repeat the core promise and contact action; avoid five abbreviated sector pitches on the homepage.

Keep COSIMO branding, the existing cream/charcoal/purple palette and four font roles, and the independently randomized two-line headline. Add All funds / Real estate / Venture capital / Private equity / Private credit / Hedge funds navigation to all six pages.

## Implemented structure

1. Fund navigation and "Grow your fund. Not your workload." Hero describes investor reports, portfolio updates, and investor requests. Independent headline tracks retain the original shuffle, character timings, 8/11-second cycles, initial delays, and shared quiet-window coordination. Pause, visibility, and reduced-motion handling follow the sector implementation.
2. One interactive reporting demonstration: source records, conflicting figures, draft report. Starts at step 1, “Gather the records” (updated after user feedback on 7 October 2026). Visitors can inspect each step, replay the progression, open three source records, or read a three-page draft. Mobile puts the result directly below the step controls.
3. Three recurring jobs: investor reporting, portfolio updates, investor requests. Concrete examples and links to sector pages.
4. Practical fit: existing records, reporting format, source review, and team approval.
5. One-process contact invitation. Primary hero action opens the reporting example; the secondary action scrolls to contact. The final button explicitly opens a prefilled email to info@medici.ai. No message is sent automatically.

The main navigation and footer retain their structural layout. Existing sector demos and headline engines remain unchanged. The old homepage script and demo data remain in the repository but are no longer loaded on the homepage; its new script has no CDN dependencies.

## Example records and arithmetic

All records are authored, fictional examples, disclosed as such. Renaissance Capital's example is a company-portfolio report, not an assertion that every asset class uses revenue as its headline metric.

| Company | Q3 revenue ($m) | Budget ($m) | Variance ($m) |
| --- | ---: | ---: | ---: |
| Arno Systems | 12.4 | 12.0 | +0.4 |
| Pitti Packaging | 8.6 | 9.0 | -0.4 |
| Fiesole Services | 6.0 | 6.5 | -0.5 |
| Total | 27.0 | 27.5 | -0.5 |

Source workbook dated 3 October. Commentary email dated 4 October. The email states $6.4m for Fiesole, creating an unresolved $0.4m discrepancy. The draft provisionally uses the workbook's $6.0m and explicitly requires confirmation. Delayed launches have no confirmed revised dates. No recovery forecast is invented. Prior-quarter report supplies format conventions only.

The report contains portfolio overview, company performance, and internal review notes. It remains an internal draft pending resolution and approval.

## Claims and scope

Removed the old homepage's unsupported quantified turnaround claims, audit-ready guarantee, technical/security absolutes, and inconsistent free/one-quarter/two-quarter pilot terms, including structured data. No change to pricing or commercial terms was made. The subsequent agent audit aligned FAQ, About, and machine-readable summaries with the current offer. Privacy and Terms legal text remains unchanged and needs application/owner verification before launch. Canonical domain migration remains separate from this local preview.

## Validation

Build, JavaScript syntax, and whitespace checks pass. Browser checks cover all three walkthrough stages, three source dialogs, full three-page draft, Escape dismissal, replay, mobile menu closure, and round-trip navigation to all five sector pages. Desktop light/dark and 390/320px mobile inspected. At 320px the document width is 320px and the report dialog has no horizontal overflow; tables use local overflow containers. Dark accent text is lightened within the established purple palette. Temporary viewport overrides reset. Browser console messages observed were from wallet extensions, not the site.

No merge or deployment performed. Changes remain on marketing/re-landing-page for review.

## Subsequent audit

The independent reviews and implemented corrections are documented in [website-audit.md](website-audit.md). Those findings supersede initial copy and interaction choices described above where noted.

## Homepage example clarification — 7 October 2026

User feedback: the $6.0m ≠ $6.4m hero example was interesting once explained, but its meaning was not obvious. Retained the discrepancy story and replaced the mathematical shorthand with a plain-language premise and individually labelled sources: accounts versus management update, for the same company and quarter. The report now explicitly says Cosimo spots the mismatch and flags the $400,000 difference for the team to resolve before investors see it. Both cards use normal document flow so the explanation cannot be hidden behind the report. Existing fictional-example disclosure remains. Build and whitespace checks passed; visually checked desktop and 390px mobile, including light and dark themes. No merge or deployment.

## Customer-language CTAs — 7 October 2026

User feedback: “workflow” is internal jargon; speak in terms of the client’s frustrating work. The email CTA now reads “Email us about your worst process” across the homepage and five fund pages. Hero contact links say “Tell us your worst process”; reader contact links say “Tell us what takes too long.” Homepage contact copy asks which monthly job the team dreads. Email drafts use “Our worst process” as the subject, with prompts for the task, the pain, and the fund type (prefilled on sector pages). Shared navigation now says “Getting started,” and nearby setup language uses concrete tasks and reports. These are customer-language changes; technical workflow identifiers remain unchanged. Build and whitespace checks passed; all six email drafts and CTA labels verified, plus desktop and 320px homepage/RE contact layouts. No email sent, merge, or deployment.

## Automatic daylight theme — 7 October 2026

Requested: choose light during the visitor's day and dark after sunset, across the site.

Implemented one shared `src/js/theme.js` controller on all ten routes, loaded synchronously in the head before styles/body. It estimates daylight from the browser's IANA time-zone representative coordinates and the current date/UTC instant. The bundled coordinates come from the public-domain IANA tzdb `zone.tab` shipped on the development Mac; calculations follow [NOAA's solar-position equations](https://gml.noaa.gov/grad/solcalc/solareqns.PDF), including the 90.833° sunrise/sunset horizon correction. No geolocation prompt, IP lookup, external request, or new package. Browser-recognized canonical aliases are included alongside the zone names.

This is a time-zone approximation, not precise visitor-location sunset. Large time zones can differ noticeably from the representative city. Unknown zones use local 07:00–19:00 as daytime. JavaScript-disabled pages retain the existing light fallback. Seasonal daylight, DST, leap years, date-line crossings, and polar day/night are accounted for by calculating solar elevation at the current UTC instant.

Automatic mode checks once per minute while visible and immediately when a tab returns. Existing `medici-theme` manual choices still win, are shared across pages/tabs, and remain usable if storage is blocked (for the current page visit). Automatic choices are never saved as manual preferences. Removed duplicated theme handlers from homepage, sectors, and supporting-page chrome. The unused legacy `main.js` is unchanged.

Validation: `npm run build`; `node --test tests/theme.test.cjs` (six tests including 17 location/date cases, transitions, persistence, blocked storage, and all ten built routes loading the hashed script before styles); JS syntax and whitespace checks; live localhost browser verified homepage toggle, RE persistence/toggle, and supporting-page persistence in both themes. Preview only; no merge or deployment.

## Consistent theme toggle placement — 7 October 2026

Moved the five fund-page theme controls out of the header to match the homepage and supporting pages: the same circular 44px button, fixed 24px from the bottom-right edge. All ten routes now use the same class, icon, and shared controller; removed the obsolete sector-only button styles. Saved manual overrides and automatic daylight selection are unchanged. Build and existing six theme tests passed; checked all ten built routes have exactly one shared control. Browser verified matching desktop/mobile placement, both themes, and no overflow at 390px.

## Replace the opening discrepancy story — 7 October 2026

User testing supersedes the earlier “Homepage example clarification”: several people focused on the conflicting revenue figures without understanding their relevance to Cosimo. More explanatory wording had not solved the problem. The hero was asking visitors to interpret an accounting exception before establishing the product's purpose.

Replaced that entire illustration with one request-to-deliverable sequence: “Draft this quarter’s investor report.” → “Cosimo drafts it from your records.” → an investor-report cover with recognisable sections. Retained the established cream/charcoal/purple palette and serif/sans/mono roles. Straight alignment and a subtle paper stack replace tilted, competing cards. No new animation; the independently rotating headline remains the visual movement. The report link opens the existing walkthrough, and the illustration is explicitly labelled. The $6.0m/$6.4m discrepancy remains in the detailed example, where the user says it works well. Removed obsolete hero-preview CSS.

Validation: production build and whitespace checks passed. Browser inspected desktop light/dark, mobile at 390px and 320px with no horizontal overflow. The new link scrolls to the walkthrough under the navigation; its full three-page report still opens. No JavaScript behaviour changed. This is a revised design for user review, not a claim of conversion improvement. Local preview only; no merge or deployment.

## Walkthrough starts at step 1 — 7 October 2026

User correction: the report walkthrough must start with gathering records, not jump ahead to the finished draft. Changed the initial HTML selection, visible panel, stage attribute, count, heading, description, and output label to step 1. The initial state is correct before JavaScript runs as well. Manual step selection and replay retain their existing behaviour. Built and checked in the browser, including clicking through steps 2 and 3 and reloading to confirm step 1.
