'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import ProfileThread from "@/components/ProfileThread";
import ProfileReplies from "@/components/ProfileReplies";
import { ShareDialog } from "@/components/ShareDialog";
import { ShareDrawer } from "@/components/ShareDrawer";
import { useMediaQuery } from "react-responsive";

export default function Profile() {

  const [activeTab,setActiveTab] = useState('Threads');
  const isMobile = useMediaQuery({ maxWidth : 640 });

  function changeActiveTab(tab : any){
      setActiveTab(tab);
  }

  return (
    <div className="sm:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <div className="flex justify-between items-center mb-3 mx-5">

        <div className="w-[77px] h-[77px] sm:w-[84px] sm:h-[84px] relative">
          <Image
            src='/assets/images/user.png'
            fill
            alt="profile-image"
            className="object-cover"
          />
        </div>

        <div className="w-[75%] flex justify-between">
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">916</p>
            <p className="text-sm">Threads</p>
          </div>

          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">165K</p>
            <p className="text-sm">Followers</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">303</p>
            <p className="text-sm">Following</p>
          </div>
        </div>

      </div>

      <div className="flex gap-2 items-center mb-1 mx-5">
        <p className="font-medium mb-[2px]">Leslie Dsilva</p>
        <p className="max-w-fit text-[12px] text-gray-600 bg-gray-200 dark:!text-gray-300 dark:bg-gray-600 p-[2px] px-2 rounded-xl">@lesliedsilva7744</p>
      </div>

      <div className="mb-6 mx-5">
        <p className="text-sm mb-[1px]">Living a quiet, beautiful life.</p>
        <p className="text-sm">Web Developer</p>
      </div>

      <div className='flex justify-between mb-8 mx-5'>
        
        <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button>

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
