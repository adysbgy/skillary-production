import{readFile,access}from"node:fs/promises";
const manifest=JSON.parse(await readFile("docs/legacy-route-retirement.json","utf8"));
if(!manifest.policy?.deleteNothingInR0)throw new Error("R0 must be analysis-only");
if(manifest.policy.minimumObservationDays<30)throw new Error("Observation window is below 30 days");
const all=[...manifest.protectedDependencies,...manifest.candidates];
const seen=new Set();
for(const item of all){if(seen.has(item.route))throw new Error(`Duplicate manifest route: ${item.route}`);seen.add(item.route);await access(item.sourceFile);if(item.decision==="DELETE_APPROVED"||item.decision==="DELETED")throw new Error(`Deletion state forbidden in R0: ${item.route}`)}
for(const item of manifest.protectedDependencies){if(item.decision!=="KEEP_DEPENDENCY"||!item.consumers?.length)throw new Error(`Dependency protection incomplete: ${item.route}`)}
for(const item of manifest.candidates){if(item.decision!=="KEEP_PENDING_REVIEW")throw new Error(`Candidate prematurely advanced: ${item.route}`);if(!item.uniqueSignals?.length)throw new Error(`Missing salvage evidence: ${item.route}`)}
for(const prefix of manifest.protectedRoutePrefixes){if(manifest.candidates.some(x=>x.route===prefix||x.route.startsWith(prefix+"/")))throw new Error(`Protected route listed as candidate: ${prefix}`)}
console.log(`Retirement manifest audit passed: ${manifest.protectedDependencies.length} dependencies protected, ${manifest.candidates.length} candidates retained for review.`);
