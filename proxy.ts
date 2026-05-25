import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Gate everything under /admin EXCEPT the sign-in/sign-up routes themselves —
// otherwise auth.protect() redirects to /admin/sign-in which is also protected,
// creating an infinite redirect loop. The client-facing /sign-in and /sign-up
// routes stay public for the same reason. /portal is the client equivalent of
// /admin — protected, with unauth users sent to the branded /sign-in (not the
// admin one).
const isPublicAuthRoute = createRouteMatcher([
  '/admin/sign-in(.*)',
  '/admin/sign-up(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);
const isProtectedAdminRoute = createRouteMatcher(['/admin(.*)']);
const isProtectedPortalRoute = createRouteMatcher(['/portal(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicAuthRoute(req)) return;
  if (isProtectedAdminRoute(req)) {
    await auth.protect();
    return;
  }
  if (isProtectedPortalRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const url = req.nextUrl.clone();
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
