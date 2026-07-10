"use client";

import { useState } from "react";
import { formatEventPrice, type EventItem } from "@/data/v2-events";

const FIELD = { border: "1.5px solid rgb(240, 217, 200)" } as const;

export function eventCtaLabel(event: EventItem) {
  if (event.status === "Selesai") return "Lihat Rekaman";
  return event.price === 0 ? "Daftar Gratis" : "Daftar Sekarang";
}

export function EventRegisterButton({ event, className, style }: { event: EventItem; className: string; style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className} style={style}>
        {eventCtaLabel(event)}
      </button>
      {open && <RegisterModal event={event} onClose={() => setOpen(false)} />}
    </>
  );
}

function RegisterModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          whatsapp: fd.get("whatsapp"),
          organization: fd.get("organization"),
          inquiryType: "Event Registration",
          programInterest: event.title,
          sourcePage: "/v2/events",
          message: `Pendaftaran event: ${event.title} (${event.dateLabel}, ${event.time})`,
          _honeypot: fd.get("_honeypot") || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mendaftar. Coba lagi.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(13,16,28,0.65)" }} onClick={onClose}>
      <div className="relative w-full max-w-md bg-white rounded-2xl p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Tutup" className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:bg-gray-100 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {!submitted ? (
          <>
            <p className="text-xs font-bold text-[#94A3B8] mb-1">{event.dateLabel} · {event.time}</p>
            <h3 className="text-xl font-bold text-[#0F172A] mb-1 pr-6">{event.title}</h3>
            <p className="text-sm text-[#64748B] mb-6">{formatEventPrice(event.price)} · {event.format} · {event.durationMin} menit</p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Nama lengkap</label>
                <input name="name" type="text" required placeholder="Nama Anda" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2" style={{ ...FIELD, ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Email</label>
                <input name="email" type="email" required placeholder="nama@email.com" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2" style={{ ...FIELD, ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1.5">No. WhatsApp</label>
                <input name="whatsapp" type="tel" required placeholder="08xxxxxxxxxx" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2" style={{ ...FIELD, ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Organisasi <span className="font-normal text-[#94A3B8]">(opsional)</span></label>
                <input name="organization" type="text" placeholder="PT / Instansi" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2" style={{ ...FIELD, ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
              </div>

              {error && (
                <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: "rgb(254, 242, 242)", border: "1.5px solid rgb(252, 165, 165)", color: "rgb(185, 28, 28)" }} role="alert">
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <button type="submit" disabled={isLoading} className="w-full text-white text-sm font-bold py-3.5 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-60" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                {isLoading ? "Memproses..." : `${eventCtaLabel(event)} →`}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Pendaftaran Terkirim!</h3>
            <p className="text-sm text-[#64748B] max-w-sm mx-auto">Tim Skillary akan mengirim konfirmasi dan link akses ke email/WhatsApp Anda sebelum acara dimulai.</p>
          </div>
        )}
      </div>
    </div>
  );
}
