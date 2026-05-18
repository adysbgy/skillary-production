import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary - Sales Deck",
  description: "Sales deck presentasi Skillary.",
};

export default function SalesDeckPrint() {
  return (
    <div className="bg-[#E7DDD4] min-h-screen py-8 print:py-0 print:bg-white font-sans text-[#1F2937]">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-after: always; }
        }
        .slide {
          width: 297mm;
          height: 210mm;
          background: #FFFDF9;
          margin: 0 auto 8mm auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 20mm;
          position: relative;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media print {
          .slide { box-shadow: none; margin: 0; }
        }
      `}} />

      {/* Slide 1 */}
      <div className="slide page-break text-center items-center border-l-[16px] border-[#1E3A8A]">
        <div className="w-32 h-32 bg-[#1E3A8A] text-white rounded-3xl flex items-center justify-center text-5xl font-bold mb-10">
          S
        </div>
        <h1 className="text-7xl font-bold text-[#1E3A8A] mb-6 tracking-tight">Skillary</h1>
        <h2 className="text-3xl font-normal text-[#D88A44]">Platform Pelatihan Terukur untuk Organisasi</h2>
      </div>

      {/* Slide 2 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-12">Tantangan Pelatihan Internal</h2>
        <ul className="space-y-6 text-2xl text-[#475569] list-none">
          <li className="flex items-center gap-4"><span className="text-[#D88A44] text-3xl">✗</span> Pelatihan sering berjalan, namun efektivitasnya sulit dipantau.</li>
          <li className="flex items-center gap-4"><span className="text-[#D88A44] text-3xl">✗</span> Materi pelatihan dan assessment tidak terpusat.</li>
          <li className="flex items-center gap-4"><span className="text-[#D88A44] text-3xl">✗</span> Sertifikasi dan pelaporan masih manual.</li>
          <li className="flex items-center gap-4"><span className="text-[#D88A44] text-3xl">✗</span> Sulit memetakan hasil training terhadap performa peserta.</li>
        </ul>
      </div>

      {/* Slide 3 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-12">Berangkat dari Pengalaman Sejak 1998</h2>
        <ul className="space-y-6 text-2xl text-[#475569] list-none">
          <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Fondasi kapabilitas dari perjalanan historis Allman.</li>
          <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Pemahaman mendalam atas dinamika pelatihan korporat.</li>
          <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Evolusi menjadi platform yang menjembatani konten dan teknologi.</li>
        </ul>
      </div>

      {/* Slide 4 */}
      <div className="slide page-break text-center items-center">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-16">Transformasi Ekosistem Belajar</h2>
        <div className="flex items-center justify-center gap-8 text-2xl w-full px-12">
          <div className="flex-1 bg-white border border-[#E7DDD4] p-10 rounded-2xl">
            <h3 className="font-bold text-[#475569] mb-4">Sekadar Fasilitasi</h3>
            <p className="text-lg opacity-70">Training Delivery</p>
          </div>
          <div className="text-4xl text-[#D88A44]">➔</div>
          <div className="flex-1 bg-[#1E3A8A] border border-[#1E3A8A] p-10 rounded-2xl text-white">
            <h3 className="font-bold mb-4">Sistem Terintegrasi</h3>
            <p className="text-lg opacity-80">Training System & Audit</p>
          </div>
        </div>
      </div>

      {/* Slide 5 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-16 text-center">4 Pilar Solusi Skillary</h2>
        <div className="grid grid-cols-2 gap-8 px-12">
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-3xl font-bold text-[#D88A44] mb-4">1. Materi</h3>
            <p className="text-xl text-[#475569]">Terstruktur & Mudah Diakses</p>
          </div>
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-3xl font-bold text-[#D88A44] mb-4">2. Assessment</h3>
            <p className="text-xl text-[#475569]">Terintegrasi Langsung</p>
          </div>
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-3xl font-bold text-[#D88A44] mb-4">3. Sertifikasi</h3>
            <p className="text-xl text-[#475569]">Digital & Tervalidasi</p>
          </div>
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-3xl font-bold text-[#D88A44] mb-4">4. Laporan</h3>
            <p className="text-xl text-[#475569]">Otomatis untuk Manajemen</p>
          </div>
        </div>
      </div>

      {/* Slide 6 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-16 text-center">Alur Kerja Sederhana</h2>
        <div className="flex justify-between items-center px-8">
          {['Diskusi', 'Program', 'Peserta', 'Assessment', 'Report'].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-[#D88A44] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                {i + 1}
              </div>
              <p className="text-xl font-bold text-[#1E3A8A]">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide 7 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-12">Pengelolaan Batch Perusahaan</h2>
        <div className="grid grid-cols-2 gap-12">
          <ul className="space-y-6 text-2xl text-[#475569] list-none mt-4">
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Organization Dashboard</li>
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Kelola peserta masif (CSV Import)</li>
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Atur akses materi per divisi</li>
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Kontrol penuh (Grant/Revoke)</li>
          </ul>
          <div className="bg-white border border-[#E7DDD4] rounded-2xl flex items-center justify-center text-[#94A3B8] p-8 text-xl">
            [Ilustrasi Dashboard Admin]
          </div>
        </div>
      </div>

      {/* Slide 8 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-12">Laporan untuk HR & L&D</h2>
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-white border border-[#E7DDD4] rounded-2xl flex items-center justify-center text-[#94A3B8] p-8 text-xl">
            [Ilustrasi Export CSV]
          </div>
          <ul className="space-y-6 text-2xl text-[#475569] list-none mt-4">
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Progress tracking real-time</li>
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Rekapitulasi nilai assessment</li>
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Daftar penerbitan sertifikat</li>
            <li className="flex items-center gap-4"><span className="w-3 h-3 bg-[#1E3A8A] rounded-full"></span> Export CSV komprehensif</li>
          </ul>
        </div>
      </div>

      {/* Slide 9 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-12">6 Area Spesialisasi Program</h2>
        <div className="grid grid-cols-2 gap-8 text-2xl text-[#475569]">
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl font-bold">Data Analytics & Storytelling</div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl font-bold">Infographics & Visual Comm.</div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl font-bold">Presentation & Business Comm.</div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl font-bold">AI & Digital Mindset</div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl font-bold">Process Improvement & SOP</div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl font-bold">Leadership & Problem Solving</div>
        </div>
      </div>

      {/* Slide 10 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-8">Arsip Pengalaman Lintas Sektor</h2>
        <p className="text-2xl text-[#475569] mb-12">Merangkum dokumentasi program di sektor perbankan, regulator, FMCG, pemerintah, dan korporasi lainnya.</p>
        
        <div className="flex gap-8 mb-12">
          <div className="p-8 bg-[#1E3A8A] text-white rounded-xl flex-1 text-center">
            <h4 className="font-bold mb-4 text-2xl">Portofolio Lengkap</h4>
            <p className="text-xl opacity-80">skillary.id/portfolio</p>
          </div>
          <div className="p-8 bg-[#D88A44] text-white rounded-xl flex-1 text-center">
            <h4 className="font-bold mb-4 text-2xl">Highlight Studi Kasus</h4>
            <p className="text-xl opacity-80">skillary.id/case-studies</p>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-xs text-[#94A3B8] italic">
            Portofolio ini disusun dari arsip dokumentasi pelatihan Allman dan digunakan sebagai referensi pengalaman yang melatarbelakangi pengembangan Skillary. Penggunaan nama organisasi mengacu pada catatan dokumentasi arsip dan mengikuti izin validasi internal.
          </p>
        </div>
      </div>

      {/* Slide 11 */}
      <div className="slide page-break">
        <h2 className="text-5xl font-bold text-[#1E3A8A] mb-12 text-center">Pilihan Format Kerja Sama</h2>
        <div className="grid grid-cols-3 gap-8 px-12">
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-[#D88A44] mb-6">In-House Training</h3>
            <p className="text-xl text-[#475569]">Pelaksanaan kelas tatap muka yang dipadukan dengan platform digital.</p>
          </div>
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-[#D88A44] mb-6">Assessment Program</h3>
            <p className="text-xl text-[#475569]">Modul evaluasi khusus kompetensi tertentu untuk tim internal.</p>
          </div>
          <div className="bg-white border border-[#E7DDD4] p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-[#D88A44] mb-6">Managed Learning</h3>
            <p className="text-xl text-[#475569]">Implementasi platform secara mandiri dengan materi ter-custom.</p>
          </div>
        </div>
      </div>

      {/* Slide 12 */}
      <div className="slide text-center items-center">
        <h2 className="text-6xl font-bold text-[#1E3A8A] mb-8">Mari Jadwalkan Diskusi</h2>
        <p className="text-3xl text-[#475569] mb-16">Pusatkan pelatihan internal organisasi Anda bersama Skillary.</p>
        
        <div className="px-12 py-6 bg-[#D88A44] text-white rounded-full font-bold text-3xl mb-12">
          hello@skillary.id
        </div>
        <p className="text-2xl text-[#1E3A8A] font-bold">www.skillary.id</p>
      </div>

    </div>
  );
}
