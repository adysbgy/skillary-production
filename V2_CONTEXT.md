# Skillary V2 — Context Document untuk Claude Code

> Dokumen ini ditulis untuk onboarding Claude Code agar langsung paham proyek tanpa perlu re-analisis dari nol.
> Dibuat: 2026-06-24

---

## 1. Proyek: Apa itu Skillary?

Skillary adalah **platform LMS (Learning Management System) B2B/B2C** untuk pelatihan dan sertifikasi korporat. Target utama: HR Manager, L&D Team, Training Manager, institusi pendidikan.

- **Domain aktif:** `skillary.my.id` (primary sejak Juni 2026) + `datacamp.id` (masih aktif, legacy)
- **PT:** PT Skillary Generasi Cerdas
- **Kontak:** `hello@skillary.id` / `teams@skillary.id`
- **Instagram:** `@skillary.id`
- **Asal usul:** Skillary adalah evolusi digital dari "Allman" — brand pelatihan korporat sejak 1998. Jangan sebut "Allman" dalam UI/konten publik.

---

## 2. Tech Stack (Baca AGENTS.md juga)

| Layer | Tool |
|---|---|
| Framework | **Next.js 16** App Router — ada breaking changes dari v13/14, baca `node_modules/next/dist/docs/` |
| Styling | **Tailwind CSS v4** — beda dari v3, cek docs |
| Database | **PostgreSQL** via **Prisma ORM** (Supabase, ada `directUrl`) |
| Auth | **NextAuth v5 beta** (`next-auth@beta`) — gunakan `auth()` bukan `getServerSession` |
| Email | **Resend** |
| Validation | **Zod v4** |
| **TIDAK ADA** | Testing framework (Jest/Playwright) — jangan buat test file dulu tanpa izin |
| **TIDAK ADA** | `react-markdown` — ada custom `MarkdownRenderer` di `src/components/ui/` |

### Wajib dibaca sebelum coding:
- `AGENTS.md` — rules proyek, anti-contamination, seeding conventions
- `CLAUDE.md` — project instructions
- `prisma/schema.prisma` — data model lengkap

---

## 3. Brand & Design System

```
Primary orange:  rgb(255, 138, 0)   → --color-skillary-orange
Coral accent:    rgb(255, 90, 95)   → --color-skillary-coral
Navy:            hsl(222, 47%, 9%)  → --color-skillary-navy
Surface/cream:   hsl(36, 100%, 98%) → --color-skillary-cream
Border:          hsl(26, 43%, 90%)  → --color-skillary-border
Muted text:      hsl(220, 9%, 46%)  → --color-skillary-muted

Gradient primary: linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))
Font: Plus Jakarta Sans (--font-plus-jakarta)
Font mono: JetBrains Mono
```

**JANGAN pakai token lama:** `#F6C34F`, `#EB6C64` (legacy Allman)
**Semantic colors:** jangan pakai brand gradient untuk state error/danger — pakai warna standar (merah untuk gagal, hijau untuk sukses).

---

## 4. Arsitektur Folder

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage v1 (JANGAN UBAH)
│   ├── v2/                 # ← AREA KERJA V2
│   │   ├── layout.tsx      # Layout v2 (header/footer sendiri)
│   │   └── page.tsx        # Homepage v2 — isi ini
│   ├── admin/              # Admin panel (semua fitur B2B admin)
│   ├── api/                # Route handlers
│   ├── dashboard/          # Learner dashboard
│   └── learn/              # Course player
├── components/
│   ├── v2/                 # ← KOMPONEN V2
│   │   ├── home/           # Section-section homepage v2
│   │   └── layout/         # Header/Footer v2
│   ├── landing/            # Komponen landing page v1 (jangan ubah)
│   ├── home/               # Section components v1 (jangan ubah)
│   ├── layout/             # Header + Footer global (sudah benar @skillary.id)
│   └── ui/                 # Button, Card, Container, Logo, dll
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── entitlements.ts     # Course access logic
│   ├── certificate-eligibility.ts  # State machine sertifikat
│   └── payment-constants.ts
└── data/
    └── config.ts           # SATU-SATUNYA file untuk update email, WA, URL
```

---

## 5. Domain Model (Prisma)

```
User (ADMIN | INSTRUCTOR | LEARNER)
  ├── Enrollment → Course → Module → Lesson (TEXT | VIDEO | QUIZ)
  ├── LessonProgress
  ├── QuizAttempt
  ├── Certificate
  ├── PaymentOrder (COURSE | DIGITAL_CERTIFICATE)
  ├── PathEnrollment → LearningPath → LearningPathCourse
  └── BatchParticipant → TrainingBatch → Organization (B2B flow)

Lead (CRM — dari contact form)
```

**Certificate modes per Course:** `INCLUDED` | `PAID_DIGITAL` | `DISABLED`

---

## 6. Auth & Role Guards

```typescript
// Di Server Component / Route Handler:
const session = await auth();

// Roles:
// ADMIN    → akses semua /admin/*
// INSTRUCTOR → akses /admin dan /admin/courses/* saja
// LEARNER  → akses /dashboard dan /learn/*
```

Middleware guard ada di `src/middleware.ts`. Logic akses kursus ada di `src/lib/entitlements.ts`.

---

## 7. Analisis UI/UX V1 — Temuan (skor: 7.2/10)

### Yang SUDAH bagus (pertahankan di v2):
- Warm palette konsisten, Plus Jakarta Sans terasa profesional
- Hero section: headline kuat, speech bubbles differentiator visual yang bagus
- Sticky header dengan backdrop blur
- Portfolio page: klien Bank Indonesia, BNI, OJK, Indofood, Freeport → trust builder kuat
- SEO meta lengkap

### Yang HARUS diperbaiki di V2:

#### 🔴 Kritis
1. **Positioning tidak tajam** — antara "platform" dan "in-house training provider" masih blur. Pilih satu: apakah Skillary jualan software LMS, atau jasa pelatihan yang difasilitasi platform?
2. **Tidak ada social proof berbasis hasil** — tidak ada angka outcome: "X peserta tersertifikasi", "Y organisasi pakai platform ini". Testimonial terlalu generik.

#### 🟡 High
3. **Homepage terlalu panjang** (13 section → sudah dipangkas ke 12, target < 9)
4. **Platform page terlalu tipis** → SUDAH DIPERBAIKI (lihat `src/app/platform/page.tsx`)
5. **Duplicate CTA** di setiap section → `/proposal` vs `/contact` membingungkan → SUDAH DIPERBAIKI di KolaborasiSection
6. **Program Catalog statis** — 6 area program saja, tidak ada kursus yang bisa di-enroll langsung

#### 🟢 Medium
7. Testimonial tidak menyebut organisasi — kurang meyakinkan untuk B2B
8. `/services` dan `/teams` konten tumpang tindih — audit atau merge

---

## 8. Rencana V2 — Arahan Perombakan

### Positioning yang lebih tajam:
V2 harus pilih sudut: **"Platform LMS untuk HR & L&D yang ingin pelatihan lebih terukur"** — bukan generic "platform pelatihan digital".

### Homepage V2 — Target: 7-8 section saja

Urutan yang disarankan:
1. **Hero** — headline tajam + single CTA + 1 social proof number
2. **Masalah yang diselesaikan** — pain points konkret (pelatihan tidak terukur, laporan manual, sertifikat tidak ada)
3. **Cara kerja platform** — 3 langkah visual (Setup → Peserta Belajar → Laporan + Sertifikat)
4. **Fitur unggulan** — 4-5 fitur dengan visual/mockup nyata (bukan emoji)
5. **Bukti sosial** — logo klien atau testimoni dengan nama organisasi
6. **Program tersedia** — 3-4 program card dari DB atau hardcode
7. **CTA akhir** — 1 tombol, 1 pesan

### Struktur file V2:
```
src/components/v2/home/
├── HeroV2.tsx
├── PainPointsV2.tsx
├── HowItWorksV2.tsx
├── FeaturesV2.tsx
├── SocialProofV2.tsx
├── ProgramsV2.tsx
└── CTAFinalV2.tsx

src/components/v2/layout/
├── HeaderV2.tsx
└── FooterV2.tsx
```

Setelah semua section selesai, update `src/app/v2/layout.tsx` dan `src/app/v2/page.tsx`.

### Cara switch ke production saat siap:
1. Copy konten `src/app/v2/page.tsx` → `src/app/page.tsx`
2. Move `src/components/v2/*` → `src/components/*`
3. Update imports di page.tsx
4. Delete folder `src/app/v2/` dan `src/components/v2/`

---

## 9. Perbaikan yang Sudah Dilakukan (Juni 2026)

| File | Perubahan |
|---|---|
| `src/data/config.ts` | Email diupdate ke `@skillary.id` |
| `src/app/platform/page.tsx` | Full redesign — dashboard mockup, 7 feature cards detail, alur 4-langkah, persona |
| `src/app/page.tsx` | Hapus `PartnershipSection` (duplikat stats 1998/39+) |
| `src/components/landing/KolaborasiSection.tsx` | Secondary CTA diubah dari "Diskusikan Kebutuhan" → "Lihat Program" |

---

## 10. Konvensi Seeding & DB

- Semua seeding lewat `prisma/seed.ts` atau `scripts/`
- Jangan buat seed script di root
- Selalu jalankan `prisma generate` setelah update schema
- Ada beberapa `prisma as any` cast di codebase — ini technical debt, jangan tambah baru

---

## 11. Cara Run Lokal

```bash
# Install deps
npm install

# Setup DB + seed
npm run build  # includes: prisma generate + db push + seed

# Dev server
npm run dev
# → http://localhost:3000
# → http://localhost:3000/v2  (halaman v2 baru)
```

---

## 12. File Konfigurasi Penting

| File | Isi |
|---|---|
| `src/data/config.ts` | Email, WA number, Instagram, Site URL |
| `src/app/globals.css` | Color tokens, typography scale, animation keyframes |
| `prisma/schema.prisma` | Seluruh data model |
| `AGENTS.md` | Rules proyek — wajib dibaca |
| `.env` | DATABASE_URL, DIRECT_URL, GOOGLE_CLIENT_ID/SECRET, NEXTAUTH_SECRET, RESEND_API_KEY |

---

*Dokumen ini di-maintain manual. Update setiap ada keputusan arsitektur baru.*

---

## 13. Status Build V2 (Update: 2026-06-24)

### Yang sudah selesai:

| Komponen | File | Status |
|---|---|---|
| HeaderV2 | `src/components/v2/layout/HeaderV2.tsx` | ✅ Done |
| HeroV2 | `src/components/v2/home/HeroV2.tsx` | ✅ Done |
| CredibilityV2 | `src/components/v2/home/CredibilityV2.tsx` | ✅ Done |
| ProgramsV2 | `src/components/v2/home/ProgramsV2.tsx` | ✅ Done |
| HowItWorksV2 | `src/components/v2/home/HowItWorksV2.tsx` | ✅ Done |
| SocialProofV2 | `src/components/v2/home/SocialProofV2.tsx` | ✅ Done |
| AffiliateCtaV2 | `src/components/v2/home/AffiliateCtaV2.tsx` | ✅ Done |
| FinalCtaV2 | `src/components/v2/home/FinalCtaV2.tsx` | ✅ Done |
| V2 Layout | `src/app/v2/layout.tsx` | ✅ Done |
| V2 Homepage | `src/app/v2/page.tsx` | ✅ Done |
| FooterV2 | `src/components/v2/layout/FooterV2.tsx` | ✅ Done — Trainocate-style (newsletter strip, dense link columns, accreditation badges). Layout v2 sudah dialihkan dari Footer v1 ke FooterV2. |

### Halaman V2 — SEMUA SELESAI (Update: 2026-06-25):

| Bagian | Referensi | File | Status |
|---|---|---|---|
| Catalog page | NobleProg | `src/app/v2/catalog/page.tsx` | ✅ Done — search bar besar, filter chip (Kategori/Format/Durasi), 16 program, "Muat lebih banyak", count dinamis. Client component. |
| Certificate page | NetCampus | `src/app/v2/certificates/page.tsx` | ✅ Done — mockup sertifikat SVG/HTML (logo, verification ID, signature, QR placeholder), 3 jenis sertifikat (Kelulusan/Digital Berbayar/Batch Org), alur 4-langkah, FAQ `<details>`. |
| Resources/Downloads | Lynk.id | `src/app/v2/resources/page.tsx` | ✅ Done — 8 resource card (E-book/Template/Modul/Checklist), gated download modal email-capture (static), newsletter CTA. Client component. |
| Sertifikasi Badge | NetCampus | `src/app/v2/badge-programs/page.tsx` | ✅ Done — 4 kategori skema + alur perolehan badge. |
| Affiliate page | Multimatics + MySkill | `src/app/v2/affiliate/page.tsx` | ✅ Done — 3 jalur (Kampus/Komunitas/Expert) dengan tab switcher, benefit+steps per jalur, partners, form pendaftaran (static). Client component. |
| Presentation Landing | — | `src/app/v2/presentation/page.tsx` | ✅ Done — pain points (semantic merah), 4 pilar belajar, audience, 3 varian program (half-day/full-day/in-house), testimoni, CTA. |
| Course thumbnail design | Apple Institute | `src/components/v2/home/ProgramsV2.tsx` | ✅ Done — emoji diganti gradient + frosted-glass icon badge (SVG per kategori) + label kategori. Filter logic dipertahankan. |

### Funnel/konversi V2 — SEMUA SELESAI (Update: 2026-06-25):

| Halaman | File | Status |
|---|---|---|
| Proposal (form konsultasi B2B) | `src/app/v2/proposal/page.tsx` | ✅ Done — hero, 2 kolom (form + sidebar "kenapa Skillary" + kontak WA/email + 3 logo klien), field lengkap (nama/org/jabatan/email/WA/topik/jumlah peserta/format checkbox/pesan), chip topik interaktif, success state dengan WA link. Client component, form static (`action="#"`). |
| Untuk Organisasi (B2B service) | `src/app/v2/untuk-organisasi/page.tsx` | ✅ Done — hero, 3 pain points (semantik merah), 5 fitur B2B, tabel "Konvensional vs Skillary" (6 baris), alur 4-langkah, 4 persona, CTA→/v2/proposal. |
| Portfolio (trust builder) | `src/app/v2/portfolio/page.tsx` | ✅ Done — hero, impact stats bar dark (5 angka termasuk 500+ peserta), grid 8 klien + 4 placeholder, 6 sektor coverage, disclaimer arsip, CTA→/v2/proposal. |

### Detail page per program — SELESAI (Update: 2026-06-25):
| Bagian | File | Status |
|---|---|---|
| Data program | `src/data/v2-programs.ts` | ✅ Single source: `PROGRAM_INDEX` (union semua program di catalog + ProgramsV2), `slugify()`, `CATEGORY_GRADIENT`, `getProgramBySlug()`, `getAllProgramSlugs()`. Detail kaya untuk 6 program populer (Power BI, Data-Driven, Business Presentation, AI Productivity, Storytelling, Creative Problem Solving — alias 2 slug). Sisanya fallback partial. |
| Detail page | `src/app/v2/program/[slug]/page.tsx` | ✅ Server component, `generateStaticParams` + `generateMetadata`. 6 section: hero gradient+breadcrumb+badge, Outcomes, Untuk Siapa, Silabus (accordion `<details>`), Informasi Teknis, CTA dark+3 logo. Fallback note untuk program tanpa detail. `notFound()` untuk slug tak dikenal. |
| Catalog cards | `src/app/v2/catalog/page.tsx` | ✅ Tambah link "Lihat Detail →" (text) di atas tombol "Diskusikan Program" (tetap ke proposal). |
| ProgramsV2 cards | `src/components/v2/home/ProgramsV2.tsx` | ✅ Idem — "Lihat Detail →" + "Diskusikan Program Ini". |

Verifikasi: 6 full + alias + fallback → HTTP 200, slug tak dikenal → 404, accordion interaktif, SEO title per halaman (template `%s | Skillary` tidak dobel), `tsc` 0 error. Contoh: `/v2/program/power-bi-business-dashboard` (full), `/v2/program/iso-9001-awareness` (fallback).

### Halaman About — SELESAI (Update: 2026-06-25):
| Halaman | File | Status |
|---|---|---|
| Tentang Kami | `src/app/v2/about/page.tsx` | ✅ Done — 6 section: hero ("sejak 1998"), impact stats dark (1998/25+/21+/39+/500+), cerita+3 nilai inti (Terukur/Bersertifikat/Terdokumentasi), Rekam Jejak & Pengakuan (3 card + 6 client chip), tim (4 role placeholder avatar initial, tanpa nama), CTA→/v2/proposal. **TANPA menyebut "Allman"** (terverifikasi via grep teks halaman: `hasAllman: false`). |

### Cleanup link v1 — SELESAI (Update: 2026-06-25):
- **FooterV2**: `/services`→`/v2/untuk-organisasi`, `/proposal`&`/contact`→`/v2/proposal`,
  `/portfolio`→`/v2/portfolio`, `/about`→`/v2/about`, `/program-catalog`→`/v2/catalog`,
  "Training Path" diganti "Presentasi & Storytelling"→`/v2/presentation`.
  Sisa link v1 yang SENGAJA dipertahankan (belum ada padanan v2, route v1 masih hidup):
  `/platform`, `/reports`, `/training-brief`, `/case-studies`. Dipertahankan juga: `/privacy`, `/terms`.
- **AffiliateCtaV2**: semua `/contact?type=affiliate*` & `/expert-partner` → `/v2/affiliate`.
- Verifikasi browser: `v1LeaksUnexpected: []` di footer (di luar 4 path sengaja + legal).

### Navigasi HeaderV2 (FINAL, diupdate 2026-06-25):
NAV_LINKS (5 item, lebih clean): "Untuk Organisasi"→`/v2/untuk-organisasi`, "Portofolio"→
`/v2/portfolio`, "Tentang"→`/v2/about`, "Resources"→`/v2/resources`, "Kontak"→`/v2/proposal`.
("Sertifikat" dihapus dari nav utama — tetap ada di mega-dropdown Program.)
Semua href `/proposal` di HeaderV2 (top bar, CTA gradient desktop, CTA mobile) → `/v2/proposal`.
Mega-dropdown Program: kategori→`/v2/catalog`, "Presentasi Bisnis"→`/v2/presentation`,
"SOP & Process"→`/v2/badge-programs`, footer "Lihat Katalog"→`/v2/catalog`.
**Funnel V2 self-contained** — user tidak keluar ke v1 saat klik CTA/nav/footer marketing apapun.

### Catatan teknis:
- Semua halaman lolos `npx tsc --noEmit` tanpa error & terverifikasi render + interaksi di dev server.
- Error console `ClientFetchError ...authjs.dev` di dev = pre-existing (NextAuth `getSession` dari
  SessionProvider tanpa endpoint auth di lokal), TIDAK terkait halaman v2 & tidak memblokir render.
- **STATUS: V2 siap untuk production switch** (lihat section 8 "Cara switch ke production").

### Cara preview:
```bash
npm run dev
# Buka http://localhost:3000/v2
```

### Bug fix penting (2026-06-24):
Root layout (`src/app/layout.tsx`) selalu merender `Header`/`Footer` v1 global di semua route,
termasuk `/v2/*`, karena `v2/layout.tsx` nested di dalam `<main>` root layout — menyebabkan
header & footer tampil dobel (v1 + v2). Fix: tambahkan `"/v2"` ke `hiddenPaths` di
`src/components/layout/Header.tsx` dan `src/components/layout/Footer.tsx` (pola yang sama
dipakai untuk `/lp` dan `/skillary-campus`). Halaman v1 tidak terdampak.

---

## 14. Homepage Switch ke Startup Concept (Update: 2026-07-08)

- **Root `/` sekarang me-render halaman startup-concept** (`src/app/lp/startup/page.tsx`, di-import oleh `src/app/page.tsx`). Desain: Aimfox-inspired (header morph bar→pill, dark canvas + white mega-container, pricing aurora dark band, liquid-glass button, CTA gradient + footer hitam) × sistem animasi LottieFiles (scroll-reveal, marquee testimoni, count-up, float tiles, hover lift). Font: Manrope (di-bundle di page). Aset SVG custom: `public/images/lp-startup-{grid-bg,aurora-1,aurora-2,cta-bg}.svg`.
- HeaderV2/FooterV2 disembunyikan di `/` (exact match, halaman punya chrome sendiri). Komposisi homepage V2 lama tetap di `/v2`.
- `/lp/startup` dipertahankan sebagai alias preview ber-`noindex` (canonical = `/`).
- LP ads Meta: `/lp/training-organisasi` (noindex, form → /api/leads).
