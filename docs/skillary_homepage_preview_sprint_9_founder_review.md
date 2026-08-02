# Skillary Homepage Preview — HP-S9 Founder Review

**Tanggal:** 1 Agustus 2026
**Route yang dinilai:** `/lp/homepage-preview`
**Homepage aktif:** `/` tetap memakai `StartupLanding` dan tidak diubah
**Verdict:** **APPROVE WITH CONDITIONS — HOLD PROMOTION**
**Batas fase:** HP-S10 tidak dijalankan; payment tetap HOLD

Method: dual-agent (A: `/root/hp_s9_design_review` · B: `/root/hp_s9_evidence_review`)

## Keputusan eksekutif

Preview sudah memenuhi arah utama founder: first viewport mempunyai dua figur, struktur dan cadence terasa dekat dengan Maven Analytics, `Events & Workshop` terlihat, dua audiens terlayani, dan seluruh isi yang tampak sudah diterjemahkan ke produk serta brand Skillary. Ini bukan salinan aset, nama, trainer, testimonial, atau klaim Maven.

Namun preview belum direkomendasikan untuk langsung menggantikan `/`. Dua kondisi wajib perlu ditutup sebelum promotion readiness: perilaku `Escape` pada dialog mobile harus dikonfirmasi di Chrome dan Safari, serta strategi loading figur hero individu harus dibuat konsisten. Satu keputusan bisnis juga perlu ditetapkan: apakah `Events & Workshop` memang siap menjadi acquisition entry utama, atau untuk sementara harus memakai wording berbasis minat sampai jadwal terverifikasi tersedia.

## Perbandingan founder: reference → preview → homepage aktif

| Area | Maven reference | Skillary preview | Homepage aktif `/` |
|---|---|---|---|
| Peran | Marketplace pembelajaran yang sudah matang, ditopang katalog, event, instructor, dan social proof | Platform training dan certification untuk individu serta organisasi, dengan evidence boundary yang eksplisit | Landing Skillary lama berbasis `StartupLanding` |
| First viewport | Dark navigation, centralized promise, dua figur, CTA dan capability strip | Struktur serupa, tetapi memakai dua figur original Skillary, orange brand, copy dan destination Skillary | Komposisi existing; tidak memakai preview feature |
| Discovery | Katalog besar, path, courses dan event aktif | Empat program yang lolos source gate, guided goals, search berbasis registry, workshop/path dalam truthful empty state | Discovery lama; belum memakai contract HP-S1–HP-S8F |
| Trust | Instructor identity, testimonials, logos, outcome/social signals | Anonymous product specimens, artifact examples, evidence trail, dan scope wall tanpa klaim palsu | Aset lama mempunyai klasifikasi bukti yang belum seluruhnya aman |
| B2B | Business acquisition dan company-oriented proof | Organization journey, inspectability matrix, discovery CTA dan batas scope | Jalur B2B lama tidak sedalam preview |
| Status rilis | Produk eksternal live | Preview `noindex`, terisolasi dan siap founder decision | Tetap menjadi homepage produksi saat ini |

## Design Health Score

Skala 0–4 per heuristik; heuristik 7 dan 10 tidak dinilai karena halaman ini bersifat persuasif, bukan aplikasi operasional kompleks.

| Heuristik | Skor | Catatan |
|---|---:|---|
| Visibility of system status | 3/4 | Search, tab, rail, accordion dan empty state memiliki state yang terbaca |
| Match with the real world | 2/4 | Model Learn–Practice–Prove kuat, tetapi sebagian istilah masih terasa internal/operasional |
| User control and freedom | 3/4 | Audience choice, search, tabs, drawer dan CTA tersedia; halaman masih panjang |
| Consistency and standards | 4/4 | Visual language, tokens, controls dan section cadence konsisten |
| Error prevention | 4/4 | Claim gate, registry gate dan payment hold mencegah janji yang belum valid |
| Recognition rather than recall | 3/4 | Outcome-led discovery membantu; terlalu banyak pilihan header menambah beban awal |
| Flexibility and efficiency | N/A | Tidak relevan untuk landing persuasif |
| Aesthetic and minimalist design | 2/4 | Craft tinggi, tetapi proof/disclaimer rhythm terlalu berulang |
| Error recognition and recovery | 3/4 | Empty/unavailable states tersedia; Escape dialog masih perlu browser confirmation |
| Help and documentation | N/A | Tidak relevan sebagai target utama halaman |
| **Total** | **24/32** | **Baik, tetapi belum promotion-ready tanpa kondisi** |

## Design Specificity

**Verdict:** Maven-derived, lalu semakin Skillary-specific setelah fold pertama.

- Kedekatan first viewport dengan Maven adalah keputusan yang memang diminta founder: dark header, central promise, dua figur, capability bubbles dan strip.
- Kepemilikan Skillary muncul melalui orange accent `rgb(255,138,0)`, figur original, program nyata, model Learn → Practice → Prove, evidence trail, serta jalur organisasi.
- Hero masih terlalu literal jika dipakai tanpa evolusi jangka panjang. Setelah launch, identitas visual Skillary perlu mempunyai satu gesture yang tidak bisa tertukar dengan Maven.
- Automated specificity scan pada target utama menghasilkan `0` finding. Scan pendukung menemukan satu advisory non-blocking pada two-axis grid background hero. Efek tersebut disengaja, tetapi sebaiknya tidak menjadi signature permanen jika founder ingin diferensiasi yang lebih kuat.

## Hal yang sudah bekerja sangat baik

1. **Hierarchy dan craft kuat.** First viewport mudah dikenali, fokus headline jelas, dua figur tetap hadir di desktop maupun mobile, dan cadence antarband terasa terencana.
2. **Claim discipline sangat baik.** Tidak ada testimonial, logo, trainer, metric, ranking, outcome, popularitas, tanggal workshop, atau case study palsu.
3. **Produk Skillary terlihat nyata.** Empat program terverifikasi, guided goals, search, assessment, credential record, artifact specimen, dan organization journey membuat halaman lebih dari sekadar visual clone.
4. **Responsive foundation sehat.** Tidak ditemukan horizontal page overflow, duplicate ID, target terlihat di bawah 44 px, atau gambar gagal dimuat pada desktop `1440 × 900` dan mobile `390 × 844`.
5. **Isolation terjaga.** Preview tetap `noindex`, root tidak mengimpor preview, payment tetap HOLD, dan tidak ada checkout CTA.

## Priority issues dan syarat keputusan

### P1 — Konfirmasi promotion safety pada dialog dan hero media

Automated interaction berhasil untuk drawer open, close, dan focus return, tetapi dua simulasi `Escape` di in-app browser tidak menutup dialog walaupun source menggunakan native `<dialog>`. Ini bisa merupakan keterbatasan alat, tetapi tidak boleh diasumsikan aman tanpa uji Chrome/Safari. Figur hero individu juga teramati memakai `fetchPriority=high` bersamaan dengan lazy loading; strategi priority/loading harus konsisten.

**Kondisi lulus:** uji manual Chrome dan Safari membuktikan `Escape`, focus return, scroll lock dan close control bekerja; figur LCP individu mempunyai loading policy yang eksplisit dan tidak kontradiktif.
**Tindakan yang disarankan:** `harden` lalu performance confirmation pass.

### P1 — Events & Workshop terlalu menonjol untuk registry yang masih kosong

Founder memang meminta entry ini hadir di header. Masalahnya, ekspektasi yang dibangun navigation dan format card belum dibayar oleh item aktif. Truthful empty state aman secara bukti, tetapi tetap menciptakan trust dip.

**Kondisi lulus:** pilih salah satu: publikasikan minimal satu workshop yang tanggal, fasilitator, kapasitas dan route-nya terverifikasi; atau ubah primary wording menjadi `Workshop berikutnya` / `Daftarkan minat` sampai registry aktif.
**Tindakan yang disarankan:** `clarify` event readiness dan CTA semantics.

### P2 — Dua audience journey bercampur terlalu lama

Audience split sudah jelas, tetapi pengguna individu masih harus melewati jalur organisasi yang panjang, dan pengguna HR/L&D melewati katalog/proof individu sebelum mendapat konteks organisasi penuh. Pada mobile, panjang ini lebih terasa.

**Rekomendasi:** pertahankan satu homepage, tetapi gunakan anchor routing, sticky audience memory, atau section sequencing yang membuat pilihan awal mempercepat perjalanan.
**Tindakan yang disarankan:** `distill` information architecture.

### P2 — Trust terlalu sering dibangun lewat disclaimer defensif

Evidence discipline adalah kekuatan, tetapi label `contoh tampilan`, `specimen`, boundary dan scope muncul berulang. Halaman akhirnya menjelaskan apa yang belum dapat diklaim lebih sering daripada memperlihatkan alasan positif untuk percaya.

**Rekomendasi:** konsolidasikan aturan bukti dalam satu trust block; ganti pengulangan dengan tiga proof pieces terverifikasi saat tersedia.
**Tindakan yang disarankan:** `clarify` dan `polish` proof narrative.

### P2 — Copy operasional dan kepemilikan brand masih bisa diperkuat

Istilah seperti `scope`, `delivery`, `assessment`, `credential`, `record`, `earning basis`, dan `review` terasa familiar bagi internal team tetapi tidak selalu natural bagi learner Indonesia. Hero juga masih menjadi area yang paling dekat dengan referensi.

**Rekomendasi:** lakukan plain-language pass Bahasa Indonesia dan tentukan satu signature Skillary untuk hero pascalaunch tanpa menghilangkan struktur yang disukai founder.
**Tindakan yang disarankan:** `clarify`, kemudian `polish`.

## Persona review

| Persona | Yang dipahami | Friksi utama |
|---|---|---|
| Learner pemula | Bisa memilih goal dan melihat empat program nyata | Jargon, pilihan header banyak, serta event yang belum tersedia |
| Profesional karier | Project, assessment dan credential terasa relevan | Perlu penjelasan lebih konkret mengenai keluaran tiap program |
| HR/L&D | Organization journey dan inspectability cukup matang | Harus menggulir terlalu jauh sebelum mencapai alur organisasi |
| Pengguna mobile | Hero, figures, CTA, cards dan rails tetap usable | Total halaman panjang; prioritas konten perlu lebih agresif |

## Content and asset disposition

### Reused

- Empat source cover internal Skillary yang diubah menjadi derivative WebP dan diberi label `Ilustrasi program`.
- Route, program title, module count, outcome count, metadata dan search destination yang lolos source gate.
- Wordmark dan brand palette Skillary.

### Rebuilt

- Dua transparent hero cutouts dari sumber visual original Skillary, beserta provenance dan hash.
- Product proof canvases, artifact specimens, evidence trail, scope wall, organization journey dan inspectability matrix.
- Header/search shell, audience split, learning-format grid, guided goals, discovery tabs, FAQ, closing CTA dan footer composition.

### Conditional / hidden sampai evidence tersedia

- Workshop dan event aktif.
- Learning path resmi.
- Faculty/trainer identity.
- Client logos, testimonials, outcome metrics dan case studies.

### Rejected

- Seluruh aset, logo, trainer, course, testimonial dan social proof Maven.
- Dataset event lama yang mock/kedaluwarsa.
- Placeholder trainer lama.
- Fake company logos, fake testimonials, fake metrics dan fake credentials.
- Checkout/payment CTA selama payment HOLD.

## Bukti teknis HP-S9

- Target utama: `src/features/marketing/homepage-preview/HomepagePreview.tsx`.
- 13 band `SK-HP-01` sampai `SK-HP-13` hadir dalam urutan yang benar.
- Satu accessible H1; tidak ada duplicate ID.
- Seluruh enam content images berhasil dimuat dan memakai route lokal Next.js.
- Search `dashboard` menuju `/programs/power-bi-business-dashboard` dan mengumumkan result.
- Discovery tab berpindah ke `#workshop` dan mengembalikan focus ke heading panel.
- Proof rail dan FAQ berfungsi.
- Tidak ada horizontal page overflow pada desktop/mobile; overflow hanya berada pada rail mobile yang memang disengaja.
- Registry aktif: `4` program. Registry kosong: workshop, learning path, faculty, client logo, testimonial, metric, dan case study.
- Root `/` tidak mengimpor feature preview; HP-S10 belum dijalankan.

## Screenshot evidence

- Desktop first viewport: `docs/hp-s8a-1440x900-first-viewport.png`
- Mobile first viewport: `docs/hp-s8a-390x844-first-viewport.png`
- Desktop audience/formats: `docs/hp-s8b-1440x900-audience-formats.png`
- Desktop catalog: `docs/hp-s8c-1440x900-catalog.png`
- Desktop proof: `docs/hp-s8d-1440x900-proof.png`
- Mobile proof: `docs/hp-s8d-390x844-proof.png`

## Founder decisions yang dibutuhkan

1. Apakah pesan yang ingin paling diingat adalah **“Skillary memverifikasi klaim belajar”** atau **“Skillary mengubah pembelajaran menjadi bukti kerja”**?
2. Apakah `Events & Workshop` merupakan acquisition engine aktif dalam waktu dekat, atau capability yang masih akan datang?
3. Setelah pengguna memilih `Untuk Individu` atau `Untuk Organisasi`, apakah homepage tetap harus memperlihatkan seluruh journey, atau boleh mempercepat pengguna ke jalur yang dipilih?
4. Tiga bukti terverifikasi apa yang paling realistis diperoleh untuk menggantikan pengulangan disclaimer: karya peserta, trainer identity, partner logo, testimonial, outcome, atau case study?
5. Elemen hero apa yang kelak harus terasa hanya milik Skillary, sekalipun struktur Maven tetap menjadi referensi awal?

## Rekomendasi keputusan

**Pilih: APPROVE WITH CONDITIONS.** Pertahankan preview, jangan promosikan ke `/` dahulu, lalu jalankan satu bounded pre-promotion readiness sprint untuk menutup dua gate teknis dan keputusan Events & Workshop. Perbaikan audience routing, trust narrative, jargon, dan signature brand dapat dimasukkan sebagai focused founder revision; semuanya harus dinilai sebelum HP-S10, tetapi tidak membatalkan kualitas dasar yang sudah tercapai.

HP-S10 tetap membutuhkan perintah promosi terpisah setelah syarat di atas diterima dan diverifikasi.
