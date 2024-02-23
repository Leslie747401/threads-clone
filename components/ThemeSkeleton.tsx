'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import { SkeletonTheme } from 'react-loading-skeleton';

export default function ThemeSkeleton({
  children,
}: {
  children: React.ReactNode
}){

  const {theme} = useTheme();

  return(
    <div>
      {
        theme && theme === 'light' ?
        
          <SkeletonTheme>{children}</SkeletonTheme> 
          
          : 

          <SkeletonTheme baseColor="#202020" highlightColor="#444">{children}</SkeletonTheme>
      }
    </div>
  )
} 