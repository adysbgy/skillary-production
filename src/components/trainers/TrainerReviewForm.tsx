"use client";
import { FormEvent, useState } from "react";

export function TrainerReviewForm({ token }: { token: string }) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setPending(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`/api/trainer-review/${encodeURIComponent(token)}`, { method: "POST", headers: { "Content-Type": "application/json" }, cache: "no-store", body: JSON.stringify({ approved: form.get("approved") === "on", photoApproved: form.get("photoApproved") === "on", corrections: form.get("corrections") }) });
      const data = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) { setError(data?.error || "Review tidak dapat dikirim. Muat ulang halaman dan coba lagi."); return; }
      setDone(true);
    } catch { setError("Koneksi bermasalah. Periksa jaringan Anda lalu coba lagi."); }
    finally { setPending(false); }
  }
  if (done) return <div role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8"><h2 className="text-2xl font-extrabold text-emerald-950">Terima kasih—review terkirim</h2><p className="mt-2 text-emerald-800">Tim Skillary akan memproses persetujuan atau koreksi Anda sebelum profil dipublikasikan.</p></div>;
  return <form onSubmit={submit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5"><label className="block text-sm font-bold text-slate-700">Koreksi atau catatan (opsional)<textarea name="corrections" maxLength={5000} rows={5} disabled={pending} className="mt-2 w-full rounded-xl border p-3 font-normal" placeholder="Tuliskan bagian yang perlu diubah sebelum dipublikasikan." /></label><label className="flex gap-3 text-sm leading-6 text-slate-600"><input name="photoApproved" required type="checkbox" disabled={pending} className="mt-1 h-5 w-5 accent-orange-600" />Saya memiliki hak atas foto yang ditampilkan dan menyetujui penggunaannya pada profil Skillary.</label><label className="flex gap-3 text-sm leading-6 text-slate-600"><input name="approved" required type="checkbox" disabled={pending} className="mt-1 h-5 w-5 accent-orange-600" />Saya telah meninjau informasi profil dan menyetujui publikasinya, dengan mempertimbangkan koreksi di atas.</label>{error && <p role="alert" className="text-sm font-bold text-red-600">{error}</p>}<button disabled={pending} aria-busy={pending} className="min-h-12 w-full rounded-full bg-slate-950 px-6 font-bold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60">{pending ? "Mengirim review…" : "Kirim review & persetujuan"}</button></form>;
}
