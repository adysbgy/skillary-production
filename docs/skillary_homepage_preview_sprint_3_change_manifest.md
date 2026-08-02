# Skillary Homepage Preview — HP-S3 Change Manifest

**Sprint:** `HP-S3 — First Viewport`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S4`
**Plan:** `docs/skillary_homepage_preview_execution_plan.md` v1.2
**Plan SHA-256:** `c97f9099ce7619cb859f346a1dc1033863a346fcc670bae638daab1ca64d28f2`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` existing; protected dan tidak disentuh HP-S3 |
| Preview route | `/lp/homepage-preview`; tetap isolated dan noindex |
| Payment | `HOLD`; tidak ada purchase/checkout CTA |
| Search tracking | `disabled` |

Worktree telah mempunyai banyak perubahan milik pengguna dan fase lain. HP-S3 hanya memiliki file/hunk yang tercatat di bawah.

## Added files HP-S3

| Path | Ownership / rollback boundary |
|---|---|
| `src/features/marketing/homepage-preview/components/preview-navigation.ts` | Shared safe navigation groups for desktop/mobile |
| `src/features/marketing/homepage-preview/components/PreviewIcons.tsx` | Authored single-stroke SVG icon family |
| `src/features/marketing/homepage-preview/components/PreviewSearch.tsx` | Minimum local search with idle/results/empty state and no tracking |
| `src/features/marketing/homepage-preview/components/PreviewMobileNavigation.tsx` | Native dialog drawer, focus return, grouped navigation, compact search |
| `public/images/homepage-preview/hero-individual-v1.webp` | Selected original individual portrait derivative |
| `public/images/homepage-preview/hero-organization-v1.webp` | Selected original organization portrait derivative |
| `docs/references/skillary-hero/2026-08-01/PROVENANCE.md` | Generation, identity, rights, selection, crop, and loading contract |
| `docs/references/skillary-hero/2026-08-01/hp-s3-hero-candidate-contact-sheet.jpg` | Four-candidate internal review sheet |
| `tests/homepage-preview/first-viewport.test.mjs` | Header/search/drawer/asset/provenance/LCP source gates |
| `docs/skillary_homepage_preview_sprint_3_report.md` | HP-S3 result and Hero Gate evidence |
| `docs/skillary_homepage_preview_sprint_3_change_manifest.md` | Ownership and rollback record |

## Modified HP-S2-owned files

| Path | Exact HP-S3 ownership |
|---|---|
| `src/features/marketing/homepage-preview/components/PreviewHeader.tsx` | Final utility/discovery header, Skillary mark, desktop search, mobile entry points |
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Two static Next images, audience captions, capability bubbles, hero action icons, method rail |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Header/search/drawer/hero responsive and focus styles only; feature-local |
| `src/features/marketing/homepage-preview/blueprint.ts` | Blueprint version `HP-S3.0` and updated header/hero implementation contract |
| `tests/homepage-preview/blueprint-structure.test.mjs` | HP-S3 blueprint/owned-asset assertions |
| `tests/homepage-preview/runtime-route.test.mjs` | Output assertions for search, sticky nav, dialog, and two hero portraits |

No HP-S3 hunk exists in route metadata, homepage active, global CSS, package manifest/lockfile, Next config, Prisma schema, robots, sitemap, payment availability, auth, or database loader.

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S3 result |
|---|---|---|
| `src/app/page.tsx` | `c68bcfc25eef8c81dcd2bf17d3abe703b33538dccdb59193f8638f8006c4dc72` | PASS |
| `src/app/globals.css` | `eb5ae4911d8af6e64929d3fcd03e90f9a6b3840b12ea8043a03f36151f387c5a` | PASS |
| `next.config.ts` | `ca92db1b507e7dcd39f1400b1d604cf7a0de5bb610dd3ce98ebd3b70c1342b3c` | PASS |
| `package.json` | `2e2f17291830d0e6adf808ecc8fd35f9287bbb1d22f29ebe0aecd874fae89ef8` | PASS |
| `package-lock.json` | `f6d768fd72509c49a66f2b4898eb34a416f50f1b0dd150931642595a5b0b9d95` | PASS |
| `prisma/schema.prisma` | `b5f1287c329ea2f78231335968bd1b83d0186268e0ec11db91c3354e3b4509e8` | PASS |
| `src/app/robots.ts` | `54cd2d8a43b6a3698e2d6e3a4c3870ecb37e8f04e2aef4e6394ab427a803b054` | PASS |
| `src/app/sitemap.ts` | `8b10782daf224d753ad9f8249f66b758b6be95f09088244fc136f2f8f9e5f463` | PASS |
| `src/app/(standalone)/lp/layout.tsx` | `b8a5c18d3c9102b17cae8519b22bb779a41948ac62170b00daca83090cc1b602` | PASS |
| `src/lib/payments/payment-availability.ts` | `7edb914d0e645d53f931d29e9bd4e450355289e5a97f20f0ac59421a1de0c068` | PASS |

## Rollback rule

Rollback HP-S3 hanya boleh:

1. menghapus added files HP-S3 pada tabel di atas;
2. membalik hunk HP-S3 pada enam modified files;
3. mengembalikan `PreviewHeader`, placeholder figure anatomy, CSS first viewport, blueprint version, dan test assertions ke exact state HP-S2;
4. mempertahankan seluruh data contract, route shell, 13-band structure, tests, dan reports HP-S0–HP-S2.

Rollback tidak boleh memakai reset, checkout massal, directory-wide deletion, atau mengubah homepage aktif, payment, auth, schema, configuration, maupun perubahan pre-existing lain.

`.homepage-preview-test-build/` dan `.integrity-test-build/` adalah output sementara verifikasi dan bukan deliverable.
