import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";

// Define the PendingRun interface (this should ideally be in a types.ts file, but included here for completeness)
interface PendingRun {
  thread_id: string;
  run_id: string;
  post: string;
  image?: {
    imageUrl: string;
    mimeType: string;
  };
  scheduleDate: string;
}

// Define the response format to match the desired output
interface PostResponse {
  thread_id: string;
  run_id: string;
  title: string;
  post: string;
  image?: {
    imageUrl: string;
    mimeType: string;
  };
  status: string;
  scheduleDate: string;
}

export async function getAllPosts(): Promise<PostResponse[]> {
  try {
    // Initialize the LangGraph client
    const client = new Client({
      apiUrl: process.env.LANGGRAPH_API_URL,
    });

    // Fetch threads with graph_id: "upload_post"
    const threads = await client.threads.search({
      limit: 300,
      metadata: {
        graph_id: "upload_post",
      },
    });

    // Filter for idle or busy threads
    const idleAndBusyThreads = threads.filter(
      (t: any) => t.status === "busy"
    );

    // Transform threads into the desired PostResponse format
    const posts: PostResponse[] = [];

    for (const { thread_id } of idleAndBusyThreads) {
      // Fetch runs for the thread
      const runs = await client.runs.list(thread_id);
      const run = runs[0]; // Assume the first run contains the relevant data

      if (!run || !run.kwargs?.input) {
        console.warn(`No valid run or input found for thread ${thread_id}`);
        continue;
      }

      const input = run.kwargs.input;

      // Extract post data (adjust based on actual input structure)
      const postContent = input.post || "";
      const imageUrl = input.imageUrl || "";
      const scheduledDate = input.scheduledDate || ""; // Expected format: YYYY-MM-DD
      const scheduledTime = input.scheduledTime || ""; // Expected format: HH:MM

      // Skip if critical data is missing
      if (!postContent || !scheduledDate || !scheduledTime) {
        console.warn(`Incomplete post data for thread ${thread_id}`);
        continue;
      }

      // Construct PostResponse object
      const post: PostResponse = {
        thread_id,
        run_id: run.run_id || `run_${thread_id}`, // Use actual run_id or fallback
        title: `Title for ${thread_id}`, // Generate a title since it's not provided in the input
        post: postContent,
        image: imageUrl
          ? {
              imageUrl,
              mimeType: "image/jpeg", // Assume JPEG, adjust as needed
            }
          : undefined,
        status: "Published", // Hardcoding as "Published" since the desired format requires it
        scheduleDate: `${scheduledDate}T${scheduledTime}:00Z`, // Combine into ISO format
      };

      posts.push(post);
    }

    console.log(`Retrieved ${posts.length} scheduled posts`);
    return posts;

  } catch (error) {
    console.error("Error fetching scheduled posts:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to retrieve scheduled posts"
    );
  }
}
























// export async function getAllPosts() {
//     return [
//       {
//         thread_id: "thread_789",
//         run_id: "run_012",
//         title: "Title 1",
//         post: "Sample post 1",
//         image: {
//           imageUrl: "https://unsplash.it/200/200?id=1",
//           mimeType: "image/jpeg",
//         },
//         status: "Published",
//         scheduleDate: "2025-05-15T09:00:00Z",
//       },
//       {
//         thread_id: "thread_456",
//         run_id: "run_013",
//         title: "Title 2",
//         post: "Sample post 2",
//         image: {
//           imageUrl: "https://unsplash.it/200/200?id=2",
//           mimeType: "image/jpeg",
//         },
//         status: "Published",
//         scheduleDate: "2025-05-16T09:00:00Z",
//       },
//     ];
//   }