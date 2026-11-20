'use strict';
// Local previews consume the content engine's exact, provenance-checked export.
// This module is deliberately never loaded by an ordinary production build.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const scriptJson = value => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, c => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);

function previewRoute(metadata) {
  assert.equal(metadata.schemaVersion, 1);
  assert.equal(metadata.kind, 'article_export');
  assert.equal(metadata.status, 'private_preview');
  assert.equal(metadata.canonicalStatus, 'proposed_not_live');
  assert.equal(metadata.publishedAt, null);
  assert.equal(metadata.review.publication, 'not_requested');
  const url = new URL(metadata.proposedCanonicalUrl);
  assert.equal(url.origin, 'https://cosimo.work');
  assert(!url.username && !url.password && !url.search && !url.hash);
  assert(/^\/insights\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(url.pathname), 'Invalid article preview route');
  return url.pathname;
}

function loadPreviews(files) {
  const { verifyArticle } = require('../../cosimo-content-engine/content-engine/lib/article-export.cjs');
  const ids = new Set(), routes = new Set();
  return files.map(file => {
    file = path.resolve(file);
    const result = verifyArticle(file);
    assert.equal(result.status, 'verified_private_preview');
    const metadata = JSON.parse(fs.readFileSync(file, 'utf8'));
    const route = previewRoute(metadata);
    assert(!ids.has(metadata.articleId), 'Duplicate article identity');
    assert(!routes.has(route), 'Duplicate article route');
    ids.add(metadata.articleId); routes.add(route);
    return { metadata, route, body: fs.readFileSync(path.join(path.dirname(file), 'body.txt'), 'utf8'),
      html: fs.readFileSync(path.join(path.dirname(file), 'body.html'), 'utf8') };
  });
}

function renderPreview(article, shell) {
  const { metadata: m, body, html } = article;
  const nav = shell.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0];
  const tail = shell.slice(shell.indexOf('<footer class="site-footer">'));
  assert(nav && tail.startsWith('<footer') && tail.includes('</html>'), 'Existing site shell is unavailable');
  const icons = shell.match(/<link rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>/g).join('\n');
  const structuredData = { '@context': 'https://schema.org', '@type': 'Article', headline: m.title,
    identifier: m.articleId, articleBody: body, inLanguage: 'en', creativeWorkStatus: 'Draft' };
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<script src="/js/theme.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>${escape(m.title)} — Cosimo preview</title>
${icons}
<meta property="og:type" content="article">
<meta property="og:title" content="${escape(m.title)}">
<meta property="og:site_name" content="Cosimo by Medici &amp; Company">
${['fonts', 'styles', 'site-layout', 'accessibility', 'articles'].map(name => `<link rel="stylesheet" href="/css/${name}.css">`).join('\n')}
<script src="/js/accessibility.js" defer></script>
<script type="application/ld+json">${scriptJson(structuredData)}</script>
</head>
<body>
<a class="a11y-skip" href="#main">Skip to content</a>
${nav}
<main id="main" tabindex="-1">
<article class="sub-page article-preview" data-article-id="${escape(m.articleId)}" data-source-id="${escape(m.sourceId)}" data-originating-content-id="${escape(m.titleMetadata.originatingContentId)}">
  <div class="sub-page-label">Local article preview · unpublished</div>
  <h1 class="sub-page-title">${escape(m.title)}</h1>
  <div class="legal-body">
    <aside class="article-preview-note" aria-label="Preview status"><p>Proposed address (not live): <span>${escape(m.proposedCanonicalUrl)}</span></p></aside>
    <div class="article-body">${html}</div>
    <section class="article-references" aria-labelledby="article-sources"><h2 id="article-sources">Sources</h2><ul>${m.references.map(ref => `<li><a href="${escape(ref.url)}">${escape(ref.title)}</a></li>`).join('\n')}</ul></section>
    <p class="article-cta"><a class="btn-line" data-article-cta href="${escape(m.cta.url)}">${escape(m.cta.label)}</a></p>
  </div>
</article>
</main>
${tail.replace(/src="js\//g, 'src="/js/')}`;
}

module.exports = { loadPreviews, previewRoute, renderPreview, scriptJson };
