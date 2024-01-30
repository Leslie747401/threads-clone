'use client'

import { useState } from "react";
import { FaketextboxDialog } from "@/components/FaketextboxDialog";
import { useMediaQuery } from "react-responsive";

export default function HomeTabs() {

  const [activeTab,setActiveTab] = useState('For you');

  // If we dont use this media query then the mobile component is rendered on desktop screen as well when we redirect from the  '/onboarding page' to the '/' page , but when we refresh the screen the mobile components disappear. So to fix we are using this useMediaQuery hook.
  const isMobile = useMediaQuery({ maxWidth : 640 });

  function changeActiveTab(tab : any){
    setActiveTab(tab);
  }

   return (
    <>
        {/* For Desktop */}
        <FaketextboxDialog/>

        {/* For Mobile */}
        {
          isMobile && 

          <div className="flex justify-between sm:hidden">
  
            <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer font-medium ${activeTab === 'For you' ? 'border-black text-black dark:border-white dark:text-white' : 'text-gray-400'}`} onClick={() => changeActiveTab('For you')}>For you</p>

            <p className={`w-[50%] flex justify-center border-b-[1px] pb-2 cursor-pointer font-medium ${activeTab === 'Following' ? 'border-black text-black dark:border-white dark:text-white' : 'text-gray-400'}`} onClick={() => changeActiveTab('Following')}>Following</p>

          </div>
        }
    </>
  )
}
