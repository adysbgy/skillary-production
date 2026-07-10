import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { EventRegisterButton } from "@/components/v2/events/EventRegisterButton";
import { getAllEventSlugs, getEventBySlug, formatEventPrice, type EventItem } from "@/data/v2-events";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllEventSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Tidak Ditemukan | Skillary" };
  return {
    title: `${event.title} — Events Skillary`,
    description: event.desc,
  };
}

const CARD = { border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" } as const;

const STATUS_STYLE: Record<EventItem["status"], { bg: string; color: string }> = {
  Mendatang: { bg: "rgb(241, 245, 249)", color: "#0F172A" },
  "Hampir Penuh": { bg: "rgb(255, 244, 232)", color: "rgb(220, 110, 0)" },
  Selesai: { bg: "rgb(241, 245, 249)", color: "#64748B" },
};

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const st = STATUS_STYLE[event.status];
  const metaItems = [
    { label: "Tanggal & Waktu", value: `${event.dateLabel} · ${event.time}`, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { label: "Format", value: `${event.format} · ${event.durationMin} menit`, icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: "Kategori", value: event.category, icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 10V5a2 2 0 012-2z" },
    { label: "Investasi", value: formatEventPrice(event.price), icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 8v2m9-4a9 9 0 11-18 0 9 9 0 0118 0z" },
  ];

  return (
    <MarketingShell>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pt-16 md:pt-20 pb-12 md:pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
        <div data-reveal className="relative max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-[#94A3B8] mb-6">
            <Link href="/" className="hover:text-[#0F172A] transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <Link href="/v2/events" className="hover:text-[#0F172A] transition-colors">Events</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0F172A]">{event.title}</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full" style={{ background: st.bg, color: st.color }}>{event.status}</span>
            <span className="text-[11px] font-bold px-3 py-1.5 rounded-full text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>{event.kind}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">{event.title}</h1>
          <p className="text-base md:text-lg text-[#64748B] leading-relaxed mb-8 max-w-2xl">{event.desc}</p>

          <div className="flex flex-wrap items-center gap-3">
            <EventRegisterButton
              event={event}
              className="text-sm font-bold px-8 py-4 rounded-full text-white hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
            />
            <Link href="/v2/events" className="text-sm font-bold px-8 py-4 rounded-full text-[#0F172A] bg-white hover:bg-gray-50 transition-colors" style={{ border: "1.5px solid rgb(226, 232, 240)" }}>
              Lihat Events Lain
            </Link>
          </div>
        </div>
      </section>

      {/* ── Meta grid ── */}
      <section className="px-5 pb-14 md:pb-16">
        <div data-reveal className="max-w-3xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metaItems.map((m) => (
            <div key={m.label} className="rounded-2xl p-5 bg-white" style={CARD}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>
                <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">{m.label}</p>
              <p className="text-sm font-bold text-[#0F172A] leading-snug">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Agenda + Benefits ── */}
      <section className="px-5 pb-16 md:pb-20" style={{ backgroundImage: "url(/images/lp-startup-band.svg)", backgroundSize: "100% 100%" }}>
        <div className="max-w-3xl mx-auto pt-14 md:pt-16 grid md:grid-cols-2 gap-5">
          <div data-reveal className="rounded-2xl p-7 bg-white" style={CARD}>
            <h2 className="text-lg font-bold mb-5">Agenda Sesi</h2>
            <ol className="space-y-4">
              {event.agenda.map((a, i) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white text-[11px] font-bold" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#334155] leading-relaxed pt-0.5">{a}</p>
                </li>
              ))}
            </ol>
          </div>

          <div data-reveal className="rounded-2xl p-7 bg-white" style={CARD}>
            <h2 className="text-lg font-bold mb-5">Yang Akan Didapat</h2>
            <ul className="space-y-4">
              {event.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgb(255,138,0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <p className="text-sm text-[#334155] leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Host card */}
        <div data-reveal className="max-w-3xl mx-auto mt-5">
          <div className="rounded-2xl p-7 bg-white flex items-start gap-4" style={CARD}>
            <Image src={event.host.avatar} alt={event.host.name} width={56} height={56} className="w-14 h-14 rounded-full object-cover shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">Pembawa Sesi</p>
              <h3 className="text-base font-bold text-[#0F172A] mb-0.5">{event.host.name}</h3>
              <p className="text-xs font-semibold mb-2" style={{ color: "rgb(255,138,0)" }}>{event.host.role}</p>
              <p className="text-sm text-[#64748B] leading-relaxed">{event.host.bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-5 pb-16 md:pb-20">
        <div data-reveal className="max-w-3xl mx-auto rounded-2xl p-9 md:p-12 text-center text-white" style={{ background: "rgb(13, 16, 28)" }}>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
            {event.status === "Selesai" ? "Akses rekaman sesi ini" : "Amankan kursi Anda"}
          </h2>
          <p className="text-white/70 mb-7 max-w-md mx-auto leading-relaxed">
            {event.status === "Selesai"
              ? "Sesi ini sudah selesai, tapi rekamannya masih bisa diakses kapan saja."
              : `${formatEventPrice(event.price)} · ${event.dateLabel} · ${event.time}`}
          </p>
          <EventRegisterButton
            event={event}
            className="inline-block text-sm font-bold px-9 py-4 rounded-full text-white hover:opacity-90 transition-opacity shadow-xl"
            style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
          />
        </div>
      </section>
    </MarketingShell>
  );
}
