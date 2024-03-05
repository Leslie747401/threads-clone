import { sql } from "@vercel/postgres";
import moment from "moment";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log(data);
    const date_and_time = moment().format();
    
    unstable_noStore();
    await sql`INSERT INTO Thread_Followers (username,follower_username,created_at) VALUES (${data.usernameOfTheUserYouWantToFollow},${data.currentUser},${date_and_time})`;
    await sql`INSERT INTO Thread_Following (username,following_username,created_at) VALUES (${data.currentUser},${data.usernameOfTheUserYouWantToFollow},${date_and_time})`;
    const current_followers = await sql`SELECT COUNT (*) FROM Thread_Followers WHERE username = ${data.usernameOfTheUserYouWantToFollow}`;
    const current_following = await sql`SELECT COUNT (*) FROM Thread_Following WHERE username = ${data.username}`;

    return NextResponse.json({result:true,updatedFollowers:current_followers,updatedFollowing:current_following});
}