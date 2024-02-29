'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { CreateDialog } from "./CreateDialog"
import { MenuIcon , ArrowLeft, Moon, Sun} from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { SignOutButton, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"


export default function LeftsideBar() {

  const pathname = usePathname();
  const [dropdown,setDropdown] = useState(false);
  const [appearance,setAppearance] = useState(false);
  const {theme ,setTheme} = useTheme();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className='hidden sm:block sticky left-0 top-0 h-screen md:w-[27%] lg:w-[22%] xl:w-[17%] pt-12 pl-16 pr-20 max-md:pl-10 max-md:pr-11  border-r border-[gainsboro] dark:border-[#222429]'>

      <div className="flex gap-4 items-center mb-14">
        
        <Link href='/'>

          {/* Logo for dark Mode */}
          <Image
          src='/assets/images/white-thread.png'
          width={40}
          height={40}
          alt="logo"
          className="hidden dark:block"
          />

          {/* Logo for White Mode */}
          <Image
          src='/assets/images/black-thread.png'
          width={40}
          height={40}
          alt="logo"
          className="dark:hidden"
          />
        
        </Link>

        {/* <p className="text-2xl font-medium">Threads</p> */}

      </div>

      <ul>
        
        <li>
          <Link href='/' className="flex items-center gap-6 mb-8 pl-1">
            
            {/* Home-icon for dark Mode */}
            <Image
            src={pathname == '/' ? '/assets/images/white-home-active.png' : '/assets/images/grey-home.png'}
            width={24}
            height={24}
            alt="logo"
            className="hidden dark:block"
            />

            {/* Home-icon for White Mode */}
            <Image
            src={pathname == '/' ? '/assets/images/black-home-active.png' : '/assets/images/grey-home.png'}
            width={24}
            height={24}
            alt="logo"
            className="dark:hidden"
            />
            
            <p className={`text-lg text-[#a9a9a9] hover:text-black dark:text-[#a9a9a9] dark:hover:text-white transition-all ${ pathname == '/' && 'font-medium text-black dark:text-white'}`}>Home</p>
          
          </Link>
        </li>

        <li>
          <Link href='/search' className="flex items-center gap-6 mb-8 pl-1">
     
            {/* Search-icon for dark Mode */}
            <Image
            src={pathname == '/search' ? '/assets/images/white-search-active.png' : '/assets/images/grey-search.png'}
            width={24}
            height={24}
            alt="logo"
            className="hidden dark:block"
            />

            {/* Search-icon for White Mode */}
            <Image
            src={pathname == '/search' ? '/assets/images/black-search-active.png' : '/assets/images/grey-search.png'}
            width={24}
            height={24}
            alt="logo"
            className="dark:hidden"
            />
  
            <p className={`text-lg text-[#a9a9a9] hover:text-black dark:text-[#a9a9a9] dark:hover:text-white transition-all ${ pathname == '/search' && 'font-medium text-black dark:text-white'}`}>Search</p>

          </Link>
        </li>

        <CreateDialog/>

        <li>
          <Link href='/activity' className="flex items-center gap-6 mb-8 pl-1">
            
            {/* Activity-icon for dark Mode */}
            <Image
            src={pathname == '/activity' ? '/assets/images/white-activity-active.png' : '/assets/images/grey-activity.png'}
            width={24}
            height={24}
            alt="logo"
            className="hidden dark:block"
            />

            {/* Activity-icon for White Mode */}
            <Image
            src={pathname == '/activity' ? '/assets/images/black-activity-active.png' : '/assets/images/grey-activity.png'}
            width={24}
            height={24}
            alt="logo"
            className="dark:hidden"
            />
            
            <p className={`text-lg text-[#a9a9a9] hover:text-black dark:text-[#a9a9a9] dark:hover:text-white transition-all ${ pathname == '/activity' && 'font-medium text-black dark:text-white'}`}>Activity</p>

          </Link>
        </li>

        <li>
          <Link href='/profile' className="flex items-center gap-6 pl-1">            
  
            {/* Profile-icon for dark Mode */}
            <Image
            src={pathname == '/profile' ? '/assets/images/white-profile-active.png' : '/assets/images/grey-profile.png'}
            width={24}
            height={24}
            alt="logo"
            className="hidden dark:block"
            />

            {/* Profile-icon for White Mode */}
            <Image
            src={pathname == '/profile' ? '/assets/images/black-profile-active.png' : '/assets/images/grey-profile.png'}
            width={24}
            height={24}
            alt="logo"
            className="dark:hidden"
            />
   
            <p className={`text-lg text-[#a9a9a9] hover:text-black dark:text-[#a9a9a9] dark:hover:text-white transition-all ${ pathname == '/profile' && 'font-medium text-black dark:text-white'}`}>Profile</p>
          
          </Link>
        </li>

      </ul>

      <button className="xl:hidden absolute bottom-12 rounded-lg w-full h-fit flex items-center gap-6" onClick={() => {
          if(appearance){
            setDropdown(false);
            setAppearance(false);
          }

          else{
            setDropdown(!dropdown);
          }
        }}>

        {/* <div className="pl-[2px]"><MenuIcon width={26} height={26} className={`${dropdown || appearance ? 'text-black dark:text-white' : 'text-[#a9a9a9]'}`}/></div> */}

        <div className="pl-1">
          <div className="flex flex-col gap-1.5">
            <div className={`w-[21px] h-[3px] rounded-full ${dropdown || appearance ? 'bg-black dark:bg-white' : 'bg-[#a9a9a9]'}`}></div>
            <div className="w-full flex justify-end">
                <div className={`w-[14px] h-[3px] rounded-full ${dropdown || appearance ? 'bg-black dark:bg-white' : 'bg-[#a9a9a9]'}`}></div>
            </div>
          </div>
        </div>
        
        <p className={`${dropdown || appearance ? 'text-lg text-black dark:text-white font-medium' : 'text-lg text-[#a9a9a9] hover:text-black hover:dark:!text-white transition-all'}`}>More</p>
      
      </button>

      {
        dropdown && 
        
        <div className="absolute w-[70%] left-8 md:left-10 bottom-24 bg-white dark:!bg-[#1d1d1d] text-black dark:text-white rounded-xl border dark:border-[#212121] font-medium cursor-pointer drop-shadow-xl dark:drop-shadow-none">
          <p className="border-b dark:border-b-[#2f2f2f] py-3 pl-6 pr-16" onClick={() => {
            setAppearance(true);
            setDropdown(false);
            }}>Appearance</p>
          <SignOutButton signOutCallback={() => {signOut(); router.push('/sign-in');}}><p className="py-3 pl-6 pr-16">Logout</p></SignOutButton>
        </div>
      }

      {
        appearance &&

        <div className="w-[110%] absolute bottom-24 left-8 md:left-10 bg-white dark:bg-[#1d1d1d] border dark:border-[#212121] p-5 rounded-2xl">

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
 