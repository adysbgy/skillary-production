import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { trainingImages, getImageCaption } from "@/lib/training-image-assets";

export function PeopleProofStrip() {
  const cards = [
    {
      image: trainingImages.trainingSession,
      title: "Sesi Pelatihan",
      desc: "Materi disampaikan secara terstruktur dan dapat diakses kembali.",
    },
    {
      image: trainingImages.groupDiscussion,
      title: "Diskusi Peserta",
      desc: "Peserta dapat berdiskusi dan mengikuti assessment program.",
    },
    {
      image: trainingImages.trainerGuidance,
      title: "Pendampingan Trainer",
      desc: "Trainer mendampingi peserta untuk memastikan pemahaman.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#FFFDF9] border-y border-[#E7DDD4]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-[#0F172A] mb-4">
            Pelatihan yang Tetap Melibatkan Trainer, Peserta, dan Diskusi
          </h2>
          <p className="text-[#475569] text-base lg:text-lg">
            Skillary membantu proses training menjadi lebih rapi secara digital, tanpa menghilangkan konteks manusia dalam pembelajaran.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white border border-[#E7DDD4] rounded-2xl overflow-hidden shadow-sm group">
              <div className="relative h-48 overflow-hidden">
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
              <div className="p-5">
                <h3 className="font-bold text-[#0F172A] text-sm mb-1.5">{card.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
