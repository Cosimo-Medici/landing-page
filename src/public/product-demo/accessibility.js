// Accessibility bridge for the exported application example. Keep the generated
// application bundle intact; reapply semantics when React replaces example rows.
(() => {
  'use strict';
  let queued = false;
  let openPanel = null;
  let panelOrigin = null;
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (button && !button.closest('[data-testid="side-panel"]')) panelOrigin = button;
  }, true);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && openPanel) {
      const close = openPanel.querySelector('[data-testid="panel-close"]');
      if (close) { event.preventDefault(); close.click(); }
    }
  });
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; enhance(); });
  });
  function enhance() {
    observer.disconnect();
    const panel = document.querySelector('[data-testid="panel-content"]');
    if (panel) {
      panel.setAttribute('role', 'region');
      panel.setAttribute('aria-label', 'Cosimo example details and supporting records');
      const close = panel.querySelector('[data-testid="panel-close"]');
      close?.setAttribute('aria-label', 'Close supporting records');
      if (panel !== openPanel) close?.focus();
    } else if (openPanel && panelOrigin?.isConnected) panelOrigin.focus();
    openPanel = panel;
    // Workflow provenance in this static export is illustrative. Do not offer
    // an application-route link that would send a visitor to a nonexistent run.
    document.querySelectorAll('a[href^="/workflows/"]').forEach(link => {
      link.removeAttribute('href');
      link.classList.add('demo-provenance');
      [...link.querySelectorAll('*')].filter(child => !child.children.length).forEach(child => {
        if (child.textContent.includes('open run transcript')) {
          child.textContent = child.textContent.replace('open run transcript', 'illustrative workflow');
        }
      });
    });
    document.querySelectorAll('table').forEach(table => {
      table.setAttribute('aria-label', 'Chianti Capital fictional company records');
      table.querySelectorAll('thead td').forEach(cell => cell.setAttribute('role', 'columnheader'));
      table.querySelectorAll('thead th').forEach(cell => {
        cell.setAttribute('scope', 'col');
        if (!cell.textContent.trim()) {
          const label = document.createElement('span');
          label.className = 'sr-only';
          label.textContent = 'Company record';
          cell.append(label);
        }
      });
      const headers = [...table.querySelectorAll('thead td, thead th')].map(cell => cell.textContent.trim());
      table.querySelectorAll('tr[id^="company-row-"]').forEach(row => {
        const name = decodeURIComponent(row.id.replace('company-row-', ''));
        const cells = [...row.children];
        const cell = cells[cells.length - 1];
        let toggle = cell.querySelector('.demo-row-toggle');
        if (!toggle) {
          toggle = document.createElement('button');
          toggle.type = 'button';
          toggle.className = 'demo-row-toggle';
          toggle.textContent = '↕';
          toggle.addEventListener('click', event => { event.stopPropagation(); row.click(); });
          cell.append(toggle);
        }
        const expanded = !!row.nextElementSibling?.querySelector('td[colspan]');
        toggle.setAttribute('aria-label', `${expanded ? 'Collapse' : 'Expand'} ${name} company record`);
        toggle.setAttribute('aria-expanded', String(expanded));
        cells.forEach((td, index) => td.querySelectorAll('button[data-testid="fact-chip-value"]').forEach(button => {
          button.setAttribute('aria-label', `${name}, ${headers[index] || 'figure'}: ${button.textContent.trim()}. View source.`);
        }));
      });
    });
    // Some exported application panels render through a portal outside #root.
    observer.observe(document.body, {childList: true, subtree: true});
  }
  enhance();
})();
