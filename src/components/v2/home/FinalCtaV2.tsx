import Link from "next/link";

export function FinalCtaV2() {
  return (
    <section className="py-24 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ background: "rgb(17, 24, 39)" }}>
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none opacity-20 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgb(255,138,0) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{ background: "rgba(255,138,0,0.15)", color: "rgb(255,138,0)", border: "1px solid rgba(255,138,0,0.3)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full inline-block bg-[rgb(255,138,0)]" />
          Konsultasi gratis, tanpa komitmen
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-[1.1]">
          Siap Membuat Pelatihan Tim
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
          >
            Lebih Terukur dan Berdampak?
          </span>
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Ceritakan kebutuhan pelatihan organisasi Anda — topik, jumlah peserta, format, dan output yang ingin dicapai. Tim Skillary akan membantu menyusun program yang tepat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <Link
            href="/proposal"
            className="inline-flex items-center gap-2 text-white font-bold text-base px-8 py-4 rounded-full shadow-xl hover:opacity-90 hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
          >
            Isi Form Konsultasi →
          </Link>
          <Link
            href="/program-catalog"
            className="inline-flex items-center gap-2 font-bold text-base px-8 py-4 rounded-full hover:-translate-y-0.5 transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Lihat Program
          </Link>
        </div>

        {/* Reassurance */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          {[
            "✓ Konsultasi 100% gratis",
            "✓ Tidak ada commitment",
            "✓ Proposal dapat disiapkan",
            "✓ Respon dalam 1 hari kerja",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
