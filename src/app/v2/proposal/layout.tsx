import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konsultasi Program Pelatihan — Skillary",
  description: "Ceritakan kebutuhan pelatihan organisasi Anda. Konsultasi gratis, respon dalam 1 hari kerja.",
};

export default function ProposalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
