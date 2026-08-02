import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary Campus — Corporate Digital Training Platform",
  description:
    "Landing page Skillary untuk pelatihan digital, assessment, sertifikat, dan training report bagi tim dan organisasi.",
  openGraph: {
    title: "Skillary Campus — Corporate Digital Training Platform",
    description:
      "Skillary membantu organisasi menjalankan training digital yang lebih terstruktur, terdokumentasi, dan terukur.",
    url: "https://skillary.my.id/skillary-campus",
    siteName: "Skillary",
    type: "website",
    locale: "id_ID",
  },
};

export default function SkillaryCampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
