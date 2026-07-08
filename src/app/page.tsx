import type { Metadata } from "next";
import StartupHomepage from "./lp/startup/page";

export const metadata: Metadata = {
  title: "Skillary — Platform Pelatihan Organisasi Terukur & Bersertifikat",
  description:
    "Skalakan pelatihan tim Anda: materi, assessment, sertifikat digital terverifikasi, dan laporan peserta dalam satu platform. Dipercaya 21+ organisasi.",
};

export default function Homepage() {
  return <StartupHomepage />;
}
