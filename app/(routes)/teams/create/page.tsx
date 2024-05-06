"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner"

const createTeam = () => {
    const router=useRouter();
  const [teamName, setteamName] = useState("");
  const createTeam=useMutation(api.teams.creatTeam);
const {user}:any=useKindeBrowserClient()
  const createNewTeam=()=>{
    createTeam({
        teamName:teamName,
        createdBy:user?.email
    }).then((resp)=>{
        if(resp){
            router.push('/dashboard')
            toast("Team created successfully !")
        }
    })
  }
  return (
    <div className="px-6 md:px-16 my-12">
      <Image src="/logo-black-_1_.svg" width={200} height={200} alt="logo" />
      <div className="flex flex-col items-center mt-8">
        <h2 className="font-bold text-[40px] py-3">
          what should we call your team
        </h2>
        <h2 className="text-gray-500">
          you can always change this from settings
        </h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">Team Name</label>
          <Input
            className="mt-3"
            onChange={(e) => setteamName(e.target.value)}
            placeholder="enter team name"
          />
        </div>
        <Button
        onClick={()=>{createNewTeam()}}
          disabled={!(teamName && teamName?.length > 0)}
          className="bg-blue-500 mt-8 w-[30%] hover:bg-blue-700"
        >
          Create team
        </Button>
      </div>
    </div>
  );
};

export default createTeam;
