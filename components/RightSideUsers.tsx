'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserFollowCard from './UserFollowCard';
import { useSession } from '@clerk/nextjs';
import Link from 'next/link';

interface UserData {
    username : string;
    fullname : string;
    profile_picture : string;
}


export default function RightSideUsers() {

    const session_data = useSession();
    const useremail = session_data.session?.user.emailAddresses[0].emailAddress;
    const [users,setUsers] = useState<UserData[]>();   

    useEffect(()=>{
        async function someUsers(){
        const response = await axios.post('/api/getRightSideUsers',{
            email : useremail
        });
        
        console.log("Some Users : ", response.data.data);
        setUsers(response.data.data.rows);
        }

        if(useremail){
            someUsers();
        }

    },[useremail]);

    return (
            <div className='flex flex-col gap-8 mb-10'>

                {
                    users && users.map((user : UserData)=>(
                    <Link href={`/profile/${user.username}`}>
                        <UserFollowCard
                            key={user.username}
                            image={user.profile_picture}
                            fullname={user.fullname}
                            username={user.username}
                        />
                    </Link>
                    ))
                }

            </div>
    )
}
