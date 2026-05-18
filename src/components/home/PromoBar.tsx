import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function PromoBar() {
  return (
    <div className="bg-black text-white py-2.5 text-center text-sm font-medium z-50 relative">
      <Container>
        🔥 Launch Promo — Kelas pilihan mulai Rp77.000{" "}
        <Link href="#promo-courses" className="underline underline-offset-4 font-bold ml-2 hover:text-[rgb(255,138,0)] transition-colors">
          Lihat Kelas Promo
        </Link>
      </Container>
    </div>
  );
}
