'use strict';
// Public copy and fictional demonstration data. No customer records belong here.
const companies = [
  ['AeroComponent Solutions',18,19,3.2,3.5],['VeriSafe Compliance',14,13.5,2.1,2],
  ['Calderwood Fasteners',9,10,1.1,1.4],['ConstructFlow',8,8,1.6,1.6],
  ['Golden Petal Apiaries',11,11.5,1,1.2],['FreshFare Logistics',10,10,.6,.7]
];
const activity = [
  ['08:42','L-104','Arno Components','PMT-721','Repayment',100000],
  ['09:15','L-208','Pitti Packaging','DRW-114','Advance',250000],
  ['11:06','L-316','Bardi Logistics','PMT-722','Repayment',200000],
  ['14:20','L-422','Fiesole Engineering','DRW-115','Advance',400000],
  ['16:58','L-104','Arno Components','PMT-721','Repayment',100000]
];
const pages = [
{
 slug:'investor-reporting', category:'Fund finance & investor relations', title:'Investor reporting automation for funds',
 description:'Prepare investor reports from portfolio accounts, manager updates and fund records, with source checks, your existing format and exceptions ready for review.',
 lead:'Quarter-end reporting becomes easier when the figures, commentary and questions arrive together. Cosimo prepares investor reporting drafts from your records, applies the agreed checks and retains the reporting method for the next period.',
 sections:[
 ['The work behind the report',`A quarterly investor report usually depends on several people finishing different jobs. Portfolio companies submit accounts, managers explain performance, and the fund team reconciles the figures before assembling an update. Writing the commentary is only one part of that process. A useful automation should reduce the collecting, checking and correcting as well.
Cosimo is configured around the sources, calculations, reporting format and approval requirements of that process. It brings the prepared output and its supporting records together, with missing information and conflicting figures visible to the reviewer.`],
 ['What to bring to the first run',`Start with one reporting period, the management accounts or approved fund figures used for it, the relevant company updates, and a prior report that shows your format. Identify which source takes precedence when two records disagree and who can approve a correction. Establish whether each figure represents a company result, an ownership-weighted exposure or a fund-level measure; those are different things.
The first output should contain the report, source references and a separate list of unresolved questions. Investor-facing material and internal working notes should have a clear boundary.`],
 ['An example you can inspect',`Our fictional Chianti Capital example uses six companies with $70.0 million in quarterly revenue against a $72.0 million budget. One company’s update says $9.4 million while its accounts say $9.0 million. The prepared report uses the accounts provisionally and keeps the $400,000 disagreement open.
The <a href="/examples/fund-reporting/">complete worked example</a> shows the figures, arithmetic and review questions in a readable page. It is a prepared illustration using fictional records. Use the same inspection method when evaluating a live run on your own agreed records.`],
 ['Where it fits in your operation',`Cosimo works alongside your finance team, administrator and accountant. It can prepare portfolio updates and investor reporting material in the agreed format; the responsible people retain accounting, valuation and sign-off. Existing approved allocations and fund figures remain the starting point for notices or statements that depend on them.
Before expanding the scope, test the next reporting period. Changed templates, late submissions and revised source figures are part of the job. Measure the total work left for your team, including review and correction, using the <a href="/tools/reporting-capacity/">reporting capacity calculator</a>.`]
 ], faq:[
 ['Can we keep our existing investor report format?','Yes. Your existing report is the starting point. The sources, calculations, headings, commentary and checks are agreed and tested with your team before the method is retained for subsequent periods.'],
 ['Does this replace our fund administrator?','Cosimo supports preparation and coordination alongside your administrator and finance team. It is not the administrator of record; accounting, valuation and professional sign-off remain with the responsible people.'],
 ['What happens when the source figures disagree?','The workflow should preserve both records, show the difference and identify the person responsible for resolving it. The agreed source-precedence rule determines the provisional draft; a conflicting figure is not silently treated as a confirmed correction.']
 ], related:['fund-reconciliation','evaluate-financial-ai'], example:'/examples/fund-reporting/', cta:'Discuss your next investor report'
},
{
 slug:'daily-loan-review',category:'Bank loan operations',title:'Daily loan activity reviews, ready for an officer',
 description:'Prepare daily loan activity reports from supplied exports and controls. Inspect principal movements, repeated references and unresolved differences before release.',
 lead:'The morning review should tell loan operations which entries need investigation and show the records behind them. Cosimo can be configured to assemble that review from the activity export, an independent control and your procedure.',
 sections:[
 ['Start with the control, not the commentary',`A readable summary does little for a loan officer if the underlying balances do not reconcile. Define the business date, currency, transaction population and balance basis first. A principal-only review must not be presented as a complete reconciliation of principal, interest, fees and the general ledger.
The process then brings the supplied movements into a reconciliation, checks repeated references and prepares specific questions for the appropriate reviewer. Original rows stay available so the reviewer can establish what happened.`],
 ['A repeated payment is a question to investigate',`In our fictional Cabini Bank example, the same $100,000 repayment appears twice. Retaining both rows produces an implied closing principal of $15.25 million; the independent control is $15.35 million. Excluding one repeated row would explain the difference, but does not establish whether the underlying problem is an export repeat or a posting error.
The <a href="/examples/loan-reconciliation/">worked loan reconciliation</a> shows all five source rows and the arithmetic. The next action is to compare the posting journal and export history. An officer confirms any correction before the report is released.`],
 ['What the configured workflow needs',`Bring an agreed activity export, the independent control, the review procedure and an example of the report your officers use. Define which combinations identify a potential duplicate, what tolerances apply, and which differences require investigation. Agree who can approve the output and whether follow-ups may be drafted or sent under the configured permissions.
An evaluation can start with agreed exports. A connection to a core banking system is a separate scope item, with access and data handling assessed before records are shared.`],
 ['Judge the hand-off',`A useful review package includes the movement summary, source references, reconciliation, open questions and owners. It should make the next action clear enough that an officer can investigate without reconstructing the entire preparation.
Use the <a href="/guides/evaluate-financial-ai/">evaluation checklist</a> to test missing controls, repeated rows and corrected exports. Measure the time your team spends preparing, checking and correcting the package across successive runs.`]
 ],faq:[
 ['Does Cosimo automatically remove duplicate loan transactions?','A repeated reference is flagged for investigation. The source remains intact, and the responsible officer determines whether a report adjustment or source-system correction is appropriate.'],
 ['Do we need a core banking integration to evaluate it?','An initial evaluation can use agreed exports and an independent control. Direct core-system connections require a separate scope review.'],
 ['Does the loan review make a lending decision?','No. It prepares records, checks and open questions for review. Lending decisions and the approval of corrections remain with the bank.']
 ],related:['borrower-review','evaluate-financial-ai'],example:'/examples/loan-reconciliation/',cta:'Discuss your morning loan review'
},
{
 slug:'fund-reconciliation',category:'Fund finance & operations',title:'Reconcile fund reporting records before the report goes out',
 description:'A practical approach to checking administrator figures, internal records and portfolio updates, preserving differences and preparing clear review questions.',
 lead:'A report can be internally consistent and still use the wrong figures. Reconciliation starts by agreeing which records should match, what each number represents and who owns the exceptions.',
 sections:[
 ['Agree the comparison before automating it',`Administrator statements, portfolio-company accounts and internal working papers can describe different periods and different measures. A company’s revenue is not the fund’s return; a cash movement is not automatically an income item. Define the reporting date, currency, entity, ownership basis and approved source for each comparison.
Cosimo can be configured around the agreed checks to prepare a reconciliation and its supporting records. The output should distinguish a genuine mismatch from a difference explained by timing, scope or definitions.`],
 ['Keep a useful record of the exception',`For each unresolved difference, retain both values, their source references, the amount of the difference, the provisional treatment and the person who can resolve it. A reviewer needs to see what changed when a corrected record arrives. Replacing the original number without preserving the explanation makes the next review harder.
Our <a href="/examples/fund-reporting/">fictional reporting example</a> follows a $400,000 disagreement between a company update and its accounts. It also shows why a revenue correction cannot be used to infer an EBITDA correction.`],
 ['Use independent evidence',`Checking that a report total equals its own underlying table is useful arithmetic, but it is not independent confirmation of the source. Supply the administrator-approved statement, accounting record or other control appropriate to the check. Agree how approved adjustments and late records enter the process.
For notices and investor statements, establish the approved allocations and the completeness of the capital-account information. A schedule of subscriptions and distributions alone does not establish a complete capital account balance.`],
 ['Evaluate the complete cycle',`Choose a recurring reconciliation and test one period, then a second period with a changed record or a known exception. Inspect whether the agreed calculation, source references and review routing are retained. Record how much time the finance team spends obtaining missing records and resolving discrepancies.
Cosimo works alongside the administrator and accountant. Accounting decisions, valuation and professional sign-off remain with the responsible team. Our <a href="/guides/evaluate-financial-ai/">evaluation kit</a> provides a practical acceptance checklist for the first process.`]
 ],faq:[
 ['Can Cosimo compare administrator figures with internal records?','A workflow can be configured to compare agreed records and prepare differences for review. The reporting period, definitions, approved sources and acceptance criteria are established with your team.'],
 ['Can it complete a reconciliation without an independent control?','It can check arithmetic within the supplied records, but the absence of an independent control must remain visible. Agreement within one file does not establish agreement with the administrator or source system.']
 ],related:['investor-reporting','evaluate-financial-ai'],example:'/examples/fund-reporting/',cta:'Discuss a recurring reconciliation'
},
{
 slug:'borrower-review',category:'Bank credit & private credit operations',title:'Borrower review preparation from the records you receive',
 description:'Assemble borrower review packages, check document completeness and prepare follow-ups against your reporting calendar and review procedure.',
 lead:'A borrower file is ready for review when the required records are present, the figures can be traced and the outstanding questions are clear. Cosimo helps prepare that package around your reporting calendar and procedure.',
 sections:[
 ['Make the requirement explicit',`Start with the borrower list, reporting calendar, required documents and the current review procedure. Identify the period and version of each received record. A set of management accounts may have arrived while a signed certificate remains outstanding; calling the whole file “complete” would hide the work still needed.
The configured process assembles the records, checks them against the agreed requirements and prepares a review package with the missing items and their owners.`],
 ['Prepare a specific follow-up',`The fictional Cabini example records Pitti Packaging’s Q3 accounts and receivables aging as received on 19 October. Its signed borrowing-base certificate, due on 20 October, is still outstanding at the 21 October review. The useful follow-up acknowledges what has arrived and requests the missing certificate.
That status is a document-control finding. Interpreting an agreement, determining default or changing credit terms remains the responsibility of the credit team. The <a href="/examples/loan-reconciliation/">worked bank example</a> includes this file-status check alongside the daily loan review.`],
 ['Give covenant work its own definitions',`If the scope includes covenant worksheets, the applicable agreement definitions, testing date, calculation inputs and permitted adjustments need to be agreed. An unresolved EBITDA add-back can change a ratio materially; the worksheet should expose the alternative treatment and the question requiring judgment.
The <a href="/credit/">private credit example</a> illustrates a supplied leverage calculation of 4.80 times that becomes 5.33 times when an unresolved add-back is excluded, against a supplied limit of 5.00 times. It presents a review question, not a conclusion about compliance or default.`],
 ['Test the next submission',`Use a late document, a stale reporting period and a revised figure in the evaluation. Inspect whether each changes the file status and prepared output appropriately. Agree how reviewers approve follow-ups and how a received replacement document closes an outstanding item.
An evaluation can begin with agreed exports and files. The first scope should name the sources, output, access requirements and acceptance criteria before the team shares borrower records.`]
 ],faq:[
 ['Does a missing certificate mean the borrower is in default?','The workflow records the missing item against the supplied requirement. Agreement interpretation and any default determination remain with the responsible credit professionals.'],
 ['Can the process prepare document requests?','Yes, document follow-ups can be part of the agreed workflow. The permitted actions and required approvals are configured with your team.'],
 ['Is this for banks or private credit funds?','Both can evaluate borrower review preparation. The required documents, calculations, review responsibilities and connected systems are specific to the institution and process.']
 ],related:['daily-loan-review','evaluate-financial-ai'],example:'/examples/loan-reconciliation/',cta:'Discuss your borrower review process'
},
{
 slug:'evaluate-financial-ai',category:'Buyer evaluation',title:'Evaluate financial AI on the work left for your team',
 description:'A practical evaluation kit for fund and bank operations: source traceability, discrepancies, approvals, repeatability and the full cost of review.',
 lead:'A quick first draft is useful only if checking and correcting it does not consume the hours you expected to save. Evaluate one complete recurring process, including the work your team still has to do.',
 sections:[
 ['Define a result someone can accept',`Choose one process and one reporting period. Write down the required output, the sources it depends on, the calculations to reproduce, the exceptions it should identify and the person who can approve it. Use a prior completed package to establish the current workload.
Agree the commercial scope, data requirements and access before sharing source records. Our <a href="/product-facts/">product facts</a> and existing <a href="/faq.html">setup FAQ</a> explain how Cosimo approaches that first process.`],
 ['Inspect the difficult cases',`Include a conflicting source figure, a missing record, a repeated transaction, a revised document and a changed reporting period. The useful question is whether each changes the result correctly and creates a clear review action. Avoid giving the system only a perfectly tidy file and calling the result representative.
Trace selected output figures back to their sources and reproduce the calculations. Inspect whether unsupported commentary has been introduced and whether internal review notes are kept separate from material intended for investors or clients.`],
 ['Run the same method again',`A recurring process earns its value on subsequent runs. Give it the next set of records and check that the agreed definitions, format and approval requirements carry forward. Change a source format deliberately and inspect how the process handles it.
Keep a record of preparation time, review time, correction time and outstanding work. Setup effort belongs in the economics as well. The <a href="/tools/reporting-capacity/">capacity calculator</a> makes those assumptions explicit without presenting them as measured Cosimo performance.`],
 ['Use the same brief for every option',`Give shortlisted providers the same source pack, expected output and exception list. Ask each to explain a result from source to final figure, then record what your reviewer had to repair. Compare the whole workflow, including software charges, setup, model usage and the time your team contributes.
You can use our two fictional <a href="/examples/fund-reporting/">fund</a> and <a href="/examples/loan-reconciliation/">bank</a> examples as a public reference. Their expected results are published, so they are useful for inspection and demonstration; a genuine evaluation should also include held-out records the provider has not already seen.`]
 ],faq:[
 ['What should count as a successful pilot?','Use acceptance criteria agreed for the specific process: reproducible figures, traceable sources, visible exceptions, appropriate approvals and a useful reduction in the total work left for your team across successive runs.'],
 ['Are the website examples customer results?','No. They use fictional records and prepared outputs to explain the workflow and its review steps. A live evaluation should use separately agreed records and acceptance criteria.']
 ],related:['investor-reporting','daily-loan-review'],cta:'Bring one process to evaluate', checklist:true
},
{
 slug:'chat-or-configured-workflow',category:'Choosing an approach',title:'A chat assistant or a configured financial workflow?',
 description:'Compare a general chat assistant, existing system automation, a configured Cosimo workflow and an outsourced service against the work your team needs done.',
 lead:'The right choice depends on how often the work repeats, where the records live and how much of the process your team wants to operate. Start with the job and the responsibilities it creates.',
 sections:[
 ['An occasional question can stay a question',`For an occasional document summary or a first attempt at wording, a general assistant may be sufficient. The person using it supplies the relevant records, instructions and review. Some assistants also support saved instructions, connected sources and automation; compare the actual configuration available to your team.
Recurring reporting adds another requirement: retaining the agreed sources, definitions, calculations, output format and review steps as the records change. That is the process Cosimo is configured to take on.`],
 ['Existing systems may already handle the structured part',`When a report can be generated directly from complete, consistent fields in your accounting or loan system, use that capability as the baseline. The cost of adding another tool needs to be justified by work the existing system does not already finish.
Cosimo is worth evaluating when preparation crosses files, updates and procedures, or when the team repeatedly assembles supporting evidence and chases unresolved questions around a report. Start with the gap you can identify.`],
 ['A service provider takes a different role',`An administrator, accountant or outsourced operations provider may own a broader service and its professional responsibilities. Cosimo works alongside those people. Buying software to prepare work and engaging a firm to take responsibility for a service are different commercial arrangements, even when both use AI.
Specify who produces the records, who resolves an exception, who approves the result and who is responsible for its release. The division of work matters more than the label on the technology.`],
 ['Make the comparison observable',`Ask each option to complete the same defined process. Track the work required to gather records, run the process, review the result and correct it. Include implementation effort and the second reporting cycle. The <a href="/guides/evaluate-financial-ai/">evaluation checklist</a> helps make that comparison concrete.
Cosimo’s configured approach starts with one recurring job, tested with your team, with the agreed method retained for later runs. <a href="/product-facts/">Read the product facts</a> for its current scope and setup.`]
 ],faq:[
 ['When is a general assistant enough?','It may be enough for occasional work where a person can supply the records, instructions and review each time. Compare its actual capabilities and configuration with the recurring process you need completed.'],
 ['What is the starting point for evaluating Cosimo?','One recurring process with identifiable source records, a required output and agreed review criteria. The process is configured and tested with your team, then retained for subsequent runs.']
 ],related:['evaluate-financial-ai','investor-reporting'],cta:'Discuss the work between your systems'
}
];
module.exports = { pages, companies, activity };
