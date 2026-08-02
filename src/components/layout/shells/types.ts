import type { ReactNode } from "react";
export type ShellMode = "passive" | "active";
export type ShellOwner = "marketing" | "fallback" | "none";
export type ChromeOwner = "root-gate" | "marketing-shell" | "fallback-shell" | "embedded";
export interface PassiveShellProps { children: ReactNode; mode?: "passive"; }
