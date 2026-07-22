import assert from "node:assert/strict";
import test from "node:test";
import {
  CLOSED_PANEL_STATE,
  shouldSchedulePointerClose,
  transitionPanelInteraction,
} from "../../.navigation-test-build/components/navigation/panel-interaction-state.js";

const hover = (panelId) => ({ type: "hover-open", panelId });
const click = (panelId) => ({ type: "click-toggle", panelId });
const keyboard = (panelId) => ({ type: "keyboard-toggle", panelId });

test("hover opens and switches hover preview", () => {
  const programs = transitionPanelInteraction(CLOSED_PANEL_STATE, hover("programs"));
  assert.deepEqual(programs, { mode: "hoverPreview", panelId: "programs" });
  assert.deepEqual(transitionPanelInteraction(programs, hover("about")), { mode: "hoverPreview", panelId: "about" });
  assert.equal(shouldSchedulePointerClose(programs), true);
});

test("click pins panel and pointer hover cannot switch it", () => {
  const pinned = transitionPanelInteraction(CLOSED_PANEL_STATE, click("programs"));
  assert.deepEqual(pinned, { mode: "clickPinned", panelId: "programs" });
  assert.equal(shouldSchedulePointerClose(pinned), false);
  assert.equal(transitionPanelInteraction(pinned, hover("about")), pinned);
});

test("clicking same pinned panel toggles closed", () => {
  const pinned = transitionPanelInteraction(CLOSED_PANEL_STATE, click("programs"));
  assert.deepEqual(transitionPanelInteraction(pinned, click("programs")), CLOSED_PANEL_STATE);
});

test("click converts hover preview to pinned", () => {
  const preview = transitionPanelInteraction(CLOSED_PANEL_STATE, hover("organizations"));
  assert.deepEqual(transitionPanelInteraction(preview, click("organizations")), { mode: "clickPinned", panelId: "organizations" });
});

test("keyboard open is pinned and same keyboard trigger closes", () => {
  const opened = transitionPanelInteraction(CLOSED_PANEL_STATE, keyboard("about"));
  assert.deepEqual(opened, { mode: "keyboardOpen", panelId: "about" });
  assert.equal(shouldSchedulePointerClose(opened), false);
  assert.equal(transitionPanelInteraction(opened, hover("programs")), opened);
  assert.deepEqual(transitionPanelInteraction(opened, keyboard("about")), CLOSED_PANEL_STATE);
});

test("explicit close dismisses every mode", () => {
  for (const state of [
    transitionPanelInteraction(CLOSED_PANEL_STATE, hover("programs")),
    transitionPanelInteraction(CLOSED_PANEL_STATE, click("organizations")),
    transitionPanelInteraction(CLOSED_PANEL_STATE, keyboard("about")),
  ]) assert.deepEqual(transitionPanelInteraction(state, { type: "close" }), CLOSED_PANEL_STATE);
});
