import { access, readFile } from "node:fs/promises";

const manifest = JSON.parse(
  await readFile("docs/legacy-route-retirement.json", "utf8"),
);

if (!manifest.policy?.deleteNothingInR0) throw new Error("R0 policy must remain documented");
if (manifest.policy.minimumObservationDays < 30) throw new Error("Observation window is below 30 days");

const all = [...manifest.protectedDependencies, ...manifest.candidates];
const seen = new Set();
for (const item of all) {
  if (seen.has(item.route)) throw new Error(`Duplicate manifest route: ${item.route}`);
  seen.add(item.route);
  if (item.decision === "DELETED") {
    if (!item.replacement) throw new Error(`Deleted route lacks replacement: ${item.route}`);
    try {
      await access(item.sourceFile);
      throw new Error(`Deleted route source still exists: ${item.sourceFile}`);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    continue;
  }
  await access(item.sourceFile);
  if (item.decision === "DELETE_APPROVED") throw new Error(`Approved deletion not completed: ${item.route}`);
}
for (const item of manifest.protectedDependencies) {
  if (!["KEEP_DEPENDENCY", "KEEP_PENDING_REVIEW", "DELETED"].includes(item.decision)) {
    throw new Error(`Dependency protection incomplete: ${item.route}`);
  }
}
for (const item of manifest.candidates) {
  if (!["KEEP_PENDING_REVIEW", "DELETED"].includes(item.decision)) throw new Error(`Invalid candidate decision: ${item.route}`);
  if (!item.uniqueSignals?.length) throw new Error(`Missing salvage evidence: ${item.route}`);
  if (item.decision === "DELETED") {
    if (!item.deletedAt) throw new Error(`Deleted candidate lacks deletion date: ${item.route}`);
    if (!item.note?.includes("salvaged")) throw new Error(`Deleted candidate lacks salvage confirmation: ${item.route}`);
  }
}
for (const prefix of manifest.protectedRoutePrefixes) {
  if (manifest.candidates.some((item) => item.route === prefix || item.route.startsWith(`${prefix}/`))) {
    throw new Error(`Protected route listed as candidate: ${prefix}`);
  }
}
const deletedCount = all.filter((item) => item.decision === "DELETED").length;
const retainedCount = manifest.candidates.filter((item) => item.decision === "KEEP_PENDING_REVIEW").length;
console.log(`Retirement manifest audit passed: ${deletedCount} approved routes deleted; ${retainedCount} content-bearing candidates retained for review.`);
