import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";

export function PathCards() {
  const paths = [
    {
      title: "Belajar Mandiri",
      desc: "Ikuti course terstruktur, kerjakan assessment, dan dapatkan sertifikat digital.",
      cta: "Jelajahi Kelas",
      href: "/explore",
      icon: "🧑‍💻",
    },
    {
      title: "Jadi Instructor",
      desc: "Buat kelas, quiz, sertifikat, dan pantau perkembangan peserta.",
      cta: "Mulai Buat Course",
      href: "/admin", // Changed to generic route, if an instructor page exists, it would be better
      icon: "👩‍🏫",
    },
    {
      title: "Training untuk Tim",
      desc: "Kelola pelatihan internal dengan dashboard, assessment, sertifikat, dan laporan.",
      cta: "Lihat Solusi Tim",
      href: "/untuk-organisasi",
      icon: "🏢",
    },
    {
      title: "Assessment In-House",
      desc: "Jalankan quiz atau evaluasi untuk satu kelas, batch, atau program pelatihan.",
      cta: "Pelajari Assessment",
      href: "/untuk-organisasi",
      icon: "📝",
    },
  ];

  return (
    <Container className="py-16 lg:py-24">
      <SectionTitle
        title="Pilih Jalur yang Sesuai dengan Kebutuhan Anda"
        description="Skillary dirancang untuk mendukung berbagai cara belajar dan mengelola pelatihan."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
        {paths.map((path, idx) => (
          <Link href={path.href} key={idx} className="group flex h-full">
            <Card className="flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] w-full">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFFDF9] text-2xl shadow-sm ring-1 ring-black/5 group-hover:scale-110 transition-transform">
                {path.icon}
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{path.title}</h3>
              <p className="mt-3 text-sm leading-6 text-black/60 flex-grow">
                {path.desc}
              </p>
              <div className="mt-6 text-sm font-bold text-[#D88A44] group-hover:text-[rgb(255,90,95)] transition-colors">
                {path.cta} &rarr;
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
