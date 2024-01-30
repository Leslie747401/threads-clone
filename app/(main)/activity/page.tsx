'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ActivityThread from '@/components/ActivityThread';
import ActivityFollow from '@/components/ActivityFollow';
import ActivityReplies from '@/components/ActivityReplies';

export default function Activity() {

  const [activeButton, setActiveButton] = useState('Threads');

  const changeColor = (button : any) => {
    setActiveButton(button);
  };

  return (
    <div className="sm:w-[40%] pt-[74px] sm:pt-12 pb-16">
      
      <div className='flex justify-between mx-5 mb-10'>
        
        {/* Here, we have made dark:!text-black because it was clashing with other css !text-black is the same as !important in css . This gives the above css utmost importance */}
        <Button variant='outline' className={`w-[31%] rounded-xl border ${activeButton === 'Threads' && 'bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:!text-black dark:hover:bg-white dark:hover:text-black '} border-[#d4d4d4] dark:border dark:border-[#373737]`} onClick={() => changeColor('Threads')}>Threads</Button>

        <Button variant='outline' className={`w-[31%] rounded-xl border ${activeButton === 'Follows' && 'bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:!text-black dark:hover:bg-white dark:hover:text-black '} border-[#d4d4d4] dark:border dark:border-[#373737]`} onClick={() => changeColor('Follows')}>Follows</Button>

        <Button variant='outline' className={`w-[31%] rounded-xl border ${activeButton === 'Replies' && 'bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:!text-black dark:hover:bg-white dark:hover:text-black '} border-[#d4d4d4] dark:border dark:border-[#373737]`} onClick={() => changeColor('Replies')}>Replies</Button>
      
      </div>

      {
        activeButton === 'Threads' &&

        <>
          <ActivityThread/>
          <ActivityThread/>
          <ActivityThread/>
          <ActivityThread/>
          <ActivityThread/>
        </>    
      }

      {
        activeButton === 'Follows' &&

        <>
          <ActivityFollow/>
          <ActivityFollow/>
          <ActivityFollow/>
          <ActivityFollow/>
          <ActivityFollow/>
        </>    
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
