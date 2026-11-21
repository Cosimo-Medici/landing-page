'use strict';
// Real local media/HTTP/browser component checks, not an application workflow run.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {createRequire}=require('node:module');
const {digest}=require('../../cosimo-content-engine/content-engine/lib/media-package.cjs');
const {build}=require('./build-case-library.cjs');
async function main(){
 const[requestFile,origin='http://127.0.0.1:3011']=process.argv.slice(2);assert(requestFile,'Request required');
 assert(new URL(origin).hostname==='127.0.0.1','Loopback only');
 const root=path.resolve(__dirname,'..'),out=path.join(root,'dist-case-preview'),manifest=JSON.parse(fs.readFileSync(path.join(out,'case-library-manifest.json')));
 const evidence=path.join(os.homedir(),'Library/Application Support/cosimo-content/case-library/verification');fs.mkdirSync(evidence,{recursive:true,mode:0o700});
 const hashTree=async(dir,prefix='')=>{const files=[];for(const e of fs.readdirSync(path.join(dir,prefix),{withFileTypes:true})){const rel=path.join(prefix,e.name);if(e.isDirectory())files.push(...await hashTree(dir,rel));else files.push({file:rel,sha256:await digest(path.join(dir,rel))});}return files.sort((a,b)=>a.file.localeCompare(b.file));};
 const productionBefore=await hashTree(path.join(root,'dist'));
 assert(!productionBefore.some(x=>x.file.startsWith('case-files/')),'Production library unexpectedly present');
 const index=await fetch(origin+'/case-files/');assert.equal(index.status,200);assert((await index.text()).includes('noindex,nofollow,noarchive'));
 assert.equal(await fetch(origin+'/robots.txt').then(r=>r.text()),'User-agent: *\nDisallow: /\n');
 let downloads=0;
 for(const episode of manifest.episodes){
   const html=await fetch(origin+episode.route).then(r=>r.text());assert(html.includes(episode.sourceId)===false,'Internal source ID is not presentation copy');assert(html.includes('Fictional'));
   for(const item of episode.outputs){const response=await fetch(origin+episode.route+item.name);assert.equal(response.status,200);const bytes=Buffer.from(await response.arrayBuffer());assert.equal(require('node:crypto').createHash('sha256').update(bytes).digest('hex'),item.sha256);downloads++;}
 }
 const{chromium}=createRequire('/Users/eliotpuplett/Documents/Cosimo/cosimo/frontend/package.json')('@playwright/test');
 const browser=await chromium.launch({headless:true});let browserChecks=0;const errors=[],external=[];
 try{for(const width of[1280,390])for(const theme of['light','dark']){
   const context=await browser.newContext({viewport:{width,height:900}});await context.addInitScript(t=>localStorage.setItem('theme',t),theme);
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.route('**/*',route=>{const url=new URL(route.request().url());if(!['127.0.0.1','localhost'].includes(url.hostname)){external.push(url.origin);return route.abort();}return route.continue();});
   await page.goto(origin+'/case-files/');await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   assert.equal(await page.locator('.case-grid article').count(),2);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
   await page.screenshot({path:path.join(evidence,`index-${width}-${theme}.png`),fullPage:true});
   await page.goto(origin+manifest.episodes[0].route);await page.evaluate(t=>document.documentElement.dataset.theme=t,theme);
   await page.waitForFunction(()=>document.querySelector('video').readyState>=1);
   const media=await page.evaluate(async()=>{const v=document.querySelector('video');v.muted=true;await v.play();await new Promise(r=>setTimeout(r,1200));v.pause();return{time:v.currentTime,duration:v.duration,width:v.videoWidth,tracks:v.textTracks.length};});
   assert(media.time>.5&&media.width===1920&&Math.abs(media.duration-166.5)<.1&&media.tracks===1,'Actual video playback failed');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(evidence,`episode-${width}-${theme}.png`),fullPage:true});
   browserChecks++;await context.close();
 }}finally{await browser.close();}
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);
 const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'cosimo-library-check-'));
 const request=JSON.parse(fs.readFileSync(requestFile));const rejected=[];
 try{
  const attempt=async(name,data,pattern)=>{const file=path.join(temporary,name+'.json');fs.writeFileSync(file,JSON.stringify(data));await assert.rejects(build(file,out),pattern);rejected.push(name);};
  await attempt('duplicate-episode',{...request,episodes:[request.episodes[0],request.episodes[0]]},/Duplicate/);
  await attempt('mismatched-clip',{...request,episodes:[{...request.episodes[0],clips:request.episodes[1].clips}]},/another package/);
  await assert.rejects(build(requestFile,out),/EEXIST/);rejected.push('overwrite');
 }finally{fs.rmSync(temporary,{recursive:true,force:true});}
 assert.deepEqual(await hashTree(path.join(root,'dist')),productionBefore);
 const result={schemaVersion:1,checkedAt:new Date().toISOString(),status:'verified_local_library',episodes:manifest.episodes.length,clips:manifest.episodes.reduce((n,e)=>n+e.clips.length,0),hashVerifiedHttpDownloads:downloads,browserConfigurationsPassed:browserChecks,playback:'1.2 seconds per configuration; not full film/editorial/audio review',rejected,unchangedProductionFiles:productionBefore.length,publications:0,externalRequests:external.length};
 fs.writeFileSync(path.join(evidence,'latest.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});
