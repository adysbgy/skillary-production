# Skillary Homepage Preview — HP-S8A Change Manifest

**Sprint:** `HP-S8A — Maven Visual Parity: First Viewport`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S8B`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` protected dan tidak disentuh |
| Preview route | `/lp/homepage-preview` |
| Payment | `HOLD` |
| Dependency baru | Tidak ada |

Worktree telah mempunyai banyak perubahan milik pengguna dan fase sebelumnya. HP-S8A hanya memiliki file/hunk yang tercatat di bawah.

## Added files HP-S8A

| Path | Ownership / rollback boundary |
|---|---|
| `public/images/homepage-preview/hero-individual-cutout-v2.png` | Transparent original Skillary individual figure |
| `public/images/homepage-preview/hero-organization-cutout-v2.png` | Transparent original Skillary organization figure |
| `docs/references/skillary-hero/2026-08-01/hero-individual-cutout-v2-chroma-source.png` | ImageGen edit source retained for provenance |
| `docs/references/skillary-hero/2026-08-01/hero-organization-cutout-v2-chroma-source.png` | ImageGen edit source retained for provenance |
| `docs/references/skillary-hero/2026-08-01/HP-S8A-CUTOUT-PROVENANCE.md` | Source, prompts, method and truth-in-evidence record |
| `docs/hp-s8a-1440x900-first-viewport.png` | Exact desktop visual evidence |
| `docs/hp-s8a-390x844-first-viewport.png` | Exact mobile visual evidence |
| `docs/skillary_homepage_preview_sprint_8a_report.md` | Outcome, QA, review, gates and checkpoint |
| `docs/skillary_homepage_preview_sprint_8a_change_manifest.md` | HP-S8A ownership and rollback record |

## Modified preview files

| Path | Exact HP-S8A ownership |
|---|---|
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Cutout imports, two-line hero promise, concise support copy, dual CTA, capability bubbles and strip |
| `src/features/marketing/homepage-preview/components/PreviewHeader.tsx` | Single-row Maven Analytics-like navigation, search disclosure, direct desktop routes and compact mobile actions |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Three-zone navigation, search popover, reference grid, dual-cutout composition, two-line desktop heading, capability strip and mobile reflow |
| `src/features/marketing/homepage-preview/blueprint.ts` | Blueprint version `HP-S8A.0` and first-viewport contracts |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Preview contract `HP-S8A.1` |
| `src/features/marketing/homepage-preview/data/types.ts` | Exact `HP-S8A.1` contract type |
| `tests/homepage-preview/blueprint-structure.test.mjs` | HP-S8A version and composition assertions |
| `tests/homepage-preview/first-viewport.test.mjs` | Single header, hero line, cutout, CTA and capability assertions |
| `tests/homepage-preview/runtime-route.test.mjs` | Production runtime HP-S8A structure assertions |
| `docs/skillary_homepage_preview_current_status.md` | Ledger moves to HP-S8A complete and HP-S8B next |

Tidak ada HP-S8A hunk pada homepage aktif, global CSS, package manifest/lockfile, Next config, Prisma schema, registry approval data, auth, checkout, database, atau payment path.

## Asset hashes

| Path | SHA-256 |
|---|---|
| `public/images/homepage-preview/hero-individual-cutout-v2.png` | `f5a755cf7a4457a478470c00452c8e7d965e272531c94d39f8958d8130730701` |
| `public/images/homepage-preview/hero-organization-cutout-v2.png` | `e2c9fbfd3f705b0027087f5c7de0d31bb03d503769764499b7a6b9ea1763bf4a` |
| `docs/references/skillary-hero/2026-08-01/hero-individual-cutout-v2-chroma-source.png` | `3a8bd0a8692442540e1caa9329d09e49715121b7584c967c2e2560af4f4e172e` |
| `docs/references/skillary-hero/2026-08-01/hero-organization-cutout-v2-chroma-source.png` | `cd4620b50aa588431ea95f1a2f6fa3ec8b21a5767df7540539373a680da09236` |

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S8A result |
|---|---|---|
| `src/app/page.tsx` | `c68bcfc25eef8c81dcd2bf17d3abe703b33538dccdb59193f8638f8006c4dc72` | PASS |
| `src/app/globals.css` | `eb5ae4911d8af6e64929d3fcd03e90f9a6b3840b12ea8043a03f36151f387c5a` | PASS |
| `next.config.ts` | `ca92db1b507e7dcd39f1400b1d604cf7a0de5bb610dd3ce98ebd3b70c1342b3c` | PASS |
| `package.json` | `2e2f17291830d0e6adf808ecc8fd35f9287bbb1d22f29ebe0aecd874fae89ef8` | PASS |
| `package-lock.json` | `f6d768fd72509c49a66f2b4898eb34a416f50f1b0dd150931642595a5b0b9d95` | PASS |
| `prisma/schema.prisma` | `b5f1287c329ea2f78231335968bd1b83d0186268e0ec11db91c3354e3b4509e8` | PASS |
| `src/app/(standalone)/lp/layout.tsx` | `b8a5c18d3c9102b17cae8519b22bb779a41948ac62170b00daca83090cc1b602` | PASS |
| `src/lib/payments/payment-availability.ts` | `7edb914d0e645d53f931d29e9bd4e450355289e5a97f20f0ac59421a1de0c068` | PASS |

## Review and known observation

Independent reviewer returned `PASS — SHIP HP-S8A` across thesis, own world, story, first viewport, and finish. The single detector advisory for the subtle grid is accepted because it is grounded in the pinned Maven Analytics reference.

The shared Auth.js provider/environment still emits a pre-existing configuration error in local production logging. HP-S8A did not change auth, provider, environment, database, or session routes.

## Rollback rule

Rollback HP-S8A hanya boleh menghapus added files HP-S8A dan membalik hunk HP-S8A pada modified files yang tercatat. Rollback harus mengembalikan first viewport ke HP-S7 tanpa menghapus program, proof specimens, organization journey, FAQ, responsive accessibility behavior, atau kontrak data fase sebelumnya.

Rollback tidak boleh memakai reset, checkout massal, atau directory-wide deletion; tidak boleh mengubah homepage aktif, payment, auth, schema, registry approval, configuration, database, maupun perubahan pre-existing lain.
