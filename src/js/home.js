(() => {
'use strict';
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function randBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  // Shared coordinator — enforces a 3s quiet window where both lines are static
  const typewriterCoord = {
    lastAnimEnd: 0,
    quietWindow: 3000,

    requestStart(callback, schedule = setTimeout) {
      const now = Date.now();
      const elapsed = now - this.lastAnimEnd;
      if (elapsed >= this.quietWindow) {
        callback();
      } else {
        schedule(callback, this.quietWindow - elapsed);
      }
    },

    reportLanded() {
      this.lastAnimEnd = Date.now();
    }
  };

  function createTypewriter(element, lines, cycleDuration, coord, onLanded = () => {}) {
    const timers = new Set();
    let targetText = element.textContent;
    function schedule(callback, delay) {
      const timer = setTimeout(() => { timers.delete(timer); callback(); }, delay);
      timers.add(timer);
    }
    const shuffled = shuffleArray([...lines]);
    let index = 0;

    // If first shuffled item matches current text, swap with next
    if (shuffled[0] === element.textContent && shuffled.length > 1) {
      [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
    }

    function getNext() {
      const text = shuffled[index];
      index = (index + 1) % shuffled.length;
      if (index === 0) {
        const last = shuffled[shuffled.length - 1];
        shuffleArray(shuffled);
        if (shuffled[0] === last && shuffled.length > 1) {
          [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
        }
      }
      return text;
    }

    function deleteText(callback) {
      element.classList.add('typewriter-cursor');
      const current = element.textContent;
      let i = current.length;

      function removeChar() {
        if (i <= 0) {
          element.textContent = '';
          schedule(callback, 200);
          return;
        }
        i--;
        element.textContent = current.slice(0, i);
        schedule(removeChar, randBetween(20, 40));
      }
      removeChar();
    }

    function typeText(text, callback) {
      let i = 0;

      function addChar() {
        if (i >= text.length) {
          element.classList.remove('typewriter-cursor');
          callback();
          return;
        }
        i++;
        element.textContent = text.slice(0, i);
        schedule(addChar, randBetween(40, 80));
      }
      addChar();
    }

    function cycle() {
      const next = getNext();
      targetText = next;
      const animStart = Date.now();

      deleteText(() => {
        typeText(next, () => {
          onLanded(next);
          coord.reportLanded();
          const animTime = Date.now() - animStart;
          const holdTime = Math.max(1500, cycleDuration - animTime);
          schedule(() => {
            coord.requestStart(cycle, schedule);
          }, holdTime);
        });
      });
    }

    function start(initialDelay) {
      schedule(cycle, initialDelay);
    }

    function stop() {
      timers.forEach(clearTimeout);
      timers.clear();
      element.classList.remove('typewriter-cursor');
      // Pause on a complete phrase, including when interrupted during deletion.
      element.textContent = targetText;
      onLanded(targetText);
    }
    return { start, stop };
  }



const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.getElementById('nav-toggle');
const nav = document.querySelector('.nav-right');
const mobileMenu = matchMedia('(max-width: 640px)');
const menuBackground = new Map();
nav.id = nav.id || 'home-navigation';
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
const pause = document.querySelector('.home-pause');
let paused = false, visible = true, writers = [];
function sync() {
  writers.forEach(w => w.stop()); writers=[];
  if (paused || reduced.matches || document.hidden || !visible) return;
  typewriterCoord.lastAnimEnd=0;
  writers=[createTypewriter(document.getElementById('hero-top'), ['Investor reports.','Portfolio updates.','Investor requests.'],8000,typewriterCoord),createTypewriter(document.getElementById('hero-bottom'), ['Before your coffee cools.','In a jiffy.','On your desk today.','Off your to-do list.'],11000,typewriterCoord)];
  writers[0].start(2000); writers[1].start(5500);
}
pause.addEventListener('click', () => { paused=!paused; pause.innerHTML=paused?'▷ <span>Play</span>':'Ⅱ <span>Pause</span>'; pause.setAttribute('aria-label',`${paused?'Play':'Pause'} headline rotation`); sync(); });
new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); },{threshold:.15}).observe(document.querySelector('.home-hero'));
reduced.addEventListener('change',sync); document.addEventListener('visibilitychange',sync);

const steps = [
 ['Gather the records.','The accounts provide the figures, the company updates explain what happened, and last quarter’s report provides the format.','Three records, one place'],
 ['Keep discrepancies in view.','The accounts and management update disagree on Fiesole’s revenue. The difference is flagged rather than silently resolved.','One figure needs confirmation'],
 ['The draft, with questions flagged.','Figures and commentary come together in your reporting format. The unresolved revenue figure stays visible for your reviewer.','Your investor update']
];
let replayTimers=[];
const replay = document.getElementById('home-replay');
function stopReplay() { replayTimers.forEach(clearTimeout); replayTimers=[]; replay.textContent='Replay the walkthrough ↻'; replay.setAttribute('aria-pressed','false'); }
function setStep(i) {
 document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===i)));
 document.getElementById('home-output').dataset.stage=i;
 document.querySelectorAll('[data-stage-panel]').forEach(panel => { panel.hidden = Number(panel.dataset.stagePanel) !== i; });
 document.getElementById('home-step-count').textContent=`0${i+1} / 03`;
 document.getElementById('home-step-title').textContent=steps[i][0];
 document.getElementById('home-step-description').textContent=steps[i][1];
 document.getElementById('home-output-label').textContent=steps[i][2];
 updateTableHints();
}
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{stopReplay();setStep(Number(b.dataset.step));}));
replay.addEventListener('click',()=>{
 if(replayTimers.length) {stopReplay();return;}
 if(reduced.matches) {setStep(0);return;}
 setStep(0); if (matchMedia('(max-width: 760px)').matches) document.querySelector('.home-demo-steps').scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth', block: 'start'}); replay.textContent='Pause walkthrough Ⅱ';replay.setAttribute('aria-pressed','true');
 replayTimers=[setTimeout(()=>setStep(1),3000),setTimeout(()=>{setStep(2);stopReplay();},6500)];
});
const table = `<div class="home-table-scroll"><table><caption>Q3 2026 revenue · USD millions</caption><thead><tr><th>Company</th><th>Actual</th><th>Budget</th><th>Variance</th></tr></thead><tbody><tr><th>Arno Systems</th><td>12.4</td><td>12.0</td><td>+0.4</td></tr><tr><th>Pitti Packaging</th><td>8.6</td><td>9.0</td><td>−0.4</td></tr><tr><th>Fiesole Services</th><td>6.0</td><td>6.5</td><td>−0.5</td></tr><tr><th>Total</th><td>27.0</td><td>27.5</td><td>−0.5</td></tr></tbody></table></div>`;
const sources=[
 ['Q3 management accounts', `<p>Prepared 3 October 2026. Figures supplied in the fund’s management accounts workbook.</p>${table}<p>Fiesole’s revenue is recorded at $6.0m. These are the figures used in the illustrative draft; the conflicting management update remains unresolved.</p>`],
 ['Company updates', `<p><strong>From:</strong> Portfolio operations<br><strong>Date:</strong> 4 October 2026<br><strong>Subject:</strong> Q3 company commentary</p><h3>Arno Systems</h3><p>Revenue finished $0.4m above budget following two contract renewals closing earlier than planned.</p><h3>Pitti Packaging</h3><p>Revenue finished $0.4m below budget. Management attributes the shortfall to lower September order volumes.</p><h3>Fiesole Services</h3><p>Q3 revenue was $6.4m. Two customer launches moved into October; revised launch dates are still being confirmed.</p><aside class="home-review-note"><p>The $6.4m figure above conflicts with the $6.0m in the accounts. Neither source establishes which is correct.</p></aside>`],
 ['Prior report outline', `<p>Renaissance Capital · Q2 2026 · Headings and editorial conventions</p><h3>Portfolio overview</h3><p>Open with combined revenue against budget. Explain the largest movements in plain language.</p><h3>Company performance</h3><p>Present company actuals and budget in USD millions. Follow with the management commentary behind each variance.</p><h3>Items for review</h3><p>Keep an internal list of unresolved questions and supporting records. Remove internal review notes only after the team resolves them.</p><p>This example supplies the layout and editorial conventions, not current-quarter figures.</p>`]
];
function updateTableHints() {
 document.querySelectorAll('.home-table-scroll').forEach(table => {
  const overflows = table.scrollWidth > table.clientWidth + 1;
  let hint = table.nextElementSibling;
  if (!hint || !hint.classList.contains('home-scroll-hint')) {
   hint = document.createElement('p');
   hint.className = 'home-scroll-hint';
   hint.textContent = 'Scroll sideways to see every column. Use the arrow keys when the table is focused.';
   table.after(hint);
  }
  hint.hidden = !overflows;
  if (overflows) {
   table.tabIndex = 0;
   table.setAttribute('role', 'region');
   table.setAttribute('aria-label', 'Scrollable revenue table');
  } else {
   table.removeAttribute('tabindex');
   table.removeAttribute('role');
   table.removeAttribute('aria-label');
  }
 });
}
window.addEventListener('resize', updateTableHints);
if (document.fonts) document.fonts.ready.then(updateTableHints);
updateTableHints();
const dialog=document.getElementById('home-dialog');
const content=document.getElementById('home-dialog-content');
function openDoc(title,html) {stopReplay();document.getElementById('home-dialog-title').textContent=title;content.innerHTML=html;dialog.showModal();dialog.scrollTop=0;updateTableHints();}
document.querySelectorAll('[data-source]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();const s=sources[Number(b.dataset.source)];openDoc(s[0],`<article class="home-modal-page"><p class="home-paper-date">Illustrative source record</p>${s[1]}</article>`);}));
document.getElementById('home-open-report').addEventListener('click',()=>openDoc('Draft portfolio update · 3 pages',`
<article class="home-modal-page"><p class="home-paper-date">Renaissance Capital · Q3 2026 · 1 / 3</p><h3>Portfolio overview</h3><p>Combined revenue across Arno Systems, Pitti Packaging, and Fiesole Services was $27.0m against a $27.5m budget, based on the management accounts.</p><p>Arno’s $0.4m outperformance partially offset shortfalls of $0.4m at Pitti and $0.5m at Fiesole. Management attributes Arno’s outperformance to earlier contract renewals and Pitti’s shortfall to lower order volumes. Fiesole reported two delayed launches, but their revenue impact remains unconfirmed.</p><p>Fiesole’s launch dates require confirmation. Its management update also reports a different revenue figure from the accounts; the draft total is provisional until that difference is resolved.</p><p class="home-review-note">Internal draft. Not approved for investor distribution.</p></article>
<article class="home-modal-page"><p class="home-paper-date">Company performance · 2 / 3</p><h3>Revenue against budget</h3>${table}<h4>Management commentary</h4><p><strong>Arno Systems:</strong> Two contract renewals closed earlier than planned.</p><p><strong>Pitti Packaging:</strong> Lower September order volumes contributed to the shortfall.</p><p><strong>Fiesole Services:</strong> Two customer launches moved into October. Revised dates remain unconfirmed.</p><p>Sources: Q3 management accounts, 3 October; company updates, 4 October. Commentary reflects management’s explanations.</p></article>
<article class="home-modal-page"><p class="home-paper-date">Internal review notes · 3 / 3</p><h3>Before this goes to investors</h3><h4>Confirm Fiesole’s revenue</h4><p>The workbook records $6.0m; the company update states $6.4m. This draft uses the workbook. Ask the finance lead to confirm the correct amount, then update the company line, combined total, and variance commentary if necessary.</p><h4>Confirm the launch dates</h4><p>Ask management for the revised customer launch dates. No recovery forecast has been assumed.</p><h4>Review and approve</h4><p>Check the figures and explanations against the final source records. The fund’s reviewer approves the investor version after resolving these questions.</p><p>Format reference: Q2 2026 report outline. All records and figures in this demonstration are fictional.</p></article>`));
document.getElementById('home-dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
