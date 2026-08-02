import assert from "node:assert/strict";
import test from "node:test";
import ts from "typescript";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../../src/lib/safe-redirect.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const cjsModule = { exports: {} };
vm.runInNewContext(compiled, { module: cjsModule, exports: cjsModule.exports, URL });
const { safeInternalRedirect } = cjsModule.exports;

test("accepts same-origin application paths", () => {
  assert.equal(safeInternalRedirect("/dashboard"), "/dashboard");
  assert.equal(safeInternalRedirect("/programs?tab=active#top"), "/programs?tab=active#top");
});
test("rejects cross-origin and protocol-relative values", () => {
  for (const value of ["https://evil.example/x", "http://evil.example", "//evil.example/x"]) assert.equal(safeInternalRedirect(value), "/dashboard");
});
test("rejects ambiguous slash and control-character inputs", () => {
  for (const value of ["/\\evil.example", "/safe\nLocation:https://evil.example", "dashboard", "", null]) assert.equal(safeInternalRedirect(value), "/dashboard");
});
test("honors an explicit safe fallback", () => assert.equal(safeInternalRedirect("https://evil.example", "/login"), "/login"));
