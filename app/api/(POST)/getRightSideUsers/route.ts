import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    const data = await request.json();
    console.log(data); 
    
    const user = await sql `SELECT username,fullname,profile_picture FROM Users WHERE email != ${data.email} LIMIT 3`;

    console.log('request made');
    return NextResponse.json({result:true,data:user});
}