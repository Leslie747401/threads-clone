import db from "@/utils/PostgresSQL";
import { NextResponse } from "next/server";

export async function GET(){
    const data = await db.query('SELECT * FROM real_users');
    return NextResponse.json({result:true,data:data})
}