import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log('Profile data fetched!');
    
    
    unstable_noStore();
    const userInfo = await sql`SELECT * FROM Users WHERE email = ${data.email}`;
    const NumberOfThreads = await sql`SELECT COUNT (*) FROM Threads WHERE username = ${userInfo.rows[0].username}`;
    const NumberOfFollowers = await sql`SELECT COUNT (*) FROM Thread_Followers WHERE username = ${userInfo.rows[0].username}`;
    const NumberOfFollowing = await sql`SELECT COUNT (*) FROM Thread_Following WHERE username = ${userInfo.rows[0].username}`;
    console.log(userInfo.rows[0].username);
    return NextResponse.json({result:true,user:userInfo.rows,thread:NumberOfThreads.rows,followers:NumberOfFollowers.rows,following:NumberOfFollowing.rows});
}