# Medici Site Audit & Fix Prompts for Claude Code Plan Mode

## Audit Summary

The loop-based implementation (commits US-001 through US-013) executed the structural changes from SITE-REBUILD-PROMPTS.md but introduced several quality issues. The HTML structure and new sections are largely correct, but the implementation suffers from:

1. **Duplicate CSS rules** — The PROMPTS-FOR-CLAUDE-CODE.md file contained inline CSS snippets that got pasted into styles.css alongside the existing rules, creating conflicts and duplicates (e.g., `.chat-tab`, `.chat-bubble`, `.chat-msg`, `.chat-avatar` all have two competing rule sets)
2. **Missing responsive polish** — Mobile breakpoints were added for new sections but lack thorough testing; the pain section two-column layout at tablet widths (1024px) drops the divider but doesn't properly handle the grid
3. **No visual verification** — The loop committed mechanically without checking rendered output, so spacing/proportion issues likely exist
4. **Chat demo animation concerns** — The `chatRunning` flag prevents tab switching while a demo plays, but there's no way to interrupt/reset a running demo cleanly
5. **Orphaned CSS** — Old terminal-specific CSS (`.terminal-frame`, `.term-body`, `.term-chrome`, `.term-tabs`, `.term-tab`) was partially cleaned up in US-005 but the cleanup may have been incomplete
6. **Light mode gaps** — New sections (pain comparison, founder's note, pilot timeline) need explicit light-mode override verification
7. **The h-italic line lost its italic styling** — The original had `font-style: italic` on `.h-italic`, making the accent word visually distinct. The current CSS doesn't have this.
8. **Section ordering** — The inevitability section was supposed to move ABOVE the CTA (per Task 5 in SITE-REBUILD-PROMPTS.md) and it is currently between use cases and CTA, which is correct placement

---

## Prompt 1: CSS Deduplication and Cleanup

**Purpose:** Fix the duplicate CSS rules that were created when the loop pasted prompt-embedded CSS snippets alongside existing rules.

```
You are fixing CSS issues in a marketing website. The file is `css/styles.css` (1614 lines).

PROBLEM: During a loop-based implementation, CSS rules were added in two passes — first as a dedicated "Add chat demo CSS" commit (US-002), then again when later commits modified the same selectors. This created DUPLICATE rule sets for many chat-related selectors. The browser uses the last-defined rule, so the earlier definitions are dead code that creates confusion.

YOUR TASK:

1. Read `css/styles.css` in full.

2. Identify ALL duplicate CSS rule sets. Specifically look for selectors that appear more than once at the same specificity level. Known duplicates include (but may not be limited to):
   - `.chat-tab` and `.chat-tab.active` and `.chat-tab:hover:not(.active)`
   - `.chat-version`
   - `.chat-body` and `.chat-body::-webkit-scrollbar` variants
   - `.chat-msg`, `.chat-msg.visible`, `.chat-msg.user`
   - `.chat-avatar`, `.chat-avatar.cosimo`, `.chat-avatar.user`
   - `.chat-bubble`, `.chat-msg.user .chat-bubble`, `.chat-msg.cosimo .chat-bubble`
   - `.chat-context`
   - `.chat-citations`, `.chat-cite`
   - `.chat-artifact` and related sub-selectors
   - `.chat-thinking`, `.chat-thinking-dot`

3. For each duplicate pair, KEEP the version that appears later in the file (this is what the browser actually uses) and REMOVE the earlier duplicate. Exception: if the earlier version has properties the later one lacks, merge them.

4. Also check for and remove any leftover terminal CSS from the old implementation that is no longer referenced in the HTML. Look for:
   - `.terminal-frame`
   - `.term-body`
   - `.term-chrome`
   - `.term-tabs`
   - `.term-tab`
   - `.term-line`, `.term-prompt`, `.term-response`
   - Any other `.term-*` selectors that don't have corresponding HTML elements

5. Verify that after cleanup, these classes still have valid, complete rules:
   - `.chat-frame`, `.chat-frame::before`
   - `.chat-chrome`
   - `.chat-tabs`, `.chat-tab`, `.chat-tab.active`
   - `.chat-body`
   - `.chat-msg`, `.chat-msg.user`, `.chat-msg.cosimo`
   - `.chat-bubble` (both user and cosimo variants)
   - `.chat-context`
   - `.chat-cite`
   - `.chat-artifact` and children
   - `.chat-thinking`, `.chat-thinking-dot`
   - `.chat-input-bar`, `.chat-input-placeholder`
   - `.chat-try-cta`, `.chat-try-cta a`

6. Do NOT change any non-chat CSS. Do NOT change the HTML or JS files.

7. After cleanup, run a quick validation: check that every `{` has a matching `}`, every property has a `;`, and no rules are malformed.

OUTPUT: The cleaned-up `css/styles.css` file with duplicates removed and dead terminal CSS removed. Add a comment `/* Cleaned: removed duplicate chat rules and orphaned terminal CSS */` at the location where the removed duplicates were.
```

---

## Prompt 2: Fix Hero Section Typography and Copy Polish

**Purpose:** Restore the italic styling on the accent headline word and polish the hero copy per the original creative direction.

```
You are fixing the hero section of a marketing website. Files: `index.html`, `css/styles.css`.

CURRENT STATE of the hero in index.html (lines 24-50):

The hero currently reads:
- Status: "Processing 50,000+ fund documents per month"
- h-large: "The back office"
- h-italic: "your fund deserves."
- h-sub: "LP reports, K-1 packages, rent roll extractions, due diligence memos — delivered, source-cited, and audit-ready."
- CTA primary: "Start a Pilot"
- CTA secondary: "Watch it work ↓"

PROBLEMS TO FIX:

1. MISSING ITALIC STYLING: The `.h-italic` class in styles.css does NOT have `font-style: italic`. The original design (see medici-v3.html) used italic on this line to create visual distinction. Add `font-style: italic;` to the `.h-italic` rule in styles.css.

2. HEADLINE COPY IS WEAK: "The back office your fund deserves" is passive and generic. It doesn't create the productive discomfort described in the original prompt. The headline should make a Fund CFO feel the pain of their current process and the relief of the alternative.

   Rewrite the headline. The h-large line is the setup, the h-italic line is the emotional punch. Directions to explore:
   - "Quarterly close." / "Done before lunch." — simple, concrete, punchy
   - "Your fund's hardest work." / "Finished." — dramatic contrast
   - "The work nobody wants." / "Done." — blunt, confident

   The h-italic line should be SHORT (1-3 words max) and carry the emotional weight. The h-large sets up tension, h-italic resolves it.

3. STATUS LINE: "Processing 50,000+ fund documents per month" is fine but slightly generic. Make it more specific without sounding inflated. Direction: "Live across 14 funds · 50,000+ documents indexed" or similar — the combination of a specific fund count and document count reads as more real.

4. H-SUB LINE: The current sub line is solid. Keep it as-is or tighten slightly. It should remain concrete document types in IBM Plex Mono.

CONSTRAINTS:
- Keep ALL existing HTML classes, IDs, and structure exactly as they are
- Only change text content inside existing elements, plus the CSS fix for italic
- Do not add new HTML elements
- Do not touch any section besides .hero and the .h-italic CSS rule
- The h-italic color should remain `var(--accent)` (purple)
```

---

## Prompt 3: Chat Demo — Fix Tab Switching and Animation Reset

**Purpose:** Fix the chat demo so tabs can be switched mid-animation, and improve the playback feel.

```
You are fixing the interactive chat demo in a marketing website. File: `js/main.js`.

CURRENT STATE: The chat demo (starting around the `chatDemos` array, ~line 323) has three scenarios that auto-play as chat conversations when the section scrolls into view. Tab buttons switch between scenarios.

PROBLEMS:

1. CANNOT SWITCH TABS DURING PLAYBACK: The `chatRunning` flag (line 401) prevents `runChatDemo()` from executing if a demo is already playing. This means if a user clicks "LP Reporting" while "Due Diligence" is still animating, nothing happens. This feels broken.

   FIX: When a new tab is clicked while a demo is running:
   - Cancel any pending `setTimeout` calls from the current demo
   - Clear the chat body
   - Start the new demo immediately

   Implementation approach: Store timeout IDs in an array and clear them all when a new demo starts. Or use a single `currentDemoId` counter that increments on each new demo, and each async step checks if its ID still matches before proceeding.

2. SCROLL-TO-KEEP-UP: When messages are added, the chat body scrolls via `body.scrollTop = body.scrollHeight`. This works but is jarring. Use `scrollTo({ top: body.scrollHeight, behavior: 'smooth' })` for a smoother feel. But NOTE: the chat-body has `data-lenis-prevent` on it, which means Lenis doesn't intercept scroll events inside it — this is correct. The native `scrollTo` with smooth behavior should work fine here.

3. THINKING INDICATOR TIMING: The thinking dots show for 1200ms before the response appears. This is a bit long for a marketing demo where users are watching passively. Reduce to 800ms. Also reduce the pause between user message and next message from 800ms to 600ms, and between cosimo response and next message from 1000ms to 700ms. The overall demo should feel snappy, not sluggish.

4. CHAT CONTEXT VISIBILITY: The `.chat-context` element is created with `requestAnimationFrame(() => ctxEl.classList.add('visible'))`, but there's no CSS transition defined for `.chat-context` to animate. Either:
   - Add the same opacity/transform transition that `.chat-msg` has, OR
   - Just make it visible immediately (simpler, since context is informational chrome, not a dramatic reveal)

CONSTRAINTS:
- Do not change the `chatDemos` data array content
- Do not change CSS (that's a separate prompt)
- Do not touch any other JS in the file (scroll reveals, theme toggle, etc.)
- Keep the ScrollTrigger auto-start for the first demo
- Keep the `data-lenis-prevent` attribute approach for scroll isolation
```

---

## Prompt 4: Pain Section — Visual Polish and Spacing

**Purpose:** Fix the pain section's two-column comparison layout for better visual impact.

```
You are polishing the pain section (before/after comparison) of a marketing website. Files: `index.html`, `css/styles.css`.

CURRENT STATE: The `.pain-section` has a two-column layout comparing "Today" (manual quarterly LP reporting process) vs. "With Cosimo" (automated). The left column has 6 steps + summary, the right has 3 steps + summary.

PROBLEMS TO FIX:

1. LEFT COLUMN NOT HEAVY ENOUGH: The original prompt (Task 6 in SITE-REBUILD-PROMPTS.md) specified that the left ("Today") column should feel "heavy, dense, slightly oppressive" and the right should feel "clean, spacious, light." Currently both columns have identical styling. Fix:
   - Left column (.pain-before): Use `color: var(--cream-dim)` for the step text (already done), but also reduce line-height to 1.55 (tighter), reduce padding between steps to 0.5rem margin-bottom, and add a subtle background: `background: var(--cream-ghost)` to make it feel heavier
   - Right column (.pain-after): Increase padding to 2.5rem, increase line-height of steps to 1.85 (more breathing room), and keep background transparent

2. DIVIDER STYLING: The `.pain-divider` is just a 1px line with 0.4 opacity. Make it slightly more prominent: width 2px, use `var(--accent)` at 0.3 opacity, and add a subtle gradient that fades at top and bottom:
   ```css
   .pain-divider {
     width: 2px;
     background: linear-gradient(to bottom, transparent, var(--accent) 20%, var(--accent) 80%, transparent);
     opacity: 0.3;
   }
   ```

3. SUMMARY LINE CONTRAST: The right column's summary "1 person. 15 minutes. Same report." should be MORE prominent — it's the payoff. Make `.pain-after .pain-step-summary` use a slightly larger font-size (0.85rem vs current 0.75rem) and full accent color with no opacity reduction.

4. MOBILE STACKING: At 768px the columns stack. When stacked, add a horizontal divider between them (currently the .pain-divider just disappears). Add a rule in the 768px media query:
   ```css
   .pain-after {
     border-top: 2px solid var(--accent-dim);
     padding-top: 2rem;
   }
   ```

5. MAX-WIDTH: The `.pain-content` has `max-width: 900px` but is not centered. Add `margin: 0 auto` if not already present, or verify the section padding handles centering.

CONSTRAINTS:
- Do not change the HTML structure or text content
- Only modify CSS in styles.css
- Do not affect other sections
- Ensure all changes work in both light and dark mode (use CSS custom properties only)
```

---

## Prompt 5: Light Mode Verification and Fixes

**Purpose:** Ensure every section renders correctly in light mode.

```
You are auditing and fixing light mode styling for a marketing website. File: `css/styles.css`.

CONTEXT: The site uses `data-theme="light"` on the HTML element for light mode (which is the default). Light mode overrides are defined in the `[data-theme="light"]` section near the top of styles.css (roughly lines 37-175). Dark mode is the `:root` default.

The site was recently rebuilt with new sections, and light mode overrides may be missing for them.

YOUR TASK: Go through EVERY section of the site and verify it has appropriate light mode styling. Specifically check:

1. HERO SECTION — Already has overrides for .hero-glyph, .status-dot, .hero-dots. VERIFY: Does the hero-accent-line use `var(--accent)` (yes, it does — this works in both modes). Check that btn-main has readable text in light mode (white text on purple — the override at line 156-161 handles this).

2. CHAT DEMO — Already has extensive light mode overrides (lines 85-153) that force the chat frame to stay dark. VERIFY these are complete. Known gap: the `.chat-context` opacity/transition classes added by JS — do they render correctly against the dark chat background in light mode? (They should, since the chat frame stays dark.)

3. PAIN SECTION — NEW SECTION. Check:
   - `.pain-label` uses `var(--accent)` — OK
   - `.pain-headline` uses `var(--cream)` — OK (cream swaps to dark in light mode)
   - `.pain-step` uses `var(--cream-dim)` — OK
   - `.pain-step-summary` uses `var(--cream)` — OK
   - `.pain-divider` uses `var(--accent)` — OK
   - `.pain-before` background if you added `var(--cream-ghost)` per Prompt 4 — verify it's visible but subtle in both modes
   - `.pain-after .pain-step` uses `var(--cream)` — OK
   - `.pain-after .pain-step-summary` uses `var(--accent)` — OK
   VERDICT: Pain section should work because it uses CSS custom properties. No override needed unless raw hex colors were used.

4. ARCHITECTURE SECTION — Uses vars throughout. The `.arch-card::before` hover effect uses `var(--accent-dim)` — verify this is visible in light mode (accent-dim is `rgba(116, 65, 143, 0.08)` in light mode — very subtle, may need to be bumped to 0.12). Check `.arch-card-icon` border on hover.

5. QUOTES SECTION — Uses vars. Check `.quote-mark` opacity (0.6 × accent) — should be fine. Check `.quotes-framing` opacity (0.7) in light mode — may need to be higher for readability.

6. FOUNDER'S NOTE — Uses vars. Should work. Verify `.founder-sign` contrast (cream-dim in light mode).

7. USE CASES — Uses vars. Check `.case-persona` opacity (0.6) — verify readability in light mode. Check `.case-card:hover` background color (var(--bg-elevated) is white in light — may not create enough contrast against the light page background var(--bg) which is #F5F3EF). Consider adding a light mode override:
   ```css
   [data-theme="light"] .case-card:hover {
     background: var(--bg-surface);
   }
   ```

8. INEVITABILITY SECTION — Uses vars, opacity 0.85. Should be fine.

9. CTA / PILOT TIMELINE — Uses vars. Check `.pilot-step` borders — `var(--border-strong)` in light mode is `rgba(26, 26, 24, 0.15)` which is subtle. Verify the pilot timeline grid border is visible enough. Check `.pilot-confidence` opacity (0.8) readability.

10. FOOTER — Already has light mode overrides (lines 164-172).

OUTPUT: For each section, state whether it passes light mode review or needs fixes. Make all necessary fixes. Only add `[data-theme="light"]` overrides where raw hex colors are used or where opacity/contrast is insufficient.

CONSTRAINT: Do not change dark mode styles. Only add or modify `[data-theme="light"]` selectors.
```

---

## Prompt 6: Responsive Design Audit and Fixes

**Purpose:** Thorough mobile/tablet audit of all sections.

```
You are auditing responsive design for a marketing website. File: `css/styles.css`.

The site has breakpoints at 1024px, 768px, 640px, and 380px. After a recent rebuild, new sections need responsive verification.

GO THROUGH EACH BREAKPOINT AND VERIFY:

### At 1024px (tablet):
1. `.arch-grid` → goes to single column. OK.
2. `.cases-grid` → goes to 2 columns. OK.
3. `.terminal-intro` → stacks vertically. OK.
4. `.quotes-grid` → goes to single column. OK.
5. `.pain-comparison` → goes to 2 columns (drops divider). BUT: at 1024px, the grid is `1fr 1fr` — this skips the `.pain-divider` column entirely. The divider has `display: none` at 1024px, but the grid still has `grid-template-columns: 1fr auto 1fr` from the base rule. FIX: Add `grid-template-columns: 1fr 1fr` to the 1024px media query for `.pain-comparison`. (Currently it says `grid-template-columns: 1fr 1fr` — verify this is actually in the 1024px block and not just 768px.)
6. `.pilot-timeline` → currently NOT in the 1024px breakpoint, only collapses at 768px. At 1024px, 3 columns at 300px each = 900px max-width, which fits. OK.
7. `.founder-section` → not in any breakpoint. At 1024px, max-width 640px with 2.5rem padding is fine. OK.

### At 768px (large mobile):
1. `.cases-grid` → single column. OK.
2. `.pain-comparison` → single column, divider hidden. OK but verify `.pain-after` gets `border-top`.
3. `.pilot-timeline` → single column, steps get bottom borders. OK.
4. `.hero-headline` font sizes reduce. OK.
5. MISSING: `.quotes-grid` — already collapses at 1024px, fine.
6. MISSING: `.arch-header h2` font size — at 768px on a phone, `clamp(2.5rem, 4.5vw, 4rem)` = about 2.5rem, which is fine.

### At 640px (mobile):
1. Nav hides middle links. OK.
2. Hero reduces padding. OK.
3. Several sections reduce horizontal padding to 1.25rem. OK.
4. Chat demo: tabs get `overflow-x: auto` for horizontal scrolling, body reduces padding and min-height. OK.
5. Footer stacks vertically. OK.
6. CTA actions stack vertically. OK.
7. MISSING CHECK: `.pain-col` padding at 640px. The base padding is 2rem, which might be too much at 640px. Add:
   ```css
   .pain-col { padding: 1.25rem; }
   ```
8. MISSING CHECK: `.arch-card` padding at 640px. Base is 3rem 2.5rem. Consider reducing:
   ```css
   .arch-card { padding: 2rem 1.25rem; }
   ```
9. MISSING CHECK: `.pilot-step` padding at 640px. Base is 2rem. Consider reducing:
   ```css
   .pilot-step { padding: 1.5rem 1.25rem; }
   ```
10. `.chat-chrome` — at 640px the dots + tabs + version label may overflow. The tabs have `overflow-x: auto` which helps, but verify the chrome bar doesn't break. Consider hiding `.chat-version` on mobile:
    ```css
    .chat-version { display: none; }
    ```

### At 380px (small mobile):
1. Hero font sizes reduce. OK.
2. Case stat values reduce. OK.
3. CTA headline reduces. OK.
4. MISSING: `.arch-header h2` — at 380px, should be around 2rem. Verify it doesn't overflow.
5. MISSING: `.pain-headline` — at 380px, `clamp(1.8rem, 3.5vw, 2.8rem)` = ~1.8rem. Fine.
6. MISSING: `.terminal-intro-left h2` — at 380px, `clamp(2rem, 4vw, 3.5rem)` = ~2rem. Fine but tight. The `br` in "Ask anything.<br>Get the work delivered." may cause awkward breaks. Consider allowing the br to collapse at 380px:
    ```css
    .terminal-intro-left h2 br { display: none; }
    ```

### GENERAL CHECKS:
- Verify no element causes horizontal overflow at 320px. Specifically check:
  - `.chat-frame` width (should be 100% of parent)
  - `.pilot-timeline` max-width (900px) — at mobile this should be overridden to 100%
  - `.pain-content` max-width (900px) — same concern
- Touch targets: all buttons and links should be at least 44px tap target. Check `.chat-tab` touch targets (currently padding 0.4rem 0.8rem at mobile = about 30px height). Increase mobile chat tab padding:
  ```css
  .chat-tab { padding: 0.6rem 1rem; }
  ```

MAKE ALL NECESSARY FIXES. Only modify CSS within existing or new `@media` query blocks. Do not change base (desktop) styles. Test mentally that each fix doesn't break other breakpoints.
```

---

## Prompt 7: GSAP Animation Polish and Consistency

**Purpose:** Audit scroll animations for timing, consistency, and potential conflicts.

```
You are auditing GSAP scroll animations in a marketing website. File: `js/main.js`.

CONTEXT: The site uses GSAP 3.12.5 with ScrollTrigger for scroll-reveal animations. Lenis handles smooth scrolling. All animations should use `once: true` and `power3.out` easing per the project's design system.

AUDIT EACH ANIMATION AND FIX ISSUES:

1. HERO TIMELINE (lines 44-68): Uses a GSAP timeline with delays. This is fine — hero animates on page load, not scroll. No changes needed unless timing feels off. Current: 0.9s per line, staggered. This is good.

2. HERO PARALLAX (lines 70-90): Scroll-linked parallax on hero-content and hero-glyph. No `once: true` (correct — parallax should be continuous). Uses `scrub: true`. OK.

3. TERMINAL INTRO (lines 95-104): Two `gsap.from()` calls for the terminal intro section. These use `once: true` and `power3.out`. OK.

4. PAIN SECTION (lines 107-125):
   - `.pain-label` fades in on scroll. OK.
   - `.pain-col` elements use `gsap.set()` + `ScrollTrigger.create()` + `gsap.to()` pattern. OK.
   - POTENTIAL ISSUE: `gsap.set('.pain-col', { opacity: 0, y: 40 })` runs immediately on page load, which means if JavaScript is slow to load, the pain columns might flash visible then disappear. This is a minor concern. Could wrap the set in a `DOMContentLoaded` or move it closer to the ScrollTrigger. Low priority.

5. ARCHITECTURE CARDS (lines 128-141): Same pattern as pain. OK.

6. CASE CARDS (lines 144-157): Same pattern. OK.

7. QUOTES (lines 160-180):
   - `.quotes-framing` fades in. OK.
   - `.quote-card` stagger reveal. OK.

8. FOUNDER'S NOTE (lines 183-187): `.founder-text` fades in. OK.
   - MISSING: `.founder-label` and `.founder-sign` don't animate. They'll just be static. This is fine — the section is meant to feel quiet. But for consistency, add a subtle fade for `.founder-label`:
   ```javascript
   gsap.from('.founder-label', {
     opacity: 0, y: 10, duration: 0.6,
     ease: 'power3.out',
     scrollTrigger: { trigger: '.founder-section', start: 'top 80%', once: true }
   });
   ```

9. CTA SECTION (lines 190-217):
   - `.cta-label`, `.cta-headline`, `.pilot-step` stagger, `.cta-actions` all animate. OK.
   - MISSING: `.pilot-confidence` line doesn't animate. Add:
   ```javascript
   gsap.from('.pilot-confidence', {
     opacity: 0, y: 15, duration: 0.6,
     ease: 'power3.out',
     scrollTrigger: { trigger: '.pilot-confidence', start: 'top 85%', once: true }
   });
   ```

10. WORD-BY-WORD REVEALS (lines 219-309): Complex function that splits heading text into word spans and animates them. Applied to terminal intro, pain headline, arch header, cases header.
    - POTENTIAL BUG: The `processNode` function (lines 231-260) creates a `fragment` in outer scope but the inner logic uses both `fragment` and `processNodeInto`. The `processNode` function appears to be dead code — `processNodeInto` is what's actually used (line 286). Verify by checking: is `processNode` called anywhere? No — only `processNodeInto` is called on line 286. REMOVE the unused `processNode` function (lines 231-260) to clean up.
    - WORD ANIMATION TIMING: stagger 0.04s per word, 0.6s duration. For long headings (like the pain headline with 10+ words), this means the last word doesn't start animating until 0.4s+ after the trigger. This is probably fine but could feel slow for very long headings.

11. INEVITABILITY SECTION: Not animated at all. Add a subtle fade:
    ```javascript
    gsap.from('.inevitability-text', {
      opacity: 0, y: 20, duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.inevitability-section', start: 'top 80%', once: true }
    });
    ```

12. ARCH HEADER NUM PARALLAX (lines 311-320): Continuous scrub on the "III" element. OK.

MAKE ALL FIXES. Maintain the existing code patterns. Keep `once: true` and `power3.out` everywhere. Do not change the GSAP or Lenis initialization code. Do not change the chat demo code (that's handled separately).
```

---

## Prompt 8: Copy Polish — Quotes, Architecture, Use Cases

**Purpose:** Tighten the copywriting across the content sections to match the original creative direction more precisely.

```
You are polishing the copywriting on a marketing website for Medici, a fund operations platform. File: `index.html`. You are ONLY changing text content inside existing HTML elements. Do not change any classes, IDs, structure, or add/remove elements.

SECTION 1: QUOTES (.quotes-section, lines 159-178)

The framing line "We don't name our clients. They prefer it that way." is good. Keep it.

The quotes themselves need polishing for specificity and voice. The current quotes are decent but can be sharper:

Quote 1 (line 164-165): Currently about K-1 prep. The content is good but "Our analyst used the extra time to reconcile waterfall discrepancies we'd been carrying for three funds" is a bit long. Tighten: the punchline should be shorter and drier.

Quote 2 (line 169-170): About the associate threatening to quit. Good energy. But "diligence sprints end at 7pm instead of midnight" could be more specific about what changed — not just time, but what they can now DO with that time. Add one concrete thing.

Quote 3 (line 174-175): About fast implementation. "We budgeted three months for implementation. It took two days." is strong. Keep that opening. But "By day two our compliance team was querying side letters across all funds" — make "day two" into something even more specific, like a day of the week. "It went live on a Tuesday. By Thursday our compliance team was querying side letters across 6 funds."

Attribution style: Keep the current format (Role, fund descriptor, humanizing detail). These are good.

SECTION 2: ARCHITECTURE (.arch-section, lines 130-156)

The header "Three things generic AI will never do for your fund" is solid. Keep it.

Card titles and body text — minor tightening:

Card 1 "Your Data Stays Yours" (line 141): Good. Tighten the last two sentences. "This isn't a policy, it's architecture." is gold — keep it. But "Your competitive advantage stays yours" is redundant with the title. Replace with something about what this MEANS operationally: "Your deal flow, your investment thesis, your LP terms — structurally isolated."

Card 2 "It Gets Smarter at Your Work" (line 147): Good. But "a new analyst produces work indistinguishable from your best partner's" is a big claim. Soften slightly: "a new analyst can pull reports your firm spent years learning to format." The moat metaphor at the end is strong — keep it.

Card 3 "The Work, Done" (line 153): Good. Keep as-is. This one nails the concrete document types.

SECTION 3: USE CASES (.cases-section, lines 190-229)

The persona tags above each card are good. Keep them.

Card 1 "Due Diligence" (line 200-203): The scenario is vivid ("1,200-document data room lands on your desk Friday afternoon"). Good. But the stat "2 hrs vs. 2 weeks, manual" — reconsider the label. "vs. 2 weeks, manual" sounds like a footnote. Change to: stat-val "2 hours" / stat-lbl "Not 2 weeks" — the contrast is sharper.

Card 2 "K-1s & Regulatory Filing" (line 207-210): Solid. Stat "Days→Hrs" is clear. Label "Quarter-end close time" is good.

Card 3 "LP Reporting" (line 214-217): The scenario is excellent (specific, emotional). Stat "30 sec" is good. Label "LP query response time" — fine but could be more vivid: "From question to source-cited answer."

Card 4 "Portfolio Monitoring" (line 221-226): Solid. Stat "Real-time" is good. Label "Across all portfolio companies" — fine.

MAKE ONLY the text changes described above. Do not modify any HTML structure. Do not modify CSS or JS.
```

---

## Prompt 9: Founder's Note — Copy Update

**Purpose:** Update the placeholder founder's note copy (requires Tina's input, but we can improve the placeholder).

```
You are updating the founder's note section of a marketing website. File: `index.html`, lines 181-187.

CURRENT COPY: "We built Medici because we sat in the seats our clients sit in. We know what it's like to reconcile a waterfall at 2am because an LP noticed a discrepancy. We know what gets lost when your best analyst leaves. This isn't a technology company that decided to serve finance. It's a finance team that decided to build the infrastructure we wished existed."

Signed: "— Eliot & the Medici team"

ISSUES:
1. This is still the placeholder copy from the original prompt. It reads well but Tina needs to personalize it. For now, keep it — but add a small HTML comment above it: `<!-- TODO: Tina to rewrite in her own voice -->` so it's flagged for review.

2. The sign-off "Eliot & the Medici team" — verify this is correct. If Tina is a co-founder, this should potentially be "— Tina & Eliot" or whatever the actual names are. Add another HTML comment: `<!-- TODO: Verify founder names -->`.

3. OPTIONAL CREDENTIAL LINE: The original prompt (Task 7) mentioned an optional line below the names with brief credibility markers. Currently there's no such line. Add a new paragraph below the sign-off:
   ```html
   <p class="founder-creds"><!-- TODO: Add credential markers if desired, e.g. "Previously: [firm]. Backed by [investor]." --></p>
   ```
   And add CSS for `.founder-creds`:
   ```css
   .founder-creds {
     font-family: 'IBM Plex Mono', monospace;
     font-size: 0.55rem;
     letter-spacing: 0.1em;
     color: var(--cream-dim);
     opacity: 0.5;
     margin-top: 0.5rem;
   }
   ```

CONSTRAINTS: Minimal changes. This is a placeholder section awaiting real copy. Just add the TODO comments and credential line placeholder.
```

---

## Prompt 10: Final Integration Test — Full Page Syntax and Structure Validation

**Purpose:** Validate that all files are syntactically correct and internally consistent.

```
You are doing a final validation pass on a marketing website. Files: `index.html`, `css/styles.css`, `js/main.js`.

RUN THESE CHECKS:

1. HTML VALIDATION:
   - Verify every opened tag is properly closed
   - Verify all `class` attributes reference classes that exist in styles.css
   - Verify all `id` attributes are unique
   - Verify all `href` attributes either point to valid anchors (#product, #architecture, #cases, #contact) or are placeholders (#)
   - Verify no inline styles exist (the design system requires all styles in the CSS file)
   - Check that the `data-lenis-prevent` attribute is on the chat-body div

2. CSS VALIDATION:
   - Verify every `{` has a matching `}`
   - Verify no duplicate selectors at the same level (after Prompt 1 cleanup)
   - Verify all `@media` queries have proper syntax
   - Verify all `@keyframes` have proper syntax
   - Verify no raw hex colors appear OUTSIDE of `:root`, `[data-theme="light"]`, or the `.chat-*` / `.term-*` dark-only selectors
   - Count total rules and report

3. JS VALIDATION:
   - Run `node --check js/main.js` if node is available
   - Verify all `document.querySelector` / `querySelectorAll` calls reference selectors that exist in the HTML
   - Verify all `ScrollTrigger.create` calls have `once: true`
   - Verify no console.log statements left in
   - Verify the chatDemos array has exactly 3 entries
   - Verify all event listeners are properly attached (chat tabs, theme toggle, nav links)

4. CROSS-FILE CONSISTENCY:
   - Every class used in index.html should have at least one CSS rule
   - Every class styled in CSS should be referenced in HTML (flag orphaned styles)
   - Every ScrollTrigger trigger selector should match an element in HTML
   - The section order in HTML should match the nav link order (#product → #architecture → #cases → #contact)

5. LIGHT/DARK MODE CONSISTENCY:
   - Toggle through all `[data-theme="light"]` overrides and verify the base selector exists
   - Flag any light mode override that references a selector not in the base CSS

OUTPUT: A checklist of pass/fail for each check, with specific line numbers for any failures. Fix any failures you find.
```

---

## Execution Order

Run these prompts in this order for best results:

1. **Prompt 1** (CSS Dedup) — foundational cleanup, do first
2. **Prompt 2** (Hero Fix) — high visual impact, quick
3. **Prompt 3** (Chat Demo JS) — functional fix
4. **Prompt 4** (Pain Section Visual) — design polish
5. **Prompt 5** (Light Mode) — cross-cutting verification
6. **Prompt 6** (Responsive) — cross-cutting verification
7. **Prompt 7** (GSAP) — animation polish
8. **Prompt 8** (Copy Polish) — content tightening
9. **Prompt 9** (Founder's Note) — minor, placeholder
10. **Prompt 10** (Final Validation) — always run last

Prompts 2, 3, and 4 can run in parallel since they touch different files/sections. Prompts 5 and 6 should run after 1 and 4 since they depend on the CSS being clean. Prompt 10 must be last.
