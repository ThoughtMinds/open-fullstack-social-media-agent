import { NextResponse } from "next/server";
import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";

// Interface for thread state values
interface ThreadStateValues {
  post?: string;
  imageOptions?: string[];
  scheduleDate?: string;
  report?: string;
  links?: string[];
  pageContent?: string;
  relevantLinks?: string[];
}

// Define the response format
interface PostResponse {
  thread_id: string;
  run_id?: string;
  title: string;
  post: string;
  image?: {
    imageUrl: string;
    mimeType: string;
  };
  images?: {
    imageUrl: string;
  }[];
  status: string;
  scheduleDate: string;
  report?: string;
  links?: string[];
  pageContents?: string;
  relevantLinks?: string[];
}

async function getPost(threadId: string): Promise<PostResponse | null> {
  // Validate threadId
  if (!threadId || typeof threadId !== "string" || threadId.trim() === "") {
    throw new Error("Invalid thread ID");
  }

  // Check for required environment variable
  if (!process.env.LANGGRAPH_API_URL) {
    throw new Error("LANGGRAPH_API_URL is not configured");
  }

  try {
    // Initialize the LangGraph client
    const client = new Client({
      apiUrl: process.env.LANGGRAPH_API_URL,
    });

    // Fetch thread and state concurrently
    const [thread, threadState] = await Promise.all([
      client.threads.get(threadId),
      client.threads.getState(threadId)
    ]);

    const values = threadState.values as ThreadStateValues | undefined;

    if (!values?.post) {
      console.log(`No post content found in thread ${threadId}`);
      return null;
    }

    const { post, imageOptions, scheduleDate, report, links, pageContent, relevantLinks } = values;

    // Split post content safely
    const [title = "", ...postBody] = post.split("\n\n");
    const postContent = postBody.join("\n\n");

    // Handle images
    const primaryImage = imageOptions?.[0];
    const additionalImages = imageOptions?.slice(1);

    const postResponse: PostResponse = {
      thread_id: threadId,
      run_id: thread.run_id, // Add run_id from thread if available
      title: title || `Post for ${scheduleDate ? new Date(scheduleDate).toLocaleDateString() : 'Untitled'}`,
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

    console.log(`Extracted post from thread ${threadId}`);
    return postResponse;

  } catch (error) {
    console.error(`Error fetching post for thread ${threadId}:`, error);
    throw error instanceof Error ? error : new Error("Failed to retrieve post");
  }
}

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return NextResponse.json(
        { error: "Thread ID is required" },
        { status: 400 }
      );
    }

    const post = await getPost(threadId);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("API error:", error);
    const message = error instanceof Error ? error.message : "Failed to retrieve post";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}