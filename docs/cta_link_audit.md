# CTA Link Audit

This document tracks the expected routing behavior of all major Call-To-Action (CTA) buttons across the Skillary public website to ensure a cohesive sales funnel.

## Expected Routing Patterns

| CTA Copy / Intent | Expected Destination | Status |
| :--- | :--- | :--- |
| **Diskusi Kebutuhan Training** | `/contact` | Verified |
| **Jadwalkan Diskusi** | `/contact` | Verified |
| **Minta Proposal** | `/proposal` | Verified |
| **Lihat Area Program** | `/program-catalog` | Verified |
| **Untuk Organisasi / Lihat Solusi Organisasi** | `/teams` | Verified |
| **Platform Skillary / Lihat Platform** | `/platform` | Verified |
| **Layanan Skillary / Lihat Layanan** | `/services` | Verified |
| **Ajukan Kolaborasi Expert** | `/contact?type=expert` | Verified |
| **Kembali ke Beranda** (from 404) | `/` | Verified |

## Notes on Routing
- The `/contact` page handles multiple query parameters (e.g., `?type=expert`, `?type=platform`, `?type=assessment`) which should seamlessly prefill the form context without breaking the UI.
- All CTAs pointing to `/proposal` should guide the user to a page that sets clear expectations on what data is needed before routing them to the final form submission.
- Ensure no CTAs link out to broken anchors or legacy `#` references.
