# Skillary Homepage Preview — HP-S6 Change Manifest

**Sprint:** `HP-S6 — Organization & Closing`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S7`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` protected dan tidak disentuh |
| Preview route | `/lp/homepage-preview` |
| Payment | `HOLD` |
| Dependency baru | Tidak ada |

Worktree telah mempunyai banyak perubahan milik pengguna dan fase sebelumnya. HP-S6 hanya memiliki file/hunk yang tercatat di bawah.

## Added files HP-S6

| Path | Ownership / rollback boundary |
|---|---|
| `tests/homepage-preview/organization-closing.test.mjs` | Journey, inspection taxonomy, FAQ, closing, route-source, dan footer assertions |
| `docs/hp-s6-desktop-organization.jpg` | Desktop organization journey evidence |
| `docs/hp-s6-desktop-inspection.jpg` | Desktop inspection matrix evidence |
| `docs/hp-s6-desktop-faq.jpg` | Desktop FAQ evidence |
| `docs/hp-s6-desktop-closing.jpg` | Desktop dual closing evidence |
| `docs/hp-s6-mobile-organization.jpg` | Mobile organization journey evidence |
| `docs/hp-s6-mobile-inspection.jpg` | Mobile inspection matrix evidence |
| `docs/hp-s6-mobile-closing.jpg` | Mobile dual closing evidence |
| `docs/skillary_homepage_preview_sprint_6_report.md` | HP-S6 outcome, QA, gate, dan checkpoint |
| `docs/skillary_homepage_preview_sprint_6_change_manifest.md` | HP-S6 ownership dan rollback record |

## Modified preview files

| Path | Exact HP-S6 ownership |
|---|---|
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Organization brief, four-step journey, five-area inspect matrix, six factual FAQ items, dan audience-specific closing |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Organization sequence styling, inspect matrix, editorial FAQ split, dual closing composition, dan responsive reflow |
| `src/features/marketing/homepage-preview/components/PreviewFooter.tsx` | Four audited navigation groups, contact action, dan truthful preview footer copy |
| `src/features/marketing/homepage-preview/blueprint.ts` | Blueprint `HP-S6.0` dan SK-HP-09 sampai SK-HP-13 contracts |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Preview contract version `HP-S6.1` |
| `src/features/marketing/homepage-preview/data/types.ts` | Exact `HP-S6.1` contract type |
| `tests/homepage-preview/blueprint-structure.test.mjs` | HP-S6 blueprint/version and source-boundary assertion labels |
| `tests/homepage-preview/runtime-route.test.mjs` | HP-S6 output-level organization, FAQ, and closing assertions |
| `docs/skillary_homepage_preview_current_status.md` | Ledger moves to HP-S6 complete dan HP-S7 next |

Tidak ada HP-S6 hunk pada homepage aktif, global CSS, package manifest/lockfile, Next config, Prisma schema, registry approval data, robots, sitemap, auth, checkout, atau database path.

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S6 result |
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

Rollback HP-S6 hanya boleh menghapus added files HP-S6 dan membalik hunk HP-S6 pada modified files yang tercatat. Rollback harus mengembalikan SK-HP-09 sampai SK-HP-13 ke skeleton HP-S5B tanpa menghapus program, proof specimens, atau data contract fase sebelumnya.

Rollback tidak boleh memakai reset, checkout massal, atau directory-wide deletion; tidak boleh mengubah homepage aktif, payment, auth, schema, registry approval, configuration, database, maupun perubahan pre-existing lain.
