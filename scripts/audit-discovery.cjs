#!/usr/bin/env node
'use strict';
// Checks the real HTTP service and fails closed on inaccessible or incorrect pages.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const origin=process.env.SITE_URL||'https://cosimo.work';
const canonical='https://cosimo.work';
const get=async(route,headers={})=>{const response=await fetch(new URL(route,origin),{headers,signal:AbortSignal.timeout(20000)});assert.equal(response.status,200,route+' HTTP status');return response;};
const text=async(route,headers)=>(await get(route,headers)).text();
async function main(){
 const manifest=JSON.parse(await text('/discovery-manifest.json'));
 assert.equal(manifest.pages.length,13,'Expected discovery page count');
 const sitemap=await text('/sitemap.xml');
 const assets=new Set();let links=0;
 for(const page of manifest.pages){
  const route=new URL(page.url).pathname,html=await text(route);
  assert.match(html,/<html lang="en"/);assert.equal((html.match(/<h1\b/g)||[]).length,1,route+' needs one h1');
  assert.ok(html.includes(`<link rel="canonical" href="${page.url}">`),route+' canonical');
  assert.ok(sitemap.includes('<loc>'+page.url+'</loc>'),route+' absent from sitemap');
  assert.ok(html.includes(page.title.replaceAll('&','&amp;').replaceAll('"','&quot;')),route+' title missing');
  assert.doesNotMatch(html,/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/);
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
  assert.ok(schemas.some(s=>s['@graph']?.some(x=>x['@id']===canonical+'/#product')),route+' product identity');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,route+' duplicate ids');
  for(const m of html.matchAll(/<(script|link|img)\b[^>]*\b(?:href|src)="([^"]+)"/g)){
   if(/rel="canonical"/.test(m[0]))continue;const u=new URL(m[2],origin+route);assert.equal(u.origin,new URL(origin).origin,'external asset');assets.add(u.pathname);
  }
  for(const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)){
   const href=m[1].replaceAll('&amp;','&');if(href.startsWith('#')){assert.ok(ids.includes(href.slice(1)),route+' missing anchor '+href);continue;}
   if(!href.startsWith('/'))continue;const u=new URL(href,origin);const linked=await get(u.pathname);if(u.hash){const target=await linked.text();assert.ok(target.includes(`id="${u.hash.slice(1)}"`),href+' anchor');}links++;
  }
  console.log('PASS '+route);
 }
 for(const asset of assets){const r=await get(asset);assert.doesNotMatch(r.headers.get('content-type')||'',/text\/html/,'HTML fallback '+asset);}
 const robots=await text('/robots.txt');
 for(const bot of ['OAI-SearchBot','PerplexityBot','Claude-SearchBot','Claude-User','Google-Extended'])assert.ok(robots.includes('User-agent: '+bot+'\nAllow: /'),bot+' not allowed');
 for(const bot of ['OAI-SearchBot','PerplexityBot','Claude-SearchBot']){
  const html=await text('/guides/investor-reporting/',{'User-Agent':bot});assert.match(html,/Investor reporting automation for funds/);
 }
 const fund=JSON.parse(await text('/resources/fund-reporting-example.json'));
 assert.equal(fund.fictional,true);assert.equal(fund.companies.reduce((n,r)=>n+r[1],0),70);assert.equal(fund.companies.reduce((n,r)=>n+r[2],0),72);
 assert.equal(Math.round(fund.companies.reduce((n,r)=>n+r[3],0)*10),96);
 const bank=JSON.parse(await text('/resources/loan-reconciliation-example.json'));
 assert.equal(bank.fictional,true);const movement=bank.activity.reduce((n,r)=>n+(r[4]==='Advance'?r[5]:-r[5]),0);assert.equal(bank.opening+movement,15250000);assert.equal(bank.controlClosing-bank.opening-movement,100000);
 assert.match(await text('/resources/evaluation-checklist.txt'),/Repeatability/);
 const key=fs.readFileSync(path.join(__dirname,'../content/indexnow-key.txt'),'utf8').trim();assert.equal((await text('/'+key+'.txt')).trim(),key);
 const report={checkedAt:new Date().toISOString(),origin,pages:manifest.pages.length,assets:assets.size,links,status:'passed',limits:'HTTP and content checks; no claim of visual, native assistant or index coverage verification.'};
 const out=process.env.AUDIT_OUT;if(out){fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(report,null,2)+'\n');}
 console.log(JSON.stringify(report));
}
main().catch(e=>{console.error('FAIL: '+e.message);process.exitCode=1;});
