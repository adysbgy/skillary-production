"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState, type FocusEvent, type RefObject } from "react";
import {
  DIRECT_NAV,
  NAV_ANNOUNCEMENT,
  NAV_PRIMARY_ACTION,
  TYPED_NAV_PANELS as NAV_PANELS,
  type NavigationPanel,
} from "./navigation-contract";
import { matchesRouteBoundary } from "./marketing-header-policy";
import { getActiveNavigationItem } from "./navigation-active-state";
import {
  CLOSED_PANEL_STATE,
  shouldSchedulePointerClose,
  transitionPanelInteraction,
  type PanelInteractionState,
} from "./panel-interaction-state";

type PanelId = NavigationPanel["id"];
type MobileSection = PanelId | null;
type AccountRole = "ADMIN" | "INSTRUCTOR" | "LEARNER";
type AccountStatus = "authenticated" | "loading" | "unauthenticated";
export type MarketingHeaderAuthOverride = { status: AccountStatus; user?: AccountUser };

const INITIAL_OPEN_DELAY_MS = 320;
const SWITCH_OPEN_DELAY_MS = 150;
const CLOSE_DELAY_MS = 320;
const SCROLL_THRESHOLD_PX = 52;
const PANEL_SCROLL_CLOSE_DISTANCE_PX = 16;

export function SkillaryMarketingHeader({ authOverride }: { authOverride?: MarketingHeaderAuthOverride } = {}) {
  const pathname = usePathname();
  const liveSession = useSession();
  const sessionStatus = authOverride?.status ?? liveSession.status;
  const sessionUser = authOverride ? authOverride.user : liveSession.data?.user;
  const [panelState, setPanelState] = useState<PanelInteractionState<PanelId>>(CLOSED_PANEL_STATE);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>(null);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<PanelId, HTMLButtonElement | null>>({
    programs: null,
    services: null,
  });
  const accountRef = useRef<HTMLDivElement>(null);
  const accountTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelStateRef = useRef<PanelInteractionState<PanelId>>(CLOSED_PANEL_STATE);
  const panelOpenedAtScrollRef = useRef(0);
  const openPanel = panelState.panelId;

  const updatePanelState = useCallback((next: PanelInteractionState<PanelId>) => {
    panelStateRef.current = next;
    setPanelState(next);
  }, []);

  const clearHoverTimer = useCallback(() => {
    if (!hoverTimerRef.current) return;
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
  }, []);

  const closePanel = useCallback((restoreFocus = false) => {
    clearHoverTimer();
    const panelToRestore = panelStateRef.current.panelId;
    updatePanelState(CLOSED_PANEL_STATE);
    if (restoreFocus && panelToRestore) {
      requestAnimationFrame(() => triggerRefs.current[panelToRestore]?.focus());
    }
  }, [clearHoverTimer, updatePanelState]);

  const openHoverPanel = useCallback((panelId: PanelId) => {
    clearHoverTimer();
    const next = transitionPanelInteraction(panelStateRef.current, { type: "hover-open", panelId });
    if (next === panelStateRef.current) return;
    setAccountOpen(false);
    panelOpenedAtScrollRef.current = window.scrollY;
    updatePanelState(next);
  }, [clearHoverTimer, updatePanelState]);

  const scheduleOpen = useCallback((panelId: PanelId) => {
    clearHoverTimer();
    if (panelStateRef.current.mode === "clickPinned" || panelStateRef.current.mode === "keyboardOpen") return;
    const delay = panelStateRef.current.panelId && panelStateRef.current.panelId !== panelId
      ? SWITCH_OPEN_DELAY_MS
      : INITIAL_OPEN_DELAY_MS;
    hoverTimerRef.current = setTimeout(() => openHoverPanel(panelId), delay);
  }, [clearHoverTimer, openHoverPanel]);

  const scheduleClose = useCallback(() => {
    clearHoverTimer();
    if (!shouldSchedulePointerClose(panelStateRef.current)) return;
    hoverTimerRef.current = setTimeout(() => updatePanelState(CLOSED_PANEL_STATE), CLOSE_DELAY_MS);
  }, [clearHoverTimer, updatePanelState]);

  const togglePanel = useCallback((panelId: PanelId, keyboard: boolean) => {
    clearHoverTimer();
    setAccountOpen(false);
    const event = { type: keyboard ? "keyboard-toggle" : "click-toggle", panelId } as const;
    const next = transitionPanelInteraction(panelStateRef.current, event);
    if (next.panelId) panelOpenedAtScrollRef.current = window.scrollY;
    updatePanelState(next);
  }, [clearHoverTimer, updatePanelState]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
      if (Math.abs(window.scrollY - panelOpenedAtScrollRef.current) > PANEL_SCROLL_CLOSE_DISTANCE_PX) {
        closePanel();
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [closePanel]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) closePanel();
      if (accountRef.current && !accountRef.current.contains(target)) setAccountOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && mobileOpen) {
        const focusable = getFocusableElements(mobileDrawerRef.current);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable.at(-1) ?? first;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        event.preventDefault();
        setMobileOpen(false);
        setMobileSection(null);
        requestAnimationFrame(() => mobileTriggerRef.current?.focus());
        return;
      }
      if (accountOpen) {
        event.preventDefault();
        setAccountOpen(false);
        requestAnimationFrame(() => accountTriggerRef.current?.focus());
        return;
      }
      if (openPanel) {
        event.preventDefault();
        closePanel(true);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      clearHoverTimer();
    };
  }, [accountOpen, clearHoverTimer, closePanel, mobileOpen, openPanel]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => getFocusableElements(mobileDrawerRef.current)[0]?.focus());
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
        setMobileSection(null);
      }
    };
    desktopQuery.addEventListener("change", onDesktop);
    return () => {
      cancelAnimationFrame(focusFrame);
      desktopQuery.removeEventListener("change", onDesktop);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = (restoreFocus = true) => {
    setMobileOpen(false);
    setMobileSection(null);
    if (restoreFocus) requestAnimationFrame(() => mobileTriggerRef.current?.focus());
  };

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    setSignOutError("");
    setAccountOpen(false);
    closeMobile(false);
    try {
      await signOut({ callbackUrl: "/" });
    } catch {
      setSignOutError("Gagal keluar. Silakan coba lagi.");
    } finally {
      setSigningOut(false);
    }
  };

  const handleFocusLeave = (event: FocusEvent<HTMLElement>) => {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && rootRef.current?.contains(nextTarget)) return;
    closePanel();
  };

  return (
    <>
      <header ref={rootRef} onBlur={handleFocusLeave} className="fixed inset-x-0 top-0 z-50 text-white">
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 motion-reduce:transition-none ${
            scrolled ? "max-h-0 opacity-0" : "max-h-11 opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse 55% 220% at 50% 0%, rgba(255,120,30,.85), rgba(150,55,10,.55) 40%, #0d101c 100%)",
          }}
        >
          <div className="mx-auto flex h-11 max-w-7xl items-center justify-center gap-3 px-4 text-xs font-semibold">
            <span className="truncate">{NAV_ANNOUNCEMENT.message}</span>
            <Link
              href={NAV_ANNOUNCEMENT.href}
              className="shrink-0 rounded-full border border-white/30 bg-white/10 px-3 py-1 font-bold outline-none transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#f0b65b] motion-reduce:transition-none"
            >
              {NAV_ANNOUNCEMENT.label}
            </Link>
          </div>
        </div>

        <div className={`relative transition-all duration-300 motion-reduce:transition-none ${scrolled ? "px-3 pt-3 md:px-4" : "px-0 pt-0"}`}>
          <div
            className={`mx-auto flex h-14 items-center justify-between bg-[#0d101c] transition-all duration-300 motion-reduce:transition-none md:h-16 ${
              scrolled
                ? "max-w-5xl rounded-full px-3 shadow-2xl md:px-5"
                : "max-w-[120rem] rounded-none px-4 md:px-8"
            }`}
          >
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b]"
            >
              <Image src="/logo.png" alt="Skillary" width={44} height={24} priority className="h-6 w-auto object-contain" />
              <span className="text-base font-extrabold tracking-tight">Skillary</span>
            </Link>

            <nav aria-label="Navigasi utama" className="hidden min-w-0 items-center gap-0 lg:flex xl:gap-0.5">
              {[
                { kind: "direct" as const, item: DIRECT_NAV.find((link) => link.id === "events")! },
                { kind: "panel" as const, item: NAV_PANELS.find((panel) => panel.id === "programs")! },
                { kind: "direct" as const, item: DIRECT_NAV.find((link) => link.id === "free-workshops")! },
                { kind: "panel" as const, item: NAV_PANELS.find((panel) => panel.id === "services")! },
                ...DIRECT_NAV.filter((link) => ["trainers", "portfolio", "about"].includes(link.id)).map((item) => ({ kind: "direct" as const, item })),
              ].map((entry) => {
                if (entry.kind === "panel") {
                  const panel = entry.item;
                  const expanded = openPanel === panel.id;
                  return (
                    <div key={panel.id} className="relative" onPointerEnter={() => scheduleOpen(panel.id)} onPointerLeave={scheduleClose}>
                      <button
                        ref={(element) => { triggerRefs.current[panel.id] = element; }}
                        id={`marketing-nav-trigger-${panel.id}`}
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`marketing-mega-${panel.id}`}
                        onClick={(event) => togglePanel(panel.id, event.detail === 0)}
                        className={`relative flex min-h-11 items-center gap-1 px-2 text-xs font-semibold outline-none transition after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-left after:bg-[#f0b65b] after:transition-transform focus-visible:ring-2 focus-visible:ring-[#f0b65b] motion-reduce:transition-none xl:px-2.5 xl:text-sm ${
                          expanded || getActiveNavigationItem(pathname) === panel.id
                            ? "text-white after:scale-x-100"
                            : "text-white/65 after:scale-x-0 hover:text-white"
                        }`}
                      >
                        {panel.label}
                        <Chevron open={expanded} />
                      </button>
                    </div>
                  );
                }

                const link = entry.item;
                const active = getActiveNavigationItem(pathname) === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => closePanel()}
                    className={`flex min-h-11 items-center whitespace-nowrap px-2 text-xs font-semibold outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#f0b65b] motion-reduce:transition-none xl:px-2.5 xl:text-sm ${active ? "text-white" : "text-white/65"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden min-w-[15.5rem] shrink-0 items-center justify-end gap-2 lg:flex xl:gap-3">
              {sessionStatus === "loading" ? (
                <div aria-label="Memuat akun" className="h-10 w-24 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
              ) : sessionUser ? (
                <DesktopAccount
                  accountRef={accountRef}
                  triggerRef={accountTriggerRef}
                  open={accountOpen}
                  user={sessionUser}
                  signingOut={signingOut}
                  onToggle={() => {
                    setAccountOpen((current) => !current);
                    closePanel();
                  }}
                  onClose={() => setAccountOpen(false)}
                  onSignOut={handleSignOut}
                />
              ) : (
                <Link
                  href="/login"
                  className="rounded-full px-3 py-2 text-sm font-semibold text-white/75 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-[#f0b65b] motion-reduce:transition-none"
                >
                  Masuk
                </Link>
              )}
              <Link
                href={NAV_PRIMARY_ACTION.href}
                className="min-w-[8.75rem] rounded-full bg-white px-4 py-2.5 text-center text-sm font-extrabold text-[#0f172a] outline-none transition hover:bg-[#fff4e5] focus-visible:ring-2 focus-visible:ring-[#f0b65b] motion-reduce:transition-none"
              >
                {NAV_PRIMARY_ACTION.label}
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Link href={NAV_PRIMARY_ACTION.href} className="rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#0f172a]">
                {NAV_PRIMARY_ACTION.compactLabel}
              </Link>
              <button
                ref={mobileTriggerRef}
                id="marketing-mobile-navigation-trigger"
                type="button"
                aria-label={mobileOpen ? "Tutup navigasi" : "Buka navigasi"}
                aria-expanded={mobileOpen}
                aria-controls="marketing-mobile-navigation"
                onClick={() => {
                  setMobileOpen((current) => !current);
                  setMobileSection(null);
                  closePanel();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#f0b65b] motion-reduce:transition-none"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>

          {NAV_PANELS.map((panel) => (
            <MegaPanel
              key={panel.id}
              panel={panel}
              visible={openPanel === panel.id}
              onPointerEnter={() => openHoverPanel(panel.id)}
              onPointerLeave={scheduleClose}
              onClose={() => closePanel()}
            />
          ))}
        </div>
      </header>

      {openPanel && (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          onClick={() => closePanel()}
          className="fixed inset-0 z-40 hidden cursor-default bg-[#080b13]/15 backdrop-blur-[1px] lg:block"
        />
      )}

      <MobileNavigation
        open={mobileOpen}
        openSection={mobileSection}
        pathname={pathname}
        drawerRef={mobileDrawerRef}
        sessionStatus={sessionStatus}
        user={sessionUser}
        signingOut={signingOut}
        signOutError={signOutError}
        onSignOut={handleSignOut}
        onToggleSection={(panelId) => setMobileSection((current) => current === panelId ? null : panelId)}
        onClose={closeMobile}
      />
    </>
  );
}

function isPanelActive(pathname: string, panel: NavigationPanel) {
  return getActiveNavigationItem(pathname) === panel.id;
}

function MegaPanel({
  panel,
  visible,
  onPointerEnter,
  onPointerLeave,
  onClose,
}: {
  panel: NavigationPanel;
  visible: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onClose: () => void;
}) {
  const links = panel.groups.flatMap((group) => group.links);
  const columns = Array.from({ length: 3 }, (_, columnIndex) =>
    links.filter((_, linkIndex) => linkIndex % 3 === columnIndex),
  );

  return (
    <div
      id={`marketing-mega-${panel.id}`}
      aria-hidden={!visible}
      aria-labelledby={`marketing-nav-trigger-${panel.id}`}
      inert={!visible}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className={`absolute left-1/2 top-full hidden w-[min(1200px,calc(100vw-32px))] -translate-x-1/2 transition-[opacity,transform,visibility] duration-150 motion-reduce:transition-none lg:block ${
        visible ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"
      }`}
    >
      <div className="min-h-[10rem] overflow-hidden rounded-b-[4px] border border-t-0 border-slate-200 bg-white text-[#182230] shadow-[0_16px_34px_rgba(15,23,42,.14)]">
        <div className="grid min-h-[10rem] grid-cols-[140px_repeat(3,minmax(0,1fr))] gap-x-8 px-5 py-4 xl:gap-x-10">
          <Link
            href={panel.href}
            onClick={onClose}
            className="group relative flex min-h-[8rem] flex-col justify-end overflow-hidden rounded-[4px] bg-[#111a2e] p-4 text-white outline-none focus-visible:ring-2 focus-visible:ring-[#d99335]"
          >
            <div className="absolute inset-0 opacity-40 [background:linear-gradient(135deg,transparent_45%,#d99335_46%,transparent_47%),radial-gradient(circle_at_90%_10%,#d99335,transparent_42%)]" />
            <p className="relative text-[9px] font-extrabold uppercase tracking-[.14em] text-[#efb75c]">{panel.eyebrow}</p>
            <h2 className="relative mt-2 text-base font-extrabold leading-tight tracking-[-.02em]">{panel.label}</h2>
            <span className="relative mt-3 text-[11px] font-bold text-white/75 group-hover:text-white">Lihat semua →</span>
          </Link>

          {columns.map((column, columnIndex) => (
            <ul key={`${panel.id}-column-${columnIndex}`} className="space-y-1 py-0.5">
              {column.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block rounded-[3px] px-2 py-1.5 text-[13px] font-medium leading-5 text-slate-700 outline-none transition hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-[#d99335] motion-reduce:transition-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {panel.action && columnIndex === 2 && (
                <li>
                  <Link
                    href={panel.action.href}
                    onClick={onClose}
                    className="mt-1 block rounded-[3px] px-2 py-1.5 text-[13px] font-bold text-[#9a5b18] outline-none transition hover:bg-amber-50 focus-visible:ring-2 focus-visible:ring-[#d99335] motion-reduce:transition-none"
                  >
                    {panel.action.label} →
                  </Link>
                </li>
              )}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavigation({
  open,
  openSection,
  pathname,
  drawerRef,
  sessionStatus,
  user,
  signingOut,
  signOutError,
  onSignOut,
  onToggleSection,
  onClose,
}: {
  open: boolean;
  openSection: MobileSection;
  pathname: string;
  drawerRef: RefObject<HTMLDivElement | null>;
  sessionStatus: AccountStatus;
  user?: AccountUser;
  signingOut: boolean;
  signOutError: string;
  onSignOut: () => void;
  onToggleSection: (panelId: PanelId) => void;
  onClose: () => void;
}) {
  return (
    <div
      ref={drawerRef}
      id="marketing-mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Navigasi seluler"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-40 w-full max-w-full overflow-x-hidden bg-[#0d101c] px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[calc(6.5rem+env(safe-area-inset-top))] text-white transition-[transform,opacity,visibility] duration-300 motion-reduce:transition-none lg:hidden ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
      }`}
    >
      <nav aria-label="Tautan navigasi seluler" className="mx-auto flex h-full min-w-0 max-w-xl flex-col overflow-x-hidden overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]">
        <div className="shrink-0 pb-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#f0b65b]">Jelajahi Skillary</div>
        {NAV_PANELS.map((panel) => {
          const expanded = openSection === panel.id;
          const active = isPanelActive(pathname, panel);
          return (
            <div key={panel.id} className="border-b border-white/10">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`marketing-mobile-${panel.id}`}
                onClick={() => onToggleSection(panel.id)}
                className={`flex min-h-14 w-full items-center justify-between rounded-lg text-left text-base font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b] ${active ? "text-[#f3c273]" : "text-white"}`}
              >
                {panel.label}
                <Chevron open={expanded} />
              </button>
              <div
                id={`marketing-mobile-${panel.id}`}
                aria-hidden={!expanded}
                inert={!expanded}
                className={`grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="pb-4">
                    <Link href={panel.href} onClick={onClose} className="block rounded-lg py-2 text-sm font-extrabold text-[#f0b65b] outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b]">
                      {panel.title} →
                    </Link>
                    {panel.groups.map((group) => (
                      <section key={group.title} className="mt-3">
                        <h2 className="text-[10px] font-extrabold uppercase tracking-[.16em] text-white/40">{group.title}</h2>
                        <div className="mt-1 grid gap-0.5">
                          {group.links.map((link) => (
                            <Link
                              key={link.id}
                              href={link.href}
                              onClick={onClose}
                              aria-current={matchesRouteBoundary(pathname, link.href) ? "page" : undefined}
                              className={`rounded-lg py-2.5 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b] ${matchesRouteBoundary(pathname, link.href) ? "text-[#f3c273]" : "text-white/75"}`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </section>
                    ))}
                    {panel.action && (
                      <Link href={panel.action.href} onClick={onClose} className="mt-3 inline-flex rounded-full border border-white/20 px-4 py-2.5 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b]">
                        {panel.action.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {DIRECT_NAV.map((link) => {
          const active = getActiveNavigationItem(pathname) === link.id;
          return (
            <Link
              key={link.id}
              href={link.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-14 items-center border-b border-white/10 text-base font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b] ${active ? "text-[#f3c273]" : "text-white"}`}
            >
              {link.label}<span className="ml-auto text-white/35">→</span>
            </Link>
          );
        })}

        <MobileAccount
          status={sessionStatus}
          user={user}
          signingOut={signingOut}
          signOutError={signOutError}
          onClose={onClose}
          onSignOut={onSignOut}
        />
        <div className="grid shrink-0 grid-cols-2 gap-2 pt-3 max-[340px]:grid-cols-1">
          <Link href={NAV_PRIMARY_ACTION.href} onClick={onClose} className="col-span-full rounded-full bg-white px-3 py-3 text-center text-sm font-extrabold text-[#0f172a] outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b]">{NAV_PRIMARY_ACTION.label}</Link>
        </div>
      </nav>
    </div>
  );
}

type AccountUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: AccountRole;
};

function DesktopAccount({
  accountRef, triggerRef, open, user, signingOut, onToggle, onClose, onSignOut,
}: {
  accountRef: RefObject<HTMLDivElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  open: boolean;
  user: AccountUser;
  signingOut: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSignOut: () => void;
}) {
  const canManage = user.role === "ADMIN" || user.role === "INSTRUCTOR";
  return (
    <div ref={accountRef} className="relative" onBlur={(event) => {
      if (event.relatedTarget instanceof Node && accountRef.current?.contains(event.relatedTarget)) return;
      onClose();
    }}>
      <button ref={triggerRef} id="marketing-account-trigger" type="button" aria-expanded={open} aria-controls="marketing-account-menu" onClick={onToggle} className="flex h-11 items-center gap-2 rounded-full border border-white/15 px-2 pr-3 outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#f0b65b]">
        <Avatar user={user} />
        <span className="max-w-24 truncate text-sm font-bold">{firstName(user)}</span>
        <Chevron open={open} />
      </button>
      <div id="marketing-account-menu" aria-hidden={!open} inert={!open} className={`absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border border-[#eadfd2] bg-[#fffaf4] text-[#17212d] shadow-2xl transition motion-reduce:transition-none ${open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"}`}>
        <div className="border-b border-[#eadfd2] px-4 py-3"><p className="truncate text-sm font-extrabold">{user.name || "Pengguna Skillary"}</p><p className="truncate text-xs text-slate-500">{user.email}</p></div>
        <div className="p-2">
          <Link href="/dashboard" onClick={onClose} className="block rounded-xl px-3 py-2.5 text-sm font-bold hover:bg-[#f4eadc] focus-visible:ring-2 focus-visible:ring-[#d99335]">Dashboard</Link>
          {canManage && <Link href="/admin" onClick={onClose} className="block rounded-xl px-3 py-2.5 text-sm font-bold hover:bg-[#f4eadc] focus-visible:ring-2 focus-visible:ring-[#d99335]">Admin Panel</Link>}
          <button type="button" disabled={signingOut} onClick={onSignOut} className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold text-rose-700 hover:bg-rose-50 disabled:cursor-wait disabled:opacity-60">{signingOut ? "Keluar…" : "Keluar"}</button>
        </div>
      </div>
    </div>
  );
}

function MobileAccount({ status, user, signingOut, signOutError, onClose, onSignOut }: { status: AccountStatus; user?: AccountUser; signingOut: boolean; signOutError: string; onClose: () => void; onSignOut: () => void }) {
  if (status === "loading") return <div aria-label="Memuat akun" className="mt-auto h-[7.5rem] shrink-0 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />;
  if (!user) return <div className="mt-auto flex h-[7.5rem] shrink-0 items-end"><Link href="/login" onClick={onClose} className="w-full rounded-full border border-white/20 px-3 py-3 text-center text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#f0b65b]">Masuk</Link></div>;
  const canManage = user.role === "ADMIN" || user.role === "INSTRUCTOR";
  return <section aria-label="Akun" className="mt-auto min-h-[7.5rem] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-3"><div className="flex items-center gap-3"><Avatar user={user} /><div className="min-w-0"><p className="truncate text-sm font-extrabold">{user.name || "Pengguna Skillary"}</p><p className="truncate text-xs text-white/50">{user.email}</p></div></div><div className="mt-3 grid grid-cols-2 gap-2"><Link href="/dashboard" onClick={onClose} className="rounded-xl bg-white/10 px-3 py-2.5 text-center text-sm font-bold">Dashboard</Link>{canManage && <Link href="/admin" onClick={onClose} className="rounded-xl bg-white/10 px-3 py-2.5 text-center text-sm font-bold">Admin Panel</Link>}<button type="button" disabled={signingOut} onClick={onSignOut} className="col-span-full rounded-xl px-3 py-2.5 text-sm font-bold text-rose-300 hover:bg-white/10 disabled:cursor-wait disabled:opacity-60">{signingOut ? "Keluar…" : "Keluar"}</button></div>{signOutError && <p role="alert" className="mt-2 text-center text-xs font-semibold text-rose-300">{signOutError}</p>}</section>;
}

function Avatar({ user }: { user: AccountUser }) {
  const [failed, setFailed] = useState(false);
  return <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#f0b65b] to-[#b55d2b] text-xs font-black text-white">{user.image && !failed ? <Image src={user.image} alt="" width={32} height={32} unoptimized referrerPolicy="no-referrer" onError={() => setFailed(true)} className="h-full w-full object-cover" /> : accountInitial(user)}</span>;
}

function firstName(user: AccountUser) { return user.name?.trim().split(/\s+/)[0] || "Akun"; }
function accountInitial(user: AccountUser) { return (user.name?.trim()[0] || user.email?.trim()[0] || "U").toUpperCase(); }

function getFocusableElements(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )).filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0);
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" className={`h-3.5 w-3.5 transition motion-reduce:transition-none ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
