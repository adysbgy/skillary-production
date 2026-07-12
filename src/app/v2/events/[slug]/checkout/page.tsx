"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Manrope } from "next/font/google";
import { getEventBySlug, formatEventPrice } from "@/data/v2-events";

const manrope = Manrope({ subsets: ["latin"] });

const CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
const SNAP_URL =
  process.env.NEXT_PUBLIC_MIDTRANS_ENV === "production"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

const FIELD = { border: "1.5px solid rgb(226, 232, 240)" } as const;
const GRAD = "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))";

type Method = { id: string; label: string; desc?: string; icon: React.ReactNode };
const METHOD_GROUPS: { group: string; items: Method[] }[] = [
  {
    group: "QRIS & E-Wallet",
    items: [
      { id: "qris", label: "QRIS", desc: "Semua e-wallet & m-banking", icon: <QrIcon /> },
      { id: "gopay", label: "GoPay", icon: <WalletIcon /> },
      { id: "shopeepay", label: "ShopeePay", icon: <WalletIcon /> },
    ],
  },
  {
    group: "Virtual Account",
    items: [{ id: "va", label: "Virtual Account", desc: "BCA, BNI, BRI, Mandiri, Permata", icon: <BankIcon /> }],
  },
];

export default function EventCheckoutPage() {
  const params = useParams();
  const slug = String(params?.slug ?? "");
  const event = getEventBySlug(slug);

  const [method, setMethod] = useState("qris");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<null | "paid" | "pending">(null);

  if (!event) {
    return (
      <Shell>
        <div className="max-w-md mx-auto text-center py-24">
          <h1 className="text-2xl font-bold mb-2">Event tidak ditemukan</h1>
          <Link href="/v2/events" className="text-sm font-bold" style={{ color: "rgb(255,138,0)" }}>← Kembali ke Events</Link>
        </div>
      </Shell>
    );
  }

  if (event.price <= 0 || event.status === "Selesai") {
    return (
      <Shell>
        <div className="max-w-md mx-auto text-center py-24">
          <h1 className="text-2xl font-bold mb-2">Checkout tidak tersedia</h1>
          <p className="text-[#64748B] mb-6">Event ini gratis atau sudah selesai — tidak memerlukan pembayaran.</p>
          <Link href={`/v2/events/${event.slug}`} className="text-sm font-bold" style={{ color: "rgb(255,138,0)" }}>← Lihat detail event</Link>
        </div>
      </Shell>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/checkout/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventSlug: slug,
          name: fd.get("name"),
          email: fd.get("email"),
          whatsapp: fd.get("whatsapp"),
          method,
          _honeypot: fd.get("_honeypot") || "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal memproses. Coba lagi.");

      const snap = (window as unknown as { snap?: { pay: (t: string, o: Record<string, () => void>) => void } }).snap;
      if (data.snapToken && snap) {
        snap.pay(data.snapToken, {
          onSuccess: () => setDone("paid"),
          onPending: () => setDone("pending"),
          onError: () => setError("Pembayaran gagal. Coba lagi."),
          onClose: () => setLoading(false),
        });
        return;
      }
      // Gateway not configured yet — order recorded.
      setDone("pending");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <Shell>
        <div className="max-w-md mx-auto text-center py-20">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">{done === "paid" ? "Pembayaran Berhasil!" : "Pesanan Dibuat"}</h1>
          <p className="text-[#64748B] max-w-sm mx-auto">
            {done === "paid"
              ? "Terima kasih. Link akses webinar, rekaman, dan e-sertifikat akan dikirim ke email & WhatsApp Anda."
              : "Selesaikan pembayaran sesuai instruksi. Akses dikirim otomatis setelah pembayaran terkonfirmasi."}
          </p>
          <Link href="/v2/events" className="inline-block mt-6 text-sm font-bold" style={{ color: "rgb(255,138,0)" }}>← Kembali ke Events</Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      {CLIENT_KEY && <Script src={SNAP_URL} data-client-key={CLIENT_KEY} strategy="afterInteractive" />}

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2">Checkout</h1>
      <p className="text-center text-[#64748B] mb-10">Amankan kursi Anda di webinar ini — proses cepat & aman.</p>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-6 items-start max-w-5xl mx-auto">
        {/* ── Left: data + methods ── */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8" style={{ border: "1px solid rgb(234,237,243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
          <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] w-px h-px opacity-0" />

          <h2 className="text-lg font-bold mb-5">Lengkapi Data Anda</h2>
          <div className="space-y-4">
            <Field label="Nama Lengkap" name="name" type="text" placeholder="Nama Anda" />
            <Field label="Alamat Email" name="email" type="email" placeholder="nama@email.com" />
            <Field label="No. WhatsApp" name="whatsapp" type="tel" placeholder="08xxxxxxxxxx" />
          </div>
          <p className="text-xs text-[#94A3B8] mt-2">Link akses & e-sertifikat dikirim ke email dan WhatsApp ini.</p>

          <h2 className="text-lg font-bold mt-8 mb-4">Metode Pembayaran</h2>
          <div className="space-y-5">
            {METHOD_GROUPS.map((g) => (
              <div key={g.group}>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-2.5">{g.group}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {g.items.map((m) => {
                    const active = method === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        className="flex items-center gap-3 p-4 rounded-xl text-left transition-all"
                        style={active ? { border: "1.5px solid rgb(255,138,0)", background: "rgb(255,251,245)", boxShadow: "0 0 0 3px rgba(255,138,0,0.12)" } : FIELD}
                      >
                        <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: active ? GRAD : "rgb(241,245,249)", color: active ? "white" : "#64748B" }}>
                          {m.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold text-[#0F172A] leading-tight">{m.label}</span>
                          {m.desc && <span className="block text-[11px] text-[#94A3B8] leading-tight mt-0.5">{m.desc}</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: order summary ── */}
        <div className="lg:col-span-2 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid rgb(234,237,243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
            <div className="relative h-28 flex items-end p-4" style={{ backgroundImage: event.gradient }}>
              <Image src={event.host.avatar} alt={event.host.name} width={120} height={120} className="absolute -right-2 bottom-0 w-28 h-28 object-contain drop-shadow-lg" />
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{ background: "rgba(0,0,0,0.28)" }}>{event.kind}</span>
            </div>

            <div className="p-6">
              <h2 className="text-base font-bold mb-1 leading-snug">{event.title}</h2>
              <p className="text-xs text-[#94A3B8] mb-4">{event.dateLabel} · {event.time} · {event.format}</p>

              <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mb-2">Yang kamu dapat</p>
              <ul className="space-y-2 mb-5">
                {event.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-[#475569]">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgb(255,138,0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between pt-4 mb-5" style={{ borderTop: "1px solid rgb(241,245,249)" }}>
                <span className="text-sm font-bold text-[#0F172A]">Total</span>
                <span className="text-2xl font-bold text-[#0F172A]">{formatEventPrice(event.price)}</span>
              </div>

              {error && (
                <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm mb-4" style={{ background: "rgb(254,242,242)", border: "1.5px solid rgb(252,165,165)", color: "rgb(185,28,28)" }} role="alert">
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full text-white text-sm font-bold py-4 rounded-full shadow-md transition-all hover:opacity-90 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0" style={{ background: GRAD }}>
                {loading ? "Memproses..." : `Bayar Sekarang · ${formatEventPrice(event.price)}`}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#94A3B8] mt-3">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Pembayaran aman diproses oleh Midtrans
              </p>
            </div>
          </div>
        </div>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${manrope.className} min-h-screen text-[#0F172A]`} style={{ background: "rgb(248,250,252)" }}>
      {/* Minimal, distraction-free checkout header */}
      <header className="bg-white" style={{ borderBottom: "1px solid rgb(234,237,243)" }}>
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Skillary" width={40} height={22} className="h-6 w-auto object-contain" />
            <span className="text-base font-bold tracking-tight">Skillary</span>
          </Link>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
            <svg className="w-4 h-4" style={{ color: "rgb(16,185,129)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Checkout Aman
          </span>
        </div>
      </header>
      <main className="px-5 py-10 md:py-14">{children}</main>
    </div>
  );
}

function Field({ label, name, type, placeholder }: { label: string; name: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-1.5">{label} <span style={{ color: "rgb(255,90,95)" }}>*</span></label>
      <input name={name} type={type} required placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2" style={{ ...FIELD, ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
    </div>
  );
}

function QrIcon() {
  return <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3h3m-3 3h6m0-6v3" /></svg>;
}
function WalletIcon() {
  return <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 10a2 2 0 012-2h14a2 2 0 012 2m-18 0v8a2 2 0 002 2h14a2 2 0 002-2v-8m-4 4h.01" /></svg>;
}
function BankIcon() {
  return <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m4-11v11m8-11v11m4-11v11" /></svg>;
}
