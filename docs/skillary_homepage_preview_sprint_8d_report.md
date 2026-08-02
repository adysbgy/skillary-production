# Skillary Homepage Preview — Sprint HP-S8D Report

**Sprint:** `HP-S8D — Proof & Showcase Parity`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS — SHIP**
**Stop condition:** **TERPENUHI — HP-S8E belum dijalankan**

## Outcome

HP-S8D mengubah dua band proof `/lp/homepage-preview` dari kumpulan kartu dokumentasi menjadi satu showcase moment yang lebih dekat dengan cadence Maven Analytics: dark centered proposition, tiga visual specimen besar, transisi menuju light artifact gallery, lalu evidence trail yang dapat dibaca sebagai proses.

Terjemahan ini tetap original Skillary. Tidak ada project Maven, nama peserta, winner badge, video, testimonial, score, ranking, customer logo, atau outcome metric yang dipindahkan. Seluruh visual tetap merupakan specimen anonim dan diberi batas yang terlihat.

## Reference translation

| Reference grammar | Skillary translation | Truth boundary |
|---|---|---|
| Centered dark showcase statement | `Dari project ke bukti yang dapat ditinjau.` | Tidak menjanjikan hasil peserta tertentu |
| Three-up project gallery | Project workspace, assessment review, credential record | Semua berlabel `Contoh tampilan` |
| Showcase action | Anchor `Periksa contoh buktinya` | Mengarah ke artifact specimen, bukan video atau learner work |
| Light continuation gallery | Project brief, rubric & feedback, verification record | Bukan nilai atau credential valid |
| Portfolio narrative | Five-stage evidence trail | Availability tetap mengikuti program |

## Proof composition

- Product proof memakai centered headline dan explanation yang dapat dipahami sebelum melihat kartu.
- Tiga specimen tampil sebagai white showcase cards di atas dark field, dengan large interface canvas dan caption capability-safe.
- Artifact gallery memakai tiga card columns yang konsisten agar pola visual terbaca seperti gallery, bukan dashboard admin.
- Evidence trail menjelaskan `Tugas → Feedback → Assessment → Credential → Portfolio` dengan batas per tahap.
- Narrow screens mempertahankan controlled horizontal rail, tombol 48 px, swipe fallback, dan vertical evidence trail.

## Truthfulness boundary

- Tidak ada nama, avatar, atau identitas learner.
- Tidak ada nilai, persentase progress, student count, ranking, challenge winner, benchmark, atau outcome metric.
- Tidak ada testimonial, faculty, company logo, atau case study yang ditambahkan.
- Credential specimen tetap memakai status `TIDAK VALID` dan `Tidak dapat diverifikasi`.
- Copy menyatakan `Bukan data learner nyata · tanpa nama, nilai, atau metrik hasil`.
- Payment dan checkout tetap HOLD serta berada di luar scope.

## Responsive and interaction QA

| Audit | Result |
|---|---|
| Desktop proof proposition and three-up gallery | PASS |
| Desktop artifact gallery and evidence trail | PASS |
| Mobile `390 × 844` proof rail | PASS — document overflow `0` |
| Mobile proof next control | PASS — indicator moves to `Kartu 2 dari 3` |
| Mobile artifact rail | PASS — document overflow `0` |
| Mobile vertical evidence trail | PASS |

Desktop layout diukur pada viewport override `1440 × 900`. In-app capture surface menghasilkan file `1172 × 900`; DOM tetap melaporkan `innerWidth 1440`, `scrollWidth 1440`, dan document overflow `0`.

## Visual evidence

- [`hp-s8d-1440x900-proof.png`](./hp-s8d-1440x900-proof.png)
- [`hp-s8d-1440x900-proof-cards.png`](./hp-s8d-1440x900-proof-cards.png)
- [`hp-s8d-1440x900-artifacts.png`](./hp-s8d-1440x900-artifacts.png)
- [`hp-s8d-1440x900-evidence-ledger.png`](./hp-s8d-1440x900-evidence-ledger.png)
- [`hp-s8d-390x844-proof.png`](./hp-s8d-390x844-proof.png)
- [`hp-s8d-390x844-artifacts.png`](./hp-s8d-390x844-artifacts.png)
- [`hp-s8d-390x844-evidence-ledger.png`](./hp-s8d-390x844-evidence-ledger.png)

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview suite | PASS — `45` passed, `1` URL-conditional runtime test skipped |
| Explicit production runtime | PASS — `1/1` |
| Next.js production build | PASS — `166` static pages |
| Desktop/mobile browser QA | PASS |
| Protected file fingerprints | PASS |
| Impeccable detector | PASS with one accepted advisory from the pre-existing HP-S8A hero grid background |

Build hanya menampilkan warning existing mengenai konvensi `middleware` yang deprecated. Tidak ada dependency baru.

## Known out-of-scope observation

Shared Auth.js provider/environment masih mencatat configuration error pada produksi lokal. Browser audit tidak menemukan jenis runtime error lain. HP-S8D tidak mengubah auth, environment, database, session route, checkout, atau payment.

## Gate verdict

| HP-S8D acceptance criterion | Verdict |
|---|---|
| Proof mempunyai centered showcase moment | PASS |
| Tiga product specimens tampil sebagai gallery | PASS |
| Tiga artifact specimens tetap jujur | PASS |
| Evidence trail menjelaskan proses dan batas | PASS |
| Tidak ada karya, identitas, atau claim Maven yang disalin | PASS |
| Desktop/mobile tanpa document overflow | PASS |
| Homepage aktif `/` tidak diubah | PASS |
| Payment tetap HOLD | PASS |
| Stop sebelum HP-S8E | PASS |

**Final verdict: HP-S8D selesai. Area proof sekarang terasa sebagai showcase yang kuat dan dekat dengan reference cadence, tetapi seluruh material, copy, dan truth boundary tetap milik Skillary.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_8d_change_manifest.md`](./skillary_homepage_preview_sprint_8d_change_manifest.md).
