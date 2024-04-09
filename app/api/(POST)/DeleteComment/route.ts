import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {

    const data = await request.json();
    console.log(data);

    unstable_noStore();
    const response = await sql `DELETE FROM comments WHERE commentid = ${data.commentId}`;
    if(response){
        const check_comments = await sql `SELECT COUNT (*) FROM Comments WHERE thread_id = ${data.threadId}`
        const number_of_comments = check_comments.rows[0].count;
        await sql `UPDATE Threads SET reply_count = ${number_of_comments} WHERE thread_id = ${data.threadId}`;
    }

    return NextResponse.json({result:true});
}