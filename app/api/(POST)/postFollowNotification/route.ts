import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextResponse , NextRequest } from "next/server";
import moment from "moment";

export async function POST(request : NextRequest){

    const data = await request.json();
    const date_and_time = moment().format();
    console.log(data);
    
    unstable_noStore();
    await sql `INSERT INTO Activity (username, activity_username, activity_image, message, created_at, type) VALUES(${data.username},${data.activity_username},${data.activity_image},${data.message},${date_and_time},${data.type})`;

    return NextResponse.json({success:true});
}