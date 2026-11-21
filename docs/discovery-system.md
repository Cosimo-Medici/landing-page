# Cosimo discovery system

The website answers specific fund and bank operating questions with permanent, readable pages. Worked examples expose their source figures, calculations and unresolved questions. A product facts page establishes the relationship between Cosimo and Medici & Company. The calculator lets a buyer test the economics of a whole process, including review and correction.

## Published assets

- `/guides/`: six guides covering investor reporting, daily loan reviews, fund reconciliations, borrower reviews, evaluation and configured workflows versus chat.
- `/examples/fund-reporting/` and `/examples/loan-reconciliation/`: prepared examples with downloadable fictional records. These are not customer results or measured product performance.
- `/product-facts/`: product identity, scope, setup, connections, commercial model and current security position.
- `/tools/reporting-capacity/`: local browser calculation; inputs are not stored or sent. Starting costs are assumptions, not pricing.
- `/resources/`: JSON source records, product facts and a plain-text evaluation checklist.

The pages are static HTML, available without JavaScript. They have canonical URLs, visible text matching structured data, ordinary internal links and sitemap entries. Shared company/product identifiers reduce name ambiguity. `llms.txt` links are supplemental; they are not a ranking mechanism.

## Recurring operation

GitHub Actions: **Discovery health and visibility** (`.github/workflows/discovery.yml`).

| Trigger | Action |
| --- | --- |
| Relevant changes pushed to main | Build the expected release, wait for its content fingerprint on production, audit the live site, then submit the deployed sitemap to IndexNow |
| Daily, 11:23 UTC | Audit live pages, links, assets, metadata, source arithmetic, public ownership file and crawler rules |
| Tuesday, 12:41 UTC | Run the audit and all 30 fixed retrieval questions; retain the raw report and compare with the latest retained retrieval run |
| Manual dispatch | Audit; optionally run measurement and/or submit IndexNow |

Schedules can be delayed by GitHub. Failed runs use normal GitHub Actions failure notifications. Artifacts are retained for 90 days. Public repositories can have scheduled workflows disabled after prolonged repository inactivity; check the workflow's enabled state during maintenance. No continuously running local process is required.

The only service credential is the repository Actions secret `TAVILY_API_KEY`. It is used only by scheduled/manual measurement, not pull requests. Do not put it in source, artifacts, URLs or command-line arguments. Measurement sends public buyer questions, never client records. A full default run makes 30 basic Tavily search requests; repetitions are opt-in and capped at three. Provider billing and quotas apply.

## What is measured

`content/discovery-prompts.json` defines 24 unbranded buyer questions, four branded questions and two name-collision controls. Keep these groups separate. Each successful observation retains the question, timestamp, provider request ID, result URLs/ranks, answer and usage metadata. A catalogue hash and settings guard comparisons when prompts change.

**The automated measurement is web retrieval through Tavily. It does not measure native ChatGPT, Claude, Gemini or Perplexity recommendations.** A substring match on “Cosimo” is deliberately not accepted as the correct identity or a recommendation. `cosimo.work` result ranks are an exact-domain measure. The sources list identifies research candidates; it does not certify independent editorial credibility.

For native assistant observations, use a fresh conversation without Cosimo context, preserve the exact prompt, date, product/model, search mode, answer and citations. Record whether Cosimo is absent, merely mentioned, shortlisted or the first recommendation; confirm the identity from the answer or sources. Repeat the same question in separate fresh conversations before interpreting a change. Keep web-enabled and non-search answers separate. Do not seed the prompt with Cosimo when measuring unbranded discovery, and do not merge native observations with retrieval scores.

Commercial measurement comes from qualified conversations. The new enquiry links retain the originating page and an optional “How I found Cosimo” field. This is qualitative attribution, not automatic cross-platform conversion tracking.

## Running and inspecting

Node 22; no package dependencies are required for the build or monitoring scripts.

```sh
npm run build
# Run the site's normal server separately, then audit its actual HTTP responses:
SITE_URL=http://localhost:3000 npm run discovery:audit
# The default audit target is production:
npm run discovery:audit
# Supply TAVILY_API_KEY through the environment or Actions secret store:
npm run discovery:measure
node scripts/discovery-monitor.cjs --limit 2 --out reports/discovery
node scripts/discovery-monitor.cjs --previous reports/previous/latest.json
# Checks public ownership and reads the live sitemap before submitting:
npm run discovery:submit
```

Reports are under ignored `reports/discovery/`: timestamped raw JSON, `latest.json`, `latest.html` and `summary.md`. Download the Actions artifacts for scheduled runs. Submission success means IndexNow received the request; it does not prove indexing, citations or recommendations. The audit's crawler user-agent requests check server responses, not access from every provider's IP range.

## Maintaining the content

Guide copy and example records live in `content/discovery.cjs`. `scripts/build-discovery.cjs` creates the hub, examples, facts, calculator, resources and metadata. Change source files, not generated `dist/`. Update the content date only after a substantive review. When adding a route, add both slash forms to `serve.json`, include it in the build manifest and update the audit's expected count. Run the build and HTTP audit, and inspect changed layouts on desktop and mobile.

Keep example records consistent with the existing interactive demonstrations. Never substitute fictional results for customer evidence. Public customer case studies need approved facts, permission to identify the customer, and a clear account of preparation, review, correction and elapsed turnaround. Claims about integrations, security certifications, autonomy and pricing must match the actual product and current commercial terms.

The useful editorial loop is: identify a buyer question where Cosimo is absent; inspect the cited sources; improve the relevant answer or evidence; publish; confirm deployment and discovery; compare subsequent observations. Prefer a substantive improvement to an existing guide over near-duplicate articles. A credible outside source or approved customer result can add evidence the company cannot supply by repeating its own claims.

## Crawler decisions and references

The public marketing site allows OAI-SearchBot, PerplexityBot, Claude-SearchBot and their relevant user fetchers. GPTBot, ClaudeBot and CCBot remain blocked. Google-Extended is allowed because it also controls grounding in Gemini Apps and Vertex AI; Google couples this with its training uses. This policy is for the public marketing site, not the private product or client records.

- [Google's AI features guidance](https://developers.google.com/search/docs/appearance/ai-features): ordinary indexing and helpful content remain relevant; no special AI schema is required.
- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots): search and training controls are distinct.
- [Google-Extended documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended): grounding/training scope and independence from Google Search.
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler).
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers).
- [IndexNow protocol](https://www.indexnow.org/documentation).
- [Tavily Search API](https://docs.tavily.com/documentation/api-reference/endpoint/search).

No crawler permission, schema, submission or content volume guarantees first recommendation. Evaluate the system by observed discovery, accurate recommendations and qualified enquiries.
