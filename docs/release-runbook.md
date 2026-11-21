# Website release: buyer tools and articles

The release set lives in `release/`. `scripts/build-release.cjs` generates it from
private inputs. `build.js` copies a page into `dist/` and the sitemap only when its
`ship` flag in `release/manifest.json` is `true`. Regeneration keeps each flag.

## Release state (20 November 2026)

| Page | Ship | Reason |
| --- | --- | --- |
| `/reverse-demo/` | true | Workflow request with email enquiry. |
| `/spot-the-error/` | true | Fictional exercise; answers stay in the browser. |
| `/insights/sequoia-permanent-capital/` | not generated | Provenance fails. `weekly/2026-11-16/delivery.json` changed to revision 4 (pick 3 revised; pick 2 title unchanged). `SUPPORTED_STORIES` in `content-engine/lib/article-export.cjs` pins the earlier delivery hash, so a regenerated request fails with "Title metadata does not belong to the supported story". Re-bind the story in the content engine, export a new version, then pass `--article`. |
| `/case-files/` | not in the set | Film review remains open. |

## Enquiry collection

The workflow request form opens the visitor's email app with a message to
`info@medici.ai`, the address every other site contact link uses. A Gmail link and
the full text stay on the page when no email app opens. The message ends with a
fixed attribution block: `request_id`, `page`, `tool`, the four UTM fields,
`sales_owner` (Eliot Puplett) and `backup_owner` (Aamina Bawany). Ownership follows
the historical shared-inbox routing in `outreach-engine/src/sales-handoff-report.cjs`.
`parseAttribution()` in `src/js/buyer-intake.js` reads the block back from a received
message. Nothing is posted to a server; the site CSP (`form-action 'none'`,
`connect-src 'self'`) is unchanged.

## Regenerate and review

```sh
A="$HOME/Library/Application Support/cosimo-content"
node scripts/build-release.cjs --spot-error "$A/buyer-tools/spot-error-v1/challenge.json" \
  [--article "$A/articles/<slug>-v1/article.json"]
node --test tests/buyer-intake.test.cjs
node build.js --release-candidate
npx --no-install serve dist-release -l tcp://127.0.0.1:3012 --config serve.json --no-clipboard --no-port-switching
```

`dist-release/` is noindex in HTML, headers and robots.txt. It is for loopback review only.

Browser check of a built site (production build or candidate):

```sh
node build.js
npx --no-install serve dist -l tcp://127.0.0.1:3013 --config ../serve.json --no-clipboard --no-port-switching
SITE_URL=http://127.0.0.1:3013 node --test tests/site-http.test.cjs
node scripts/verify-buyer-tools.cjs http://127.0.0.1:3013 "$HOME/Downloads/cosimo-website-review"
```

## Deploy

1. Set `"ship": true` in `release/manifest.json` for each approved page.
2. Run `node --test tests/buyer-intake.test.cjs`. It must pass.
3. Run `node build.js` and confirm `dist/sitemap.xml` lists each shipped canonical URL.
4. Merge the pull request into `main` and let Railway build with `npm run build`.

## Verify after deploy

1. `curl -sI https://cosimo.work/reverse-demo/` returns 200 with no `X-Robots-Tag: noindex`.
2. The page source contains `<meta name="robots" content="index, follow">` and the canonical URL.
3. `curl -s https://cosimo.work/sitemap.xml` lists each shipped URL.
4. Run `SITE_URL=https://cosimo.work node --test tests/site-http.test.cjs`. The page list includes the shipped routes.
5. Submit one request from `/reverse-demo/?utm_source=website&utm_medium=article&utm_campaign=quarter-close&utm_content=release-check` from a team mailbox, with Eliot's approval for that one message. Confirm it arrives in the `info@medici.ai` Group with the attribution block intact, then record it in the CRM as a test, not an enquiry.
6. Submit the sitemap in Google Search Console and request indexing for each shipped URL.
