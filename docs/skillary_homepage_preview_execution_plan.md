# Skillary Homepage Preview — Master Execution Plan

**Versi:** 1.2 — staged sprint execution + Maven parity gates
**Tanggal revisi:** 1 Agustus 2026
**Status:** **HP-S0 COMPLETE — HP-S1 BELUM DIOTORISASI**
**Current checkpoint:** Founder review setelah `HP-S0 — Reference Lock, Baseline & Contracts`
**Next sprint:** `HP-S1 — Content & Data Contract`
**Owner keputusan:** Founder / Product Owner
**Owner eksekusi:** Senior Product Engineer + Product Design
**Route target:** `/lp/homepage-preview`
**Homepage aktif:** `/` — **tidak disentuh selama fase preview**
**Status pembayaran:** **HOLD**
**Referensi:** homepage Maven Analytics, halaman Live Workshops, halaman plan, halaman business, screenshot header workshop yang diberikan founder, dan snapshot lokal `saveweb2zip-com-mavenanalytics-io`

---

## 1. Keputusan Eksekutif

Homepage baru dikerjakan sebagai rangkaian sprint bernama. **Satu perintah hanya mengotorisasi satu sprint**, lalu pekerjaan wajib berhenti pada gate sprint tersebut. Model ini menggantikan perintah v1.1 yang menjalankan Fase 0–9 sekaligus.

Perintah yang telah diotorisasi founder untuk sprint pertama:

```text
EKSEKUSI HOMEPAGE PREVIEW — PLAN docs/skillary_homepage_preview_execution_plan.md v1.2 — SPRINT HP-S0 SAJA — STOP SETELAH GATE HP-S0 — JANGAN UBAH / — JANGAN BUAT UI
```

Otorisasi `HP-S0` berarti:

- hanya melakukan audit read-only dan menambah dokumentasi/reference evidence;
- mengunci referensi Maven Analytics, referensi Live Workshops, dan screenshot marketplace Maven sebagai tiga sumber berbeda;
- mengunci `13 core bands + 4 conditional inserts`, route truth, evidence rules, dan batas anti-copy;
- tidak membuat route, component, CSS, loader, aset hero, dependency, migration, atau DB write;
- mempertahankan payment pada kondisi hold;
- berhenti setelah laporan dan gate `HP-S0`; tidak melanjutkan `HP-S1` otomatis.

Setiap sprint berikutnya membutuhkan perintah eksplisit dengan nama sprint. Tidak ada izin untuk memasang dependency baru, mengubah data produksi, membersihkan worktree, atau memperbaiki route existing di luar feature preview.

Promosi ke homepage aktif membutuhkan perintah terpisah:

```text
PROMOSIKAN HOMEPAGE PREVIEW KE /
```

### 1.1 Urutan authority

Jika dokumen bertentangan, urutan sumber kebenaran adalah:

1. `AGENTS.md` dan instruksi project identity;
2. `PRODUCT.md` untuk product truth, audiens, brand commitments, payment hold, dan evidence policy;
3. dokumen v1.2 ini untuk scope homepage preview;
4. `skillary_master_project_management.md`;
5. `skillary_development_execution_plan.md`;
6. dokumen lama hanya sebagai historical evidence atau anti-reference.

`homepage_2_0_*`, `landing_page_content_alignment_skillary.md`, dan `skillary_reorientation_audit.md` tidak boleh mengalahkan source of truth di atas atau dianggap sebagai approval visual homepage baru.

---

## 2. Verdict Audit Planning Sebelumnya

Planning sebelumnya sudah kuat pada arah produk, daftar section, preview terisolasi, dan guardrail klaim. Namun planning tersebut baru sekitar **75% execution-ready** karena belum mengunci:

1. urutan fase dan dependency;
2. hasil wajib serta syarat lulus setiap fase;
3. keputusan default ketika data atau izin belum tersedia;
4. kontrak copy, header, hero, dan urutan section;
5. pemisahan fase preview dan fase promosi;
6. aturan rollback;
7. matriks data sumber dan fallback;
8. target responsive, accessibility, dan performance;
9. pemeriksaan akhir untuk false claim dan expired event;
10. batas legal antara adaptasi berkualitas tinggi dan penyalinan identitas Maven.

Dokumen ini menutup semua gap tersebut. Setelah dokumen disetujui, founder cukup memberikan perintah eksekusi di atas.

### 2.1 Hasil dual audit terhadap draf 1.0

Draf 1.0 diuji secara independen dari dua sudut:

- audit produk/UX menemukan header terlalu padat, proof ladder terlalu panjang untuk evidence yang tersedia, terminologi belum konsisten, dan sebagian interaction contract belum terkunci;
- audit teknis/data menemukan `/events` belum aman menjadi destination, provenance data belum dapat ditegakkan hanya dengan status `PUBLISHED`, pasangan warna CTA belum aman, serta QA dan rollback belum mempunyai perintah/manifest yang cukup spesifik.

Versi 1.2 memperbaikinya dengan:

- empat kelompok discovery saja di header;
- navigation preview berbasis in-page anchors untuk menghindari route existing yang belum aman;
- 13 core bands dan empat conditional inserts sehingga ritme proof Maven tetap terasa tanpa klaim palsu;
- reference lock bertanggal dan Maven-to-Skillary parity contract;
- staged sprint execution dengan checkpoint founder setelah setiap gate;
- capability-truth matrix;
- per-section execution contract;
- allowlist evidence feature-local;
- interaction state contract;
- exact QA command matrix, asset-copy scan, dan file ownership manifest;
- aturan kontras, caching, noindex assertion, dan rollback yang dapat dieksekusi.

---

## 3. Sasaran Homepage

Homepage harus membuat pengunjung memahami dalam satu viewport bahwa Skillary melayani dua kelompok:

- **Individu:** menemukan kelas, workshop, learning path, praktik, assessment, sertifikasi, dan portfolio.
- **Organisasi:** menyusun program, menjalankan batch, melihat progress, mengukur hasil, dan menerima laporan.

### 3.1 Hasil bisnis yang diharapkan

- Individu melanjutkan ke katalog, detail kelas/workshop, learning path, atau pendaftaran minat.
- HR/L&D melanjutkan ke halaman organisasi atau kontak konsultasi.
- Pengunjung memahami hubungan `Belajar → Praktik → Buktikan`.
- Semua janji marketing mempunyai dukungan produk atau evidence yang jelas.

### 3.2 Target UX

- Dua audiens terbaca tanpa perlu scroll.
- `Events & Workshop` terlihat langsung di header desktop dan drawer mobile.
- CTA utama dan CTA organisasi tidak saling berebut hierarki.
- Halaman terasa kaya dan meyakinkan seperti Maven, tetapi tetap hangat, lokal, dan jelas sebagai Skillary.
- Konten utama tetap terbaca ketika JavaScript gagal atau dimatikan.

### 3.3 Target pengukuran setelah produksi

Analytics baru diaktifkan setelah preview disetujui dan tidak boleh mengandung data personal sensitif.

| Event | Tujuan |
|---|---|
| `homepage_primary_cta_click` | Mengukur minat individu |
| `homepage_business_cta_click` | Mengukur minat organisasi |
| `homepage_workshop_view` | Mengukur ketertarikan Events & Workshop |
| `homepage_catalog_tab_change` | Mengukur format belajar yang diminati |
| `homepage_program_card_click` | Mengukur program yang dipilih |
| `homepage_contact_start` | Mengukur awal lead organisasi |

Tidak ada target angka palsu yang ditampilkan ke pengguna. Baseline conversion dikumpulkan setelah halaman dipromosikan.

---

## 4. Audit Mendalam Maven: Yang Sebenarnya Membuat Homepage-nya Kuat

### 4.1 Maven bukan sekadar landing page panjang

Homepage Maven bekerja sebagai peta seluruh ekosistem produk. Urutannya membangun keyakinan secara bertahap:

```text
Janji utama
→ pilih jalur individu atau organisasi
→ pahami metode belajar
→ pilih tujuan
→ lihat isi katalog
→ lihat hasil karya
→ lihat manusia di balik pembelajaran
→ lihat bukti skala dan organisasi
→ jawab keraguan
→ pilih CTA akhir
```

Skillary harus mengadaptasi logika tersebut. Yang disalin bukan aset atau susunan piksel, melainkan **urutan keputusan pengunjung**.

### 4.2 Dua jalur konversi diulang secara konsisten

Maven tidak hanya menyebut B2B satu kali. Jalur bisnis muncul di navigation, hero, audience split, goal-based path, section bisnis, case study, dan closing CTA. Pengulangan ini membuat pengunjung organisasi tidak merasa berada di situs yang hanya dibuat untuk individu.

Adaptasi Skillary:

| Titik halaman | Jalur individu | Jalur organisasi |
|---|---|---|
| Header | Jelajahi program/workshop | Untuk Organisasi |
| Hero | Jelajahi Program & Workshop | Rancang Program untuk Tim |
| Audience split | Bangun skill kerja | Bangun kapabilitas tim |
| Learning goal | Karier, skill, sertifikasi | Upskill tim |
| Product proof | Project, assessment, credential | Batch, progress, reporting |
| Closing CTA | Mulai dari program yang relevan | Diskusikan kebutuhan organisasi |

### 4.3 Maven memakai “proof ladder”

Tingkat pembuktian pada homepage Maven bergerak dari risiko rendah ke risiko tinggi:

1. manfaat produk;
2. katalog nyata;
3. project nyata;
4. learner story;
5. instructor;
6. statistik;
7. logo perusahaan;
8. case study dengan metrik.

Skillary belum mempunyai semua evidence pada tingkat 4–8. Karena itu, homepage Skillary tidak boleh memaksakan urutan Maven dengan data fiktif. Versi awal menggunakan:

- program dan route yang benar-benar tersedia;
- product proof berlabel `Contoh tampilan`;
- credential offering berstatus `Pendaftaran minat`;
- faculty hanya jika terverifikasi dan berizin;
- empty state yang jujur untuk event;
- logo, testimoni, statistik, dan case study hanya setelah evidence gate lulus.

### 4.4 Workshop adalah lapisan retensi dan relevansi

Pada model Maven, workshop bukan sekadar daftar event. Workshop mengisi kebutuhan yang tidak diselesaikan course self-paced:

- topik baru dan cepat berubah;
- sesi singkat 60–120 menit;
- interaksi langsung dengan expert;
- praktik atau deliverable yang bisa langsung digunakan;
- rekaman on-demand untuk member berbayar.

Implikasi untuk Skillary:

- `Events & Workshop` harus menjadi format belajar utama, bukan submenu tersembunyi;
- setiap workshop kelak harus mempunyai topik, level, durasi, hasil nyata, host terverifikasi, tanggal, status kursi, dan format;
- selama payment hold dan jadwal belum valid, CTA adalah `Daftar minat` atau `Lihat detail`, bukan checkout;
- halaman tidak boleh menampilkan event kedaluwarsa sebagai mendatang.

### 4.5 Model bisnis Maven dan bagian yang relevan untuk Skillary

Maven menggunakan beberapa lapisan:

| Lapisan Maven | Fungsi bisnis | Adaptasi Skillary sekarang |
|---|---|---|
| Starter gratis | Acquisition dan product sampling | Katalog, resource, sample/product proof, pendaftaran minat |
| Pro subscription | Akses course, path, assessment, workshop, credential | Belum dipasarkan sampai model dan payment siap |
| Lifetime | Cash conversion jangka panjang | Tidak masuk scope homepage sekarang |
| Small Teams | Seat-based team plan | Program tim dan batch, melalui konsultasi |
| Enterprise | Custom training, reporting, skills gap | Solusi organisasi, melalui discovery call |
| Portfolio/showcase | Retention, community, viral proof | Portfolio/capstone terverifikasi |
| Workshops | Recency, engagement, expert access | Events & Workshop sebagai lead dan delivery layer |

Skillary boleh mengadaptasi funnel dan product loop tersebut, tetapi tidak boleh menjual subscription, lifetime, atau checkout sebelum produk, operasi, dan payment gate siap.

### 4.6 Pola UI/UX Maven yang layak diadaptasi

- hero tiga kolom dengan figur manusia di kiri dan kanan;
- headline besar dan CTA ganda di pusat perhatian;
- pergantian light/dark section untuk menjaga ritme halaman panjang;
- audience cards yang memisahkan B2C/B2B;
- goal-based navigation sebelum katalog;
- katalog bertab untuk mengurangi card overload;
- rail/carousel untuk portfolio dan proof di layar kecil;
- faculty sebagai wajah dan sumber kepercayaan;
- FAQ sebelum CTA akhir;
- CTA individu dan organisasi di akhir halaman.

### 4.7 Pola Maven yang tidak boleh diwarisi

Snapshot HTML menunjukkan konsekuensi export visual builder yang harus dihindari:

- markup responsif terduplikasi;
- banyak heading utama terduplikasi;
- elemen non-semantik dibuat focusable;
- banyak gambar dekoratif tanpa strategi alt yang jelas;
- motion tidak mempunyai reduced-motion fallback yang memadai;
- sebagian besar gambar tidak lazy-loaded;
- tracker dan link autentikasi pihak lain tertanam di export;
- bundle asset sangat besar dan sulit dipelihara.

Skillary akan dibangun native menggunakan Server Components, semantic HTML, satu DOM responsif, aset original, dan komponen kecil.

### 4.8 Batas high-fidelity adaptation

Yang boleh diadaptasi:

- arsitektur informasi;
- urutan keputusan;
- proporsi hero;
- ritme section;
- pola tab, card, rail, FAQ, dan dual CTA;
- tingkat kualitas, kedalaman, dan responsive behavior.

Yang tidak boleh disalin:

- logo, nama, copy, foto, ilustrasi, video, icon, testimonial, statistik, company logo, course cover, project screenshot, dan case study Maven;
- export HTML/CSS/JavaScript;
- warna khas, motif, dan detail dekorasi yang membuat halaman tampak sebagai produk Maven;
- klaim atau business proof yang bukan milik Skillary.

Target visual adalah **setara dalam kualitas dan logika, berbeda dalam identitas dan evidence**.

---

## 5. Keputusan Desain yang Dikunci

### 5.1 Mode dan karakter

- Mode: **Persuade**.
- Karakter: hangat, profesional, optimistis, manusiawi, evidence-led.
- Bukan dashboard teknis dan bukan katalog yang padat sejak viewport pertama.
- Visual harus terasa premium tanpa menjadi terlalu korporat atau steril.

### 5.2 Palet

| Token | Nilai | Penggunaan |
|---|---|---|
| Primary | `rgb(255,138,0)` | CTA, highlight, focus accent |
| Ink | `#0D101C` | Header gelap dan headline |
| Warm white | `#FFF9F2` | Background utama |
| Surface | `#FFFDF9` | Card dan panel |
| Border | `#EADFD3` | Divider dan card border |
| Coral accent | `#FF5A5F` | Aksen terbatas, bukan warna utama |

Warna success, warning, dan danger tetap memakai warna semantik dan tidak menggunakan brand gradient.

Pasangan kontras yang dikunci:

- tombol orange memakai teks Ink, bukan teks putih;
- teks putih hanya dipakai pada Ink atau surface gelap yang lolos kontras;
- orange tidak dipakai sebagai satu-satunya penanda focus;
- focus ring memakai kombinasi outline terang/gelap yang tetap terlihat pada Ink, warm white, dan orange;
- threshold QA: 4,5:1 untuk teks normal, 3:1 untuk teks besar dan batas komponen UI.

### 5.3 Typography

- Body, display, dan UI memakai Plus Jakarta Sans yang sudah tersedia pada root.
- Tidak menambah display font kedua pada preview v1 agar keputusan typography dan performance benar-benar terkunci.
- Headline desktop target 64–72 px, tablet 48–56 px, mobile 38–44 px.
- Body hero maksimum 18–20 px dan lebar teks dibatasi agar mudah dipindai.
- Hanya satu `<h1>`.

### 5.4 Layout

- Content width utama: 1.200 px.
- Hero width: maksimum 1.400 px.
- Desktop hero: sekitar `25% figur / 50% copy / 25% figur`.
- Section spacing desktop: 96–120 px; mobile: 64–80 px.
- Radius card utama: 16–24 px agar menjadi ciri Skillary, tidak mengikuti radius Maven secara literal.
- Divider dan motif memakai bentuk original Skillary berbasis garis alur/progress, bukan wave Maven.

### 5.5 Signature visual Skillary: `Jejak Bukti`

Visual tidak berhenti pada “orange + rounded cards”. Motif original yang dikunci adalah **Jejak Bukti**:

- sebuah garis tipis yang dimulai dari node bulat `Belajar`, melewati checkpoint kotak `Praktik`, dan berakhir pada seal `Bukti`;
- digunakan sebagai section marker, divider, dan detail product-proof; tidak diulang sebagai dekorasi pada setiap card;
- capability bubbles memakai artefak Skillary—lembar project, checklist assessment, credential seal, dan ringkasan progress—bukan logo software;
- dark section memakai grid bukti yang sangat halus seperti papan kerja, bukan gradient aurora atau wave Maven;
- card proof mempunyai satu `evidence notch` kecil sebagai penanda status `Contoh`, `Terverifikasi`, atau `Segera hadir`.

Motif ini harus tetap terbaca sebagai sistem “belajar sampai bukti”, bahkan ketika warna orange dihilangkan.

### 5.6 Motion

- Entrance ringan hanya untuk dekorasi; konten tidak bergantung pada animasi.
- Hover lift maksimum 4 px.
- Durasi utama 180–280 ms.
- Tidak ada autoplay video berat.
- Semua motion mempunyai `prefers-reduced-motion` fallback.

### 5.7 Surface rhythm

| Urutan | Surface | Peran emosional |
|---|---|---|
| Header + Hero | Ink header di atas warm-white hero | Fokus, percaya diri, manusiawi |
| Pilih jalur | Warm white dengan dua card kontras | Mengurangi kebingungan |
| Sistem Skillary | Ink proof-board | Menjelaskan mekanisme dan memberi peak visual pertama |
| Jalur + Program | Surface terang | Membantu memilih tanpa tekanan |
| Bukti produk | Ink dengan artefak UI nyata | Peak kepercayaan utama |
| Artifact Gallery | Surface terang dengan specimen berlabel | Membuat proof dapat diperiksa, bukan hanya diklaim |
| Organisasi | Orange-led panel dengan Ink text | Menghangatkan jalur konsultasi tanpa klaim berlebihan |
| Inspection taxonomy | Ink proof-board | Menggantikan statistik yang belum terverifikasi dengan transparansi |
| FAQ + Closing | Warm white lalu Ink closing | Menenangkan objection dan menutup dengan keputusan jelas |

Conditional inserts mengikuti surface section di sekitarnya agar tidak menciptakan band kosong atau pergantian warna tanpa fungsi.

---

## 6. Header Final

Header menggabungkan kebutuhan founder dari screenshot workshop dengan ritme Maven Analytics, tetapi membatasi setiap kelompok menjadi maksimum empat pilihan. Destination utama preview memakai anchor pada halaman yang sama agar tidak mengirim pengguna ke katalog existing yang datanya belum aman.

### 6.1 Desktop

Baris utility — empat keputusan:

```text
Skillary | Cari | Untuk Organisasi | Masuk | Jelajahi Program
```

Baris discovery — empat kelompok:

```text
Program | Events & Workshop | Jalur Belajar | Explore ▾
```

Isi `Explore`:

```text
Sertifikasi | Portfolio | Faculty | Materi Gratis
```

Baris utility scroll normal; baris discovery menjadi sticky. Dengan demikian header tidak memakan dua baris permanen pada viewport pendek dan `Events & Workshop` tetap mudah ditemukan saat scroll.

### 6.2 Mobile

Closed state:

```text
Skillary | Events | Menu
```

`Events` menjadi shortcut langsung ke section workshop. Drawer dikelompokkan agar tidak menjadi daftar sepuluh pilihan tanpa struktur:

```text
Belajar: Program · Events & Workshop · Jalur Belajar
Bukti: Sertifikasi · Portfolio · Faculty
Lainnya: Materi Gratis · Untuk Organisasi · Masuk
Action: Jelajahi Program
```

### 6.3 Terminologi yang dikunci

| Konsep | Label publik |
|---|---|
| Course/program discovery | Program |
| Live/short-form sessions | Events & Workshop |
| Learning path | Jalur Belajar |
| Credentials | Sertifikasi |
| Learner/project proof | Portfolio |
| Trainer/instructor | Faculty |
| Downloadable/free content | Materi Gratis |

Istilah Inggris yang dipertahankan adalah nama format yang sudah menjadi bagian ekosistem Skillary. Copy penjelasan tetap memakai bahasa Indonesia yang natural.

### 6.4 Destination contract preview

| Label/aksi | Target preview v1 | Alasan |
|---|---|---|
| Program | `#program` | Menghindari konflik katalog individu dan organisasi |
| Events & Workshop | `#workshop` | Tidak menuju `/events` yang masih memakai data mock/expired |
| Jalur Belajar | `#jalur-belajar` | Preview hanya menampilkan path yang lolos allowlist |
| Jelajahi Program | `#program` | Primary conversion tetap di preview |
| Sertifikasi | `/certifications` | Route tersedia; offering ditulis sebagai pendaftaran minat |
| Portfolio | `/portofolio` | Route marketing existing; hanya dibuka dari disclosure |
| Faculty | `/trainers` | Route existing; preview cards tetap evidence-gated |
| Materi Gratis | `/resources` | Route existing |
| Untuk Organisasi | `/untuk-organisasi` | Jalur B2B existing |
| Masuk | `/login` | Auth route existing |

Card program individual yang lolos kurasi menuju `/program/[id]`; program organisasi menuju `/programs/[slug]`; jalur belajar menuju `/path/[slug]`. Tidak ada link ke `/events` pada preview v1. Perbaikan halaman `/events` adalah scope terpisah.

### 6.5 Search contract

Search tetap tampil sejak HP-S3 dan selalu mempunyai fungsi minimum:

- indeks statis: section homepage dan destination aman pada tabel di atas;
- indeks dinamis tambahan: item program/path yang lolos allowlist;
- state: idle, loading, result, no result, dan dynamic-source unavailable;
- ketika data dinamis gagal, destination statis tetap dapat dicari;
- `Escape` menutup, tombol `Bersihkan` menghapus query, fokus kembali ke trigger;
- hasil diumumkan melalui live region yang tidak mengganggu;
- tidak ada tracking isi query pada preview.

### 6.6 Aturan header

- Background Ink dengan blur ringan dan focus ring berkontras tinggi.
- Tidak ada announcement bar sampai ada event terkonfirmasi; default **tidak tampil**.
- Semua touch target minimal 44×44 px.
- Drawer memakai dialog semantics, membuat background inert, mendukung Escape, focus trap, dan focus return.
- Anchor section mempunyai scroll margin agar heading tidak tertutup sticky row.
- Tidak ada mega-menu kosong, dead link, atau label “segera hadir” tanpa next action.

---

## 7. Hero Final dengan Dua Orang

### 7.1 Komposisi

- Figur kiri: profesional/pembelajar Indonesia.
- Figur kanan: HR/L&D atau team leader Indonesia.
- Copy berada di tengah.
- Masing-masing figur dikelilingi capability bubbles original Skillary.

Bubble figur individu:

```text
Kelas · Project · Assessment · Sertifikasi
```

Bubble figur organisasi:

```text
Skill Gap · Program Tim · Progress · Laporan
```

### 7.2 Copy default yang dikunci

**Eyebrow**

```text
BELAJAR. PRAKTIK. BUKTIKAN.
```

**H1**

```text
Bangun skill kerja yang relevan—lalu tunjukkan hasil belajarnya.
```

**Body**

```text
Temukan program, workshop, jalur belajar, dan program tim yang menghubungkan pembelajaran dengan praktik, assessment sesuai kriteria, sertifikasi, dan ringkasan hasil.
```

**CTA utama**

```text
Jelajahi Program & Workshop
```

**CTA sekunder**

```text
Rancang Program untuk Tim
```

**Audience reassurance non-kuantitatif**

```text
Mulai sebagai individu atau rancang pembelajaran untuk tim Anda.
```

### 7.3 Aturan aset hero

- Default eksekusi memakai dua cutout terkoordinasi dari satu art direction original: satu figur individu dan satu figur HR/L&D. Keduanya dapat diposisikan ulang secara independen pada desktop dan mobile.
- Figur tidak boleh menyerupai orang nyata yang dapat diidentifikasi atau dipresentasikan sebagai trainer/peserta Skillary.
- Tidak memakai foto, tool logo, atau bubble Maven.
- Aset mempunyai dimensi stabil dan background transparan. Hanya kandidat yang terbukti menjadi LCP pada pengukuran yang diberi prioritas; aset lain tidak dipreload tanpa bukti.
- Kedua figur bersifat dekoratif karena makna audiens sudah berada di copy; capability bubbles tetap berupa teks HTML agar dapat dibaca, di-zoom, dan disembunyikan secara responsif.
- Jika founder memberikan foto berizin sebelum eksekusi, aset dapat diganti tanpa mengubah layout.

### 7.4 Responsive hero

- Desktop: dua figur mengapit copy.
- Tablet: copy di atas, kedua figur berdampingan di bawah.
- Mobile: copy tetap pertama; kedua figur overlap ringan di bawah CTA tanpa menutupi teks atau kontrol.
- Pada tinggi viewport pendek, dekorasi diperkecil sebelum copy atau CTA dikorbankan.

---

## 8. Blueprint Section Final

Preview v1 memakai **13 core bands**. Empat proof section tambahan hanya disisipkan jika evidence gate lulus. Dua core substitute baru menjaga kedalaman proof tetap setara secara fungsi ketika logo, testimonial, faculty, statistik, atau case study belum siap.

### 8.1 Core composition v1

| No. | Section core | Heading default | Maksimum konten | Layout dan CTA |
|---:|---|---|---:|---|
| 1 | Header | — | 4 kelompok discovery | Contract pada Bab 6 |
| 2 | Hero dua figur | `Bangun skill kerja yang relevan—lalu tunjukkan hasil belajarnya.` | 2 CTA | 25/50/25 desktop; stacked mobile |
| 3 | Pilih jalur | `Mulai dari tujuan Anda.` | 2 audience cards | Individu → `#program`; organisasi → `/untuk-organisasi` |
| 4 | Sistem Skillary | `Belajar tidak berhenti di materi.` | 3 langkah universal | Belajar · Praktik · Tunjukkan Bukti |
| 5 | Jalur berdasarkan tujuan | `Pilih jalur yang paling relevan.` | 4 goal cards | Karier · Skill baru · Sertifikasi · Tim |
| 6 | Program + Workshop | `Temukan format belajar yang sesuai.` | 3 tab, 4 cards/tab | Program · Events & Workshop · Jalur Belajar |
| 7 | Bukti produk | `Lihat bagaimana hasil belajar dibangun.` | 3 product views | Project · Assessment · Sertifikasi; label evidence wajib |
| 8 | Evidence Artifact Gallery | `Periksa bentuk bukti yang akan dibangun.` | 3 artifact views | Project brief · Rubric/feedback · Verifikasi sertifikat; semua specimen berlabel `Contoh tampilan` |
| 9 | Untuk Organisasi | `Dari kebutuhan tim hingga ringkasan hasil.` | 4 steps | Pahami · Rancang · Jalankan · Tinjau; memuat Engagement Walkthrough dan CTA `/untuk-organisasi` |
| 10 | What Organizations Can Inspect | `Apa yang dapat ditinjau organisasi?` | 4 inspection groups | Participation · Progress · Assessment · Credential/reporting; non-kuantitatif sampai evidence lulus |
| 11 | FAQ | `Pertanyaan sebelum Anda mulai.` | 6 items | Native disclosure; link contact |
| 12 | Dual closing CTA | `Pilih langkah berikutnya.` | 2 audience cards | Individu `#program`; organisasi `/contact` |
| 13 | Footer | — | 4 link groups | Belajar · Bukti · Organisasi · Legal |

`Evidence Artifact Gallery` memuat Evidence Ledger `task → feedback → assessment → credential → portfolio`. `Sistem Skillary` memuat Delivery Standards minimum: host/facilitator, level, durasi, output, dan assessment disclosure. Keduanya adalah proof substitute yang jujur, bukan social proof sintetis.

### 8.2 Conditional inserts

| Insert | Posisi | Syarat tampil | Jika syarat gagal |
|---|---|---|---|
| Trust proof | Setelah Sistem Skillary | Minimal satu proof approved dan wording relasi jelas | Tidak dirender |
| Faculty | Setelah Bukti produk | Minimal dua profile approved, consent dan photo rights lengkap | Tidak dirender |
| Outcome proof | Setelah Faculty/Bukti produk | Testimonial atau metric approved | Tidak dirender |
| Case study | Setelah Untuk Organisasi | Challenge, intervention, result, evidence, dan izin lengkap | Tidak dirender |

Conditional insert tidak diganti dengan placeholder visual, sektor anonim, quote sintetis, atau statistik nol. Composition langsung menyambung ke section core berikutnya.

### 8.3 Prinsip kepadatan

- Maksimum empat pilihan utama dalam satu decision point di area konten.
- Kategori tambahan ditempatkan pada tab, filter, atau link `Lihat semua`.
- Setiap section memiliki satu pekerjaan utama dan satu CTA dominan.
- Section conditional tidak meninggalkan ruang kosong jika disembunyikan.
- Satu screen mobile tidak menampilkan dua CTA primer sekaligus kecuali hero dan closing split.

### 8.4 Events & Workshop state contract

Jika tidak ada jadwal valid:

```text
Jadwal workshop berikutnya sedang disiapkan.
Hubungi tim Skillary untuk menanyakan topik atau jadwal berikutnya.
```

CTA:

```text
Tanyakan Jadwal Workshop
```

Target CTA adalah `/contact`, bukan `/events` dan bukan checkout. Preview v1 tidak membuat form waitlist baru. Tidak ada tanggal, status kursi, countdown, harga, atau nama host fiktif.

`#workshop` adalah destination nyata. Dengan JavaScript, hash mengaktifkan panel `Events & Workshop`, memindahkan fokus ke heading panel, dan mempertahankan URL. Tanpa JavaScript, Program, Events & Workshop, dan Jalur Belajar tetap server-rendered berurutan sehingga browser anchor normal tetap mencapai subsection workshop. Bare empty card tanpa konteks tidak memenuhi contract.

Jika suatu hari event lolos gate, card wajib berisi: stable ID, judul, timezone `Asia/Jakarta`, waktu mulai dan selesai, durasi, level, hasil sesi, host approved, registration state, kapasitas bila terverifikasi, dan `reviewedAt`. Event dianggap selesai ketika waktu selesai telah lewat, bukan berdasarkan label manual.

### 8.5 Interaction contract per section

| Komponen | Keyboard dan state | Fallback tanpa JavaScript |
|---|---|---|
| Search | Escape, clear, focus return, live result count; idle/loading/result/empty/unavailable | Destination statis tetap berupa link |
| Tabs | Arrow Left/Right, Home/End, manual activation, focus visible | Tiga kelompok konten tampil berurutan dengan heading |
| Card rail | Tombol sebelumnya/berikutnya berlabel, disabled state, swipe cue | Grid/overflow tetap dapat discroll |
| Drawer | Dialog semantics, inert background, Escape, focus trap/return | Link penting tetap berada pada server-rendered header fallback |
| FAQ | Native summary/detail; state terbaca screen reader | Berfungsi native |
| Anchor navigation | Scroll margin, focus dipindah secara aman bila diperlukan | Browser anchor normal |

Tidak ada interest form di homepage v1, sehingga privacy, duplicate submission, dan retry form tetap menjadi tanggung jawab flow `/contact` existing, bukan diimitasi pada preview.

---

## 9. Content dan Evidence Gates

### 9.1 Capability-truth matrix

Brand promise tidak otomatis berarti setiap capability sudah siap dipasarkan. HP-S0 menguji status berikut; copy hanya boleh memakai kata pada kolom aman.

| Capability | Bukti minimum | Copy aman sebelum gate lulus | Copy setelah gate lulus |
|---|---|---|---|
| Belajar | Course/module published dan dapat dibuka | `Belajar melalui program terstruktur` | Sama |
| Praktik | Tugas/project nyata dapat diselesaikan | `Contoh praktik dan project tersedia pada program tertentu` | `Praktikkan skill melalui project` |
| Assessment | Scoring server-side, answer key aman, attempt/feedback test lulus | `Assessment sesuai struktur program` | `Ukur pemahaman melalui assessment` |
| Bukti/portfolio | Item nyata, owner/permission/proof link approved | `Tunjukkan contoh hasil belajar` | `Bangun bukti karya yang dapat dibagikan` |
| Sertifikasi | Eligibility dan public verification lulus | `Sertifikasi tersedia sesuai kriteria program` | `Dapatkan sertifikat yang dapat diverifikasi` |
| Progress | Data real, bukan illustrative rows | `Pantau penyelesaian program` | `Pantau progress peserta` |
| Laporan | Report real, field definition dan demo exclusion jelas | `Ringkasan hasil sesuai data program` | `Tinjau laporan hasil program` |
| Dampak/ROI | Baseline, methodology, result, dan izin case study | Tidak disebut | Hanya wording yang didukung evidence |

`Buktikan` pada brand berarti membangun evidence belajar—project, assessment, atau credential yang memenuhi kriteria—bukan jaminan kompetensi, karier, ROI, atau hasil organisasi.

### 9.2 Matriks kesiapan

| Konten | Kondisi saat audit | Keputusan preview |
|---|---|---|
| Brand dan value proposition | Ready | Tampilkan |
| Navigation destinations | Listing existing memiliki makna/data berbeda | Gunakan anchor dan safe-route contract Bab 6 |
| Program organisasi | Ada sumber statis, berpotensi duplikasi | Gunakan satu adapter canonical |
| Course individual | Ada pada Prisma; status saja tidak membuktikan readiness | Hanya stable ID pada homepage allowlist + `PUBLISHED` |
| Learning path | Ada sumber Prisma dan contoh statis | Hanya stable ID pada allowlist dan published |
| Events/workshops | Dataset sekarang mock dan tanggal sudah lewat | Jangan tampilkan sebagai jadwal; gunakan empty state |
| Trainer/faculty | Loader existing baru berfokus pada status; izin/foto belum lengkap | Require status, consent, photo rights, portrait, dan allowlist |
| Credential | Satu offering berbasis minat; issuance tetap gated | Tampilkan sebagai `Pendaftaran minat` dan `sesuai kriteria` |
| Certificate count | Demo dan real belum terpisah pasti | Jangan tampilkan angka |
| Portfolio | Arsip ada; proof belum seluruhnya diverifikasi | Gunakan product proof atau item approved saja |
| Client logo | Asset ada; izin belum tercatat | Hidden |
| Testimonial | Hardcoded/ilustratif | Hidden |
| Success metric | Belum terverifikasi | Hidden |
| Case study | Belum memenuhi evidence checklist | Hidden |
| Dashboard/certificate screenshot | Ada | Tampilkan dengan label `Contoh tampilan`; capability wording tetap mengikuti matriks |

### 9.3 Homepage allowlist dan provenance registry

Status `PUBLISHED` tidak cukup. Feature preview mempunyai registry explicit yang dikunci oleh stable record ID, bukan prefix nama atau tebakan slug.

Field minimum:

```text
recordType
recordId
source
approvedForHomepage
isDemo
claimScope
permissionStatus
approvedBy
approvedAt
reviewAfter
notes
```

Aturan:

- `approvedForHomepage=true` dan `isDemo=false` wajib untuk item dinamis;
- event additionally require time/status/host validation;
- faculty additionally require consent, photo rights, portrait, dan published date;
- item melewati `reviewAfter` kembali menjadi hidden sampai direview;
- registry feature-local tidak mengubah database produksi;
- penambahan item registry adalah content approval, bukan sekadar code change.

### 9.4 Tiga state wajib

Setiap sumber dinamis mempunyai tiga state:

1. **Confirmed:** evidence dan data memenuhi syarat, section tampil normal.
2. **Empty:** sumber sehat tetapi belum ada item; tampilkan empty state yang membantu.
3. **Unavailable:** sumber gagal; section fail-soft, tidak menjatuhkan homepage.

### 9.5 Aturan publikasi proof

Logo, nama, foto, kutipan, angka, atau case study baru boleh tampil jika mempunyai:

- sumber yang dapat ditelusuri;
- izin publikasi;
- owner internal;
- tanggal review;
- status approved for homepage;
- wording yang tidak melebih-lebihkan hubungan atau hasil.

### 9.6 Payment hold

- Tidak ada `Bayar`, `Beli Sekarang`, atau CTA checkout.
- Paid offering memakai `Daftar minat`, `Lihat detail`, atau `Hubungi kami`.
- Free registration hanya boleh dipakai jika alurnya benar-benar berfungsi.
- Status payment dibaca dari server dan tetap fail-closed.

---

## 10. Arsitektur Preview yang Dikunci

### 10.1 Route dan isolasi

```text
/lp/homepage-preview
```

Alasan:

- prefix `/lp` sudah menyembunyikan global marketing header/footer;
- existing homepage tidak perlu diubah;
- tidak perlu mengubah global CSS atau konfigurasi routing;
- rollback dapat dilakukan dengan menghapus feature dan route baru;
- preview dapat diberi `noindex, nofollow`.

### 10.2 Struktur file target

```text
src/app/(standalone)/lp/homepage-preview/
├── layout.tsx
├── page.tsx
├── loading.tsx
└── error.tsx

src/features/marketing/homepage-preview/
├── HomepagePreview.tsx
├── HomepagePreview.module.css
├── components/
├── sections/
├── data/
│   ├── get-homepage-preview-data.ts
│   ├── homepage-preview-contract.ts
│   └── types.ts
└── assets/
```

### 10.3 Rendering

- `page.tsx` dan komponen utama tetap Server Components.
- Client Components hanya untuk mobile menu, search, tab yang memerlukan state, dan `error.tsx` minimal sebagaimana diwajibkan Next.js.
- FAQ menggunakan native `<details>/<summary>`.
- Mobile rails memakai CSS scroll-snap.
- Tidak ada satu Client Component raksasa.
- Root layout sudah mempunyai landmark utama; preview tidak membuat nested `<main>`.

### 10.4 Data loading

- Satu loader server mengembalikan kontrak presentasi yang kecil.
- Sumber independen dijalankan paralel.
- Kegagalan database tidak menggagalkan seluruh homepage.
- Preview tidak mengandalkan data runtime untuk berhasil di-build.
- Segment memakai Node runtime karena Prisma, `dynamic = "force-dynamic"`, dan tidak diprerender dengan data database saat build.
- Loader memakai `Promise.allSettled`, fallback terpisah, dan batas waktu presentasi; kegagalan satu sumber tidak menahan seluruh response.
- Semua CTA mengikuti destination contract Bab 6, bukan sekadar route yang memberi HTTP 200.
- Tidak ada write ke database dari loader homepage.

### 10.5 Robots dan cache assertion

- Metadata preview menghasilkan robots `noindex, nofollow` dan tidak mewarisi index/follow root.
- Preview tidak dimasukkan ke sitemap.
- Tidak ada analytics atau conversion tracking pada route preview.
- `nocache` pada robots tidak dianggap sebagai HTTP cache control; route `force-dynamic` dan response header diverifikasi terpisah.
- Fase promosi mempunyai metadata sendiri dan tidak mengimpor metadata preview.

### 10.6 CSS dan aset

- Gunakan CSS Module yang scope-nya hanya untuk preview.
- Jangan menambah aturan preview ke `globals.css`.
- Gunakan `next/image`, static import, ukuran eksplisit, dan `sizes` yang tepat.
- Hanya aset hero yang diprioritaskan; below-fold tetap lazy.
- Jangan memasukkan file dari snapshot Maven ke project.
- Total aset hero awal ditargetkan ≤450 KB pada viewport desktop yang diuji; format dan kualitas dipilih berdasarkan visual QA.
- Client JavaScript tambahan untuk preview ditargetkan ≤80 KB gzip di luar shared runtime; penambahan di atas budget harus dijelaskan.

### 10.7 Change ownership dan rollback

HP-S0 membuat `docs/skillary_homepage_preview_change_manifest.md` yang mencatat:

- file baru milik preview;
- file existing yang harus disentuh beserta alasannya;
- baseline status setiap file sebelum edit;
- verification command yang relevan;
- rollback action per file.

Rollback hanya boleh:

- menghapus file baru yang tercatat pada manifest; atau
- membalik hunk/commit khusus preview yang diketahui dengan tepat.

Rollback tidak boleh memakai reset, checkout massal, penghapusan directory luas, atau menghapus perubahan pengguna yang sudah ada.

---

## 11. Fase Eksekusi

Eksekusi memakai namespace `HP-S*` agar tidak bertabrakan dengan sprint global pada project plan lain. Setiap sprint berhenti pada gate-nya dan menunggu otorisasi founder untuk sprint berikutnya. Jika proof eksternal belum siap, core substitute tetap menjaga ritme halaman; conditional insert tetap hidden.

### HP-S0 — Reference Lock, Baseline & Contracts — **COMPLETE**

**Tujuan:** mengunci sumber kebenaran, struktur Maven→Skillary, route/destination, evidence, dan batas perubahan sebelum satu baris UI ditulis.

**Pekerjaan:**

- fingerprint branch, HEAD, dirty-worktree baseline, serta SHA protected files sebelum/sesudah;
- verifikasi payment hold, route preview belum ada, dan shell `/lp` memang terisolasi;
- baca panduan Next.js 16 lokal tentang project structure, route groups, robots, dan sitemap;
- kunci tiga referensi terpisah: homepage Maven Analytics, Live Workshops, dan screenshot marketplace Maven dari founder;
- fingerprint snapshot lokal dan tandai `third_party_reference_only`, `do_not_ship`, `do_not_import_assets`, serta `do_not_copy_code_or_copywriting`;
- petakan peran Maven menjadi 13 core + 4 conditional Skillary, termasuk layout archetype, density, surface, CTA role, mobile transformation, interaction, proof rule, dan intentional difference;
- kunci `#workshop` activation/focus/no-JS contract;
- validasi destination dari source route dan redirect aktual, bukan dokumen route lama;
- buat evidence readiness dan minimum catalog threshold: kurang dari tiga approved reachable program/path records wajib berlabel `Preview/Prototype`;
- buat keputusan `GO/NO-GO HP-S1`, lalu stop.

**Output:**

- [`skillary_homepage_preview_change_manifest.md`](./skillary_homepage_preview_change_manifest.md)
- [`skillary_homepage_preview_sprint_0_report.md`](./skillary_homepage_preview_sprint_0_report.md)
- [`Maven reference lock`](./references/maven-analytics/2026-08-01/LOCK.md)

**Gate lulus:** plan v1.2 ter-hash; seluruh reference band mempunyai keputusan adaptasi/analogue/omission; 13 core + 4 conditional terkunci; route dan evidence truth tercatat; protected files identik terhadap baseline; tidak ada P0 terbuka; pekerjaan berhenti sebelum UI.

**Rollback:** hanya artefak dokumentasi/reference HP-S0 yang baru. Tidak ada implementation file yang dimiliki sprint ini.

### HP-S1 — Content & Data Contract

**Tujuan:** mencegah mock atau data tidak terverifikasi masuk ke UI.

**Pekerjaan:**

- buat tipe data homepage;
- buat loader server dan provenance per sumber;
- implementasikan `confirmed`, `empty`, dan `unavailable` state;
- jangan import dataset event existing; preview v1 memakai empty state sampai registry memiliki event approved;
- filter course/path/faculty dengan status publikasi **dan** explicit allowlist;
- tetapkan feature gate untuk logo, testimonial, metrics, dan case study;
- implementasikan destination contract Bab 6 dan search state contract.

**Output:** data contract, loader, feature gates, safe empty states.

**Gate lulus:** tidak ada import data placeholder; expired event tidak dapat muncul sebagai upcoming; preview tetap render saat database gagal.

**Rollback:** hapus folder data feature preview.

### HP-S2 — Isolated Route & Structural Skeleton

**Tujuan:** membuat permukaan preview yang benar-benar terisolasi.

**Pekerjaan:**

- buat `/lp/homepage-preview`;
- tambahkan metadata `noindex, nofollow` dan assertion output-level;
- buat header/footer khusus preview;
- buat skip link dan landmark yang valid;
- buat token lokal dan section primitives;
- bangun wireframe composition 13 core bands pada desktop/mobile dan surface rhythm Bab 5 sebelum polishing aset;
- setiap band wajib mempunyai reference ID atau label `original Skillary composition`, surface, grid/ratio, density, card/media anatomy, token assignment, responsive reflow, interaction, dan intentional difference;
- siapkan loading state dan `error.tsx` minimal Client Component yang tetap on-brand.

**Output:** route 200, shell desktop/mobile, composition wireframe, design foundation.

**Gate lulus:** tidak ada header/footer ganda; tidak ada nested `<main>`; rendered robots benar; preview tidak ada di sitemap; desktop/mobile blueprint seluruh 13 core lengkap dan mendapat Blueprint Gate; homepage aktif tidak berubah.

**Rollback:** hapus route dan feature shell baru.

### HP-S3 — First Viewport

**Tujuan:** mengunci kesan pertama dan dua jalur audiens.

**Pekerjaan:**

- implementasikan utility row + sticky discovery row desktop dan drawer mobile;
- implementasikan search minimum dari contract HP-S1;
- buat aset hero dua profesional original;
- buat contact sheet kandidat, provenance, crop test desktop/tablet/mobile, accessibility fit, dan byte/LCP forecast sebelum memilih pasangan aset;
- implementasikan layout 25/50/25;
- tambahkan copy dan CTA yang telah dikunci;
- tambahkan capability bubbles;
- optimasi LCP dan rasio gambar.

**Output:** first viewport desktop, tablet, dan mobile.

**Gate lulus:** dua audiens terbaca; `Events & Workshop` terlihat; CTA tidak tertutup; aset original; satu H1; tidak ada layout shift yang terlihat; Hero Gate menyetujui satu pasangan aset.

**Rollback:** hapus aset dan section first viewport feature-local.

### HP-S4 — Discovery, Programs & Workshops

**Tujuan:** membawa pengunjung dari minat ke pilihan produk.

**Pekerjaan:**

- dua audience cards;
- tiga elemen universal: Belajar, Praktik, Tunjukkan Bukti;
- jalur berdasarkan tujuan;
- katalog bertab tiga format;
- subsection Events & Workshop yang dapat dituju `#workshop`, dengan hash activation/focus/no-JS contract;
- verified schedule state dan designed empty state dengan CTA `/contact`;
- CTA ke anchor atau detail record yang lolos allowlist.

**Output:** alur discovery individu dan organisasi sampai katalog.

**Gate lulus:** tidak ada decision point dengan pilihan berlebihan; semua card/link dapat digunakan keyboard; empty state event tidak menipu.

**Rollback:** section bersifat independen dan dapat dinonaktifkan melalui composition.

### HP-S5 — Truthful Proof System

**Tujuan:** menunjukkan hasil dan mekanisme bukti tanpa klaim palsu.

**Pekerjaan:**

- product proof berlabel;
- Evidence Artifact Gallery berlabel `Contoh tampilan`;
- Evidence Ledger `task → feedback → assessment → credential → portfolio`;
- Delivery Standards untuk host/facilitator, level, durasi, output, dan assessment disclosure;
- project/portfolio approved jika tersedia;
- assessment dan credential flow dengan wording sesuai capability-truth matrix;
- faculty approved jika tersedia;
- testimonial/statistik/logo tetap off kecuali gate evidence lulus.

**Output:** proof stack yang dapat dipertanggungjawabkan.

**Gate lulus:** setiap bukti mempunyai source/label; tidak ada nama, angka, foto, quote, atau endorsement fiktif.

**Rollback:** matikan section conditional tanpa mengubah layout utama.

### HP-S6 — Organization & Closing

**Tujuan:** menyelesaikan jalur organisasi dan penutup halaman.

**Pekerjaan:**

- section organisasi: pahami, rancang, jalankan, tinjau;
- jelaskan Engagement Walkthrough, deliverable, dan batas laporan tanpa membuat klaim ROI;
- buat `What Organizations Can Inspect` untuk participation, progress, assessment, credential, dan reporting taxonomy tanpa angka sintetis;
- case study hanya jika evidence lengkap;
- FAQ native;
- closing CTA individu dan organisasi;
- footer dan legal links.

**Output:** conversion path B2B lengkap dan penutup halaman.

**Gate lulus:** CTA organisasi menuju alur kontak yang nyata; tidak ada janji ROI/SLA tanpa bukti; footer tidak mengandung dead link; Full-page Composition Gate menyetujui cadence 13 core sebelum hardening.

**Rollback:** section dapat dilepas tanpa mengganggu route atau data layer.

### HP-S7 — Responsive, Motion & Accessibility

**Tujuan:** memastikan kualitas lintas perangkat dan input.

**Pekerjaan:**

- mobile menu: Escape, focus trap, focus return, `aria-expanded`;
- search dengan semua state pada Bab 6;
- tabs dengan Arrow Left/Right, Home/End, manual activation, dan fallback tanpa JavaScript;
- scroll-snap rails dengan kontrol serta swipe cue;
- reduced-motion;
- focus states, alt strategy, contrast, zoom 200%;
- uji `320×568`, `390×844`, `844×390` landscape, `768×1024`, `1024×768`, dan `1440×900`;
- uji sticky header pada viewport dengan tinggi pendek.

**Output:** experience yang stabil pada desktop, tablet, dan mobile.

**Gate lulus:** tidak ada horizontal overflow; target minimal 44×44 px; urutan fokus logis; konten tetap dapat dibaca tanpa JavaScript.

**Rollback:** client islands dapat dilepas dan konten fallback tetap tersedia.

### HP-S8 — QA & Maven Parity Review

**Tujuan:** membuat preview siap dinilai, bukan sekadar terlihat selesai.

**Pekerjaan:**

- jalankan command matrix pada Bab 13.6;
- jalankan deterministic UI detector pada TSX/markup feature yang berubah, bukan dokumen Markdown;
- audit link, heading, landmark, image, dan bundle;
- claim scan untuk event, logo, testimoni, metrics, dan payment CTA;
- anti-copy scan untuk identifier dan exact asset hash dari snapshot Maven;
- production-like performance run tiga kali pada profil yang sama dan gunakan median;
- screenshot desktop dan mobile dalam satu pass;
- capture Maven reference dan Skillary preview berdampingan pada viewport yang sama;
- nilai `meets / intentional Skillary deviation / fails` untuk first-viewport authority, hierarchy, density, section pacing, light/dark cadence, card variety, proof progression, responsive reflow, interaction completeness, visual finish, dan brand independence;
- perbaikan temuan dalam satu batch dan satu pass konfirmasi.

**Output:** QA report, screenshot comparison, daftar temuan tertutup.

**Gate lulus:** seluruh Definition of Done pada Bab 13 terpenuhi; zero `fails` pada Final Parity Gate; setiap deviation didokumentasikan sebagai translasi Skillary yang disengaja.

**Rollback:** preview tetap terisolasi; jika build risk muncul, route feature dapat dilepas tanpa mengubah `/`.

### HP-S9 — Founder Review

**Tujuan:** membuat hasil mudah dinilai dan direvisi.

**Pekerjaan:**

- serahkan URL preview;
- serahkan screenshot desktop/mobile;
- serahkan perbandingan tiga layar pada viewport yang sama: Maven reference → Skillary preview → homepage aktif;
- daftar section aktif, empty, dan hidden;
- catat keputusan yang menunggu proof eksternal;
- berhenti dan menunggu keputusan founder.

**Output:** preview siap approve atau revise.

**Gate lulus:** founder dapat membandingkan Maven reference, `/lp/homepage-preview`, dan `/`; homepage aktif masih utuh.

**Rollback:** hapus preview feature atau biarkan sebagai noindex experiment.

### HP-S10 — Promotion, terpisah

**Trigger:** hanya perintah `PROMOSIKAN HOMEPAGE PREVIEW KE /`.

**Pekerjaan:**

- promosikan composition stabil ke `/`;
- ganti metadata preview dengan metadata produksi;
- lepaskan noindex pada versi produksi;
- pastikan sitemap/canonical benar;
- jalankan regression penuh pada marketing shell;
- buat promotion diff yang terisolasi dan simpan rollback point tanpa menimpa worktree pengguna;
- buktikan metadata noindex preview tidak ikut ke `/`.

HP-S10 **tidak** dijalankan oleh perintah eksekusi preview.

---

## 12. Dependency Map

```text
HP-S0 Reference Lock
  ↓
STOP / Founder checkpoint
  ↓
HP-S1 Content & Data Contract
  ↓
HP-S2 Structural Skeleton → Blueprint Gate
  ↓
HP-S3 First Viewport → Hero Gate
  ↓
HP-S4 Discovery & Workshops
  ↓
HP-S5 Truthful Proof
  ↓
HP-S6 Organization & Closing → Full-page Composition Gate
  ↓
HP-S7 Responsive, Motion & Accessibility
  ↓
HP-S8 QA & Maven Parity → Final Parity Gate
  ↓
HP-S9 Founder Review

HP-S10 hanya setelah approval founder terpisah.
```

Dependency eksternal seperti izin logo, testimonial, foto, dan case study tidak menghentikan HP-S1–HP-S9. Core substitute tetap tampil; conditional insert tetap hidden sampai evidence tersedia.

---

## 13. Definition of Done Preview

### 13.0 Definition of Done HP-S0

- [x] Perubahan hanya mengenai plan, change manifest, sprint report, dan reference evidence HP-S0.
- [x] Homepage aktif dan protected implementation files identik terhadap baseline HP-S0.
- [x] Reference lock dan Maven→Skillary parity contract lengkap.
- [x] Route, CTA, canonical/redirect, payment, dan evidence truth tercatat.
- [x] Historical homepage documents tidak dipakai sebagai source of truth.
- [x] Tidak ada source code atau asset Maven yang diimpor ke application/public source.
- [x] `HP-S1` mempunyai verdict terukur dan tidak dijalankan otomatis.
- [x] Founder checkpoint dikirim setelah sprint berhenti.

### 13.1 Product truth

- [ ] Payment tetap hold dan tidak ada checkout CTA.
- [ ] Tidak ada event kedaluwarsa yang ditampilkan sebagai upcoming.
- [ ] Tidak ada mock person, progress, testimonial, statistik, logo endorsement, atau credential recipient.
- [ ] Semua proof mempunyai source, izin, atau label `Contoh tampilan`.
- [ ] Capability copy mematuhi matrix Bab 9.
- [ ] Semua CTA mematuhi destination contract; tidak ada preview CTA ke `/events`.
- [ ] Item dinamis harus lolos explicit homepage allowlist.

### 13.2 Visual dan UX

- [ ] Hero mempunyai dua figur original dan dua jalur audiens.
- [ ] `Events & Workshop` terlihat di header.
- [ ] Hierarki CTA individu dan organisasi jelas.
- [ ] Semua 13 core bands tampil; conditional insert hanya muncul jika gate lulus.
- [ ] Visual terasa Skillary, bukan skin dari Maven.
- [ ] Motif `Jejak Bukti` terbaca sebagai identitas sistem, bukan dekorasi generik.
- [ ] Desktop, tablet, dan mobile mempunyai komposisi yang disengaja.
- [ ] Setiap core band mempunyai reference ID atau label `original Skillary composition` dan intentional difference.
- [ ] Same-breakpoint comparison Maven→Skillary menghasilkan zero `fails`; deviation yang disengaja terdokumentasi.

### 13.3 Accessibility

- [ ] Hanya satu H1.
- [ ] Tidak ada nested main landmark.
- [ ] Keyboard navigation lengkap dan focus visible.
- [ ] Touch target minimal 44×44 px.
- [ ] Contrast memenuhi WCAG AA.
- [ ] CTA orange memakai Ink text; pasangan warna dan focus ring diuji pada setiap state.
- [ ] Reduced-motion tidak menghilangkan informasi.
- [ ] Alt text membedakan gambar informatif dan dekoratif.
- [ ] Zoom 200% tidak memotong konten penting.

### 13.4 Performance

- [ ] Tidak ada horizontal overflow pada 320 px.
- [ ] Tidak ada image-driven layout shift yang terlihat.
- [ ] Hero cutouts mempunyai dimensi stabil dan hanya aset yang terbukti perlu yang diprioritaskan.
- [ ] Below-fold images lazy-load.
- [ ] Median tiga lab runs pada production build: LCP ≤ 2,5 detik, CLS ≤ 0,1, TBT ≤ 200 ms.
- [ ] INP ≤ 200 ms diperlakukan sebagai target p75 setelah traffic produksi atau scripted interaction measurement, bukan diklaim dari static load.
- [ ] Total hero assets ≤450 KB pada desktop test viewport dan client-JS delta ≤80 KB gzip, atau deviasi dijelaskan.
- [ ] Tidak ada video autoplay berat atau asset Maven yang ikut terbawa.

### 13.5 Engineering

- [ ] `/lp/homepage-preview` memberi HTTP 200.
- [ ] `/` tidak berubah.
- [ ] Preview `noindex, nofollow` dan tidak masuk sitemap.
- [ ] Rendered robots output diverifikasi; metadata preview tidak dipakai oleh `/`.
- [ ] Tidak ada header/footer ganda.
- [ ] Server-first architecture dipertahankan.
- [ ] Feature tidak mengimpor landing page lama atau source placeholder.
- [ ] Typecheck, scoped lint, production build, dan core quality gate lulus.
- [ ] Detector dan visual QA selesai dalam pass yang dibatasi.
- [ ] Change manifest lengkap dan rollback hanya menyentuh file/hunk milik preview.
- [ ] Identifier/hash scan dan human review memastikan tidak ada aset/source Maven yang disalin.

### 13.6 Exact verification command matrix

Command dijalankan satu per satu dari project root; tidak dipasang testing framework atau dependency baru.

| Gate | Command / metode |
|---|---|
| TypeScript | `npm exec tsc -- --noEmit` |
| Scoped lint | `npm exec eslint -- 'src/app/(standalone)/lp/homepage-preview' 'src/features/marketing/homepage-preview'` |
| Production build | `npm run build` |
| Existing core gate | `npm run quality:gate:core` |
| UI detector | Jalankan sekali pada setiap changed TSX/markup file di route **dan** feature preview; jangan menjalankan detector pada Markdown |
| Forbidden identifiers | `rg -n -i 'mavenanalytics|framerusercontent|mavenshowcase|authenticator\.mavenanalytics|rewardful|googletagmanager|cognito|appsync' 'src/app/(standalone)/lp/homepage-preview' 'src/features/marketing/homepage-preview'` |
| Exact asset-copy check | `HP-S8` lebih dulu membuat dan self-test `scripts/security/check-homepage-preview-asset-provenance.mjs`; script **belum tersedia pada HP-S0** dan tidak boleh diklaim lulus sebelumnya |
| Route/robots | Production server pada port tetap yang dicatat di QA report, readiness check, HTTP 200, robots meta, sitemap absence, header ownership, `/` regression, lalu cleanup proses |
| Accessibility | Browser/screen-reader combination dan evidence template dicatat; keyboard-only, semantics, 200% zoom, reduced motion, dan JS-disabled state diuji |
| Responsive | Screenshot Maven dan Skillary pada enam viewport HP-S7; satu batch fix; satu confirmation pass; nama file dan evidence directory dicatat |
| Performance | HP-S8 memverifikasi tool tanpa install; fixed device/network/cache profile, tiga run pada URL produksi-lokal yang sama, median LCP/CLS/TBT, asset dan JS budget |

Script asset provenance hanya membandingkan hash aset preview dengan snapshot referensi dan memeriksa source provenance; script tidak menyalin, mengubah, atau menghapus file referensi.

---

## 14. Risk Register

| Risiko | Dampak | Probabilitas | Mitigasi |
|---|---|---:|---|
| Terlalu mirip Maven | Legal/brand confusion | Sedang | Aset, copy, motif, warna, icon, dan implementation original |
| Worktree existing sangat berubah | Konflik/regression | Tinggi | Additive files, route terisolasi, baseline dan scoped verification |
| Data workshop kedaluwarsa | False advertising | Tinggi | Filter tanggal dan default empty state |
| Logo/testimoni tanpa izin | Legal/trust | Tinggi | Feature gate off sampai proof approved |
| Database tidak tersedia | Preview gagal render | Sedang | Fail-soft loader dan build-safe fallback |
| Header terlalu padat | Cognitive overload | Rendah–sedang | Empat kelompok discovery, grouped drawer, Events shortcut mobile |
| Hero terlalu berat | LCP buruk | Sedang | Dua coordinated cutouts, static dimensions, byte budget, selective priority |
| Payment tidak sengaja aktif | Financial/security | Rendah–sedang | Server-side hold, no checkout CTA, claim scan |
| Route tujuan tidak konsisten | Dead-end | Sedang | In-page anchors + locked safe destination contract |
| Page terlalu panjang | Drop-off | Rendah–sedang | 13 core bands dengan variasi density; proof eksternal tetap conditional |

---

## 15. Default Keputusan Jika Founder Tidak Memberi Aset Tambahan

Semua default berikut dianggap disetujui ketika perintah eksekusi diberikan:

1. Hero memakai dua figur profesional fiktif original, bukan foto trainer atau peserta nyata.
2. Header memakai utility row + sticky discovery row desktop dan grouped drawer mobile.
3. Copy hero memakai versi pada Bab 7.
4. Logo organisasi, testimonial, statistik, dan case study tidak ditampilkan.
5. Workshop tanpa jadwal terkonfirmasi memakai empty state dan CTA `/contact`; tidak ada link `/events`.
6. Faculty tanpa consent/foto/readiness tidak ditampilkan.
7. Product screenshots diberi label `Contoh tampilan`.
8. Tidak ada CTA pembelian; destination hanya anchor, detail aman, atau konsultasi selama payment hold.
9. Preview tidak masuk index mesin pencari.
10. Homepage aktif tidak berubah sampai perintah promosi terpisah.

Dengan default ini, setiap sprint dapat berjalan sampai gate sprint-nya tanpa pertanyaan tambahan, tetapi tetap tidak boleh melanjutkan ke sprint berikutnya secara otomatis.

---

## 16. Perintah Kerja Setelah Dokumen Ini

### Menjalankan sprint berikutnya saja

```text
EKSEKUSI HOMEPAGE PREVIEW — PLAN docs/skillary_homepage_preview_execution_plan.md v1.2 — SPRINT HP-S1 SAJA — STOP SETELAH GATE HP-S1 — JANGAN UBAH /
```

### Meminta revisi setelah melihat preview

```text
REVISI HOMEPAGE PREVIEW: [tuliskan perubahan yang diinginkan]
```

### Mengganti homepage aktif setelah final approval

```text
PROMOSIKAN HOMEPAGE PREVIEW KE /
```

---

## 17. Approval Record

| Item | Status |
|---|---|
| Planning | v1.2 aktif; staged sprint execution terkunci |
| Audit independen | Selesai — parity, evidence, dan execution-gate findings diintegrasikan |
| HP-S0 | **Selesai; berhenti pada founder checkpoint** |
| HP-S1 | Belum diotorisasi |
| HP-S2–HP-S9 | Belum diotorisasi |
| HP-S10 / promotion | Belum diotorisasi |
| Payment | Hold |
| Homepage aktif | Tetap existing |
