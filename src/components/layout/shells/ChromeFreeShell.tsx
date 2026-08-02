import { ChromeOwnershipMarker } from "./ChromeOwnershipMarker";import type { PassiveShellProps } from "./types";
export function ChromeFreeShell({ children, mode = "passive" }: PassiveShellProps) { return <><ChromeOwnershipMarker owner="none" mode={mode} /><div data-skillary-shell-content="none">{children}</div></>; }
