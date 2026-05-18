# Legacy Portfolio Claim Safety Guidelines

## Overview
As Skillary is the digital evolution of training services provided under the "Allman" brand since 1998, it is critical that we communicate our track record accurately, honestly, and without creating legal or reputational risk. 

The data in `src/lib/legacy-portfolio.ts` represents a **curated subset of digital archives**, not the exhaustive list of all historical clients.

## Non-Negotiable Rules

1. **No Absolute "Trusted By" Claims**
   - Do NOT use headers like "Dipercaya oleh" or "Trusted By" followed by a strip of logos unless explicit, written permission from the client exists for the *Skillary* brand.
   - **Alternative:** "Sebagian portofolio pengalaman pelatihan Allman yang melatarbelakangi Skillary."

2. **No "Skillary Clients" Framing**
   - Do NOT claim that these historical clients bought "Skillary" software or services.
   - **Alternative:** Frame them as organizations where the training team (Allman) previously facilitated sessions. Example: "Berangkat dari pengalaman mendampingi pelatihan di berbagai organisasi seperti..."

3. **Honest Metrics**
   - Do NOT use fake impact metrics (e.g., "10,000+ peserta puas"). 
   - Do NOT use exact numbers unless backed by the digital archive JSON.
   - **Disclaimer Required:** Whenever displaying the digital archive metrics, always include the micro-disclaimer: *"Angka dokumentasi digital merujuk pada arsip konten yang berhasil dikurasi, bukan total keseluruhan pengalaman Allman sejak 1998."*

4. **No Fake Testimonials**
   - Do NOT generate fake quotes or attribute them to real people. Testimonials must come directly from verified feedback forms or documented video interviews.

## Content Governance
If new legacy data is found or needs to be added:
1. Validate the documentation (photos, proposal, or certificate).
2. Add it to the JSON registry (`src/lib/legacy-portfolio.ts`).
3. Only use the approved categories (e.g., Data Analytics, Presentation, Infographics) to maintain brand focus.

## Public Portfolio UI Rules (Added Phase: Legacy Portfolio Sprint)

The `/portfolio` page is now live and renders data directly from `src/lib/legacy-portfolio.ts`. The following rules govern its public display:

1. **No Client Logos** — Organization names appear as text only. No logos are rendered, fetched, or embedded.
2. **No "Skillary Client" Label** — Every portfolio card is tagged "Arsip Allman" to clearly attribute the experience to the legacy brand.
3. **Proof URLs Are External References Only** — Links point to external Instagram posts. They open in new tabs with `rel="noopener noreferrer"`. No content is scraped or embedded.
4. **Missing Proof URLs Are Marked** — Cards without proof URLs display a yellow "Perlu validasi dokumentasi" badge instead of a dead link.
5. **Documented Count ≠ Total History** — The summary metrics section includes the mandatory micro-disclaimer. The hero section explicitly states the archive is partial.
6. **Archive Page Is Not a Formal Impact Report** — No outcome metrics (e.g., satisfaction scores, completion rates) are displayed because they have not been validated.
7. **Case Study Candidates Are Labeled** — Cards from the blueprint marked as `case_candidate` display a distinct orange "Case Study" badge but link to the same proof URLs. No full case study content is generated.

## Case Studies UI Rules (Added Phase: Case Studies Sprint)

The `/case-studies` page renders curated case cards derived from `legacyCaseStudies` in `src/lib/legacy-portfolio.ts`. The following rules govern display:

1. **Case Cards Are NOT Formal Impact Reports** — They are framed as "ringkasan pengalaman pelatihan", never as measured outcomes or success stories.
2. **Do Not Invent Outcomes** — No satisfaction scores, completion rates, ROI figures, or impact claims are displayed unless backed by validated evidence.
3. **Do Not Call Them "Success Stories"** — Use "ringkasan pengalaman pelatihan" or "studi kasus pengalaman" only.
4. **Do Not Invent Testimonials** — No quotes from clients or participants are generated.
5. **Training Focus Is Category-Based** — The `trainingFocus` field is derived from a category mapping, not from client-specific claims.
6. **Skillary Relevance Is Standardized** — The same relevance sentence is used across all cards. It describes the platform's digital capabilities, not outcomes.
7. **Safety Notice Is Mandatory** — A yellow info banner at the top of the page explicitly states these are not formal impact reports.
8. **Proof/Validation Status Is Always Shown** — Cards without proof URLs display "Dokumentasi perlu validasi".

## Proof URL QA Rules (Added Phase: Proof Validation Sprint)

External proof links must be periodically validated to maintain credibility. The following rules apply:

1. **Periodic Checking Required** — Run `npm run validate:proof-links` before outreach, proposals, and quarterly.
2. **Broken/Private Links Must Be Marked** — Links that fail validation should be flagged for manual review, never silently removed.
3. **Never Replace Proof with Fabricated Links** — If a proof URL is permanently broken, the card retains the "Perlu validasi dokumentasi" badge instead of a fake replacement.
4. **Never Scrape External Content** — The validation script checks reachability only. No images, captions, or content are downloaded.
5. **Public Cards Without Valid Proof** — Must retain the "Perlu validasi dokumentasi" badge in the UI. Do not hide the card.
6. **Instagram Login Redirects Are Not Always Failures** — Instagram may redirect automated requests to login pages even for public posts. Manual browser verification is the authoritative check.
7. **Validation Reports Are Internal** — The JSON and Markdown reports in `docs/` are for internal QA only and should not be exposed publicly.

## Manual Proof Validation Rules (Added Phase: Manual Validation Sprint)

1. **Automated Checks Are Not Definitive** — Automated scripts cannot verify Instagram visibility due to login walls. Human browser verification is required.
2. **Track Manual Status Before Use** — Before using a proof URL in a formal proposal or high-visibility case study, its manual status must be tracked and confirmed in `src/lib/legacy-proof-validation.ts`.
3. **Broken/Private Proof Limits Usage** — URLs marked as `PRIVATE` or `BROKEN` should not be used as primary evidence in targeted sales collateral.
4. **Missing Proof Retains Badge** — If proof cannot be validated, the card must continue to display the "Perlu validasi dokumentasi" badge to ensure public honesty.
5. **Validation ≠ Logo Permission** — Successfully validating an external proof URL does NOT grant Skillary the right to use that organization's logo. Logo usage still requires explicit written consent.

## Reference Documents
- **Sales Alignment:** `docs/legacy_proof_sales_usage_guide.md`
- **Manual Validation Workflow:** `docs/proof_url_manual_validation_workflow.md`
- **Manual Validation Tracker:** `docs/proof_url_manual_validation_tracker.md`
