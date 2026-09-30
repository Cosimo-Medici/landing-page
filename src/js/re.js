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

  // Ported from the homepage typewriter engine: same shuffle, per-character
  // delays, erase/type gap, cycle lengths, cursor and shared reading pause.
  const hero = document.querySelector('.re-hero');
  const heroArt = document.querySelector('.re-hero-art');
  const workflowText = document.querySelector('[data-headline]');
  const promiseText = document.querySelector('[data-promise]');
  const workflowLines = ['Quarter-end\nLP reporting.', 'Capital call\nnotices.', 'Distribution\nnotices.', 'Investor\nstatements.'];
  const promiseLines = ['Before your\nmorning coffee.', 'In a\njiffy.', 'On your\ndesk today.', 'Off your\nto-do list.'];
  const heroDocuments = [...document.querySelectorAll('[data-hero-document]')];
  const heroChoices = [...document.querySelectorAll('[data-hero-select]')];
  const cycleToggle = document.querySelector('.re-cycle-toggle');
  const positions = ['front', 'back-left', 'lower-left', 'rear'];
  let heroIndex = 0;
  let departureTimer;
  let userPaused = false;
  let heroVisible = true;
  let typewriters = [];
  let entranceComplete = false;

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


  function selectDocument(index) {
    const previous = heroIndex;
    heroIndex = index;
    clearTimeout(departureTimer);
    heroDocuments.forEach((documentCard, i) => {
      documentCard.classList.remove('is-leaving');
      documentCard.dataset.position = positions[(i - index + positions.length) % positions.length];
    });
    if (previous !== index && !reducedMotion.matches) {
      heroDocuments[previous].classList.add('is-leaving');
      departureTimer = setTimeout(() => heroDocuments[previous].classList.remove('is-leaving'), 450);
    }
    heroChoices.forEach((choice, i) => choice.setAttribute('aria-pressed', String(i === index)));
    heroArt.dataset.activeWorkflow = String(index);
    document.querySelector('.re-slide-count').textContent = `0${index + 1} / 04`;
  }
  function stopTypewriters() {
    typewriters.forEach(writer => writer.stop());
    typewriters = [];
  }
  function syncTypewriters() {
    if (userPaused || reducedMotion.matches || document.hidden || !heroVisible || !entranceComplete) {
      stopTypewriters();
      return;
    }
    if (typewriters.length) return;
    typewriterCoord.lastAnimEnd = 0;
    const top = createTypewriter(workflowText, workflowLines, 8000, typewriterCoord, text => {
      selectDocument(workflowLines.indexOf(text));
    });
    const bottom = createTypewriter(promiseText, promiseLines, 11000, typewriterCoord);
    typewriters = [top, bottom];
    top.start(2000);
    bottom.start(5500);
  }
  function updateCycleControl() {
    cycleToggle.setAttribute('aria-label', userPaused ? 'Play headline rotation' : 'Pause headline rotation');
    cycleToggle.querySelector('[aria-hidden]').textContent = userPaused ? '▷' : 'Ⅱ';
    cycleToggle.querySelector('.re-cycle-label').textContent = userPaused ? 'Play' : 'Pause';
  }
  heroChoices.forEach((choice, index) => choice.addEventListener('click', () => {
    userPaused = true;
    stopTypewriters();
    workflowText.textContent = workflowLines[index];
    selectDocument(index);
    updateCycleControl();
  }));
  cycleToggle.addEventListener('click', () => {
    userPaused = !userPaused;
    updateCycleControl();
    syncTypewriters();
  });
  const heroObserver = new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting && entries[0].intersectionRatio >= .2;
    syncTypewriters();
  }, { threshold: [0, .2] });
  heroObserver.observe(hero);
  document.addEventListener('visibilitychange', syncTypewriters);
  reducedMotion.addEventListener('change', syncTypewriters);
  // Homepage reveal timeline finishes at 2.8s, then starts these same holds.
  setTimeout(() => { entranceComplete = true; syncTypewriters(); }, 2800);

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
    { title: 'Start with your fund records.', body: 'Use property operating data, investor balances, and asset manager updates.', caption: 'LP report outline', status: 'Report outline', note: 'Start with property data, investor balances, and asset manager updates.' },
    { title: 'Cosimo prepares the draft.', body: 'Cosimo combines property figures, investor balances, and asset manager updates into a draft LP report.', caption: 'Draft LP report', status: 'Prepared draft', note: 'Select a source file to see which part of this sample report it informs.' },
    { title: 'Your team checks and approves.', body: 'Check the figures, edit the commentary, and approve the LP report before sending.', caption: 'Draft ready for team review', status: 'Team review', note: 'Review the draft report and approve the final version before it goes to investors.' }
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
    setPlayLabel(bench.dataset.step === '0' ? 'Play the example' : 'Replay the example');
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
    tab.addEventListener('click', () => { stopSequence(); selectStage(index); setPlayLabel('Replay the example'); });
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
    if (reducedMotion.matches) { selectStage(2); setPlayLabel('Replay the example'); return; }
    playing = true;
    selectStage(0);
    setPlayLabel('Pause the example', 'Ⅱ');
    timers.push(setTimeout(() => selectStage(1), 650));
    timers.push(setTimeout(() => { selectStage(2); stopSequence(); }, 2700));
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && playing) { stopSequence(); selectStage(2); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopSequence(); });

  const sources = [
    ['Portfolio operating data', 'Property counts and occupancy figures become the portfolio overview.'],
    ['Capital account ledger', 'Investor balances feed the capital account summary and individual LP statements.'],
    ['Asset manager updates', 'Leasing and property updates become the commentary in the LP letter.']
  ];
  const records = [...document.querySelectorAll('.re-record')];
  records.forEach((record, index) => record.addEventListener('click', () => {
    stopSequence();
    if (bench.dataset.step === '0') selectStage(1);
    setPlayLabel('Replay the example');
    records.forEach((item, i) => { item.classList.toggle('is-active', i === index); item.setAttribute('aria-pressed', String(i === index)); });
    document.getElementById('source-title').textContent = sources[index][0];
    document.getElementById('source-detail').textContent = sources[index][1];
    document.querySelectorAll('[data-report-section]').forEach(section => section.classList.toggle('is-highlighted', Number(section.dataset.reportSection) === index));
  }));

  const deliverables = {
    reporting: { category: 'Investor communications', title: ['Quarterly', 'LP report'] },
    capital: { category: 'Investor capital accounts', title: ['Per-LP', 'statement'] },
    notices: { category: 'Capital activity', title: ['Capital call', 'notice'] },
    distributions: { category: 'Investor distributions', title: ['Distribution', 'notice'] }
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
