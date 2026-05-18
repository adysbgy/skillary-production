# Lead CRM Hardening Notes

## 1. Anti-Spam Strategy

### Honeypot Field
- Field `_honeypot` ditambahkan sebagai hidden input di ContactForm
- Invisible (offscreen positioned) untuk pengguna manusia
- Bots yang mengisi field ini akan diterima dengan respons `201 OK` palsu, tetapi data TIDAK disimpan
- Tidak ada indikasi ke bot bahwa spam terdeteksi

### Message Quality Check
- Pesan yang mengandung lebih dari 3 URL (`http://` atau `https://`) ditolak secara diam-diam
- Validasi minimum: nama ≥ 2 karakter, pesan ≥ 10 karakter, email valid

### Rate Limiting
- Implementasi: in-memory Map di `src/lib/rate-limit.ts`
- Limit: **5 submissions per 10 menit** per IP address
- IP detection: `x-forwarded-for` → `x-real-ip` → fallback `"ip:unknown"`
- Response saat rate-limited: `429 Too Many Requests`
- Auto-cleanup expired entries setiap 60 detik
- **Limitation:** In-memory state hilang saat server restart dan tidak dibagi antar instance. Production harus menggunakan Redis/Upstash atau platform-level rate limiting.

### Max Length Enforcement
| Field | Max Length |
|:---|:---|
| name | 120 |
| email | 180 |
| whatsapp | 80 |
| organization | 180 |
| role | 120 |
| inquiryType | 80 |
| programInterest | 160 |
| sourcePage | 160 |
| message | 5000 |
| notes | 5000 |

### Limitations
- In-memory rate limit resets on server restart
- Production should use Redis/Upstash or platform-level rate limiting
- Tidak ada CAPTCHA (by design, untuk menghindari friction)
- Honeypot tidak efektif terhadap sophisticated bots

## 2. Email Notification

### Behavior
- Saat lead baru berhasil disimpan, notifikasi email dikirim secara **fire-and-forget**
- Kegagalan pengiriman email TIDAK memblokir respons ke pengguna
- Warning di-log server-side saja

### Required Environment Variables
| Variable | Required | Keterangan |
|:---|:---|:---|
| `RESEND_API_KEY` | Opsional | API key Resend. Jika tidak ada, notifikasi di-skip |
| `LEAD_NOTIFICATION_EMAIL` | Opsional | Email admin penerima notifikasi |
| `RESEND_FROM_EMAIL` | Opsional | Sender address (default: `Skillary CRM <onboarding@resend.dev>`) |
| `NEXT_PUBLIC_APP_URL` | Opsional | Base URL untuk link admin di email |

### Email Content
- Subject: `New Skillary Lead: [Inquiry Type] — [Organization/Name]`
- Body: tabel data lead + link "View in Lead CRM"
- Menggunakan library `resend` yang sudah terinstal di project

## 3. Lifecycle Timestamps

| Field | Diisi Otomatis Saat |
|:---|:---|
| `lastContactedAt` | Status diubah ke CONTACTED (pertama kali) |
| `proposalSentAt` | Status diubah ke PROPOSAL_SENT (pertama kali) |
| `wonAt` | Status diubah ke WON (pertama kali) |
| `lostAt` | Status diubah ke LOST (pertama kali) |
| `archivedAt` | Admin meng-archive lead |

Timestamps tidak dihapus jika status berubah kembali.

## 4. CSV Export

- Endpoint: `GET /api/admin/leads/export`
- Admin-only (dilindungi `requireAdminAPI`)
- Support filter: status, inquiryType, q, includeArchived
- Format: CSV dengan proper escaping (double-quote, newline)
- 17 kolom termasuk lifecycle timestamps
- Download otomatis sebagai `skillary-leads-export.csv`

## 5. Archive/Restore Policy

- Lead tidak pernah di-hard-delete
- Admin dapat meng-archive lead via tombol "Archive Lead" di halaman detail
- Lead yang di-archive tersembunyi dari list default
- Admin dapat menampilkan lead archived via checkbox "Archived" di filter
- Admin dapat me-restore lead via tombol "↩ Restore Lead"

## 6. Admin Summary & Analytics

### Summary Cards
Ditampilkan di bagian atas `/admin/leads`:
- New, Contacted, Proposal Needed, Proposal Sent, Won, Total Active

### Analytics Panels
Tiga panel di bawah summary cards:
- **By Inquiry Type** — breakdown semua tipe inquiry
- **Top Source Pages** — 5 halaman asal terbanyak
- **Top Programs** — 5 program interest terbanyak

## 7. Remaining Limitations

- In-memory rate limit resets on server restart
- Production should use Redis/platform rate limit
- Email notification requires `RESEND_API_KEY` + `LEAD_NOTIFICATION_EMAIL`
- No owner assignment per lead
- No follow-up reminder automation
- No CRM dashboard / pipeline visualization
- No lead conversion tracking to Organization/Training Batch
- No bulk actions (archive/status update multiple leads)
- No activity log / audit trail for status changes
