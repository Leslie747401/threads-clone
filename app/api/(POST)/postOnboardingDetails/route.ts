import db from "@/utils/PostgresSQL";
import { NextResponse , NextRequest } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();

    const bioWithLineBreaks = data.bio.replace(/\n/g, '<br/>');
    
    await db.query('INSERT INTO Users (email, username , fullname, bio, profile_picture) VALUES ($1, $2, $3, $4, $5)', [data.email, data.username, data.fullname, bioWithLineBreaks, data.profile_picture]);

    return NextResponse.json({success:true});
}