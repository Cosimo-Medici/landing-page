# Medici Website Rebuild — Task & Prompt List

Each task below is a self-contained prompt you can hand to Claude Code, or a manual task flagged with `[MANUAL]`. They're ordered by dependency — do them roughly in sequence, though some can run in parallel where noted.

---

## 1. HERO REWRITE — "No AI in AI"

**Who:** Claude Code (copywriting + HTML/CSS edit)
**Files:** `index.html`, `css/styles.css`

```
CONTEXT: I'm rebuilding the hero section of the Medici marketing website (index.html). The current hero says "Your fund's intelligence. Structured. Source-cited. Delivered." with a status line "Live with funds in PE, credit, and real estate."

GOAL: Rewrite the hero to never mention AI, intelligence, or technology above the fold. Lead with the OUTCOME — what the buyer gets — not what the technology is. The emotional register should be: confident, inevitable, adult. Think Apple's "1000 songs in your pocket" — not "5GB MP3 player."

DESIGN CONSTRAINTS:
- Keep the existing HTML structure: .hero-status, .hero-headline (with .h-large, .h-italic, .h-sub), .hero-ctas
- Keep EB Garamond for display, IBM Plex Mono for labels/status
- Accent color is --accent (#74418F purple), not red
- Light mode is default (data-theme="light")
- Keep the accent line, dot grid, background glyph, scanline texture — don't touch those

HEADLINE DIRECTION: The headline should make a Fund CFO or PE Investment Partner feel the pain of their current workflow and the relief of the alternative. Some territory to explore (don't use these verbatim, find something better):
- "Your fund's quarterly reporting. Done in minutes. Every number traced to source."
- "Every document. Every clause. Every number. Working for you right now."
- "The work your team dreads most. Done before lunch."
The italic line (h-italic) should carry the emotional punch. The sub line (h-sub) in IBM Plex Mono should be a concrete, specific proof point — not a tagline.

STATUS LINE: Change from "Live with funds in PE, credit, and real estate" to something that signals traction without being generic. Use specificity: number of documents processed, number of funds live, or a concrete operational metric.

CTAs: Keep "Request Pilot" as primary. Change secondary from "See the product" to something that pulls them into the interactive demo section below (which we'll be building as a mini Cosimo chat UI).

OUTPUT: Give me the updated HTML for just the <section class="hero"> block, and any CSS changes needed. Don't change any other sections.
```

---

## 2. REPLACE TERMINAL WITH MINI COSIMO CHAT UI

**Who:** Claude Code (major frontend work)
**Files:** `index.html`, `css/styles.css`, `js/main.js`
**Dependencies:** None (can run parallel with Task 1)

```
CONTEXT: The Medici marketing site (index.html) currently has a terminal-style demo section (.terminal-section) that shows CLI-style commands being typed out. We want to replace this with a mini version of our actual product's chat interface.

GOAL: Build an embedded mini Cosimo chat UI that replaces the current terminal section. This should look like a real chat application — message bubbles, not a terminal. It should feel like a window into the actual product.

VISUAL DESIGN — Match Our App's Design Language:
- The chat frame should have a subtle beveled/3D border treatment — light edge on top-left, dark edge on bottom-right (our app uses this retro-institutional aesthetic)
- Background: dark (#141413) even in light mode (like the current terminal does)
- Message bubbles: User messages right-aligned with --accent (#74418F) background. Cosimo messages left-aligned with dark surface background (#1A1A18)
- Cosimo avatar: small circle with "C" in IBM Plex Mono, accent-colored border
- Typography: IBM Plex Mono for the chrome/labels, Space Grotesk for message body text
- Source citations should appear as small, slightly dimmed footnote-style references below Cosimo's responses (e.g., "↳ LPA_AlpineIII_Final.pdf — p.34, §4.2(b)")
- When Cosimo "generates" a deliverable, show it as an artifact card — a small card with a file icon, filename, and a subtle accent-colored left border
- Include a top chrome bar with: three dots (macOS style), tab buttons for scenarios, and "cosimo v2.4.1" version label on the right (keep these from the current terminal)

BEHAVIOR — 3 Pre-Set Scenarios + CTA:
Keep the same 3 tabs: "Due Diligence" / "LP Reporting" / "Rent Roll"

Each scenario should auto-play as a conversation:
1. User message appears (fade in, no typing animation needed for user)
2. Brief "thinking" indicator (subtle pulsing dots, not a spinner)
3. Cosimo response streams in (fade in line by line, ~300ms between lines)
4. Citations appear below the response
5. If there's a deliverable, the artifact card slides in
6. Next user message appears after a pause

The conversation content should be THE SAME as the current terminal demos but reformatted as natural chat messages instead of CLI commands. For example:
- Terminal: `load --fund "Alpine Capital III"` → Chat: a system context indicator showing "Alpine Capital III · 847 documents · 2.4GB"
- Terminal: `medici λ "What are our co-invest obligations?"` → Chat: user bubble "What are our co-invest obligations to LPs?"
- Terminal response lines → Cosimo response bubble with the same content but formatted as prose, with citations as footnotes

Below the chat frame, add a CTA: "Try Cosimo with sample data →" styled as a text link (not a button), IBM Plex Mono, accent-colored. This will eventually link to the sandbox UX (for now, use href="#" as placeholder).

TECHNICAL:
- Replace the entire .terminal-section with the new component
- The auto-play should trigger when the section scrolls into view (use the existing ScrollTrigger pattern from main.js)
- Tab switching should reset and replay the selected scenario
- Keep the introductory text above: "Ask anything. Get the work delivered." with the "COSIMO — Applied Intelligence / Live product · Not a mockup" label
- The chat frame should be generous in width (same full-width approach as the current terminal)
- Ensure the dark chat frame works in both light and dark mode

WHAT NOT TO DO:
- Don't add any new npm dependencies or external scripts beyond what's already loaded (GSAP, Lenis)
- Don't use any inline styles
- Don't break the existing scroll animations for other sections
- Don't change the nav, hero, or any section below the terminal
```

---

## 3. REWRITE QUOTE SECTION — SPECIFICITY AS CREDIBILITY

**Who:** Claude Code (copywriting + HTML/CSS edit)
**Files:** `index.html`, `css/styles.css`

```
CONTEXT: The Medici marketing site has a quotes section (.quotes-section) with three anonymous client quotes. The clients cannot be named due to strict privacy requirements. This is non-negotiable.

GOAL: Rewrite the quotes to maximize credibility WITHOUT naming anyone. The technique is: specificity as a proxy for credibility. A quote with operational detail reads as real even without a name. A vague quote reads as fabricated even with a name.

ALSO: Add a single-line framing sentence above the quotes grid that turns the anonymity into a trust signal. Something in the territory of: "We don't name our clients. They prefer it that way." — Set in IBM Plex Mono, small caps, accent-colored, centered above the grid. This should feel like a quiet, confident aside.

CURRENT QUOTES (rewrite all three):

Quote 1: "A workflow that previously took 40 hours per asset now completes in 15 minutes. That's not an efficiency gain — it's a different way of operating."
— Tax & Real Estate PE Fund, NYC

Quote 2: "One team member threatened to quit if we didn't keep the system. We've never had that reaction to software before."
— COO, Multi-Strategy Fund

Quote 3: "We expected a six-month migration. The system was live in 24 hours. Our compliance team had source-cited answers the same week."
— Director of Operations, Credit Fund

REWRITE RULES:
- Make each quote more operationally specific. Include concrete details: team sizes, time frames, specific document types, specific workflows. The more specific, the more believable.
- Attribution format: Use role + fund type + a humanizing detail. Not "COO, Multi-Strategy Fund" but something like "VP of Fund Accounting, $1.2B real estate PE fund — 3-person finance team." The detail makes it feel real.
- Keep the emotional core of each quote — the "threatened to quit" energy is gold, keep that one largely intact.
- Tone should be how these people actually talk — direct, no-nonsense, slightly dry. These are finance professionals, not marketers.

OUTPUT: Updated HTML for the .quotes-section only. Keep the existing CSS class structure.
```

---

## 4. REWRITE ARCHITECTURE SECTION — TRUST, NOT TECH

**Who:** Claude Code (copywriting + HTML/CSS edit)
**Files:** `index.html`, `css/styles.css`

```
CONTEXT: The Medici site has an architecture section (.arch-section) with the header "Three things generic AI will never do for your fund" and three cards: Data Integrity, Compounding Workflows, Full-Stack Execution.

GOAL: Rewrite this section so the content focuses on what the architecture MEANS FOR THE BUYER, not how the technology works. The current copy is decent but leans too technical. Reframe everything through the lens of trust, risk, and competitive advantage.

NEW HEADER: Keep the "Three things..." framing but make it sharper. Current: "Three things generic AI will never do for your fund." This is good but could hit harder. Explore: "Three reasons your competitors can't use ChatGPT for this." or "Why this isn't ChatGPT with a finance skin." — pick the one that creates the most productive discomfort.

CARD REWRITES:

Card 1 — Currently "Data Integrity" (graph architecture story)
Reframe around: YOUR DATA STAYS YOURS. The message should be about data segregation, privacy, and the fact that their proprietary methodology/processes never train another client's system. Their competitive advantage stays theirs. Address the real fear: "If I put my deal flow into an AI, am I feeding my competitors?" Answer: No. Structurally, not by policy.

Card 2 — Currently "Compounding Workflows" (learning story)
Reframe around: IT GETS SMARTER AT YOUR WORK. The message should be about the compounding advantage — month 1 vs. month 12. Every query, every correction, every preference makes the system better at THIS firm's specific processes. This is the moat story: "The more you use it, the harder it is to leave — not because of lock-in, but because nothing else knows your operations this well."

Card 3 — Currently "Full-Stack Execution" (question-to-deliverable story)
Reframe around: THE WORK, DONE. Not analysis, not insights, not suggestions — the actual deliverable. The LP letter. The K-1 package. The rent roll extraction. Source-cited, audit-ready, in the format your team already uses. Make it concrete with specific document types from the personas (LP letters, K-1s, rent rolls, board packages, compliance reports).

DESIGN: Don't change the visual structure (3-column grid, card hover effects, numbering system). Only change the text content.

OUTPUT: Updated HTML for the .arch-section only.
```

---

## 5. REDESIGN CTA AS A STRUCTURED PILOT SECTION

**Who:** Claude Code (HTML/CSS, significant design work)
**Files:** `index.html`, `css/styles.css`

```
CONTEXT: The Medici site's CTA section (.cta-section) currently has "See what Medici does with your data" and links to mailto:hello@medici.ai. This is generic and low-confidence for a $10-15K/month product.

GOAL: Replace the CTA with a structured pilot description that reduces perceived risk and demonstrates operational maturity. The pilot IS the product at this stage — treat it like one.

NEW STRUCTURE:

1. SECTION HEADER
- Label: "Start a Pilot" (IBM Plex Mono, accent-colored, caps)
- Headline: Something in the territory of "See what Medici does with your data." (keep this — it's good) or "Four weeks. Your data. Your workflows. You'll know." — pick what feels most confident without being arrogant.

2. PILOT TIMELINE — 3 Steps
Display as a horizontal 3-column layout (similar visual treatment to the architecture cards — border grid, clean numbering). Each step:

Step 1: "Discovery" (or "Scoping Call")
- Duration: "30 minutes"
- Description: We learn your workflows, your pain points, your documents. You learn how Cosimo works. No slide deck — we use the call to configure your pilot.

Step 2: "Data Onboarding"
- Duration: "1 week"
- Description: Your data goes into a dedicated, segregated instance. We configure Cosimo for your fund's document types, naming conventions, and reporting formats.

Step 3: "Live Pilot"
- Duration: "3 weeks"
- Description: Your team uses Cosimo on real work. We measure time saved, accuracy, and adoption. At the end, you'll know if this changes how your fund operates.

3. CONFIDENCE STATEMENT
Below the timeline, a single line that addresses the #1 buying objection (risk of commitment): "No annual contract. No integration project. No IT involvement required. If it doesn't change how your fund operates, walk away."
- Style: IBM Plex Mono, slightly larger than labels, centered, dimmed color (--cream-dim)

4. CTA BUTTON
- Primary: "Schedule Discovery Call" → link to a Calendly or similar (use href="#" for now)
- Secondary: "hello@medici.ai" as a text link (for people who prefer email)

5. MOVE INEVITABILITY LINE
The current .inevitability-section ("Every fund will work this way. The question is when yours starts.") should move to just ABOVE the CTA section, not below the use cases. It serves as the emotional bridge into the ask. Style it the same way — centered, EB Garamond, slightly reduced opacity.

DESIGN NOTES:
- The timeline cards should use the same border/grid treatment as .arch-grid (1px borders, no gaps, clean institutional feel)
- Step numbers should use the .arch-card-num style (IBM Plex Mono, small, accent-colored)
- Duration labels should feel like metadata (IBM Plex Mono, small, dimmed)
- Keep generous padding — this section should breathe
- Must work in both light and dark mode

OUTPUT: Updated HTML for the .inevitability-section (moved) and .cta-section (rebuilt). Include any new CSS needed.
```

---

## 6. REWRITE PAIN SECTION WITH ONE DEVASTATING EXAMPLE

**Who:** Claude Code (copywriting + HTML/CSS)
**Files:** `index.html`, `css/styles.css`

```
CONTEXT: The Medici site has a "pain section" (.pain-section) with the headline "Your analysts spend 60% of their time finding information, not using it" and three stats: 40+ hours per asset, 6 months for new hire ramp, $170K+ in tool sprawl.

GOAL: Replace the generic stats grid with ONE specific, detailed operational story that makes the target buyer see their own life in it. Specificity is persuasion. Vague claims are ignored; concrete stories are believed.

APPROACH: Pick ONE workflow that is universally painful for the primary persona (Fund CFO / Finance Director). The best candidate is quarterly LP reporting or K-1 season — these are universal, time-bounded nightmares.

Write it as a narrative contrast:

LEFT SIDE — "The way it works now" (or "Today")
Walk through the actual steps a 3-person fund accounting team goes through to produce a quarterly LP report. Be painfully specific: the Excel files, the PDF extractions, the email chains, the version control hell, the 2am nights, the manual cross-referencing. Use concrete numbers: "47 Excel tabs. 12 PDF statements. 3 weeks of your team's time."

RIGHT SIDE — "The way it could work" (or "With Cosimo")
Same deliverable, same quality, radically different process. One conversation. Source-cited. Audit-ready. "15 minutes. Same report. Every number traced."

DESIGN:
- This should be a two-column layout, not a stats grid. Left column and right column, separated by a thin vertical line or accent border.
- Left side should feel heavy, dense, slightly oppressive (more text, tighter spacing, maybe dimmed color)
- Right side should feel clean, spacious, light (less text, more breathing room, slightly brighter)
- The visual contrast between the two columns IS the message
- Keep the section label "The Status Quo" in IBM Plex Mono above
- Remove the headline or change it to something shorter that frames the comparison

OUTPUT: Rewritten HTML for .pain-section with the new two-column contrast layout. Include CSS for the new layout.
```

---

## 7. ADD FOUNDER'S NOTE — INSTITUTIONAL AUTHORITY WITHOUT PHOTOS

**Who:** Claude Code (HTML/CSS) + `[MANUAL]` Tina writes the actual copy
**Files:** `index.html`, `css/styles.css`

```
CONTEXT: The Medici site needs to answer "who are these people?" without a team page or headshots. The team is young and doesn't want to be judged on appearance. But a $10-15K/month product that touches sensitive fund data needs SOME human signal.

GOAL: Add a small "founder's note" section between the quotes and the CTA. Not a team page — a first-person note from the founder(s) that demonstrates domain fluency. No photos.

DESIGN:
- Minimal section. No cards, no grid. Just text.
- Section label: "From the founders" (IBM Plex Mono, accent-colored, small caps)
- The note itself: 3-5 sentences in Space Grotesk (body font), regular weight, comfortable reading width (max-width ~650px), centered or left-aligned
- Sign-off: First names only, no titles. "— [Name] & [Name]" in IBM Plex Mono, dimmed
- Optional: A single line below the names with brief credibility markers — not bios, just signal. E.g., "Previously: [notable firm/company]. Backed by [investor if notable]." — IBM Plex Mono, very small, very dimmed. Only include if there are real credentials to cite.
- This section should feel quiet and personal against the more designed sections around it
- Use borders and spacing consistent with the rest of the page

PLACEHOLDER COPY (Tina will rewrite):
"We built Medici because we sat in the seats our clients sit in. We know what it's like to reconcile a waterfall at 2am because an LP noticed a discrepancy. We know what gets lost when your best analyst leaves. This isn't a technology company that decided to serve finance. It's a finance team that decided to build the infrastructure we wished existed."

OUTPUT: New HTML section to insert between .quotes-section and the CTA. Include CSS.

[MANUAL — TINA]: Rewrite the placeholder copy in your own voice. The goal is to demonstrate that you understand the operational reality of fund work — the specific pain, the specific stakes — at a level that makes a Fund CFO think "these people have done this work." Don't talk about AI or technology. Talk about the problem. 3-5 sentences max.
```

---

## 8. BUILD THE SANDBOX LANDING PAGE

**Who:** Claude Code (new HTML page) + `[MANUAL]` connect to actual sandbox
**Files:** New file: `sandbox.html` (or wherever the sandbox will live)
**Dependencies:** Task 2 (the CTA link from the mini chat needs somewhere to go)

```
CONTEXT: The mini Cosimo chat demo on the main site has a "Try Cosimo with sample data →" CTA. We need a landing page that bridges to the actual sandbox UX (which already exists behind the scenes with fake data).

GOAL: Create a simple bridge page that:
1. Sets expectations for what they're about to see
2. Provides 30 seconds of context so they're not lost
3. Launches them into the sandbox

CONTENT:
- Headline: "Cosimo — Sample Environment" (or similar, keep it functional not salesy)
- Brief (3-4 lines max): "This is a working instance of Cosimo loaded with sample fund data — a fictional $800M PE fund with 12 portfolio companies. You can ask questions, run workflows, and see how source-cited answers are generated. Nothing here is your data."
- A few suggested starting prompts, styled as clickable chips: e.g., "What are our co-invest obligations?", "Generate Q3 LP performance summary", "Extract rent rolls from the uploaded PDFs"
- Single CTA: "Enter sandbox →" (links to actual sandbox URL — use # as placeholder)
- Small footer note: "Want to see this with your data? [Request a pilot →]" linking back to the main site CTA

DESIGN:
- Same visual language as the main site: EB Garamond for headings, IBM Plex Mono for labels, Space Grotesk for body
- Same color tokens (--accent purple, etc.)
- Keep it minimal — this is a utility page, not a marketing page
- Dark mode only is fine here (matches the product aesthetic)
- Scanlines + noise texture, same as main site

OUTPUT: Complete sandbox.html file with inline styles (single-file, self-contained).
```

`[MANUAL — TINA]`: Once this page exists, connect the "Enter sandbox →" button to your actual sandbox UX URL. Update the "Try Cosimo with sample data →" link in the main site's chat demo section to point to sandbox.html.

---

## 9. USE CASES — TIGHTEN AND ADD PERSONA HOOKS

**Who:** Claude Code (copywriting edit)
**Files:** `index.html`

```
CONTEXT: The Medici site has a use cases section (.cases-section) with 4 cards: Due Diligence, Regulatory Filing, Investor Relations, Portfolio Monitoring. The copy is decent but generic.

GOAL: Rewrite each card to include a persona hook — a one-line description of WHO this matters to, using language from the Medici client personas. This helps the buyer self-identify. Also tighten the descriptions to be more concrete.

REWRITE RULES:
- Add a small persona tag above each card title (IBM Plex Mono, very small, dimmed). Examples: "For Investment Partners & Associates", "For Fund CFOs", "For IR Teams", "For Fund Accounting"
- Each description should include ONE concrete before/after metric that's believable (not "90% faster" — that reads as made up. Instead: "Data room of 1,200 documents organized and searchable in under 2 hours, not 2 weeks.")
- Keep descriptions short — 2-3 sentences max
- Keep stat values and labels but update them to be more specific if the current ones are vague

CURRENT CARDS (for reference):
01 Due Diligence — "Data rooms ingested. Financials and legal data extracted, structured, ready. Your team focuses on judgment." — 90% faster extraction
02 Regulatory Filing — "Form ADV, K-1s, compliance docs — pre-populated with validated, source-traced data. Days become hours." — Days→Hrs
03 Investor Relations — "LP asks about terms? Ask Medici. Source-cited answer in seconds, ready to forward." — 800+ files searchable
04 Portfolio Monitoring — "Allocation drift, covenant compliance, waterfalls — flagged automatically, every number auditable." — Real-time

OUTPUT: Updated HTML for the .cases-section cards only. Don't change the grid structure or visual design.
```

---

## 10. MOBILE RESPONSIVENESS AUDIT

**Who:** Claude Code (CSS)
**Files:** `css/styles.css`
**Dependencies:** Tasks 2, 5, 6 (wait for new sections to be built)

```
CONTEXT: After all the above changes are implemented, the site needs a mobile responsiveness pass. The current site has responsive breakpoints at 1024px, 768px, 640px, and 380px.

GOAL: Audit and fix all new sections for mobile. Specifically:

1. MINI CHAT UI (from Task 2):
- On mobile (<640px), the chat frame should be full-width with reduced padding
- Message bubbles should have max-width: 90% (not the desktop max-width)
- Font sizes in chat should scale down slightly
- The scenario tabs should be horizontally scrollable (like the current terminal tabs)

2. PAIN SECTION TWO-COLUMN (from Task 6):
- On mobile (<768px), the two columns should stack vertically: "Today" on top, "With Cosimo" below
- The vertical dividing line should become a horizontal one

3. CTA PILOT TIMELINE (from Task 5):
- On mobile (<768px), the 3 columns should stack vertically
- Each step should have a horizontal line connecting to the next (visual continuity)

4. FOUNDER'S NOTE (from Task 7):
- Should naturally reflow — just verify padding and font sizes

5. GENERAL:
- Verify all text is readable at 320px width
- Verify no horizontal overflow on any section
- Verify touch targets are at least 44px
- Verify the chat demo plays correctly on mobile

OUTPUT: Updated CSS media queries in styles.css. Don't change any desktop styles.
```

---

## 11. PERFORMANCE & POLISH PASS

**Who:** Claude Code
**Files:** All site files
**Dependencies:** All previous tasks

```
CONTEXT: Final cleanup pass on the site after all content and structural changes.

CHECKLIST:
1. Remove any unused CSS rules left over from the old terminal section
2. Verify all GSAP ScrollTrigger animations still fire correctly for new/moved sections
3. Verify Lenis smooth scrolling works with the new interactive chat UI (scroll events inside the chat frame shouldn't conflict with page scroll)
4. Verify both light mode and dark mode work for every section — test every background, text color, border, and interactive state
5. Verify the theme toggle correctly switches all new sections
6. Check that all links work (or have placeholder # hrefs with a comment noting they need real URLs)
7. Minify? No — keep readable for now, we're still iterating
8. Add appropriate meta tags if missing:
   - og:title, og:description, og:image for social sharing
   - Verify the existing meta description is still accurate given the new copy
9. Verify favicon exists (or note that one is needed)
10. Run Lighthouse and fix any accessibility issues flagged

OUTPUT: A summary of what was changed/fixed, and any remaining issues that need manual attention.
```

---

## 12. `[MANUAL]` CONTENT & COPY REVIEW

**Who:** Tina
**Dependencies:** All Claude Code tasks complete

Tina — once all the above is built, do a pass through the full site and check:

- [ ] Does the hero headline land? Read it fresh. Does it make you feel something?
- [ ] Does the mini Cosimo chat demo feel like the real product? Is anything off about the conversation content?
- [ ] Do the quotes sound like things your clients actually said? Fix any phrasing that sounds like marketing.
- [ ] Does the founder's note sound like you? Rewrite it if it doesn't.
- [ ] Does the pilot CTA section feel too structured / too rigid? Or does it reduce anxiety?
- [ ] Read the entire page on your phone. Does anything feel broken or cramped?
- [ ] Have someone outside the company read it cold. What's their first reaction? What do they remember?
- [ ] Does the "Every fund will work this way" line still land in its new position (above the CTA)?

---

## 13. `[MANUAL]` CONNECT REAL INFRASTRUCTURE

**Who:** Tina / engineering
**Dependencies:** Task 8

- [ ] Connect "Schedule Discovery Call" CTA to actual Calendly (or meeting scheduler)
- [ ] Connect "Try Cosimo with sample data →" to actual sandbox UX
- [ ] Set up hello@medici.ai if not already active
- [ ] Set up domain, hosting, SSL for the live site
- [ ] Add analytics (Plausible, Fathom, or similar privacy-respecting option — not GA, your buyers will notice)
- [ ] Consider adding a simple "How did you hear about us?" field to the pilot request flow

---

## PRIORITY ORDER (if you need to ship fast)

If you need to get the biggest impact with the least work, do these first:

1. **Task 1** (Hero rewrite) — 30 min, biggest first-impression impact
2. **Task 3** (Quote rewrite) — 30 min, pure copy, high credibility impact
3. **Task 5** (CTA redesign) — 1-2 hrs, directly affects conversion
4. **Task 4** (Architecture rewrite) — 30 min, pure copy
5. **Task 2** (Mini Cosimo chat) — 4-6 hrs, biggest "wow" differentiator
6. **Task 6** (Pain section redo) — 2-3 hrs, strong but less critical

Everything else is polish and extension. Tasks 1, 3, 4, and 5 together are maybe 3 hours of work and would dramatically improve the site without touching the overall structure.
