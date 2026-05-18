import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skillary.id"),
  title: {
    default: "Skillary — Platform Pelatihan Terukur untuk Organisasi",
    template: "%s | Skillary",
  },
  description: "Skillary membantu organisasi mengelola pelatihan internal dari materi pembelajaran, assessment, sertifikat digital, hingga laporan peserta dalam satu platform.",
  keywords: ["pelatihan perusahaan", "in-house training", "LMS Indonesia", "assessment training", "sertifikat digital", "pelatihan karyawan", "corporate training", "Skillary"],
  openGraph: {
    title: "Skillary — Platform Pelatihan Terukur untuk Organisasi",
    description: "Skillary membantu organisasi mengelola pelatihan internal dari materi pembelajaran, assessment, sertifikat digital, hingga laporan peserta dalam satu platform.",
    url: "https://skillary.id",
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="flex flex-col text-[#181818]">
        <Providers>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

