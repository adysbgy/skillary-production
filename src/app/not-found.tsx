import React from "react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />
      <div className="relative z-10 max-w-3xl mx-auto text-center px-5">

        <div className="mb-8 inline-flex items-center justify-center rounded-full px-6 py-2 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
          404 Error
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6" style={{ color: '#0F172A' }}>
          Halaman Tidak Ditemukan
        </h1>

        <p className="text-lg mb-12 leading-relaxed max-w-2xl mx-auto" style={{ color: '#475569' }}>
          Halaman yang Anda cari mungkin sudah dipindahkan atau belum tersedia. Anda dapat kembali ke beranda, melihat area program, atau menghubungi tim Skillary.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link href="/">
            <button className="w-full sm:w-auto text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-sm" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              Kembali ke Beranda
            </button>
          </Link>
          <Link href="/program-catalog">
            <button className="w-full sm:w-auto bg-white font-bold px-8 py-4 rounded-full shadow-sm hover:shadow-md transition-all text-sm" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>
              Lihat Area Program
            </button>
          </Link>
          <Link href="/contact">
            <button className="w-full sm:w-auto bg-transparent font-bold px-8 py-4 transition-all text-sm hover:underline" style={{ color: 'rgb(255, 138, 0)' }}>
              Hubungi Skillary
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
