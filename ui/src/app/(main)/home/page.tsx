"use client";

import "@copilotkit/react-ui/styles.css";
import React from "react";
import Sidebar from "@/components/AppSidebar";
import MainContent from "@/components/MainContent";
import {
  CopilotKit,
  useCopilotAction,
} from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import ProtectedRoute from "@/components/ProtectedRoute";
import { INSTRUCTIONS } from "./instructions";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <div className="flex w-full">
        <Sidebar />
        <MainContent />
        <CopilotKit runtimeUrl="/api/copilotkit">
          <CopilotSidebar
            instructions={INSTRUCTIONS}
            labels={{
              initial: "Welcome to the app! How can I help you?",
            }}
            defaultOpen={true}
            clickOutsideToClose={false}
          >
            <Main />
          </CopilotSidebar>
        </CopilotKit>
      </div>
    </ProtectedRoute>
  );
};

const Main = () => {
  const images = [
    "https://unsplash.it/200/200?id=1",
    "https://unsplash.it/200/200?id=2",
    "https://unsplash.it/200/200?id=3",
    "https://unsplash.it/200/200?id=4",
  ];

  // --- GeneratePostForBlog Action ---
  // useCopilotAction({
  //   name: "GetThreadState",
  //   description: "When the post generation has been to get the status of the post generation",
  //   parameters: [
  //     {
  //       name: "thread_id",
  //       type: "string",
  //       description: "the thread_id of the current generating post",
  //       required: true,
  //     },
  //   ],
  //   handler: async ({ thread_id }) => {
  //     console.log("Starting generation for link:", thread_id);
  //     // You can trigger a backend API here if needed
  //   },
  //   render: ({ args, result, status }) => {
  //     return (
  //       <div>
  //         {status === "loading" && <p>Generating post for {args?.link}...</p>}
  //         {status === "success" && <p>Post generated successfully!</p>}
  //         {status === "error" && <p>Failed to generate post.</p>}
  //       </div>
  //     );
  //   },
  // });

  return null;
};

export default HomePage;


