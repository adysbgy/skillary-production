import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terima Kasih",
  description: "Inquiry Anda telah diterima. Tim Skillary akan meninjau kebutuhan pelatihan dan menghubungi kembali pada hari kerja.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] py-20 lg:py-32 min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4A57412_1px,transparent_1px),linear-gradient(to_bottom,#D4A57412_1px,transparent_1px)] bg-[size:32px_32px]" />
      <Container className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="mb-8 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#D1FAE5] border-4 border-[#A7F3D0]">
          <svg className="w-10 h-10 text-[#065F46]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
          Terima kasih, inquiry Anda sudah kami terima.
        </h1>
        <p className="text-lg text-[#475569] mb-4 leading-relaxed">
          Tim Skillary akan meninjau kebutuhan pelatihan Anda dan menghubungi kembali pada hari kerja.
        </p>
        <p className="text-sm text-[#64748B] mb-12">
          Sambil menunggu, Anda dapat melihat informasi berikut untuk memahami solusi Skillary lebih lanjut.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Lihat Area Program", href: "/program-catalog", desc: "Topik pelatihan yang dapat dikembangkan." },
            { label: "Solusi untuk Organisasi", href: "/untuk-organisasi", desc: "Pendekatan Skillary untuk organisasi." },
            { label: "Tentang Skillary", href: "/about", desc: "Perjalanan dan latar belakang Skillary." },
          ].map((card, idx) => (
            <Link key={idx} href={card.href} className="group bg-white border border-[#E7DDD4] rounded-xl p-5 text-left hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[#0F172A] text-sm mb-1 group-hover:text-[#1E3A8A] transition-colors">
                {card.label} →
              </h3>
              <p className="text-xs text-[#64748B]">{card.desc}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
