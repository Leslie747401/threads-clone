// // // import React, { useEffect, useState } from 'react'
// // // import { useInView } from 'react-intersection-observer';

// // // export default function LoadMore() {

// // //   const { ref, inView } = useInView();
// // //   const [isFirstRender, setIsFirstRender] = useState(true);

// // //   useEffect(() => {
    
// // //     // Check if it's not the first render and inView is true
// // //     if (!isFirstRender && inView) {
// // //       alert("Infinite Scroller");
// // //     }

// // //     // Update isFirstRender after the first render
// // //     if (isFirstRender) {
// // //       setIsFirstRender(false);
// // //     }

// // //   }, [inView, isFirstRender]);

// // //   return (
// // //     <div ref={ref}>LoadMore</div>
// // //   )
// // // }

// // import React, { useEffect, useState } from 'react'
// // import { useInView } from 'react-intersection-observer';
// // import Loader from './Loader';
// // import axios from 'axios';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '@/app/Redux/store';
// // import HomeThread from './HomeThread';

// // interface Feed {
// //     thread_id : number;
// //     username : string;
// //     thread_profilepicture : string;
// //     thread_text : string;
// //     thread_image : string;
// //     created_at : string
// //     like_count : Number;
// //     reply_count : string;
// //     commentprofilepicture1 : string;
// //     commentprofilepicture2 : string;
// //     commentprofilepicture3 : string;
// // }

// // export default function LoadMore() {

// //   const { ref, inView } = useInView();
// //   const [isFirstRender, setIsFirstRender] = useState(true);
// //   const [loading,setLoading] = useState(true);
// //   const [page,setPage] = useState(2);
// //   const username = useSelector((state : RootState) => state.profileData.username);
// //   const [loadMore,setLoadMore] = useState<Feed[]>([]);

// // useEffect(() => {
    
// //     async function loadMoreFeed(){

// //         // Check if it's not the first render and inView is true
// //         if (!isFirstRender && inView) {
// //             const response = await axios.post('/api/loadMore',{
// //                 username : username,
// //                 page : page,
// //             });

// //             if(response){
// //                 console.log("Page : " + page);
// //                 console.log("Response : " , response.data.data.rows);
// //                 setLoadMore((prev) => [...prev,...response.data.data.rows]);
// //                 setPage(page + 1);
// //                 setLoading(false);
// //             }
// //         }
    
// //         // Update isFirstRender after the first render
// //         if (isFirstRender) {
// //           setIsFirstRender(false);
// //         }

// //     }

// //     loadMoreFeed();
    
// //   }, [inView, isFirstRender]);

// //   return (
// //     <div ref={ref}>
        
// //         {
// //             loading ? 
             
// //                 <div className='w-full flex justify-center m-5'>
// //                     <Loader/>
// //                 </div>
// //             :

// //             (
// //                 loadMore && loadMore.map((thread : Feed) => (
// //                   <HomeThread
// //                     id={thread.thread_id}
// //                     key={thread.created_at}
// //                     threadUsername={thread.username}
// //                     profilePicture={thread.thread_profilepicture}
// //                     text={thread.thread_text}
// //                     image={thread.thread_image}
// //                     time={thread.created_at}
// //                     likeCount={thread.like_count}
// //                     replyCount={thread.reply_count}
// //                     commentprofilepicture1={thread.commentprofilepicture1}
// //                     commentprofilepicture2={thread.commentprofilepicture2}
// //                     commentprofilepicture3={thread.commentprofilepicture3}
// //                   />
// //                 ))
// //             )
// //         }
// //     </div>
// //   )
// // }

// import React, { useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import Loader from './Loader';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/Redux/store';
// import HomeThread from './HomeThread';

// interface Feed {
//   thread_id: number;
//   username: string;
//   thread_profilepicture: string;
//   thread_text: string;
//   thread_image: string;
//   created_at: string;
//   like_count: Number;
//   reply_count: string;
//   commentprofilepicture1: string;
//   commentprofilepicture2: string;
//   commentprofilepicture3: string;
// }

// export default function LoadMore() {
//   const { ref, inView } = useInView();
//   const [isFirstRender, setIsFirstRender] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(2);
//   const username = useSelector((state: RootState) => state.profileData.username);
//   const [loadMore, setLoadMore] = useState<Feed[]>([]);

//   useEffect(() => {
//     async function loadMoreFeed() {
//       // Set loading to true whenever a new data fetch is triggered
//       setLoading(true);

//       // Check if it's not the first render and inView is true
//       if (!isFirstRender && inView) {
//         const response = await axios.post('/api/loadMore', {
//           username: username,
//           page: page,
//         });

//         if (response) {
//           console.log("Page : " + page);
//           console.log("Response : ", response.data.data.rows);
//           setLoadMore((prev) => [...prev, ...response.data.data.rows]);
//           setPage(page + 1);
//         }
//       }

//       // Update isFirstRender after the first render
//       if (isFirstRender) {
//         setIsFirstRender(false);
//       }

//       // Set loading to false after data fetch is complete
//       setLoading(false);
//     }

//     loadMoreFeed();
//   }, [inView, isFirstRender]);

//   return (
//     <div ref={ref}>
//       {loadMore.map((thread: Feed) => (
//         <HomeThread
//           id={thread.thread_id}
//           key={thread.created_at}
//           threadUsername={thread.username}
//           profilePicture={thread.thread_profilepicture}
//           text={thread.thread_text}
//           image={thread.thread_image}
//           time={thread.created_at}
//           likeCount={thread.like_count}
//           replyCount={thread.reply_count}
//           commentprofilepicture1={thread.commentprofilepicture1}
//           commentprofilepicture2={thread.commentprofilepicture2}
//           commentprofilepicture3={thread.commentprofilepicture3}
//         />
//       ))}
//       {loading && (
//         <div className='w-full flex justify-center m-5'>
//           <Loader />
//         </div>
//       )}
//     </div>
//   );
// }


// // import React, { useEffect, useState } from 'react'
// // import { useInView } from 'react-intersection-observer';

// // export default function LoadMore() {

// //   const { ref, inView } = useInView();
// //   const [isFirstRender, setIsFirstRender] = useState(true);

// //   useEffect(() => {
    
// //     // Check if it's not the first render and inView is true
// //     if (!isFirstRender && inView) {
// //       alert("Infinite Scroller");
// //     }

// //     // Update isFirstRender after the first render
// //     if (isFirstRender) {
// //       setIsFirstRender(false);
// //     }

// //   }, [inView, isFirstRender]);

// //   return (
// //     <div ref={ref}>LoadMore</div>
// //   )
// // }

// import React, { useEffect, useState } from 'react'
// import { useInView } from 'react-intersection-observer';
// import Loader from './Loader';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/app/Redux/store';
// import HomeThread from './HomeThread';

// interface Feed {
//     thread_id : number;
//     username : string;
//     thread_profilepicture : string;
//     thread_text : string;
//     thread_image : string;
//     created_at : string
//     like_count : Number;
//     reply_count : string;
//     commentprofilepicture1 : string;
//     commentprofilepicture2 : string;
//     commentprofilepicture3 : string;
// }

// export default function LoadMore() {

//   const { ref, inView } = useInView();
//   const [isFirstRender, setIsFirstRender] = useState(true);
//   const [loading,setLoading] = useState(true);
//   const [page,setPage] = useState(2);
//   const username = useSelector((state : RootState) => state.profileData.username);
//   const [loadMore,setLoadMore] = useState<Feed[]>([]);

// useEffect(() => {
    
//     async function loadMoreFeed(){

//         // Check if it's not the first render and inView is true
//         if (!isFirstRender && inView) {
//             const response = await axios.post('/api/loadMore',{
//                 username : username,
//                 page : page,
//             });

//             if(response){
//                 console.log("Page : " + page);
//                 console.log("Response : " , response.data.data.rows);
//                 setLoadMore((prev) => [...prev,...response.data.data.rows]);
//                 setPage(page + 1);
//                 setLoading(false);
//             }
//         }
    
//         // Update isFirstRender after the first render
//         if (isFirstRender) {
//           setIsFirstRender(false);
//         }

//     }

//     loadMoreFeed();
    
//   }, [inView, isFirstRender]);

//   return (
//     <div ref={ref}>
        
//         {
//             loading ? 
             
//                 <div className='w-full flex justify-center m-5'>
//                     <Loader/>
//                 </div>
//             :

//             (
//                 loadMore && loadMore.map((thread : Feed) => (
//                   <HomeThread
//                     id={thread.thread_id}
//                     key={thread.created_at}
//                     threadUsername={thread.username}
//                     profilePicture={thread.thread_profilepicture}
//                     text={thread.thread_text}
//                     image={thread.thread_image}
//                     time={thread.created_at}
//                     likeCount={thread.like_count}
//                     replyCount={thread.reply_count}
//                     commentprofilepicture1={thread.commentprofilepicture1}
//                     commentprofilepicture2={thread.commentprofilepicture2}
//                     commentprofilepicture3={thread.commentprofilepicture3}
//                   />
//                 ))
//             )
//         }
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Loader from './Loader';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Redux/store';
import HomeThread from './HomeThread';

interface Feed {
  thread_id: number;
  username: string;
  thread_profilepicture: string;
  thread_text: string;
  thread_image: string;
  created_at: string;
  like_count: Number;
  reply_count: string;
  commentprofilepicture1: string;
  commentprofilepicture2: string;
  commentprofilepicture3: string;
}

export default function LoadMore() {
  const { ref, inView } = useInView();
  const [isFirstRender, setIsFirstRender] = useState(true);
  // Infinite scroller is basically pagination of data. Here, we set the page to 2 because we have already fetched the 1st page. With the help of the page will will be querying the new set of Threads as we scroll. The logic is : 
  // SELECT * FROM Threads WHERE username != ${data.username} LIMIT 3 OFFSET ${(data.page - 1) * 3} 
  // Here when the page is 2, LIMIT 3 OFFSET 3
  // This will fetch 3 Threads after the offset.  
  const [page, setPage] = useState(2);
  const username = useSelector((state: RootState) => state.profileData.username);
  const [loadMore, setLoadMore] = useState<Feed[]>([]);
  // Initially we set the loadingThreads to 3 because we have already fetched 3 posts using the '/api/getHomeThreads'.   
  const [loadingThreads,setLoadingThreads] = useState(3);

  useEffect(() => {
    async function loadMoreFeed() {

      // Check if it's not the first render and inView is true. The reason i am implementing this is because when we first render the home page since loadmore is more of a static component which is a loader until we reach the bottom. So, when the page is rendered for the first time we are fetching 3 posts so what happens is while we are fetching the loader for that is shown which takes very short enabling the loadMore loader to be visible i.e it is present in inView which triggers the loadMore fetch request which is not what i want. So, to avoid this i have written the logic to not make a fetch req for the first render. 
      if (!isFirstRender && inView) {
        var response = await axios.post('/api/loadMore', {
          username: username,
          page: page,
        });

        if (response) {
          // [...prev, ...response.data.data.rows]. ...prev will include all the previously fetched threads. ...response.data.data.rows updates the array with newly fetched threads.
          setLoadMore((prev) => [...prev, ...response.data.data.rows]);
          setPage(page + 1);
          // It keeps track of the number of threads fetched. As long as number of threads fetched is not 0, we display a loader. 
          setLoadingThreads(response.data.data.rows.length);
        }
      }

      // Update isFirstRender after the first render
      if (isFirstRender) {
        setIsFirstRender(false);
      }

    }

    loadMoreFeed();
  }, [inView, isFirstRender]);

  return (
    <>
        <div>
            {loadMore.map((thread: Feed) => (
                <HomeThread
                id={thread.thread_id}
                key={thread.created_at}
                threadUsername={thread.username}
                profilePicture={thread.thread_profilepicture}
                text={thread.thread_text}
                image={thread.thread_image}
                time={thread.created_at}
                likeCount={thread.like_count}
                replyCount={thread.reply_count}
                commentprofilepicture1={thread.commentprofilepicture1}
                commentprofilepicture2={thread.commentprofilepicture2}
                commentprofilepicture3={thread.commentprofilepicture3}
                />
            ))}
        </div>

        <div ref={ref}>
                
        {
            loadingThreads!=0 &&

                <div ref={ref} className='w-full flex justify-center m-10'>
                    <Loader />
                </div>
        }

        </div>

    </>
  );
}
