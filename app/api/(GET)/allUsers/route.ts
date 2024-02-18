import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){

    const data = await request.json();
    
    const user = await sql `SELECT username,fullname,profile_picture FROM Users WHERE email != ${data.email}`;

    return NextResponse.json({result:true,data:user});
}