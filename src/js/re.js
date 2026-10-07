/* A deliberately illustrative reporting desk. No product API calls or client data. */
(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Ported from the homepage typewriter engine: same shuffle, per-character
  // delays, erase/type gap, cycle lengths, cursor and shared reading pause.
  const hero = document.querySelector('.re-hero');
  const heroArt = document.querySelector('.re-hero-art');
  const workflowText = document.querySelector('[data-headline]');
  const promiseText = document.querySelector('[data-promise]');
  const pageConfig = JSON.parse(document.getElementById('fund-page-config')?.textContent || '{}');
  const workflowLines = pageConfig.workflowLines || ['Quarter-end\nLP reporting.', 'Capital call\nnotices.', 'Distribution\nnotices.', 'Investor\nstatements.'];
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

  document.querySelectorAll('[data-workflow]').forEach(item => {
    item.addEventListener('toggle', scheduleProgress);
  });
})();
