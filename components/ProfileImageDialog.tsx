'use client'

import Image from "next/image"
import { useState , useEffect , useRef } from "react"
import { UploadButton } from "@/utils/uploadthing"


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

interface ProfileDialogProps {
    imageurl : string | StaticImport;
  }

export function ProfileImageDialog({imageurl} : ProfileDialogProps) {

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
    <Dialog>

      <DialogTrigger asChild>

        <div className="w-[77px] h-[77px] sm:w-[84px] sm:h-[84px] relative">
            <Image
            src={imageurl} // src={profile_picture} use this after fixing the production issue of uploadthing
            fill
            alt="profile-image"
            className="object-cover rounded-full cursor-pointer"
            />
        </div>

      </DialogTrigger>

      <DialogContent className="w-full h-screen sm:max-w-screen-2xl z-50 flex justify-center items-center" onInteractOutside={(e) => {setUserThread(''); setPostImage('')}}>

        <DialogClose>
            <div className="p-3 dark:bg-black bg-[#e2e2e2] rounded-full absolute top-5 right-5 sm:top-8 sm:right-8">
                <X width={20} height={20} className="text-black dark:text-white"/>
            </div>
        </DialogClose>

        <div className="w-[200px] h-[200px] sm:w-[368px] sm:h-[368px] relative">
                <Image
                src={imageurl} // src={profile_picture} use this after fixing the production issue of uploadthing
                fill
                alt="profile-image"
                className="object-cover rounded-full cursor-pointer"
                />
        </div>

      </DialogContent>
    </Dialog>
  )
}
