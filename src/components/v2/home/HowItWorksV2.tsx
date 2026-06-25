import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Ceritakan Kebutuhan Training",
    desc: "Tim Skillary mendengarkan kebutuhan Anda — jumlah peserta, topik, durasi, format, dan output yang diharapkan.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: "rgb(255, 138, 0)",
    bg: "rgb(255, 244, 232)",
  },
  {
    n: "02",
    title: "Program Disusun & Platform Disiapkan",
    desc: "Materi dikurasi, modul disusun di platform, peserta diinput via CSV, dan alur assessment dikonfigurasi sesuai program.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "rgb(59, 130, 246)",
    bg: "rgb(219, 234, 254)",
  },
  {
    n: "03",
    title: "Peserta Belajar & Assessment",
    desc: "Peserta mengakses materi, mengikuti sesi, dan mengerjakan assessment online. Progress terpantau real-time di dashboard admin.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "rgb(16, 185, 129)",
    bg: "rgb(209, 250, 229)",
  },
  {
    n: "04",
    title: "Sertifikat & Laporan Peserta",
    desc: "Sertifikat digital diterbitkan otomatis bagi peserta yang lulus. Laporan lengkap siap di-export untuk HR dan manajemen.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: "rgb(139, 92, 246)",
    bg: "rgb(245, 243, 255)",
  },
];

export function HowItWorksV2() {
  return (
    <section className="py-20 px-5 md:px-6 lg:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}>
            Cara Kerja
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Dari Konsultasi hingga Laporan — 4 Langkah
          </h2>
          <p className="text-[#64748B] text-base max-w-xl mx-auto">
            Kami mengelola seluruh alur pelatihan sehingga tim HR tidak perlu repot setup dari nol.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line desktop */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(90deg, rgb(255,138,0), rgb(255,90,95), rgb(139,92,246))" }} />

          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              {/* Step number circle */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 shadow-md"
                style={{ background: step.bg, color: step.color, border: `2px solid ${step.color}22` }}
              >
                {step.icon}
              </div>
              <div
                className="absolute top-[26px] left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black text-white z-20 shadow"
                style={{ background: step.color }}
              >
                {step.n}
              </div>
              <div className="text-center">
                <h3 className="font-bold text-[#0F172A] text-sm mb-2 leading-snug">{step.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/platform"
            className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
            style={{ color: "rgb(255, 138, 0)" }}
          >
            Lihat Detail Fitur Platform →
          </Link>
        </div>
      </div>
    </section>
  );
}
