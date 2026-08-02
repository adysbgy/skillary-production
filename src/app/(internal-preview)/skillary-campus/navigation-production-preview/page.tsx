import type { Metadata } from "next";
import { AUTH_PREVIEW_STATES, AuthStateHarness, type AuthPreviewState } from "./AuthStateHarness";

export const metadata: Metadata = {
  title: "Production Navigation Validation — Skillary Campus",
  description: "Isolated noindex harness for production marketing navigation validation.",
  robots: { index: false, follow: false },
};

type PreviewQuery = { auth?: string };

export default async function NavigationProductionPreviewPage({ searchParams }: { searchParams: Promise<PreviewQuery> }) {
  const { auth } = await searchParams;
  const initialState: AuthPreviewState = auth && auth in AUTH_PREVIEW_STATES ? auth as AuthPreviewState : "anonymous";
  return (
    <div className="min-h-[180vh] bg-[#f4ecdf] text-[#17212d]">
      <AuthStateHarness key={initialState} initialState={initialState} />
      <main className="mx-auto max-w-6xl px-5 pb-32 pt-36 md:pt-40">
        <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#a25d27]">Isolated production harness</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-[-.04em] md:text-6xl">Validasi navigasi sebelum integrasi production.</h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">Halaman ini hanya menguji state, focus order, scroll behavior, breakpoints, dan geometry header baru. Production gate belum menggunakan komponen ini.</p>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {["Focus order", "Responsive geometry", "Scroll morphing"].map((title) => <section key={title} className="min-h-48 rounded-3xl border border-[#ddcdbb] bg-white/70 p-6"><h2 className="text-lg font-extrabold">{title}</h2><p className="mt-3 text-sm leading-6 text-slate-500">Deterministic validation content for browser review.</p></section>)}
        </div>
      </main>
    </div>
  );
}
