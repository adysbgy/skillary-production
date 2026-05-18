import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CertificateHighlight() {
  return (
    <div id="certificate" className="bg-[#1E3A8A] py-20 lg:py-32 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-[#D88A44] opacity-10 rounded-full blur-[80px] pointer-events-none" />
      
      <Container className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[rgb(255,138,0)]">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Sertifikat Bukti Kompetensi
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
            Sertifikat yang Didukung Assessment
          </h2>
          <p className="text-lg leading-8 text-[#6B625A] max-w-lg mb-8">
            Sertifikat diterbitkan berdasarkan penyelesaian materi dan assessment, sebagai bukti valid hasil pelatihan internal organisasi Anda.
          </p>
          
          <ul className="space-y-4 mb-10">
            {['Dilengkapi verification ID', 'Diterbitkan berdasarkan completion rate', 'Dapat dikaitkan dengan hasil assessment', 'Mendukung dokumentasi pelatihan internal'].map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3 text-white font-medium">
                <span className="h-5 w-5 rounded-full bg-[#10B981] flex items-center justify-center text-xs">✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          <div>
            <Link href="/contact">
              <button className="bg-white text-[#172554] font-bold px-8 py-3.5 rounded-lg shadow-lg hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all">
                Mulai Digitalisasi Sertifikat
              </button>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto">
          {/* Certificate Mockup Container */}
          <div className="relative bg-[#FFFDF9] border border-[#CBD5E1] rounded-lg shadow-[0_30px_60px_rgba(0,0,0,0.4)] p-3 rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[550px] ml-auto">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FAF3EA] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#6B625A] shadow-sm z-20 border border-[#E7DDD4]">
              ILUSTRASI DESAIN SERTIFIKAT
            </div>
            {/* Inner Border */}
            <div className="border border-double border-[6px] border-[#D88A44] p-10 text-center relative">
              
              {/* Subtle pattern or texture could go here via a pseudo-element if needed */}
              
              {/* Header */}
              <div className="mb-8 flex justify-between items-start">
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-widest text-[#64748B] font-bold mb-1">Verification ID</div>
                  <div className="font-mono text-sm font-bold text-[#0F172A] bg-[#FAF3EA] px-2 py-1 rounded inline-block">SK-8849201A</div>
                </div>
                <div className="text-2xl font-bold tracking-tight text-[#1E3A8A] uppercase">
                  Skillary
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-[#D88A44] mb-3">
                Certificate
              </h3>
              <p className="text-[#64748B] tracking-[0.2em] uppercase text-[10px] font-bold mb-10">
                Of Completion
              </p>

              <p className="text-xs text-[#64748B] uppercase tracking-widest mb-3">
                This is to certify that
              </p>

              {/* Name */}
              <p className="font-serif text-4xl sm:text-5xl text-[#0F172A] mb-8 border-b border-[#E7DDD4] inline-block pb-3 px-12">
                Alexendra Jenkins
              </p>

              <p className="text-sm text-[#475569] mb-3">
                has successfully completed the internal training program
              </p>

              {/* Course */}
              <p className="font-bold text-xl text-[#1E3A8A] mb-16">
                Leadership & Business Communication
              </p>

              {/* Footer */}
              <div className="flex justify-between items-end">
                <div className="text-left border-t border-[#CBD5E1] pt-3 w-40">
                  <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">Date Issued</p>
                  <p className="text-sm font-bold mt-1 text-[#0F172A]">April 29, 2026</p>
                </div>

                {/* QR/Stamp Placeholder */}
                <div className="w-20 h-20 bg-white border border-[#E7DDD4] rounded flex items-center justify-center p-1 shadow-sm">
                   <div className="w-full h-full border border-dashed border-[#CBD5E1] flex items-center justify-center">
                     <span className="text-[8px] text-[#94A3B8] font-bold uppercase text-center leading-tight">Verify<br/>Online</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
