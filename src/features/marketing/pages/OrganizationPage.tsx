import Link from "next/link";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";

const challenges = [
  {
    number: "01",
    title: "Kebutuhan bisnis berhenti sebagai topik training",
    description:
      "Tujuan, audience, dan kriteria penyelesaian belum selalu diterjemahkan menjadi rancangan belajar yang jelas.",
  },
  {
    number: "02",
    title: "Operasional peserta tersebar di banyak tempat",
    description:
      "Daftar peserta, materi, progress, assessment, dan dokumen program mudah terpisah ketika tidak ada satu alur kerja.",
  },
  {
    number: "03",
    title: "Selesai hadir belum menjelaskan apa yang dipelajari",
    description:
      "Tim membutuhkan evidence yang relevan dengan desain program—bukan sekadar daftar hadir atau sertifikat tanpa konteks.",
  },
];

const pillars = [
  {
    eyebrow: "01 · Relevance",
    title: "Program yang dimulai dari kebutuhan",
    description:
      "Konteks kerja, profil peserta, tujuan belajar, dan format delivery dibahas sebelum program disusun.",
    items: ["Learning objective", "Audience & context", "Program format"],
  },
  {
    eyebrow: "02 · Operations",
    title: "Delivery yang lebih rapi dijalankan",
    description:
      "Peserta, akses materi, progress, assessment, dan komunikasi program dikelola dalam alur yang saling terhubung.",
    items: ["Batch & participant", "Learning access", "Progress visibility"],
  },
  {
    eyebrow: "03 · Evidence",
    title: "Hasil yang lebih mudah ditinjau",
    description:
      "Bukti penyelesaian, hasil assessment, sertifikat digital, dan ringkasan program mengikuti scope serta kriteria yang disepakati.",
    items: ["Assessment evidence", "Completion criteria", "Program summary"],
  },
];

const lifecycle = [
  {
    step: "Discover",
    label: "Kebutuhan dipetakan",
    description:
      "Kami membahas tujuan, audience, konteks kerja, format, timeline, dan batasan program.",
    output: "Output: program brief",
  },
  {
    step: "Design",
    label: "Program dirancang",
    description:
      "Materi, delivery flow, aktivitas, assessment, dan completion criteria disusun sesuai scope.",
    output: "Output: learning design",
  },
  {
    step: "Deliver",
    label: "Pembelajaran dijalankan",
    description:
      "Batch dan akses peserta disiapkan, sesi berlangsung, serta progress dikelola sepanjang program.",
    output: "Output: learning records",
  },
  {
    step: "Review",
    label: "Evidence dirangkum",
    description:
      "Penyelesaian, assessment, sertifikat, dan laporan ditinjau berdasarkan kriteria program.",
    output: "Output: agreed evidence",
  },
];

const capabilities = [
  {
    title: "Program terstruktur",
    description: "Materi dan aktivitas dirangkai untuk tujuan belajar yang disepakati.",
    icon: "M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15zM4 20.5A2.5 2.5 0 016.5 18H20M8 7h8M8 11h6",
  },
  {
    title: "Operasi batch & peserta",
    description: "Peserta organisasi dan akses belajar dikelola per program atau batch.",
    icon: "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  },
  {
    title: "Progress & assessment",
    description: "Aktivitas dan hasil evaluasi dapat digunakan sesuai rancangan program.",
    icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  },
  {
    title: "Sertifikat digital",
    description: "Bukti penyelesaian diterbitkan ketika peserta memenuhi kriteria yang ditetapkan.",
    icon: "M12 15l-3.5 2 1-4-3-2.5 4-.5L12 6l2 4 4 .5-3 2.5 1 4-4-2zM8 19l-1 3 5-2 5 2-1-3",
  },
  {
    title: "Ringkasan program",
    description: "Data yang relevan dirangkum sesuai kebutuhan dan scope pelaporan yang disepakati.",
    icon: "M4 19V9M10 19V5M16 19v-7M22 19V3M2 21h22",
  },
  {
    title: "Learning operations support",
    description: "Tim Skillary membantu menjaga alur program, tidak hanya menyerahkan software.",
    icon: "M12 22a10 10 0 100-20 10 10 0 000 20zM8 12l2.5 2.5L16 9M12 6v.01",
  },
];

const useCases = [
  ["Team upskilling", "Mengembangkan kapabilitas tim untuk kebutuhan peran atau fungsi tertentu."],
  ["Onboarding & role readiness", "Merapikan pengetahuan dan aktivitas belajar untuk transisi ke peran baru."],
  ["Leadership development", "Menyusun perjalanan belajar bagi manager atau calon pemimpin."],
  ["Compliance-oriented learning", "Mendokumentasikan pembelajaran terkait kebijakan tanpa mengklaim akreditasi eksternal."],
];

const faqs = [
  {
    question: "Apakah semua program harus menggunakan platform Skillary?",
    answer:
      "Tidak selalu dengan konfigurasi yang sama. Penggunaan platform, bentuk materi, assessment, dan dukungan ditentukan dari kebutuhan program. Pada discovery, kami menjelaskan komponen yang relevan, opsional, dan tidak termasuk scope.",
  },
  {
    question: "Seberapa jauh program dapat dikustomisasi?",
    answer:
      "Topik, konteks kasus, format, durasi, aktivitas, dan bentuk evaluasi dapat dibahas. Setiap kebutuhan custom ditinjau dari tujuan, timeline, risiko, workload, dan kemungkinan penggunaan ulang sebelum masuk proposal.",
  },
  {
    question: "Apa arti sertifikat dari Skillary?",
    answer:
      "Sertifikat Skillary adalah bukti digital bahwa peserta memenuhi completion criteria yang ditetapkan pada program. Sertifikat tidak otomatis berarti lisensi profesi, gelar, atau akreditasi eksternal kecuali dinyatakan secara tertulis dengan dasar yang sah.",
  },
  {
    question: "Apa yang dapat dicantumkan dalam laporan program?",
    answer:
      "Bergantung pada desain dan data program—misalnya status peserta, penyelesaian materi, kehadiran, atau hasil assessment. Isi, format, audience, dan waktu penyampaian laporan harus disepakati dalam scope.",
  },
  {
    question: "Bagaimana harga program ditentukan?",
    answer:
      "Harga bersifat konsultatif. Input utamanya meliputi kompleksitas topik, jumlah peserta, durasi, format delivery, kebutuhan trainer, tingkat kustomisasi, assessment, pelaporan, dukungan, dan kebutuhan teknis.",
  },
  {
    question: "Berapa lama persiapan program?",
    answer:
      "Timeline ditentukan setelah kebutuhan minimum dipahami. Program dengan materi siap pakai berbeda dari program custom yang memerlukan discovery, desain, review materi, konfigurasi peserta, atau koordinasi trainer.",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function OrganizationPage() {
  return (
    <MarketingShell>
      <main className="overflow-hidden bg-[#FFFDF9] text-[#0F172A]">
        <section className="relative px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-24">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_72%_18%,rgba(255,138,0,.16),transparent_32%),radial-gradient(circle_at_82%_55%,rgba(255,90,95,.09),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
            <div className="motion-fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F0D9C8] bg-white/80 px-4 py-2 text-xs font-bold tracking-[.08em] text-[#7C4A1C] shadow-[0_6px_24px_rgba(75,42,16,.05)] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#FF8A00]" />
                MANAGED LEARNING UNTUK ORGANISASI
              </div>
              <h1 className="max-w-3xl text-[2.65rem] font-bold leading-[1.04] tracking-[-.045em] text-[#0D101C] sm:text-6xl lg:text-[4.5rem]">
                Pelatihan selesai. Apakah pembelajarannya
                <span className="block bg-gradient-to-r from-[#FF8A00] via-[#FF6C31] to-[#FF5A5F] bg-clip-text text-transparent">benar-benar terlihat?</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#596579] md:text-lg">
                Skillary membantu HR dan L&amp;D menjalankan program dalam satu alur yang lebih rapi—dari pemetaan kebutuhan dan desain, hingga peserta, progress, assessment, sertifikat digital, dan laporan sesuai scope.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link id="organization-hero-consultation" href="/contact" className="motion-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF5A5F] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(255,104,38,.23)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2">
                  Diskusikan Kebutuhan Tim <ArrowIcon />
                </Link>
                <Link id="organization-hero-process" href="#cara-kerja" className="motion-btn inline-flex min-h-12 items-center justify-center rounded-xl border border-[#DFD8CF] bg-white px-6 py-3.5 text-sm font-bold text-[#1B2535] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2">
                  Lihat Cara Kerja
                </Link>
              </div>
              <p className="mt-5 text-xs leading-5 text-[#7B8493]">Discovery awal untuk memahami tujuan, audience, format, jumlah peserta, dan timeline.</p>
            </div>

            <div className="motion-scale-in motion-delay-200 relative mx-auto w-full max-w-[610px]" aria-label="Ilustrasi alur operasi program Skillary">
              <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-[#FFEDD5] via-white to-[#FFE4E6] opacity-75 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-[#111827] p-3 shadow-[0_32px_80px_rgba(15,23,42,.22)] sm:p-4">
                <div className="flex items-center justify-between border-b border-white/10 px-3 pb-4 pt-2 text-white">
                  <div>
                    <p className="text-[10px] font-bold tracking-[.18em] text-[#FDBA74]">PROGRAM OPERATIONS</p>
                    <p className="mt-1 text-sm font-semibold">Leadership Essentials · Batch A</p>
                  </div>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-300">Illustrative flow</span>
                </div>
                <div className="grid gap-3 py-3 sm:grid-cols-[1.05fr_.95fr]">
                  <div className="rounded-2xl bg-white p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-bold tracking-[.15em] text-[#9A6A38]">LEARNING JOURNEY</p>
                        <p className="mt-2 text-lg font-bold text-[#111827]">Program progress</p>
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#FFF4E8] text-sm font-extrabold text-[#E97800]">03</div>
                    </div>
                    <div className="mt-6 space-y-4">
                      {["Orientation & baseline", "Core learning sessions", "Applied assessment"].map((item, index) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${index < 2 ? "bg-[#FFF0DD] text-[#E97800]" : "border border-dashed border-[#CBD5E1] text-[#94A3B8]"}`}>{index + 1}</div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-[#334155]">{item}</p>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]"><div className={`h-full rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FF5A5F] ${index === 0 ? "w-full" : index === 1 ? "w-3/4" : "w-1/4"}`} /></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-2xl bg-[#FFF8EF] p-5">
                      <p className="text-[10px] font-bold tracking-[.15em] text-[#9A6A38]">EVIDENCE LAYER</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {["Progress", "Assessment", "Completion", "Certificate"].map((item, index) => (
                          <div key={item} className="rounded-xl border border-[#F1DEC9] bg-white p-3">
                            <span className={`mb-3 block h-2 w-2 rounded-full ${index < 2 ? "bg-[#FF8A00]" : "bg-[#CBD5E1]"}`} />
                            <p className="text-[10px] font-bold text-[#475569]">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold">Review-ready summary</p>
                        <span className="text-[#FDBA74]">↗</span>
                      </div>
                      <p className="mt-2 text-[10px] leading-5 text-slate-300">Scope, criteria, and evidence remain connected.</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] leading-5 text-[#8A8177]">Ilustrasi alur operasional—bukan data peserta atau dokumentasi klien.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#EEE2D5] bg-white px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">MASALAHNYA BUKAN KURANG TRAINING</p>
                <h2 className="mt-4 max-w-lg font-bold tracking-[-.035em] text-[#0D101C]">Yang sulit adalah menjaga kebutuhan, delivery, dan evidence tetap terhubung.</h2>
                <p className="mt-5 max-w-md text-base leading-7 text-[#64748B]">Tanpa alur yang jelas, program dapat selesai tetapi sulit ditinjau kembali oleh HR, L&amp;D, manager, atau peserta.</p>
              </div>
              <div className="divide-y divide-[#EEE7DF] border-y border-[#EEE7DF]">
                {challenges.map((item) => (
                  <article key={item.number} className="group grid gap-3 py-7 sm:grid-cols-[64px_1fr] sm:gap-5">
                    <span className="text-sm font-bold text-[#FF8A00]">{item.number}</span>
                    <div className="grid gap-2 md:grid-cols-[.8fr_1.2fr] md:gap-8">
                      <h3 className="text-lg font-bold leading-7 text-[#172033]">{item.title}</h3>
                      <p className="text-sm leading-7 text-[#697386]">{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">THE SKILLARY MODEL</p>
              <h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Bukan software yang ditinggal. Bukan sesi yang selesai begitu saja.</h2>
              <p className="mt-5 text-base leading-8 text-[#64748B]">Skillary menghubungkan learning design, program operations, dan credible evidence dalam satu pengalaman yang bertanggung jawab.</p>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {pillars.map((pillar, index) => (
                <article key={pillar.title} className={`relative overflow-hidden rounded-[1.5rem] border p-7 md:p-8 ${index === 1 ? "border-[#1F2937] bg-[#111827] text-white shadow-[0_24px_60px_rgba(15,23,42,.16)]" : "border-[#EDDFD0] bg-white text-[#0F172A] shadow-[0_8px_30px_rgba(72,45,20,.045)]"}`}>
                  <p className={`text-[11px] font-extrabold tracking-[.16em] ${index === 1 ? "text-[#FDBA74]" : "text-[#D86F00]"}`}>{pillar.eyebrow}</p>
                  <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-.02em]">{pillar.title}</h3>
                  <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-slate-300" : "text-[#667085]"}`}>{pillar.description}</p>
                  <ul className="mt-8 space-y-3">
                    {pillar.items.map((item) => (
                      <li key={item} className={`flex items-center gap-3 border-t pt-3 text-xs font-bold ${index === 1 ? "border-white/10 text-slate-200" : "border-[#F0E8DF] text-[#465365]"}`}><span className={index === 1 ? "text-[#FDBA74]" : "text-[#FF8A00]"}><CheckIcon /></span>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cara-kerja" className="scroll-mt-24 bg-[#0D101C] px-5 py-20 text-white sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs font-extrabold tracking-[.2em] text-[#FDBA74]">FROM NEED TO EVIDENCE</p>
                <h2 className="mt-4 font-bold tracking-[-.035em]">Satu alur. Empat keputusan penting.</h2>
                <p className="mt-5 max-w-md text-base leading-8 text-slate-400">Setiap tahap memiliki input dan output yang jelas agar ekspektasi, delivery, serta bukti tidak berjalan sendiri-sendiri.</p>
              </div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {lifecycle.map((item, index) => (
                  <article key={item.step} className="grid gap-5 py-8 sm:grid-cols-[70px_.7fr_1.1fr] sm:gap-8 md:py-10">
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-[#FDBA74]/30 bg-[#FDBA74]/10 text-xs font-bold text-[#FDBA74]">0{index + 1}</div>
                    <div><p className="text-[11px] font-extrabold tracking-[.16em] text-[#FDBA74]">{item.step.toUpperCase()}</p><h3 className="mt-2 text-xl font-bold text-white">{item.label}</h3></div>
                    <div><p className="text-sm leading-7 text-slate-300">{item.description}</p><p className="mt-3 text-xs font-bold text-[#FDBA74]">{item.output}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl"><p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">CONNECTED CAPABILITIES</p><h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Komponen yang bekerja sebagai satu sistem pembelajaran.</h2></div>
              <p className="max-w-sm text-sm leading-7 text-[#64748B]">Konfigurasi aktual mengikuti objective, format, readiness, dan scope program yang disepakati.</p>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-[#E8DED4] bg-[#E8DED4] sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((item) => (
                <article key={item.title} className="group bg-[#FFFDF9] p-7 transition-colors duration-300 hover:bg-white md:p-8">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#F0D9C8] bg-white text-[#E97800] shadow-sm">
                    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-[#172033]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#697386]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">BUILT AROUND THE NEED</p>
              <h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Bentuk program mengikuti konteks, bukan template yang dipaksakan.</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#64748B]">Berikut contoh kebutuhan yang dapat dibahas pada discovery. Kesesuaian, rancangan, dan indikatornya tetap ditentukan per program.</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {useCases.map(([title, description]) => (
                  <article key={title} className="rounded-2xl border border-[#EDDFD0] bg-white p-5">
                    <h3 className="text-sm font-bold text-[#172033]">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-[#697386]">{description}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-[#EBD9C8] bg-[#FFF4E8] p-7 md:p-10">
              <p className="text-xs font-extrabold tracking-[.18em] text-[#9A5818]">SCOPE CLARITY</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-.025em] text-[#172033]">Jelas sebelum program berjalan.</h3>
              <div className="mt-8 space-y-7">
                <div><p className="text-xs font-bold uppercase tracking-[.12em] text-[#D86F00]">Included by design</p><p className="mt-2 text-sm leading-7 text-[#5D6572]">Objective, audience, delivery flow, completion criteria, dan tanggung jawab program.</p></div>
                <div className="border-t border-[#E8CFAF] pt-7"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#D86F00]">Configured per program</p><p className="mt-2 text-sm leading-7 text-[#5D6572]">Materi, trainer, assessment, sertifikat, laporan, support, dan penggunaan platform.</p></div>
                <div className="border-t border-[#E8CFAF] pt-7"><p className="text-xs font-bold uppercase tracking-[.12em] text-[#D86F00]">Requires discovery</p><p className="mt-2 text-sm leading-7 text-[#5D6572]">Integrasi, SSO, API, white-label, advanced analytics, atau kebutuhan keamanan khusus—bukan baseline otomatis.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#EEE2D5] bg-white px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div><p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">COMMON QUESTIONS</p><h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Hal penting sebelum memulai.</h2><p className="mt-5 text-sm leading-7 text-[#64748B]">Jika kebutuhan Anda belum tercakup, gunakan sesi discovery untuk memetakan scope dengan jelas.</p></div>
            <div className="divide-y divide-[#E9E2DA] border-y border-[#E9E2DA]">
              {faqs.map((item, index) => (
                <details id={`organization-faq-${index + 1}`} key={item.question} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-bold text-[#172033] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                    {item.question}<span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FFF4E8] text-xl font-normal text-[#D86F00] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[#64748B]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 md:py-24">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0D101C] px-6 py-12 text-white shadow-[0_30px_80px_rgba(15,23,42,.18)] sm:px-10 md:px-16 md:py-16">
            <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#FF8A00]/20 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-48 left-1/3 h-96 w-96 rounded-full bg-[#FF5A5F]/10 blur-3xl" />
            <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl"><p className="text-xs font-extrabold tracking-[.2em] text-[#FDBA74]">START WITH CLARITY</p><h2 className="mt-4 font-bold tracking-[-.04em]">Ceritakan tujuan tim Anda. Kita petakan program yang masuk akal.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">Siapkan konteks kebutuhan, audience, perkiraan peserta, format, dan timeline. Skillary akan membantu membedakan yang diperlukan, opsional, dan di luar scope.</p></div>
              <Link id="organization-closing-consultation" href="/contact" className="motion-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF5A5F] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(255,104,38,.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBA74] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D101C]">Mulai Discovery <ArrowIcon /></Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
