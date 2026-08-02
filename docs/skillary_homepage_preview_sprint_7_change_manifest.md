# Skillary Homepage Preview — HP-S7 Change Manifest

**Sprint:** `HP-S7 — Responsive, Motion & Accessibility Hardening`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S8`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` protected dan tidak disentuh |
| Preview route | `/lp/homepage-preview` |
| Payment | `HOLD` |
| Dependency baru | Tidak ada |

Worktree telah mempunyai banyak perubahan milik pengguna dan fase sebelumnya. HP-S7 hanya memiliki file/hunk yang tercatat di bawah.

## Added files HP-S7

| Path | Ownership / rollback boundary |
|---|---|
| `src/features/marketing/homepage-preview/components/PreviewScrollRail.tsx` | Progressive-enhancement rail, controls, status, endpoint state, dan reduced-motion scroll |
| `tests/homepage-preview/responsive-accessibility.test.mjs` | Drawer, search states, tabs, rails, motion, touch target, breakpoint, dan safe-area assertions |
| `docs/hp-s7-320x568-proof-rail.jpg` | Small-mobile rail evidence |
| `docs/hp-s7-390x844-drawer.jpg` | Mobile modal navigation evidence |
| `docs/hp-s7-844x390-sticky-workshop.jpg` | Short-landscape sticky offset evidence |
| `docs/hp-s7-768x1024-proof.jpg` | Tablet portrait proof composition evidence |
| `docs/hp-s7-1024x768-organization.jpg` | Tablet landscape organization composition evidence |
| `docs/hp-s7-1440x900-first-viewport.jpg` | Desktop first viewport evidence |
| `docs/hp-s7-1440x900-first-viewport.png` | Exact `1440 × 900` headless capture source sebelum konversi JPEG |
| `docs/skillary_homepage_preview_sprint_7_report.md` | HP-S7 outcome, QA, gates, dan checkpoint |
| `docs/skillary_homepage_preview_sprint_7_change_manifest.md` | HP-S7 ownership dan rollback record |

## Modified preview files

| Path | Exact HP-S7 ownership |
|---|---|
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Product proof dan artifact collections dibungkus rail progressive-enhancement |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Six-viewport reflow, rails, touch targets, focus ring, dialog motion, safe area, hover capability, dan reduced motion |
| `src/features/marketing/homepage-preview/components/PreviewMobileNavigation.tsx` | SSR/no-JS native-details fallback, enhanced dialog/trigger linkage, state sync, dan focus return |
| `src/features/marketing/homepage-preview/components/PreviewSearch.tsx` | Idle/loading/results/empty/unavailable states, native search/result-region semantics, clear/Escape, dan live status |
| `src/features/marketing/homepage-preview/components/PreviewDiscoveryTabs.tsx` | Hydration-safe progressive enhancement, manual keyboard activation, dan focusable active panel |
| `src/features/marketing/homepage-preview/blueprint.ts` | Blueprint `HP-S7.0` dan interaction/reflow contracts |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Preview contract `HP-S7.1` |
| `src/features/marketing/homepage-preview/data/types.ts` | Exact `HP-S7.1` contract type |
| `tests/homepage-preview/blueprint-structure.test.mjs` | HP-S7 contract/version assertions |
| `tests/homepage-preview/first-viewport.test.mjs` | Trigger linkage dan focus-return assertions |
| `tests/homepage-preview/discovery-proof.test.mjs` | Hydration signal assertions |
| `tests/homepage-preview/runtime-route.test.mjs` | HP-S7 runtime route/composition/progressive-enhancement assertions |
| `docs/skillary_homepage_preview_current_status.md` | Ledger moves to HP-S7 complete dan HP-S8 next |

Tidak ada HP-S7 hunk pada homepage aktif, global CSS, package manifest/lockfile, Next config, Prisma schema, registry approval data, robots, sitemap, auth, checkout, database, atau payment path.

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S7 result |
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

## Known out-of-scope observation

Production browser logging reveals an Auth.js server-configuration error from the app-wide session provider/environment. HP-S7 did not alter `src/lib/auth.ts`, `src/components/Providers.tsx`, auth routes, environment files, or database configuration. The observation must not be conflated with homepage-preview rollback.

## Rollback rule

Rollback HP-S7 hanya boleh menghapus added files HP-S7 dan membalik hunk HP-S7 pada modified files yang tercatat. Rollback harus mengembalikan responsive/interaction layer ke HP-S6 tanpa menghapus organization journey, FAQ, program, proof specimens, atau data contract fase sebelumnya.

Rollback tidak boleh memakai reset, checkout massal, atau directory-wide deletion; tidak boleh mengubah homepage aktif, payment, auth, schema, registry approval, configuration, database, maupun perubahan pre-existing lain.
