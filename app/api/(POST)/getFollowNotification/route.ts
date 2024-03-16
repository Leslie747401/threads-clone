import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextResponse , NextRequest } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log(data);
    
    unstable_noStore();
    const followData = await sql `SELECT * FROM Activity WHERE username = ${data.username}`;

    return NextResponse.json({success:true,data:followData});
}