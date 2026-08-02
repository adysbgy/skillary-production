"use client";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { ArrowIcon } from "./PreviewIcons";
import styles from "../HomepagePreview.module.css";

function subscribeHydration(onChange: () => void) {
  queueMicrotask(onChange);
  return () => undefined;
}

export function PreviewScrollRail({
  children,
  className,
  itemCount,
  label,
}: {
  children: ReactNode;
  className: string;
  itemCount: number;
  label: string;
}) {
  const enhanced = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const updateActiveIndex = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const items = Array.from(rail.children) as HTMLElement[];
        if (items.length === 0) return;

        const railCenter = rail.scrollLeft + rail.clientWidth / 2;
        const nextIndex = items.reduce(
          (closest, item, index) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(itemCenter - railCenter);
            return distance < closest.distance ? { distance, index } : closest;
          },
          { distance: Number.POSITIVE_INFINITY, index: 0 },
        ).index;
        setActiveIndex(nextIndex);
      });
    };

    updateActiveIndex();
    rail.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);
    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  function move(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    const items = Array.from(rail.children) as HTMLElement[];
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), items.length - 1);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    items[nextIndex]?.scrollIntoView({ behavior, block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  }

  return (
    <div
      aria-label={label}
      className={styles.scrollRail}
      data-enhanced={enhanced ? "true" : "false"}
      role="region"
    >
      <div className={styles.scrollRailControls} hidden={!enhanced}>
        <p aria-live="polite">
          Kartu {activeIndex + 1} dari {itemCount}
        </p>
        <div aria-label={`Kontrol ${label}`} role="group">
          <button
            aria-label={`${label}: sebelumnya`}
            className={styles.scrollRailPrevious}
            disabled={activeIndex === 0}
            onClick={() => move(-1)}
            type="button"
          >
            <ArrowIcon />
          </button>
          <button
            aria-label={`${label}: berikutnya`}
            disabled={activeIndex >= itemCount - 1}
            onClick={() => move(1)}
            type="button"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
      <div className={`${className} ${styles.scrollRailTrack}`} ref={railRef}>
        {children}
      </div>
      <p className={styles.scrollRailCue}>Geser secara horizontal untuk melihat kartu berikutnya.</p>
    </div>
  );
}
