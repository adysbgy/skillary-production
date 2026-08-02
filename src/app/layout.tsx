import type { Metadata } from "next";
import { Suspense } from "react";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { HeaderV2 } from "@/components/v2/layout/HeaderV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { MarketingHeaderGate } from "@/components/v2/layout/MarketingHeaderGate";
import { Providers } from "@/components/Providers";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillary.my.id"),
  title: {
    default: "Skillary — Live Webinar & Self-Paced Learning",
    template: "%s | Skillary",
  },
  description: "Belajar skill kerja melalui live webinar, self-paced course, praktik, dan credential terverifikasi. Tersedia juga program in-house melalui Skillary For Business.",
  keywords: ["live webinar", "self-paced course", "pelatihan profesional", "sertifikat digital", "badge LinkedIn", "in-house training", "Skillary"],
  openGraph: {
    title: "Skillary — Live Webinar & Self-Paced Learning",
    description: "Belajar, praktik, dan buktikan skill kerja melalui live webinar, self-paced course, program terarah, dan credential terverifikasi.",
    url: "https://skillary.my.id",
    siteName: "Skillary",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Skillary — Live Webinar & Self-Paced Learning",
    description: "Live webinar, self-paced learning, praktik, dan credential untuk profesional—dengan jalur terpisah For Business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${jbMono.variable} antialiased`}>
      <body className="flex flex-col text-[#181818] font-sans">
        <Suspense fallback={null}>
          <AnalyticsProvider>
            <Providers>
              <HeaderV2 />
              <MarketingHeaderGate />
              <main className="flex-1">
                {children}
              </main>
              <FooterV2 />
            </Providers>
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  );
}

