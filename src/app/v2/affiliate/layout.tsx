import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Mitra & Afiliasi — Skillary",
  description: "Bergabung sebagai mitra kampus, komunitas, atau trainer. Jalankan program pelatihan bersama Skillary.",
};

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
