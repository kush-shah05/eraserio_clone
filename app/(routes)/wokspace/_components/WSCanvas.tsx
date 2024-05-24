import React, { useEffect, useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from "@/app/dashboard/_components/FileList";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { putWhiteboard } from "@/convex/files";

const WSCanvas = ({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) => {
  const updateWhiteBoard=useMutation(api.files.putWhiteboard)
  const [savedCanvasdata, setsavedCanvasData] = useState<any>();
  const saveWhiteBoard = () => {
updateWhiteBoard({
  _id:fileId,
  whiteboard:JSON.stringify(savedCanvasdata)
}).then(resp=>console.log(resp))
  };
  useEffect(() => {
    onSaveTrigger && saveWhiteBoard();
  }, [onSaveTrigger]);
  return (
    <div>
      <div style={{ height: "670px" }}>
       {fileData&& <Excalidraw
          theme="light"
          initialData={{
            elements:fileData?.whiteboard&&JSON.parse(fileData?.whiteboard)
          }}
          onChange={(excalidrawElements, appState, files) =>
            setsavedCanvasData(excalidrawElements)
          }
          UIOptions={{
            canvasActions: {
              saveToActiveFile: false,
              loadScene: false,
              export: false,
              toggleTheme: false,
            },
          }}
        >
          <WelcomeScreen>
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Center>
              <WelcomeScreen.Center.Logo />
              <WelcomeScreen.Center.Heading>
                Welcome Screen Heading!
              </WelcomeScreen.Center.Heading>
              <WelcomeScreen.Center.Menu>
                <WelcomeScreen.Center.MenuItemHelp />
              </WelcomeScreen.Center.Menu>
            </WelcomeScreen.Center>
          </WelcomeScreen>
          <MainMenu>
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.SaveAsImage />
            <MainMenu.DefaultItems.ChangeCanvasBackground />
          </MainMenu>
        </Excalidraw>}
      </div>
    </div>
  );
};

export default WSCanvas;
