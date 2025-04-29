"use client";
import "@copilotkit/react-ui/styles.css";

import React, { useRef, useState } from "react";
import Sidebar from "@/components/AppSidebar";
import MainContent from "@/components/MainContent";
import {
  CopilotKit,
  useCopilotAction,
  useCopilotReadable,
  useCoAgentStateRender,
  useCoAgent,
  useLangGraphInterrupt,
} from "@copilotkit/react-core";
import {
  AssistantMessageProps,
  CopilotSidebar,
  HeaderProps,
  InputProps,
  Markdown,
  MessagesProps,
  useChatContext,
  UserMessageProps,
} from "@copilotkit/react-ui";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { BookOpenIcon, SparklesIcon } from "lucide-react";
import SendIcon from "../assets/send.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

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
  [SKIP_CONTENT_RELEVANCY_CHECK]: boolean;
  [SKIP_USED_URLS_CHECK]: boolean;
  [TEXT_ONLY_MODE]: boolean;
  links: string[];
  post: string;
  /**
   * The date to schedule the post for.
   */
  scheduleDate: Date;
  /**
   * Response from the user for the post. Typically used to request
   * changes to be made to the post.
   */
  userResponse: string;
  /**
   * The node to execute next.
   */
  /**
   * The image to attach to the post, and the MIME type.
   */
  image: {
    imageUrl: string;
    mimeType: string;
  };
  imageOptions: string[];
};
type ContentType = "dashboard" | "schedule" | "settings" | "detailsPage";

interface HomePageProps {
  contentType: ContentType;
}

function Header({}: HeaderProps) {
  const { setOpen, icons, labels } = useChatContext();
  const { authUser } = useAuth();
  return (
    <div className="dark:bg-[#111111]">
      <div className="flex justify-between">
        <div className="p-4 font-bold text-2xl text-[#100833] dark:text-white">
          AI Assistant
        </div>
        <div className="p-4 w-24 flex justify-end">
          <button onClick={() => setOpen(false)} aria-label="Close">
            {icons.headerCloseIcon}
          </button>
        </div>
      </div>

      <div className="pb-4 m-4 mt-0 h-[270px] border-t border-b border-[#BCD6FB] flex flex-col justify-end items-center space-x-3">
        <img
          src="https://unsplash.it/200/200?id=50"
          alt="Avatar"
          className="w-[140px] h-[140px] rounded-full mb-4"
        />
        <div className="text-center">
          <h3 className="text-lg font-bold text-2xl text-gray-800">
            <div className="bg-gradient-to-r from-[#725AF5] to-[#5E97F7] bg-clip-text text-transparent">
              Good morning,
            </div>
            <div className="dark:text-white">{authUser?.name || "Guest"}</div>
          </h3>
          <p className="text-sm text-[#868686]">
            I am here to assist you with your social media tasks.
          </p>
        </div>
      </div>
    </div>
  );
}

const CustomUserMessage = (props: UserMessageProps) => {
  const wrapperStyles = "flex items-center gap-2 justify-end mb-4";
  const messageStyles =
    "bg-[#BCD6FB] text-black dark:text-black py-2 px-4 rounded-xl rounded-br-none break-words flex-shrink-0 max-w-[80%]";
  const avatarStyles =
    "bg-blue-500 shadow-sm min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";

  return (
    <div className={wrapperStyles}>
      <div className={messageStyles}>{props.message}</div>
      {/* <div className={avatarStyles}>TS</div> */}
    </div>
  );
};

const CustomAssistantMessage = (props: AssistantMessageProps) => {
  const { icons } = useChatContext();
  const { message, isLoading, subComponent } = props;

  // const avatarStyles = "bg-zinc-400 border-zinc-500 shadow-lg min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";
  const messageStyles =
    "p-[12px] dark:text-black rounded-tl-none rounded-xl bg-[#ECF1FE]";

  // const avatar = <div className={avatarStyles}><SparklesIcon className="h-6 w-6" /></div>

  return (
    <div className="py-2">
      <div className="flex items-start">
        {!subComponent}
        <div className={messageStyles}>
          {message && <Markdown content={message || ""} />}
          {isLoading && icons.spinnerIcon}
        </div>
      </div>
      <div className="my-2">{subComponent}</div>
    </div>
  );
};

function CustomInput({ inProgress, onSend, isVisible }: InputProps) {
  const handleSubmit = (value: string) => {
    if (value.trim()) onSend(value);
  };

  const wrapperStyle =
    "flex gap-2 p-2 mx-4 dark:bg-[#111111] border rounded-lg border-[#BCD6FB]";
  const inputStyle =
    "flex-1 p-1 focus:outline-none focus:border-blue-500 disabled:bg-gray-100 dark:bg-[#111111]";
  const buttonStyle =
    "px-2 py-2 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <div className={wrapperStyle}>
      <input
        disabled={inProgress}
        type="text"
        placeholder="Type here..."
        className={inputStyle}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      <button
        disabled={inProgress}
        className={buttonStyle}
        onClick={(e) => {
          const input = e.currentTarget
            .previousElementSibling as HTMLInputElement;
          handleSubmit(input.value);
          input.value = "";
        }}
      >
        <Image
          src={SendIcon}
          alt="Send"
          width={24}
          height={24}
          className={
            inProgress ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }
        />
      </button>
    </div>
  );
}

const HomePage = ({ contentType }: HomePageProps) => {
  return (
    <ProtectedRoute>
      <div className="flex w-full">
        <Sidebar />
        <MainContent contentType={contentType} />

        {/* <CopilotKit runtimeUrl="/api/copilotkit"> */}
          <CopilotSidebar
            Header={Header}
            Input={CustomInput}
            AssistantMessage={CustomAssistantMessage}
            UserMessage={CustomUserMessage}
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
        {/* </CopilotKit> */}
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

  const { state, setState } = useCoAgent<AgentState>({
    name: "generate_post",
    initialState: {
      links: [],
      [SKIP_CONTENT_RELEVANCY_CHECK]: true,
      [SKIP_USED_URLS_CHECK]: true,
      [TEXT_ONLY_MODE]: false,
    },
  });

  useCoAgentStateRender({
    name: "generate_post",
    render: ({ state }) => {
      console.log(state);
      // return <div>State: {JSON.stringify(state,null,2)}</div>;
      return <div></div>;
    },
  });

  useCopilotAction({
    name: "get_blog_url",
    description: "if a link is not availabe then ask the user for a blog url",
    parameters: [
      {
        name: "link",
        type: "string",
        description: "Link of blog to generate post for",
        required: true,
      },
    ],
    handler: async ({ link }) => {
      setState({ ...state, links: [link] });
    },
  });
  useLangGraphInterrupt({
    render: ({ event, resolve }) => {
      console.log("interrupt", state, event);
      const { imageOptions } = event.value[0].action_request.args;
      const [selected, setSelected] = React.useState<string[]>([]);

      const toggleImage = (src: string) => {
        setSelected((prev) =>
          prev.includes(src)
            ? prev.filter((img) => img !== src)
            : [...prev, src],
        );
      };

      const confirmSelection = () => {
        console.log("Selected images:", selected);
      };

      return (
        <div className="p-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Select Images
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {imageOptions.map((src, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg overflow-hidden shadow-md border-4 transition-all ${
                  selected.includes(src)
                    ? "border-blue-500"
                    : "border-white dark:border-gray-800"
                }`}
                onClick={() => toggleImage(src)}
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="mt-4">
              <button
                onClick={confirmSelection}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Confirm Selection ({selected.length})
              </button>
            </div>
          )}
        </div>
      );
    },
  });
  // useCopilotAction({
  //   name: "select_cover_image",
  //   description: "show the user a list of imageOptions and let the user select a cover image of the post",
  //   parameters: [
  //     {
  //       name: "imageOptions",
  //       type: "string[]",
  //       description: "Array of image URLs to display",
  //       required: true,
  //     },
  //   ],
  //   render: ({status ,args}) => {
  //     console.log(status)
  //     const { imageOptions} = args;
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
  //           {imageOptions.map((src, index) => (
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

  // return (
  //   <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
  //     {/* <Sidebar/>
  //     <MainContent /> */}
  //     <div>
  //     <h1>Your main content</h1>
  //     <p>State: {JSON.stringify(state,null,2)}</p>
  //   </div>

  //   </div>
  // );
  return <div></div>;
};

export default HomePage;


// "use client"

// import { CopilotKit } from "@copilotkit/react-core";
// import { MenuIcon, MessageCircleIcon, XIcon } from "lucide-react";
// import CustomChatInterface from "./chat/CustomChatInterface";
// import MainContent from "./MainContent";
// import AppSidebar from "./AppSidebar";
// import ProtectedRoute from "./ProtectedRoute";
// import { useState } from "react";

// type ContentType = "dashboard" | "schedule" | "settings"| "detailsPage";

// interface HomePageProps {
//   contentType: ContentType;
// }
// const HomePage = ({ contentType }: HomePageProps) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [copilotOpen, setCopilotOpen] = useState(false);

//   // Toggle functions for mobile view
//   const toggleCopilot = () => setCopilotOpen(!copilotOpen);

//   return (
//     <ProtectedRoute>
//       <div className="flex flex-col md:flex-row w-full min-h-screen relative">
//         {/* Mobile navbar with toggle buttons */}
//         <div className="md:hidden flex justify-between items-center p-4 border-b">
//           <h1 className="text-lg font-bold">Dashboard</h1>
//           <button onClick={toggleCopilot} className="p-2">
//             <MessageCircleIcon className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Sidebar - hidden by default on mobile, always visible on md+ screens */}
//         <div className={`
//           ${sidebarOpen ? 'block' : 'hidden'}
//           md:block
//           w-full md:w-64
//           fixed md:relative
//           top-0 left-0
//           h-full
//           bg-white
//           z-20
//           md:z-0
//           shadow-lg md:shadow-none
//           transition-all
//         `}>
//           <AppSidebar />
//         </div>

//         {/* Main content - takes remaining space */}
//         <div className="flex-grow overflow-auto p-4 pt-0 pl-0">
//           <MainContent contentType={contentType} />
//         </div>

//         {/* Copilot - hidden by default on mobile, visible as sidebar on larger screens */}
//         <div className={`
//           ${copilotOpen ? 'block' : 'hidden'}
//           md:block
//           w-full md:w-80
//           fixed md:relative
//           top-0 right-0
//           h-full
//           bg-white dark:bg-black
//           z-20
//           md:z-0
//           shadow-lg md:shadow-none
//           transition-all
//         `}>
//           <div className="p-4 md:hidden flex justify-end">
//             <button onClick={toggleCopilot} className="p-2">
//               <XIcon className="h-6 w-6" />
//             </button>
//           </div>
//           <CopilotKit runtimeUrl="/api/copilotkit">
//             <CustomChatInterface />
//           </CopilotKit>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default HomePage;
