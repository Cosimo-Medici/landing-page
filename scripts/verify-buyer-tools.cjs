#!/usr/bin/env node
'use strict';
// Loopback browser check of the shipped buyer tools in a built site (dist/ or dist-release/).
// Usage: node scripts/verify-buyer-tools.cjs http://127.0.0.1:3012 /absolute/output/dir
// Checks at 1440px and 390px in light mode: the spot-the-error answer, the tracked link into
// the workflow request, the email addressed to info@medici.ai with the attribution block,
// no page errors, no horizontal overflow and no request other than local GETs and the mailto.
// It opens no email client and sends nothing.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const {createRequire} = require('node:module');
const {chromium} = createRequire(path.resolve(__dirname, '../../cosimo/frontend/package.json'))('@playwright/test');
const origin = new URL(process.argv[2] || 'http://127.0.0.1:3012'), out = process.argv[3];
if (origin.protocol !== 'http:' || origin.hostname !== '127.0.0.1' || origin.username || origin.password) throw Error('Only a loopback site is supported.');
if (!out || !path.isAbsolute(out)) throw Error('Provide an absolute output directory.');
const input = {name: 'Technical Fixture', company: 'Fictional Fund', email: 'fixture@example.invalid', problem: 'Reconcile a fictional close', output: 'Source-linked comparison',
  period: '2026 Q3', decision: 'Which differences require review?', reviewer: 'Fictional controller', owner: 'Fictional operations lead'};
async function main() {
  fs.mkdirSync(out, {recursive: true});
  const browser = await chromium.launch({headless: true}), checks = [], errors = [];
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({viewport: {width, height: 1000}, reducedMotion: 'reduce', colorScheme: 'light'}), requests = [], bad = [];
      page.on('request', r => requests.push({method: r.method(), url: r.url()}));
      page.on('response', r => { if (r.status() >= 400) bad.push(r.url()); });
      page.on('pageerror', e => errors.push(e.message));
      const shot = async name => {
        await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; document.activeElement?.blur(); window.scrollTo(0, 0); });
        await page.screenshot({path: path.join(out, `${name}-${width}.png`), fullPage: true});
      };
      await page.goto(new URL('/spot-the-error/', origin).href);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'index, follow');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://cosimo.work/spot-the-error/');
      await shot('spot-the-error');
      await page.locator('#field').selectOption('ending_capital');
      await page.locator('#amount').fill('5480000.00');
      await page.getByRole('button', {name: 'Check answer', exact: true}).click();
      assert((await page.locator('#spot-error-feedback').innerText()).includes('does not match'));
      await page.locator('#amount').fill('5470000.00');
      await page.getByRole('button', {name: 'Check answer', exact: true}).click();
      assert((await page.locator('#spot-error-feedback').innerText()).startsWith('Correct.'));
      await page.getByRole('link', {name: 'Describe your own workflow', exact: true}).click();
      await page.waitForURL(/\/reverse-demo\/\?utm_source=website&utm_medium=tool/);
      await shot('reverse-demo-empty');
      for (const [name, value] of Object.entries(input)) await page.locator('#' + name).fill(value);
      await page.getByRole('button', {name: 'Send request', exact: true}).click();
      const href = await page.locator('#open-email').getAttribute('href');
      assert(href.startsWith('mailto:info@medici.ai?'));
      const body = new URL(href).searchParams.get('body');
      for (const line of ['page: /reverse-demo/', 'tool: reverse-demo', 'utm_source: website', 'utm_medium: tool', 'utm_campaign: quarter-close', 'sales_owner: Eliot Puplett', 'backup_owner: Aamina Bawany'])
        assert(body.includes(line), line);
      for (const value of Object.values(input)) assert(body.includes(value), value);
      assert(await page.locator('#request-actions').isVisible());
      await page.locator('#owner').fill('Changed fictional owner');
      assert(!(await page.locator('#request-actions').isVisible()), 'changed field hides the stale email');
      await page.getByRole('button', {name: 'Send request', exact: true}).click();
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await shot('reverse-demo-sent');
      const unexpected = requests.filter(r => !(r.method === 'GET' && (new URL(r.url).origin === origin.origin || r.url.startsWith('mailto:info@medici.ai?'))));
      assert.deepEqual(unexpected, []); assert.deepEqual(bad, []);
      checks.push({width, theme: 'light', spotAnswer: true, trackedLinkIntoRequest: true, mailtoAddressedToInfo: true, attributionBlock: true, staleEmailHidden: true, noOverflow: true, noUnexpectedRequests: true});
      await page.close();
    }
    assert.deepEqual(errors, []);
    const report = {kind: 'loopback_browser_check', observedAt: new Date().toISOString(), origin: origin.origin, checks, pageErrors: errors, emailsSent: 0};
    fs.writeFileSync(path.join(out, 'browser-check.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({status: 'passed', checks: checks.length, report: path.join(out, 'browser-check.json')}));
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
