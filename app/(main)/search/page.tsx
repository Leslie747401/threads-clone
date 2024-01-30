import React from 'react'
import Image from 'next/image'
import SearchUserFollowCard from '@/components/SearchUserFollowCard'

export default function Search() {
  return (
    <div className="sm:w-[35%] pt-[74px] mx-5 sm:pt-12 pb-12">
      
      <div className='flex gap-4 items-center px-4 py-3 w-full bg-gray-50 dark:bg-[#0c0c0e] border border-gray-300 dark:border dark:border-[#373737] rounded-2xl mb-10'>

          <Image
            src='/assets/images/searchbar-icon.png'
            width={16}
            height={16}
            alt='searchbar-icon'
            className='ml-1'
          />
        
          <input type="text" placeholder='Search' className='w-full bg-gray-50 dark:bg-[#0c0c0e] outline-none h-[25px] sm:h-[36px] placeholder:text-[#9a9a9a] placeholder:text-base'/>
      
      </div>
    
      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Jackson Carter'
        username='Jackson_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Benjamin Parker'
        username='Benjamin_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Skylar Lawson'
        username='Skylar_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Jackson Carter'
        username='Jackson_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Benjamin Parker'
        username='Benjamin_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Skylar Lawson'
        username='Skylar_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Jackson Carter'
        username='Jackson_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Benjamin Parker'
        username='Benjamin_123'
      />

      <SearchUserFollowCard
        image='/assets/images/user.png'
        fullname='Skylar Lawson'
        username='Skylar_123'
      />

    </div>
  )
}
