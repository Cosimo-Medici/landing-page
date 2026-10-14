// Port of the application BrandMark: identical orbital geometry and C morph.
(() => {
'use strict';
const C = 50; // viewBox centre
const TILT_DEG = -14;
const TILT = (TILT_DEG * Math.PI) / 180;
const TOTAL = 12; // seconds per k=1 revolution
const ARC_A = 70;
const ARC_B = 290; // the C's gap faces right
const SQUASH = 0.4; // orbit plane reads flat, not tipped
const RO = 52; // outermost track radius
const RC = 36; // radius of the C
const SUN = 20;
const SUN_C = 22; // the sun grows on gather
const O_SCALE = 0.56; // satellites orbit at 56% of their size on the C
const O_FLOOR = 0.4;
const RING_O = 0.22;
const IN_MS = 420;
const OUT_MS = 320;
const STAGGER = 18;
// Hold-scene oscillators: a breathing scale on the C and sun, and a wobble
// on each body phase-shifted by its own `ph` so the twelve never move as one.
const OSC_S = 2;
const BREATHE = 0.03;
const WOB = 0.65;

// Four tracks carrying three bodies each. `k` = revolutions per TOTAL, so inner
// orbits run faster; `ph` keeps bodies on one track from travelling as a group.
const RINGS = [0.46, 0.64, 0.82, 1.0];
const SATS = [
  { ri: 0, k: 3, ph: 0.2, s: 30 },
  { ri: 0, k: 3, ph: 2.1, s: 22 },
  { ri: 0, k: 2, ph: 4.0, s: 34 },
  { ri: 1, k: 2, ph: 0.9, s: 26 },
  { ri: 1, k: 2, ph: 3.4, s: 20 },
  { ri: 1, k: 3, ph: 5.2, s: 32 },
  { ri: 2, k: 2, ph: 1.6, s: 24 },
  { ri: 2, k: 1, ph: 2.7, s: 28 },
  { ri: 2, k: 1, ph: 4.6, s: 22 },
  { ri: 3, k: 1, ph: 0.5, s: 34 },
  { ri: 3, k: 1, ph: 3.9, s: 26 },
  { ri: 3, k: 1, ph: 5.6, s: 20 },
];
const N = SATS.length;
const ANG = SATS.map(
  (_, i) => ((ARC_A + i * ((ARC_B - ARC_A) / (N - 1))) * Math.PI) / 180,
);
const DOT_R = (d) => (8 + ((d.s - 20) / 14) * 2.5) / 2;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
// easeInOutQuart
const swing = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

const ARC_D =
  `M ${(C + RC * Math.cos(ANG[0])).toFixed(2)} ${(C + RC * Math.sin(ANG[0])).toFixed(2)}` +
  ` A ${RC} ${RC} 0 1 1 ${(C + RC * Math.cos(ANG[N - 1])).toFixed(2)} ${(C + RC * Math.sin(ANG[N - 1])).toFixed(2)}`;


/** Position, size and weight of satellite `i` at clock `t` and morph `p`. */
function dotAttrs(i, t, p, breathe) {
  const d = SATS[i];
  const a = d.ph + (t * d.k * 2 * Math.PI) / TOTAL;
  const r = RINGS[d.ri] * RO;
  const x0 = r * Math.cos(a);
  const y0 = r * SQUASH * Math.sin(a);
  const ox = C + x0 * Math.cos(TILT) - y0 * Math.sin(TILT);
  const oy = C + x0 * Math.sin(TILT) + y0 * Math.cos(TILT);
  const depth = 0.5 + 0.5 * Math.sin(a); // the far half of the orbit recedes
  // The drawn C holds still at RC while the bodies breathe off it.
  const wob = WOB * Math.sin((2 * Math.PI * t) / OSC_S + d.ph);
  return {
    cx: (lerp(ox, C + RC * breathe * Math.cos(ANG[i]), p) + wob * p).toFixed(2),
    cy: (
      lerp(oy, C + RC * breathe * Math.sin(ANG[i]), p) +
      wob * 0.6 * p
    ).toFixed(2),
    r: (DOT_R(d) * lerp(O_SCALE * (0.85 + 0.3 * depth), 1, p)).toFixed(2),
    opacity: lerp(O_FLOOR + (1 - O_FLOOR) * depth, 1, p).toFixed(3),
  };
}

const sunR = (p, breathe) =>
  ((lerp(SUN, SUN_C, p) * breathe) / 2).toFixed(2);

const REST = SATS.map((_, i) => dotAttrs(i, 0, 0, 1));


const mq = matchMedia('(prefers-reduced-motion: reduce)');
const marks = [...document.querySelectorAll('[data-brand-mark]')].map(svg => {
  const link = svg.closest('a');
  const state = { svg, dots: [...svg.querySelectorAll('[data-satellite]')], rings: [...svg.querySelectorAll('ellipse')], arc: svg.querySelector('path'), sun: svg.querySelector('[data-sun]'), p: 0, from: 0, to: 0, t0: -1e9, dur: IN_MS };
  const gather = to => { state.from = state.p; state.to = to; state.t0 = performance.now(); state.dur = to ? IN_MS : OUT_MS; render(state.t0); };
  link.addEventListener('pointerenter', () => gather(1));
  link.addEventListener('pointerleave', () => gather(document.activeElement === link ? 1 : 0));
  link.addEventListener('focus', () => gather(1));
  link.addEventListener('blur', () => gather(0));
  return state;
});
function render(now) {
  const frozen = mq.matches || document.documentElement.dataset.a11yMotion === 'reduce';
  const t = frozen ? 0 : now / 1000;
  for (const s of marks) {
    s.p = lerp(s.from, s.to, frozen ? 1 : swing(clamp01((now - s.t0) / s.dur)));
    const breathe = 1 + BREATHE * Math.sin(2 * Math.PI * t / OSC_S) * s.p;
    s.dots.forEach((el, i) => {
      const lead = s.to > s.from ? i : N - 1 - i;
      const p = frozen ? s.to : lerp(s.from, s.to, swing(clamp01((now - s.t0 - lead * STAGGER) / s.dur)));
      Object.entries(dotAttrs(i, t, p, breathe)).forEach(([key, value]) => el.setAttribute(key, value));
    });
    s.sun.setAttribute('r', sunR(s.p, breathe));
    s.rings.forEach(el => el.setAttribute('opacity', (RING_O * (1 - s.p)).toFixed(3)));
    s.arc.setAttribute('opacity', (0.35 * s.p).toFixed(3));
  }
}
let raf = 0;
function tick(now) { render(now); raf = requestAnimationFrame(tick); }
function stop() { cancelAnimationFrame(raf); raf = 0; }
function start() { if (!document.hidden && !mq.matches && document.documentElement.dataset.a11yMotion !== 'reduce' && marks.length && !raf) raf = requestAnimationFrame(tick); }
document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
document.addEventListener('cosimo-motion-change', () => { stop(); render(performance.now()); start(); });
mq.addEventListener('change', () => { stop(); render(performance.now()); start(); });
render(0);
start();
})();
