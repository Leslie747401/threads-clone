import React from 'react'
import Image from 'next/image'

export default function ActivityFollow() {

  return (
    <>
        <div className="sm:w-full flex items-start gap-3 mx-5 mt-4">

            {/* Profile Image and the line */}
            <div className="flex flex-col gap-2">        
                <Image
                    src='/assets/images/user.png'
                    width={45}
                    height={45}
                    alt="profile-image"
                    className="pt-1"
                />

                <div className="flex justify-center">
                    <div className="w-[2px] bg-[#c7c7c7] dark:bg-[#2f2f2f] rounded-full line" />
                </div>

            </div>
            
            <div className="w-[84.5%] sm:max-w-[83%] sm:w-full flex flex-col ">
            
              {/* Name and time */}
              <div className="w-full flex justify-between">
                <p className="font-medium">Leslie Dsilva</p>
                <p className="text-gray-400 text-sm sm:pr-1 font-light">9hr ago</p>
              </div>

              {/* Following you line*/}
              <div>

                {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                  <p className="text-gray-400 break-words mb-4">Started Following you</p>
              
              </div> 
            
            </div>
    
        </div>

      <div className="w-full sm:w-[92%] sm:mx-5 h-[0.5px] bg-gray-300 dark:bg-gray-600"/>

    </>
  )
}
