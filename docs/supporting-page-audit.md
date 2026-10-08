# FAQ and About consistency audit

7 October 2026. Part of the independent marketing-site audit.

## Problem and changes

The new homepage and sector pages describe workflows configured and tested with the fund team, using reviewed drafts and clearly fictional examples. The old FAQ and About pages made a different promise: universal source tracing and audit readiness, quantified delivery and build-cost claims, absolute isolation claims, and fixed pilot terms. Those statements were not substantiated by the inspected marketing project.

- Replaced the FAQ with seven direct answers covering the product, five fund types, existing report formats, team review, illustrative examples, data/setup requirements, and how to start.
- Updated FAQ JSON-LD from the same copy. Visible answers and structured answers match exactly.
- Removed unsupported numerical benchmarks, automatic learning claims, generic-AI comparisons, universal integrations, security absolutes, and fixed pilot/lock-in terms from these marketing sections.
- Rewrote About’s product explanation around fund operations software, records, draft outputs, configuration, testing, and approval. Added hedge funds to the stated examples.
- Retained COSIMO branding, existing visual structure, typography, and styles. Updated metadata to identify Medici & Company accurately.
- Replaced deleted homepage anchors with `/#product`, `/#fit`, `/#work`, and `/#contact`. About’s homepage link now stays on the current host. About’s privacy/terms links use the same `.html` destinations as the site footer.
- Opened the first FAQ answer by default so the product explanation is immediately visible.

## Boundaries and follow-up

The Google Calendar disclosure in About is unchanged. Its exact scope, credential deletion timing, and user-data assertions require application verification; a marketing copy review is not evidence that they are correct. Privacy and Terms legal text were not edited. Existing canonical/OG domains remain unchanged pending the coordinated domain decision. The parent audit should also fix any stale navigation or claims in other supporting or machine-readable files.

An authored website example explains the proposed workflow but does not prove real application performance. A recorded, successful run remains the strongest missing sales asset. No customer results, testimonials, measured savings, integrations, response-time promises, or commercial terms were invented.

## Validation

`git diff --check` passes for the two pages. HTML parser checks found no duplicate IDs; every local page/fragment link resolves to the current source. All seven FAQ questions and answers exactly match their JSON-LD equivalents. Layout/CSS is unchanged; the parent agent owns final build and browser verification across themes and mobile.

## Follow-up: machine-readable summaries and legal-page navigation

Replaced `src/public/llms.txt` and `llms-full.txt` with the current six-route story: all funds, RE, VC, PE, private credit, and hedge. Removed obsolete turnaround, accuracy/audit, no-review, segregated-environment, automatic compliance, free-pilot, and fixed-duration claims. The summaries distinguish fictional prewritten examples from real application proof and explain the first-workflow contact action.

Updated **navigation only** in Privacy and Terms: current homepage section labels/anchors and “Talk to us.” COSIMO wordmarks were already correct. A comparison excluding the `<nav>` block confirmed every other byte remained unchanged, including the entire legal body.

Domain migration remains open. These edits do not change canonical URLs, OG URLs, sitemap entries, robots directives, legal references to cosimo.work, or the website domain in machine-readable summaries. The final medici.ai/cosimo.work deployment decision needs a single coordinated pass across those files and the hosting configuration; the current mixed domains should not be mistaken for a completed migration.
