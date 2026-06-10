import { HeroSection } from "@/components/landing/HeroSection";
import { PromoBannerSection } from "@/components/landing/PromoBannerSection";
import { CategoryPillsSection } from "@/components/landing/CategoryPillsSection";
import { KelasUnggulanSection } from "@/components/landing/KelasUnggulanSection";
import { LearningPathSection } from "@/components/landing/LearningPathSection";
import { CareerPlusSection } from "@/components/landing/CareerPlusSection";
import { BeasiswaSection } from "@/components/landing/BeasiswaSection";
import { TestimoniSection } from "@/components/landing/TestimoniSection";
import { PartnershipSection } from "@/components/landing/PartnershipSection";
import { BeritaSection } from "@/components/landing/BeritaSection";
import { InsightSection } from "@/components/landing/InsightSection";
import { KolaborasiSection } from "@/components/landing/KolaborasiSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary — Upgrade Skill, Raih Karir | datacamp.id",
  description: "Platform pelatihan digital dengan kursus praktis, assessment terstruktur, dan sertifikat digital. Untuk profesional dan organisasi yang ingin berkembang.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PromoBannerSection />
      <CategoryPillsSection />
      <KelasUnggulanSection />
      <LearningPathSection />
      <BeasiswaSection />
      <TestimoniSection />
      <CareerPlusSection />
      <PartnershipSection />
      <BeritaSection />
      <InsightSection />
      <KolaborasiSection />
    </>
  );
}
