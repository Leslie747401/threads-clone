import db from "@/utils/PostgresSQL";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){

    const data = await request.json();
    
    const user = await db.query('SELECT username FROM Users WHERE username = $1',[data.username]);

    return NextResponse.json({success:true,data:user.rows});
}