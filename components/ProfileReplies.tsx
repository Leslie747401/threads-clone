import React, { useState } from 'react'
import Image from 'next/image'
import moment from 'moment';
import Link from 'next/link';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';

interface Comment {
  commentid: number;
}

export default function ProfileReplies(props : {threadId : Number, commentId : Number, comment : string, commentuser: string, commentuserprofilepicuture : string, created_at : string}) {

  moment.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ",
        s: function (number, withoutSuffix, key, isFuture) {
            return number + 's';
        },
        ss: function (number, withoutSuffix, key, isFuture) {
          return number + 's';
        },
        m: function (number, withoutSuffix, key, isFuture) {
          return number + 'm';
        },
        mm: function (number, withoutSuffix, key, isFuture) {
            return number + 'm';
        },
        h: function (number, withoutSuffix, key, isFuture) {
          return number + 'h';
        },
        hh: function (number, withoutSuffix, key, isFuture) {
          return number + 'h';
        },
        d: function (number, withoutSuffix, key, isFuture) {
          return number + 'd';
        },
        dd: function (number, withoutSuffix, key, isFuture) {
          if(number >= 7 && number < 14){
            return '2w';
          }
          
          else if(number >= 14 && number < 21){
            return '3w';
          }

          else{
            return '4w'
          }
        },
        M: function (number, withoutSuffix, key, isFuture) {
          // const month = (number * 4) + 1;
          return number + 'M';
        },
        MM: function (number, withoutSuffix, key, isFuture) {
          return number + 'M';
        },
        y: function (number, withoutSuffix, key, isFuture) {
          return number + 'y';
        },
        yy: function (number, withoutSuffix, key, isFuture) {
          return number + 'y';
        },
      }
  });

  const timeSinceComment = moment(props.created_at).fromNow();
  const [dropdown,setDropdown] = useState(false);
  const allComments = useSelector((state : RootState) => state.delete.Comments);

  async function handleDelete(commentId : any, threadId : any) {
  
    console.log("Delete Comment : ", commentId);

    const response = await axios.post('/api/DeleteComment',{
      commentId : commentId,
      threadId : threadId
    });

    console.log(response);

    if(response){
      allComments.filter((c : Comment) => c.commentid !== commentId);
      setDropdown(false);
    }
  }


  return (
    <>

      <div className="w-full sm:w-[94%] sm:mx-auto h-[1px] bg-gray-300 dark:bg-gray-600"/>

        <div className="sm:w-full flex items-start gap-3 mx-5 mt-4">

            {/* Profile Image and the line */}
            <div className="flex flex-col gap-2">        
                <Image
                    src={props.commentuserprofilepicuture}
                    width={45}
                    height={45}
                    alt="profile-image"
                    className="rounded-full"
                />

                {/* <div className="flex justify-center">
                    <div className="w-[2px] bg-[#c7c7c7] dark:bg-[#2f2f2f] rounded-full line" />
                </div> */}

            </div>
            
            <div className="w-[85%] sm:max-w-[83.5%] sm:w-full flex flex-col">
            
              {/* Name and time */}
              <div className="w-full flex justify-between relative">

                    <div className='flex gap-[6px] items-center'>
                      <Link href={`/thread/${props.threadId}`}>
                        <p className="font-medium">{props.commentuser}</p>
                      </Link>
                      <Image
                        src='/assets/images/blue-tick.png'
                        width={16}
                        height={16}
                        alt='icon'
                      />
                    </div>
                    <div className='flex gap-3 items-center'>
                      <p className="text-gray-400 text-sm">{timeSinceComment}</p>
                      <div className='p-[5px] rounded-full hover:bg-[#ececec] dark:hover:bg-[#252525] transition-all' onClick={() => setDropdown(!dropdown)}>
                        <DotsHorizontalIcon className='w-[20px] h-[20px]'/>
                      </div>
                    </div>

                    {
                      dropdown && 

                      <div className='bg-white dark:bg-[#252525] absolute right-0 top-8 rounded-2xl border dark:border-0 shadow-lg cursor-pointer' onClick={() => {handleDelete(props.commentId,props.threadId)}}>
                        <p className='text-red-500 font-medium p-3 pl-4 pr-12'>Delete</p>
                      </div>
                    }

              </div>

              {/* Following you line*/}

              <Link href={`/thread/${props.threadId}`}>
                <div>

                  {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                    <p className="break-words mb-4">{props.comment}</p>
                
                </div> 
              </Link>

            </div>
    
        </div>

    </>
  )
}
 