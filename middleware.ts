// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-up(.*)","/sign-in(.*)"]);

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-up(.*)", "/sign-in(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    try {
      await auth.protect();
    } catch (error) {
      // Redirect unauthenticated users to custom sign-in page
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Protect API routes
    "/(api|trpc)(.*)",
  ],
};

