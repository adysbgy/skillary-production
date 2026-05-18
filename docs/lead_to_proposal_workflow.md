# Lead to Proposal Workflow

Dokumen ini mendefinisikan tahapan operasional (*pipeline*) dari sejak sebuah inkuiri (lead) masuk hingga proposal dikirimkan.

---

## Tabel Status Lead

| Status | Meaning (Arti) | Owner Action | Next Step |
| :--- | :--- | :--- | :--- |
| **New** | Inkuiri baru masuk via web/WA. | Baca & identifikasi sumber. | Ubah ke *Contacted*. |
| **Contacted** | Sudah dibalas dengan sapaan intro. | Tunggu respons klien. | Jika membalas, *Qualified*. |
| **Qualified** | Sudah diverifikasi bahwa ini klien B2B riil. | Jalankan *Kualifikasi Kebutuhan*. | *Waiting for Details* / Call. |
| **Waiting for Details** | Sedang menunggu klien mengisi Intake Form. | Follow up jika > 3 hari. | Jika lengkap -> *Proposal Needed*. |
| **Proposal Needed** | Data cukup, siap dibuatkan draft. | Susun PDF Proposal / Deck. | Kirim -> *Proposal Sent*. |
| **Proposal Sent** | Proposal resmi telah dikirim ke klien. | Jadwalkan presentasi/meeting. | *Follow-up*. |
| **Follow-up** | Pengecekan status setelah presentasi/kirim. | Tanya feedback & keputusan. | *Won* atau *Lost*. |
| **Won** | Deal! Klien setuju. | Siapkan kontrak & *deployment*. | Eksekusi Program. |
| **Lost** | Klien batal atau tidak cocok budget. | Catat alasan pembatalan. | Evaluasi internal. |
| **Nurture** | Klien tertarik tapi "nanti tahun depan". | Masukkan ke list edukasi. | Kirim update/newsletter. |

---

## Penjelasan Tahapan Pipeline

### 1. Lead Masuk
- **Goal:** Menangkap data kontak dengan cepat.
- **What to do:** Cek notifikasi Formspree/Email/WhatsApp. Pastikan data tercatat di CRM/Spreadsheet.
- **Document to use:** N/A
- **Send to client:** N/A (Tunggu dihubungi)

### 2. Klasifikasi Lead
- **Goal:** Membedakan klien korporat serius vs "hanya nanya".
- **What to do:** Cek alamat email (apakah domain perusahaan atau gmail).
- **Document to use:** `docs/lead_qualification_checklist.md`
- **Decision criteria:** Apakah sesuai dengan layanan Skillary?

### 3. Kualifikasi Kebutuhan
- **Goal:** Mendapatkan konteks lengkap (peserta, topik, budget).
- **What to do:** Kirim *Intake Template* atau diskusikan di WhatsApp.
- **Document to use:** `docs/proposal_request_intake_template.md`
- **Send to client:** Link ke `/training-brief` atau pesan kualifikasi.

### 4. Kirim Resource Awal
- **Goal:** Mengedukasi klien sambil menunggu mereka mengisi detail.
- **What to do:** Kirim penjelasan ringkas program.
- **Document to use:** Dokumen di `docs/program_one_pagers/`.
- **Send to client:** PDF One-Pager atau link `/program-catalog`.

### 5. Discovery Call (Opsional tapi Direkomendasikan)
- **Goal:** Menyamakan persepsi dan membangun kedekatan emosional.
- **What to do:** Meeting online singkat (15-30 menit) dengan Decision Maker.
- **Document to use:** `docs/sales_deck_production_brief.md` (Gunakan deck presentasi).
- **Send to client:** Unduhan/Kalender meeting.

### 6. Proposal Preparation
- **Goal:** Membuat penawaran yang *custom* dan bernilai tinggi.
- **What to do:** Susun harga, timeline, dan kurikulum berdasarkan call/intake.
- **Document to use:** `docs/proposal_pdf_production_brief.md` & `docs/pricing_guidance_internal.md`.

### 7. Proposal Sent
- **Goal:** Klien menerima dokumen resmi.
- **What to do:** Kirim via Email dengan tembusan ke seluruh *stakeholder* terkait.
- **Send to client:** PDF Proposal. Link ke `/contact?type=proposal` tidak lagi diperlukan.

### 8. Follow-up
- **Goal:** Menjaga momentum agar tidak *ghosting*.
- **What to do:** Hubungi kembali setelah 2-3 hari.
- **Document to use:** `docs/sales_response_playbook.md` (Lihat section *When lead goes silent*).

### 9. Deal / Lost / Nurture
- **Goal:** Menutup *cycle* sales.
- **What to do:** Tandai status akhir. Jika *Won*, siapkan platform LMS untuk klien.

### 10. Proof Collection (Post-Program)
- **Goal:** Menjadikan klien sebagai *use case* nyata.
- **What to do:** Minta izin publikasi logo dan testimoni setelah program selesai.
- **Document to use:** `docs/client_proof_database_template.md` & `docs/case_study_intake_template.md`.
- **Send to client:** Form feedback atau halaman `/case-studies` sebagai referensi output.
