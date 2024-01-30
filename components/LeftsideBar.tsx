'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { CreateDialog } from "./CreateDialog"

export default function LeftsideBar() {

  const pathname = usePathname();

  return (
    <div className='hidden sm:block sticky left-0 top-0 h-screen w-[17%] pt-12 pl-16 pr-20 border-r border-[gainsboro] dark:border-[#222429]'>

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

        <CreateDialog/>

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

    </div>
  )
}
