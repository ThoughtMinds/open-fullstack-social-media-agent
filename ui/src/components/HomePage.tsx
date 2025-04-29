// "use client";
// import React, { useState } from "react";
// import Sidebar from "@/components/AppSidebar";
// import MainContent from "@/components/MainContent";
// import {
//   CopilotKit,
//   useCopilotAction,
//   useCopilotReadable,
// } from "@copilotkit/react-core";
// import { CustomCopilotSidebar } from "@/components/copilot/CustomCopilotSidebar";
// import ProtectedRoute from "@/components/ProtectedRoute";


// type ContentType = "dashboard" | "schedule" | "settings";

// interface HomePageProps {
//   contentType: ContentType;
// }

// const HomePage = ({ contentType }: HomePageProps) => {
//   return (
//     <ProtectedRoute>
//       <div className="flex w-full">
//         <Sidebar />
//         <MainContent contentType={contentType} />

//         <CopilotKit runtimeUrl="/api/copilotkit">
//           <CustomCopilotSidebar
//             instructions={
//               "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
//             }
//             initialMessage={"Welcome to the app! How can I help you?"}
//             defaultOpen={true}
//           >
//             <Main />
//           </CustomCopilotSidebar>
//         </CopilotKit>
//       </div>
//     </ProtectedRoute>
//   );
// };

// const Main = () => {
//   // Hardcoded image URLs
//   const images = [
//     "https://unsplash.it/200/200?id=1",
//     "https://unsplash.it/200/200?id=2",
//     "https://unsplash.it/200/200?id=3",
//     "https://unsplash.it/200/200?id=4",
//   ];

//   // Make images readable by Copilot
//   useCopilotReadable({
//     description: "List of available images",
//     value: images,
//   });

//   useCopilotAction({
//     name: "displayImages",
//     description: "Display a set of hardcoded images in the chat",
//     parameters: [
//       {
//         name: "images",
//         type: "string[]",
//         description: "Array of image URLs to display",
//         required: true,
//       },
//     ],
//     render: () => {
//       const [selected, setSelected] = React.useState<string[]>([]);

//       const toggleImage = (src: string) => {
//         setSelected((prev) =>
//           prev.includes(src)
//             ? prev.filter((img) => img !== src)
//             : [...prev, src],
//         );
//       };

//       const confirmSelection = () => {
//         console.log("Selected images:", selected);
//       };

//       return (
//         <div className="p-0">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//             Select Images
//           </h3>
//           <div className="grid grid-cols-2 gap-4">
//             {images.map((src, index) => (
//               <div
//                 key={index}
//                 className={`cursor-pointer rounded-lg overflow-hidden shadow-md border-4 transition-all ${
//                   selected.includes(src)
//                     ? "border-blue-500"
//                     : "border-white dark:border-gray-800"
//                 }`}
//                 onClick={() => toggleImage(src)}
//               >
//                 <img
//                   src={src}
//                   alt={`Gallery image ${index + 1}`}
//                   className="w-full h-auto"
//                 />
//               </div>
//             ))}
//           </div>

//           {selected.length > 0 && (
//             <div className="mt-4">
//               <button
//                 onClick={confirmSelection}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 Confirm Selection ({selected.length})
//               </button>
//             </div>
//           )}
//         </div>
//       );
//     },

//     handler: async () => {
//       // Return null so CopilotKit doesn't double-render the data
//       return null;
//     },
//   });

//   return null; // We don't need to render anything here
// };

// export default HomePage;













// "use client";
// import "@copilotkit/react-ui/styles.css";

// import React, { useState } from "react";
// import Sidebar from "@/components/AppSidebar";
// import MainContent from "@/components/MainContent";
// import {
//   CopilotKit,
//   useCopilotAction,
//   useCopilotReadable,
// } from "@copilotkit/react-core";
// import { CopilotKitCSSProperties, CopilotSidebar } from "@copilotkit/react-ui";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import ProtectedRoute from "@/components/ProtectedRoute";

// type ContentType = "dashboard" | "schedule" | "settings";

// interface HomePageProps {
//   contentType: ContentType;
// }

// const HomePage = ({ contentType }: HomePageProps) => {
//   return (
//     <ProtectedRoute>
//       <div className="flex w-full">
//         <Sidebar />
//         <MainContent contentType={contentType} />

//         <CopilotKit runtimeUrl="/api/copilotkit">
//         {/* <div
//             style={
//               {
//                "--copilot-kit-primary-color": "#121212",
//                "--copilot-kit-background-color": "black",
//                "--copilot-kit-sidebar-width": "600px"
//               } as CopilotKitCSSProperties
//             }
//           > */}
//           <CopilotSidebar
//             instructions={
//               "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
//             }
//             labels={{
//               initial: "Welcome to the app! How can I help you?",
//             }}
//             defaultOpen={true}
//             clickOutsideToClose={false}
//           >
            

//             <Main />
//           </CopilotSidebar>
//           {/* </div> */}
//         </CopilotKit>
//       </div>
//     </ProtectedRoute>
//   );
// };

// const Main = () => {
//   // Hardcoded image URLs
//   const images = [
//     "https://unsplash.it/200/200?id=1",
//     "https://unsplash.it/200/200?id=2",
//     "https://unsplash.it/200/200?id=3",
//     "https://unsplash.it/200/200?id=4",
//   ];

//   // Make images readable by Copilot
//   useCopilotReadable({
//     description: "List of available images",
//     value: images,
//   });

//   useCopilotAction({
//     name: "displayImages",
//     description: "Display a set of hardcoded images in the chat",
//     parameters: [
//       {
//         name: "images",
//         type: "string[]",
//         description: "Array of image URLs to display",
//         required: true,
//       },
//     ],
//     render: () => {
//       const [selected, setSelected] = React.useState<string[]>([]);

//       const toggleImage = (src: string) => {
//         setSelected((prev) =>
//           prev.includes(src)
//             ? prev.filter((img) => img !== src)
//             : [...prev, src],
//         );
//       };

//       const confirmSelection = () => {
//         console.log("Selected images:", selected);
//       };

//       return (
//         <div className="p-0">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
//             Select Images
//           </h3>
//           <div className="grid grid-cols-2 gap-4">
//             {images.map((src, index) => (
//               <div
//                 key={index}
//                 className={`cursor-pointer rounded-lg overflow-hidden shadow-md border-4 transition-all ${
//                   selected.includes(src)
//                     ? "border-blue-500"
//                     : "border-white dark:border-gray-800"
//                 }`}
//                 onClick={() => toggleImage(src)}
//               >
//                 <img
//                   src={src}
//                   alt={`Gallery image ${index + 1}`}
//                   className="w-full h-auto"
//                 />
//               </div>
//             ))}
//           </div>

//           {selected.length > 0 && (
//             <div className="mt-4">
//               <button
//                 onClick={confirmSelection}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//               >
//                 Confirm Selection ({selected.length})
//               </button>
//             </div>
//           )}
//         </div>
//       );
//     },

//     handler: async () => {
//       // Return `null` so CopilotKit doesn't double-render the data
//       return null;
//     },
//   });

//   return (
//     <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
//       {/* <Sidebar/>
//       <MainContent /> */}
//     </div>
//   );
// };

// export default HomePage;




// "use client";

// import { useCopilotChat, CopilotKit, useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
// import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
// import { useState, useEffect } from "react";
// import MainContent from "./MainContent";
// import AppSidebar from "./AppSidebar";
// import ProtectedRoute from "./ProtectedRoute";

// export function CustomChatInterface() {
//   const {
//     visibleMessages,
//     appendMessage,
//     isLoading,
//   } = useCopilotChat();

//   const [inputValue, setInputValue] = useState("");
//   const [showImages, setShowImages] = useState(false);
//   const [selected, setSelected] = useState<string[]>([]);
//   const [hasTriggered, setHasTriggered] = useState(false); // Flag to prevent infinite loop

//   // Hardcoded image URLs
//   const images = [
//     "https://unsplash.it/200/200?id=1",
//     "https://unsplash.it/200/200?id=2",
//     "https://unsplash.it/200/200?id=3",
//     "https://unsplash.it/200/200?id=4",
//   ];

//   // Make images readable by Copilot
//   useCopilotReadable({
//     description: "List of available images",
//     value: images,
//   });

//   // Action to display images
//   useCopilotAction({
//     name: "displayImages",
//     description: "Display a set of hardcoded images in the chat",
//     parameters: [
//       {
//         name: "images",
//         type: "string[]",
//         description: "Array of image URLs to display",
//         required: true,
//       },
//     ],
//     handler: async () => {
//       if (!hasTriggered) {
//         setShowImages(true);
//         appendMessage(
//           new TextMessage({
//             content: "The images have been displayed successfully. If you need further assistance or specific actions regarding these images, please let me know!",
//             role: Role.Assistant,
//           })
//         );
//         setHasTriggered(true); // Set flag after first trigger
//       }
//       return null;
//     },
//   });

//   // Detect when "generate image" or "display images" is sent to trigger the action
//   useEffect(() => {
//     const lastUserMessage = visibleMessages
//       .filter((msg) => msg.role === Role.User)
//       .pop();
//     if (
//       lastUserMessage &&
//       !hasTriggered &&
//       (lastUserMessage.content.toLowerCase().includes("generate image") ||
//         lastUserMessage.content.toLowerCase().includes("display images"))
//     ) {
//       appendMessage(
//         new TextMessage({
//           content: "Generating images...",
//           role: Role.Assistant,
//         })
//       );
//       setShowImages(true);
//       setHasTriggered(true);
//     }
//   }, [visibleMessages, hasTriggered]);

//   const sendMessage = () => {
//     if (inputValue.trim()) {
//       appendMessage(new TextMessage({ content: inputValue, role: Role.User }));
//       setInputValue(""); // Clear input after sending
//       setHasTriggered(false); // Reset flag for new messages
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !isLoading) {
//       sendMessage();
//     }
//   };

//   const toggleImage = (src: string) => {
//     setSelected((prev) =>
//       prev.includes(src)
//         ? prev.filter((img) => img !== src)
//         : [...prev, src]
//     );
//   };

//   const confirmSelection = () => {
//     console.log("Selected images:", selected);
//   };

//   return (
//     <div className="fixed right-0 top-0 bottom-0 w-[350px] h-screen bg-white border-1 rounded-lg border-[#BCD6FB] flex flex-col z-50 m-[12px]">
//       {/* Header with Avatar and Greeting */}
//       <div className="p-4 font-bold text-2xl text-[#100833]">AI Assistant</div>
//       <div className="pb-4 m-4 h-[310px] border-t border-b border-[#BCD6FB] flex flex-col justify-end items-center space-x-3">
//         <img
//           src="https://github.com/shadcn.png"
//           alt="Avatar"
//           className="w-[140px] h-[140px] rounded-full mb-4"
//         />
//         <div className="text-center">
//           <h3 className="text-lg text-gray-800 font-bold text-2xl">
//             <div className="bg-gradient-to-r from-[#725AF5] to-[#5E97F7] bg-clip-text text-transparent">Good morning,</div>
//              <div>John Smith</div> 
//           </h3>
//           <p className="text-sm text-[#868686]">
//             I am here to assist you with your social media tasks.
//           </p>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         <div className="space-y-3">
//           {/* <button
//             className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition"
//             onClick={() =>
//               appendMessage(
//                 new TextMessage({
//                   content: "Create social media post for the url",
//                   role: Role.User,
//                 })
//               )
//             }
//             disabled={isLoading}
//           >
//             Create social media post for the url
//           </button>
//           <button
//             className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition"
//             onClick={() =>
//               appendMessage(
//                 new TextMessage({
//                   content: "Generate cover image for your post",
//                   role: Role.User,
//                 })
//               )
//             }
//             disabled={isLoading}
//           >
//             Generate cover image for your post
//           </button> */}
//         </div>

//         {/* Messages Area */}
//         <div className="mt-4 space-y-2">
//           {visibleMessages.map((message, index) => (
//             <div
//               key={index}
//               className={`p-2 rounded-lg ${
//                 message.role === Role.User
//                   ? "bg-blue-500 text-white self-end"
//                   : "bg-gray-100 text-gray-800 self-start"
//               } max-w-xs`}
//             >
//               {message.content}
//             </div>
//           ))}
//           {isLoading && (
//             <div className="text-gray-500 text-sm">Assistant is typing...</div>
//           )}
//         </div>

//         {/* Image Selection Grid (shown when triggered) */}
//         {showImages && (
//           <div className="p-0 mt-4">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Select Images
//             </h3>
//             <div className="grid grid-cols-2 gap-4">
//               {images.map((src, index) => (
//                 <div
//                   key={index}
//                   className={`cursor-pointer rounded-lg overflow-hidden shadow-md border-4 transition-all ${
//                     selected.includes(src)
//                       ? "border-blue-500"
//                       : "border-white dark:border-gray-800"
//                   }`}
//                   onClick={() => toggleImage(src)}
//                 >
//                   <img
//                     src={src}
//                     alt={`Gallery image ${index + 1}`}
//                     className="w-full h-auto"
//                   />
//                 </div>
//               ))}
//             </div>

//             {selected.length > 0 && (
//               <div className="mt-4">
//                 <button
//                   onClick={confirmSelection}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
//                 >
//                   Confirm Selection ({selected.length})
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="p-4 border-gray-200">
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Type here..."
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isLoading}
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
//             disabled={isLoading}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586V7a1 1 0 00-2 0v5a1 1 0 002 0v-3.586l3.293 3.293a1 1 0 001.414-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Update the HomePage to use the custom chat interface
// const HomePage = ({ contentType }: HomePageProps) => {
//   return (
//     <ProtectedRoute>
//       <div className="flex w-full">
//         <AppSidebar />
//         <MainContent contentType={contentType} />
//         <CopilotKit runtimeUrl="/api/copilotkit">
//           <CustomChatInterface />
//         </CopilotKit>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default HomePage;


// "use client";

// import ProtectedRoute from "@/components/ProtectedRoute";
// import AppSidebar from "@/components/AppSidebar";
// import MainContent from "@/components/MainContent";
// import CustomChatInterface from "@/components/chat/CustomChatInterface"; // cleaner import from index.ts
// import { CopilotKit } from "@copilotkit/react-core";

// interface HomePageProps {
//   contentType: string;
// }

// const HomePage = ({ contentType }: HomePageProps) => {
//   return (
//     <ProtectedRoute>
//       <div className="flex w-full">
//         <AppSidebar />
//         <MainContent contentType={contentType} />
        
//         <CopilotKit runtimeUrl="/api/copilotkit">
//           <CustomChatInterface />
//         </CopilotKit>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default HomePage;


"use client"

import { CopilotKit } from "@copilotkit/react-core";
import { MenuIcon, MessageCircleIcon, XIcon } from "lucide-react";
import CustomChatInterface from "./chat/CustomChatInterface";
import MainContent from "./MainContent";
import AppSidebar from "./AppSidebar";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";

type ContentType = "dashboard" | "schedule" | "settings"| "detailsPage";

interface HomePageProps {
  contentType: ContentType;
}
const HomePage = ({ contentType }: HomePageProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  
  // Toggle functions for mobile view
  const toggleCopilot = () => setCopilotOpen(!copilotOpen);
  
  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row w-full min-h-screen relative">
        {/* Mobile navbar with toggle buttons */}
        <div className="md:hidden flex justify-between items-center p-4 border-b">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <button onClick={toggleCopilot} className="p-2">
            <MessageCircleIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Sidebar - hidden by default on mobile, always visible on md+ screens */}
        <div className={`
          ${sidebarOpen ? 'block' : 'hidden'} 
          md:block 
          w-full md:w-64 
          fixed md:relative 
          top-0 left-0 
          h-full 
          bg-white 
          z-20 
          md:z-0
          shadow-lg md:shadow-none
          transition-all
        `}>
          <AppSidebar />
        </div>
        
        {/* Main content - takes remaining space */}
        <div className="flex-grow overflow-auto p-4 pt-0 pl-0">
          <MainContent contentType={contentType} />
        </div>
        
        {/* Copilot - hidden by default on mobile, visible as sidebar on larger screens */}
        <div className={`
          ${copilotOpen ? 'block' : 'hidden'} 
          md:block 
          w-full md:w-80 
          fixed md:relative 
          top-0 right-0 
          h-full 
          bg-white 
          z-20 
          md:z-0
          shadow-lg md:shadow-none
          transition-all
        `}>
          <div className="p-4 md:hidden flex justify-end">
            <button onClick={toggleCopilot} className="p-2">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <CopilotKit runtimeUrl="/api/copilotkit">
            <CustomChatInterface />
          </CopilotKit>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;