import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsReportingHighlight() {
  const tableRows = [
    { name: "Diana Kusuma", progress: 100, score: 95, cert: "Issued", statusColor: "bg-[#D1FAE5] text-[#065F46]" },
    { name: "Budi Santoso", progress: 80, score: 85, cert: "Pending", statusColor: "bg-[#FFF7ED] text-[#C2410C]" },
    { name: "Ahmad Reza", progress: 40, score: 0, cert: "—", statusColor: "bg-[#FEE2E2] text-[#991B1B]" },
    { name: "Siti Rahma", progress: 100, score: 92, cert: "Issued", statusColor: "bg-[#D1FAE5] text-[#065F46]" },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <Container className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Mockup */}
        <div className="order-2 lg:order-1 relative">
          <div className="absolute inset-0 rounded-3xl transform -rotate-2" style={{ background: 'rgb(255,138,0,0.05)' }} />
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
            <div className="p-4 flex justify-between items-center" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-white/40" />
                <div className="h-3 w-3 rounded-full bg-white/60" />
                <div className="h-3 w-3 rounded-full bg-white/90" />
              </div>
              <div className="text-white text-[10px] uppercase tracking-widest font-bold">Gradebook Report</div>
            </div>

            <div className="p-4 flex justify-between items-center bg-[#FFFDF9]" style={{ borderBottom: '1px solid rgb(240, 217, 200)' }}>
              <div className="h-8 w-48 bg-white rounded-md" style={{ border: '1.5px solid rgb(240, 217, 200)' }} />
              <div className="h-8 w-24 rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm" style={{ background: 'rgb(255, 138, 0)' }}>Export CSV</div>
            </div>

            <div className="p-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[#64748B]" style={{ borderBottom: '1px solid rgb(240, 217, 200)' }}>
                    <th className="pb-3 font-semibold">Peserta</th>
                    <th className="pb-3 font-semibold">Progress</th>
                    <th className="pb-3 font-semibold">Score</th>
                    <th className="pb-3 font-semibold text-right">Certificate</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, idx) => (
                    <tr key={idx} style={idx !== 0 ? { borderTop: '1px solid rgb(240, 217, 200)' } : {}}>
                      <td className="py-3 font-semibold text-[#334155]">{row.name}</td>
                      <td className="py-3 w-28">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 bg-[#FFFDF9] rounded-full overflow-hidden" style={{ border: '1px solid rgb(240, 217, 200)' }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${row.progress}%`, background: row.progress === 100 ? "#10B981" : row.progress > 50 ? "rgb(255, 138, 0)" : "#F59E0B" }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#475569]">{row.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 font-bold text-[#334155]">{row.score > 0 ? row.score : "—"}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statusColor}`}>
                          {row.cert}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] leading-tight mb-6">
            Bukan Hanya Training, tetapi Hasil yang Bisa Dipantau
          </h2>
          <p className="text-[#475569] text-lg mb-8">
            Skillary membantu pengelola pelatihan melihat progress peserta, hasil assessment, completion rate, dan status sertifikat dalam dashboard yang mudah dipahami.
          </p>
          <ul className="space-y-4">
            {["Gradebook peserta", "Live assessment monitoring", "Certificate tracking", "CSV export", "Progress dashboard"].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-[#334155] font-semibold">
                <span className="text-[#10B981]">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
