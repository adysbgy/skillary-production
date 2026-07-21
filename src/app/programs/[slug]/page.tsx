import type { Metadata } from "next";
import ProgramPage, { generateStaticParams } from "@/features/programs/pages/ProgramDetailPage";
import { getProgramBySlug } from "@/data/v2-programs";

export { generateStaticParams };

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program Tidak Ditemukan", robots: { index: false, follow: false } };
  return {
    title: `${program.title} — Pelatihan Korporat`,
    description: `${program.tagline} ${program.desc}`,
    alternates: { canonical: `/programs/${program.slug}` },
  };
}

export default ProgramPage;
