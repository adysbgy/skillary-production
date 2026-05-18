# Skillary SEO Metadata Audit

## 1. Public Routes Audited
The following public routes were audited and updated to ensure consistent, professional, and corporate-ready SEO metadata:
- `/`
- `/about`
- `/teams`
- `/platform`
- `/services`
- `/program-catalog`
- `/training-brief`
- `/proposal`
- `/contact`
- `/thank-you`
- `/resources`
- `/portfolio`
- `/case-studies`
- `/expert-partner`
- `/certificates`

## 2. Metadata Updates per Route

| Route | Title | Description |
|---|---|---|
| Global (`layout.tsx`) | Skillary — Platform Pelatihan Terukur untuk Organisasi | Skillary membantu organisasi mengelola pelatihan internal dari materi pembelajaran, assessment, sertifikat digital, hingga laporan peserta dalam satu platform. |
| `/` | Skillary — In-House Training yang Lebih Terukur | Skillary membantu organisasi menjalankan pelatihan internal dengan materi terstruktur, assessment, sertifikat digital, dan laporan peserta. |
| `/about` | Tentang Skillary | Kenali Skillary sebagai wajah digital baru dari pengalaman pelatihan sejak 1998 untuk pembelajaran organisasi yang lebih terstruktur dan mudah dievaluasi. |
| `/teams` | Skillary untuk Organisasi | Solusi in-house training untuk organisasi yang membutuhkan materi pembelajaran, assessment, sertifikat digital, dan laporan peserta dalam satu alur. |
| `/platform` | Platform Skillary | Pelajari fitur platform Skillary untuk mengelola materi, progress peserta, assessment, sertifikat digital, dan laporan pelatihan. |
| `/services` | Layanan Skillary | Jelajahi format kerja sama Skillary: in-house training, assessment program, managed learning, dan diskusi platform pembelajaran. |
| `/program-catalog` | Area Program Pelatihan Skillary | Lihat area program pelatihan yang dapat dikembangkan sesuai kebutuhan organisasi, mulai dari data, leadership, AI, hingga komunikasi bisnis. |
| `/training-brief` | Brief Kebutuhan Training | Panduan menyiapkan informasi awal sebelum berdiskusi dengan tim Skillary tentang kebutuhan pelatihan organisasi. |
| `/proposal` | Minta Proposal Skillary | Ajukan kebutuhan pelatihan organisasi Anda dan minta proposal program Skillary yang sesuai dengan topik, peserta, durasi, dan output. |
| `/contact` | Kontak Skillary | Hubungi Skillary untuk berdiskusi tentang in-house training, assessment, sertifikat digital, laporan peserta, atau kolaborasi expert. |
| `/thank-you` | Terima Kasih | Inquiry Anda telah diterima. Tim Skillary akan meninjau kebutuhan pelatihan dan menghubungi kembali pada hari kerja. *(noindex)* |
| `/resources` | Resource Skillary | Kumpulan resource untuk memahami pendekatan Skillary dalam pelatihan internal, proposal, program, portfolio, dan studi kasus. |
| `/portfolio` | Portfolio Program Pelatihan | Ruang dokumentasi program pelatihan Skillary yang akan diperbarui dengan portfolio dan bukti publikasi resmi. |
| `/case-studies` | Studi Kasus Program Pelatihan | Template dan ruang dokumentasi studi kasus program pelatihan yang akan ditampilkan setelah mendapatkan izin publikasi. |
| `/expert-partner` | Expert Partner Skillary | Kolaborasi terbatas dengan trainer, praktisi, dan subject matter expert terpilih untuk program pembelajaran organisasi. |
| `/certificates` | Sertifikat Skillary | Pelajari sertifikat digital Skillary yang diterbitkan berdasarkan penyelesaian pembelajaran dan assessment sesuai ketentuan program. |

## 3. Routes Excluded from Sitemap
The following routes are explicitly excluded from `sitemap.ts` and `robots.ts` (`disallow`):
- `/dashboard/`
- `/admin/`
- `/api/`
- `/checkout/`
- `/thank-you`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

## 4. OG Image Status
- Currently using `summary` for Twitter cards.
- **Status:** No custom Open Graph image detected yet.
- **TODO:** Add official Skillary OG image once brand asset is ready (e.g. `/public/og-image.png`) and update `layout.tsx` to `summary_large_image`.

## 5. Notes on Claims to Avoid
To maintain Skillary's premium and honest brand identity, all future metadata and SEO copy MUST AVOID:
- ❌ Fake user counts (e.g., "10,000+ users").
- ❌ Fake trust badges (e.g., "Terpercaya oleh ribuan perusahaan").
- ❌ Legal overclaims (e.g., "Resmi nasional", "Terakreditasi", "Diakui pemerintah").
- ❌ Hype language (e.g., "Terbaik", "Nomor Satu", "Harga Murah").
- ❌ Claiming "berdiri sejak 1998" without context. Use "berangkat dari pengalaman pelatihan sejak 1998" instead.

## 6. Future SEO Tasks
- [ ] Upload a high-quality `og-image.jpg` that adheres to brand guidelines (no fake logos).
- [ ] Connect the dynamic `/program/[id]` route generation cleanly into `sitemap.ts` if deemed safe.
- [ ] Submit `sitemap.xml` to Google Search Console when moving to full production domain.
