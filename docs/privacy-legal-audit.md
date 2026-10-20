# Privacy and legal audit — 14 October 2026

Scope: static marketing site source, bundled fictional demo, website terms/privacy. This is an evidence-based implementation review, not a certification of all US legal compliance. Revenue, resident counts, actual platform contracts/vendor terms, production infrastructure and operational controls were not available for verification.

## Implemented

- Privacy now discloses the theme localStorage key and locally computed time-zone theme. No precise geolocation request exists.
- Added marketing-site Do Not Track/behavioral tracking explanation and external Google Fonts/browser request disclosure. Contact links are mailto or external Gmail compose, not a website form.
- Replaced vague automatic interaction collection with hosting technical requests/platform account activity; replaced speculative analytics vendor examples with actual service categories.
- Removed unsupported “regular security assessments” assertion. Retained encryption/no-training commitments from existing product policy/deck; these still require operational verification.
- Google merger/acquisition transfer now requires explicit prior user consent, not mere prior notice. Human access exception now limits aggregate use to lawful internal operations.
- Terms no longer contradict robots/sitemap/LLMs by prohibiting all automated crawling. Preserved intellectual property legal/license exceptions, inquiry use consistent with privacy, non-waivable rights, fictional-demo/no-securities-offer explanation. Website-only scope remains explicit.
- Effective dates updated; no deployment performed.

## Source inspection

All 11 HTML documents load Google Fonts and local JS/CSS. No ad pixels, session replay, analytics endpoint, site contact form, or website payment flow observed. Theme JS only stores `medici-theme`; computes time-zone theme locally. Embedded demo has no cookie/localStorage or analytics SDK signatures. Its two fetch references are preload and reusable file-upload code; presence is not evidence of active upload/backend. Parent browser review should verify runtime requests/deployed host/CDN additions.

## Unresolved business/operational requirements

1. **Google API Limited Use and private credit:** Google's current policy expressly prohibits scoped Google data use to determine creditworthiness or for lending purposes. Product markets credit/covenant workflows; whether their actual source/outputs constitute prohibited use requires engineering/Google/counsel review. Do not claim clearance. Review restricted scopes, OAuth verification and any required annual security assessment. Website language does not solve application policy compliance.
2. **Deletion:** Owner clarified that client retention/deletion is governed separately by service terms and directed removal of the blanket 90-day website statement. The current policy refers to the applicable service agreement, client instructions and law; website inquiry/technical data has a purpose-based retention explanation. Verify operations against actual contractual terms. Disconnection removes credentials, not already retained records, as disclosed.
3. **Vendor contracts/no training/encryption/isolation:** verify deployed provider settings, DPA terms, subprocessor roster, authorized personnel access, logs and support access. “Contractually obligated” and “never trained” are enforceable promises, not established by source review.
4. **State law applicability:** complete an annual business data map across all applicable states. CCPA/CPRA depends on business/data thresholds and relationships, and can cover B2B contacts. Do not assume a B2B-only website is exempt. Determine required notices, sensitive-data rules, rights/appeals, universal opt-out handling and processing agreements; current no-sale/no-ad-tracking site does not itself call for a cosmetic cookie banner.
5. **Terms:** Delaware venue, $100 cap, entity name/legal form and browsewrap enforceability need counsel confirmation; a footer link does not guarantee contractual assent or prevent ADA/statutory claims. No arbitration clause or invented address added.
6. **Email/phone outreach:** CAN-SPAM applies to commercial email, including B2B: opt-out/address/headers must be handled in actual campaigns. No campaign sending reviewed. Consent and TCPA/state rules require review before automated calls/texts. A contact link is not consent to unlimited marketing.
7. **Children:** site aimed at adult fund professionals, no child-directed content/age-related collecting observed. COPPA can still apply with actual knowledge of under-13 collection; do not treat an “18+” paragraph as a defense.
8. **Security/breach/state operational laws:** production security and incident notice readiness require separate operational review; website edits cannot satisfy them. No health/biometric/consumer credit-report collection observed on marketing site.

## Official sources reviewed

- FTC privacy promises: https://www.ftc.gov/business-guidance/privacy-security
- California Attorney General CalOPPA/DNT explanation: https://www.oag.ca.gov/news/press-releases/attorney-general-kamala-d-harris-launches-new-tool-help-consumers-report
- California AG CalOPPA guidance: https://oag.ca.gov/sites/all/files/agweb/pdfs/cybersecurity/making_your_privacy_practices_public.pdf
- California AG current CCPA guide (updated August 2026): https://oag.ca.gov/privacy/ccpa (threshold inflation/current regulations need direct CalPrivacy confirmation rather than treating FAQ as exhaustive)
- Google API Services User Data Policy: https://developers.google.com/terms/api-services-user-data-policy (Limited Use applies also to derived/aggregate data; merger explicit consent; lending prohibition; security assessment where applicable)
- Google Workspace data policy: https://developers.google.com/workspace/workspace-api-user-data-developer-policy
- FTC COPPA: https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions
- FTC CAN-SPAM: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business

Accessibility and marketing-claims audits are owned by other agents.

## Follow-up implementation

Added privacy request/appeal email subjects, minimal verification guidance, authorized-agent requests, non-discrimination, applicable opt-out and sensitive-use rights, and organizational-controller referrals. No universal statutory deadlines or universal entitlement invented; actual handling must meet the applicable law.

Read-only application evidence: `frontend/convex/crons.ts:187` explicitly pauses workflow terminal-run retention until an archive solution exists. Its chat/email 90-day cleanup is not evidence of a termination-wide deletion process. An offline/manual termination process may exist, so this does not establish a broken commitment, but contractual deletion obligations require documented end-to-end verification. The former blanket website deadline was subsequently removed at the owner’s direction.

`agent/src/config.py:344` defines AWS Bedrock inference model IDs. AWS's official current explanation supports no training for Bedrock inputs/outputs: https://repost.aws/knowledge-center/amazon-bedrock-model-data-use . This supports the main inference channel, not every extraction, verification, observability, or other provider channel. Retain existing commitment and validate all deployed providers.

Additional primary rights authorities: https://coag.gov/resources/colorado-privacy-act/ and https://coag.gov/app/uploads/2023/03/FINAL-CLEAN-2023.03.15-Official-CPA-Rules.pdf . State-law threshold applicability remains a business-fact review, not a copy defect.

Fonts follow-up: all 12 HTML pages now reference locally served `fonts.css` and licensed font files; privacy disclosure updated to local delivery. Earlier external-font inventory above describes the pre-remediation state. Accessibility help page reviewed: it describes guidance and assistance rather than claiming legal certification or full WCAG conformance; no content change required.
