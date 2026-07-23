import{readFile}from"node:fs/promises";
const s=await readFile("next.config.ts","utf8");
const matrix={"/v2":"/","/v2/events/:slug/checkout":"/events/:slug/checkout","/v2/events/:slug":"/events/:slug","/v2/events":"/events","/v2/program/:slug":"/programs/:slug","/v2/catalog":"/programs","/v2/untuk-organisasi":"/untuk-organisasi","/v2/about":"/about","/v2/resources":"/resources","/v2/proposal":"/contact","/v2/portfolio":"/portofolio","/proposal":"/contact","/program-catalog":"/programs","/training-brief":"/contact"};
for(const[source,destination]of Object.entries(matrix)){const row=`{ source: \"${source}\", destination: \"${destination}\" }`;if(!s.includes(row))throw new Error(`Missing redirect ${source} -> ${destination}`)}
for(const clean of["/programs","/events","/untuk-organisasi","/about","/resources","/contact","/portofolio"]){if(s.includes(`source: \"${clean}\"`))throw new Error(`Canonical route redirects: ${clean}`)}
if(s.indexOf('/v2/events/:slug/checkout')>s.indexOf('/v2/events/:slug'))throw new Error("Checkout redirect must precede event detail redirect");
for(const destination of Object.values(matrix)){if(destination.startsWith('/v2/'))throw new Error(`Redirect chain target remains: ${destination}`)}
console.log("Permanent route redirect audit passed.");
