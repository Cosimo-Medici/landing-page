#!/usr/bin/env node
'use strict';
// Deliberately separate from the production build. Outputs only to a new private directory.
const fs = require('node:fs'), path = require('node:path'), os = require('node:os'), crypto = require('node:crypto');
const root = path.resolve(__dirname, '..'), src = path.join(root, 'src');
const {trackedLink} = require('../../cosimo-content-engine/content-engine/scripts/link.cjs');
const args = process.argv.slice(2);
if (![1,3].includes(args.length) || !path.isAbsolute(args[0]) || (args.length === 3 && args[1] !== '--spot-error')) throw Error('Usage: node scripts/build-buyer-tools.cjs /absolute/private/output [--spot-error /absolute/challenge.json]');
const output = path.resolve(args[0]), privateRoot = path.join(os.homedir(), 'Library/Application Support/cosimo-content');
if (!output.startsWith(privateRoot + path.sep) || fs.existsSync(output)) throw Error('Use a new output directory inside the private cosimo-content directory.');
let ancestor = path.dirname(output);
while (!fs.existsSync(ancestor)) ancestor = path.dirname(ancestor);
if (fs.realpathSync(ancestor) !== ancestor) throw Error('Symlinked output ancestors are not supported.');
const shell = fs.readFileSync(path.join(src, 'about.html'), 'utf8');
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const scriptJson = value => JSON.stringify(value).replace(/[<>&\u2028\u2029]/g,c=>`\\u${c.charCodeAt(0).toString(16).padStart(4,'0')}`);
let challenge = null;
if (args.length === 3) {
  if (!path.isAbsolute(args[2])) throw Error('Challenge path must be absolute.');
  challenge = require('../src/js/spot-error.js').validate(JSON.parse(fs.readFileSync(args[2],'utf8')));
  const bytes = fs.readFileSync(path.join(root,'../cosimo/agent/tests/calc/vectors/prepare-statement-of-changes-partners-capital.json'));
  const reference = JSON.parse(bytes).cases.find(c=>c.name===challenge.source?.caseName);
  if (!reference || crypto.createHash('sha256').update(bytes).digest('hex') !== challenge.source.sha256 || challenge.rows.length !== Object.keys(reference.expect_result).length || challenge.rows.some(r=>r.expectedAmount !== reference.expect_result[r.field]) || challenge.answer.explanation !== reference.derivation) throw Error('Challenge expected figures do not match the committed independent vector.');
}
const nav = shell.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)?.[0], tail = shell.slice(shell.indexOf('<footer class="site-footer">'));
if (!nav || !tail.startsWith('<footer')) throw Error('Existing site shell unavailable.');
const labels = {name:'Your name', company:'Company', email:'Email', problem:'Process or problem', output:'Output you need', period:'Reporting period', decision:'Decision this should support', reviewer:'Person reviewing the result', owner:'Workflow owner'};
const fields = Object.entries(labels).map(([name,label]) => `<label class="${['problem','output','decision'].includes(name)?'wide':''}" for="${name}">${label}${['problem','output','decision'].includes(name)?`<textarea id="${name}" name="${name}" maxlength="2000" required></textarea>`:`<input id="${name}" name="${name}" type="${name==='email'?'email':'text'}" maxlength="200" required>`}</label>`).join('\n');
const cta = trackedLink('https://cosimo.work/vc/#contact', {source:'website',medium:'article',topic:'quarter-close',piece:'reverse-demo-preview'});
const html = `<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="no-referrer"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; connect-src 'none'; form-action 'none'; object-src 'none'; base-uri 'none'"><title>Workflow request — Cosimo local preview</title><script src="/js/theme.js"></script>${['fonts','styles','site-layout','accessibility','buyer-tools'].map(n=>`<link rel="stylesheet" href="/css/${n}.css">`).join('')}<script src="/js/accessibility.js" defer></script></head><body><a class="a11y-skip" href="#main">Skip to content</a>${nav}<main id="main" tabindex="-1"><section class="sub-page buyer-tools"><div class="sub-page-label">Private local preview · not submitted</div><h1 class="sub-page-title">Describe your workflow</h1><div class="legal-body"><p>Prepare the process, output and people for a scoped review. This preview keeps the request in your browser until you download it. No request is sent and no files are accepted.</p><form id="buyer-intake" autocomplete="off">${fields}<button class="btn-main wide" type="submit">Prepare request</button></form><p>Before a real data run, we agree the permitted files, access and retention, technical scope, time and cost. The evaluation NDA and review arrangements belong to the existing handoff.</p><div id="request-actions" hidden><a id="open-email" class="btn-line" href="mailto:info@medici.ai">Open email again</a> <a id="open-gmail" class="btn-line" href="https://mail.google.com/">Send with Gmail</a></div><pre id="request-result" aria-live="polite">Your prepared request will appear here.</pre><p><a href="${cta.replace(/&/g,'&amp;')}">Discuss your workflow</a></p></div></section></main><script src="/js/buyer-intake.js"></script><script src="/js/buyer-intake-page.js" defer></script>${tail}`.replace(/src="js\//g,'src="/js/');
fs.mkdirSync(output, {recursive:true,mode:0o700});
function write(relative, bytes) {const p=path.join(output,relative);fs.mkdirSync(path.dirname(p),{recursive:true,mode:0o700});fs.writeFileSync(p,bytes,{mode:0o600});}
write('reverse-demo/index.html',html); write('robots.txt','User-agent: *\nDisallow: /\n');
if (challenge) {
  const reverseCta = trackedLink('http://127.0.0.1/reverse-demo/',{source:'website',medium:'article',topic:'quarter-close',piece:challenge.challengeId});
  const reverseHref = new URL(reverseCta).pathname + new URL(reverseCta).search;
  const money = value => {const [whole,fraction] = value.split('.');return whole.replace(/\B(?=(\d{3})+(?!\d))/g,',')+'.'+fraction;};
  const rows = challenge.rows.map(r=>`<tr><th scope="row">${esc(r.label)}</th><td>${esc(money(r.amount))}</td></tr>`).join('');
  const section = `<section class="sub-page buyer-tools"><div class="sub-page-label">Fictional technical exercise · unpublished</div><h1 class="sub-page-title">Spot the error</h1><div class="legal-body"><p>This fictional capital account has one incorrect figure. Identify the line and enter the corrected amount. Period: ${esc(challenge.period.start)} to ${esc(challenge.period.end)}. All amounts are USD.</p><table class="spot-statement"><caption>Fictional statement · one planted arithmetic error</caption><thead><tr><th scope="col">Line</th><th scope="col">Amount</th></tr></thead><tbody>${rows}</tbody></table><form id="spot-error-answer"><label for="field">Statement line<select id="field" name="field" required><option value="">Choose a line</option>${challenge.rows.map(r=>`<option value="${esc(r.field)}">${esc(r.label)}</option>`).join('')}</select></label><label for="amount">Correct amount (no commas)<input id="amount" name="amount" inputmode="decimal" required></label><button class="btn-main wide" type="submit">Check answer</button></form><p id="spot-error-feedback" aria-live="polite">Local practice only. No answers are submitted or counted.</p><p>Solve rate: not measured. The public monthly exercise has not started.</p><p><a href="${esc(reverseHref)}">Prepare a workflow request</a></p></div></section>`;
  const spotHtml = html.replace(/<title>.*?<\/title>/,'<title>Spot the error — Cosimo local preview</title>').replace(/<section class="sub-page buyer-tools">[\s\S]*?<\/section>/,section).replace(/<script src="\/js\/buyer-intake(?:-page)?\.js"(?: defer)?><\/script>/g,'').replace('</main>',`</main><script type="application/json" id="spot-error-data">${scriptJson(challenge)}</script><script src="/js/spot-error.js" defer></script>`);
  write('spot-the-error/index.html',spotHtml); write('js/spot-error.js',fs.readFileSync(path.join(src,'js/spot-error.js')));
}
for (const name of ['fonts','styles','site-layout','accessibility','buyer-tools']) write(`css/${name}.css`,fs.readFileSync(path.join(src,`css/${name}.css`),'utf8').replace(/\.\.\/public\//g,'../'));
for (const name of ['theme','accessibility','page-chrome','brand-mark','buyer-intake','buyer-intake-page']) write(`js/${name}.js`,fs.readFileSync(path.join(src,`js/${name}.js`)));
for (const name of ['fonts','brand']) fs.cpSync(path.join(src,'public',name),path.join(output,name),{recursive:true});
write('ChicagoFLF.ttf',fs.readFileSync(path.join(src,'public/ChicagoFLF.ttf')));
write('preview-manifest.json',JSON.stringify({schemaVersion:1,status:'local_preview_only',route:'/reverse-demo/',routes:challenge?['/reverse-demo/','/spot-the-error/']:['/reverse-demo/'],spotErrorChallenge:challenge?{id:challenge.challengeId,source:challenge.source}:null,customerFileIntakeEnabled:false,canonicalUrl:null,trackingLink:cta,shellSha256:crypto.createHash('sha256').update(shell).digest('hex')},null,2));
console.log(output);
