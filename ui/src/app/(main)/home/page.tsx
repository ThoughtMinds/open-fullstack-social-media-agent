"use client";
import "@copilotkit/react-ui/styles.css";

import React, { useState } from "react";
import Sidebar from "@/components/AppSidebar";
import MainContent from "@/components/MainContent";
import {
  CopilotKit,
  useCopilotAction,
  useCopilotReadable,
  useCoAgentStateRender,
  useCoAgent
} from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

// Configurable keys
// LinkedIn
export const LINKEDIN_PERSON_URN = "linkedInPersonUrn";
export const LINKEDIN_ORGANIZATION_ID = "linkedInOrganizationId";
export const LINKEDIN_ACCESS_TOKEN = "linkedInAccessToken";
export const POST_TO_LINKEDIN_ORGANIZATION = "postToLinkedInOrganization";
export const LINKEDIN_USER_ID = "linkedInUserId";
// Twitter
export const TWITTER_USER_ID = "twitterUserId";
export const TWITTER_TOKEN = "twitterToken";
export const TWITTER_TOKEN_SECRET = "twitterTokenSecret";
export const INGEST_TWITTER_USERNAME = "ingestTwitterUsername";
// Simplified text only mode
export const TEXT_ONLY_MODE = "textOnlyMode";

export const SKIP_CONTENT_RELEVANCY_CHECK = "skipContentRelevancyCheck";

export const SKIP_USED_URLS_CHECK = "skipUsedUrlsCheck";


type AgentState = {
  [SKIP_CONTENT_RELEVANCY_CHECK]:boolean,
  [SKIP_USED_URLS_CHECK]:boolean,
  [TEXT_ONLY_MODE]:boolean
  links: string[],
  post: string,
  /**
   * The date to schedule the post for.
   */
  scheduleDate: Date,
  /**
   * Response from the user for the post. Typically used to request
   * changes to be made to the post.
   */
  userResponse: string,
  /**
   * The node to execute next.
   */
  /**
   * The image to attach to the post, and the MIME type.
   */
  image:{
        imageUrl: string;
        mimeType: string;
      }
}

const HomePage = () => {
  return (
    <ProtectedRoute>
      <div className="flex w-full">
        <Sidebar />
        <MainContent />

        <CopilotKit runtimeUrl="/api/copilotkit">
          <CopilotSidebar
            instructions={
              "You are a social media manager at a marketing firm. your job is to generate content for a social media post from a url that is given by user. use the generate_post agent to create the post content"
            }
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
  // Hardcoded image URLs
  const images = [
    "https://unsplash.it/200/200?id=1",
    "https://unsplash.it/200/200?id=2",
    "https://unsplash.it/200/200?id=3",
    "https://unsplash.it/200/200?id=4",
  ];

  // Make images readable by Copilot
  // useCopilotReadable({
  //   description: "List of available images",
  //   value: images,
  // });

  const { state,setState } = useCoAgent<AgentState>({ 
    name: "generate_post",
    initialState:{
      links:[],
      [SKIP_CONTENT_RELEVANCY_CHECK]:true,
      [SKIP_USED_URLS_CHECK]:true,
      [TEXT_ONLY_MODE]:false
    }
  });

  // useCoAgentStateRender({
  //   name: "generate_post",
  //   render: ({ state }) => {
  //     return <div>State: {JSON.stringify(state,null,2)}</div>;
  //   },
  // });

  useCopilotAction({
    name: "get_blog_url",
    description:"if a link is not availabe then ask the user for a blog url",
    parameters: [
          {
            name: "link",
            type: "string",
            description: "Link of blog to generate post for",
            required: true,
          },
        ],
    handler: async ({link})=>{
      setState({...state,links:[link]})
    }
  })
  // useCopilotAction({
  //   name: "displayImages",
  //   description: "Display a set of hardcoded images in the chat",
  //   parameters: [
  //     {
  //       name: "images",
  //       type: "string[]",
  //       description: "Array of image URLs to display",
  //       required: true,
  //     },
  //   ],
  //   render: () => {
  //     const [selected, setSelected] = React.useState<string[]>([]);

  //     const toggleImage = (src: string) => {
  //       setSelected((prev) =>
  //         prev.includes(src)
  //           ? prev.filter((img) => img !== src)
  //           : [...prev, src],
  //       );
  //     };

  //     const confirmSelection = () => {
  //       console.log("Selected images:", selected);
  //     };

  //     return (
  //       <div className="p-0">
  //         <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
  //           Select Images
  //         </h3>
  //         <div className="grid grid-cols-2 gap-4">
  //           {images.map((src, index) => (
  //             <div
  //               key={index}
  //               className={`cursor-pointer rounded-lg overflow-hidden shadow-md border-4 transition-all ${
  //                 selected.includes(src)
  //                   ? "border-blue-500"
  //                   : "border-white dark:border-gray-800"
  //               }`}
  //               onClick={() => toggleImage(src)}
  //             >
  //               <img
  //                 src={src}
  //                 alt={`Gallery image ${index + 1}`}
  //                 className="w-full h-auto"
  //               />
  //             </div>
  //           ))}
  //         </div>

  //         {selected.length > 0 && (
  //           <div className="mt-4">
  //             <button
  //               onClick={confirmSelection}
  //               className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
  //             >
  //               Confirm Selection ({selected.length})
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   },

  //   handler: async () => {
  //     // Return `null` so CopilotKit doesn't double-render the data
  //     return null;
  //   },
  // });

  return (
    <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* <Sidebar/>
      <MainContent /> */}
      <div>
      <h1>Your main content</h1>
      <p>State: {JSON.stringify(state,null,2)}</p>
    </div>
      
    </div>
  );
};

export default HomePage;
