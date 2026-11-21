(() => {
  'use strict';
  const inputs=[...document.querySelectorAll('.capacity-inputs input')];
  const output=document.getElementById('capacity-results');
  const number=new Intl.NumberFormat('en-US',{maximumFractionDigits:1});
  const money=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
  function render() {
    if(inputs.some(input=>!input.checkValidity()||input.value==='')) {
      output.innerHTML='<h2>Check your inputs</h2><p>Enter a valid non-negative value for every field. Reporting cycles must be a whole number from 1 to 365.</p>';
      return;
    }
    const v=Object.fromEntries(inputs.map(i=>[i.name,Number(i.value)]));
    const annual=v.runs*(v.before-v.prep-v.review-v.correction),first=annual-v.setup;
    const capacity=first*v.rate-v.fees;
    output.innerHTML=`<h2>Your scenario</h2><dl><dt>Ongoing hours recovered per year</dt><dd>${number.format(annual)}</dd><dt>First-year hours, after setup</dt><dd>${number.format(first)}</dd><dt>First-year capacity value, after fees</dt><dd>${money.format(capacity)}</dd><dt>First-year break-even annual fees</dt><dd>${money.format(first*v.rate)}</dd></dl><p>${capacity<0?'These assumptions produce a negative first-year capacity value. Review the ongoing effort, setup and costs.':'This is capacity released at your assumed hourly cost. It becomes a cash saving only if spending actually falls.'}</p><p>Illustrative calculation. Verify the inputs in a live evaluation.</p>`;
  }
  inputs.forEach(i=>i.addEventListener('input',render));
  document.getElementById('capacity-reset').addEventListener('click',()=>{inputs.forEach(i=>{i.value=i.defaultValue;});render();});
  render();
})();
