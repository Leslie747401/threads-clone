import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    
    const data = await request.json();
    console.log(data.searchUser);

    const user = await sql `SELECT username,fullname,profile_picture FROM Users WHERE username = ${data.searchUser}`

    return NextResponse.json({result:true,data:user});
}