'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CreateDrawer } from "./CreateDrawer";
import { useMediaQuery } from "react-responsive";

export default function MobileFooter() {
  
  const pathname = usePathname();

  // If we dont use this media query then the mobile component is rendered on desktop screen as well when we redirect from the  '/onboarding page' to the '/' page , but when we refresh the screen the mobile components disappear. So to fix we are using this useMediaQuery hook.
  const isMobile = useMediaQuery({ maxWidth : 640 });

  return (
    <>
      {
        isMobile && 

        <div className='fixed bottom-0 w-full bg-white dark:bg-[#121212] bg-opacity-65 dark:bg-opacity-65 backdrop-blur-3xl sm:hidden'>

          <ul className="flex justify-between py-5 mx-10">
            <li>
              <Link href='/'>
                
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
              
              </Link>
            </li>

            <li>
              <Link href='/search'>
        
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

              </Link>
            </li>

            <li>
              <Link href='/activity'>
                
                {/* Activity-icon for dark Mode */}
                <Image
                src={pathname == '/activity' ? '/assets/images/white-activity-active.png' : '/assets/images/grey-activity.png'}
                width={25}
                height={25}
                alt="logo"
                className="hidden dark:block"
                />

                {/* Activity-icon for White Mode */}
                <Image
                src={pathname == '/activity' ? '/assets/images/black-activity-active.png' : '/assets/images/grey-activity.png'}
                width={25}
                height={25}
                alt="logo"
                className="dark:hidden"
                />

              </Link>
            </li>

            <CreateDrawer/>

            <li>
              <Link href='/profile'>            
      
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

              </Link>
            </li>

          </ul>

        </div>
      }
    </>
  )
}
 