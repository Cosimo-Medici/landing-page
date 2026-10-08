#!/usr/bin/env node
// Check the actual authored records and generated report HTML, without a browser,
// network stubs, or a duplicate dataset. Browser QA separately checks their UI.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
let checks = 0;
function equal(actual, expected, label, tolerance = 1e-7) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual} != ${expected}`);
  checks++;
}
function ok(value, label) { assert.ok(value, label); checks++; }
const sum = (rows, key) => rows.reduce((n, row) => n + row[key], 0);
function records(sector, fields) {
  const text = fs.readFileSync(path.join(root, `src/js/${sector}-report.js`), 'utf8');
  const start = text.indexOf('  const motion');
  const end = text.indexOf('  const sourceCard');
  ok(start >= 0 && end > start, `${sector}: data/render boundary`);
  const pure = text.slice(start, end).replace(/  const motion = [^\n]+\n/, '');
  const result = vm.runInNewContext(`(() => { ${pure}\n return {pages,sources,${fields}}; })()`, {}, {timeout: 1000});
  equal(result.pages.length, 6, `${sector}: six report pages`);
  for (const [i, page] of result.pages.entries()) {
    ok(!/undefined|NaN|Infinity/.test(page.body), `${sector}: page ${i + 1} has valid values`);
    ok(/\d/.test(page.body), `${sector}: page ${i + 1} has concrete data`);
  }
  for (const record of [...result.pages, ...result.sources]) {
    for (const citation of (record.body || record.html).matchAll(/data-source="(\d+)"/g)) {
      ok(!!result.sources[Number(citation[1])], `${sector}: citation ${citation[1]} exists`);
    }
  }
  return result;
}
const re = records('re', 'properties,investors,totals,capital');
const vc = records('vc', 'companies,investors,capital');
const pe = records('pe', 'companies,investors,totals,capital');
const credit = records('credit', 'loans,principalMovements,coverageRows,pittiRequiredAdjustment');
const hedge = records('hedge', 'returns,classNAV,sectors,flows,cash,netResult,openingNAV,closingNAV');
for (const [name, data] of [['re',re], ['vc',vc], ['pe',pe]]) {
  for (const row of data.investors) equal(row.opening + row.calls - row.distributions, row.recordedClosing, `${name}: ${row.name} capital movement`);
  for (const key of ['opening','calls','distributions','closing']) equal(sum(data.investors,key), data.capital[key], `${name}: capital ${key}`);
}
for (const p of re.properties) {
  equal(p.revenue - p.expenses, p.noi, `${p.name}: NOI`);
  ok(p.occupied >= 0 && p.occupied <= p.units, `${p.name}: occupancy bounds`);
}
for (const key of ['units','occupied','revenue','expenses','noi','priorNOI']) equal(sum(re.properties,key),re.totals[key],`RE: ${key} total`);
equal(re.totals.occupied / re.totals.units * 100, 94.2, 'RE: weighted occupancy');
equal(re.totals.noi, 2360000, 'RE: report NOI');
equal(re.totals.noi - re.totals.priorNOI, 80000, 'RE: quarter NOI movement');
for (const c of vc.companies) equal(c.cash / c.burn,c.runway,`${c.name}: runway`);
equal(vc.companies.filter(c=>c.current).length,5,'VC: current submissions');
for (const c of pe.companies) equal(c.ebitda - c.ebitdaBudget,c.variance,`${c.name}: EBITDA variance`);
for (const key of ['revenue','revenueBudget','ebitda','ebitdaBudget','variance']) equal(sum(pe.companies,key),pe.totals[key],`PE: ${key} total`);
equal(pe.totals.revenue,70000000,'PE: reported revenue');
equal(pe.totals.ebitda,9600000,'PE: reported EBITDA');
equal(pe.totals.variance,-800000,'PE: budget shortfall');
for (const [i,c] of credit.loans.entries()) {
  equal(c.netDebt / c.ebitda,c.leverage,`${c.name}: leverage`);
  const [opening,advances,repayments] = credit.principalMovements[i];
  equal(opening+advances-repayments,c.principal,`${c.name}: principal movement`);
}
equal(sum(credit.loans,'principal'),100000000,'Credit: principal');
equal(sum(credit.loans,'cash'),2750000,'Credit: cash interest');
equal(sum(credit.loans,'pik'),150000,'Credit: PIK');
equal(credit.pittiRequiredAdjustment,600000,'Credit: threshold adjustment');
for (const row of credit.coverageRows) equal(Number(row[1])-Number(row[2]),Number(row[3]),`Credit: ${row[0]} coverage`);
for (const [i,row] of hedge.returns.entries()) equal(hedge.classNAV[i]*(1+row[1]/100),hedge.classNAV[i+1],`Hedge: ${row[0]} NAV/unit`,0.00005);
equal(sum(hedge.sectors,1),90,'Hedge: long exposure');
equal(sum(hedge.sectors,2),40,'Hedge: short exposure');
equal(hedge.openingNAV + sum(hedge.flows.filter(r=>r[1]==='Subscription'),2)-sum(hedge.flows.filter(r=>r[1]==='Redemption'),2)+sum(hedge.netResult,1),hedge.closingNAV,'Hedge: NAV bridge');
equal(hedge.cash[1][2]-hedge.cash[1][1],125000,'Hedge: deliberately open cash difference');
const home = JSON.parse(fs.readFileSync(path.join(root,'product-demo/signet-equity.json'),'utf8'));
const homeScript = fs.readFileSync(path.join(root,'src/js/home.js'),'utf8');
const homeReportRows = JSON.parse(homeScript.match(/const companies = (\[[^\n]+\]);/)[1]);
equal(home.companies.length,pe.companies.length,'Home/PE: same company coverage');
for (const c of home.companies) {
  const other = pe.companies.find(row=>row.name===c.name);
  const reportRow = homeReportRows.find(row=>row.name===c.name);
  ok(other, `Home/PE: ${c.name} exists in both`);
  ok(reportRow, `Home report: ${c.name} exists`);
  for (const key of ['revenue','revenueBudget','ebitda','ebitdaBudget']) {
    equal(c.quarterly[key]*1e6,other[key],`Home/PE: ${c.name} ${key}`);
    equal(c.quarterly[key],reportRow[key],`Home dashboard/report: ${c.name} ${key}`);
  }
  equal(c.quarterlyEbitdaHistory.reduce((n,v)=>n+v,0),c.kpi.ebitda.n,`${c.name}: LTM EBITDA history`);
  equal(c.kpi.ebitda.n/c.kpi.revenue.n,c.kpi.margin,`${c.name}: LTM margin`);
  equal(c.kpi.ebitda.n/c.ltmEbitdaBudget-1,c.kpi.vsBud.n,`${c.name}: LTM variance`);
  equal(c.debt.balance.n/c.kpi.ebitda.n,c.debt.leverage.n,`${c.name}: net leverage`);
  equal(c.debt.covenant.max-c.debt.leverage.n,c.debt.covenant.headroom.n,`${c.name}: headroom`);
  equal((c.enterpriseValue-c.debt.balance.n)*c.own,c.val.fairValue.n,`${c.name}: equity value`);
  equal(c.val.fairValue.n/c.entry.equityM,c.val.moic.n,`${c.name}: MOIC`);
  equal(c.val.fairValue.n/home.fund.nav.n,c.val.pctNav,`${c.name}: NAV share`);
  equal(c.kpi.hist.length,6,`${c.name}: six monthly observations`);
  equal(c.kpi.hist.slice(3).reduce((n,v)=>n+v,0),c.quarterly.ebitda,`${c.name}: last three months match Q3`);
  for (const field of [c.debt.lender,c.debt.facility,c.debt.rate,c.debt.maturity,c.board.next,c.board.seat,c.board.lastPack,c.exit.stage,c.exit.advisor,c.exit.dates]) ok(!!field,`${c.name}: populated record field`);
}
equal(home.companies.reduce((n,c)=>n+c.val.fairValue.n,0)+home.fund.cash.n-home.fund.accrued.n,home.fund.nav.n,'Home: fund NAV bridge');
console.log(`Demo data audit passed: ${checks} arithmetic, content, and source checks across 30 report pages.`);
