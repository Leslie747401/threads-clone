import { ModeToggle } from './Modetoggle'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs";
import UserFollowCard from './UserFollowCard';

export default async function RightsideBar() {
  
  const session_data =  await currentUser();
  const firstname = session_data?.firstName
  const lastname = session_data?.lastName;
  const useremail = session_data?.emailAddresses[0].emailAddress;
  
  return (
    // Sticky acts as fixed once it is scrolled enough to touch the top/bottom/left/right of the screen. Since i have already assigned it as top-0 it will act as fixed. You might be thinking why did i not use fixed in the first place, well, i did but it was giving some overflow issues

    <div className='sticky right-0 top-0 h-screen max-w-fit pl-12 pt-12 pr-12 border-l border-[gainsboro] dark:border-[#222429] hidden xl:block'>
        
        <div className='flex gap-4 items-center mb-14'>
           <UserButton afterSignOutUrl='/sign-in'/>
            <div className='flex-col'>
                <p className='text-sm font-medium'>{firstname} {lastname}</p>
                <p className='text-sm text-gray-400'>{useremail}</p>
            </div>
            <div className='ml-10'>
                <ModeToggle/>
            </div>
        </div>

        <div className='flex justify-between font-medium mb-2'>
            <p className='text-[#909090]'>Suggested for you</p>
            <button>See All</button>
        </div>

        <div className='flex flex-col gap-8 mb-10'></div>

        <div className='flex flex-col gap-8 mb-10'>

            <UserFollowCard
                image='/assets/images/user.png'
                fullname='Skylar Lawson'
                username='Skylar_123'
            />

            <UserFollowCard
                image='/assets/images/user.png'
                fullname='Jackson Carter'
                username='Jackson_123'
            />

            <UserFollowCard
                image='/assets/images/user.png'
                fullname='Benjamin Parker'
                username='Benjamin_123'
            />

        </div>

    </div>
  )
}
 