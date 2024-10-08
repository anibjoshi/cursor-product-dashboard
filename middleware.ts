import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';

// Remove this config as it's no longer needed
// export const config = {
//   runtime: 'experimental-edge',
// };

export function middleware(request: NextRequest) {
  // Example middleware logic: log the request URL
  console.log(`Request URL: ${request.url}`);
  
  // Continue to the next middleware or route handler
  return NextResponse.next();
}