import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextResponse , NextRequest } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    
    unstable_noStore();
    
    return NextResponse.json({success:true});
}