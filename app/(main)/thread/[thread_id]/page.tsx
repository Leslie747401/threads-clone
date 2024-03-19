'use client'

import Comment from "@/components/Comment";
import CommentThread from "@/components/CommentThread";
import axios from "axios";
import { useEffect, useState } from "react"

interface Thread {
    thread_id : number;
    username : string;
    thread_profilepicture : string;
    thread_text : string;
    thread_image : string;
    created_at : string;
    like_count : Number;
    reply_count : string;
    commentprofilepicture1 : string;
    commentprofilepicture2 : string;
    commentprofilepicture3 : string;
}

interface Comment {
  comment : string;
  commentuser : string;
  commentuserprofilepicuture : string;
  created_at : string;
}

export default function ThreadsPage({params} : {params : {thread_id : string}}) {

  const [thread,setThread] = useState<Thread[]>([]);
  const [comments,setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function getThread(){
        const response  = await axios.post('/api/getThread',{
            id : params.thread_id
        });
        console.log(response.data.data.rows);
        setThread(response.data.data.rows);
    }

    getThread();

  },[]);

  useEffect(() => {
    async function getComments(){
      const response = await axios.post('/api/getComments',{
        id : params.thread_id
      });
      console.log(response.data.data.rows);
      setComments(response.data.data.rows);
    }

    getComments();

  },[]);

  return (
    <div className="sm:w-[65%] sm:mx-auto lg:w-[60%] xl:w-[40%] pt-[74px] sm:pt-12 pb-16">

        <div>
          {
              thread && thread.map((t : Thread) => (
                  <CommentThread
                      id={t.thread_id}
                      key={t.created_at}
                      threadUsername={t.username}
                      threadProfilePicture={t.thread_profilepicture}
                      text={t.thread_text}
                      image={t.thread_image}
                      time={t.created_at}
                      likeCount={t.like_count}
                      replyCount={t.reply_count}
                      commentprofilepicture1={t.commentprofilepicture1}
                      commentprofilepicture2={t.commentprofilepicture2}
                      commentprofilepicture3={t.commentprofilepicture3}
                      
                />
              ))
          }
        </div>

        <div>
         {
              comments && comments.map((c : Comment) => (
                  <Comment
                      key={c.created_at}
                      comment={c.comment}
                      commentuser={c.commentuser}
                      commentuserprofilepicuture={c.commentuserprofilepicuture}
                      created_at={c.created_at}
                />
              ))
          }
        </div>

    </div>
  )
}
 