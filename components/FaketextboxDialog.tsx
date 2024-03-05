'use client'

import Image from "next/image"
import { X } from "lucide-react"
import { useState , useEffect , useRef } from "react"
import { UploadButton } from "@/utils/uploadthing"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Skeleton from "react-loading-skeleton"
import { useSelector } from "react-redux"
import { RootState } from "@/app/Redux/store"
import Loader from "./Loader"
import axios from "axios"

export function FaketextboxDialog() {

  const [userThread, setUserThread] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [postImage,setPostImage] = useState<string>('');
  const [imageLoading,setImageLoading] = useState(false);
  const [loading,setLoading] = useState(false);
  const [openDialog,setOpenDialog] = useState(false);
  const username = useSelector((state : RootState) => state.profileData.username);
  const profilePicture = useSelector((state : RootState) => state.profileData.profilePicture);

  // It is used to resize (go to new line) the textarea field when it exceeds the width of textarea or when we press enter. 
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[userThread]);

  async function handleShare(){
    setLoading(true);

    // setTimeout(()=>{                // Fake Delay
    //     setLoading(false);
    //     setOpenDialog(false);
    // },3000);

    const response = await axios.post('/api/postThread',{
      image : postImage,
      text : userThread,
      currentUser : username
    });

    if(response){
      setLoading(false);
      setOpenDialog(false);
      setUserThread(''); 
      setPostImage('');
    }
  }

  async function handleCancel(){
    setUserThread(''); 
    setPostImage('')
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>

      <DialogTrigger asChild>

        <div className="hidden sm:flex justify-between items-center mb-4 cursor-pointer">

            <div className="flex gap-3 items-start mx-5">

                <Image
                  src={profilePicture}
                  width={45}
                  height={45}
                  alt="profile-icon"
                  className="rounded-full object-contain"
                />

                <div>
                    <div className="flex items-center gap-[6px]">
                        <p className="font-medium">{username}</p>
                        <Image
                          src='/assets/images/blue-tick.png'
                            width={16}
                            height={16}
                            alt='icon'
                        />
                    </div>
                    <p className="text-[#c9c9c9] dark:text-[#676767]">Start a thread...</p>
                </div>

            </div>

            <p className="px-4 p-1 bg-[#d2d1d1] text-white dark:bg-[#898989] dark:text-black rounded-3xl font-medium mr-2">Post</p>

        </div>

      </DialogTrigger>

    <DialogContent className="w-full max-sm:h-screen sm:max-w-[575px] z-50" onInteractOutside={(e) => {
        
        if(loading || imageLoading){
          e.preventDefault();
        }
      
        else{
          setUserThread(''); 
          setPostImage('');
        }
        
        }}>

        <div className="flex justify-between p-5 px-8 items-center">
          
          <DialogClose asChild onClick={handleCancel}>
            <p className={`${imageLoading || loading ? 'cursor-pointer h-[28px] w-[52px] flex justify-center pointer-events-none' : 'cursor-pointer h-[28px] w-[52px] flex justify-center'}`}>{loading ? <Loader/> : 'Cancel'}</p>
          </DialogClose>
          
          <p className="font-medium h-[28px]">New Thread</p>
          
          <button className={`${imageLoading || !userThread || !postImage ? 'text-blue-300 h-[28px] w-[52px] flex justify-center pointer-events-none' : 'text-blue-500 h-[28px] w-[52px] flex justify-center'}`} onClick={handleShare}>{loading ? <Loader/> : 'Share'}</button>
        
        </div>

        <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/>

        <div className="flex pt-6 pb-10 px-10 items-start gap-[14px] w-full">

          <div className="w-[45px] h-[45px] relative">
            <Image
              src={profilePicture}
              fill
              alt="profile-icon" 
              className="rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col w-[87%]">

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

            { 
            
              imageLoading || postImage ? 

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

                  onUploadProgress={() => {
                      setImageLoading(true);
                    }}

                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setImageLoading(false)
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
