import{readFile}from"node:fs/promises";
const config=await readFile("next.config.ts","utf8");
if(config.includes('source: "/:path+"')&&config.includes('rel=\\"canonical\\"'))throw new Error("Unsafe blanket dynamic canonical header remains");
const canonicals={"src/app/blog/[slug]/page.tsx":"`/blog/${post.slug}`","src/app/program/[id]/page.tsx":"`/program/${program.slug}`","src/app/events/[slug]/page.tsx":"`/events/${event.slug}`","src/app/path/[slug]/page.tsx":"`/path/${path.slug}`","src/app/trainers/[slug]/page.tsx":"`/trainers/${t.slug}`"};
for(const[file,needle]of Object.entries(canonicals)){const s=await readFile(file,"utf8");if(!s.includes(needle))throw new Error(`${file} lacks a page-aware canonical`)}
for(const dir of["admin","dashboard","learn","checkout","trainer-review","login","register","forgot-password","reset-password","thank-you"]){const s=await readFile(`src/app/${dir}/layout.tsx`,"utf8");if(!s.includes("PRIVATE_ROUTE_METADATA"))throw new Error(`${dir} lacks private-route metadata`)}
const sitemap=await readFile("src/app/sitemap.ts","utf8");for(const path of["/admin","/dashboard","/checkout","/login","/register","/trainer-review","/preview"]){if(sitemap.includes(`\"${path}`))throw new Error(`Private route appears in sitemap: ${path}`)}
if(!sitemap.includes('PROGRAM_INDEX, slugify')||!sitemap.includes('/programs/${slugify(program.title)}'))throw new Error("Sitemap does not use canonical corporate program routes");
if(sitemap.includes('/program/${program.slug}'))throw new Error("Sitemap still emits legacy database program paths from static data");
console.log("Canonical and index-policy audit passed.");
