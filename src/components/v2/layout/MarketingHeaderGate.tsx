"use client";

import { usePathname } from "next/navigation";
import { StartupHeader, STARTUP_HEADER_ROUTES, MARKETING_SHELL_ROUTES } from "./StartupHeader";

// Renders the shared dark StartupHeader on the primary marketing sub-pages
// (where HeaderV2 hides itself). Pages already rebuilt with MarketingShell
// provide their own top padding, so the external spacer is only emitted for
// the not-yet-restyled ones.
export function MarketingHeaderGate() {
  const pathname = usePathname();
  const matches = (routes: string[]) => routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));
  if (!matches(STARTUP_HEADER_ROUTES)) return null;

  const needsSpacer = !matches(MARKETING_SHELL_ROUTES);

  return (
    <>
      <StartupHeader />
      {needsSpacer && <div className="h-[104px] md:h-[112px]" aria-hidden />}
    </>
  );
}
