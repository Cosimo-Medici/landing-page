#!/usr/bin/env node
/**
 * Static site build script — content-hash CSS/JS filenames for cache busting.
 * No dependencies. Run with: node build.js
 *
 * Reads source files from src/, writes hashed output to dist/.
 * HTML files get updated references. Everything else is copied as-is.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC = path.join(__dirname, 'src');
// Validate all explicit preview inputs before touching either output directory.
const args = process.argv.slice(2), previewFiles = [];
// --release-candidate builds every page in release/manifest.json into dist-release/
// (noindex, loopback review). An ordinary build ships only pages marked ship: true.
const releaseCandidate = args[0] === '--release-candidate' && args.length === 1;
for (let i = 0; !releaseCandidate && i < args.length; i += 2) {
  if (args[i] !== '--article-preview' || !args[i + 1] || args[i + 1].startsWith('--')) {
    throw new Error('Usage: node build.js [--article-preview /absolute/path/article.json | --release-candidate]');
  }
  previewFiles.push(args[i + 1]);
}
const articles = previewFiles.length ? require('./lib/articles.cjs') : null;
const previews = articles ? articles.loadPreviews(previewFiles) : [];
const outputName = releaseCandidate ? 'dist-release' : previews.length ? 'dist-preview' : 'dist';
const DIST = path.join(__dirname, outputName);
const RELEASE_MANIFEST = path.join(__dirname, 'release/manifest.json');
const releasePages = (fs.existsSync(RELEASE_MANIFEST) && !previews.length)
  ? JSON.parse(fs.readFileSync(RELEASE_MANIFEST, 'utf8')).pages.filter(p => releaseCandidate || p.ship === true)
  : [];
if (releaseCandidate && !releasePages.length) throw new Error('release/manifest.json has no pages. Run scripts/build-release.cjs first.');
const releaseAssets = [...new Set(releasePages.flatMap(p => p.assets))];

// Files to hash (source path relative to SRC → directory in dist)
const HASHABLE = [
  ...(previews.length ? [{ src: 'css/articles.css', dir: 'css' }] : []),
  ...releaseAssets.filter(a => !(previews.length && a === 'css/articles.css')).map(a => ({ src: a, dir: path.dirname(a) })),
  { src: 'css/fonts.css', dir: 'css' },
  { src: 'css/accessibility.css', dir: 'css' },
  { src: 'js/accessibility.js', dir: 'js' },
  { src: 'js/brand-mark.js', dir: 'js' },
  { src: 'js/theme.js', dir: 'js' },
  { src: 'css/home.css', dir: 'css' },
  { src: 'css/audiences.css', dir: 'css' },
  { src: 'css/operations.css', dir: 'css' },
  { src: 'js/operations-report.js', dir: 'js' },
  { src: 'css/site-layout.css', dir: 'css' },
  { src: 'css/founders.css', dir: 'css' },
  { src: 'js/home.js', dir: 'js' },
  { src: 'js/page-chrome.js', dir: 'js' },
  { src: 'css/styles.css', dir: 'css' },
  { src: 'css/re.css', dir: 'css' },
  { src: 'js/re.js', dir: 'js' },
  { src: 'js/re-report.js', dir: 'js' },
  ...['vc', 'pe', 'credit', 'hedge'].map(sector => ({ src: `js/${sector}-report.js`, dir: 'js' })),
  // The retired chat demo is not used by any current page. Do not publish its
  // historical sample records alongside the current, reconciled examples.
];

// HTML files that reference the hashable assets
const HTML_FILES = ['index.html', 'faq.html', 'about.html', 'founders.html', 'accessibility.html', '404.html', 'privacy.html', 'terms.html', ...['re', 'vc', 'pe', 'credit', 'hedge', 'banks', 'funds', 'services', 'insurance'].map(sector => `${sector}/index.html`)];

// Static assets to copy as-is (relative to SRC, stripped of public/ prefix in dist)
const STATIC = [
  'public/.well-known/security.txt',
  'public/ChicagoFLF.ttf',
  'public/apple-touch-icon.png',
  'public/favicon.ico',
  'public/favicon.svg',
  'public/favicon-96x96.png',
  'public/og-image.png',
  'public/og-financial-operations.jpg',
  'public/og-image-dk.png',
  'public/robots.txt',
  'public/llms.txt',
  'public/llms-full.txt',
  'public/sitemap.xml',
];

// --- Helpers ---

function hash(content) {
  return crypto.createHash('md5').update(content).digest('hex').slice(0, 10);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

// --- Clean & create dist ---

if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true });
}
ensureDir(DIST);

// --- Hash CSS/JS and build replacement map ---

const replacements = []; // { original: 'css/styles.css', hashed: 'css/styles.a3f7b2c1e9.css' }

for (const entry of HASHABLE) {
  const srcPath = path.join(SRC, entry.src);
  let content = fs.readFileSync(srcPath);

  // Rewrite source-relative paths for dist layout (e.g. ../public/Font.ttf → ../Font.ttf)
  if (entry.src.endsWith('.css')) {
    content = Buffer.from(
      content.toString('utf-8').replace(/url\(['"]?\.\.\/public\//g, "url('../")
    );
  }

  const h = hash(content);
  const ext = path.extname(entry.src);
  const base = path.basename(entry.src, ext);
  const hashedName = `${base}.${h}${ext}`;
  const destDir = path.join(DIST, entry.dir);

  ensureDir(destDir);
  fs.writeFileSync(path.join(destDir, hashedName), content);

  replacements.push({
    original: entry.src,
    hashed: `${entry.dir}/${hashedName}`,
  });

  console.log(`  ${entry.src} → ${entry.dir}/${hashedName}`);
}

// --- Process HTML files — replace asset references ---

for (const htmlFile of HTML_FILES) {
  const srcPath = path.join(SRC, htmlFile);
  if (!fs.existsSync(srcPath)) continue;

  let html = fs.readFileSync(srcPath, 'utf-8');

  const nested = htmlFile.includes('/');
  for (const r of replacements) {
    // Nested campaign routes resolve shared assets from the site root.
    const sourcePath = nested ? `../${r.original}` : r.original;
    const outputPath = nested ? `../${r.hashed}` : r.hashed;
    html = html.split(sourcePath).join(outputPath);
  }

  const outputPath = path.join(DIST, htmlFile);
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, html);
  console.log(`  ${htmlFile} — references updated`);
}

// --- Copy static assets (strip public/ prefix for dist) ---

for (const file of STATIC) {
  const srcPath = path.join(SRC, file);
  if (!fs.existsSync(srcPath)) continue;
  const destName = file.startsWith('public/') ? file.slice(7) : file;
  copyFile(srcPath, path.join(DIST, destName));
}

fs.cpSync(path.join(SRC, 'public/founders'), path.join(DIST, 'founders'), { recursive: true });
fs.cpSync(path.join(SRC, 'public/fonts'), path.join(DIST, 'fonts'), { recursive: true });

fs.cpSync(path.join(SRC, 'public/product-demo'), path.join(DIST, 'product-demo'), { recursive: true });
fs.cpSync(path.join(SRC, 'public/brand'), path.join(DIST, 'brand'), { recursive: true });

if (previews.length) {
  const shell = fs.readFileSync(path.join(SRC, 'about.html'), 'utf8');
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'serve.json'), 'utf8'));
  config.headers.push({ source: '**', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] });
  for (const article of previews) {
    let html = articles.renderPreview(article, shell);
    for (const r of replacements) html = html.split(`/${r.original}`).join(`/${r.hashed}`);
    const destination = `${article.route}index.html`;
    const file = path.join(DIST, destination);
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, html);
    config.rewrites.unshift(...[article.route, article.route.slice(0, -1)].map(source => ({ source, destination })));
    console.log(`  ${destination} — unpublished local preview`);
  }
  fs.writeFileSync(path.join(DIST, 'serve.json'), JSON.stringify(config, null, 2) + '\n');
  fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  // Only public identifiers/hashes are copied; private evidence paths stay private.
  fs.writeFileSync(path.join(DIST, 'article-preview-manifest.json'), JSON.stringify({ schemaVersion: 1, status: 'local_preview_only',
    articles: previews.map(({ metadata: m, route }) => ({ articleId: m.articleId, sourceId: m.sourceId,
      originatingContentId: m.titleMetadata.originatingContentId, bodySha256: m.hashes.body, route,
      canonicalStatus: m.canonicalStatus, publishedAt: null })) }, null, 2) + '\n');
}

if (releasePages.length) {
  const crypto2 = require('crypto');
  const urls = [];
  for (const page of releasePages) {
    let html = fs.readFileSync(path.join(__dirname, 'release', page.file), 'utf8');
    if (crypto2.createHash('sha256').update(html).digest('hex') !== page.htmlSha256) throw new Error(`release/${page.file} differs from its manifest hash. Regenerate with scripts/build-release.cjs.`);
    for (const r of replacements) html = html.split(`/${r.original}`).join(`/${r.hashed}`);
    if (releaseCandidate) html = html.replace('<meta name="robots" content="index, follow">', '<meta name="robots" content="noindex, nofollow, noarchive">');
    const file = path.join(DIST, page.file);
    ensureDir(path.dirname(file));
    fs.writeFileSync(file, html);
    urls.push(page.canonical);
    console.log(`  ${page.file} — release page${releaseCandidate ? ' (local candidate)' : ''}`);
  }
  const sitemapFile = path.join(DIST, 'sitemap.xml');
  const sitemap = fs.readFileSync(sitemapFile, 'utf8');
  fs.writeFileSync(sitemapFile, sitemap.replace('</urlset>', urls.filter(u => !sitemap.includes(`<loc>${u}</loc>`)).map(u => `  <url><loc>${u}</loc></url>\n`).join('') + '</urlset>'));
  if (releaseCandidate) {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'serve.json'), 'utf8'));
    config.headers.push({ source: '**', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] });
    fs.writeFileSync(path.join(DIST, 'serve.json'), JSON.stringify(config, null, 2) + '\n');
    fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  }
}

console.log(`\nBuild complete → ${outputName}/`);
