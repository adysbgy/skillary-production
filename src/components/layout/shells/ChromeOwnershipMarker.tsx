import type { ShellMode, ShellOwner } from "./types";
export function ChromeOwnershipMarker({ owner, mode }: { owner: ShellOwner; mode: ShellMode }) { return <span hidden aria-hidden data-skillary-shell={owner} data-skillary-shell-mode={mode} />; }
