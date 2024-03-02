'use client'

import { useState , useEffect } from "react";
import ProfileThread from "@/components/ProfileThread";
import ProfileReplies from "@/components/ProfileReplies";
import { ShareDialog } from "@/components/ShareDialog";
import { ShareDrawer } from "@/components/ShareDrawer";
import { useMediaQuery } from "react-responsive";
import { useSession } from "@clerk/nextjs";
import axios from "axios";
import Loader from "@/components/Loader";
import Skeleton from "react-loading-skeleton";
import { ProfileImageDialog } from "@/components/ProfileImageDialog";
import { useDispatch, useSelector } from "react-redux";
import { setDynamicBio, setDynamicFullname, setDynamicNumberOfFollowers, setDynamicNumberOfFollowing, setDynamicNumberOfThreads, setDynamicProfilePicture, setDynamicUsername } from "@/app/Redux/States/DynamicUserState/DynamicUserSlice";
import { RootState } from "@/app/Redux/store";
import { UserImageDialog } from "@/components/UserImageDialog";

export default function UserProfilePage({params} : {params : {username : string}}) {

  const [activeTab,setActiveTab] = useState('Threads');
  const isMobile = useMediaQuery({ maxWidth : 640 });
  const session_data = useSession();
  const username = useSelector((state : RootState) => state.dynamicUser.username);
  const fullname = useSelector((state : RootState) => state.dynamicUser.fullname);
  const bio = useSelector((state : RootState) => state.dynamicUser.bio);
  const numberOfThreads = useSelector((state : RootState) => state.dynamicUser.numberOfThreads);
  const numberOfFollowers = useSelector((state : RootState) => state.dynamicUser.numberOfFollowers);
  const numberOfFollowing = useSelector((state : RootState) => state.dynamicUser.numberOfFollowing);
  const [skeletonLoading,setSkeletonLoading] = useState(true);
  const [loading,setLoading] = useState(false);
  const [buttontext,setButtontext] = useState('Follow');
  const dispatch = useDispatch();

  useEffect(() => {

    // it gets profile data of dynamic user based on the username
    async function getUserInfo(){
      const response = await axios.post('/api/getUserData',{
        username : params.username
      });

      if(response){
        setSkeletonLoading(false);

        // setFullname(response.data.user[0].fullname);
        // setUsername(response.data.user[0].username);
        // setBio(response.data.user[0].bio);
        // setProfilePicture(response.data.user[0].profile_picture);
  
        // setNumberOfThreads(response.data.thread[0].count); 
        // setNumberOfFollowers(response.data.followers[0].count); 
        // setNumberOfFollowing(response.data.following[0].count); 

        dispatch(setDynamicUsername(response.data.user[0].username));
        dispatch(setDynamicFullname(response.data.user[0].fullname));
        dispatch(setDynamicBio(response.data.user[0].bio));
        dispatch(setDynamicProfilePicture(response.data.user[0].profile_picture));
        
        dispatch(setDynamicNumberOfThreads(response.data.thread[0].count));
        dispatch(setDynamicNumberOfFollowers(response.data.followers[0].count));
        dispatch(setDynamicNumberOfFollowing(response.data.following[0].count));

      }
    }

    // only if the session data is available, this function will be called.
    if(session_data.session){
      getUserInfo();
    }
    
  },[session_data.session]);

  // it renders a loader after clicking the follow button and changes to following button after the entry is made in the database and vice versa.
  function handlefollow(){
    setLoading(true);
    setTimeout(()=>{
      if(buttontext=== 'Follow'){
        setLoading(false);
        setButtontext('Following');
      }
      else{
        setLoading(false);
        setButtontext('Follow');
      }
    },1500)
  }

  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <div className="flex justify-between items-center mb-3 mx-5">

        { skeletonLoading ?  <Skeleton width={84} height={84} circle/> : <UserImageDialog/> }

        <div className="w-[75%] flex justify-between">
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{skeletonLoading ? <Skeleton width={25} height={25}/> : numberOfThreads}</p>           {/* 916 */}
            <p className="text-sm">Threads</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{skeletonLoading ? <Skeleton width={25} height={25} /> : numberOfFollowers}</p>         {/* 165 */}
            <p className="text-sm">Followers</p>
          </div>
          
          <div className="w-[30%] flex flex-col gap-1 items-center">
            <p className="font-semibold">{skeletonLoading ? <Skeleton width={25} height={25}/> : numberOfFollowing  }</p>         {/* 303 */}
            <p className="text-sm">Following</p>
          </div>
        </div>

      </div>

      <div className="flex gap-2 items-center mb-1 mx-5">
      <p className="font-medium mb-[2px]">{skeletonLoading? <Skeleton width={100} height={20}/> :  fullname}</p>  {/* Leslie Dsilva */}
        <p className="max-w-fit text-[12px] text-gray-600 bg-gray-200 dark:!text-gray-300 dark:bg-gray-600 p-[2px] px-2 rounded-xl">@{skeletonLoading? <Skeleton width={100} height={10}/> :  username}</p>  {/* @lesliedsilva7744 */}
      </div>

      <div className="mb-6 mx-5">
      {skeletonLoading? <Skeleton count={2} width={200} height={20}/> : <p className="text-sm leading-[23px]" dangerouslySetInnerHTML={{ __html : bio }}></p>}
      </div>

      <div className='flex justify-between mb-8 mx-5'>

        <button className={`${buttontext === 'Follow' ? 'w-[48%] bg-black hover:bg-black dark:bg-white dark:hover:bg-white  text-white dark:text-black rounded-xl' : 'w-[48%] bg-white text-black hover:bg-white dark:bg-[#121212] dark:hover:bg-[#121212] dark:text-white rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]'} `} onClick={handlefollow} disabled={loading}>
          { loading ?
           <div  className="relative top-0 left-[45%]">
             <Loader/>
           </div>: buttontext }
        </button>

        { isMobile ? <ShareDrawer/> : <ShareDialog/> }
      
      </div>

      <div className="flex justify-between sm:mx-5">
        
        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Threads' ? 'border-black text-black dark:border-white dark:text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('Threads')}>Threads</p>

        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Replies' ? 'border-black text-black dark:border-white dark:text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('Replies')}>Replies</p>

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

