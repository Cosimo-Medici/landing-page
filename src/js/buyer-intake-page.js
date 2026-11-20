'use strict';
(() => {
  const form = document.querySelector('#buyer-intake'), result = document.querySelector('#request-result'), download = document.querySelector('#download-request');
  let prepared = null;
  form.addEventListener('input', () => { prepared = null; download.hidden = true; result.textContent = 'Request changed. Prepare it again to update the handoff.'; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    try {
      prepared = CosimoBuyerIntake.prepare(Object.fromEntries(new FormData(form)), CosimoBuyerIntake.fromSearch(location.search));
      result.textContent = JSON.stringify(prepared, null, 2); download.hidden = false;
    } catch (error) { prepared = null; download.hidden = true; result.textContent = error.message; }
  });
  download.addEventListener('click', () => {
    if (!prepared) return;
    const url = URL.createObjectURL(new Blob([JSON.stringify(prepared, null, 2)], {type: 'application/json'}));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'cosimo-workflow-request.json'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
})();
