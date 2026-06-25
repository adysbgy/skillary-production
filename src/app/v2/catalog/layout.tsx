import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalog Program Pelatihan — Skillary",
  description: "Temukan program pelatihan korporat yang tepat untuk tim Anda. Data Analytics, AI, Presentasi, Leadership, SOP, dan lainnya. In-house, online, hybrid.",
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
