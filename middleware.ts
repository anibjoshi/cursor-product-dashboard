import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Add and export the middleware function
export function middleware(req) {
  // Middleware logic here
  return NextResponse.next();
}