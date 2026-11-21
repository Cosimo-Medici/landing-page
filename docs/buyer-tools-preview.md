> Superseded on 20 November 2026: the form sends an email to info@medici.ai with an
> attribution block instead of a JSON download. See `docs/release-runbook.md`. The
> `scripts/verify-buyer-tools.cjs` command below takes a second argument (output directory).

# Buyer tools: private implementation preview

ENG-855 uses the existing site shell and a shared browser/Node contract in
`src/js/buyer-intake.js`. No framework, service or new dependency is installed.
The form prepares/downloads JSON locally; it has no upload, POST, CRM write,
email action or storage. A changed field invalidates the prepared download.
Unknown fields (including files, retention and approval overrides) are rejected.
UTM values retain their supplied provenance; they are not certified conversion events.
Existing `content-engine/scripts/link.cjs` generates the four-field CTA convention.

Build to a new private directory (ordinary production `build.js` is unaffected):

```
node scripts/build-buyer-tools.cjs "$HOME/Library/Application Support/cosimo-content/buyer-tools/preview-v1"
python3 -m http.server 8771 --bind 127.0.0.1 --directory "$HOME/Library/Application Support/cosimo-content/buyer-tools/preview-v1"
```

Open `/reverse-demo/`. Only use fictional details in this preview. Real-file intake
requires the existing executed evaluation NDA, agreed data scope/access/retention,
Shariq's deployment evidence, and a bounded technical/delivery agreement (EXE-86).
The request exports those pending requirements; checking a browser box cannot
create approval. No default deletion period, SLA or new trial offer is introduced.

ENG-856's `scripts/check-waterfall-tier.py` reuses the existing waterfall lesson's
`_wf_lib.run_calc` and the committed European-tier calculation/contract. This is a
single-tier arithmetic adapter, not a full visitor-facing waterfall checker.
It accepts only explicitly fictional structured examples. The three claimed amounts
are compared exactly using Decimal; the underlying calculation envelope contains the
steps and warnings. It does not interpret an LPA, infer missing rates, resolve a
disagreement or approve a distribution. The full lesson's approval, capital-state
and independent-reading controls still apply to a complete waterfall.

```
../cosimo/agent/.venv/bin/python scripts/check-waterfall-tier.py /private/request.json /private/cosimo-content/result.json
```

Output must be a new file under `~/Library/Application Support/cosimo-content`.
Request contract: schemaVersion=1, kind="fictional_example", sourceReference,
inputs matching `calculate-european-waterfall-tier/contract.json`, and claimedResult
containing exactly amount_to_lp, amount_to_gp, remaining_pool as decimal strings.
Source/calculation hashes, exact input, envelope and comparisons are preserved.

The spot-error component reuses `prepare-statement-of-changes-partners-capital`.
`scripts/prepare-spot-error.py` runs the real calculation on the committed fictional
vector and checks all 16 independently derived expected figures. It changes exactly
one displayed ending-balance figure: 5,480,000.00 instead of 5,470,000.00. The unchanged
rows include 170,000.00 net operations and 5,300,000.00 ending unfunded commitment.
The private evidence file retains the original input, full envelope and vector hash.

```
../cosimo/agent/.venv/bin/python scripts/prepare-spot-error.py "$HOME/Library/Application Support/cosimo-content/buyer-tools/spot-error-v1"
node scripts/build-buyer-tools.cjs "$HOME/Library/Application Support/cosimo-content/buyer-tools/preview-v3" --spot-error "$HOME/Library/Application Support/cosimo-content/buyer-tools/spot-error-v1/challenge.json"
```

The builder checks the expected figures against that committed vector again before
writing `/spot-the-error/`. Browser answers are compared with exact integer cents;
the answer key is necessarily inspectable in this client-only practice component.
It is not an answer-collection backend or fraud-resistant measurement system.
The four UTM fields carry into the local reverse-demo request. Solve rate, submissions
and public-month start remain null. No editorial approval or monthly launch is implied.

Remaining: source-backed full-waterfall input/interpretation and review flow;
buyer-facing calculation form; approved monthly exercise and real answer collection;
genuine solve-rate measurements over one month; deployment and real-file intake
permissions. No solve-rate, customer result or public release is fabricated.

## Verification and private evidence

With a preview served on loopback, run `node scripts/verify-buyer-tools.cjs http://127.0.0.1:8774`.
This is an isolated static-component check, not a backend/workflow E2E suite. It runs
the actual browser form and downloads at 1440px and 390px in both site themes, checks
wrong/correct answers, attribution propagation, edit invalidation, overflow and
external/write network requests. Screenshots still require visual inspection.

Latest prepared build: `~/Library/Application Support/cosimo-content/buyer-tools/preview-v5/`.
Sibling evidence: `browser-verification.json`, `intake-verification.json`,
`waterfall-verification.json`, `waterfall-tier-cli-result.json`,
`spot-error-verification.json`, and `spot-error-v1/calculation-evidence.json`.
Use the private claim register at `~/Library/Application Support/cosimo-content/security-commercial/2026-11-20/index.html`
only as private evidence preparation; EXE-86 verification remains open.
