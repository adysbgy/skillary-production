# Legacy Case Studies Public UI — Implementation Notes

## What Records Are Shown

12 curated case study cards derived from the `case_candidate` records in `legacyPortfolioCards`. Selection criteria:

1. **Proof URL availability** — all 12 selected records have at least one proof URL.
2. **Supporting posts count** — higher counts indicate more digital evidence (range: 1–15).
3. **Sector diversity** — Banking, Central Bank, Government, FMCG, Aviation represented.
4. **Category diversity** — 5 of 6 categories are represented (Infographics, Data, Presentation, Leadership, AI).
5. **Complete date/location data** — prioritized records with dates and venues.
6. **Avoids repetitive client clustering** — ordering interleaves different organizations.

### Selected IDs (in display order)
14, 12, 20, 21, 15, 23, 3, 13, 11, 17, 36, 28

## How Case Candidates Are Selected

Case candidates are portfolio records with `status: "case_candidate"` in the legacy data. There are 15 total case candidates out of 39 portfolio records. 12 were selected for the curated display; the remaining 3 (IDs: 19, 38, 23 duplicates) were excluded to avoid over-representation of the same client.

## What Copy Is Generated

Each card displays three generated text blocks:

1. **caseContext** — Template: `"Program ini merepresentasikan pengalaman pelatihan Allman dalam bidang {category} untuk organisasi dari sektor {sector}."`
2. **trainingFocus** — Derived from a static `TRAINING_FOCUS` mapping keyed by category. No client-specific claims.
3. **skillaryRelevance** — Standardized across all cards: `"Pengalaman seperti ini menjadi relevan dengan Skillary karena kini dapat didukung oleh alur digital: materi, assessment, sertifikat, progress peserta, dan laporan pelatihan."`

No outcomes, satisfaction scores, or testimonials are generated.

## What Is Intentionally NOT Shown

- Client logos
- Impact metrics or outcome data
- Satisfaction scores or NPS
- Testimonials or client quotes
- Embedded Instagram media
- "Skillary client" framing
- "Success story" framing

## Claim-Safety Disclaimers

Disclaimers appear in 3 locations:

1. **Yellow safety notice** — immediately below the hero, stating these are not formal impact reports.
2. **Below summary metrics** — explaining the curation source and count.
3. **Bottom of page** — full claim-safety paragraph about documentation scope and organizational name usage.

## Future Validation Tasks

- [ ] Verify all 12 proof URLs are still accessible.
- [ ] Cross-reference training dates with offline Allman records.
- [ ] Obtain client permission before upgrading any card to a full narrative case study.
- [ ] Add learner feedback only from verified, consented sources.
- [ ] Consider adding venue/photo documentation if publication permission is granted.
- [ ] Process Improvement, SOP & Quality category has no case candidate with proof — add if new evidence surfaces.
