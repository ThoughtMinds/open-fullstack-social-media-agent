// import { client } from "./client";
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
}

// Define the response format to match the desired output
export interface PendingRun {
  thread_id: string;
  run_id: string;
  post: string;
  image?: string; // String for image URL
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
  state?: {
    values?: {
      post?: string;
      title?: string;
    };
  };
}

export const getScheduledPosts = {
  name: "GetScheduledPosts",
  description: "Retrieves all scheduled social media posts",
  parameters: [],
  handler: async () => {
    try {
      // Initialize the LangGraph client
      const langGraphClient = new Client({
        apiUrl: process.env.LANGGRAPH_API_URL,
      });

      // Fetch threads with graph_id: "upload_post"
      const busyThreads = await langGraphClient.threads.search({
        metadata: {
          graph_id: "upload_post",
        },
        status: "busy",
      });

      console.log(`Found ${busyThreads.length} threads`);

      // Array to store the posts
      const posts: PendingRun[] = [];
      
      // Process each thread to extract values
      for (const thread of busyThreads) {
        try {
          const runs = await langGraphClient.runs.list(thread.thread_id);
          
          if (!runs || runs.length === 0) {
            console.warn(`No run found for thread ${thread.thread_id}`);
            continue;
          }
          
          const run = runs[0] as Run;
          
          if (!run) {
            console.warn(`No valid run data for thread ${thread.thread_id}`);
            continue;
          }

          // Extract the necessary data from the run
          if (run.kwargs?.input) {
            const postResponse: PendingRun = {
              thread_id: thread.thread_id,
              run_id: run.run_id,
              post: run.kwargs.input.post || "",
              title: run.kwargs.input.title || "",
              status: "Scheduled",
              scheduleDate: run.created_at
            };

            // Add image if available
            if (run.kwargs.input.image) {
              postResponse.image = run.kwargs.input.image;
            }
              
            posts.push(postResponse);
            console.log(`Extracted post from thread ${thread.thread_id}`);
          } else {
            console.log(`No post content found in thread ${thread.thread_id}`);
          }
        } catch (threadError) {
          console.error(`Error processing thread ${thread.thread_id}:`, threadError);
        }
      }

      console.log(`Retrieved ${posts.length} posts`);
      
      return {
        status: "success",
        data: posts,
      };
    } catch (error) {
      console.error("Error fetching scheduled posts:", error);
      return {
        status: "error",
        message: "Failed to retrieve scheduled posts",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};




// import "dotenv/config";
// import { Client } from "@langchain/langgraph-sdk";

// // Add this to your lib/types.ts file
// export interface PendingRun {
//   thread_id: string;
//   run_id: string;
//   post: string;
//   image?: {
//     imageUrl: string;
//     mimeType: string;
//   };
//   scheduleDate: string;
// }

// export const getScheduledPosts = {
//   name: "GetScheduledPosts",
//   description: "Retrieves all scheduled social media posts",
//   parameters: [],
//   handler: async () => {
//     try {
//       // Initialize the LangGraph client
//       const client = new Client({
//         apiUrl: process.env.LANGGRAPH_API_URL,
//       });

//       // Fetch threads with graph_id: "upload_post"
//       const threads = await client.threads.search({
//         limit: 300,
//         metadata: {
//           graph_id: "upload_post",
//         },
//       });

//       // Filter for idle or busy threads
//       const idleAndBusyThreads = threads.filter(
//         (t) => t.status === "idle" || t.status === "busy"
//       );

//       // Transform threads into PendingRun format
//       const pendingRunPosts: PendingRun[] = [];

//       for (const { thread_id } of idleAndBusyThreads) {
//         // Fetch runs for the thread
//         const runs = await client.runs.list(thread_id);
//         const run = runs[0]; // Assume the first run contains the relevant data

//         if (!run || !run.kwargs?.input) {
//           console.warn(`No valid run or input found for thread ${thread_id}`);
//           continue;
//         }

//         const input = run.kwargs.input;

//         // Extract post data (adjust based on actual input structure)
//         const postContent = input.post || "";
//         const imageUrl = input.imageUrl || "";
//         const scheduledDate = input.scheduledDate || ""; // Expected format: YYYY-MM-DD
//         const scheduledTime = input.scheduledTime || ""; // Expected format: HH:MM

//         // Skip if critical data is missing
//         if (!postContent || !scheduledDate || !scheduledTime) {
//           console.warn(`Incomplete post data for thread ${thread_id}`);
//           continue;
//         }

//         // Construct PendingRun object
//         const pendingRun: PendingRun = {
//           thread_id,
//           run_id: run.run_id || `run_${thread_id}`, // Use actual run_id or fallback
//           post: postContent,
//           image: imageUrl
//             ? {
//                 imageUrl,
//                 mimeType: "image/jpeg", // Assume JPEG, adjust as needed
//               }
//             : undefined,
//           scheduleDate: `${scheduledDate}T${scheduledTime}:00Z`, // Combine into ISO format
//         };

//         pendingRunPosts.push(pendingRun);
//       }

//       console.log(`Retrieved ${pendingRunPosts.length} scheduled posts`);

//       return {
//         status: "success",
//         data: pendingRunPosts,
//       };
//     } catch (error) {
//       console.error("Error fetching scheduled posts:", error);
//       return {
//         status: "error",
//         message: "Failed to retrieve scheduled posts",
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//     }
//   },
// };















