import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log('Home Threads Fetched!');
    
    unstable_noStore();
    const Threads = await sql`SELECT * FROM Threads WHERE username != ${data.username} LIMIT 3`;
    // console.log(Threads.rows);

    return NextResponse.json({result:true,threads:Threads});
}