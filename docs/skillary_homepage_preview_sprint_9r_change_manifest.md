# Skillary Homepage Preview — HP-S9R Change Manifest

**Tanggal:** 1 Agustus 2026
**Scope:** Pre-promotion readiness only
**Promotion:** Tidak dilakukan

## Source files changed

- `src/features/marketing/homepage-preview/HomepagePreview.tsx`
  - menormalkan hero images ke `loading="eager"`;
  - memperjelas format-card workshop, CTA, FAQ, dan source-state label.
- `src/features/marketing/homepage-preview/components/PreviewMobileNavigation.tsx`
  - menambahkan explicit `cancel` dan `Escape` close handling;
  - mempertahankan focus return melalui native dialog `close` event.
- `src/features/marketing/homepage-preview/components/PreviewHeader.tsx`
  - mengubah direct mobile workshop entry menjadi `Workshop berikutnya`.
- `src/features/marketing/homepage-preview/components/preview-navigation.ts`
  - menyelaraskan primary navigation workshop wording.
- `src/features/marketing/homepage-preview/components/PreviewDiscoveryTabs.tsx`
  - menyelaraskan label discovery tab.
- `src/features/marketing/homepage-preview/components/PreviewFooter.tsx`
  - menyelaraskan footer navigation wording.
- `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts`
  - menaikkan contract ke `HP-S9R.1`;
  - memperbarui destination label dan truthful workshop empty/unavailable copy.
- `src/features/marketing/homepage-preview/data/types.ts`
  - menyelaraskan contract-version type.

## Regression coverage changed

- `tests/homepage-preview/first-viewport.test.mjs`
- `tests/homepage-preview/responsive-accessibility.test.mjs`
- `tests/homepage-preview/discovery-experience.test.mjs`
- `tests/homepage-preview/data-contract.test.mjs`
- `tests/homepage-preview/runtime-route.test.mjs`

## Intentionally unchanged

- `src/app/page.tsx` dan homepage `/`.
- Brand palette, hero composition, figures, program covers, product proof, organization journey, FAQ layout dan footer layout.
- Workshop registry, faculty registry, learning-path registry dan conditional proof registries.
- Payment/checkout policy.
- Maven reference archive dan seluruh evidence/provenance sebelumnya.

## Runtime state

- Production build lulus.
- Preview server hasil build terbaru berjalan di port `3210`.
- HP-S10 belum dijalankan.
