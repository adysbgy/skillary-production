import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Laporan Pelatihan Skillary | Monitoring & Evaluasi Peserta",
  description: "Pantau progress peserta, hasil assessment, status sertifikat, dan data follow-up dalam satu alur laporan.",
};

const reportIncludes = [
  { icon: "📈", title: "Progress Peserta", desc: "Lihat persentase penyelesaian materi setiap peserta secara real-time." },
  { icon: "✅", title: "Completion Status", desc: "Identifikasi peserta yang sudah selesai, sedang berjalan, atau belum memulai." },
  { icon: "📝", title: "Assessment Score", desc: "Nilai pre-test dan post-test tersimpan otomatis di gradebook platform." },
  { icon: "🎓", title: "Certificate Status", desc: "Status penerbitan sertifikat digital untuk setiap peserta yang memenuhi syarat." },
  { icon: "🔔", title: "Follow-up", desc: "Identifikasi peserta yang perlu intervensi tambahan berdasarkan progress." },
  { icon: "📑", title: "CSV Export", desc: "Seluruh data peserta dapat diexport dalam format CSV untuk pelaporan internal." },
];

const useCases = [
  { role: "HR Manager", need: "Laporan evaluasi untuk manajemen.", solution: "Export data progress, skor, dan status sertifikat." },
  { role: "L&D Coordinator", need: "Pantau peserta yang butuh follow-up.", solution: "Dashboard menampilkan peserta dengan progress rendah." },
  { role: "Training Manager", need: "Bandingkan pre-test vs post-test.", solution: "Gradebook menampilkan perbandingan skor." },
];

const mockRows = [
  { name: "Peserta A", progress: "100%", score: "85", cert: "Terbit", status: "Selesai" },
  { name: "Peserta B", progress: "72%", score: "68", cert: "Belum", status: "Follow-up" },
  { name: "Peserta C", progress: "100%", score: "92", cert: "Terbit", status: "Selesai" },
  { name: "Peserta D", progress: "45%", score: "—", cert: "Belum", status: "Follow-up" },
  { name: "Peserta E", progress: "100%", score: "78", cert: "Terbit", status: "Selesai" },
];

export default function ReportsPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
      <section className="pt-10 pb-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-4xl text-center">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Pelaporan
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#181818] mb-6">Laporan Pelatihan Skillary</h1>
          <p className="text-xl text-[#181818] font-semibold mb-6">Pantau progress peserta, hasil assessment, status sertifikat, dan data follow-up dalam satu alur laporan.</p>
          <p className="text-lg text-black/60 leading-relaxed mb-12">Tidak ada lagi laporan pelatihan yang hilang atau hanya berbentuk daftar hadir.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact?type=assessment&source=reports">
              <button className="text-white px-7 py-3.5 shadow-lg font-semibold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusi Laporan Training
              </button>
            </Link>
            <Link href="/platform">
              <button className="px-7 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Platform
              </button>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container className="max-w-5xl">
          <h2 className="text-3xl font-bold text-[#181818] mb-4 text-center">Apa Saja yang Tercakup dalam Laporan?</h2>
          <p className="text-black/60 text-center mb-12 max-w-2xl mx-auto">Setiap program di Skillary menghasilkan data yang terstruktur dan siap dilaporkan.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportIncludes.map((item, idx) => (
              <div key={idx} className="bg-[#FFFDF9] p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#181818] mb-2">{item.title}</h3>
                <p className="text-sm text-black/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-[#FAF3EA]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold text-[#181818] mb-12 text-center">Kebutuhan Laporan berdasarkan Peran</h2>
          <div className="space-y-6">
            {useCases.map((uc, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                  <h3 className="font-bold text-lg text-[#181818]">{uc.role}</h3>
                </div>
                <p className="text-sm text-black/60 mb-2"><span className="font-semibold text-[#334155]">Kebutuhan:</span> {uc.need}</p>
                <p className="text-sm text-black/60"><span className="font-semibold text-[#334155]">Solusi:</span> {uc.solution}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold text-[#181818] mb-4 text-center">Contoh Format Laporan</h2>
          <p className="text-black/60 text-center mb-10 max-w-2xl mx-auto">Berikut contoh data yang dapat diakses melalui dashboard atau export CSV.</p>
          <div className="bg-[#FFFDF9] rounded-2xl overflow-hidden shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white text-left" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                    <th className="px-5 py-3.5 font-semibold">Peserta</th>
                    <th className="px-5 py-3.5 font-semibold">Progress</th>
                    <th className="px-5 py-3.5 font-semibold">Skor</th>
                    <th className="px-5 py-3.5 font-semibold">Sertifikat</th>
                    <th className="px-5 py-3.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRows.map((row, idx) => (
                    <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-[#FFFDF9]"}`} style={{ borderTop: '1px solid rgb(240, 217, 200)' }}>
                      <td className="px-5 py-3 font-medium text-[#181818]">{row.name}</td>
                      <td className="px-5 py-3 text-black/60">{row.progress}</td>
                      <td className="px-5 py-3 text-black/60">{row.score}</td>
                      <td className="px-5 py-3 text-black/60">{row.cert}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${row.status === "Selesai" ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEF3C7] text-[#92400E]"}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-[10px] text-[#94A3B8] italic font-medium mt-4 text-center">Contoh tampilan laporan untuk ilustrasi monitoring peserta.</p>
        </Container>
      </section>

      <section className="py-20 text-center" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#181818] mb-6">Butuh Laporan Training yang Terukur?</h2>
          <p className="text-lg text-black/60 mb-10">Diskusikan kebutuhan evaluasi dan pelaporan program pelatihan Anda bersama tim Skillary.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact?type=assessment&source=reports">
              <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusi Laporan Training
              </button>
            </Link>
            <Link href="/platform">
              <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Platform
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
