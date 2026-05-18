import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary - Company Profile",
  description: "Profil perusahaan Skillary.",
};

export default function CompanyProfilePrint() {
  return (
    <div className="bg-[#E7DDD4] min-h-screen py-8 print:py-0 print:bg-white font-sans text-[#1F2937]">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .page-break { page-break-after: always; }
        }
        .a4-page {
          width: 210mm;
          min-height: 297mm;
          background: #FFFDF9;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 20mm;
          position: relative;
          box-sizing: border-box;
        }
        @media print {
          .a4-page { box-shadow: none; margin: 0; }
        }
      `}} />

      {/* Page 1: About Skillary */}
      <div className="a4-page page-break flex flex-col justify-center items-center text-center border-b-[8px] border-[#1E3A8A]">
        <div className="w-24 h-24 bg-[#1E3A8A] text-white rounded-2xl flex items-center justify-center text-3xl font-bold mb-8">
          S
        </div>
        <h1 className="text-5xl font-bold text-[#1E3A8A] mb-6 tracking-tight">Skillary</h1>
        <h2 className="text-2xl font-bold text-[#D88A44] mb-8">Platform Pelatihan Terukur untuk Organisasi Modern</h2>
        <p className="text-lg leading-relaxed max-w-2xl text-[#475569]">
          Skillary adalah platform pelatihan digital yang didesain untuk membantu perusahaan dan organisasi merencanakan, menjalankan, dan mengukur program pengembangan talenta secara <em>end-to-end</em>.
        </p>
        <p className="text-lg leading-relaxed max-w-2xl text-[#475569] mt-4">
          Dengan memusatkan materi pembelajaran, evaluasi terintegrasi, penerbitan sertifikat digital, dan laporan pencapaian peserta dalam satu ekosistem, Skillary membebaskan tim HR dan L&D dari beban administratif. Misi kami adalah memastikan setiap investasi pelatihan korporat menghasilkan data yang jelas dan kompetensi yang terukur.
        </p>
      </div>

      {/* Page 2: Allman Legacy */}
      <div className="a4-page page-break flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-[#1E3A8A] mb-8">Akar Pengalaman Pelatihan Sejak 1998</h2>
        <p className="text-lg leading-relaxed text-[#475569] mb-6">
          Fondasi dari materi dan operasional Skillary tidak dibangun dalam semalam. Skillary lahir sebagai wajah digital dari pengalaman panjang <strong>Allman</strong> dalam mendampingi kebutuhan pelatihan korporat sejak tahun 1998.
        </p>
        <p className="text-lg leading-relaxed text-[#475569] mb-12">
          Melalui evolusi ini, praktik pelatihan yang telah teruji di lapangan kini dipadukan dengan kemudahan teknologi platform manajemen pembelajaran. Transformasi ini memastikan bahwa konten yang disajikan tidak hanya teoretis, tetapi relevan dengan dinamika kerja nyata di berbagai industri.
        </p>
        <div className="mt-auto pt-8 border-t border-[#E7DDD4]">
          <p className="text-[10px] text-[#94A3B8] italic text-justify">
            Disclaimer: Pengalaman pelatihan sejak 1998 merujuk pada histori entitas Allman. Portofolio dan pengalaman yang didokumentasikan merupakan arsip terkurasi yang melatarbelakangi pengembangan platform Skillary, bukan keseluruhan riwayat operasional tunggal.
          </p>
        </div>
      </div>

      {/* Page 3: What Skillary Offers */}
      <div className="a4-page page-break flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-[#1E3A8A] mb-12">Ekosistem Pembelajaran yang Terpusat</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="p-6 border border-[#E7DDD4] rounded-xl bg-white">
            <h3 className="text-xl font-bold text-[#D88A44] mb-3">1. Materi Terstruktur</h3>
            <p className="text-[#475569] text-sm leading-relaxed">Akses materi, modul, dan video yang disusun rapi dalam <em>learning path</em> khusus per karyawan atau divisi.</p>
          </div>
          <div className="p-6 border border-[#E7DDD4] rounded-xl bg-white">
            <h3 className="text-xl font-bold text-[#D88A44] mb-3">2. Assessment Validasi</h3>
            <p className="text-[#475569] text-sm leading-relaxed">Kuis dan ujian sumatif untuk memastikan peserta memahami esensi materi sebelum dinyatakan selesai.</p>
          </div>
          <div className="p-6 border border-[#E7DDD4] rounded-xl bg-white">
            <h3 className="text-xl font-bold text-[#D88A44] mb-3">3. Sertifikat Digital</h3>
            <p className="text-[#475569] text-sm leading-relaxed">Sertifikat kelulusan yang dilengkapi dengan kode keaslian unik sebagai <em>verified credentials</em>.</p>
          </div>
          <div className="p-6 border border-[#E7DDD4] rounded-xl bg-white">
            <h3 className="text-xl font-bold text-[#D88A44] mb-3">4. Laporan & Analytics</h3>
            <p className="text-[#475569] text-sm leading-relaxed">Rekapitulasi progres, tingkat kelulusan, dan data partisipasi peserta yang siap diunduh oleh manajemen.</p>
          </div>
        </div>
      </div>

      {/* Page 4: Areas & Capability */}
      <div className="a4-page page-break flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-[#1E3A8A] mb-12">Area Kompetensi & Kapabilitas</h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#D88A44] mb-6">Program Areas</h3>
          <ul className="space-y-4 text-lg text-[#475569]">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full"></span> Data Analytics, Dashboard & Storytelling</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full"></span> Infographics & Visual Communication</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full"></span> Presentation, Reporting & Business Communication</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full"></span> AI & Digital Mindset</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full"></span> Process Improvement, SOP & Quality</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full"></span> Leadership & Problem Solving</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#D88A44] mb-6">Fitur Korporasi (Platform Capability)</h3>
          <ul className="space-y-4 text-lg text-[#475569]">
            <li className="flex items-start gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2"></span> <div><strong>Batch Management:</strong> Tambah peserta massal dan kelola grup pelatihan dengan mudah.</div></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2"></span> <div><strong>Organization Dashboard:</strong> Kendali penuh atas siapa yang berhak mengakses course.</div></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2"></span> <div><strong>Progress Tracking:</strong> Pemantauan real-time perkembangan belajar tiap peserta.</div></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 bg-[#1E3A8A] rounded-full mt-2"></span> <div><strong>Report Export:</strong> Akses download laporan komprehensif ke format CSV.</div></li>
          </ul>
        </div>
      </div>

      {/* Page 5: Portfolio & Contact */}
      <div className="a4-page flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-[#1E3A8A] mb-8">Referensi Pengalaman Lintas Industri</h2>
        <p className="text-lg leading-relaxed text-[#475569] mb-6">
          Arsip dokumentasi digital dari pengalaman pelatihan Allman mencakup program di sektor perbankan, bank sentral/regulator, FMCG, lembaga pemerintah, penyedia layanan publik, pendidikan, hingga telekomunikasi. 
        </p>
        <p className="text-lg leading-relaxed text-[#475569] mb-12">
          Dokumentasi digital terkurasi ini menjadi acuan pengembangan kualitas program-program yang kini berjalan di ekosistem Skillary. Lihat arsip selengkapnya di:
        </p>
        
        <div className="flex gap-8 mb-16">
          <div className="p-6 bg-[#1E3A8A] text-white rounded-xl flex-1 text-center">
            <h4 className="font-bold mb-2 text-lg">Portofolio Lengkap</h4>
            <p className="text-sm opacity-80">skillary.id/portfolio</p>
          </div>
          <div className="p-6 bg-[#D88A44] text-white rounded-xl flex-1 text-center">
            <h4 className="font-bold mb-2 text-lg">Studi Kasus</h4>
            <p className="text-sm opacity-80">skillary.id/case-studies</p>
          </div>
        </div>

        <div className="border-t border-[#E7DDD4] pt-8">
          <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">Mari Berdiskusi</h3>
          <p className="text-[#475569] mb-2">Email: <strong>hello@skillary.id</strong></p>
          <p className="text-[#475569] mb-2">Website: <strong>www.skillary.id</strong></p>
        </div>
        
        <div className="mt-auto pt-8">
          <p className="text-[10px] text-[#94A3B8] italic text-justify">
            Portofolio ini disusun dari arsip dokumentasi pelatihan Allman dan digunakan sebagai referensi pengalaman yang melatarbelakangi pengembangan Skillary. Penggunaan nama organisasi mengacu pada catatan dokumentasi arsip dan mengikuti izin validasi internal.
          </p>
        </div>
      </div>
    </div>
  );
}
