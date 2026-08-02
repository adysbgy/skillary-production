# Skillary Homepage Preview — Sprint HP-S6 Report

**Sprint:** `HP-S6 — Organization & Closing`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S7 belum dijalankan**

## Outcome

HP-S6 menyelesaikan band `SK-HP-09` sampai `SK-HP-13` pada `/lp/homepage-preview` dan mengubah bagian organisasi serta penutup dari skeleton generik menjadi journey yang dapat dipahami dan diperiksa.

Journey organisasi sekarang mempunyai empat tahap:

1. `Pahami` — memetakan audience, peran, konteks, level awal, format, dan kendala;
2. `Rancang` — menyepakati tujuan, materi, praktik, assessment, dan completion criteria;
3. `Jalankan` — menyiapkan batch, peserta, akses, fasilitator, jadwal, dan dukungan;
4. `Tinjau` — meninjau partisipasi, completion, assessment, credential, dan ringkasan yang tersedia.

Setiap tahap menjelaskan pertanyaan yang dijawab dan output yang dihasilkan. CTA organisasi menuju route nyata `/untuk-organisasi` dan closing discovery menuju `/contact`.

## Taxonomy HR/L&D

Band inspeksi tidak memakai kumpulan kartu generik. Informasi disusun sebagai matriks lima area:

- `Partisipasi`;
- `Progress`;
- `Assessment`;
- `Credential`;
- `Reporting`.

Setiap area mempunyai definisi dan checkpoint. Copy secara eksplisit menyatakan bahwa bagian ini bukan dashboard ROI atau janji real-time; field, akses, format, serta waktu penyampaian mengikuti data dan scope program.

## FAQ, closing, dan footer

- Enam FAQ native `<details>/<summary>` menjelaskan audience, event/workshop, scope program organisasi, assessment dan sertifikasi, data HR/L&D, serta payment hold.
- Closing membedakan tindakan individu dengan persiapan discovery organisasi.
- Tidak ada CTA checkout.
- Footer dibagi menjadi `Jelajahi`, `Hasil belajar`, `Organisasi`, dan `Akun & Legal`.
- Semua sembilan route halaman yang dipakai footer lolos pemeriksaan HTTP `200`.

## Browser QA

### Desktop `1280 × 720`

- 13 band terdeteksi satu kali;
- 4 tahap organisasi, 5 row inspeksi, 6 FAQ, dan 2 closing cards terdeteksi;
- document width sama dengan viewport `1280 px`;
- tidak ada horizontal overflow;
- matriks inspeksi memakai kolom `Area / Yang dapat dijelaskan / Checkpoint`;
- closing memakai kontras orange untuk individu dan warm paper untuk organisasi.

### Mobile `390 × 844`

- document width sama dengan viewport `390 px`;
- tidak ada horizontal overflow;
- organization brief, journey, inspection matrix, FAQ, dan closing reflow menjadi satu kolom;
- label, checkpoint, copy batas scope, dan CTA tetap terbaca;
- header mobile tetap utuh dan tidak menutupi konten.

Bukti visual:

- [`hp-s6-desktop-organization.jpg`](./hp-s6-desktop-organization.jpg)
- [`hp-s6-desktop-inspection.jpg`](./hp-s6-desktop-inspection.jpg)
- [`hp-s6-desktop-faq.jpg`](./hp-s6-desktop-faq.jpg)
- [`hp-s6-desktop-closing.jpg`](./hp-s6-desktop-closing.jpg)
- [`hp-s6-mobile-organization.jpg`](./hp-s6-mobile-organization.jpg)
- [`hp-s6-mobile-inspection.jpg`](./hp-s6-mobile-inspection.jpg)
- [`hp-s6-mobile-closing.jpg`](./hp-s6-mobile-closing.jpg)

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview tests | PASS — `37` passed, `1` runtime test skipped tanpa URL |
| Explicit runtime route test | PASS — `1/1` |
| Next.js 16.2.3 production build | PASS — `166` static pages |
| Desktop/mobile DOM QA | PASS |
| Footer destination audit | PASS — `9/9` HTTP `200` |
| Browser console | PASS — hanya React DevTools info dari dev mode; tidak ada error/warning |
| Impeccable detector | PASS untuk homepage preview; temuan scanner hanya pada file lama di luar scope |
| Protected file fingerprints | PASS |

Build hanya menampilkan warning existing bahwa konvensi `middleware` deprecated. Tidak ada dependency baru.

## Independent finish review

Fresh Impeccable finish reviewer memberikan verdict **PASS** tanpa material finding. Reviewer menilai journey organisasi, taxonomy HR/L&D, batas FAQ faktual, dual CTA, dan contact path sudah jelas; tidak ada janji ROI, SLA, maupun checkout. Komposisi desktop dan mobile dinilai kuat serta tetap mempunyai identitas Skillary.

**Final disposition reviewer: ship.**

## Gate verdict

| HP-S6 acceptance criterion | Verdict |
|---|---|
| 13 core bands lengkap | PASS |
| Journey individu dan organisasi lengkap | PASS |
| Organization CTA menuju route nyata | PASS |
| Lima area inspeksi HR/L&D jelas | PASS |
| Tidak ada klaim ROI, SLA, atau real-time universal | PASS |
| FAQ faktual dan payment tetap HOLD | PASS |
| Dual closing CTA mempunyai next step berbeda | PASS |
| Footer tidak memiliki dead destination | PASS |
| Desktop/mobile composition gate | PASS |
| Independent finish review | PASS — no material finding; disposition `ship` |
| Homepage aktif `/` tidak berubah | PASS |
| Stop sebelum HP-S7 | PASS |

**Final verdict: HP-S6 selesai. Fase berikutnya adalah HP-S7 dan belum dijalankan.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_6_change_manifest.md`](./skillary_homepage_preview_sprint_6_change_manifest.md).
