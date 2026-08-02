# Skillary Homepage Preview — HP-S1 Change Manifest

**Sprint:** `HP-S1 — Content & Data Contract`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S2`
**Plan:** `docs/skillary_homepage_preview_execution_plan.md` v1.2
**Plan SHA-256:** `c97f9099ce7619cb859f346a1dc1033863a346fcc670bae638daab1ca64d28f2`

## Baseline dan boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Dirty entries sebelum HP-S0 | `112` |
| Homepage aktif | `/` existing; protected dan tidak disentuh |
| Preview route | `/lp/homepage-preview` masih belum dibuat |
| Payment | `HOLD`; kontrak HP-S1 hard-coded fail-closed |
| Initial approved homepage records | `0` |

Worktree sudah sangat berubah sebelum sprint ini. Semua perubahan di luar daftar owned files di bawah adalah milik pengguna atau pekerjaan lain dan tidak boleh dibersihkan, dipindah, atau di-reset.

## Owned files HP-S1

Semua implementation dan verification file berikut baru dan additive.

| Path | Action | Ownership / rollback boundary |
|---|---|---|
| `src/features/marketing/homepage-preview/data/types.ts` | Added | Presentational types, registry types, source states |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Added | Destination, search, safe copy, payment-hold contract |
| `src/features/marketing/homepage-preview/data/homepage-preview-policy.ts` | Added | Approval, expiry, workshop, rights, proof policy |
| `src/features/marketing/homepage-preview/data/homepage-preview-provenance.ts` | Added | Server-only empty approval registry |
| `src/features/marketing/homepage-preview/data/homepage-preview-service.ts` | Added | Pure fail-soft loader core with injected readers |
| `src/features/marketing/homepage-preview/data/get-homepage-preview-data.ts` | Added | Read-only Prisma server adapter |
| `tests/homepage-preview/data-contract.test.mjs` | Added | Runtime contract, fail-soft, expiry, destination tests |
| `tests/homepage-preview/source-safety.test.mjs` | Added | AST import/write audit and protected-hash assertions |
| `tsconfig.homepage-preview-tests.json` | Added | Isolated compile target; no new dependency |
| `docs/skillary_homepage_preview_sprint_1_change_manifest.md` | Added | HP-S1 ownership and rollback record |
| `docs/skillary_homepage_preview_sprint_1_report.md` | Added | Gate result and founder checkpoint |

`.homepage-preview-test-build/` adalah output sementara dari verifikasi, bukan deliverable, dan dibersihkan setelah gate selesai.

## Protected file fingerprints

Nilai HP-S0 tetap identik setelah HP-S1.

| Protected path | Expected SHA-256 | HP-S1 result |
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

Rollback HP-S1 hanya boleh menghapus sebelas owned files pada tabel di atas beserta folder feature/test yang menjadi kosong. Jangan memakai reset, checkout massal, atau penghapusan luas. Jangan menyentuh HP-S0 reference evidence, homepage aktif, konfigurasi, schema, payment, maupun perubahan pre-existing lain.
