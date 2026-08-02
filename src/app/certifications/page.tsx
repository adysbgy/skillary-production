import type { Metadata } from "next";
import CertificationsCatalogPage from "@/features/marketing/pages/CertificationsCatalogPage";

export const metadata: Metadata = {
  title: "Program Sertifikasi & Credential Skillary",
  description: "Jelajahi program Skillary Certified berbasis pembelajaran, praktik, assessment criteria, badge digital, dan credential record yang dapat ditinjau.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Skillary Certified — Program & Credential",
    description: "Credential untuk skill yang dipraktikkan, dinilai, dan dapat ditinjau melalui record Skillary.",
    images: [{ url: "/images/certifications/ai-productivity-practitioner.jpg", width: 1024, height: 1024, alt: "Skillary Certified credential badge" }],
  },
};

export default CertificationsCatalogPage;
