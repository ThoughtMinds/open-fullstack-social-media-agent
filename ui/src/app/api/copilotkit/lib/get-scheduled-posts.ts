import { client } from "./client";

// Add this to your lib/types.ts file
export interface ScheduledPost {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  scheduledDate: string; // Format: YYYY-MM-DD
  scheduledTime: string; // Format: HH:MM
}

// Define the PendingRun type
export interface PendingRun {
  thread_id: string;
  run_id: string;
  post: string;
  image?: {
    imageUrl: string;
    mimeType: string;
  };
  scheduleDate: string;
}

export const getScheduledPosts = {
  name: "GetScheduledPosts",
  description: "Retrieves all scheduled social media posts",
  parameters: [],
  handler: async () => {
    try {
      // In a real implementation, you would fetch from your database
      // This is a mock implementation returning sample data
      const scheduledPosts: ScheduledPost[] = [
        {
          id: "post-1",
          name: "New Product Launch",
          imageUrl: "https://example.com/images/product-launch.jpg",
          description:
            "Announcing our revolutionary new product that will change the industry forever! Join us for an exclusive first look.",
          scheduledDate: "2025-05-15",
          scheduledTime: "09:00",
        },
        {
          id: "post-2",
          name: "Summer Sale Promotion",
          imageUrl: "https://example.com/images/summer-sale.jpg",
          description:
            "Beat the heat with our biggest summer sale yet! Get up to 50% off on all summer essentials.",
          scheduledDate: "2025-05-20",
          scheduledTime: "10:30",
        },
        {
          id: "post-3",
          name: "Customer Spotlight: Success Story",
          imageUrl: "https://example.com/images/customer-story.jpg",
          description:
            "Read how our platform helped Company X increase their productivity by 200% in just three months.",
          scheduledDate: "2025-05-25",
          scheduledTime: "14:00",
        },
        {
          id: "post-4",
          name: "Webinar: Industry Trends 2025",
          imageUrl: "https://example.com/images/webinar.jpg",
          description:
            "Join our expert panel as they discuss the latest trends shaping our industry in 2025 and beyond.",
          scheduledDate: "2025-06-01",
          scheduledTime: "11:00",
        },
        {
          id: "post-5",
          name: "Behind the Scenes: Office Tour",
          imageUrl: "https://example.com/images/office-tour.jpg",
          description:
            "Take a virtual tour of our new headquarters and meet the team behind your favorite products!",
          scheduledDate: "2025-06-05",
          scheduledTime: "15:30",
        },
      ];

      // Transform each ScheduledPost to PendingRun format
      const pendingRunPosts: PendingRun[] = scheduledPosts.map((post) => ({
        thread_id: `thread_${post.id}`, // Generate thread_id (modify as per your logic)
        run_id: `run_${post.id}`, // Generate run_id (modify as per your logic)
        post: post.description, // Map description to post
        image: post.imageUrl
          ? {
              imageUrl: post.imageUrl,
              mimeType: "image/jpeg", // Assume JPEG, adjust based on actual image type
            }
          : undefined,
        scheduleDate: `${post.scheduledDate}T${post.scheduledTime}:00Z`, // Combine date and time into ISO format
      }));

      console.log("Retrieved scheduled posts");

      return {
        status: "success",
        data: pendingRunPosts,
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















