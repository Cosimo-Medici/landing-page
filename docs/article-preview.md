# Local article preview

This is the existing static website with a verbatim article export, its existing
navigation/footer, local fonts, theme/accessibility controls and existing CTA.
It adds no CMS, dependencies, scheduler or publication action.

Run from this checkout with Node 22 (the content engine verifier requires it):

```sh
node build.js
node build.js --article-preview "$HOME/Library/Application Support/cosimo-content/articles/sequoia-permanent-capital-v1/article.json"
npm run serve:article-preview
```

Open <http://127.0.0.1:3010/insights/sequoia-permanent-capital/>.
The server binds only to loopback and refuses an occupied port. Stop with Ctrl-C.
It uses the already installed `serve` package; no install is performed.

The explicit flag writes **dist-preview**, never dist. Ordinary builds do not
read private article files or load the sibling content engine. Preview files are
ignored by Git and never included in the ordinary production build, source
sitemap or navigation. Multiple explicit flags support multiple verified exports;
duplicate IDs/routes fail before any output is removed.

The preview is noindex in HTML and HTTP headers, and its robots file disallows
all crawling. It has draft Article JSON-LD with the exact body and source article
identifier. It has no publication date, live canonical, og:url or invented image
or description. The proposed address is labeled unpublished. This is a local
preview, not a published URL or evidence of search indexing.

## Provenance and verification

`lib/articles.cjs` calls the existing content engine `verifyArticle` before
rendering. It rechecks the approved source body, exact evidence hashes, title
association, citations and existing website CTA. Any evidence or export change
requires a newly verified export. Body text, article/source/origin IDs, citations
and the full tracked CTA survive unchanged. Private evidence paths are not copied
into rendered output. The existing content engine currently supports only the
explicitly bound Sequoia story; a different approved story needs its own supported
provenance binding there before this reusable renderer can consume it.

With the local preview server running:

```sh
node scripts/verify-article-preview.cjs "$HOME/Library/Application Support/cosimo-content/articles/sequoia-permanent-capital-v1/article.json"
```

This checks the real HTTP output, noindex/robots/sitemap/production exclusions,
exact body and draft JSON-LD, rejected altered body/title, duplicate identity,
route validation and script-safe JSON. Temporary altered exports are removed.
It does not run an end-to-end publishing suite or contact external platforms.

Manual local Chrome component verification covered 1440px and 375px, light and
dark, rendered body/citations/tracked CTA, unique IDs, loaded local fonts, no
horizontal overflow, theme toggles, mobile menu/Escape, and no failed or external
requests. Four screenshots and browser results are under the private export's
`site-preview-observations/`. Original production output was compared byte for
byte with the pre-change build: all 75 files unchanged.

## Remaining acceptance

The source prose is historically approved; this article presentation is still
unpublished and pending article/SEO review. Archived fact sources have not been
rechecked. No longer article, description or hero was written. Public deployment,
canonical/index/sitemap release and a real visitor conversion are untested and
require the separate publication instruction. A CTA is linked verbatim but no
live click, email, form submission or conversion was initiated by these checks.
