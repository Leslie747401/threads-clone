// import * as React from "react"
// import Image from "next/image"
// import { useState , useEffect , useRef } from "react"

// import { Button } from "@/components/ui/button"
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer"
// import { ArrowLeft } from "lucide-react"

// export function DrawerDemo() {

//   const [userThread, setUserThread] = useState<string>('');
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

//   useEffect(() => {
//     if (textAreaRef.current) {
//       textAreaRef.current.style.height = 'auto';
//       textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
//     }
//   },[userThread]);  

//   return (
//     // dismissible = false is used to disable dragging of the drawer
//     <Drawer dismissible={false}>

//       <DrawerTrigger asChild>

//         <div className="block sm:hidden">
            
//             {/* Create-icon for dark Mode */}
//             <Image
//                 src='/assets/images/grey-create.png'
//                 width={24}
//                 height={24}
//                 alt="logo"
//                 className="hidden dark:block"
//             />

//             {/* Create-icon for White Mode */}
//                 <Image
//                 src='/assets/images/grey-create.png'
//                 width={24}
//                 height={24}
//                 alt="logo"
//                 className="dark:hidden"
//             />
        
//         </div>
            
//       </DrawerTrigger>

//       <DrawerContent className="w-full h-screen">

//         <div className="flex justify-between p-6">
            
//             {/* OnClick function is used to erase the input provided by the user */}
//             <DrawerClose asChild onClick={() => setUserThread('')}>
//                 <p className="cursor-pointer">Cancel</p>
//             </DrawerClose>
            
//             <p className="font-medium">New Thread</p>
            
//             <button className="text-blue-500">Share</button>
            
//             </div>

//             <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646] mb-2"/>

//             <div className="flex p-6 items-start gap-3 w-full">

//             <Image
//                 src='/assets/images/user.png'
//                 width={45}
//                 height={45}
//                 alt="profile-icon" 
//             />

//             <div className="flex flex-col w-full">

//                 <p className="font-medium">Leslie Dsilva</p>
                
//                 <textarea placeholder="Start a thread..." rows={1} className="bg-white dark:bg-[#171717] outline-none resize-none overflow-hidden mb-2 placeholder:text-[#afafaf]  dark:placeholder:text-[#7a7a7a]" value={userThread} onChange={(e) => setUserThread(e.target.value)} ref={textAreaRef} required/>
                
//                 <Image
//                     src='/assets/images/white-gallery.png'
//                     width={18}
//                     height={18}
//                     alt="link-icon"
//                     className="dark:hidden cursor-pointer"
//                 />
//                 <Image
//                     src='/assets/images/black-gallery.png'
//                     width={18}
//                     height={18}
//                     alt="link-icon"
//                     className="hidden dark:block cursor-pointer"
//                 />

//             </div> 

//             </div>

//       </DrawerContent>
//     </Drawer>
//   )
// }
'use client'

import Image from "next/image"
import { useState , useEffect , useRef } from "react"
import { UploadButton } from "@/utils/uploadthing"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ArrowLeft, X } from "lucide-react"

export function CreateDrawer() {

  const [userThread, setUserThread] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [postImage,setPostImage] = useState<string>();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[userThread]);  

  return (
    // dismissible = false is used to disable dragging of the drawer
    <Drawer dismissible={false}>

      <DrawerTrigger asChild>

        <div className="block sm:hidden">
            
            {/* Create-icon for dark Mode */}
            <Image
                src='/assets/images/grey-create.png'
                width={24}
                height={24}
                alt="logo"
                className="hidden dark:block"
            />

            {/* Create-icon for White Mode */}
                <Image
                src='/assets/images/grey-create.png'
                width={24}
                height={24}
                alt="logo"
                className="dark:hidden"
            />
        
        </div>
            
      </DrawerTrigger>

      <DrawerContent className="w-full max-sm:h-[calc(100dvh)] sm:max-w-[575px] z-50" onInteractOutside={(e) => {setUserThread(''); setPostImage('')}}>

        <div className="flex justify-between p-6 px-8">
  
          <DrawerClose asChild onClick={() => {setUserThread(''); setPostImage('')}}>
            <p className="cursor-pointer">Cancel</p>
          </DrawerClose>
  
          <p className="font-medium">New Thread</p>
  
          <button className="text-blue-500">Share</button>

        </div>

        <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/>

        <div className="flex pt-6 pb-10 px-10 pl-6 items-start gap-3 w-full">

          <Image
            src='/assets/images/user.png'
            width={45}
            height={45}
            alt="profile-icon" 
          />

          <div className="flex flex-col w-full">

          <p className="font-medium">Leslie Dsilva</p>
    
          <textarea placeholder="Start a thread..." rows={1} className="bg-white dark:bg-[#171717] outline-none resize-none overflow-hidden mb-2 placeholder:text-[#afafaf]  dark:placeholder:text-[#7a7a7a]" value={userThread} onChange={(e) => setUserThread(e.target.value)} ref={textAreaRef} required/>

          { postImage ? 
 
            <div className="w-fit relative border border-[#d1d1d1] rounded-xl">
              <img
                src={postImage}
                alt="post-image"
                className="h-[300px] w-full rounded-xl"
              />
              <div className="absolute top-4 right-3 p-1 cursor-pointer bg-[#6b6b6b] bg-opacity-60 rounded-full" onClick={() => setPostImage('')}>
                <X width={18} height={18} className="text-white"/>
              </div>
            </div> 
    
            : 

            <UploadButton endpoint='imageUploader' className="max-w-fit"

              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setPostImage(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}

              appearance={{
                allowedContent : 'hidden',
                button : 'h-fit w-fit bg-white dark:bg-[#171717]'
              }}
              
              content={{      
                button({ready}){
                  if(ready)
                  return <>
                    <Image
                      src='/assets/images/white-gallery.png'
                      width={18}
                      height={18}
                      alt="link-icon"
                      className="dark:hidden cursor-pointer"
                    />

                    <Image
                      src='/assets/images/black-gallery.png'
                      width={18}
                      height={18}
                      alt="link-icon"
                      className="hidden dark:block cursor-pointer"
                    />                
                  </>
                },
              }}
            />
    
          }

      </div> 

    </div>

</DrawerContent>

    </Drawer>
  )
}
