import { NextResponse } from "next/server";
import { userAgent } from "next/server"; // Ensure correct import

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Add and export the middleware function
export function middleware(req) {
  // Example middleware logic: log the request URL
  console.log(`Request URL: ${req.url}`);
  
  // Example: parse user agent
  const ua = userAgent(req);
  console.log(`User Agent: ${ua.ua}`);
  
  // Continue to the next middleware or route handler
  return NextResponse.next();
}