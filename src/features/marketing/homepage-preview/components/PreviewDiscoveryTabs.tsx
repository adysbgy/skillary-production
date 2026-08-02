"use client";

import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";

import styles from "../HomepagePreview.module.css";

const DISCOVERY_TABS = [
  { id: "program", panelId: "program-panel", label: "Program" },
  { id: "workshop", panelId: "workshop-panel", label: "Workshop berikutnya" },
  {
    id: "jalur-belajar",
    panelId: "jalur-belajar-panel",
    label: "Jalur Belajar",
  },
] as const;

type DiscoveryTabId = (typeof DISCOVERY_TABS)[number]["id"];

function subscribeHydration(onChange: () => void) {
  queueMicrotask(onChange);
  return () => undefined;
}

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function readActiveHash(): DiscoveryTabId {
  const hash = window.location.hash.slice(1);
  return DISCOVERY_TABS.some((tab) => tab.id === hash)
    ? (hash as DiscoveryTabId)
    : "program";
}

export function PreviewDiscoveryTabs({
  program,
  workshop,
  learningPath,
}: {
  program: ReactNode;
  workshop: ReactNode;
  learningPath: ReactNode;
}) {
  const enhanced = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const activeTab = useSyncExternalStore(subscribeHash, readActiveHash, () => "program");
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const panels: Record<DiscoveryTabId, ReactNode> = {
    program,
    workshop,
    "jalur-belajar": learningPath,
  };

  useEffect(() => {
    if (!enhanced) return;

    let focusTimer: number | undefined;
    let correctionTimer: number | undefined;

    const positionHashTarget = () => {
      const id = readActiveHash();
      const target = document.getElementById(id);
      if (!target) return;

      target.focus({ preventScroll: true });

      const stickyOffset = getVisibleStickyOffset();
      const targetTop = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        behavior: "auto",
        top: Math.max(0, targetTop - stickyOffset - 16),
      });
    };

    const focusHashTarget = () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(correctionTimer);
      focusTimer = window.setTimeout(() => {
        positionHashTarget();
        correctionTimer = window.setTimeout(positionHashTarget, 300);
      }, 0);
    };

    if (window.location.hash) focusHashTarget();
    window.addEventListener("hashchange", focusHashTarget);
    window.addEventListener("load", focusHashTarget);
    return () => {
      window.clearTimeout(focusTimer);
      window.clearTimeout(correctionTimer);
      window.removeEventListener("hashchange", focusHashTarget);
      window.removeEventListener("load", focusHashTarget);
    };
  }, [enhanced]);

  function activateTab(tabId: DiscoveryTabId) {
    const nextHash = `#${tabId}`;
    if (window.location.hash === nextHash) {
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      return;
    }

    window.history.pushState(null, "", nextHash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    if (!enhanced) return;

    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      activateTab(DISCOVERY_TABS[index].id);
      return;
    }

    const lastIndex = DISCOVERY_TABS.length - 1;
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? lastIndex
          : event.key === "ArrowRight"
            ? index === lastIndex
              ? 0
              : index + 1
            : event.key === "ArrowLeft"
              ? index === 0
                ? lastIndex
                : index - 1
              : null;

    if (nextIndex === null) return;
    event.preventDefault();
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className={styles.discoveryTabs} data-enhanced={enhanced ? "true" : "false"}>
      <nav
        className={styles.formatIndex}
        aria-label="Pilih format belajar"
        role={enhanced ? "tablist" : undefined}
      >
        {DISCOVERY_TABS.map((tab, index) => {
          const selected = activeTab === tab.id;
          return (
            <a
              aria-controls={enhanced ? tab.panelId : undefined}
              aria-selected={enhanced ? selected : undefined}
              className={selected ? styles.formatTabActive : undefined}
              href={`#${tab.id}`}
              id={`format-${tab.id}`}
              key={tab.id}
              onClick={(event) => {
                if (!enhanced) return;
                event.preventDefault();
                activateTab(tab.id);
              }}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              role={enhanced ? "tab" : undefined}
              tabIndex={enhanced ? (selected ? 0 : -1) : undefined}
            >
              <span>{tab.label}</span>
            </a>
          );
        })}
      </nav>

      <div className={styles.discoveryGroups}>
        {DISCOVERY_TABS.map((tab) => (
          <div
            aria-labelledby={enhanced ? `format-${tab.id}` : undefined}
            className={styles.discoveryPanel}
            hidden={enhanced && activeTab !== tab.id}
            id={tab.panelId}
            key={tab.id}
            role={enhanced ? "tabpanel" : undefined}
            tabIndex={enhanced ? 0 : undefined}
          >
            {panels[tab.id]}
          </div>
        ))}
      </div>
    </div>
  );
}

function getVisibleStickyOffset() {
  const candidates = [
    document.querySelector<HTMLElement>('[data-preview-owner="header"]'),
    document.querySelector<HTMLElement>('[data-preview-sticky-navigation="true"]'),
  ];

  return candidates.reduce((largestOffset, candidate) => {
    if (!candidate || candidate.getClientRects().length === 0) return largestOffset;
    const position = window.getComputedStyle(candidate).position;
    if (position !== "sticky" && position !== "fixed") return largestOffset;
    return Math.max(largestOffset, candidate.getBoundingClientRect().height);
  }, 0);
}
