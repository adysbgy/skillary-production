export type PanelInteractionMode = "hoverPreview" | "clickPinned" | "keyboardOpen";

export type PanelInteractionState<PanelId extends string> =
  | Readonly<{ mode: "closed"; panelId: null }>
  | Readonly<{ mode: PanelInteractionMode; panelId: PanelId }>;

export type PanelInteractionEvent<PanelId extends string> =
  | Readonly<{ type: "hover-open"; panelId: PanelId }>
  | Readonly<{ type: "click-toggle"; panelId: PanelId }>
  | Readonly<{ type: "keyboard-toggle"; panelId: PanelId }>
  | Readonly<{ type: "close" }>;

export const CLOSED_PANEL_STATE = Object.freeze({ mode: "closed", panelId: null }) satisfies PanelInteractionState<never>;

export function transitionPanelInteraction<PanelId extends string>(
  state: PanelInteractionState<PanelId>,
  event: PanelInteractionEvent<PanelId>,
): PanelInteractionState<PanelId> {
  if (event.type === "close") return CLOSED_PANEL_STATE;
  if (event.type === "hover-open") {
    if (state.mode === "clickPinned" || state.mode === "keyboardOpen") return state;
    return { mode: "hoverPreview", panelId: event.panelId };
  }

  const nextMode = event.type === "click-toggle" ? "clickPinned" : "keyboardOpen";
  if (state.panelId === event.panelId && state.mode === nextMode) return CLOSED_PANEL_STATE;
  return { mode: nextMode, panelId: event.panelId };
}

export function shouldSchedulePointerClose<PanelId extends string>(state: PanelInteractionState<PanelId>) {
  return state.mode === "hoverPreview";
}

export function isPanelOpen<PanelId extends string>(state: PanelInteractionState<PanelId>) {
  return state.panelId !== null;
}
