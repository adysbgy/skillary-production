import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Minta Proposal Skillary",
  description: "Ajukan kebutuhan pelatihan organisasi Anda dan minta proposal program Skillary yang sesuai dengan topik, peserta, durasi, dan output.",
};

export default function ProposalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFDF9] py-20 lg:py-28" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Proposal
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl text-[#0F172A] mb-6">
            Minta Proposal Skillary
          </h1>
          <p className="text-lg leading-relaxed text-[#475569]">
            Proposal Skillary membantu organisasi memahami pendekatan pelatihan, fitur platform, bentuk kerja sama, dan output yang dapat diterima.
          </p>
        </Container>
      </section>

      {/* Apa Isi Proposal */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
                Apa Isi Proposal Skillary?
              </h2>
              <p className="text-[#475569] leading-relaxed mb-8">
                Proposal disusun untuk memberikan gambaran lengkap tentang bagaimana Skillary dapat mendukung kebutuhan pelatihan organisasi Anda.
              </p>
              <div className="space-y-3">
                {[
                  "Profil singkat Skillary",
                  "Pengalaman pelatihan sejak 1998",
                  "Tantangan pelatihan internal",
                  "Solusi dan pendekatan Skillary",
                  "Alur program pelatihan",
                  "Fitur platform",
                  "Area program yang dapat dikembangkan",
                  "Format kerja sama",
                  "Output untuk organisasi",
                  "Next step diskusi",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                    <span className="text-[#334155] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl p-8" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">
                Cocok untuk Siapa?
              </h3>
              <div className="space-y-4">
                {[
                  { role: "HR / L&D", desc: "Yang membutuhkan partner platform pelatihan terukur." },
                  { role: "Training Manager", desc: "Yang ingin mengelola program training lebih rapi." },
                  { role: "Direktur / Kepala Divisi", desc: "Yang perlu memastikan training berdampak." },
                  { role: "Sekolah / Yayasan", desc: "Yang membutuhkan platform pelatihan untuk guru dan staf." },
                  { role: "PIC Program Pelatihan", desc: "Yang mencari pendekatan pelatihan yang lebih terstruktur." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                    <div>
                      <p className="font-bold text-[#0F172A] text-sm">{item.role}</p>
                      <p className="text-xs text-[#64748B]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Data yang Sebaiknya Disiapkan */}
      <section className="py-16 lg:py-20 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4 text-center">
            Data yang Sebaiknya Disiapkan
          </h2>
          <p className="text-[#475569] text-center mb-10">
            Agar proposal dapat disusun lebih tepat, berikut informasi yang biasanya kami tanyakan:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Jumlah peserta",
              "Topik pelatihan",
              "Target waktu pelaksanaan",
              "Durasi program",
              "Format: online / offline / hybrid",
              "Kebutuhan assessment",
              "Kebutuhan sertifikat",
              "Kebutuhan laporan",
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 text-sm font-medium text-[#334155] flex items-center gap-3" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <span className="font-bold" style={{ color: 'rgb(255, 138, 0)' }}>{idx + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <Container className="text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-6">
            Siap Mendiskusikan Proposal?
          </h2>
          <p className="text-lg text-[#475569] mb-10">
            Ceritakan kebutuhan pelatihan organisasi Anda melalui halaman kontak. Tim Skillary akan meninjau kebutuhan dan menyiapkan proposal yang sesuai.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="w-full sm:w-auto text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Minta Proposal
              </button>
            </Link>
            <Link href="/contact">
              <button className="w-full sm:w-auto bg-[#FFFDF9] text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Diskusi Kebutuhan Training
              </button>
            </Link>
            <Link href="/teams">
              <button className="w-full sm:w-auto bg-white text-[#64748B] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Solusi Organisasi
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
