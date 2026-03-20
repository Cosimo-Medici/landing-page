# Medici Site Rebuild — Copy-Paste Prompts for Claude Code

## How to use this document

Each section below is a **standalone prompt** you can copy-paste directly into Claude Code. They are ordered by dependency — do them roughly in this order. Some can be run in parallel (noted where applicable).

Before each prompt I've noted:
- **What it does** — plain English summary
- **Files it touches** — so you know what's changing
- **Time estimate** — rough guess
- **Can run parallel with** — if applicable

After each Claude Code prompt, **open the site in your browser and check it looks right** before moving to the next one.

---
---

## PROMPT 1: Rewrite the Hero Section

**What it does:** Rewrites the hero headline, status line, and CTAs to lead with outcomes instead of technology. No mention of AI above the fold.
**Files it touches:** `index.html` (lines 23-50 only)
**Time estimate:** 5-10 minutes
**Can run parallel with:** Nothing — do this first

### Copy-paste this into Claude Code:

```
I need you to rewrite the hero section of my marketing site. The file is `index.html`. You are ONLY changing the content inside lines 23-50 (the <section class="hero"> block). Do not touch any other section, any CSS, or any JS.

Here is the current hero HTML:

<section class="hero">
  <div class="hero-glyph">M</div>
  <div class="hero-dots"></div>
  <div class="hero-accent-line"></div>
  <div class="hero-content">
    <div class="hero-status">
      <span class="status-dot"></span>
      Live with funds in PE, credit, and real estate
    </div>
    <h1 class="hero-headline">
      <div class="h-line"><span class="h-large">Ask your fund</span></div>
      <div class="h-line"><span class="h-italic">anything.</span></div>
      <div class="h-line"><span class="h-sub">Every document. Every clause. Every number. Source-cited in seconds.</span></div>
    </h1>
  </div>

  <div class="hero-bottom">
    <div class="hero-ctas">
      <a href="#contact" class="btn-main">Start a Pilot</a>
      <a href="#product" class="btn-line">See It Work</a>
    </div>
    <div class="hero-scroll-hint">
      <span class="scroll-line"></span>
      Scroll
    </div>
  </div>
</section>

WHAT TO CHANGE:

1. STATUS LINE (the text after <span class="status-dot"></span>):
   Change "Live with funds in PE, credit, and real estate" to something more specific that signals traction. Use a concrete number or operational metric. Example direction: "Processing 50,000+ fund documents across 12 active deployments" — but write something that sounds real and earned, not inflated. Keep it short (under 12 words).

2. HEADLINE — the key change:
   Rewrite the h-large and h-italic lines. The current "Ask your fund / anything." is fine but frames us as a search tool. We are a DOING tool — we produce deliverables, not just answers.

   The new headline should:
   - Never mention AI, intelligence, machine learning, or any technology
   - Lead with the OUTCOME the buyer gets (time back, deliverables done, institutional knowledge preserved)
   - Feel confident and inevitable, not excited or salesy
   - Work emotionally for a Fund CFO or PE Investment Partner who is exhausted by manual work

   The h-large line should be the setup, the h-italic line should be the emotional punch.

   Some directions to explore (don't use these verbatim — find something better):
   - "Your fund's hardest work. / Done before lunch."
   - "Quarterly close in minutes. / Every number traced to source."
   - "The work your team dreads. / Finished."

3. SUB LINE (the h-sub span):
   This should be a concrete proof point, not a tagline. Something specific and operational. Example direction: "LP reports. K-1 packages. Rent roll extractions. Source-cited. Audit-ready." — short, punchy, concrete document types that make a fund person nod.

4. PRIMARY CTA: Keep "Start a Pilot" — it's good.

5. SECONDARY CTA: Change "See It Work" to "Watch it work ↓" (pointing down to the demo section below). Keep href="#product".

IMPORTANT:
- Keep ALL existing classes, IDs, and HTML structure exactly as-is
- Keep the hero-glyph, hero-dots, hero-accent-line untouched
- Keep the hero-scroll-hint untouched
- Only change text content inside the existing elements
- Do not add any new HTML elements or CSS classes
```

---
---

## PROMPT 2: Replace the Terminal with a Mini Chat UI

**What it does:** Replaces the CLI-style terminal demo with a chat interface that looks like our actual product. Same 3 scenarios, but displayed as a conversation instead of command-line output.
**Files it touches:** `index.html` (lines 52-83), `css/styles.css` (adds new styles, removes old terminal styles), `js/main.js` (replaces terminal demo logic)
**Time estimate:** 30-60 minutes (this is the big one)
**Can run parallel with:** Prompt 1 (different sections)

### Copy-paste this into Claude Code:

```
I need you to replace the terminal/CLI demo section on my marketing site with a chat UI that looks like our actual product. This is a significant change that touches `index.html`, `css/styles.css`, and `js/main.js`.

## CURRENT STATE

In `index.html`, lines 52-83 contain a terminal section with:
- An intro header ("Ask anything. Get the work delivered.")
- A fake terminal window with macOS dots, tabs (Due Diligence / LP Reporting / Rent Roll), and a version label
- A terminal body that shows CLI-style typed commands and responses

In `js/main.js`, the `demos` array (starting around line 297) contains 3 demo scenarios as arrays of typed terminal lines. The `runDemo()` function types them out character by character.

## WHAT I WANT INSTEAD

Replace the terminal with a **chat UI** that looks like a real messaging interface. Same 3 scenarios, same tab switching, but displayed as a conversation between a user and "Cosimo" (our AI).

### HTML Structure

Replace everything inside `<section class="terminal-section" id="product">` with:

1. Keep the intro text above the frame:
   - Left side: "Ask anything. Get the work delivered." (keep as <h2> with <em> on "work")
   - Right side: "COSIMO — Applied Intelligence / Live product · Not a mockup" (keep the same)

2. The chat frame should have this structure:
   ```html
   <div class="chat-frame">
     <!-- Top chrome bar (keep macOS dots, tabs, version label) -->
     <div class="chat-chrome">
       <div class="term-dots"><!-- 3 colored dots --></div>
       <div class="chat-tabs">
         <button class="chat-tab active" data-demo="0">Due Diligence</button>
         <button class="chat-tab" data-demo="1">LP Reporting</button>
         <button class="chat-tab" data-demo="2">Rent Roll</button>
       </div>
       <span class="chat-version">cosimo v2.4.1</span>
     </div>

     <!-- Chat body -->
     <div class="chat-body" id="chat-body">
       <!-- Messages get injected here by JS -->
     </div>

     <!-- Fake input bar at bottom (non-functional, just visual) -->
     <div class="chat-input-bar">
       <span class="chat-input-placeholder">Ask Cosimo anything...</span>
     </div>
   </div>
   ```

3. Below the chat frame, add a CTA link:
   ```html
   <div class="chat-try-cta">
     <a href="#">Try Cosimo with sample fund data →</a>
   </div>
   ```

### CSS Design — Make It Look Like a Real Chat App

Add these styles to `css/styles.css`. The chat frame should ALWAYS be dark (even in light mode), just like the current terminal.

```
/* === CHAT DEMO === */
.chat-frame {
  background: #141413;
  border: 1px solid rgba(237, 232, 223, 0.1);
  overflow: hidden;
  position: relative;
}

/* Top accent border — purple gradient, same as old terminal */
.chat-frame::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #74418F, #74418F 30%, transparent 100%);
  opacity: 0.6;
}

/* Chrome bar */
.chat-chrome {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(237, 232, 223, 0.06);
  background: #1A1A18;
}

/* Reuse term-dots from existing CSS — no changes needed */

/* Tabs — same style as old terminal tabs */
.chat-tabs {
  display: flex;
  gap: 0;
  margin-left: 2rem;
}

.chat-tab {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 1.25rem;
  color: rgba(237,232,223,0.25);
  border: 1px solid transparent;
  border-bottom: none;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  background: transparent;
}

.chat-tab.active {
  color: #EDE8DF;
  background: #141413;
  border-color: rgba(237, 232, 223, 0.1);
  border-bottom: 1px solid #141413;
  margin-bottom: -1px;
}

.chat-tab:hover:not(.active) {
  color: rgba(237,232,223,0.5);
}

.chat-version {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.1em;
  color: rgba(237,232,223,0.15);
  margin-left: auto;
  text-transform: uppercase;
}

/* Chat body */
.chat-body {
  padding: 2rem 2.5rem 1.5rem;
  min-height: 420px;
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* Hide scrollbar but keep functionality */
.chat-body::-webkit-scrollbar { width: 4px; }
.chat-body::-webkit-scrollbar-track { background: transparent; }
.chat-body::-webkit-scrollbar-thumb { background: rgba(237,232,223,0.1); border-radius: 2px; }

/* === MESSAGE BUBBLES === */

.chat-msg {
  display: flex;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.chat-msg.visible {
  opacity: 1;
  transform: translateY(0);
}

/* User messages — right aligned */
.chat-msg.user {
  flex-direction: row-reverse;
}

/* Avatar */
.chat-avatar {
  width: 24px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  font-weight: 500;
  flex-shrink: 0;
  margin-top: 2px;
}

.chat-avatar.cosimo {
  background: rgba(116, 65, 143, 0.2);
  color: #74418F;
  border: 1px solid rgba(116, 65, 143, 0.3);
}

.chat-avatar.user {
  background: rgba(237, 232, 223, 0.08);
  color: rgba(237, 232, 223, 0.5);
  border: 1px solid rgba(237, 232, 223, 0.1);
}

/* Message content */
.chat-bubble {
  max-width: 75%;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  line-height: 1.65;
  font-weight: 300;
}

.chat-msg.user .chat-bubble {
  background: rgba(116, 65, 143, 0.15);
  border: 1px solid rgba(116, 65, 143, 0.2);
  color: #EDE8DF;
  padding: 0.75rem 1rem;
  border-radius: 2px;
}

.chat-msg.cosimo .chat-bubble {
  color: rgba(237, 232, 223, 0.85);
  padding: 0.5rem 0;
}

/* Context indicator — shows fund name/doc count at start */
.chat-context {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  color: rgba(237, 232, 223, 0.3);
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(237, 232, 223, 0.06);
  background: rgba(237, 232, 223, 0.02);
  border-radius: 2px;
  margin-bottom: 0.5rem;
}

/* Citation references below AI responses */
.chat-citations {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.chat-cite {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.03em;
  color: rgba(237, 232, 223, 0.2);
}

/* Artifact card — when Cosimo generates a deliverable */
.chat-artifact {
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(46, 204, 113, 0.06);
  border: 1px solid rgba(46, 204, 113, 0.15);
  border-left: 3px solid #2ECC71;
  border-radius: 2px;
}

.chat-artifact-icon {
  font-size: 0.9rem;
  color: #2ECC71;
}

.chat-artifact-info {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.chat-artifact-name {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.03em;
  color: #EDE8DF;
}

.chat-artifact-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5rem;
  color: rgba(237, 232, 223, 0.3);
}

/* Thinking indicator */
.chat-thinking {
  display: flex;
  gap: 4px;
  padding: 0.5rem 0;
}

.chat-thinking-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(116, 65, 143, 0.4);
  animation: thinkPulse 1.4s ease-in-out infinite;
}

.chat-thinking-dot:nth-child(2) { animation-delay: 0.2s; }
.chat-thinking-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes thinkPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

/* Fake input bar */
.chat-input-bar {
  padding: 0.75rem 1.5rem;
  border-top: 1px solid rgba(237, 232, 223, 0.06);
  background: #1A1A18;
}

.chat-input-placeholder {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  color: rgba(237, 232, 223, 0.15);
  letter-spacing: 0.03em;
}

/* Try CTA below the frame */
.chat-try-cta {
  text-align: center;
  padding-top: 2rem;
}

.chat-try-cta a {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: #74418F;
  text-decoration: none;
  transition: color 0.3s;
}

.chat-try-cta a:hover {
  color: #9563AF;
}

/* === LIGHT MODE — keep chat frame dark === */
[data-theme="light"] .chat-frame {
  background: #141413;
  border-color: rgba(237, 232, 223, 0.1);
}
[data-theme="light"] .chat-frame::before {
  background: linear-gradient(90deg, #74418F, #74418F 30%, transparent 100%);
}
[data-theme="light"] .chat-chrome {
  background: #1A1A18;
  border-bottom-color: rgba(237, 232, 223, 0.06);
}
[data-theme="light"] .chat-input-bar {
  background: #1A1A18;
}
```

Also add mobile responsive rules:
```
/* Inside the existing @media (max-width: 640px) block */
.chat-tabs {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.chat-tabs::-webkit-scrollbar { display: none; }
.chat-tab {
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 0.55rem;
  padding: 0.4rem 0.8rem;
}
.chat-body {
  padding: 1.5rem;
  min-height: 350px;
}
.chat-bubble {
  max-width: 85%;
  font-size: 0.8rem;
}
```

### JavaScript — Replace the Terminal Demo Logic

In `js/main.js`, REMOVE the entire `demos` array, the `demoRunning` variable, the `runDemo()` function, and the ScrollTrigger that auto-starts the first demo. Replace ALL of that with the following:

```javascript
// ========== CHAT DEMOS ==========

const chatDemos = [
  // Demo 0: Due Diligence
  {
    context: "Alpine Capital III · 847 documents · 2.4GB indexed",
    messages: [
      {
        role: "user",
        text: "What are our co-invest obligations to LPs?"
      },
      {
        role: "cosimo",
        text: "Co-investment rights are offered pro-rata to LPs committing $25M or more, with a 10 business day notice period. Three provisions govern this across your documents:",
        citations: [
          "LPA_AlpineIII_Final.pdf — p.34, §4.2(b)",
          "SideLetter_Meridian_2024.pdf — p.7, ¶3",
          "IC_Memo_CoInvest_Policy.docx — p.2"
        ]
      },
      {
        role: "user",
        text: "Draft the co-invest notice for Meridian based on their side letter terms."
      },
      {
        role: "cosimo",
        text: "Done. I've generated the notice using Meridian's specific terms from their side letter — $25M commitment, pro-rata allocation, 10 business day response window. The notice references the relevant LPA sections and is formatted to match your previous correspondence.",
        artifact: {
          icon: "📄",
          name: "meridian_coinvest_notice.pdf",
          meta: "2 pages · Source-cited · Ready to send"
        }
      }
    ]
  },
  // Demo 1: LP Reporting
  {
    context: "Alpine Capital III · Q3 2025 reporting cycle",
    messages: [
      {
        role: "user",
        text: "Generate the quarterly performance summary for all LPs."
      },
      {
        role: "cosimo",
        text: "I've aggregated data across 12 portfolio companies and cross-referenced capital account statements. Key figures: Net IRR 18.3%, TVPI 1.42x, DPI 0.31x. 47 data points validated — no discrepancies found against source documents.",
        citations: [
          "NAV_Q3_2025_Final.xlsx — all tabs",
          "CapitalAccounts_Master.xlsx — Sheet: Fund III",
          "PortCo_Financials_Q3/ — 12 files"
        ]
      },
      {
        role: "user",
        text: "Format it as an LP letter using our standard template."
      },
      {
        role: "cosimo",
        text: "Generated using your Q2 letter as the template baseline. Performance tables, portfolio company summaries, and attribution analysis are all populated. Every figure traces back to source.",
        artifact: {
          icon: "📊",
          name: "Q3_2025_LP_Letter.pdf",
          meta: "8 pages · 47 citations · Matches your template"
        }
      }
    ]
  },
  // Demo 2: Rent Roll
  {
    context: "Summit RE Holdings · 8 properties · 23 rent roll PDFs uploaded",
    messages: [
      {
        role: "user",
        text: "Extract and standardize all the rent rolls I just uploaded."
      },
      {
        role: "cosimo",
        text: "Processed 23 PDFs across 8 properties. Extracted 1,847 unit records — standardized to: unit number, tenant, lease dates, base rent, and recoveries. I also flagged 12 discrepancies versus your prior quarter data: 3 expired leases with active tenants, and 9 rent amounts that don't match recent amendments.",
        citations: [
          "Portfolio rent rolls — 23 PDFs processed",
          "Prior quarter data — Q2_RentRoll_Master.xlsx",
          "Amendment files — 9 matched"
        ]
      },
      {
        role: "user",
        text: "Export to our underwriting model format."
      },
      {
        role: "cosimo",
        text: "Exported to your standard format. The discrepancy report is separate — each flag includes the source document, page number, and the specific inconsistency.",
        artifact: {
          icon: "📑",
          name: "portfolio_rentroll_master.xlsx",
          meta: "1,847 units · 8 properties · 12 flags"
        }
      }
    ]
  }
];

let chatRunning = false;

function runChatDemo(index) {
  if (chatRunning) return;
  chatRunning = true;

  // Update active tab
  document.querySelectorAll('.chat-tab').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  const body = document.getElementById('chat-body');
  body.innerHTML = '';

  const demo = chatDemos[index];
  const allSteps = []; // Flat list of things to render in sequence

  // First: context indicator
  allSteps.push({ type: 'context', text: demo.context });

  // Then: messages with thinking indicators between user->cosimo transitions
  demo.messages.forEach((msg, i) => {
    if (msg.role === 'cosimo') {
      allSteps.push({ type: 'thinking' });
    }
    allSteps.push({ type: 'message', ...msg });
  });

  let stepIndex = 0;

  function renderNext() {
    if (stepIndex >= allSteps.length) {
      chatRunning = false;
      return;
    }

    const step = allSteps[stepIndex];
    stepIndex++;

    if (step.type === 'context') {
      const el = document.createElement('div');
      el.className = 'chat-context';
      el.textContent = '▸ ' + step.text;
      el.style.opacity = '0';
      body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.3s ease';
        el.style.opacity = '1';
      });
      setTimeout(renderNext, 600);
      return;
    }

    if (step.type === 'thinking') {
      const el = document.createElement('div');
      el.className = 'chat-msg cosimo';
      el.innerHTML = `
        <div class="chat-avatar cosimo">C</div>
        <div class="chat-thinking">
          <div class="chat-thinking-dot"></div>
          <div class="chat-thinking-dot"></div>
          <div class="chat-thinking-dot"></div>
        </div>
      `;
      el.classList.add('visible');
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;

      // Remove thinking indicator after delay, then show the actual message
      setTimeout(() => {
        el.remove();
        renderNext();
      }, 1200);
      return;
    }

    // Message
    const el = document.createElement('div');
    el.className = `chat-msg ${step.role}`;

    const avatarClass = step.role === 'user' ? 'user' : 'cosimo';
    const avatarLetter = step.role === 'user' ? 'U' : 'C';

    let bubbleHTML = `<p>${step.text}</p>`;

    // Add citations if present
    if (step.citations && step.citations.length > 0) {
      bubbleHTML += '<div class="chat-citations">';
      step.citations.forEach(cite => {
        bubbleHTML += `<span class="chat-cite">↳ ${cite}</span>`;
      });
      bubbleHTML += '</div>';
    }

    // Add artifact if present
    if (step.artifact) {
      bubbleHTML += `
        <div class="chat-artifact">
          <span class="chat-artifact-icon">${step.artifact.icon}</span>
          <div class="chat-artifact-info">
            <span class="chat-artifact-name">${step.artifact.name}</span>
            <span class="chat-artifact-meta">${step.artifact.meta}</span>
          </div>
        </div>
      `;
    }

    el.innerHTML = `
      <div class="chat-avatar ${avatarClass}">${avatarLetter}</div>
      <div class="chat-bubble">${bubbleHTML}</div>
    `;

    body.appendChild(el);
    body.scrollTop = body.scrollHeight;

    // Fade in
    requestAnimationFrame(() => {
      el.classList.add('visible');
    });

    // Delay before next step — longer after AI responses, shorter after user
    const delay = step.role === 'cosimo' ? 1800 : 1000;
    setTimeout(renderNext, delay);
  }

  renderNext();
}

// Tab click handlers
document.querySelectorAll('.chat-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const index = parseInt(btn.getAttribute('data-demo'));
    runChatDemo(index);
  });
});

// Auto-start first demo when section scrolls into view
ScrollTrigger.create({
  trigger: '.chat-frame',
  start: 'top 70%',
  once: true,
  onEnter: () => setTimeout(() => runChatDemo(0), 500)
});
```

### ALSO DO THESE THINGS:

1. In `css/styles.css`, you can REMOVE all the old terminal-specific styles: `.terminal-frame`, `.term-chrome`, `.term-body`, `.term-line`, `.t-cursor`, `.cursor-blink`, `.p`, `.c`, `.d`, `.r`, `.g`, `.s`, `.gap`, and the light-mode overrides for terminal classes. Keep `.terminal-section`, `.terminal-intro`, `.terminal-intro-left`, `.terminal-intro-right`, `.terminal-stage` — just update class names in the HTML if needed.

2. In the light-mode CSS section, REMOVE all the `[data-theme="light"] .terminal-*` and `[data-theme="light"] .term-*` and `[data-theme="light"] .p`, `.c`, `.d`, `.r`, `.g`, `.s`, `.t-cursor`, `.cursor-blink` rules. They're no longer needed. The new light-mode rules for the chat frame are included above.

3. Make sure the GSAP scroll reveal for `.terminal-stage` still works (it should, since we're keeping that wrapper class).

4. Keep the GSAP animation for `.terminal-intro-right` — that's the "COSIMO — Applied Intelligence" label fade-in and it still applies.

### VERIFY:
- Open the page in a browser
- The chat frame should auto-play the first demo when you scroll to it
- Clicking tabs should switch between the 3 scenarios
- Both light mode and dark mode should look correct (the chat frame stays dark in both)
- On mobile (narrow viewport), tabs should scroll horizontally
- The "Try Cosimo with sample fund data →" link should appear below the frame
```

---
---

## PROMPT 3: Rewrite the Pain Section as a Before/After Comparison

**What it does:** Replaces the stats grid with a two-column "Today vs. With Cosimo" comparison showing one specific workflow (quarterly LP reporting).
**Files it touches:** `index.html` (lines 85-105), `css/styles.css`
**Time estimate:** 15-20 minutes
**Can run parallel with:** Prompts 1 and 2

### Copy-paste this into Claude Code:

```
I need you to redesign the pain section of my marketing site. The file is `index.html`, lines 85-105 (the <section class="pain-section"> block). You'll also need to add new CSS to `css/styles.css`.

## CURRENT STATE

The section has a label ("The Status Quo"), a headline, and a 3-column stats grid (40+ hours, 6 months, $170K+).

## WHAT I WANT INSTEAD

Replace the stats grid with a **two-column before/after comparison** that walks through ONE specific workflow: quarterly LP reporting for a PE fund. This is universally painful for our target buyers.

### New HTML structure:

```html
<section class="pain-section">
  <div class="pain-content">
    <div class="pain-label">The Status Quo</div>
    <h2 class="pain-headline">One quarterly LP report.<br>Here's what it actually takes.</h2>
    <div class="pain-comparison">

      <div class="pain-col pain-before">
        <div class="pain-col-header">
          <span class="pain-col-label">Today</span>
        </div>
        <div class="pain-col-body">
          <div class="pain-step">Pull NAV data from fund accounting system into Excel. Manually reconcile against bank statements.</div>
          <div class="pain-step">Cross-reference capital account balances across 3 separate spreadsheets. Fix the formula that broke last quarter.</div>
          <div class="pain-step">Extract performance data from portfolio company reports — 12 companies, 12 different formats, most of them PDFs.</div>
          <div class="pain-step">Draft the LP letter in Word. Copy-paste figures from Excel. Triple-check every number because you know one will be wrong.</div>
          <div class="pain-step">Email the draft to the partner. Wait for redlines. Incorporate changes. Re-check the numbers you changed.</div>
          <div class="pain-step">Generate individual LP statements. Customize for each LP's co-invest positions and side letter terms.</div>
          <div class="pain-step-summary">3 people. 3 weeks. Every quarter.</div>
        </div>
      </div>

      <div class="pain-divider"></div>

      <div class="pain-col pain-after">
        <div class="pain-col-header">
          <span class="pain-col-label">With Cosimo</span>
        </div>
        <div class="pain-col-body">
          <div class="pain-step">"Generate the Q3 LP report using our standard template."</div>
          <div class="pain-step">Cosimo pulls NAV data, reconciles capital accounts, extracts portfolio company metrics, and formats the letter — citing every source.</div>
          <div class="pain-step">You review. Every number links back to the source document and page. You click a citation, you see the original.</div>
          <div class="pain-step-summary">1 person. 15 minutes. Same report.</div>
        </div>
      </div>

    </div>
  </div>
</section>
```

### CSS for the comparison layout:

```css
.pain-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  margin-top: 3rem;
}

.pain-col {
  padding: 2rem 2.5rem;
}

.pain-before {
  border: 1px solid var(--border);
}

.pain-after {
  border: 1px solid var(--border);
}

.pain-divider {
  width: 1px;
  background: var(--accent);
  opacity: 0.3;
}

.pain-col-header {
  margin-bottom: 1.75rem;
}

.pain-col-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}

.pain-before .pain-col-label {
  color: var(--cream-dim);
}

.pain-after .pain-col-label {
  color: var(--accent);
}

.pain-col-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pain-step {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--cream-dim);
  font-weight: 300;
  padding-left: 1rem;
  border-left: 1px solid var(--border);
}

.pain-after .pain-step {
  border-left-color: rgba(116, 65, 143, 0.2);
}

.pain-step-summary {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  margin-top: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.pain-before .pain-step-summary {
  color: var(--cream-dim);
}

.pain-after .pain-step-summary {
  color: var(--accent);
  font-weight: 500;
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .pain-comparison {
    grid-template-columns: 1fr;
  }
  .pain-divider {
    width: 100%;
    height: 1px;
  }
}
```

### IMPORTANT:
- Remove the old `.pain-grid`, `.pain-item`, `.pain-num`, `.pain-desc` elements from the HTML
- Keep the `.pain-section`, `.pain-content`, `.pain-label` classes and their existing CSS
- Update the `.pain-headline` text as shown above
- In `js/main.js`, remove or update the GSAP animations for `.pain-item` (since those elements no longer exist). Replace with a scroll-triggered reveal for the two `.pain-col` elements — fade in and slide up, staggered (left column first, then right).
- The old pain stats CSS (`.pain-grid`, `.pain-item`, `.pain-num`, `.pain-desc`) can be removed from the stylesheet.
- Check it looks good in both light and dark mode.
```

---
---

## PROMPT 4: Rewrite the Architecture Section Copy

**What it does:** Rewrites the three architecture cards to focus on what the tech means for the buyer, not how it works.
**Files it touches:** `index.html` (lines 107-134 only — text content only)
**Time estimate:** 5-10 minutes
**Can run parallel with:** Anything

### Copy-paste this into Claude Code:

```
I need you to rewrite ONLY the text content in the architecture section of `index.html`, lines 107-134. Do NOT change any HTML structure, CSS classes, or JavaScript. Only change the text inside the existing elements.

CURRENT CONTENT:
- Header: "Three things ChatGPT will never do for your fund."
- Card 1: "Data Integrity" — talks about knowledge graphs and source tracing
- Card 2: "Institutional Memory" — talks about learning how the firm works
- Card 3: "Question to Deliverable" — talks about producing finished documents

NEW CONTENT — reframe everything through trust, risk, and competitive advantage:

Header h2: Change to:
"Three things generic AI<br>will never do for your fund."
(Just changing "ChatGPT" to "generic AI" — slightly more professional, avoids naming a competitor.)

Card 1 — change title and text:
- Title: "Your Data Stays Yours"
- Text: "Your fund data trains your instance and only your instance. Not a policy — architecture. Your proprietary processes, deal flow, and LP terms never touch another client's system. Your competitive advantage stays exactly where it should."

Card 2 — change title and text:
- Title: "It Gets Smarter at Your Work"
- Text: "Month one, Cosimo learns your documents. Month six, it knows your reporting preferences, your naming conventions, your team's shortcuts. Month twelve, it understands your operations better than a new hire ever could. That compounding knowledge is your moat."

Card 3 — change title and text:
- Title: "The Work, Done"
- Text: "Not analysis. Not insights. Not suggestions. The actual deliverable — the LP letter, the K-1 package, the rent roll extraction, the compliance report. Source-cited, audit-ready, in the format your team already uses."

Keep the card numbers (001, 002, 003) and icons (◇, ⟳, ▣) exactly as they are. Only change the title and text divs.
```

---
---

## PROMPT 5: Rewrite the Quotes Section

**What it does:** Rewrites the three client quotes with more operational specificity and adds a framing line about anonymity.
**Files it touches:** `index.html` (lines 136-155), `css/styles.css`
**Time estimate:** 5-10 minutes
**Can run parallel with:** Anything

### Copy-paste this into Claude Code:

```
I need you to update the quotes section of `index.html`, lines 136-155. Two changes: add a framing line above the quotes grid, and rewrite the quote text and attributions.

### 1. Add a framing line

Insert this ABOVE the `.quotes-grid` div, inside the `.quotes-section`:

```html
<p class="quotes-framing">We don't name our clients. They prefer it that way.</p>
```

Add this CSS to `css/styles.css`:
```css
.quotes-framing {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.7;
}
```

### 2. Rewrite the three quotes

Replace the content of the three `.quote-card` elements:

**Quote 1:**
- Text: "Our K-1 prep used to take the full team three weeks every March. We did it in two days this year. My analyst asked if we could use the extra time to finally reconcile the historical waterfall discrepancies — which we did, in an afternoon."
- Attribution: "— VP of Fund Accounting, $1.2B real estate PE fund, 3-person finance team"

**Quote 2:**
- Text: "One of our associates told me he'd quit if we got rid of it. He was half-joking. The other half was that he'd gone from leaving at midnight during diligence sprints to leaving at seven. I don't think he's going back."
- Attribution: "— Managing Partner, mid-market buyout fund, NYC"

**Quote 3:**
- Text: "We were told implementation would take three months minimum. Our compliance team was querying LP side letter provisions on day two. Actual day two. With source citations we could send directly to counsel."
- Attribution: "— Director of Operations, $800M credit fund, 4-person ops team"

Keep all existing HTML structure (`.quote-card`, `.quote-mark`, `.quote-text`, `.quote-attr`). Only change the text content.
```

---
---

## PROMPT 6: Rewrite the Use Cases Section

**What it does:** Tightens the four use case cards and adds persona tags so buyers can self-identify.
**Files it touches:** `index.html` (lines 157-193), `css/styles.css`
**Time estimate:** 10 minutes
**Can run parallel with:** Anything

### Copy-paste this into Claude Code:

```
I need you to update the use cases section of `index.html`, lines 157-193. Two changes: add persona tags to each card, and tighten the copy.

### 1. Add persona tags

Add a small persona label inside each `.case-card`, as the FIRST child element (before `.case-num`):

```html
<div class="case-persona">For Investment Partners & Associates</div>
```

Add this CSS:
```css
.case-persona {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.5rem;
  opacity: 0.6;
}
```

### 2. Rewrite all four cards

**Card 01 — Due Diligence**
- Persona: "For Investment Partners & Associates"
- Title: "Due Diligence" (keep)
- Desc: "A 1,200-document data room organized, searchable, and cross-referenced in under 2 hours. Financials extracted from PDFs into your model format. Your team focuses on judgment calls, not data entry."
- Stat value: "2 hrs" (was "90%")
- Stat label: "vs. 2 weeks, manual" (was "Reduction in extraction time")

**Card 02 — Regulatory Reporting**
- Persona: "For Fund CFOs"
- Title: "K-1s & Regulatory Filing" (was "Regulatory Reporting")
- Desc: "K-1 packages, Form ADV, compliance filings — pre-populated from your fund data with every figure traced to source. What used to consume your team for weeks becomes a review step."
- Stat value: "Days→Hrs" (keep)
- Stat label: "Quarter-end close time" (was "Filing preparation")

**Card 03 — Investor Relations**
- Persona: "For IR & Fund Accounting"
- Title: "LP Reporting" (was "Investor Relations")
- Desc: "An LP asks about their co-invest terms at 4pm. Your IR team has a source-cited answer with the exact side letter reference in 30 seconds. No digging. No 'let me get back to you.'"
- Stat value: "30 sec" (was "800+")
- Stat label: "LP query response time" (was "Files searchable instantly")

**Card 04 — Portfolio Monitoring**
- Persona: "For Fund CFOs & Partners"
- Title: "Portfolio Monitoring" (keep)
- Desc: "Covenant compliance, allocation drift, waterfall calculations, fee reconciliation — monitored continuously across every fund. Anomalies flagged before they reach an LP report."
- Stat value: "Real-time" (keep)
- Stat label: "Across all portfolio companies" (was "Portfolio visibility")

Keep all existing CSS classes and HTML structure. Only change/add the text content and insert the persona div.
```

---
---

## PROMPT 7: Add the Founder's Note Section

**What it does:** Adds a small, personal section between quotes and the CTA that builds human credibility without photos.
**Files it touches:** `index.html` (insert new section), `css/styles.css`
**Time estimate:** 10 minutes
**Dependencies:** Do after Prompt 5 (quotes) is done

### Copy-paste this into Claude Code:

```
I need you to add a new section to `index.html`, inserted BETWEEN the closing </section> of the quotes section (currently line 155) and the opening of the use cases section. This is a founder's note that builds credibility.

### Insert this HTML:

```html
<!-- FOUNDER NOTE -->
<section class="founder-section">
  <div class="founder-content">
    <div class="founder-label">From the founders</div>
    <p class="founder-text">We built Medici because we sat in the seats our clients sit in. We know what it's like to reconcile a waterfall at 2am because an LP noticed a discrepancy. We know what gets lost when your best analyst leaves. This isn't a technology company that decided to serve finance. It's a finance team that decided to build the infrastructure we wished existed.</p>
    <p class="founder-sign">— Eliot & the Medici team</p>
  </div>
</section>
```

### Add this CSS:

```css
/* ========== FOUNDER NOTE ========== */
.founder-section {
  padding: 5rem 2.5rem;
  border-top: 1px solid var(--border);
}

.founder-content {
  max-width: 640px;
}

.founder-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
  opacity: 0.7;
}

.founder-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--cream);
  font-weight: 300;
  margin-bottom: 1.5rem;
}

.founder-sign {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  color: var(--cream-dim);
}

/* Mobile */
@media (max-width: 640px) {
  .founder-section {
    padding: 4rem 1.25rem;
  }
}
```

### Also add a GSAP scroll reveal in `js/main.js`:

```javascript
// Founder note reveal
gsap.from('.founder-text', {
  opacity: 0, y: 20, duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.founder-section', start: 'top 80%', once: true }
});
```

IMPORTANT: The placeholder text above is a starting point — the founder (Tina) will rewrite it in her own voice later. Just get the structure and styling right.
```

---
---

## PROMPT 8: Redesign the CTA as a Structured Pilot Section

**What it does:** Replaces the generic CTA with a structured 3-step pilot timeline that reduces perceived risk.
**Files it touches:** `index.html` (lines 195-210), `css/styles.css`
**Time estimate:** 15-20 minutes
**Dependencies:** None

### Copy-paste this into Claude Code:

```
I need you to redesign the CTA section of `index.html`. The current section (lines 195-210) has "See what Medici does with your data" and mailto links. Replace it with a structured pilot section.

### ALSO: Move the inevitability section

The current `.inevitability-section` (line 196-198) should be moved to appear JUST BEFORE the CTA section, not in its current position. Cut it from its current location and paste it right before the new CTA section. Keep its existing CSS.

### New CTA HTML:

Replace the current `.cta-section` content with:

```html
<section class="cta-section" id="contact">
  <div class="cta-label">Start a Pilot</div>
  <h2 class="cta-headline">Four weeks. Your data.<br>You'll <em>know</em>.</h2>
  <div class="pilot-timeline">
    <div class="pilot-step">
      <div class="pilot-step-num">01</div>
      <div class="pilot-step-duration">30 minutes</div>
      <div class="pilot-step-title">Discovery</div>
      <div class="pilot-step-desc">We learn your workflows, your documents, your pain points. You see Cosimo work on a sample dataset. No slide deck — we use the call to scope your pilot.</div>
    </div>
    <div class="pilot-step">
      <div class="pilot-step-num">02</div>
      <div class="pilot-step-duration">1 week</div>
      <div class="pilot-step-title">Onboarding</div>
      <div class="pilot-step-desc">Your data goes into a dedicated, segregated instance. We configure Cosimo for your fund's document types, naming conventions, and reporting formats. No IT integration required.</div>
    </div>
    <div class="pilot-step">
      <div class="pilot-step-num">03</div>
      <div class="pilot-step-duration">3 weeks</div>
      <div class="pilot-step-title">Live Pilot</div>
      <div class="pilot-step-desc">Your team uses Cosimo on real work. We measure time saved, accuracy, and adoption. At the end, you'll know whether this changes how your fund operates.</div>
    </div>
  </div>
  <p class="pilot-confidence">No annual contract. No integration project. No IT involvement required. If it doesn't change how your fund operates, walk away.</p>
  <div class="cta-actions">
    <a href="#" class="btn-main">Schedule a Discovery Call</a>
    <a href="mailto:hello@medici.ai" class="btn-line">hello@medici.ai</a>
  </div>
</section>
```

### New CSS:

```css
/* ========== PILOT TIMELINE ========== */
.pilot-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--border-strong);
  margin: 3rem auto;
  max-width: 960px;
  text-align: left;
}

.pilot-step {
  padding: 2.5rem 2rem;
  border-right: 1px solid var(--border);
  position: relative;
}

.pilot-step:last-child {
  border-right: none;
}

.pilot-step-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.25em;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.pilot-step-duration {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cream-dim);
  margin-bottom: 1.5rem;
  opacity: 0.6;
}

.pilot-step-title {
  font-family: 'EB Garamond', serif;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--cream);
  margin-bottom: 0.75rem;
}

.pilot-step-desc {
  font-size: 0.85rem;
  line-height: 1.7;
  color: var(--cream-dim);
  font-weight: 300;
}

.pilot-confidence {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: var(--cream-dim);
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
  opacity: 0.7;
}

/* Responsive: stack on tablet/mobile */
@media (max-width: 768px) {
  .pilot-timeline {
    grid-template-columns: 1fr;
  }
  .pilot-step {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  .pilot-step:last-child {
    border-bottom: none;
  }
}
```

### Remove old CSS:
- You can remove `.cta-sub` and `.cta-cred` CSS rules since those elements no longer exist.

### GSAP:
Update the existing CTA scroll animations in `js/main.js`. The current ones target `.cta-label`, `.cta-headline`, `.cta-sub`, `.cta-actions`. Change them to:
- Keep `.cta-label` and `.cta-headline` animations as-is
- Remove `.cta-sub` animation (element no longer exists)
- Add a staggered reveal for `.pilot-step` (same pattern as `.arch-card` — fade in, slide up, staggered 0.15s)
- Keep `.cta-actions` animation as-is

### VERIFY:
- The inevitability text ("Every fund will work this way...") now appears above the CTA section
- The pilot timeline renders as 3 columns on desktop, stacks on mobile
- Text alignment inside cards is left-aligned (not centered, even though the section heading is centered)
- Both themes look correct
```

---
---

## PROMPT 9: Final Polish & Cleanup

**What it does:** Removes unused CSS, fixes any broken GSAP animations, verifies light/dark mode, adds meta tags.
**Files it touches:** All site files
**Time estimate:** 10-15 minutes
**Dependencies:** ALL previous prompts must be done first

### Copy-paste this into Claude Code:

```
I've made several changes to my marketing site (index.html, css/styles.css, js/main.js). I need you to do a final cleanup pass. Here's what to check and fix:

### 1. Remove unused CSS
Go through `css/styles.css` and remove any CSS rules that target elements that no longer exist in `index.html`. Specifically check for:
- Any `.term-*` or `.terminal-frame` rules (replaced by chat UI)
- `.pain-grid`, `.pain-item`, `.pain-num`, `.pain-desc` (replaced by comparison layout)
- `.cta-sub`, `.cta-cred` (replaced by pilot timeline)
- Any light-mode overrides for removed classes

Do NOT remove anything that's still being used. When in doubt, leave it in.

### 2. Fix GSAP animations
Go through `js/main.js` and verify every GSAP ScrollTrigger or animation targets an element that actually exists in the HTML. If it targets a removed element (like `.pain-item`), remove that animation. If a new element needs an animation and doesn't have one, add it following the existing patterns.

Specifically make sure:
- The chat frame has a scroll-triggered entrance (fade in, slide up)
- The pain comparison columns have a staggered reveal
- The quotes framing line has a fade-in
- The founder note has a fade-in
- The pilot timeline steps have a staggered reveal
- The inevitability text (now in a new position) still has its animation

### 3. Verify light/dark mode
Check every section's CSS for both themes. The key things that should stay dark regardless of theme:
- The chat frame (`.chat-frame`) and everything inside it

Everything else should properly use the CSS custom properties (var(--cream), var(--bg), etc.) that swap with the theme.

### 4. Meta tags
Update the <meta name="description"> tag in the <head> to reflect the new positioning. Write something that avoids the word "AI" and focuses on outcomes. Under 160 characters. Something like: "Medici — Fund operations infrastructure. LP reports, K-1s, due diligence, and portfolio monitoring. Source-cited. Audit-ready. Done in minutes."

### 5. Nav links
Check that all nav anchor links (#product, #architecture, #cases, #contact) still point to the correct section IDs in the updated HTML. Fix any broken anchors.

### 6. Smooth scroll
Verify that Lenis smooth scrolling still works properly — specifically that scrolling inside the chat body (which has overflow-y: auto) doesn't conflict with the page-level smooth scroll. If there's a conflict, add `data-lenis-prevent` to the `.chat-body` element.

### OUTPUT
Give me a summary of everything you changed or fixed, and flag anything that still needs manual attention.
```

---
---

## QUICK REFERENCE: Order of Operations

| Order | Prompt | What | Time Est. |
|-------|--------|------|-----------|
| 1     | Prompt 1 | Hero rewrite | 5-10 min |
| 1     | Prompt 2 | Chat UI (big one) | 30-60 min |
| 1     | Prompt 3 | Pain section redesign | 15-20 min |
| 1     | Prompt 4 | Architecture copy | 5-10 min |
| 1     | Prompt 5 | Quotes rewrite | 5-10 min |
| 1     | Prompt 6 | Use cases rewrite | 10 min |
| 2     | Prompt 7 | Founder's note (after quotes) | 10 min |
| 2     | Prompt 8 | CTA redesign | 15-20 min |
| 3     | Prompt 9 | Final cleanup (after everything) | 10-15 min |

**Prompts 1-6 can all run independently — no dependencies between them.**
Prompt 7 depends on Prompt 5 (it inserts after the quotes section).
Prompt 8 depends on nothing but is better done after the sections above it are finalized.
Prompt 9 must be last.

---

## AFTER ALL PROMPTS ARE DONE

Manual checklist for Tina:

- [ ] Open the site in Chrome, scroll through the whole thing. Does it flow?
- [ ] Toggle dark mode. Does everything look right?
- [ ] Open it on your phone. Anything broken?
- [ ] Rewrite the founder's note in your own voice
- [ ] Replace "Schedule a Discovery Call" href="#" with your actual Calendly link
- [ ] Replace "Try Cosimo with sample fund data →" href="#" with your sandbox URL
- [ ] Have someone outside the company read it cold. What do they remember?
