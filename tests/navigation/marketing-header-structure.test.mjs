import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const headerPath = new URL("../../src/components/navigation/SkillaryMarketingHeader.tsx", import.meta.url);
const gatePath = new URL("../../src/components/v2/layout/MarketingHeaderGate.tsx", import.meta.url);
const previewPath = new URL("../../src/components/navigation/SkillaryMegaNavPreview.tsx", import.meta.url);
const header = fs.readFileSync(headerPath, "utf8");
const gate = fs.readFileSync(gatePath, "utf8");
const preview = fs.readFileSync(previewPath, "utf8");

function includesAll(source, fragments) {
  for (const fragment of fragments) assert.equal(source.includes(fragment), true, fragment);
}

test("gate selects one centralized marketing renderer without StartupHeader coexistence", () => {
  includesAll(gate, [
    'import { SkillaryMarketingHeader } from "@/components/navigation/SkillaryMarketingHeader"',
    'resolveHeaderMode(pathname) !== "marketing"',
    '<SkillaryMarketingHeader />',
  ]);
  assert.equal(gate.includes("<StartupHeader"), false);
  assert.equal(gate.includes('from "./StartupHeader"'), false);
});

test("interaction timing and explicit E2 integration remain source-owned", () => {
  includesAll(header, [
    "INITIAL_OPEN_DELAY_MS = 320",
    "SWITCH_OPEN_DELAY_MS = 150",
    "CLOSE_DELAY_MS = 320",
    "transitionPanelInteraction",
    "shouldSchedulePointerClose",
    'mode === "clickPinned"',
    'mode === "keyboardOpen"',
  ]);
  includesAll(preview, ["INITIAL_OPEN_DELAY=320", "SWITCH_OPEN_DELAY=150", "CLOSE_DELAY=320", "transitionPanelInteraction", "shouldSchedulePointerClose"]);
});

test("desktop panels are inert, stable, and use exact geometry contract", () => {
  includesAll(header, [
    "inert={!visible}",
    "w-[min(1200px,calc(100vw-32px))]",
    "pt-1",
    "min-h-[25rem]",
    "grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)_minmax(0,1fr)]",
  ]);
});

test("direct links close desktop panel and active ownership is centralized", () => {
  includesAll(header, [
    'import { getActiveNavigationItem } from "./navigation-active-state"',
    "getActiveNavigationItem(pathname) === panel.id",
    "getActiveNavigationItem(pathname) === link.id",
    "onClick={() => closePanel()}",
  ]);
});

test("mobile accordion and hidden panel semantics remain deterministic", () => {
  includesAll(header, [
    "setMobileSection((current) => current === panelId ? null : panelId)",
    "openSection === panel.id",
    "inert={!expanded}",
    "href={panel.href}",
    "{panel.title} →",
  ]);
});

test("mobile focus, overflow restoration, and desktop cleanup remain explicit", () => {
  includesAll(header, [
    'event.key === "Tab" && mobileOpen',
    "getFocusableElements(mobileDrawerRef.current)",
    "mobileTriggerRef.current?.focus()",
    "const previousOverflow = document.body.style.overflow",
    'document.body.style.overflow = "hidden"',
    "document.body.style.overflow = previousOverflow",
    'window.matchMedia("(min-width: 1024px)")',
    'desktopQuery.addEventListener("change", onDesktop)',
    'desktopQuery.removeEventListener("change", onDesktop)',
  ]);
});

test("mobile narrow-width and auth geometry guards remain present", () => {
  includesAll(header, [
    "env(safe-area-inset-bottom)",
    "env(safe-area-inset-top)",
    "w-full max-w-full overflow-x-hidden",
    "min-w-0 max-w-xl",
    'h-[7.5rem]',
    'min-h-[7.5rem]',
    'min-w-[15.5rem]',
    'min-w-[8.75rem]',
  ]);
});
