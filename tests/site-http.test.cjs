// Run against the actual serving configuration: SITE_URL=http://localhost:3002 node --test tests/site-http.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const origin = process.env.SITE_URL || 'http://localhost:3002';
const pages = ['/', '/about.html', '/faq.html', '/founders.html', '/accessibility.html', '/privacy.html', '/terms.html', ...['re','vc','pe','credit','hedge'].map(s => `/${s}/`), '/product-demo/index.html'];

test('every published page and its browser-loaded assets resolve under the production server rules', async () => {
  for (const route of pages) {
    const response = await fetch(new URL(route, origin));
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get('content-type'), /text\/html/, route);
    const html = await response.text();
    for (const match of html.matchAll(/<(?:script|link|img|iframe)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
      if (/<link\b/.test(match[0]) && /rel="(?:canonical|alternate)"/.test(match[0])) continue;
      const url = new URL(match[1].replaceAll('&amp;', '&'), response.url);
      assert.equal(url.origin, origin, `Unexpected external resource on ${route}: ${url}`);
      const asset = await fetch(url);
      assert.equal(asset.status, 200, `${route}: ${url}`);
      if (/\.(js|css|ttf|otf|png|svg|ico)(\?|$)/.test(url.pathname)) {
        assert.doesNotMatch(asset.headers.get('content-type'), /text\/html/, `HTML fallback for ${url}`);
      }
      if (/\.css$/.test(url.pathname)) {
        const css = await asset.text();
        for (const font of css.matchAll(/url\(['"]?([^)'" ]+\.(?:ttf|otf|woff2?))['"]?\)/g)) {
          const fontURL = new URL(font[1], url);
          assert.equal(fontURL.origin, origin, `External font: ${fontURL}`);
          assert.equal((await fetch(fontURL)).status, 200, `${fontURL}`);
        }
      }
    }
  }
});

test('security policy applies to HTML and scripts and private source files are not served', async () => {
  for (const route of ['/', '/privacy.html', '/product-demo/index.html']) {
    const response = await fetch(new URL(route, origin));
    const csp = response.headers.get('content-security-policy');
    assert.match(csp, /script-src 'self'/);
    assert.doesNotMatch(csp, /unsafe-eval/);
    assert.match(csp, /frame-ancestors 'self'/);
    assert.match(csp, /form-action 'none'/);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('referrer-policy'), 'strict-origin-when-cross-origin');
  }
  for (const route of ['/docs/legal-compliance-audit.md', '/.git/config', '/src/privacy.html', '/fonts/', '/js/']) {
    assert.equal((await fetch(new URL(route, origin))).status, 404, route);
  }
});

test('FAQ structured data repeats the visible answers and all FAQ rows share the exclusive group', async () => {
  const html = await (await fetch(new URL('/faq.html', origin))).text();
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const plain = value => value.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replace(/\s+/g, ' ').trim();
  const entries = [...html.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)];
  assert.equal(entries.length, schema.mainEntity.length);
  entries.forEach((entry, index) => {
    assert.match(entry[1], /name="cosimo-faq"/);
    const summary = entry[2].match(/<summary[^>]*>([\s\S]*?)<\/summary>/)[1];
    const answer = entry[2].replace(/<summary[^>]*>[\s\S]*?<\/summary>/, '');
    assert.equal(plain(summary), schema.mainEntity[index].name);
    assert.equal(plain(answer), schema.mainEntity[index].acceptedAnswer.text);
  });
});
