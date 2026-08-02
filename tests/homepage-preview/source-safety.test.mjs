import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const PROJECT_ROOT = process.cwd();
const FEATURE_ROOT = path.join(
  PROJECT_ROOT,
  "src/features/marketing/homepage-preview",
);
const ROUTE_ROOT = path.join(
  PROJECT_ROOT,
  "src/app/(standalone)/lp/homepage-preview",
);

const FORBIDDEN_IMPORTS = [
  "@/data/content",
  "@/data/v2-events",
  "@/data/v2-trainers",
  "@/data/trainers",
  "@/lib/brand-proof-content",
  "@/lib/trainer-public",
  "@/lib/legacy-portfolio",
  "@/lib/payments",
  "/checkout",
  "/api/",
];

const FORBIDDEN_DB_METHODS = new Set([
  "create",
  "createMany",
  "update",
  "updateMany",
  "upsert",
  "delete",
  "deleteMany",
  "$transaction",
  "$executeRaw",
  "$executeRawUnsafe",
  "$queryRaw",
  "$queryRawUnsafe",
]);

const PROTECTED_SHA256 = {
  "src/app/page.tsx": "c68bcfc25eef8c81dcd2bf17d3abe703b33538dccdb59193f8638f8006c4dc72",
  "src/app/globals.css": "eb5ae4911d8af6e64929d3fcd03e90f9a6b3840b12ea8043a03f36151f387c5a",
  "next.config.ts": "ca92db1b507e7dcd39f1400b1d604cf7a0de5bb610dd3ce98ebd3b70c1342b3c",
  "package.json": "2e2f17291830d0e6adf808ecc8fd35f9287bbb1d22f29ebe0aecd874fae89ef8",
  "package-lock.json": "f6d768fd72509c49a66f2b4898eb34a416f50f1b0dd150931642595a5b0b9d95",
  "prisma/schema.prisma": "b5f1287c329ea2f78231335968bd1b83d0186268e0ec11db91c3354e3b4509e8",
  "src/app/robots.ts": "54cd2d8a43b6a3698e2d6e3a4c3870ecb37e8f04e2aef4e6394ab427a803b054",
  "src/app/sitemap.ts": "8b10782daf224d753ad9f8249f66b758b6be95f09088244fc136f2f8f9e5f463",
  "src/app/(standalone)/lp/layout.tsx": "b8a5c18d3c9102b17cae8519b22bb779a41948ac62170b00daca83090cc1b602",
  "src/lib/payments/payment-availability.ts": "7edb914d0e645d53f931d29e9bd4e450355289e5a97f20f0ac59421a1de0c068",
};

test("homepage preview feature and route have no fallback, payment, or legacy imports", () => {
  const violations = [];

  for (const file of [...typescriptFiles(FEATURE_ROOT), ...typescriptFiles(ROUTE_ROOT)]) {
    const sourceText = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);

    for (const statement of sourceFile.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
        continue;
      }
      const moduleName = statement.moduleSpecifier.text;
      if (FORBIDDEN_IMPORTS.some((forbidden) => moduleName.includes(forbidden))) {
        violations.push(`${relative(file)}:forbidden-import:${moduleName}`);
      }
    }

    if (/\ballman\b/i.test(sourceText)) violations.push(`${relative(file)}:legacy-brand`);
  }

  assert.deepEqual(violations, []);
});

test("Prisma adapter is read-only and does not expose mutation or raw-query operations", () => {
  const violations = [];

  for (const file of typescriptFiles(FEATURE_ROOT)) {
    const sourceText = readFileSync(file, "utf8");
    const sourceFile = ts.createSourceFile(file, sourceText, ts.ScriptTarget.Latest, true);

    walk(sourceFile, (node) => {
      if (!ts.isCallExpression(node) || !ts.isPropertyAccessExpression(node.expression)) return;
      const method = node.expression.name.text;
      if (FORBIDDEN_DB_METHODS.has(method)) {
        violations.push(`${relative(file)}:forbidden-db-method:${method}`);
      }

      if (rootIdentifier(node.expression) === "prisma" && method !== "findMany") {
        violations.push(`${relative(file)}:non-read-prisma-call:${method}`);
      }
    });
  }

  assert.deepEqual(violations, []);
});

test("Prisma queries enforce publication, curriculum, child-course, consent and rights gates", () => {
  const source = readFileSync(
    path.join(FEATURE_ROOT, "data/get-homepage-preview-data.ts"),
    "utf8",
  );
  for (const fragment of [
    'status: "PUBLISHED"',
    "modules: { some: { lessons: { some: {} } } }",
    'every: { course: { status: "PUBLISHED" } }',
    "consentedAt: { not: null }",
    "publishedAt: { not: null }",
    "portraitUrl: { not: null }",
    "reviewDueAt: { gt: now }",
    "photoRights: { in: [...HOMEPAGE_PHOTO_RIGHTS] }",
  ]) {
    assert.equal(source.includes(fragment), true, fragment);
  }
  assert.equal((source.match(/\.findMany\(/g) ?? []).length, 3);
  for (const forbiddenSelection of ["price: true", "email: true", "paymentOrders", "enrollments"]) {
    assert.equal(source.includes(forbiddenSelection), false, forbiddenSelection);
  }
});

test("HP-S5A registry approves only four curated programs and keeps proof sources closed", () => {
  const source = readFileSync(
    path.join(FEATURE_ROOT, "data/homepage-preview-provenance.ts"),
    "utf8",
  );
  for (const fragment of [
    "courses: []",
    "learningPaths: []",
    "faculty: []",
    "workshops: []",
    "clientLogos: []",
    "testimonials: []",
    "outcomeMetrics: []",
    "caseStudies: []",
  ]) {
    assert.equal(source.includes(fragment), true, fragment);
  }
  assert.equal(source.includes("programs: ["), true);
  assert.equal((source.match(/recordType: "program"/g) ?? []).length, 4);
  assert.equal((source.match(/approvedForHomepage: true/g) ?? []).length, 4);
  assert.equal(source.includes('recordType: "workshop"'), false);
  assert.equal(source.includes('recordType: "faculty"'), false);
  assert.equal(source.includes('recordType: "testimonial"'), false);
});

test("HP-S5A program assets are local, labeled illustrative, optimized, and hash-pinned", () => {
  const manifest = readFileSync(
    path.join(FEATURE_ROOT, "data/homepage-preview-assets.ts"),
    "utf8",
  );
  const expected = {
    "ai-productivity-for-teams.webp": "f8d0ea461f39fbab7d81fba3c29d91cd40c30cb03e21e62c68ce091d1a7c4f1b",
    "business-presentation-reporting.webp": "4df286ebe013df26c38c8946ee62050981e4584d3a6b22a42b7f8edb90a1275a",
    "data-driven-decision-making.webp": "fddd4f88177541004a22e6bbf31c80402caecc9e6218fe0146e4c93be08dd861",
    "power-bi-business-dashboard.webp": "87384f164b0d495ff61df0d8e05e1317319f8561aba71a908699d45e3f55b3b2",
  };

  assert.equal((manifest.match(/^    label: "Ilustrasi program"/gm) ?? []).length, 4);
  assert.equal((manifest.match(/^    origin: "existing-skillary-homepage"/gm) ?? []).length, 4);
  for (const [filename, hash] of Object.entries(expected)) {
    const absolute = path.join(PROJECT_ROOT, "public/images/homepage-preview/programs", filename);
    assert.equal(existsSync(absolute), true, filename);
    const bytes = readFileSync(absolute);
    assert.equal(bytes.length < 60 * 1024, true, `${filename}:byte-budget`);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), hash, filename);
    assert.equal(manifest.includes(hash), true, `${filename}:manifest-hash`);
  }
});

test("HP-S0 protected files remain byte-identical and HP-S2 route is isolated", () => {
  for (const [relativePath, expected] of Object.entries(PROTECTED_SHA256)) {
    const absolutePath = path.join(PROJECT_ROOT, relativePath);
    const actual = createHash("sha256").update(readFileSync(absolutePath)).digest("hex");
    assert.equal(actual, expected, relativePath);
  }

  assert.equal(existsSync(ROUTE_ROOT), true);
  for (const file of ["layout.tsx", "page.tsx", "loading.tsx", "error.tsx"]) {
    assert.equal(existsSync(path.join(ROUTE_ROOT, file)), true, file);
  }
});

function typescriptFiles(root) {
  const result = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const absolute = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...typescriptFiles(absolute));
    if (entry.isFile() && /\.tsx?$/.test(entry.name)) result.push(absolute);
  }
  return result.sort();
}

function walk(node, visit) {
  visit(node);
  node.forEachChild((child) => walk(child, visit));
}

function rootIdentifier(expression) {
  let current = expression;
  while (ts.isPropertyAccessExpression(current)) current = current.expression;
  return ts.isIdentifier(current) ? current.text : null;
}

function relative(file) {
  return path.relative(PROJECT_ROOT, file).split(path.sep).join("/");
}
