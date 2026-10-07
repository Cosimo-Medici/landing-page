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
  const percent = n => n.toFixed(1) + '%';
  const cite = (source, label) => `<button type="button" class="re-citation" data-source="${source}" aria-label="Inspect source: ${label}">${label} ↗</button>`;
  const table = (head, rows) => `<div class="re-document-table"><table><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>i===0?`<th scope="row">${v}</th>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="re-table-scroll-hint" hidden>Scroll the table sideways to see all columns →</p>`;
  const metrics = items => `<div class="re-document-metrics">${items.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
  const note = text => `<p class="re-document-note">${text}</p>`;
  const companies = [
    ['Arno Precision','Industrial components',18000000,19000000,3200000,3500000],
    ['Pitti Services','Business services',14000000,13500000,2100000,2000000],
    ['Fiesole Components','Industrial components',9000000,10000000,1100000,1400000],
    ['Oltrarno Software','Vertical software',8000000,8000000,1600000,1600000],
    ['Cascine Packaging','Specialty packaging',11000000,11500000,1000000,1200000],
    ['Porta Logistics','Logistics services',10000000,10000000,600000,700000]
  ].map(([name,sector,revenue,revenueBudget,ebitda,ebitdaBudget])=>({name,sector,revenue,revenueBudget,ebitda,ebitdaBudget,variance:ebitda-ebitdaBudget}));
  const totals=Object.fromEntries(['revenue','revenueBudget','ebitda','ebitdaBudget','variance'].map(key=>[key,sum(companies,key)]));
  const delta=n=>(n<0?'−':n>0?'+':'')+money(Math.abs(n));
  const fiesole = companies.find(company => company.name === 'Fiesole Components');
  const reviewItems = [
    ['Arno Precision','Revised shipping schedule to follow.','Obtain the revised shipping schedule.'],
    ['Fiesole Components','Production plan awaiting board review; no recovery date confirmed.','Confirm the board decision and recovery timing.'],
    ['Porta Logistics','Written variance explanation not received.','Request the explanation for the $100,000 shortfall.']
  ];
  const pages = [
    {title:'Letter to investors',body:`<p class="re-document-eyebrow">Portfolio operating update · Q3 2026</p><h2>Third-quarter update</h2>
      ${metrics([['Portfolio companies','6'],['Q3 reported EBITDA',millions(totals.ebitda)],['Against budget','−$800,000']])}
      <p>Dear Limited Partners,</p><p>Renaissance Buyout Fund I’s six portfolio companies reported combined quarterly revenue of $70 million and EBITDA of $9.6 million. EBITDA was $800,000, or 7.7%, below the $10.4 million operating budget. These totals combine company-reported management figures; they are not ownership-weighted fund results. ${cite(0,'Management accounts · Q3 actuals and budget')}</p>
      <p>Arno Precision and Fiesole Components each reported EBITDA $300,000 below budget. At Fiesole, management attributed $180,000 of the shortfall to lower plant utilization and $120,000 to expedited freight. The revised production plan is still awaiting board review. Pitti Services was $100,000 ahead of budget. ${cite(0,'Management accounts · company variances')} ${cite(2,'Management updates · Fiesole')}</p>
      <p>Next quarter’s priorities are reviewing Fiesole’s production plan and confirming the expected timing of delayed shipments at Arno. The management updates below distinguish reported results from plans that have not been approved.</p>
      <p>LPs contributed $2 million and received $850,000 in distributions during the quarter. ${cite(5,'Fund-level capital activity · Q3 totals')}</p>
      <p class="re-document-signoff">Renaissance Capital Partners<br><span>General Partner · Renaissance Buyout Fund I</span></p>
      ${note('Fictional, unaudited operating update, not a complete financial reporting package. Company EBITDA is not fund earnings, NAV, distributable cash, or an investment return.')}`},
    {title:'Portfolio overview',body:`<p class="re-document-eyebrow">Quarterly management accounts</p><h2>Portfolio overview</h2>
      <p>All six submissions cover the three months ended 30 September 2026 in USD. EBITDA is each company’s management-reported earnings before interest, tax, depreciation and amortization; no fund-level adjustments have been added.</p>
      ${table(['Company','Sector','Revenue','EBITDA','EBITDA margin'],companies.map(c=>[c.name,c.sector,millions(c.revenue),millions(c.ebitda),percent(c.ebitda/c.revenue*100)]).concat([['Combined companies','—',millions(totals.revenue),millions(totals.ebitda),percent(totals.ebitda/totals.revenue*100)]]))}
      <h3>Read the company results alongside the total</h3><p>Oltrarno reported a 20.0% EBITDA margin, while Porta reported 6.0%. Their businesses and cost structures differ. The combined 13.7% margin is total EBITDA divided by total revenue; it is not the average of the six company margins.</p>
      <div class="re-document-callout"><strong>Scope stays visible.</strong><p>These figures cover 100% of each company’s reported operations. They have not been weighted by the fund’s ownership, consolidated under accounting standards, or adjusted for intercompany activity.</p></div>
      ${cite(0,'Management accounts · revenue and EBITDA')}
      ${note('Reported company figures are shown on the supplied basis. EBITDA definitions are those reported by each company; these figures have not been adjusted for valuation purposes.')}`},
    {title:'Actuals vs budget',body:`<p class="re-document-eyebrow">Operating performance</p><h2>Actuals against budget</h2>
      ${metrics([['Q3 EBITDA',millions(totals.ebitda)],['Budget EBITDA',millions(totals.ebitdaBudget)],['Shortfall','7.7%']])}
      ${table(['Company','Q3 EBITDA','Budget','Variance'],companies.map(c=>[c.name,money(c.ebitda),money(c.ebitdaBudget),delta(c.variance)]).concat([['Combined companies',money(totals.ebitda),money(totals.ebitdaBudget),delta(totals.variance)]]))}
      <h3>Where the shortfall sits</h3><p>Arno and Fiesole each missed budget by $300,000. Cascine was $200,000 below and Porta $100,000 below; Pitti’s $100,000 outperformance offset part of those misses. Oltrarno was on budget.</p>
      <div class="re-document-callout"><strong>Fiesole: a $300,000 bridge</strong><p>$1,400,000 budget EBITDA − $180,000 lower utilization − $120,000 expedited freight = $1,100,000 reported EBITDA.</p></div>
      <p>Fiesole’s actuals are supplied in dollars and its budget in $000s. The Q3 budget EBITDA of 1,400 becomes $1,400,000 before comparison with $1,100,000 actual. Both records specify the same quarter and supplied EBITDA basis. ${cite(3,'Fiesole · original actuals')} ${cite(4,'Fiesole · original budget')}</p>
      <h3>Revenue and margins</h3><p>Combined revenue was $70 million against a $72 million budget, a $2 million shortfall. The company-level detail is available in the source. No annualization or forecast has been applied.</p>
      ${cite(0,'Management accounts · actuals and budget')} ${cite(2,'Management updates · variance explanations')}
      ${note('Variance means actual less budget. Budget shortfall: $800,000 ÷ $10,400,000 = 7.7%, rounded. Management explanations have not been independently verified.')}`},
    {title:'Company updates',body:`<p class="re-document-eyebrow">From the management packs</p><h2>Company updates</h2>
      <div class="re-asset-update"><span>Arno Precision · $300,000 below budget</span><h3>Shipping schedule still outstanding</h3><p>Management attributed the EBITDA shortfall to shipment delays. The revised shipping schedule has not been supplied. The timing of those shipments remains unconfirmed.</p></div>
      <div class="re-asset-update"><span>Pitti Services · $100,000 ahead of budget</span><h3>Contract renewals supported results</h3><p>Management reported stronger renewals than budgeted. Quarterly revenue was $14 million against a $13.5 million budget; EBITDA was $2.1 million against $2 million.</p></div>
      <div class="re-asset-update"><span>Fiesole Components · $300,000 below budget</span><h3>Production plan awaiting review</h3><p>Fiesole reported Q3 EBITDA of $1.1 million against a $1.4 million budget. Management attributed the $300,000 shortfall to lower utilization ($180,000) and expedited freight ($120,000). A revised production plan is awaiting board review; no recovery date has been confirmed.</p>${cite(3,'Fiesole · actuals')} ${cite(4,'Fiesole · budget')} ${cite(2,'Management · explanation')}</div>
      <div class="re-asset-update"><span>Cascine Packaging · $200,000 below budget</span><h3>Input costs ran above plan</h3><p>Management attributed the shortfall to higher material costs. Proposed price changes have not been approved and are not included as a forecast benefit.</p></div>
      <div class="re-asset-update"><span>Oltrarno Software · Porta Logistics</span><h3>Results received; explanations incomplete</h3><p>Oltrarno met its EBITDA budget. Porta Logistics reported EBITDA $100,000 below budget. Management’s explanation remains outstanding.</p></div>
      ${cite(2,'Management updates · original notes')} ${cite(0,'Management accounts · company figures')}
      ${note('Commentary uses supplied management explanations. No recovery dates, cost savings, or valuation changes have been assumed.')}`},
    { title:'Internal · capital movements', body: `
      <p class="re-document-eyebrow">Internal review · investor capital ledger</p><h2>Investor capital activity</h2>
      ${metrics([['Contributions',millions(capital.calls)],['Distributions',millions(capital.distributions)],['Accounts checked',`${reconciledAccounts} of ${investors.length}`]])}
      <p>LPs contributed $2 million and received $850,000 during the quarter. Each account’s opening balance plus contributions less distributions matches the recorded balance after those movements.</p>
      ${table(['Investor','Opening','Contributed','Distributed','After movements'],investors.map(p=>[p.name,money(p.opening),money(p.calls),money(p.distributions),money(p.closing)]))}
      <div class="re-capital-equation"><span>${millions(capital.opening)}</span><b>+</b><span>${millions(capital.calls)}</span><b>−</b><span>${millions(capital.distributions)}</span><b>=</b><strong>${millions(capital.closing)}</strong></div>
      <h3>Before preparing individual statements</h3><p>Add approved income allocations, fund expenses, and valuation adjustments before producing a complete capital account statement. Reconcile the final figures with the fund administrator.</p>
      <h3>Internal review schedule</h3><p>This combined LP schedule is for the fund team. Each investor should receive only their own account details.</p>
      ${cite(1,'Investor ledger · all four accounts')}
      ${note('Capital movements only. These balances are not NAV, a complete capital account statement, or a fund return.')}` },

    {title:'Internal · checks & open items',body:`<p class="re-document-eyebrow">Fund-team review copy</p><h2>Checks and open items</h2>
      <div class="re-document-callout re-document-exception"><strong>Three items need a follow-up</strong><p>Get Arno’s shipping schedule, confirm the status of Fiesole’s revised production plan, and request Porta’s explanation for its $100,000 shortfall.</p></div>
      ${table(['Company','Source note','Follow-up'],reviewItems)}
      ${cite(2,'Management notes · outstanding information')}
      ${table(['Check','Result'],[['Reporting period','All six companies: three months ended 30 September'],['Combined revenue','$70.0m actual vs $72.0m budget'],['Combined EBITDA','$9.6m actual vs $10.4m budget'],['EBITDA variance','−$0.8m; −7.7% of budget'],['Fiesole variance bridge','$180,000 + $120,000 = $300,000'],['Capital movements','Four of four investor accounts reconcile']])}
      <h3>Checks before sign-off</h3><p>Confirm the companies’ EBITDA definitions before comparing adjusted figures or using them in valuation work. Do not describe Arno’s shortfall as temporary until the shipping schedule is confirmed, or fill in Porta’s missing explanation.</p>
      <h3>Supporting records</h3><ol class="re-source-register"><li><strong>Renaissance_Management_Accounts_Q3.xlsx</strong><p>Six-company reporting schedule, including Fiesole’s actuals and converted budget.</p>${cite(0,'View management accounts')}</li><li><strong>Fiesole_Q3_Management_Accounts.xlsx</strong><p>Original Q3 actuals in USD dollars.</p>${cite(3,'View Fiesole actuals')}</li><li><strong>Fiesole_FY26_Budget.xlsx</strong><p>Original Q3 budget in USD thousands.</p>${cite(4,'View Fiesole budget')}</li><li><strong>Management_Updates_Q3.docx</strong><p>Company explanations and outstanding information.</p>${cite(2,'View management notes')}</li><li><strong>Renaissance_Fund_Capital_Activity_Q3.xlsx</strong><p>Aggregate contributions and distributions for investor commentary.</p>${cite(5,'View fund-level totals')}</li><li><strong>Renaissance_Capital_Accounts.xlsx</strong><p>Internal only: four investor accounts and their capital movements.</p>${cite(1,'View internal investor ledger')}</li></ol>
      ${note('Fictional records and prewritten commentary. This is not a live Cosimo session, an ILPA template, or a complete quarterly financial reporting package.')}`}
  ];
  function pageHTML(index) { return `<article class="re-document-page"><header><span class="re-paper-brand">Renaissance</span><span>Buyout Fund I<br>Q3 2026 · ${index >= 4 ? 'Internal review' : 'Investor draft'}</span></header>${pages[index].body}<footer><span>Fictional demonstration · Not for distribution</span><span>${String(index+1).padStart(2,'0')} / 06</span></footer></article>`; }
  const sources = [
    {name:'Renaissance_Management_Accounts_Q3.xlsx',html:`<p class="re-source-caption">Six-company reporting schedule · Three months ended 30 September 2026 · USD dollars</p>${table(['Company','Revenue','Rev. budget','EBITDA','EBITDA budget'],companies.map(c=>[c.name,money(c.revenue),money(c.revenueBudget),money(c.ebitda),money(c.ebitdaBudget)]))}<h3>Reporting basis</h3><p>All submissions cover Q3 2026. Revenue and EBITDA are management-reported, unaudited company figures in USD. EBITDA means earnings before interest, tax, depreciation and amortization, before any additional fund-level adjustments. These example figures are not ownership-weighted and contain no fund valuation, leverage or return calculation.</p><h3>Fiesole source records</h3><p>The Fiesole row carries actuals supplied in dollars and budget figures converted from USD thousands. The separate fictional workbook extracts preserve their original units and reporting basis.</p>${cite(3,'Inspect original actuals')} ${cite(4,'Inspect original budget')}`},
    {name:'Renaissance_Capital_Accounts.xlsx',html:`<p class="re-source-caption">Capital movements · Q3 2026 · USD</p>${table(['Investor','Opening balance','Contributions','Distributions','Recorded balance'],investors.map(p=>[p.name,money(p.opening),money(p.calls),money(p.distributions),money(p.recordedClosing)]))}<p>Scope: capital movements only. Income, expenses and valuation adjustments are excluded. Strozzi’s $125,000 contribution and $42,500 distribution are illustrative approved allocations; no ownership-based allocation rule is inferred.</p>`},

    {name:'Management_Updates_Q3.docx',html:`<p class="re-source-caption">Management commentary · Q3 2026 · received 5 October 2026 · USD, “k” means thousands</p><h3>Arno Precision</h3><p>EBITDA $300k behind plan. Shipments delayed into Q4. Revised shipping schedule to follow.</p><h3>Pitti Services</h3><p>EBITDA $100k above plan. Stronger contract renewals than budget.</p><h3>Fiesole Components</h3><p>EBITDA $300k below budget: lower plant utilization $180k; expedited freight $120k. <mark>Revised production plan awaiting board review. No recovery date confirmed.</mark></p><h3>Cascine Packaging</h3><p>EBITDA $200k below budget due to material costs. Proposed price changes not yet approved.</p><h3>Oltrarno Software</h3><p>EBITDA on budget. No separate narrative supplied.</p><h3>Porta Logistics</h3><p>EBITDA $100k below budget. <mark>Written variance explanation not received.</mark></p><p>Basis: management’s explanations of reported Q3 EBITDA against budget. Plans are not approved results; explanations have not been independently verified.</p>`},
    {name:'Fiesole_Q3_Management_Accounts.xlsx',html:`<p class="re-source-caption">Fictional workbook extract · Sheet: Quarterly P&amp;L · Fiesole Components</p><h3>Original actuals</h3><p>Period: three months ended 30 September 2026.<br>Currency: USD. Units: dollars.</p>${table(['Metric','Q3 actual'],[['Revenue',money(fiesole.revenue)],['Reported EBITDA',money(fiesole.ebitda)]] )}<h3>Basis supplied with the accounts</h3><p>Unaudited company management accounts covering 100% of Fiesole’s operations. EBITDA means earnings before interest, tax, depreciation and amortization. No additional fund adjustments or ownership weighting. Actual and Q3 budget use this same definition in the fictional example.</p>`},
    {name:'Fiesole_FY26_Budget.xlsx',html:`<p class="re-source-caption">Fictional workbook extract · Sheet: Q3 budget · Fiesole Components</p><h3>Original budget</h3><p>Period: three months ended 30 September 2026.<br>Currency: USD. Units: $000s (thousands of dollars).</p>${table(['Metric','Q3 budget ($000s)'],[['Revenue',(fiesole.revenueBudget/1000).toLocaleString('en-US')],['EBITDA',(fiesole.ebitdaBudget/1000).toLocaleString('en-US')]])}<h3>Basis supplied with the budget</h3><p>Quarterly operating budget covering 100% of Fiesole’s operations. EBITDA means earnings before interest, tax, depreciation and amortization. No additional fund adjustments or ownership weighting. Actual and Q3 budget use this same definition in the fictional example.</p><p>Reading the units: 1,400 × $1,000 = $1,400,000 budget EBITDA. The displayed source values above remain in their original units.</p>`},
    {name:'Renaissance_Fund_Capital_Activity_Q3.xlsx',html:`<p class="re-source-caption">Fictional fund-level activity summary · Q3 2026 · USD dollars</p>${table(['Activity','Quarter total'],[['LP contributions',money(capital.calls)],['LP distributions',money(capital.distributions)]])}<p>Aggregate contribution and distribution activity for Renaissance Buyout Fund I during the three months ended 30 September 2026. This summary contains no individual investor balances or allocations. It is not a NAV or investment-return calculation.</p>`}
  ];
  const sourceCard = (kind, name, index, body, action='View source') => `<div class="re-proof-source"><div class="re-proof-card-heading"><div><span class="re-proof-role">Your records</span><h4>${kind}</h4></div><button type="button" data-source="${index}">${action} ↗</button></div><p class="re-proof-filename">${name}</p>${body}</div>`;
  const resultCard = (title, body, index) => `<div class="re-proof-result"><div class="re-proof-card-heading"><div><span class="re-proof-role">${index >= 4 ? 'For your team' : 'For your investors'}</span><h4>${title}</h4></div><span class="re-proof-r" aria-hidden="true">R</span></div>${body}<button type="button" class="re-proof-page-link" data-report-page="${index}">${index >= 4 ? 'See the internal worksheet' : 'See the investor draft'} <span aria-hidden="true">↗</span></button></div>`;
  const story = (n, title, detail, content) => `<article class="re-proof-story"><div class="re-proof-story-heading"><span aria-hidden="true">0${n}</span><div><h3>${title}</h3><p>${detail}</p></div></div><div class="re-proof-comparison">${content}<div class="re-proof-connector" aria-hidden="true"><i></i><span>→</span></div></div></article>`;

  document.getElementById('report-proof-scenes').innerHTML = [
    story(1,'The actuals and budget arrive in different files.','Match the quarter and reporting basis, then put the figures on the same scale.',
      sourceCard('Fiesole’s two workbooks','Fiesole_Q3_Management_Accounts.xlsx',3,`<p class="re-proof-sheet-note">Q3 actuals · USD dollars</p>${table(['Metric','Actual'],[['Revenue',money(fiesole.revenue)],['Reported EBITDA',money(fiesole.ebitda)]])}<p class="re-proof-filename">Fiesole_FY26_Budget.xlsx</p><p class="re-proof-sheet-note">Q3 budget · USD thousands ($000s)</p>${table(['Metric','Budget ($000s)'],[['Revenue',(fiesole.revenueBudget/1000).toLocaleString('en-US')],['EBITDA',(fiesole.ebitdaBudget/1000).toLocaleString('en-US')]])}${cite(4,'Inspect the original budget')}<p class="re-proof-source-caption">Both cover the three months ended 30 September 2026, before additional fund adjustments.</p>`,'View actuals')+
      resultCard('One comparable company row',`<p class="re-proof-report-label">Fiesole Components · Q3 2026 · USD</p>${table(['Metric','Actual','Budget'],[['Revenue',millions(fiesole.revenue),millions(fiesole.revenueBudget)],['EBITDA',millions(fiesole.ebitda),millions(fiesole.ebitdaBudget)]])}<div class="re-proof-big-figures"><div><span>EBITDA below budget</span><strong><mark>$300k</mark></strong><small>Actual less budget</small></div><div><span>Original budget units</span><strong>$000s</strong><small>Multiply by 1,000</small></div></div><p class="re-proof-trace">Budget: 1,400 × $1,000 = $1,400,000.<br>Variance: $1,100,000 − $1,400,000 = −$300,000.</p><div class="re-proof-review-flag"><span>Comparison basis</span><p>Same quarter and supplied EBITDA definition. Budget figures converted from $000s; source values remain visible.</p></div><p class="re-proof-trace">The six-company comparison is in the operating update.</p>`,2)),
    story(2,'The explanation stays attached to the numbers.','Carry management’s explanation into the draft while keeping an unapproved recovery separate.',
      sourceCard('Management’s explanation','Management_Updates_Q3.docx',2,`<div class="re-proof-note-paper"><span>Fiesole Components · Q3 2026</span><p>EBITDA $300k below budget.</p><p>Lower utilization: $180k.<br>Expedited freight: $120k.</p><p><mark>Revised production plan awaiting board review.</mark> No recovery date confirmed.</p></div><p class="re-proof-source-caption">Received 5 October 2026 · USD, “k” means thousands. Management’s explanation has not been independently verified.</p>`)+
      resultCard('Draft company update',`<p class="re-proof-report-label">Fiesole Components</p><blockquote>“Fiesole reported Q3 EBITDA of $1.1 million against a $1.4 million budget. Management attributed the $300,000 shortfall to lower utilization ($180,000) and expedited freight ($120,000). A revised production plan is awaiting board review; no recovery date has been confirmed.”</blockquote><p class="re-proof-trace">The explanation accounts for the $300,000 miss. The proposed recovery remains unapproved.</p><p>${cite(3,'Inspect actuals')} ${cite(4,'Inspect budget')} ${cite(2,'Inspect explanation')}</p>`,3)),
    story(3,'Keep open questions out of confident prose.','Separate the investor wording from the questions your team still needs to resolve.',
      sourceCard('Outstanding information','Management_Updates_Q3.docx',2,`<div class="re-proof-note-paper">${reviewItems.map(([company,source])=>`<p><b>${company}</b><br>${source}</p>`).join('')}</div><p class="re-proof-source-caption">Source notes received 5 October 2026. No recovery dates or missing explanations have been supplied.</p>`)+
      resultCard('Internal follow-up list',`<div class="re-proof-action-queue">${reviewItems.map(([company,,action])=>`<div><strong>${company}</strong><p>${action}</p></div>`).join('')}</div><p class="re-proof-report-label">What the investor draft says</p><blockquote>“Porta Logistics reported EBITDA $100,000 below budget. Management’s explanation remains outstanding.”</blockquote><p class="re-proof-trace">The draft leaves the cause open. Your team decides what to resolve before sign-off. This follow-up list stays internal.</p>`,5))

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
