import type { Metadata } from "next";
import { HeroV2 } from "@/components/v2/home/HeroV2";
import { ProgramsV2 } from "@/components/v2/home/ProgramsV2";
import { HowItWorksV2 } from "@/components/v2/home/HowItWorksV2";
import { AffiliateCtaV2 } from "@/components/v2/home/AffiliateCtaV2";
import { FinalCtaV2 } from "@/components/v2/home/FinalCtaV2";

export const metadata: Metadata = {
  title: "Skillary — Live Webinar, Self-Paced Learning, dan Training untuk Tim",
  description: "Belajar skill kerja melalui webinar live, program self-paced, dan training in-house yang disusun bersama trainer Skillary.",
};

/**
 * Skillary Homepage V2
 *
 * Accessible di: /v2
 * Halaman v1 (/) tidak tersentuh.
 *
 * Sections:
 * 1. HeroV2         — headline tajam + CTA + social proof
 * 2. CredibilityV2  — stats bar (dark) + client logos (BINAR-style)
 * 3. ProgramsV2     — catalog dengan filter tab (NetCampus-style)
 * 4. HowItWorksV2   — 4-langkah visual
 * 5. SocialProofV2  — testimonials dengan org + outcome stats
 * 6. AffiliateCtaV2 — campus / community / expert collab (Multimatics-style)
 * 7. FinalCtaV2     — dark CTA banner
 *
 * Untuk switch ke production: copy ke src/app/page.tsx, hapus folder /v2.
 */

export default function HomepageV2() {
  return (
    <>
      <HeroV2 />
      <ProgramsV2 />
      <HowItWorksV2 />
      <AffiliateCtaV2 />
      <FinalCtaV2 />
    </>
  );
}
