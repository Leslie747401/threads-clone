import React from 'react'
import Image from 'next/image'
import moment from 'moment';

export default function Comment(props : {comment : string, commentuser: string, commentuserprofilepicuture : string, created_at : string}) {


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

            </div>
            
            <div className="w-[85%] sm:max-w-[83.5%] sm:w-full flex flex-col gap-1">
            
              {/* Name and time */}
              <div className="w-full flex justify-between">
                <p className="font-medium">{props.commentuser}</p>
                <p className="text-gray-400 text-sm">{timeSinceComment}</p>
              </div>

              {/* Following you line*/}
              <div>

                {/* overflow-wrap: break-word; i.e break-words in tailwind css to break the long word and continue it on the next line . Ex: Loremmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm */}
                  <p className="break-words mb-4">{props.comment}</p>
              
              </div> 
            
            </div>
    
        </div>

    </>
  )
}
 