# Skillary Master Project Management Plan

> **DOCUMENT STATUS: HISTORICAL SUPPORTING PLAN**
> The active canonical direction is [SKILLARY_EXECUTION_ANCHOR.md](SKILLARY_EXECUTION_ANCHOR.md). If this document conflicts with the anchor—especially on B2C/B2B priority, subscription tiers, product types, canonical routes, payment activation, public claims, or implementation status—the anchor wins.

**Versi:** 1.0 — historical baseline
**Tanggal:** 31 Juli 2026
**Status:** Superseded as decision authority; retain for operational reference only
**Pemilik dokumen:** Product Owner dan Project Manager
**Cakupan:** Brand, produk, landing page, LMS, konten, B2B, growth, operasi, dan kesiapan monetisasi
**Status pembayaran:** **HOLD** sampai penyedia pembayaran menyetujui akun dan release gate terpenuhi

---

## 1. Fungsi Dokumen

Dokumen ini menjadi sumber kebenaran utama untuk pengambilan keputusan dan eksekusi Skillary. Tujuannya adalah menghentikan perbedaan arah antara dokumen lama, status fitur yang terlalu optimistis, eksperimen UI, serta implementasi mock yang terlihat seperti fitur produksi.

Urutan otoritas keputusan:

1. Aturan proyek di `AGENTS.md`.
2. Dokumen master ini.
3. Product Requirement Document (PRD), Architecture Decision Record (ADR), dan design specification yang masih aktif.
4. Backlog pada project board.
5. Dokumen historis sebagai referensi, bukan sumber status terkini.

Sebuah fitur hanya boleh disebut **selesai** jika memenuhi Definition of Done pada dokumen ini. Keberadaan halaman, komponen, atau data contoh tidak cukup untuk menyatakan fitur siap digunakan.

---

## 2. Keputusan Produk Utama

### 2.1 Positioning

Skillary adalah platform pelatihan dan sertifikasi untuk individu dan organisasi yang mengubah pembelajaran menjadi bukti kemampuan kerja.

**Brand promise:**
**Belajar. Praktik. Buktikan.**

**Nilai B2C:**
Pelajari kemampuan yang relevan, terapkan melalui praktik nyata, lalu tunjukkan hasilnya.

**Nilai B2B:**
Bangun kemampuan tim, pantau kemajuan, dan ukur hasil pelatihan secara lebih nyata.

Skillary tidak perlu meniru Maven secara identik. Pola bisnis dan mekanisme produknya dapat diadaptasi, tetapi identitas visual, copywriting, struktur konten, aset, dan implementasi harus menjadi milik Skillary.

### 2.2 Product Loop

Alur produk target:

```text
Temukan → Ukur → Rencanakan → Pelajari → Praktikkan → Buktikan → Bagikan
```

Versi singkat untuk komunikasi brand:

```text
Belajar → Praktik → Buktikan
```

Setiap fitur baru harus memperkuat minimal satu tahap dan mempunyai hubungan jelas ke tahap berikutnya.

### 2.3 North Star

**Verified Skill Outcomes (VSO):** jumlah learner unik per 30 hari yang menyelesaikan bukti kemampuan valid berupa:

- assessment yang dinilai oleh server;
- mini-project atau capstone yang memenuhi rubrik; atau
- credential yang diterbitkan berdasarkan syarat terverifikasi.

Jumlah pendaftaran dan page view tetap diukur, tetapi bukan ukuran keberhasilan utama.

### 2.4 Monetisasi

Model target:

- **Explorer — gratis:** diagnostic dasar, learning plan, preview materi, resource, praktik terbatas, dan profil.
- **Pro — berlangganan:** katalog digital, assessment terverifikasi, project, credential, portfolio, dan dukungan.
- **Live Class/Cohort:** transaksi terpisah karena memiliki biaya trainer dan operasi; anggota Pro dapat memperoleh benefit tertentu.
- **Teams:** paket tahunan per active seat, admin gratis, assignment, deadline, dan reporting.
- **Enterprise:** skill-gap analysis, pelatihan live, implementasi khusus, dan co-branded credential.

Paket lifetime tidak masuk fase awal karena menimbulkan kewajiban layanan jangka panjang sebelum retensi dan biaya konten terbukti.

---

## 3. Ringkasan Audit Kondisi Sekarang

### 3.1 Aset yang Sudah Bernilai

Skillary bukan proyek kosong. Fondasi yang dapat dipertahankan meliputi:

- Next.js App Router, Prisma/PostgreSQL, dan NextAuth v5;
- autentikasi dan peran pengguna;
- course, module, lesson, resource, enrollment, dan progress;
- learning path;
- certificate dan halaman verifikasi publik;
- organisasi, batch pelatihan, participant, course assignment, dan laporan CSV;
- admin CRUD;
- leads CRM;
- proses trainer verification dan review;
- fondasi event, Zoom, dan reminder;
- rangkaian audit keamanan dan integrity berbasis Node.

### 3.2 Area Parsial atau Belum Siap Produksi

| Area | Status saat ini | Temuan | Keputusan |
|---|---|---|---|
| Landing page | Parsial | Visual dan struktur tersedia, tetapi narasi, CTA, bukti sosial, dan mock product shot belum sepenuhnya dapat dipercaya | Rombak berdasarkan product loop |
| Header/navigation | Parsial | Terlalu banyak menu, beberapa label dan tujuan link tidak selaras | Sederhanakan IA |
| Events/workshops | Mock/parsial | Dataset ilustratif dan tanggal dapat menjadi usang | Hubungkan ke data nyata sebelum klaim |
| Resources | Mock | Form hanya mengubah state; belum ada lead delivery atau file delivery | Bangun flow end-to-end |
| Community/blog | Belum tersedia | Masih “segera hadir” | Jangan dipromosikan sebagai fitur aktif |
| Trainer/faculty | Parsial | Ada sistem review, tetapi halaman marketing masih memiliki profil placeholder | Publish hanya profil terverifikasi |
| Reports | Parsial | Sejumlah tampilan masih memakai baris contoh | Pisahkan demo dan data produksi |
| Password reset | Tidak siap | Masih ada alur beta/mock | Wajib diperbaiki sebelum public launch |
| Assessment | Risiko kritis | Skor quiz masih dapat berasal dari input client | Hitung ulang jawaban di server |
| Credential | Parsial | Fondasi tersedia, tetapi kepercayaan tergantung integritas assessment/project | Gate penerbitan credential |
| Payment | Hold | Implementasi gateway dan simulasi tercampur; approval belum tersedia | Jangan aktifkan transaksi publik |
| Testing | Parsial | Ada audit dan test Node, tetapi belum ada framework UI/end-to-end | Tambah saat disetujui |

Label status:

- **Working:** alur utama berfungsi menggunakan data nyata dan telah diverifikasi.
- **Partial:** sebagian alur berfungsi, tetapi masih ada dependency atau gap.
- **Mock:** tampilan atau data contoh, belum merupakan layanan produksi.
- **Hold:** implementasi sengaja tidak dilanjutkan.
- **Unknown:** belum ada bukti yang cukup; harus diaudit.

### 3.3 Risiko Dokumentasi

Repository memiliki banyak dokumen dengan label “final”, “launch ready”, V1/V2, serta positioning B2C dan B2B yang tidak selalu konsisten. Akibatnya:

- tim dapat mengerjakan arah yang berbeda;
- status visual dianggap sama dengan status produksi;
- keputusan lama dapat mengalahkan kondisi kode terkini;
- fitur mock berisiko dipasarkan sebagai fitur nyata.

Semua dokumen historis tetap disimpan, tetapi setiap dokumen baru harus memiliki **owner, tanggal, status, dan hubungan ke master plan**.

---

## 4. Target Pengguna dan Jobs-to-be-Done

### 4.1 Learner Individual

**Kebutuhan:** memilih skill yang tepat, memahami urutan belajar, berlatih, dan memperoleh bukti yang berguna untuk karier.

**Keberhasilan:** learner menyelesaikan assessment dan menghasilkan project/credential yang dapat dibagikan.

### 4.2 HR/L&D dan Team Manager

**Kebutuhan:** mengetahui gap kemampuan, memberi pelatihan, mengawasi penyelesaian, dan melaporkan hasil.

**Keberhasilan:** admin dapat melihat perubahan kemampuan dan bukti hasil, bukan hanya attendance.

### 4.3 Trainer/Faculty

**Kebutuhan:** membagikan keahlian, mengelola sesi, menilai hasil, dan membangun reputasi.

**Keberhasilan:** profil terverifikasi, sesi berjalan lancar, materi memenuhi standar, dan feedback learner tersedia.

### 4.4 Project Sponsor/Founder

**Kebutuhan:** mengetahui apa yang nyata, apa yang masih mock, kapan produk dapat dijual, dan di mana investasi memberi hasil.

**Keberhasilan:** roadmap terkendali, metrik dapat dipercaya, serta tidak ada klaim marketing yang melampaui produk.

---

## 5. Arsitektur Pengalaman Produk

### 5.1 Discover

Permukaan: landing page, katalog, halaman kategori, kelas & workshop, trainer, resource, dan SEO.

Hasil yang diharapkan: pengunjung memahami untuk siapa Skillary, hasil apa yang diperoleh, dan tindakan berikutnya.

### 5.2 Diagnose & Plan

Permukaan: skill diagnostic, rekomendasi program, dan learning plan.

Hasil yang diharapkan: pengguna memperoleh titik awal dan rute belajar yang relevan.

### 5.3 Learn

Permukaan: course, module, lesson, resource, learning path, progress, dan reminder.

Hasil yang diharapkan: pengguna menyelesaikan materi secara terstruktur.

### 5.4 Practice

Permukaan: quiz elaboratif, code/practice task, mini-project, guided project, dan capstone.

Hasil yang diharapkan: pengguna menerapkan skill dalam konteks nyata.

### 5.5 Prove & Share

Permukaan: server-graded assessment, rubric, credential, public verification, portfolio, dan share link.

Hasil yang diharapkan: Skillary mengeluarkan bukti kemampuan yang dapat dipercaya.

### 5.6 Operate B2B

Permukaan: organization, batch, participant, assignments, deadline, dashboard, report, dan access control.

Hasil yang diharapkan: organisasi dapat menjalankan pelatihan dan melihat dampaknya dengan aman.

### 5.7 Monetize

Permukaan: plan, checkout, invoice/order, webhook, entitlement, refund/reconciliation, dan finance reporting.

Hasil yang diharapkan: transaksi aman dan akses diberikan berdasarkan status pembayaran tervalidasi. Workstream ini tetap hold sampai approval dan gate kesiapan terpenuhi.

---

## 6. Arah Brand dan UI/UX

### 6.1 Identitas

Logo saat ini memiliki konsep “S” yang hangat, bergerak, dan cocok dengan makna perkembangan. Konsep dapat dipertahankan, tetapi perlu:

- master vector/SVG;
- konstruksi mark yang lebih terbaca pada ukuran kecil;
- wordmark resmi;
- versi horizontal, stacked, monochrome, dan favicon;
- aturan clear space, ukuran minimum, serta penggunaan warna;
- penyatuan logo marketing, app icon, auth, certificate, dan dashboard.

Palet utama:

- Primary Orange: `#FF8A00`
- Ink: `#0D101C`
- Warm White: `#FFF9F2`
- Surface: `#FFFDF9`
- Border: `#EADFD3`
- Coral accent terbatas: `#FF5A5F`

Warna semantic seperti success, warning, dan danger harus tetap dibedakan dari warna brand.

### 6.2 Information Architecture

Header target:

```text
Program | Kelas & Workshop | Sertifikasi | Untuk Organisasi | Resource
```

CTA utama:

```text
Jelajahi Kelas
```

Announcement bar hanya ditampilkan jika ada event nyata:

```text
Kelas live dan workshop praktis bersama faculty pilihan. Lihat jadwal.
```

URL `/events` dapat dipertahankan untuk sementara, tetapi label publik menggunakan **Kelas & Workshop**. Filter seperti “Trending” atau “Best Selling” hanya boleh muncul jika aturan ranking dan datanya nyata.

### 6.3 Landing Page Target

Urutan yang direkomendasikan:

1. Hero: outcome dan CTA jelas.
2. Trust proof yang dapat diverifikasi.
3. Product loop “Belajar → Praktik → Buktikan”.
4. Kelas/workshop terdekat dengan data nyata.
5. Program unggulan dan kategori.
6. Project/capstone showcase.
7. Credential dan public verification.
8. Faculty terverifikasi.
9. Jalur individu dan organisasi.
10. FAQ dan final CTA.

Landing page tidak boleh menggunakan statistik, logo klien, testimoni, sertifikat, profil, atau jadwal fiktif tanpa label demo yang jelas.

---

## 7. Workstreams dan Epic

| ID | Workstream | Hasil utama | Owner utama |
|---|---|---|---|
| GOV | Governance | Source of truth, decision log, board, release gate | PM |
| BRD | Brand | Logo system, visual identity, brand guideline | Brand/Design Lead |
| IA | Information Architecture | Sitemap, navigation, taxonomy, route map | Product Designer |
| MKT | Marketing Web | Landing, catalog, workshop, trainer, resource | Growth + Frontend |
| CNT | Content System | Standard course, MIND rubric, editorial QA | Learning Lead |
| LRN | Learning Experience | Player, progress, path, reminders | Product + Engineering |
| ASM | Assessment Integrity | Server scoring, question security, attempts, feedback | Backend + QA |
| PRJ | Practice & Projects | Mini-project, capstone, submission, rubric | Learning + Engineering |
| CRD | Credential & Portfolio | Issuance policy, verification, portfolio, sharing | Product + Backend |
| B2B | Organization Operations | Team, batch, assignment, reporting, isolation | B2B Product + Engineering |
| FAC | Faculty Operations | Verification, onboarding, scheduling, quality | Faculty Ops |
| DAT | Data & Analytics | Events, funnel, VSO, dashboard, audit trail | Data/Product Analyst |
| SEC | Security & Reliability | Auth, access, rate limit, observability, backup | Tech Lead |
| PAY | Payment | Gateway, webhook, entitlement, reconciliation | Backend + Finance |

`PAY` tidak berada pada critical path fase awal.

---

## 8. Struktur Tim

### 8.1 Tim Minimum yang Sehat: 9–11 Orang

| Peran | Jumlah | Tanggung jawab |
|---|---:|---|
| Founder/Product Owner | 1 | Visi, prioritas, keputusan bisnis, budget |
| Project/Product Manager | 1 | Scope, roadmap, backlog, dependency, cadence, risiko |
| Product Designer/UX Researcher | 1 | IA, flow, prototype, usability, design QA |
| Brand/Visual Designer | 0.5–1 | Logo system, art direction, campaign assets |
| Tech Lead/Full-stack Senior | 1 | Arsitektur, standard engineering, review, security |
| Frontend Engineer | 1–2 | Marketing web, dashboard, accessibility, responsive UI |
| Backend Engineer | 1–2 | API, Prisma, assessment, credential, B2B, payment |
| QA Engineer | 1 | Test strategy, regression, release evidence |
| Learning Experience/Content Lead | 1 | Kurikulum, rubric, MIND standard, content QA |
| Growth/Content Marketing | 1 | SEO, acquisition, email, event promotion, analytics |
| Faculty/Customer Operations | 1 | Trainer, workshop, learner support, B2B delivery |

Satu orang dapat memegang dua fungsi pada tim lean, tetapi PM, design, engineering ownership, learning quality, dan QA tidak boleh semuanya dirangkap tanpa kapasitas yang jelas.

### 8.2 Skenario Kapasitas

- **Lean — 6–7 orang:** fokus pada brand, discovery, satu vertical course, assessment integrity, dan proof. Estimasi 28–32 minggu.
- **Standard — 9–11 orang:** beberapa workstream paralel dengan governance sehat. Estimasi 22–24 minggu.
- **Scale — 13–16 orang:** menambah data, content production, QA automation, dan B2B delivery. Estimasi 16–20 minggu dengan risiko koordinasi lebih tinggi.

Estimasi bukan komitmen tanggal sebelum Sprint 0 menyelesaikan baseline teknis dan kapasitas.

---

## 9. RACI Ringkas

Keterangan: **A** accountable, **R** responsible, **C** consulted, **I** informed.

| Keputusan/Output | Founder | PM | Design | Tech Lead | Eng | QA | Learning | Growth/Ops |
|---|---|---|---|---|---|---|---|---|
| Positioning dan model bisnis | A | R | C | I | I | I | C | C |
| Prioritas roadmap | A | R | C | C | I | C | C | C |
| Brand identity | A | C | R | I | I | C | C | C |
| UX dan design system | C | A | R | C | C | C | I | C |
| Arsitektur teknis | I | C | C | A | R | C | I | I |
| Assessment integrity | I | A | C | R | R | R | C | I |
| Standar kurikulum | I | C | C | I | C | C | A/R | C |
| B2B access/reporting | C | A | C | R | R | R | I | C |
| Marketing claim | A | C | C | I | I | C | C | R |
| Release production | I | C | C | A | R | R | C | C |
| Aktivasi payment | A | R | I | C | R | R | I | C |

Tidak ada satu fungsi yang dapat menyetujui sendiri marketing claim, assessment integrity, dan production release.

---

## 10. Roadmap 24 Minggu

### Fase 0 — Control & Baseline, Minggu 1–2

Tujuan: memperoleh satu kondisi proyek yang dapat dipercaya.

Deliverable:

- daftar route, fitur, API, data source, dan owner;
- matriks Working/Partial/Mock/Hold/Unknown;
- arsip/status dokumen historis;
- product board dan naming convention;
- baseline build, lint, typecheck, audit, dan known failures;
- analytics event dictionary;
- keputusan satu vertical course untuk pilot;
- risk register aktif.

Exit gate: founder dan PM menyetujui scope, prioritas, kapasitas, serta definisi launch.

### Fase 1 — Brand, IA & Truthful Marketing, Minggu 3–5

Deliverable:

- brand foundation dan logo system;
- navigation dan sitemap baru;
- content model Kelas & Workshop;
- copywriting landing page;
- design system core;
- removal/labeling semua klaim dan aset mock pada jalur publik;
- responsive prototype dan usability review.

Exit gate: tidak ada CTA buntu, informasi palsu, jadwal usang, atau identitas logo yang saling bertentangan.

### Fase 2 — Discovery Layer, Minggu 6–9

Deliverable:

- landing page produksi;
- katalog program dan detail program;
- Kelas & Workshop dengan sumber data nyata;
- faculty page berbasis profil terverifikasi;
- resource lead capture dan delivery;
- analytics acquisition/activation;
- SEO metadata dan structured content.

Exit gate: pengunjung dapat menemukan program nyata dan masuk ke alur registrasi tanpa mock.

### Fase 3 — Learning Integrity, Minggu 10–14

Deliverable:

- audit learner journey end-to-end;
- server-side quiz scoring;
- question/answer exposure review;
- attempt policy, feedback, dan audit trail;
- password reset production-ready;
- enrollment/entitlement consistency;
- satu pilot course memenuhi struktur pembelajaran yang disepakati;
- regression suite untuk auth, enrollment, learning, dan assessment.

Exit gate: hasil belajar dan pass/fail tidak dapat ditentukan oleh client.

### Fase 4 — Practice, Proof & Portfolio, Minggu 15–20

Deliverable:

- mini-project dan capstone submission;
- rubric dan reviewer workflow;
- credential issuance policy;
- gating certificate dari evidence yang valid;
- learner portfolio dan public project page;
- safe sharing ke LinkedIn/social;
- VSO dashboard.

Exit gate: satu learner dapat menyelesaikan loop Belajar → Praktik → Buktikan dengan evidence nyata.

### Fase 5 — B2B & Monetization Readiness, Minggu 21–24

Deliverable:

- organization isolation review;
- assignment, deadline, status, dan report;
- skill-gap/reporting MVP;
- faculty delivery playbook;
- support, incident, privacy, dan finance SOP;
- payment architecture review tanpa aktivasi;
- go/no-go checklist untuk gateway ketika approval tersedia.

Exit gate: pilot organisasi dapat dijalankan dengan data terisolasi dan laporan yang dapat dipertanggungjawabkan.

---

## 11. Critical Path dan Dependency

```text
Governance baseline
  → Positioning & taxonomy
    → Brand/IA
      → Truthful discovery pages
        → Reliable enrollment
          → Assessment integrity
            → Project/rubric
              → Credential/portfolio
                → B2B outcome reporting
```

Payment baru dapat diaktifkan setelah:

```text
Gateway approval
  + product/catalog nyata
  + order state machine
  + verified webhook
  + idempotency
  + entitlement correctness
  + reconciliation/refund SOP
  + security/QA sign-off
```

Landing page dapat dirilis sebelum seluruh LMS selesai jika setiap klaim dan CTA hanya mengarah ke layanan yang benar-benar tersedia.

---

## 12. Backlog 30/60/90 Hari

### Hari 1–30

Prioritas P0:

- tetapkan source of truth dan status dokumen;
- buat feature truth matrix;
- tandai dan keluarkan data mock dari public claims;
- sederhanakan header;
- finalkan positioning dan landing information architecture;
- audit seluruh CTA;
- perbaiki assessment scoring agar dihitung di server;
- finalkan satu pilot learning journey;
- tetapkan analytics event dictionary;
- kunci payment sebagai hold.

### Hari 31–60

- implementasi landing dan katalog baru;
- implementasi Kelas & Workshop berbasis data nyata;
- resources lead-to-delivery;
- faculty publishing gate;
- password reset production flow;
- assessment feedback dan attempt audit;
- standard konten dan rubric;
- design system adoption untuk jalur prioritas;
- QA regression pada critical user journey.

### Hari 61–90

- mini-project submission;
- reviewer/rubric workflow;
- credential issuance gate;
- portfolio MVP;
- VSO dashboard;
- organization access review;
- assignment dan reporting pilot;
- persiapan user research dan B2B pilot.

---

## 13. Sprint 0: Backlog Siap Dikerjakan

| ID | Task | Prioritas | Owner | Acceptance criteria |
|---|---|---|---|---|
| GOV-01 | Buat feature truth matrix | P0 | PM + Tech Lead | Semua fitur publik memiliki status, evidence, owner, dan next action |
| GOV-02 | Klasifikasikan dokumen | P0 | PM | Setiap dokumen aktif/historis memiliki status |
| GOV-03 | Bentuk project board | P0 | PM | Workflow, WIP limit, label, owner, dan due date tersedia |
| IA-01 | Audit sitemap dan CTA | P0 | Designer | Tidak ada link, label, atau CTA yang ambigu/tidak cocok |
| BRD-01 | Brand foundation brief | P0 | Brand Lead | Positioning, promise, voice, palette, typography disetujui |
| BRD-02 | Logo system brief | P1 | Brand Lead | Semua variant dan konteks penggunaan terdefinisi |
| MKT-01 | Landing content inventory | P0 | Growth | Setiap claim memiliki evidence atau dihapus |
| ASM-01 | Redesign quiz scoring | P0 | Backend | Client tidak dapat menetapkan skor/pass sendiri |
| SEC-01 | Password-reset production audit | P0 | Backend + QA | Token, expiry, delivery, dan abuse protection terverifikasi |
| CNT-01 | Pilih pilot course | P0 | Learning Lead | Audience, outcome, module, assessment, project, dan evidence jelas |
| DAT-01 | Analytics event dictionary | P1 | Product Analyst | Nama event, trigger, properties, owner, dan privacy tercatat |
| PAY-01 | Payment hold guard | P0 | Tech Lead | Tidak ada CTA transaksi publik atau simulasi yang dianggap pembayaran nyata |

---

## 14. Definition of Ready

Sebuah task boleh masuk sprint jika:

- problem dan target user jelas;
- expected outcome dapat diukur;
- acceptance criteria dapat diuji;
- dependency diketahui;
- design/copy tersedia jika diperlukan;
- data source dan state diketahui;
- security/privacy impact ditinjau;
- owner dan reviewer telah ditentukan;
- tidak bertentangan dengan keputusan aktif.

---

## 15. Definition of Done

Sebuah fitur hanya selesai jika:

- acceptance criteria terpenuhi;
- menggunakan data produksi atau diberi label demo secara eksplisit;
- happy path, empty state, loading, error, dan permission state tersedia;
- responsive dan keyboard-accessible untuk jalur utama;
- tidak menampilkan claim tanpa evidence;
- authorization diuji pada server;
- logging dan analytics yang relevan tersedia;
- test proporsional terhadap risiko lulus;
- design QA dan code review selesai;
- dokumentasi operasional diperbarui;
- rollout dan rollback plan tersedia untuk perubahan berisiko;
- Product Owner menerima outcome, bukan hanya screenshot.

Untuk assessment, credential, payment, auth, dan B2B isolation, persetujuan QA dan Tech Lead wajib.

---

## 16. Release Gates

### Gate A — Marketing Public

- semua CTA bekerja;
- tidak ada data/event/testimoni/statistik fiktif;
- privacy, terms, dan contact jelas;
- performance dan accessibility minimum terpenuhi;
- analytics consent dan event dasar tersedia.

### Gate B — Learning

- enrollment dan entitlement benar;
- progress konsisten;
- assessment dihitung server;
- content QA selesai;
- credential tidak dapat diterbitkan tanpa syarat.

### Gate C — B2B

- tenant/organization isolation teruji;
- role dan access matrix benar;
- report bersumber dari data nyata;
- audit trail tersedia;
- export tidak membocorkan data organisasi lain.

### Gate D — Payment

- provider approval;
- sandbox end-to-end;
- signature/webhook verification;
- idempotency dan replay protection;
- source of truth order state;
- entitlement dari status tervalidasi;
- reconciliation, refund, dispute, dan incident SOP;
- production secrets terkelola;
- finance dan QA sign-off.

---

## 17. Metrik dan Dashboard

### Acquisition

- qualified visitor;
- catalog/workshop view;
- lead conversion;
- registration conversion;
- source/channel quality.

### Activation

- profile completion;
- diagnostic completion;
- learning plan created;
- first lesson completed dalam 72 jam.

### Learning

- weekly active learner;
- module completion;
- course completion;
- time-to-first-progress;
- reminder-to-return rate.

### Practice & Proof

- assessment attempt/pass;
- project started/submitted/approved;
- capstone completion;
- credential issued;
- portfolio published;
- VSO per 30 hari.

### Retention

- week-1 dan week-4 learner retention;
- repeat project/course;
- live session attendance;
- referral/share.

### B2B

- invited-to-activated member;
- assigned-to-completed;
- evidence completion per batch;
- admin weekly active;
- renewal intent;
- time-to-report.

Vanity metrics tidak boleh menggantikan outcome metrics.

---

## 18. Risk Register

| Risiko | Probabilitas | Dampak | Mitigasi | Owner |
|---|---|---|---|---|
| Scope terus melebar | Tinggi | Tinggi | WIP limit, change control, satu pilot vertical | PM |
| Dokumen/status bertentangan | Tinggi | Tinggi | Satu source of truth dan evidence link | PM |
| Mock dianggap produksi | Tinggi | Tinggi | Truth matrix dan public claim audit | Product + QA |
| Assessment dapat dimanipulasi | Tinggi | Kritis | Server scoring, audit trail, security test | Tech Lead |
| Logo/design terfragmentasi | Tinggi | Sedang | Brand system dan component governance | Design Lead |
| Konten belum cukup untuk subscription | Tinggi | Tinggi | Validasi pilot, content pipeline, jangan buru-buru Pro | Learning Lead |
| Gateway belum disetujui | Tinggi | Sedang | Payment hold dan lead/waitlist flow | Founder + PM |
| Kebocoran data antar organisasi | Sedang | Kritis | Server auth, tenant tests, export review | Tech Lead + QA |
| Kapasitas faculty/content rendah | Sedang | Tinggi | Production calendar, templates, reviewer pool | Learning/Ops |
| Klaim marketing melampaui bukti | Tinggi | Tinggi | Claim register dan approval workflow | Growth + Founder |
| Release dari worktree tidak stabil | Sedang | Tinggi | Baseline build, release branch discipline, evidence gate | Tech Lead |
| Tidak ada UI end-to-end automation | Tinggi | Sedang | Prioritaskan jalur kritis dan minta persetujuan dependency | QA |

Risk register ditinjau setiap minggu. Risiko kritis tidak boleh ditutup tanpa evidence.

---

## 19. Operating Cadence

### Harian

- async update: selesai, berikutnya, blocker, risiko;
- engineering/design sync maksimal 15 menit bila dibutuhkan.

### Mingguan

- Senin: planning dan commitment;
- Rabu: risk/dependency review;
- Jumat: demo berbasis working software dan metric review;
- backlog refinement satu kali per minggu;
- content/faculty production review terpisah.

### Dua Mingguan

- sprint review;
- retrospective;
- roadmap confidence update;
- decision log review.

### Bulanan

- founder steering meeting;
- budget/capacity;
- product outcomes dan VSO;
- security/privacy review;
- go/no-go scope berikutnya.

---

## 20. Project Board dan Workflow

Status board:

```text
Inbox → Discovery → Ready → In Progress → Review → QA → Release Ready → Done
```

Aturan:

- setiap card mempunyai owner tunggal;
- maksimal dua card aktif per engineer/designer;
- P0 hanya untuk keamanan, integritas, outage, dan blocker release;
- card tanpa acceptance criteria tidak masuk `Ready`;
- `Done` memerlukan evidence link;
- bug produksi terkait auth, payment, credential, assessment, atau data B2B otomatis masuk risk review.

Label minimum:

- workstream;
- B2C/B2B/shared;
- feature/bug/debt/research/content;
- P0/P1/P2/P3;
- mock-removal;
- security/privacy;
- release target.

---

## 21. Change Control dan Decision Log

Perubahan yang memerlukan persetujuan Founder + PM:

- positioning;
- target persona utama;
- model harga;
- penambahan workstream;
- perubahan milestone lebih dari satu sprint;
- claim publik yang signifikan;
- aktivasi payment;
- komitmen B2B khusus.

Perubahan arsitektur, data model, auth, assessment, atau credential memerlukan ADR dan persetujuan Tech Lead.

Format decision log:

```text
ID | Tanggal | Keputusan | Alasan | Alternatif | Dampak | Owner | Status
```

---

## 22. Content Governance

Setiap course prioritas mengikuti struktur pembelajaran Skillary:

1. comprehensive overview;
2. technical examples/code snippets bila relevan;
3. quiz lima pertanyaan dengan feedback elaboratif;
4. mini-project;
5. capstone assessment;
6. refleksi dan penerapan konteks kerja;
7. evidence/portfolio/credential outcome.

Content pipeline:

```text
Brief → Outline → SME Draft → Learning Review → Production → QA → Publish → Outcome Review
```

Course tidak dinilai dari jumlah video, tetapi dari kemampuan learner menghasilkan evidence yang valid.

---

## 23. Launch Definition

### Soft Launch B2C

Minimal:

- landing dan catalog jujur;
- satu vertical dengan learning journey lengkap;
- assessment aman;
- satu project/capstone;
- credential terverifikasi;
- support channel;
- analytics funnel dan VSO;
- payment tidak wajib jika masih hold; gunakan waitlist/manual pilot yang jelas.

### B2B Pilot

Minimal:

- organisasi dan batch;
- participant onboarding;
- assignment dan deadline;
- access isolation;
- progress/evidence report;
- admin contact dan support SOP;
- satu client pilot dengan scope tertulis.

### Public Paid Launch

Minimal:

- Soft Launch gate lulus;
- Payment Gate D lulus;
- refund/terms/support;
- finance reconciliation;
- monitoring dan incident response;
- tidak ada blocker kritis terbuka.

---

## 24. Tiga Keputusan Founder yang Dibutuhkan

1. Menyetujui positioning utama: **platform pelatihan dan sertifikasi berbasis bukti kemampuan**, melayani B2C dan B2B dengan product loop yang sama.
2. Memilih satu vertical pilot yang memiliki demand, faculty, materi, project, dan peluang B2B paling kuat.
3. Menyetujui skenario kapasitas tim: Lean, Standard, atau Scale.

Selama tiga keputusan ini belum final, tim tetap dapat menjalankan Fase 0 tanpa mengaktifkan payment atau memperluas scope.

---

## 25. Immediate Next Actions

Urutan kerja berikutnya:

1. Founder menyetujui atau merevisi tiga keputusan utama.
2. PM membuat feature truth matrix dan project board.
3. Tech Lead menghasilkan baseline engineering dan memprioritaskan assessment integrity.
4. Designer menyelesaikan IA, landing wireframe, dan brand foundation.
5. Learning Lead memilih pilot course serta mendefinisikan evidence outcome.
6. Growth mengaudit seluruh public claim, CTA, event, dan resource.
7. QA menetapkan release evidence dan regression checklist.
8. Review Fase 0 pada akhir minggu kedua untuk menetapkan estimasi final.

Dokumen ini diperbarui ketika keputusan, scope, kapasitas, atau risiko material berubah. Riwayat perubahan harus disimpan agar tim dapat menelusuri alasan setiap keputusan.
