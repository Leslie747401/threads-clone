import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider} from '@clerk/nextjs'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import Providers from './Redux/Providers'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'Threads app facilitates seamless and private communication through instant messaging and media sharing'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <ClerkProvider
          appearance={{
              elements: {
                  formButtonPrimary: {
                    backgroundColor: "black",
                    color: "white",
                    "&:hover" : {
                      backgroundColor : '#423E3B'
                    }
                },
              },
          }}
        >
        <html lang="en">
          <body className={`${font.className} box-border`}>
            {children}
            <Toaster/>
          </body>
        </html>
      </ClerkProvider>
    </Providers>
  )
}

