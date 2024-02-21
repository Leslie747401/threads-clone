import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    
    const data = await request.json();
    console.log(data.searchUser);

    unstable_noStore();
    const user = await sql `SELECT username,fullname,profile_picture FROM Users WHERE username = ${data.searchUser}`

    return NextResponse.json({result:true,data:user});
}