#!/usr/bin/env node
'use strict';
// Isolated local UI verification. Does not exercise a backend or customer workflow.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {chromium}=createRequire(path.resolve(__dirname,'../../cosimo/frontend/package.json'))('@playwright/test');
const origin=new URL(process.argv[2] || 'http://127.0.0.1:8774');
if(origin.protocol!=='http:' || origin.hostname!=='127.0.0.1' || origin.username || origin.password)throw Error('Only a loopback preview is supported.');
const out=path.join(os.homedir(),'Library/Application Support/cosimo-content/buyer-tools');
async function main(){
  fs.mkdirSync(out,{recursive:true,mode:0o700});
  const browser=await chromium.launch({headless:true}),checks=[],errors=[];
  try{
    for(const width of [1440,390])for(const theme of ['light','dark']){
      const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'}),requests=[],bad=[];
      page.on('request',r=>requests.push({method:r.method(),url:r.url()}));
      page.on('response',r=>{if(r.status()>=400)bad.push(r.url());});page.on('pageerror',e=>errors.push(e.message));
      await page.goto(new URL('/spot-the-error/',origin).href);
      await page.evaluate(t=>{document.documentElement.dataset.theme=t;document.documentElement.dataset.a11yMotion='reduce';},theme);
      assert.equal(await page.locator('.spot-statement tbody tr').count(),16);
      assert((await page.locator('.spot-statement').innerText()).includes('5,480,000.00'));
      await page.locator('#field').selectOption('ending_capital');await page.locator('#amount').fill('5480000.00');
      await page.getByRole('button',{name:'Check answer',exact:true}).click();assert((await page.locator('#spot-error-feedback').innerText()).includes('does not match'));
      await page.locator('#amount').fill('5470000.00');await page.getByRole('button',{name:'Check answer',exact:true}).click();
      assert((await page.locator('#spot-error-feedback').innerText()).startsWith('Correct.'));
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert.equal(await page.locator('.theme-toggle').evaluate(e=>getComputedStyle(e).position),'static');
      await page.evaluate(()=>{document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'});});
      await page.screenshot({path:path.join(out,`spot-${width}-${theme}.png`),fullPage:true});
      await page.getByRole('link',{name:'Prepare a workflow request',exact:true}).click();
      const input={name:'Technical Fixture',company:'Fictional Fund',email:'fixture@example.invalid',problem:'Reconcile a fictional close',output:'Source-linked comparison',period:'2026 Q3',decision:'Which differences require review?',reviewer:'Fictional controller',owner:'Fictional operations lead'};
      for(const [name,value]of Object.entries(input))await page.locator('#'+name).fill(value);
      await page.getByRole('button',{name:'Prepare request',exact:true}).click();
      const data=JSON.parse(await page.locator('#request-result').innerText());
      assert.deepEqual(data.details,input);assert.equal(data.attribution.utm_content,'capital-rollforward-fixture-v1');
      assert.equal(data.handoff.customerFileIntakeEnabled,false);assert.equal(data.handoff.retentionDays,null);
      const downloading=page.waitForEvent('download');await page.locator('#download-request').click();
      const download=await downloading,saved=path.join(out,`latest-download-${width}-${theme}.json`);await download.saveAs(saved);fs.chmodSync(saved,0o600);
      assert.deepEqual(JSON.parse(fs.readFileSync(saved,'utf8')),data);
      await page.locator('#owner').fill('Changed fictional owner');assert(!(await page.locator('#download-request').isVisible()));
      await page.evaluate(t=>{document.documentElement.dataset.theme=t;document.activeElement.blur();window.scrollTo({top:0,behavior:'instant'});},theme);
      await page.screenshot({path:path.join(out,`intake-final-${width}-${theme}.png`),fullPage:true});
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.equal(bad.length,0);
      assert(requests.every(r=>r.method==='GET' && new URL(r.url).origin===origin.origin));
      checks.push({width,theme,statementRows:16,correctAndWrongAnswers:true,trackedSourceCarriedIntoRequest:true,downloadRoundtrip:true,changedFieldInvalidatesDownload:true,noHorizontalOverflow:true,themeControlDoesNotOverlayStatement:true,noExternalOrWriteRequests:true,missingAssets:bad});
      await page.close();
    }
    assert.equal(errors.length,0);
    fs.writeFileSync(path.join(out,'browser-verification.json'),JSON.stringify({kind:'isolated_local_component_verification',observedAt:new Date().toISOString(),origin:origin.origin,checks,pageErrors:errors,noBackendOrE2ERun:true},null,2),{mode:0o600});
    for(const name of fs.readdirSync(out))if(name.endsWith('.png'))fs.chmodSync(path.join(out,name),0o600);
    console.log(JSON.stringify({checks:checks.length,status:'passed',report:path.join(out,'browser-verification.json')}));
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error.stack);process.exitCode=1;});
