import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    
    unstable_noStore();
    const userInfo = await sql`SELECT * FROM Users WHERE username = ${data.username}`;
    const NumberOfThreads = await sql`SELECT COUNT (*) FROM Threads WHERE username = ${data.username}`;
    const NumberOfFollowers = await sql`SELECT COUNT (*) FROM Thread_Followers WHERE username = ${data.username}`;
    const NumberOfFollowing = await sql`SELECT COUNT (*) FROM Thread_Following WHERE username = ${data.username}`;
    console.log(userInfo.rows);
    return NextResponse.json({result:true,user:userInfo.rows,thread:NumberOfThreads.rows,followers:NumberOfFollowers.rows,following:NumberOfFollowing.rows});
}