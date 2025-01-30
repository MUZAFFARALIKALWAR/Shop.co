import { clerkMiddleware } from "@clerk/nextjs/server";
// latest  version
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
 
// import { withClerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default withClerkMiddleware((req) => {
//   return NextResponse.next();
// });

// // Apply this middleware to all routes
// export const config = {
//   matcher: "/((?!_next|static|favicon.ico).*)",
// };
