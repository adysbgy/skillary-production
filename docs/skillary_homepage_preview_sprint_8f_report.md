# Skillary Homepage Preview — Sprint HP-S8F Report

**Sprint:** `HP-S8F — Full-page Finish Review & Final QA`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS — READY FOR FOUNDER REVIEW**
**Stop condition:** **TERPENUHI — HP-S9 belum dijalankan**

## Outcome

HP-S8F menyelesaikan bounded full-page finish review pada `/lp/homepage-preview`. Seluruh 13 band diperiksa pada desktop, intermediate, dan mobile, lalu satu defect integrasi nyata ditutup: header search sebelumnya hanya memakai destination statis dan tidak menemukan program terverifikasi yang sudah tampil di katalog.

Header search desktop dan mobile sekarang memakai `data.search.entries`, yaitu gabungan destination statis dan item dinamis yang lolos source gate. Header serta halaman berbagi satu cached server loader sehingga sumber tidak dibaca dua kali dalam render yang sama.

Tidak ada visual world baru, section baru, testimonial, logo klien, metric, atau klaim yang ditambahkan. Hasil HP-S8A sampai HP-S8E dipertahankan.

## Confirmed defect and resolution

| Before | Resolution | Verified result |
|---|---|---|
| Query `dashboard` menghasilkan empty state walaupun program Power BI terverifikasi tersedia | Header menerima source-backed combined search index | `Power BI Business Dashboard` muncul pada desktop dan mobile |
| Header dan page berpotensi membaca source secara terpisah | React server cache membungkus default preview data loader | Header dan page memakai fungsi cache yang sama |
| Static destinations tetap harus tersedia saat source dinamis fail-soft | Combined index mempertahankan static entries | Existing fail-soft data tests tetap lulus |

## Full-page visual QA

| Audit | Result |
|---|---|
| Desktop `1440 × 900` full rhythm and junctions | PASS |
| Intermediate `820 × 900` first viewport | PASS |
| Mobile `390 × 844` full rhythm and junctions | PASS |
| Horizontal document overflow | PASS — `false` pada seluruh viewport |
| Missing or failed images after viewport entry | PASS — `0` |
| Duplicate IDs | PASS — `0` |
| H1 count | PASS — `1` |
| Stable homepage bands | PASS — `13` |
| Visible interactive targets below 44 px | PASS — `0` |

## Interaction confirmation

| Path | Result |
|---|---|
| Mobile dialog open/close and focus return | PASS |
| Desktop search `dashboard` | PASS — source-backed result and canonical route |
| Mobile drawer search `dashboard` | PASS — source-backed result and canonical route |
| Discovery tab to Events & Workshop | PASS — truthful empty state |
| Product proof next control | PASS — `Kartu 2 dari 3` |
| FAQ native disclosure | PASS — opens without custom script dependency |
| Query tracking | PASS — remains `disabled` |

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `47` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS — `166` static pages |
| Desktop/intermediate/mobile browser QA | PASS |
| Protected file fingerprints | PASS |
| Impeccable detector | PASS with one accepted advisory from the pre-existing HP-S8A hero grid background |

Build hanya menampilkan warning existing mengenai konvensi `middleware` yang deprecated. Tidak ada dependency baru.

## Known out-of-scope observation

Production server masih mencatat existing `auth.error` dari shared Auth.js provider/environment. HP-S8F tidak mengubah auth, session, database, checkout, atau payment. Observation ini tetap menjadi audit platform terpisah.

## Gate verdict

| HP-S8F acceptance criterion | Verdict |
|---|---|
| Full page konsisten dengan hasil HP-S8A–HP-S8E | PASS |
| Desktop, intermediate, dan mobile bebas document overflow | PASS |
| Header search menemukan program yang lolos source gate | PASS |
| Existing interaction dan accessibility behavior tidak regress | PASS |
| Homepage aktif `/` tidak diubah | PASS |
| Payment tetap HOLD | PASS |
| Tidak ada claim atau aset Maven yang disalin | PASS |
| Stop sebelum founder review | PASS |

**Final verdict: HP-S8F selesai. Homepage preview mempertahankan arah visual yang diminta, menutup defect integrasi terakhir yang ditemukan, dan siap masuk founder review tanpa dipromosikan ke `/`.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_8f_change_manifest.md`](./skillary_homepage_preview_sprint_8f_change_manifest.md).
