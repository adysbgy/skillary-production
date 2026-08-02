# Skillary Homepage Preview — Sprint HP-S8B Report

**Sprint:** `HP-S8B — Audience, Learning Formats & Business Band Parity`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS — SHIP**
**Stop condition:** **TERPENUHI — HP-S8C belum dijalankan**

## Outcome

HP-S8B mengoreksi tiga band langsung setelah hero pada `/lp/homepage-preview`. Urutannya sekarang mengikuti cadence homepage Maven Analytics yang dipin: dark 1:1 audience decision, light four-format learning grid, dan compact dark business bridge.

Implementasi tetap berada di dunia Skillary. Orange `rgb(255,138,0)`, copy Indonesia, route Skillary, source gate, serta language belajar–praktik–bukti dipertahankan. Tidak ada logo klien, student count, ranking, testimonial, outcome metric, tanggal workshop, atau aset Maven yang ditambahkan.

## Band translation

| Band | Reference grammar | Skillary translation | Truth boundary |
|---|---|---|---|
| Audience | Two dark audience panels | Individu dan organisasi dengan owned line icons serta explicit CTA | Tidak memakai jumlah peserta atau outcome claim |
| Learning formats | Four equal learning cards | Jalur Belajar, Program Terstruktur, Events & Workshop, Project & Assessment | Workshop menyatakan data harus terverifikasi |
| Business | Compact business copy + logo wall | Organization proposition + six program-scope tiles | Scope tiles menggantikan logo perusahaan yang tidak terverifikasi |

## Spatial thesis

Primary reading path adalah memilih audience, memahami format belajar, lalu melihat jalur organisasi. Audience decision sengaja rapat dan gelap; learning formats diberi ruang putih yang lebih lega; business bridge kembali gelap dan lebih ringkas agar menjadi transisi kuat menuju katalog.

Desktop memakai `1 / 1` audience split, empat format columns, lalu `5 / 7` business layout. Mobile mengubah semuanya menjadi urutan linear; format cards menjadi satu kolom dan business scope tetap dua kolom. DOM order dan visual order tidak berubah.

## Responsive QA

| Viewport | Document overflow | Touch target <44 px | Result |
|---|---:|---:|---|
| `1440 × 900` | 0 | 0 | PASS |
| `390 × 844` | 0 | 0 | PASS |

Measured desktop band heights: Audience `587.5 px`, Learning Formats `900.3 px`, dan Business `527.9 px`. Mobile reflow heights: Audience `967 px`, Learning Formats `1766.4 px`, dan Business `738.8 px`. Mobile sengaja lebih panjang karena format cards menjadi stack yang dapat dibaca tanpa horizontal document overflow.

## Visual evidence

- [`hp-s8b-1440x900-audience-formats.png`](./hp-s8b-1440x900-audience-formats.png)
- [`hp-s8b-1440x900-formats-business.png`](./hp-s8b-1440x900-formats-business.png)
- [`hp-s8b-390x844-business.png`](./hp-s8b-390x844-business.png)

Ketiga file diverifikasi pada dimensi yang tercantum di filename.

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `43` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS — `166` pages |
| Desktop/mobile browser QA | PASS |
| Impeccable layout detector, before and after | PASS — `[]` |
| Protected file fingerprints | PASS |

Build hanya menampilkan warning existing mengenai konvensi `middleware` yang deprecated. Tidak ada dependency baru.

## Known out-of-scope observation

Shared Auth.js provider/environment masih mencatat configuration error pada produksi lokal. HP-S8B tidak mengubah auth, environment, database, session route, checkout, atau payment. Preview route dan seluruh HP-S8B runtime gate tetap berjalan.

## Gate verdict

| HP-S8B acceptance criterion | Verdict |
|---|---|
| Maven-like audience split | PASS |
| Empat learning-format decisions | PASS |
| Workshop copy tetap verification-gated | PASS |
| Compact business bridge | PASS |
| Tidak ada logo atau metric palsu | PASS |
| Desktop/mobile no-overflow dan 44 px targets | PASS |
| Homepage aktif `/` tidak diubah | PASS |
| Payment tetap HOLD | PASS |
| Stop sebelum HP-S8C | PASS |

**Final verdict: HP-S8B selesai. Cadence dari hero hingga business bridge sekarang Maven-like versi Skillary; parity catalog dan section di bawahnya belum diklaim.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_8b_change_manifest.md`](./skillary_homepage_preview_sprint_8b_change_manifest.md).
