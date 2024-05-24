"use client";
import React, { useEffect, useState } from "react";
import WSHeader from "../_components/WSHeader";
import Editor from "../_components/Editor";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FILE } from "@/app/dashboard/_components/FileList";
import WSCanvas from "../_components/WSCanvas";
const Workspace = ({ params }: any) => {
  const convex = useConvex();
  const [triggerSave, settriggerSave] = useState(false);
  const [fileData, setFileData] = useState<FILE | any>();
  useEffect(() => {
    params.fileId && getFileData();
  }, []);
  const getFileData = async () => {
    const result = await convex.query(api.files.getFileData, {
      _id: params.fileId,
    });
    setFileData(result);
    console.log(result);
  };
  return (
    <div>
      <WSHeader onSave={() => settriggerSave(!triggerSave)} />
      {/* workspace layout */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* document */}
        <div className="h-screen">
          <Editor
            fileData={fileData}
            fileId={params.fileId}
            onSaveTrigger={triggerSave}
          />
        </div>
        {/* whiteboard canvas */}
        <div className=" h-screen border-l">
          <WSCanvas 
          
          onSaveTrigger={triggerSave}
          fileData={fileData}
          fileId={params.fileId}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
