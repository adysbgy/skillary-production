import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { trainingImages } from "@/lib/training-image-assets";

export function TrainingAtmosphereSection() {
  const cards = [
    {
      image: trainingImages.groupDiscussion,
      title: "Diskusi Peserta",
      desc: "Peserta berdiskusi dan berkolaborasi untuk memperdalam pemahaman materi.",
    },
    {
      image: trainingImages.trainerGuidance,
      title: "Pendampingan Trainer",
      desc: "Trainer mendampingi peserta untuk memastikan penerapan materi.",
    },
    {
      image: trainingImages.assessmentSession,
      title: "Assessment Program",
      desc: "Evaluasi pemahaman melalui quiz dan assessment terintegrasi.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Training Tetap Tentang Manusia
          </h2>
          <p className="text-[#475569] text-lg">
            Skillary membantu proses pelatihan tetap melibatkan trainer, peserta, diskusi, praktik, dan tindak lanjut—dengan sistem digital yang membuat hasilnya lebih mudah dipantau.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/20 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0F172A] text-sm mb-1.5">{card.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-10 text-[10px] text-[#94A3B8] italic font-medium">
          Foto digunakan sebagai ilustrasi suasana pelatihan.
        </p>
      </Container>
    </section>
  );
}
