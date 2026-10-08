/* Fictional authored example. Administrator returns are supplied, never calculated from trades. */
(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const money = n => '$' + n.toLocaleString('en-US');
  const cite = (source, label) => `<button type="button" class="re-citation" data-source="${source}" aria-label="Inspect source: ${label}">${label} ↗</button>`;
  const table = (head, rows) => `<div class="re-document-table"><table><thead><tr>${head.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((v,i)=>i===0?`<th scope="row">${v}</th>`:`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="re-table-scroll-hint" hidden>Scroll the table sideways to see all columns →</p>`;
  const metrics = items => `<div class="re-document-metrics">${items.map(([label,value])=>`<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
  const note = text => `<p class="re-document-note">${text}</p>`;
  const returns = [['July',1.4],['August',-0.6],['September',2.1]];
  const classNAV = [100.0000,101.4000,100.7916,102.9082];
  const performanceRows = returns.map(([month,value],i)=>[month+' 2026','$'+classNAV[i].toFixed(4),'$'+classNAV[i+1].toFixed(4),(value>0?'+':'')+value.toFixed(2)+'%']);
  const quarterly = ((returns.reduce((n,row)=>n*(1+row[1]/100),1)-1)*100).toFixed(2)+'%';
  const sectors = [['Technology',28,15],['Healthcare',22,8],['Industrials',18,10],['Consumer',12,7],['Financials',10,0]];
  const long = sectors.reduce((n,row)=>n+row[1],0);
  const short = sectors.reduce((n,row)=>n+row[2],0);
  const flows = [['Rucellai Holdings','Subscription',2000000,'1 Sep','Processed'],['Tornabuoni Foundation','Subscription',1000000,'1 Sep','Processed'],['Bardi Partners','Redemption',1000000,'30 Sep','Processed'],['Strozzi Family Trust','Redemption',500000,'30 Sep','Processed']];
  const flowTotal = type => flows.filter(row=>row[1]===type).reduce((n,row)=>n+row[2],0);
  const netResult = [['Long-book trading result',2340000],['Short-book trading result',-420000],['Dividend income',180000],['Financing and stock borrow',-210000],['Operating expenses',-80000],['Management fees',-100000],['Performance fees',-30000]];
  const investmentResult = netResult.reduce((n,row)=>n+row[1],0);
  const openingNAV = 82000000;
  const closingNAV = openingNAV+flowTotal('Subscription')-flowTotal('Redemption')+investmentResult;
  const signedMoney = n => n<0?'('+money(-n)+')':money(n);
  const navRows = [['Opening NAV · 31 August',money(openingNAV)],['Subscriptions',money(flowTotal('Subscription'))],['Redemptions',signedMoney(-flowTotal('Redemption'))],['Net investment result',money(investmentResult)],['Closing NAV · 30 September',money(closingNAV)]];
  const netResultRows = netResult.map(([label,value])=>[label,signedMoney(value)]).concat([['Net investment result',money(investmentResult)]]);
  const exposureValueRows = sectors.map(([label,l,s])=>[label,money(Math.round(closingNAV*l/100)),money(Math.round(closingNAV*s/100))]).concat([['Total',money(Math.round(closingNAV*long/100)),money(Math.round(closingNAV*short/100))]]);
  const cash = [['PB-01 / USD',1200000,1200000,'Balance matches'],['PB-02 / USD',410000,535000,'Open'],['Custody / EUR',280000,280000,'Balance matches']];
  const cashGap = cash[1][2]-cash[1][1];
  const cashBasis = '2 October 2026 · 17:00 New York · settled cash only · amounts in account currency';
  const pages = [
    {title:'Investor letter', short:'September letter', body:`
      <p class="re-document-eyebrow">September 2026 · Investor letter draft</p><h2>The month in review</h2>
      ${metrics([['Class A USD · September net','+2.10%'],['Gross exposure','130%'],['Net exposure','50%']])}
      <p>Dear investors,</p><p>Anamorphic Capital’s Class A USD returned 2.10% after management and performance fees in September.</p>
      <p>Our industrial holdings contributed positively during September. The technology short book detracted as several positions rose. We reduced selected technology positions during the month; the portfolio ended September with 90% long exposure and 40% short exposure.</p>
      <p>Gross exposure was 130% and net exposure was 50% at month-end. These figures describe the portfolio at 30 September and do not capture how exposures changed during the month.</p>
      <p>We continue to focus on company fundamentals and position sizing. Thank you for your continued confidence.</p><p class="re-document-signoff">The Anamorphic Capital investment team</p>
      ${cite(0,'Approved Class A USD return')}${cite(2,'PM commentary')}${cite(3,'Month-end exposure')}
      ${note('Fictional performance for demonstration only. Class A USD returns are after management and performance fees; other classes may differ. Returns are not annualized. Past performance does not predict future results. Not an offer to invest. Source links are for internal review.')}`},
    {title:'Performance', short:'Approved returns', body:`
      <p class="re-document-eyebrow">Class A · USD · Net of fees</p><h2>Monthly performance</h2>
      <p>The administrator’s approved return file reports the following monthly results for Class A USD, after management and performance fees.</p>
      ${table(['Month','Opening NAV / unit','Closing NAV / unit','Approved net return'],performanceRows)}<p>The unit values are from the same approved Class A USD file. There were no class distributions or unit splits in this period. Closing divided by opening NAV per unit, less one, agrees with each supplied monthly return when rounded to two decimals.</p>
      ${cite(0,'Approved return file · 5 October')}
      <h3>Reporting basis</h3>${table(['Field','Basis'],[['Fund','Anamorphic Capital'],['Class / currency','Class A / USD'],['Monthly periods','July, August and September 2026'],['Fee treatment','After management and performance fees']])}
      ${note('Fictional figures for demonstration only. Monthly returns are not annualized. Past performance does not predict future results. Not an offer to invest.')}`},
    {title:'Portfolio exposure', short:'Exposure snapshot', body:`
      <p class="re-document-eyebrow">30 September 2026 · Fund portfolio · Market value ÷ NAV</p><h2>Where the portfolio stood</h2>
      ${metrics([['Long exposure',long+'%'],['Short exposure',short+'%'],['Gross / net','130% / 50%']])}
      <p>Technology was the largest long sector and the largest short sector at month-end. Short exposure is shown as a positive magnitude.</p>
      ${table(['Sector','Long','Short','Net'],sectors.map(([name,l,s])=>[name,l+'%',s+'%',(l-s)+'%']).concat([['Total',long+'%',short+'%',(long-short)+'%']]))}<h3>The market values behind the percentages</h3>${table(['Sector','Long market value','Short magnitude'],exposureValueRows)}<p>All percentages use the same $85.18m fund NAV at 30 September. Long market value of $76.662m plus short magnitude of $34.072m gives $110.734m gross exposure; the difference is $42.590m net exposure. These are exposure measures, not cash balances.</p>
      <h3>Portfolio commentary</h3><p>Industrial holdings contributed positively. The technology short book detracted. Several technology positions were reduced during the month.</p>
      <p>Gross exposure is long plus short exposure: 90% + 40% = 130%. Net exposure is long less short: 90% − 40% = 50%.</p>
      ${cite(3,'Approved equity exposure file')}${cite(2,'PM commentary')}
      ${note('Fictional equity-only example, excluding derivatives. A point-in-time exposure summary is not a complete risk report. Qualitative commentary comes from the supplied PM notes; no security-level contribution has been invented.')}`},
    {title:'Internal · close exceptions', short:'Internal operations', body:`
      <p class="re-document-eyebrow">Internal workpaper · Cash and reporting checks</p><h2>The cash difference stays open</h2>
      ${metrics([['Accounts compared','3'],['Balances matching','2'],['Unresolved differences','1']])}<p>The three sampled accounts use the same settled-cash basis and snapshot cutoff. PB-02 differs by ${money(cashGap)}. The other two sampled balances match; this is not a full reconciliation.</p><p>${cashBasis}.</p>
      ${table(['Account','Broker / custodian','Administrator','Admin less broker','Status'],cash.map(([account,broker,admin,status])=>[account,account.includes('EUR')?'€'+broker.toLocaleString('en-US'):money(broker),account.includes('EUR')?'€'+admin.toLocaleString('en-US'):money(admin),account.includes('EUR')?'€'+(admin-broker):money(admin-broker),status]))}
      ${cite(4,'Broker and custody balances')}${cite(5,'Administrator cash ledger')}
      <div class="re-document-callout re-document-exception"><strong>PB-02 / USD: ${money(cashGap)} open</strong><p>An operations email mentions an expected $125,000 settlement receipt. The amount matches the gap, but the folder contains no credit confirmation. It could explain the difference; it does not establish the cause or resolve it.</p></div>${cite(6,'Operations email')}${cite(12,'Review folder inventory')}
      ${table(['Proposed next action','Suggested owner','Status'],[['Obtain broker credit confirmation','Operations','To request'],['Compare value date and posting date','Fund controller','Pending evidence'],['Record the explanation and resolution','Fund controller','Open']])}
      <h3>Performance file checks</h3>
      <div class="re-document-callout"><strong>Internal check: quarter calculation</strong><p>(1.014 × 0.994 × 1.021) − 1 = ${quarterly}. This is an illustrative compound of the supplied rounded monthly returns, not an administrator-approved quarterly figure. Confirm the official quarter result before adding it to the investor letter.</p></div>
      <p>The 3 October preliminary file showed September at +1.90%. The 5 October approved file replaces it with +2.10%: a 0.20 percentage-point revision (20 basis points), not a 0.20% relative increase. The approved September closing unit value is $102.9082 versus the preliminary $102.7066.</p>${cite(1,'Superseded preliminary return')}
      ${cite(0,'Approved return file · 5 October')}
      <h3>For controller review</h3><p>Confirm the cash basis against the original records, obtain the missing evidence, and decide whether the difference is explained. No request has been sent in this example.</p>
      ${note('Internal only. Cash currencies are not aggregated. Cosimo does not mark an unexplained difference resolved or move cash.')}`},
    {title:'Internal · investor activity', short:'Internal flow summary', body:`
      <p class="re-document-eyebrow">Internal workpaper · September processed flows</p><h2>Subscriptions and redemptions</h2>
      ${metrics([['Subscriptions',money(flowTotal('Subscription'))],['Redemptions',money(flowTotal('Redemption'))],['Net processed flows',money(flowTotal('Subscription')-flowTotal('Redemption'))]])}
      <p>The administrator recorded four processed requests in September. Effective dates and processing status are retained below.</p>
      ${table(['Investor','Activity','Amount','Effective','Status'],flows.map(([name,type,amount,date,status])=>[name,type,money(amount),date,status]))}
      <h3>Fund NAV movement</h3>${table(['Administrator movement schedule','USD'],navRows)}
      <h3>What makes up the $1.68m result</h3>${table(['Administrator P&amp;L line','USD'],netResultRows)}<p>The approved fund-level movement schedule adds to $85.18 million. It does not determine any share class’s return: classes, series, fees, and flow timing can differ.</p>${cite(11,'Administrator flow and NAV schedules')}
      <div class="re-document-callout re-document-exception"><strong>Separate request: bank verification outstanding</strong><p>Portinari Partners requested a $250,000 redemption for 31 October. The request register lists new bank details awaiting independent verification. It is pending and excluded from September’s processed totals.</p></div>${cite(13,'Pending investor request register')}
      ${note('Internal only. Named investor activity must not be included in a general investor letter. Processed status does not prove cash settlement. This example does not approve requests, calculate dealing prices, or release payments.')}`},
    {title:'Internal · allocator responses', short:'Internal DDQ drafts', body:`
      <p class="re-document-eyebrow">Internal workpaper · Tornabuoni Foundation request</p><h2>Two drafts.<br>One answer on hold.</h2>
      <p>Three questions arrived on 5 October. The policies support two draft responses, with a gap in the NAV answer. The continuity answer needs current evidence.</p>${cite(7,'Original allocator email')}
      <div class="re-asset-update"><span>Valuation · partial draft · policy §4</span><h3>Who prepares and approves NAV?</h3><p>The independent administrator prepares monthly NAV. The controller reviews the administrator’s pack, and the valuation committee considers escalated pricing exceptions under the valuation policy.</p><p><strong>Confirm before sharing:</strong> this extract describes preparation and review. It does not identify final NAV approval authority. Ask the controller to complete that part of the answer.</p>${cite(8,'Valuation policy · §4')}</div>
      <div class="re-asset-update"><span>Cash controls · draft · policy §7</span><h3>How are cash transfers approved?</h3><p>An operations user prepares the instruction. Two authorized signatories approve it, and the preparer cannot act as an approver. Changes to standing payment details require independent verification.</p>${cite(9,'Cash control policy · §7')}</div>
      <div class="re-document-callout re-document-exception"><strong>Continuity answer on hold</strong><p>The allocator asks for the latest 2026 test date and outcome. The supplied report is dated 14 November 2025. Ask the COO for current evidence; last year’s report cannot answer this question.</p></div>${cite(10,'2025 continuity test report')}${cite(12,'Review folder inventory')}
      ${table(['Requested answer','Draft status','Open evidence item'],[['NAV process','Partial draft','Final approval authority'],['Cash controls','Draft from current policy','Owner review before sharing'],['2026 continuity test','On hold','2026 test date and outcome']])}<p>Three questions: two draft responses, one held response, and two missing evidence items. None is approved for sending.</p><h3>Before sharing</h3><p>Confirm NAV approval authority, obtain the current continuity evidence, and have the responsible owners review the responses. A policy describes a control; it does not prove that the control operated.</p>
      ${note('Original illustrative questions, not an AIMA DDQ reproduction. All records and responses are fictional; no follow-up has been sent and no answer has been approved in this authored example.')}`}
  ];
  function pageHTML(index) {
    return `<article class="re-document-page"><header><span class="re-paper-brand">Anamorphic Capital</span><span>Equity Fund<br>September 2026 · ${index >= 3 ? 'Internal review' : 'Investor draft'}</span></header>${pages[index].body}<footer><span>Fictional demonstration · Not for distribution</span><span>${String(index+1).padStart(2,'0')} / 06</span></footer></article>`;
  }
  const record = (name,caption,html) => ({name,html:`<p class="re-source-caption">Fictional source excerpt · ${caption}</p>${html}`});
  const sources = [
    record('Anamorphic_Capital_ClassA_USD_Sep_APPROVED.xlsx','Administrator · approved 5 October 2026 · return file v2',`<h3>Class A USD · after management and performance fees</h3>${table(['Month','Opening NAV / unit','Closing NAV / unit','Approved net return'],performanceRows)}<p>USD per Class A unit; unit values rounded to four decimals and returns to two decimals. No distributions or unit splits in these periods. Class NAV per unit is distinct from the fund-level NAV movement.</p><p>Status: approved. Replaces the 3 October preliminary September figure. No approved quarterly figure is included in this extract.</p>`),
    record('Anamorphic_Capital_ClassA_USD_Sep_PRELIM.xlsx','Administrator · sent 3 October 2026 · return file v1',`<h3>September 2026 · Class A USD</h3>${table(['Period','Opening NAV / unit','Closing NAV / unit','Net return'],[['1–30 September 2026','$100.7916','$102.7066','+1.90%']])}<p>Status: preliminary — not for distribution. Unit values in USD, rounded to four decimals.</p><p>After management and performance fees. Subject to final administrator approval.</p>`),
    record('PM_September_Commentary.eml','Portfolio manager → Investor relations · 5 October 2026, 10:15 · approved for drafting',`<h3>Subject: September letter notes</h3><p>Industrial holdings contributed positively. Technology shorts detracted as several positions rose. We reduced selected technology positions during September. Our focus remains on company fundamentals and position sizing.</p><p>Please use these notes for the September draft. Return figures should come from the final administrator file.</p>`),
    record('Anamorphic_Capital_Exposure_30Sep.xlsx','Portfolio operations · approved 5 October 2026 · as of 30 September',`<h3>Fund portfolio · market value / fund NAV</h3>${table(['Sector','Long','Short magnitude'],sectors.map(([name,l,s])=>[name,l+'%',s+'%']).concat([['Total',long+'%',short+'%']]))}<h3>Underlying market values · USD</h3>${table(['Sector','Long market value','Short magnitude'],exposureValueRows)}<p>Fund NAV denominator: ${money(closingNAV)} at 30 September, matching the approved NAV movement schedule.</p><p>Equity-only exposure, no derivatives. Long and short percentages use the same fund NAV denominator. Short exposure is reported as a positive magnitude.</p>`),
    record('Broker_Custody_Cash_02Oct.csv','External account extracts · '+cashBasis,`<h3>Prime broker / custody records</h3>${table(['Account','Currency','Settled cash'],cash.map(([name,b])=>[name,name.includes('EUR')?'EUR':'USD',b.toLocaleString('en-US')]))}<p>PB-01 and PB-02 are separate prime broker accounts. Custody is the EUR custody account. Unsettled receivables and payables are excluded.</p>`),
    record('Administrator_Cash_Ledger_02Oct.xlsx','Administrator extract · '+cashBasis,`<h3>Cash ledger · corresponding accounts</h3>${table(['Account','Currency','Settled cash'],cash.map(([name,b,a])=>[name,name.includes('EUR')?'EUR':'USD',a.toLocaleString('en-US')]))}<p>Account IDs correspond to the external records. Unsettled receivables and payables are excluded. Snapshot cutoff is 17:00 New York.</p>`),
    record('Operations_Settlement_Note.eml','Operations → Controller · 2 October 2026, 17:20',`<h3>Subject: PB-02 expected receipt</h3><p>We were expecting USD 125,000 into PB-02 today. I do not yet have the broker credit confirmation. It may be the settlement receipt, but I have not checked the posting or value dates against the administrator ledger.</p>`),
    record('Tornabuoni_Allocator_Request.eml','Tornabuoni Foundation → Investor relations · 5 October 2026',`<h3>Subject: Operational diligence update</h3><p>Please update the following three items for our review:</p><ol><li>Who prepares and approves monthly NAV?</li><li>How are cash transfers approved?</li><li>Please provide the date and outcome of your latest 2026 business continuity test.</li></ol>`),
    record('Valuation_Policy_Aug2026.pdf · §4','Approved policy · effective 1 August 2026',`<h3>§4 · NAV preparation and review</h3><p>The independent administrator prepares monthly NAV. The controller reviews the administrator’s pack. The valuation committee reviews pricing exceptions escalated under the valuation policy.</p>`),
    record('Cash_Control_Policy_Aug2026.pdf · §7','Approved policy · effective 1 August 2026',`<h3>§7 · Payment instructions</h3><p>Operations prepares payment instructions. Two authorized signatories approve each instruction. The preparer cannot act as an approver. Changes to standing payment details require independent verification.</p>`),
    record('Continuity_Test_14Nov2025.pdf','COO · test summary · 14 November 2025',`<h3>Annual continuity exercise</h3><p>Exercise date: 14 November 2025. Remote access and alternate communications were tested. The recorded outcome was satisfactory, with contact-list updates assigned to operations.</p><p>This report covers the November 2025 exercise.</p>`),
    record('Administrator_Flows_NAV_Sep.xlsx','Administrator · approved 5 October 2026 · internal schedules',`<h3>Processed investor requests</h3>${table(['Investor','Type','USD','Effective','Status'],flows.map(([name,type,amount,date,status])=>[name,type,money(amount),date,status]))}<h3>Fund NAV movement / USD</h3>${table(['Item','Amount'],navRows)}<h3>Net investment result · September · USD</h3>${table(['P&amp;L line','USD'],netResultRows)}<p>Trading results include realized and unrealized price movements, before the separately listed dividends and expenses. No item is counted twice. This is the whole-fund result, not Class A’s return or a security-level attribution schedule.</p><p>Processed is the administrator’s request status, not confirmation of payment settlement. Fund movement is separate from share-class performance.</p>`),
    record('Review_Folder_Inventory_05Oct.txt','Internal folder manifest · 5 October 2026, 17:00',`<h3>Evidence supplied for this review</h3><ul><li>Class A USD return files: preliminary 3 October; approved 5 October.</li><li>PM September commentary; 30 September exposure file.</li><li>2 October broker/custody balances; administrator cash ledger; operations settlement email.</li><li>August valuation and cash-control policies.</li><li>Tornabuoni Foundation request dated 5 October.</li><li>Continuity_Test_14Nov2025.pdf.</li><li>September administrator flows/NAV schedule; 5 October investor request register.</li></ul><p>The manifest contains no broker credit confirmation or 2026 continuity-test report. This establishes what was supplied for this example, not whether those records exist elsewhere.</p>`),
    record('Investor_Request_Register_05Oct.xlsx','Investor relations · 5 October 2026 · unprocessed request',`${table(['Investor','Request','Amount','Requested date','Status'],[['Portinari Partners','Redemption',money(250000),'31 October 2026','Pending bank verification']])}<p>New bank details received. Independent verification is outstanding. Excluded from the September processed activity schedule.</p>`)
  ];
  const sourceCard = (kind,name,index,body) => `<div class="re-proof-source"><div class="re-proof-card-heading"><div><span class="re-proof-role">Your records</span><h4>${kind}</h4></div><button type="button" data-source="${index}">View source ↗</button></div><p class="re-proof-filename">${name}</p>${body}</div>`;
  const resultCard = (title,body,index) => `<div class="re-proof-result"><div class="re-proof-card-heading"><div><span class="re-proof-role">${index >= 3 ? 'For your team' : 'For your investors'}</span><h4>${title}</h4></div><span class="re-proof-r" aria-hidden="true">A</span></div>${body}<button type="button" class="re-proof-page-link" data-report-page="${index}">${index >= 3 ? 'See the internal worksheet' : 'See the investor draft'} <span aria-hidden="true">↗</span></button></div>`;
  const story = (n,title,detail,content) => `<article class="re-proof-story"><div class="re-proof-story-heading"><span aria-hidden="true">0${n}</span><div><h3>${title}</h3><p>${detail}</p></div></div><div class="re-proof-comparison">${content}<div class="re-proof-connector" aria-hidden="true"><i></i><span>→</span></div></div></article>`;
  document.getElementById('report-proof-scenes').innerHTML = [
    story(1,'The return changed. The draft should too.','Two administrator files, separate PM notes, one investor letter. The draft uses the approved figure and keeps its class and fee basis.',
      sourceCard('Two versions in the folder','Class A USD · September 2026',0,`${table(['Administrator file','Net return','Status'],[['3 October · v1','+1.90%','Preliminary'],['5 October · v2','+2.10%','Approved']])}${cite(1,'Inspect the preliminary file')}<div class="re-proof-note-paper"><span>Separate PM email · 5 October</span><p>Industrials helped. Technology shorts detracted. Use the final administrator return.</p></div>${cite(2,'Inspect the PM email')}`)+
      resultCard('September investor letter',`<div class="re-proof-big-figures"><div><span>September · Class A USD net</span><strong><mark>+2.10%</mark></strong><small>Approved file · 5 October · after fees</small></div></div><blockquote>“Anamorphic Capital’s Class A USD returned 2.10% after management and performance fees in September. Our industrial holdings contributed positively. The technology short book detracted as several positions rose.”</blockquote><p class="re-proof-trace">A 20-basis-point revision: +2.10% − +1.90%. The superseded +1.90% stays out. Commentary comes from the PM’s own notes.</p>`,0)),
    story(2,'A matching amount is not a resolved break.','Compare the same accounts on the same basis. Keep the plausible explanation separate from the evidence needed to close the item.',
      sourceCard('Two cash records. One email.','PB-02 · USD · 2 October · 17:00 New York',4,`<p class="re-proof-sheet-note">Both records: settled cash only</p>${table(['Record','Balance'],[['Prime broker',money(410000)],['Administrator',money(535000)]])}${cite(5,'Inspect the administrator ledger')}<div class="re-proof-note-paper"><span>Operations email · 17:20</span><p>“Expecting USD 125,000 … I do not yet have the broker credit confirmation.”</p></div>${cite(6,'Inspect the operations email')}`)+
      resultCard('Open cash exception',`<div class="re-proof-big-figures"><div><span>Administrator less broker</span><strong><mark>${money(cashGap)}</mark></strong><small>$535,000 − $410,000</small></div></div><div class="re-proof-review-flag"><span>Suggested next action · not sent</span><strong>Get the credit confirmation.</strong><p>The expected receipt matches the gap. Operations still needs to verify the credit and dates before the controller can close it.</p></div><p class="re-proof-trace">The difference stays open. No unsupported “resolved” status.</p>`,3)),
    story(3,'Draft what the evidence supports. Hold the rest.','An allocator asks three questions. Two policies help; last year’s continuity report leaves the third answer unfinished.',
      sourceCard('The request and the records','Tornabuoni Foundation · 5 October',7,`<div class="re-proof-note-paper"><span>Allocator’s request</span><p>Who prepares and approves NAV? How are cash transfers approved? What was the result of the latest 2026 continuity test?</p></div>${table(['Available record','Date'],[['Valuation policy · §4','August 2026'],['Cash-control policy · §7','August 2026'],['Continuity test report','November 2025']])}${cite(8,'Valuation policy')}${cite(9,'Cash-control policy')}${cite(10,'Continuity test report')}`)+
      resultCard('Two drafts + one hold',`<p class="re-proof-report-label">Cash controls · draft from policy §7</p><blockquote>“An operations user prepares the instruction. Two authorized signatories approve it, and the preparer cannot act as an approver.”</blockquote><div class="re-proof-action-queue"><div><strong>NAV: confirm the approver.</strong><p>The policy supports the preparation and review description, but does not identify final approval authority.</p></div><div><strong>Continuity: keep the answer on hold.</strong><p>Ask the COO for the 2026 report. The November 2025 test does not answer this year’s question.</p></div></div>`,5))
  ].join('');
  const reader = document.getElementById('sample-lp-report');
  const sourceDialog = document.getElementById('report-source');
  const chapters = document.getElementById('reader-chapters');
  let readerPage = 0;
  const chapterAudience = index => index < 3 ? 'Investor draft' : 'Internal review';
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
