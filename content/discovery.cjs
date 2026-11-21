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
 slug:'agent-harness-or-cosimo',category:'Choosing an approach',title:'Build your own agent harness, or run Cosimo?',
 description:'Compare an agent setup your team builds on Claude Code with Cosimo: who runs it, where it runs, who checks it, and who maintains it.',
 lead:'Claude and similar models can prepare financial work, and Cosimo runs Claude models alongside others. The decision is about what your firm needs around the model: who runs the process, who checks it, and who maintains it.',
 faqHeading:'Questions about this comparison',
 sections:[
 ['The model can do the work',`Teams building with Claude Code, skills, and connectors prepare reports, reconciliations, and review packages today. An agent harness is the set of skills, scripts, connections, and scheduling a team assembles around a model. A capable builder can assemble one that works well. Cosimo runs Claude models alongside models from OpenAI and open-weight models, so this guide does not compare model capability.
AI made preparing the work cheap and left checking it expensive. Hours saved equal preparation hours removed minus review hours added. The more a team uses AI, the more output a person has to check before signing. That arithmetic applies equally to your own build and to Cosimo.`],
 ['What a firm needs around the model',`A recurring financial process is finished when seven conditions hold. Write them down before you compare options.
<ul><li>The output is correct.</li><li>The person who signs can confirm it in less time than it took to prepare.</li><li>It comes out the same way next period.</li><li>Someone other than the builder can run it.</li><li>It runs when the builder’s laptop is closed, and after the builder has left the firm.</li><li>Its access and data handling pass your vendor review.</li><li>It costs less than the time it frees.</li></ul>
Check your own build against each condition first. Then ask four more questions. Can the person signing trace a figure to its supporting record without redoing the work? Who maintains the process when a source format changes? Can it move to another model during an outage or a price change? What does your vendor review cover: the model, or the processes built on it?`],
 ['What building it yourself involves',`A working harness takes engineering. Someone writes the skills and scripts, sets up each connection, arranges scheduling, and gives teammates a way to run it. Someone then maintains all of it as source formats, models, and requirements change. Name that person before you compare options.
Building is the right choice when a capable builder is the only user and no reviewer needs a record of the work. Keep the build in that case. An existing accounting or loan system can also be the better choice when it produces the report from complete, consistent fields.
An administrator, accountant, or outside service provider takes a different role. That firm owns a service and its professional responsibilities. Cosimo works alongside your administrator and is not your administrator of record.`],
 ['Compare both on the same process',`Choose one recurring process and run it both ways: on your build and in Cosimo. Measure preparation hours, review hours, and correction hours across two cycles. Change a source format before the second cycle and record who repairs the process. Ask a teammate who did not build it to run each option. The <a href="/guides/evaluate-financial-ai/">evaluation checklist</a> lists the cases to include.
In Cosimo, every figure traces to its source document and its calculation, and a figure that Cosimo can’t verify goes to a person.
A Cosimo lesson is a SKILL.md folder, the same format as a Claude skill, so the skills your team wrote move over. A lesson is private or shared. Your existing Model Context Protocol (MCP) servers connect by URL and authentication. <a href="/platform/">Read how the platform works</a>, or see <a href="/building-with-claude/">what moves over when you bring your skills</a>. The <a href="/product-facts/">product facts</a> list the scope and setup.`]
 ],faq:[
 ['Does Cosimo use Claude?','Yes. Cosimo runs models from Anthropic and OpenAI, and open-weight models, on Amazon Bedrock. Three effort levels map to different models, and an administrator can change the mapping for your organization.'],
 ['We already built skills. Do we start again?','No. Cosimo lessons are SKILL.md folders, the same format as Claude skills. Most of a skill moves as written. Connections and file paths need setup. A lesson is private or shared, and Cosimo keeps every prior version.'],
 ['When is our own build enough?','Your own build is enough when a capable builder is the only user and no reviewer needs a record of the work. The comparison changes when a second person runs the process or checks the figures before signing.']
 ],related:['evaluate-financial-ai','investor-reporting'],cta:'Compare one process both ways',
 note:'Claude is a trademark of Anthropic, PBC. Medici & Company is not affiliated with, endorsed by, or sponsored by Anthropic.'
}
];
// Pages outside /guides/ that use the same layout. Product claims here follow the code-verified fact sheet.
const standalone = [
{
 route:'/platform/',crumb:'Platform',category:'Product',title:'How Cosimo works',
 description:'How Cosimo works: verified figures, lessons and memory, workflows and watches, the cloud sandbox, model choice, connections, approvals, dashboards, and setup.',
 lead:'Cosimo is a hosted system built around AI models. Each component addresses a specific problem in recurring financial work. This page describes each component and the problem it addresses.',
 contentsLabel:'On this page',
 table:['Cosimo components',['Component','What it is','The problem it addresses'],[
  ['Verification','A source document and a calculation behind every figure, and a mark on each verified figure','A reviewer redoes the work to trust it'],
  ['Lessons and memory','Procedures stored as SKILL.md folders, and memory; both private or shared, versioned, and reversible','A method lives in one person’s files'],
  ['Workflows and watches','Chained steps that start by hand, on a schedule, or from a watch','A process depends on one person starting it'],
  ['Cloud sandbox','A hosted environment that runs code and builds files','A process stops when a laptop is closed'],
  ['Model choice','Frontier and open-weight models on Amazon Bedrock, mapped to three effort levels','A process depends on one model provider'],
  ['Connections','Google and Microsoft accounts, custom Model Context Protocol endpoints, and a browser for systems with no API','People copy records between systems by hand'],
  ['Approvals','A person approves anything that reaches someone else','A message or a change goes out unreviewed'],
  ['Dashboards','Views built from workflow outputs and edited by conversation','A team rebuilds the same summary each period']
 ]],
 sections:[
 ['How checking works',`AI made preparing the work cheap and left checking it expensive. Hours saved equal preparation hours removed minus review hours added. Cosimo is built so the person who signs can check the work in less time than preparing it takes.
Every figure traces to its source document and its calculation. Calculations live in a shared calculation library, so the same formula runs every time. A verified figure carries a mark, and a figure that Cosimo can’t verify goes to a person.
The run history keeps the full output and the calculation trail for each run, so a reviewer can read how a number was produced. The history also keeps each step and its transcript.
Missing records go into a gap ledger, and Cosimo follows up on each gap before the next run. Conflicting versions of a record go to the workflow owner. A run can pause and ask a person for input.`],
 ['Lessons and memory',`Lessons are reusable procedures stored as SKILL.md folders, the same format as Claude skills. A lesson is private to one person or shared across your organization. Each lesson is versioned and reversible: Cosimo keeps each prior version, and you can restore any of them.
Memory works the same way: private or shared, versioned, and reversible. Your team shares lessons and memory without syncing files.`],
 ['Workflows and watches',`A workflow chains steps into one run. Start it by hand, on a schedule, or from a watch. A watch detects a change in email, a calendar, Google Drive or SharePoint files, or a web page. It checks at a set interval, and the shortest interval is five minutes.
Any teammate can run a shared workflow from the web app: open it, fill in the inputs, and press Run. Cosimo emails you when a run finishes or needs a person.`],
 ['The cloud sandbox',`Cosimo works in its own cloud sandbox. It runs Python, installs the packages a task needs, and builds spreadsheets, documents, presentations, PDFs, and HTML files. Nothing runs on a team member’s computer.`],
 ['Model choice',`Cosimo runs frontier and open-weight models on Amazon Bedrock, hosted in the United States. They include models from Anthropic and OpenAI, and open-weight models such as Kimi K2. Three effort levels (Low, Medium, and High) map to different models, and an administrator can change the mapping for your organization. Each workflow step can use its own level, and small tasks go to cheaper models.
Cosimo meters token usage for your organization. Token usage passes through at cost, or you bring your own API keys.
Model choice is an operating control. When a model provider has an outage or changes its prices, an administrator maps an effort level to another model.`],
 ['Connections',`Cosimo connects to Google Drive, SharePoint, Gmail, Outlook, and Google Calendar. Cosimo is registered as a Microsoft application, and your tenant administrator grants admin consent. You add a custom Model Context Protocol (MCP) endpoint by entering its URL and authentication.
For systems that have no API, such as bank portals and state records, Cosimo operates the site in a hosted cloud browser. You sign in yourself, and Cosimo does not receive your password.
Your data stays in your SharePoint or Drive and syncs in 30 to 90 seconds.`],
 ['Approvals',`Anything that reaches another person, such as sending an email or sharing a file, requires approval every time. Edits and deletes of existing material require approval too, unless a person saved a time-limited permission for them. Cosimo records each approval request and its outcome.`],
 ['Dashboards',`Cosimo builds a dashboard from workflow outputs, and a person edits it by conversation.
Auditor and investor views with restricted panels arrive in early 2027. A controller sets what each outside viewer can open.`],
 ['Configured with you',`We configure the first process with the people who do the work today. Your team agrees the sources, calculations, output format, and review requirements, then tests the result. Cosimo keeps the agreed method for the next run, and we update it with your team when requirements change.
Cosimo works alongside your administrator, accountant, and advisers. It is not your administrator of record. Accounting, valuation, and professional sign-off remain with the people responsible for them.
Read the <a href="/product-facts/">product facts</a> for scope and commercial setup, and the <a href="/faq.html">setup FAQ</a> for common questions. If your team builds with Claude, read <a href="/building-with-claude/">how to bring your skills</a>.`]
 ],cta:'Discuss how Cosimo fits your process'
},
{
 route:'/building-with-claude/',crumb:'Building with Claude',category:'For builders',title:'Already building with Claude? Bring your skills.',
 description:'For teams building with Claude Code: bring your SKILL.md skills to Cosimo and run them for the whole firm, with a record a reviewer can follow.',
 lead:'Claude is excellent, and Cosimo runs it too. What you built works for you. Cosimo is a system of the same kind for the whole firm: shared, hosted, and open to review by the person who signs.',
 contentsLabel:'On this page',
 faqHeading:'Questions from builders',
 sections:[
 ['Your skills move over',`A Cosimo lesson is a SKILL.md folder, the same format as a Claude skill. Most of a skill moves as written. Connections and file paths need setup, and we do that work with you. Your existing Model Context Protocol (MCP) servers connect by URL and authentication.
A lesson is private to you or shared across your organization. Each lesson is versioned and reversible: Cosimo keeps each prior version, and you can restore any of them. A saved change to a shared lesson applies to the whole organization.
Memory works the same way: private or shared, versioned, and reversible. Your team shares lessons and memory without syncing files.`],
 ['They run without your laptop',`Cosimo works in its own cloud sandbox. It runs Python, installs the packages a task needs, and builds spreadsheets, documents, presentations, PDFs, and HTML files. Nothing runs on a team member’s computer.
A workflow chains steps into one run. Start it by hand, on a schedule, or from a watch. A watch detects a change in email, a calendar, Google Drive or SharePoint files, or a web page. It checks at a set interval, and the shortest interval is five minutes. Cosimo emails you when a run finishes or needs a person.`],
 ['Your teammates run them from a screen',`Any teammate can run a shared workflow from the web app: open it, fill in the inputs, and press Run. Input steps collect text or files through a form. The teammate needs no terminal and no local setup.`],
 ['A reviewer can follow the numbers',`AI made preparing the work cheap and left checking it expensive. Hours saved equal preparation hours removed minus review hours added. The more your team uses AI, the more output someone has to check. That applies to your own build and to Cosimo.
Cosimo is built so the person who signs can check the work in less time than preparing it takes. Every figure traces to its source document and its calculation. Calculations live in a shared calculation library, so the same formula runs every time. A verified figure carries a mark, and a figure that Cosimo can’t verify goes to a person.
The run history keeps the full output and the calculation trail for each run, so a reviewer can read how a number was produced.
Missing records go into a gap ledger, and Cosimo follows up on each gap before the next run. Conflicting versions of a record go to the workflow owner. A run can pause and ask a person for input.`],
 ['A choice of models',`Cosimo runs frontier and open-weight models on Amazon Bedrock, hosted in the United States. They include models from Anthropic and OpenAI, and open-weight models such as Kimi K2. Three effort levels (Low, Medium, and High) map to different models, and small tasks go to cheaper models. An administrator can change the mapping for your organization, and each workflow step can use its own level.
Token usage passes through at cost, or you bring your own API keys.
Model choice is an operating control. When a model provider has an outage or changes its prices, an administrator maps an effort level to another model. It is not a judgment about any model.`],
 ['For the person who signs off on the tooling',`This section is for finance and compliance leads. Ask two questions about the processes your people built on an approved model. Where is each process written down? Who other than its builder has read it?
In Cosimo, each process is on record. Lessons are versioned. The run history keeps each step, its transcript, the full output, and the calculation trail. Sending to another person requires approval every time. Edits and deletes require approval unless a person saved a time-limited permission.
Your data stays in your SharePoint or Drive and syncs in 30 to 90 seconds. Cosimo works alongside your administrator and is not your administrator of record.`],
 ['A first project',`Pick one skill you already run. Run it in Cosimo with the same inputs. Compare the output, then compare the time a reviewer needs to check each version. Ask a teammate to run it without your help.
Keep your own build if it wins that comparison. The guide <a href="/guides/agent-harness-or-cosimo/">Build your own agent harness, or run Cosimo?</a> sets out the full comparison, and <a href="/platform/">How Cosimo works</a> describes each component.`]
 ],faq:[
 ['Is moving a skill to Cosimo zero work?','No. Most of a skill moves as written because the format is the same. Connections, file paths, and any script that depends on your own computer need setup.'],
 ['Does Cosimo replace Claude?','No. Cosimo runs Claude models, alongside models from OpenAI and open-weight models, on Amazon Bedrock. Cosimo is a system around the model: shared lessons, hosted runs, approvals, and run history.'],
 ['Can we keep using Claude Code for our own work?','Yes. Keep your own setup for individual work. Move a process to Cosimo when other people need to run it or check it.']
 ],
 note:'Claude is a trademark of Anthropic, PBC. Medici & Company is not affiliated with, endorsed by, or sponsored by Anthropic.',
 cta:'Bring one skill to compare'
}
];
module.exports = { pages, standalone, companies, activity };
