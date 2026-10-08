# Shared layout consistency audit

The homepage, five fund pages, and four supporting pages now share `src/css/site-layout.css` and the same mobile navigation controller.

## Findings and corrections

| Area | Before | Now |
| --- | --- | --- |
| Desktop header | Homepage/supporting pages 52px; fund pages 82px | 82px everywhere |
| Mobile header | Homepage 52px; fund pages 66px | 66px everywhere, same 760px breakpoint |
| Logo | 12px with .4em tracking vs 15px with .22em | Chicago, 15px, .22em, 44px link target |
| Page edges | Header 40px, content 5.5%; fund sections capped at 1320px, heroes at 1440px | Shared 1440px maximum, 89% width; 90% on mobile |
| Tablet margins | Fund hero 91%, body 89% | Same width for hero, tabs, and body |
| Hero start | Homepage vertically centered, fund copy separately padded | 48px after tabs desktop, 32px mobile |
| Report sections | Independent 4.5%, 5%, 5.5% padding | Shared content gutter, including wide screens |
| Navigation | Uppercase and mixed type sizes; different mobile patterns | Shared type, hit areas, drawer, keyboard handling |
| Footer | Different insets, type sizes, link sets, unused right padding | Shared footer layout and links on all ten routes |
| Small-screen CTAs | Homepage primary nearly full width; sector primary intrinsic width | Full-width primary actions at <=480px; secondary links left aligned |
| Anchor scrolling | Several unrelated fixed offsets | Header height plus 16px clearance |

The page-specific headline content, rotating animation, document art, and demo interaction designs remain in their own stylesheets. Supporting prose pages retain a narrower reading measure. Different section heights driven by content are intentional.

## Verification

- Measured all ten routes at 320, 390, 640, 760, 768, 1024, 1440, and 1920px: 80 route/viewport checks. Header heights and logo/tab/hero/body/footer left edges match; no page-level horizontal overflow.
- Opened and closed each of the ten mobile menus through real browser clicks and Escape.
- Verified keyboard focus wrap, background inert state and restoration, and a homepage menu anchor clearing the fixed header.
- Visually inspected desktop and mobile homepage/fund layouts and both themes. Restored the normal viewport and light theme afterward.
- Site build, JavaScript syntax checks, six existing theme tests, and `git diff --check` passed.
- Preview screenshots: `/private/tmp/cosimo-deep-audit/aligned-home-header.png` and `/private/tmp/cosimo-deep-audit/aligned-re-header.png`.

No merge or deployment performed.
