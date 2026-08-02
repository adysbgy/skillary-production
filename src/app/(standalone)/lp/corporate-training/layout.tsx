import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Training Platform | Skillary",
  description:
    "Skillary membantu perusahaan menjalankan pelatihan korporat yang terdokumentasi, tersertifikasi, dan siap dilaporkan. Sertifikat digital, training report, database peserta dalam satu platform.",
  keywords: [
    "corporate training",
    "pelatihan korporat",
    "in-house training",
    "sertifikat digital",
    "training report",
    "HR training platform",
    "L&D platform",
    "Skillary",
  ],
  openGraph: {
    title: "Corporate Training Platform | Skillary",
    description:
      "Skillary membantu perusahaan menjalankan pelatihan korporat yang terdokumentasi, tersertifikasi, dan siap dilaporkan.",
    url: "https://skillary.id/lp/corporate-training",
    siteName: "Skillary",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Corporate Training Platform | Skillary",
    description:
      "Pelatihan korporat terdokumentasi, tersertifikasi, dan siap dilaporkan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CorporateTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
