import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {

    const data = await request.json();
    console.log(data);

    const bioWithLineBreaks = data.bio.replace(/\n/g, '<br/>');

    unstable_noStore();
    await sql `UPDATE Users SET fullname = ${data.fullname} , bio = ${bioWithLineBreaks} , profile_picture = ${data.image} WHERE username = ${data.currentUser}`;

    return NextResponse.json({result:true});
}