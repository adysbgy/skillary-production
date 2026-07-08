import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konsultasi Program Pelatihan Organisasi — Skillary",
  description: "Pelatihan in-house terstruktur dengan laporan peserta, sertifikat resmi, dan platform digital. Konsultasi gratis.",
  robots: { index: false, follow: false },
};

export default function TrainingOrganisasiLpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
