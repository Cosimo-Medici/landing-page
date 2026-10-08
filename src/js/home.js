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
 ['Your portfolio, in Cosimo.','Expand a company or click a figure to inspect its supporting records. Six companies, with LTM figures through September 30 in USD millions. The report uses their Q3 accounts.'],
 ['Follow the reporting task.','See the actual run interface read the Q3 records, check the totals, and flag the $0.4m revenue difference.'],
 ['Your investor report, drafted.','The portfolio update, company figures, and questions for your team — all here. Scroll to read the three-page draft.']
];
const replay=document.getElementById('home-replay');
const workspace=document.getElementById('home-output');
const productFrame=document.getElementById('home-product-frame');
const inlineReport=document.getElementById('home-inline-report');
let demoState={step:0,phase:2,detail:false};
function sendDemo() {productFrame.contentWindow?.postMessage({type:'cosimo-demo',...demoState,theme:document.documentElement.dataset.theme},location.origin);}
productFrame.addEventListener('load',sendDemo);
new MutationObserver(()=>productFrame.contentWindow?.postMessage({type:'cosimo-demo',theme:document.documentElement.dataset.theme},location.origin)).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
let tourTimer=null,tourRunning=false,tourBeat=0,tourStarted=false,tourDue=0,tourRemaining=0;
function stopReplay(){
 if(tourRunning&&tourTimer)tourRemaining=Math.max(0,tourDue-performance.now());
 clearTimeout(tourTimer);tourTimer=null;tourRunning=false;
 replay.textContent=tourBeat>0&&(tourBeat<tour.length||tourRemaining>0)?'Resume walkthrough ▷':tourStarted?'Replay walkthrough ↻':'Play walkthrough ▷';
 replay.setAttribute('aria-pressed','false');
}
function setStep(i){
 demoState={step:i,phase:2,detail:false};workspace.dataset.stage=i;
 productFrame.hidden=i===2;inlineReport.hidden=i!==2;
 workspace.scrollLeft=0;
 workspace.setAttribute('aria-label',i===2?'Draft portfolio update':'Cosimo product example; scroll across on smaller screens');
 document.querySelector('.home-product-hint').hidden=i===2;
 if(i===2){inlineReport.scrollTop=0;updateTableHints();}
 document.querySelectorAll('[data-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.step)===i)));
 document.getElementById('home-step-count').textContent=`0${i+1} / 03`;
 document.getElementById('home-step-title').textContent=steps[i][0];
 document.getElementById('home-step-description').textContent=steps[i][1];sendDemo();
}
function manualStep(i){stopReplay();tourBeat=0;tourRemaining=0;stopReplay();setStep(i);}
document.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>manualStep(Number(b.dataset.step))));
const tour=[()=>setStep(0),()=>{demoState.detail=true;sendDemo();},()=>{setStep(1);demoState.phase=0;sendDemo();},()=>{demoState.phase=1;sendDemo();},()=>{demoState.phase=2;sendDemo();},()=>setStep(2)];
const tourHolds=[3500,6000,3500,4500,7500,5500];
function scheduleTour(delay){tourDue=performance.now()+delay;tourTimer=setTimeout(()=>{tourTimer=null;tourRemaining=0;advanceTour();},delay);}
function advanceTour(){if(!tourRunning)return;if(tourBeat>=tour.length){tourRemaining=0;stopReplay();return;}tour[tourBeat]();scheduleTour(tourHolds[tourBeat++]);}
replay.addEventListener('click',()=>{if(tourRunning){stopReplay();return;}if(reduced.matches)return;if(tourBeat>=tour.length&&!tourRemaining)tourBeat=0;tourStarted=true;tourRunning=true;replay.textContent='Pause walkthrough Ⅱ';replay.setAttribute('aria-pressed','true');if(tourRemaining>0)scheduleTour(tourRemaining);else advanceTour();});
function syncTourMotion(){if(reduced.matches){stopReplay();tourBeat=0;tourRemaining=0;stopReplay();demoState.phase=2;sendDemo();}replay.hidden=reduced.matches;}
reduced.addEventListener('change',syncTourMotion);syncTourMotion();
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopReplay();});
new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&tourRunning)stopReplay();},{threshold:0}).observe(workspace);
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==productFrame.contentWindow)return;
 if(event.data?.type==='cosimo-demo-ready')sendDemo();
 if(event.data?.type==='cosimo-demo-open-report')openReport();
 if(event.data?.type==='cosimo-demo-interaction')stopReplay();
});
const companies = [{"name": "Arno Precision", "revenue": 18, "revenueBudget": 19, "ebitda": 3.2, "ebitdaBudget": 3.5}, {"name": "Pitti Services", "revenue": 14, "revenueBudget": 13.5, "ebitda": 2.1, "ebitdaBudget": 2}, {"name": "Fiesole Components", "revenue": 9, "revenueBudget": 10, "ebitda": 1.1, "ebitdaBudget": 1.4}, {"name": "Oltrarno Software", "revenue": 8, "revenueBudget": 8, "ebitda": 1.6, "ebitdaBudget": 1.6}, {"name": "Cascine Packaging", "revenue": 11, "revenueBudget": 11.5, "ebitda": 1, "ebitdaBudget": 1.2}, {"name": "Porta Logistics", "revenue": 10, "revenueBudget": 10, "ebitda": 0.6, "ebitdaBudget": 0.7}];
const totals = companies.reduce((sum,c) => { for (const key of ['revenue','revenueBudget','ebitda','ebitdaBudget']) sum[key] += c[key]; return sum; }, {revenue:0,revenueBudget:0,ebitda:0,ebitdaBudget:0});
const signed = n => `${n < 0 ? '−' : n > 0 ? '+' : ''}${Math.abs(n).toFixed(1)}`;
function comparisonTable(metric, budget, label) {
 const rows=[...companies,{name:'All six companies',...totals}];
 return `<div class="home-table-scroll"><table><caption>Q3 2026 ${label} · USD millions · company results before ownership weighting</caption><thead><tr><th>Company</th><th>Actual</th><th>Budget</th><th>Variance</th><th>Variance %</th></tr></thead><tbody>${rows.map(c=>`<tr><th>${c.name}</th><td>${c[metric].toFixed(1)}</td><td>${c[budget].toFixed(1)}</td><td>${signed(c[metric]-c[budget])}</td><td>${signed((c[metric]/c[budget]-1)*100)}%</td></tr>`).join('')}</tbody></table></div>`;
}
const table = comparisonTable('revenue','revenueBudget','revenue');
const ebitdaTable = comparisonTable('ebitda','ebitdaBudget','EBITDA');
const sources=[
 ['Q3 management accounts', `<p>Signet Equity · Six companies · Three months ended 30 September 2026. Prepared 3 October 2026. Actuals and budgets use USD millions and the same reporting period.</p>${table}${ebitdaTable}<p>Fiesole’s revenue is recorded at $9.0m. These are the figures used in the draft; the earlier management update’s $9.4m remains unresolved. The dashboard’s LTM figures cover 1 October 2025 through 30 September 2026. Quarterly results are not annualized or ownership-weighted.</p>`],
 ['Company updates', `<p><strong>From:</strong> Portfolio operations<br><strong>Date:</strong> 5 October 2026<br><strong>Subject:</strong> Q3 company commentary</p><h3>Arno Precision</h3><p>Revenue $18.0m against $19.0m budget; EBITDA $3.2m against $3.5m. Shipments moved into Q4. The revised shipping schedule is outstanding.</p><h3>Pitti Services</h3><p>Revenue $14.0m against $13.5m budget; EBITDA $2.1m against $2.0m. Stronger contract renewals supported the result.</p><h3>Fiesole Components</h3><p>An earlier sales update states Q3 revenue of $9.4m. The accounts report $9.0m. EBITDA was $1.1m against $1.4m budget: lower utilization reduced EBITDA by $0.18m and expedited freight by $0.12m. The revised production plan awaits board review.</p><aside class="home-review-note"><p>The $0.4m revenue difference is unresolved. Use the accounts provisionally; do not present the earlier update as a confirmed correction.</p></aside><h3>Oltrarno Software</h3><p>Revenue $8.0m and EBITDA $1.6m, both on budget.</p><h3>Cascine Packaging</h3><p>Revenue $11.0m against $11.5m; EBITDA $1.0m against $1.2m. Management reports higher material costs. Proposed price changes are not approved.</p><h3>Porta Logistics</h3><p>Revenue $10.0m, on budget. EBITDA $0.6m against $0.7m. Management’s explanation is outstanding.</p>`],
 ['Prior report outline', `<p>Signet Equity · Q2 2026 · Headings and editorial conventions</p><h3>Portfolio overview</h3><p>Open with combined revenue and EBITDA against budget. Explain the largest movements in plain language.</p><h3>Company performance</h3><p>Present all six companies’ actuals and budget in USD millions. Follow with the commentary behind each variance.</p><h3>Items for review</h3><p>Keep unresolved questions and supporting records in an internal review page. Remove review notes only after the team resolves them.</p><p>This reference supplies the report structure; current-quarter figures come from the Q3 accounts.</p>`]
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
const reportMarkup=`
<article class="home-modal-page"><p class="home-paper-date">Signet Equity · Q3 2026 · 1 / 3</p><h3>Portfolio overview</h3><p>The six portfolio companies reported $70.0m in Q3 revenue against a $72.0m budget, a $2.0m (2.8%) shortfall. Reported EBITDA was $9.6m against $10.4m, a $0.8m (7.7%) shortfall. EBITDA margin was 13.7% compared with a 14.4% budget.</p><p>Arno and Fiesole each missed EBITDA budget by $0.3m. Cascine was $0.2m below and Porta $0.1m below; Pitti’s $0.1m outperformance offset part of those misses. Oltrarno met budget.</p><h4>Revenue by company</h4>${table}<p>Figures are company operating results before ownership weighting. They are not fund earnings, NAV or investment returns. The accounts provide the provisional basis; Fiesole’s conflicting revenue update remains open.</p><p class="home-review-note">Internal draft. Not approved for investor distribution.</p></article>
<article class="home-modal-page"><p class="home-paper-date">Company performance · 2 / 3</p><h3>EBITDA against budget</h3>${ebitdaTable}<h4>What drove the result</h4><p><strong>Arno Precision:</strong> Shipment delays contributed to its $0.3m EBITDA shortfall. The revised Q4 shipping schedule is outstanding.</p><p><strong>Pitti Services:</strong> Stronger contract renewals supported $0.5m additional revenue and $0.1m additional EBITDA against budget.</p><p><strong>Fiesole Components:</strong> $1.4m budget EBITDA − $0.18m lower utilization − $0.12m expedited freight = $1.1m actual. Its revised production plan awaits board review.</p><p><strong>Oltrarno Software:</strong> Revenue and EBITDA were on budget. <strong>Cascine Packaging:</strong> Higher material costs contributed to the $0.2m EBITDA miss. <strong>Porta Logistics:</strong> The $0.1m EBITDA shortfall still needs management’s explanation.</p><p>Sources: Q3 management accounts, 3 October; company updates, 5 October. Commentary reflects management’s explanations.</p></article>
<article class="home-modal-page"><p class="home-paper-date">Internal review notes · 3 / 3</p><h3>Before this goes to investors</h3><h4>Confirm Fiesole’s revenue</h4><p>The accounts record $9.0m; an earlier sales update states $9.4m. This draft uses the accounts. If the finance lead confirms $9.4m, combined revenue would become $70.4m and the revenue shortfall would narrow to $1.6m (2.2%). No EBITDA change can be inferred from the revenue difference.</p><h4>Get the missing updates</h4><p>Obtain Arno’s revised shipping schedule, confirm board review of Fiesole’s production plan, and request Porta’s explanation for its $0.1m EBITDA shortfall. No recovery dates or forecast benefits have been assumed.</p><h4>Checks completed</h4><p>Six revenue lines total $70.0m; six EBITDA lines total $9.6m. Revenue variances total −$2.0m and EBITDA variances total −$0.8m. Fiesole’s $0.18m + $0.12m explanation accounts for its $0.30m EBITDA miss.</p><h4>Review and approve</h4><p>The finance lead confirms the source corrections and open commentary. The fund’s reviewer then approves the investor version. The internal review page stays with your team.</p><p>Format reference: Q2 2026 report outline. All records and figures in this demonstration are fictional.</p></article>`;
inlineReport.innerHTML=reportMarkup;
inlineReport.addEventListener('pointerdown',stopReplay);
inlineReport.addEventListener('keydown',stopReplay);
function openReport(){openDoc('Draft portfolio update · 3 pages',reportMarkup);}
document.getElementById('home-dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
})();
