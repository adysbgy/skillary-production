import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sertifikat Digital & Assessment | Skillary",
  description: "Sertifikat Skillary diterbitkan berdasarkan penyelesaian pembelajaran dan assessment sesuai ketentuan program.",
};

export default function CertificatesPage() {
  const howItWorks = [
    "Peserta mengikuti materi",
    "Peserta menyelesaikan assessment",
    "Sistem memeriksa ketentuan program",
    "Sertifikat digital diterbitkan",
    "Sertifikat dapat diverifikasi melalui ID",
  ];

  const benefitsOrg = [
    "Dokumentasi pelatihan",
    "Bukti penyelesaian program",
    "Rekap peserta",
    "Mendukung evaluasi internal",
  ];

  const benefitsParticipant = [
    "Bukti penyelesaian",
    "Dapat dibagikan digital",
    "Menguatkan portfolio pembelajaran",
  ];

  return (
    <>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
        {/* Hero Section */}
        <section className="pt-10 pb-20 relative overflow-hidden" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: 'rgb(255,138,0,0.12)' }} />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: 'rgb(255,90,95,0.10)' }} />
          <Container className="max-w-4xl text-center relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Sertifikat Bukti Kompetensi
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 text-[#181818]">
              Sertifikat yang Didukung Assessment
            </h1>
            <p className="text-xl text-black/60 leading-relaxed mb-10 max-w-2xl mx-auto">
              Sertifikat Skillary diterbitkan berdasarkan penyelesaian pembelajaran dan assessment sesuai ketentuan program.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=assessment">
                <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Diskusi Sertifikat Program
                </button>
              </Link>
              <Link href="/platform">
                <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Lihat Platform
                </button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <Container className="max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* How it works */}
              <div>
                <h2 className="text-3xl font-bold text-[#181818] mb-4">
                  Mengapa Sertifikat Ini Lebih Bermakna?
                </h2>
                <p className="text-black/60 mb-10 leading-relaxed">
                  Sertifikat tidak hanya diberikan karena kehadiran, tetapi karena peserta benar-benar telah menyelesaikan materi dan mencapai batas kelulusan assessment yang ditentukan organisasi.
                </p>
                <h3 className="text-sm font-bold uppercase tracking-widest text-black/45 mb-6">
                  Alur Penerbitan Otomatis
                </h3>
                <div className="space-y-4">
                  {howItWorks.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-center p-3 rounded-xl" style={{ background: 'rgb(255, 248, 241)', border: '1px solid rgb(240, 217, 200)' }}>
                      <div className="h-8 w-8 rounded bg-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm" style={{ color: 'rgb(255, 138, 0)', border: '1px solid rgb(240, 217, 200)' }}>
                        {idx + 1}
                      </div>
                      <p className="font-semibold text-[#181818]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificate Mockup */}
              <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto">
                <div className="relative bg-[#FFFDF9] rounded-2xl shadow-2xl p-3 lg:rotate-2" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-sm z-20" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(180, 100, 0)', border: '1px solid rgb(255, 214, 165)' }}>
                    ILUSTRASI DESAIN SERTIFIKAT
                  </div>
                  <div className="p-8 text-center bg-white rounded-xl" style={{ border: '6px double rgb(255, 138, 0)' }}>
                    <div className="mb-6 flex justify-between items-start">
                      <div className="text-left">
                        <div className="text-[9px] uppercase tracking-widest text-black/45 font-bold mb-1">Verification ID</div>
                        <div className="font-mono text-xs font-bold text-[#181818] px-2 py-1 rounded inline-block" style={{ background: 'rgb(255, 244, 232)' }}>SK-8849201A</div>
                      </div>
                      <div className="text-xl font-extrabold tracking-tight" style={{ color: 'rgb(255, 138, 0)' }}>
                        Skillary
                      </div>
                    </div>
                    <h3 className="font-serif text-3xl font-bold mb-2" style={{ color: 'rgb(255, 138, 0)' }}>
                      Certificate
                    </h3>
                    <p className="text-black/45 tracking-[0.2em] uppercase text-[9px] font-bold mb-6">
                      Of Completion
                    </p>
                    <p className="font-serif text-2xl text-[#181818] inline-block pb-2 px-8 mb-6" style={{ borderBottom: '1px solid rgb(240, 217, 200)' }}>
                      Alexendra Jenkins
                    </p>
                    <p className="text-xs text-black/60 mb-2">has successfully completed the assessment for</p>
                    <p className="font-bold text-lg mb-10 text-[#181818]">Leadership &amp; Business Communication</p>
                    <div className="flex justify-between items-end pt-3" style={{ borderTop: '1px solid rgb(240, 217, 200)' }}>
                      <div className="text-left">
                        <p className="text-[9px] text-black/45 font-bold uppercase tracking-widest">Date Issued</p>
                        <p className="text-xs font-bold mt-1 text-[#181818]">April 29, 2026</p>
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center p-1 shadow-sm rounded" style={{ background: 'rgb(255, 248, 241)', border: '1px solid rgb(240, 217, 200)' }}>
                        <span className="text-[6px] text-black/45 font-bold uppercase text-center leading-tight">Verify<br />Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 bg-[#FAF3EA]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6 text-xl" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>🏢</div>
                <h3 className="text-xl font-bold text-[#181818] mb-6">Manfaat Bagi Organisasi</h3>
                <ul className="space-y-4">
                  {benefitsOrg.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                      <span className="text-[#334155] font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="h-12 w-12 rounded-full flex items-center justify-center mb-6 text-xl" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>👩‍💻</div>
                <h3 className="text-xl font-bold text-[#181818] mb-6">Manfaat Bagi Peserta</h3>
                <ul className="space-y-4">
                  {benefitsParticipant.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="h-5 w-5 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                      <span className="text-[#334155] font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Bottom */}
        <section className="py-20 text-center" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#181818] mb-6">Diskusikan Program Sertifikasi Anda</h2>
            <p className="text-lg text-black/60 mb-10">Tim Skillary siap membantu merancang program pelatihan dengan sertifikat digital yang terukur.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/program-catalog">
                <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Lihat Program
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Diskusikan Sertifikat Training
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
