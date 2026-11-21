/* Shared browser/Node enquiry contract. No upload, storage or network request.
 * A prepared request becomes an email addressed to the site's existing contact
 * address (info@medici.ai, the destination of every other site contact link).
 * The visitor's own email client sends it; the Group delivers it to sales. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CosimoBuyerIntake = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const FIELDS = ['name', 'company', 'email', 'problem', 'output', 'period', 'decision', 'reviewer', 'owner'];
  const LONG = ['problem', 'output', 'decision'];
  const LABELS = {name: 'Name', company: 'Company', email: 'Email', problem: 'Process or problem', output: 'Output needed',
    period: 'Reporting period', decision: 'Decision this supports', reviewer: 'Person reviewing the result', owner: 'Workflow owner'};
  const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  // Destination and ownership match the existing site contact links and the
  // historical shared-inbox routing recorded in outreach-engine/src/sales-handoff-report.cjs.
  const SALES = Object.freeze({destination: 'info@medici.ai', owner: 'Eliot Puplett', backupOwner: 'Aamina Bawany'});
  const TOOLS = Object.freeze(['reverse-demo', 'spot-the-error', 'article']);
  // Long answers are capped so the whole email fits in a mailto/Gmail compose URL.
  const LIMITS = {long: 800, short: 200};
  function text(value, key, max) {
    if (typeof value !== 'string' || !value.trim() || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw Error('Provide a valid ' + key + ' (up to ' + max + ' characters).');
    return value.trim();
  }
  function context(input) {
    const page = text(input?.page, 'page', 200);
    if (!/^\/[a-z0-9\-/]*$/.test(page)) throw Error('Invalid page path.');
    if (!TOOLS.includes(input?.tool)) throw Error('Unknown tool.');
    return {page, tool: input.tool};
  }
  function requestId(now, random) {
    const stamp = now.toISOString().replace(/[-:]/g, '').slice(0, 15);
    return 'web-' + stamp + '-' + random.toString(36).padStart(6, '0').slice(-6);
  }
  function prepare(input, attribution, now, pageContext, random) {
    if (!input || Array.isArray(input) || Object.keys(input).some(k => !FIELDS.includes(k))) throw Error('Only request details are accepted; files and approval overrides are not supported.');
    const details = Object.fromEntries(FIELDS.map(k => [k, text(input[k], k, LONG.includes(k) ? LIMITS.long : LIMITS.short)]));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) throw Error('Provide a valid email address.');
    const source = {};
    for (const key of UTM) if (attribution?.[key]) source[key] = text(attribution[key], key, 150);
    const date = new Date(now || Date.now());
    if (!Number.isFinite(date.getTime())) throw Error('Invalid preparation date.');
    const where = context(pageContext || {page: '/reverse-demo/', tool: 'reverse-demo'});
    const id = requestId(date, Number.isInteger(random) ? random : Math.floor(Math.random() * 2176782336));
    return {schemaVersion: 2, kind: 'reverse_demo_request', status: 'ready_for_visitor_email', requestId: id, preparedAt: date.toISOString(), details,
      attribution: {status: Object.keys(source).length === 4 ? 'supplied_unverified' : 'incomplete_or_direct', page: where.page, tool: where.tool, ...source},
      routing: {destination: SALES.destination, salesOwner: SALES.owner, backupOwner: SALES.backupOwner},
      handoff: {policy: 'EXE-68', securityEvidence: 'EXE-86', commercialExceptions: 'EXE-85',
        requirements: ['Executed evaluation-purpose NDA', 'Permitted data and processing scope', 'Agreed storage, access, retention and deletion method', 'Technical feasibility and time/cost cap', 'Agreed delivery target and second review'],
        customerFileIntakeEnabled: false, approvalsVerified: false, deliveryCommittedAt: null, retentionDays: null}};
  }
  // The attribution block uses fixed "key: value" lines so the CRM/traffic
  // adapters can parse a received message without reading the visitor's prose.
  function enquiry(prepared) {
    if (!prepared || prepared.status !== 'ready_for_visitor_email') throw Error('Prepare the request first.');
    const d = prepared.details, a = prepared.attribution, r = prepared.routing;
    const subject = 'Workflow request: ' + d.company + ' [' + a.tool + ' ' + prepared.requestId + ']';
    const lines = ['Hello Cosimo team,', '', ...FIELDS.map(k => LABELS[k] + ': ' + d[k]), '',
      'No files are attached. Before any data run, we agree the NDA, data scope, access, retention, time and cost.', '',
      '--- Attribution (please keep) ---', 'request_id: ' + prepared.requestId, 'page: ' + a.page, 'tool: ' + a.tool,
      ...UTM.map(k => k + ': ' + (a[k] || 'none')), 'sales_owner: ' + r.salesOwner, 'backup_owner: ' + r.backupOwner, 'prepared_at: ' + prepared.preparedAt];
    const body = lines.join('\n');
    const mailto = 'mailto:' + r.destination + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(r.destination) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    return {to: r.destination, subject, body, mailto, gmail};
  }
  // Parses the attribution block of a received enquiry for CRM reconciliation.
  function parseAttribution(body) {
    const start = String(body).indexOf('--- Attribution (please keep) ---');
    if (start < 0) return null;
    const out = {};
    for (const line of String(body).slice(start).split(/\r?\n/).slice(1)) {
      const m = line.match(/^([a-z_]+): (.*)$/);
      if (m) out[m[1]] = m[2] === 'none' ? null : m[2];
    }
    return out.request_id ? out : null;
  }
  function fromSearch(search) {
    const params = new URLSearchParams(search), result = {};
    for (const key of UTM) { if (params.getAll(key).length > 1) throw Error('Duplicate attribution parameter: ' + key); if (params.has(key)) result[key] = params.get(key); }
    return result;
  }
  return {FIELDS, UTM, SALES, LIMITS, prepare, enquiry, parseAttribution, fromSearch};
});
