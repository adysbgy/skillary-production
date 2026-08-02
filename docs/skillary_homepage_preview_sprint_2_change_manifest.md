# Skillary Homepage Preview — HP-S2 Change Manifest

**Sprint:** `HP-S2 — Isolated Route & Structural Skeleton`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S3`
**Plan:** `docs/skillary_homepage_preview_execution_plan.md` v1.2
**Plan SHA-256:** `c97f9099ce7619cb859f346a1dc1033863a346fcc670bae638daab1ca64d28f2`

## Baseline dan boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` existing; protected dan tidak disentuh HP-S2 |
| Preview route | `/lp/homepage-preview`; baru dan isolated |
| Payment | `HOLD`; tidak ada purchase/checkout CTA |
| Approved homepage records | `0`; designed empty states digunakan |

Worktree sudah sangat berubah sebelum rangkaian homepage preview dimulai. Semua perubahan di luar ownership HP-S0–HP-S2 adalah milik pengguna atau pekerjaan lain dan tidak boleh dibersihkan, dipindah, atau di-reset.

## Added files HP-S2

| Path | Ownership / rollback boundary |
|---|---|
| `src/app/(standalone)/lp/homepage-preview/layout.tsx` | Segment metadata `noindex, nofollow` dan preview-only social metadata |
| `src/app/(standalone)/lp/homepage-preview/page.tsx` | Node, force-dynamic entry yang menghubungkan server data ke preview |
| `src/app/(standalone)/lp/homepage-preview/loading.tsx` | Minimal loading fallback tanpa H1 tandingan |
| `src/app/(standalone)/lp/homepage-preview/error.tsx` | Minimal on-brand client error boundary dengan retry |
| `src/features/marketing/homepage-preview/blueprint.ts` | Locked 13-band implementation blueprint dan validation helper |
| `src/features/marketing/homepage-preview/components/BlueprintBand.tsx` | Semantic band primitive dan debug/contract markers |
| `src/features/marketing/homepage-preview/components/PreviewHeader.tsx` | Structural desktop/mobile preview header |
| `src/features/marketing/homepage-preview/components/PreviewFooter.tsx` | Structural preview footer dengan legal group |
| `src/features/marketing/homepage-preview/components/PreviewShell.tsx` | Skip link, header/footer ownership, dan focus target |
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Composition untuk 11 middle bands dan data-state rendering |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Feature-local tokens, surfaces, responsive rules, focus, loading/error styles |
| `tests/homepage-preview/blueprint-structure.test.mjs` | 13-band metadata/order, semantics, branding, and source guardrails |
| `tests/homepage-preview/runtime-route.test.mjs` | Output-level HTTP, robots, sitemap, landmark, anchor, band, payment assertions |
| `docs/skillary_homepage_preview_sprint_2_report.md` | HP-S2 outcome, QA evidence, limits, and checkpoint |
| `docs/skillary_homepage_preview_sprint_2_change_manifest.md` | HP-S2 ownership and rollback record |

## Narrow modifications to HP-S1-owned files

| Path | Exact HP-S2 ownership |
|---|---|
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Menambahkan safe static destinations untuk preview, privacy, dan terms yang dipakai shell baru |
| `tests/homepage-preview/data-contract.test.mjs` | Menambah assertion destination contract yang digunakan shell HP-S2 |
| `tests/homepage-preview/source-safety.test.mjs` | Memperluas source/protected/forbidden audit ke route dan UI HP-S2 |
| `tsconfig.homepage-preview-tests.json` | Memasukkan blueprint dan route-safe compile surface HP-S2 |

Tidak ada hunk HP-S2 pada homepage aktif, global CSS, package manifest/lockfile, Next config, Prisma schema, global robots/sitemap, standalone `/lp` layout, atau payment availability.

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S2 result |
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

Rollback HP-S2 hanya boleh:

1. menghapus added files HP-S2 pada tabel di atas;
2. membalik tiga destination entries dan hunk test/tsconfig HP-S2 yang disebut pada tabel narrow modifications;
3. mempertahankan seluruh file dan registry data HP-S1;
4. tidak memakai reset, checkout massal, atau penghapusan folder luas.

`.homepage-preview-test-build/` adalah output sementara verifikasi dan bukan deliverable.

Rollback HP-S2 tidak boleh menyentuh homepage aktif, root/global shell, auth, payment, schema, konfigurasi, reference evidence, maupun perubahan pre-existing lainnya.
