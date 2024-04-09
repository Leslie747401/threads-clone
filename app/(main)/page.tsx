'use client'

import HomeThread from "@/components/HomeThread";
import HomeTabs from "@/components/Home-tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import { setBio, setFullname, setHomeSkeletonLoading, setNumberOfFollowers, setNumberOfFollowing, setNumberOfThreads, setProfilePicture, setUsername, setprofileSkeletonLoading } from "../Redux/States/ProfileState/ProfileSlice";
import { setNewBio, setNewFullname, setNewProfilePicture } from "../Redux/States/EditProfileState/EditProfileSlice";
import { RootState } from "../Redux/store";
import LoadMore from "@/components/LoadMore";

export default async function Home() {

  const session_data = useSession();
  const dispatch = useDispatch();
  const username = useSelector((state : RootState) => state.profileData.username);
  const [getHomeThreads,setGetHomeThreads] = useState<homeThread[]>();
  
  interface homeThread {
    thread_id : number;
    username : string;
    thread_profilepicture : string;
    thread_text : string;
    thread_image : string;
    created_at : string
    like_count : Number;
    reply_count : string;
    commentprofilepicture1 : string;
    commentprofilepicture2 : string;
    commentprofilepicture3 : string;
  }

  // It is used to fetch profile data.
  useEffect(() => {

    // It gets the profile data based on the email id
    async function getUserInfo(){
      const response = await axios.post('/api/getProfileData',{
        email : session_data.session?.user.emailAddresses[0].emailAddress
      });

      if(response){

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

        dispatch(setprofileSkeletonLoading(false));
        dispatch(setHomeSkeletonLoading(false));
      }
    }

    console.log(session_data.session);
    // only if the session data is available, this function will be called.
    if(session_data.session){
      getUserInfo();
    }
    
  },[session_data.session]);
  
  useEffect(() => {
    async function getHomeThread(){
      const response = await axios.post('/api/getHomeThreads',{
        username : username
      });
        
      if(response){
          setGetHomeThreads(response.data.threads.rows);
          console.log("Home Threads : ", response.data.threads.rows);              
      }
    }

    if(username!=''){
      getHomeThread();
    }
    
  },[username]);
  
  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">

      {
        getHomeThreads && <HomeTabs/>
      }

      {
        getHomeThreads && getHomeThreads.map((thread : homeThread)=>(
          <HomeThread
            id={thread.thread_id}
            key={thread.created_at}
            threadUsername={thread.username}
            profilePicture={thread.thread_profilepicture}
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
      }

      {
        getHomeThreads && <LoadMore/>
      }

    </div>
  );
}