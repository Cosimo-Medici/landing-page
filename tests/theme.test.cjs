const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../src/js/theme.js'), 'utf8');

// The controller is local-only. Supply browser events, time, and storage inputs;
// execute the actual shipped script and assert its rendered state and persistence.
function visit(zone, instant, { saved = null, blockedStorage = false } = {}) {
  let current = new Date(instant);
  const events = {}, clicks = {}, timers = [];
  const button = { id: 'theme-toggle', setAttribute(k, v) { this[k] = v; }, addEventListener(k, fn) { clicks[k] = fn; } };
  const document = { documentElement: { dataset: {}, style: {} }, hidden: false,
    addEventListener(k, fn) { events[k] = fn; }, querySelectorAll() { return [button]; } };
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [current.getTime()])); } }
  const localStorage = {
    getItem() { if (blockedStorage) throw Error('Storage blocked'); return saved; },
    setItem(key, value) { if (blockedStorage) throw Error('Storage blocked'); saved = value; }
  };
  vm.runInNewContext(source, { document, localStorage, Date: Clock,
    Intl: { DateTimeFormat() { return { resolvedOptions() { return { timeZone: zone }; } }; } },
    window: { addEventListener(k, fn) { events[k] = fn; } }, setInterval(fn) { timers.push(fn); } });
  return { document, button, events, clicks,
    theme: () => document.documentElement.dataset.theme,
    saved: () => saved,
    ready: () => events.DOMContentLoaded(),
    tick(instant) { current = new Date(instant); timers.forEach(fn => fn()); },
    storage(value) { saved = value; events.storage({ key: 'medici-theme' }); }
  };
}

test('daylight follows location, season, DST, and either side of sunrise/sunset', () => {
  const cases = [
    ['America/New_York', '2026-10-07T10:50:00Z', 'dark'],
    ['America/New_York', '2026-10-07T11:15:00Z', 'light'],
    ['America/New_York', '2026-10-07T22:20:00Z', 'light'],
    ['America/New_York', '2026-10-07T22:45:00Z', 'dark'],
    ['America/New_York', '2026-01-15T23:00:00Z', 'dark'],
    ['America/New_York', '2026-07-15T22:00:00Z', 'light'],
    ['Australia/Sydney', '2026-01-15T08:00:00Z', 'light'],
    ['Australia/Sydney', '2026-07-15T08:00:00Z', 'dark'],
    ['Europe/London', '2026-07-15T19:00:00Z', 'light'],
    ['Europe/London', '2026-01-15T19:00:00Z', 'dark'],
    ['Asia/Kolkata', '2026-10-07T06:00:00Z', 'light'],
    ['Asia/Calcutta', '2026-10-07T18:00:00Z', 'dark'],
    ['Pacific/Auckland', '2026-01-01T00:00:00Z', 'light'],
    ['Pacific/Auckland', '2026-01-01T12:00:00Z', 'dark'],
    ['Arctic/Longyearbyen', '2026-06-21T22:00:00Z', 'light'],
    ['Arctic/Longyearbyen', '2026-12-21T11:00:00Z', 'dark'],
    ['Europe/London', '2028-02-29T12:00:00Z', 'light'],
  ];
  for (const [zone, instant, expected] of cases) assert.equal(visit(zone, instant).theme(), expected, `${zone} ${instant}`);
});

test('unknown time zone falls back to the local clock', () => {
  assert.equal(visit('Unknown/Zone', new Date(2026, 9, 7, 12)).theme(), 'light');
  assert.equal(visit('UTC', new Date(2026, 9, 7, 23)).theme(), 'dark');
});

test('automatic theme updates after sunset, on return, and without persisting a preference', () => {
  const page = visit('America/New_York', '2026-10-07T22:20:00Z');
  assert.equal(page.theme(), 'light'); // Applied even before DOMContentLoaded.
  page.ready();
  page.tick('2026-10-07T22:45:00Z');
  assert.equal(page.theme(), 'dark');
  assert.equal(page.button['aria-label'], 'Switch to light theme');
  assert.equal(page.saved(), null);
  page.document.hidden = true;
  page.tick('2026-10-08T16:00:00Z');
  assert.equal(page.theme(), 'dark');
  page.document.hidden = false;
  page.events.visibilitychange();
  assert.equal(page.theme(), 'light');
});

test('manual choice survives time changes and the next page, then syncs across tabs', () => {
  const page = visit('America/New_York', '2026-10-07T16:00:00Z');
  page.ready(); page.clicks.click();
  assert.equal(page.theme(), 'dark');
  assert.equal(page.saved(), 'dark');
  page.tick('2026-10-08T16:00:00Z');
  assert.equal(page.theme(), 'dark');
  assert.equal(visit('America/New_York', '2026-10-08T16:00:00Z', { saved: page.saved() }).theme(), 'dark');
  page.storage('light');
  assert.equal(page.theme(), 'light');
  page.tick('2026-10-08T23:00:00Z');
  assert.equal(page.theme(), 'light');
  page.storage(null);
  assert.equal(page.theme(), 'dark');
});

test('blocked storage still allows automatic theme and a manual choice for this visit', () => {
  const page = visit('America/New_York', '2026-10-07T16:00:00Z', { blockedStorage: true });
  page.ready();
  assert.equal(page.theme(), 'light');
  page.clicks.click();
  page.tick('2026-10-08T16:00:00Z');
  assert.equal(page.theme(), 'dark');
});

test('all ten built routes load the shared controller before any stylesheet', () => {
  for (const route of ['index.html', 'about.html', 'faq.html', 'privacy.html', 'terms.html', ...['re','vc','pe','credit','hedge'].map(s => `${s}/index.html`)]) {
    const file = path.join(__dirname, '../dist', route);
    const html = fs.readFileSync(file, 'utf8');
    const script = html.match(/<script src="([^"]*js\/theme\.[a-f0-9]+\.js)"><\/script>/);
    assert.ok(script, route);
    assert.ok(html.indexOf(script[0]) < html.indexOf('rel="stylesheet"'), route);
    assert.ok(fs.existsSync(path.resolve(path.dirname(file), script[1])), route);
  }
});
