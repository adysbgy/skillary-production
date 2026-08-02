import type { Metadata } from "next";
import AIProductivityCredentialPage from "@/features/marketing/pages/AIProductivityCredentialPage";

export const metadata: Metadata = {
  title: "AI Productivity Practitioner | Credential & Badge Skillary",
  description:
    "Pelajari pathway Skillary Certified AI Productivity Practitioner: program terstruktur, applied assessment, badge digital, dan credential record yang dapat ditinjau.",
  alternates: { canonical: "/certifications/ai-productivity-practitioner" },
  openGraph: {
    title: "Skillary Certified — AI Productivity Practitioner",
    description: "Credential berbasis program dan applied assessment untuk praktik AI yang produktif, bertanggung jawab, dan dapat ditinjau.",
    images: [{ url: "/images/certifications/ai-productivity-practitioner.jpg", width: 1024, height: 1024, alt: "Badge Skillary Certified AI Productivity Practitioner" }],
  },
};

const credentialJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Skillary Certified — AI Productivity Practitioner",
  description: "Program dan applied assessment untuk praktik AI yang produktif, responsible, dan dapat ditinjau melalui credential record Skillary.",
  provider: { "@type": "Organization", name: "Skillary" },
  educationalLevel: "Practitioner",
};

export default function AIProductivityPractitionerRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialJsonLd) }} />
      <AIProductivityCredentialPage />
    </>
  );
}
