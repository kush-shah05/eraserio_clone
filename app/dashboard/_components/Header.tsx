import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { Search, Send } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    const {user}:any=useKindeBrowserClient();
  return (
    <div className='flex justify-end w-full items-center gap-2'>
        <div className='flex gap-2 items-center border rounded-md p-1'>
            <Search className='h-4 w-4'/>
            <input type="text" placeholder='search' name="" id="" />
        </div>
        <div>
            <Image alt='image user' className='cursor-pointer rounded-full' src={user?.picture} width={30} height={30}/>
        </div>
        <Button className='text-sm flex gap-2 h-8 bg-blue-700 hover:bg-blue-600'>
            <Send className='h-4 w-4'/> Invite
        </Button>
    </div>
  )
}

export default Header