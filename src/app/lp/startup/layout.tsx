import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary — Skalakan Pelatihan Tim Anda",
  description:
    "Platform pelatihan end-to-end untuk HR & L&D: materi, assessment, sertifikat terverifikasi, dan laporan dalam satu tempat.",
  // This route stays as a noindex alias — the canonical home is "/".
  robots: { index: false, follow: false },
};

export default function StartupLpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
