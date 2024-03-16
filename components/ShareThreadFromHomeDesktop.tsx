'use client'

import { Button } from "./ui/button"
import {WhatsappShareButton , WhatsappIcon , TwitterShareButton , TwitterIcon , FacebookShareButton , FacebookIcon , LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon} from 'next-share'
import { useUrl } from 'nextjs-current-url';
import { Send, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Check } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react";

export function ShareThreadFromHomeDesktop(props : {extended_url : string}){

  const url = useUrl();
  let current_url = url?.href + props.extended_url;
  const { toast } = useToast();
  const [copiedIcon,setCopiedIcon] = useState(false);

  async function copyurl(){
    const url_text = document.querySelector('.url')?.innerHTML;
    await navigator.clipboard.writeText(url_text!);
    toast({
      description: "Link copied to clipboard",
      duration : 1000,
      className : 'bg-white text-black dark:bg-black dark:text-white outline-none'
    });
  }

  // When the 'copy' button is clicked i set the copied icon to true "setCopiedIcon(true)" and run a setTimeout of 1 sec after which i set the copied icon to false "setCopiedIcon(false)"
  function handleCopyBtnClick(){
    copyurl();
    setCopiedIcon(true);
    setTimeout(() => {
      setCopiedIcon(false);
    }, 1000);
  }

  return (
    <Dialog>

      <DialogTrigger asChild>

        <Send width={18} height={18} className="cursor-pointer"/>

      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] z-50">

        <div className="p-8 px-10 flex justify-between items-center">
            <p className="font-medium text-xl">Share Profile</p>
            <DialogClose>
                <X width={25} height={25}/>
            </DialogClose>
        </div>

        <div className="pb-8 px-12 flex justify-between">

            <WhatsappShareButton
                url={current_url!}
                title={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}
            >
                <WhatsappIcon size={60} round />
            </WhatsappShareButton>

            <TwitterShareButton
                url={current_url!}
                title={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}    
            >
                <TwitterIcon size={60} round />
            </TwitterShareButton>

            <LinkedinShareButton url={current_url!}>
                <LinkedinIcon size={60} round />
            </LinkedinShareButton>
                
            <FacebookShareButton
                url={current_url!}
                quote={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}
                hashtag={'#nextshare'}
            >
                <FacebookIcon size={60} round />
            </FacebookShareButton>

            <RedditShareButton
                url={current_url!}
                title={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}
            >
                <RedditIcon size={60} round />
            </RedditShareButton>

        </div>

        <div className="mb-10 mx-10 h-[60px] rounded-xl border-[0.5px] border-[#cecece] dark:border-[#333333] flex justify-between items-center p-3">
            <p className="text-sm w-[360px] h-[20px] overflow-hidden whitespace-nowrap text-ellipsis url">{current_url!}</p>
            <button className="text-white bg-blue-600 rounded-3xl font-medium w-[84px] h-[36px] flex justify-center items-center" onClick={handleCopyBtnClick}> 
              { copiedIcon ? <Check/> : 'Copy' }
            </button>
        </div>

      </DialogContent>
    </Dialog>
  )
}
