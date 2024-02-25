'use client'

import Image from 'next/image'
import SearchUserFollowCard from '@/components/SearchUserFollowCard'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useSession } from '@clerk/nextjs';

interface UserData {
  username : string;
  fullname : string;
  profile_picture : string | StaticImport;  // Add other properties if needed
}

export default function Search() {

  const [searchText,setSearchText] = useState('');
  const [users,setUsers] = useState<UserData[]>();
  const [searcheduser,setSearchedUser] = useState<UserData>();
  const session_data = useSession();
  const session_email = session_data.session?.user.emailAddresses[0].emailAddress;

  // It fetches all the Users from the database. In my case, i only have 3 users in the database so im fetching them all but practically we will limit this to 5-8 users only.
  useEffect(()=>{
    async function allUsers(){
      const response = await axios.post('/api/allUsers',{
        email : session_email
      });
      
      setUsers(response.data.data.rows);
    }

      allUsers();

  },[])


  // it fetches the user based on the search input provided by the user
  useEffect(()=>{

    async function searchUser(){
      const response = await axios.post('/api/searchUser',{
        searchUser : searchText
      });
      console.log(response.data.data.rows[0]);
      setSearchedUser(response.data.data.rows[0])
    }

    if(searchText){
      searchUser();
    }

  },[searchText])
 

  return (
    <div className="sm:w-[60%] sm:mx-auto lg:w-[60%] xl:w-[35%] pt-[74px] mx-5 sm:pt-12 pb-12">
      
      <div className='flex gap-4 items-center px-4 py-3 w-full bg-gray-50 dark:bg-[#0c0c0e] border border-gray-300 dark:border dark:border-[#373737] rounded-2xl mb-10'>

          <Image
            src='/assets/images/searchbar-icon.png'
            width={16}
            height={16}
            alt='searchbar-icon'
            className='ml-1'
          />
        
          <input type="text" placeholder='Search' className='w-full bg-gray-50 dark:bg-[#0c0c0e] outline-none h-[25px] sm:h-[36px] placeholder:text-[#9a9a9a] placeholder:text-base' onChange={(e)=> setSearchText(e.target.value)} value={searchText}/>
      
      </div>

      {/* All users (in my case 3 users) are displayed when the search field is empty and it is removed when the user starts typing to search for a specific user  */}
      {
        !searchText && users && users.map((user : UserData)=>(
          <SearchUserFollowCard
            key={user.username}
            image={user.profile_picture}
            fullname={user.fullname}
            username={user.username}
          />
        ))
      }
    
      {/* It displays the user that is searched */}
      {
        searchText && searcheduser && 
          <SearchUserFollowCard
            key={searcheduser.username}
            image={searcheduser.profile_picture}
            fullname={searcheduser.fullname}
            username={searcheduser.username}
          />
      }

    </div>
  )
}
