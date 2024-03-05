import { useState } from "react"
import { Button } from "./ui/button"
import {WhatsappShareButton , WhatsappIcon , TwitterShareButton , TwitterIcon , FacebookShareButton , FacebookIcon , LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon} from 'next-share'
import { Check } from "lucide-react"
import { useUrl } from 'nextjs-current-url';
import { Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer"

export function ShareDrawer() {

  const url = useUrl();
  let current_url = url?.href;
  const [copiedIcon,setCopiedIcon] = useState(false);

  async function copyurl(){
    const url_text = document.querySelector('.url')?.innerHTML;
    await navigator.clipboard.writeText(url_text!);
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
    // dismissible = false is used to disable dragging of the drawer
    <Drawer>

      <DrawerTrigger asChild>
       
        <Button variant='outline'className={`w-[48%] rounded-xl border border-[#d4d4d4] dark:border dark:border-[#373737]`}>Share Profile</Button>
        
      </DrawerTrigger>

      <DrawerContent className="w-full rounded-t-[25px] border-none">

        
      {/* <div className="p-8 px-10 flex justify-between items-center">
            <p className="font-medium text-xl">Share Profile</p>
        </div> */}

        <div className="w-full flex justify-center pb-10 pt-5">
          <div className="w-[75px] h-[4px] rounded-3xl bg-gray-300 dark:!bg-gray-500"></div>
        </div>

        <div className="pb-8 px-10 flex justify-between">

            <WhatsappShareButton
                url={current_url!}
                title={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}
            >
                <WhatsappIcon size={50} round />
            </WhatsappShareButton>

            <TwitterShareButton
                url={current_url!}
                title={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}    
            >
                <TwitterIcon size={50} round />
            </TwitterShareButton>

            <LinkedinShareButton url={current_url!}>
                <LinkedinIcon size={50} round />
            </LinkedinShareButton>
                
            <FacebookShareButton
                url={current_url!}
                quote={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}
                hashtag={'#nextshare'}
            >
                <FacebookIcon size={50} round />
            </FacebookShareButton>

            <RedditShareButton
                url={current_url!}
                title={'Threads app facilitates seamless and private communication through instant messaging and media sharing'}
            >
                <RedditIcon size={50} round />
            </RedditShareButton>

        </div>

        <div className="mb-10 mx-10 h-[60px] rounded-xl border-[0.5px] border-[#cecece] dark:border-[#333333] flex justify-between items-center p-3">
            <p className="text-sm w-[70%] h-[20px] overflow-hidden whitespace-nowrap text-ellipsis url">{current_url!}</p>
            <button className="text-white bg-blue-600 rounded-3xl font-medium w-[24%] h-[36px] flex justify-center items-center" onClick={handleCopyBtnClick}>
              { copiedIcon ? <Check/> : 'Copy' }
            </button>
        </div>

      </DrawerContent>
    </Drawer>
  )
}
