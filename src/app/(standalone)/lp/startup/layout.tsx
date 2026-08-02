import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary — Pelatihan Profesional dari Events hingga Program Korporat",
  description:
    "Ekosistem pembelajaran profesional: webinar berbayar rutin, program batch tim, assessment, sertifikat digital terverifikasi, dan laporan pelatihan untuk HR & L&D.",
  // This route stays as a noindex alias — the canonical home is "/".
  robots: { index: false, follow: false },
};

export default function StartupLpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
