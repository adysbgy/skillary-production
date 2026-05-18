# Legacy Portfolio Public UI — Implementation Notes

## What Is Displayed

### Summary Metrics (4 cards)
- **Pengalaman Sejak 1998** — Allman's founding year.
- **39+ Dokumentasi Terkurasi** — Unique valid events from the digital archive.
- **21+ Organisasi dalam Arsip** — Unique organizations detected in the curated data.
- **6 Area Program Utama** — The dominant training categories.

### Category Overview (6 cards)
Each category card shows the category name, description, event count, and number of example programs. Sourced from `legacyServiceCatalog`.

### Portfolio Grid (39 cards)
Each card renders: program title, category badge, client name (text only), sector, date, city/venue, supporting post count, and proof link. Cards are filterable by category using client-side state.

## What Is Intentionally NOT Displayed
- **Client logos** — No logos are embedded, fetched, or generated.
- **Satisfaction or impact metrics** — No outcomes like "97% puas" are shown.
- **Testimonials** — No quotes from clients or participants are rendered.
- **Embedded media** — No Instagram embeds, scraped images, or external media.
- **"Skillary Client" language** — All cards are tagged "Arsip Allman".

## Proof URL Handling
- Proof URLs link to Instagram posts and open in new tabs via `target="_blank"` with `rel="noopener noreferrer"`.
- If a card has multiple proof URLs, the first is shown as the primary CTA, with a `+N` indicator for additional documentation.
- Cards with zero proof URLs display a yellow warning badge: "Perlu validasi dokumentasi".

## Where Disclaimers Appear
1. **Hero section** — States that the archive is partial and Allman's history is broader.
2. **Below summary metrics** — The mandatory micro-disclaimer about digital curation scope.
3. **Bottom of page** — Full claim-safety paragraph before the CTA section.

## Future Validation Tasks
- [ ] Verify each proof URL is still accessible (Instagram posts may be deleted).
- [ ] Obtain written permission from organizations before adding logos.
- [ ] Cross-reference training dates with offline records for accuracy.
- [ ] Upgrade `case_candidate` items into full case study pages if documentation permits.
- [ ] Add learner feedback/testimonials only from verified, consented sources.
