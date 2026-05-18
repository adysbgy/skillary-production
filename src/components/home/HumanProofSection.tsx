import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { trainingImages, getImageCaption } from "@/lib/training-image-assets";

export function HumanProofSection() {
  const cards = [
    {
      image: trainingImages.trainingSession,
      title: "Sesi Pelatihan",
      desc: "Materi disampaikan secara terstruktur dan dapat diakses kembali oleh peserta.",
    },
    {
      image: trainingImages.groupDiscussion,
      title: "Diskusi & Praktik",
      desc: "Peserta dapat mengikuti latihan, diskusi, dan assessment sesuai kebutuhan program.",
    },
    {
      image: trainingImages.trainerGuidance,
      title: "Dokumentasi Hasil",
      desc: "Pengelola mendapatkan rekap progress, hasil assessment, dan sertifikat peserta.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFDF9]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Training Tetap Tentang Manusia, Bukan Hanya Platform
          </h2>
          <p className="text-[#475569] text-lg">
            Skillary membantu proses pelatihan menjadi lebih rapi secara digital, sambil tetap menjaga konteks pembelajaran: trainer, peserta, diskusi, praktik, dan tindak lanjut.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white border border-[#E7DDD4] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] text-white/80 font-medium italic backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded">
                  {getImageCaption(card.image)}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#0F172A] mb-2">{card.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
