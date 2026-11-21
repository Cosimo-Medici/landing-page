#!/usr/bin/env node
'use strict';
// Generates the public release candidates into release/ (tracked source, read by build.js).
// Inputs stay private; only rendered public HTML and public identifiers are written.
// Each page's "ship" flag in release/manifest.json is preserved; regeneration never ships a page.
//
// Usage:
//   node scripts/build-release.cjs [--article /abs/article.json]... [--spot-error /abs/challenge.json]
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto'), assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..'), src = path.join(root, 'src'), out = path.join(root, 'release');
const ORIGIN = 'https://cosimo.work';
const args = process.argv.slice(2), articleFiles = [];
let spotFile = null;
for (let i = 0; i < args.length; i += 2) {
  const [flag, value] = [args[i], args[i + 1]];
  if (!value || !path.isAbsolute(value)) throw Error('Usage: node scripts/build-release.cjs [--article /abs/article.json]... [--spot-error /abs/challenge.json]');
  if (flag === '--article') articleFiles.push(value);
  else if (flag === '--spot-error') spotFile = value;
  else throw Error('Unknown flag ' + flag);
}
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const scriptJson = v => JSON.stringify(v).replace(/[<>&\u2028\u2029]/g, c => `\\u${c.charCodeAt(0).toString(16).padStart(4, '0')}`);
const shell = fs.readFileSync(path.join(src, 'about.html'), 'utf8');
const nav = shell.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0];
const tail = shell.slice(shell.indexOf('<footer class="site-footer">')).replace(/src="js\//g, 'src="/js/');
const icons = shell.match(/<link rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>/g).join('\n');
assert(nav && tail.startsWith('<footer') && tail.includes('</html>'), 'Existing site shell unavailable');

function head({title, description, route, type = 'website', css, jsonLd}) {
  const url = ORIGIN + route;
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
<meta charset="UTF-8">
<script src="/js/theme.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow">
<title>${esc(title)}</title>
${icons}
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:site_name" content="Cosimo by Medici &amp; Company">
<meta property="og:image" content="${ORIGIN}/og-financial-operations.jpg">
<meta name="twitter:card" content="summary_large_image">
${['fonts', 'styles', 'site-layout', 'accessibility', ...css].map(n => `<link rel="stylesheet" href="/css/${n}.css">`).join('\n')}
<script src="/js/accessibility.js" defer></script>
${jsonLd ? `<script type="application/ld+json">${scriptJson(jsonLd)}</script>` : ''}
</head>
<body>
<a class="a11y-skip" href="#main">Skip to content</a>
${nav}
<main id="main" tabindex="-1">`;
}

const pages = [];
// 1. Reverse demo: live enquiry to the existing contact address.
{
  const route = '/reverse-demo/';
  const labels = {name: 'Your name', company: 'Company', email: 'Email', problem: 'Process or problem', output: 'Output you need', period: 'Reporting period', decision: 'Decision this should support', reviewer: 'Person reviewing the result', owner: 'Workflow owner'};
  const long = ['problem', 'output', 'decision'];
  const fields = Object.entries(labels).map(([n, l]) => `<label class="${long.includes(n) ? 'wide' : ''}" for="${n}">${l}${long.includes(n) ? `<textarea id="${n}" name="${n}" maxlength="800" required></textarea>` : `<input id="${n}" name="${n}" type="${n === 'email' ? 'email' : 'text'}" maxlength="200" autocomplete="${{name: 'name', company: 'organization', email: 'email'}[n] || 'off'}" required>`}</label>`).join('\n');
  const title = 'Describe your workflow — Cosimo';
  const description = 'Describe a reporting or review process, the output you need and who checks it. Cosimo’s team replies to scope a review.';
  const html = head({title, description, route, css: ['buyer-tools']}) + `
<section class="sub-page buyer-tools"><div class="sub-page-label">Workflow request</div><h1 class="sub-page-title">Describe your workflow</h1><div class="legal-body">
<p>Tell us the process, the output you need and the people who review it. When you select Send request, your email app opens a message to info@medici.ai with these details. Send it to reach our team. This page accepts no files.</p>
<form id="buyer-intake" data-tool="reverse-demo">${fields}<button class="btn-main wide" type="submit">Send request</button></form>
<p>Before a real data run, we agree the permitted files, access and retention, technical scope, time and cost.</p>
<div id="request-actions" hidden><p>If no email app opened, send the request through Gmail or copy the text below to info@medici.ai.</p><p><a id="open-email" class="btn-line" href="mailto:info@medici.ai">Open email again</a> <a id="open-gmail" class="btn-line" href="https://mail.google.com/" target="_blank" rel="noopener">Send with Gmail</a></p></div>
<pre id="request-result" aria-live="polite">Your request appears here before your email app opens.</pre>
</div></section>
</main>
<script src="/js/buyer-intake.js"></script><script src="/js/buyer-intake-page.js" defer></script>
${tail}`;
  pages.push({id: 'reverse-demo', route, file: 'reverse-demo/index.html', html, title, description, tool: 'reverse-demo', assets: ['css/buyer-tools.css', 'js/buyer-intake.js', 'js/buyer-intake-page.js'],
    claims: [
      {text: 'your email app opens a message to info@medici.ai', source: 'src/js/buyer-intake.js SALES.destination; same address as every existing site contact link'},
      {text: 'This page accepts no files', source: 'src/js/buyer-intake.js prepare() rejects any field outside FIELDS; no file input exists'},
      {text: 'Before a real data run, we agree the permitted files, access and retention, technical scope, time and cost', source: 'docs/buyer-tools-preview.md handoff requirements (EXE-68, EXE-86); existing preview copy'}]});
}
// 2. Spot the error: fictional exercise from the committed calculation vector.
if (spotFile) {
  const challenge = require('../src/js/spot-error.js').validate(JSON.parse(fs.readFileSync(spotFile, 'utf8')));
  const bytes = fs.readFileSync(path.join(root, '../cosimo/agent/tests/calc/vectors/prepare-statement-of-changes-partners-capital.json'));
  const reference = JSON.parse(bytes).cases.find(c => c.name === challenge.source?.caseName);
  assert(reference && crypto.createHash('sha256').update(bytes).digest('hex') === challenge.source.sha256, 'Challenge source vector changed');
  assert(challenge.rows.every(r => r.expectedAmount === reference.expect_result[r.field]), 'Expected figures do not match the committed vector');
  const route = '/spot-the-error/';
  const money = v => { const [w, f] = v.split('.'); return w.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + f; };
  const rows = challenge.rows.map(r => `<tr><th scope="row">${esc(r.label)}</th><td>${esc(money(r.amount))}</td></tr>`).join('');
  // Existing four-field convention (content-engine/scripts/link.cjs). It has no "tool" medium; the
  // earlier preview used "article", and the tool itself is recorded separately in the enquiry.
  const {trackedLink} = require('../../cosimo-content-engine/content-engine/scripts/link.cjs');
  const tracked = new URL(trackedLink(ORIGIN + '/reverse-demo/', {source: 'website', medium: 'article', topic: 'quarter-close', piece: challenge.challengeId}));
  const cta = tracked.pathname + tracked.search;
  const title = 'Spot the error — Cosimo';
  const description = 'A fictional capital account statement with one incorrect figure. Find the line and enter the corrected amount.';
  const html = head({title, description, route, css: ['buyer-tools']}) + `
<section class="sub-page buyer-tools"><div class="sub-page-label">Fictional exercise</div><h1 class="sub-page-title">Spot the error</h1><div class="legal-body"><p>This fictional capital account has one incorrect figure. Identify the line and enter the corrected amount. Period: ${esc(challenge.period.start)} to ${esc(challenge.period.end)}. All amounts are USD.</p><table class="spot-statement"><caption>Fictional statement · one arithmetic error</caption><thead><tr><th scope="col">Line</th><th scope="col">Amount</th></tr></thead><tbody>${rows}</tbody></table><form id="spot-error-answer"><label for="field">Statement line<select id="field" name="field" required><option value="">Choose a line</option>${challenge.rows.map(r => `<option value="${esc(r.field)}">${esc(r.label)}</option>`).join('')}</select></label><label for="amount">Correct amount (no commas)<input id="amount" name="amount" inputmode="decimal" required></label><button class="btn-main wide" type="submit">Check answer</button></form><p id="spot-error-feedback" aria-live="polite">Your answer is checked in your browser and is not recorded.</p><p><a class="btn-line" href="${esc(cta)}">Describe your own workflow</a></p></div></section>
</main><script type="application/json" id="spot-error-data">${scriptJson(challenge)}</script><script src="/js/spot-error.js" defer></script>
${tail}`;
  pages.push({id: 'spot-the-error', route, file: 'spot-the-error/index.html', html, title, description, tool: 'spot-the-error', assets: ['css/buyer-tools.css', 'js/spot-error.js'],
    source: {challengeId: challenge.challengeId, vectorSha256: challenge.source.sha256, caseName: challenge.source.caseName},
    claims: [{text: 'one incorrect figure', source: `committed vector ${challenge.source.caseName}; scripts/prepare-spot-error.py changes exactly one ending-balance figure`},
      {text: 'Your answer is checked in your browser and is not recorded', source: 'src/js/spot-error.js compares locally; page makes no network write'}]});
}
// 3. Articles: verbatim, provenance-verified exports, rendered as published pages.
if (articleFiles.length) {
  const articles = require('../lib/articles.cjs');
  for (const article of articles.loadPreviews(articleFiles)) {
    const m = article.metadata, route = article.route;
    const firstSentence = article.body.trim().split(/(?<=\.)\s/)[0];
    const preview = articles.renderPreview(article, shell);
    const articleHtml = preview.match(/<article[\s\S]*<\/article>/)[0]
      .replace(/<div class="sub-page-label">[^<]*<\/div>/, '<div class="sub-page-label">Commentary · Eliot Puplett</div>')
      .replace(/<aside class="article-preview-note"[\s\S]*?<\/aside>/, '');
    const ctaUrl = new URL(m.cta.url);
    assert(articleHtml.includes(esc(m.cta.url)), 'Verified CTA missing');
    const jsonLd = {'@context': 'https://schema.org', '@type': 'Article', headline: m.title, identifier: m.articleId, articleBody: article.body, inLanguage: 'en',
      author: {'@type': 'Person', name: 'Eliot Puplett'}, publisher: {'@type': 'Organization', name: 'Medici & Company'}, mainEntityOfPage: ORIGIN + route};
    const html = head({title: `${m.title} — Cosimo`, description: firstSentence, route, type: 'article', css: ['articles'], jsonLd}) + `
${articleHtml}
</main>
${tail}`;
    pages.push({id: 'article:' + m.articleId, route, file: route.slice(1) + 'index.html', html, title: m.title, description: firstSentence, tool: 'article', assets: ['css/articles.css'],
      source: {articleId: m.articleId, sourceId: m.sourceId, bodySha256: m.hashes.body, review: m.review},
      claims: [{text: 'Article body and citations', source: `verbatim export ${m.articleId}, verified by content-engine verifyArticle; review states ${JSON.stringify(m.review)}`},
        {text: 'Byline Eliot Puplett', source: `articleId ${m.articleId} (author identity in the export id)`},
        {text: `CTA ${m.cta.label} → ${ctaUrl.pathname}${ctaUrl.hash}`, source: 'verified export cta'}]});
  }
}

const manifestFile = path.join(out, 'manifest.json');
const previous = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {pages: []};
const shipped = new Map(previous.pages.map(p => [p.id, p.ship === true]));
fs.mkdirSync(out, {recursive: true});
for (const p of pages) {
  fs.mkdirSync(path.dirname(path.join(out, p.file)), {recursive: true});
  fs.writeFileSync(path.join(out, p.file), p.html);
}
const manifest = {schemaVersion: 1, note: 'build.js copies a page into dist/ and the sitemap only when ship is true. Set ship only after the release decision.',
  generatedAt: new Date().toISOString(), shellSha256: crypto.createHash('sha256').update(shell).digest('hex'),
  pages: pages.map(({html, ...p}) => ({...p, canonical: ORIGIN + p.route, htmlSha256: crypto.createHash('sha256').update(html).digest('hex'), ship: shipped.get(p.id) || false}))};
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify({release: out, pages: manifest.pages.map(p => ({route: p.route, ship: p.ship}))}));
