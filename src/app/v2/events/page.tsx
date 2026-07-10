"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";
import { EventRegisterButton } from "@/components/v2/events/EventRegisterButton";
import { EVENTS, EVENT_FILTERS, formatEventPrice, type EventItem } from "@/data/v2-events";

const CARD = { border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" } as const;

// Semantic status colours — green = kursi tersedia, red = urgency (hampir
// penuh), grey = sudah lewat. Mirrors the Available/Fully Booked/Coming Soon
// signalling in the reference so scarcity reads at a glance.
const STATUS_STYLE: Record<EventItem["status"], { bg: string; color: string; dot: string }> = {
  Mendatang: { bg: "rgb(220, 252, 231)", color: "rgb(21, 128, 61)", dot: "rgb(34,197,94)" },
  "Hampir Penuh": { bg: "rgb(254, 226, 226)", color: "rgb(185, 28, 28)", dot: "rgb(239,68,68)" },
  Selesai: { bg: "rgb(241, 245, 249)", color: "rgb(100, 116, 139)", dot: "rgb(148,163,184)" },
};

export default function EventsV2Page() {
  const [activeFilter, setActiveFilter] = useState(EVENT_FILTERS[0].label);

  const filter = EVENT_FILTERS.find((f) => f.label === activeFilter) ?? EVENT_FILTERS[0];
  const filtered = EVENTS.filter(filter.match).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <MarketingShell>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
        <div data-reveal className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-[#94A3B8] mb-5">
            <Link href="/" className="hover:text-[#0F172A] transition-colors">Beranda</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0F172A]">Events</span>
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Events Skillary
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            Webinar <GradientText>praktis</GradientText>{" "}untuk skill kerja profesional
          </h1>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Sesi live singkat dan padat, dibawakan praktisi berpengalaman. Datang dengan pertanyaan, pulang dengan langkah yang bisa langsung dipakai di kerjaan.
          </p>
        </div>
      </section>

      {/* ── Filter tabs + grid ── */}
      <section className="px-5 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <div data-reveal className="flex flex-wrap items-center justify-between gap-4 mb-9">
            <div className="flex flex-wrap gap-2">
              {EVENT_FILTERS.map((f) => {
                const active = f.label === activeFilter;
                return (
                  <button
                    key={f.label}
                    onClick={() => setActiveFilter(f.label)}
                    className="text-sm font-semibold px-4 py-2 rounded-full transition-all"
                    style={active ? { background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", color: "white" } : { background: "white", color: "#64748B", border: "1.5px solid rgb(226, 232, 240)" }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-[#94A3B8] font-medium">Events ({filtered.length})</p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((ev) => (
                <EventCard key={ev.slug} event={ev} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl bg-white" style={CARD}>
              <p className="text-sm text-[#94A3B8] font-medium">Tidak ada events pada kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Keep exploring ── */}
      <section className="px-5 pb-16 md:pb-24" style={{ backgroundImage: "url(/images/lp-startup-band.svg)", backgroundSize: "100% 100%" }}>
        <div className="max-w-6xl mx-auto pt-14 md:pt-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-6 text-center" style={{ color: "rgb(255,138,0)" }}>
            Jelajahi Lainnya
          </p>
          <div data-reveal className="grid sm:grid-cols-3 gap-4">
            <ExploreCard href="/v2/catalog" title="Program Terstruktur" desc="Lihat katalog training multi-sesi lengkap dengan sertifikat." />
            <ExploreCard href="/v2/resources" title="Free Workshops" desc="Template & materi gratis untuk HR dan L&D." />
            <ExploreCard href="/v2/untuk-organisasi" title="Untuk Organisasi" desc="Susun program in-house khusus tim Anda." />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const st = STATUS_STYLE[event.status];
  const detailHref = `/v2/events/${event.slug}`;
  const free = event.price === 0;

  return (
    <div data-reveal className="lp-lift rounded-2xl overflow-hidden bg-white flex flex-col" style={CARD}>
      {/* Header — instructor portrait tinted with the category gradient */}
      <Link href={detailHref} className="relative h-44 block overflow-hidden" style={{ backgroundImage: event.gradient }}>
        <Image src={event.host.avatar} alt={event.host.name} width={176} height={176} className="absolute -right-3 bottom-0 w-40 h-40 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]" />
        <span className="absolute top-3.5 left-3.5 text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "rgba(0,0,0,0.28)" }}>
          {event.kind}
        </span>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {/* Category + semantic status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: "rgb(255,138,0)" }}>{event.category}</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: st.dot }} />
            {event.status}
          </span>
        </div>

        {/* Title → detail page */}
        <Link href={detailHref} className="hover:underline decoration-2 underline-offset-2">
          <h3 className="text-lg font-bold mb-2 leading-snug">{event.title}</h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-[#64748B] leading-relaxed mb-3 flex-1">{event.desc}</p>

        {/* Host as trust line (institution-equivalent) */}
        <p className="text-xs font-semibold text-[#475569] mb-4">{event.host.name} · {event.host.role}</p>

        <div className="pt-4" style={{ borderTop: "1px solid rgb(241, 245, 249)" }}>
          {/* Date */}
          <p className="text-xs font-medium text-[#94A3B8] mb-3 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            {event.dateLabel} · {event.time}
          </p>

          {/* Price prominent + format */}
          <div className="flex items-end justify-between mb-4">
            <span className="text-xl font-bold" style={{ color: free ? "rgb(21,128,61)" : "#0F172A" }}>{formatEventPrice(event.price)}</span>
            <span className="text-[11px] font-semibold text-[#94A3B8]">{event.format} · {event.durationMin} menit</span>
          </div>

          {/* Full-width direct CTA */}
          <EventRegisterButton
            event={event}
            className="w-full text-center text-sm font-bold py-3 rounded-full text-white hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
          />
        </div>
      </div>
    </div>
  );
}

function ExploreCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="lp-lift block rounded-2xl p-6 bg-white" style={CARD}>
      <h3 className="text-base font-bold mb-1.5">{title}</h3>
      <p className="text-sm text-[#64748B] leading-relaxed mb-3">{desc}</p>
      <span className="text-sm font-bold" style={{ color: "rgb(255,138,0)" }}>Lihat selengkapnya →</span>
    </Link>
  );
}
