import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MainContent = () => {
  const scheduledItems = [
    {
      id: 4,
      url: "https://blog.langchain.dev/customers/appfolio/",
      status: "Action Required",
      date: "12/25/2024 10:00 AM PST",
    },
    {
      id: 3,
      url: "https://blog.langchain.dev/customers/appfolio/",
      status: "Scheduled",
      date: "12/25/2024 10:00 AM PST",
    },
    {
      id: 2,
      url: "https://blog.langchain.dev/customers/appfolio/",
      status: "Processing",
      date: "12/25/2024 10:00 AM PST",
    },
    {
      id: 1,
      url: "https://blog.langchain.dev/customers/appfolio/",
      status: "Posted",
      date: "12/25/2024 10:00 AM PST",
    },
  ];

  return (
    <div className="flex-1 p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
        SOCIAL MEDIA AGENT
      </h1>
      <div className="flex space-x-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">John Doe</span>
      </div>
      <div className="grid gap-4">
        {scheduledItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow dark:bg-gray-700 dark:border-gray-600">
            <div className="flex justify-between items-start p-4">
              <CardContent className="p-0 pr-4">
                <p className="text-md dark:text-gray-200">
                  #{item.id} URL: {item.url}
                </p>
                <div className="flex space-x-2 mt-2">
                  <button className="px-2 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                    Details
                  </button>
                </div>
              </CardContent>
              <CardContent className="p-0 text-right">
                <CardTitle className="text-lg font-semibold dark:text-gray-100">
                  {item.status}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MainContent;