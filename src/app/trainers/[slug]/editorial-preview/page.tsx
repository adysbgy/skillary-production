import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicTrainer } from "@/lib/trainer-public";
import { toEditorialProfile } from "@/lib/trainer-editorial-view";
import { EditorialProfilePage } from "@/components/trainers/editorial/EditorialProfile";

export const metadata: Metadata = { title: "Editorial Faculty Profile Preview | Skillary", description: "Private visual preview of Skillary's editorial faculty profile.", robots: { index: false, follow: false, nocache: true } };
export const dynamic = "force-dynamic";
export default async function EditorialPreview({ params }: { params: Promise<{ slug: string }> }) { const trainer = await publicTrainer((await params).slug); if (!trainer) notFound(); return <EditorialProfilePage profile={toEditorialProfile(trainer)} />; }
