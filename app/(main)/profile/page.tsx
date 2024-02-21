'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState , useEffect } from "react";
import ProfileThread from "@/components/ProfileThread";
import ProfileReplies from "@/components/ProfileReplies";
import { ShareDialog } from "@/components/ShareDialog";
import { ShareDrawer } from "@/components/ShareDrawer";
import { useMediaQuery } from "react-responsive";
import { useSession } from "@clerk/nextjs";
import axios from "axios";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { ProfileImageDialog } from "@/components/ProfileImageDialog";
import { EditDrawer } from "@/components/EditDrawer";
import { EditDialog } from "@/components/EditDialog";

export default function Profile() {

  const [activeTab,setActiveTab] = useState('Threads');
  const isMobile = useMediaQuery({ maxWidth : 640 });
  const session_data = useSession();
  const [fullname,setFullname] = useState('');
  const [username,setUsername] = useState('');
  const [profile_picture,setProfilePicture] = useState<string | StaticImport>('');
  const [bio,setBio] = useState('');
  const [numberOfThreads,setNumberOfThreads] = useState();
  const [numberOfFollowers,setNumberOfFollowers] = useState();
  const [numberOfFollowing,setNumberOfFollowing] = useState();

  function changeActiveTab(tab : any){
      setActiveTab(tab);
  }

  useEffect(() => {

    async function getUserInfo(){
      const response = await axios.post('/api/getProfileData',{
        email : session_data.session?.user.emailAddresses[0].emailAddress
      });
      console.log(response.data.thread[0].count);
      console.log(response.data.followers[0].count);
      console.log(response.data.following[0].count);
      console.log(response.data.user[0]);
      setFullname(response.data.user[0].fullname);
      setUsername(response.data.user[0].username);
      setProfilePicture(response.data.user[0].profile_picture);
      setBio(response.data.user[0].bio);
      setNumberOfThreads(response.data.thread[0].count); 
      setNumberOfFollowers(response.data.followers[0].count); 
      setNumberOfFollowing(response.data.following[0].count); 
    }

    // only if the session data is available, this function will be called.
    if(session_data.session){
      getUserInfo();
    }
    
  },[session_data.session])

  return (
    <div className="sm:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <div className="flex justify-between items-center mb-3 mx-5">

        {/* Sending the image as prop to the dialog component */}
        <ProfileImageDialog
          imageurl={profile_picture}
        />

        <div className="w-[75%] flex justify-between">
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{numberOfThreads}</p>           {/* 916 */}
            <p className="text-sm">Threads</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{numberOfFollowers}</p>         {/* 165 */}
            <p className="text-sm">Followers</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{numberOfFollowing}</p>         {/* 303 */}
            <p className="text-sm">Following</p>
          </div>
        </div>

      </div>

      <div className="flex gap-2 items-center mb-1 mx-5">
        <p className="font-medium mb-[2px]">{fullname}</p>  {/* Leslie Dsilva */}
        <p className="max-w-fit text-[12px] text-gray-600 bg-gray-200 dark:!text-gray-300 dark:bg-gray-600 p-[2px] px-2 rounded-xl">@{username}</p>  {/* @lesliedsilva7744 */}
      </div>

      <div className="mb-6 mx-5">
        {/* <p className="text-sm mb-[1px]">Living a quiet, beautiful life.</p> */}
        {/* <p className="text-sm">Web Developer</p> */}
        <p className="text-sm leading-[23px]" dangerouslySetInnerHTML={{ __html : bio }}></p>
      </div>

      <div className='flex justify-between mb-8 mx-5'>
        
        {/* <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button> */}

        { isMobile ? 
          <EditDrawer
            editUsername={username}
            editFullname={fullname}
            editImage={profile_picture}
            editBio={bio}
            currentUsername={username} // I have to send the username of the current user so i can use it to in the WHERE conditiond of SQL query to update his details.
          /> 
          
          : 
          
          <EditDialog
            editUsername={username}
            editFullname={fullname}
            editImage={profile_picture}
            editBio={bio}
            currentUsername={username} // I have to send the username of the current user so i can use it to in the WHERE conditiond of SQL query to update his details.
          />
        
        }

        { isMobile ? <ShareDrawer/> : <ShareDialog/> }
      
      </div>

      <div className="flex justify-between sm:mx-5">
        
        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Threads' ? 'border-black text-black dark:border-white dark:text-white' : 'text-gray-400'}`} onClick={() => changeActiveTab('Threads')}>Threads</p>

        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Replies' ? 'border-black text-black dark:border-white dark:text-white' : 'text-gray-400'}`} onClick={() => changeActiveTab('Replies')}>Replies</p>

      </div>

      {
        activeTab === 'Threads' &&

        <>
          <ProfileThread/>
          <ProfileThread/>
          <ProfileThread/>
          <ProfileThread/>
          <ProfileThread/>
        </>
      }

      {
        activeTab === 'Replies' &&

        <>
          <ProfileReplies/>
          <ProfileReplies/>
          <ProfileReplies/>
          <ProfileReplies/>
          <ProfileReplies/>
        </>
      }

    </div>
  )
}
