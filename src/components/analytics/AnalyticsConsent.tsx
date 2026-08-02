"use client";

import { useSyncExternalStore } from "react";
import { getAnalyticsConsent, setAnalyticsConsent } from "@/lib/observability/analytics";

function subscribe(onChange: () => void): () => void {
  window.addEventListener("skillary:analytics-consent", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("skillary:analytics-consent", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function AnalyticsConsentBanner() {
  const consent = useSyncExternalStore(subscribe, getAnalyticsConsent, () => null);
  if (consent !== null) return null;
  const choose = (value: "granted" | "denied") => { setAnalyticsConsent(value); window.dispatchEvent(new Event("skillary:analytics-consent")); };
  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white/95 p-5 shadow-2xl backdrop-blur" aria-label="Preferensi analitik">
      <p className="text-sm font-semibold text-slate-900">Privasi Anda tetap utama</p>
      <p className="mt-1 text-xs leading-5 text-slate-600">Kami hanya mengaktifkan PostHog dan Google Analytics setelah Anda menyetujui analitik non-esensial. Tidak ada rekaman sesi atau autocapture.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button id="analytics-consent-accept" type="button" onClick={() => choose("granted")} className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white">Izinkan analitik</button>
        <button id="analytics-consent-reject" type="button" onClick={() => choose("denied")} className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800">Hanya esensial</button>
      </div>
    </aside>
  );
}
