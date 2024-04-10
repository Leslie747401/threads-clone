import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log("Unliked Thread : ", data);
    
    unstable_noStore();
    
    // Here, we delete the relation in the database.
    const response = await sql `DELETE FROM Likes WHERE thread_id = ${data.threadId} and  personWhoLiked = ${data.currentUser}`;

    // After the relation is deleted, we execute the following statements.
    if(response){
        
        // Here, we get the number of likes on the specific thread.
        const number_of_likes = await sql `SELECT COUNT (*) FROM Likes WHERE thread_id = ${data.threadId}`
        const likeCount = number_of_likes.rows[0].count;

        // Here, we update the like_count field in threads table with the updated like count.
        await sql `UPDATE Threads SET like_count = ${likeCount} WHERE thread_id = ${data.threadId}`;

        return NextResponse.json({result:true,updatedlikes:likeCount});
    }

}