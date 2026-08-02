# Skillary Homepage Preview — HP-S9P Change Manifest

**Tanggal:** 1 Agustus 2026
**Scope:** Focused founder polish only
**Promotion:** Tidak dilakukan

## Source files changed

- `src/features/marketing/homepage-preview/HomepagePreview.tsx`
  - menambahkan direct audience routes untuk individu dan organisasi;
  - mengubah hero capability strip menjadi signature `Belajar — Praktik — Buktikan`;
  - menyederhanakan trust narrative dan istilah campuran Inggris–Indonesia;
  - menyelaraskan product proof, artifact, evidence, organization, inspection, FAQ, dan closing copy.
- `src/features/marketing/homepage-preview/HomepagePreview.module.css`
  - menambahkan step marker, orange seam, connector, hierarchy copy, dan mobile behavior untuk signature strip.
- `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts`
  - menaikkan contract ke `HP-S9P.1`;
  - menambahkan safe anchor `organizationJourneySection`;
  - menyelaraskan capability copy.
- `src/features/marketing/homepage-preview/data/types.ts`
  - menyelaraskan contract-version type ke `HP-S9P.1`.

## Regression coverage changed

- `tests/homepage-preview/first-viewport.test.mjs`
- `tests/homepage-preview/discovery-experience.test.mjs`
- `tests/homepage-preview/truthful-proof.test.mjs`
- `tests/homepage-preview/organization-closing.test.mjs`
- `tests/homepage-preview/runtime-route.test.mjs`

Coverage baru mengunci signature hero, direct audience routes, plain-language copy, consolidated anonymity boundary, evidence stages, organization outputs, inspection copy, serta production HTML.

## Intentionally unchanged

- Homepage `/` dan `src/app/page.tsx`.
- Header/footer route `/untuk-organisasi` menuju halaman detail B2B.
- Dua figur hero original, program covers, 13-band structure, catalog data, registry gates, source policies, search, tabs, rails, dan dialog behavior.
- Workshop, faculty, learning-path, logo, testimonial, metric, dan case-study registries.
- Payment/checkout policy.
- Maven reference archive dan seluruh evidence/provenance.

## Runtime state

- Production build lulus dengan 166 static pages.
- Preview build terbaru berjalan di port `3210`.
- HP-S10 belum dijalankan.
