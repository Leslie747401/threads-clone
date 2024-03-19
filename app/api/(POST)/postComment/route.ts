import { sql } from "@vercel/postgres";
import moment from "moment";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log(data);

    const date_and_time = moment().format();

    const check_comments = await sql `SELECT COUNT (*) FROM Comments WHERE thread_id = ${data.threadId}`
    const check_number_of_comments = check_comments.rows[0].count;

    if(check_number_of_comments === '0'){

        unstable_noStore();
        const response1 = await sql`INSERT INTO Comments (comment, commentUser, commentUserProfilePicuture, threadAuthor, thread_id, created_at) VALUES(${data.comment},${data.commentUser},${data.commentUserProfilePicuture},${data.threadAuthor},${data.threadId},${date_and_time})`;

        if(response1){
            const response2 =  await sql `UPDATE Threads SET commentprofilepicture1 = ${data.commentUserProfilePicuture} WHERE thread_id = ${data.threadId}`;

            if(response2){
                // Get the count of number of comments.
                const comments = await sql `SELECT COUNT (*) FROM Comments WHERE thread_id = ${data.threadId}`
                const number_of_comments = comments.rows[0].count;

                // Update the number of comments of a thread.
                await sql `UPDATE Threads SET reply_count = ${number_of_comments} WHERE thread_id = ${data.threadId}`;

                return NextResponse.json({result:true,commentsCount:number_of_comments});
            }
        }
    }

    if(check_number_of_comments === '1'){

        unstable_noStore();
        const response3 = await sql `INSERT INTO Comments (comment, commentUser, commentUserProfilePicuture, threadAuthor, thread_id, created_at) VALUES(${data.comment},${data.commentUser},${data.commentUserProfilePicuture},${data.threadAuthor},${data.threadId},${date_and_time})`;

        if(response3){
            const response4 = await sql `UPDATE Threads SET commentprofilepicture2 = ${data.commentUserProfilePicuture} WHERE thread_id = ${data.threadId}`;

            if(response4){
                // Get the count of number of comments.
                const comments = await sql `SELECT COUNT (*) FROM Comments WHERE thread_id = ${data.threadId}`
                const number_of_comments = comments.rows[0].count;

                // Update the number of comments of a thread.
                await sql `UPDATE Threads SET reply_count = ${number_of_comments} WHERE thread_id = ${data.threadId}`;

                return NextResponse.json({result:true,commentsCount:number_of_comments});
            }
        }
    }

    if(check_number_of_comments === '2'){

        unstable_noStore();
        const response5 = await sql `INSERT INTO Comments (comment, commentUser, commentUserProfilePicuture, threadAuthor, thread_id, created_at) VALUES(${data.comment},${data.commentUser},${data.commentUserProfilePicuture},${data.threadAuthor},${data.threadId},${date_and_time})`;

        if(response5){
            const response6 = await sql `UPDATE Threads SET commentprofilepicture3 = ${data.commentUserProfilePicuture} WHERE thread_id = ${data.threadId}`;

            if(response6){
                // Get the count of number of comments.
                const comments = await sql `SELECT COUNT (*) FROM Comments WHERE thread_id = ${data.threadId}`
                const number_of_comments = comments.rows[0].count;

                // Update the number of comments of a thread.
                await sql `UPDATE Threads SET reply_count = ${number_of_comments} WHERE thread_id = ${data.threadId}`;
                
                return NextResponse.json({result:true,commentsCount:number_of_comments});
            }
        }
    }
}