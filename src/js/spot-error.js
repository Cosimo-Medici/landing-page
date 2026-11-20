(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.CosimoSpotError = api; document.addEventListener('DOMContentLoaded', () => api.mount(document)); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const cents = value => {
    if (typeof value !== 'string' || !/^-?\d{1,18}(?:\.\d{1,2})?$/.test(value)) throw Error('Enter an amount with no commas and at most two decimal places.');
    const negative = value.startsWith('-'), [whole, fraction = ''] = value.replace(/^-/, '').split('.');
    return (BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'))) * (negative ? -1n : 1n);
  };
  function validate(challenge) {
    if (challenge?.schemaVersion !== 1 || challenge.kind !== 'fictional_technical_exercise' || challenge.status !== 'local_preview_only' || !Array.isArray(challenge.rows) || challenge.rows.length < 2 || challenge.rows.length > 50) throw Error('Invalid fictional challenge.');
    const ids = new Set(), changed = [];
    for (const row of challenge.rows) {
      if (!row.field || ids.has(row.field) || typeof row.label !== 'string') throw Error('Duplicate or missing statement field.');
      ids.add(row.field); if (cents(row.amount) !== cents(row.expectedAmount)) changed.push(row);
    }
    if (changed.length !== 1 || changed[0].field !== challenge.answer?.field || cents(changed[0].expectedAmount) !== cents(challenge.answer?.amount)) throw Error('Challenge must contain exactly one verified difference.');
    if (challenge.measurement?.solveRate !== null || challenge.measurement?.submissions !== null || challenge.measurement?.publicMonthStartedAt !== null) throw Error('A local exercise cannot claim public measurements.');
    return challenge;
  }
  function check(challenge, field, amount) {
    validate(challenge);
    if (!challenge.rows.some(row => row.field === field)) throw Error('Choose a statement line.');
    const correct = field === challenge.answer.field && cents(amount) === cents(challenge.answer.amount);
    return {correct, status:'local_practice_not_submitted', explanation:correct ? challenge.answer.explanation : 'That does not match the planted error. Recheck the activity and balances.', solveRate:null};
  }
  function mount(doc) {
    const data = doc.querySelector('#spot-error-data'); if (!data) return;
    const challenge = validate(JSON.parse(data.textContent)), form = doc.querySelector('#spot-error-answer'), feedback = doc.querySelector('#spot-error-feedback');
    form.addEventListener('submit', event => {event.preventDefault();try {const result = check(challenge, form.elements.field.value, form.elements.amount.value);feedback.textContent=(result.correct?'Correct. ':'')+result.explanation+' Your answer stays in this browser.';} catch (error) {feedback.textContent=error.message;}});
  }
  return {validate, check, mount};
});
