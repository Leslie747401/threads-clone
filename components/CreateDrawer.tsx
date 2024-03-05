'use client'

import Image from "next/image"
import { useState , useEffect , useRef, use } from "react"
import { UploadButton } from "@/utils/uploadthing"
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { X } from "lucide-react"
import Loader from "./Loader"
import Skeleton from "react-loading-skeleton"
import { RootState } from "@/app/Redux/store"
import { useSelector } from "react-redux"

export function CreateDrawer() {

  const [userThread, setUserThread] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [postImage,setPostImage] = useState<string>();
  const [imageLoading,setImageLoading] = useState(false);
  const [loading,setLoading] = useState(false);
  const [openDrawer,setOpenDrawer] = useState(false);
  const username = useSelector((state : RootState) => state.profileData.username);
  const profilePicture = useSelector((state : RootState) => state.profileData.profilePicture);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[userThread]);
  
  function handleCancel(){
    setUserThread('');
    setPostImage('');
  }

  async function handleDone(){

    setLoading(true);

    setTimeout(()=>{                // Fake Delay
        setLoading(false);
        setOpenDrawer(false);
    },3000);

  }

  return (
    // dismissible = false is used to disable dragging of the drawer
    <Drawer dismissible={false} open={openDrawer} onOpenChange={setOpenDrawer}>

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

      <DrawerContent className="w-full max-sm:h-[calc(100dvh)] sm:max-w-[575px] z-50">

        <div className="flex justify-between p-6 px-8 items-center">
  
          <DrawerClose asChild onClick={handleCancel}>
            <p className={`${imageLoading || loading ? 'cursor-pointer pointer-events-none h-[24px] w-[52px] flex justify-center' : 'cursor-pointer  w-[52px]  h-[24px] flex justify-center'}`}>{loading ? <Loader/> : 'Cancel'}</p>
          </DrawerClose>
  
          <p className="font-medium">New Thread</p>
  
          <button className={`${imageLoading ? 'text-blue-500  w-[52px] h-[24px] flex justify-center' : 'text-blue-500  w-[52px] h-[24px] flex justify-center'}`} onClick={handleDone}>{loading ? <Loader/> : 'Share'}</button>

        </div>

        <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/>

        <div className="flex pt-6 pb-10 pr-6 pl-6 items-start justify-between w-full">

          <div className="w-[45px] h-[45px] relative">
            <Image
              src={profilePicture}
              fill
              alt="profile-icon"
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col w-[85%]">

          <div className="flex gap-[6px] items-center">
              <p className="font-medium">{username}</p>
              <Image
                    src='/assets/images/blue-tick.png'
                    width={16}
                    height={16}
                    alt='icon'
              />
          </div>
    
          <textarea placeholder="Start a thread..." rows={1} className="bg-white dark:bg-[#171717] outline-none resize-none overflow-hidden mb-2 placeholder:text-[#afafaf]  dark:placeholder:text-[#7a7a7a]" value={userThread} onChange={(e) => setUserThread(e.target.value)} ref={textAreaRef} required/>

          { imageLoading || postImage ? 

              ( postImage ?

                <div className="w-fit relative border border-[#d1d1d1] dark:!border-[#393939] rounded-xl">
                  
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

                <Skeleton width={300} height={300}/>

              )
    
            : 

            <UploadButton endpoint='imageUploader' className="max-w-fit"

              onUploadProgress={()=>{
                setImageLoading(true);
              }}

              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImageLoading(false);
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
