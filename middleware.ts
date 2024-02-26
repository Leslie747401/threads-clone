import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export const runtime = 'nodejs';

export default authMiddleware({
  publicRoutes : ['api/webhook/clerk','/api/uploadthing','/api/userdata'],
  ignoredRoutes : ['/api/webhook/clerk'],

  async afterAuth(auth,req){  

    // When accessing a public route the user can simply access it without any authenttication.
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);
    
    // if auth.userId is true then it means that the user exists in clerk database. So, !auth.userId means that the user is not present in the clerk database and !auth.isPublicRoute means that the user is trying to access a protected route. So, we simply redirect the user to the sign-in page. 
    if (!auth.userId && !auth.isPublicRoute) {

      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


