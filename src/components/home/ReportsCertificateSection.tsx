import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function ReportsCertificateSection() {
  const rows = [
    { name: "Peserta A", progress: 100, assessment: "Selesai", cert: "Terbit", followUp: "—" },
    { name: "Peserta B", progress: 85, assessment: "Selesai", cert: "Pending", followUp: "—" },
    { name: "Peserta C", progress: 40, assessment: "Belum", cert: "—", followUp: "Perlu follow-up" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF3EA] border-y border-[#E7DDD4]">
      <Container className="max-w-6xl">
        <div className="motion-fade-up text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#172554] leading-tight mb-5">
            Laporan yang Bisa Dipakai HR/L&D
          </h2>
          <p className="text-lg text-[#475569] leading-relaxed">
            Skillary membantu menampilkan progress peserta, status assessment, sertifikat, dan kebutuhan follow-up dalam format yang lebih mudah dibaca.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Report Table Mockup — spans 3 cols */}
          <div className="motion-fade-up motion-delay-100 lg:col-span-3 bg-white border border-[#E7DDD4] rounded-3xl shadow-lg overflow-hidden">
            {/* Product Chrome */}
            <div className="px-5 py-2 border-b border-[#E7DDD4] bg-[#FAF3EA] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
              <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
              <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
            </div>

            {/* Table Header */}
            <div className="px-5 py-3 bg-white border-b border-[#E7DDD4] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#172554]">Contoh Laporan Batch</span>
                <span className="text-[9px] text-[#94A3B8] ml-2">Data Storytelling</span>
              </div>
              <span className="text-[10px] font-bold text-[#D88A44] bg-[#FFF7ED] border border-[#FED7AA] px-2.5 py-1 rounded-md cursor-default">Export CSV</span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-[#E7DDD4]">
                    {["Peserta", "Progress", "Assessment", "Sertifikat", "Follow-up"].map((col) => (
                      <th key={col} className="px-4 py-2.5 text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider text-left bg-[#FFFDF9]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, idx) => (
                    <tr key={idx} className={`motion-fade-in motion-delay-${(idx + 2) * 100} border-b border-[#E7DDD4] last:border-b-0`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-[#FAF3EA] border border-[#E7DDD4] flex items-center justify-center text-[9px] font-bold text-[#6B625A]">
                            {row.name.slice(-1)}
                          </div>
                          <span className="text-xs font-semibold text-[#1F2937]">{row.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-[#E7DDD4] rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full motion-progress-fill ${row.progress === 100 ? "bg-[#10B981]" : row.progress > 60 ? "bg-[#D88A44]" : "bg-[#F59E0B]"}`}
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-[#6B625A]">{row.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          row.assessment === "Selesai"
                            ? "bg-[#D1FAE5] text-[#065F46]"
                            : "bg-[#FFF7ED] text-[#C2410C]"
                        }`}>
                          {row.assessment}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold ${
                          row.cert === "Terbit" ? "text-[#D88A44]" : "text-[#94A3B8]"
                        }`}>
                          {row.cert}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-medium ${
                          row.followUp !== "—" ? "text-[#C2410C]" : "text-[#94A3B8]"
                        }`}>
                          {row.followUp}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 bg-[#FFFDF9] border-t border-[#E7DDD4]">
              <p className="text-[10px] text-[#94A3B8] italic">Ilustrasi tampilan laporan batch training</p>
            </div>

            {/* HR Context Image */}
            <div className="motion-fade-in motion-delay-500 relative aspect-[16/5] overflow-hidden">
              <Image
                src="/images/training/hr-report-review.webp"
                alt="Ilustrasi tim HR meninjau laporan pelatihan"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/30 to-transparent" />
              <div className="absolute bottom-2 left-4">
                <span className="text-[9px] text-white/80 italic font-medium">Ilustrasi review laporan training</span>
              </div>
            </div>
          </div>

          {/* Certificate Preview Card — spans 2 cols */}
          <div className="lg:col-span-2">
            <div className="motion-scale-in motion-delay-200 bg-white border border-[#E7DDD4] rounded-3xl shadow-lg overflow-hidden">
              {/* Chrome */}
              <div className="px-5 py-2 border-b border-[#E7DDD4] bg-[#FAF3EA] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
                  <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
                  <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
                </div>
                <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest">Preview</span>
                <div className="w-10" />
              </div>

              <div className="p-5">
                <div className="bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl p-1 mb-3 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FAF3EA] px-2.5 py-0.5 rounded-full text-[8px] font-bold tracking-wider text-[#6B625A] border border-[#E7DDD4] z-10">
                    ILUSTRASI DESAIN SERTIFIKAT
                  </div>

                  <div className="border-2 border-double border-[#D88A44] p-5 sm:p-6 text-center mt-1 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-left">
                        <div className="text-[7px] uppercase tracking-widest text-[#94A3B8] font-bold">Verification ID</div>
                        <div className="font-mono text-[9px] font-bold text-[#172554] bg-[#FAF3EA] px-1.5 py-0.5 rounded inline-block mt-0.5">SK-8849201A</div>
                      </div>
                      <div className="text-xs font-bold tracking-tight text-[#172554] uppercase">Skillary</div>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#D88A44] mb-0.5">Certificate</h3>
                    <p className="text-[#94A3B8] tracking-[0.15em] uppercase text-[7px] font-bold mb-3">Of Completion</p>
                    <p className="text-[8px] text-[#94A3B8] uppercase tracking-widest mb-1">This is to certify that</p>
                    <p className="font-serif text-lg sm:text-xl text-[#172554] border-b border-[#E7DDD4] inline-block pb-1 px-4 mb-2">Nama Peserta</p>
                    <p className="text-[8px] text-[#6B625A] mb-1">has completed the training program</p>
                    <p className="font-bold text-xs text-[#172554]">Program Pelatihan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="motion-fade-up motion-delay-400 flex flex-col gap-2 mt-5">
              <Link href="/reports">
                <button className="motion-btn w-full bg-[#172554] hover:bg-[#1E3A8A] text-white px-5 py-3 shadow-lg shadow-[#172554]/15 font-semibold rounded-xl text-sm">
                  Lihat Fitur Laporan
                </button>
              </Link>
              <Link href="/certificates">
                <button className="motion-btn w-full px-5 py-3 hover:bg-[#FFF8F1] font-semibold rounded-xl border border-[#E7DDD4] text-[#334155] bg-white text-sm">
                  Lihat Sertifikat
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
