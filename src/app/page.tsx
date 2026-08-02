import type { Metadata } from "next";
import { StartupLanding } from "@/components/marketing/startup/StartupLanding";

export const metadata: Metadata = {
  title: "Skillary — Pelatihan Profesional dari Events hingga Program Korporat",
  description:
    "Ekosistem pembelajaran profesional: webinar berbayar rutin, program batch tim, assessment, sertifikat digital terverifikasi, dan laporan pelatihan untuk HR & L&D.",
};

export default function Homepage() {
  return <StartupLanding />;
}
