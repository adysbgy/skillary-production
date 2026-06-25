import type { Metadata } from "next";
import { HeroV2 } from "@/components/v2/home/HeroV2";
import { CredibilityV2 } from "@/components/v2/home/CredibilityV2";
import { ProgramsV2 } from "@/components/v2/home/ProgramsV2";
import { HowItWorksV2 } from "@/components/v2/home/HowItWorksV2";
import { SocialProofV2 } from "@/components/v2/home/SocialProofV2";
import { AffiliateCtaV2 } from "@/components/v2/home/AffiliateCtaV2";
import { FinalCtaV2 } from "@/components/v2/home/FinalCtaV2";

export const metadata: Metadata = {
  title: "Skillary — Platform Pelatihan Organisasi Terukur & Bersertifikat",
  description: "Platform LMS untuk HR & L&D. Pelatihan in-house terstruktur, sertifikat digital resmi, laporan peserta otomatis. Dipercaya BNI, Bank Indonesia, OJK, Indofood, Freeport.",
};

export default function Homepage() {
  return (
    <>
      <HeroV2 />
      <CredibilityV2 />
      <ProgramsV2 />
      <HowItWorksV2 />
      <SocialProofV2 />
      <AffiliateCtaV2 />
      <FinalCtaV2 />
    </>
  );
}
