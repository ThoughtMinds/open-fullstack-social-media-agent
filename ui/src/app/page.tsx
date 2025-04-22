"use client";
import "@copilotkit/react-ui/styles.css";

import React, { useState } from "react";
import Sidebar from "@/components/AppSidebar";
import MainContent from "@/components/MainContent";
import {
  CopilotKit,
  useCopilotAction,
  useCopilotReadable,
} from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

const HomePage = () => {
  return (
    <div className="flex w-full">
      <Sidebar />
      <MainContent />
      <CopilotKit runtimeUrl="/api/copilotkit">
        <CopilotSidebar
          instructions={
            "You are assisting the user as best as you can. Answer in the best way possible given the data you have."
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
  useCopilotReadable({
    description: "List of available images",
    value: images,
  });

  useCopilotAction({
    name: "displayImages",
    description: "Display a set of hardcoded images in the chat",
    parameters: [
      {
        name: "images",
        type: "string[]",
        description: "Array of image URLs to display",
        required: true,
      },
    ],
    render: () => {
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
            {images.map((src, index) => (
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

    handler: async () => {
      // Return `null` so CopilotKit doesn't double-render the data
      return null;
    },
  });

  return (
    <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* <Sidebar/>
      <MainContent /> */}
    </div>
  );
};

export default HomePage;
