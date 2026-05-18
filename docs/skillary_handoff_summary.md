# Skillary Handoff Summary

Dokumen ini merupakan panduan serah terima (*handoff*) yang menjelaskan status terkini dari *website* dan ekosistem *sales* Skillary. Dokumentasi ini berguna bagi developer, konsultan, atau operator baru yang akan melanjutkan pengembangan proyek ini.

---

## 1. Brand Positioning
- **Core Message:** "Skillary adalah wajah digital baru dari pengalaman pelatihan sejak 1998."
- **Value Proposition:** Membantu organisasi menjalankan in-house training yang lebih rapi, terukur, dan mudah dievaluasi melalui materi, assessment digital, dan pelaporan terintegrasi.
- **Tone & Style:** Profesional, hangat (Warm Ivory, Deep Navy, Skillary Amber), bersih, dan berorientasi korporat (bukan *startup SaaS* yang hiper-promosional).

## 2. Key Public Routes
Rute yang sudah aktif dan dioptimasi SEO-nya:
- `/` (Homepage)
- `/about`
- `/teams` (Solusi Organisasi)
- `/platform` (Penjelasan Fitur LMS)
- `/services` (Layanan Managed Learning, dll)
- `/program-catalog` (Area Pelatihan)
- `/certificates` (Validasi Sertifikat)
- `/expert-partner`
- `/contact`, `/proposal`, `/training-brief` (Forms)
- `/resources`, `/portfolio`, `/case-studies` (Dokumentasi)

## 3. Sales Funnel
- **Awareness:** Homepage & Program Catalog.
- **Education:** Platform, Services, Certificates, Teams.
- **Conversion/Inquiry:** Formulir di `/proposal`, `/contact`, dan `/training-brief`. Semua berujung ke `/thank-you` (noindex) setelah sukses.

## 4. Internal Docs List (Sales Ops)
Disimpan di dalam folder `docs/` (Hanya untuk internal, tidak *serve* ke web publik):
- `lead_qualification_checklist.md`
- `proposal_request_intake_template.md`
- `client_proof_database_template.md`
- `case_study_intake_template.md`
- `outreach_campaign_plan.md`
- `objection_handling.md`
- `pricing_guidance_internal.md`
- `program_one_pagers/` (6 Dokumen)
- `proposal_pdf_production_brief.md`
- `sales_deck_production_brief.md`
- `sales_snippets.md`
- `production_launch_checklist.md` & `deployment_readiness_notes.md`

### Sales Workflow Documents
- `lead_qualification_checklist.md`
- `proposal_request_intake_template.md`
- `sales_dry_run_scenarios.md`
- `sales_response_playbook.md`
- `lead_to_proposal_workflow.md`
- `objection_handling.md`
- `pricing_guidance_internal.md`
- `sales_followup_templates.md`
- `client_proof_database_template.md`

### Final Sales Assets
These are copy source files for future PDF/PPT design production:
- `final_corporate_proposal_copy.md`
- `final_sales_deck_copy.md`
- `final_company_profile_copy.md`
- `final_sales_asset_usage_guide.md`

## 5. Current "No-Fake-Proof" Policy
Ini adalah komitmen non-negosiabel:
- Dilarang keras menggunakan testimoni palsu.
- Dilarang memajang logo klien palsu.
- Dilarang membuat klaim angka peserta palsu atau akreditasi fiktif.
- Testimoni dan klaim diarahkan menggunakan frasa "Sektor/Anonim" jika izin belum didapatkan. 

## 6. Legacy Proof Governance
- **Core Truth:** Allman = legacy training experience since 1998; Skillary = digital platform evolution of that experience.
- **Public Proof Layers:** `/portfolio` and `/case-studies` act as documented, curated public proof layers for the legacy experience.
- **No Unapproved Logos/Claims:** Do not use logos, "trusted by" wording, or "Skillary client" claims for historical organizations without explicit permission.
- **Validation Required:** Use the manual proof tracker (`docs/proof_url_manual_validation_tracker.md`) to verify external proof links before referencing them in high-stakes sales proposals.

## 7. Image Asset Status
- Foto yang menampilkan manusia sudah di-generate secara photorealistic dan spesifik menggunakan tone corporate Indonesia.
- Disimpan di `public/images/training/` dengan format teroptimasi `.webp`.
- **Wajib dilabeli:** "Ilustrasi suasana pelatihan" untuk mematuhi kebijakan *no-fake-proof*.

## 8. What Is Ready
- UI/UX publik komprehensif, desain *conversion-friendly*.
- Semua formulir *intake* klien.
- *Metadata* dan *Sitemap/Robots* untuk SEO dasar.
- Halaman 404 *custom*.
- Dokumen pendukung tim *Sales Operations*.

## 8. What Still Needs Real Data
- `/portfolio` dan `/case-studies`: Masih berupa cangkang *template*, menunggu data dan dokumentasi program pelatihan riil masuk ke sistem.
- Daftar klien resmi (Logo *strip* jika nantinya disetujui klien riil).

## 9. Next Recommended Work
- Mengaktifkan integrasi API *backend* yang sesungguhnya ke formulir `/contact` dan `/proposal` (misal menggunakan Resend, Formspree, atau API langsung ke CRM internal).
- Uji coba integrasi *payment gateway* (Midtrans) di alur `checkout` saat *course* individual siap dijual.
- Mengunggah foto *real* dari pelatihan pertama untuk menggantikan "ilustrasi".

## 10. Known Manual QA Items
- Melakukan pengujian form submission langsung dari Vercel/Produksi.
- Terdapat *warning* minor Next.js di `src/app/api/upload/route.ts` terkait export `config` yang *deprecated* (tidak fatal, tapi bisa dirapikan kelak).

## 11. Production Launch Readiness
Skillary telah melewati audit dan persiapan *soft-launch* produksi. Dokumentasi audit peluncuran dapat dilihat pada file berikut:
- `production_route_inventory.md` - Daftar seluruh rute dan risiko akses.
- `admin_security_launch_audit.md` - Validasi perlindungan *dashboard* Admin.
- `contact_lead_launch_audit.md` - Validasi *rate limiting* dan keamanan formulir *Lead*.
- `resources_collateral_launch_audit.md` - Validasi ketersediaan PDF HTML ekspor.
- `seo_launch_audit.md` - Validasi konfigurasi sitemap dan robots.
- `claim_safety_launch_scan.md` - Pemindaian *codebase* terhadap larangan klaim palsu.
- `production_env_checklist.md` - Daftar kredensial *environment* produksi.
- `mobile_responsiveness_risk_audit.md` - Pemetaan risiko tata letak layar ponsel.
- `build_warning_launch_audit.md` - Status peringatan kompilasi.
- `final_production_launch_checklist.md` - Daftar periksa akhir tim *deployment* (Pre-launch, Smoke test, Rollback).

## 12. Post-Launch Monitoring
Untuk memastikan kualitas *leads*, stabilitas platform, dan umpan balik yang aman pasca-peluncuran, gunakan dokumen operasional berikut:
- `post_launch_monitoring_checklist.md` - Rutinitas pemantauan jam pertama hingga mingguan.
- `live_smoke_test_checklist.md` - Template *smoke test* manual per rute.
- `post_launch_issue_tracker_template.md` - *Tracker* *bug* dan keluhan UX.
- `client_feedback_intake_template.md` - Template wawancara umpan balik Sales/Klien yang aman.
- `lead_quality_review_template.md` - Template evaluasi *leads* organik pertama.
- `first_week_launch_report_template.md` - Format laporan evaluasi minggu pertama peluncuran.

## 13. Global UI/UX Alignment Plan

Setelah landing page baru disetujui sebagai *source of truth* visual, seluruh halaman website perlu diselaraskan secara bertahap agar konsisten dengan *design system* baru (warm orange/coral palette, gradient CTA, modern card-based layout).

**Dokumen referensi:**
- `global_ui_alignment_audit.md` — Audit lengkap seluruh halaman: status alignment, inkonsistensi komponen, temuan *claim-safety*, dan rekomendasi urutan sprint.
- `skillary_design_system_v2.md` — Ekstraksi *design system* dari landing page: color tokens, typography scale, button/card/form/badge styles, motion rules, dan usage rules per area (public, LMS, admin, auth).

**Status saat ini:**
- ~20% halaman sudah selaras (landing page + auth pages).
- ~70% halaman publik masih menggunakan pola visual lama (navy-blue CTA `#1E3A8A`, Slate text palette).
- Admin dan LMS menggunakan styling fungsional yang perlu diselaraskan secara minimal.
- Ditemukan 2 isu *claim-safety* di `/community` ("Gratis Selamanya", "mentoring gratis").
- Ditemukan *double footer* pada landing page (layout footer + landing footer keduanya tampil).

**Prinsip alignment:**
- Public pages: align penuh ke *design system* v2.
- LMS pages: prioritas usability, alignment warna minimal.
- Admin pages: perubahan kosmetik saja, JANGAN ubah *business logic*.
- Setiap fase harus di-*scan* ulang untuk *claim-safety*.

## 14. Global UI Alignment — Sprint Status

| Sprint | Fokus | Status |
|--------|-------|--------|
| **Sprint 0** | Audit global + ekstraksi design system | ✅ Selesai |
| **Sprint 1** | Foundation fixes (footer, logo, button, claim-safety) | ✅ Selesai |
| **Sprint 2** | Public pages: `/services`, `/platform`, `/demo`, `/program-catalog`, dll | ✅ Selesai |
| **Sprint 3** | Remaining public pages: `/proposal`, `/portfolio`, `/case-studies`, `/teams` | ✅ Selesai |
| **Sprint 4** | LMS pages: `/dashboard`, `/learn/*`, `/explore` | ✅ Selesai |
| **Sprint 5** | Admin pages: minimal cosmetic alignment | ✅ Selesai |
| **Sprint 6** | Auth pages: token migration polish | 🔲 Belum dimulai |

### Sprint 1 — Ringkasan Perubahan

**Build:** `npx tsc --noEmit` ✅ · `npm run build` ✅ exit 0

**Perubahan yang dilakukan:**
- **Double footer dihapus** — `<LandingFooter />` dihapus dari `src/app/page.tsx`. `layout/Footer.tsx` kini satu-satunya footer untuk semua halaman.
- **Footer upgrade** — `src/components/layout/Footer.tsx` diupgrade ke layout 5-kolom (brand + address, Platform, Program, Untuk Organisasi) dengan copy B2B yang benar.
- **Logo subtitle diperbarui** — `src/components/ui/Logo.tsx`: "Modern Learning Platform" → "Platform Pelatihan Terukur".
- **Button variants ditambahkan** — `src/components/ui/Button.tsx`: `GradientButton` (orange→coral, untuk menggantikan `#1E3A8A` di Sprint 2+) dan `GhostWarmButton`. Backward-compatible.
- **UI styles library dibuat** — `src/lib/ui-styles.ts`: konstanta kelas `btn`, `card`, `pill`, `text`, `surface` untuk panduan Sprint 2+ migration.
- **Claim-safety diperbaiki** — `src/app/community/page.tsx`: "sesi mentoring gratis" → netral; "Gratis Selamanya" pill → "Tersedia untuk Peserta Program".
- **Orphaned header didokumentasikan** — `src/components/landing/Header.tsx` ditandai `@deprecated`, dijadwalkan dihapus di Sprint 3.

**Dokumen Sprint 1:** `docs/global_ui_alignment_sprint_1_foundation.md`

### Sprint 2 — Ringkasan Perubahan

**Build:** `npx tsc --noEmit` ✅ · `npm run build` ✅ exit 0

**Halaman yang diperbarui:**
- `/program-catalog` — navy CTA → gradient, warm border, warm pills, card hover lift
- `/platform` — navy CTA → gradient, step indicators → warm orange, cold borders → warm
- `/services` — navy CTA → gradient, `#C2410C` link → orange, added bottom CTA section
- `/demo` — navy CTA → gradient, scenario cards cold border → warm, `#1E3A8A` links → orange
- `/reports` — navy CTA → gradient, table header `#0F172A` → gradient, use-case card borders → warm
- `/certificates` — `#172554`/`#1E3A8A` CTA → gradient, mockup borders → warm orange, added bottom CTA

**Pola yang distandarisasi di semua 6 halaman:**
- Semua primary CTA: `bg-[#1E3A8A] rounded-lg` → `gradient(#FF8A00→#FF5A5F) rounded-full`
- Semua secondary CTA: `rounded-lg border-2` → `rounded-full border: 1.5px solid rgb(240,217,200)`
- Eyebrow pill: `bg-[#FFF7ED] text-[#C2410C]` → `rgb(255,244,232) / rgb(255,138,0)`
- Card border cold `#CBD5E1` → warm `rgb(240,217,200)`
- Link accent `#1E3A8A`/`#C2410C` → `rgb(255,138,0)`

**Claim-safety:** Semua 6 halaman bersih setelah scan.

**Dokumen Sprint 2:** `docs/global_ui_alignment_sprint_2_public_pages.md`

### Sprint 3 — Ringkasan Perubahan

**Build:** `npx tsc --noEmit` ✅ · `npm run build` ✅ exit 0

**Halaman yang diperbarui:**
- `/proposal` — navy CTA → gradient, warm border, warm pills
- `/portfolio` — navy CTA → gradient, cold borders → warm, eyebrow pill → warm Skillary token
- `/case-studies` — navy CTA → gradient, cold borders → warm, eyebrow pill → warm
- `/resources` — navy CTA → gradient, card border & hover dots → warm tokens
- `/training-brief` — navy CTA → gradient, warm borders, checklist icons → warm
- `/expert-partner` — navy CTA → gradient, warm borders, step indicators → warm
- `/teams` (12 komponen) — menghapus semua instance `bg-[#1E3A8A]` (25+ instances), mengganti dengan warm gradient, token `rgb(255,138,0)`, dan border hangat `rgb(240,217,200)`. Certificate mockup dan Reporting mockup di-update dengan brand colors.

**Pola yang distandarisasi:**
- Semua primary CTA di remaining pages & teams components: `bg-[#1E3A8A]` → `gradient(#FF8A00→#FF5A5F) rounded-full`
- Semua background slate/navy di section/mockup: `bg-[#F8FAFC]` → `bg-[#FFFDF9]` (warm ivory)
- Semua cold borders/dividers: `border-[#E2E8F0]`/`#CBD5E1` → `rgb(240,217,200)`
- Semua step indicators/icons: `#1E3A8A` → `rgb(255,138,0)`

**Dokumen Sprint 3:** `docs/global_ui_alignment_sprint_3_remaining_pages.md`

### Komponen Baru untuk Sprint 2+ Gunakan

```ts
// Untuk menggantikan bg-[#1E3A8A] di public pages:
import { GradientButton, GhostWarmButton } from "@/components/ui/Button";
import { btn, card, pill, GRADIENT_STYLE, warmBorder } from "@/lib/ui-styles";
```

### Sprint 4 — Ringkasan Perubahan

**Build:** `npx tsc --noEmit` ✅ · `npm run build` ✅ exit 0

**Halaman yang diperbarui:**
- `/dashboard` — warm ivory background, gradient buttons, orange accent pills, and warm card borders.
- `/learn/[courseSlug]` — merubah dark navy/black hero menjadi warm ivory, gradient button enrollments, orange lesson completion hover states.
- `/learn/[courseSlug]/[lessonSlug]` — progress bar gradient `#FF8A00`→`#FF5A5F`, quiz modal warm tokens, quiz option hover states, short answer focus rings.
- `/certificate/[uniqueCode]` — top accent bar gradient.

**Pola yang distandarisasi:**
- Semua halaman _learner experience_ mempertahankan fungsionalitas dan routing (Zero Logic Disruption).
- Penggantian komponen `PrimaryButton` lama menjadi `GradientButton` yang menggunakan _Skillary brand gradient_.
- Penghilangan hard black/navy sebagai background utama, diganti dengan `#FFFDF9` dengan border `rgb(240, 217, 200)`.

**Dokumen Sprint 4:** `docs/global_ui_alignment_sprint_4_lms_learner.md`

### Sprint 5 — Ringkasan Perubahan

**Build:** `npx tsc --noEmit` ✅ · `npm run build` ✅ exit 0

**Halaman yang diperbarui:**
- `/admin` — dashboard KPI token dan gradient action buttons.
- `/admin/leads` — penyesuaian filter CTA dan warm styling table (mempertahankan logic CRM).
- `/admin/courses` — penggunaan `GradientButton` dan styling status badge.
- `/admin/organizations` & `/admin/batches` — konversi primary black buttons ke Skillary gradient dan warm UI table.
- `/admin/users` & `/admin/paths` — perbaikan hover states dan warm borders.

**Pola yang distandarisasi:**
- Seluruh halaman admin kini memiliki styling layout table dan button yang konsisten dengan desain hangat Skillary, tanpa mengganggu *business logic* Prisma, akses *auth*, atau proses operasional/CRM.

**Dokumen Sprint 5:** `docs/global_ui_alignment_sprint_5_admin_internal.md`


