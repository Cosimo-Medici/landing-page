/* A deliberately illustrative reporting desk. No product API calls or client data. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const themeButton = document.querySelector('.re-theme');
  try {
    const saved = localStorage.getItem('medici-theme');
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
  } catch (_) { /* The page also works when storage is unavailable. */ }
  function updateThemeLabel() {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
    themeButton.title = `Switch to ${next} theme`;
  }
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('medici-theme', root.dataset.theme); } catch (_) { /* Optional preference. */ }
    updateThemeLabel();
  });
  updateThemeLabel();

  const progress = document.querySelector('.re-reading-progress');
  let framePending = false;
  function updateProgress() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    framePending = false;
  }
  function scheduleProgress() {
    if (!framePending) { framePending = true; requestAnimationFrame(updateProgress); }
  }
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress, { passive: true });
  updateProgress();

  const bench = document.querySelector('.re-workbench');
  const tabs = [...document.querySelectorAll('.re-stage-tabs button')];
  const panel = document.getElementById('step-description');
  const play = document.getElementById('play-workflow');
  let timers = [];
  let playing = false;
  const stages = [
    { title: 'Bring the inputs together.', body: 'Work from your fund records, property updates, and reporting conventions.', caption: 'An output to work toward', status: 'Report outline', note: 'Start with the records your team already uses. Explore a sample preparation cycle below.' },
    { title: 'Prepare a working draft.', body: 'Assemble portfolio figures, investor balances, and narrative in a report for your team to check.', caption: 'A working draft takes shape', status: 'Prepared draft', note: 'The inputs come together into a working report. Select a record above to explore its place in this illustration.' },
    { title: 'Keep judgment with your team.', body: 'Check the figures, refine the commentary, and approve the final communication before it goes out.', caption: 'The final word stays with you', status: 'Team review', note: 'Your team checks the prepared work and adds the context. Nothing in this illustration is sent to investors.' }
  ];
  function setPlayLabel(label, icon = '▷') {
    const symbol = document.createElement('span');
    symbol.setAttribute('aria-hidden', 'true');
    symbol.textContent = icon;
    play.replaceChildren(symbol, document.createTextNode(` ${label}`));
  }
  function stopSequence() {
    timers.forEach(clearTimeout);
    timers = [];
    playing = false;
    setPlayLabel(bench.dataset.step === '0' ? 'Assemble the report' : 'Replay assembly');
  }
  function selectStage(index) {
    const stage = stages[index];
    bench.dataset.step = String(index);
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `step-${index}`);
    const title = document.createElement('strong');
    title.textContent = stage.title;
    panel.replaceChildren(title, document.createTextNode(` ${stage.body}`));
    document.getElementById('stage-caption').textContent = stage.caption;
    document.getElementById('draft-status').textContent = stage.status;
    document.getElementById('agent-note').textContent = stage.note;
  }
  selectStage(1);
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { stopSequence(); selectStage(index); setPlayLabel('Replay assembly'); });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      stopSequence();
      selectStage(next);
      tabs[next].focus();
    });
  });
  play.addEventListener('click', () => {
    if (playing) { stopSequence(); return; }
    stopSequence();
    if (reducedMotion.matches) { selectStage(2); setPlayLabel('Replay assembly'); return; }
    playing = true;
    selectStage(0);
    setPlayLabel('Pause assembly', 'Ⅱ');
    timers.push(setTimeout(() => selectStage(1), 650));
    timers.push(setTimeout(() => { selectStage(2); stopSequence(); }, 2700));
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && playing) { stopSequence(); selectStage(2); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopSequence(); });

  const sources = [
    ['Portfolio operating data', 'Property-level figures form the starting point for the portfolio overview.'],
    ['Capital account ledger', 'Investor balances feed the capital account summary and individual statements.'],
    ['Asset manager updates', 'Property commentary provides context for the quarterly investor narrative.']
  ];
  const records = [...document.querySelectorAll('.re-record')];
  records.forEach((record, index) => record.addEventListener('click', () => {
    stopSequence();
    if (bench.dataset.step === '0') selectStage(1);
    setPlayLabel('Replay assembly');
    records.forEach((item, i) => { item.classList.toggle('is-active', i === index); item.setAttribute('aria-pressed', String(i === index)); });
    document.getElementById('source-title').textContent = sources[index][0];
    document.getElementById('source-detail').textContent = sources[index][1];
    document.querySelectorAll('[data-report-section]').forEach(section => section.classList.toggle('is-highlighted', Number(section.dataset.reportSection) === index));
  }));

  const deliverables = {
    reporting: { category: 'Investor communications', title: ['Quarterly', 'LP report'] },
    capital: { category: 'Investor capital accounts', title: ['Per-LP', 'statement'] },
    notices: { category: 'Capital activity', title: ['Distribution', 'notice'] },
    waterfall: { category: 'Distribution calculations', title: ['Waterfall', 'schedule'] }
  };
  const workflows = [...document.querySelectorAll('[data-workflow]')];
  workflows.forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    workflows.forEach(other => { if (other !== item) other.open = false; });
    const selected = deliverables[item.dataset.workflow];
    document.getElementById('deliverable-type').textContent = selected.category;
    const title = document.getElementById('deliverable-title');
    title.replaceChildren(document.createTextNode(selected.title[0]), document.createElement('br'), document.createTextNode(selected.title[1]));
    document.querySelector('.re-deliverable-graphic').dataset.kind = item.dataset.workflow;
    if (!reducedMotion.matches) {
      document.querySelector('.re-deliverable-paper').animate([
        { transform: 'translateY(8px) rotate(-2deg)', opacity: .65 },
        { transform: 'translateY(0) rotate(-4deg)', opacity: 1 }
      ], { duration: 450, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    scheduleProgress();
  }));
})();
