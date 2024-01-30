import db from "@/utils/PostgresSQL";
import { NextResponse , NextRequest } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();

    await db.query('INSERT INTO Users (fullname, username, bio, profile_pic) VALUES ($1, $2, $3, $4)', [data.fullname,data.username,data.bio,data.profile_pic]);

    return NextResponse.json({success:true});
}