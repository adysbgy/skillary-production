import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";

export const metadata: Metadata = {
  title: "Learning Path untuk Organisasi | Skillary",
  description: "Susun alur pembelajaran bertahap sesuai kebutuhan kompetensi peserta dan output program.",
};

const paths = [
  {
    title: "Data Productivity Path",
    audience: "Staff keuangan, analis, dan admin yang bekerja dengan data harian.",
    modules: ["Dasar Spreadsheet", "Data Cleaning & Validation", "Pivot Table & Dashboard", "Studi Kasus Internal"],
    assessment: "Pre-test kompetensi dasar, final project berbasis data internal.",
    output: "Peserta mampu mengolah data lebih cepat dan membuat laporan visual.",
  },
  {
    title: "AI for Work Path",
    audience: "Profesional yang ingin memanfaatkan AI untuk produktivitas kerja.",
    modules: ["Pengenalan AI Tools", "AI untuk Penulisan & Riset", "AI untuk Presentasi", "Etika & Batasan AI"],
    assessment: "Quiz pemahaman konsep, project implementasi AI dalam tugas harian.",
    output: "Peserta memahami cara menggunakan AI tools secara aman dan produktif.",
  },
  {
    title: "Leadership Communication Path",
    audience: "Supervisor, manajer, dan calon pemimpin tim.",
    modules: ["Komunikasi Asertif", "Feedback & Coaching", "Presentation Skill", "Conflict Resolution"],
    assessment: "Roleplay assessment, peer evaluation.",
    output: "Peserta mampu memimpin tim dengan komunikasi yang lebih terstruktur.",
  },
  {
    title: "Teacher Development Path",
    audience: "Guru, dosen, dan pengelola pendidikan.",
    modules: ["Digital Classroom", "AI untuk Pembelajaran", "Evaluasi Berbasis Kompetensi", "Desain Kurikulum"],
    assessment: "Portfolio pengajaran, refleksi tertulis.",
    output: "Pendidik mampu merancang pembelajaran yang lebih interaktif dan terukur.",
  },
];

export default function LearningPathsPage() {
  return (
    <MarketingShell showFooter={false}>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
      <section className="pt-10 pb-20 border-b border-[#E7DDD4]">
        <Container className="max-w-4xl text-center">
          <div className="inline-flex rounded-full bg-[#FFF7ED] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#C2410C] border border-[#FED7AA] mb-6">Learning Path</div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#0F172A] mb-6">Learning Path untuk Organisasi</h1>
          <p className="text-xl text-[#0F172A] font-semibold mb-6">Susun alur pembelajaran bertahap sesuai kebutuhan kompetensi peserta dan output program.</p>
          <p className="text-lg text-[#475569] leading-relaxed mb-12">Setiap learning path dirancang secara kustom berdasarkan kebutuhan organisasi, bukan template generik.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact?type=in-house&source=learning-paths"><button className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white px-7 py-3.5 shadow-lg shadow-[#1E3A8A]/20 transition-all font-semibold rounded-lg">Diskusikan Learning Path</button></Link>
            <Link href="/program-catalog"><button className="px-7 py-3.5 hover:bg-[#FFF8F1] transition-colors font-semibold rounded-lg border border-[#E7DDD4] text-[#334155] bg-white">Lihat Area Program</button></Link>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4 text-center">Apa Itu Learning Path?</h2>
          <p className="text-[#475569] text-center mb-6 max-w-2xl mx-auto leading-relaxed">Learning path adalah alur pembelajaran bertahap yang menghubungkan beberapa modul pelatihan menjadi satu program koheren, dengan assessment dan output yang jelas di setiap tahapnya.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Terstruktur", desc: "Modul disusun bertahap dari dasar ke lanjutan." },
              { label: "Terukur", desc: "Assessment di setiap milestone untuk mengukur progress." },
              { label: "Kustom", desc: "Disesuaikan dengan kebutuhan dan profil peserta." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#FFFDF9] border border-[#E7DDD4] rounded-xl p-5 text-center">
                <p className="font-bold text-[#0F172A] mb-1">{item.label}</p>
                <p className="text-sm text-[#64748B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-[#FAF3EA] border-y border-[#E7DDD4]">
        <Container className="max-w-5xl">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4 text-center">Contoh Learning Path</h2>
          <p className="text-[#475569] text-center mb-12 max-w-2xl mx-auto">Berikut contoh alur pembelajaran yang dapat dirancang bersama tim Skillary.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {paths.map((path, idx) => (
              <div key={idx} className="bg-white border border-[#CBD5E1] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#C2410C]" />
                  <h3 className="font-bold text-lg text-[#0F172A]">{path.title}</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div><span className="font-semibold text-[#334155]">Audiens:</span> <span className="text-[#475569]">{path.audience}</span></div>
                  <div>
                    <span className="font-semibold text-[#334155]">Modul:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {path.modules.map((m, mIdx) => (
                        <span key={mIdx} className="inline-block bg-[#FFFDF9] border border-[#E7DDD4] text-[#475569] text-xs px-2.5 py-1 rounded-full">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div><span className="font-semibold text-[#334155]">Assessment:</span> <span className="text-[#475569]">{path.assessment}</span></div>
                  <div><span className="font-semibold text-[#334155]">Output:</span> <span className="text-[#475569]">{path.output}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white">
        <Container className="max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4 text-center">Bagaimana Skillary Menyusun Learning Path?</h2>
          <div className="space-y-6 mt-10">
            {[
              { step: "1", title: "Analisis Kebutuhan", desc: "Tim Skillary berdiskusi dengan organisasi untuk memahami profil peserta, gap kompetensi, dan output yang diinginkan." },
              { step: "2", title: "Rancang Kurikulum", desc: "Modul disusun secara bertahap, dari dasar ke lanjutan, dengan assessment di setiap milestone." },
              { step: "3", title: "Eksekusi & Monitoring", desc: "Program dijalankan melalui platform Skillary. Progress peserta dapat dipantau secara real-time." },
              { step: "4", title: "Evaluasi & Laporan", desc: "Setelah program selesai, organisasi menerima laporan lengkap dan sertifikat bagi peserta yang lulus." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="h-8 w-8 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center font-bold text-sm shrink-0">{item.step}</div>
                <div>
                  <p className="font-bold text-[#0F172A]">{item.title}</p>
                  <p className="text-[#475569] text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 text-center border-t border-[#E7DDD4]">
        <Container className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">Siap Merancang Learning Path?</h2>
          <p className="text-lg text-[#475569] mb-10">Diskusikan kebutuhan kompetensi organisasi Anda dan tim Skillary akan membantu menyusun alur pembelajaran yang terukur.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact?type=in-house&source=learning-paths"><button className="bg-[#1E3A8A] text-white px-8 py-4 shadow-lg shadow-[#1E3A8A]/20 transition-all font-bold rounded-lg hover:-translate-y-0.5">Diskusikan Learning Path</button></Link>
            <Link href="/program-catalog"><button className="bg-[#FFFDF9] border-2 border-[#E7DDD4] text-[#334155] font-bold px-8 py-4 rounded-lg shadow-sm hover:bg-[#F5F0EB] transition-all">Lihat Area Program</button></Link>
          </div>
        </Container>
      </section>
      </div>
    </MarketingShell>
  );
}
