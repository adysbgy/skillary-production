# Skillary Homepage Preview — Sprint HP-S9P Report

**Sprint:** `HP-S9P — Focused Founder Polish`
**Tanggal:** 1 Agustus 2026
**Route:** `/lp/homepage-preview`
**Verdict:** **PASS — P2 POLISH COMPLETE, READY FOR FOUNDER REVIEW**
**Stop condition:** **TERPENUHI — HP-S10 tidak dijalankan**

## Outcome

HP-S9P menutup backlog P2 yang dipilih setelah Founder Review tanpa membongkar komposisi Maven-inspired yang telah disetujui. Jalur individu dan organisasi sekarang dapat dipahami serta diakses lebih cepat, copy utama memakai bahasa Indonesia yang lebih natural, trust narrative hanya memakai boundary yang benar-benar diperlukan, dan hero memperoleh signature Skillary `Belajar — Praktik — Buktikan` yang lebih jelas.

Contract preview naik dari `HP-S9R.1` ke `HP-S9P.1`. Route `/`, kebijakan payment HOLD, data gates, dua figur original Skillary, 13 band, serta route preview terisolasi tetap dipertahankan.

## Founder-review closure

Audit menggunakan snapshot tersimpan `.impeccable/critique/2026-08-01T11-02-03Z__res-marketing-homepage-preview-homepagepreview-tsx.md` sebagai baseline. Dua P1 sudah ditutup pada HP-S9R; HP-S9P menangani tiga P2 berikut.

| Finding P2 | Implementasi | Result |
|---|---|---|
| Dua journey terlalu panjang dan bercampur | CTA individu menuju `#program`; CTA organisasi di hero, audience split, dan business bridge menuju `#organization-heading` | PASS |
| Trust narrative terlalu defensif | Boundary anonim dikonsolidasikan pada product showcase; section lain memakai copy positif dan tetap faktual | PASS |
| Jargon dan ownership hero | Istilah assessment, credential, delivery, audience, scope, record, reporting, dan feedback pada copy utama diganti bahasa yang lebih natural; hero memakai signature evidence path | PASS |

## Signature Skillary

Hero capability strip sekarang menjadi tiga langkah bernomor:

1. **Belajar terarah** — Program sesuai tujuan.
2. **Praktik nyata** — Project dan umpan balik.
3. **Buktikan hasil** — Penilaian dan sertifikat.

Implementasi tetap ringan, server-rendered, responsif, dan tidak menambahkan library atau klaim baru. Pada mobile, detail pendukung disembunyikan sementara tiga langkah utama tetap terlihat.

## Verification gate

| Gate | Result |
|---|---|
| Homepage-preview TypeScript compile | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `48` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS — `166` static pages |
| Desktop `1440 × 900` overflow | PASS — `scrollWidth = clientWidth = 1440` |
| Mobile `390 × 844` overflow | PASS — `scrollWidth = clientWidth = 390` |
| Mobile signature layout | PASS — tiga kolom stabil, detail sekunder disembunyikan |
| Audience routing | PASS — individu `#program`, organisasi `#organization-heading` |
| Mobile drawer regression | PASS — Escape menutup, `aria-expanded=false`, focus kembali ke Menu |
| Impeccable changed-source scan | TSX zero findings; satu accepted existing CSS finding pada blueprint grid background |

Folder `.homepage-preview-test-build` adalah output sementara kompilasi tes. Pembersihannya ditolak oleh batas persetujuan lingkungan setelah seluruh tes selesai; artefak tersebut tidak memengaruhi source atau runtime.

## Guardrails

- Homepage `/` tidak diubah atau dipromosikan.
- `/lp/homepage-preview` tetap route terisolasi dan `noindex, nofollow`.
- Payment dan checkout tetap HOLD.
- Tidak ada aset, logo, testimoni, program, atau klaim Maven yang disalin.
- Tidak ada social proof, metrik hasil, jadwal workshop, atau data peserta yang dibuat-buat.
- HP-S10 tidak dijalankan.

## Handoff

Build terbaru berjalan di `http://127.0.0.1:3210/lp/homepage-preview`. Founder dapat menilai HP-S9P sebagai satu hasil utuh. Langkah berikutnya hanya salah satu dari: focused revision baru yang disebutkan secara spesifik, atau perintah promosi HP-S10 yang terpisah.
