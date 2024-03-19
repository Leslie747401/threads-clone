import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    
    unstable_noStore();
    const comments = await sql `SELECT comment, commentUser, commentUserProfilePicuture, created_at, thread_id FROM Comments WHERE commentUser = ${data.username}`

    return NextResponse.json({result:true,data:comments});
}