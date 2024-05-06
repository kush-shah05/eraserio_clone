"use client";
import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Separator } from "@/components/ui/separator";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface TEAM {
  createdBy: string;
  teamName: string;
  _id: string;
}

const SideNavTop = ({ user,setActiveTeamInfo }: any) => {
    const router=useRouter();
    const onMenuClick=(item:any)=>{
        if(item.path){
            router.push(item.path)
        }
    }
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const convex = useConvex();
  const [teamNames, setTeamNames] = useState<TEAM[]>();
  useEffect(() => {
    user && teamList();
  }, [user]);
  useEffect(()=>{
    activeTeam&&setActiveTeamInfo(activeTeam)
  },[activeTeam])
  const teamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamNames(result);
    setActiveTeam(result[0]);
    console.log(result);
  };
  const menu = [
    {
      id: 1,
      name: "Create Team",
      path: "/teams/create",
      icon: Users,
    },
    {
      id: 2,
      name: "Settings",
      path: "",
      icon: Settings,
    },
  ];
  return (
    <div>
<Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer">
          <Image
            className="m-3"
            src="/logo-black-_1_.svg"
            width={75}
            height={75}
            alt="logo"
          />
          <h2 className="flex gap-2 items-center font-bold text-[13px]">
            {activeTeam?.teamName}
            <ChevronDown />
          </h2>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-7 p-4">
        {/* team section */}
        <div>
          {teamNames?.map((item, index) => (
            <h2
              onClick={() => setActiveTeam(item)}
              className={`p-2 rounded-lg hover:bg-blue-500 mb-1 cursor-pointer ${activeTeam?._id == item._id && "bg-blue-500 text-white"}`}
              key={index}
            >
              {item.teamName}
            </h2>
          ))}
        </div>
        <Separator className="mt-2 bg-slate-100" />
        {/* option section */}
        <div>
          {menu.map((item, index) => (
            <h2
            onClick={()=>onMenuClick(item)}
              key={index}
              className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </h2>
          ))}
          <LogoutLink>
            <h2 className="p-2 hover:bg-gray-100 rounded-lg flex gap-2 items-center cursor-pointer">
              <LogOut className="h-4 w-4" />
              Logout
            </h2>
          </LogoutLink>
        </div>
        <Separator className="mt-2 bg-slate-100" />
        {/* user info section */}

        {user && (
          <div className="mt-2 flex gap-2 items-center">
            <Image
              className="rounded-full"
              alt="profile image"
              width={30}
              height={30}
              src={user.picture}
            />
            <div className="">
              <h2 className="text-[14px] fornt-bold">
                {user?.given_name} {user?.family_name}
              </h2>
              <h2 className="text-[12px] text-gray-500">{user?.email}</h2>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
    {/* All files section */}
    <Button variant='outline'
    className="w-full justify-start gap-2 font-bold mt-8 bg-gray-100">
        <LayoutGrid className="h-5 w-5"/>
        All Files
    </Button>
    </div>
    
  );
};

export default SideNavTop;
