import assert from "node:assert/strict";import test from "node:test";import fs from "node:fs";import ts from "typescript";import vm from "node:vm";
function load(p){const source=fs.readFileSync(new URL(`../../${p}`,import.meta.url),"utf8"),compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,m={exports:{}};vm.runInNewContext(compiled,{module:m,exports:m.exports,require:()=>null,Object});return m.exports}
const {getChromeOwnershipViolations}=load("src/lib/chrome-ownership-assertions.ts"),registry=load("src/lib/route-shell-migration.ts");
const base={shellOwner:"marketing",shellMode:"passive",visibleHeaderOwners:["root-gate"],visibleFooterOwners:[],registryActive:false};
test("baseline registry has no active families",()=>assert.equal(registry.assertBaselineShellRegistry(),true));
test("passive shell permits sole root owner",()=>assert.equal(getChromeOwnershipViolations(base).length,0));
test("detects duplicate headers and footers",()=>assert.deepEqual([...getChromeOwnershipViolations({...base,visibleHeaderOwners:["root-gate","marketing-shell"],visibleFooterOwners:["a","b"]})].sort(),["duplicate-visible-footer-owner","duplicate-visible-header-owner"]));
test("detects active shell without opt-in and root coexistence",()=>assert.deepEqual([...getChromeOwnershipViolations({...base,shellMode:"active"})].sort(),["active-shell-without-registry-opt-in","root-and-active-shell-coexist"]));
test("detects chrome in active chrome-free shell",()=>assert.ok(getChromeOwnershipViolations({...base,shellOwner:"none",shellMode:"active",registryActive:true}).includes("chrome-free-shell-has-visible-owner")));
