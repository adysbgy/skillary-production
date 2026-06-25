"use client";

import { useState } from "react";
import Link from "next/link";

const TRACKS = [
  {
    id: "campus",
    title: "Kampus & Akademik",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    desc: "Untuk perguruan tinggi, SMK, dan lembaga pendidikan yang ingin membekali mahasiswa dengan sertifikasi siap kerja.",
    benefits: ["Akses program bersertifikat untuk mahasiswa & alumni", "Co-branding sertifikat dengan institusi", "Dashboard pelaporan perkembangan peserta", "Harga khusus institusi pendidikan"],
    steps: ["Ajukan kerja sama melalui form mitra", "Diskusi skema & program dengan tim Skillary", "Onboarding dan peluncuran program ke mahasiswa"],
    requirements: "Institusi pendidikan resmi dengan minimal satu program studi aktif.",
  },
  {
    id: "community",
    title: "Komunitas & Profesi",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    desc: "Untuk komunitas profesional, asosiasi, dan organisasi profesi yang ingin meningkatkan kompetensi anggotanya.",
    benefits: ["Program pelatihan kustom untuk anggota", "Skema benefit & komisi untuk komunitas", "Sertifikat untuk member yang lulus", "Materi promosi siap pakai"],
    steps: ["Daftarkan komunitas melalui form mitra", "Tentukan program & benefit anggota bersama tim", "Distribusikan ke anggota komunitas Anda"],
    requirements: "Komunitas atau asosiasi aktif dengan basis anggota yang jelas.",
  },
  {
    id: "expert",
    title: "Trainer & Expert",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    desc: "Untuk praktisi, trainer, dan subject matter expert yang ingin berkolaborasi menjalankan program melalui platform Skillary.",
    benefits: ["Platform & operasional ditangani Skillary", "Bagi hasil yang transparan", "Akses ke jaringan klien korporat", "Dukungan instruksional & desain materi"],
    steps: ["Kirim profil & bidang keahlian Anda", "Kurasi & sesi penyelarasan dengan tim", "Mulai jalankan program sebagai trainer mitra"],
    requirements: "Memiliki keahlian terbukti & pengalaman melatih di bidangnya.",
  },
];

const PARTNERS = [
  "Universitas Mitra", "Politeknik Negeri", "Komunitas Data ID", "Asosiasi HR Indonesia",
  "Forum L&D Nasional", "Himpunan Trainer Pro", "SMK Unggulan", "Komunitas Product",
];

export default function AffiliatePage() {
  const [activeTrack, setActiveTrack] = useState(TRACKS[0].id);
  const current = TRACKS.find((t) => t.id === activeTrack)!;

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white pt-16 pb-14 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Program Kemitraan</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Tumbuh Bersama Skillary
          </h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            Kemitraan yang setara — bukan hubungan vendor-supplier. Kami membuka kolaborasi dengan kampus,
            komunitas, dan trainer untuk bersama menjalankan pelatihan yang lebih berdampak.
          </p>
        </div>
      </section>

      {/* ── Track selector + detail ── */}
      <section className="py-14 px-5 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Track tabs */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {TRACKS.map((track) => {
              const active = track.id === activeTrack;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className="text-left p-6 rounded-2xl transition-all"
                  style={active
                    ? { background: "rgb(255, 251, 245)", border: "2px solid rgb(255, 138, 0)" }
                    : { background: "white", border: "1.5px solid rgb(240, 217, 200)" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    {track.icon}
                  </div>
                  <h3 className="font-bold text-[#0F172A] mb-1">{track.title}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{track.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="bg-white rounded-2xl p-8 md:p-10" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <div className="grid md:grid-cols-2 gap-10">
              {/* Benefits */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-black/45 mb-5">Benefit untuk Anda</h4>
                <ul className="space-y-3">
                  {current.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>✓</span>
                      <span className="text-sm text-[#334155]">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 rounded-xl" style={{ background: "rgb(255, 248, 241)", border: "1px solid rgb(240, 217, 200)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/45 mb-1">Syarat</p>
                  <p className="text-sm text-[#334155]">{current.requirements}</p>
                </div>
              </div>

              {/* Steps */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-black/45 mb-5">Cara Bergabung</h4>
                <div className="space-y-4">
                  {current.steps.map((s, i) => (
                    <div key={s} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-[#334155] pt-1.5">{s}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/contact?type=affiliate&segment=${current.id}`}
                  className="inline-flex items-center gap-2 mt-7 text-white text-sm font-bold px-6 py-3 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
                >
                  Ajukan sebagai {current.title} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="py-16 px-5 md:px-6 lg:px-8 bg-white" style={{ borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Mitra Skillary yang Sudah Bergabung</h2>
          <p className="text-sm text-[#64748B] mb-10">Bersama institusi dan komunitas yang berkomitmen pada pengembangan kompetensi.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PARTNERS.map((p) => (
              <div key={p} className="flex items-center gap-2 px-4 py-2.5 rounded-lg" style={{ background: "rgb(250, 250, 250)", border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>{p.charAt(0)}</div>
                <span className="text-xs font-semibold text-[#475569]">{p}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#94A3B8] mt-6">Nama mitra di atas merupakan ilustrasi kategori institusi yang menjadi target kolaborasi.</p>
        </div>
      </section>

      {/* ── Registration form ── */}
      <PartnerForm />
    </div>
  );
}

function PartnerForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className="py-20 px-5 md:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Daftar sebagai Mitra</h2>
          <p className="text-[#64748B]">Isi formulir di bawah, tim kemitraan kami akan menghubungi Anda.</p>
        </div>
        <div className="bg-white rounded-2xl p-8" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
          {!sent ? (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nama Lengkap" placeholder="Nama Anda" type="text" required />
                <Field label="Email" placeholder="nama@institusi.com" type="email" required />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Institusi / Komunitas" placeholder="Nama institusi" type="text" required />
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1.5">Jalur Kemitraan</label>
                  <select
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 bg-white"
                    style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
                  >
                    <option value="" disabled>Pilih jalur</option>
                    <option value="campus">Kampus & Akademik</option>
                    <option value="community">Komunitas & Profesi</option>
                    <option value="expert">Trainer & Expert</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#334155] mb-1.5">Ceritakan singkat tentang Anda</label>
                <textarea
                  rows={4}
                  placeholder="Bidang, jumlah anggota/mahasiswa, atau bentuk kolaborasi yang Anda harapkan..."
                  className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 resize-none"
                  style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
                />
              </div>
              <button type="submit" className="w-full text-white text-sm font-bold py-3.5 rounded-xl transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                Kirim Pendaftaran Mitra
              </button>
              <p className="text-[11px] text-[#94A3B8] text-center">
                Atau hubungi tim kami langsung melalui <Link href="/contact" className="font-semibold hover:underline" style={{ color: "rgb(255,138,0)" }}>halaman kontak</Link>.
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">Pendaftaran Terkirim!</h3>
              <p className="text-sm text-[#64748B]">Terima kasih atas minat Anda. Tim kemitraan Skillary akan menghubungi Anda dalam 2–3 hari kerja.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type, required }: { label: string; placeholder: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-1.5">{label}</label>
      <input
        type={type} required={required} placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2"
        style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
      />
    </div>
  );
}
