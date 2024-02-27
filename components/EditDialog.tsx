'use client'

import { Button } from "./ui/button"
import { Lock } from "lucide-react"
import Image from "next/image"
import { Dialog,  DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react"
import { UploadButton } from "@/utils/uploadthing"
import Loader from "./Loader"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/app/Redux/store"
import { setBio, setFullname, setProfilePicture } from "@/app/Redux/States/ProfileState/ProfileSlice"
import Skeleton from "react-loading-skeleton"

export function EditDialog() {

  const username = useSelector((state : RootState) => state.profileData.username);
  const fullname = useSelector((state : RootState) => state.profileData.fullname);
  const profile_picture = useSelector((state : RootState) => state.profileData.profile_picture);
  const bio = useSelector((state : RootState) => state.profileData.bio);
  const dispatch = useDispatch();

  const [newImage,setNewImage] = useState(profile_picture);

  const [newFullname,setNewFullname] = useState(fullname);
  
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const bioWithLineBreaks = bio.replace(/<br\s*[/]?>/gi, '\n');
  const [newBio,setNewBio] = useState(bioWithLineBreaks);
  
  const [dropdown,setDropdown] = useState(false);

  const [openDialog,setOpenDialog] = useState(false);

  const [loading,setLoading] = useState(false);

  const [imageLoading,setImageLoading] = useState(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '24px';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[newBio]);

  async function handleDone(){
    setLoading(true);

    // setTimeout(()=>{                // Fake Delay
    //     setLoading(false);
    //     setOpenDrawer(false);
    // },2000);
    
    const response = await axios.post('/api/editProfile',{
      image : newImage,
      fullname : newFullname,
      bio : newBio,
      currentUser : username
    })

    if(response){
      // after we get the data we set the loading to false and close the dialog
      setLoading(false);
      setOpenDialog(false);

      // update the data recieved from database
      dispatch(setFullname(newFullname));
      const bioWithLineBreaks = newBio.replace(/\n/g, '<br/>');
      dispatch(setBio(bioWithLineBreaks));
      dispatch(setProfilePicture(newImage));
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>

      <DialogTrigger asChild>

        <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] z-50 border border-[#d7d7d7] dark:border-[#464646]" onInteractOutside={(e)=>{
          
          // If the 'Done' button is clicked then we restrict the closing of dialog by clicking outside the dialog when the data is being sent to the server or when the image is being uploaded.
          if(loading || imageLoading){
            e.preventDefault();
          }
          
          // Else if we click outside the dialog which basically means 'Cancel' then we restore the previous data
          else{
            setNewFullname(fullname);
            setNewBio(bioWithLineBreaks); 
            setNewImage(profile_picture);
            setDropdown(false); // If i close the dialog when the dropdown is open then when i open the dialog again the dropdown is already open so to close when the dialog is close we set the dropdown state to false.
          }
      }}>

        <div className="rounded-xl p-8 space-y-3">

            <div className="flex justify-between">
                <div className="space-y-1">
                    <p className="font-medium">Username</p>
                    <div className="flex items-center gap-2">
                        <Lock height={18} width={18}/>                    
                        <p>{username}</p>
                    </div>
                </div>

                {/* When the image is being uploaded we display a circular skeleton and when it finishes uploading the image is displayed. */}
                { 
                  imageLoading ? 

                    <Skeleton width={55} height={55} circle/>

                  :

                  <div className="w-[55px] h-[55px] relative">
                    <Image
                      src={newImage}
                      fill
                      alt="profile_picture"
                      className="rounded-full object-cover"
                      onClick={() => setDropdown(!dropdown)}
                    />
                  </div>
                }
            </div>

            <div className="border-b w-[83%] border-[#d7d7d7] dark:border-[#464646]"></div>

            <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                <p className="font-medium">Fullname</p>
                {/* Here, i have used textarea with rows={1} instead of a simple <input type='text' /> because when i open the dialog the text appears to be selected. */}
                <textarea rows={1} className="w-full outline-none resize-none dark:bg-[#171717]" maxLength={21} value={newFullname} onChange={(e) => setNewFullname(e.target.value)} required></textarea>
            </div>

            <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                <p className="font-medium">Bio</p>                 
                <textarea className="w-full resize-none overflow-hidden outline-none dark:bg-[#171717]" value={newBio} onChange={(e)=>{setNewBio(e.target.value)}} ref={textAreaRef} required></textarea>
            </div>

            <div className="pb-2"></div>
              
            {/* When the image is uploading we disable the 'Done' Button by assigning "pointer-events-none" and when it completes the upload we remove "pointer-events-none". */}
            <button className={`${imageLoading ? 'w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl mt-40 font-medium flex justify-center items-center h-[48px] pointer-events-none' : 'w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl mt-40 font-medium flex justify-center items-center h-[48px] relative'}`} onClick={handleDone}>
              { loading ? <div className="absolute top-2.5"><Loader/></div> : 'Done' }
            </button>

            {
                dropdown &&
                <div className="absolute top-[81px] right-10 flex flex-col shadow-xl rounded-xl border border-[#c9c9c9] dark:border-[#5a5a5a]">

                    <UploadButton endpoint='imageUploader'
                    
                        onUploadProgress={()=>{
                            // When we click "Upload picture" present in the dropdown , we should be able to upload the file and the dropdown should be closed.
                            setDropdown(false);
                            // When the image is being uploaded we set the imageLoading state to true.
                            setImageLoading(true);
                        }}

                        onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            // Once the image is successfully uploaded , we set the image Loading state to False.
                            setImageLoading(false);
                            // We update the new Image with the image that was uploaded
                            setNewImage(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            // Erorr while uploading
                            alert(`ERROR! ${error.message}`);
                        }}

                        appearance={{
                        allowedContent : 'hidden',
                        button : 'w-full flex justify-start p-4 py-6 font-medium border-b bg-white dark:bg-[#242424] text-black  dark:text-white rounded-none rounded-t-xl border-b border-[#c9c9c9] dark:border-[#5a5a5a]'
                        }}

                        content={{      
                            button({ready}){
                              if(ready)
                              return <>
                               Upload picture              
                              </>
                            },
                          }}

                    />

                    <button className="flex justify-start pl-4 pr-6 text-red-500 font-medium py-3 bg-white dark:bg-[#242424] rounded-b-xl" onClick={() => {
                        // When we click "Remove current picture" we remove the picture and replace with a common 'no user image'
                        setNewImage('https://utfs.io/f/c88b510d-bab2-4ae3-b51c-01a0b36bba0e-y4xwt3.jpg');
                        // And also close the dropdown after the "Remove current picture is clicked"
                        setDropdown(false);
                    }}>
                      Remove current picture
                    </button>

                </div>
            }

        </div>

      </DialogContent>
    </Dialog>
  )
}
