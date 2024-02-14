// import db from "@/utils/PostgresSQL";
// import { NextRequest, NextResponse } from "next/server";


// export async function POST(request : NextRequest){

//     const data = await request.json();
    
//     const user = await db.query('SELECT username FROM Users WHERE username = $1',[data.username]);

//     return NextResponse.json({success:true,data:user.rows});
// }


import { sql } from '@vercel/postgres'
import { unstable_noStore } from 'next/cache';
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){

    const data = await request.json();
    
    unstable_noStore();
    const user = await sql `SELECT username FROM Users WHERE username = ${data.username}`;

    return NextResponse.json({success:true,data:user.rows});
}