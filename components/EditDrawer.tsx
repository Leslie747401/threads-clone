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
import { StaticImport } from "next/dist/shared/lib/get-img-props"

export function EditDrawer(props : {editimage: string | StaticImport , editfullname : string , editusername : string, editbio : string}) {

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
            
        <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button>
            
      </DrawerTrigger>

      <DrawerContent className="w-full max-sm:h-screen sm:max-w-[575px] z-50">

        <div className="flex justify-between p-6 px-8">
  
          <DrawerClose asChild>
            <p className="cursor-pointer">Cancel</p>
          </DrawerClose>
  
          <p className="font-medium">Edit Profile</p>
  
          <button className="text-blue-500">Done</button>

        </div>

        <div className="w-full h-[1px] bg-[#d7d7d7] dark:bg-[#464646]"/>

        <div className="w-full h-full flex justify-center items-center mx-auto bg-[#FAFAFA] dark:bg-black">

            <div className="w-[90%] border border-[#d7d7d7] dark:border-[#464646] bg-white dark:bg-[#121212] rounded-xl p-6 space-y-3">

                <div className="flex justify-between">
                    <div className="space-y-1">
                        <p className="font-medium">Username</p>
                        <div className="flex items-center gap-2">
                            <Lock height={18} width={18}/>                    
                            <p className="font-light">{props.editusername}</p>
                        </div>
                    </div>

                    <Image
                        src={props.editimage}
                        width={55}
                        height={55}
                        alt="profile_picture"
                        className="rounded-full"
                    />
                </div>

                <div className="border-b w-[78%] border-[#d7d7d7] dark:border-[#464646]"></div>

                <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                    <p className="font-medium">Fullname</p>                  
                    <p className="font-light">{props.editfullname}</p>
                </div>

                <div className="space-y-1">
                    <p className="font-medium">Bio</p>                 
                    <p className="font-light" dangerouslySetInnerHTML={{ __html : props.editbio }}></p>
                </div>

            </div>        

        </div>

    </DrawerContent>

    </Drawer>
  )
}
