# Skillary Homepage Preview — Sprint HP-S9R Report

**Sprint:** `HP-S9R — Pre-Promotion Readiness`
**Tanggal:** 1 Agustus 2026
**Route:** `/lp/homepage-preview`
**Verdict:** **PASS — CONDITIONS CLOSED, READY FOR FOUNDER PROMOTION DECISION**
**Stop condition:** **TERPENUHI — HP-S10 tidak dijalankan**

## Outcome

HP-S9R menutup dua condition P1 dari Founder Review tanpa mengubah visual world atau mempromosikan preview ke `/`. Mobile drawer sekarang mempunyai penutupan `Escape` eksplisit di samping native dialog behavior, kedua figur hero memakai loading policy Next.js 16 yang konsisten, dan entry workshop menyatakan status readiness secara langsung ketika registry masih kosong.

Contract preview naik dari `HP-S8F.1` ke `HP-S9R.1`. Homepage aktif, payment policy, registry gate, asset provenance, empat program terverifikasi, serta seluruh 13 band tetap dipertahankan.

## Condition closure

| Condition HP-S9 | Implementasi | Bukti | Result |
|---|---|---|---|
| Mobile drawer Escape | Native `cancel` ditangani eksplisit; keydown `Escape` menjadi fallback; close tetap mengembalikan focus | Dialog `open=false`, trigger `aria-expanded=false`, focus kembali ke Menu pada `390 × 844` | PASS |
| Hero media policy | Kedua figur above-the-fold memakai `loading="eager"`; `fetchPriority` kondisional dihapus | Dua image complete, `naturalWidth=319`, `loading=eager`, tanpa `fetchpriority` | PASS |
| Workshop readiness | Primary navigation menjadi `Workshop berikutnya`; format card tetap `Events & Workshop`; CTA menjadi `Daftarkan minat` | Empty state menyatakan belum dijadwalkan dan tidak menampilkan tanggal/host/harga/kursi | PASS |

## Perubahan UX copy

- Header desktop/mobile: `Workshop berikutnya`.
- Discovery tab dan footer: `Workshop berikutnya`.
- Learning-format card mempertahankan kategori `Events & Workshop`, tetapi menjelaskan bahwa jadwal hanya diumumkan setelah topik, fasilitator, waktu, dan ketersediaan terverifikasi.
- Empty state: `Workshop berikutnya belum dijadwalkan.`
- CTA empty state: `Daftarkan minat workshop` menuju `/contact`.
- FAQ: `Kapan workshop berikutnya tersedia?`
- Tidak ada tanggal, fasilitator, harga, kursi, popularitas, atau outcome baru yang ditambahkan.

## Verification gate

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `47` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS — `166` static pages |
| Mobile drawer interaction | PASS — Escape, close state, `aria-expanded`, focus return |
| Hero media runtime | PASS — eager/complete/no contradictory priority |
| Desktop `1440 × 900` overflow | PASS |
| Mobile `390 × 844` overflow | PASS |
| Impeccable detector on changed TS/TSX | PASS — zero findings |
| Impeccable supporting CSS scan | One accepted pre-existing advisory: hero grid background |

Build pertama di sandbox gagal karena Google Fonts tidak dapat diakses. Build diulang dengan network access yang sesuai dan lulus. Kegagalan pertama bukan defect implementasi.

## Known external platform issue

Browser console tetap mencatat error konfigurasi Auth.js dari shared session provider. Temuan ini sudah ada sebelum HP-S9R, tidak berasal dari feature preview, tidak menggagalkan route/runtime test, dan tetap berada pada audit platform terpisah.

## Guardrails

- `/` tidak diubah dan tidak mengimpor homepage preview.
- `/lp/homepage-preview` tetap route terisolasi.
- Payment dan checkout tetap HOLD.
- Workshop registry tetap kosong; tidak ada event sintetis yang dipromosikan.
- Tidak ada aset Maven yang ditambahkan.
- HP-S10 tidak dijalankan.

## Handoff

Preview produksi lokal tersedia di `http://127.0.0.1:3210/lp/homepage-preview`. HP-S9R berhenti pada founder checkpoint. Tahap selanjutnya adalah keputusan founder: meminta focused revision atas backlog P2 atau memberikan perintah promosi terpisah untuk HP-S10.
