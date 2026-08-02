# Skillary Homepage Preview — Sprint HP-S5B Report

**Sprint:** `HP-S5B — Truthful Proof & Visual Density`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S6 belum dijalankan**

## Outcome

HP-S5B mengganti enam placeholder generik pada `/lp/homepage-preview` dengan proof system yang dapat diperiksa tanpa menyamar sebagai hasil learner atau customer nyata.

Product proof sekarang terdiri dari:

1. `Project workspace` — brief, pengerjaan, review, konteks, output, dan kriteria;
2. `Assessment review` — peninjauan berbasis kriteria, feedback, dan tindak lanjut;
3. `Credential record` — konteks program, earning basis, dan status record.

Artifact gallery sekarang terdiri dari:

1. `Project brief` — dokumen konteks, output, dan review;
2. `Rubric & feedback` — kriteria, catatan reviewer, dan tindak lanjut;
3. `Verifikasi sertifikat` — record specimen yang secara eksplisit tidak valid.

Semua item memakai label terlihat `Contoh tampilan`. Copy juga menyatakan `Data anonim · non-kuantitatif`, `bukan hasil peserta`, dan `bukan credential valid`.

## Visual system

Bagian proof tidak lagi memakai enam kartu berukuran sama:

- product board memakai satu flagship project workspace dan dua companion panels;
- artifact gallery memakai proporsi desktop `5 / 4 / 3` dengan tinggi canvas yang berbeda;
- dark proof desk diikuti light document gallery agar scroll rhythm mempunyai peak visual dan jeda;
- orange dipakai untuk status specimen dan state aktif, bukan sebagai klaim hasil;
- monospace dibatasi pada label dokumen, data, dan status.

Komposisi tetap mewarisi visual world Skillary: ink, warm paper, `rgb(255,138,0)`, square editorial frames, dan hierarchy display sans yang sudah dipakai preview.

## Truthfulness boundary

- Tidak ada nama peserta, foto learner, nilai, persentase progress, ranking, benchmark, atau metric hasil.
- Tidak ada testimonial, logo customer, endorsement, atau case study sintetis.
- Tidak ada konten atau aset Maven.
- Tidak ada konten Allman atau legacy color.
- Registry client logo, testimonial, outcome metric, dan case study tetap kosong.
- Credential specimen memakai `TIDAK VALID`, `Contoh tampilan`, dan `Tidak dapat diverifikasi`.
- Payment dan checkout tetap di luar scope.

## Browser QA

### Desktop

- layout proof memakai rasio lead `4fr` dan evidence desk `8fr`;
- flagship project workspace memenuhi dua kolom proof;
- artifact gallery memakai span `5 / 4 / 3`;
- enam specimen labels terdeteksi pada DOM;
- document width sama dengan viewport dan tidak ada horizontal overflow;
- console tidak mencatat error atau warning.

### Mobile `390 × 844`

- ketiga product cards tersusun satu kolom selebar `350 px`;
- ketiga artifact cards tersusun satu kolom selebar `350 px`;
- tidak ada elemen proof atau artifact dengan `scrollWidth` melebihi `clientWidth`;
- document width tetap `390 px` dan tidak ada horizontal overflow;
- seluruh disclaimer dan label specimen tetap terlihat.

Bukti visual:

- [`hp-s5b-desktop-proof-final.jpg`](./references/skillary-homepage/2026-08-01/hp-s5b-desktop-proof-final.jpg)
- [`hp-s5b-desktop-artifacts-final.jpg`](./references/skillary-homepage/2026-08-01/hp-s5b-desktop-artifacts-final.jpg)
- [`hp-s5b-mobile-proof-final.jpg`](./references/skillary-homepage/2026-08-01/hp-s5b-mobile-proof-final.jpg)
- [`hp-s5b-mobile-artifacts-final.jpg`](./references/skillary-homepage/2026-08-01/hp-s5b-mobile-artifacts-final.jpg)

## Independent finish review

Impeccable finish reviewer memberikan hasil:

| Contract area | Verdict |
|---|---|
| Thesis | PASS |
| Own world | PASS |
| Story | PASS |
| First viewport | PASS |
| Form | PASS |

Reviewer menyatakan right-edge crop pada bukti desktop adalah mismatch capture surface, bukan layout defect; DOM, container, `minmax(0, 1fr)`, dan `min-width: 0` tetap contained. Tidak ada material finding.

Satu watch item non-blocking `P3`: microtype internal specimen berada pada kisaran sekitar `0.58–0.72rem`. Teks tetap terbaca dan high-contrast pada capture `390 px`; penyesuaian floor dapat dilakukan pada HP-S7 bila usability testing menemukan strain.

**Final disposition reviewer: PASS.**

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview tests | PASS — `32` passed, `1` runtime test skipped tanpa URL |
| Explicit runtime route test | PASS — `1/1` |
| Impeccable detector | PASS — `[]` |
| Next.js 16.2.3 production build | PASS — `166` static pages |
| Desktop/mobile browser QA | PASS |
| Browser console | PASS — no error/warning |
| Independent finish review | PASS |
| Protected file fingerprints | PASS |

Build hanya menampilkan warning existing bahwa konvensi `middleware` deprecated. Tidak ada dependency baru.

## Gate verdict

| HP-S5B acceptance criterion | Verdict |
|---|---|
| Tiga product proof views | PASS |
| Tiga artifact specimens | PASS |
| Identitas, nilai, progress, dan ID disanitasi | PASS |
| Setiap specimen berlabel | PASS |
| Halaman lebih kaya tanpa social proof palsu | PASS |
| Tidak ada konten Maven | PASS |
| Light/dark rhythm dan visual density diaudit | PASS |
| Homepage aktif serta payment tidak berubah | PASS |
| Stop sebelum HP-S6 | PASS |

**Final verdict: HP-S5B selesai. Fase berikutnya adalah HP-S6 dan belum dijalankan.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_5b_change_manifest.md`](./skillary_homepage_preview_sprint_5b_change_manifest.md).
