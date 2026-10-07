/* Fictional, deterministic worked example. No client records or live AI requests. */
(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const investors = [
    ['Rucellai Holdings',16000000,1000000,425000,16575000],
    ['Bardi Partners',8000000,500000,212500,8287500],
    ['Tornabuoni Foundation',7000000,375000,170000,7205000],
    ['Strozzi Family Trust',1000000,125000,42500,1082500]
  ].map(([name, opening, calls, distributions, recordedClosing]) => ({ name, opening, calls, distributions, recordedClosing, closing: opening + calls - distributions }));
  const reconciledAccounts = investors.filter(row => row.closing === row.recordedClosing).length;
  const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0);
  const capital = Object.fromEntries(['opening','calls','distributions','closing'].map(key => [key, sum(investors,key)]));
  const money = n => '$' + n.toLocaleString('en-US');
  const millions = n => '$' + (n / 1000000).toFixed(2) + 'm';
  const cite = (source, label) => `<button type="button" class="re-citation" data-source="${source}" aria-label="Inspect source: ${label}">${label} ↗</button>`;
  const table = (head, rows) => `<div class="re-document-table"><table><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>i===0?`<th scope="row">${v}</th>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="re-table-scroll-hint" hidden>Scroll the table sideways to see all columns →</p>`;
  const metrics = items => `<div class="re-document-metrics">${items.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
  const note = text => `<p class="re-document-note">${text}</p>`;
  const companies = [
    ['Arno Systems','Developer tools',6000000,4800000,4200000,350000,'30 Sep'],
    ['Pitti Cloud','Infrastructure',3000000,2400000,6000000,400000,'30 Sep'],
    ['Fiesole Labs','Developer tools',1800000,1200000,1800000,300000,'30 Sep'],
    ['Oltrarno Security','Cybersecurity',4800000,4000000,3600000,450000,'31 Aug'],
    ['Cascine Analytics','Data software',1200000,900000,7200000,400000,'30 Sep'],
    ['Porta Data','Data software',2400000,2000000,2400000,200000,'30 Sep']
  ].map(([name,sector,arr,priorArr,cash,burn,date])=>({name,sector,arr,priorArr,cash,burn,date,runway:cash/burn,current:date==='30 Sep'}));
  const companyRows = companies.map(c=>[c.name,c.date,millions(c.cash),money(c.burn),c.runway.toFixed(0)+' months']);
  const narrativeCoverage = {
    'Arno Systems':'Company update',
    'Fiesole Labs':'Company update',
    'Oltrarno Security':'Close-status note'
  };
  const coverageRows = companies.map(c=>[c.name,c.date,narrativeCoverage[c.name] || 'Not supplied']);
  const currentMetrics = companies.filter(c=>c.current).length;
  const arnoNote = `<h3>Arno Systems</h3><p>Signed three enterprise contracts in Q3. September ARR $6m. Implementation work continues into Q4.</p>`;
  const oltrarnoEmail = `<p class="re-source-caption">Fictional original email extract · received 3 October 2026</p><h3>From: Oltrarno Security founder</h3><p>Subject: September reporting</p><p>Our finance lead is still completing the September close. <mark>The latest figures we have submitted are dated 31 August.</mark> The September spreadsheet will follow.</p>`;
  const fiesoleEmail = `<p class="re-source-caption">Fictional original email extract · received 3 October 2026</p><h3>From: Fiesole Labs founder</h3><p>Subject: September update and financing</p><p>Cash was $1.8m at September-end. Average monthly net burn was $300k. We are in discussions with two potential leads for the next round. <mark>No term sheet is signed.</mark> Cash forecast and financing timetable to follow.</p>`;
  const fiesoleDraft = 'Fiesole Labs reported $1.8 million in cash at September-end, equivalent to six months at its average monthly net burn of $300,000. Discussions with two potential lead investors continue; no term sheet is signed.';
  const oltrarnoDraft = 'Oltrarno Security’s September close remains in progress, so its figures are shown as of 31 August.';
  const reviewItems = `<div class="re-asset-update"><span>Missing metrics · Oltrarno Security</span><h3>Obtain the September submission</h3><p>Keep the existing figures dated 31 August until a new submission arrives.</p></div><div class="re-asset-update"><span>Missing financing detail · Fiesole Labs</span><h3>Obtain the cash forecast and financing timetable</h3><p>The reported cash supports six months at the recent average burn. The proposed round remains unclosed.</p></div><div class="re-asset-update"><span>Scope decision · Pitti, Cascine and Porta</span><h3>Decide whether more commentary is needed</h3><p>September metrics are available, but no narrative was supplied. Confirm whether metrics-only coverage is sufficient for this quarter’s letter.</p></div>`;
  const pages = [
    {title:'Letter to investors',body:`<p class="re-document-eyebrow">Quarterly investor report · Q3 2026</p><h2>Third-quarter update</h2>
      ${metrics([['Portfolio companies','6'],['September metrics',`${currentMetrics} of ${companies.length}`],['Cash distributions',money(capital.distributions)]])}
      <p>Dear Limited Partners,</p><p>Arno Systems ended September at $6 million in annual recurring revenue, up 25% from $4.8 million at June-end. The company signed three enterprise contracts during the quarter, with implementation work continuing into Q4. ${cite(0,'Company metrics · Arno ARR')} ${cite(6,'Arno · original founder note')}</p>
      <p>${fiesoleDraft} The proposed financing is excluded from reported cash and runway. ${cite(0,'Company metrics · Fiesole cash and burn')} ${cite(5,'Fiesole · 3 October email')}</p>
      <p>The portfolio tables include September metrics for five companies. ${oltrarnoDraft} ${cite(4,'Oltrarno · 3 October email')}</p>
      <p>During the quarter, LPs contributed ${millions(capital.calls)} and received ${money(capital.distributions)} in distributions. ${cite(3,'Fund-level cash activity · Q3')}</p>
      <p class="re-document-signoff">Renaissance Venture Partners<br><span>General Partner · Renaissance Venture Fund I</span></p>
      ${note('Fictional portfolio update; company figures are unaudited. Source links are shown for team review. This draft accompanies, rather than replaces, the fund’s financial reporting package.')}`},
    {title:'Portfolio overview',body:`<p class="re-document-eyebrow">Company-by-company reporting</p><h2>Portfolio overview</h2>
      <p>The six companies report annual recurring revenue on the same example basis: contracted recurring subscription revenue at the stated reporting date, annualized. Non-recurring services are excluded. Figures below preserve each company’s reporting date.</p>
      ${table(['Company','Sector','Latest data','ARR','June ARR'],companies.map(c=>[c.name,c.sector,c.date,millions(c.arr),millions(c.priorArr)]))}
      <h3>Quarterly change</h3><p>Arno’s ARR increased 25% between June and September: ($6.0 million − $4.8 million) ÷ $4.8 million.</p>
      <div class="re-document-callout"><strong>Oltrarno’s latest figures are dated 31 August.</strong><p>${oltrarnoDraft} ${cite(4,'Inspect the 3 October email')}</p></div>
      ${cite(0,'Company metrics · ARR and reporting dates')}
      ${note('ARR is an operating metric, not recognized revenue or fund return. The companies in this sample use the same ARR definition; definitions may differ in other portfolios.')}`},
    {title:'Cash & runway',body:`<p class="re-document-eyebrow">Company liquidity</p><h2>Cash and runway</h2>
      <p>Estimated runway is reported cash divided by average monthly net cash burn over the three months ending on the stated date. Each estimate assumes unchanged burn and excludes unclosed financing.</p>
      ${table(['Company','As of','Cash','Monthly net burn','Runway'],companyRows)}
      <div class="re-document-callout"><strong>Fiesole Labs: six months at the reported average burn</strong><p>$1,800,000 cash ÷ $300,000 average monthly net burn = 6 months. The cash forecast and financing timetable remain outstanding. ${cite(5,'Fiesole · original email')}</p></div>
      <h3>Oltrarno’s estimate remains dated August</h3><p>The eight-month estimate uses 31 August figures. September cash movements and burn are not yet available, so it has not been rolled forward as a September estimate.</p>
      ${cite(0,'Company metrics · cash and burn')}
      ${note('Runway is a simple estimate, not a cash-flow forecast. Unclosed financing is excluded.')}`},
    {title:'Company updates',body:`<p class="re-document-eyebrow">From the founder updates</p><h2>Company updates</h2>
      <div class="re-asset-update"><span>Arno Systems</span><h3>Three enterprise contracts signed</h3><p>Arno signed three enterprise contracts in Q3 and expects implementation work to continue into Q4. ${cite(6,'Arno · founder note')}</p></div>
      <div class="re-asset-update"><span>Fiesole Labs</span><h3>Financing discussions continue</h3><p>The founder is in discussions with two potential lead investors. No term sheet is signed; the cash forecast and financing timetable are still to follow. ${cite(5,'Fiesole · founder email')}</p></div>
      <div class="re-asset-update"><span>Oltrarno Security</span><h3>September close in progress</h3><p>The finance lead is completing the close. The portfolio tables retain the company’s latest submitted figures, dated 31 August. ${cite(4,'Oltrarno · founder email')}</p></div>
      <div class="re-asset-update"><span>Pitti Cloud · Cascine Analytics · Porta Data</span><h3>September metrics available</h3><p>All three companies are included in the portfolio tables. No separate narrative updates were supplied for this sample. ${cite(0,'Inspect company metrics')}</p></div>
      ${note('Draft company commentary from the supplied records. Review scope and outstanding information are listed separately in the internal worksheet.')}`},
    { title:'Internal · capital movements', body: `
      <p class="re-document-eyebrow">Internal review · investor capital ledger</p><h2>Investor capital activity</h2>
      ${metrics([['Contributions',millions(capital.calls)],['Distributions',millions(capital.distributions)],['Movement checks',`${reconciledAccounts} of ${investors.length}`]])}
      <p>LPs contributed $2 million and received $850,000 during the quarter. Each account’s opening balance plus contributions less distributions matches the recorded balance after those movements.</p>
      ${table(['Investor','Opening','Contributed','Distributed','After movements'],investors.map(p=>[p.name,money(p.opening),money(p.calls),money(p.distributions),money(p.closing)]))}
      <div class="re-capital-equation"><span>${millions(capital.opening)}</span><b>+</b><span>${millions(capital.calls)}</span><b>−</b><span>${millions(capital.distributions)}</span><b>=</b><strong>${millions(capital.closing)}</strong></div>
      <h3>Before preparing individual statements</h3><p>Add approved income allocations, fund expenses, and valuation adjustments before producing a complete capital account statement. Reconcile the final figures with the fund administrator.</p>
      <h3>Internal review schedule</h3><p>This combined LP schedule is for the fund team. Each investor should receive only their own account details.</p>
      ${cite(1,'Investor ledger · all four accounts')}
      ${note('Capital movements only. These balances are not NAV, a complete capital account statement, or a fund return.')}` },

    {title:'Internal · checks & open items',body:`<p class="re-document-eyebrow">Fund-team review copy</p><h2>Checks and open items</h2>
      <div class="re-document-callout re-document-exception"><strong>Two follow-ups and one scope decision</strong><p>The draft keeps the supplied figures and dates. These items remain for the fund team to resolve before sign-off.</p></div>
      ${reviewItems}
      <h3>Submission coverage</h3>${table(['Company','Metric date','Narrative supplied'],coverageRows)}
      <h3>Calculation checks</h3>${table(['Check','Result'],[['Arno ARR growth','($6.0m − $4.8m) ÷ $4.8m = 25%'],['Fiesole runway','$1.8m ÷ $0.3m monthly burn = 6 months'],['Oltrarno runway','$3.6m ÷ $0.45m = 8 months, as of August'],['Investor capital movements',`${reconciledAccounts} of ${investors.length} rows reconcile; see the capital worksheet`]])}
      <h3>Review assumptions</h3><p>This sample fund flags runway below nine months: Fiesole on September data and Oltrarno on older August data. That threshold is a fund-team preference, not an industry standard. Company operating metrics do not establish fund returns or changes in carrying value.</p>
      <h3>Supporting records</h3><ol class="re-source-register"><li><strong>Renaissance_Company_Metrics_Q3.xlsx</strong><p>Six companies, reporting dates and metric definitions.</p>${cite(0,'View company figures')}</li><li><strong>Founder_Updates_Q3.docx</strong><p>Record of supplied company notes and missing narratives.</p>${cite(2,'View narrative record')}</li><li><strong>Original founder extracts</strong><p>Notes received 3 October; receipt dates are separate from metric dates.</p>${cite(4,'Oltrarno email')} ${cite(5,'Fiesole email')} ${cite(6,'Arno note')}</li><li><strong>Fund capital activity</strong><p>Aggregate cash movements for the letter; investor-level detail for internal review.</p>${cite(3,'View fund-level activity')} ${cite(1,'View internal investor ledger')}</li></ol>
      ${note('Fictional records and prewritten commentary. This sample is not a live Cosimo session or a complete quarterly financial reporting package.')}`}
  ];
  function pageHTML(index) { return `<article class="re-document-page"><header><span class="re-paper-brand">Renaissance</span><span>Venture Fund I<br>Q3 2026 · ${index >= 4 ? 'Internal review' : 'Investor draft'}</span></header>${pages[index].body}<footer><span>Fictional demonstration · Not for distribution</span><span>${String(index+1).padStart(2,'0')} / 06</span></footer></article>`; }
  const sources = [
    {name:'Renaissance_Company_Metrics_Q3.xlsx',html:`<p class="re-source-caption">Company submissions · USD · 2026 reporting dates</p>${table(['Company','As of','ARR','June ARR','Cash','Avg. monthly net burn'],companies.map(c=>[c.name,c.date,money(c.arr),money(c.priorArr),money(c.cash),money(c.burn)]))}<h3>Definitions supplied with this example</h3><p>ARR: contracted recurring subscription revenue at the stated date, annualized; excludes services. Cash: company-reported unrestricted cash. Net burn: cash operating and capital outflows less operating inflows, excluding financing; monthly average over the three months ending at the stated date.</p><p>Oltrarno’s figures end 31 August. All other latest figures end 30 September. June ARR figures are as of 30 June. Amounts are unaudited; proposed financings are excluded.</p>`},
    {name:'Renaissance_Capital_Accounts.xlsx',html:`<p class="re-source-caption">Capital movements · Q3 2026 · USD</p>${table(['Investor','Opening balance','Contributions','Distributions','Recorded balance'],investors.map(p=>[p.name,money(p.opening),money(p.calls),money(p.distributions),money(p.recordedClosing)]))}<p>Scope: capital movements only. Income, expenses and valuation adjustments are excluded. Strozzi’s $125,000 contribution and $42,500 distribution are illustrative approved allocations; no ownership-based allocation rule is inferred.</p>`},

    {name:'Founder_Updates_Q3.docx',html:`<p class="re-source-caption">Fictional narrative record · notes received 3 October 2026</p>${arnoNote}${cite(6,'Inspect original Arno note')}<h3>Fiesole Labs</h3><p>September cash $1.8m; average monthly net burn $300k. Discussions with two potential leads; no term sheet signed. Cash forecast and financing timetable to follow.</p>${cite(5,'Inspect original Fiesole email')}<h3>Oltrarno Security</h3><p>September close in progress. Latest submitted figures dated 31 August; September spreadsheet to follow.</p>${cite(4,'Inspect original Oltrarno email')}<h3>Other companies</h3><p>No separate narrative notes supplied for Pitti Cloud, Cascine Analytics or Porta Data. Their September metric submissions are available in the workbook.</p>`},
    {name:'Renaissance_Fund_Cash_Activity_Q3.xlsx',html:`<p class="re-source-caption">Fictional fund-level extract · Q3 2026 · USD</p>${table(['Cash activity','Quarter total'],[['LP contributions received',money(capital.calls)],['Cash distributions to LPs',money(capital.distributions)]])}<p>Quarter totals aggregated from the four accounts in the internal capital-movement ledger. This extract contains no individual LP account details. Contributions are recorded receipts, not amounts on unpaid call notices.</p><p>Cash activity only; this is not NAV, a capital account statement, or a fund performance calculation.</p>`},
    {name:'Oltrarno_September_Reporting_2026-10-03.eml',html:oltrarnoEmail},
    {name:'Fiesole_September_Update_2026-10-03.eml',html:fiesoleEmail},
    {name:'Arno_Q3_Founder_Note_2026-10-03.txt',html:`<p class="re-source-caption">Fictional original founder note · received 3 October 2026</p>${arnoNote}`}
  ];
  const sourceCard = (kind, name, index, body) => `<div class="re-proof-source"><div class="re-proof-card-heading"><div><span class="re-proof-role">Your records</span><h4>${kind}</h4></div><button type="button" data-source="${index}">View source ↗</button></div><p class="re-proof-filename">${name}</p>${body}</div>`;
  const resultCard = (title, body, index) => `<div class="re-proof-result"><div class="re-proof-card-heading"><div><span class="re-proof-role">${index >= 4 ? 'For your team' : 'For your investors'}</span><h4>${title}</h4></div><span class="re-proof-r" aria-hidden="true">R</span></div>${body}<button type="button" class="re-proof-page-link" data-report-page="${index}">${index >= 4 ? 'See the internal worksheet' : 'See the investor draft'} <span aria-hidden="true">↗</span></button></div>`;
  const story = (n, title, detail, content) => `<article class="re-proof-story"><div class="re-proof-story-heading"><span aria-hidden="true">0${n}</span><div><h3>${title}</h3><p>${detail}</p></div></div><div class="re-proof-comparison">${content}<div class="re-proof-connector" aria-hidden="true"><i></i><span>→</span></div></div></article>`;

  document.getElementById('report-proof-scenes').innerHTML = [
    story(1,'The email arrived in October. The figures are still from August.','Match the founder’s note to the metric dates before describing the quarter.',
      sourceCard('Oltrarno’s reporting email','Oltrarno_September_Reporting_2026-10-03.eml',4,`<div class="re-proof-note-paper"><span>Received 3 October 2026</span><p>“Our finance lead is still completing the September close.”</p><p>“The latest figures we have submitted are dated <mark>31 August</mark>.”</p><p>“The September spreadsheet will follow.”</p></div><p class="re-proof-sheet-note">In the metrics workbook · Oltrarno Security</p>${table(['As of','Cash','ARR'],[['31 Aug','$3.60m','$4.80m']])}${cite(0,'Inspect all six dated submissions')}`)+
      resultCard('The date stays with the figure',`<div class="re-proof-big-figures"><div><span>September metrics</span><strong><mark>${currentMetrics} of ${companies.length}</mark></strong><small>Companies with quarter-end submissions</small></div><div><span>Oltrarno’s latest data</span><strong><mark>31 Aug</mark></strong><small>The October email does not update these figures</small></div></div><p class="re-proof-report-label">In the portfolio update</p><blockquote>“${oltrarnoDraft}”</blockquote><p class="re-proof-trace">The missing September submission remains on the team’s review list.</p>`,1)),
    story(2,'One founder note. An LP update and a question for your team.','Use the reported cash in the draft and keep the unresolved financing plan visible for review.',
      sourceCard('Fiesole’s financing email','Fiesole_September_Update_2026-10-03.eml',5,`<div class="re-proof-note-paper"><span>Received 3 October 2026</span><p>September cash: $1.8m.</p><p>Average monthly net burn: $300k.</p><p>Discussions with two potential lead investors. <mark>No term sheet signed.</mark></p><p>Cash forecast and financing timetable to follow.</p></div>${cite(0,'Compare September cash and burn in the workbook')}`)+
      resultCard('Draft wording, with an open question',`<p class="re-proof-report-label">In the LP draft · Fiesole Labs</p><blockquote>“${fiesoleDraft}”</blockquote><div class="re-proof-review-flag"><span>For your team</span><strong>Cash forecast and financing timetable outstanding.</strong><p>Review the company’s funding plan before finalizing the commentary or considering follow-on support.</p></div><p class="re-proof-trace">$1.8m ÷ $300k = 6 months. Unclosed financing is excluded; this is a snapshot, not a cash-flow forecast.</p>`,0)),
    story(3,'The draft is assembled. The unfinished work stays visible.','Bring missing records and editorial decisions into one internal review list.',
      sourceCard('Metrics and narrative coverage','Company metrics + founder narrative record',2,`<p class="re-proof-sheet-note">Six companies · two company updates and one close-status note</p>${table(['Company','Metric date','Narrative supplied'],coverageRows)}${cite(0,'Inspect the metric submissions')}<p class="re-proof-source-caption">Pitti, Cascine and Porta supplied September metrics. No separate narrative notes are included in the records.</p>`)+
      resultCard('Two follow-ups. One scope decision.',`<div class="re-proof-review-flag"><span>Missing metrics · Oltrarno</span><strong>Obtain September figures.</strong><p>Keep 31 August attached to the existing submission.</p></div><div class="re-proof-review-flag"><span>Missing financing detail · Fiesole</span><strong>Obtain the forecast and timetable.</strong><p>The proposed financing stays outside reported cash.</p></div><div class="re-proof-review-flag"><span>Scope decision · Pitti, Cascine and Porta</span><strong>Confirm whether metrics-only coverage is sufficient.</strong><p>Request narrative context if the quarter’s letter needs more.</p></div><p class="re-proof-trace">These items are for the fund team. They do not become claims in the investor letter.</p>`,5))

  ].join('');
  const reader = document.getElementById('sample-lp-report');
  const sourceDialog = document.getElementById('report-source');
  const chapters = document.getElementById('reader-chapters');
  let readerPage = 0;
  const chapterAudience = index => index < 4 ? 'Investor draft' : 'Internal review';
  chapters.innerHTML = pages.map((page,index)=>`${index === 0 || chapterAudience(index) !== chapterAudience(index-1) ? `<p class="re-chapter-group">${chapterAudience(index)}</p>` : ''}<button type="button" data-page="${index}" aria-controls="full-report-content"><span>0${index+1}</span><span>${page.title.replace(/^(Internal · |Separate draft · )/,'')}</span></button>`).join('');
  function updateTableHints() {
    document.querySelectorAll('.re-document-table').forEach(element=>{
      const overflows = element.scrollWidth > element.clientWidth + 1;
      element.nextElementSibling.hidden = !overflows;
      if (overflows) {
        element.setAttribute('tabindex','0');
        element.setAttribute('aria-label','Scrollable data table');
      } else {
        element.removeAttribute('tabindex');
        element.removeAttribute('aria-label');
      }
    });
  }
  window.addEventListener('resize', updateTableHints);
  function renderReader(index, moveToReader=false) {
    readerPage = index;
    document.getElementById('full-report-content').innerHTML = pageHTML(index);
    document.getElementById('reader-page-number').textContent = `Page ${index+1} of ${pages.length}`;
    chapters.querySelectorAll('[data-page]').forEach(button=>button.setAttribute('aria-current',String(Number(button.dataset.page)===index)));
    document.getElementById('reader-prev').disabled = index===0;
    document.getElementById('reader-next').disabled = index===pages.length-1;
    document.getElementById('reader-next-bottom').disabled = index===pages.length-1;
    updateTableHints();
    if (moveToReader) {
      // A chapter selected halfway down the previous page must start at its own top.
      const readingPane = document.getElementById('reader-body');
      const heading = document.querySelector('#full-report-content h2');
      readingPane.scrollIntoView({behavior:motion.matches?'instant':'smooth',block:'start'});
      heading.tabIndex = -1;
      heading.focus({preventScroll:true});
    }
  }
  function showSource(index) {
    document.getElementById('source-filename').textContent = sources[index].name;
    document.getElementById('source-content').innerHTML = sources[index].html;
    if (!sourceDialog.open) sourceDialog.showModal();
    updateTableHints();
  }
  document.addEventListener('click',event=>{
    const source = event.target.closest('[data-source]');
    if (source) showSource(Number(source.dataset.source));
    const reportPage = event.target.closest('[data-report-page]');
    if (reportPage) renderReader(Number(reportPage.dataset.reportPage),true);
  });
  chapters.addEventListener('click',event=>{
    const button=event.target.closest('[data-page]');
    if (button) renderReader(Number(button.dataset.page),true);
  });
  document.getElementById('reader-prev').addEventListener('click',()=>renderReader(Math.max(0,readerPage-1),true));
  document.getElementById('reader-next').addEventListener('click',()=>renderReader(Math.min(pages.length-1,readerPage+1),true));
  document.getElementById('reader-next-bottom').addEventListener('click',()=>renderReader(Math.min(pages.length-1,readerPage+1),true));
  document.getElementById('close-source').addEventListener('click',()=>sourceDialog.close());
  sourceDialog.addEventListener('click',event=>{
    if(event.target!==sourceDialog)return;
    const r=sourceDialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)sourceDialog.close();
  });
  document.querySelectorAll('a[href="#sample-lp-report"]').forEach(link=>link.addEventListener('click',()=>{
    renderReader(0);reader.focus({preventScroll:true});
  }));
  renderReader(0);
  // The data is always visible. Motion only traces an existing relationship,
  // once per comparison, without timed page changes or scroll capture.
  const proofObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-observed');
      proofObserver.unobserve(entry.target);
    });
  },{threshold:.2});
  document.querySelectorAll('.re-proof-comparison').forEach(element=>proofObserver.observe(element));
})();
