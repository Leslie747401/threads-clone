'use client'

import { useState } from "react";
import ProfileThread from "@/components/ProfileThread";
import ProfileReplies from "@/components/ProfileReplies";
import { ShareDialog } from "@/components/ShareDialog";
import { ShareDrawer } from "@/components/ShareDrawer";
import { useMediaQuery } from "react-responsive";
import { ProfileImageDialog } from "@/components/ProfileImageDialog";
import { EditDrawer } from "@/components/EditDrawer";
import { EditDialog } from "@/components/EditDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Skeleton from "react-loading-skeleton";

export default function Profile() {

  const [activeTab,setActiveTab] = useState('Threads');
  const isMobile = useMediaQuery({ maxWidth : 640 });
  const username = useSelector((state : RootState) => state.profileData.username);
  const fullname = useSelector((state : RootState) => state.profileData.fullname);
  const bio = useSelector((state : RootState) => state.profileData.bio);
  const numberOfThreads = useSelector((state : RootState) => state.profileData.numberOfThreads);
  const numberOfFollowers = useSelector((state : RootState) => state.profileData.numberOfFollowers);
  const numberOfFollowing = useSelector((state : RootState) => state.profileData.numberOfFollowing);
  const profileSkeletonLoading = useSelector((state : RootState) => state.profileData.profileSkeletonLoading)

  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <div className="flex justify-between items-center mb-3 mx-5">

        {profileSkeletonLoading ? <Skeleton width={84} height={84} circle/> : <ProfileImageDialog/>}

        <div className="w-[75%] flex justify-between">
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{profileSkeletonLoading? <Skeleton width={25} height={25}/> : numberOfThreads}</p>           {/* 916 */}
            <p className="text-sm">Threads</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{profileSkeletonLoading? <Skeleton width={25} height={25}/> :  numberOfFollowers}</p>         {/* 165 */}
            <p className="text-sm">Followers</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{profileSkeletonLoading? <Skeleton width={25} height={25}/> : numberOfFollowing}</p>         {/* 303 */}
            <p className="text-sm">Following</p>
          </div>
        </div>

      </div>

      <div className="flex gap-2 items-center mb-1 mx-5">
        <p className="font-medium mb-[2px]">{profileSkeletonLoading? <Skeleton width={100} height={20}/> :  fullname}</p>      {/* Leslie Dsilva */}
        <p className="max-w-fit text-[12px] text-gray-600 bg-gray-200 dark:!text-gray-300 dark:bg-gray-600 p-[2px] px-2 rounded-xl">@{profileSkeletonLoading? <Skeleton width={100} height={10}/> :  username}</p>    {/* @lesliedsilva7744 */}
      </div>

      <div className="mb-6 mx-5">
        {profileSkeletonLoading? <Skeleton count={2} width={200} height={20}/> : <p className="text-sm leading-[23px]" dangerouslySetInnerHTML={{ __html : bio }}></p>}
      </div>

      <div className='flex justify-between mb-8 mx-5'>

        { isMobile ? <EditDrawer/> : <EditDialog/> }

        { isMobile ? <ShareDrawer/> : <ShareDialog/> }
      
      </div>

      <div className="flex justify-between sm:mx-auto">
        
        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Threads' ? 'border-b-black text-black dark:border-b-white dark:text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('Threads')}>Threads</p>

        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Replies' ? 'border-b-black text-black dark:border-b-white dark:text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('Replies')}>Replies</p>

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
