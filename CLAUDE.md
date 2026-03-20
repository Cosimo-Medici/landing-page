# Medici Marketing Website

## Project Overview

Static single-page marketing site for **Medici**, a fund operations platform that serves PE, credit, and real estate funds. The product (called **Cosimo**) processes fund documents and produces deliverables like LP reports, K-1 packages, rent roll extractions, and due diligence memos.

The site's job: make a Fund CFO or PE Investment Partner feel the pain of their current manual workflow, then show them Medici eliminates it. Tone is confident, adult, institutional — never startup-y or breathless about AI.

## File Structure

```
index.html          — Single-page site (all sections)
css/styles.css      — All styling (CSS custom properties, responsive breakpoints)
js/main.js          — GSAP scroll animations, Lenis smooth scroll, chat demo
ChicagoFLF.ttf      — Custom font for nav logo
dream orphanage rg.otf — Custom display font (loaded but currently unused)
medici-v3.html      — Legacy reference file (do not modify)
```

## Tech Stack & External Dependencies

CDN-loaded (do NOT add new CDN scripts or npm dependencies):

- **GSAP 3.12.5** + ScrollTrigger plugin — scroll-triggered reveal animations
- **Lenis** — smooth scroll (integrates with GSAP ticker)
- **Google Fonts** — EB Garamond, IBM Plex Mono, Space Grotesk

No build step. No bundler. No framework. Plain HTML/CSS/JS served as static files.

## Design System

### Fonts — Four typefaces, each with a specific role

| Font | Role | Usage |
|------|------|-------|
| `EB Garamond` | Serif display | Hero headline, section headers, card titles, large numbers |
| `IBM Plex Mono` | Monospace labels | Buttons, metadata, status lines, labels, small caps, nav links |
| `Space Grotesk` | Sans-serif body | Body text, descriptions, paragraphs |
| `Chicago` | Logo only | The word "MEDICI" in the nav. Nowhere else. |

**Never** add or substitute fonts. If you're unsure which font to use for a new element, match the closest existing element's font.

### Colors — CSS Custom Properties Only

All colors must use `var()` references. These properties swap automatically between dark and light mode:

| Property | Purpose | Dark value | Light value |
|----------|---------|-----------|-------------|
| `--bg` | Page background | `#0C0C0B` | `#F5F3EF` |
| `--bg-elevated` | Raised surfaces (cards, modals) | `#141413` | `#FFFFFF` |
| `--bg-surface` | Secondary surfaces | `#1A1A18` | `#EDEAE4` |
| `--cream` | Primary text | `#EDE8DF` | `#1A1A18` |
| `--cream-dim` | Secondary text | `rgba(237,232,223,0.5)` | `rgba(26,26,24,0.55)` |
| `--cream-ghost` | Ghost/barely visible text | `rgba(237,232,223,0.06)` | `rgba(26,26,24,0.06)` |
| `--accent` | Primary accent (purple) | `#74418F` | `#74418F` |
| `--accent-dim` | Accent at low opacity | `rgba(116,65,143,0.12)` | `rgba(116,65,143,0.08)` |
| `--accent-glow` | Accent glow/shadow | `rgba(116,65,143,0.3)` | `rgba(116,65,143,0.15)` |
| `--green` | Success/status | `#2ECC71` | `#1B9E52` |
| `--border` | Subtle borders | `rgba(237,232,223,0.06)` | `rgba(26,26,24,0.08)` |
| `--border-strong` | Visible borders | `rgba(237,232,223,0.1)` | `rgba(26,26,24,0.15)` |

**Hard rule:** Never use raw hex colors outside of `:root` and `[data-theme="light"]` variable definitions. The sole exception is the chat demo frame, which is forced dark in both modes (uses hardcoded dark values in `[data-theme="light"] .chat-*` overrides).

### Recurring CSS Patterns

- **Section padding:** `padding: Xrem 2.5rem` (mobile drops to `1.25rem`)
- **Section borders:** `border-top: 1px solid var(--border)` between sections
- **Label style:** `font-family: 'IBM Plex Mono'; font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent)`
- **Card grids:** `display: grid; gap: 0; border: 1px solid var(--border-strong)` with internal borders between cards (no gap, shared borders)
- **Buttons:** `.btn-main` (filled purple) and `.btn-line` (outline), both IBM Plex Mono, uppercase, 0.65rem

## Light/Dark Mode Rules

- **Light mode is the default** (`data-theme="light"` on `<html>`)
- Dark mode is `:root` default in CSS; light mode overrides in `[data-theme="light"]` block
- Every new element must work in both themes — use `var()` custom properties for all colors
- The **chat demo frame always stays dark** (even in light mode), with explicit `[data-theme="light"] .chat-*` overrides using hardcoded dark values
- When adding new elements, check if they need a light mode override. If they use only `var()` properties, they probably don't. If they use any opacity tricks or hardcoded values, add an override.

## GSAP Animation Patterns

All scroll-triggered reveals must follow these conventions:

```javascript
// Single element reveal:
gsap.from('.selector', {
  opacity: 0, y: 20, duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.parent-section', start: 'top 80%', once: true }
});

// Staggered group reveal:
gsap.set('.items', { opacity: 0, y: 40 });
ScrollTrigger.create({
  trigger: '.container',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    gsap.to('.items', {
      opacity: 1, y: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
});
```

**Hard rules:**
- Always `once: true` on ScrollTriggers (exception: parallax/scrub effects like hero)
- Always `power3.out` easing
- Reveal direction is always upward (`y: 20-40` → `y: 0`)
- Keep durations between 0.6–1.0s
- The word-by-word split animation (`splitWordsAndAnimate()`) is used on section headers — don't duplicate this logic, call the existing function

## Section Map (top to bottom in index.html)

1. **Nav** — fixed, `mix-blend-mode: difference` (disabled in light mode). Logo + 4 links. Do not modify structure.
2. **Hero** — full viewport. Status line, two-line headline (h-large + h-italic), sub line, CTAs, scroll hint. Has parallax on scroll.
3. **Terminal/Chat Demo** (`#product`) — intro header + embedded chat UI with 3 tabbed demo scenarios. Chat frame stays dark in both modes. JS drives animated message playback.
4. **Pain Section** — two-column before/after comparison (manual process vs. Cosimo). Left column is dense/heavy, right is clean/spacious.
5. **Architecture** (`#architecture`) — 3-card grid. "Three things generic AI will never do for your fund."
6. **Quotes** — 3 anonymized client testimonials. Framing line: "We don't name our clients."
7. **Founder's Note** — short personal message from founders.
8. **Use Cases** (`#cases`) — 4-card grid with persona tags, scenario descriptions, and stats.
9. **Inevitability** — single centered sentence. Emotional transition to CTA.
10. **CTA** (`#contact`) — pilot timeline (3 steps), confidence line, action buttons.
11. **Footer** — copyright + links. Do not modify structure.

## Responsive Breakpoints

| Breakpoint | Target | Key changes |
|-----------|--------|-------------|
| `1024px` | Tablet | Arch grid → 1 col, cases → 2 col, quotes → 1 col, pain drops divider |
| `768px` | Large mobile | Cases → 1 col, pain → 1 col, pilot timeline → 1 col, hero font sizes reduce |
| `640px` | Mobile | Nav hides middle links, padding → 1.25rem, hero/footer/CTA stack vertically, chat tabs scroll horizontally |
| `380px` | Small mobile | Hero/CTA font sizes reduce further |

## Critical Constraints

- **No new CDN scripts or npm dependencies.** Everything must work with existing GSAP + Lenis.
- **No new fonts.** Use the four fonts described above.
- **Do not modify nav or footer structure.** Content changes are fine, structural changes are not.
- **Do not break existing scroll animations** when modifying a section. If you change a class name or HTML structure, update the corresponding GSAP code in main.js.
- **Chat demo data lives in JS** (`chatDemos` array in main.js). The HTML chat-body is populated dynamically. To change demo content, edit the JS array — not the HTML.
- **Test both themes.** After any CSS change, mentally verify (or visually check) that it works in both `data-theme="light"` and default dark mode.
- **Test responsive.** After any layout change, verify the element has appropriate rules in the 1024/768/640/380 breakpoints.

## Quality Checklist

Run these before committing any change:

1. **HTML:** No unclosed tags, no broken attributes, all IDs unique
2. **CSS:** All braces matched, all properties terminated with `;`, no duplicate selectors at same specificity
3. **JS:** `node --check js/main.js` passes (or manual syntax review if node unavailable)
4. **Theme:** New elements use `var()` properties; chat frame stays dark in light mode
5. **Responsive:** New elements have rules in relevant `@media` breakpoints
6. **Cross-file consistency:** Every class in HTML has CSS rules; every GSAP selector matches an HTML element

## Copywriting Guidelines

The site speaks to Fund CFOs, Investment Partners, IR professionals, and fund operations teams. They are sophisticated, skeptical, and busy.

- **Never mention AI, intelligence, or machine learning** above the fold or in headlines. Lead with outcomes.
- **Be specific.** "K-1 packages" not "documents." "3 weeks" not "a long time." "$170K" not "a lot."
- **Tone:** Confident and inevitable. Not excited, not salesy. Think institutional, not startup.
- **Pain should feel real.** The "before" descriptions should make someone nod because they've lived it.
- **Relief should feel earned.** The "after" descriptions should be concrete and credible, not magical.
- **Quotes are anonymized.** Attribution format: Role, fund descriptor (type + AUM), humanizing detail.
