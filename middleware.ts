import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/(.*)"],
  afterAuth(auth, req) {
    // Handle authenticated requests
    if (auth.userId && auth.isPublicRoute) {
      // If the user is logged in and the route is public, let them view
      return NextResponse.next();
    }

    // If the user isn't logged in and the route is protected, redirect to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};