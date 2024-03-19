import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextResponse , NextRequest } from "next/server";
import moment from "moment";

export async function POST(request : NextRequest){

    const data = await request.json();
    const date_and_time = moment().format();
    console.log(data);
    console.log(data.currentUserProfilePicture);
    
    unstable_noStore();
    await sql `INSERT INTO Threads (thread_text,thread_image,like_count,reply_count,created_at,thread_profilePicture,username) VALUES (${data.text},${data.image},${0},${'0'},${date_and_time},${data.currentUserProfilePicture},${data.currentUser})`;
    
    return NextResponse.json({success:true});
}