
import React, { useEffect, useState } from 'react'
import SideNavTop, { TEAM } from './SideNavTop'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import SideNavBottom from './SideNavBottom';
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import {toast} from 'sonner'
const SideNav = () => {
    const createFile=useMutation(api.files.createFile)
    const {user}=useKindeBrowserClient();
    const [activeTeam,setActiveTeam]=useState<TEAM>();
    const convex=useConvex();
    const [Files,setFiles]=useState<Number>();
    const onFileCreate=(fileName:string)=>{
        console.log(fileName)
        createFile({
            fileName:fileName,
            teamId:activeTeam?._id,
            createdBy:user?.email,
            archive:false,
            document:'',
            whiteboard:''
        }).then((resp)=>{
            if(resp){
                getFiles()
                toast('File Created Successfully')

            }
            console.log(resp)
        },(e)=>{
            toast('error while creating file')
        })
    }
useEffect(()=>{
    activeTeam&&getFiles();
},[activeTeam])
    const getFiles=async()=>{
        const result=await convex.query(api.files.getFiles, {teamId:activeTeam?._id})
        console.log(result);
        setFiles(result.length)
    }
  return (
    <div className='h-screen fixed flex flex-col w-72 border-r border-[1px] p-6'>
        
        <div className='flex-1'><SideNavTop user={user} setActiveTeamInfo={(activeTeam:TEAM)=>setActiveTeam(activeTeam)}/></div>
       <div> <SideNavBottom Files={Files} onFileCreate={onFileCreate}/></div>
    </div>
  )
}



export default SideNav


