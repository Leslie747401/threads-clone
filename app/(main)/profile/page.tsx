'use client'

import { useState , useEffect } from "react";
import ProfileThread from "@/components/ProfileThread";
import ProfileReplies from "@/components/ProfileReplies";
import { ShareDialog } from "@/components/ShareDialog";
import { ShareDrawer } from "@/components/ShareDrawer";
import { useMediaQuery } from "react-responsive";
import { useSession } from "@clerk/nextjs";
import axios from "axios";
import { ProfileImageDialog } from "@/components/ProfileImageDialog";
import { EditDrawer } from "@/components/EditDrawer";
import { EditDialog } from "@/components/EditDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import { setBio, setFullname, setProfilePicture, setUsername } from "@/app/Redux/States/ProfileState/ProfileSlice";
import Skeleton from "react-loading-skeleton";

export default function Profile() {

  const [activeTab,setActiveTab] = useState('Threads');
  const isMobile = useMediaQuery({ maxWidth : 640 });
  const session_data = useSession();
  const [numberOfThreads,setNumberOfThreads] = useState();
  const [numberOfFollowers,setNumberOfFollowers] = useState();
  const [numberOfFollowing,setNumberOfFollowing] = useState();
  const username = useSelector((state : RootState) => state.profileData.username);
  const fullname = useSelector((state : RootState) => state.profileData.fullname);
  const bio = useSelector((state : RootState) => state.profileData.bio);
  const dispatch = useDispatch();
  const [skeletonLoading,setSkeletonLoading] = useState(true);

  useEffect(() => {

    // It gets the profile data based on the email id
    async function getUserInfo(){
      const response = await axios.post('/api/getProfileData',{
        email : session_data.session?.user.emailAddresses[0].emailAddress
      });

      if(response){

        setSkeletonLoading(false);

        dispatch(setUsername(response.data.user[0].username));
        dispatch(setFullname(response.data.user[0].fullname));
        dispatch(setProfilePicture(response.data.user[0].profile_picture));
        dispatch(setBio(response.data.user[0].bio));
  
        setNumberOfThreads(response.data.thread[0].count); 
        setNumberOfFollowers(response.data.followers[0].count); 
        setNumberOfFollowing(response.data.following[0].count); 
      }
    }

    // only if the session data is available, this function will be called.
    if(session_data.session){
      getUserInfo();
    }
    
  },[session_data.session])

  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <div className="flex justify-between items-center mb-3 mx-5">

        {skeletonLoading ? <Skeleton width={84} height={84} circle/> : <ProfileImageDialog/>}

        <div className="w-[75%] flex justify-between">
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{skeletonLoading? <Skeleton width={25} height={25}/> : numberOfThreads}</p>           {/* 916 */}
            <p className="text-sm">Threads</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{skeletonLoading? <Skeleton width={25} height={25}/> :  numberOfFollowers}</p>         {/* 165 */}
            <p className="text-sm">Followers</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{skeletonLoading? <Skeleton width={25} height={25}/> : numberOfFollowing}</p>         {/* 303 */}
            <p className="text-sm">Following</p>
          </div>
        </div>

      </div>

      <div className="flex gap-2 items-center mb-1 mx-5">
        <p className="font-medium mb-[2px]">{skeletonLoading? <Skeleton width={100} height={20}/> :  fullname}</p>      {/* Leslie Dsilva */}
        <p className="max-w-fit text-[12px] text-gray-600 bg-gray-200 dark:!text-gray-300 dark:bg-gray-600 p-[2px] px-2 rounded-xl">@{skeletonLoading? <Skeleton width={100} height={10}/> :  username}</p>    {/* @lesliedsilva7744 */}
      </div>

      <div className="mb-6 mx-5">
        {skeletonLoading? <Skeleton count={2} width={200} height={20}/> : <p className="text-sm leading-[23px]" dangerouslySetInnerHTML={{ __html : bio }}></p>}
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
