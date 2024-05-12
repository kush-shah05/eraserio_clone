"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import { FileListContext } from "../_context/FileListContext";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();
  const [FileList_,setFileList_]=useState();
  useEffect(() => {
    user && checkTeam();
  }, [user]);
  const checkTeam = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    if (!result?.length) {
      router.push("teams/create");
    }
  };
  return (
    <div>
      <FileListContext.Provider value={{FileList_,setFileList_}}>
      <div className="grid grid-cols-4">
        <div className='h-screen w-72 fixed'>
          <SideNav />
        </div>
        <div className="col-span-4 ml-72">
            {children}
        </div>
      </div>
      </FileListContext.Provider>
    </div>
  );
};

export default DashboardLayout;
