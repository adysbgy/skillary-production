import React from "react";
import { Container } from "@/components/ui/Container";

export function DashboardReportingSection() {
  const tableRows = [
    { name: "Diana Kusuma", email: "diana@company.com", progress: 100, score: 95, status: "Completed" },
    { name: "Budi Santoso", email: "budi@company.com", progress: 80, score: 85, status: "In Progress" },
    { name: "Ahmad Reza", email: "ahmad@company.com", progress: 40, score: 0, status: "Needs Attention" },
    { name: "Siti Rahma", email: "siti@company.com", progress: 100, score: 92, status: "Completed" },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FFFDF9]">
      <Container className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="absolute inset-0 bg-[#D88A44]/5 rounded-3xl transform -rotate-2" />
          <div className="relative bg-white border border-[#E7DDD4] rounded-2xl shadow-xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-[#0F172A] p-4 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Gradebook Report</div>
            </div>
            
            {/* Dashboard Controls */}
            <div className="p-4 border-b border-[#E7DDD4] flex justify-between items-center bg-[#FAF3EA]">
              <div className="h-8 w-48 bg-white border border-[#E7DDD4] rounded-md" />
              <div className="h-8 w-24 bg-[#1E3A8A] rounded-md flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-default">
                Export CSV
              </div>
            </div>

            {/* Table */}
            <div className="p-4">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[#64748B] border-b border-[#F1F5F9]">
                    <th className="pb-3 font-semibold">Peserta</th>
                    <th className="pb-3 font-semibold">Progress</th>
                    <th className="pb-3 font-semibold">Score</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {tableRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="py-3">
                        <div className="font-semibold text-[#334155]">{row.name}</div>
                        <div className="text-[10px] text-[#64748B]">{row.email}</div>
                      </td>
                      <td className="py-3 w-32">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 bg-[#E7DDD4]/50 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${row.progress === 100 ? 'bg-[#10B981]' : row.progress > 50 ? 'bg-[#3B82F6]' : 'bg-[#F59E0B]'}`}
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#475569]">{row.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="font-bold text-[#334155]">{row.score > 0 ? row.score : '-'}</span>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${row.status === 'Completed' ? 'bg-[#D1FAE5] text-[#065F46]' : 
                            row.status === 'In Progress' ? 'bg-[#FFF7ED] text-[#C2410C]' : 
                            'bg-[#FFF7ED] text-[#C2410C]'}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-center text-[10px] text-[#94A3B8] mt-4 font-medium italic">
            Contoh tampilan dashboard untuk ilustrasi monitoring peserta.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] leading-tight mb-6">
            Laporan yang Membantu Pengambilan Keputusan
          </h2>
          <p className="text-[#475569] text-lg mb-8">
            Pantau progress peserta, hasil assessment, completion rate, dan status sertifikat dalam dashboard yang mudah dipahami.
          </p>
          <ul className="space-y-4">
            {['Gradebook peserta', 'Live assessment monitoring', 'Certificate tracking', 'CSV export', 'Progress dashboard'].map((item, idx) => (
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
