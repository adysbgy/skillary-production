import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />

      <Container className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
          Kontak
        </div>
        <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl mb-6" style={{ color: '#0F172A' }}>
          Diskusikan Kebutuhan Training Organisasi Anda
        </h1>

        <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto mb-8" style={{ color: '#475569' }}>
          Ceritakan kebutuhan pelatihan, jumlah peserta, topik, dan output yang ingin dicapai. Tim Skillary akan membantu menyusun pendekatan yang sesuai.
        </p>

        <p className="text-sm font-medium max-w-xl mx-auto mb-10" style={{ color: '#475569' }}>
          Cocok untuk HR, L&D, training manager, sekolah, yayasan, komunitas, dan organisasi yang ingin menjalankan pembelajaran lebih terukur.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#form">
            <button className="text-white px-8 py-3.5 shadow-lg transition-all font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              Isi Form Inquiry
            </button>
          </a>
          <Link href="/teams">
            <button className="px-8 py-3.5 transition-colors font-bold rounded-full bg-white hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#0F172A' }}>
              Lihat Solusi untuk Organisasi
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
