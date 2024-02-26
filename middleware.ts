import { authMiddleware, clerkClient, redirectToSignIn, redirectToSignUp } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export const runtime = 'nodejs';

export default authMiddleware({
  publicRoutes : ['api/webhook/clerk','/api/uploadthing','/api/userdata'],
  ignoredRoutes : ['/api/webhook/clerk'],

  async afterAuth(auth,req){  

    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);
    
    if (!auth.userId && !auth.isPublicRoute) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


