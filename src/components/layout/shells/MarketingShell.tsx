import { ChromeOwnershipMarker } from "./ChromeOwnershipMarker";import type { PassiveShellProps } from "./types";
export function MarketingShell({ children, mode = "passive" }: PassiveShellProps) { return <><ChromeOwnershipMarker owner="marketing" mode={mode} /><div data-skillary-shell-content="marketing">{children}</div></>; }
