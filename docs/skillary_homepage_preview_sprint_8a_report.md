# Skillary Homepage Preview — Sprint HP-S8A Report

**Sprint:** `HP-S8A — Maven Visual Parity: First Viewport`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS — SHIP**
**Stop condition:** **TERPENUHI — HP-S8B belum dijalankan**

## Outcome

HP-S8A mengoreksi first viewport `/lp/homepage-preview` setelah audit menyimpulkan komposisi sebelumnya masih mencampur pola Maven.com Workshops dan Maven Analytics. Header dan hero sekarang mengikuti grammar visual Maven Analytics yang diminta pengguna: satu navigation row gelap, bidang putih dengan grid referensi halus, headline sentral dua baris, dua figur cutout yang mengapit copy, dual CTA, capability bubbles, dan capability strip pada ujung hero.

Implementasi tetap menjadi Skillary. Warna utama menggunakan orange brand `rgb(255,138,0)`, copy berbahasa Indonesia, route dan data berasal dari kontrak Skillary, dan kedua figur berasal dari aset original Skillary. Tidak ada foto, logo, UI capture, atau aset Maven yang disalin.

Fase ini hanya mengoreksi header dan hero. Audience, learning formats, organization/business band, discovery, proof, FAQ, closing, dan footer belum dinyatakan memiliki parity Maven melalui HP-S8A.

## First-viewport composition

| Area | Hasil HP-S8A |
|---|---|
| Header | Satu dark row; brand lockup, nav utama, search disclosure, Masuk dan Mulai Belajar |
| Hero promise | `Bangun skill kerja / yang siap dipakai.`; tepat dua baris eksplisit pada desktop |
| Audience framing | Figur individual dan organization mengapit proposition tanpa klaim testimonial |
| Actions | `Mulai jelajahi program` dan `Skillary untuk organisasi` |
| Capabilities | Program terstruktur, praktik berbasis project, assessment & sertifikasi |
| Mobile | Copy-first, dual CTA full-width, dua figur berdampingan di bawah copy |

## Original visual assets

ImageGen built-in digunakan sebagai background-extraction edit terhadap dua aset Skillary yang sudah ada. Chroma source kemudian diproses dengan helper removal menjadi transparent PNG. Detail source, prompt, dan output tercatat pada [`HP-S8A-CUTOUT-PROVENANCE.md`](./references/skillary-hero/2026-08-01/HP-S8A-CUTOUT-PROVENANCE.md).

| Production asset | SHA-256 |
|---|---|
| `hero-individual-cutout-v2.png` | `f5a755cf7a4457a478470c00452c8e7d965e272531c94d39f8958d8130730701` |
| `hero-organization-cutout-v2.png` | `e2c9fbfd3f705b0027087f5c7de0d31bb03d503769764499b7a6b9ea1763bf4a` |

## Browser and responsive QA

| Viewport | Document overflow | Touch target <44 px | Composition | Result |
|---|---:|---:|---|---|
| `1440 × 900` | 0 | 0 | 72 px header, two-line promise, flanking figures, dual CTA, capability strip | PASS |
| `390 × 844` | 0 | 0 | Compact header, centered copy, full-width CTA, paired figures below copy | PASS |

Visual evidence:

- [`hp-s8a-1440x900-first-viewport.png`](./hp-s8a-1440x900-first-viewport.png)
- [`hp-s8a-390x844-first-viewport.png`](./hp-s8a-390x844-first-viewport.png)

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `43` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime test | PASS — `1/1` |
| Next.js production build | PASS — `166` pages |
| Desktop + mobile browser QA | PASS |
| Protected file fingerprints | PASS |
| Independent finish review | PASS — SHIP; no material first-viewport blocker |

Build hanya menampilkan warning existing mengenai konvensi `middleware` yang deprecated. Tidak ada dependency baru.

## Design audit disposition

Impeccable detector menghasilkan satu advisory pada subtle two-axis hero grid. Advisory diterima secara sadar karena grid merupakan ciri literal dari reference Maven Analytics yang dipin pengguna, dipakai secara restrained, dan tidak menggantikan hierarchy konten.

Fresh independent reviewer memberi lima PASS: thesis, own world, story, first viewport, dan finish. Reviewer menilai header/hero sekarang mempunyai strong Maven resemblance sekaligus tetap berada di dunia Skillary. Mobile sedikit lebih tinggi daripada Maven, tetapi reflow dinilai koheren dan tidak material.

## Known out-of-scope observation

Konsol lokal masih mencatat Auth.js server-configuration error dari shared global provider/environment. Tidak ditemukan error non-auth pada first viewport. HP-S8A tidak mengubah auth karena berada di luar boundary sprint.

## Gate verdict

| HP-S8A acceptance criterion | Verdict |
|---|---|
| Satu navigation row dengan hierarchy Maven-like | PASS |
| Headline sentral dua baris pada desktop | PASS |
| Dua original transparent Skillary figures | PASS |
| Dual audience CTA tanpa klaim palsu | PASS |
| Capability bubbles dan ending strip | PASS |
| Desktop/mobile no-overflow dan 44 px targets | PASS |
| Homepage aktif `/` tidak diubah | PASS |
| Payment tetap HOLD | PASS |
| Independent finish review | PASS — SHIP |
| Stop sebelum HP-S8B | PASS |

**Final verdict: HP-S8A selesai. First viewport sudah Maven-like versi Skillary; full-page parity belum diklaim. Fase berikutnya adalah HP-S8B dan belum dijalankan.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_8a_change_manifest.md`](./skillary_homepage_preview_sprint_8a_change_manifest.md).
