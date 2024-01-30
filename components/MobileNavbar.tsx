'use client'

import Image from "next/image"
import Link from "next/link"
import { useMediaQuery } from "react-responsive";


export default function MobileNavbar() {

  // If we dont use this media query then the mobile component is rendered on desktop screen as well when we redirect from the  '/onboarding page' to the '/' page , but when we refresh the screen the mobile components disappear. So to fix we are using this useMediaQuery hook.
  const isMobile = useMediaQuery({ maxWidth : 640 });

  return (
    <>
      { 
        isMobile &&

        <div className='fixed bg-white dark:bg-[#121212] bg-opacity-65 dark:bg-opacity-65 backdrop-blur-3xl w-full flex justify-center py-3 sm:hidden z-[30]'>
    
          <Link href='/'>
      
            {/* Logo for dark Mode */}
            <Image
              src='/assets/images/white-thread.png'
              width={35}
              height={35}
              alt="logo"
              className="hidden dark:block"
            />
      
            {/* Logo for White Mode */}
            <Image
              src='/assets/images/black-thread.png'
              width={35}
              height={35}
              alt="logo"
              className="dark:hidden"
            />
      
          </Link>
      
        </div>
      }
    </>
  )
}
