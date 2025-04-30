"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import CollapsibleSection from "../../components/CollapsibleSection"; // adjust if needed
import {
  Markdown,
} from "@copilotkit/react-ui";


type PostItem = {
  id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  status: string;
  scheduleDate: string;
  images?: string[];
  report?: string;
  links?: string[];
  pageContents?: string;
  relevantLinks?: string[];
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
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    report: false,
    scheduleDate: false,
    imageOptions: false,
    links: false,
    pageContents: false,
    relevantLinks: false,
  });

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/postData/getPost?threadId=${id}`);
      const foundItem = await res.json();
      console.log("foundItem",foundItem)


      if (foundItem) {
        setItem({
          id: foundItem.thread_id,
          title: foundItem.title || "Untitled",
          description: foundItem.post,
          image: foundItem.image?.imageUrl,
          url: foundItem.url || "",
          status: foundItem.status || "Scheduled",
          scheduleDate: new Date(foundItem.scheduleDate).toLocaleString(),
          images: foundItem.images || [],
          report: foundItem.report || "No report available.",
          links: foundItem.links || [],
          pageContents: foundItem.pageContents || "",
          relevantLinks: foundItem.relevantLinks || [],
        });
      }
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
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex dark:bg-black w-full">
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center p-5 border-b border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={18} />
            <span className="ml-2 text-lg dark:text-white">Post Details</span>
          </Link>
          <div className="ml-auto">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
              {item.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="bg-white rounded-md shadow-sm overflow-hidden mb-5 border dark:bg-black dark:border-white">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[316px] object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-500">Scheduled</div>
                  <div className="font-medium">{item.scheduleDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">URL</div>
                  <div className="font-medium text-blue-500 break-words">
                    {item.url}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold mb-1">Post</div>
                <div className="text-lg mb-2">{item.title}</div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                {/* Collapsibles */}
                <CollapsibleSection
                  title="Report"
                  isOpen={expandedSections.report}
                  onToggle={() => toggleSection("report")}
                >
                  <p className="text-sm text-gray-700"><Markdown content={item.report}/></p>
                </CollapsibleSection>

                <CollapsibleSection
                  title="Schedule Date"
                  isOpen={expandedSections.scheduleDate}
                  onToggle={() => toggleSection("scheduleDate")}
                >
                  <p className="text-sm text-gray-700">{item.scheduleDate}</p>
                </CollapsibleSection>

                <CollapsibleSection
                  title="Image Options"
                  isOpen={expandedSections.imageOptions}
                  onToggle={() => toggleSection("imageOptions")}
                >
                  {item?.images && item?.images?.length > 0 ? (
                    <img
                      src={item?.images[0]?.imageUrl} // Show only the first image
                      alt="First image option"
                      className="rounded-md object-cover w-full h-32"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">
                      No alternative images available.
                    </p>
                  )}
                </CollapsibleSection>

                <CollapsibleSection
                  title="Links"
                  isOpen={expandedSections.links}
                  onToggle={() => toggleSection("links")}
                >
                  {item.links && item.links.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-blue-600">
                      {item.links.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">No links provided.</p>
                  )}
                </CollapsibleSection>

                <CollapsibleSection
                  title="Page Contents"
                  isOpen={expandedSections.pageContents}
                  onToggle={() => toggleSection("pageContents")}
                >
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {item.pageContents || "No content available."}
                  </p>
                </CollapsibleSection>

                <CollapsibleSection
                  title="Relevant Links"
                  isOpen={expandedSections.relevantLinks}
                  onToggle={() => toggleSection("relevantLinks")}
                >
                  {item.relevantLinks && item.relevantLinks.length > 0 ? (
                    <ul className="list-disc pl-5 text-sm text-blue-600">
                      {item.relevantLinks.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">No relevant links.</p>
                  )}
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
