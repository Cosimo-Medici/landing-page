// Shared theme and accessible mobile navigation for every marketing page.
(() => {
'use strict';
const menu = document.getElementById('nav-toggle');
const nav = document.querySelector('.nav-right');
const mobileMenu = matchMedia('(max-width: 760px)');
const menuBackground = new Map();
nav.id = nav.id || 'page-navigation';
menu.setAttribute('aria-controls', nav.id);
function closeMenu(restoreFocus = false) {
  const wasOpen = nav.classList.contains('open');
  nav.classList.remove('open');
  menu.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
  nav.inert = mobileMenu.matches;
  menuBackground.forEach((wasInert, element) => { element.inert = wasInert; });
  menuBackground.clear();
  if (restoreFocus && wasOpen) menu.focus();
}
function openMenu() {
  nav.inert = false;
  nav.classList.add('open');
  menu.classList.add('open');
  menu.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-label', 'Close menu');
  document.body.classList.add('menu-open');
  // The mobile drawer covers the page. Keep focus and assistive navigation in it.
  [...document.body.children].forEach(element => {
    if (element.contains(menu) || element.tagName === 'SCRIPT') return;
    menuBackground.set(element, element.inert);
    element.inert = true;
  });
  nav.querySelector('a').focus();
}
menu.addEventListener('click', () => {
  if (nav.classList.contains('open')) closeMenu(true);
  else openMenu();
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (!nav.classList.contains('open')) return;
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); return; }
  if (event.key !== 'Tab') return;
  const controls = [...nav.querySelectorAll('a[href]'), menu];
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
mobileMenu.addEventListener('change', () => {
  const focusedClosedLink = mobileMenu.matches && nav.contains(document.activeElement);
  closeMenu();
  if (focusedClosedLink) menu.focus();
});
closeMenu();
})();
