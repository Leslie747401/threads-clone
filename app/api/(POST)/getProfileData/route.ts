// import db from "@/utils/PostgresSQL";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request : NextRequest){

//     const data = await request.json();
    
//     const userInfo = await db.query('SELECT * FROM Users WHERE email = $1',[data.email]);
//     const NumberOfThreads = await db.query('SELECT COUNT (*) FROM Threads WHERE email = $1',[data.email])
//     const NumberOfFollowers = await db.query('SELECT COUNT (*) FROM Thread_Followers WHERE email = $1',[data.email])
//     const NumberOfFollowing = await db.query('SELECT COUNT (*) FROM Thread_Following WHERE email = $1',[data.email])
//     console.log(userInfo.rows);
//     return NextResponse.json({result:true,user:userInfo.rows,thread:NumberOfThreads.rows,followers:NumberOfFollowers.rows,following:NumberOfFollowing.rows});
// }


import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    
    unstable_noStore();
    const userInfo = await sql`SELECT * FROM Users WHERE email = ${data.email}`;
    const NumberOfThreads = await sql`SELECT COUNT (*) FROM Threads WHERE email = ${data.email}`;
    const NumberOfFollowers = await sql`SELECT COUNT (*) FROM Thread_Followers WHERE email = ${data.email}`;
    const NumberOfFollowing = await sql`SELECT COUNT (*) FROM Thread_Following WHERE email = ${data.email}`;
    console.log(userInfo.rows);
    return NextResponse.json({result:true,user:userInfo.rows,thread:NumberOfThreads.rows,followers:NumberOfFollowers.rows,following:NumberOfFollowing.rows});
}