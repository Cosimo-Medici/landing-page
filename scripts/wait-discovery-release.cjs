#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),path=require('node:path');
const expected=JSON.parse(fs.readFileSync(path.join(__dirname,'../dist/discovery-manifest.json'),'utf8')).releaseHash;
if(!/^[a-f0-9]{64}$/.test(expected))throw Error('Build the expected release before checking deployment.');
async function main(){
 for(let attempt=1;attempt<=40;attempt++){
  try{
   const response=await fetch('https://cosimo.work/discovery-manifest.json?release='+expected,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(10000)});
   if(response.ok&&(await response.json()).releaseHash===expected){console.log('The expected discovery release is live: '+expected);return;}
  }catch(error){console.log('Deployment check '+attempt+': '+error.message);}
  if(attempt<40)await new Promise(resolve=>setTimeout(resolve,15000));
 }
 throw Error('Expected release did not arrive. No IndexNow submission was made. Inspect the production deployment.');
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
