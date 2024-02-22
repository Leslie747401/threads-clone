'use client'

import Image from "next/image"
import { useState , useEffect , useRef } from "react"
import { Button } from "./ui/button"
import { Lock } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { UploadButton} from "@/utils/uploadthing";
import Loader from "./Loader"
import axios from "axios"
import { useRouter } from "next/navigation"
import { RootState } from "@/app/Redux/store"
import { useDispatch, useSelector } from "react-redux"
import { setBio, setFullname, setProfilePicture } from "@/app/Redux/States/ProfileState/ProfileSlice"

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
    setDropdown(false); // If i close the dialog when the dropdown is open then when i open the dialog again the dropdown is already open.
  }

  async function handleDone(){

    setLoading(true);

    // setTimeout(()=>{
    //     setLoading(false);
    //     setOpenDrawer(false);
    // },10000);

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

        <div className="flex justify-between p-6 px-8">
  
          <DrawerClose asChild onClick={handleCancel}>
            <p className="cursor-pointer w-[52px] flex justify-center items-center">{loading ? <Loader/> : 'Cancel'}</p>
          </DrawerClose>
  
          <p className="font-medium">Edit Profile</p>
  
          <button className='text-blue-500 w-[52px] flex justify-center items-center' onClick={handleDone} >{loading ? <Loader/> : 'Done'}</button>

        </div>

        <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/>

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

                    <Image
                        src={newImage}
                        width={55}
                        height={55}
                        alt="profile_picture"
                        className="rounded-full"
                        onClick={() => setDropdown(!dropdown)}
                    />
                </div>

                <div className="border-b w-[78%] border-[#d7d7d7] dark:border-[#464646]"></div>

                <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                    <p className="font-medium">Fullname</p>                  
                    {/* <p className="font-light">{props.editfullname}</p> */}
                    <input type="text" className="w-full outline-none dark:bg-[#121212]" value={newFullname} onChange={(e) => setNewFullname(e.target.value)} maxLength={21} required/>
                </div>

                <div className="space-y-1">
                    <p className="font-medium">Bio</p>                 
                    {/* <p className="font-light" dangerouslySetInnerHTML={{ __html : props.editbio }}></p> */}
                    <textarea className="w-full resize-none overflow-hidden outline-none dark:bg-[#121212]" value={newBio} onChange={(e)=>{setNewBio(e.target.value)}} ref={textAreaRef} required></textarea>
                </div>

            </div>  

            {
                dropdown &&
                <div className="absolute top-[267px] right-12 flex flex-col shadow-xl rounded-xl border">
                    {/* <button className="flex justify-start pl-4 pr-6 py-2 font-medium border-b">Upload picture</button> */}
                    <UploadButton endpoint='imageUploader'
                    
                        onUploadProgress={()=>{
                            setDropdown(false);
                        }}

                        onClientUploadComplete={(res) => {
                        // Do something with the response
                            console.log("Files: ", res);
                            setNewImage(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}

                        appearance={{
                        allowedContent : 'hidden',
                        button : 'w-full flex justify-start p-4 py-6 font-medium border-b bg-white dark:bg-[#242424] text-black  dark:text-white rounded-none rounded-t-xl'
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
                        setNewImage('https://utfs.io/f/c88b510d-bab2-4ae3-b51c-01a0b36bba0e-y4xwt3.jpg');
                        setDropdown(false);
                    }}>Remove current picture</button>
                </div>
            }      

        </div>

    </DrawerContent>

    </Drawer>
  )
}
