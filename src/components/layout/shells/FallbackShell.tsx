import { ChromeOwnershipMarker } from "./ChromeOwnershipMarker";import type { PassiveShellProps } from "./types";
export function FallbackShell({ children, mode = "passive" }: PassiveShellProps) { return <><ChromeOwnershipMarker owner="fallback" mode={mode} /><div data-skillary-shell-content="fallback">{children}</div></>; }
