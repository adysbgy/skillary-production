import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { HeaderV2 } from "@/components/v2/layout/HeaderV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";
import { MarketingHeaderGate } from "@/components/v2/layout/MarketingHeaderGate";
import { Providers } from "@/components/Providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillary.my.id"),
  title: {
    default: "Skillary — Platform Pelatihan Terukur untuk Organisasi",
    template: "%s | Skillary",
  },
  description: "Skillary membantu organisasi mengelola pelatihan internal dari materi pembelajaran, assessment, sertifikat digital, hingga laporan peserta dalam satu platform.",
  keywords: ["pelatihan perusahaan", "in-house training", "LMS Indonesia", "assessment training", "sertifikat digital", "pelatihan karyawan", "corporate training", "Skillary"],
  openGraph: {
    title: "Skillary — Platform Pelatihan Terukur untuk Organisasi",
    description: "Skillary membantu organisasi mengelola pelatihan internal dari materi pembelajaran, assessment, sertifikat digital, hingga laporan peserta dalam satu platform.",
    url: "https://skillary.my.id",
    siteName: "Skillary",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary",
    title: "Skillary — Platform Pelatihan Terukur untuk Organisasi",
    description: "Skillary membantu organisasi mengelola pelatihan internal dari materi pembelajaran, assessment, sertifikat digital, hingga laporan peserta dalam satu platform.",
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
    <html lang="id" className={`${manrope.variable} ${jbMono.variable} antialiased`}>
      <body className="flex flex-col text-[#181818] font-sans">
        <Providers>
          <HeaderV2 />
          <MarketingHeaderGate />
          <main className="flex-1">
            {children}
          </main>
          <FooterV2 />
        </Providers>
      </body>
    </html>
  );
}

