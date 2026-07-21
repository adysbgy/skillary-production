import type { Metadata } from "next";
import EventsPage from "@/app/v2/events/page";

export const metadata: Metadata = {
  title: "Events dan Webinar Praktis",
  description: "Ikuti webinar dan sesi live Skillary yang praktis untuk pengembangan skill kerja profesional.",
  alternates: { canonical: "/events" },
};

export default EventsPage;
