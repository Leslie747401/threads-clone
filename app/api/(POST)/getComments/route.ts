import { sql } from "@vercel/postgres";
import moment from "moment";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log(data);

    const comments = await sql `SELECT comment, commentUser, commentUserProfilePicuture, created_at FROM Comments WHERE thread_id = ${data.id}`

    unstable_noStore();
    return NextResponse.json({result:true,data:comments});
}