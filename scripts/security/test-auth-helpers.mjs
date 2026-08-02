import { readFile } from "node:fs/promises";
import { resolveExactRouteFile } from "./resolve-exact-route-file.mjs";

const loginPath = await resolveExactRouteFile({
  route: "/login",
  candidates: [
    "src/app/login/page.tsx",
    "src/app/(auth)/login/page.tsx",
  ],
});

const [redirect, errors, login] = await Promise.all([
  readFile("src/lib/safe-redirect.ts", "utf8"),
  readFile("src/lib/auth-errors.ts", "utf8"),
  readFile(loginPath, "utf8"),
]);

const required = [
  [redirect, 'value.startsWith("//")'],
  [redirect, 'value.includes("\\\\")'],
  [errors, "OAuthAccountNotLinked"],
  [errors, "Configuration"],
  [login, 'role="alert"'],
  [login, "safeInternalRedirect"],
  [login, "googleLoading"],
];

for (const [source, needle] of required) {
  if (!source.includes(needle)) {
    throw new Error(`Missing auth hardening assertion: ${needle}`);
  }
}

console.log(`Auth helper regression audit passed (${loginPath}).`);
