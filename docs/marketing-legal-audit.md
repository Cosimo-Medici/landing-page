# Marketing and financial-boundary audit — 14 October 2026

Scope: all public marketing HTML, JSON-LD, machine-readable summaries, authored sector reporting scripts, homepage fictional data, and bundled product-example shell. This review concerns this local website version, not legal approval of the deployed business or its services.

## Corrected

The FAQ question “Has Cosimo been tested on real fund work?” could imply that the cited synthetic fund validations were live fund-client results. It now asks “Is Cosimo in use, and how has it been tested?” Daily production use and synthetic-fund validation remain distinct in the answer. The separate missing-information answer now explicitly identifies the tested report as synthetic-fund work. Visible text and FAQ JSON-LD match.

## Findings retained

- Homepage and all five sector pages identify fictional records and illustrative/prewritten outputs close to the examples. Figures are demonstration content, not offered fund performance or client results. Sector drafts preserve incomplete financial-reporting scope and team sign-off. Credit agreement interpretation and investment decisions remain with responsible people.
- No customer endorsements, review ratings, invented customer testimonials, client names, or promises of investment returns found in the marketing site. Founder portraits represent named founders rather than endorsers; do not reuse them as purported independent testimonials.
- No universal accuracy, processing-time guarantee, cost-savings metric, regulatory-compliance certification, SOC 2 certification, or SEC approval found. SOC 2 is explicitly a roadmap item. Public measured validation claims are qualified as specific synthetic-fund results, separate from website walkthroughs.
- Evaluation describes model usage at cost without markup separately from agreed platform commercial terms. It does not present the entire service as free or as costing only model usage. Keep that distinction in offers and contracts.
- About and FAQ describe internal operating software alongside administrators/accountants, with accounting, valuation, professional sign-off and investment decisions remaining with their responsible people. Terms already explains general information is not financial, legal or professional advice. No extra blanket disclaimer was needed.

## Evidence owner must retain before publication

FTC substantiation is required before advertising, including reasonable implied claims. Preserve dated underlying synthetic-run outputs/source spreadsheets, test reports and script counts, and records supporting daily production use. The October deck is the supplied claim source; an audit of copy alone does not independently reproduce its 83-script/1,822-test or nine-of-ten process results. Keep biographies (especially youngest/largest superlatives), provider support, no-training promises, corporate status and at-cost billing tied to verifiable records. Do not identify clients in public evidence files.

A software description does not itself establish that the company is outside investment-adviser, broker-dealer, tax-practice or fund-administration regulation. Actual paid recommendations, execution, custody and delegated responsibilities determine applicable obligations. If the offered service expands into securities advice or investment management, obtain a scope-specific legal assessment before advertising it. SEC marketing-rule hypothetical-performance requirements apply to advisers registered or required to register with the SEC; this site currently presents fictional operating-software examples, not an investment offering. Do not use this distinction to exempt future advisory services.

## Primary authorities checked

- [FTC advertising substantiation policy](https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation): reasonable basis before dissemination for express and implied objective claims.
- [FTC advertising FAQs](https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business): objective supporting evidence and deceptive-advertising standards.
- [FTC consumer reviews/testimonials rule Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers): fake testimonials and misleading actors/avatars.
- [SEC adviser regulation overview](https://www.sec.gov/files/divisions/investment/iaregulation/memoia.htm): compensated business of securities advice/analyses and applicability.
- [SEC investment-adviser marketing guide](https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/investment-adviser-marketing): covered advisers, hypothetical performance and advertising controls.

Privacy, contract terms, accessibility and operational/security verification are separate audit workstreams. No statement that all US laws are satisfied or that litigation is impossible is justified by this review.

## Second-pass remediations and asset review

Replaced homepage JavaScript’s rotating coffee/jiffy/same-day timing promises with the same review, records and reporting-format wording already approved on the sector pages. This catches copy that is absent from static HTML snapshots. `node --check src/js/home.js` passes.

Confirmed retired `main.js` has no HTML consumers; its old timing/capability language should not be published. The build owner removes that dormant script and the retired demo-data payload from published assets. These source archives are not evidence of current product behavior.

Inspected exact shipped font binaries’ OpenType `name` records rather than assuming a license from their filenames. Both ChicagoFLF copies carry Robin Casady’s explicit public-domain statement (name IDs 0 and 13). All four bundled OpenDyslexic fonts embed the copyright and full SIL OFL 1.1, whose condition 2 expressly permits notices in viewable binary metadata. Dream Orphanage v2.007 contains only a Typodermic copyright statement and no supporting license in the repository; it has no CSS/HTML consumer. Build owner removes its unused publication, without changing the site’s typeface.

The rebuilt product-example JavaScript inspected in this pass contains no private client identity, founder contact detail, client sector/location description, recognizable secret-key marker, live application endpoint, stale timing phrase or regulatory-certification claim. URL literals were documentation/library references. Homepage and sector authored scripts contain no private source URLs. This is a source-content check; production network requests are verified separately.

[OpenDyslexic’s publisher](https://opendyslexic.org/) confirms commercial/web use under OFL. [Typodermic’s current licensing guidance](https://typodermicfonts.com/license/) distinguishes desktop and web licensing; no inference that an unverified desktop font may be served as a web font was made.
