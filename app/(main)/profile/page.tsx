'use client'

import { useEffect, useState } from "react";
import ProfileThread from "@/components/ProfileThread";
import ProfileReplies from "@/components/ProfileReplies";
import { ShareDialog } from "@/components/ShareDialog";
import { ShareDrawer } from "@/components/ShareDrawer";
import { useMediaQuery } from "react-responsive";
import { ProfileImageDialog } from "@/components/ProfileImageDialog";
import { EditDrawer } from "@/components/EditDrawer";
import { EditDialog } from "@/components/EditDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Skeleton from "react-loading-skeleton";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import axios from "axios";
import Loader from "@/components/Loader";
import { useSession } from "@clerk/nextjs";
import { setBio, setFullname, setNumberOfFollowers, setNumberOfFollowing, setNumberOfThreads, setProfilePicture, setUsername, setprofileSkeletonLoading } from "@/app/Redux/States/ProfileState/ProfileSlice";
import { setNewBio, setNewFullname, setNewProfilePicture } from "@/app/Redux/States/EditProfileState/EditProfileSlice";
import Image from "next/image";
import moment from "moment";

interface profileThread {
  thread_text : string;
  thread_image : string;
  created_at : string;
  like_count : Number;
  reply_count : string;
  thread_id : Number;
  commentprofilepicture1 : string;
  commentprofilepicture2 : string;
  commentprofilepicture3 : string;
}

interface profileComment {
  thread_id : Number;
  comment : string;
  commentuser: string;
  commentuserprofilepicuture : string;
  created_at : string
}


export default function Profile() {

  const [activeTab,setActiveTab] = useState('Threads');
  const isMobile = useMediaQuery({ maxWidth : 640 });
  const username = useSelector((state : RootState) => state.profileData.username);
  const fullname = useSelector((state : RootState) => state.profileData.fullname);
  const bio = useSelector((state : RootState) => state.profileData.bio);
  const numberOfThreads = useSelector((state : RootState) => state.profileData.numberOfThreads);
  const numberOfFollowers = useSelector((state : RootState) => state.profileData.numberOfFollowers);
  const numberOfFollowing = useSelector((state : RootState) => state.profileData.numberOfFollowing);
  const profileSkeletonLoading = useSelector((state : RootState) => state.profileData.profileSkeletonLoading);
  const profilePicture = useSelector((state : RootState) => state.profileData.profilePicture);
  const [getprofileThreads,setGetProfileThreads] = useState<profileThread[]>();
  const [getProfileComments,setGetProfileComments] = useState<profileComment[]>([]);
  const [loading1,setLoading1] = useState(true);
  const [loading2,setLoading2] = useState(true);
  const session_data = useSession();
  const dispatch = useDispatch();


  // It is used to fetch profile data.
  useEffect(() => {

    // It gets the profile data based on the email id
    async function getUserInfo(){
      const response = await axios.post('/api/getProfileData',{
        email : session_data.session?.user.emailAddresses[0].emailAddress
      });

      if(response){

        dispatch(setprofileSkeletonLoading(false));

        // We set both new and current profile data with the same data as before we make any changes to the current profile data the new data will be same as the current data. 

        dispatch(setUsername(response.data.user[0].username));
        dispatch(setFullname(response.data.user[0].fullname));
        dispatch(setProfilePicture(response.data.user[0].profile_picture));
        dispatch(setBio(response.data.user[0].bio));

        dispatch(setNewFullname(response.data.user[0].fullname));
        dispatch(setNewProfilePicture(response.data.user[0].profile_picture));
        dispatch(setNewBio(response.data.user[0].bio));
  
        dispatch(setNumberOfThreads(response.data.thread[0].count)); 
        dispatch(setNumberOfFollowers(response.data.followers[0].count)); 
        dispatch(setNumberOfFollowing(response.data.following[0].count)); 
      }
    }

    // only if the session data is available, this function will be called.
    if(session_data.session){
      getUserInfo();
    }
    
  },[session_data.session,numberOfThreads,numberOfFollowers,numberOfFollowing]);

  useEffect(()=>{
    async function getProfileThreads(){
      const response = await axios.post('/api/getProfileThreads',{
        username : username
      });
      
      if(response){
        setLoading1(false);
        setGetProfileThreads(response.data.threads.rows);
      }
    }

    if(username){
      getProfileThreads();
    }

  },[]);

  useEffect(() => {
    async function getProfileComments(){
      const response = await axios.post('/api/getProfileComments',{
        username : username
      });
      
      if(response){
        setLoading2(false);
        setGetProfileComments(response.data.data.rows);
        console.log(response.data.data.rows);
        
      }
    }

    if(username){
      getProfileComments();
    }

  },[]);


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

      <div className="w-full sm:w-[94%] flex justify-between sm:mx-auto">
        
        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Threads' ? 'border-b-black text-black dark:border-b-white dark:text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('Threads')}>Threads</p>

        <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer ${activeTab === 'Replies' ? 'border-b-black text-black dark:border-b-white dark:text-white' : 'text-gray-400'}`} onClick={() => setActiveTab('Replies')}>Replies</p>

      </div>

      {
        loading1 ? 
        
          <div className="w-full flex justify-center mt-40">
            <Loader/>
          </div>
        
        :
          ( activeTab === 'Threads' &&
            getprofileThreads && getprofileThreads.map((thread : profileThread)=>(
              <ProfileThread
                id={thread.thread_id}
                key={username}
                username={username}
                profilePicture={profilePicture}
                text={thread.thread_text}
                image={thread.thread_image}
                time={thread.created_at}
                likeCount={thread.like_count}
                replyCount={thread.reply_count}
                commentprofilepicture1={thread.commentprofilepicture1}
                commentprofilepicture2={thread.commentprofilepicture2}
                commentprofilepicture3={thread.commentprofilepicture3}
              />
            ))
          )
      }

      {/* {
        loading2 ? 
        
          <div className="w-full flex justify-center mt-40">
            <Loader/>
          </div>
        
        : */}

          {/* ( */}
        {
            activeTab === 'Replies' &&
            getProfileComments && getProfileComments.map((c : profileComment) => (
                <ProfileReplies
                  id={c.thread_id}
                  comment={c.comment}
                  commentuser={c.commentuser}
                  commentuserprofilepicuture={c.commentuserprofilepicuture}
                  created_at={c.created_at}
                />
            ))
        }


    </div>
  )
}

