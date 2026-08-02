import Link from "next/link";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";

const CARD = {
  border: "1px solid rgb(234, 237, 243)",
  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
} as const;

const FORMAT_POINTS = [
  {
    title: "Sesi live bersama praktisi",
    description: "Topik, trainer, dan jadwal hanya ditampilkan setelah seluruh detail sesi dikonfirmasi.",
  },
  {
    title: "Praktik yang dapat langsung dipakai",
    description: "Setiap webinar dirancang untuk membawa framework, contoh, atau latihan yang relevan dengan pekerjaan.",
  },
  {
    title: "Sertifikat sesuai kriteria",
    description: "Eligibility sertifikat atau badge dijelaskan pada halaman setiap webinar sebelum pendaftaran dibuka.",
  },
] as const;

export default function EventsV2Page() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-14 md:pb-20">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)",
          }}
        />
        <div data-reveal className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#94A3B8] mb-5">
            <Link href="/" className="hover:text-[#0F172A] transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0F172A]">Webinar</span>
          </p>
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white"
            style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />
            Live learning Skillary
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            Webinar <GradientText>praktis</GradientText> untuk skill kerja profesional
          </h1>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Skillary sedang menyusun kalender webinar baru bersama trainer. Kami tidak menampilkan jadwal, harga, atau host sampai seluruh detail sesi terverifikasi.
          </p>
        </div>
      </section>

      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-white p-7 md:p-12" style={CARD}>
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF8A00] mb-4">Kalender berikutnya</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">Jadwal webinar sedang dikurasi</h2>
              <p className="text-[#64748B] leading-relaxed mb-7">
                Daftarkan minat Anda. Tim Skillary akan menghubungi Anda setelah topik, trainer, format, investasi, dan ketentuan sertifikat siap diumumkan.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
              >
                Daftarkan minat webinar
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {FORMAT_POINTS.map((point) => (
                <article key={point.title} className="rounded-2xl p-5 bg-[#FFF9F2] border border-[#F0D9C8]">
                  <h3 className="font-bold text-[#0F172A] mb-2">{point.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748B]">{point.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 md:pb-24" style={{ backgroundImage: "url(/images/lp-startup-band.svg)", backgroundSize: "100% 100%" }}>
        <div className="max-w-6xl mx-auto pt-14 md:pt-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-center text-[#FF8A00]">Sambil menunggu jadwal</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <ExploreCard href="/programs" title="Program Terstruktur" desc="Jelajahi topik pembelajaran yang sedang disiapkan Skillary." />
            <ExploreCard href="/resources" title="Materi Gratis" desc="Gunakan template dan materi yang tersedia untuk mulai belajar." />
            <ExploreCard href="/untuk-organisasi" title="For Business" desc="Diskusikan webinar series atau training in-house untuk tim Anda." />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function ExploreCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="lp-lift block rounded-2xl p-6 bg-white" style={CARD}>
      <h3 className="text-base font-bold mb-1.5">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed mb-3">{desc}</p>
      <span className="text-sm font-bold text-[#FF8A00]">Lihat selengkapnya →</span>
    </Link>
  );
}
