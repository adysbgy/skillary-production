"use client";

import { usePathname } from "next/navigation";
import { SkillaryMarketingHeader } from "@/components/navigation/SkillaryMarketingHeader";
import { needsMarketingHeaderSpacer, resolveHeaderMode } from "@/components/navigation/marketing-header-policy";

// Renders the production Skillary marketing header on centralized marketing
// routes. Pages rebuilt with MarketingShell provide their own top padding, so
// the external spacer is only emitted for not-yet-restyled routes.
export function MarketingHeaderGate() {
  const pathname = usePathname();
  if (resolveHeaderMode(pathname) !== "marketing") return null;

  const needsSpacer = needsMarketingHeaderSpacer(pathname);

  return (
    <>
      <SkillaryMarketingHeader />
      {needsSpacer && <div className="h-[104px] md:h-[112px]" aria-hidden />}
    </>
  );
}
