import { SignOutButton, useClerk } from '@clerk/nextjs';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function MobileMenu() {

  const [dropdown,setDropdown] = useState(false);
  const [appearance,setAppearance] = useState(false);
  const {theme ,setTheme} = useTheme();
  const { signOut } = useClerk();
  const router = useRouter();
  
  return (
    <div>
        
        {/* Icon */}
        <div className="flex flex-col gap-1.5" onClick={() => setDropdown(!dropdown)}>
            <div className={`w-[22px] h-[2px] rounded-full ${dropdown || appearance ? 'bg-black dark:bg-white' : '!bg-[#a9a9a9] dark:!bg-[#494949]'}`}></div>
                <div className="w-full flex justify-end">
                    <div className={`w-[14px] h-[2px] rounded-full ${dropdown || appearance ? 'bg-black dark:bg-white' : '!bg-[#a9a9a9] dark:!bg-[#494949]'}`}></div>
                </div>
        </div>

        {
            dropdown &&

            <div className='w-fit absolute top-10 right-0 rounded-xl border dark:border-[#212121] font-medium cursor-pointer drop-shadow-xl dark:drop-shadow-none bg-white dark:!bg-[#1d1d1d]'>
                <p className="py-3 pl-6 pr-16 border-b dark:border-b-[#2f2f2f]" onClick={() => {
                setAppearance(true);
                setDropdown(false);
                }}>Appearance</p>
                <SignOutButton signOutCallback={() => {signOut(); router.push('/sign-in');}}><p className="py-3 pl-6 pr-16">Logout</p></SignOutButton>
            </div>
        }

        {
            appearance &&

            <div className="w-fit absolute top-10 right-0 bg-white dark:bg-[#1d1d1d] border dark:border-[#212121] p-5 rounded-2xl">

                <div className="flex flex-col gap-6">

                <div className="w-full flex gap-[32px] md:gap-[56px]">
                    
                    <ArrowLeft onClick={() => {
                    setAppearance(false);
                    setDropdown(true);
                    }}/>
                    
                    <p className="font-medium text-black dark:text-white">Appearance</p>
                
                </div>

                <div className="w-full flex justify-center gap-6">

                    <div className="bg-[#f9f9f9] dark:bg-black flex rounded-2xl cursor-pointer">
                        <div className={`${theme === 'light' ? 'px-9 py-3 rounded-2xl' : 'px-9 py-3 rounded-2xl border border-[#414141] bg-[#323232]' }`}><Moon width={24} height={24} onClick={() => setTheme('dark')}/></div>
                    
                        <div className={`${theme === 'light' ? 'px-9 py-3 rounded-2xl border bg-[#F5F5F5]' : 'px-9 py-3 rounded-2xl' }`}><Sun width={24} height={24} onClick={() => setTheme('light')}/></div>
                    </div>

                </div>

                </div>

            </div>
      }

    </div>
  )
}
