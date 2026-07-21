import type { Metadata } from "next";
import ProgramsPage from "@/app/v2/catalog/page";

export const metadata: Metadata = {
  title: "Katalog Program Pelatihan",
  description: "Jelajahi program pelatihan Skillary untuk data, AI, presentasi, leadership, dan peningkatan proses organisasi.",
  alternates: { canonical: "/programs" },
};

export default ProgramsPage;
