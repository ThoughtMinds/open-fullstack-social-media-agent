"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

type PostItem = {
  id: number;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
};

type SectionKey =
  | "report"
  | "scheduleDate"
  | "imageOptions"
  | "links"
  | "pageContents"
  | "relevantLinks";

const DetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState<PostItem | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
    report: false,
    scheduleDate: false,
    imageOptions: false,
    links: false,
    pageContents: false,
    relevantLinks: false,
  });

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch("/api/postData");
      const data = await res.json();
      const foundItem = data.find(
        (item: { id: number }) => item.id === Number(id),
      );
      setItem(foundItem);
    };

    fetchItem();
  }, [id]);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center p-5 border-b border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={18} />
            <span className="ml-2 text-lg">Post Details</span>
          </Link>
          <div className="ml-auto">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
              ✓ Completed
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Post Image and Info */}
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-5">
            <img
              src={
                item.image ||
                "https://images.unsplash.com/photo-1506314517894-fc0445eade28"
              }
              alt={item.title}
              className="w-[683px] h-[316px] object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Scheduled</div>
                  <div className="font-medium">04/21/2025 10:00 AM PST</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">URL</div>
                  <div className="font-medium text-blue-500">
                    {item.url ||
                      "https://blog.lanchain.dev/customers-appfolio/"}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold mb-1">Post</div>
                <div className="text-lg mb-2">
                  {item.title || "Built AI Caption Fast"}
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description ||
                    "CaptionAI just dropped an open-source framework for AI chatbots, agents, and smart toolsets. Built with TypeScript and React. It lets you add custom AI features instantly. Already trusted by thousands of developers."}
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  Get started here:{" "}
                  <a href="#" className="text-blue-500">
                    https://www.npm.com/package/@captionkit/runtime
                  </a>
                </div>

                {/* Collapsible Sections */}
                <div className="space-y-2">
                  {/* Report Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      className="flex justify-start items-center w-full py-1 gap-2"
                      onClick={() => toggleSection("report")}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedSections.report ? "transform rotate-180" : ""}`}
                      />
                      <span className="font-medium">Report</span>
                    </button>
                    {expandedSections.report && (
                      <div className="py-2 text-sm">
                        Report content goes here...
                      </div>
                    )}
                  </div>

                  {/* Schedule Date Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      className="flex justify-between items-center w-full py-1"
                      onClick={() => toggleSection("scheduleDate")}
                    >
                      <span className="font-medium">ScheduleDate</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedSections.scheduleDate ? "transform rotate-180" : ""}`}
                      />
                    </button>
                    {expandedSections.scheduleDate && (
                      <div className="py-2 text-sm">
                        Schedule date content goes here...
                      </div>
                    )}
                  </div>

                  {/* Image Options Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      className="flex justify-between items-center w-full py-1"
                      onClick={() => toggleSection("imageOptions")}
                    >
                      <span className="font-medium">Image Options</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedSections.imageOptions ? "transform rotate-180" : ""}`}
                      />
                    </button>
                    {expandedSections.imageOptions && (
                      <div className="py-2 text-sm">
                        Image options content goes here...
                      </div>
                    )}
                  </div>

                  {/* Links Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      className="flex justify-between items-center w-full py-1"
                      onClick={() => toggleSection("links")}
                    >
                      <span className="font-medium">Links</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedSections.links ? "transform rotate-180" : ""}`}
                      />
                    </button>
                    {expandedSections.links && (
                      <div className="py-2 text-sm">
                        Links content goes here...
                      </div>
                    )}
                  </div>

                  {/* Page Contents Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      className="flex justify-between items-center w-full py-1"
                      onClick={() => toggleSection("pageContents")}
                    >
                      <span className="font-medium">Page Contents</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedSections.pageContents ? "transform rotate-180" : ""}`}
                      />
                    </button>
                    {expandedSections.pageContents && (
                      <div className="py-2 text-sm">
                        Page contents go here...
                      </div>
                    )}
                  </div>

                  {/* Relevant Links Section */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      className="flex justify-between items-center w-full py-1"
                      onClick={() => toggleSection("relevantLinks")}
                    >
                      <span className="font-medium">RelevantLinks</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expandedSections.relevantLinks ? "transform rotate-180" : ""}`}
                      />
                    </button>
                    {expandedSections.relevantLinks && (
                      <div className="py-2 text-sm">
                        Relevant links content goes here...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
