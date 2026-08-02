import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveExactRouteFile } from "../../scripts/security/resolve-exact-route-file.mjs";

const candidates = ["src/app/untuk-organisasi/page.tsx", "src/app/(marketing)/untuk-organisasi/page.tsx"];
async function fixture(t) {
  const cwd = await mkdtemp(path.join(os.tmpdir(), "route-resolver-"));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  return cwd;
}
async function file(cwd, relative) {
  const target = path.join(cwd, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, "export default null;\n");
}

test("resolves current ungrouped candidate", async (t) => { const cwd=await fixture(t); await file(cwd,candidates[0]); assert.equal(await resolveExactRouteFile({route:"/untuk-organisasi",candidates,cwd}),candidates[0]); });
test("resolves future grouped candidate", async (t) => { const cwd=await fixture(t); await file(cwd,candidates[1]); assert.equal(await resolveExactRouteFile({route:"/untuk-organisasi",candidates,cwd}),candidates[1]); });
test("fails when no candidate exists", async (t) => { const cwd=await fixture(t); await assert.rejects(resolveExactRouteFile({route:"/untuk-organisasi",candidates,cwd}),/found 0/); });
test("fails when multiple candidates exist", async (t) => { const cwd=await fixture(t); await file(cwd,candidates[0]); await file(cwd,candidates[1]); await assert.rejects(resolveExactRouteFile({route:"/untuk-organisasi",candidates:[...candidates].reverse(),cwd}),/found 2/); });
test("uses explicit cwd", async (t) => { const cwd=await fixture(t); await file(cwd,candidates[0]); assert.equal(await resolveExactRouteFile({route:"/untuk-organisasi",candidates,cwd}),candidates[0]); });
test("normalizes diagnostics and candidate order", async (t) => { const cwd=await fixture(t); await assert.rejects(resolveExactRouteFile({route:"/untuk-organisasi",candidates:[...candidates].reverse(),cwd}),error => !error.message.includes("\\") && error.message.includes(candidates.slice().sort().join(", "))); });
test("directories do not count as files", async (t) => { const cwd=await fixture(t); await mkdir(path.join(cwd,candidates[0]),{recursive:true}); await assert.rejects(resolveExactRouteFile({route:"/untuk-organisasi",candidates,cwd}),/found 0/); });
test("rejects candidates outside cwd", async (t) => { const cwd=await fixture(t); await assert.rejects(resolveExactRouteFile({route:"/untuk-organisasi",candidates:["../page.tsx"],cwd}),/escapes cwd/); });
