// "use client";

// import { useCopilotChat, useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
// import { Message, Role, TextMessage } from "@copilotkit/runtime-client-gql";
// import { useState, useEffect } from "react";
// import ChatHeader from "./ChatHeader";
// import ChatMessages from "./ChatMessages";
// import ImageGallery from "./ImageGallery";
// import ChatInput from "./ChatInput";

// export default function CustomChatInterface() {
//   const { visibleMessages, appendMessage, isLoading } = useCopilotChat();
//   const [inputValue, setInputValue] = useState("");
//   const [showImages, setShowImages] = useState(false);
//   const [selected, setSelected] = useState<string[]>([]);
//   const [hasTriggered, setHasTriggered] = useState(false);

//   function isTextMessage(msg: Message): msg is TextMessage {
//     return msg instanceof TextMessage;
//   }

//   const images = [
//     "https://unsplash.it/200/200?id=1",
//     "https://unsplash.it/200/200?id=2",
//     "https://unsplash.it/200/200?id=3",
//     "https://unsplash.it/200/200?id=4",
//   ];

//   useCopilotReadable({ description: "List of available images", value: images });

//   useCopilotAction({
//     name: "displayImages",
//     description: "Display a set of hardcoded images in the chat",
//     parameters: [{ name: "images", type: "string[]", description: "Array of image URLs", required: true }],
//     handler: async () => {
//       if (!hasTriggered) {
//         setShowImages(true);
//         appendMessage(new TextMessage({ content: "Images displayed successfully.", role: Role.Assistant }));
//         setHasTriggered(true);
//       }
//       return null;
//     },
//   });

//   useEffect(() => {
//     const lastUserMessage = [...visibleMessages]
//       .filter((msg): msg is TextMessage => isTextMessage(msg) && msg.role === Role.User)
//       .pop();
  
//     if (
//       lastUserMessage &&
//       !hasTriggered &&
//       (lastUserMessage.content.toLowerCase().includes("generate image") ||
//        lastUserMessage.content.toLowerCase().includes("display images"))
//     ) {
//       appendMessage(new TextMessage({ content: "Generating images...", role: Role.Assistant }));
//       setShowImages(true);
//       setHasTriggered(true);
//     }
//   }, [visibleMessages, hasTriggered]);

//   const sendMessage = () => {
//     if (inputValue.trim()) {
//       appendMessage(new TextMessage({ content: inputValue, role: Role.User }));
//       setInputValue("");
//       setHasTriggered(false);
//     }
//   };

//   const toggleImage = (src: string) => {
//     setSelected((prev) => prev.includes(src) ? prev.filter((img) => img !== src) : [...prev, src]);
//   };

//   const confirmSelection = () => {
//     console.log("Selected images:", selected);
//   };

//   return (
//     <div className="fixed right-0 top-0 bottom-0 w-[350px] h-screen bg-white border-1 rounded-lg border-[#BCD6FB] flex flex-col z-50 m-[12px]">
//       <ChatHeader />
//       <div className="flex-1 p-4 overflow-y-auto">
//         <ChatMessages visibleMessages={visibleMessages} isLoading={isLoading} />
//         {showImages && (
//           <ImageGallery images={images} selected={selected} toggleImage={toggleImage} confirmSelection={confirmSelection} />
//         )}
//       </div>
//       <ChatInput inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage} isLoading={isLoading} />
//     </div>
//   );
// }


"use client";

import { useCopilotChat, useCopilotReadable, useCopilotAction, useCoAgent, useCoAgentStateRender, useLangGraphInterrupt } from "@copilotkit/react-core";
import { Message, Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ImageGallery from "./ImageGallery";
import ChatInput from "./ChatInput";

// Configuration keys
export const SKIP_CONTENT_RELEVANCY_CHECK = "skipContentRelevancyCheck";
export const SKIP_USED_URLS_CHECK = "skipUsedUrlsCheck";
export const TEXT_ONLY_MODE = "textOnlyMode";

type AgentState = {
  [SKIP_CONTENT_RELEVANCY_CHECK]: boolean,
  [SKIP_USED_URLS_CHECK]: boolean,
  [TEXT_ONLY_MODE]: boolean,
  links: string[],
  post: string,
  scheduleDate: Date | null,
  userResponse: string,
  image: {
    imageUrl: string;
    mimeType: string;
  } | null,
  imageOptions: string[]
}

export default function CustomChatInterface() {
  const { visibleMessages, appendMessage, isLoading } = useCopilotChat();
  const [inputValue, setInputValue] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Images for gallery
  const images = [
    "https://unsplash.it/200/200?id=1",
    "https://unsplash.it/200/200?id=2",
    "https://unsplash.it/200/200?id=3",
    "https://unsplash.it/200/200?id=4",
  ];

  // Make images readable by Copilot
  useCopilotReadable({ 
    description: "List of available images", 
    value: images 
  });

  // Set up agent state management
  const { state, setState } = useCoAgent<AgentState>({
    name: "generate_post",
    initialState: {
      links: [],
      [SKIP_CONTENT_RELEVANCY_CHECK]: true,
      [SKIP_USED_URLS_CHECK]: true,
      [TEXT_ONLY_MODE]: false,
      post: "",
      scheduleDate: null,
      userResponse: "",
      image: null,
      imageOptions: images
    }
  });

  // Render state changes (optional - for debugging)
  useCoAgentStateRender({
    name: "generate_post",
    render: ({ state }) => {
      console.log("Agent state:", state);
      return <div></div>;
    },
  });

  // Add the get blog URL action
  useCopilotAction({
    name: "get_blog_url",
    description: "If a link is not available then ask the user for a blog URL",
    parameters: [
      {
        name: "link",
        type: "string",
        description: "Link of blog to generate post for",
        required: true,
      },
    ],
    handler: async ({ link }) => {
      setState({...state, links: [link]});
      appendMessage(new TextMessage({ content: `Blog URL received: ${link}`, role: Role.Assistant }));
      return null;
    }
  });

  // Image selection functionality using LangGraph interrupt
  useLangGraphInterrupt({
    render: ({ event, resolve }) => {
      console.log('Interrupt event:', event);
      
      // Extract image options from the event if available, otherwise use default images
      const imageOptions = event.value[0]?.action_request?.args?.imageOptions || images;
      
      const confirmSelection = () => {
        // Update the agent state with selected image
        if (selected.length > 0) {
          setState({
            ...state,
            image: {
              imageUrl: selected[0],
              mimeType: "image/jpeg"
            }
          });
          
          // Resolve the interrupt with selected image
          resolve(selected[0]);
          
          // Add confirmation message to chat
          appendMessage(new TextMessage({ 
            content: `Image selected successfully!`, 
            role: Role.Assistant 
          }));
          
          // Hide the image gallery
          setShowImages(false);
        }
      };

      return (
        <ImageGallery 
          images={imageOptions} 
          selected={selected} 
          toggleImage={toggleImage} 
          confirmSelection={confirmSelection} 
        />
      );
    }
  });

  // Display images action
  useCopilotAction({
    name: "select_cover_image",
    description: "Show the user a list of image options and let them select a cover image for the post",
    parameters: [
      {
        name: "imageOptions",
        type: "string[]",
        description: "Array of image URLs to display",
        required: true,
      },
    ],
    handler: async ({ imageOptions }) => {
      setShowImages(true);
      setState({
        ...state,
        imageOptions: imageOptions || images
      });
      
      appendMessage(new TextMessage({ 
        content: "Please select an image for your post:", 
        role: Role.Assistant 
      }));
      
      return null;
    },
  });

  function isTextMessage(msg: Message): msg is TextMessage {
    return msg instanceof TextMessage;
  }

  useEffect(() => {
    const lastUserMessage = [...visibleMessages]
      .filter((msg): msg is TextMessage => isTextMessage(msg) && msg.role === Role.User)
      .pop();
  
    if (
      lastUserMessage &&
      !hasTriggered &&
      (lastUserMessage.content.toLowerCase().includes("generate image") ||
       lastUserMessage.content.toLowerCase().includes("display images") ||
       lastUserMessage.content.toLowerCase().includes("select image"))
    ) {
      appendMessage(new TextMessage({ content: "Showing image options...", role: Role.Assistant }));
      setShowImages(true);
      setHasTriggered(true);
    }
  }, [visibleMessages, hasTriggered]);

  const sendMessage = () => {
    if (inputValue.trim()) {
      appendMessage(new TextMessage({ content: inputValue, role: Role.User }));
      setInputValue("");
      setHasTriggered(false);
    }
  };

  const toggleImage = (src: string) => {
    setSelected((prev) => prev.includes(src) ? prev.filter((img) => img !== src) : [...prev, src]);
  };

  const confirmSelection = () => {
    if (selected.length > 0) {
      setState({
        ...state,
        image: {
          imageUrl: selected[0],
          mimeType: "image/jpeg"
        }
      });
      
      appendMessage(new TextMessage({ 
        content: `Image selected: ${selected[0]}`, 
        role: Role.Assistant 
      }));
      
      setShowImages(false);
    }
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[350px] h-screen bg-white border-1 rounded-lg border-[#BCD6FB] flex flex-col z-50 m-[12px]">
      <ChatHeader />
      <div className="flex-1 p-4 overflow-y-auto">
        <ChatMessages visibleMessages={visibleMessages} isLoading={isLoading} />
        {showImages && (
          <ImageGallery 
            images={state.imageOptions || images} 
            selected={selected} 
            toggleImage={toggleImage} 
            confirmSelection={confirmSelection} 
          />
        )}
        {/* Optional: Show agent state for debugging */}
        {/* <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
      </div>
      <ChatInput 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        sendMessage={sendMessage} 
        isLoading={isLoading} 
      />
    </div>
  );
}