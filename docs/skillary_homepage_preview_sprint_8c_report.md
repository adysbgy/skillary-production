# Skillary Homepage Preview — Sprint HP-S8C Report

**Sprint:** `HP-S8C — Guided Goals & Catalog Discovery Parity`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS — SHIP**
**Stop condition:** **TERPENUHI — HP-S8D belum dijalankan**

## Outcome

HP-S8C mengubah area discovery `/lp/homepage-preview` dari katalog biasa menjadi alur pemilihan yang dimulai dari tujuan kerja. Pengunjung sekarang melihat empat tujuan yang masing-masing mengarah langsung ke satu halaman program Skillary yang sudah lolos source gate.

Area ini tetap jujur terhadap data yang tersedia. Empat program memakai jumlah modul dan hasil belajar dari source contract, sedangkan Events & Workshop serta Jalur Belajar tetap menampilkan status persiapan beserta kriteria publikasinya. Tidak ada ranking, best seller, learning path resmi, tanggal workshop, host, faculty, social proof, atau checkout yang direkayasa.

## Guided discovery translation

| Tujuan kerja | Program terverifikasi | Route langsung |
|---|---|---|
| Membangun dashboard untuk keputusan bisnis | Power BI Business Dashboard | `/programs/power-bi-business-dashboard` |
| Mengambil keputusan dengan dasar data | Data-Driven Decision Making | `/programs/data-driven-decision-making` |
| Menerapkan AI pada alur kerja tim | AI Productivity for Teams | `/programs/ai-productivity-for-teams` |
| Menyampaikan laporan agar mudah dipahami | Business Presentation & Reporting | `/programs/business-presentation-reporting` |

Panduan ini secara eksplisit menyatakan bahwa susunannya bukan ranking dan bukan learning path resmi. Fungsinya adalah membantu memilih dari katalog yang benar-benar dapat diperiksa sekarang.

## Catalog behavior

- Status katalog menampilkan tepat `4` pilihan yang lolos source gate.
- Setiap program menampilkan jumlah modul dan jumlah hasil belajar yang berasal dari registry program.
- Tab `Program`, `Events & Workshop`, dan `Jalur Belajar` menyinkronkan state dengan hash URL.
- Empty state workshop menjelaskan data yang harus diverifikasi sebelum publikasi: jadwal dan zona waktu, format/level/outcome sesi, serta host terverifikasi.
- Empty state jalur belajar menjelaskan readiness criteria: tujuan dan urutan yang jelas, semua program dapat dibuka, dan halaman detail sudah ditinjau.
- Semua CTA menggunakan route Skillary yang sudah ada; tidak ada payment atau checkout.

## Responsive and interaction QA

| Audit | Result |
|---|---|
| Desktop `1440 × 900` guided goals | PASS — document overflow `0` |
| Desktop `1440 × 900` catalog | PASS — document overflow `0` |
| Mobile `390 × 844` guided goals | PASS — document overflow `0` |
| Mobile goal-card stack | PASS |
| Workshop tab + `#workshop` | PASS |
| Jalur Belajar tab + `#jalur-belajar` | PASS |
| Program tab + `#program` | PASS |
| Four module counts + four outcome counts | PASS |

## Visual evidence

- [`hp-s8c-1440x900-guided-goals.png`](./hp-s8c-1440x900-guided-goals.png)
- [`hp-s8c-1440x900-catalog.png`](./hp-s8c-1440x900-catalog.png)
- [`hp-s8c-390x844-guided-goals.png`](./hp-s8c-390x844-guided-goals.png)
- [`hp-s8c-390x844-goal-cards.png`](./hp-s8c-390x844-goal-cards.png)

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `44` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS |
| Desktop/mobile browser QA | PASS |
| Protected file fingerprints | PASS |
| Impeccable detector | PASS with one accepted advisory from the pre-existing HP-S8A hero grid background |

Build hanya menampilkan warning existing mengenai konvensi `middleware` yang deprecated. Tidak ada dependency baru.

## Known out-of-scope observation

Shared Auth.js provider/environment masih mencatat configuration error pada produksi lokal. HP-S8C tidak mengubah auth, environment, database, session route, checkout, atau payment. Preview dan seluruh runtime gate HP-S8C tetap berjalan.

## Gate verdict

| HP-S8C acceptance criterion | Verdict |
|---|---|
| Discovery dimulai dari tujuan kerja | PASS |
| Empat tujuan terhubung ke empat program terverifikasi | PASS |
| Counts berasal dari source contract | PASS |
| Workshop dan learning path tetap verification-gated | PASS |
| Tidak ada ranking, social proof, faculty, atau event palsu | PASS |
| Desktop/mobile tanpa document overflow | PASS |
| Homepage aktif `/` tidak diubah | PASS |
| Payment tetap HOLD | PASS |
| Stop sebelum HP-S8D | PASS |

**Final verdict: HP-S8C selesai. Discovery dan katalog kini mempunyai guidance, visual hierarchy, source status, dan direct routes yang setara secara fungsi dengan reference grammar, tetapi tetap merupakan produk Skillary yang original dan dapat dipertanggungjawabkan.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_8c_change_manifest.md`](./skillary_homepage_preview_sprint_8c_change_manifest.md).
