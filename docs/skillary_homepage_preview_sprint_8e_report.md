# Skillary Homepage Preview — Sprint HP-S8E Report

**Sprint:** `HP-S8E — Organization, FAQ & Lower-page Harmonization`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS — SHIP**
**Stop condition:** **TERPENUHI — HP-S8F belum dijalankan**

## Outcome

HP-S8E menyatukan bagian bawah `/lp/homepage-preview` menjadi satu alur editorial yang lebih dekat dengan cadence Maven: proposition organisasi yang besar dan terpusat, scope strip, proses empat tahap, light inspection matrix, centered FAQ accordion, lalu unified dark closing untuk individu dan organisasi.

Terjemahan ini tetap original Skillary. Testimonial, learner identity, video, winner badge, customer logo, rating, jumlah peserta, ROI, dan real-time dashboard reference tidak dipindahkan. Organization process dan inspectability boundary digunakan sebagai bukti yang dapat dipertanggungjawabkan.

## Reference translation

| Reference grammar | Skillary translation | Truth boundary |
|---|---|---|
| Centered learner-to-leader proposition | Centered organization proposition | Tidak memakai outcome peserta atau testimoni |
| Social-proof gallery | Four-stage organization process grid | Menjelaskan proses, bukan hasil klien |
| Wide FAQ accordion | Six native disclosure rows | Jawaban menyatakan readiness dan payment hold |
| Unified two-audience closing | Individual and organization decision panels | Satu safe action per audience |
| Dark footer transition | Orange seam into audited footer | Tidak menambah acquisition form atau link palsu |

## Lower-page composition

- Organization lead memakai headline besar, empat scope cells, satu safe information action, dan empat equal process cards.
- Inspection taxonomy pindah ke light surface sebagai table-like continuation berisi lima area yang dapat dijelaskan.
- FAQ memakai single centered stack; native `details` dan `summary` tetap bekerja tanpa JavaScript.
- Closing memakai satu dark field dan dua panel setara dengan owned Skillary audience icons.
- Individual action menuju program; organization action menuju contact. Payment dan checkout tetap HOLD.

## Responsive and interaction QA

| Audit | Result |
|---|---|
| Desktop organization proposition, scope strip, and four-step grid | PASS |
| Desktop inspection matrix and centered FAQ stack | PASS |
| Desktop unified closing field | PASS |
| Mobile `390 × 844` organization reflow | PASS — document overflow `0` |
| Mobile FAQ disclosure interaction | PASS — `1` native disclosure opened |
| Mobile closing stack | PASS — `2` cards, document overflow `0` |

Desktop DOM melaporkan `innerWidth 1440`, `scrollWidth 1440`, dan document overflow `0`. Capture surface aplikasi dapat menampilkan gambar audit pada lebar yang lebih kecil, tetapi pengukuran layout tetap dilakukan pada viewport `1440 × 900`.

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `46` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS — `166` static pages |
| Desktop/mobile browser QA | PASS |
| Protected file fingerprints | PASS |
| Impeccable detector | PASS with one accepted advisory from the pre-existing HP-S8A hero grid background |

Build hanya menampilkan warning existing mengenai konvensi `middleware` yang deprecated. Tidak ada dependency baru.

## Gate verdict

| HP-S8E acceptance criterion | Verdict |
|---|---|
| Organization section mempunyai centered proposition dan clear process | PASS |
| Scope strip dan process cards mempunyai desktop/mobile reflow | PASS |
| Inspectability tampil jelas tanpa KPI atau ROI claim | PASS |
| FAQ factual, centered, dan dapat dibuka native | PASS |
| Closing menjadi unified dark two-audience field | PASS |
| Tidak ada social proof Maven atau klaim palsu yang disalin | PASS |
| Homepage aktif `/` tidak diubah | PASS |
| Payment tetap HOLD | PASS |
| Stop sebelum HP-S8F | PASS |

**Final verdict: HP-S8E selesai. Lower page sekarang mempunyai hierarchy, rhythm, dan decision flow yang konsisten dengan target referensi, tetapi seluruh copy, evidence boundary, warna, dan tindakan tetap milik Skillary.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_8e_change_manifest.md`](./skillary_homepage_preview_sprint_8e_change_manifest.md).
