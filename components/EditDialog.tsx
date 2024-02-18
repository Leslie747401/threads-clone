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

export function EditDialog() {


  return (
    <Dialog>

      <DialogTrigger asChild>

        <Button variant='outline' className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Edit Profile</Button>

      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] z-50 border border-[#d7d7d7] dark:border-[#464646]">

        <div className="rounded-xl p-8 space-y-3">

            <div className="flex justify-between">
                <div className="space-y-1">
                    <p className="font-medium">Username</p>
                    <div className="flex items-center gap-2">
                        <Lock height={18} width={18}/>                    
                        <p>lesliedsilva7744</p>
                    </div>
                </div>

                <Image
                    src='/assets/images/user.png'
                    width={55}
                    height={55}
                    alt="profile_picture"
                    className="rounded-full"
                />
            </div>

            <div className="border-b w-[83%] border-[#d7d7d7] dark:border-[#464646]"></div>

            <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646] space-y-1">
                <p className="font-medium">Fullname</p>                  
                <p>Leslie Dsilva</p>
            </div>

            <div className="pb-3 border-b border-[#d7d7d7] dark:border-[#464646]  space-y-1">
                <p className="font-medium">Bio</p>                 
                <p>Marvel</p>
            </div>

            <div className="pb-2"></div>

            <button className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-xl mt-40 font-medium">Done</button>

        </div>

      </DialogContent>
    </Dialog>
  )
}
