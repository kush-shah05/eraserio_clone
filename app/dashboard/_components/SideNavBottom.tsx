'use client'
import { Button } from '@/components/ui/button'
import { Archive, Flag, Github } from 'lucide-react'
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
  

const SideNavBottom = ({onFileCreate}:any) => {
    const [FileName,setFileName]=useState('');
    const menuList=[{
        id:1,
        name:'Getting started',
        icon:Flag,
        path:''
    },{
        id:2,
        name:'Github',
        icon:Github,
        path:''


    },{
        id:3,
        name:'Archive',
        icon:Archive,
        path:''

    }]
  return (
    <div>
         {menuList.map((item, index) => (
            <h2
              key={index}
              className="p-1 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </h2>
          ))}
          {/* add new file button */}
          <Dialog>
  <DialogTrigger className='w-full' asChild>
  <Button className='mt-3 w-full bg-blue-600 justify-start hover:bg-blue-700'>Add New File</Button>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New File</DialogTitle>
      <DialogDescription>
        <Input 
        
        onChange={(e)=>setFileName(e.target.value)}
        className='mt-3' placeholder='Enter File Name'/>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button 
            onClick={()=>onFileCreate(FileName)}
            disabled={!(FileName&&FileName.length>0)}
             type="button" className="bg-blue-600 hover:bg-blue-700 w-max">
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>


          {/* progressbar */}
          <div className='mt-5 h-4 w-full bg-gray-200 rounded-full'>
            <div className='bg-blue-600 rounded-full w-[40%] h-4'></div>
          </div>
          <h2 className='text-[12px] mt-3'><strong>1</strong> out of <strong>5</strong> files used</h2>
          <h2 className='text-[12px] mt-1'>Upgrade your plan for unlimited access.</h2>
    </div>
  )
}

export default SideNavBottom