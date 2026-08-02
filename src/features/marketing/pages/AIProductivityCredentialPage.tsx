import Image from "next/image";
import Link from "next/link";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";

const facts = [
  ["Level", "Practitioner"],
  ["Domain", "AI Productivity"],
  ["Issuer", "Skillary"],
  ["Evidence", "Program + assessment"],
  ["Record", "Unique credential ID"],
];

const credentialProblems = [
  {
    number: "01",
    title: "AI dipakai, tetapi proses kerjanya sulit dijelaskan",
    description: "Prompt, context, review, dan keputusan sering tertinggal di percakapan—bukan menjadi workflow yang dapat ditinjau.",
    response: "Workflow evidence",
  },
  {
    number: "02",
    title: "Output lebih cepat belum tentu cukup dapat dipercaya",
    description: "Tanpa quality review, peserta sulit menunjukkan bagaimana akurasi, batas data, dan kesesuaian output diperiksa.",
    response: "Human quality review",
  },
  {
    number: "03",
    title: "Badge tanpa kriteria hanya menjadi gambar",
    description: "Credential lebih berguna ketika terhubung dengan program, applied task, assessment criteria, dan record yang dapat diperiksa.",
    response: "Reviewable credential",
  },
];

const blueprint = [
  {
    number: "01",
    title: "AI work framing",
    outcome: "Merumuskan masalah, konteks, batasan, dan bentuk output yang berguna sebelum memakai AI.",
    evidence: "Problem brief",
  },
  {
    number: "02",
    title: "Prompt & context design",
    outcome: "Menyusun instruksi, context, constraints, contoh, dan pola iterasi yang dapat ditinjau.",
    evidence: "Prompt iteration",
  },
  {
    number: "03",
    title: "Quality review",
    outcome: "Memeriksa akurasi, kelengkapan, bias, dan kesesuaian output terhadap kebutuhan kerja.",
    evidence: "Review notes",
  },
  {
    number: "04",
    title: "Workflow application",
    outcome: "Menghubungkan AI ke alur kerja yang dapat diulang tanpa menghilangkan decision ownership manusia.",
    evidence: "Workflow map",
  },
  {
    number: "05",
    title: "Responsible use",
    outcome: "Mengenali sensitive data, privacy boundaries, attribution, dan kondisi yang memerlukan eskalasi.",
    evidence: "Risk decisions",
  },
  {
    number: "06",
    title: "Applied productivity task",
    outcome: "Menyelesaikan artifact kerja dan menjelaskan pilihan, review, serta perbaikannya.",
    evidence: "Applied artifact",
  },
];

const journey = [
  ["Learn", "Pelajari prinsip dan contoh kerja"],
  ["Practice", "Bangun workflow melalui latihan"],
  ["Apply", "Selesaikan applied task"],
  ["Assess", "Penuhi kriteria assessment"],
  ["Earn", "Credential diterbitkan"],
  ["Verify", "Record dapat ditinjau"],
];

const faq = [
  {
    question: "Apakah ini sertifikasi profesi atau akreditasi eksternal?",
    answer: "Bukan. Skillary Certified — AI Productivity Practitioner dirancang sebagai credential internal Skillary untuk merekam pemenuhan kriteria program dan assessment yang berlaku. Credential ini bukan lisensi profesi, gelar akademik, atau akreditasi pemerintah maupun lembaga eksternal.",
  },
  {
    question: "Apa syarat untuk mendapatkan badge?",
    answer: "Peserta perlu menyelesaikan komponen program dan memenuhi assessment criteria yang ditetapkan pada versi program yang diikuti. Format final, rubric, passing criteria, dan kebijakan attempt akan dijelaskan sebelum enrollment dibuka.",
  },
  {
    question: "Apakah badge dapat dibagikan?",
    answer: "Credential digital dirancang agar dapat dibagikan bersama verification URL. Badge adalah representasi visual; sumber informasi utamanya tetap credential record yang memuat issuer, recipient, program, issue date, dan unique ID.",
  },
  {
    question: "Bagaimana organisasi atau recruiter memeriksanya?",
    answer: "Pemeriksa dapat membuka verification URL untuk meninjau record yang tersedia dan status credential pada saat diperiksa. Record tersebut menjelaskan penerbitan oleh Skillary, bukan validasi universal atas seluruh kemampuan kerja pemegangnya.",
  },
  {
    question: "Apakah credential memiliki masa berlaku?",
    answer: "Kebijakan validity, renewal, atau expiration belum dipublikasikan pada halaman ini. Jika program membutuhkan pembaruan karena perubahan praktik AI, policy dan versi credential akan dijelaskan secara eksplisit.",
  },
  {
    question: "Apakah tersedia untuk tim perusahaan?",
    answer: "Ya, kebutuhan cohort organisasi dapat dibahas terpisah. Objective, format delivery, assessment, participant operations, reporting, dan credential rules ditentukan melalui discovery dan scope program.",
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

export default function AIProductivityCredentialPage() {
  return (
    <MarketingShell>
      <main className="overflow-hidden bg-[#FFFDF9] text-[#0F172A]">
        <section className="relative px-5 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-20">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,138,0,.18),transparent_30%),radial-gradient(circle_at_88%_58%,rgba(255,90,95,.10),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
            <div className="motion-fade-up">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F0D9C8] bg-white/80 px-4 py-2 text-[11px] font-extrabold tracking-[.12em] text-[#9A5818] shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#FF8A00]" />
                SKILLARY PROFESSIONAL CREDENTIAL
              </div>
              <h1 className="max-w-3xl text-[2.75rem] font-bold leading-[1.04] tracking-[-.045em] text-[#0D101C] sm:text-6xl lg:text-[4.65rem]">
                Credential untuk praktik AI yang produktif—
                <span className="block bg-gradient-to-r from-[#FF8A00] via-[#FF6C31] to-[#FF5A5F] bg-clip-text text-transparent">dan dapat ditinjau.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#596579] md:text-lg">
                Skillary Certified — AI Productivity Practitioner menghubungkan pembelajaran, applied task, quality review, responsible use, dan assessment criteria dalam satu credential digital Skillary.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-[#596579]">
                {["Program terstruktur", "Applied assessment", "Verification record"].map((item) => <span key={item} className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#FF8A00]" />{item}</span>)}
              </div>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link id="credential-hero-interest" href="/contact?type=ai-productivity" className="motion-btn inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FF8A00] to-[#FF5A5F] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_rgba(255,104,38,.23)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2">
                  Daftar Minat Program <ArrowIcon />
                </Link>
                <Link id="credential-hero-criteria" href="#assessment-blueprint" className="motion-btn inline-flex min-h-12 items-center justify-center rounded-xl border border-[#DFD8CF] bg-white px-6 py-3.5 text-sm font-bold text-[#1B2535] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2">
                  Lihat Kriteria Credential
                </Link>
              </div>
              <p className="mt-5 max-w-xl text-xs leading-5 text-[#7B8493]">Enrollment publik belum dibuka. Format, rubric, passing criteria, jadwal, dan harga akan dijelaskan sebelum pendaftaran tersedia.</p>
            </div>

            <div className="motion-scale-in motion-delay-200 relative mx-auto w-full max-w-[660px]">
              <div aria-hidden="true" className="absolute inset-12 rounded-full bg-gradient-to-br from-[#FFD7A4] to-[#FFB9BC] opacity-55 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/90 bg-white/75 p-5 shadow-[0_30px_90px_rgba(15,23,42,.16)] backdrop-blur sm:p-8">
                <div className="grid aspect-square place-items-center overflow-hidden rounded-[1.5rem] bg-[#F7F7F7] p-2 sm:p-5">
                  <Image src="/images/certifications/ai-productivity-practitioner.jpg" alt="Badge Skillary Certified AI Productivity Practitioner" width={1024} height={1024} priority sizes="(max-width: 1024px) 88vw, 600px" className="h-full w-full object-contain" />
                </div>
                <div className="mt-5 flex flex-col gap-2 border-t border-[#EDE4DA] px-2 pt-5 text-xs text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-[#172033]">AI Productivity · Practitioner</span>
                  <span>Badge visual · record sebagai sumber informasi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Credential at a glance" className="border-y border-[#EDE2D7] bg-white px-5 sm:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#EDE2D7] sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
            {facts.map(([label, value]) => (
              <div key={label} className="px-4 py-6 first:pl-0 sm:px-6 lg:py-7">
                <p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#9A6A38]">{label}</p>
                <p className="mt-2 text-sm font-bold text-[#172033]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">MENGAPA CREDENTIAL INI</p>
                <h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Praktik AI perlu lebih dari kecepatan dan kumpulan prompt.</h2>
                <p className="mt-5 max-w-md text-base leading-8 text-[#64748B]">Skillary menghubungkan praktik, review manusia, responsible use, dan evidence agar proses earning badge memiliki konteks yang dapat diperiksa.</p>
                <p className="mt-7 border-l-2 border-[#FF8A00] pl-5 text-sm font-semibold leading-7 text-[#334155]">Relevan untuk knowledge workers, team leads, operations professionals, serta cohort HR dan L&amp;D—sesuai tugas, data, risiko, dan decision ownership peserta.</p>
              </div>
              <div className="divide-y divide-[#E8DED4] border-y border-[#E8DED4]">
                {credentialProblems.map((item) => (
                  <article key={item.number} className="grid gap-4 py-7 sm:grid-cols-[56px_1fr] md:grid-cols-[56px_1fr_auto] md:items-start md:gap-7">
                    <span className="text-sm font-bold text-[#FF8A00]">{item.number}</span>
                    <div><h3 className="text-lg font-bold text-[#172033]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#697386]">{item.description}</p></div>
                    <span className="w-fit rounded-full bg-[#FFF1E2] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#B85D00]">{item.response}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="assessment-blueprint" className="scroll-mt-24 bg-[#0D101C] px-5 py-20 text-white sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-extrabold tracking-[.2em] text-[#FDBA74]">ASSESSMENT BLUEPRINT</p>
                <h2 className="mt-4 font-bold tracking-[-.035em]">Apa yang direncanakan untuk dievaluasi.</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-400">Blueprint ini menjelaskan domain assessment yang diusulkan. Rubric, bobot, passing criteria, dan attempt policy akan difinalkan sebelum enrollment.</p>
            </div>
            <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
              {blueprint.map((item) => (
                <article key={item.number} className="grid gap-4 py-7 sm:grid-cols-[64px_.7fr_1.25fr_.55fr] sm:items-start sm:gap-8 md:py-9">
                  <span className="text-sm font-bold text-[#FDBA74]">{item.number}</span>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-7 text-slate-300">{item.outcome}</p>
                  <p className="text-xs font-bold uppercase tracking-[.12em] text-[#FDBA74]">{item.evidence}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">DARI BELAJAR KE CREDENTIAL</p>
              <h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Badge adalah hasil akhir. Proses earning-nya yang memberi konteks.</h2>
            </div>
            <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {journey.map(([title, description], index) => (
                <li key={title} className="relative rounded-2xl border border-[#EDDFD0] bg-[#FFFDF9] p-5">
                  <span className="text-[10px] font-extrabold tracking-[.16em] text-[#D86F00]">0{index + 1}</span>
                  <h3 className="mt-5 text-base font-bold text-[#172033]">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-[#697386]">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <div>
              <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">ASSESSMENT TRANSPARENCY</p>
              <h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Aturannya harus jelas sebelum peserta mulai.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#64748B]">Skillary tidak akan mengisi detail ujian dengan angka contoh. Informasi berikut akan dipublikasikan atau diberikan sebelum enrollment ketika policy final disetujui.</p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {["Assessment format", "Rubric & criteria", "Passing requirement", "Attempt & retake policy", "Time window", "Integrity & support rules"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-[#EADFD3] bg-white px-4 py-4 text-sm font-bold text-[#334155]"><span className="text-[#FF8A00]"><CheckIcon /></span>{item}</div>
                ))}
              </div>
            </div>
            <aside className="rounded-[1.75rem] border border-[#EBD9C8] bg-[#FFF4E8] p-7 md:p-9">
              <p className="text-xs font-extrabold tracking-[.18em] text-[#9A5818]">LAUNCH READINESS</p>
              <h3 className="mt-4 text-2xl font-bold text-[#172033]">Program belum membuka enrollment publik.</h3>
              <p className="mt-4 text-sm leading-7 text-[#5D6572]">Halaman ini menggunakan status daftar minat sampai aturan assessment, delivery format, jadwal, pricing, dan credential policy siap dipublikasikan.</p>
              <Link id="credential-readiness-interest" href="/contact?type=ai-productivity" className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#172033] px-5 py-3 text-sm font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2">Daftar Minat <ArrowIcon /></Link>
            </aside>
          </div>
        </section>

        <section id="arti-credential" className="scroll-mt-24 bg-[#0D101C] px-5 py-20 text-white sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-extrabold tracking-[.2em] text-[#FDBA74]">ARTI CREDENTIAL</p>
              <h2 className="mt-4 font-bold tracking-[-.035em]">Apa yang dapat—dan tidak dapat—disimpulkan dari badge ini.</h2>
              <p className="mt-5 text-sm leading-7 text-slate-400">Transparansi ini menjaga credential tetap berguna bagi peserta, organisasi, dan pihak yang memeriksa.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-7">
                <p className="text-xs font-extrabold tracking-[.16em] text-emerald-300">DAPAT MENUNJUKKAN</p>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                  {["Penyelesaian program yang ditentukan", "Pemenuhan assessment criteria versi program", "Issuer, issue date, dan credential ID", "Record yang tersedia untuk ditinjau"].map((item) => <li key={item} className="flex gap-3"><span className="mt-1 text-emerald-300"><CheckIcon /></span>{item}</li>)}
                </ul>
              </article>
              <article className="rounded-2xl border border-[#FDBA74]/20 bg-[#FDBA74]/5 p-7">
                <p className="text-xs font-extrabold tracking-[.16em] text-[#FDBA74]">TIDAK OTOMATIS BERARTI</p>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-200">
                  {["Lisensi profesi atau gelar akademik", "Akreditasi pemerintah atau lembaga eksternal", "Penguasaan seluruh tools dan konteks AI", "Jaminan performa kerja atau outcome karier"].map((item) => <li key={item} className="flex gap-3"><span className="mt-1 text-[#FDBA74]">—</span>{item}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative rounded-[1.75rem] border border-[#E8DED4] bg-[#FFFDF9] p-7 md:p-10">
              <p className="text-xs font-extrabold tracking-[.18em] text-[#D86F00]">VERIFICATION ANATOMY</p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#E6DBCF] bg-white shadow-sm">
                <div className="h-1.5 bg-gradient-to-r from-[#FF8A00] to-[#FF5A5F]" />
                <div className="p-6">
                  <div className="flex items-center gap-3 border-b border-[#EEE7DF] pb-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 font-bold text-emerald-600">✓</span><div><p className="text-sm font-bold text-[#172033]">Credential record available</p><p className="text-xs text-[#697386]">Status pada saat record diperiksa</p></div></div>
                  <dl className="mt-6 grid grid-cols-2 gap-5 text-sm">
                    {[["Issued to", "Credential holder"], ["Program", "AI Productivity Practitioner"], ["Issuer", "Skillary"], ["Credential ID", "Unique record ID"], ["Issue date", "Recorded date"], ["Criteria", "Program version"]].map(([term, value]) => <div key={term}><dt className="text-[10px] font-bold uppercase tracking-[.12em] text-[#9A6A38]">{term}</dt><dd className="mt-1 font-semibold text-[#334155]">{value}</dd></div>)}
                  </dl>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">SOURCE OF TRUTH</p>
              <h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Badge dapat dibagikan. Record memberi konteks yang dapat diperiksa.</h2>
              <p className="mt-5 text-base leading-8 text-[#64748B]">Setiap credential yang diterbitkan dirancang memiliki unique record. Pihak yang memeriksa dapat melihat recipient, program, issuer, tanggal penerbitan, dan ID yang tersedia—tanpa menganggap badge sebagai akreditasi eksternal.</p>
              <Link id="credential-verification-example" href="/certificates" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#D86F00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2">Pelajari cara verifikasi <ArrowIcon /></Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">DUA CARA MEMULAI</p><h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Untuk pengembangan individual atau program tim.</h2></div>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              <article className="rounded-[1.5rem] border border-[#EADFD3] bg-white p-8 md:p-10"><p className="text-xs font-extrabold tracking-[.16em] text-[#D86F00]">INDIVIDUAL</p><h3 className="mt-4 text-2xl font-bold text-[#172033]">Ikuti kabar pembukaan program.</h3><p className="mt-4 text-sm leading-7 text-[#697386]">Daftarkan minat untuk menerima informasi ketika format, assessment policy, jadwal, dan harga siap diumumkan.</p><Link id="credential-individual-interest" href="/contact?type=ai-productivity" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#D86F00]">Daftar Minat <ArrowIcon /></Link></article>
              <article className="rounded-[1.5rem] bg-[#111827] p-8 text-white shadow-[0_24px_60px_rgba(15,23,42,.14)] md:p-10"><p className="text-xs font-extrabold tracking-[.16em] text-[#FDBA74]">ORGANIZATION</p><h3 className="mt-4 text-2xl font-bold">Rancang cohort untuk kebutuhan tim.</h3><p className="mt-4 text-sm leading-7 text-slate-300">Diskusikan audience, use case, data boundaries, applied task, assessment, reporting, dan credential rules dalam scope organisasi.</p><Link id="credential-organization-discovery" href="/training-brief" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#FDBA74]">Bahas Program Tim <ArrowIcon /></Link></article>
            </div>
          </div>
        </section>

        <section className="border-y border-[#EEE2D5] bg-white px-5 py-20 sm:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div><p className="text-xs font-extrabold tracking-[.2em] text-[#D86F00]">PERTANYAAN UMUM</p><h2 className="mt-4 font-bold tracking-[-.035em] text-[#0D101C]">Pahami credential sebelum mengejarnya.</h2></div>
            <div className="divide-y divide-[#E9E2DA] border-y border-[#E9E2DA]">
              {faq.map((item, index) => (
                <details id={`credential-faq-${index + 1}`} key={item.question} className="group py-1"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-bold text-[#172033] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A00] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">{item.question}<span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FFF4E8] text-xl font-normal text-[#D86F00] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-[#64748B]">{item.answer}</p></details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
