'use client'

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import { UploadButton} from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import Image from 'next/image';
import { X , Check} from 'lucide-react';
import { useRef , useEffect } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import axios from 'axios'
import { useSession } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface OnboardingProps {}

const Onboarding: FC<OnboardingProps> = () => {
  const [fullname, setFullname] = useState<string>('');
  const [newusername, setNewusername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [image,setImage] = useState<string | StaticImport>('');
  const { toast } = useToast();
  const [validUsername,setValidUsername] = useState<String>('');
  const [usernamefromdb,setUsernamefromdb] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const session_data = useSession();  
    
  useEffect(() => {

    // Checks whether the username entered by the user already exists in the Database.
    async function verifyUsername(){
        const username_data = await axios.post('/api/verifyUsername',{
          username : newusername,
        });
        setUsernamefromdb(username_data.data.data[0]?.username);
      }

    // It is only called when the username text field has some text in it and not empty.
    if(newusername){
      verifyUsername();
    }

  },[newusername]); // Called every time the value of the text changes.

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    // Storing the Onboarding user's data in Database.
    const response = await axios.post('/api/postOnboardingDetails', {
      fullname : fullname,
      username : newusername,
      bio : bio,
      profile_picture : image,
      email : session_data.session?.user.emailAddresses[0].emailAddress
    });

  };

  // It is used to resize (go to new line) the textarea field when it exceeds the width of textarea or when we press enter. 
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  },[bio]);

  // Checks for the uniqueness of the username (if it already exists then the state is set to invalid and if not then the state is set to valid)
  useEffect(() => {
      function uniqueUsername(){
            
      if(newusername === usernamefromdb){
        setValidUsername('Not Valid');
      }

      else{
        setValidUsername('Valid');
      } 
    }
    
    uniqueUsername();
    
  },[newusername,usernamefromdb])


  return (

    <form className='w-full sm:w-[464px] p-8 rounded-xl bg-black max-sm:mx-5' onSubmit={handleSubmit}>

      <p className='text-white mb-1 text-2xl font-medium'>Onboarding</p>

      <p className='text-[#b2b2b2] text-sm mb-7'>
        Connect and share moments on Threads
      </p>

      {
        image ? 

        <div className='w-full flex justify-around items-center mb-8'>
          
          <div className='relative w-[80px] h-[80px]'>
            <Image
              src={image}
              alt='profile-icon'
              className='flex justify-center rounded-full object-cover'
              fill
            />

            <div className='absolute p-2 bg-gray-500 rounded-full right-0 cursor-pointer' onClick={() => setImage('')}>
              <X width={15} height={15} className='text-white'/>
            </div>
          </div>

          <div className='text-white bg-blue-600 rounded-3xl p-3 px-7 text-sm flex gap-3 items-center'>
            <Image
                src='/assets/images/toast-checkmark.png'
                width={24}
                height={24}
                alt="tick icon"
              />
            <p className='text-base'>Uploaded</p>
          </div>

        </div>

        : 

          <div className='w-full flex justify-around items-center mb-8'>
            <Image
              src='/assets/images/no-user.jpg'
              width={80}
              height={80}
              alt='profile-icon'
              className='flex justify-center rounded-full'
            />

            <UploadButton endpoint='imageUploader'

              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                setImage(res[0].url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}

              appearance={{
                allowedContent : 'hidden',
                button : 'rounded-3xl'
              }}

            />

          </div>

      }

      <div className='w-full sm:w-[400px] flex justify-between items-center mb-5 bg-[#2a2a2a] rounded-lg'>
        <input
          type='text'
          placeholder='Enter Full name'
          className='w-full sm:w-[340px] h-[50px] rounded-lg outline-none p-3 px-4 pr-0 bg-[#2a2a2a] text-white'
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          required
        />
      </div>

      <div className='w-full sm:w-[400px] flex justify-between items-center mb-5 bg-[#2a2a2a] rounded-lg'>
        <input
          type='text'
          placeholder='Enter Username'
          className='w-full sm:w-[340px] h-[50px] rounded-lg outline-none p-3 px-4 pr-0 bg-[#2a2a2a] text-white'
          onChange={(e) => setNewusername(e.target.value)}
          value={newusername}
          maxLength={16}
          required
        />

        {/* A tick or cross will only be displayed if the username contains some value. if there exists some value in the text field then a tick or cross will be displayed based on whether the user exists or not. */}
        {
          newusername !== ''  && 

          <div className='p-3 px-4'>
            { validUsername === 'Valid' ? <Check className='text-green-500'/> : <X className='text-red-500'/> }
          </div>
        }
      </div>

      <textarea
        placeholder='Enter Bio'
        rows={1}
        className='w-full sm:w-[400px] text-white mb-5 h-[50px] sm:h-[100px] rounded-lg outline-none p-3 px-4 bg-[#2a2a2a] resize-none overflow-hidden'
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        ref={textAreaRef}
        required
      ></textarea>

        <Button type='submit' className={fullname && newusername && bio && image && validUsername === 'Valid' ? 'w-full sm:w-[400px] bg-white text-black font-medium hover:bg-[#dadada] p-6 transition-all' : 'w-full sm:w-[400px] bg-[#bdbdbd] text-black font-medium hover:bg-[#c9c9c9] p-6 pointer-events-none'}
          onClick={() => {
            fullname && newusername && bio && image   // The toast will only be shown if fullname, username , bio and image field exists 
            toast({
              description: "Welcome Aboard",
              duration : 2000,
              className : 'bg-black text-white'
            });
            router.push('/');
          }}>
            Continue
          </Button>

    </form>

  );
};

export default Onboarding;