import React from 'react'
import Image from 'next/image'

export default function  ProfileReplies() {

  return (
    <>
        <div className="w-full sm:w-[100%] sm:mx-auto h-[1px] bg-gray-300 dark:bg-gray-600"/>

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
            
            <div className="w-[85%] sm:max-w-[83.5%] sm:w-full flex flex-col gap-2">
            
              {/* Name and time */}
              <div className="w-full flex justify-between">
                <p className="font-medium">Leslie Dsilva</p>
                <p className="text-gray-400 text-sm">9hr ago</p>
              </div>

              {/* Following you line*/}
              <div>

                {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                  <p className="break-words mb-4">Your strength and resilience inspire me every day. Keep shining bright, my friend!</p>
              
              </div> 
            
            </div>
    
        </div>

    </>
  )
}
 