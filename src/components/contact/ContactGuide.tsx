import React from "react";

export function ContactGuide() {
  const checklist = [
    "Tujuan pelatihan",
    "Topik atau kompetensi yang ingin dikembangkan",
    "Jumlah peserta",
    "Perkiraan durasi",
    "Format pelaksanaan: online, offline, atau hybrid",
    "Kebutuhan assessment",
    "Kebutuhan sertifikat",
    "Kebutuhan laporan peserta",
  ];

  const steps = [
    "Tim Skillary meninjau kebutuhan Anda",
    "Kami menghubungi Anda untuk klarifikasi jika diperlukan",
    "Format pelatihan atau solusi akan didiskusikan",
    "Proposal atau rekomendasi dapat disiapkan sesuai kebutuhan program",
  ];

  return (
    <div className="space-y-12">
      {/* What to Include */}
      <div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-3">Agar Diskusi Lebih Efektif</h3>
        <p className="text-sm text-[#475569] mb-6">
          Anda dapat menuliskan beberapa informasi berikut saat menghubungi Skillary:
        </p>
        <ul className="space-y-3">
          {checklist.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-[#334155] font-medium">
              <span className="mt-0.5 shrink-0 h-4 w-4 rounded-full flex items-center justify-center" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px w-full" style={{ background: 'rgb(240, 217, 200)' }} />

      {/* Response Process */}
      <div>
        <h3 className="text-xl font-bold text-[#0F172A] mb-6">Apa yang Terjadi Setelah Anda Menghubungi Kami?</h3>
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="shrink-0 h-8 w-8 rounded-full font-bold flex items-center justify-center text-sm" style={{ background: 'rgb(255, 244, 232)', border: '1.5px solid rgb(255, 214, 165)', color: 'rgb(255, 138, 0)' }}>
                {idx + 1}
              </div>
              <p className="text-sm text-[#334155] font-medium pt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
