import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProgramSlugs, getProgramBySlug } from "@/data/v2-programs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program Tidak Ditemukan | Skillary" };
  // Root layout applies a "%s | Skillary" title template, so the brand
  // suffix is added automatically — don't repeat it here.
  return {
    title: `${program.title} — Pelatihan Korporat`,
    description: `${program.tagline} ${program.desc}`,
  };
}

// Safe social-proof framing — industry sectors, not unapproved client names.
// Matches the treatment already used on /v2/about and /v2/proposal.
const INDUSTRY_CHIPS = ["Perbankan", "Regulator", "FMCG", "Energi", "Pendidikan"];

export default async function ProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  const proposalHref = `/v2/proposal?program=${encodeURIComponent(program.title)}`;
  const techInfo = [
    { label: "Durasi", value: program.duration, icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Format", value: program.formats.join(", "), icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Jumlah Peserta", value: program.participants, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: "Level", value: program.level, icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── Section 1: Hero ── */}
      <section className="relative text-white overflow-hidden" style={{ background: program.gradient }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 85% 15%, white 0%, transparent 55%)" }} />
        <div className="relative max-w-4xl mx-auto px-5 md:px-6 lg:px-8 pt-10 pb-14">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/80 mb-8">
            <Link href="/v2/catalog" className="hover:text-white transition-colors">Katalog</Link>
            <span className="text-white/50">/</span>
            <span>{program.category}</span>
            <span className="text-white/50">/</span>
            <span className="text-white">{program.title}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[program.level, program.duration, ...program.formats].map((b, i) => (
              <span key={`${b}-${i}`} className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
                {b}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.12] mb-4 max-w-3xl">
            {program.title}
          </h1>
          <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
            {program.tagline}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href={proposalHref} className="inline-flex items-center gap-2 bg-white text-sm font-bold px-7 py-3.5 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ color: "rgb(255, 90, 95)" }}>
              Diskusikan Program Ini →
            </Link>
            <Link href="/v2/catalog" className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3.5 rounded-full transition-colors hover:bg-white/10" style={{ border: "1.5px solid rgba(255,255,255,0.5)", color: "white" }}>
              Lihat Katalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2: Outcomes ── */}
      {program.outcomes.length > 0 && (
        <section className="py-16 md:py-20 px-5 md:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 text-center">Yang Akan Dicapai Peserta</h2>
            <p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">Outcome konkret yang dapat langsung diterapkan di pekerjaan setelah program selesai.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {program.outcomes.map((o) => (
                <div key={o} className="flex items-start gap-3.5 p-5 rounded-2xl" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-sm text-[#334155] leading-relaxed pt-1">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 3: Untuk Siapa ── */}
      {program.forWhom.length > 0 && (
        <section className="py-16 md:py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 text-center">Program Ini Dirancang untuk</h2>
            <p className="text-[#64748B] text-center mb-12 max-w-xl mx-auto">Relevan untuk berbagai peran yang ingin meningkatkan kompetensi di area ini.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {program.forWhom.map((p) => (
                <div key={p.role} className="bg-white rounded-2xl p-6" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-sm mb-1.5 leading-snug">{p.role}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{p.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Section 4: Modul / Silabus ── */}
      {program.modules.length > 0 && (
        <section className="py-16 md:py-20 px-5 md:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 text-center">Apa yang Dipelajari</h2>
            <p className="text-[#64748B] text-center mb-10 max-w-xl mx-auto">Silabus terstruktur dari fundamental hingga penerapan praktis.</p>
            <div className="space-y-3">
              {program.modules.map((m, i) => (
                <details key={m.title} className="group rounded-2xl bg-white overflow-hidden" style={{ border: "1.5px solid rgb(240, 217, 200)" }} open={i === 0}>
                  <summary className="flex items-center gap-4 p-5 cursor-pointer list-none select-none">
                    <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-bold text-[#0F172A] text-sm flex-1">{m.title}</span>
                    <svg className="w-5 h-5 text-[#94A3B8] transition-transform group-open:rotate-180 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </summary>
                  <div className="px-5 pb-5 pl-[4.5rem]">
                    <ul className="space-y-2">
                      {m.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#475569]">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: "rgb(255, 138, 0)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ))}
            </div>
            <p className="text-xs text-[#94A3B8] text-center mt-6">Modul dapat disesuaikan dengan kebutuhan spesifik organisasi Anda.</p>
          </div>
        </section>
      )}

      {/* ── Fallback note (programs without full detail) ── */}
      {!program.hasFullDetail && (
        <section className="py-16 px-5 md:px-6 lg:px-8 bg-white">
          <div className="max-w-2xl mx-auto text-center p-8 rounded-2xl" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Silabus lengkap sedang disiapkan</h2>
            <p className="text-sm text-[#64748B] mb-6 leading-relaxed">Detail modul untuk program ini dapat kami susun langsung sesuai kebutuhan tim Anda — topik, kedalaman, dan studi kasus disesuaikan dengan konteks organisasi.</p>
            <Link href={proposalHref} className="inline-flex items-center gap-2 text-white text-sm font-bold px-7 py-3 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
              Diskusikan Silabus Program →
            </Link>
          </div>
        </section>
      )}

      {/* ── Section 5: Informasi Teknis ── */}
      <section className="py-16 md:py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-10 text-center">Informasi Program</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {techInfo.map((info) => (
              <div key={info.label} className="bg-white rounded-2xl p-6 text-center" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={info.icon} /></svg>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">{info.label}</p>
                <p className="text-sm font-bold text-[#0F172A]">{info.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#94A3B8] text-center mt-6">Program tersedia dalam format in-house, online, dan hybrid.</p>
        </div>
      </section>

      {/* ── Section 6: CTA (dark) ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(17, 24, 39)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ background: "rgba(255,138,0,0.12)", border: "1.5px solid rgba(255,138,0,0.3)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Konsultasi Gratis</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">Tertarik dengan program ini?</h2>
          <p className="text-base text-gray-400 mb-8 leading-relaxed">Ceritakan kebutuhan tim Anda — kami bantu sesuaikan topik, durasi, dan format. Respon dalam 1 hari kerja.</p>
          <Link href={proposalHref} className="inline-flex items-center gap-2 text-white text-sm font-bold px-8 py-4 rounded-full shadow-xl hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
            Diskusikan dengan Tim Skillary →
          </Link>

          <div className="mt-10 pt-8" style={{ borderTop: "1px solid rgb(31, 41, 55)" }}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">Berangkat dari arsip pengalaman pelatihan korporat sejak 1998</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {INDUSTRY_CHIPS.map((c) => (
                <span key={c} className="text-xs font-semibold px-3 py-1.5 rounded-full text-gray-300" style={{ border: "1px solid rgb(55, 65, 81)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
