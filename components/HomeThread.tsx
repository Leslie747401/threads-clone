'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRef ,useEffect } from 'react'
import moment from 'moment';
import Link from 'next/link';
import { ShareThreadFromHomeDesktop } from './ShareThreadFromHomeDesktop';
import { CommentDialog } from './CommentDialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import axios from 'axios';

export default function HomeThread(props : {id: number; threadUsername : string, profilePicture : string, text : string, image : string, time : string, likeCount : String, replyCount : string, commentprofilepicture1 : string, commentprofilepicture2 : string, commentprofilepicture3 : string;}) {

  const contentRef = useRef<HTMLDivElement>(null);

  // There reason why i am recieving the data from the child (CommentDialog.tsx , CommentDrawer.tsx and CommentThread.tsx) instead of using redux because when i am storing the props.replyCount in a variable. Since, there are n number of thread all the thread are taking the same value and not different values specific to a individual thread.

  const [replyCount,setReplyCount] = useState(props.replyCount);
  const timeSinceThreadPost = moment(props.time).fromNow();
  const [isliked,setIsLiked] = useState(false);
  const loggedInUser = useSelector((state : RootState) => state.profileData.username);
  // const [loading,setLoading] = useState(false);
  const [likeCount,setLikeCount] = useState(props.likeCount);

  useEffect(() => {
    
    const updateBorderHeight = () => {
        if (contentRef.current) {
          const contentHeight = contentRef.current.clientHeight;
          const borderElements = document.querySelectorAll(".line");
      
          for (let i = 0; i < borderElements.length; i++) {
            const borderElement = borderElements[i] as Element;
            if (borderElement) {
              (borderElement as HTMLElement).style.height = `${contentHeight - 20}px`;
            }
          }
        }
      };

    // Call the function initially
    updateBorderHeight();

    // Add event listener for window resize to update the border height
    window.addEventListener("resize", updateBorderHeight);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateBorderHeight);
    };
  }, []);

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

  // When HomeThreads are being rendered for the first time, for every thread we check that whether the current logged in user has already liked the thread or not.
  useEffect(() => {

    async function likeExists(){
      const response = await axios.post('/api/likeExists',{
        threadId : props.id,
        currentUser: loggedInUser 
      });
  
      if(response.data.likeExists){
        setIsLiked(true);
      }
  
      else{
        setIsLiked(false);
      }
  
    }
  
    likeExists();
  
  },[]);

  async function Like(){

    const response = await axios.post('/api/Like', {
      threadId : props.id,
      currentUser: loggedInUser 
    });
  
    if(response){
      // setLoading(false);
      setIsLiked(true);
      setLikeCount(response.data.updatedlikes);
    }
  }

  async function Unlike(){

    const response = await axios.post('/api/Unlike', {
      threadId : props.id,
      currentUser: loggedInUser 
    });
  
    if(response){
      // setLoading(false);
      setIsLiked(false);
      setLikeCount(response.data.updatedlikes);
    }
  }

  function handleLike() {

    // setLoading(true);
    
    if(isliked == false){
      Like();
    } 
    
    else {
      Unlike();
    }
  
  }
  
  return (
    <>
      <div className='w-full sm:w-[95%] sm:mx-5 h-[0.5px] bg-gray-300 dark:bg-gray-600'/>

        <div className="sm:w-full flex items-start gap-3 mb-1 mx-5 mt-4">

            {/* Profile Image and the line */}
            <div className="flex flex-col gap-2">        
              
                {
                  props.profilePicture &&
                  <Image
                  src={props.profilePicture}
                  width={45}
                  height={45}
                  alt="profile-image"
                  className="rounded-full"
                />
                }
      

                {
                  parseInt(props.replyCount) != 0 &&
                  // props.replyCount !== '0' &&
                  // props.replyCount != '0' &&

                  <div className="flex justify-center">
                    <div className="w-[2px] sm:w-[1.5px] bg-[#c7c7c7] dark:bg-[#2f2f2f] rounded-full line" />
                  </div>
                }

            </div>
            
            <div className="max-w-[85%] sm:w-full flex flex-col gap-1">
            
                {/* Name and time */}
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-[6px]">
                      <p className="font-medium">{props.threadUsername}</p>
                      <Image
                        src='/assets/images/blue-tick.png'
                          width={16}
                          height={16}
                          alt='icon'
                      />
                    </div>
                    <p className="text-gray-400 font-light sm:pr-1">{timeSinceThreadPost}</p>
                </div>

                {/* Content and icons */}
                <div ref={contentRef}>

                    {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                    <p className="break-words mb-2">{props.text}</p>

                    <div className='w-fit border border-[#d1d1d1] dark:!border-[#393939] rounded-xl mb-4'>
                      <img
                        src={props.image}
                        alt="post-image"
                        className="h-[300px] w-full rounded-xl"
                      />
                    </div>
                    
                    <div className="flex gap-4 ml-1">

                      {/* {
                        loading && <Skeleton width={20} height={20}/>
                      } */}

                      {
                        isliked ? 

                          <Image
                            src='/assets/images/LikedHeart.png'
                            width={20}
                            height={20}
                            alt='logo'
                            className='cursor-pointer'
                            onClick={handleLike}
                          />

                        :

                          <>

                            {/* Heart icon for Black Mode */}
                            <Image
                              src='/assets/images/white-activity.png'
                              width={20}
                              height={20}
                              alt="logo"
                              className="hidden dark:block cursor-pointer"
                              onClick={handleLike}
                            />

                            {/* Heart icon for White Mode */}
                            <Image
                              src='/assets/images/black-activity.png'
                              width={20}
                              height={20}
                              alt="logo"
                              className="dark:hidden cursor-pointer"
                              onClick={handleLike}
                            />

                          </>

                      }
                    
                      <CommentDialog
                        threadId={props.id}
                        threadUsername={props.threadUsername}
                        updateReplyCount={setReplyCount}
                      />

                      <ShareThreadFromHomeDesktop extended_url={`thread/${props.id}`}/>

                </div>

            </div> 
            
          </div>
    
        </div>
    
        {/* 3 icons , replies and likes */}
        <div className="flex gap-5 ml-5 mb-4">

        {
            parseInt(props.replyCount) === 1 &&
            // test_reply_count === 1 &&
            // props.replyCount === '1' && 

          <>
            <div className="w-[40px] h-[35px] relative">

              { props.commentprofilepicture1 &&
                <Image
                src={props.commentprofilepicture1}
                width={22}
                height={22}
                alt="profile-icon"
                className="absolute top-[6px] left-[11px] border rounded-full"
            />
              }

            </div>

          </>  
        }

        {
            parseInt(props.replyCount) === 2 &&
            // test_reply_count === 2 &&
            // props.replyCount === '2' && 

          <>
            <div className="w-[40px] h-[35px] relative">
              
              <div className='p-[2px] w-[22px] h-[22px] absolute top-[6px] left-[4px] rounded-full'>
                { props.commentprofilepicture1 &&
                  <Image
                    src={props.commentprofilepicture1}
                    width={20}
                    height={20}
                    alt="profile-icon"
                    className="border-[1.5px] rounded-full"
                  />
                }
              </div>

              <div className='p-[2px] w-[22px] h-[22px] absolute top-[6px] left-[18px] rounded-full z-999'>
                {
                  props.commentprofilepicture2 &&
                  <Image
                    src={props.commentprofilepicture2}
                    width={20}
                    height={20}
                    alt="profile-icon"
                    className="border-[1.5px] rounded-full"
                />
                }
              </div>

            </div>

          </>  
        }

        {
          parseInt(props.replyCount) >= 3 &&
          // test_reply_count === 3 &&
          // props.replyCount === '3' && 

          <>
            <div className="w-[40px] h-[35px] relative">
              {
                props.commentprofilepicture1 &&
                <Image
                  src={props.commentprofilepicture1}
                  width={20}
                  height={20}
                  alt="profile-icon"
                  className="absolute left-[24px] border rounded-full"
                />
              }

              {
                props.commentprofilepicture2 &&
                <Image
                  src={props.commentprofilepicture2}
                  width={16}
                  height={16}
                  alt="profile-icon"
                  className="absolute top-[6px] left-[6px] border rounded-full"
                />
              }

              { 
                props.commentprofilepicture3 &&
                <Image
                  src={props.commentprofilepicture3}
                  width={12}
                  height={12}
                  alt="profile-icon"
                  className="absolute bottom-0.5 left-[18px] border rounded-full"
                />
              }
            </div>

          </>  
        }

        { 
          parseInt(props.replyCount) === 0 ?

            <div className="flex gap-2 items-center text-gray-500 text-sm ml-14 mt-2.5">
            
              <Link href={`/thread/${props.id}`}>
                <p>{replyCount} replies</p>
              </Link>
                    
              <p className="pb-[7px]">.</p>
                        
              <p>{likeCount} likes</p>
            
            </div>
            
          :

            <div className="flex gap-2 items-center text-gray-500 text-sm">
                
              <Link href={`/thread/${props.id}`}>
                <p>{replyCount} replies</p>
              </Link>
                    
              <p className="pb-[7px]">.</p>
                        
              <p>{likeCount} likes</p>
            
            </div>
        }

      </div>

    </>
  )
}
