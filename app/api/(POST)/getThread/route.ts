import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,res:NextResponse){

    const data = await req.json();
    console.log(data);

    const thread = await sql `SELECT * FROM Threads WHERE thread_id = ${data.id}`
    
    return NextResponse.json({success:true,data:thread});
}