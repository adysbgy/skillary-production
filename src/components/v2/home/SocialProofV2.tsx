// Social proof — testimonials with org names + job titles

const TESTIMONIALS = [
  {
    quote: "Skillary memungkinkan kami mendistribusikan program pelatihan ke seluruh divisi, memantau progress peserta secara real-time, dan menyiapkan sertifikat dalam satu alur yang rapi. Tidak perlu lagi spreadsheet manual.",
    name: "Raka M.",
    title: "Training Manager",
    org: "Perusahaan FMCG, Jakarta",
    initial: "R",
    color: "rgb(255, 138, 0)",
  },
  {
    quote: "Alur pembelajaran di Skillary terstruktur dengan baik. Materi, quiz, dan sertifikat terintegrasi dalam satu platform. Peserta langsung tahu apa yang harus dikerjakan tanpa perlu guide tambahan.",
    name: "Alya N.",
    title: "L&D Specialist",
    org: "Institusi Keuangan, Jakarta",
    initial: "A",
    color: "rgb(59, 130, 246)",
  },
  {
    quote: "Kami puas dengan laporan yang dihasilkan — dari gradebook peserta hingga rekap sertifikat, semuanya bisa di-export dan langsung dipresentasikan ke manajemen.",
    name: "Dina K.",
    title: "HR Manager",
    org: "Perusahaan Perbankan",
    initial: "D",
    color: "rgb(16, 185, 129)",
  },
];

const OUTCOMES = [
  { value: "100%", label: "Laporan peserta otomatis tersedia setelah program selesai" },
  { value: "4 jam", label: "Rata-rata waktu setup batch training baru di platform" },
  { value: "21+", label: "Organisasi yang sudah menggunakan layanan Skillary" },
];

export function SocialProofV2() {
  return (
    <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 251, 245)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}>
            Apa Kata Mereka
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight mb-3">
            Dipercaya HR & L&D di Berbagai Organisasi
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl flex flex-col hover:-translate-y-1 transition-transform"
              style={{ border: "1.5px solid rgb(240, 217, 200)" }}
            >
              {/* Quote mark */}
              <div className="text-4xl font-black mb-4 leading-none" style={{ color: t.color, opacity: 0.3 }}>"</div>
              <p className="text-[#334155] text-sm leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-bold text-[#0F172A] text-sm">{t.name}</p>
                  <p className="text-xs text-[#64748B]">{t.title} · <span className="font-medium">{t.org}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Outcome stats */}
        <div className="grid md:grid-cols-3 gap-6 p-8 rounded-2xl" style={{ background: "rgb(17, 24, 39)" }}>
          {OUTCOMES.map((o, i) => (
            <div key={i} className={`text-center ${i < 2 ? "md:border-r" : ""}`} style={{ borderColor: "rgb(55, 65, 81)" }}>
              <div
                className="text-3xl font-extrabold mb-2 bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
              >
                {o.value}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">{o.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
