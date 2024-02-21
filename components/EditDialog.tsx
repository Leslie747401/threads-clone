'use client'

import { Button } from "./ui/button"
import { Lock } from "lucide-react"
import Image from "next/image"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { useEffect, useRef, useState } from "react"
import { UploadButton } from "@/utils/uploadthing"
import Loader from "./Loader"
import axios from "axios"
import { useRouter } from "next/navigation"

export function EditDialog(props : {editImage: string | StaticImport , editFullname : string , editUsername : string, editBio : string, currentUsername : string}) {

  const [newImage,setNewImage] = useState(props.editImage);

  const [newFullname,setNewFullname] = useState(props.editFullname);
  
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const bioWithLineBreaks = props.editBio.replace(/<br\s*[/]?>/gi, '\n');
  const [newBio,setNewBio] = useState(bioWithLineBreaks);
  
  const [dropdown,setDropdown] = useState(false);

  const [openDrawer,setOpenDrawer] = useState(false);

  const [loading,setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '24px';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[newBio]);

  async function handleDone(){
    setLoading(true);

    // setTimeout(()=>{
    //     setLoading(false);
    //     setOpenDrawer(false);
    // },2000);
    
    const response = await axios.post('/api/editProfile',{
      image : newImage,
      fullname : newFullname,
      bio : newBio,
      currentUser : props.currentUsername
    })

    if(response){
      setLoading(false);
      setOpenDrawer(false);
      window.location.reload();
    }
  }

  return (
    <Dialog open={openDrawer} onOpenChange={setOpenDrawer}>

      <DialogTrigger asChild>

        <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] z-50 border border-[#d7d7d7] dark:border-[#464646]" onInteractOutside={(e)=>{
          // If the 'Done' button is clicked then we restrict the closing of dialog by clicking outside the dialog.
          if(loading){
            e.preventDefault();
          }
          // Else if we click outside the dialog which basically means 'Cancel' then we restore the previous data
          else{
            setNewFullname(props.editFullname);
            setNewBio(bioWithLineBreaks);
            setNewImage(props.editImage);
            setDropdown(false); // If i close the dialog when the dropdown is open then when i open the dialog again the dropdown is already open.
          }
      }}>

        <div className="rounded-xl p-8 space-y-3">

            <div className="flex justify-between">
                <div className="space-y-1">
                    <p className="font-medium">Username</p>
                    <div className="flex items-center gap-2">
                        <Lock height={18} width={18}/>                    
                        <p>{props.editUsername}</p>
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

            <div className="border-b w-[83%] border-[#d7d7d7] dark:border-[#464646]"></div>

            <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                <p className="font-medium">Fullname</p>
                {/* Here, i have used textarea with rows={1} instead of a simple <input type='text' /> because when i open the dialog the text appears to be selected. */}
                <textarea rows={1} className="w-full outline-none resize-none dark:bg-[#171717]" maxLength={21} value={newFullname} onChange={(e) => setNewFullname(e.target.value)} required></textarea>
            </div>

            <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646]  space-y-1">
                <p className="font-medium">Bio</p>                 
                <textarea className="w-full resize-none overflow-hidden outline-none dark:bg-[#171717]" value={newBio} onChange={(e)=>{setNewBio(e.target.value)}} ref={textAreaRef} required></textarea>
            </div>

            <div className="pb-2"></div>

            <button className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl mt-40 font-medium flex justify-center items-center h-[48px]"  onClick={handleDone}>{loading ? <Loader/> : 'Done'}</button>

            {
                dropdown &&
                <div className="absolute top-[81px] right-10 flex flex-col shadow-xl rounded-xl border border-[#c9c9c9] dark:border-[#5a5a5a]">
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
                        setNewImage('https://utfs.io/f/c88b510d-bab2-4ae3-b51c-01a0b36bba0e-y4xwt3.jpg');
                        setDropdown(false);
                    }}>Remove current picture</button>
                </div>
            }

        </div>

      </DialogContent>
    </Dialog>
  )
}
