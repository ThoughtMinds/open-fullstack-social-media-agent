import { NextResponse } from "next/server";
import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";

// Define the response format to match the desired output
interface PostResponse {
  thread_id: string;
  run_id: string;
  post: string;
  image?: string; // Optional as it might not always be present
  scheduleDate: string;
  status: string;
  title: string;
}

// Define the Run type for type safety
interface Run {
  run_id: string;
  created_at: string;
  kwargs?: {
    input?: {
      post?: string;
      image?: string;
      title?: string;
    };
  };
}

async function getAllPosts(): Promise<PostResponse[]> {
  try {
    // Initialize the LangGraph client
    const client = new Client({
      apiUrl: process.env.LANGGRAPH_API_URL,
    });

    if (!process.env.LANGGRAPH_API_URL) {
      throw new Error("LANGGRAPH_API_URL is not defined in environment variables");
    }

    // Fetch threads with graph_id: "upload_post"
    const busyThreads = await client.threads.search({
      metadata: {
        graph_id: "upload_post",
      },
      status: "busy",
      // Consider adding pagination if you expect many threads
      // page_size: 100,
    });

    console.log(`Found ${busyThreads.length} threads`);

    // Array to store the posts
    const posts: PostResponse[] = [];
    
    // Process each thread to extract values
    for (const thread of busyThreads) {
      try {
        const runs = await client.runs.list(thread.thread_id);
        
        if (!runs || runs.length === 0) {
          console.warn(`No run found for thread ${thread.thread_id}`);
          continue;
        }
        
        const run = runs[0] as Run;
        
        if (!run || !run.kwargs?.input) {
          console.warn(`No valid run data or input for thread ${thread.thread_id}`);
          continue;
        }

        const input = run.kwargs.input;
        
        // Extract the necessary data from the run with defaults for required fields
        const postResponse: PostResponse = {
          thread_id: thread.thread_id,
          run_id: run.run_id,
          post: input.post || "",
          title: input.title || "Untitled Post", // Default title if missing
          status: "Scheduled", // Default status
          scheduleDate: run.created_at
        };

        // Add image if available
        if (input.image) {
          postResponse.image = input.image;
        }
          
        posts.push(postResponse);
        console.log(`Extracted post from thread ${thread.thread_id}`);
      } catch (threadError) {
        console.error(`Error processing thread ${thread.thread_id}:`, threadError);
        // Continue with next thread instead of breaking the entire function
      }
    }

    console.log(`Retrieved ${posts.length} posts`);
    return posts;

  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to retrieve posts"
    );
  }
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to retrieve posts" },
      { status: 500 }
    );
  }
}






































