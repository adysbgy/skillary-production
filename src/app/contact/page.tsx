import type { Metadata } from "next";
import { Suspense } from "react";
import ContactPage from "@/features/marketing/pages/ContactPage";

export const metadata: Metadata = {
  title: "Diskusikan Kebutuhan Pelatihan",
  description: "Diskusikan kebutuhan pelatihan tim dan organisasi Anda bersama Skillary.",
  alternates: { canonical: "/contact" },
};

export default function ContactRoute() {
  return (
    <Suspense fallback={null}>
      <ContactPage />
    </Suspense>
  );
}
