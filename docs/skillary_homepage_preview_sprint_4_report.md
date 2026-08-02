# Skillary Homepage Preview — Sprint HP-S4 Report

**Sprint:** `HP-S4 — Audience, System & Discovery`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S5 belum dijalankan**

## Outcome

HP-S4 menyelesaikan bagian audience decision, sistem belajar, goals, dan discovery pada `/lp/homepage-preview` tanpa mengubah homepage aktif `/`.

Preview sekarang mempunyai:

- dua kartu keputusan audiens yang membedakan individu dan organisasi;
- sistem `Belajar → Praktik → Buktikan` dengan outcome yang bermakna;
- empat jalur tujuan dengan copy yang berbeda dan tidak bergantung pada angka dekoratif;
- tiga discovery tabs: Program, Events & Workshop, dan Jalur Belajar;
- fallback server/no-JavaScript yang tetap menampilkan semua kelompok secara berurutan;
- progressive enhancement menjadi manual-activation tabs saat JavaScript tersedia;
- state program, workshop, dan learning path yang hanya menampilkan data lolos verifikasi;
- empty state Workshop yang jujur serta CTA non-transaksional;
- deep-link hash yang memilih panel, memindahkan fokus, dan menjaga judul tetap terlihat di bawah sticky header.

HP-S4 tidak membuat data contoh untuk mengisi katalog. Tidak ada checkout, purchase CTA, perubahan payment, proof system baru, organisasi below-fold, FAQ, atau footer final. Area tersebut tetap milik fase berikutnya.

## Audience decision dan system

### Audience cards

- `Untuk individu` memakai bidang oranye dan mengarahkan pengguna ke program yang relevan dengan pekerjaan.
- `Untuk organisasi` memakai bidang gelap dan menjelaskan jalur training untuk kebutuhan tim.
- Kedua kartu memiliki tujuan, outcome, dan CTA yang berbeda; pemahaman tidak bergantung pada warna saja.

### Belajar–Praktik–Buktikan

Tiga tahap menjelaskan perubahan yang diharapkan:

1. memahami konsep dan konteks kerja;
2. menerapkannya melalui latihan atau project;
3. menunjukkan hasil melalui assessment dan artefak yang memang tersedia pada program terkait.

Wording tidak menjanjikan project, sertifikat, atau bukti untuk semua program secara otomatis.

### Goals

Empat tujuan—mulai dari skill dasar, peningkatan kemampuan kerja, jalur terarah, hingga kebutuhan tim—mempunyai copy dan destination yang spesifik. Angka besar dekoratif dihapus agar hierarki bertumpu pada keputusan pengguna.

## Discovery tabs

### Progressive enhancement

- Server/no-JavaScript: Program, Events & Workshop, dan Jalur Belajar tetap tersedia sebagai anchor dan kelompok berurutan.
- Client-enhanced: hanya satu panel terlihat, dengan semantic `tablist`, `tab`, dan `tabpanel`.
- Arrow Left/Right, Home, dan End memindahkan fokus tanpa mengaktifkan panel.
- Enter atau Space mengaktifkan tab yang difokuskan.
- Klik, keyboard, dan direct hash mempertahankan URL hash serta memindahkan fokus ke H3 panel.

### Bounded content dan source truth

- Setiap panel dibatasi maksimal empat card.
- Program dan learning path hanya muncul jika publication/readiness checks lolos.
- Workshop memerlukan tanggal, waktu, durasi, level, outcome sesi, host, status minat, dan review yang masih berlaku.
- Record demo, stale, closed, unapproved, invalid, atau tidak lengkap tidak ditampilkan.

Karena registry saat ini belum memiliki workshop yang lolos verifikasi, panel menampilkan:

> Jadwal workshop berikutnya sedang disiapkan.

CTA `Tanyakan Jadwal Workshop` mengarah ke jalur kontak dan tidak mengaktifkan pembayaran.

## Browser QA

### Desktop `1440 × 900`

- satu panel discovery terlihat;
- direct `#workshop` memilih `Events & Workshop`;
- fokus berada pada H3 `workshop`;
- posisi H3 `76 px`, sticky navigation bottom `60 px`;
- clearance fokus `16 px`;
- lebar viewport dan document sama-sama `1440 px`.

### Mobile `390 × 844`

- direct `#workshop` memilih panel Workshop;
- fokus berada pada H3 `workshop`;
- posisi H3 `84 px`, header bottom `68 px`;
- clearance fokus `16 px`;
- lebar viewport dan document sama-sama `390 px`;
- tidak ada visible target di bawah `44 px`.

Bukti visual final:

- [`hp-s4-desktop-workshop-hash-proof.png`](./references/skillary-homepage/2026-08-01/hp-s4-desktop-workshop-hash-proof.png)
- [`hp-s4-mobile-workshop-hash-proof.png`](./references/skillary-homepage/2026-08-01/hp-s4-mobile-workshop-hash-proof.png)
- [`hp-s4-desktop-audience.png`](./references/skillary-homepage/2026-08-01/hp-s4-desktop-audience.png)
- [`hp-s4-mobile-audience.png`](./references/skillary-homepage/2026-08-01/hp-s4-mobile-audience.png)

## Independent finish review

Impeccable finish review awal menemukan satu masalah material: H3 hasil direct hash tertutup sticky header. Implementasi diperbaiki dengan memindahkan fokus lebih dulu, memosisikan scroll setelahnya, dan melakukan satu koreksi setelah layout stabil.

Recapture desktop dan mobile diaudit ulang oleh reviewer yang sama. Verdict final:

- sticky-header hash target: **resolved**;
- focused `Events & Workshop` H3 terlihat penuh;
- panel Workshop benar;
- remaining findings: **clear**;
- disposition: **ship**.

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Homepage-preview source tests | PASS — `28` passed, `1` runtime test skipped tanpa URL |
| Explicit production runtime test | PASS — `1/1` |
| Scoped ESLint | PASS |
| Repository `quality:gate:core` | PASS |
| Impeccable detector | PASS — `[]` |
| Next.js 16.2.3 production build | PASS |
| Desktop/mobile browser QA | PASS |
| Independent finish review | PASS — `ship` |
| Protected hashes | PASS |

Tidak ada dependency baru. Build hanya menampilkan warning existing bahwa konvensi `middleware` deprecated dan nantinya perlu dipindah ke `proxy`; warning ini bukan akibat HP-S4.

## Observasi non-blocking

Server preview lokal masih dapat mencatat Auth.js production configuration error dari root provider existing. Temuan ini sudah ada pada sprint sebelumnya, berada di luar ownership HP-S4, dan tidak memengaruhi response route, tab behavior, data gate, atau browser QA.

## Gate verdict

| HP-S4 acceptance criterion | Verdict |
|---|---|
| Dua keputusan audiens jelas | PASS |
| Sistem Belajar–Praktik–Buktikan bermakna dan aman | PASS |
| Empat goals mempunyai copy berbeda | PASS |
| Accessible manual-activation tabs | PASS |
| Fallback no-JavaScript tetap lengkap | PASS |
| Program/path/workshop memakai verified-source contract | PASS |
| Workshop empty state jujur dan non-transaksional | PASS |
| Direct hash memilih, fokus, dan tidak tertutup sticky header | PASS |
| Mobile tidak overflow dan target minimum 44 px | PASS |
| Homepage aktif serta payment tidak berubah | PASS |
| Stop sebelum HP-S5 | PASS |

**Final verdict: HP-S4 selesai dan layak dipertahankan. Sprint berhenti sebelum HP-S5.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_4_change_manifest.md`](./skillary_homepage_preview_sprint_4_change_manifest.md).
