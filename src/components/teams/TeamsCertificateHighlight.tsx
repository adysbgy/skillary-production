import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TeamsCertificateHighlight() {
  return (
    <section className="bg-[#FFFDF9] py-20 lg:py-32 overflow-hidden relative" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgb(255,138,0,0.06)' }} />

      <Container className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] leading-tight mb-6">
            Sertifikat Digital untuk Dokumentasi Pelatihan
          </h2>
          <p className="text-lg leading-8 text-[#475569] max-w-lg mb-8">
            Sertifikat Skillary dapat diterbitkan berdasarkan penyelesaian pembelajaran dan assessment sesuai ketentuan program, sehingga lebih bermakna sebagai bukti penyelesaian pelatihan.
          </p>

          <ul className="space-y-4 mb-10">
            {[
              "Dilengkapi verification ID unik",
              "Diterbitkan berdasarkan completion & assessment",
              "Mendukung dokumentasi pelatihan internal",
              "Dapat dibagikan secara digital",
            ].map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[#334155] font-medium">
                <span className="h-5 w-5 rounded-full bg-[#10B981]/10 flex items-center justify-center text-xs text-[#10B981]">✓</span>
                {benefit}
              </li>
            ))}
          </ul>

          <Link href="/contact">
            <button className="text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              Diskusikan Program Sertifikasi
            </button>
          </Link>
        </div>

        {/* Certificate Mockup */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto">
          <div className="relative bg-[#FFFDF9] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] p-3 rotate-1 hover:rotate-0 transition-transform duration-500 max-w-[480px] ml-auto" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
            <div className="border-[6px] border-double p-8 text-center rounded-xl bg-white" style={{ borderColor: 'rgb(255, 138, 0)' }}>
              <div className="mb-6 flex justify-between items-start">
                <div className="text-left">
                  <div className="text-[8px] uppercase tracking-widest text-[#64748B] font-bold mb-1">Verification ID</div>
                  <div className="font-mono text-xs font-bold text-[#0F172A] px-2 py-1 rounded inline-block" style={{ background: 'rgb(255, 244, 232)' }}>SK-8849201A</div>
                </div>
                <div className="text-xl font-bold tracking-tight uppercase" style={{ color: 'rgb(255, 138, 0)' }}>Skillary</div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'rgb(255, 138, 0)' }}>Certificate</h3>
              <p className="text-[#64748B] tracking-[0.2em] uppercase text-[9px] font-bold mb-8">Of Completion</p>

              <p className="text-[10px] text-[#64748B] uppercase tracking-widest mb-2">This is to certify that</p>
              <p className="font-serif text-2xl sm:text-3xl text-[#0F172A] mb-6 inline-block pb-2 px-8" style={{ borderBottom: '1px solid rgb(240, 217, 200)' }}>Diana Kusuma</p>

              <p className="text-xs text-[#475569] mb-2">has successfully completed</p>
              <p className="font-bold text-lg text-[#0F172A] mb-10">Leadership & Communication</p>

              <div className="flex justify-between items-end">
                <div className="text-left pt-2 w-32" style={{ borderTop: '1px solid rgb(240, 217, 200)' }}>
                  <p className="text-[9px] text-[#64748B] font-bold uppercase tracking-widest">Date Issued</p>
                  <p className="text-xs font-bold mt-1 text-[#0F172A]">April 29, 2026</p>
                </div>
                <div className="w-16 h-16 bg-white rounded flex items-center justify-center shadow-sm" style={{ border: '1px solid rgb(240, 217, 200)' }}>
                  <span className="text-[7px] text-[#94A3B8] font-bold uppercase text-center leading-tight">Verify<br />Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
