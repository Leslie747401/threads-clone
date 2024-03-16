'use client'

import CommentThread from "@/components/CommentThread";
import axios from "axios";
import { useEffect, useState } from "react"

interface Thread {
    thread_id : number;
    username : string;
    thread_profilepicture : string;
    thread_text : string;
    thread_image : string;
    created_at : string,
    like_count : Number,
    reply_count : Number
  }

export default function ThreadsPage({params} : {params : {thread_id : string}}) {

  const [thread,setThread] = useState<Thread[]>([]);

  useEffect(() => {
    async function getThread(){
        const response  = await axios.post('/api/getThread',{
            id : params.thread_id
        });
        console.log(response.data.data.rows);
        setThread(response.data.data.rows);
    }

    getThread();

  },[])

  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">
        {
            thread && thread.map((t : Thread) => (
                <CommentThread
                    id={t.thread_id}
                    key={t.created_at}
                    threadUsername={t.username}
                    profilePicture={t.thread_profilepicture}
                    text={t.thread_text}
                    image={t.thread_image}
                    time={t.created_at}
                    likeCount={t.like_count}
                    replyCount={t.reply_count}
              />
            ))
        }
    </div>
  )
}
 