# Skillary Homepage Preview — Sprint HP-S1 Report

**Sprint:** `HP-S1 — Content & Data Contract`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS**
**Stop condition:** **TERPENUHI — HP-S2 belum dijalankan**

## Outcome

HP-S1 selesai sebagai fondasi data server-only untuk homepage preview. Sprint ini belum membuat route atau komponen UI.

Hasil default yang sengaja dikunci:

- approved course: `0`;
- approved learning path: `0`;
- approved faculty: `0`;
- approved upcoming workshop: `0`;
- logo, testimonial, outcome metric, dan case study: seluruh feature gate `off`;
- catalog maturity: `Preview/Prototype`;
- payment: `hold`, online checkout `false`;
- workshop: designed empty state dengan CTA `/contact`, tanpa tanggal, host, harga, atau link `/events`.

Izin founder untuk mengeksekusi sprint tidak diperlakukan sebagai izin publikasi marketing evidence. Registry karena itu tetap kosong sampai ada approval konten yang dapat ditelusuri.

## Yang dibangun

### 1. Kontrak tiga state

Setiap sumber dinamis menghasilkan salah satu state berikut:

| State | Makna |
|---|---|
| `confirmed` | Registry approval dan canonical source sama-sama memenuhi gate |
| `empty` | Sumber sehat atau registry kosong, tetapi belum ada record yang layak tampil |
| `unavailable` | Query gagal atau timeout; homepage tetap memperoleh kontrak lengkap |

Raw error, approval notes, identitas approver, dan approval artifact tidak masuk ke presentational output.

### 2. Canonical source dan gate

| Domain | Canonical source | Gate HP-S1 |
|---|---|---|
| Course individual | Prisma `Course` | Stable ID allowlist, approval current, destination audited, `PUBLISHED`, mempunyai lesson, safe slug |
| Learning path | Prisma `LearningPath` | Stable ID allowlist, approval current, `PUBLISHED`, minimal satu child, seluruh child `PUBLISHED`, safe slug |
| Faculty | Prisma `TrainerProfile` | Stable ID allowlist, `PUBLISHED`, consent, published date, valid photo rights, local portrait, review belum jatuh tempo, safe slug |
| Workshop | Feature-local registry | Approval current, future schedule, valid host dari confirmed faculty, status `scheduled`, destination hanya `/contact` |
| Conditional proof | Feature-local registry | Permission/approval artifact, scoped claim, review date, dan field evidence khusus |

Adapter Prisma hanya memakai `findMany`. Tidak ada query price, enrollment, payment order, email faculty, write operation, raw query, atau transaction.

### 3. Destination dan search contract

Destination yang dikunci:

```text
#program
#workshop
#jalur-belajar
/certifications
/portofolio
/trainers
/resources
/untuk-organisasi
/login
/contact
```

Dynamic course link memakai slug canonical dari row database (`/program/${slug}`), bukan stable database ID. Resolver menolak record yang belum approved, belum `PUBLISHED`, atau mempunyai slug tidak aman.

Preview menolak `/events`, `/checkout`, `/api`, `/v2`, external/protocol-relative URL, dan destination dengan query. Search statis tetap tersedia jika satu atau seluruh sumber dinamis gagal. Isi query ditetapkan `tracking: disabled`.

### 4. Payment dan copy safety

Kontrak payment selalu `hold`, tidak membaca environment payment, dan tidak menghasilkan CTA pembelian. Copy capability memakai wording aman pada matrix plan; tidak ada janji karier, ROI, angka keberhasilan, atau credential outcome yang belum dibuktikan.

## Temuan yang memengaruhi implementasi

- Loader trainer existing tidak dipakai karena dapat menambahkan fallback statis.
- Dataset event existing tidak dipakai karena ditandai mock dan seluruh jadwal Juli 2026 sudah lewat pada tanggal sprint.
- Static content, trainer placeholder, legacy portfolio, dan proof fallback tidak diimpor.
- Detail course saat ini memakai parameter bernama `[id]` tetapi mencari `slug`; resolver HP-S1 mengikuti perilaku canonical tersebut.
- Course belum boleh di-approve sebelum copy destination course diaudit, karena detail existing masih mempunyai wording certificate/payment.
- Learning path campuran published/draft ditolak karena halaman detail existing membuka metadata seluruh child course.
- Program organisasi tetap menjadi destination/konsultasi statis pada HP-S1; tidak ada card statis yang dipromosikan sebagai catalog approved.

## Gate evidence

| Gate | Result |
|---|---|
| Isolated HP-S1 TypeScript compile | PASS |
| Native contract and source-safety tests | PASS — `17/17` |
| Whole-project TypeScript `--noEmit` | PASS |
| Scoped ESLint feature + tests | PASS — 0 error, 0 warning |
| Placeholder/fallback forbidden-import audit | PASS |
| Prisma mutation/raw-query AST audit | PASS |
| Expired/exact-now/invalid/demo/unapproved/cancelled/finished workshop exclusion | PASS |
| One-source failure and all-source failure | PASS |
| Timeout fail-soft | PASS |
| Static search survives dynamic failure | PASS |
| Proof metadata redaction | PASS |
| HP-S0 protected hashes | PASS |
| `/lp/homepage-preview` absence | PASS — route masih belum dibuat |

Production route, robots output, browser QA, responsive screenshots, performance measurement, dan full production build tidak dijalankan pada HP-S1 karena route baru baru dimiliki HP-S2 dan final QA berada pada HP-S8.

## Gate verdict

| HP-S1 acceptance criterion | Verdict |
|---|---|
| Tidak ada import data placeholder | PASS |
| Expired event tidak dapat muncul sebagai upcoming | PASS |
| Loader tetap resolve saat database gagal | PASS |
| Payment tetap hold | PASS |
| Homepage aktif tidak berubah | PASS |
| Stop sebelum route/UI HP-S2 | PASS |

**Final verdict: GO untuk meminta otorisasi HP-S2. Sprint tidak melanjutkan otomatis.**

## Founder checkpoint

Perintah berikut menjalankan sprint berikutnya saja:

```text
EKSEKUSI HOMEPAGE PREVIEW — PLAN docs/skillary_homepage_preview_execution_plan.md v1.2 — SPRINT HP-S2 SAJA — STOP SETELAH GATE HP-S2 — JANGAN UBAH /
```

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_1_change_manifest.md`](./skillary_homepage_preview_sprint_1_change_manifest.md).
