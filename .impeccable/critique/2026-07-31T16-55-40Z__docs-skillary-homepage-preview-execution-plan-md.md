---
target: audit planning homepage preview Skillary dan analisis Maven
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 4
timestamp: 2026-07-31T16-55-40Z
slug: docs-skillary-homepage-preview-execution-plan-md
---
Method: dual-agent (A: /root/homepage_plan_review_a · B: /root/homepage_plan_evidence_b)

# Design Health Score — draf v1.0 sebelum remediasi

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2 | State data direncanakan, tetapi feedback search dan recovery belum terkunci. |
| 2 | Match System / Real World | 3 | Jobs audiens jelas; terminologi Indonesia/Inggris masih bercampur. |
| 3 | User Control and Freedom | 2 | Drawer memiliki exit; clear/back/recovery komponen lain belum spesifik. |
| 4 | Consistency and Standards | 2 | Terminologi Program/Kelas/Path dan Faculty/Trainer belum konsisten. |
| 5 | Error Prevention | 3 | Guardrail proof/payment kuat; route dan source-data masih membuka error. |
| 6 | Recognition Rather Than Recall | 2 | Goals/tabs membantu, tetapi header dan taxonomy terlalu padat. |
| 7 | Flexibility and Efficiency | n/a | Persuade surface. |
| 8 | Aesthetic and Minimalist Design | 2 | Tujuh belas slot dan dua baris menu berisiko menjadi panjang dan ramai. |
| 9 | Error Recovery | 2 | Fail-soft ada, tetapi recovery copy dan input preservation belum ditentukan. |
| 10 | Help and Documentation | n/a | Persuade surface. |
| **Total** |  | **18/32** | **Acceptable; specification gaps harus ditutup sebelum eksekusi.** |

## Design Specificity Verdict

Product semantics sudah khas Skillary melalui dua audiens, `Belajar → Praktik → Buktikan`, evidence gates, dan palette hangat. Visual authorship draf v1.0 belum cukup khas karena masih mengikuti anatomi Maven hampir satu per satu. Orange, rounded cards, dan dua figur Indonesia belum cukup membentuk identitas yang hanya bisa menjadi milik Skillary.

Deterministic scan dijalankan pada target Markdown dan menghasilkan exit 0, output `[]`, 0 rule, dan 0 location. Hasil bersih ini bernilai terbatas karena target belum berupa rendered UI. Tidak ada false positive. Browser overlay tidak relevan karena target adalah planning document.

## Overall Impression

Fondasi truthfulness, preview isolation, dan QA sangat kuat. Peluang terbesar adalah mengubah plan dari daftar section Maven-like menjadi execution contract Skillary yang lebih pendek, lebih aman terhadap evidence kosong, dan lebih khas secara visual.

## What's Working

- Truth architecture mencegah expired event, payment CTA, mock person, statistik, testimonial, dan logo tanpa izin tampil sebagai fakta.
- Preview terisolasi, server-first, noindex, rollback, reduced-motion, 200% zoom, dan performance target sudah menjadi fondasi yang sehat.
- Dua jalur individu/organisasi konsisten dari hero hingga closing CTA.

## Priority Issues

### [P0] Destination Events tidak aman

`/events` memakai dataset mock dengan tanggal yang sudah lewat dan dapat mengarahkan paid item ke checkout. Header/hero preview tidak boleh menuju route tersebut sebelum dibersihkan secara terpisah.

**Remediasi v1.1:** semua destination workshop memakai `#workshop`; empty-state CTA menuju `/contact`; tidak ada preview link ke `/events`.

### [P1] Janji capability melampaui release truth

Assessment, credential, reporting, dan kata `Buktikan` membutuhkan gate capability, bukan hanya gate social proof.

**Remediasi v1.1:** capability-truth matrix mengatur wording sebelum/sesudah assessment, credential, portfolio, progress, dan report gate lulus.

### [P1] Header, taxonomy, dan route semantics belum terkunci

Draf menampilkan terlalu banyak keputusan, mencampur istilah, dan menghubungkan `Program` ke surface B2B ketika audiens individu membutuhkan course catalog berbeda.

**Remediasi v1.1:** empat kelompok discovery, grouped mobile drawer, istilah publik terkunci, dan destination preview memakai anchor/safe routes.

### [P1] Proof ladder terlalu panjang untuk evidence Skillary saat ini

Jika logo, testimonial, faculty, metrics, dan case study disembunyikan, 17 slot meninggalkan perjalanan panjang tanpa peak kepercayaan yang nyata.

**Remediasi v1.1:** 11 section core dengan product-proof nyata dan empat conditional inserts yang hilang sepenuhnya bila evidence gagal.

### [P1] Engineering dan rollback belum executable

Provenance tidak dapat ditegakkan hanya dengan `PUBLISHED`; warna orange/white gagal kontras; error boundary, cache runtime, exact QA commands, noindex output, dan rollback ownership belum lengkap.

**Remediasi v1.1:** explicit allowlist, contrast pairs, Next.js runtime contract, command matrix, provenance scan, file ownership manifest, dan bounded rollback.

### [P2] Interaction contract belum cukup spesifik

Tabs, search, rails, drawer, anchors, dan error states perlu keyboard/state/fallback contract.

**Remediasi v1.1:** interaction table mengunci Arrow/Home/End, clear/Escape/live region, rail controls, inert drawer, focus return, dan no-JS fallback.

## Persona Red Flags

- **Jordan, first-timer:** draf v1.0 memakai terlalu banyak istilah dan destination sehingga sulit membedakan Program, Workshop, Jalur Belajar, Project, Assessment, dan Sertifikasi.
- **Riley, stress tester:** akan menemukan expired event, unresolved route, source unavailable, dan provenance yang tidak dapat dibuktikan hanya dengan status published.
- **Casey, mobile:** drawer terlalu panjang, Events tersembunyi, hero dua figur berisiko berat, dan card rail belum mempunyai cue/control.
- **Nadia, HR/L&D:** CTA konsultasi belum didahului engagement steps, deliverable, definisi report, dan reassurance yang cukup.

## Minor Observations

- Audience reassurance tidak boleh disebut trust proof.
- `Laporkan` adalah jalur organisasi, bukan langkah universal semua learner.
- Typography harus dipilih, bukan “jika tersedia”.
- Sector labels juga memerlukan provenance karena dapat menyiratkan pengalaman klien.
- Core Web Vitals lab harus membedakan TBT proxy dan INP field target.

## Questions to Consider

- Jika seluruh social proof belum lolos izin, bukti apa yang paling kuat dan benar-benar dapat ditunjukkan Skillary hari ini?
- Apakah setiap section membantu pengunjung mengambil keputusan, atau hanya membantu halaman terlihat selengkap Maven?
- Dapatkah identitas `Jejak Bukti` dikenali sebagai Skillary bahkan tanpa warna orange?
