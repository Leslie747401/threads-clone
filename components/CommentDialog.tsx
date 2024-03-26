'use client'

import Image from "next/image"
import { useState , useEffect , useRef } from "react"
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/Redux/store"
import axios from "axios"

// Here, updateReplyCount is a prop which will be sent to the parent. Every time we make a new comment the number of reply count should go up by 1 in realtime to enable smooth user expereince.  
export function CommentDialog(props : {threadId: number; threadUsername : string; updateReplyCount: (newCount: string) => void;})
 {
  const [userThread, setUserThread] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
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

    const response = await axios.post('/api/postComment',{
      comment : userThread,
      commentUser : username,
      commentUserProfilePicuture : profilePicture,
      threadId : props.threadId,
      threadAuthor : props.threadUsername,
    });

    if(response){
      // So, every time we post a comment we update the reply count in the parent by sending the updated reply count to the parent as a prop
      props.updateReplyCount(response.data.commentsCount);
      setLoading(false);
      setOpenDialog(false);
      setUserThread('');
      
      await axios.post('/api/postCommentNotification',{
        username : props.threadUsername,
        activity_username : username,
        activity_image : profilePicture,
        message : 'Commented on your thread',
        type : 'Comment',
        thread_id : props.threadId
      });
    }
  }

  async function handleCancel(){
    setUserThread(''); 
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>

      <DialogTrigger asChild>

        <div>

            {/* Comment icon for Black Mode */}
            <Image
                src='/assets/images/white-comment.png'
                width={18}
                height={18}
                alt="logo"
                className="hidden dark:block cursor-pointer"
            />

            {/* Comment icon for White Mode */}
            <Image
                src='/assets/images/black-comment.png'
                width={18}
                height={18}
                alt="logo"
                className="dark:hidden cursor-pointer"
            />

        </div>
    
      </DialogTrigger>

      <DialogContent className="w-full max-sm:h-screen sm:max-w-[575px] z-50" onInteractOutside={(e) => {
        
          if(loading){
            e.preventDefault();
          }
        
          else{
            setUserThread(''); 
          }
        
        }}>

        <div className="flex justify-between p-5 px-8 items-center">
          
          <DialogClose asChild onClick={handleCancel}>
            <p className={`${loading ? 'cursor-pointer h-[28px] w-[52px] flex justify-center pointer-events-none' : 'cursor-pointer h-[28px] w-[52px] flex justify-center'}`}>{loading ? <Loader/> : 'Cancel'}</p>
          </DialogClose>
          
          <p className="font-medium h-[28px]">Comment</p>
          
          <button className={`${!userThread ? 'text-blue-300  h-[28px] w-[52px] flex justify-center pointer-events-none' : 'text-blue-500 h-[28px] w-[52px] flex justify-center'}`} onClick={handleShare}>{loading ? <Loader/> : 'Share'}</button>
        
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
            
            <textarea placeholder={`Reply to ${props.threadUsername}...`} rows={1} className="bg-white dark:bg-[#171717] outline-none resize-none overflow-hidden mb-2 placeholder:text-[#afafaf]  dark:placeholder:text-[#7a7a7a]" value={userThread} onChange={(e) => setUserThread(e.target.value)} ref={textAreaRef} required/>

          </div> 

        </div>

      </DialogContent>

    </Dialog>
  )
}
