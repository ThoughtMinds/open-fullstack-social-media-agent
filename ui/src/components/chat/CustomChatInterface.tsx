"use client";

import { useCopilotChat, useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import { Message, Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ImageGallery from "./ImageGallery";
import ChatInput from "./ChatInput";

export default function CustomChatInterface() {
  const { visibleMessages, appendMessage, isLoading } = useCopilotChat();
  const [inputValue, setInputValue] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);

  function isTextMessage(msg: Message): msg is TextMessage {
    return msg instanceof TextMessage;
  }

  const images = [
    "https://unsplash.it/200/200?id=1",
    "https://unsplash.it/200/200?id=2",
    "https://unsplash.it/200/200?id=3",
    "https://unsplash.it/200/200?id=4",
  ];

  useCopilotReadable({ description: "List of available images", value: images });

  useCopilotAction({
    name: "displayImages",
    description: "Display a set of hardcoded images in the chat",
    parameters: [{ name: "images", type: "string[]", description: "Array of image URLs", required: true }],
    handler: async () => {
      if (!hasTriggered) {
        setShowImages(true);
        appendMessage(new TextMessage({ content: "Images displayed successfully.", role: Role.Assistant }));
        setHasTriggered(true);
      }
      return null;
    },
  });

  useEffect(() => {
    const lastUserMessage = [...visibleMessages]
      .filter((msg): msg is TextMessage => isTextMessage(msg) && msg.role === Role.User)
      .pop();
  
    if (
      lastUserMessage &&
      !hasTriggered &&
      (lastUserMessage.content.toLowerCase().includes("generate image") ||
       lastUserMessage.content.toLowerCase().includes("display images"))
    ) {
      appendMessage(new TextMessage({ content: "Generating images...", role: Role.Assistant }));
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
    console.log("Selected images:", selected);
  };

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[350px] h-screen bg-white border-1 rounded-lg border-[#BCD6FB] flex flex-col z-50 m-[12px]">
      <ChatHeader />
      <div className="flex-1 p-4 overflow-y-auto">
        <ChatMessages visibleMessages={visibleMessages} isLoading={isLoading} />
        {showImages && (
          <ImageGallery images={images} selected={selected} toggleImage={toggleImage} confirmSelection={confirmSelection} />
        )}
      </div>
      <ChatInput inputValue={inputValue} setInputValue={setInputValue} sendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
