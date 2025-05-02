import { client } from "./client";
import { Client } from "@langchain/langgraph-sdk";
import "dotenv/config";

// Add this to your lib/types.ts file
export interface ScheduledPost {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  scheduledDate: string; // Format: YYYY-MM-DD
  scheduledTime: string; // Format: HH:MM
  status?: "draft" | "scheduled" | "published" | "failed";
  platformIds?: string[]; // IDs of platforms where this will be posted
  createdAt?: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update
  engagementStats?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// Define the PendingRun type
export interface PendingRun {
  thread_id: string;
  run_id?: string;
  post: string;
  image?: {
    imageUrl: string;
    mimeType: string;
  };
  images?: {
    imageUrl: string;
  }[];
  scheduleDate: string;
  status?: string;
  title?: string;
  report?: string;
  links?: string[];
  pageContents?: string;
  relevantLinks?: string[];
}

// Interface for thread state values
interface ThreadStateValues {
  post?: string;
  imageOptions?: string[];
  scheduleDate?: string;
  report?: string;
  links?: string[];
  pageContent?: string;
  relevantLinks?: string[];
  title?: string;
}

export const getSinglePost = {
  name: "GetSinglePost",
  description: "Retrieves details of a single post by its thread ID",
  parameters: [
    {
      name: "thread_id",
      type: "string",
      description: "Unique identifier of the thread containing the post",
      required: true,
    },
  ],
  handler: async ({ thread_id }: { thread_id: string }) => {
    // Validate threadId
    if (!thread_id || typeof thread_id !== "string" || thread_id.trim() === "") {
      return {
        status: "error",
        message: "Invalid thread ID",
      };
    }

    // Check for required environment variable
    if (!process.env.LANGGRAPH_API_URL) {
      return {
        status: "error",
        message: "LANGGRAPH_API_URL is not configured",
      };
    }

    try {
      // Initialize the LangGraph client
      const langGraphClient = new Client({
        apiUrl: process.env.LANGGRAPH_API_URL,
      });

      // Fetch thread and state concurrently
      const [thread, threadState] = await Promise.all([
        langGraphClient.threads.get(thread_id),
        langGraphClient.threads.getState(thread_id)
      ]);

      const values = threadState.values as ThreadStateValues | undefined;

      if (!values?.post) {
        console.log(`No post content found in thread ${thread_id}`);
        return {
          status: "error",
          message: `Post not found for thread ID ${thread_id}`,
        };
      }

      const { post, imageOptions, scheduleDate, report, links, pageContent, relevantLinks, title } = values;

      // Split post content safely if no explicit title is provided
      let postTitle = title || "";
      let postContent = post;
      
      if (!title && post) {
        const parts = post.split("\n\n");
        if (parts.length > 1) {
          postTitle = parts[0];
          postContent = parts.slice(1).join("\n\n");
        }
      }

      // Handle images
      const primaryImage = imageOptions?.[0];
      const additionalImages = imageOptions?.slice(1);

      const postResponse: PendingRun = {
        thread_id: thread_id,
        run_id: thread.run_id, // Add run_id from thread if available
        title: postTitle || `Post for ${scheduleDate ? new Date(scheduleDate).toLocaleDateString() : 'Untitled'}`,
        post: postContent,
        image: primaryImage ? {
          imageUrl: primaryImage,
          mimeType: determineImageMimeType(primaryImage)
        } : undefined,
        images: additionalImages?.length ? additionalImages.map(url => ({
          imageUrl: url
        })) : undefined,
        status: scheduleDate && new Date(scheduleDate) > new Date() ? "Scheduled" : "Published",
        scheduleDate: scheduleDate || new Date().toISOString(),
        report: report || undefined,
        links: links?.length ? links : undefined,
        pageContents: pageContent || undefined,
        relevantLinks: relevantLinks?.length ? relevantLinks : undefined
      };

      console.log(`Retrieved post from thread ${thread_id}`);

      return {
        status: "success",
        data: postResponse,
      };
    } catch (error) {
      console.error(`Error fetching post for thread ${thread_id}:`, error);
      return {
        status: "error",
        message: "Failed to retrieve post",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};

// Helper function to determine MIME type
function determineImageMimeType(imageUrl: string): string {
  const extension = imageUrl.split('.').pop()?.toLowerCase() || '';
  
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml'
  };

  return mimeTypes[extension] || 'image/jpeg';
}






