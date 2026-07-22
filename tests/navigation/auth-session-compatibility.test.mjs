import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
const editor=fs.readFileSync(new URL("../../src/app/admin/courses/[id]/edit/page.tsx",import.meta.url),"utf8");
const customRoute=new URL("../../src/app/api/auth/session/route.ts",import.meta.url);
test("Auth.js catch-all owns session endpoint",()=>assert.equal(fs.existsSync(customRoute),false));
test("admin editor uses canonical fail-closed session role",()=>{assert.match(editor,/useSession/);assert.match(editor,/session\?\.user\?\.role \?\? null/);assert.equal(editor.includes('fetch("/api/auth/session")'),false)});
test("ADMIN-only UI and instructor loading remain exact-role gated",()=>{assert.ok((editor.match(/sessionRole === "ADMIN"/g)||[]).length>=4);assert.match(editor,/fetch\("\/api\/admin\/users\?role=INSTRUCTOR"\)/)});
