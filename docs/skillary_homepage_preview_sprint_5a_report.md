# Skillary Homepage Preview — Sprint HP-S5A Report

**Sprint:** `HP-S5A — Internal Asset & Content Reconciliation`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S5B belum dijalankan**

## Outcome

HP-S5A mengaktifkan tepat empat program prioritas pada `/lp/homepage-preview` dengan data canonical Skillary, destination yang valid, dan cover ringan dari aset internal. Homepage aktif `/` tetap terpisah dan payment tetap `HOLD`.

Program yang aktif:

| Program | Source record | Destination | Cover |
|---|---|---|---|
| Power BI Business Dashboard | `src/data/v2-programs.ts` | `/programs/power-bi-business-dashboard` | 27,956 byte WebP |
| Data-Driven Decision Making | `src/data/v2-programs.ts` | `/programs/data-driven-decision-making` | 28,918 byte WebP |
| AI Productivity for Teams | `src/data/v2-programs.ts` | `/programs/ai-productivity-for-teams` | 40,260 byte WebP |
| Business Presentation & Reporting | `src/data/v2-programs.ts` | `/programs/business-presentation-reporting` | 25,102 byte WebP |

Keempat card menampilkan kategori, level, durasi, format, ringkasan, gambar, label `Ilustrasi program`, dan CTA `Lihat detail`. Seluruh konten dibaca melalui adapter server-only dan tetap melewati approval registry serta completeness checks.

## Asset reconciliation

Manifest aset sekarang mencatat:

- origin aset internal Skillary;
- path dan SHA-256 file sumber;
- path dan SHA-256 derivative WebP;
- penggunaan yang diizinkan hanya untuk homepage program card;
- status ilustratif dan label yang wajib terlihat;
- alt text dan approval preview.

Semua derivative berukuran `720 × 480`, lebih kecil dari `60 KB`, dan file sumber dipertahankan. Gambar dimuat dengan `next/image`, lazy loading, responsive `sizes`, dan frame berasio tetap.

## Source dan safety contract

Sebuah program hanya dapat muncul apabila:

1. ID registry memakai namespace `program-index:`;
2. record terdaftar dan approval masih berlaku;
3. program canonical ditemukan dan memiliki detail lengkap;
4. status publikasi valid;
5. module, outcome, format, level, dan durasi tersedia;
6. destination `/programs/<slug>` lolos resolver lokal;
7. cover ada di manifest, disetujui, dan berlabel ilustratif.

Service tetap fail-soft: source yang gagal atau record yang tidak lengkap tidak membuat homepage gagal, tetapi item tersebut tidak ditampilkan.

## Batas yang sengaja dipertahankan

- Workshop tetap empty state; dataset event lama tidak dipakai.
- Learning path dan faculty tetap empty sampai record nyata lolos gate.
- Tidak ada trainer placeholder, client logo, testimonial, metric, ranking, harga, jadwal, kapasitas, atau case study sintetis.
- Tidak ada materi, nama, aset, atau copy Maven yang dipindahkan.
- Tidak ada checkout atau perubahan payment.
- Tidak ada section proof baru; itu scope HP-S5B.

## Kandidat internal untuk HP-S5B

Audit komponen lama menemukan tiga pola UI yang dapat **direbuild**, bukan disalin mentah:

| Kandidat | Nilai yang dapat dipakai | Risiko yang harus dibuang |
|---|---|---|
| `src/components/marketing/startup/StartupLanding.tsx` | Struktur dashboard/progress | Nama peserta dan angka progress sintetis |
| `src/app/reports/page.tsx` | Struktur tabel laporan | Peserta, skor, dan status contoh |
| `src/components/teams/TeamsCertificateHighlight.tsx` | Komposisi specimen sertifikat | Klaim penerbitan tanpa konteks program |

HP-S5B harus membangun specimen anonim, menghapus identitas/nilai/progress, dan memberi label `Contoh tampilan`. Daftar ini bukan approval untuk social proof atau klaim operasional.

## Browser QA

### Desktop `1440 × 1000`

- empat card tampil dalam empat kolom masing-masing sekitar `300 px`;
- seluruh grid berada di dalam container `1,199 px`;
- empat gambar selesai dimuat dengan dimensi hasil `300 × 200`;
- empat label `Ilustrasi program` terlihat;
- tidak ada horizontal overflow.

### Mobile `390 × 844`

- empat card menjadi satu kolom selebar sekitar `349 px`;
- seluruh gambar selesai dimuat;
- tidak ada elemen program dengan `scrollWidth` melebihi `clientWidth`;
- document width tetap `390 px` dan tidak ada horizontal overflow.

Keempat destination dibuka di browser dan menghasilkan halaman utama valid tanpa 404. Console preview tidak mencatat error atau warning.

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Homepage-preview tests | PASS — `30` passed, `1` runtime test skipped tanpa URL |
| Scoped ESLint | PASS |
| Next.js 16.2.3 production build | PASS — `166` static pages |
| Empat route program pada build | PASS |
| Asset size/hash/label tests | PASS |
| Desktop/mobile browser QA | PASS |
| Browser route verification | PASS — `4/4`, tanpa 404 |
| Protected file fingerprints | PASS |

Build hanya menampilkan warning existing bahwa konvensi `middleware` deprecated. Tidak ada dependency baru.

## Gate verdict

| HP-S5A acceptance criterion | Verdict |
|---|---|
| Empat program prioritas aktif | PASS |
| Source traceable dan approval tercatat | PASS |
| Empat destination valid | PASS |
| Cover WebP ringan dan hash-pinned | PASS |
| Label ilustratif terlihat | PASS |
| Mock event/trainer/testimonial/stat tetap tertutup | PASS |
| Homepage aktif dan payment tidak berubah | PASS |
| Stop sebelum HP-S5B | PASS |

**Final verdict: HP-S5A selesai. Fase berikutnya adalah HP-S5B dan belum dijalankan.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_5a_change_manifest.md`](./skillary_homepage_preview_sprint_5a_change_manifest.md).
