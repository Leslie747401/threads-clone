import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest,res : NextResponse){

    const data = await req.json();
    console.log(data);

    unstable_noStore();

    // const moreThreads = await sql `SELECT * FROM Threads WHERE username != ${data.username} ORDER BY thread_id DESC LIMIT 3 OFFSET ${(data.page - 1) * 3}`;
    const moreThreads = await sql `SELECT * FROM Threads WHERE username != ${data.username} LIMIT 3 OFFSET ${(data.page - 1) * 3}`;

    console.log(moreThreads);
    
    
    return NextResponse.json({success:true,data:moreThreads});
}