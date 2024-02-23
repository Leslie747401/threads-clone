import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads app facilitates seamless and private communication through instant messaging and media sharing'
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  // Layout for SignIn , SignUp and Onboarding Page 
  return (
      <html lang="en">
        <body className={`${inter.className}`} style={{ backgroundImage: `url('/assets/images/background.png')`, display : 'flex' , height : '100vh' , alignItems : 'center' , justifyContent : 'center' , boxSizing : 'border-box'}}>
            {children}
            <Toaster/>
        </body>
      </html>
  )
}

