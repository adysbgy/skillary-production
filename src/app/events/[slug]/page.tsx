import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Webinar Belum Tersedia | Skillary",
  robots: { index: false, follow: false },
};

export default function EventDetailUnavailablePage() {
  notFound();
}
