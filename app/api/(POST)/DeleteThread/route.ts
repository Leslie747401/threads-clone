import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {

    const data = await request.json();
    console.log(data);

    unstable_noStore();

    // First, we will have to delete all the comments associated with the thread and then delete the thread. Otherwise, we will get an error because thread_id is an foreign key in comments. so we cant delete a thread_id without deleting all the comments associated with it.
     
    const response = await sql `DELETE FROM comments WHERE thread_id = ${data.id}`
    if(response){
        await sql `DELETE FROM threads WHERE thread_id = ${data.id}`;
    }

    return NextResponse.json({result:true});
}