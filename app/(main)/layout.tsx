import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import LeftsideBar from '@/components/LeftsideBar'
import RightsideBar from '@/components/RightsideBar'
import MobileNavbar from '@/components/MobileNavbar'
import MobileFooter from '@/components/MobileFooter'

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
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
    >
      <html lang="en">
        <body className={font.className}>
            <div className='sm:flex sm:justify-between'>
              <MobileNavbar/>
              <LeftsideBar/>
                {children}
              <RightsideBar/>
              <MobileFooter/>
            </div>
        </body>
      </html>
    </ThemeProvider>
  )
}

// **REMEMBER** : in case of divs with absolute and fixed position property, any display property has no control over these divs.
// Whereas , other properties such as static,relative,sticky are affected by display property