'use client'

import Image from "next/image"
import { X } from "lucide-react"
import { useState , useEffect , useRef } from "react"
import { UploadButton } from "@/utils/uploadthing"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function FaketextboxDialog() {

  const [userThread, setUserThread] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [postImage,setPostImage] = useState<string>();

  // It is used to resize (go to new line) the textarea field when it exceeds the width of textarea or when we press enter. 
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[userThread]);

  return (
    <Dialog>

      <DialogTrigger asChild>

        <div className="hidden sm:flex justify-between items-center mb-4 cursor-pointer">

            <div className="flex gap-3 items-start mx-5">
            
                <Image
                    src='/assets/images/user.png'
                    width={45}
                    height={45}
                    alt="profile-icon"
                    className="pt-1"
                />

                <div>
                    <p className="font-medium">Leslie Dsilva</p>
                    <p className="text-[#c9c9c9] dark:text-[#676767]">Start a thread...</p>
                </div>

            </div>

            <p className="px-4 p-1 bg-[#d2d1d1] text-white dark:bg-[#898989] dark:text-black rounded-3xl font-medium mr-2">Post</p>

        </div>

      </DialogTrigger>

      <DialogContent className="w-full max-sm:h-screen sm:max-w-[575px] z-50" onInteractOutside={(e) => {setUserThread(''); setPostImage('')}}>

        <div className="flex justify-between p-6 px-8">
      
          <DialogClose asChild onClick={() => {setUserThread(''); setPostImage('')}}>
            <p className="cursor-pointer">Cancel</p>
          </DialogClose>
      
          <p className="font-medium">New Thread</p>
      
          <button className="text-blue-500">Share</button>

        </div>

        <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/>

        <div className="flex pt-6 pb-10 px-10 items-start gap-3 w-full">

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


    </DialogContent>

    </Dialog>
  )
}
