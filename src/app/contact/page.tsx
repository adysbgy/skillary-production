import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactGuide } from "@/components/contact/ContactGuide";
import { ContactAlternatives } from "@/components/contact/ContactAlternatives";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Skillary",
  description: "Hubungi Skillary untuk berdiskusi tentang in-house training, assessment, sertifikat digital, laporan peserta, atau kolaborasi expert.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <ContactHero />
      <ContactCards />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
            <Suspense fallback={<div className="bg-white border border-[#E7DDD4] rounded-2xl p-10 animate-pulse h-96" />}>
              <ContactForm />
            </Suspense>
            
            <div className="lg:sticky lg:top-32">
              <ContactGuide />
              <ContactAlternatives />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
