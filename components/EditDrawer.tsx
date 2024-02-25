'use client'

import Image from "next/image"
import { useState , useEffect , useRef } from "react"
import { Button } from "./ui/button"
import { Lock } from "lucide-react"

import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { UploadButton} from "@/utils/uploadthing";
import Loader from "./Loader"
import axios from "axios"
import { RootState } from "@/app/Redux/store"
import { useDispatch, useSelector } from "react-redux"
import { setBio, setFullname, setProfilePicture } from "@/app/Redux/States/ProfileState/ProfileSlice"
import Skeleton from "react-loading-skeleton"

export function EditDrawer() {

  const username = useSelector((state : RootState) => state.profileData.username);
  const fullname = useSelector((state : RootState) => state.profileData.fullname);
  const profile_picture = useSelector((state : RootState) => state.profileData.profile_picture);
  const bio = useSelector((state : RootState) => state.profileData.bio);
  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  
  const [newImage,setNewImage] = useState(profile_picture);

  const [newFullname,setNewFullname] = useState(fullname);
  
  const bioWithLineBreaks = bio.replace(/<br\s*[/]?>/gi, '\n');
  const [newBio,setNewBio] = useState(bioWithLineBreaks);
  
  const [dropdown,setDropdown] = useState(false);

  const [openDrawer,setOpenDrawer] = useState(false);

  const [loading,setLoading] = useState(false);
  const [imageLoading,setImageLoading] = useState(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[newBio]);

  function handleCancel(){
    setNewFullname(fullname);
    setNewBio(bioWithLineBreaks);
    setNewImage(profile_picture);
    setDropdown(false); // // If i close the dialog when the dropdown is open then when i open the dialog again the dropdown is already open so to close when the dialog is close we set the dropdown state to false.
  }

  async function handleDone(){

    setLoading(true);

    // setTimeout(()=>{                // Fake Delay
    //     setLoading(false);
    //     setOpenDrawer(false);
    // },3000);

    const response = await axios.post('/api/editProfile',{
      image : newImage,
      fullname : newFullname,
      bio : newBio,
      currentUser : username
    })

    if(response){
      setLoading(false);
      setOpenDrawer(false);
      dispatch(setFullname(newFullname));
      const bioWithLineBreaks = newBio.replace(/\n/g, '<br/>');
      dispatch(setBio(bioWithLineBreaks));
      dispatch(setProfilePicture(newImage));
    }
  }

  return (
    // dismissible = false is used to disable dragging of the drawer
    <Drawer dismissible={false} open={openDrawer} onOpenChange={setOpenDrawer}>

      <DrawerTrigger asChild>
            
        <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button>
            
      </DrawerTrigger>

      <DrawerContent className="w-full max-sm:h-screen sm:max-w-[575px] z-50">

        <div className="flex justify-between p-6 px-8 items-center relative border-b border-b-[#d7d7d7] dark:border-b-[#464646]">
    
          <DrawerClose asChild onClick={handleCancel}>
            {/* When the image is uploading we disable the 'Done' Button by assigning "pointer-events-none" and when it completes the upload we remove "pointer-events-none". */}
            <p className={`${imageLoading ? 'pointer-events-none' : 'cursor-pointer w-[52px]'}`}>
              {loading ? <div className="absolute top-6 left-10 pointer-events-none"><Loader/></div> : 'Cancel'}
              </p>
          </DrawerClose>
  
          <p className="font-medium">Edit Profile</p>
  
          {/* When the image is uploading we disable the 'Done' Button by assigning "pointer-events-none" and when it completes the upload we remove "pointer-events-none". */}
          <button className={imageLoading ? 'text-blue-500 pointer-events-none' : 'text-blue-500 w-[52px]'} onClick={handleDone} >
            {loading ? <div className="absolute top-6 right-10"><Loader/></div> : 'Done'}
          </button>

        </div>

        {/* <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/> */}

        <div className="w-full h-full flex justify-center items-center mx-auto bg-[#FAFAFA] dark:bg-black">

            <div className="w-[90%] border border-[#d7d7d7] dark:border-[#464646] bg-white dark:bg-[#121212] rounded-xl p-6 flex flex-col gap-3">

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
                      
                        <Image
                          src={newImage}
                          width={55}
                          height={55}
                          alt="profile_picture"
                          className="rounded-full"
                          onClick={() => setDropdown(!dropdown)}
                        />
                    }
                </div>

                <div className="border-b w-[78%] border-[#d7d7d7] dark:border-[#464646]"></div>

                <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                    <p className="font-medium">Fullname</p>                  
                    <input type="text" className="w-full outline-none dark:bg-[#121212]" value={newFullname} onChange={(e) => setNewFullname(e.target.value)} maxLength={21} required/>
                </div>

                <div className="space-y-1">
                    <p className="font-medium">Bio</p>                 
                    <textarea className="w-full resize-none overflow-hidden outline-none dark:bg-[#121212]" value={newBio} onChange={(e)=>{setNewBio(e.target.value)}} ref={textAreaRef} required></textarea>
                </div>

            </div>  

            {
                dropdown &&
                <div className="absolute top-[267px] right-12 flex flex-col shadow-xl rounded-xl border dark:border-[#2f2f2f]">
                    
                    <UploadButton endpoint='imageUploader'
                    
                        onUploadProgress={()=>{
                            // When we click "Upload picture" present in the dropdown , we should be able to upload the file and the dropdown should be closed.
                            setDropdown(false);
                            // When the image is being uploaded we set the imageLoading state to true.
                            setImageLoading(true);
                        }}

                        onClientUploadComplete={(res) => {
                        // Do something with the response
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
                        button : 'w-full flex justify-start p-4 py-6 font-medium border-b dark:border-b-[#2f2f2f] bg-white dark:bg-[#1d1d1d] text-black dark:text-white rounded-none rounded-t-xl'
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

                    <button className="flex justify-start pl-4 pr-6 text-red-500 font-medium py-3 bg-white dark:bg-[#1d1d1d] rounded-b-xl" onClick={() => {
                        // When we click "Remove current picture" we remove the picture and replace with a common 'no user image'
                        setNewImage('https://utfs.io/f/c88b510d-bab2-4ae3-b51c-01a0b36bba0e-y4xwt3.jpg');
                        // And also close the dropdown after the "Remove current picture is clicked"
                        setDropdown(false);
                    }}>Remove current picture</button>
                </div>
            }      

        </div>

    </DrawerContent>

    </Drawer>
  )
}
