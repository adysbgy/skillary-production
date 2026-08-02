# Skillary Website Development Execution Plan

**Versi:** 1.0
**Tanggal baseline:** 31 Juli 2026
**Owner eksekusi:** Senior Product & Engineering Staff
**Acuan strategis:** `docs/skillary_master_project_management.md`
**Status payment:** HOLD / fail-closed

## 1. Sasaran

Mengubah Skillary dari kumpulan halaman dan fondasi LMS yang sebagian masih mock menjadi website yang:

- menjelaskan produk secara jujur;
- mengarahkan pengunjung ke program nyata;
- memiliki learner journey yang aman;
- menghasilkan bukti kemampuan yang valid;
- dapat dipakai untuk pilot B2C dan B2B;
- tidak memproses pembayaran sampai gate aktivasi disetujui.

Urutan delivery:

```text
Stabilkan → Nyatakan kondisi sebenarnya → Bangun discovery → Aktifkan learning → Tambahkan practice/proof → Siapkan B2B → Siapkan monetisasi
```

## 2. Baseline yang Sudah Selesai

### DEV-P0-01 — Assessment integrity

Status: **DONE**

- Client tidak lagi mengirim atau menentukan skor.
- Server memvalidasi setiap jawaban dan menghitung skor.
- Answer key dihapus dari initial browser payload.
- Feedback jawaban baru diberikan setelah submit jika diizinkan konfigurasi.
- API failure tidak lagi membuat hasil lokal palsu.
- Previous attempt dapat dipulihkan dari data milik learner.
- Unit test mencakup single choice, multiple selection, short answer, missing answer, pilihan di luar batas, dan client-score tampering.

### DEV-P0-02 — Payment hold

Status: **DONE**

- Payment bersifat fail-closed secara default.
- Course, certificate, dan paid-event order tidak dapat dibuat saat hold.
- Checkout simulator dihapus.
- Existing verified callback tetap dipertahankan untuk rekonsiliasi transaksi lama.
- Checkout menjelaskan bahwa tidak ada transaksi diproses.
- Environment membutuhkan aktivasi eksplisit, bukan hanya keberadaan kode gateway.

### DEV-P0-03 — Route-group quality baseline

Status: **DONE**

- Audit auth dan index policy dapat menemukan route lama atau route-group secara deterministik.
- Route wrapper organisasi tidak lagi mengimpor route module lain.
- `quality:gate:core` lulus setelah migrasi route-group.
- TypeScript `--noEmit` lulus.
- Integrity test lulus 10/10.

### DEV-P0-04 — Production build reliability

Status: **DONE**

- Database-backed `/path` dibuat dynamic agar build tidak bergantung pada koneksi database produksi.
- Konfigurasi upload Pages Router yang sudah diabaikan dihapus.
- Proxy upload buffer diselaraskan dengan batas resource 20 MB.
- Production build berhasil menghasilkan seluruh route.
- Warning tersisa: migrasi convention `middleware` ke `proxy`, dijadwalkan sebagai `PLT-001`.

## 3. Feature Truth Baseline

| Surface | Kondisi | Risiko | Target |
|---|---|---|---|
| Root landing | Partial | Narasi dan bukti belum sepenuhnya mengikuti kondisi produk | Landing berbasis Belajar → Praktik → Buktikan |
| Header | Partial | Menu terlalu padat dan beberapa label tidak tepat | Lima kelompok navigasi dengan CTA jelas |
| Program catalog | Partial | Data tersedia, tetapi taxonomy dan claim belum konsisten | Catalog nyata, filter faktual, empty state |
| Kelas & Workshop | Mock/partial | Event masih berasal dari illustrative dataset | Sumber data nyata, tanggal, capacity, status |
| Resources | Mock | Submit hanya mengubah state | Lead capture, consent, delivery, analytics |
| Faculty | Partial | Beberapa profil masih draft/unverified | Publish gate dan provenance |
| Auth | Partial | Route migration selesai, production reset perlu dibuktikan | Login/register/reset end-to-end |
| LMS | Working/partial | Fondasi course dan progress ada | Critical journey teruji dan konsisten |
| Assessment | Working setelah P0 | Belum memiliki versioning question bank | Server-grade, versioned assessment |
| Project/capstone | Belum lengkap | Belum ada proof workflow end-to-end | Submission, rubric, review, evidence |
| Credential | Partial | Trust bergantung pada assessment/project | Issuance gate dan policy |
| Portfolio | Partial | Belum menjadi learner-growth loop | Publishable evidence dan sharing |
| B2B | Partial | Admin tersedia, outcome loop belum lengkap | Baseline → intervention → post-report |
| Payment | Hold | Provider belum disetujui | Tetap off sampai Gate D |

## 4. Delivery Roadmap

Satu sprint adalah dua minggu. Sprint dapat bergerak paralel hanya jika dependency dan kapasitas tersedia.

### Sprint 0 — Integrity and Baseline

Status: **COMPLETED**

Deliverable:

- assessment server grading;
- public answer-key sanitization;
- payment fail-closed;
- removal checkout simulator;
- route-group audit compatibility;
- passing core quality gate.

### Sprint 1 — Product Truth and Marketing Architecture

Status: **NEXT**

Deliverable:

- inventory seluruh public route dan CTA;
- final navigation contract;
- header target: Program, Kelas & Workshop, Sertifikasi, Untuk Organisasi, Resource;
- mapping route lama, canonical, dan redirect;
- landing content inventory;
- removal atau label untuk mock claim;
- content source contract untuk event, faculty, program, dan proof;
- copy deck untuk landing dan primary pages.

Acceptance criteria:

- tidak ada CTA buntu;
- tidak ada label menu yang menuju jenis konten berbeda;
- semua claim mempunyai source/evidence;
- halaman mock tidak terindeks sebagai produk aktif.

### Sprint 2 — Landing Page Production

Deliverable:

- hero dengan positioning dan CTA;
- real trust proof;
- section Belajar → Praktik → Buktikan;
- featured programs;
- upcoming Kelas & Workshop dari data nyata;
- project/credential proof;
- verified faculty;
- B2C/B2B paths;
- FAQ dan final CTA;
- mobile, tablet, desktop implementation;
- accessibility dan performance pass.

Acceptance criteria:

- primary value dapat dipahami dalam viewport pertama;
- tidak ada statistik, profil, logo, atau jadwal fiktif;
- CTA utama mencapai program nyata;
- keyboard, focus, semantic headings, dan reduced motion teruji.

### Sprint 3 — Catalog, Workshops, Faculty, and Resources

Deliverable:

- program catalog dan taxonomy;
- Kelas & Workshop listing/detail;
- factual filter: format, level, topik, status;
- registration states untuk free event;
- paid event tetap hold;
- faculty listing dengan verification state;
- resource lead capture;
- consent, delivery, success/error state;
- acquisition analytics.

Acceptance criteria:

- event yang sudah lewat tidak tampil sebagai upcoming;
- waitlist/full/cancelled/completed mempunyai state berbeda;
- resource benar-benar dikirim atau diunduh;
- faculty public hanya berasal dari record terverifikasi.

### Sprint 4 — Learner Activation and LMS Reliability

Deliverable:

- login/register/reset flow;
- onboarding dan first-course activation;
- enrollment dan entitlement reconciliation;
- learner dashboard priorities;
- course player states;
- progress consistency;
- assessment versioning;
- attempt policy dan error recovery;
- critical regression tests.

Acceptance criteria:

- learner baru mencapai lesson pertama tanpa bantuan manual;
- direct URL tidak melewati entitlement;
- perubahan question bank tidak mengubah makna attempt lama;
- required assessment benar-benar memblokir progress dan credential.

### Sprint 5 — Practice, Proof, and Portfolio

Deliverable:

- Skill Drill;
- Guided Project;
- capstone submission;
- rubric dan reviewer workflow;
- resubmission policy;
- credential issuance gate;
- public verification;
- learner portfolio;
- shareable project evidence;
- VSO instrumentation.

Acceptance criteria:

- satu learner menyelesaikan loop penuh;
- evidence mempunyai owner, source, timestamp, dan review state;
- credential tidak diterbitkan hanya karena lesson completion;
- project private tidak bocor ke public portfolio.

### Sprint 6 — B2B Pilot

Deliverable:

- organization onboarding;
- competency matrix;
- pre-assessment;
- skill-gap view;
- assignments dan deadline;
- manager progress;
- post-assessment;
- pilot outcome report;
- export isolation tests;
- customer-success runbook.

Acceptance criteria:

- organisasi hanya melihat datanya sendiri;
- report dapat ditelusuri ke learner evidence;
- pre/post comparison memakai assessment version yang sebanding;
- satu pilot dapat dijalankan tanpa perubahan manual database.

### Sprint 7 — Production Hardening

Deliverable:

- full regression;
- visual QA desktop/mobile;
- accessibility audit;
- performance budget;
- backup/restore evidence;
- incident and support runbook;
- analytics dashboard;
- launch checklist;
- payment readiness review tanpa aktivasi.

Acceptance criteria:

- seluruh release gate yang relevan lulus;
- tidak ada P0/P1 terbuka;
- rollback tersedia;
- monitoring dan support owner jelas.

## 5. Immediate Backlog Setelah Baseline

Urutan pekerjaan berikutnya:

| ID | Task | Priority | Dependency |
|---|---|---:|---|
| WEB-001 | Audit public route, CTA, canonical, dan redirect | P0 | Sprint 0 |
| WEB-002 | Tetapkan navigation contract tunggal | P0 | WEB-001 |
| WEB-003 | Inventory landing claim dan source | P0 | WEB-001 |
| WEB-004 | Pisahkan mock event dari public event source | P0 | WEB-003 |
| WEB-005 | Tetapkan faculty public publishing gate | P0 | WEB-003 |
| WEB-006 | Susun landing copy deck | P1 | WEB-002, WEB-003 |
| WEB-007 | Implement header dan mobile navigation | P1 | WEB-002 |
| WEB-008 | Implement landing composition | P1 | WEB-004–006 |
| WEB-009 | Implement Kelas & Workshop state model | P1 | WEB-004 |
| WEB-010 | Implement resource lead-to-delivery | P1 | WEB-003 |
| PLT-001 | Migrate deprecated middleware convention to proxy with auth regression coverage | P1 | WEB-001 |
| QA-001 | Desktop/mobile visual inspection | P1 | WEB-007–010 |
| QA-002 | Accessibility and performance pass | P1 | QA-001 |

## 6. Development Rules

- Prisma digunakan untuk seluruh database interaction.
- Session di Server Components dan Route Handlers menggunakan `auth()`.
- Payment tidak diaktifkan sebagai efek samping perubahan lain.
- Mock data tidak boleh tampil sebagai fakta produksi.
- Setiap perubahan high-risk mempunyai test dan rollback path.
- Worktree pengguna tidak ditimpa; overlap diperiksa sebelum edit.
- Status `DONE` membutuhkan test/evidence, bukan screenshot.
- UI marketing menggunakan palette Skillary dan semantic state yang terpisah.

## 7. Verification Matrix

| Change class | Minimum verification |
|---|---|
| Copy/navigation | Link audit, responsive, keyboard, canonical |
| Marketing data | Source, freshness, empty/error state |
| Auth/authorization | Server guard, negative test, redirect safety |
| Assessment | Unit test, tamper test, attempt and feedback test |
| Credential | Eligibility matrix dan public verification |
| B2B | Cross-organization negative test |
| Payment | Explicit flag, signature, idempotency, reconciliation |
| Release | Typecheck, core quality gate, scoped lint, visual QA |

## 8. Definition of Current Success

Baseline development dianggap berhasil karena:

- assessment tidak lagi mempercayai nilai dari browser;
- answer key tidak dikirim sebelum submit;
- payment tidak dapat aktif hanya karena key tersimpan;
- simulator tidak dapat memberi status paid;
- route migration tidak mematahkan security audit;
- core quality gate lulus;
- production build lulus.

Fokus aktif berikutnya adalah **Sprint 1: Product Truth and Marketing Architecture**.
