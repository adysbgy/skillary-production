import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary - Corporate Proposal",
  description: "Proposal korporat Skillary.",
};

export default function CorporateProposalPrint() {
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
          display: flex;
          flex-direction: column;
        }
        @media print {
          .a4-page { box-shadow: none; margin: 0; }
        }
        h2 { color: #1E3A8A; font-weight: bold; font-size: 2rem; margin-bottom: 2rem; }
        p { color: #475569; font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.5rem; }
        .accent { color: #D88A44; }
      `}} />

      {/* Page 1: Cover */}
      <div className="a4-page page-break justify-center items-center text-center border-t-[16px] border-[#1E3A8A]">
        <div className="w-32 h-32 bg-[#1E3A8A] text-white rounded-3xl flex items-center justify-center text-6xl font-bold mb-12 shadow-lg">
          S
        </div>
        <h1 className="text-6xl font-bold text-[#1E3A8A] mb-8 tracking-tight">Skillary</h1>
        <h2 className="text-3xl font-bold text-[#D88A44] mb-8" style={{ fontSize: '1.875rem', marginBottom: '2rem' }}>Platform Pelatihan Terukur untuk Organisasi</h2>
        <p className="text-xl max-w-2xl mx-auto mb-16">
          Materi, assessment, sertifikat digital, progress peserta, dan laporan training dalam satu alur terpusat.
        </p>
        <div className="mt-12 px-8 py-4 border-2 border-[#E7DDD4] rounded-xl text-[#1E3A8A] font-bold">
          Mari diskusikan kebutuhan training organisasi Anda.
        </div>
      </div>

      {/* Page 2: Exec Summary */}
      <div className="a4-page page-break justify-center">
        <h2>Transformasi Pelatihan Internal yang Lebih Terstruktur</h2>
        <p>
          Pelatihan internal seringkali menghabiskan banyak sumber daya, namun hasilnya sulit diukur. Skillary hadir untuk membantu organisasi Anda mengelola pelatihan secara lebih terstruktur dan efisien. 
        </p>
        <p>
          Mulai dari penyusunan materi, pengelolaan akses peserta, eksekusi assessment, penerbitan sertifikat digital, hingga penyajian laporan—semuanya dikelola dalam satu platform. 
        </p>
        <p>
          Dengan Skillary, L&D dan HR dapat fokus pada strategi pengembangan tim, sementara kami menangani ekosistem pelatihannya.
        </p>
      </div>

      {/* Page 3: Legacy Story */}
      <div className="a4-page page-break justify-center">
        <h2>Berangkat dari Pengalaman Pelatihan Sejak 1998</h2>
        <p>
          Skillary lahir dari pengalaman panjang Allman dalam mendampingi kebutuhan pelatihan korporat sejak tahun 1998. Pengalaman bertahun-tahun dalam merancang dan mengeksekusi program di berbagai sektor industri kini bertransformasi menjadi platform digital yang modern.
        </p>
        <p>
          Sebagian pengalaman tersebut telah terdokumentasi dalam arsip digital dan menjadi salah satu fondasi utama bagi pengembangan ekosistem pelatihan Skillary.
        </p>
        <div className="mt-16 p-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
          <p className="text-sm italic m-0 text-justify">
            Dokumentasi digital yang ditampilkan adalah arsip pengalaman terkurasi, bukan total keseluruhan pengalaman Allman sejak 1998. Portofolio disusun sebagai referensi latar belakang kapabilitas pengembangan materi dan program Skillary.
          </p>
        </div>
      </div>

      {/* Page 4: Training Challenges */}
      <div className="a4-page page-break justify-center">
        <h2>Tantangan Pelatihan Internal Saat Ini</h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="text-2xl font-bold accent mt-1">✗</div>
            <div>
              <h3 className="font-bold text-lg text-[#1F2937]">Materi Tersebar</h3>
              <p className="text-sm m-0">Modul pelatihan dan presentasi tersimpan di berbagai tempat, sulit diakses ulang oleh peserta.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl font-bold accent mt-1">✗</div>
            <div>
              <h3 className="font-bold text-lg text-[#1F2937]">Progress Tidak Transparan</h3>
              <p className="text-sm m-0">Sulit memantau sejauh mana peserta benar-benar menyelesaikan program.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl font-bold accent mt-1">✗</div>
            <div>
              <h3 className="font-bold text-lg text-[#1F2937]">Assessment Manual</h3>
              <p className="text-sm m-0">Kuis dan ujian akhir tidak terdokumentasi rapi, membuat evaluasi efektivitas menjadi bias.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl font-bold accent mt-1">✗</div>
            <div>
              <h3 className="font-bold text-lg text-[#1F2937]">Sertifikasi Repot</h3>
              <p className="text-sm m-0">Sertifikat dibuat dan didistribusikan secara manual, memakan waktu tim operasional.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl font-bold accent mt-1">✗</div>
            <div>
              <h3 className="font-bold text-lg text-[#1F2937]">Laporan Tercecer</h3>
              <p className="text-sm m-0">Laporan training perlu direkap ulang dari berbagai sumber spreadsheet yang berbeda.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page 5: Skillary Solution */}
      <div className="a4-page page-break justify-center">
        <h2>Solusi Ekosistem Pelatihan Skillary</h2>
        <div className="grid grid-rows-4 gap-6">
          <div className="p-6 border border-[#E7DDD4] rounded-xl flex items-center gap-6">
            <div className="text-4xl font-bold text-[#E7DDD4]">1</div>
            <div>
              <h3 className="font-bold text-[#1E3A8A] text-xl mb-1">Materi Terstruktur</h3>
              <p className="text-sm m-0">Modul pembelajaran disusun rapi per course dan lesson, dapat diakses kapan saja oleh peserta yang terdaftar.</p>
            </div>
          </div>
          <div className="p-6 border border-[#E7DDD4] rounded-xl flex items-center gap-6">
            <div className="text-4xl font-bold text-[#E7DDD4]">2</div>
            <div>
              <h3 className="font-bold text-[#1E3A8A] text-xl mb-1">Assessment Terukur</h3>
              <p className="text-sm m-0">Kuis formatif dan ujian sumatif yang terintegrasi langsung di akhir modul.</p>
            </div>
          </div>
          <div className="p-6 border border-[#E7DDD4] rounded-xl flex items-center gap-6">
            <div className="text-4xl font-bold text-[#E7DDD4]">3</div>
            <div>
              <h3 className="font-bold text-[#1E3A8A] text-xl mb-1">Sertifikat Digital</h3>
              <p className="text-sm m-0">Otomatis diterbitkan dengan kode unik saat peserta menyelesaikan semua syarat kelulusan.</p>
            </div>
          </div>
          <div className="p-6 border border-[#E7DDD4] rounded-xl flex items-center gap-6">
            <div className="text-4xl font-bold text-[#E7DDD4]">4</div>
            <div>
              <h3 className="font-bold text-[#1E3A8A] text-xl mb-1">Laporan Peserta</h3>
              <p className="text-sm m-0">Data riwayat belajar, nilai assessment, dan kelulusan terekap otomatis untuk evaluasi manajemen.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page 6: Platform Workflow */}
      <div className="a4-page page-break justify-center">
        <h2>Alur Kerja End-to-End</h2>
        <div className="space-y-8">
          {[
            { step: "Diskusi Kebutuhan", desc: "Kami memetakan objektif bisnis dan kebutuhan kompetensi tim Anda." },
            { step: "Susun Program", desc: "Materi spesifik disiapkan dan diunggah ke dalam ekosistem Skillary." },
            { step: "Kelola Peserta", desc: "Pendaftaran peserta ke dalam Training Batch organisasi secara massal atau bertahap." },
            { step: "Jalankan Pelatihan", desc: "Peserta mengakses materi, menyelesaikan assessment, dan meraih sertifikat digital." },
            { step: "Export Laporan", desc: "Manajemen dapat mengunduh laporan partisipasi dan progres secara real-time." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-xl text-[#1F2937] mb-2">{item.step}</h3>
                <p className="text-md m-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 7: Batch Capability */}
      <div className="a4-page page-break justify-center">
        <h2>Dirancang Khusus untuk Manajemen Organisasi</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10">
          <div>
            <h3 className="font-bold text-[#D88A44] mb-2">Organization Dashboard</h3>
            <p className="text-sm m-0">Satu panel pusat untuk memantau seluruh aktivitas batch pelatihan perusahaan.</p>
          </div>
          <div>
            <h3 className="font-bold text-[#D88A44] mb-2">Training Batch Management</h3>
            <p className="text-sm m-0">Pengelolaan kohort pelatihan secara spesifik per divisi atau periode.</p>
          </div>
          <div>
            <h3 className="font-bold text-[#D88A44] mb-2">Participant CSV Import</h3>
            <p className="text-sm m-0">Tambahkan ratusan peserta pelatihan secara instan menggunakan template CSV.</p>
          </div>
          <div>
            <h3 className="font-bold text-[#D88A44] mb-2">Course Assignment</h3>
            <p className="text-sm m-0">Akses materi diberikan tepat sasaran kepada batch yang relevan.</p>
          </div>
          <div>
            <h3 className="font-bold text-[#D88A44] mb-2">Manual Grant/Revoke</h3>
            <p className="text-sm m-0">Kontrol penuh atas akses *enrollment* setiap karyawan.</p>
          </div>
          <div>
            <h3 className="font-bold text-[#D88A44] mb-2">Batch Report CSV</h3>
            <p className="text-sm m-0">Unduh hasil akhir pelatihan per batch untuk laporan ke HR/L&D.</p>
          </div>
        </div>
      </div>

      {/* Page 8: Program Areas */}
      <div className="a4-page page-break justify-center">
        <h2>Area Pengembangan Program</h2>
        <div className="space-y-6">
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A8A]">Data Analytics, Dashboard & Storytelling</h3>
            <p className="text-sm m-0 mt-1">Membaca data dan menyajikan insight bisnis.</p>
          </div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A8A]">Infographics & Visual Communication</h3>
            <p className="text-sm m-0 mt-1">Mengubah informasi kompleks menjadi visual menarik.</p>
          </div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A8A]">Presentation, Reporting & Business Comm.</h3>
            <p className="text-sm m-0 mt-1">Komunikasi strategis bagi pengambil keputusan.</p>
          </div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A8A]">AI & Digital Mindset</h3>
            <p className="text-sm m-0 mt-1">Literasi digital untuk produktivitas modern.</p>
          </div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A8A]">Process Improvement, SOP & Quality</h3>
            <p className="text-sm m-0 mt-1">Peningkatan efisiensi dan standar kualitas operasional.</p>
          </div>
          <div className="p-6 bg-white border border-[#E7DDD4] rounded-xl shadow-sm">
            <h3 className="font-bold text-lg text-[#1E3A8A]">Leadership & Problem Solving</h3>
            <p className="text-sm m-0 mt-1">Keterampilan memimpin tim dan menyelesaikan masalah adaptif.</p>
          </div>
        </div>
      </div>

      {/* Page 9: Legacy Portfolio Reference */}
      <div className="a4-page page-break justify-center">
        <h2>Arsip Pengalaman Lintas Sektor</h2>
        <p>
          Arsip pengalaman pelatihan Allman mencakup program-program strategis yang melibatkan organisasi dari berbagai sektor, antara lain perbankan, regulator, FMCG, pendidikan, pemerintahan, telekomunikasi, dan korporasi lainnya.
        </p>
        <p>
          Halaman portofolio menampilkan arsip pengalaman pelatihan Allman yang menjadi referensi pengembangan Skillary. Anda dapat melihat dokumentasinya pada tautan resmi berikut:
        </p>
        
        <div className="my-8 space-y-4">
          <div className="p-6 bg-[#1E3A8A] text-white rounded-xl">
            <h4 className="font-bold text-lg">Portofolio Lengkap</h4>
            <div className="opacity-90">skillary.id/portfolio</div>
          </div>
          <div className="p-6 bg-[#D88A44] text-white rounded-xl">
            <h4 className="font-bold text-lg">Highlight Studi Kasus</h4>
            <div className="opacity-90">skillary.id/case-studies</div>
          </div>
        </div>
      </div>

      {/* Page 10: Next Step */}
      <div className="a4-page justify-center items-center text-center">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Mari Mulai Transformasi Pelatihan Anda</h2>
        <p className="text-xl mb-12 max-w-lg text-center">
          Jadwalkan diskusi kebutuhan training, kirimkan training brief organisasi Anda, atau jadwalkan sesi demo platform secara langsung.
        </p>
        
        <div className="space-y-6 w-full max-w-sm mx-auto">
          <div className="p-4 border-2 border-[#1E3A8A] rounded-xl text-[#1E3A8A] font-bold">
            hello@skillary.id
          </div>
          <div className="p-4 border-2 border-[#1E3A8A] rounded-xl text-[#1E3A8A] font-bold">
            www.skillary.id
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-[#E7DDD4] w-full text-center">
          <p className="text-sm text-[#94A3B8]">
            Skillary © {new Date().getFullYear()} — Dokumen Internal Terbatas
          </p>
        </div>
      </div>
    </div>
  );
}
