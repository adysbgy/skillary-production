import Link from "next/link";

export function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 px-5 md:px-6 lg:px-8">
      {/* Background grid subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Orange glow */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>
              Platform Pelatihan Organisasi #1 di Indonesia
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.1] tracking-tight text-[#0F172A] mb-6">
            Pelatihan Tim yang{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
            >
              Terukur, Bersertifikat,
            </span>{" "}
            dan Terdokumentasi
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-[#475569] leading-relaxed mb-8 max-w-2xl">
            Skillary membantu HR, L&D, dan Training Manager menjalankan program pelatihan internal dengan materi digital, assessment, sertifikat resmi, dan laporan peserta — dalam satu platform.
          </p>

          {/* CTA group */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
            >
              Diskusikan Program untuk Tim Anda
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/program-catalog"
              className="inline-flex items-center gap-2 text-sm font-semibold px-7 py-3.5 rounded-full bg-white hover:bg-orange-50 transition-all"
              style={{ border: "1.5px solid rgb(240, 217, 200)", color: "#334155" }}
            >
              Lihat Katalog Program
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Avatars */}
            <div className="flex items-center">
              {[1, 2, 3, 4].map((n, i) => (
                <div
                  key={n}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  style={{
                    marginLeft: i === 0 ? 0 : -10,
                    zIndex: 4 - i,
                    background: ["rgb(255,138,0)", "rgb(255,90,95)", "rgb(139,92,246)", "rgb(16,185,129)"][i],
                  }}
                >
                  {["B", "O", "I", "F"][i]}
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 text-sm text-[#64748B]">
              <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="leading-relaxed">
                Berangkat dari <span className="font-bold text-[#0F172A]">arsip pengalaman pelatihan korporat sejak 1998</span> — lintas perbankan, regulator, FMCG, dan energi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
