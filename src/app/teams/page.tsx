import { TeamsHero } from "@/components/teams/TeamsHero";
import { TeamsPainPoints } from "@/components/teams/TeamsPainPoints";
import { TeamsSolutionPillars } from "@/components/teams/TeamsSolutionPillars";
import { TeamsUseCases } from "@/components/teams/TeamsUseCases";
import { TeamsWorkflow } from "@/components/teams/TeamsWorkflow";
import { TeamsCapabilities } from "@/components/teams/TeamsCapabilities";
import { TeamsDeliverables } from "@/components/teams/TeamsDeliverables";
import { TeamsEngagementOptions } from "@/components/teams/TeamsEngagementOptions";
import { TeamsReportingHighlight } from "@/components/teams/TeamsReportingHighlight";
import { TeamsCertificateHighlight } from "@/components/teams/TeamsCertificateHighlight";
import { TeamsFAQ } from "@/components/teams/TeamsFAQ";
import { TeamsCTA } from "@/components/teams/TeamsCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skillary untuk Organisasi",
  description: "Solusi in-house training untuk organisasi yang membutuhkan materi pembelajaran, assessment, sertifikat digital, dan laporan peserta dalam satu alur.",
};

export default function TeamsPage() {
  return (
    <>
      <TeamsHero />
      <TeamsPainPoints />
      <TeamsSolutionPillars />
      <TeamsUseCases />
      <TeamsWorkflow />
      <TeamsCapabilities />
      <TeamsDeliverables />
      <TeamsEngagementOptions />
      <TeamsReportingHighlight />
      <TeamsCertificateHighlight />
      <TeamsFAQ />
      <TeamsCTA />
    </>
  );
}
