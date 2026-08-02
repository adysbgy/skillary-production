# Skillary Homepage Preview — Sprint HP-S3 Report

**Sprint:** `HP-S3 — First Viewport`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S4 belum dijalankan**

## Outcome

HP-S3 menyelesaikan first viewport `/lp/homepage-preview` tanpa mengubah homepage aktif `/`.

First viewport sekarang mempunyai:

- utility header dengan Skillary mark, pencarian minimum, dan jalur organisasi;
- sticky discovery row desktop;
- label `Events & Workshop` yang tetap terlihat pada mobile;
- native dialog navigation drawer dengan focus return;
- dua figur profesional original untuk audiens individu dan organisasi;
- layout hero desktop `25 / 50 / 25`;
- dua CTA yang dikunci;
- enam capability bubbles yang memakai wording aman;
- responsive image sizing, fixed portrait frames, dan loading priority yang eksplisit.

HP-S3 tidak mengubah discovery/catalog bands, proof system, organisasi below-fold, FAQ, footer final, payment, atau homepage produksi. Ownership bagian tersebut tetap berada pada sprint berikutnya.

## Header dan navigation

### Desktop

- Baris utility: Skillary wordmark, search, `Untuk Organisasi`, `Materi Gratis`, dan `Masuk`.
- Baris discovery yang sticky: Program, Events & Workshop, Jalur Belajar, Sertifikasi, Portfolio, Faculty, dan menu Lainnya.
- Discovery row menempel di `top: 0`; utility row tidak ikut memenuhi viewport ketika halaman discroll.

### Mobile dan tablet

- Compact sticky header mempertahankan Skillary, `Events & Workshop`, dan tombol Menu hingga lebar minimum 320 px.
- Drawer memakai native `<dialog>`, Escape/cancel bawaan, focus awal pada tombol tutup, focus return ke tombol Menu, backdrop, dan target minimum 44 px.
- Drawer mengelompokkan Belajar, Bukti, dan Lainnya tanpa membuat route baru.

## Search minimum

Search memakai static destination index dari kontrak HP-S1. Query diproses lokal di browser dan tidak memakai fetch, query parameter, local storage, session storage, atau analytics.

State yang telah digunakan:

- `idle` saat input kosong;
- `results` dengan maksimal enam safe destinations;
- `empty` dengan saran recovery yang jelas.

Pengujian `sertifikat` menghasilkan destination `/certifications`; query acak menghasilkan empty state. `data-query-tracking="disabled"` tetap server-rendered. Dynamic course/path entries baru akan relevan setelah registry mempunyai catalog approved; tidak ada data contoh yang ditambahkan untuk membuat search terlihat penuh.

## Hero Gate

### Copy dan audience clarity

- H1 tetap tunggal: “Bangun skill kerja yang relevan—lalu tunjukkan hasil belajarnya.”
- Jalur visual dan caption membedakan `Untuk individu` serta `Untuk organisasi` tanpa mengandalkan warna saja.
- `Belajar → Praktik → Buktikan` ditempatkan sebagai method rail setelah CTA, bukan eyebrow dekoratif di atas H1.
- CTA individu menuju `#program`; CTA organisasi menuju `/untuk-organisasi`.

### Original hero assets

Empat kandidat dibuat khusus untuk Skillary. `IND-A + ORG-A` dipilih setelah contact-sheet review. Tidak ada image input Maven, public figure, trainer existing, customer identity, logo, certificate, quote, atau endorsement.

| Selected asset | Dimensions | Size |
|---|---:|---:|
| `hero-individual-v1.webp` | `768 × 1619` | sekitar `39 KB` |
| `hero-organization-v1.webp` | `768 × 1619` | sekitar `38 KB` |

Total derivative sekitar `77 KB`, jauh di bawah initial hero budget `450 KB`. Provenance dan contact sheet berada di [`docs/references/skillary-hero/2026-08-01`](./references/skillary-hero/2026-08-01/PROVENANCE.md).

### Image loading dan CLS protection

- Gambar menggunakan static import Next.js dan `fill` pada frame dengan tinggi eksplisit.
- `sizes` tersedia untuk mobile, tablet, dan desktop.
- Portrait individu memakai `fetchPriority="high"`; portrait organisasi memakai eager loading.
- `placeholder="blur"` memakai metadata static import.
- Browser mengonfirmasi kedua gambar complete, mempunyai intrinsic responsive derivative, dan frame tidak berubah setelah hydration.

## Browser QA

Breakpoint final: `320 × 720`, `390 × 844`, `768 × 900`, `940 × 900`, dan `1440 × 900`.

Pada seluruh breakpoint:

- 13 core bands tetap lengkap;
- satu `<main>` dan satu H1;
- `html` horizontal overflow: `0`;
- `body` horizontal overflow: `0`;
- tidak ada visible control di bawah 44 px;
- kedua hero image selesai dimuat;
- mobile DOM dan visual order: copy → individu → organisasi;
- header item tidak saling overlap;
- `Events & Workshop` terlihat pada mobile dan discovery row desktop;
- CTA tidak tertutup atau keluar viewport.

Pada desktop 1440 px, hero band dimulai setelah header pada `y=136` dan berakhir sekitar `y=891`, sehingga first viewport lengkap terbaca pada tinggi 900 px. Central copy berukuran sekitar 625 px dan dua portrait column sekitar 313 px, sesuai rasio 25/50/25.

## Verification evidence

| Gate | Result |
|---|---|
| Isolated HP TypeScript compile | PASS |
| Homepage-preview source tests | PASS — `26` passed, `1` runtime test skipped tanpa server URL |
| Explicit production runtime test | PASS — `1/1` |
| Scoped ESLint | PASS — 0 error, 0 warning |
| Whole-project TypeScript | PASS |
| Repository `quality:gate:core` | PASS |
| Impeccable detector | PASS — `[]` |
| Next.js 16.2.3 production build | PASS |
| Preview route | PASS — `200`, dynamic, noindex/nofollow |
| Active homepage and protected hashes | PASS |
| Hero asset budget | PASS — approximately `77 KB / 450 KB` |
| Hero Gate | PASS |

No dependency baru ditambahkan.

## Observasi non-blocking

Browser production lokal masih mencatat Auth.js server-configuration error ketika root provider existing mencoba mengambil session. Ini sama dengan observasi HP-S2, bukan berasal dari komponen HP-S3, dan tidak memengaruhi response `200`, search, drawer, hero, atau gate runtime. Root auth/provider berada di luar ownership sprint ini.

## Gate verdict

| HP-S3 acceptance criterion | Verdict |
|---|---|
| Dua audiens terbaca pada first viewport | PASS |
| Events & Workshop terlihat | PASS |
| Kedua CTA tidak tertutup | PASS |
| Aset hero original dan mempunyai provenance | PASS |
| Satu H1 | PASS |
| Tidak ada layout shift yang terlihat | PASS |
| Search minimum bekerja tanpa tracking | PASS |
| Sticky desktop discovery dan mobile drawer bekerja | PASS |
| Homepage aktif tidak berubah | PASS |
| Stop sebelum HP-S4 | PASS |

**Final verdict: GO untuk meminta otorisasi HP-S4. Sprint tidak melanjutkan otomatis.**

HP-S4 berikutnya memiliki audience cards, sistem Belajar–Praktik–Buktikan, goals, katalog/discovery, accessible tabs, serta hash-focus behavior untuk Program, Events & Workshop, dan Jalur Belajar.

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_3_change_manifest.md`](./skillary_homepage_preview_sprint_3_change_manifest.md).
