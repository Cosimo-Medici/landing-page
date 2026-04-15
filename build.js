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
const DIST = path.join(__dirname, 'dist');

// Files to hash (source path relative to SRC → directory in dist)
const HASHABLE = [
  { src: 'css/styles.css', dir: 'css' },
  { src: 'js/main.js',     dir: 'js' },
  { src: 'js/demo-data.js', dir: 'js' },
];

// HTML files that reference the hashable assets
const HTML_FILES = ['index.html', 'faq.html', 'privacy.html', 'terms.html'];

// Static assets to copy as-is (relative to SRC, stripped of public/ prefix in dist)
const STATIC = [
  'public/ChicagoFLF.ttf',
  'public/dream orphanage rg.otf',
  'public/apple-touch-icon.png',
  'public/favicon.ico',
  'public/favicon.svg',
  'public/favicon-96x96.png',
  'public/og-image.png',
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

  for (const r of replacements) {
    // Replace exact references like href="css/styles.css" or src="js/main.js"
    html = html.split(r.original).join(r.hashed);
  }

  fs.writeFileSync(path.join(DIST, htmlFile), html);
  console.log(`  ${htmlFile} — references updated`);
}

// --- Copy static assets (strip public/ prefix for dist) ---

for (const file of STATIC) {
  const srcPath = path.join(SRC, file);
  if (!fs.existsSync(srcPath)) continue;
  const destName = file.startsWith('public/') ? file.slice(7) : file;
  copyFile(srcPath, path.join(DIST, destName));
}

console.log(`\nBuild complete → dist/`);
