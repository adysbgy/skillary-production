# Deployment Readiness Notes

Panduan ini berisi daftar pengecekan (*checklist*) sebelum dan sesudah melakukan deployment kode Skillary ke lingkungan produksi, untuk memastikan peluncuran yang aman dan stabil.

---

## 1. Pre-deploy Checklist
Sebelum menekan tombol *deploy* atau melakukan *merge* ke cabang utama (main), pastikan hal berikut:
- [ ] **Run Build:** `npm run build` sukses tanpa error.
- [ ] **Run TypeScript:** `npx tsc` (atau `npx tsc --noEmit`) berjalan mulus tanpa error *typing*.
- [ ] **Env Check:** Semua *Environment Variables* terbaru sudah tercatat di platform *hosting* (misal: Vercel/Netlify).
- [ ] **Contact Form Test:** Endpoint form submission (Formspree dsb) aktif dan mengarah ke email yang benar.
- [ ] **Sitemap & Robots:** `sitemap.xml` dan `robots.txt` sudah mencakup rute publik terbaru dan mengecualikan rute privat.
- [ ] **Metadata Check:** Title, description, dan OpenGraph sudah diset untuk SEO perusahaan B2B.
- [ ] **Mobile Check:** Tampilan *responsive* aman, tombol CTA bisa diklik tanpa tumpang tindih.
- [ ] **Image Load Check:** Aset gambar menggunakan format WebP dan teroptimasi, tidak memperlambat LCP (Largest Contentful Paint).

## 2. Production Environment Variables to Verify
Pastikan *key* berikut ada di dashboard produksi Anda:
- `NEXTAUTH_URL` (URL asli produksi jika menggunakan NextAuth).
- `NEXTAUTH_SECRET` (Wajib untuk keamanan *session*).
- `DATABASE_URL` (String koneksi ke database produksi, misal: PostgreSQL/Supabase).
- `FORMSPREE_ID` (atau config integrasi form email lainnya).
- `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY` (Jika *checkout* produksi aktif).
- URL eksternal lainnya yang bersifat publik.

## 3. Post-deploy Checks
Segera setelah deployment berhasil (Live), lakukan klik manual (Smoke Test) pada rute berikut di browser:
- [ ] Homepage (`/`)
- [ ] Kontak (`/contact`) - Coba kirim pesan *dummy*.
- [ ] Proposal (`/proposal`)
- [ ] Program Catalog (`/program-catalog`)
- [ ] Thank You Page (`/thank-you`) - Cek apakah meta *noindex* aktif.
- [ ] Robots.txt (`/robots.txt`)
- [ ] Sitemap (`/sitemap.xml`)
- [ ] Error Page (`/halaman-acak-123`) - Pastikan Custom 404 muncul dengan benar.

## 4. Rollback Notes (Skenario Darurat)
- **Pertahankan Build Lama:** Selalu pastikan opsi *revert* atau *instant rollback* aktif di platform *hosting* Anda (misal Vercel).
- **Hindari Schema Change Dadakan:** Jangan menjalankan `prisma db push` atau modifikasi skema database sesaat sebelum *launching* kampanye *outreach* tanpa mem-backup database terlebih dahulu.
- **Validasi Kontak:** Pastikan integrasi form kontak benar-benar hidup sesaat sebelum menyebarkan link ke prospek, agar *lead* tidak hilang.
