import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const PROJECT_ROOT = process.cwd();
const FEATURE_ROOT = "src/features/marketing/homepage-preview";
const CSS = read(`${FEATURE_ROOT}/HomepagePreview.module.css`);

test("HP-S7 mobile dialog exposes state, native modality, and explicit focus return", () => {
  const mobile = read(`${FEATURE_ROOT}/components/PreviewMobileNavigation.tsx`);

  assert.equal(mobile.startsWith('"use client";'), true);
  assert.equal(mobile.includes("showModal()"), true);
  assert.equal(mobile.includes("dialogRef.current?.open"), true);
  assert.equal(mobile.includes("dialogRef.current.close()"), true);
  assert.equal(mobile.includes("onCancel"), true);
  assert.equal(mobile.includes('event.key !== "Escape"'), true);
  assert.equal(mobile.includes('aria-controls="preview-mobile-drawer"'), true);
  assert.equal(mobile.includes("aria-expanded={isOpen}"), true);
  assert.equal(mobile.includes('aria-haspopup="dialog"'), true);
  assert.equal(mobile.includes("triggerRef.current?.focus({ preventScroll: true })"), true);
  assert.equal(mobile.includes("autoFocus"), true);
  assert.equal(mobile.includes("useSyncExternalStore"), true);
  assert.equal(mobile.includes("<MobileNavigationFallback />"), true);
  assert.equal(mobile.includes("Menu preview mobile tanpa JavaScript"), true);
  assert.equal(mobile.includes("queueMicrotask(onChange)"), true);
});

test("HP-S7 search supports the complete state contract and focus-safe clearing", () => {
  const search = read(`${FEATURE_ROOT}/components/PreviewSearch.tsx`);
  const contract = read(`${FEATURE_ROOT}/data/homepage-preview-contract.ts`);

  for (const state of ["idle", "loading", "results", "empty", "unavailable"]) {
    assert.equal(contract.includes(`"${state}"`), true, state);
  }

  assert.equal(search.includes('sourceState?: "ready" | "loading" | "unavailable"'), true);
  assert.equal(search.includes('role="search"'), true);
  assert.equal(search.includes('role="region"'), true);
  assert.equal(search.includes('aria-describedby={statusId}'), true);
  assert.equal(search.includes('aria-haspopup="listbox"'), false);
  assert.equal(search.includes('role="combobox"'), false);
  assert.equal(search.includes('role="status"'), true);
  assert.equal(search.includes('aria-live="polite"'), true);
  assert.equal(search.includes("inputRef.current?.focus({ preventScroll: true })"), true);
  assert.equal(search.includes('event.key === "Escape"'), true);
  assert.equal(search.includes('data-query-tracking="disabled"'), true);
});

test("HP-S7 tabs retain manual activation and expose a keyboard-reachable panel", () => {
  const tabs = read(`${FEATURE_ROOT}/components/PreviewDiscoveryTabs.tsx`);

  for (const key of ["ArrowRight", "ArrowLeft", "Home", "End", "Enter"]) {
    assert.equal(tabs.includes(key), true, key);
  }
  assert.equal(tabs.includes('event.key === " "'), true);
  assert.equal(tabs.includes('role={enhanced ? "tabpanel" : undefined}'), true);
  assert.equal(tabs.includes("tabIndex={enhanced ? 0 : undefined}"), true);
  assert.equal(tabs.includes("hidden={enhanced && activeTab !== tab.id}"), true);
});

test("HP-S7 provides two controlled mobile snap rails with a no-JavaScript swipe fallback", () => {
  const page = read(`${FEATURE_ROOT}/HomepagePreview.tsx`);
  const rail = read(`${FEATURE_ROOT}/components/PreviewScrollRail.tsx`);

  assert.equal((page.match(/<PreviewScrollRail/g) ?? []).length, 2);
  assert.equal(rail.startsWith('"use client";'), true);
  assert.equal(rail.includes("useSyncExternalStore"), true);
  assert.equal(rail.includes("queueMicrotask(onChange)"), true);
  assert.equal(rail.includes("scrollIntoView"), true);
  assert.equal(rail.includes("prefers-reduced-motion: reduce"), true);
  assert.equal(rail.includes("disabled={activeIndex === 0}"), true);
  assert.equal(rail.includes("disabled={activeIndex >= itemCount - 1}"), true);
  assert.equal(rail.includes("Geser secara horizontal"), true);
  assert.match(CSS, /scroll-snap-type:\s*inline mandatory/);
  assert.match(CSS, /scroll-snap-align:\s*start/);
  assert.match(CSS, /\.scrollRailControls button\s*\{[^}]*height:\s*48px;[^}]*width:\s*48px;/s);
});

test("HP-S7 motion is bounded and has an intentional reduced-motion fallback", () => {
  assert.match(CSS, /hp-drawer-enter 240ms cubic-bezier\(0\.16, 1, 0\.3, 1\)/);
  assert.match(CSS, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(CSS, /\.mobileDrawer\[open\],\s*\.mobileDrawer\[open\]::backdrop\s*\{[^}]*animation:\s*none;/s);
  assert.match(CSS, /\.programCardImage\s*\{[^}]*transition:\s*none;/s);
  assert.match(CSS, /@media \(hover: hover\) and \(pointer: fine\)/);
});

test("HP-S7 responsive floor includes required narrow touch and overflow safeguards", () => {
  assert.match(CSS, /\.wordmark\s*\{[^}]*min-width:\s*44px;/s);
  assert.match(CSS, /@media \(max-width: 519px\)/);
  assert.match(CSS, /@media \(min-width: 520px\)/);
  assert.match(CSS, /@media \(min-width: 760px\)/);
  assert.match(CSS, /@media \(min-width: 940px\)/);
  assert.equal(CSS.includes("overscroll-behavior-inline: contain"), true);
  assert.equal(CSS.includes("env(safe-area-inset-bottom)"), true);
  assert.equal(CSS.includes("position: fixed"), true, "skip link retains a reliable viewport anchor");
});

function read(relativePath) {
  return readFileSync(path.join(PROJECT_ROOT, relativePath), "utf8");
}
