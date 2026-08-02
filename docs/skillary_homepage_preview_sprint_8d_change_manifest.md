# Skillary Homepage Preview — HP-S8D Change Manifest

**Sprint:** `HP-S8D — Proof & Showcase Parity`
**Executed:** 1 Agustus 2026
**Verdict:** `PASS — STOP sebelum HP-S8E`

## Boundary

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Homepage aktif | `/` protected dan tidak disentuh |
| Preview route | `/lp/homepage-preview` |
| Payment | `HOLD` |
| Dependency baru | Tidak ada |

## Added files HP-S8D

| Path | Ownership / rollback boundary |
|---|---|
| `docs/hp-s8d-1440x900-proof.png` | Desktop proof proposition visual evidence |
| `docs/hp-s8d-1440x900-proof-cards.png` | Desktop product showcase visual evidence |
| `docs/hp-s8d-1440x900-artifacts.png` | Desktop artifact gallery visual evidence |
| `docs/hp-s8d-1440x900-evidence-ledger.png` | Desktop evidence trail visual evidence |
| `docs/hp-s8d-390x844-proof.png` | Mobile proof rail visual evidence |
| `docs/hp-s8d-390x844-artifacts.png` | Mobile artifact rail visual evidence |
| `docs/hp-s8d-390x844-evidence-ledger.png` | Mobile evidence trail visual evidence |
| `docs/skillary_homepage_preview_sprint_8d_report.md` | HP-S8D outcome, QA, gates dan checkpoint |
| `docs/skillary_homepage_preview_sprint_8d_change_manifest.md` | HP-S8D ownership dan rollback record |

## Modified files HP-S8D

| Path | Exact HP-S8D ownership |
|---|---|
| `src/features/marketing/homepage-preview/HomepagePreview.tsx` | Centered proof proposition, evidence action, explicit anonymity boundary, artifact header, and five-stage evidence copy |
| `src/features/marketing/homepage-preview/HomepagePreview.module.css` | Dark showcase composition, three-up white proof cards, equal artifact gallery, responsive rails, and vertical mobile evidence trail |
| `src/features/marketing/homepage-preview/blueprint.ts` | Blueprint `HP-S8D.0` and rewritten SK-HP-07/08 contracts |
| `src/features/marketing/homepage-preview/data/homepage-preview-contract.ts` | Contract `HP-S8D.1` |
| `src/features/marketing/homepage-preview/data/types.ts` | Exact `HP-S8D.1` contract type |
| `tests/homepage-preview/blueprint-structure.test.mjs` | HP-S8D blueprint/version assertions |
| `tests/homepage-preview/discovery-experience.test.mjs` | Current contract version assertion |
| `tests/homepage-preview/runtime-route.test.mjs` | Production-output HP-S8D showcase gate |
| `tests/homepage-preview/truthful-proof.test.mjs` | Anonymous showcase, forbidden-copy, three-up layout, and evidence-stage assertions |
| `docs/skillary_homepage_preview_current_status.md` | Ledger moves to HP-S8D complete and HP-S8E next |

Tidak ada HP-S8D hunk pada homepage aktif, global CSS, package manifest/lockfile, Next config, Prisma schema, registry approval, auth, checkout, database, atau payment path.

## Protected file fingerprints

| Protected path | Expected SHA-256 | HP-S8D result |
|---|---|---|
| `src/app/page.tsx` | `c68bcfc25eef8c81dcd2bf17d3abe703b33538dccdb59193f8638f8006c4dc72` | PASS |
| `src/app/globals.css` | `eb5ae4911d8af6e64929d3fcd03e90f9a6b3840b12ea8043a03f36151f387c5a` | PASS |
| `next.config.ts` | `ca92db1b507e7dcd39f1400b1d604cf7a0de5bb610dd3ce98ebd3b70c1342b3c` | PASS |
| `package.json` | `2e2f17291830d0e6adf808ecc8fd35f9287bbb1d22f29ebe0aecd874fae89ef8` | PASS |
| `package-lock.json` | `f6d768fd72509c49a66f2b4898eb34a416f50f1b0dd150931642595a5b0b9d95` | PASS |
| `prisma/schema.prisma` | `b5f1287c329ea2f78231335968bd1b83d0186268e0ec11db91c3354e3b4509e8` | PASS |
| `src/app/(standalone)/lp/layout.tsx` | `b8a5c18d3c9102b17cae8519b22bb779a41948ac62170b00daca83090cc1b602` | PASS |
| `src/lib/payments/payment-availability.ts` | `7edb914d0e645d53f931d29e9bd4e450355289e5a97f20f0ac59421a1de0c068` | PASS |

## Accepted detector advisory

The Impeccable detector reports one advisory for the decorative grid background in `.heroBand`. That CSS belongs to the completed HP-S8A hero, not HP-S8D. It remains outside this phase's rollback boundary.

## Known observation

Shared Auth.js provider/environment tetap memunculkan existing configuration error pada produksi lokal. HP-S8D tidak menyentuh auth dan tidak memasukkan isu tersebut ke rollback boundary.

## Rollback rule

Rollback HP-S8D hanya boleh menghapus added files HP-S8D dan membalik hunk HP-S8D pada modified files yang tercatat. Rollback mengembalikan SK-HP-07/08 ke HP-S8C tanpa menghapus corrected header/hero, audience/formats/business bands, guided catalog, organization journey, FAQ, atau responsive accessibility behavior fase sebelumnya.

Rollback tidak boleh memakai reset, checkout massal, atau directory-wide deletion; tidak boleh mengubah homepage aktif, payment, auth, schema, registry approval, configuration, database, maupun perubahan pre-existing lain.
