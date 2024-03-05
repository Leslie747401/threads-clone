import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){

    const data = await request.json();
    console.log(data);
    
    unstable_noStore();
    await sql`DELETE FROM Thread_Followers WHERE username=${data.usernameOfTheUserYouWantToUnFollow} and follower_username=${data.currentUser}`;
    await sql`DELETE FROM Thread_Following WHERE username=${data.currentUser} and following_username=${data.usernameOfTheUserYouWantToUnFollow}`;
    const current_followers = await sql`SELECT COUNT (*) FROM Thread_Followers WHERE username = ${data.usernameOfTheUserYouWantToUnFollow}`;
    const current_following = await sql`SELECT COUNT (*) FROM Thread_Following WHERE username = ${data.username}`;

    return NextResponse.json({result:true,updatedFollowers:current_followers,updatedFollowing:current_following});
}