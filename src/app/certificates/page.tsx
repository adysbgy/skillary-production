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
    { label: "Peserta mengikuti materi", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>) },
    { label: "Peserta menyelesaikan assessment", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>) },
    { label: "Sistem memeriksa ketentuan program", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>) },
    { label: "Sertifikat digital diterbitkan", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>) },
    { label: "Sertifikat dapat diverifikasi melalui ID", icon: (<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>) },
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
                <div className="space-y-3">
                  {howItWorks.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-center p-3 rounded-xl" style={{ background: 'rgb(255, 248, 241)', border: '1px solid rgb(240, 217, 200)' }}>
                      <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm" style={{ color: 'rgb(255, 138, 0)', border: '1px solid rgb(240, 217, 200)' }}>
                        {step.icon}
                      </div>
                      <p className="font-semibold text-[#181818] text-sm">{step.label}</p>
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
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
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
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
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
        <section className="py-14 text-center" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-2xl">
            <div className="bg-white rounded-3xl p-10 shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">Ingin Sertifikat untuk Program Internal Anda?</h2>
              <p className="text-base text-black/60 mb-8 leading-relaxed">Kami dapat membantu menyusun alur assessment, kriteria kelulusan, format sertifikat digital, dan laporan peserta sesuai kebutuhan organisasi.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact?type=assessment">
                  <button className="text-white px-7 py-3.5 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all text-sm" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                    Diskusikan Sertifikat Training
                  </button>
                </Link>
                <Link href="/platform">
                  <button className="bg-white text-[#334155] font-bold px-7 py-3.5 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all text-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                    Lihat Contoh Alur Sertifikat
                  </button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
