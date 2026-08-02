# Skillary Homepage Preview — HP-S0 Change Manifest

**Sprint:** `HP-S0 — Reference Lock, Baseline & Contracts`
**Executed:** 1 Agustus 2026
**Scope:** documentation dan internal visual reference evidence saja
**Plan SHA-256:** `c97f9099ce7619cb859f346a1dc1033863a346fcc670bae638daab1ca64d28f2`

## Baseline

| Field | Value |
|---|---|
| Branch | `main` |
| HEAD | `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Dirty entries sebelum Sprint 0 | `112` |
| Plan baseline status | Existing, untracked |
| Preview route baseline | `/lp/homepage-preview` belum ada |
| Homepage active | `/` existing; di luar ownership HP-S0 |
| Payment | HOLD; tidak diubah |

Worktree sudah sangat berubah sebelum HP-S0. Semua perubahan yang tidak disebut sebagai owned file di bawah dianggap milik pengguna atau pekerjaan lain dan tidak boleh dibersihkan, dipindah, atau di-reset.

## Owned changes

| Path | Baseline | Action | Ownership / rollback boundary |
|---|---|---|---|
| `docs/skillary_homepage_preview_execution_plan.md` | Existing, untracked v1.1 | Revised to v1.2 | Hanya hunk v1.2 HP-S0; jangan hapus file tanpa persetujuan founder |
| `docs/skillary_homepage_preview_change_manifest.md` | Absent | Added | HP-S0 documentation |
| `docs/skillary_homepage_preview_sprint_0_report.md` | Absent | Added | HP-S0 documentation |
| `docs/references/maven-analytics/2026-08-01/LOCK.md` | Absent | Added | HP-S0 internal reference |
| `docs/references/maven-analytics/2026-08-01/inventory.json` | Absent | Added | HP-S0 internal reference |
| `docs/references/maven-analytics/2026-08-01/capture-manifest.sha256` | Absent | Added | HP-S0 internal reference |
| `docs/references/maven-analytics/2026-08-01/captures/*` | Absent | Added 16 PNG captures | Internal review only; never imported by app/public source |

## Protected file fingerprints

Nilai sebelum dan setelah HP-S0 harus identik.

| Protected path | Before SHA-256 | After SHA-256 | Result |
|---|---|---|---|
| `src/app/page.tsx` | `c68bcfc25eef8c81dcd2bf17d3abe703b33538dccdb59193f8638f8006c4dc72` | `c68bcfc25eef8c81dcd2bf17d3abe703b33538dccdb59193f8638f8006c4dc72` | PASS |
| `src/app/globals.css` | `eb5ae4911d8af6e64929d3fcd03e90f9a6b3840b12ea8043a03f36151f387c5a` | `eb5ae4911d8af6e64929d3fcd03e90f9a6b3840b12ea8043a03f36151f387c5a` | PASS |
| `next.config.ts` | `ca92db1b507e7dcd39f1400b1d604cf7a0de5bb610dd3ce98ebd3b70c1342b3c` | `ca92db1b507e7dcd39f1400b1d604cf7a0de5bb610dd3ce98ebd3b70c1342b3c` | PASS |
| `package.json` | `2e2f17291830d0e6adf808ecc8fd35f9287bbb1d22f29ebe0aecd874fae89ef8` | `2e2f17291830d0e6adf808ecc8fd35f9287bbb1d22f29ebe0aecd874fae89ef8` | PASS |
| `package-lock.json` | `f6d768fd72509c49a66f2b4898eb34a416f50f1b0dd150931642595a5b0b9d95` | `f6d768fd72509c49a66f2b4898eb34a416f50f1b0dd150931642595a5b0b9d95` | PASS |
| `prisma/schema.prisma` | `b5f1287c329ea2f78231335968bd1b83d0186268e0ec11db91c3354e3b4509e8` | `b5f1287c329ea2f78231335968bd1b83d0186268e0ec11db91c3354e3b4509e8` | PASS |
| `src/app/robots.ts` | `54cd2d8a43b6a3698e2d6e3a4c3870ecb37e8f04e2aef4e6394ab427a803b054` | `54cd2d8a43b6a3698e2d6e3a4c3870ecb37e8f04e2aef4e6394ab427a803b054` | PASS |
| `src/app/sitemap.ts` | `8b10782daf224d753ad9f8249f66b758b6be95f09088244fc136f2f8f9e5f463` | `8b10782daf224d753ad9f8249f66b758b6be95f09088244fc136f2f8f9e5f463` | PASS |
| `src/app/(standalone)/lp/layout.tsx` | `b8a5c18d3c9102b17cae8519b22bb779a41948ac62170b00daca83090cc1b602` | `b8a5c18d3c9102b17cae8519b22bb779a41948ac62170b00daca83090cc1b602` | PASS |
| `src/lib/payments/payment-availability.ts` | `7edb914d0e645d53f931d29e9bd4e450355289e5a97f20f0ac59421a1de0c068` | `7edb914d0e645d53f931d29e9bd4e450355289e5a97f20f0ac59421a1de0c068` | PASS |

## Verification performed

- Verified only documentation/reference files were created or edited for HP-S0.
- Verified `/lp/homepage-preview` is still absent.
- Verified `/lp` layout intentionally omits the global marketing header/footer.
- Verified payment remains fail-closed unless both `PAYMENTS_ENABLED=true` and a Midtrans server key exist.
- Verified Maven source/archive is outside app/public source and no reference asset is imported.
- Verified capture manifest, local archive hashes, and documentation links.

## Rollback rule

Rollback HP-S0 may remove only new owned reference/report files or reverse the exact v1.2 plan hunk after founder approval. It must not use reset, checkout massal, broad deletion, or touch any pre-existing dirty entry.
