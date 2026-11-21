#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const origin='https://cosimo.work';
async function main(){
 const key=fs.readFileSync(path.join(__dirname,'../content/indexnow-key.txt'),'utf8').trim();
 const keyResponse=await fetch(origin+'/'+key+'.txt',{signal:AbortSignal.timeout(20000)});
 if(!keyResponse.ok||(await keyResponse.text()).trim()!==key)throw Error('Public ownership file is not deployed; no submission made.');
 const response=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('Live sitemap unavailable');
 const urls=[...new Set([...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]))];
 if(!urls.length||urls.some(u=>new URL(u).origin!==origin))throw Error('Invalid sitemap URLs');
 // Only URLs that exist in the deployed sitemap are submitted.
 const result=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({host:'cosimo.work',key,keyLocation:origin+'/'+key+'.txt',urlList:urls}),signal:AbortSignal.timeout(30000)});
 if(![200,202].includes(result.status))throw Error('IndexNow HTTP '+result.status);
 console.log(JSON.stringify({submittedAt:new Date().toISOString(),status:result.status,urls:urls.length,note:'Submission received; this does not confirm indexing or recommendation.'}));
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
