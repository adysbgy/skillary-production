"use client";

import { useRef, useState, useSyncExternalStore } from "react";

import type { HomepageSearchEntry } from "../data/types";
import { CloseIcon, MenuIcon } from "./PreviewIcons";
import { PreviewSearch } from "./PreviewSearch";
import {
  PREVIEW_MORE_LINKS,
  PREVIEW_PRIMARY_LINKS,
  PREVIEW_PROOF_LINKS,
} from "./preview-navigation";
import styles from "../HomepagePreview.module.css";

export function PreviewMobileNavigation({
  searchEntries,
}: {
  searchEntries: readonly HomepageSearchEntry[];
}) {
  const enhanced = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openDrawer() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function closeDrawer() {
    if (dialogRef.current?.open) dialogRef.current.close();
  }

  if (!enhanced) {
    return <MobileNavigationFallback />;
  }

  return (
    <>
      <button
        aria-controls="preview-mobile-drawer"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={styles.mobileMenuTrigger}
        onClick={openDrawer}
        ref={triggerRef}
        type="button"
      >
        <MenuIcon />
        <span>Menu</span>
      </button>

      <dialog
        aria-labelledby="preview-drawer-heading"
        className={styles.mobileDrawer}
        id="preview-mobile-drawer"
        onCancel={(event) => {
          event.preventDefault();
          closeDrawer();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDrawer();
        }}
        onClose={() => {
          setIsOpen(false);
          triggerRef.current?.focus({ preventScroll: true });
        }}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          closeDrawer();
        }}
        ref={dialogRef}
      >
        <div className={styles.mobileDrawerInner}>
          <div className={styles.mobileDrawerHeading}>
            <div>
              <span>Skillary</span>
              <h2 id="preview-drawer-heading">Jelajahi cara belajar Anda.</h2>
            </div>
            <button aria-label="Tutup menu" autoFocus onClick={closeDrawer} type="button">
              <CloseIcon />
            </button>
          </div>

          <PreviewSearch compact entries={searchEntries} />

          <nav
            aria-label="Menu preview mobile"
            className={styles.mobileDrawerNav}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) closeDrawer();
            }}
          >
            <div>
              <p>Belajar</p>
              {PREVIEW_PRIMARY_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <p>Bukti</p>
              {PREVIEW_PROOF_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div>
              <p>Lainnya</p>
              {PREVIEW_MORE_LINKS.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}

function MobileNavigationFallback() {
  return (
    <details className={styles.mobileNavigationFallback}>
      <summary>
        <MenuIcon />
        <span>Menu</span>
      </summary>
      <nav aria-label="Menu preview mobile tanpa JavaScript">
        {[...PREVIEW_PRIMARY_LINKS, ...PREVIEW_PROOF_LINKS, ...PREVIEW_MORE_LINKS].map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  );
}

function subscribeHydration(onChange: () => void) {
  queueMicrotask(onChange);
  return () => undefined;
}
