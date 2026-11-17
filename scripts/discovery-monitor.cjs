#!/usr/bin/env node
'use strict';
// Retrieval monitoring is distinct from native assistant recommendation testing.
// Only public buyer questions are sent to Tavily. Secrets never enter reports.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const catalogue=require('../content/discovery-prompts.json');
function arg(name,fallback){const i=process.argv.indexOf('--'+name);return i<0?fallback:process.argv[i+1];}
const out=path.resolve(arg('out','reports/discovery'));
const limit=Number(arg('limit',catalogue.prompts.length));
const repeat=Number(arg('repeat',1));
if(!Number.isInteger(limit)||limit<1||limit>30||!Number.isInteger(repeat)||repeat<1||repeat>3)throw Error('Use --limit 1..30 and --repeat 1..3');
const key=process.env.TAVILY_API_KEY;
if(!key){console.error('TAVILY_API_KEY is required. No retrieval measurement was made.');process.exit(2);}
const hostname=url=>{try{return new URL(url).hostname.toLowerCase().replace(/^www\./,'');}catch{return '';}};
const isCosimo=url=>hostname(url)==='cosimo.work';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const safeLink=url=>{try{const u=new URL(url);return /^https?:$/.test(u.protocol)?escape(u.href):'#';}catch{return '#';}};
async function main(){
 fs.mkdirSync(out,{recursive:true});
 const started=new Date().toISOString(),stamp=started.replace(/[:.]/g,'-');
 const file=path.join(out,'retrieval-'+stamp+'.json');
 const records=[];
 const prompts=catalogue.prompts.slice(0,limit);
 const meta={kind:'web-retrieval-monitor',provider:'tavily-search',nativeAssistantRanking:false,started,catalogueVersion:catalogue.version,catalogueHash:crypto.createHash('sha256').update(JSON.stringify(catalogue)).digest('hex'),settings:{search_depth:'basic',max_results:10,include_answer:'basic',repeat,limit},records};
 measurement: for(let pass=1;pass<=repeat;pass++)for(const prompt of prompts){
  const record={...prompt,pass,observedAt:new Date().toISOString()};
  try{
   const response=await fetch('https://api.tavily.com/search',{method:'POST',headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify({query:prompt.prompt,search_depth:'basic',max_results:10,include_answer:'basic',include_raw_content:false,include_usage:true,auto_parameters:false}),signal:AbortSignal.timeout(45000)});
   if(!response.ok)throw Error('Tavily HTTP '+response.status);
   const data=await response.json();
   if(!Array.isArray(data.results))throw Error('Tavily returned no results array');
   record.status='ok';record.requestId=data.request_id;record.usage=data.usage||null;
   record.answer=data.answer||'';
   record.results=data.results.map((r,i)=>({rank:i+1,url:r.url,title:r.title,content:r.content,score:r.score}));
   record.ownedResultRanks=record.results.filter(r=>isCosimo(r.url)).map(r=>r.rank);
   record.answerMentionsName=/\bcosimo\b/i.test(record.answer);
   // Name collisions are common. Never certify identity or recommendation from a substring.
   record.answerHasCanonicalDomain=/\bcosimo\.work\b/i.test(record.answer);
   record.recommendationReview='unreviewed';
  }catch(error){record.status='error';record.error=error.message;}
  records.push(record);
  fs.writeFileSync(file,JSON.stringify(meta,null,2)+'\n');
  console.log(prompt.id+' pass '+pass+': '+record.status+(record.status==='ok'?' — owned ranks '+(record.ownedResultRanks.join(', ')||'absent'):''));
  if(record.status==='error'&&/HTTP (401|403|429|432|433)/.test(record.error))break measurement;
 }
 const successful=records.filter(r=>r.status==='ok');
 const summary={requested:prompts.length*repeat,completed:records.length,successful:successful.length,errors:records.filter(r=>r.status==='error').length,groups:{}};
 for(const group of ['unbranded','branded','negative-control']){
  const rows=successful.filter(r=>r.group===group);
  summary.groups[group]={observations:rows.length,ownedPageRetrieved:rows.filter(r=>r.ownedResultRanks.length).length,ownedPageFirst:rows.filter(r=>r.ownedResultRanks[0]===1).length,answerMentionsName:rows.filter(r=>r.answerMentionsName).length};
 }
 const sources=new Map();
 for(const r of successful.filter(r=>r.group==='unbranded'))for(const result of r.results){const host=hostname(result.url);if(!host||host==='cosimo.work')continue;const v=sources.get(host)||{host,appearances:0,prompts:new Set(),examples:[]};v.appearances++;v.prompts.add(r.id);if(v.examples.length<3&&!v.examples.includes(result.url))v.examples.push(result.url);sources.set(host,v);}
 const opportunities=[...sources.values()].map(x=>({...x,prompts:[...x.prompts]})).sort((a,b)=>b.prompts.length-a.prompts.length||b.appearances-a.appearances);
 meta.finished=new Date().toISOString();meta.summary=summary;meta.sourceOpportunities=opportunities;
 const previousPath=arg('previous',null);
 if(previousPath){const old=JSON.parse(fs.readFileSync(previousPath,'utf8'));meta.comparison=old.catalogueHash===meta.catalogueHash&&JSON.stringify(old.settings)===JSON.stringify(meta.settings)?{previous:old.started,groups:old.summary?.groups||{},note:'Compare completed observations by group; retrieval changes do not establish causality or native assistant preference.'}:{note:'Previous catalogue or settings differ; no like-for-like comparison.'};}
 fs.writeFileSync(file,JSON.stringify(meta,null,2)+'\n');
 fs.copyFileSync(file,path.join(out,'latest.json'));
 const comparisonText=meta.comparison ? '\n\n## Previous observation\n\n'+(meta.comparison.previous ? 'Previous run: '+meta.comparison.previous+'\n\n'+Object.entries(meta.comparison.groups).map(([g,v])=>`${g}: previously ${v.ownedPageRetrieved}/${v.observations} retrieved, ${v.ownedPageFirst}/${v.observations} first; now ${summary.groups[g].ownedPageRetrieved}/${summary.groups[g].observations} retrieved, ${summary.groups[g].ownedPageFirst}/${summary.groups[g].observations} first.`).join('\n\n')+'\n\n' : '')+meta.comparison.note+'\n' : '';
 const rows=successful.map(r=>`<tr><td>${escape(r.id)}<br>${escape(r.group)}</td><td>${escape(r.prompt)}</td><td>${r.ownedResultRanks.join(', ')||'Absent'}</td><td>${r.answerMentionsName?'Yes; identity needs review':'No'}</td></tr>`).join('');
 const html=`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Cosimo discovery monitor</title><style>body{font:16px/1.6 system-ui;max-width:1100px;margin:40px auto;padding:0 24px;color:#202020}table{border-collapse:collapse;width:100%}td,th{padding:12px;border:1px solid #ddd;text-align:left;vertical-align:top}a{color:#633b85}pre{white-space:pre-wrap}small{color:#555}</style><h1>Cosimo discovery monitor</h1><p>${escape(started)} · ${summary.successful}/${summary.requested} successful observations</p><p><strong>Web retrieval, not ChatGPT, Claude, Gemini or Perplexity recommendation rankings.</strong> A name mention does not establish the correct company or an endorsement. Branded questions and negative controls are excluded from unbranded performance.</p><pre>${escape(JSON.stringify(summary.groups,null,2))}</pre><h2>Buyer questions</h2><table><thead><tr><th>Prompt</th><th>Question</th><th>cosimo.work result ranks</th><th>Name in generated search answer</th></tr></thead><tbody>${rows}</tbody></table><h2>Sources to investigate</h2><p>These domains appeared for unbranded questions. Inspect their relevance before seeking coverage. They are candidates, not certified independent endorsements.</p><ol>${opportunities.slice(0,20).map(o=>`<li><strong>${escape(o.host)}</strong> — ${o.prompts.length} distinct questions; ${o.examples.map(u=>`<a href="${safeLink(u)}" rel="noreferrer">Inspect source</a>`).join(' · ')}</li>`).join('')}</ol><h2>Raw evidence</h2><p>Full answers, retrieved URLs, request IDs and errors are retained in the adjacent JSON report.</p></html>`;
 fs.writeFileSync(path.join(out,'latest.html'),html);
 fs.writeFileSync(path.join(out,'summary.md'),`# Cosimo retrieval monitor\n\n${started}\n\n${summary.successful}/${summary.requested} successful observations. This measures Tavily web retrieval, not native assistant recommendation rankings.\n\n| Group | Observations | cosimo.work retrieved | cosimo.work first |\n|---|---:|---:|---:|\n`+Object.entries(summary.groups).map(([g,v])=>`| ${g} | ${v.observations} | ${v.ownedPageRetrieved} | ${v.ownedPageFirst} |`).join('\n')+'\n\n## Sources to investigate\n\n'+opportunities.slice(0,15).map(o=>`- ${o.host}: ${o.prompts.length} distinct questions. ${o.examples[0]}`).join('\n')+'\n');
 console.log(JSON.stringify(summary));
 if(comparisonText)fs.appendFileSync(path.join(out,'summary.md'),comparisonText);
 if(summary.successful!==summary.requested)process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
