> Historical first pass. Superseded by [the deep review](../website-audit.md); its conclusion was too strong for its evidence.

# Website audit and corrections — 7 October 2026

## Verdict

The homepage and five fund pages now make a clear enough commercial case for a small targeted outreach test: fund operations software, familiar recurring work, inspectable examples, and an explicit next step. The brand is coherent and distinctive. The examples give a buyer substance to inspect instead of relying on decorative claims.

This is an expert/agent judgment, not demonstrated conversion or a claim that prospects understand every section in a second. The next material sales asset is evidence from an actual Cosimo run. These authored examples explain the offer; they cannot establish execution quality or time saved.

## Review process

Three independent agents reviewed conversion/copy, interaction/accessibility, and sector-buyer credibility. The parent inspected the site in a real browser and reconciled findings. Two agents then challenged the revised copy and presentation again. No agent was asked to invent testimonials, benchmarks, integrations, or prospect feedback.

Original reviews and subsequent notes:

- [Conversion and messaging](conversion-audit.md)
- [Interaction and accessibility](interaction-audit.md)
- [Fund-buyer credibility](fund-buyer-audit.md)
- [Supporting-page cleanup](../supporting-page-audit.md)

Those reports include findings against the earlier version. The disposition below is the current state.

## Implemented corrections

| Finding | Change | Why it matters |
| --- | --- | --- |
| Product category required inference | Homepage explicitly calls Cosimo fund operations software and names its outputs; setup section says the first workflow is configured with the team | Buyers should not have to guess whether this is consulting, a portal, or outsourced administration |
| Primary action vague and unusually long | Homepage primary action is “See how it works”; secondary is “Discuss your workflow”. Final CTA across all six pages is “Email us about your workflow” | Visitors can predict the next action; no fake booking link or invisible submission flow |
| Contact invitation gave little payoff | Copy asks for the task, source records, and bottleneck, and explains discussing a first workflow to test | Makes the first conversation concrete without promising unverified timing or free work |
| Homepage headings described the page vaguely | “Your next investor report. Without the copy-paste.” and “Reports, updates, and investor replies.” | Familiar work and benefit replace abstract language |
| Desktop CTA separated from proposition | Brought actions closer to copy and shortened surplus hero space | Main action is easier to find; the next section begins sooner |
| Supporting copy and controls too faint/small | Stronger homepage muted text, darker text on sector report paper, larger essential labels, buttons, and report copy | Improves scanning and legibility while retaining the palette and fonts |
| Invisible mobile navigation could receive focus | Closed drawers now use inert; open drawers contain focus, hide background from interaction, handle Escape, and clean up on resize | Keyboard users remain in the visible interface |
| Legacy pages retained the same menu problem | Shared page-chrome.js supplies accessible navigation and guarded theme preferences for FAQ, About, Privacy, and Terms | The experience remains coherent after visitors leave the sales pages |
| Narrow homepage tables lacked keyboard access | Actual overflowing tables gain focus, region labels, and visible scroll hints; updates run on resize, font readiness, and document/step changes | Figures stay inspectable on narrow screens |
| Focus outlines failed on dark backgrounds/light paper | Surface-specific outline colors | Focus remains visible in both themes |
| Six-page LP report mixed investor and internal material | RE/VC/PE reader wrappers, chapter labels, page headers, and result cards identify investor pages 1–4 and internal checks 5–6; credit/hedge audiences also explicit | Avoids implying that an all-investor ledger or internal questions go to every LP |
| Internal instructions remained in VC/PE investor prose | Second pass moved staff instructions into page 6 and left factual uncertainty in investor drafts | The audience boundary is substantive, not just a label |
| Capital demonstration implied full reconciliation | Labels narrowed to contribution/distribution roll-forwards; RE hero uses “After capital movements”; income/valuation exclusions preserved | Describes the demonstrated calculation accurately |
| Hedge governance claim too absolute | Replaced “administrator owns official NAV” with approved figures and team review/sign-off | Avoids asserting a universal governance arrangement |
| VC/PE workflow lists lost sector specificity | VC includes portfolio monitoring; PE includes portfolio performance packs; matching previews/configuration updated | The differentiated pain shown in the example carries through to the offer |
| Demo qualification appeared too late | Fictional, prewritten status appears before comparisons, as well as below report readers | The illustration cannot be mistaken for a recorded product run |
| FAQ/About contradicted the offer | Removed unsupported speed, accuracy, security absolutes, and fixed pilot claims; FAQ structured data matches answers | One consistent sales story |
| Machine-readable summaries retained obsolete promises | Rewrote llms.txt and llms-full.txt | Old claims do not persist in alternate public content |
| Legacy navigation pointed to removed sections | FAQ, About, Privacy, and Terms point to current homepage anchors | Interested visitors reach relevant content |

Preserved: COSIMO wordmark, cream/charcoal/purple identity, existing font roles, Florentine fictional names, detailed reports, and the exact independent randomized typewriter engine/timings. No new dependencies, pricing promises, or live-product claims. Legal body text was not rewritten.

## Verification

- Build, modified JavaScript syntax, and whitespace checks pass.
- All ten built HTML pages have unique IDs and valid local asset links, page links, and fragment targets.
- Browser inspected homepage light/dark, desktop/laptop, 390px and 320px widths; sector pages at 320px and VC reader at 1440px.
- All five sector routes loaded with correct active tabs, six report chapters, and explicit email CTA. All six primary pages stayed within the 320px viewport.
- Verified updated VC/PE portfolio workflow disclosures and matching document previews.
- Verified report navigation to internal pages, page audience headers, and wrapping of long chapter names and contact buttons.
- Homepage source dialog and three-page report open; Escape closes; narrow table ArrowRight changes its scroll position. Stage selection displays the requested panel.
- Mobile homepage menu: hidden drawer inert, opening focus, Shift+Tab loop, Escape return. Supporting FAQ menu: background inert, Escape return, resizing to desktop restores normal navigation.
- Browser error entries inspected were wallet-extension conflicts, not site scripts. No emails were sent.
- Reduced-motion behavior was reviewed in source; an operating-system reduced-motion setting was not emulated in this pass. This is not a full assistive-technology or browser-matrix certification.

## Remaining work, in order

1. **Real product proof:** record a successfully tested workflow from the application using publishable inputs. Show differing source formats, one conflict/missing item, the generated report, human review, and the resulting document. State what was configured and what actually happened. Replace no evidence with invented savings figures.
2. **Deployment consistency:** align canonical, Open Graph, robots, sitemap, and public-domain references with the final deployed hostname. Existing home/support metadata uses cosimo.work; sector canonical URLs use medici.ai; sitemap omits sector routes. This audit did not deploy or change hosts.
3. **Lead handling:** verify info@medici.ai receives inquiries and assign ownership. The current MVP uses email with a visible address fallback; it has no booking/form backend or funnel measurement. Add those only with a real destination and a verified delivery path.
4. **Public disclosures:** confirm remaining Privacy/Terms security assertions and About's Google Calendar authorization disclosure against current application behavior before public launch. Their legal/OAuth bodies were intentionally preserved.
5. **Buyer validation:** give the revised page to actual target managers without explanation. Ask what Cosimo does, what work it replaces, what they would inspect next, and what they expect after contacting the team. Measure qualified inquiries from targeted outreach; agent consensus is not conversion evidence.

All work remains local on marketing/re-landing-page. No commit, push, deployment, or merge occurred in this audit.
