# Skillary Homepage Preview — Sprint HP-S7 Report

**Sprint:** `HP-S7 — Responsive, Motion & Accessibility Hardening`
**Tanggal:** 1 Agustus 2026
**Verdict:** **PASS dengan satu observasi platform di luar scope**
**Stop condition:** **TERPENUHI — HP-S8 belum dijalankan**

## Outcome

HP-S7 mengeraskan `/lp/homepage-preview` tanpa mengubah homepage aktif. Mobile bukan sekadar desktop yang diperkecil: proof views dan artifact specimens berubah menjadi rail horizontal yang dapat di-swipe, mempunyai tombol 48 px, snap point, indikator posisi, dan fallback konten tanpa JavaScript. Pada lebar 520 px ke atas, komposisi kembali ke grid editorial.

Drawer mobile menggunakan native modal dialog. State tombol dan dialog terhubung melalui `aria-controls` serta `aria-expanded`; fokus masuk ke dialog saat dibuka dan kembali ke tombol `Menu` saat ditutup. Header, anchor target, dan drawer juga sudah mempunyai penanganan short viewport serta safe area.

Search sekarang mempunyai state lengkap: `idle`, `loading`, `results`, `empty`, dan `unavailable`. Results berupa region berlabel yang dikontrol oleh native search input dan diumumkan secara polite; komponen tidak mengklaim pola combobox/listbox karena hasilnya adalah destination links. Tombol clear mengembalikan fokus dan Escape menutup hasil. Discovery tabs mendukung Arrow Left/Right, Home/End, lalu Enter/Space untuk manual activation; destination link statis tetap tersedia ketika JavaScript belum aktif.

Pada mobile tanpa JavaScript, header menampilkan native `<details>` berisi seluruh destination links. Setelah hydration, fallback tersebut digantikan tombol dan native modal dialog. Karena itu navigasi tidak bergantung pada `showModal()` agar tetap dapat digunakan.

Motion dibatasi pada transisi yang menjelaskan state. Sistem `prefers-reduced-motion` mematikan entrance animation, hover transform, dan smooth scrolling. Focus ring dua lapis tetap terlihat pada surface terang maupun gelap.

## Responsive QA matrix

| Viewport | Reflow utama | Document overflow | Touch target <44 px | Result |
|---|---|---:|---:|---|
| `320 × 568` | Header kompak, mobile rail dengan next-card cue | 0 | 0 | PASS |
| `390 × 844` | Drawer penuh, search statis, rail swipe/controls | 0 | 0 | PASS |
| `844 × 390` | Sticky header dan workshop anchor pada short viewport | 0 | 0 | PASS |
| `768 × 1024` | Flagship proof + dua companion cards | 0 | 0 | PASS |
| `1024 × 768` | Organization journey 2 × 2 | 0 | 0 | PASS |
| `1440 × 900` | First viewport editorial desktop | 0 | 0 | PASS |

Rail pada `320` dan `390` memang mempunyai internal scroll width lebih besar daripada track. Ini disengaja, dibatasi di dalam region berlabel, dan tidak memperlebar document.

## Interaction and accessibility QA

| Gate | Evidence | Result |
|---|---|---|
| Mobile drawer | Native modal dialog, linked trigger state, close focus return | PASS |
| Search | Native search + controlled result region, live count, clear/focus return, idle restore | PASS |
| Discovery tabs | Focus bergerak tanpa aktivasi; Enter mengaktifkan panel/hash | PASS |
| Rail controls | Endpoint disabled state, posisi `Kartu 1–3 dari 3`, reduced-motion aware | PASS |
| No-JS fallback | Static discovery destinations dan rail content tetap tersedia | PASS |
| Reduced motion | Authored animation, transform, dan smooth scroll dimatikan | PASS |
| Focus visibility | Dual-contrast 3 px + outer ring | PASS |
| Sticky offset | Target workshop tetap terlihat di bawah header pada `844 × 390` | PASS |
| 200% resilience | Fluid/clamp typography, wrapping, tanpa fixed content height; smallest-width reflow lolos | PASS by source + reflow audit |

Automasi browser tidak dapat mengubah browser zoom secara langsung. Karena itu gate 200% dinilai melalui struktur fluid, pemeriksaan tidak adanya fixed content height yang memotong copy, wrapping, serta reflow pada viewport terkecil—bukan diklaim sebagai pengujian zoom manual yang tidak dilakukan.

## Visual evidence

- [`hp-s7-320x568-proof-rail.jpg`](./hp-s7-320x568-proof-rail.jpg)
- [`hp-s7-390x844-drawer.jpg`](./hp-s7-390x844-drawer.jpg)
- [`hp-s7-844x390-sticky-workshop.jpg`](./hp-s7-844x390-sticky-workshop.jpg)
- [`hp-s7-768x1024-proof.jpg`](./hp-s7-768x1024-proof.jpg)
- [`hp-s7-1024x768-organization.jpg`](./hp-s7-1024x768-organization.jpg)
- [`hp-s7-1440x900-first-viewport.jpg`](./hp-s7-1440x900-first-viewport.jpg)

## Verification evidence

| Gate | Result |
|---|---|
| Whole-project TypeScript | PASS |
| Scoped ESLint | PASS |
| Homepage-preview tests | PASS — `43` passed, `1` runtime test skipped tanpa URL |
| Explicit production runtime route test | PASS — `1/1` |
| Next.js 16.2.3 production build | PASS — `166` static pages |
| Six-viewport DOM QA | PASS |
| Browser interaction QA | PASS |
| Impeccable detector | PASS untuk homepage-preview; `36` temuan seluruhnya pada file lama di luar scope |
| Protected file fingerprints | PASS |

Build hanya menampilkan warning existing bahwa konvensi `middleware` deprecated. Tidak ada dependency baru.

## Platform observation

Konsol produksi lokal mencatat Auth.js `server configuration` error saat shared global `SessionProvider` meminta session. Pemeriksaan server mengonfirmasi sumbernya berada pada konfigurasi auth global/environment, bukan pada source, bundle, atau interaksi homepage-preview. Route preview, progressive enhancement, dan seluruh HP-S7 runtime gate tetap berfungsi.

Temuan ini tidak diperbaiki diam-diam karena auth berada di luar boundary HP-S7. Ia harus dibawa sebagai isu platform tersendiri sebelum production launch. Dengan demikian verdict HP-S7 adalah PASS, tetapi bukan klaim bahwa seluruh aplikasi bebas error konfigurasi.

## Independent review and remediation

Reviewer pertama menahan ship karena tiga bukti material: fallback mobile tanpa JavaScript, kontrak ARIA search yang terlalu kuat, dan file screenshot desktop yang hanya berukuran `1172 × 900`. Ketiganya diperbaiki sebelum sprint ditutup:

- native `<details>` fallback sekarang menyediakan seluruh mobile destination links pada SSR/no-JS;
- search diubah menjadi native search landmark + controlled result region, tanpa klaim combobox/listbox;
- bukti first viewport diambil ulang dan diverifikasi tepat `1440 × 900`.

Final fresh reviewer memberikan verdict **PASS — SHIP** tanpa material finding. Reviewer mengonfirmasi fallback `<details>` menuju enhanced `<dialog>`, native search + labeled result region, dan bukti JPEG tepat `1440 × 900`; contract review independen lolos `30/30`.

## Gate verdict

| HP-S7 acceptance criterion | Verdict |
|---|---|
| Enam viewport target | PASS |
| Tidak ada document horizontal overflow | PASS |
| Target interaktif minimum 44 × 44 | PASS |
| Drawer mobile, focus return, dan ARIA state | PASS |
| Search lima state dan announcement | PASS |
| Tabs keyboard manual activation | PASS |
| Rails dengan controls, snap, dan swipe cue | PASS |
| Reduced-motion behavior | PASS |
| Focus, semantics, alt, dan readable fallback | PASS |
| Homepage aktif `/` tidak berubah | PASS |
| Payment tetap HOLD | PASS |
| Independent finish review | PASS — no material finding; disposition `ship` |
| Stop sebelum HP-S8 | PASS |

**Final verdict: HP-S7 selesai. Fase berikutnya adalah HP-S8 dan belum dijalankan.**

Ownership dan rollback detail berada pada [`skillary_homepage_preview_sprint_7_change_manifest.md`](./skillary_homepage_preview_sprint_7_change_manifest.md).
