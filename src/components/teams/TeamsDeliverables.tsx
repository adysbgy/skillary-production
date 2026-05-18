import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsDeliverables() {
  const deliverables = [
    "Akses program pembelajaran untuk peserta",
    "Materi training terstruktur (module & lesson)",
    "Assessment / evaluasi peserta",
    "Sertifikat digital dengan verification ID",
    "Data progress peserta",
    "Laporan hasil belajar & gradebook",
    "Export data untuk dokumentasi internal (CSV)",
    "Rekap peserta yang selesai / belum selesai",
  ];

  return (
    <section className="py-20 lg:py-32 bg-white" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <Container className="max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Output yang Dapat Diterima Organisasi
          </h2>
        </div>

        <div className="bg-[#FFFDF9] rounded-2xl p-8 lg:p-10 shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
          <div className="grid md:grid-cols-2 gap-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 shrink-0 rounded-full flex items-center justify-center" style={{ background: 'rgb(255, 244, 232)' }}>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(255, 138, 0)' }} />
                </div>
                <p className="text-[#334155] font-medium text-sm">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
            <p className="text-sm text-[#64748B] text-center italic">
              Dapat disesuaikan berdasarkan kebutuhan program.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
