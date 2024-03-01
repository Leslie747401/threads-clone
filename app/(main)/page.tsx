'use client'

import HomeThread from "@/components/HomeThread";
import HomeTabs from "@/components/Home-tabs";
import { useEffect } from "react";
import axios from "axios";
import { useSession } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setBio, setFullname, setNumberOfFollowers, setNumberOfFollowing, setNumberOfThreads, setProfilePicture, setUsername, setprofileSkeletonLoading } from "../Redux/States/ProfileState/ProfileSlice";
import { setNewBio, setNewFullname, setNewProfilePicture } from "../Redux/States/EditProfileState/EditProfileSlice";
export default async function Home() {

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
    
  },[session_data.session]);
  
  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">

      <HomeTabs/>

      <HomeThread/>
      <HomeThread/>
      <HomeThread/>
      <HomeThread/>
      <HomeThread/>
      <HomeThread/>

    </div>
  );
}