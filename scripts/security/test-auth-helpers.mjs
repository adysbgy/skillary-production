import{readFile}from"node:fs/promises";
const redirect=await readFile("src/lib/safe-redirect.ts","utf8"),errors=await readFile("src/lib/auth-errors.ts","utf8"),login=await readFile("src/app/login/page.tsx","utf8");
const required=[[redirect,'value.startsWith("//")'],[redirect,'value.includes("\\\\")'],[errors,'OAuthAccountNotLinked'],[errors,'Configuration'],[login,'role="alert"'],[login,'safeInternalRedirect'],[login,'googleLoading']];
for(const [source,needle] of required)if(!source.includes(needle))throw new Error(`Missing auth hardening assertion: ${needle}`);
console.log("Auth helper regression audit passed.");
