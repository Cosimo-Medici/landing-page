// Run: node --test tests/buyer-intake.test.cjs
// Exercises the shipped enquiry contract and the release build. No network.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const intake = require('../src/js/buyer-intake.js');

const root = path.join(__dirname, '..');
const input = { name: 'Technical Fixture', company: 'Fictional Fund', email: 'fixture@example.invalid', problem: 'Reconcile a fictional close',
  output: 'Source-linked comparison', period: '2026 Q3', decision: 'Which differences require review?', reviewer: 'Fictional controller', owner: 'Fictional operations lead' };
const utm = { utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'quarter-close', utm_content: 'spot-error-2026-11' };

test('enquiry addresses the existing contact address and carries page, tool, campaign and owner', () => {
  const prepared = intake.prepare(input, utm, '2026-11-20T15:00:00Z', { page: '/spot-the-error/', tool: 'spot-the-error' }, 123456);
  const mail = intake.enquiry(prepared);
  assert.equal(mail.to, 'info@medici.ai');
  assert.equal(prepared.attribution.status, 'supplied_unverified');
  assert.match(mail.subject, /^Workflow request: Fictional Fund \[spot-the-error web-20261120T150000-002n9c\]$/);
  for (const [k, v] of Object.entries(input)) assert(mail.body.includes(v), k);
  const parsed = intake.parseAttribution(mail.body);
  assert.deepEqual(parsed, { request_id: 'web-20261120T150000-002n9c', page: '/spot-the-error/', tool: 'spot-the-error', ...utm,
    sales_owner: 'Eliot Puplett', backup_owner: 'Aamina Bawany', prepared_at: '2026-11-20T15:00:00.000Z' });
  assert(mail.mailto.startsWith('mailto:info@medici.ai?subject='));
  assert.equal(decodeURIComponent(new URL(mail.gmail).searchParams.get('body')), mail.body);
});

test('direct visits record missing campaign fields as none, not invented values', () => {
  const mail = intake.enquiry(intake.prepare(input, {}, '2026-11-20T15:00:00Z', { page: '/reverse-demo/', tool: 'reverse-demo' }, 1));
  const parsed = intake.parseAttribution(mail.body);
  assert.equal(parsed.utm_source, null);
  assert.equal(parsed.utm_content, null);
});

test('rejects files, unknown tools, bad paths, overlong answers and unprepared sends', () => {
  assert.throws(() => intake.prepare({ ...input, file: 'x' }, {}, Date.now()), /files/);
  assert.throws(() => intake.prepare(input, {}, Date.now(), { page: '/reverse-demo/', tool: 'crm-write' }), /Unknown tool/);
  assert.throws(() => intake.prepare(input, {}, Date.now(), { page: 'https://evil.example/', tool: 'article' }), /page path/);
  assert.throws(() => intake.prepare({ ...input, problem: 'x'.repeat(801) }, {}, Date.now()), /problem/);
  assert.throws(() => intake.fromSearch('?utm_source=a&utm_source=b'), /Duplicate/);
  assert.throws(() => intake.enquiry({ status: 'local_draft_not_submitted' }), /Prepare/);
});

test('maximum-length request stays within a Gmail compose URL limit', () => {
  const long = { ...input, problem: 'p'.repeat(800), output: 'o'.repeat(800), decision: 'd'.repeat(800) };
  for (const k of ['name', 'company', 'period', 'reviewer', 'owner']) long[k] = 'n'.repeat(200);
  const mail = intake.enquiry(intake.prepare(long, utm, Date.now(), { page: '/reverse-demo/', tool: 'reverse-demo' }));
  assert(mail.gmail.length < 8000, `Gmail URL is ${mail.gmail.length} characters`);
});

test('production build ships only release pages marked ship: true; candidate build ships all as noindex', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'release/manifest.json'), 'utf8'));
  execFileSync(process.execPath, ['build.js'], { cwd: root, stdio: 'ignore' });
  const sitemap = fs.readFileSync(path.join(root, 'dist/sitemap.xml'), 'utf8');
  for (const p of manifest.pages) {
    assert.equal(fs.existsSync(path.join(root, 'dist', p.file)), p.ship, p.route);
    assert.equal(sitemap.includes(`<loc>${p.canonical}</loc>`), p.ship, p.route);
  }
  execFileSync(process.execPath, ['build.js', '--release-candidate'], { cwd: root, stdio: 'ignore' });
  const serve = JSON.parse(fs.readFileSync(path.join(root, 'serve.json'), 'utf8'));
  for (const p of manifest.pages) {
    const html = fs.readFileSync(path.join(root, 'dist-release', p.file), 'utf8');
    assert(html.includes(`<link rel="canonical" href="${p.canonical}">`), p.route);
    assert(html.includes('content="noindex, nofollow, noarchive"'), p.route);
    assert(!/<script(?![^>]*\bsrc=)(?![^>]*application\/(?:ld\+)?json)[^>]*>/.test(html), `inline script would break CSP on ${p.route}`);
    assert(!/\son[a-z]+="/.test(html), `inline handler on ${p.route}`);
    for (const ref of html.match(/(?:href|src)="\/(?:css|js)\/[^"]+"/g)) assert(fs.existsSync(path.join(root, 'dist-release', ref.split('"')[1])), ref);
    assert(serve.rewrites.some(r => r.source === p.route && r.destination === p.route + 'index.html'), `rewrite ${p.route}`);
  }
});
