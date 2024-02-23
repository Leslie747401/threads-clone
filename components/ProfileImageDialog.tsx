'use client'

import Image from "next/image"

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { RootState } from "@/app/Redux/store"
import { useSelector } from "react-redux"

export function ProfileImageDialog() {

  const profile_picture = useSelector((state : RootState) => state.profileData.profile_picture);

  return (
    <Dialog>

      <DialogTrigger asChild>

        <div className="w-[75px] h-[75px] sm:w-[84px] sm:h-[84px] relative">
            <Image
            src={profile_picture}
            fill
            alt="profile-image"
            className="object-cover rounded-full cursor-pointer"
            />
        </div>

      </DialogTrigger>

      <DialogContent className="w-full h-screen sm:max-w-screen-2xl z-50 flex justify-center items-center">

        <DialogClose>
            <div className="p-3 dark:bg-black bg-[#e2e2e2] rounded-full absolute top-5 right-5 sm:top-8 sm:right-8">
                <X width={20} height={20} className="text-black dark:text-white"/>
            </div>
        </DialogClose>

        <div className="w-[200px] h-[200px] sm:w-[368px] sm:h-[368px] relative">
                <Image
                src={profile_picture}
                fill
                alt="profile-image"
                className="object-cover rounded-full cursor-pointer"
                />
        </div>

      </DialogContent>

    </Dialog>
  )
} 