'use client'
import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { useConvex, useMutation } from "convex/react"
import { useEffect } from "react"
import Header from "./_components/Header"
import FileList from "./_components/FileList"

const page = () => {
    const {user}:any=useKindeBrowserClient()
    const convex=useConvex();
  //const getUser=useQuery(api.user.getUser,{email:user?.email})
  const createUser=useMutation(api.user.createUser);
  useEffect(()=>{
    if(user){
      checkUser();
    }
  },[user])

const checkUser=async()=>{
 const result=await convex.query(api.user.getUser,{email:user?.email})
 if(!result?.length){
    createUser({
      name:user.given_name,
      email:user.email,
      image:user.picture
    }).then((resp)=>console.log(resp))
  }
}
  return (
    <div className="p-8">
      <Header/>

      <FileList/>
    </div>
  )
}

export default page