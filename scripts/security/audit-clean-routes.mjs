import{readFile}from"node:fs/promises";
import{resolveExactRouteFile}from"./resolve-exact-route-file.mjs";
const organization=await resolveExactRouteFile({route:"/untuk-organisasi",candidates:["src/app/untuk-organisasi/page.tsx","src/app/(marketing)/untuk-organisasi/page.tsx"]});
const routes={"src/app/programs/page.tsx":"/programs","src/app/programs/[slug]/page.tsx":"/programs/${program.slug}","src/app/events/page.tsx":"/events",[organization]:"/untuk-organisasi"};
for(const[file,canonical]of Object.entries(routes)){const s=await readFile(file,"utf8");if(!s.includes(canonical))throw new Error(`${file} lacks canonical ${canonical}`)}
const retiredEvent=await readFile("src/app/events/[slug]/page.tsx","utf8");if(!retiredEvent.includes("index: false")||!retiredEvent.includes("notFound()"))throw new Error("Retired event detail route must remain noindex and unavailable");
const checkout=await readFile("src/app/events/[slug]/checkout/layout.tsx","utf8");if(!checkout.includes("PRIVATE_ROUTE_METADATA"))throw new Error("Clean event checkout is not noindex");
const config=await readFile("next.config.ts","utf8");for(const path of["/programs","/events","/untuk-organisasi"]){if(config.includes(`source: \"${path}`))throw new Error(`Clean route unexpectedly redirects: ${path}`)}
console.log("Clean-route parity contract audit passed.");
