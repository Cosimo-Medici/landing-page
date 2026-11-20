/* Shared browser/Node preparation contract. No network, upload or persistence. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CosimoBuyerIntake = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const FIELDS = ['name', 'company', 'email', 'problem', 'output', 'period', 'decision', 'reviewer', 'owner'];
  const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  function text(value, key, max) {
    if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw Error('Provide a valid ' + key + ' (up to ' + max + ' characters).');
    return value.trim();
  }
  function prepare(input, attribution, now) {
    if (!input || Array.isArray(input) || Object.keys(input).some(k => !FIELDS.includes(k))) throw Error('Only request details are accepted; files and approval overrides are not supported.');
    const details = Object.fromEntries(FIELDS.map(k => [k, text(input[k], k, ['problem', 'output', 'decision'].includes(k) ? 2000 : 200)]));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) throw Error('Provide a valid email address.');
    const source = {};
    for (const key of UTM) if (attribution?.[key]) source[key] = text(attribution[key], key, 150);
    const date = new Date(now || Date.now());
    if (!Number.isFinite(date.getTime())) throw Error('Invalid preparation date.');
    return {schemaVersion: 1, kind: 'reverse_demo_request', status: 'local_draft_not_submitted', preparedAt: date.toISOString(), details,
      attribution: {status: Object.keys(source).length === 4 ? 'supplied_unverified' : 'incomplete_or_direct', ...source},
      handoff: {policy: 'EXE-68', securityEvidence: 'EXE-86', commercialExceptions: 'EXE-85',
        requirements: ['Executed evaluation-purpose NDA', 'Permitted data and processing scope', 'Agreed storage, access, retention and deletion method', 'Technical feasibility and time/cost cap', 'Agreed delivery target and second review'],
        customerFileIntakeEnabled: false, approvalsVerified: false, deliveryCommittedAt: null, retentionDays: null}};
  }
  function fromSearch(search) {
    const params = new URLSearchParams(search), result = {};
    for (const key of UTM) { if (params.getAll(key).length > 1) throw Error('Duplicate attribution parameter: ' + key); if (params.has(key)) result[key] = params.get(key); }
    return result;
  }
  return {FIELDS, UTM, prepare, fromSearch};
});
