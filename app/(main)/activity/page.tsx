'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ActivityThread from '@/components/ActivityThread';
import ActivityFollow from '@/components/ActivityFollow';
import ActivityReplies from '@/components/ActivityReplies';
// import { useEventListener } from '@/liveblocks.config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import axios from 'axios';
import { setFollows } from '@/app/Redux/States/ActivityState/ActivitySlice';

interface Follows {
  message: string;
  image : string;
  from : string;
}

interface Replies {
  message: string;
  image : string;
}

export default function Activity() {

  const [activeButton, setActiveButton] = useState('All');
  const username = useSelector((state:RootState) => state.profileData.username);
  const [allFollows, setAllFollows] = useState<Follows[]>([]); // Specify the type
  const [allReplies, setAllReplies] = useState<Replies[]>([]); // Specify the type
  const [seen,setSeen] = useState(true);
  const [alreadySeen,setAlreadySeen] = useState(0);
  const allFollowsArray = useSelector((state:RootState) => state.activity.allFollows);
  console.log("AllFollowsArray : " + allFollowsArray);
  const dispatch = useDispatch();

  const changeColor = (button : any) => {
    setActiveButton(button);
  };

  // ------------LIVEBLOCKS----------
  // useEventListener(({ event }) => {
                        
  //   if (event.type === 'Follows' && event.to === username) {

  //     const {from,to,message,image} = event;
  //     console.log("Event :");
  //     console.log("From : " + from);
  //     console.log("to : " + to);
  //     console.log("Message : " + message);
 
  //     setAllFollows((prev: Follows[]) => [
  //       ...prev,
  //       { message, image, from }
  //     ]);

  //     setSeen(false);
  //   }
    
  // });

  useEffect(()=> {

    async function getFollowNotification(){
      const response = await axios.post('/api/getFollowNotification',{
        username : username
      });

      // Only if the number of people that have followed has gone up only then we will update our follow array. If it remains the same then we dont have to store it in the array.
      if(response.data.data.rows.length != allFollowsArray.length){
        console.log(response.data.data.rows);
        response.data.data.rows.map((m:any)=>(
          dispatch(setFollows(m))
        ))
      }
 
    }

    if(username!=''){
      getFollowNotification();
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
          activeButton === 'All' &&

          (
            <div>
              {
                allFollowsArray.map((f)=>(
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
          activeButton === 'Follows' &&

          (
            <div>
              {
                allFollowsArray.map((f)=>(
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
          activeButton === 'Replies' &&

          <>
            <ActivityReplies/>
            <ActivityReplies/>
            <ActivityReplies/>
            <ActivityReplies/>
            <ActivityReplies/>
          </>    
        }
          
      </div>
  );
}
