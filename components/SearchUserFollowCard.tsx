import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Link from 'next/link'

export default function SearchUserFollowCard(props : {image: string | StaticImport , fullname : string , username : string}) {
  return (
    <Link href={`/profile/${props.username}`}>
      <div className='flex justify-between items-center mx-2 mb-8'>
        <div className='flex gap-4 sm:gap-5'>
            <Image
                src={props.image}
                width={45} 
                height={45}  
                alt='prfile-icon'
                className='rounded-full'
            />
            <div className='flex-col font-medium'>
                <p className='font-medium text-[15px]'>{props.username}</p>
                <p className='text-gray-400 text-sm dark:text-gray-500'>{props.fullname}</p>
            </div>
        </div>
        <Button variant='outline' className='px-4 font-semibold rounded-xl border dark:border dark:border-[#373737]'>Follow</Button>
      </div>
    </Link>
  )
}