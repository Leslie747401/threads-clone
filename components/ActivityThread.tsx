import React from 'react'
import Image from 'next/image'
import { useRef ,useEffect } from 'react'
import { Send } from 'lucide-react';

export default function ActivityThread() {

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    // It updates broder height (which looks like a thread) based on the height of the image and text in the thread.
    const updateBorderHeight = () => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.clientHeight;
          const borderElements = document.querySelectorAll(".line");
      
          for (let i = 0; i < borderElements.length; i++) {
            const borderElement = borderElements[i] as Element;
            if (borderElement) {
              (borderElement as HTMLElement).style.height = `${contentHeight - 20}px`;
            }
          }
        }
      };

    // Call the function initially
    updateBorderHeight();

    // Add event listener for window resize to update the border height
    window.addEventListener("resize", updateBorderHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateBorderHeight);
    };
  }, []);

  return (
    <>
        <div className="sm:w-full flex items-start gap-3 mb-1 mx-5 mt-8">

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
            
            <div className="w-[84.5%] sm:max-w-[83%] sm:w-full flex flex-col gap-2">
            
                {/* Name and time */}
                <div className="w-full flex justify-between">
                    <p className="font-medium">Leslie Dsilva</p>
                    <p className="text-gray-400 text-sm sm:pr-1 font-light">9hr ago</p>
                </div>

                {/* Content and icons */}
                <div ref={contentRef}>

                    {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                    <p className="break-words mb-4">Use Microsoft Copilot for free ChatGPT-4 and generate high quality images powered by DALLE-3 #microsoft #copilot #microsoftcopilot #dalle3 #chatgpt4</p>
                    
                    <div className="flex gap-4">

                    {/* Heart icon for Black Mode */}
                    <Image
                        src='/assets/images/white-activity.png'
                        width={20}
                        height={20}
                        alt="logo"
                        className="hidden dark:block"
                    />

                    {/* Heart icon for White Mode */}
                    <Image
                        src='/assets/images/black-activity.png'
                        width={20}
                        height={20}
                        alt="logo"
                        className="dark:hidden"
                    />

                    {/* Comment icon for Black Mode */}
                    <Image
                        src='/assets/images/white-comment.png'
                        width={18}
                        height={18}
                        alt="logo"
                        className="hidden dark:block"
                    />

                    {/* Comment icon for White Mode */}
                    <Image
                        src='/assets/images/black-comment.png'
                        width={18}
                        height={18}
                        alt="logo"
                        className="dark:hidden"
                    />

                    <Send width={18} height={18}/>

                </div>

            </div> 
            
          </div>
    
        </div>
    
        {/* 3 icons , replies and likes */}
        <div className="flex gap-[15px] ml-5 mb-4">

            <div className="w-[40px] h-[35px] relative">
                <Image
                    src='/assets/images/user.png'
                    width={20}
                    height={20}
                    alt="profile-icon"
                    className="absolute left-[22px] border rounded-full"
                />

                <Image
                    src='/assets/images/user.png'
                    width={16}
                    height={16}
                    alt="profile-icon"
                    className="absolute top-2 left-1 border rounded-full"
                />

                <Image
                    src='/assets/images/user.png'
                    width={12}
                    height={12}
                    alt="profile-icon"
                    className="absolute bottom-0.5 left-[18px] border rounded-full"
                />
            </div>

            <div className="flex gap-2 items-center text-gray-500 text-sm">
                <p>70 replies</p>
                <p className="pb-[6px]">.</p>
                <p>2,193 likes</p>
            </div>

      </div>

      <div className="w-full sm:w-[91.5%] sm:mx-5 h-[0.5px] bg-gray-300 dark:bg-gray-600"/>

    </>
  )
}
