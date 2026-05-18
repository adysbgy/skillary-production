# Lead CRM MVP — Dokumentasi Teknis

## 1. Apa yang Disimpan Lead CRM

Setiap lead yang masuk melalui formulir `/contact` disimpan di database dengan field berikut:

| Field | Tipe | Required | Keterangan |
|:---|:---|:---|:---|
| name | String | ✅ | Nama lengkap pengirim |
| email | String | ✅ | Email kerja |
| whatsapp | String | Opsional | Nomor WhatsApp |
| organization | String | Opsional | Nama organisasi / PT |
| role | String | Opsional | Jabatan / peran di organisasi |
| inquiryType | String | ✅ | Jenis kebutuhan (In-House, Assessment, dll) |
| programInterest | String | Opsional | Slug program dari /program-catalog |
| sourcePage | String | Opsional | Halaman asal CTA (demo, reports, program-catalog, dll) |
| message | String | ✅ | Pesan / catatan kebutuhan |
| status | String | Auto | Default: NEW |
| notes | String | Opsional | Catatan internal dari admin |

## 2. ContactForm Payload

Saat pengguna mengirim formulir di `/contact`, data dikirim secara paralel ke:

1. **`POST /api/leads`** (Primary) — Disimpan di database Skillary
2. **Formspree** (Secondary, fire-and-forget) — Tetap dikirim ke email sebagai backup

Jika database berhasil menyimpan, pengguna melihat pesan sukses. Kegagalan Formspree tidak memblokir pengalaman pengguna.

## 3. Lead Statuses

| Status | Arti | Aksi Admin |
|:---|:---|:---|
| NEW | Lead baru masuk | Hubungi dan kualifikasi |
| CONTACTED | Sudah dihubungi | Tunggu respons |
| QUALIFIED | Terverifikasi sebagai klien B2B riil | Siapkan intake proposal |
| WAITING_FOR_DETAILS | Menunggu detail klien | Follow-up jika > 3 hari |
| PROPOSAL_NEEDED | Data cukup, butuh proposal | Susun proposal |
| PROPOSAL_SENT | Proposal sudah dikirim | Follow-up 3 hari kerja |
| FOLLOW_UP | Menunggu keputusan | Tanyakan feedback |
| WON | Deal berhasil | Eksekusi program |
| LOST | Batal | Catat alasan |
| NURTURE | Belum siap, edukasi dulu | Kirim update/newsletter |

## 4. Admin Workflow

1. Buka `/admin/leads`
2. Lihat summary cards (New, Qualified, Proposal Needed, Proposal Sent)
3. Filter berdasarkan status, tipe inquiry, atau search
4. Klik "Detail →" untuk melihat informasi lengkap lead
5. Update status dan tambahkan catatan internal
6. Simpan perubahan

## 5. API Routes

| Route | Method | Auth | Fungsi |
|:---|:---|:---|:---|
| `/api/leads` | POST | Public | Menerima submission dari ContactForm |
| `/api/admin/leads` | GET | Admin | List leads dengan filter |
| `/api/admin/leads/[id]` | GET | Admin | Detail lead |
| `/api/admin/leads/[id]` | PATCH | Admin | Update status/notes |

## 6. Known Limitations

- **Tidak ada email notification otomatis** — Admin harus cek dashboard secara manual.
- **Tidak ada assignment owner** — Semua lead visible oleh semua admin.
- **Tidak ada follow-up reminder** — Reminder harus dilakukan manual.
- **Tidak ada anti-spam canggih** — Hanya validasi field dasar (panjang, format email).
- **Tidak ada export CSV** — Data bisa diakses via API atau langsung dari DB.

## 7. Future Improvements

- Email notification ke admin saat lead baru masuk (via Resend/Nodemailer)
- Assignment owner per lead
- Follow-up reminder otomatis
- CSV/Excel export dari dashboard
- Lead conversion tracking (Lead → Organization → Training Batch)
- Honeypot field untuk anti-spam
- Rate limiting di endpoint publik
