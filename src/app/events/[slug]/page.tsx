import type { Metadata } from "next";
import EventPage, { generateStaticParams } from "@/features/events/pages/EventDetailPage";
import { getEventBySlug } from "@/data/v2-events";

export { generateStaticParams };

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event Tidak Ditemukan", robots: { index: false, follow: false } };
  return {
    title: `${event.title} — Events Skillary`,
    description: event.desc,
    alternates: { canonical: `/events/${event.slug}` },
  };
}

export default EventPage;
