'use strict';
// Opens the visitor's email client with the prepared request addressed to the
// site's existing contact address. A Gmail link and the full text remain on the
// page when no email client opens. Nothing is uploaded or stored.
(() => {
  const form = document.querySelector('#buyer-intake'), result = document.querySelector('#request-result');
  const actions = document.querySelector('#request-actions'), openMail = document.querySelector('#open-email'), gmail = document.querySelector('#open-gmail');
  const tool = form.dataset.tool || 'reverse-demo';
  form.addEventListener('input', () => { actions.hidden = true; result.textContent = 'Request changed. Select Send request again to update the email.'; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    try {
      const prepared = CosimoBuyerIntake.prepare(Object.fromEntries(new FormData(form)), CosimoBuyerIntake.fromSearch(location.search), Date.now(), {page: location.pathname, tool});
      const mail = CosimoBuyerIntake.enquiry(prepared);
      result.textContent = 'To: ' + mail.to + '\nSubject: ' + mail.subject + '\n\n' + mail.body;
      openMail.href = mail.mailto; gmail.href = mail.gmail; actions.hidden = false;
      location.href = mail.mailto;
    } catch (error) { actions.hidden = true; result.textContent = error.message; }
  });
})();
