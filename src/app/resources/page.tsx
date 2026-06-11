import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Resource Skillary",
  description: "Kumpulan resource untuk memahami pendekatan Skillary dalam pelatihan internal, proposal, program, portfolio, dan studi kasus.",
};

const salesResources = [
  {
    title: "Proposal Skillary",
    desc: "Ringkasan pendekatan Skillary, fitur platform, format kerja sama, dan output untuk organisasi.",
    cta: "Diskusikan Kebutuhan Training",
    href: "/proposal",
  },
  {
    title: "Area Program",
    desc: "Lihat area pelatihan yang dapat dikembangkan sesuai kebutuhan organisasi.",
    cta: "Lihat Area Program",
    href: "/program-catalog",
  },
  {
    title: "Solusi untuk Organisasi",
    desc: "Pelajari bagaimana Skillary membantu in-house training yang lebih terukur.",
    cta: "Untuk Organisasi",
    href: "/teams",
  },
];

const proofResources = [
  {
    title: "Portfolio Program",
    desc: "Ruang dokumentasi program dan studi kasus yang akan ditambahkan setelah izin publikasi tersedia.",
    cta: "Lihat Portfolio",
    href: "/portfolio",
  },
  {
    title: "Studi Kasus",
    desc: "Template studi kasus untuk mendokumentasikan tantangan, solusi, output, dan hasil program.",
    cta: "Lihat Studi Kasus",
    href: "/case-studies",
  },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFDF9] py-20 lg:py-28" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Resources
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl text-[#0F172A] mb-6">
            Resource Skillary
          </h1>
          <p className="text-lg leading-relaxed text-[#475569]">
            Kumpulan informasi untuk memahami pendekatan Skillary dalam pelatihan internal, assessment, sertifikat digital, dan laporan peserta.
          </p>
        </Container>
      </section>

      {/* Sales Resources */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-2">
            Informasi untuk Organisasi
          </h2>
          <p className="text-[#475569] mb-10">
            Pelajari pendekatan Skillary dan temukan format yang sesuai untuk kebutuhan pelatihan organisasi Anda.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {salesResources.map((item, idx) => (
              <div key={idx} className="bg-[#FFFDF9] rounded-2xl p-6 flex flex-col" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                  <h3 className="font-bold text-[#0F172A]">{item.title}</h3>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed mb-6 flex-1">{item.desc}</p>
                <Link href={item.href} className="inline-flex items-center text-sm font-bold hover:underline" style={{ color: 'rgb(255, 138, 0)' }}>
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof & Documentation */}
      <section className="py-16 lg:py-20 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-2">
                Dokumentasi & Bukti Program
              </h2>
              <p className="text-[#475569] mb-8">
                Ruang dokumentasi yang disiapkan untuk menampilkan bukti program setelah izin publikasi tersedia.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {proofResources.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 flex flex-col" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                      <h3 className="font-bold text-[#0F172A]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed mb-6 flex-1">{item.desc}</p>
                    <Link href={item.href} className="inline-flex items-center text-sm font-bold hover:underline" style={{ color: 'rgb(255, 138, 0)' }}>
                      {item.cta} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4">
                Sales Collateral & Profil
              </h2>
              <p className="text-[#475569] mb-8 leading-relaxed">
                Dokumen resmi untuk memahami profil, kapabilitas, dan penawaran Skillary.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Corporate Proposal", desc: "Rincian alur kerja dan penawaran Skillary.", href: "/resources/corporate-proposal" },
                  { title: "Company Profile", desc: "Profil perusahaan dan pilar layanan.", href: "/resources/company-profile" },
                  { title: "Sales Deck", desc: "Materi presentasi pengenalan (16:9).", href: "/resources/sales-deck" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl transition-colors hover:bg-white hover:shadow-sm group" style={{ border: '1.5px solid rgb(240, 217, 200)', background: 'rgba(255, 244, 232, 0.5)' }}>
                    <div className="mt-1 h-2 w-2 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ background: 'rgb(255, 138, 0)' }} />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#0F172A] text-sm">{item.title}</h4>
                      <p className="text-xs text-[#64748B] mt-1 mb-2">{item.desc}</p>
                      <Link href={item.href} target="_blank" className="text-xs font-bold hover:underline" style={{ color: 'rgb(255, 138, 0)' }}>
                        Lihat Dokumen (Print Ready) →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
                <p className="text-xs text-[#94A3B8] italic">
                  * Dokumen menggunakan narasi legacy Allman → Skillary yang telah dikurasi. Dapat dicetak ke PDF (Cmd+P).
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <Container className="text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
            Butuh Proposal atau Diskusi Program?
          </h2>
          <p className="text-lg text-[#475569] mb-10">
            Ceritakan kebutuhan pelatihan organisasi Anda. Tim Skillary akan membantu menyusun pendekatan yang sesuai.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/proposal">
              <button className="text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusikan Kebutuhan Training
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-[#FFFDF9] text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Diskusi Training
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
