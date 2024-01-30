import db from "@/utils/PostgresSQL";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){
    const data = await request.json();
    console.log("cuurent username " + data.username);
    const user = await db.query('SELECT username FROM Users WHERE username = $1',[data.username]);
    console.log('current user in the db : ' + user);
    return NextResponse.json({success:true,data:user.rows});
}