'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ActivityFollow from '@/components/ActivityFollow';
import ActivityReplies from '@/components/ActivityReplies';
// import { useEventListener } from '@/liveblocks.config';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import axios from 'axios';
interface Follows {
  activity_id : string;
  activity_username : string;
  activity_image : string;
  message: string;
  created_at : string;
  username : string;
}

interface Replies {
  activity_id : string;
  activity_username : string;
  activity_image : string;
  message: string;
  created_at : string;
  username : string;
  thread_id : string;
}

export default function Activity() {

  const [activeButton, setActiveButton] = useState('All');
  const username = useSelector((state:RootState) => state.profileData.username);
  const [allFollows, setAllFollows] = useState<Follows[]>([]);
  const [allReplies, setAllReplies] = useState<Replies[]>([]);

  const changeColor = (button : any) => {
    setActiveButton(button);
  };

  useEffect(()=> {

    async function getFollowNotification(){
      const response = await axios.post('/api/getFollowNotification',{
        username : username
      });

      // Only if the number of people that have followed has gone up only then we will update our follow array. If it remains the same then we dont have to store it in the array.
      if(response.data.data.rows.length != allFollows.length){
        console.log(response.data.data.rows);
        setAllFollows((prev) => [...prev,...response.data.data.rows]);
      }
 
    }

    if(username!=''){
      getFollowNotification();
    }

  },[username]);

  useEffect(()=> {

    async function getCommentNotification(){
      const response = await axios.post('/api/getCommentNotification',{
        username : username
      });

      // Only if the number of people that have followed has gone up only then we will update our follow array. If it remains the same then we dont have to store it in the array.
      if(response.data.data.rows.length != allReplies.length){
        console.log(response.data.data.rows);
        setAllReplies((prev) => [...prev,...response.data.data.rows])
      }
 
    }

    if(username!=''){
      getCommentNotification();
    }

  },[username]);

  return (

      <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">
          
        <div className='flex justify-between mx-5 mb-10'>
            
          {/* Here, we have made dark:!text-black because it was clashing with other css !text-black is the same as !important in css . This gives the above css utmost importance */}
          <Button variant='outline' className={`w-[31%] rounded-xl border ${activeButton === 'All' && 'bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:!text-black dark:hover:bg-white dark:hover:text-black '} border-[#d4d4d4] dark:border dark:border-[#373737]`} onClick={() => changeColor('All')}>All</Button>

          <Button variant='outline' className={`w-[31%] rounded-xl border ${activeButton === 'Follows' && 'bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:!text-black dark:hover:bg-white dark:hover:text-black '} border-[#d4d4d4] dark:border dark:border-[#373737]`} onClick={() => changeColor('Follows')}>Follows</Button>

          <Button variant='outline' className={`w-[31%] rounded-xl border ${activeButton === 'Replies' && 'bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:!text-black dark:hover:bg-white dark:hover:text-black '} border-[#d4d4d4] dark:border dark:border-[#373737]`} onClick={() => changeColor('Replies')}>Replies</Button>
          
        </div>

        {
          activeButton === 'All' && (allFollows.length != 0 || allReplies.length != 0) && 

          (
            <>
              <div>
                {
                  allFollows.map((f : Follows)=>(
                    <ActivityFollow
                      key={f.created_at}
                      username={f.activity_username}
                      image={f.activity_image}
                      message={f.message}
                      time={f.created_at}
                    />
                  ))
                }
              </div>
              <div>
                {
                  allReplies.map((r : Replies)=>(
                    <ActivityReplies
                      key={r.created_at}
                      username={r.activity_username}
                      image={r.activity_image}
                      message={r.message}
                      time={r.created_at}
                      thread_id={r.thread_id}
                    />
                  ))
                }
              </div>
            </>
          )
          
        }

        {
          activeButton === 'Follows' && allFollows.length != 0 && 
          
          (
            <div>
              {
                allFollows.map((f : Follows)=>(
                  <ActivityFollow
                    key={f.created_at}
                    username={f.activity_username}
                    image={f.activity_image}
                    message={f.message}
                    time={f.created_at}
                  />
                ))
              }
            </div>
          )
        }

        {
          activeButton === 'Replies' && allReplies.length != 0 && 

          (
            <div>
              {
                allReplies.map((r : Replies)=>(
                  <ActivityReplies
                    key={r.created_at}
                    username={r.activity_username}
                    image={r.activity_image}
                    message={r.message}
                    time={r.created_at}
                    thread_id={r.thread_id}
                  />
                ))
              }
            </div>
          )
        }

        { 
          activeButton === 'All' && allFollows.length == 0 && allReplies.length == 0 && 
          
            <p className='w-full flex justify-center mt-40'>No Activity yet</p>
        }

        {
          activeButton === 'Follows' && allFollows.length == 0 &&
          
            <p className='w-full flex justify-center mt-40'>No Activity yet</p>

        }

        {
          activeButton === 'Replies' && allReplies.length == 0 &&
          
          <p className='w-full flex justify-center mt-40'>No Activity yet</p>
        }
          
      </div>
  );
}
