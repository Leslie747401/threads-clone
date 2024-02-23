import Loader from '@/components/Loader'
import React from 'react'

// This is a special file in NextJS that renders a loader when there is a delay in Page Load
export default function Loading() {
  return (
    <div><Loader/></div>
  )
}
