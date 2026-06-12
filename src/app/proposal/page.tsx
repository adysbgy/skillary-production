"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const BRIEF_CHIPS = [
  { id: "peserta", label: "Jumlah Peserta" },
  { id: "profil", label: "Profil Peserta" },
  { id: "topik", label: "Topik Pelatihan" },
  { id: "durasi", label: "Durasi Program" },
  { id: "format", label: "Online / Offline / Hybrid" },
  { id: "assessment", label: "Butuh Assessment" },
  { id: "sertifikat", label: "Butuh Sertifikat" },
  { id: "laporan", label: "Butuh Laporan Peserta" },
  { id: "tanggal", label: "Target Tanggal Pelaksanaan" },
];

function BriefChecklist() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedLabels = BRIEF_CHIPS.filter((c) => selected.has(c.id))
    .map((c) => c.label)
    .join(", ");

  const whatsappText = selectedLabels
    ? `Halo Skillary, saya sudah menyiapkan: ${selectedLabels}. Saya ingin mendiskusikan kebutuhan training.`
    : "Halo Skillary, saya ingin mendiskusikan kebutuhan training untuk organisasi saya.";

  const waUrl = `https://wa.me/62811186363?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="bg-[#FFFDF9] rounded-2xl p-8 lg:p-10" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
      <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-2">
        Siapkan Brief Singkat Agar Proposal Lebih Tepat
      </h2>
      <p className="text-[#475569] mb-8 text-sm leading-relaxed">
        Tidak perlu lengkap. Pilih informasi yang sudah Anda miliki, sisanya bisa dibantu saat diskusi.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {BRIEF_CHIPS.map((chip) => {
          const isActive = selected.has(chip.id);
          return (
            <button
              key={chip.id}
              onClick={() => toggle(chip.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer select-none"
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))',
                      color: '#fff',
                      border: '1.5px solid transparent',
                      boxShadow: '0 2px 8px rgba(255,138,0,0.3)',
                    }
                  : {
                      background: '#fff',
                      color: '#334155',
                      border: '1.5px solid rgb(240, 217, 200)',
                    }
              }
            >
              {isActive && (
                <span className="mr-1.5">✓</span>
              )}
              {chip.label}
            </button>
          );
        })}
      </div>
      {selected.size > 0 && (
        <p className="text-xs text-[#64748B] mb-6">
          Dipilih: <span className="font-semibold text-[#334155]">{selected.size} dari {BRIEF_CHIPS.length} item</span>
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-sm"
          style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Saya Sudah Punya Brief
        </a>
        <Link href="/contact">
          <button className="inline-flex items-center gap-2 bg-white text-[#334155] font-bold px-6 py-3 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all text-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Bantu Saya Susun Brief
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFDF9] py-20 lg:py-28" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Proposal Korporat
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl text-[#0F172A] mb-6">
            Ajukan Kebutuhan Training Anda
          </h1>
          <p className="text-lg leading-relaxed text-[#475569]">
            Proposal Skillary membantu organisasi memahami pendekatan pelatihan, fitur platform, bentuk kerja sama, dan output yang dapat diterima.
          </p>
        </Container>
      </section>

      {/* Apa Isi Proposal */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
                Apa Isi Proposal Skillary?
              </h2>
              <p className="text-[#475569] leading-relaxed mb-8">
                Proposal disusun untuk memberikan gambaran lengkap tentang bagaimana Skillary dapat mendukung kebutuhan pelatihan organisasi Anda.
              </p>
              <div className="space-y-3">
                {[
                  "Profil singkat Skillary",
                  "Pengalaman pelatihan sejak 1998",
                  "Tantangan pelatihan internal",
                  "Solusi dan pendekatan Skillary",
                  "Alur program pelatihan",
                  "Fitur platform",
                  "Area program yang dapat dikembangkan",
                  "Format kerja sama",
                  "Output untuk organisasi",
                  "Next step diskusi",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                    <span className="text-[#334155] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl p-8" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">
                Cocok untuk Siapa?
              </h3>
              <div className="space-y-4">
                {[
                  { role: "HR / L&D", desc: "Yang membutuhkan partner platform pelatihan terukur." },
                  { role: "Training Manager", desc: "Yang ingin mengelola program training lebih rapi." },
                  { role: "Direktur / Kepala Divisi", desc: "Yang perlu memastikan training berdampak." },
                  { role: "Sekolah / Yayasan", desc: "Yang membutuhkan platform pelatihan untuk guru dan staf." },
                  { role: "PIC Program Pelatihan", desc: "Yang mencari pendekatan pelatihan yang lebih terstruktur." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                    <div>
                      <p className="font-bold text-[#0F172A] text-sm">{item.role}</p>
                      <p className="text-xs text-[#64748B]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Brief Checklist */}
      <section className="py-16 lg:py-20 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-3xl mx-auto">
          <BriefChecklist />
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <Container className="text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-6">
            Siap Mendiskusikan Proposal?
          </h2>
          <p className="text-lg text-[#475569] mb-10">
            Ceritakan kebutuhan pelatihan organisasi Anda melalui halaman kontak. Tim Skillary akan meninjau kebutuhan dan menyiapkan proposal yang sesuai.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="w-full sm:w-auto text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusikan Kebutuhan Training
              </button>
            </Link>
            <Link href="/services">
              <button className="w-full sm:w-auto bg-white text-[#64748B] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Solusi Organisasi
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
