'use strict';
// Bounded component verification against a real loopback preview; no publishing.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { loadPreviews, previewRoute, scriptJson } = require('../lib/articles.cjs');

async function main() {
  const [manifest, origin = 'http://127.0.0.1:3010'] = process.argv.slice(2);
  assert(manifest, 'Pass the exact article.json export');
  const base = new URL(origin);
  assert(base.protocol === 'http:' && base.hostname === '127.0.0.1', 'Only loopback verification is supported');
  const [article] = loadPreviews([manifest]);
  const response = await fetch(new URL(article.route, base));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('x-robots-tag'), /noindex/);
  const html = await response.text();
  assert(html.includes(article.html), 'Served body differs from the approved export');
  assert(!/<link[^>]+rel="canonical"|<meta[^>]+property="og:url"/.test(html));
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data.articleBody, article.body);
  assert.equal(data.identifier, article.metadata.articleId);
  assert.equal(data.creativeWorkStatus, 'Draft');
  assert(!data.datePublished && !data.dateModified && !data.url);
  const sitemap = await fetch(new URL('/sitemap.xml', base)).then(r => r.text());
  assert(!sitemap.includes(article.route));
  const robots = await fetch(new URL('/robots.txt', base)).then(r => r.text());
  assert.equal(robots, 'User-agent: *\nDisallow: /\n');
  const production = path.resolve(__dirname, '../dist');
  assert(!fs.existsSync(path.join(production, article.route)), 'Article leaked into ordinary build');
  assert(!fs.readFileSync(path.join(production, 'sitemap.xml'), 'utf8').includes(article.route));
  assert.throws(() => loadPreviews([manifest, manifest]), /Duplicate article identity/);
  assert.throws(() => previewRoute({ ...article.metadata, proposedCanonicalUrl: 'https://cosimo.work/insights/../vc/' }));
  assert(!scriptJson({ text: '</script><script>&\u2028' }).includes('<'));
  assert.equal(JSON.parse(scriptJson({ text: '</script>&' })).text, '</script>&');
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'cosimo-article-verify-'));
  try {
    fs.cpSync(path.dirname(path.resolve(manifest)), temp, { recursive: true, filter: file => !file.includes('site-preview-observations') });
    fs.appendFileSync(path.join(temp, 'body.html'), '<p>Unapproved addition</p>');
    assert.throws(() => loadPreviews([path.join(temp, 'article.json')]), /Article artifact changed/);
    fs.copyFileSync(path.join(path.dirname(manifest), 'body.html'), path.join(temp, 'body.html'));
    const changed = { ...article.metadata, title: 'Unapproved title' };
    fs.writeFileSync(path.join(temp, 'article.json'), JSON.stringify(changed));
    assert.throws(() => loadPreviews([path.join(temp, 'article.json')]), /metadata differs/);
  } finally { fs.rmSync(temp, { recursive: true, force: true }); }
  console.log(JSON.stringify({ status: 'verified_local_preview', realHttp: true, articleId: article.metadata.articleId,
    bodySha256: article.metadata.hashes.body, productionExcluded: true, alteredBodyRejected: true,
    alteredTitleRejected: true, duplicateIdentityRejected: true, published: false }, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
