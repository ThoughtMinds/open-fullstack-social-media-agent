"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ScheduledItem = {
  id: string;
  type: string;
  title: string;
  content: string;
  image?: string;
  images?: string[];
  date: string;
  description: string;
};

const Dashboard = () => {
  const [filter, setFilter] = useState("All");
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/postData");
      const json = await res.json();

      const transformed = json.data.map((item: any) => ({
        id: item.thread_id,
        type: item.status,
        title: item.title,
        content: item.post,
        image: item.image?.imageUrl,
        images: item.images || [],
        date: new Date(item.scheduleDate).toLocaleString(),
        description: item.post,
      }));

      setScheduledItems(transformed);
    };

    fetchData();
  }, []);

  const filteredItems =
    filter === "All"
      ? scheduledItems
      : scheduledItems.filter((item) => item.type === filter);

  return (
    <div className="flex-1 p-[24px] px-[12px] space-y-4">
      <div className="sticky flex flex-col gap-[16px]">
        <h1 className="text-2xl font-bold text-black dark:text-gray-200">
          Dashboard
        </h1>

        <div className="flex gap-2 flex-wrap">
          {["All", "Scheduled", "Action Required", "Error"].map((type) => {
            const isActive = filter === type;

            return (
              <Button
                key={type}
                onClick={() => setFilter(type)}
                className={`rounded-[57px] px-4 py-2 text-sm font-medium border border-[#E8E9FB] ${
                  isActive
                    ? "bg-[rgba(232,233,251,1)] text-[rgba(104,107,243,1)] hover:text-[rgba(104,107,243,1)] hover:bg-[#E8E9FB]"
                    : "text-[rgba(134,134,134,1)] border-[rgba(232,233,251,1)] hover:bg-white"
                }`}
                variant="ghost"
              >
                {type}
              </Button>
            );
          })}
        </div>
      </div>

      {/* <div className="flex flex-row flex-wrap gap-4"> */}
      <div className="flex flex-col flex-wrap max-h-[900px] w-auto gap-4 overflow-auto">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => router.push(`/dashboard/${item.id}`)}
            className="h-fit p-2 w-[333.5px] bg-[#D4DFFC] hover:shadow-lg transition-shadow dark:bg-black dark:border-gray-600 cursor-pointer"
          >
            <CardContent className="p-2">
              {/* Images Grid for Action Required */}
              {/* {item.type === "Action Required" && item.images?.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {item.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Option ${i + 1}`}
                      className="w-[149px] h-[88px] object-cover rounded-[8px] border border-gray-300 hover:ring-2 ring-blue-400"
                    />
                  ))}
                </div>
              )} */}

              {item.type === "Action Required" &&
                Array.isArray(item.images) &&
                item.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {item.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Option ${i + 1}`}
                        className="w-[149px] h-[88px] object-cover rounded-[8px] border border-gray-300 hover:ring-2 ring-blue-400"
                      />
                    ))}
                  </div>
                )}

              {/* Single Image for other types */}
              {item.type !== "Action Required" && item.image && (
                <img
                  src={item.image}
                  alt={`${item.title} preview`}
                  className="w-[309.5px] h-[118px] object-cover rounded-[8px] mb-2"
                />
              )}

              {/* Title and Status */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold dark:text-gray-100">
                    {item.title}
                  </CardTitle>

                  {item.type === "Action Required" && (
                    <span className="inline-block font-medium text-[9px] text-[#100833] bg-[#E6CCA8] rounded px-2 py-1">
                      Action Required
                    </span>
                  )}
                  {item.type === "Error" && (
                    <span className="inline-block font-medium text-[9px] text-red-600 bg-red-100 rounded px-2 py-1">
                      Error
                    </span>
                  )}
                  {item.type === "Completed" && (
                    <span className="inline-block font-medium text-[9px] text-[#100833] bg-[#92DFAD] rounded px-2 py-1">
                      Completed
                    </span>
                  )}
                </div>

                {item.type === "Scheduled" && (
                  <span className="text-[9px] text-white font-medium ml-auto px-2 py-1 bg-gradient-to-r from-[#725AF5] to-[#5E97F7] rounded">
                    Details
                  </span>
                )}
              </div>

              {/* Content Preview */}
              {item.type === "Scheduled" && (
                <>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-[#686BF3] font-bold dark:text-gray-400 mb-2">
                    Scheduled for {item.date}
                  </p>
                </>
              )}

              {item.type === "Action Required" && (
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {item.content}
                </p>
              )}

              {item.type === "Completed" && (
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {item.content}
                </p>
              )}

              {item.type === "Error" && (
                <p className="text-sm text-red-500 break-words">
                  {item.content}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
