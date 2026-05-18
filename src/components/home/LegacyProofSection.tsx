import React from "react";
import { Container } from "@/components/ui/Container";

export function LegacyProofSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FFFDF9] border-t border-[#E7DDD4]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex rounded-full bg-[#FFF7ED] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#C2410C] border border-[#FED7AA] mb-6">
              Lebih dari Sekadar Aplikasi
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-6 leading-tight">
              Wajah Baru dari Pengalaman Panjang di Dunia Pelatihan
            </h2>
            <p className="text-[#475569] text-lg leading-relaxed mb-10">
              Skillary lahir dari pengalaman panjang Allman dalam mendampingi pelatihan korporat sejak 1998. Selama perjalanan tersebut, Allman telah terlibat dalam ratusan sesi pembelajaran di berbagai organisasi, khususnya pada bidang data, dashboard, infografis, visual communication, presentasi bisnis, dan komunikasi laporan. Sebagian pengalaman tersebut telah terdokumentasi dalam arsip digital dan kini dikurasi sebagai portofolio awal yang melatarbelakangi pengembangan Skillary.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Pengalaman Pelatihan", desc: "Berangkat dari praktik panjang dalam pengembangan kompetensi." },
                { title: "Transformasi Digital", desc: "Mendigitalkan alur pembelajaran, dari materi hingga sertifikasi." },
                { title: "Fokus Organisasi", desc: "Dirancang khusus untuk kebutuhan HR, L&D, dan pengelola program." },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-[#FFF7ED] flex items-center justify-center border border-[#FED7AA] text-[#C2410C] font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-[#D88A44]/5 rounded-3xl transform rotate-3" />
            <div className="relative bg-white border border-[#E7DDD4] rounded-2xl shadow-sm p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#64748B] mb-8 text-center border-b border-[#F5F0EB] pb-4">
                Evolusi Pembelajaran
              </h3>
              
              <div className="space-y-4">
                {[
                  { title: "Pengalaman Pelatihan", desc: "Berangkat dari praktik panjang dalam mendampingi pengembangan kompetensi." },
                  { title: "Transformasi Digital", desc: "Alur digital yang menghubungkan materi, assessment, sertifikat, dan laporan." },
                  { title: "Fokus Organisasi", desc: "Membantu HR, L&D, sekolah, yayasan, komunitas, dan pengelola program." },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-[#FFFDF9] border border-[#E7DDD4] rounded-xl flex gap-4">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#D88A44]" />
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-[#475569] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 text-center mt-8">
            <p className="text-xs text-[#94A3B8] italic">
              * Angka dokumentasi digital merujuk pada arsip konten yang berhasil dikurasi, bukan total keseluruhan pengalaman Allman sejak 1998.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
