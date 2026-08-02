# Maven Reference Lock — 1 Agustus 2026

**Scope:** internal design/reference evidence untuk Skillary homepage preview.
**Status:** locked for `HP-S0`; bukan application asset.
**Canonical reference:** <https://mavenanalytics.io/>
**Workshop reference:** <https://mavenanalytics.io/live-workshops/overview>

## Policy

Seluruh isi folder ini berstatus:

- `third_party_reference_only`
- `do_not_ship`
- `do_not_import_assets`
- `do_not_copy_code_or_copywriting`

Referensi hanya boleh dipakai untuk menilai arsitektur informasi, urutan keputusan, hierarchy, density, section cadence, card variety, responsive transformation, dan interaction roles. Logo, copy, imagery, video, source code, token, statistik, testimonial, company logo, instructor identity, dan trade dress Maven tidak boleh dipakai pada UI Skillary.

## Tiga referensi yang tidak boleh dicampur

| Reference ID | Sumber | Fungsi untuk Skillary | Bukan acuan untuk |
|---|---|---|---|
| `MA-HOME` | Homepage Maven Analytics | Arsitektur homepage dan proof ladder | Copy/brand/aset literal |
| `MA-WORKSHOP` | Maven Analytics Live Workshops | Positioning workshop sebagai format belajar utama | Klaim weekly, Pro, live Q&A, host, atau jadwal Skillary |
| `MM-MARKETPLACE` | Screenshot marketplace Maven dari founder | Pemisahan utility/discovery header dan prominence workshop | Struktur homepage Maven Analytics atau ranking palsu |

## Snapshot lokal

Lokasi eksternal read-only:

```text
/Users/aj/Downloads/saveweb2zip-com-mavenanalytics-io
```

| Field | Value |
|---|---|
| Captured timestamp | `2026-07-31 03:06:50 +0700` |
| Regular files | `539` |
| Total bytes | `46,030,700` |
| `index.html` SHA-256 | `25d558c5009590c6d9fb7664f62ffde805347c8d6edd98b5d660e8be0bd0b652` |
| Aggregate tree digest | `ac126b4a6ad8d88c3521e9033d4bbe3fddafe3e8c018e8a7695c9a95e9b37024` |

Snapshot tidak disalin ke repository karena masih memuat 106 external Framer modulepreloads, YouTube embeds, analytics/tracking, dan route yang tidak ikut terarsip. Sebelum dipakai pada parity review, aggregate digest harus sama. Perbedaan digest menghentikan review sampai reference lock diperbarui.

## Capture index

| Reference ID | File | Yang dinilai |
|---|---|---|
| `MA-H01` | `maven-analytics-home-1440-first-viewport.png` | Header, two-person hero, dual CTA, trust placement |
| `MA-H01-R1024` | `maven-analytics-home-1024-first-viewport.png` | Tablet/compact desktop first viewport |
| `MA-H01-R768` | `maven-analytics-home-768-first-viewport.png` | Tablet first viewport |
| `MA-H01-R390` | `maven-analytics-home-390-first-viewport.png` | Mobile first viewport |
| `MA-H01-R375` | `maven-analytics-home-375-first-viewport.png` | Mobile first viewport |
| `MA-H01-R320` | `maven-analytics-home-320-first-viewport.png` | Minimum-width first viewport |
| `MA-H02` | `maven-analytics-audience-capabilities-1440.png` | Audience split, capability cards, early B2B beat |
| `MA-H03` | `maven-analytics-learn-1440.png` | Four-format discovery, topic filters, card density |
| `MA-H04` | `maven-analytics-showcase-1440.png` | Artifact-led showcase cadence |
| `MA-H05` | `maven-analytics-success-stories-1440.png` | Social proof density; only a structural reference |
| `MA-H06` | `maven-analytics-instructors-stats-1440.png` | Human accountability and scale beat |
| `MA-H07` | `maven-analytics-business-1440.png` | Business narrative, logos, case-study placement |
| `MA-H08` | `maven-analytics-faq-closing-1440.png` | FAQ and dual closing CTA cadence |
| `MA-H09` | `maven-analytics-footer-1440.png` | Footer ecosystem grouping |
| `MA-W01` | `maven-analytics-live-workshops-1440.png` | Workshop prominence and problem framing |
| `MM-W01` | `founder-reference-maven-marketplace-workshops.png` | Two-tier marketplace header and workshop discovery |

Capture hashes berada di [`capture-manifest.sha256`](./capture-manifest.sha256). Full-page automated capture sengaja ditolak karena sticky/lazy sections terulang pada output. Reference lock memakai verified first-viewport captures dan section crops yang telah diperiksa visual.

## Review rule

Parity bukan pixel matching. Setiap perbandingan nanti diberi verdict `meets`, `intentional Skillary deviation`, atau `fails`. Final Parity Gate hanya lulus jika tidak ada `fails` dan semua deviation memiliki alasan berbasis product truth atau brand independence.
