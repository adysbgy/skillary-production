"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <html lang="id"><body className="grid min-h-screen place-items-center bg-slate-950 p-6 text-white">
      <main className="max-w-md text-center"><h1 className="text-2xl font-bold">Terjadi kendala</h1><p className="mt-3 text-sm text-slate-300">Tim kami telah menerima laporan teknisnya. Silakan coba kembali.</p><button id="global-error-retry" onClick={reset} className="mt-6 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-slate-950">Coba lagi</button></main>
    </body></html>
  );
}
