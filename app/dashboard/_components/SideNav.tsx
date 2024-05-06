
import React, { useState } from 'react'
import SideNavTop, { TEAM } from './SideNavTop'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottom from './SideNavBottom';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {toast} from 'sonner'
const SideNav = () => {
    const createFile=useMutation(api.files.createFile)
    const {user}=useKindeBrowserClient();
    const [activeTeam,setActiveTeam]=useState<TEAM>();

    const onFileCreate=(fileName:string)=>{
        console.log(fileName)
        createFile({
            fileName:fileName,
            teamId:activeTeam?._id,
            createdBy:user?.email
        }).then((resp)=>{
            if(resp){
                toast('File Created Successfully')

            }
            console.log(resp)
        },(e)=>{
            toast('error while creating file')
        })
    }
  return (
    <div className='h-screen fixed flex flex-col w-72 border-r border-[1px] p-6'>
        
        <div className='flex-1'><SideNavTop user={user} setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/></div>
       <div> <SideNavBottom onFileCreate={onFileCreate}/></div>
    </div>
  )
}

export default SideNav


