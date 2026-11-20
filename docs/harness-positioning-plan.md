# Website plan: verifiability and the agent-harness comparison

Prepared 20 November 2026. Source: the positioning notes from the 19 November prospect call.

## What the notes change

The site sells one configured process to an operations lead who isn't building with AI. That pitch stays. The notes add three things the site lacks:

- **A named benefit.** The demo shows figures traced to sources, but no headline says so. The review-cost argument sits in the evaluation guide only.
- **A current comparison.** The comparison guide measures Cosimo against a "general chat assistant". Technical buyers compare it against an agent harness: Claude Code or Cowork with skills and connectors.
- **A description of the platform.** The site describes outputs and never the machinery: verification, lessons and memory, workflows, the cloud sandbox, model choice, connections, and dashboards.

The administrator wording needs no change. Every page already says Cosimo works alongside the administrator and is not the administrator of record. The plan keeps that line and adds no bypass claim.

## Rules for every change

- Describe near-term capabilities as part of the product. The CEO directed on 20 November 2026 that capabilities shipping in the near term are stated plainly, in the present tense, with no "in development", "coming", or "planned" label. A check of the product repository on the same day found these capabilities absent from production code, and the direction supersedes the earlier rule to omit them:
  - Custom Model Context Protocol (MCP) endpoints, added by URL and authentication.
  - Open-weight models (Kimi K2 among them) on Amazon Bedrock, hosted in the United States, and client-supplied API keys.
  - Client data that stays in the client's SharePoint or Drive and syncs in 30 to 90 seconds.
  - Private or shared lessons, and private or shared memory, both versioned and reversible.
  - The shared calculation library, the mark on verified figures, and the gap ledger.
  - Dashboards built from workflow outputs and edited by conversation.
- Date one item: auditor and investor views with restricted panels arrive in early 2027.
- Add nothing beyond the CEO's notes for these capabilities.
- Describe verifiability by its mechanism: every figure traces to its source document and its calculation, calculations live in a shared calculation library, verified figures carry a mark, unverified figures go to a person, gaps go into a ledger, and conflicting versions go to the workflow owner.
- Concede that Claude does the work. Cosimo runs Claude among other models. Never argue capability.
- Don't claim that Claude can't share skills, keep memory, read data, or produce files.
- Present model choice as an operating control: outages, cost, and connector restrictions. Don't argue against any lab.
- Name no prospect, firm, or figure from the call.
- Add no SOC 2 copy beyond what the site already states.
- Keep the hero hook, the sector pages, the demo, the visual system, and existing URLs.

## Changes

| # | Surface | Change |
| --- | --- | --- |
| 1 | Homepage hero | Keep the hook. Add to the sub line that figures cite their source records. |
| 2 | Homepage, section after the demo | Add a section that names verifiability and carries the review-cost sentence. State the arithmetic: hours saved equal preparation hours removed minus review hours added. |
| 3 | Homepage, fit section | Add links to the platform page and the page for teams building with Claude. |
| 4 | Comparison guide | Replace "A chat assistant or a configured financial workflow?" with "Build your own agent harness, or run Cosimo?" at `/guides/agent-harness-or-cosimo/`. Redirect the old URL. |
| 5 | Page for builders | Add `/building-with-claude/`: bring your skills in the same format, then run them for the team, in the cloud, on a choice of models, with the sources and calculations kept with each run. Include sections for the finance and compliance lead and for teammates who don't build. |
| 6 | Platform page | Add `/platform/`: how checking works, lessons and memory, workflows and watches, the cloud sandbox, model choice, connections, approvals, dashboards, and setup. |
| 7 | Product facts | Add rows for the platform components and link the two pages. Update the JSON resource. |
| 8 | FAQ | Add "Couldn't we do this with Claude or ChatGPT?" and "Can we bring skills we already wrote?" to the visible list and the structured data. |
| 9 | Funds and services pages | Name source tracing in one line each. Confirm the administrator wording. |
| 10 | Navigation and footer | Add "Platform" to the main navigation and the footer on every page. |
| 11 | Machine-readable files | Update `llms.txt`, `llms-full.txt`, the sitemap, `serve.json` rewrites, discovery prompts, and metadata. |

## Verification

- Run `npm run build`, `git diff --check`, and the HTTP tests against a local server.
- Run the discovery audit script.
- Review every changed page at desktop, 390px, and 320px widths in both themes.
- Have a separate reviewer check every claim against the fact sheet and the rules above.
- After the merge, confirm the live pages return the changed copy.
