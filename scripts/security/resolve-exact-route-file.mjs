import path from "node:path";
import { stat } from "node:fs/promises";

const slash = (value) => value.split(path.sep).join("/");

export async function resolveExactRouteFile({ route, candidates, cwd = process.cwd() }) {
  if (!route || !Array.isArray(candidates) || candidates.length === 0) {
    throw new Error("resolveExactRouteFile requires a route and non-empty candidates");
  }
  const root = path.resolve(cwd);
  const normalized = [...new Set(candidates.map((candidate) => slash(candidate)))].sort();
  const matches = [];
  for (const candidate of normalized) {
    const absolute = path.resolve(root, candidate);
    const relative = path.relative(root, absolute);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error(`Route candidate escapes cwd for ${route}: ${candidate}`);
    }
    try {
      if ((await stat(absolute)).isFile()) matches.push(slash(relative));
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
  }
  if (matches.length !== 1) {
    throw new Error(`Expected exactly one route file for ${route}; found ${matches.length}; candidates: ${normalized.join(", ")}`);
  }
  return matches[0];
}
