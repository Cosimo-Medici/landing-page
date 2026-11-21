# Current copy inventory · EXE-114

Run `python3 scripts/copy-inventory.py` from this checkout. Python's standard
library is sufficient. This reads the current HTML, crawler summaries, linked
script identities, and existing audit identities; it changes no website files.
The default output is private:

`~/Library/Application Support/cosimo-content/copy-inventory/exe-114/`

- `review.html`: expandable, mobile-readable current-copy worksheet.
- `inventory.json`: exact source fragments, file/line/offset locators, source and
  text hashes, metadata, CTA destinations, page text, script dependencies, and
  contextual audit hashes. Proposed replacements and substantiation start empty.
- `latest.json`: daily-brief-compatible observation with counts, dependencies,
  and evidence paths. It does not report a rewrite or publication as complete.

`--output /absolute/private/directory` supports isolated snapshots. Output inside
the website checkout is rejected. Keep generated records private; their exact
source and local paths are editorial working material, not website assets.

## Use the existing work

Read `docs/website-audit.md`, `docs/re-copy-audit.md`,
`docs/marketing-legal-audit.md`, and the linked audience/buyer audits before
rewriting. They contain useful decisions and evidence limits, but are historical
reviews. Their presence does not verify a current product or customer claim.

For example, the October EXE-114 ticket describes the homepage headline as
“Financial operations. Ready for review.” The current source already uses
“Your next finance hire isn’t a person.” Review the snapshot rather than treating
that earlier ticket text as the current website. The existing `info@medici.ai`
mailto destination is an observed address, not a newly selected brand identity.

For each candidate line, record the buyer/task, the rhetorical principle to
consider, existing proof and its limits, and the eventual proposed replacement.
The ticket's principles are reframing the purchase as a hire, a costly signal,
specificity, buyer control, distinctive details, and sector-specific timing.
Do not introduce a warranty, price, savings number, customer outcome or new
capability merely to satisfy that rubric. Reuse exact approved evidence where
available; retain a missing-evidence decision when it is not.

## Boundaries and reconciliation

This is a source inventory, not a semantic claims checker or a deployed-site
audit. Flags use transparent regexes and intentionally overinclude example
figures, dates, questions, and negations. All records remain unreviewed.
Nested tags overlap, so counts are review records, not unique claims. Source
HTML and offsets preserve exact text; the display normalizes whitespace.
Accessible labels remain separate from visible source text.

Record IDs use file, tag and ordinal, so unchanged source replays identically.
An insertion can change later IDs: compare file and fragment hashes before
carrying a review decision forward. Do not attach approvals by ID alone.

Script-generated headlines, sample documents, dialog states and dynamic copy
need review of the explicitly listed script files. Their hashes let reviewers
detect changes; the CLI does not claim to execute all interactive states.
JSON-LD and crawler summaries are retained separately. Current company and
personal LinkedIn profiles remain a separate collection step. This tool does
not write either profile, create posts, or run the CEO writing workflow.

The actual copy/offer/voice decisions and publication remain deferred. This
completes the reusable source-collection part of EXE-114 only.

## Verified local observation · 20 November 2026

18 HTML sources (17 site pages plus the product-example shell), 1,352 block
records, 285 heuristic flags, 14 linked script assets, two crawler summaries,
and ten contextual audits were inventoried. All source fragments, offsets,
line numbers and artifact hashes matched the actual files; replay was identical
apart from the observation time. Embedded JSON-LD parsed, every linked script
resolved, and an attempted output path inside `dist/` was rejected.

The real private review HTML was served on a temporary loopback HTTP server
and opened in Chrome at 1,440px and 375px. All 18 sections were present; expanding
the homepage exposed its 95 records with no horizontal overflow. The existing
local website returned HTTP 200 and matched the inventoried homepage headline
and contact address. The temporary server and browser were closed afterward.
No website build, content mutation, external request, or publication was needed.

Private `verification.json`, `ui-verification.json`, and two screenshots retain
this observation. They are dated verification artifacts, not a replacement for
rerunning the inventory after source changes. No claims were approved.
