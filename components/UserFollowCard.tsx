'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export default function UserFollowCard(props : {image: string | StaticImport , fullname : string , username : string}) {
  return (
    <div className='flex justify-between'>
        <div className='flex gap-5 items-center'>
            <Image
                src={props.image}
                width={45}
                height={45}
                alt='prfile-icon'
                className='rounded-full'
            />
            <div className='flex-col'>
                <p className='font-medium text-[15px]'>{props.username}</p>
                <p className='text-gray-400 text-sm dark:text-gray-500 font-medium'>{props.fullname}</p>
            </div>
        </div>
        
        <Button variant='outline' className='px-4 font-semibold rounded-xl border dark:border dark:border-[#373737]'>View</Button>
    </div>
  ) 
}