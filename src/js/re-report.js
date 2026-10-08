/* Fictional, deterministic worked example. No client records or live AI requests. */
(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const properties = [
    ['Arno Court', 180, 174, 700000, 260000, 418000],
    ['Pitti Gardens', 160, 154, 625000, 232000, 372000],
    ['Oltrarno Place', 140, 126, 510000, 226000, 295000],
    ['Fiesole Terrace', 120, 116, 480000, 180000, 284000],
    ['Bellosguardo House', 110, 104, 435000, 166000, 255000],
    ['San Marco Residences', 100, 95, 390000, 146000, 228000],
    ['Cascine Park', 100, 93, 370000, 156000, 204000],
    ['Porta Romana', 90, 80, 350000, 134000, 224000]
  ].map(([name, units, occupied, revenue, expenses, priorNOI]) => ({ name, units, occupied, revenue, expenses, priorNOI, noi: revenue - expenses }));
  const investors = [
    ['Rucellai Holdings',16000000,1000000,425000,16575000],
    ['Bardi Partners',8000000,500000,212500,8287500],
    ['Tornabuoni Foundation',7000000,375000,170000,7205000],
    ['Strozzi Family Trust',1000000,125000,42500,1082500]
  ].map(([name, opening, calls, distributions, recordedClosing]) => ({ name, opening, calls, distributions, recordedClosing, closing: opening + calls - distributions }));
  const reconciledAccounts = investors.filter(row => row.closing === row.recordedClosing).length;
  const arnoMonthly = [['July',225000,85000],['August',230000,90000],['September',245000,85000]];
  const pittiThousands = { revenue:625, expenses:232 };
  const missingUpdates = ['Fiesole Terrace','Bellosguardo House','San Marco Residences','Cascine Park'];
  const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0);
  const totals = Object.fromEntries(['units','occupied','revenue','expenses','noi','priorNOI'].map(key => [key, sum(properties,key)]));
  const capital = Object.fromEntries(['opening','calls','distributions','closing'].map(key => [key, sum(investors,key)]));
  const money = n => '$' + n.toLocaleString('en-US');
  const millions = n => '$' + (n / 1000000).toFixed(2) + 'm';
  const percent = n => n.toFixed(1) + '%';
  const occupancy = percent(totals.occupied / totals.units * 100);
  const growth = percent((totals.noi / totals.priorNOI - 1) * 100);
  const cite = (source, label) => `<button type="button" class="re-citation" data-source="${source}" aria-label="Inspect source: ${label}">${label} ↗</button>`;
  const table = (head, rows) => `<div class="re-document-table"><table><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>i===0?`<th scope="row">${v}</th>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="re-table-scroll-hint" hidden>Scroll the table sideways to see all columns →</p>`;
  const metrics = items => `<div class="re-document-metrics">${items.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
  const note = text => `<p class="re-document-note">${text}</p>`;
  const budget = 2450000;
  const pages = [
    { title:'Letter to investors', short:'Investor letter', body: `
      <p class="re-document-eyebrow">Multifamily operating update · Third quarter 2026</p>
      <h2>Third-quarter update</h2>
      ${metrics([['Portfolio occupancy',occupancy],['Quarterly property NOI',millions(totals.noi)],['Cash distributions',money(capital.distributions)]])}
      <p>Dear Limited Partners,</p>
      <p>Loggia Property Group ended the third quarter with ${totals.occupied} of ${totals.units.toLocaleString('en-US')} apartment units occupied across eight properties. Quarterly property net operating income was ${money(totals.noi)}, up ${growth} from the preceding quarter. ${cite(0,'Operating workbook · rows 2–9')} The property teams reported 22 renewals at Arno Court and seven refurbished units leased at Pitti Gardens. ${cite(2,'Manager notes · Arno and Pitti')}</p>
      <p>Oltrarno Place ended the quarter at 90.0% occupancy. Unit turns took longer than planned, and the team is awaiting a revised contractor quote. The budget and completion date have not yet been approved. ${cite(2,'Manager notes · Oltrarno')}</p>
      <p>During the quarter, investors contributed ${millions(capital.calls)} and received ${money(capital.distributions)} in cash distributions. ${cite(4,'Fund cash activity · quarterly totals')}</p>
      <p>Our priorities for next quarter are leasing vacant units and confirming the budget and schedule for work at Oltrarno Place. The following pages cover portfolio performance and updates from the property teams.</p>
      <p class="re-document-signoff">Loggia Property Group<br><span>General Partner · Loggia Property Group</span></p>
      ${note('Sample report. All fund names, properties, investors, and figures are fictional.')}` },
    { title:'Portfolio at a glance', short:'Eight properties', body: `
      <p class="re-document-eyebrow">Portfolio review</p><h2>Portfolio overview</h2>
      ${metrics([['Apartment units',totals.units.toLocaleString('en-US')],['Occupied units',totals.occupied],['Vacant units',totals.units-totals.occupied]])}
      <p>At quarter-end, 942 of 1,000 units were occupied. Portfolio occupancy is based on total occupied units, so each property is weighted by its unit count.</p>
      ${table(['Property','Units','Occupied','Occupancy','Q3 NOI'],properties.map(p=>[p.name,p.units,p.occupied,percent(p.occupied/p.units*100),money(p.noi)]).concat([['Portfolio',totals.units,totals.occupied,occupancy,money(totals.noi)]]))}
      <h3>Where attention is needed</h3><p>Porta Romana and Oltrarno Place have the lowest occupancy, at ${percent(80/90*100)} and 90.0%. Together they account for 24 of the portfolio’s 58 vacant units. Leasing and unit turns at these two properties are priorities for the coming quarter.</p>
      <div class="re-document-callout"><strong>The calculation</strong><p>${totals.occupied} occupied units ÷ ${totals.units.toLocaleString('en-US')} total units = ${occupancy} portfolio occupancy.</p></div>
      ${cite(0,'Operating workbook · unit counts and NOI')}
      ${note('Physical occupancy as of 30 September 2026. Property NOI is operating revenue less property operating expenses; it excludes debt service, fund expenses and valuation changes.')}` },
    { title:'Operating performance', short:'Operating results', body: `
      <p class="re-document-eyebrow">Income and expenses</p><h2>Quarterly operating results</h2>
      <p>Property NOI increased by ${money(totals.noi-totals.priorNOI)} quarter over quarter, while finishing ${money(budget-totals.noi)} below the Q3 operating budget. This is property-level performance, not a fund return.</p>
      ${table(['Portfolio operating bridge','Q2 actual','Q3 actual','Change'],[
        ['Operating revenue',money(3780000),money(totals.revenue),money(totals.revenue-3780000)],
        ['Operating expenses',money(1500000),money(totals.expenses),money(totals.expenses-1500000)],
        ['Property NOI',money(totals.priorNOI),money(totals.noi),money(totals.noi-totals.priorNOI)]])}
      <h3>NOI by property</h3>
      ${table(['Property','Q2 NOI','Q3 NOI','Change'],properties.map(p=>[p.name,money(p.priorNOI),money(p.noi),(p.noi<p.priorNOI?'−':'+')+money(Math.abs(p.noi-p.priorNOI))]).concat([['Portfolio',money(totals.priorNOI),money(totals.noi),'+'+money(totals.noi-totals.priorNOI)]]))}
      <div class="re-noi-bars">${properties.map(p=>`<div><span>${p.name}</span><i style="--fill:${p.noi/440000*100}%" aria-hidden="true"></i><strong>${money(p.noi)}</strong></div>`).join('')}</div>
      <h3>What changed this quarter</h3><p>Arno Court and Pitti Gardens contributed ${money((properties[0].noi-properties[0].priorNOI)+(properties[1].noi-properties[1].priorNOI))} of the quarter-over-quarter NOI improvement. Oltrarno Place declined by ${money(properties[2].priorNOI-properties[2].noi)}. The manager reported slower unit turns at Oltrarno. Further detail is needed to explain the full decline.</p>
      ${cite(0,'Operating workbook · actuals and budget')} ${cite(2,'Manager notes · leasing and unit turns')}
      ${note('Q3 budget NOI: ' + money(budget) + '. Actual NOI: ' + money(totals.noi) + '. Sample figures are unaudited and have not been annualized.')}` },
    { title:'Asset management update', short:'Property commentary', body: `
      <p class="re-document-eyebrow">Updates from the property teams</p><h2>Property updates</h2>
      <p>The asset managers provided updates on leasing and renovation work at four properties this quarter.</p>
      <div class="re-asset-update"><span>Arno Court · 96.7% occupied</span><h3>22 renewals and nine new leases</h3><p>The team completed 22 renewals and signed nine new leases during the quarter. Six units remained vacant at quarter-end. Next quarter’s focus is maintaining renewal activity and marketing those remaining units.</p></div>
      <div class="re-asset-update"><span>Pitti Gardens · 96.3% occupied</span><h3>Seven refurbished units leased</h3><p>Eleven units were returned to market following refurbishment. Seven had been leased by the reporting date; four remained in active marketing. The team reports no material change to the approved refurbishment scope.</p></div>
      <div class="re-asset-update"><span>Oltrarno Place · 90.0% occupied</span><h3>Slower unit turns; budget pending</h3><p>Fourteen units were vacant at quarter-end. Unit turns took longer than planned, and the team is awaiting a revised contractor quote. The budget and completion date are still to be confirmed.</p></div>
      <div class="re-asset-update"><span>Porta Romana · 88.9% occupied</span><h3>Asking rents under review</h3><p>The property team is reviewing asking rents for ten vacant units. No pricing changes have been approved.</p></div>
      ${cite(2,'Manager notes · all four updates')}
      ${note('Manager updates were provided for four of the eight properties.')}` },
    { title:'Internal · capital movements', short:'Capital reconciliation', body: `
      <p class="re-document-eyebrow">Internal review · investor capital ledger</p><h2>Investor capital activity</h2>
      ${metrics([['Opening balance',millions(capital.opening)],['Contributions',millions(capital.calls)],['Distributions',millions(capital.distributions)]])}
      <p>Investors contributed $2 million and received $850,000 in distributions this quarter. For each of the four accounts, the opening balance plus contributions less distributions matches the balance recorded in the ledger. These checks do not confirm cash settlement or approved allocations.</p>
      ${table(['Investor','Opening','Contributed','Distributed','Calculated','Recorded'],investors.map(p=>[p.name,money(p.opening),money(p.calls),money(p.distributions),money(p.closing),money(p.recordedClosing)]).concat([['Total',money(capital.opening),money(capital.calls),money(capital.distributions),money(capital.closing),money(capital.closing)]]))}
      <div class="re-capital-equation"><span>${millions(capital.opening)}</span><b>+</b><span>${millions(capital.calls)}</span><b>−</b><span>${millions(capital.distributions)}</span><b>=</b><strong>${millions(capital.closing)}</strong></div>
      <h3>Strozzi’s notices tie to the ledger</h3><p>The $125,000 call was received on 15 September; the $42,500 operating distribution was paid on 28 September. $1,000,000 + $125,000 − $42,500 = $1,082,500 after those capital movements.</p>
      <h3>What these balances include</h3><p>These balances reflect contributions and distributions only. Income allocations and valuation adjustments must be added to produce complete capital account statements.</p>
      <h3>For the fund team</h3><p>Confirm allocations and reconcile balances with the fund administrator before sending statements. This schedule is for internal review; each LP should receive only their own account details.</p>
      ${cite(1,'Capital ledger · four investor accounts')}
      ${note('Amounts are in USD. This is a capital-movement schedule, not a complete GAAP capital account statement or audited fund financial statement.')}` },
    { title:'Internal · checks & open items', short:'Review and sources', body: `
      <p class="re-document-eyebrow">Fund-team review copy</p><h2>Checks and open items</h2>
      <div class="re-document-callout re-document-exception"><strong>Still needed: Oltrarno budget and completion date</strong><p>The team is awaiting a revised contractor quote. Confirm the budget and completion date with the asset manager before finalizing the Oltrarno update.</p>${cite(2,'Manager notes · unresolved quote')}</div>
      <h3>Before the report is approved</h3>
      ${table(['Open item','Next step'],[
        ['Oltrarno works','Asset manager: obtain the revised contractor quote and completion schedule.'],
        ['Oltrarno NOI decline','Asset manager: explain the $11,000 decline; the unit-turn note does not quantify its impact.'],
        ['Porta Romana asking rents','Fund team: confirm the pricing decision. The draft makes no claim that rents have changed.'],
        ['Four properties without commentary','Fund team: request updates or approve a report that covers only the four submitted narratives.']])}
      ${cite(5,'Submission register · missing updates')} ${cite(2,'Original manager updates')}
      <h3>Figures checked</h3>
      ${table(['Check','Result'],[
        ['Unit counts','942 occupied + 58 vacant = 1,000 total'],
        ['Weighted occupancy','942 ÷ 1,000 = 94.2%'],
        ['Property NOI',`${money(totals.revenue)} − ${money(totals.expenses)} = ${money(totals.noi)}`],
        ['Quarter-over-quarter NOI',`${money(totals.noi-totals.priorNOI)} increase (${growth})`],
        ['Capital movements','All four account rows reconcile'],
        ['Source periods and units','Arno monthly USD and Pitti quarterly USD thousands converted to Q3 USD.'],
        ['Commentary coverage','Four of eight property updates supplied; the other four require a scope decision.']])}
      <h3>Supporting records</h3><ol class="re-source-register"><li><strong>Loggia_Property_Group_Portfolio_Q3.xlsx</strong><p>Eight properties: unit counts, revenue, expenses, Q2 NOI, and portfolio budget.</p>${cite(0,'View property figures')}</li><li><strong>Loggia_Property_Group_Capital_Accounts.xlsx</strong><p>Four investor accounts: opening balances, contributions, distributions.</p>${cite(1,'View investor ledger')}</li><li><strong>Property_Manager_Updates.eml</strong><p>Original email excerpts from four property teams, received 1–2 October.</p>${cite(2,'View manager updates')}</li><li><strong>Property_Manager_Pack_Extracts</strong><p>Arno monthly operating statements and Pitti quarter-end pack in their original units.</p>${cite(3,'View original property extracts')}</li><li><strong>Loggia_Property_Group_Fund_Cash_Summary.xlsx</strong><p>Aggregate quarterly cash activity, with no individual LP balances.</p>${cite(4,'View fund cash totals')}</li><li><strong>Q3_Submission_Register.xlsx</strong><p>Operating figures received for all eight properties; commentary received for four.</p>${cite(5,'View submission register')}</li></ol>
      ${note('This sample uses fictional records and prewritten commentary. It is not a live Cosimo session.')}` }
  ];
  // HTML below is assembled exclusively from authored constants, never user input.
  function pageHTML(index) {
    return `<article class="re-document-page"><header><span class="re-paper-brand">Loggia Property Group</span><span>Real Estate Fund I<br>Q3 2026 · ${index >= 4 ? 'Internal review' : 'Investor draft'}</span></header>${pages[index].body}<footer><span>Fictional demonstration · Not for distribution</span><span>${String(index+1).padStart(2,'0')} / 06</span></footer></article>`;
  }
  const sources = [
    {name:'Loggia_Property_Group_Portfolio_Q3.xlsx', html:`<p class="re-source-caption">Internal consolidation · Q3 operations · USD · Physical occupancy at 30 September 2026</p>${table(['Property','Units','Occupied','Revenue','Expenses','Q2 NOI'],properties.map(p=>[p.name,p.units,p.occupied,money(p.revenue),money(p.expenses),money(p.priorNOI)]).concat([['Portfolio',totals.units,totals.occupied,money(totals.revenue),money(totals.expenses),money(totals.priorNOI)]]))}<p>Q2 portfolio revenue: $3,780,000 · Q2 operating expenses: $1,500,000 · Q3 budget NOI: $2,450,000.</p><p>Arno’s three monthly statements have been summed; Pitti’s quarterly figures have been converted from USD thousands. The other six property packs report Q3 totals in USD. Occupancy is a quarter-end count, not an average of monthly percentages.</p>${cite(3,'Inspect Arno and Pitti original extracts')}`},
    {name:'Loggia_Property_Group_Capital_Accounts.xlsx',html:`<p class="re-source-caption">Internal only · Capital movements · Q3 2026 · USD</p>${table(['Investor','Opening balance','Contributions','Distributions','Recorded closing'],investors.map(p=>[p.name,money(p.opening),money(p.calls),money(p.distributions),money(p.recordedClosing)]).concat([['Total',money(capital.opening),money(capital.calls),money(capital.distributions),money(capital.closing)]]))}<p>Contribution receipts include the 15 September call for approved Arno Court refurbishment. Strozzi Family Trust contributed $125,000 on 15 September and received its $42,500 operating distribution on 28 September. The hero notices show drafts prepared before those payments; this ledger records the subsequent Q3 movements. The contribution funded work at an existing property, not an acquisition. Amounts follow the approved allocation schedule, not a percentage inferred from opening balances.</p><p>Scope: capital movements only. Income allocations and valuation adjustments are not included.</p>`},
    {name:'Property_Manager_Updates.eml',html:`<p class="re-source-caption">Fictional original email excerpts · Q3 property updates received 1–2 October 2026</p><h3>Arno Court · received 1 October</h3><p>From: Lucia Conti, property manager<br>Subject: Arno / September close</p><blockquote>We finished the quarter with 22 renewals and nine new leases. Six units empty on 30 September. Keeping renewal outreach going and marketing the remaining units.</blockquote><h3>Pitti Gardens · received 1 October</h3><p>From: Matteo Rinaldi, property manager<br>Subject: Q3 refurbishment / leasing</p><blockquote>Eleven refurbished units back on market, seven let by 30 September. Four still in marketing. No material change to the approved works scope.</blockquote><h3>Oltrarno Place · received 2 October</h3><p>From: Alessandra Vanni, asset manager<br>Subject: Oltrarno turns — quote outstanding</p><blockquote>14 vacant at quarter-end. Turns have taken longer than we planned. Contractor is revising the quote; I do not have a number I can recommend yet. Please leave the completion date open until we have their schedule.</blockquote><h3>Porta Romana · received 2 October</h3><p>From: Paolo Galli, property manager<br>Subject: September leasing</p><blockquote>Ten units vacant. Reviewing asking rents on those units with the team. Nothing approved yet.</blockquote><p>Oltrarno: Q2 NOI $295,000; Q3 revenue $510,000 less $226,000 expenses gives $284,000 NOI. The $11,000 decline is 3.7% of Q2 NOI. These messages do not quantify the causes of that decline. No manager narrative was supplied for the other four properties.</p>`},
    {name:'Property_Manager_Pack_Extracts',html:`<p class="re-source-caption">Fictional original property-pack extracts · Same quarter, different reporting formats</p><h3>Arno_Operating_Statements.xlsx</h3><p>Submitted 1 October 2026 · Monthly statements · USD · Operating expenses shown as positive amounts. September rent roll: 180 units, 174 occupied at 30 September.</p>${table(['Month','Operating revenue · USD','Operating expenses · USD'],arnoMonthly.map(([month,revenue,expenses])=>[month,money(revenue),money(expenses)]))}<p>Q2 property NOI: $418,000.</p><h3>Pitti_Q3_Management_Pack.pdf</h3><p>Submitted 2 October 2026 · Quarter ended 30 September 2026 · Financial amounts in USD thousands, not dollars. Operating expenses shown as positive amounts.</p>${table(['Pack line','Reported value'],[['Quarterly operating revenue','625'],['Quarterly operating expenses','232'],['Q2 property NOI','372'],['Units at quarter-end','160'],['Occupied units at quarter-end','154']])}<p>Both extracts use property operating revenue less property operating expenses. Neither includes debt service, fund expenses or valuation changes.</p>`},
    {name:'Loggia_Property_Group_Fund_Cash_Summary.xlsx',html:`<p class="re-source-caption">Quarterly aggregate cash activity · 1 July–30 September 2026 · USD</p>${table(['Fund activity','Total'],[['Investor contributions',money(capital.calls)],['Cash distributions to investors',money(capital.distributions)]])}<p>Fund totals only. No individual investor names, commitments or account balances are included in this source. The separate capital ledger is for internal review.</p>`},
    {name:'Q3_Submission_Register.xlsx',html:`<p class="re-source-caption">Internal collection log · As of 5 October 2026 · No reminders have been sent in this illustration</p>${table(['Property','Q3 operating figures','Manager commentary'],properties.map(p=>[p.name,'Received',missingUpdates.includes(p.name)?'Not received':'Received 1–2 October']))}<p>Oltrarno: contractor quote, works budget and completion date remain outstanding. Manager commentary does not quantify the NOI decline. Porta Romana: asking-rent decision not approved.</p><p>Follow-up ownership and inclusion of the four missing narratives still require the fund team’s decision.</p>`}
  ];
  const sourceCard = (kind, name, index, body) => `<div class="re-proof-source"><div class="re-proof-card-heading"><div><span class="re-proof-role">Your records</span><h4>${kind}</h4></div><button type="button" data-source="${index}">View source ↗</button></div><p class="re-proof-filename">${name}</p>${body}</div>`;
  const resultCard = (title, body, index) => `<div class="re-proof-result"><div class="re-proof-card-heading"><div><span class="re-proof-role">${index >= 4 ? 'For your team' : 'For your investors'}</span><h4>${title}</h4></div><span class="re-proof-r" aria-hidden="true">L</span></div>${body}<button type="button" class="re-proof-page-link" data-report-page="${index}">${index >= 4 ? 'See the internal worksheet' : 'See the investor draft'} <span aria-hidden="true">↗</span></button></div>`;
  const story = (n, title, detail, content) => `<article class="re-proof-story"><div class="re-proof-story-heading"><span aria-hidden="true">0${n}</span><div><h3>${title}</h3><p>${detail}</p></div></div><div class="re-proof-comparison">${content}<div class="re-proof-connector" aria-hidden="true"><i></i><span>→</span></div></div></article>`;
  document.getElementById('report-proof-scenes').innerHTML = [
    story(1,'Different property packs. One set of figures.','Monthly statements in dollars. A quarterly pack in thousands. Put them on the same basis before writing the report.',
      sourceCard('Two property reporting formats','Arno statements + Pitti management pack',3,`<p class="re-proof-sheet-note">Arno · monthly operating figures · USD</p>${table(['Month','Revenue','Expenses'],arnoMonthly.map(([month,revenue,expenses])=>[month,money(revenue),money(expenses)]))}<p class="re-proof-sheet-note">Pitti · Q3 totals · USD thousands</p>${table(['Revenue','Expenses'],[['625','232']])}<p class="re-proof-source-caption">Both cover Q3. The periods and units need to match before the figures can be compared.</p>`)+
      resultCard('The figures behind the commentary',`<div class="re-proof-big-figures"><div><span>Arno · Q3 property NOI</span><strong><mark>${money(properties[0].noi)}</mark></strong><small>$700,000 revenue − $260,000 expenses</small></div><div><span>Pitti · Q3 property NOI</span><strong><mark>${money(properties[1].noi)}</mark></strong><small>(625 − 232) × $1,000</small></div></div><p class="re-proof-report-label">From the operating update</p><blockquote>“Arno Court and Pitti Gardens contributed $43,000 of the quarter-over-quarter NOI improvement.”</blockquote><p class="re-proof-trace">Compared with Q2 NOI of $418,000 and $372,000. All eight properties remain in the full report.</p>`,2)),
    story(2,'Turn the manager’s email into an LP update.','Explain the operating issue without promising a budget or completion date the manager has not confirmed.',
      sourceCard('An unfinished property update','Property_Manager_Updates.eml',2,`${table(['Q2 NOI','Q3 NOI','Change'],[['$295,000','$284,000','−$11,000']])}<div class="re-proof-note-paper"><span>Oltrarno Place · received 2 October</span><p>“14 vacant at quarter-end. Turns have taken longer than we planned.”</p><p>“Contractor is revising the quote; <mark>I do not have a number I can recommend yet.</mark> Please leave the completion date open until we have their schedule.”</p></div><p class="re-proof-source-caption">The operating figures show an $11,000 NOI decline. This email does not explain how much of it came from slower turns.</p>`)+
      resultCard('Investor commentary',`<p class="re-proof-report-label">Oltrarno Place · 90.0% occupied</p><blockquote>“Fourteen units were vacant at quarter-end. Unit turns took longer than planned, and the team is awaiting a revised contractor quote. The budget and completion date are still to be confirmed.”</blockquote><div class="re-proof-review-flag"><span>Still to confirm</span><strong>The quote, the schedule and the NOI explanation.</strong><p>The draft keeps the uncertainty visible. It does not attribute the whole decline to unit turns.</p></div>`,3)),
    story(3,'Know what is still holding up the report.','Figures can be complete while the story is not. Keep missing updates and unapproved decisions in one review list.',
      sourceCard('The gaps in the reporting pack','Q3_Submission_Register.xlsx',5,`<div class="re-proof-big-figures"><div><span>Property operating packs</span><strong>8 of 8</strong><small>Figures received</small></div><div><span>Manager updates</span><strong>4 of 8</strong><small>Commentary received</small></div></div><p class="re-proof-sheet-note">No commentary received for:</p><p>${missingUpdates.join(' · ')}</p><p class="re-proof-source-caption">Oltrarno’s works quote and Porta Romana’s pricing decision are also unresolved. No follow-up has been sent in this example.</p>`)+
      resultCard('Your team’s review list',`<div class="re-proof-action-queue"><div><strong>Oltrarno Place</strong><p>Get the contractor quote and schedule. Ask what explains the $11,000 NOI decline.</p></div><div><strong>Porta Romana</strong><p>Confirm the asking-rent decision before describing any change to LPs.</p></div><div><strong>Four missing updates</strong><p>Request the narratives or agree to report only on the four property updates received.</p></div></div><p class="re-proof-trace">Internal review notes stay separate from the investor pages. Capital movement checks are in the internal appendix.</p>`,5))
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
