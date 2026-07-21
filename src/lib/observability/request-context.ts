import { randomUUID } from "node:crypto";
export interface RequestContext { requestId:string; route:string; method:string; }
export function createRequestContext(request:Request,route:string):RequestContext{return{requestId:randomUUID(),route,method:request.method.toUpperCase()}}
