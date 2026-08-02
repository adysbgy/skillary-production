import type { Metadata } from "next";
import type { ReactNode } from "react";

import { HomepagePreviewShell } from "@/features/marketing/homepage-preview/components/PreviewShell";

const previewTitle = "Homepage Preview Skillary";
const previewDescription =
  "Preview terisolasi homepage Skillary untuk program, workshop, jalur belajar, dan kebutuhan organisasi.";

export const metadata: Metadata = {
  title: { absolute: previewTitle },
  description: previewDescription,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: previewTitle,
    description: previewDescription,
    url: "/lp/homepage-preview",
    siteName: "Skillary",
    locale: "id_ID",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: previewTitle,
    description: previewDescription,
    images: [],
  },
};

export default function HomepagePreviewLayout({ children }: { children: ReactNode }) {
  return <HomepagePreviewShell>{children}</HomepagePreviewShell>;
}
