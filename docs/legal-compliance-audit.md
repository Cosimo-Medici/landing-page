# Website legal and accessibility release review

Reviewed 14 October 2026 on `ecp/add-founders`. Scope: twelve marketing routes, structured data, public summaries and the embedded exported example. Three independent reviewers covered accessibility, privacy/terms and marketing/financial claims. This is a remediation record, not a legal opinion or assurance against litigation.

## Implemented and verified

- Accessibility: skip links/main focus, contrast/focus/target safeguards, persistent animation pause, keyboard-operable example records and repaired nested example buttons. All twelve pages passed automated scans in both themes; the original eleven also received manual narrow-viewport and increased-text-spacing checks. See [accessibility audit](accessibility-audit.md) for evidence and limits.
- Privacy/terms: actual browser storage disclosures, local font delivery, clear request/appeal routes and authorized-agent guidance; Google merger-transfer consent correction; unsupported assessment assertion removed; statutory rights and fictional-example boundaries clarified. The animation preference added during this audit is also disclosed.
- Claims: daily client use is distinct from synthetic fund validation; visible FAQ and JSON-LD stay aligned. No public client identities added. See [marketing audit](marketing-legal-audit.md).
- Serving configuration now adds MIME sniffing protection, cross-origin referrer limits, embedding/object/base restrictions and disabled unused sensitive browser permissions. `serve.json` headers verified with local `serve 14.2.6` using the deployment's serving configuration. The policy restricts scripts, connections, frames and fonts to the same origin, disallows object embeds and form submission, and retains inline styles needed by the existing UI. HTTPS persistence and same-origin framing headers are included. Explicit routes prevent clean-URL redirects from breaking the embedded example; directory listings are disabled.
- Final build, six theme tests, three live-HTTP regression tests, JS syntax and whitespace checks pass. Axe-core 4.14.0 ran 24 scans (12 pages × 2 themes), including the embedded example in the homepage: zero rule violations after repairs. Raw scan results are stored in accessibility-scan-results.json. Automated results cover rendered default states; interactive dialogs, panel focus and mobile navigation were checked separately. Source checks validate main/H1/image alternatives/unique IDs. Browser checks exercised skip link, FAQ exclusivity and example keyboard controls.

## Operational ownership and maintenance

1. Continue assistive-technology coverage with VoiceOver/Safari and NVDA/Firefox and repeat checks after deployment. Keyboard interactions and reflow with increased text spacing have been verified; automated checks do not replace every assistive-technology combination.
2. At the owner’s direction, the blanket 90-day deletion statement was removed from the website. Client platform retention/deletion is governed by the applicable service agreement, documented client instructions and law. Website inquiry/technical data has a purpose-based retention explanation, with statutory rights preserved. Product operations must implement the actual contractual retention terms; this edit does not amend client agreements. AWS Bedrock configuration supports part of the no-training statement; other provider paths still require operational evidence.
3. Engineering/Google/counsel assessment of Google-scoped data in private-credit/lending workflows. Google's Limited Use restrictions apply to actual processing, not just the wording on a website.
4. Counsel/business data map for applicable state privacy laws, rights handling, legal entity/venue/liability terms and actual financial-service activities. Applicability depends on revenue, data volumes, relationships and activities not established here. Privacy and marketing reports list specific authorities and facts needed.
5. Current live `https://cosimo.work` returned 200 with valid HTTPS; HTTP redirected to HTTPS. The live version did not return the new security headers at audit time because these edits are local and unpublished. `www.cosimo.work` did not resolve in the live check; configure it if advertised. Production hosting/CDN logs or future integrations need a separate runtime disclosure check.

Do not describe the site as compliant with every US law, certified accessible, or lawsuit-proof. Preserve the findings and repeat relevant checks whenever content, workflows, vendor processing or the exported demo changes. No client-identifying details may be published anywhere in the website.

## Repeatable checks

With the built site served on port 3002 using `serve.json`:

```sh
npm run build
node --test tests/theme.test.cjs tests/site-http.test.cjs
python3 scripts/check-accessibility.py
```

The HTTP tests fail if the server is unavailable and check real routes, script/font delivery, external resource avoidance, security headers, private-file/directory exclusions and visible FAQ/schema agreement. The axe checker ran only in a separate local QA copy and is not shipped to visitors.

## Review records

- [Accessibility](accessibility-audit.md)
- [Privacy and terms](privacy-legal-audit.md)
- [Marketing and financial boundaries](marketing-legal-audit.md)
- [Messaging evidence](messaging-consistency-audit.md)
- [DOJ website accessibility guidance](https://www.ada.gov/resources/web-guidance/)
- [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [FTC privacy and security guidance](https://www.ftc.gov/business-guidance/privacy-security)
