# Skillary Homepage Preview — Sprint HP-S2 Report

**Sprint:** `HP-S2 — Isolated Route & Structural Skeleton`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S3 belum dijalankan**

## Outcome

HP-S2 selesai sebagai structural blueprint homepage Skillary pada route terisolasi:

```text
/lp/homepage-preview
```

Route baru memiliki shell preview sendiri, metadata `noindex, nofollow`, token visual feature-local, loading/error boundary, dan 13 core bands yang lengkap pada desktop maupun mobile. Homepage aktif `/`, global stylesheet, konfigurasi, schema, sitemap, robots, dan payment availability tidak diubah oleh sprint ini.

Ini belum merupakan visual final. Search interaktif, drawer final, hero photography original, capability bubbles, katalog interaktif, proof final, motion, dan full-page polish tetap menjadi ownership HP-S3–HP-S8.

## Arsitektur preview

- Root layout tetap menjadi pemilik satu-satunya elemen `<main>`.
- Preview shell menambahkan skip link, satu preview header, satu preview footer, dan target konten yang dapat menerima fokus tanpa nested `<main>`.
- Header desktop memakai dua baris struktural; mobile memakai native `<details>` agar menu tetap dapat digunakan tanpa client JavaScript tambahan.
- Semua style HP-S2 berada di CSS Module feature dan memakai palette hangat Skillary dengan primary `rgb(255, 138, 0)`.
- Route memakai Node runtime, `force-dynamic`, dan server loader HP-S1 yang fail-soft.
- Conditional logo, testimonial, metric, dan case study tidak dirender karena evidence gate masih `off`.
- Tidak ada checkout, CTA pembayaran, external URL, `/events`, fake course, fake workshop, fake faculty, quote, outcome metric, atau endorsement.

## Blueprint 13 core bands

| ID | Core band | Surface / struktur HP-S2 |
|---|---|---|
| `SK-HP-01` | Header | Ink; utility row + discovery row |
| `SK-HP-02` | Hero dua figur | Warm; desktop `25/50/25`, mobile copy → figur individu → figur organisasi |
| `SK-HP-03` | Pilih jalur | Warm; audience split `1/1` |
| `SK-HP-04` | Sistem Skillary | Ink; 3-step evidence board + delivery standards |
| `SK-HP-05` | Jalur berdasarkan tujuan | Light; 4-up decision grid |
| `SK-HP-06` | Program + Workshop | Light; tiga discovery groups server-rendered dengan honest empty state |
| `SK-HP-07` | Bukti produk | Ink; 3-up specimen board berlabel `Contoh tampilan` |
| `SK-HP-08` | Evidence Artifact Gallery | Light; tiga artifact views + evidence ledger |
| `SK-HP-09` | Untuk Organisasi | Orange-led; intro + engagement walkthrough |
| `SK-HP-10` | What Organizations Can Inspect | Ink; empat inspection groups |
| `SK-HP-11` | FAQ | Warm; native disclosure column |
| `SK-HP-12` | Dual closing CTA | Ink; keputusan individu/organisasi `1/1` |
| `SK-HP-13` | Footer | Ink; brand statement + empat link groups termasuk Legal |

Setiap definisi blueprint mencatat reference/original label, surface, grid ratio, density, anatomy, token, responsive reflow, interaction, dan intentional difference. Test menolak ID hilang, duplikat, atau urutan yang berubah.

## Source truth yang terlihat di UI

Karena registry approval HP-S1 masih kosong, program, workshop, dan jalur belajar menampilkan designed empty state. Workshop mengarah ke `/contact`, bukan `/events`; payment tetap `hold`; conditional proof tidak menghasilkan placeholder seolah-olah bukti nyata.

Specimen yang bersifat ilustratif diberi label `Contoh tampilan`. Copy capability tetap menggunakan wording terbatas seperti “tersedia pada program tertentu” dan “sesuai kriteria program”.

## Gate evidence

| Gate | Result |
|---|---|
| Isolated HP-S2 TypeScript compile | PASS |
| Native homepage-preview suite tanpa server URL | PASS — `23` passed, `1` output test intentionally skipped |
| Production output test dengan `HOMEPAGE_PREVIEW_BASE_URL` | PASS — `1/1` |
| Whole-project TypeScript `--noEmit` | PASS |
| Scoped ESLint route, feature, tests | PASS — 0 error, 0 warning |
| Impeccable UI anti-pattern detector | PASS — 0 finding |
| Repository `quality:gate:core` | PASS |
| Next.js 16.2.3 production build | PASS |
| Preview HTTP response | PASS — `200` |
| Rendered robots | PASS — `noindex, nofollow` |
| Preview absent from rendered sitemap | PASS |
| Active `/` remains `200` and indexable | PASS |
| Rendered semantic contract | PASS — 1 main, 1 H1, 1 header, 1 footer |
| Exact core band output | PASS — 13 unique bands in locked order |
| Conditional evidence output | PASS — 0 insert while gates are off |
| Anchor contract | PASS — one each for `#program`, `#workshop`, `#jalur-belajar` |
| Payment/event safety | PASS — no checkout link and no `/events` link |
| HP-S0 protected hashes | PASS |

Production build memerlukan akses ke provider Google Fonts yang sudah dipakai project; setelah akses build diberikan, build selesai. Tidak ada dependency baru yang ditambahkan.

## Browser dan responsive QA

Hydrated DOM diuji pada lebar `320`, `375`, `390`, `768`, `1024`, dan `1440` px:

- seluruh viewport merender 13 band dalam urutan yang benar;
- `html` dan `body` horizontal overflow: `0`;
- seluruh visible control yang diaudit memenuhi minimum 44 px;
- mobile hanya menampilkan header mobile, sedangkan utility/discovery header tampil mulai tablet;
- mobile hero berurutan copy → individu → organisasi;
- desktop hero menghasilkan grid terukur `316 / 632 / 316` pada container 1344 px, sesuai rasio `25/50/25`;
- native mobile menu berhasil dibuka/ditutup tanpa overflow;
- FAQ “Pembayaran online” berhasil dibuka dan menampilkan copy payment-hold yang aman;
- CTA pada band organisasi memakai Ink focus outline dengan contrast ratio `8.02:1` terhadap oranye;
- loading fallback tidak meninggalkan H1 kedua setelah hydration.

Backend screenshot in-app mempunyai artefak crop/repeat pada full-page capture. Keputusan gate karena itu memakai DOM rectangles, semantic snapshot, runtime response, dan pengukuran overflow sebagai evidence utama; artefak tersebut bukan defect halaman.

## Observasi non-blocking

Preview lokal mencatat error Auth.js tentang konfigurasi server ketika provider global mencoba mengambil session. Route tetap `200` dan seluruh gate HP-S2 lulus. Error berasal dari konfigurasi lingkungan/root provider yang sudah ada dan berada di luar ownership HP-S2; sprint ini sengaja tidak mengubah auth atau root shell.

Independent finish review memberikan verdict `GO` dengan `0` P0/P1 tersisa. Sebelum conditional proof diaktifkan pada HP-S5, policy harus diperketat agar endorsement/logo dan attributed quote selalu memerlukan `permissionStatus: "approved"`, disertai negative fixtures. Risiko itu tidak terekspos di HP-S2 karena registry kosong dan composition tidak merender conditional proof.

## Gate verdict

| HP-S2 acceptance criterion | Verdict |
|---|---|
| Route preview benar-benar terisolasi | PASS |
| Tidak ada header/footer ganda | PASS |
| Tidak ada nested `<main>` | PASS |
| Robots output benar dan preview tidak masuk sitemap | PASS |
| Semua 13 core bands lengkap pada desktop/mobile | PASS |
| Blueprint mempunyai metadata implementasi lengkap | PASS |
| Empty/proof/payment state jujur | PASS |
| Homepage aktif dan protected files tidak berubah | PASS |
| Stop sebelum HP-S3 | PASS |

**Final verdict: GO untuk meminta otorisasi HP-S3. Sprint tidak melanjutkan otomatis.**

## Batas HP-S3 berikutnya

HP-S3 hanya boleh mematangkan first viewport: utility/discovery header final, mobile drawer, search dari contract HP-S1, dua aset profesional original beserta provenance/crop/byte review, layout hero final, capability bubbles, dan LCP/CLS check. Band discovery, proof, organisasi, FAQ, dan footer final tetap tidak boleh diambil alih dari sprint pemiliknya.

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_2_change_manifest.md`](./skillary_homepage_preview_sprint_2_change_manifest.md).
