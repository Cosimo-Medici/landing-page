#!/usr/bin/env node
'use strict';
// A private site preview over existing verified film/clip manifests. No capture,
// workflow execution, generated claims or publication is performed here.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {digest,verifyPackage}=require('../../cosimo-content-engine/content-engine/lib/media-package.cjs');
const {verifyClip}=require('../../cosimo-content-engine/content-engine/lib/media-clip.cjs');
const root=path.resolve(__dirname,'..');
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
async function build(requestFile,outDirectory){
  const requestHash=await digest(requestFile),request=read(requestFile);
  assert(request.schemaVersion===1&&Array.isArray(request.episodes)&&request.episodes.length,'Explicit episode inputs required');
  const ids=new Set(),episodes=[];
  for(const item of request.episodes){
    assert(path.isAbsolute(item.packageFile||''),'Absolute package path required');
    await verifyPackage(item.packageFile);const p=read(item.packageFile);
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.episodeId),'Unsafe episode route');
    assert(!ids.has(p.episodeId),'Duplicate episode');ids.add(p.episodeId);
    assert(p.fictional===true&&p.disclosure,'Fictional-data disclosure required');
    const clips=[],clipIds=new Set();
    for(const file of item.clips||[]){
      assert(path.isAbsolute(file),'Absolute clip path required');await verifyClip(file);const c=read(file);
      assert(c.parentEpisodeId===p.episodeId&&c.package.sha256===await digest(item.packageFile),'Clip belongs to another package');
      assert(!clipIds.has(c.clipId),'Duplicate clip');clipIds.add(c.clipId);clips.push(c);
    }
    episodes.push({package:p,packageFile:item.packageFile,packageHash:await digest(item.packageFile),clips});
  }
  const out=path.resolve(outDirectory),dist=path.join(root,'dist');
  assert(out===path.join(root,'dist-case-preview'),'Output must be the dedicated dist-case-preview directory');
  assert(fs.existsSync(path.join(dist,'faq.html')),'Run the ordinary site build first');
  fs.mkdirSync(out,{mode:0o700}); // No overwrite; remove only an explicitly reviewed prior preview yourself.
  try{
    fs.cpSync(dist,out,{recursive:true,force:false});
    for(const file of ['sitemap.xml','vercel.json','railway.json'])fs.rmSync(path.join(out,file),{force:true});
    fs.writeFileSync(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /\n');
    fs.copyFileSync(path.join(root,'src/css/case-library.css'),path.join(out,'css/case-library.css'));
    const shell=fs.readFileSync(path.join(dist,'faq.html'),'utf8');
    const nav=shell.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0];
    const tail=shell.slice(shell.indexOf('<footer class="site-footer">'));
    assert(nav&&tail.startsWith('<footer')&&tail.includes('</html>'),'Existing site shell missing');
    const links=(shell.match(/<link[^>]*(?:rel="stylesheet"|rel="icon"|rel="shortcut icon"|rel="apple-touch-icon")[^>]*>/g)||[]).join('\n');
    const theme=shell.match(/<script src="[^"]*theme[^" ]*"[^>]*><\/script>/)?.[0]||'';
    const doc=(title,body)=>`<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>${esc(title)} — Cosimo preview</title>${theme}${links}<link rel="stylesheet" href="/css/case-library.css"></head><body><a class="a11y-skip" href="#main">Skip to content</a>${nav}<main id="main" tabindex="-1" class="sub-page case-library"><div class="sub-page-label">Local library preview · unpublished</div>${body}</main>${tail}`.replace(/(href|src)="(css|js|fonts)\//g,'$1="/$2/');
    const manifest={schemaVersion:1,status:'local_preview_only',observedAt:new Date().toISOString(),requestSha256:requestHash,publications:0,episodes:[]};
    const cards=[];
    for(const {package:p,packageFile,packageHash,clips} of episodes){
      const route='/case-files/'+p.episodeId+'/',folder=path.join(out,route);fs.mkdirSync(folder,{recursive:true});
      const outputs=[];
      async function copy(item,name){const dest=path.join(folder,name);fs.copyFileSync(item.path,dest,fs.constants.COPYFILE_EXCL);assert.equal(await digest(dest),item.sha256,'Copied artifact hash mismatch');outputs.push({name,sha256:item.sha256,bytes:fs.statSync(dest).size});return name;}
      await copy(p.film,'film.mp4');await copy(p.captions,'captions.srt');
      const script=p.files.find(x=>x.kind==='script');if(script)await copy(script,'script.txt');
      const vtt='WEBVTT\n\n'+fs.readFileSync(p.captions.path,'utf8').replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g,'$1.$2');
      fs.writeFileSync(path.join(folder,'captions.vtt'),vtt);outputs.push({name:'captions.vtt',sha256:await digest(path.join(folder,'captions.vtt')),bytes:Buffer.byteLength(vtt)});
      const clipRows=[];
      for(const c of clips){
        const video=await copy(c.outputs.video,`clip-${c.clipId}.mp4`),captions=await copy(c.outputs.captions,`clip-${c.clipId}.srt`);
        clipRows.push(`<li><a href="${esc(video)}" download>Download technical excerpt (${c.outputs.video.media.duration.toFixed(1)}s)</a> · <a href="${esc(captions)}" download>Captions</a><p>Range ${c.start.toFixed(2)}–${c.end.toFixed(2)} seconds. Editorial selection and full playback remain pending.</p></li>`);
      }
      const evidence={episodeId:p.episodeId,sourceId:p.sourceId,title:p.title,fictional:p.fictional,disclosure:p.disclosure,packageSha256:packageHash,review:p.review,outputs,clips:clips.map(c=>({sourceId:c.sourceId,parentSourceId:c.parentSourceId,start:c.start,end:c.end,review:c.review}))};
      fs.writeFileSync(path.join(folder,'evidence.json'),JSON.stringify(evidence,null,2)+'\n');
      fs.writeFileSync(path.join(folder,'index.html'),doc(p.title,`<p><a href="/case-files/">← Case Files</a></p><h1 class="sub-page-title">${esc(p.title)}</h1><p class="case-disclosure">${esc(p.disclosure)}</p><video controls preload="metadata" playsinline aria-label="${esc(p.title)}"><source src="film.mp4" type="video/mp4"><track kind="captions" src="captions.vtt" srclang="en" label="English">Your browser cannot play this video. <a href="film.mp4">Download the film</a>.</video><div class="legal-body"><p>Existing review film. Sound, style, tone, factual review and full playback acceptance remain pending.</p><h2>Working files</h2><ul><li><a href="film.mp4" download>Film (${p.film.media.duration.toFixed(1)} seconds)</a></li><li><a href="captions.srt" download>Caption file</a></li>${script?'<li><a href="script.txt" download>Existing script</a></li>':''}<li><a href="evidence.json" download>File identities and review status</a></li></ul>${clipRows.length?'<h2>Technical excerpts</h2><ul>'+clipRows.join('')+'</ul>':''}</div>`));
      cards.push(`<article><div class="sub-page-label">Fictional demonstration · review pending</div><h2><a href="${route}">${esc(p.title)}</a></h2><p>${esc(p.disclosure)}</p><p>${p.film.media.duration.toFixed(1)} seconds · ${clips.length} technical excerpt${clips.length===1?'':'s'}</p><a class="btn-line" href="${route}">Open film and files</a></article>`);
      manifest.episodes.push({...evidence,route});
      await verifyPackage(packageFile);
    }
    assert.equal(await digest(requestFile),requestHash,'Library request changed');
    fs.mkdirSync(path.join(out,'case-files'),{recursive:true});
    fs.writeFileSync(path.join(out,'case-files/index.html'),doc('Case Files',`<h1 class="sub-page-title">Case Files</h1><p class="case-intro">Product demonstrations on fictional records. These saved films are available for review; they are not published customer case studies.</p><div class="case-grid">${cards.join('')}</div>`));
    fs.writeFileSync(path.join(out,'case-library-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
    const serve=read(path.join(root,'serve.json'));
    serve.rewrites.unshift(...['/case-files/',...manifest.episodes.map(e=>e.route)].flatMap(route=>[route,route.slice(0,-1)].map(source=>({source,destination:route+'index.html'}))));
    serve.headers.push({source:'**',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noarchive'}]});
    fs.writeFileSync(path.join(out,'serve.json'),JSON.stringify(serve,null,2)+'\n');
    return {status:manifest.status,output:out,episodes:episodes.length,clips:episodes.reduce((n,e)=>n+e.clips.length,0),publications:0};
  }catch(e){fs.writeFileSync(path.join(out,'case-library-failure.json'),JSON.stringify({status:'failed',error:e.message}));throw e;}
}
if(require.main===module){const[file,out]=process.argv.slice(2);if(!file||!out)throw Error('Usage: node scripts/build-case-library.cjs REQUEST.json dist-case-preview');build(file,out).then(x=>console.log(JSON.stringify(x,null,2))).catch(e=>{console.error(e.message);process.exitCode=1;});}
module.exports={build};
