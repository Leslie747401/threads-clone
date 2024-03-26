import React from 'react'
import Image from 'next/image'
import moment from 'moment';
import Link from 'next/link';

export default function ActivityReplies(props : {username : string, message : string, image : string, time : string, thread_id : string}) {

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

  const timeSinceCommented = moment(props.time).fromNow();
 
  return (
    <Link href={`/thread/${props.thread_id}`}>

        <div className="sm:w-full flex items-start gap-3 mx-5 mt-4">

            {/* Profile Image and the line */}
            <div className="flex flex-col gap-2">        
                <Image
                    src={props.image}
                    width={45}
                    height={45}
                    alt="profile-image"
                    className="rounded-full"
                />

                <div className="flex justify-center">
                    <div className="w-[2px] bg-[#c7c7c7] dark:bg-[#2f2f2f] rounded-full line" />
                </div>

            </div>
            
            <div className="w-[84.5%] sm:max-w-[83%] sm:w-full flex flex-col">
            
              {/* Name and time */}
              <div className="w-full flex justify-between">

                <div className='flex gap-[6px] items-center'>
                  <p className="font-medium">{props.username}</p>
                  <Image
                    src='/assets/images/blue-tick.png'
                    width={16}
                    height={16}
                    alt=''
                  />
                </div>

                <p className="text-gray-400 text-sm sm:pr-1 font-light">{timeSinceCommented}</p>
              
              </div>

              {/* Following you line*/}
              <div>

                {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                  <p className="text-gray-400 break-words mb-4">{props.message}</p>
              
              </div> 
            
            </div>
    
        </div>

      <div className="w-full sm:w-[92%] sm:mx-5 h-[0.5px] bg-gray-300 dark:bg-gray-600"/>

    </Link>
  )
}
