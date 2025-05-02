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




// import { NextResponse } from "next/server";
// import "dotenv/config";
// import { Client } from "@langchain/langgraph-sdk";

// // Define the response format to match the desired output
// interface PostResponse {
//   thread_id: string;
//   run_id: string;
//   post: string;
//   image?: string; // Made optional as it might not always be present
//   scheduleDate: string;
//   status: string; // Added as required in the interface but missing in the implementation
//   title: string;  // Added as required in the interface but missing in the implementation
// }

// // Define the Run type for type safety
// interface Run {
//   run_id: string;
//   created_at: string;
//   kwargs?: {
//     input?: {
//       post?: string;
//       image?: string;
//       title?: string;
//     };
//   };
//   state?: {
//     values?: {
//       post?: string;
//       title?: string;
//     };
//   };
// }

// async function getAllPosts(): Promise<PostResponse[]> {
//   try {
//     // Initialize the LangGraph client
//     const client = new Client({
//       apiUrl: process.env.LANGGRAPH_API_URL,
//     });

//     // Fetch threads with graph_id: "upload_post"
//     const busyThreads = await client.threads.search({
//       metadata: {
//         graph_id: "upload_post",
//       },
//       status: "busy",
//     });

//     console.log(`Found ${busyThreads.length} threads`);

//     // Array to store the posts
//     const posts: PostResponse[] = [];
    
//     // Process each thread to extract values
//     for (const thread of busyThreads) {
//       try {
//         const runs = await client.runs.list(thread.thread_id);
        
//         if (!runs || runs.length === 0) {
//           console.warn(`No run found for thread ${thread.thread_id}`);
//           continue;
//         }
        
//         const run = runs[0] as Run;
        
//         if (!run) {
//           console.warn(`No valid run data for thread ${thread.thread_id}`);
//           continue;
//         }

//         // Extract the necessary data from the run
//         if (run.kwargs?.input) {
//           const postResponse: PostResponse = {
//             thread_id: thread.thread_id,
//             run_id: run.run_id,
//             post: run.kwargs.input.post || "",
//             title: run.kwargs.input.title || "",
//             status: "Scheduled",
//             scheduleDate: run.created_at
//           };

//           // Add image if available
//           if (run.kwargs.input.image) {
//             postResponse.image = run.kwargs.input.image;
//           }
            
//           posts.push(postResponse);
//           console.log(`Extracted post from thread ${thread.thread_id}`);
//         } else {
//           console.log(`No post content found in thread ${thread.thread_id}`);
//         }
//       } catch (threadError) {
//         console.error(`Error processing thread ${thread.thread_id}:`, threadError);
//       }
//     }

//     console.log(`Retrieved ${posts.length} posts`);
//     return posts;

//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to retrieve posts"
//     );
//   }
// }

// export async function GET() {
//   try {
//     const posts = await getAllPosts();
//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve posts" },
//       { status: 500 }
//     );
//   }
// }














// import { NextResponse } from "next/server";
// import "dotenv/config";
// import { Client } from "@langchain/langgraph-sdk";

// // Define the response format to match the desired output
// interface PostResponse {
//   thread_id: string;
//   run_id: string;
//   title: string;
//   post: string;
//   image?: {
//     imageUrl: string;
//     mimeType: string;
//   };
//   images?: {
//     imageUrl: string;
//   }[];
//   status: string;
//   scheduleDate: string;
// }

// async function getAllPosts(): Promise<PostResponse[]> {
//   try {
//     // Initialize the LangGraph client
//     const client = new Client({
//       apiUrl: process.env.LANGGRAPH_API_URL,
//     });

//     // Fetch threads with graph_id: "generate_post_copilotkit_wrapper"
//     const threads = await client.threads.search({
//       limit: 300,
//       metadata: {
//         graph_id: "upload_post",
//       },
//     });
//         // Filter for idle or busy threads
//     const busyThreads = threads.filter(
//             (t: any) => t.status === "busy"
//     );

//     console.log(`Found ${busyThreads.length} threads`);

//     // Array to store the posts
//     const posts: PostResponse[] = [];
    
//     // Process each thread to extract values
//     for (const thread of busyThreads) {
//       try {
//         // Get the thread state to access the values
//         const threadState = await client.threads.getState(thread.thread_id);
        
//         console.log("threadState",threadState)

//         // Check if the thread state has the values we need
//         if (threadState.values) {
//           const { post, imageOptions, scheduleDate } = threadState.values;
          
//           if (post) {
//             // Split the post content by the first "\n\n" to extract title and body
//             const [title, ...postBody] = post.split("\n\n");
//             const postContent = postBody.join("\n\n"); // Rejoin the rest as the post body

//             // Select the first image from imageOptions as primary image, and the rest as additional images
//             const imageUrl = imageOptions && imageOptions.length > 0 ? imageOptions[0] : undefined;
//             const additionalImages = imageOptions && imageOptions.length > 1 ? imageOptions.slice(1) : undefined;
//              //Action Required, Scheduled, Completed, Error
//             // Create the post response object
//             const postResponse: PostResponse = {
//               thread_id: thread.thread_id,
//               title: title || `Post for ${new Date(scheduleDate).toLocaleDateString()}`, // Fallback title
//               post: postContent || "", // Ensure post is not undefined
//               image: imageUrl ? {
//                 imageUrl,
//                 mimeType: determineImageMimeType(imageUrl)
//               } : undefined,
//               images: additionalImages ? additionalImages.map((url: string) => ({
//                 imageUrl: url,
//               })) : undefined,
//               status: "Scheduled",
//               scheduleDate // Using the scheduleDate directly from thread values
//             };
            
//             posts.push(postResponse);
//             console.log(`Extracted post from thread ${thread.thread_id}`);
//           } else {
//             console.log(`No post content found in thread ${thread.thread_id}`);
//           }
//         } else {
//           console.log(`No values found in thread state for ${thread.thread_id}`);
//         }
//       } catch (threadError) {
//         console.error(`Error processing thread ${thread.thread_id}:`, threadError);
//       }
//     }

//     console.log(`Retrieved ${posts.length} posts`);
//     return posts;

//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to retrieve posts"
//     );
//   }
// }

// // Helper function to determine MIME type based on image URL
// function determineImageMimeType(imageUrl: string): string {
//   if (!imageUrl) return "image/jpeg"; // Default
  
//   const extension = imageUrl.split('.').pop()?.toLowerCase();
  
//   switch (extension) {
//     case 'jpg':
//     case 'jpeg':
//       return 'image/jpeg';
//     case 'png':
//       return 'image/png';
//     case 'gif':
//       return 'image/gif';
//     case 'webp':
//       return 'image/webp';
//     case 'svg':
//       return 'image/svg+xml';
//     default:
//       return 'image/jpeg'; // Default fallback
//   }
// }

// export async function GET() {
//   try {
//     const posts = await getAllPosts();
//     return NextResponse.json(posts);
//   } catch (error) {
//     console.error("API error:", error);
//     return NextResponse.json(
//       { error: "Failed to retrieve posts" },
//       { status: 500 }
//     );
//   }
// }










