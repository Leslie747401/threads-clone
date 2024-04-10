import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    
    unstable_noStore();
    
    // Here, we check whether the thread is liked or not.
    const likeRelationship = await sql `SELECT FROM Likes WHERE thread_id = ${data.threadId} and personWhoLiked = ${data.currentUser}`;

    // Here, likeRelationship.rowCount will be 1 if there exists a relation beteween the thread_id and personWhoLiked indicating that the post is liked. Else, it will be 0 indicating that the post is not liked.
    return NextResponse.json({result:true,likeExists:likeRelationship.rowCount});
}