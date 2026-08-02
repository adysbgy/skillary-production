import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const CONSENT_KEY = "skillary:analytics-consent";
let initialized = false;

type AnalyticsProperties = Record<string, unknown>;
type Gtag = (...args: unknown[]) => void;
type AnalyticsWindow = Window & { dataLayer?: unknown[][]; gtag?: Gtag };
export type AnalyticsConsent = "granted" | "denied" | null;

function browserWindow(): AnalyticsWindow | null {
  return typeof window === "undefined" ? null : window as AnalyticsWindow;
}

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, consent);
  if (consent === "granted") initAnalytics();
  else if (POSTHOG_KEY && initialized) posthog.opt_out_capturing();
}

export function initAnalytics(): boolean {
  const browser = browserWindow();
  if (!browser || getAnalyticsConsent() !== "granted") return false;
  if (initialized) return true;
  initialized = true;
  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
      person_profiles: "identified_only",
      persistence: "localStorage+cookie",
    });
    posthog.opt_in_capturing();
  }
  if (GA4_ID) {
    browser.dataLayer = browser.dataLayer || [];
    browser.gtag = (...args: unknown[]) => browser.dataLayer?.push(args);
    browser.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    browser.gtag("js", new Date());
    browser.gtag("config", GA4_ID, { send_page_view: false, allow_google_signals: false });
    if (!document.querySelector(`script[data-skillary-ga4="${GA4_ID}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`;
      script.dataset.skillaryGa4 = GA4_ID;
      document.head.appendChild(script);
    }
  }
  return true;
}

export function trackEvent(name: string, properties?: AnalyticsProperties): void {
  if (!initAnalytics()) return;
  if (POSTHOG_KEY) posthog.capture(name, properties);
  const browser = browserWindow();
  if (GA4_ID && browser?.gtag) browser.gtag("event", name, properties || {});
}
export function identifyUser(userId: string, traits?: AnalyticsProperties): void {
  if (initAnalytics() && POSTHOG_KEY) posthog.identify(userId, traits);
}
export function resetAnalyticsIdentity(): void { if (POSTHOG_KEY && initialized) posthog.reset(); }
export function trackPageView(url: string): void {
  if (!initAnalytics()) return;
  if (POSTHOG_KEY) posthog.capture("$pageview", { $current_url: url });
  const browser = browserWindow();
  if (GA4_ID && browser?.gtag) browser.gtag("config", GA4_ID, { page_location: url, page_path: new URL(url, browser.location.origin).pathname });
}
