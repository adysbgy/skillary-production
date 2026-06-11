import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TeamsHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] pb-16 pt-12 lg:pb-24 lg:pt-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[310px] w-[310px] rounded-full blur-[100px] opacity-40" style={{ background: 'rgb(255,138,0,0.15)' }} />

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest shadow-sm" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Untuk Organisasi
          </div>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl text-[#0F172A]">
            Training Internal yang Lebih Terukur untuk Organisasi Anda
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#475569]">
            Skillary membantu perusahaan, sekolah, yayasan, komunitas, dan organisasi menjalankan program pelatihan dengan materi terstruktur, assessment, sertifikat digital, dan laporan peserta.
          </p>

          <p className="mt-4 text-sm font-medium text-[#64748B]">
            Cocok untuk HR, L&D, training manager, kepala sekolah/yayasan, dan pengelola program pelatihan.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact">
              <button className="text-white px-7 py-3.5 shadow-lg font-semibold rounded-full hover:-translate-y-0.5 hover:opacity-90 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Jadwalkan Diskusi
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-7 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Diskusikan Kebutuhan Training
              </button>
            </Link>
          </div>
        </div>

        {/* Corporate Training Dashboard Mockup */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
            <div className="p-4 flex justify-between items-center" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-white/40" />
                <div className="h-3 w-3 rounded-full bg-white/60" />
                <div className="h-3 w-3 rounded-full bg-white/90" />
              </div>
              <div className="text-white text-[10px] uppercase tracking-widest font-bold">Training Management</div>
            </div>

            <div className="p-5 space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Peserta Aktif", value: "48", color: "rgb(255, 138, 0)" },
                  { label: "Completion Rate", value: "87%", color: "#10B981" },
                  { label: "Sertifikat Issued", value: "32", color: "rgb(255, 90, 95)" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#FFFDF9] rounded-lg p-3 text-center" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                    <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    <p className="text-[10px] text-[#64748B] mt-1 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mini Gradebook */}
              <div className="bg-white rounded-lg overflow-hidden" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="bg-[#FFFDF9] px-4 py-2 flex justify-between items-center" style={{ borderBottom: '1px solid rgb(240, 217, 200)' }}>
                  <span className="text-xs font-bold text-[#334155]">Gradebook — Batch April 2026</span>
                  <span className="text-[10px] text-white px-2 py-0.5 rounded font-bold" style={{ background: 'rgb(255, 138, 0)' }}>Export CSV</span>
                </div>
                {[
                  { name: "Diana K.", progress: 100, status: "Completed", statusColor: "bg-[#D1FAE5] text-[#065F46]" },
                  { name: "Budi S.", progress: 65, status: "In Progress", statusColor: "bg-[#FFF7ED] text-[#C2410C]" },
                  { name: "Siti R.", progress: 100, status: "Certified", statusColor: "bg-[#FEF3C7] text-[#92400E]" },
                ].map((row) => (
                  <div key={row.name} className="px-4 py-2.5 flex items-center justify-between border-b last:border-0" style={{ borderColor: 'rgb(240, 217, 200)' }}>
                    <span className="text-sm font-semibold text-[#334155] w-20">{row.name}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-1.5 bg-[#FFFDF9] rounded-full overflow-hidden" style={{ border: '1px solid rgb(240, 217, 200)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${row.progress}%`, background: row.progress === 100 ? "#10B981" : "rgb(255, 138, 0)" }}
                        />
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${row.statusColor}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
