"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initAnalytics, trackPageView } from "@/lib/observability/analytics";
import { initSentry } from "@/lib/observability/sentry";
import { AnalyticsConsentBanner } from "./AnalyticsConsent";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    initSentry();
    const onConsent = () => {
      initAnalytics();
      const relativeUrl = query ? `${pathname}?${query}` : pathname;
      trackPageView(new URL(relativeUrl, window.location.origin).toString());
    };
    window.addEventListener("skillary:analytics-consent", onConsent);
    return () => window.removeEventListener("skillary:analytics-consent", onConsent);
  }, [pathname, query]);

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;
    initAnalytics();
    const relativeUrl = query ? `${pathname}?${query}` : pathname;
    trackPageView(new URL(relativeUrl, window.location.origin).toString());
  }, [pathname, query]);

  return <>{children}<AnalyticsConsentBanner /></>;
}
