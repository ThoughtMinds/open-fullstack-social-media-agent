"use client"

import MainContent from "@/components/MainContent";
import SideBar from "@/components/Sidebar";
import { CopilotPopup, CopilotChat } from "@copilotkit/react-ui";
 
export default function Home() {
  return (
    <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar - 1/5 of the width */}
      <div className="flex-none w-[220px] min-w-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md h-full">
        <SideBar />
      </div>

      {/* MainContent - 3/5 of the width */}
      <div className="flex-grow w-3/5 min-w-[300px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 pl-7 overflow-y-auto h-full">
        <MainContent />
      </div>

      {/* CopilotChat - 1/5 of the width */}
      <div className="flex-none w-[350px] min-w-[200px] bg-gray-50 dark:bg-gray-800 h-full">
        <CopilotChat
          instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
          labels={{
            title: "Popup Assistant",
            initial: "Need any help?",
          }}
          className="h-full pb-4"
        />
      </div>
    </div>
  );
}