import Link from "next/link";

// Affiliate / Campus section — referensi: Multimatics + MySkill

const COLLAB_TYPES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    title: "Kampus & Institusi Pendidikan",
    desc: "Sediakan program pelatihan sertifikasi untuk mahasiswa atau alumni dengan dukungan platform Skillary.",
    href: "/v2/affiliate",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Komunitas & Organisasi Profesi",
    desc: "Jalankan program pelatihan dan sertifikasi untuk anggota komunitas dengan alur yang terstruktur.",
    href: "/v2/affiliate",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Trainer & Subject Matter Expert",
    desc: "Berkolaborasi sebagai trainer atau expert terpilih untuk program yang dijalankan melalui Skillary.",
    href: "/v2/affiliate",
  },
];

export function AffiliateCtaV2() {
  return (
    <section className="py-20 px-5 md:px-6 lg:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}>
            Program Kolaborasi
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Bergabung sebagai Mitra Skillary
          </h2>
          <p className="text-[#64748B] text-base max-w-xl mx-auto">
            Skillary membuka kolaborasi dengan kampus, komunitas, dan trainer untuk bersama-sama menjalankan program pelatihan yang lebih berdampak.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {COLLAB_TYPES.map((collab, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl hover:-translate-y-1 transition-transform flex flex-col"
              style={{ border: "1.5px solid rgb(240, 217, 200)", background: "rgb(255, 251, 245)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", color: "white" }}
              >
                {collab.icon}
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2">{collab.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed flex-1 mb-5">{collab.desc}</p>
              <Link
                href={collab.href}
                className="text-sm font-bold hover:underline"
                style={{ color: "rgb(255, 138, 0)" }}
              >
                Pelajari lebih lanjut →
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-[#64748B] mb-4">Tertarik berkolaborasi dengan cara lain?</p>
          <Link
            href="/v2/affiliate"
            className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-full bg-white hover:bg-orange-50 transition-colors"
            style={{ border: "1.5px solid rgb(240, 217, 200)", color: "#334155" }}
          >
            Diskusikan Peluang Kolaborasi
          </Link>
        </div>
      </div>
    </section>
  );
}
