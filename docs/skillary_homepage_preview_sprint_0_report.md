# Skillary Homepage Preview — HP-S0 Report

**Sprint:** `HP-S0 — Reference Lock, Baseline & Contracts`
**Result:** **PASS**
**Next sprint verdict:** **GO WHEN AUTHORIZED — HP-S1 NOT STARTED**
**Plan:** [`skillary_homepage_preview_execution_plan.md`](./skillary_homepage_preview_execution_plan.md) v1.2
**Plan SHA-256:** `c97f9099ce7619cb859f346a1dc1033863a346fcc670bae638daab1ca64d28f2`

<a id="authority-and-baseline"></a>
## Authority and baseline

Urutan authority yang dipakai: `AGENTS.md` → `PRODUCT.md` → plan homepage v1.2 → master project management → development execution plan → historical documents.

| Check | Result |
|---|---|
| Branch / HEAD | `main` / `20aef6c289d073cb86e33ee500a3cf22897c2e0a` |
| Dirty worktree sebelum sprint | 112 entries; dipertahankan |
| Homepage active | `/` tidak disentuh |
| Preview route | Belum ada; tersedia untuk HP-S2 |
| Isolated shell | `src/app/(standalone)/lp/layout.tsx` tidak merender global header/footer |
| Payment | HOLD; tidak ada checkout authorization |
| DB/dependency writes | Tidak ada |

Fingerprint lengkap berada pada [`skillary_homepage_preview_change_manifest.md`](./skillary_homepage_preview_change_manifest.md). Semua protected files mempunyai SHA sebelum/sesudah yang sama.

<a id="reference-lock"></a>
## Reference lock

Tiga sumber telah dikunci secara terpisah:

1. Homepage Maven Analytics untuk homepage architecture dan proof ladder.
2. Maven Analytics Live Workshops untuk positioning workshop.
3. Screenshot marketplace Maven dari founder untuk utility/discovery header dan prominence workshop.

Paket internal berada di [`references/maven-analytics/2026-08-01/LOCK.md`](./references/maven-analytics/2026-08-01/LOCK.md), terdiri dari 16 capture terverifikasi, manifest SHA-256, serta fingerprint snapshot lokal. Source Maven tidak disalin ke application/public source.

Full-page automated captures ditolak karena sticky/lazy sections terulang. First-viewport captures dan section crops yang telah diperiksa visual menjadi evidence authority. Ini mencegah screenshot rusak dijadikan target implementasi.

<a id="maven-skillary-parity-contract"></a>
## Maven→Skillary parity contract

Skala keputusan:

- **A — direct analogue:** fungsi dan ritme diadaptasi dengan identitas Skillary.
- **B — truthful substitute:** fungsi proof dipertahankan melalui bukti yang jujur.
- **C — conditional/excluded:** hanya tampil ketika provenance dan izin lulus.

### Reference-role decisions

| ID | Peran Maven | Keputusan Skillary | Class | Evidence rule |
|---|---|---|---|---|
| H01 | Global navigation | Header Skillary dua tingkat, maksimal empat kelompok | A | Label/destination mengikuti route truth |
| H02 | Two-person hero dan dual CTA | Pembelajar + HR/L&D dengan aset original | A | Asset approval baru di HP-S3 |
| H03 | Immediate scale reassurance | Reassurance non-kuantitatif | B | Angka/avatar sosial conditional |
| H04 | Individuals vs companies | Dua audience paths | A | Product positioning ready |
| H05 | Paths/courses/workshops/portfolio capabilities | Sistem Skillary + format discovery | A | Capability-truth wording |
| H06 | Early business/trust band | Organization Operating Canvas | B | Logo client conditional |
| H07 | Goal-based paths | Karier, skill baru, sertifikasi, kapabilitas tim | A | Approved reachable records only |
| H08 | Rich catalog | Program, Events & Workshop, Jalur Belajar | A | Confirmed/empty/unavailable state |
| H09 | Learner showcase | Evidence Artifact Gallery | B | Specimen berlabel; real work conditional |
| H10 | Success stories/testimonials | Evidence Ledger | B | Testimonial real conditional |
| H11 | Instructor rail | Delivery Standards | B | Faculty profile conditional |
| H12 | Scale statistics | What Organizations Can Inspect | B | Statistik real conditional |
| H13 | Dedicated business narrative | Pahami → Rancang → Jalankan → Tinjau | A | No synthetic ROI/SLA |
| H14 | Company logo wall | Organization Operating Canvas | B/C | Logo endorsement conditional |
| H15 | Case study | Engagement Walkthrough | B/C | Verified case conditional |
| H16 | FAQ | FAQ program/workshop/assessment/organization/payment | A | Native disclosure |
| H17 | Dual closing CTA | Program & Workshop / Program Tim | A | No buy/checkout CTA |
| H18 | Footer ecosystem | Belajar · Bukti · Organisasi · Legal | A | Reachable links only |

### Locked 13-core blueprint

| Core | Reference | Surface / archetype | Density and CTA | Mobile transformation | Intentional Skillary difference |
|---:|---|---|---|---|---|
| 1 Header | H01 + `MM-W01` | Ink; utility + discovery rows | Max 4 discovery groups | Compact header + grouped drawer | Orange focus, Skillary labels, no marketplace ranking |
| 2 Hero | H02–H03 + `MA-H01` | Warm white; 25/50/25 | H1, 2 CTA, non-numeric reassurance | Copy first, paired figures below | Indonesian audience, `Jejak Bukti`, original assets |
| 3 Audience split | H04 + `MA-H02` | Dark two-panel split | 2 decisions | Vertical cards | Individual and HR/L&D outcomes |
| 4 Sistem Skillary | H05–H06 | Ink proof-board | 3 mechanism steps + Delivery Standards | Stacked mechanism | Belajar → Praktik → Bukti, not tool logos |
| 5 Goal paths | H07 | Light four-card decision grid | 4 goals, one dominant next action | Horizontal snap or stack | Goals reflect Skillary ecosystem |
| 6 Discovery | H08 + `MA-H03` + `MA-W01` | Light; format tabs + catalog cards | 3 formats; workshop subsection | Server-rendered groups; optional tabs | No trend/best-selling claims; `#workshop` is real |
| 7 Product proof | H09 | Ink product specimen | Project, assessment, credential | Single-column specimens | Product capability, not social proof |
| 8 Artifact Gallery | H09–H11 + `MA-H04–H06` | Light gallery + ledger | 3 artifacts + Evidence Ledger | Scroll-snap gallery + stacked ledger | Labeled specimens and Delivery Standards |
| 9 Organization | H13 + H15 + `MA-H07` | Orange-led/dark narrative | 4 steps + Engagement Walkthrough | Stacked timeline | Process truth replaces synthetic case results |
| 10 Inspect | H12 + H14 | Ink taxonomy board | 4 inspectable groups | Stacked rows | Non-numeric transparency replaces fake scale |
| 11 FAQ | H16 + `MA-H08` | Warm white disclosures | Max 6 | Native accordion | Covers payment hold and evidence boundaries |
| 12 Closing | H17 + `MA-H08` | Dark two-path close | 2 CTA | Vertical choices | Contact/interest only while payment hold |
| 13 Footer | H18 + `MA-H09` | Ink ecosystem map | 4 link groups | Stacked groups | No newsletter until flow/privacy proof exists |

Conditional inserts tetap empat: trust/logo proof, faculty profiles, testimonial/outcome/statistics, dan verified case study.

### Workshop contract

- `Events & Workshop` terlihat di header dan mempunyai subsection yang tetap hadir dalam empty state.
- Dengan JavaScript, `#workshop` mengaktifkan panel dan memfokuskan heading.
- Tanpa JavaScript, semua format server-rendered berurutan dan anchor tetap bekerja.
- Tidak ada `Trending`, `Best selling`, ranking, harga, jadwal, host, kapasitas, atau seat status tanpa sumber.
- CTA aman selama payment hold: `Tanyakan Jadwal Workshop`, `Daftar minat`, `Lihat detail`, atau `Hubungi kami`.

<a id="route-and-destination-truth"></a>
## Route and destination truth

| Label/action | Destination | Source truth | HP-S0 decision |
|---|---|---|---|
| Program | `#program` | Future preview anchor | Core |
| Events & Workshop | `#workshop` | Future preview subsection | Core with empty state |
| Jalur Belajar | `#jalur-belajar` | Future preview anchor | Core |
| Sertifikasi | `/certifications` | `src/app/certifications/page.tsx` | Reachable; interest/criteria wording |
| Portfolio | `/portofolio` | `(marketing)/portofolio/page.tsx`; `/portfolio` redirects | Reachable with disclosure |
| Faculty | `/trainers` | `src/app/trainers/page.tsx` | Reachable; homepage profile evidence-gated |
| Materi Gratis | `/resources` | `src/app/resources/page.tsx` | Reachable |
| Untuk Organisasi | `/untuk-organisasi` | `(marketing)/untuk-organisasi/page.tsx`; legacy business routes redirect here | Reachable |
| Masuk | `/login` | `(auth)/login/page.tsx` | Reachable |
| Hubungi | `/contact` | `src/app/contact/page.tsx` | Reachable |
| Program individual | `/program/[id]` | Dynamic route exists | Only allowlisted records |
| Program organisasi | `/programs/[slug]` | Dynamic route exists | Only allowlisted records |
| Learning path | `/path/[slug]` | Dynamic route exists | Only allowlisted records |
| Events listing | `/events` | Route exists but static event source/schedule not trusted for preview | Excluded from preview CTA |

Catatan: route inventory lama masih menyebut beberapa destination legacy. Source code dan `next.config.ts` saat ini menjadi authority untuk redirect truth.

<a id="evidence-readiness"></a>
## Evidence readiness

| Evidence/content | Current readiness | Homepage behavior |
|---|---|---|
| Brand/value proposition | Ready | Core |
| Explicit homepage program/path allowlist | Belum ada; approved count `0` | HP-S1 creates registry; label `Preview/Prototype` until ≥3 approved reachable records |
| Workshop schedule | Existing Skillary data mock/expired | Designed empty state, no `/events` link |
| Product screenshots | Available | `Contoh tampilan` labels |
| Portfolio projects | Approval incomplete | Artifact specimen core; real learner work conditional |
| Faculty profiles | Consent/photo rights incomplete | Delivery Standards core; profiles conditional |
| Client logos | Endorsement permission not recorded | Hidden; Operating Canvas core |
| Testimonials | Hardcoded/illustrative | Hidden; Evidence Ledger core |
| Statistics/outcomes | Unverified | Hidden; inspection taxonomy core |
| Case study | Evidence checklist incomplete | Engagement Walkthrough core; case conditional |
| Payment | HOLD | No buy/pay/checkout CTA |

No database was changed or queried for writes. Published status alone is explicitly insufficient for homepage approval.

<a id="runtime-and-nextjs-check"></a>
## Runtime and Next.js check

| Check | Result |
|---|---|
| Node | `v20.20.1` |
| Next.js | `16.2.3` |
| Local guides read | Project structure, route groups, robots, sitemap |
| Route-group conclusion | `(standalone)` is omitted from URL; `/lp/homepage-preview` can inherit isolated `/lp` layout |
| Route conflict | None; target route absent |
| Robots/sitemap | Existing files fingerprinted and protected; preview metadata/sitemap assertions deferred to HP-S2/HP-S8 |
| Testing/build | Not run: HP-S0 changed no runtime code |

<a id="hp-s1-go-no-go"></a>
## HP-S1 GO / NO-GO

**Verdict: GO WHEN EXPLICITLY AUTHORIZED.** Tidak ada P0 terbuka, tetapi HP-S1 belum dimulai.

P1 yang harus ditutup HP-S1:

1. Buat explicit homepage allowlist/provenance registry dan hitung approved reachable records.
2. Finalkan canonical taxonomy untuk program, workshop, dan learning paths.
3. Bentuk presentational data contract dengan `confirmed / empty / unavailable` state.
4. Validasi semua destination kembali saat data record nyata dipilih.
5. Kunci capability copy terhadap evidence, tanpa DB write atau payment activation.

Stop condition terpenuhi: tidak ada route, component, CSS, loader, hero asset, dependency, migration, atau perubahan homepage aktif yang dibuat pada HP-S0.
