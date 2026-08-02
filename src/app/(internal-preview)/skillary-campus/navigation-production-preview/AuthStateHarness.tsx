"use client";

import { useState } from "react";
import { SkillaryMarketingHeader, type MarketingHeaderAuthOverride } from "@/components/navigation/SkillaryMarketingHeader";

export const AUTH_PREVIEW_STATES = {
  loading: { status: "loading" },
  anonymous: { status: "unauthenticated" },
  learner: { status: "authenticated", user: { name: "Laras Wibowo", email: "laras@example.test", role: "LEARNER" } },
  instructor: { status: "authenticated", user: { name: "Indra Pratama", email: "indra@example.test", role: "INSTRUCTOR" } },
  admin: { status: "authenticated", user: { name: "Ayu Administrator", email: "ayu@example.test", role: "ADMIN", image: "/missing-auth-harness-avatar.png" } },
} satisfies Record<string, MarketingHeaderAuthOverride>;

export type AuthPreviewState = keyof typeof AUTH_PREVIEW_STATES;

export function AuthStateHarness({ initialState = "anonymous" }: { initialState?: AuthPreviewState }) {
  const [state, setState] = useState<AuthPreviewState>(initialState);
  return <><SkillaryMarketingHeader authOverride={AUTH_PREVIEW_STATES[state]} /><aside aria-label="Kontrol auth preview" className="fixed bottom-4 left-1/2 z-[70] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 gap-1 overflow-x-auto rounded-full border border-white/15 bg-[#0d101c]/95 p-1.5 text-white shadow-2xl backdrop-blur">{(Object.keys(AUTH_PREVIEW_STATES) as AuthPreviewState[]).map((key) => <button key={key} id={`auth-preview-${key}`} type="button" aria-pressed={state === key} onClick={() => setState(key)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold capitalize outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b] ${state === key ? "bg-white text-[#0d101c]" : "text-white/65 hover:text-white"}`}>{key}</button>)}</aside></>;
}
