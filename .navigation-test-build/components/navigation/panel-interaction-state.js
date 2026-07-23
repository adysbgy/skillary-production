"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOSED_PANEL_STATE = void 0;
exports.transitionPanelInteraction = transitionPanelInteraction;
exports.shouldSchedulePointerClose = shouldSchedulePointerClose;
exports.isPanelOpen = isPanelOpen;
exports.CLOSED_PANEL_STATE = Object.freeze({ mode: "closed", panelId: null });
function transitionPanelInteraction(state, event) {
    if (event.type === "close")
        return exports.CLOSED_PANEL_STATE;
    if (event.type === "hover-open") {
        if (state.mode === "clickPinned" || state.mode === "keyboardOpen")
            return state;
        return { mode: "hoverPreview", panelId: event.panelId };
    }
    const nextMode = event.type === "click-toggle" ? "clickPinned" : "keyboardOpen";
    if (state.panelId === event.panelId && state.mode === nextMode)
        return exports.CLOSED_PANEL_STATE;
    return { mode: nextMode, panelId: event.panelId };
}
function shouldSchedulePointerClose(state) {
    return state.mode === "hoverPreview";
}
function isPanelOpen(state) {
    return state.panelId !== null;
}
