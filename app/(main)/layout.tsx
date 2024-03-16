import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import LeftsideBar from '@/components/LeftsideBar'
import RightsideBar from '@/components/RightsideBar'
import MobileNavbar from '@/components/MobileNavbar'
import MobileFooter from '@/components/MobileFooter'
import 'react-loading-skeleton/dist/skeleton.css'
import ThemeSkeleton from '@/components/ThemeSkeleton'
import Providers from '../Redux/Providers'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
// import { Room } from '@/components/Room'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads app facilitates seamless and private communication through instant messaging and media sharing'
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <ThemeProvider                     // The ThemeProvider should wrap all the components in it.
          attribute="class"
          defaultTheme="light"
      >                                
        <html lang="en">
          <body className={font.className}>
            <ThemeSkeleton>                              {/* Here , The ThemeSkeleton is a custom component that wraps around the components to provide skeleton loading. *NOTE* : This component should be placed inside the ThemeProvider component for it to work. */}          
              <div className='sm:flex sm:justify-between'>
                  <MobileNavbar/>
                  <LeftsideBar/>
                    <Toaster/>
                      {/* <Room> */}
                        {children}
                      {/* </Room> */}
                  <RightsideBar/>
                  <MobileFooter/>
                </div>
            </ThemeSkeleton> 
          </body>
        </html>
      </ThemeProvider> 
  )
}

// **REMEMBER** : in case of divs with absolute and fixed position property, any display property has no control over these divs.
// Whereas , other properties such as static,relative,sticky are affected by display property