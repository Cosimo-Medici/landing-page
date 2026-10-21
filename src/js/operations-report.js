/* Authored fictional records. This reader makes no network requests or changes to accounts. */
(() => {
  'use strict';
  const money = value => '$' + value.toLocaleString('en-US');
  const cite = (id, label) => `<button type="button" class="re-citation" data-source="${id}">${label} ↗</button>`;
  const table = (headers, rows) => `<div class="re-document-table"><table><thead><tr>${headers.map(label => `<th scope="col">${label}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="re-table-scroll-hint" hidden>Scroll sideways to see the remaining columns →</p>`;
  const metrics = items => `<div class="re-document-metrics">${items.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join('')}</div>`;
  const callout = (title, text) => `<div class="re-document-callout"><strong>${title}</strong><p>${text}</p></div>`;
  const activity = [
    ['08:42', 'L-104', 'Arno Components', 'PMT-721', 'Repayment', 100000],
    ['09:15', 'L-208', 'Pitti Packaging', 'DRW-114', 'Advance', 250000],
    ['11:06', 'L-316', 'Bardi Logistics', 'PMT-722', 'Repayment', 200000],
    ['14:20', 'L-422', 'Fiesole Engineering', 'DRW-115', 'Advance', 400000],
    ['16:58', 'L-104', 'Arno Components', 'PMT-721', 'Repayment', 100000]
  ];
  const advances = activity.filter(row => row[4] === 'Advance').reduce((sum, row) => sum + row[5], 0);
  const repayments = activity.filter(row => row[4] === 'Repayment').reduce((sum, row) => sum + row[5], 0);
  const opening = 15000000;
  const controlClosing = 15350000;
  const rawClosing = opening + advances - repayments;
  const difference = controlClosing - rawClosing;
  const activityTable = () => table(['Time', 'Loan', 'Borrower', 'Reference', 'Type', 'Principal'], activity.map(row => [...row.slice(0, 5), money(row[5])]));
  const bankSources = [
    {name:'Cambini_Loan_Activity_2026-10-20.csv', html:`<p>Export received 21 October at 07:00 · Business date 20 October 2026 · USD principal only.</p>${activityTable()}<p>Rows 2 and 6 share loan L-104, reference PMT-721 and the same amount. Both rows are retained here exactly as supplied.</p>`},
    {name:'Cambini_Principal_Control_2026-10-20.pdf', html:`<p>Independent supplied control · Four-loan sample · USD · 20 October 2026.</p>${table(['Loan', 'Opening principal', 'Closing principal'], [['L-104 · Arno Components', '$4,000,000', '$3,900,000'], ['L-208 · Pitti Packaging', '$3,000,000', '$3,250,000'], ['L-316 · Bardi Logistics', '$5,000,000', '$4,800,000'], ['L-422 · Fiesole Engineering', '$3,000,000', '$3,400,000'], ['Total', money(opening), money(controlClosing)]])}<p>This control has a $100,000 net reduction for L-104. It does not explain why the activity export contains two PMT-721 rows.</p>`},
    {name:'Cambini_Review_Procedure_v1.pdf', html:`<p>Fictional bank-supplied procedure · Sections 2–4.</p><ol><li>Retain every source row and reconcile principal movement to the independent control.</li><li>Flag repeated loan/reference/amount combinations for investigation. Do not delete or reverse a posting automatically.</li><li>Assign unresolved differences to loan operations. Require officer review before releasing the activity report.</li><li>Track borrower documents against the supplied reporting calendar.</li></ol>`},
    {name:'Pitti_Borrower_File_2026-Q3.xlsx', html:`<p>Fictional intake register · As of 21 October 2026.</p>${table(['Required record', 'Due', 'Received', 'Owner'], [['Q3 management accounts', '20 Oct 2026', '19 Oct 2026', 'Credit analyst'], ['Signed borrowing-base certificate', '20 Oct 2026', 'Not received', 'Relationship manager'], ['Receivables aging', '20 Oct 2026', '19 Oct 2026', 'Credit analyst']])}<p>The supplied requirement is a document deadline. Agreement interpretation and credit conclusions are outside this register.</p>`}
  ];
  const bankPages = [
    {title:'Morning review', body:`<p class="re-document-eyebrow">Loan operations · 21 October 2026 · Prepared for officer review</p><h2>The morning pack.<br>Two items to resolve.</h2>${metrics([['Principal control', '$15.35m'], ['Unreconciled difference', money(difference)], ['Open review items', '02']])}<p>The four-loan control closes at $15.35 million. The activity export implies $15.25 million: one $100,000 repayment appears twice under the same reference. A separate borrower-file check finds Pitti’s signed borrowing-base certificate outstanding.</p>${table(['Review item', 'Owner', 'Next action'], [['Arno · repeated PMT-721', 'Loan operations', 'Confirm the posting and export history'], ['Pitti · missing certificate', 'Relationship manager', 'Review the draft document request']])}${callout('The source stays intact.', 'The repeated entry remains in the export. The report carries the $100,000 difference until loan operations confirms what happened.')}<p>${cite(0, 'Inspect the activity export')} · ${cite(3, 'Inspect Pitti’s file')}</p>`},
    {title:'Loan activity', body:`<p class="re-document-eyebrow">Business date · 20 October 2026 · USD</p><h2>Five rows.<br>One repeated reference.</h2>${metrics([['Advances in export', money(advances)], ['Repayments in export', money(repayments)], ['Export rows', String(activity.length)]])}${activityTable()}<p>PMT-721 appears at 08:42 and 16:58 against Arno’s loan L-104. The loan, reference and amount match. That makes it a duplicate candidate; the two timestamps alone cannot establish whether this is an export repeat or a posting error.</p><p>${cite(0, 'Original export · rows 2–6')} · ${cite(2, 'Review procedure · repeated references')}</p>${callout('Hand off a specific question.', 'Loan operations: compare PMT-721 with the posting journal and export history. Confirm whether one row should be excluded from this report, or whether a correction is needed in the source system.')}`},
    {title:'Reconciliation', body:`<p class="re-document-eyebrow">Principal movement · Supplied export versus independent control</p><h2>Follow the $100,000.</h2>${table(['Reconciliation line', 'As supplied'], [['Opening principal', money(opening)], ['Plus advances', money(advances)], ['Less export repayments', '(' + money(repayments) + ')'], ['Implied closing principal', money(rawClosing)], ['Independent closing control', money(controlClosing)], ['Control less implied closing', money(difference)]])}<p>${money(opening)} + ${money(advances)} − ${money(repayments)} = ${money(rawClosing)}. The supplied closing control is ${money(controlClosing)}, leaving ${money(difference)} to investigate.</p>${callout('If one repeated row is excluded…', `Repayments become ${money(repayments - 100000)}, and the implied closing balance becomes ${money(rawClosing + 100000)}. That matches the control, but remains a proposed explanation until an officer confirms the underlying record.`)}<p>${cite(0, 'Inspect export')} · ${cite(1, 'Inspect independent control')} · ${cite(2, 'Inspect review procedure')}</p><p class="re-document-note">Principal-only sample. Interest, fees and the full general-ledger reconciliation are outside this pack.</p>`},
    {title:'Borrower follow-up', body:`<p class="re-document-eyebrow">Pitti Packaging · File status at 21 October 2026</p><h2>The accounts arrived.<br>The certificate did not.</h2>${table(['Record', 'Status'], [['Q3 management accounts', 'Received · 19 October'], ['Receivables aging', 'Received · 19 October'], ['Signed borrowing-base certificate', 'Outstanding · due 20 October']])}<p>The certificate is one calendar day overdue against the supplied reporting calendar. The relationship manager has a specific request to review, with the received records acknowledged.</p>${cite(3, 'Open borrower intake register')}${callout('Draft email · not sent', 'Hello Pitti team, thank you for the Q3 management accounts and receivables aging received on 19 October. We are still missing the signed borrowing-base certificate due on 20 October. Please send the certificate, or let us know when it will be available. Thank you, Banco Cambini.')}<p>The document remains outstanding until the bank receives and checks it. This file status does not determine default or change the borrower’s credit terms.</p>`}
  ];
  const insuranceSources = [
    {name:'Lanterna_Renewal_Register_2026-10-21.xlsx', html:`<p>Fictional commercial-property renewal · Bellini Textiles · Policy LAN-CP-2611 · Renewal date 1 November 2026.</p>${table(['Location', 'Current declared value', 'Proposed declared value'], [['Florence warehouse', '$4,800,000', '$5,400,000'], ['Prato workshop', '$3,200,000', '$3,600,000'], ['Total', '$8,000,000', '$9,000,000']])}<p>Values are insured-supplied declarations, not an insurer’s valuation or an agreed sum insured. The revised schedule was received on 19 October.</p>`},
    {name:'Lanterna_Bellini_Document_Checklist.xlsx', html:`<p>Fictional renewal checklist · Snapshot at 21 October 2026.</p>${table(['Required input', 'Status', 'Received / next action'], [['Current policy schedule', 'Received', '15 October'], ['Revised location/value schedule', 'Received', '19 October'], ['Signed renewal proposal', 'Received', '19 October'], ['Five-year loss runs', 'Missing', 'Broker to request'], ['Warehouse protection update', 'Missing', 'Broker to request']])}<p>Three of five inputs received. The loss runs and protection update are requested by this example’s supplied checklist.</p>`},
    {name:'Lanterna_Ricci_Submission_Manifest.xlsx', html:`<p>Fictional marine-cargo submission · Ricci Trading · Received 20 October 2026.</p>${table(['Field / input', 'Proposal', 'Shipment schedule'], [['Annual shipment value', '$12,000,000', '$12,000,000'], ['Maximum value per conveyance', '$500,000', '$750,000'], ['Route', 'Genoa–New York', 'Genoa–New York'], ['Packing specification', 'Attachment referenced', 'No attachment received']])}<p>The proposal is signed; the shipment schedule is a separate attachment. The packing specification is referenced but absent from the upload manifest.</p>`},
    {name:'Lanterna_Moretti_Claim_File_Index.xlsx', html:`<p>Fictional cargo claim · CLM-026 · Moretti Ceramics · Snapshot at 21 October 2026.</p>${table(['Record', 'Date', 'Contents'], [['First notice of loss', '14 October', 'Damage reported on delivery, 13 October'], ['Commercial invoice', '15 October', '200 crates × $300 = $60,000'], ['Delivery tally', '15 October', '40 crates reported damaged'], ['Photographs', '16 October', 'External crate damage'], ['Surveyor report', 'Outstanding', 'Requested · 17 October'], ['Repair / salvage assessment', 'Outstanding', 'Requested · 17 October']])}<p>The tally describes reported damage; condition and recoverable value have not been established. Policy wording and coverage analysis are not supplied in this example.</p>`}
  ];
  const insurancePages = [
    {title:'Operations overview', body:`<p class="re-document-eyebrow">Compagnia della Lanterna · Operations review · 21 October 2026</p><h2>Three files.<br>A clear next step for each.</h2>${metrics([['Renewal', '01'], ['New submission', '01'], ['Claim file', '01']])}${table(['File', 'Open question', 'Owner'], [['Bellini · property renewal', 'Two inputs missing before 1 November', 'Renewal broker'], ['Ricci · cargo submission', '$500k / $750k limit discrepancy', 'Submission analyst'], ['Moretti · cargo claim', 'Survey and assessment outstanding', 'Claims handler']])}<p>Bellini’s declared values have changed, Ricci’s two submission documents disagree, and Moretti’s file needs more evidence. Each view separates what the records say from what the responsible person still needs to decide.</p><p>${cite(1, 'Bellini checklist')} · ${cite(2, 'Ricci submission')} · ${cite(3, 'Moretti file index')}</p>`},
    {title:'Renewal preparation', body:`<p class="re-document-eyebrow">Bellini Textiles · Commercial property · Renews 1 November 2026</p><h2>A changed schedule.<br>Two missing inputs.</h2>${metrics([['Proposed declared value', '$9.0m'], ['Change from current', '+12.5%'], ['Checklist received', '3 / 5']])}${table(['Location', 'Current declaration', 'Proposed declaration', 'Change'], [['Florence warehouse', '$4,800,000', '$5,400,000', '+$600,000'], ['Prato workshop', '$3,200,000', '$3,600,000', '+$400,000'], ['Total', '$8,000,000', '$9,000,000', '+$1,000,000']])}<p>The proposed total is $1 million higher: ($9m − $8m) ÷ $8m = 12.5%. This is a change in declared values, not a premium calculation. Five-year loss runs and the warehouse protection update are still missing, with 11 calendar days until renewal.</p><p>${cite(0, 'Compare location schedules')} · ${cite(1, 'Inspect the five-item checklist')}</p>${callout('Draft broker follow-up · not sent', 'Hello Bellini team, we have the signed proposal and revised values for your 1 November renewal. Please send the five-year loss runs and the updated warehouse protection details so we can complete the review pack. Thank you, Compagnia della Lanterna.')}`},
    {title:'Submission checks', body:`<p class="re-document-eyebrow">Ricci Trading · Marine cargo · New submission</p><h2>One shipment limit.<br>Two different answers.</h2>${table(['Check', 'Proposal', 'Shipment schedule'], [['Annual shipment value', '$12,000,000', '$12,000,000'], ['Maximum per conveyance', '$500,000', '$750,000'], ['Route', 'Genoa–New York', 'Genoa–New York']])}<p>The shipment schedule’s maximum is $250,000 higher than the signed proposal, a 50% difference relative to the proposal. Both amounts stay visible until the broker confirms the intended exposure.</p>${cite(2, 'Inspect submission and attachment manifest')}${callout('Prepare the clarification.', 'Ask the broker to confirm the maximum value per conveyance and supply the referenced packing specification. Do not silently select the larger figure or turn either figure into a quoted limit.')}<h3>Hand-off to the underwriter</h3><p>Include the two original documents, the discrepancy and the missing-attachment request in the review pack. Pricing, terms and acceptance remain with the underwriter.</p>`},
    {title:'Claims-file summary', body:`<p class="re-document-eyebrow">Moretti Ceramics · Cargo file CLM-026 · Review copy</p><h2>The reported damage.<br>The evidence still needed.</h2>${metrics([['Invoice total', '$60,000'], ['Crates reported damaged', '40 / 200'], ['Invoice value of those crates', '$12,000']])}${table(['Date', 'Event'], [['13 October', 'Damage reported on delivery'], ['14 October', 'First notice received'], ['15 October', 'Invoice and delivery tally received'], ['16 October', 'Photographs received'], ['17 October', 'Survey and repair / salvage assessment requested'], ['21 October', 'Both assessments remain outstanding']])}<p>The invoice prices each crate at $300. Forty crates × $300 = $12,000 of invoice value associated with the reported damage. This is neither a verified loss amount nor an amount payable.</p>${cite(3, 'Inspect claim-file index and invoice excerpt')}${callout('Next action · claims handler', 'Obtain the surveyor’s report and repair or salvage assessment, then review the evidence against the applicable policy wording. Keep coverage, liability, reserve and payment decisions with the authorised claims team.')}`}
  ];
  const examples = {
    banks: {name:'Banco Cambini', period:'20 October 2026 · USD', pages:bankPages, sources:bankSources},
    insurance: {name:'Compagnia della Lanterna', period:'21 October 2026 · USD', pages:insurancePages, sources:insuranceSources}
  };
  // UI starts here; the records above are deterministic and independently inspectable.
  const example = examples[document.body.dataset.audience];
  const reader = document.getElementById('operations-reader');
  if (!example || !reader) return;
  const {pages, sources} = example;
  const chapters = document.getElementById('operations-chapters');
  const content = document.getElementById('operations-content');
  const dialog = document.getElementById('operations-source');
  const status = document.getElementById('operations-status');
  const previous = document.getElementById('operations-prev');
  const next = document.getElementById('operations-next');
  let current = 0;
  let sourceOpener = null;
  chapters.innerHTML = pages.map((page, i) => `<button type="button" data-page="${i}" aria-controls="operations-content"><span>0${i + 1}</span>${page.title}</button>`).join('');
  function updateTables() {
    document.querySelectorAll('.ops-demo .re-document-table, .ops-source .re-document-table').forEach(element => {
      const overflow = element.scrollWidth > element.clientWidth + 1;
      element.nextElementSibling.hidden = !overflow;
      if (overflow) { element.tabIndex = 0; element.setAttribute('aria-label', 'Scrollable data table'); }
      else { element.removeAttribute('tabindex'); element.removeAttribute('aria-label'); }
    });
  }
  function render(index, focus = false) {
    if (!Number.isInteger(index) || !pages[index]) return;
    current = index;
    content.innerHTML = `<article class="re-document-page"><header><span class="re-paper-brand">${example.name}</span><span>${example.period}<br>Sample review pack</span></header>${pages[index].body}<footer><span>Fictional records · Prepared example</span><span>0${index + 1} / 0${pages.length}</span></footer></article>`;
    chapters.querySelectorAll('[data-page]').forEach(button => button.setAttribute('aria-current', Number(button.dataset.page) === index ? 'page' : 'false'));
    status.textContent = `Page ${index + 1} of ${pages.length}`;
    previous.disabled = index === 0;
    next.disabled = index === pages.length - 1;
    updateTables();
    if (focus) {
      const heading = content.querySelector('h2');
      heading.tabIndex = -1;
      heading.focus({preventScroll:true});
      document.getElementById('operations-toolbar').scrollIntoView({block:'start', behavior:'instant'});
    }
  }
  reader.addEventListener('click', event => {
    const page = event.target.closest('[data-page]');
    if (page) render(Number(page.dataset.page), true);
    const citation = event.target.closest('[data-source]');
    if (!citation) return;
    const source = sources[Number(citation.dataset.source)];
    if (!source) return;
    sourceOpener = citation;
    document.getElementById('operations-source-name').textContent = source.name;
    document.getElementById('operations-source-content').innerHTML = source.html;
    dialog.showModal();
    updateTables();
  });
  previous.addEventListener('click', () => render(current - 1, true));
  next.addEventListener('click', () => render(current + 1, true));
  document.getElementById('operations-source-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => sourceOpener?.focus({preventScroll:true}));
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  window.addEventListener('resize', updateTables);
  render(0);
})();
