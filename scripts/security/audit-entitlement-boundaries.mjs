import{readFile}from"node:fs/promises";
const requirements={
"src/app/learn/[courseSlug]/page.tsx":["auth()","canAccessCourseContent","hasActiveEnrollment"],
"src/app/learn/[courseSlug]/[lessonSlug]/page.tsx":["auth()","canAccessCourseContent"],
"src/app/api/progress/route.ts":["auth()","hasActiveEnrollment"],
"src/app/api/quiz/route.ts":["auth()","hasActiveEnrollment"],
"src/app/api/certificates/claim/route.ts":["auth()","getCertificateEligibility"],
"src/app/api/checkout/certificate/route.ts":["auth()","getCertificateEligibility"],
"src/app/api/checkout/[orderId]/route.ts":["auth()","order.userId !== session.user.id"]};
for(const[file,tokens]of Object.entries(requirements)){const source=await readFile(file,"utf8");for(const token of tokens)if(!source.includes(token))throw new Error(`Missing entitlement boundary ${token} in ${file}`)}
console.log(`Entitlement boundary audit passed: ${Object.keys(requirements).length} high-risk routes retain central guards.`);
