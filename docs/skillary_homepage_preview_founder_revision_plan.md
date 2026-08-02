# Skillary Homepage Preview — Founder Revision Plan

**Versi:** 1.0
**Tanggal:** 1 Agustus 2026
**Tujuan:** menghasilkan homepage dengan authority, density, dan decision flow setara referensi Maven, menggunakan identitas, aset, produk, dan bukti Skillary yang jujur.
**Status saat ini:** HP-S4 selesai; fase berikutnya HP-S5A.
**Batas:** route `/lp/homepage-preview`; homepage `/` dan payment tidak diubah.

## 1. Verdict master audit

Struktur preview saat ini benar, tetapi belum mencapai output final yang founder maksud. Kesenjangan utamanya bukan hero atau header lagi. Kesenjangannya adalah **kepadatan konten nyata, variasi visual below-fold, dan proof progression**.

Homepage lama sebenarnya sudah mempunyai banyak bahan internal. Kesalahan perencanaan sebelumnya adalah memperlakukan kebutuhan aset seolah semuanya harus dibuat baru. Revisi ini menetapkan **reuse-first**: inventaris internal diperiksa lebih dulu, baru membuat aset baru jika memang tidak ada padanannya.

Namun reuse tidak berarti menyalin semua isi homepage lama. Beberapa data lama secara eksplisit berstatus mock, placeholder, ilustratif, atau belum memiliki izin publikasi. Memindahkannya tanpa filter akan membuat halaman tampak penuh tetapi merusak kepercayaan.

## 2. Audit sumber internal Skillary

### 2.1 Aman digunakan sekarang

| Sumber | Penggunaan | Ketentuan |
|---|---|---|
| Dua hero di `public/images/homepage-preview/` | Hero individu dan organisasi | Tetap disebut sebagai visual brand ilustratif; tidak diberi nama/identitas |
| Foto AI-generated di `public/images/training/` | Visual konteks program tim, assessment, diskusi, reporting | Wajib caption `Ilustrasi ...`; tidak disebut dokumentasi kegiatan nyata |
| UI/product mockup yang dibangun sebagai komponen | Product proof, batch flow, assessment, report | Wajib label `Contoh tampilan`; gunakan data anonim dan non-kuantitatif |
| Shape, aurora, band, icon, dan dekorasi internal | Ritme section, background, card accent | Boleh diadaptasi ke design system preview |
| FAQ shell dan interaction native | FAQ preview | Copy harus diselaraskan dengan capability truth dan payment hold |
| 17 judul program di `PROGRAM_INDEX` | Kandidat katalog program | Hanya 4 item prioritas setelah route dan readiness dikonfirmasi |

### 2.2 Aman dengan label dan optimasi

| Sumber | Masalah | Keputusan |
|---|---|---|
| `thumb-powerbi.png`, `thumb-data.png`, `thumb-infographic.png`, `thumb-presentation.png` | Visual ilustratif dan masing-masing sekitar 680–813 KB | Boleh menjadi cover program setelah ditandai ilustratif dan dibuat derivative WebP yang ringan |
| Training atmosphere images | Terlihat seperti dokumentasi nyata tetapi registry menyatakan AI-generated | Pakai maksimal 2–3, selalu dengan caption ilustrasi yang terlihat |
| Dashboard/report mockup lama | Berisi nama, progress, jumlah atau file sintetis | Rebuild dengan label `Contoh tampilan`, nama anonim, dan angka yang jelas specimen atau tanpa angka |
| Portfolio/product specimen | Bentuknya berguna sebagai proof visual | Tampilkan sebagai contoh mekanisme, bukan hasil customer atau learner nyata |

### 2.3 Perlu approval sebelum tampil

| Sumber | Gate minimum |
|---|---|
| Logo organisasi di `public/images/logos/` | Izin publikasi, wording hubungan, owner, approvedAt dan reviewAfter |
| Arsip program organisasi | Proof URL tervalidasi, hubungan dijelaskan akurat, izin, approval homepage |
| Foto orang nyata | Hak foto, consent, konteks, owner dan approval |
| Trainer/faculty dari database | `PUBLISHED`, consent, photo rights, portrait, experience/evidence dan allowlist |
| Testimonial nyata | Identitas atau anonimisasi disetujui, sumber kutipan, izin dan ruang lingkup klaim |
| Statistik/outcome | Definisi metrik, sumber, periode, exclusion data demo dan approval |

### 2.4 Ditolak dari homepage preview

| Sumber | Alasan |
|---|---|
| Aset foto, logo, copy, screenshot, dan source export Maven | Hak milik pihak ketiga; hanya referensi struktur dan kualitas |
| `v2-events.ts` | Dinyatakan mock/illustrative dan tanggal sudah lewat |
| `v2-trainers.ts` | Dinyatakan placeholder dengan nama dan statistik contoh |
| Testimoni Alya/Raka/Dina dan testimonial wall lama | Tidak memiliki provenance/consent yang tercatat |
| Nama peserta, organisasi `Nusantara Corp`, progress, dan sertifikat lama | Data demonstrasi yang dapat disalahartikan sebagai bukti nyata |
| `cert-mockup.png` | Menampilkan identitas, penerbit, nama, dan credential fiktif yang bukan Skillary |
| Angka seperti `+120 sertifikat` | Tidak mempunyai pemisahan data real/demo dan evidence terverifikasi |

## 3. Target hasil visual

Target bukan clone piksel Maven. Targetnya adalah halaman Skillary yang memberi kesan sama kuat melalui pola keputusan berikut:

```text
Header dua tingkat + search
→ hero dua profesional
→ pilih Individu / Organisasi
→ Belajar / Praktik / Buktikan
→ pilih tujuan
→ marketplace Program / Workshop / Jalur Belajar
→ bukti mekanisme produk
→ galeri artefak
→ alur organisasi
→ hal yang dapat ditinjau HR/L&D
→ FAQ
→ CTA ganda
→ footer lengkap
```

Karakter visual yang dikunci:

- warm white, navy gelap, dan primary `rgb(255,138,0)`;
- dua figur kuat pada first viewport;
- pergantian light/dark band agar halaman panjang tetap hidup;
- density tinggi pada area katalog, bukan pada hero;
- kombinasi editorial cards, product UI, gallery, tabs, dan process steps;
- serif/display accent hanya bila membantu editorial authority; body tetap sangat terbaca;
- animasi halus, bukan marquee testimonial sintetis;
- mobile menggunakan stack/rail yang jelas, bukan versi desktop yang dikecilkan.

## 4. Susunan homepage final

| No. | Band | Konten final minimum | Visual internal |
|---:|---|---|---|
| 1 | Header | Logo, search, Program, Events & Workshop, Jalur Belajar, Organisasi, Masuk | Preview header yang sudah selesai |
| 2 | Hero | H1, body, 2 CTA, dua profesional | Hero original yang sudah selesai |
| 3 | Audience split | Individu dan organisasi | Dua editorial cards |
| 4 | Learning system | Belajar, Praktik, Buktikan | Icon/process rail |
| 5 | Goal discovery | 4 goal cards | Grid ringan |
| 6 | Marketplace | 4 program prioritas, workshop empty/verified, path verified | Optimized internal program thumbnails |
| 7 | Product proof | Project, assessment, credential | Rebuilt UI specimens, bukan data demo lama |
| 8 | Artifact gallery | Brief, rubric/feedback, verification | Product mockup berlabel `Contoh tampilan` |
| 9 | Organization journey | Pahami, rancang, jalankan, tinjau | Maksimal 2 training illustration + UI report |
| 10 | Inspectable outcomes | Participation, progress, assessment, credential/report | Sanitized UI mockups tanpa klaim angka |
| 11 | FAQ | Maksimal 6 jawaban faktual | Native disclosure |
| 12 | Closing split | Individu dan organisasi | Dual card CTA |
| 13 | Footer | Product, organization, proof, legal/contact | Footer preview final |

Faculty, logo wall, testimonial, metric, dan case study tetap conditional. Kehadirannya tidak boleh menjadi syarat agar layout terlihat lengkap.

## 5. Copy direction

### Positioning utama

`Platform belajar dan training untuk membangun skill kerja, mempraktikkannya, lalu menunjukkan hasilnya.`

### Hero

- Eyebrow: `BELAJAR. PRAKTIK. BUKTIKAN.`
- H1: `Bangun skill kerja yang relevan—lalu tunjukkan hasil belajarnya.`
- Body: `Temukan program, workshop, jalur belajar, dan program tim yang menghubungkan materi dengan praktik, assessment sesuai kriteria, sertifikasi, dan ringkasan hasil.`
- CTA individu: `Jelajahi Program & Workshop`
- CTA organisasi: `Rancang Program untuk Tim`

### Events & Workshop

- Navigation: `Events & Workshop`
- Section/tab: `Events & Workshop`
- Empty state: `Jadwal workshop berikutnya sedang disiapkan.`
- Supporting copy: `Tanyakan topik atau jadwal berikutnya kepada tim Skillary.`
- CTA: `Tanyakan Jadwal Workshop`

### Aturan copy

- Hindari `terbaik`, `terbukti`, `dipercaya`, `ratusan`, atau klaim hasil tanpa sumber.
- Jangan menjanjikan project, certificate, portfolio, atau report untuk semua program bila capability-nya berbeda.
- Jangan gunakan `webinar berbayar rutin` selama jadwal dan payment masih hold.
- Bedakan `Contoh tampilan`, `Ilustrasi`, `Pendaftaran minat`, dan bukti nyata secara eksplisit.
- CTA transaksi diganti discovery/contact sampai payment aktif.

## 6. Fase eksekusi revisi

### HP-S5A — Internal Asset & Content Reconciliation

**Tujuan:** mengaktifkan semua bahan internal yang aman sebelum membuat visual baru.

Pekerjaan:

1. buat manifest aset internal dengan field `origin`, `isIllustrative`, `allowedUse`, `label`, `approvedForPreview`;
2. pilih empat program prioritas dari tujuh program yang memiliki detail lengkap;
3. verifikasi destination route untuk keempat program;
4. buat derivative WebP dari cover program terpilih dan pertahankan file sumber;
5. daftarkan program dalam registry preview dengan source dan review date;
6. tetapkan workshop tetap empty sampai record nyata lolos;
7. identifikasi komponen UI lama yang dapat direbuild sebagai specimen anonim;
8. jangan menambah section visual baru di luar scope reconciliation.

Default empat program:

- Power BI Business Dashboard;
- Data-Driven Decision Making;
- AI Productivity for Teams;
- Business Presentation & Reporting.

**Gate:** empat card mempunyai route valid, source traceable, cover ringan, label benar, tidak ada mock event/trainer/testimonial/stat, dan registry tidak lagi kosong untuk program.

### HP-S5B — Truthful Proof & Visual Density

**Tujuan:** menutup gap visual terbesar terhadap Maven dengan proof milik Skillary.

Pekerjaan:

1. bangun tiga product proof views;
2. bangun tiga artifact specimens;
3. sanitasi semua nama, organisasi, ID, nilai, dan progress contoh;
4. gunakan maksimal dua training illustrations dengan caption terlihat;
5. tambah variasi card/rail tanpa testimonial sintetis;
6. audit section rhythm light/dark dan whitespace.

**Gate:** halaman terasa kaya tanpa satu pun social proof palsu; setiap specimen berlabel; tidak ada konten Maven.

### HP-S6 — Organization & Closing

Pekerjaan:

1. implementasikan journey organisasi;
2. tampilkan apa yang dapat ditinjau HR/L&D;
3. susun FAQ faktual;
4. finalisasi dual CTA dan footer;
5. audit semua destination link.

**Gate:** 13 core bands lengkap dan jalur individu/organisasi selesai dari header sampai footer.

### HP-S7 — Responsive, Accessibility & Motion

Pekerjaan:

- uji 320, 390, 768, 844 landscape, 1024 dan 1440;
- pastikan target interaksi minimal 44 px;
- audit focus order, tabs, drawer, search, FAQ dan anchor;
- reduced motion dan no-JS fallback;
- optimasi LCP, CLS, image loading dan below-fold lazy loading.

**Gate:** tidak ada overflow, konten tetap terbaca tanpa JavaScript, dan semua interaction penting dapat digunakan keyboard.

### HP-S8 — Final Audit & Maven Parity

Pekerjaan:

- bandingkan screenshot Maven dan Skillary pada viewport yang sama;
- nilai hierarchy, density, cadence, card variety, proof progression, responsive reflow dan polish;
- jalankan claim scan dan asset provenance scan;
- lakukan satu batch perbaikan dan satu confirmation pass.

**Gate:** zero critical fail; perbedaan dari Maven adalah keputusan brand/evidence yang disengaja.

### HP-S9 — Founder Review

Founder menerima:

- URL preview;
- screenshot desktop dan mobile;
- perbandingan reference / preview / homepage lama;
- daftar reused, rebuilt, conditional, dan rejected assets;
- daftar keputusan yang masih menunggu bukti eksternal.

HP-S10 promosi ke `/` tetap membutuhkan approval terpisah.

## 7. Definition of Done yang dapat dinilai founder

- First viewport langsung menunjukkan dua audiens dan dua figur.
- Events & Workshop terlihat di header dan marketplace.
- Minimal empat program asli Skillary tampil dan dapat dibuka.
- Workshop tidak memalsukan jadwal.
- Below-fold mempunyai visual richness setara marketplace profesional.
- Training illustrations tidak disajikan sebagai dokumentasi nyata.
- Tidak ada fake trainer, fake testimonial, fake company, fake certificate, atau fake metric.
- Semua visual Maven tetap di luar application assets.
- Brand orange menggunakan `rgb(255,138,0)` dan tidak memakai token lama.
- Mobile bukan sekadar versi desktop yang diperkecil.
- Homepage `/` belum berubah sampai founder menyetujui preview.

## 8. Keputusan PM final

Jangan mengulang hero dan jangan membuat aset baru dulu. Fase yang paling tepat berikutnya adalah **HP-S5A**, karena aset internal yang relevan memang sudah tersedia. Setelah empat program dan manifest aset lolos gate, baru lanjut ke HP-S5B untuk memperkaya visual proof. Ini menjaga hasil cepat terlihat, tetap aman, dan setiap `continue` mempunyai keluaran yang jelas.
