# Skillary Homepage Preview — HP-S5A Change Manifest

**Sprint:** `HP-S5A — Internal Asset & Content Reconciliation`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S5B`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` protected dan tidak disentuh |
| Preview route | `/lp/homepage-preview` |
| Payment | `HOLD` |
| Program source | `src/data/v2-programs.ts` melalui server-only adapter |

Worktree telah mempunyai banyak perubahan milik pengguna dan fase sebelumnya. HP-S5A hanya memiliki file/hunk yang tercatat di bawah.

## Added files HP-S5A

| Path | Ownership / rollback boundary |
|---|---|
| `src/features/marketing/homepage-preview/data/homepage-preview-assets.ts` | Manifest origin, source/derivative hash, allowed use, label, alt, dan approval cover |
| `src/features/marketing/homepage-preview/data/homepage-preview-programs.ts` | Server-only adapter dari canonical Skillary program index |
| `public/images/homepage-preview/programs/power-bi-business-dashboard.webp` | Derivative program cover `720 × 480`, 27,956 byte |
| `public/images/homepage-preview/programs/data-driven-decision-making.webp` | Derivative program cover `720 × 480`, 28,918 byte |
| `public/images/homepage-preview/programs/ai-productivity-for-teams.webp` | Derivative program cover `720 × 480`, 40,260 byte |
| `public/images/homepage-preview/programs/business-presentation-reporting.webp` | Derivative program cover `720 × 480`, 25,102 byte |
| `docs/skillary_homepage_preview_sprint_5a_report.md` | Outcome, gates, browser QA, dan next checkpoint |
| `docs/skillary_homepage_preview_sprint_5a_change_manifest.md` | Ownership dan rollback record |

## Modified preview files

| Path | Exact HP-S5A ownership |
|---|---|
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Program discovery memakai card terverifikasi dan `next/image` |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Program media, label, body, hover, dan responsive card styling |
| `src/features/marketing/homepage-preview/data/types.ts` | Program source/approval/card types, reader, registry, search kind, section, contract version |
| `src/features/marketing/homepage-preview/data/homepage-preview-provenance.ts` | Empat approval program; registry lain tetap kosong |
| `src/features/marketing/homepage-preview/data/homepage-preview-policy.ts` | Eligibility dan registry validation untuk program |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Contract `HP-S5A.1` dan safe program destination resolver |
| `src/features/marketing/homepage-preview/data/homepage-preview-service.ts` | Program read, completeness gate, projection, search, count, dan fail-soft behavior |
| `src/features/marketing/homepage-preview/data/get-homepage-preview-data.ts` | Koneksi server reader ke static program adapter; Prisma tetap read-only |
| `tests/homepage-preview/data-contract.test.mjs` | Registry kosong kompatibel, program approved, completeness, dan safe route assertions |
| `tests/homepage-preview/first-viewport.test.mjs` | Dua reusable `next/image` render sites: hero dan program card |
| `tests/homepage-preview/source-safety.test.mjs` | Exact four approvals, proof registry closed, file size/hash/label gates |
| `docs/skillary_homepage_preview_current_status.md` | Ledger bergerak ke HP-S5A complete dan HP-S5B next |

Tidak ada HP-S5A hunk pada homepage aktif, global CSS, package manifest/lockfile, Next config, Prisma schema, robots, sitemap, payment availability, auth, checkout, atau database write path.

## Asset fingerprints

| Derivative | SHA-256 |
|---|---|
| `power-bi-business-dashboard.webp` | `87384f164b0d495ff61df0d8e05e1317319f8561aba71a908699d45e3f55b3b2` |
| `data-driven-decision-making.webp` | `fddd4f88177541004a22e6bbf31c80402caecc9e6218fe0146e4c93be08dd861` |
| `ai-productivity-for-teams.webp` | `f8d0ea461f39fbab7d81fba3c29d91cd40c30cb03e21e62c68ce091d1a7c4f1b` |
| `business-presentation-reporting.webp` | `4df286ebe013df26c38c8946ee62050981e4584d3a6b22a42b7f8edb90a1275a` |

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S5A result |
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

Rollback HP-S5A hanya boleh menghapus added files HP-S5A dan membalik hunk HP-S5A pada modified files yang tercatat. Rollback harus mempertahankan seluruh pekerjaan HP-S0–HP-S4 dan tidak boleh memakai reset, checkout massal, atau directory-wide deletion.

Rollback tidak boleh mengubah homepage aktif, payment, auth, schema, configuration, database, maupun perubahan pre-existing lain.
