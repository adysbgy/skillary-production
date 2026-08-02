# Skillary Homepage Preview — HP-S4 Change Manifest

**Sprint:** `HP-S4 — Audience, System & Discovery`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S5`
**Plan:** `docs/skillary_homepage_preview_execution_plan.md` v1.2
**Plan SHA-256:** `c97f9099ce7619cb859f346a1dc1033863a346fcc670bae638daab1ca64d28f2`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` existing; protected dan tidak disentuh HP-S4 |
| Preview route | `/lp/homepage-preview`; isolated dan noindex |
| Payment | `HOLD`; tidak ada purchase/checkout CTA |
| Discovery source | verified registry dengan fail-soft empty states |

Worktree telah mempunyai banyak perubahan milik pengguna dan fase lain. HP-S4 hanya memiliki file/hunk yang tercatat di bawah.

## Added files HP-S4

| Path | Ownership / rollback boundary |
|---|---|
| `src/features/marketing/homepage-preview/components/PreviewDiscoveryTabs.tsx` | SSR fallback, enhanced manual tabs, keyboard behavior, hash selection/focus/scroll clearance |
| `tests/homepage-preview/discovery-experience.test.mjs` | Source gates untuk audience, goals, bounded discovery, keyboard behavior, dan workshop fields |
| `docs/references/skillary-homepage/2026-08-01/hp-s4-desktop-audience.png` | Desktop audience/system visual evidence |
| `docs/references/skillary-homepage/2026-08-01/hp-s4-mobile-audience.png` | Mobile audience/system visual evidence |
| `docs/references/skillary-homepage/2026-08-01/hp-s4-desktop-discovery-final.png` | Final desktop hash-focus viewport evidence |
| `docs/references/skillary-homepage/2026-08-01/hp-s4-mobile-workshop-final.png` | Final mobile hash-focus viewport evidence |
| `docs/references/skillary-homepage/2026-08-01/hp-s4-desktop-workshop-hash-proof.png` | Reviewer-facing desktop proof |
| `docs/references/skillary-homepage/2026-08-01/hp-s4-mobile-workshop-hash-proof.png` | Reviewer-facing mobile proof |
| `docs/skillary_homepage_preview_sprint_4_report.md` | HP-S4 result, QA, reviewer verdict, and gate evidence |
| `docs/skillary_homepage_preview_sprint_4_change_manifest.md` | HP-S4 ownership and rollback record |

## Modified HP-S3/HP-S1-owned files

| Path | Exact HP-S4 ownership |
|---|---|
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Audience decision cards, system outcomes, four goals, discovery composition, bounded source cards, truthful workshop rendering |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Feature-local audience/system/goals/tabs/source-card/workshop/focus responsive styles |
| `src/features/marketing/homepage-preview/blueprint.ts` | Blueprint version `HP-S4.0` and HP-S4 implementation contracts |
| `src/features/marketing/homepage-preview/data/types.ts` | Required workshop level, session outcome, interest state, and review timestamp |
| `src/features/marketing/homepage-preview/data/homepage-preview-policy.ts` | Workshop validation and required `session-outcome` claim |
| `src/features/marketing/homepage-preview/data/homepage-preview-service.ts` | Fail-soft workshop record projection for the expanded verified contract |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Exact truthful Workshop empty-state copy and contact CTA |
| `tests/homepage-preview/blueprint-structure.test.mjs` | HP-S4 version and structure assertions |
| `tests/homepage-preview/data-contract.test.mjs` | Expanded workshop policy and data contract assertions |
| `tests/homepage-preview/runtime-route.test.mjs` | HP-S4 output-level audience/discovery gates |

No HP-S4 hunk exists in route metadata, homepage active, global CSS, package manifest/lockfile, Next config, Prisma schema, robots, sitemap, payment availability, auth, checkout, or database write path.

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S4 result |
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

Rollback HP-S4 hanya boleh:

1. menghapus added files HP-S4 pada tabel di atas;
2. membalik hunk HP-S4 pada modified files yang tercatat;
3. mengembalikan audience/system/goals/discovery markup, CSS, blueprint version, data fields, policy, contract copy, dan test assertions ke exact state HP-S3;
4. mempertahankan seluruh route shell, header/search/hero assets, source registry, proof gates, tests, dan reports HP-S0–HP-S3.

Rollback tidak boleh memakai reset, checkout massal, directory-wide deletion, atau mengubah homepage aktif, payment, auth, schema, configuration, maupun perubahan pre-existing lain.

`.homepage-preview-test-build/` dan `.integrity-test-build/` adalah output sementara verifikasi dan bukan deliverable.
