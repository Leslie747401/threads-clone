import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

export default authMiddleware({
  publicRoutes : ['api/webhook/clerk','/api/uploadthing','/api/userdata'],
  ignoredRoutes : ['/api/webhook/clerk'],

  async afterAuth(auth,req){
       
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({returnBackUrl : req.url});
    }
      
    // if(auth.userId){

    //     const users = await clerkClient.users.getUserList();
    //     let flag = 0;
                
    //   for(let i = 0 ; i < users.length ; i++){
    //     if(users[i].id === auth.userId){
    //       flag = 1;
    //     }
    //   }

    //   if(flag){
    //     return NextResponse.redirect(new URL('/',req.url));
    //   }

    //   else{
    //     return NextResponse.redirect(new URL('/onboarding',req.url));
    //   }
    // }
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


