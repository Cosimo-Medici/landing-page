// A persistent, explicit pause independent of operating-system motion settings.
(() => {
  'use strict';
  const root = document.documentElement;
  const control = document.querySelector('.motion-toggle');
  let paused = false;
  try { paused = localStorage.getItem('cosimo-motion') === 'reduce'; } catch (_) {}
  function apply() {
    root.dataset.a11yMotion = paused ? 'reduce' : 'default';
    if (control) {
      control.setAttribute('aria-pressed', String(paused));
      control.textContent = paused ? 'Resume animations' : 'Pause animations';
    }
    document.dispatchEvent(new Event('cosimo-motion-change'));
    document.querySelectorAll('iframe').forEach(frame => {
      try { if (frame.contentDocument) frame.contentDocument.documentElement.dataset.a11yMotion = paused ? 'reduce' : 'default'; } catch (_) {}
    });
  }
  document.querySelectorAll('iframe').forEach(frame => frame.addEventListener('load', apply));
  control?.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('cosimo-motion', paused ? 'reduce' : 'default'); } catch (_) {}
    apply();
  });
  apply();
})();
