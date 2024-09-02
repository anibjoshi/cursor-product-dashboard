import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export function middleware(request: NextRequest) {
  // Example middleware logic: log the request URL
  console.log(`Request URL: ${request.url}`);
  
  // Continue to the next middleware or route handler
  return NextResponse.next();
}