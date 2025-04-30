import { NextResponse } from "next/server";
import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";

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
  images?: {
    imageUrl: string;
  }[];
  status: string;
  scheduleDate: string;
}

async function getAllPosts(): Promise<PostResponse[]> {
  try {
    // Initialize the LangGraph client
    const client = new Client({
      apiUrl: process.env.LANGGRAPH_API_URL,
    });

    // Fetch threads with graph_id: "generate_post_copilotkit_wrapper"
    const threads = await client.threads.search({
      limit: 300,
      metadata: {
        graph_id: "generate_post_copilotkit_wrapper",
      },
    });

    console.log(`Found ${threads.length} threads`);

    // Array to store the posts
    const posts: PostResponse[] = [];
    
    // Process each thread to extract values
    for (const thread of threads) {
      try {
        // Get the thread state to access the values
        const threadState = await client.threads.getState(thread.thread_id);
        
        console.log("threadState",threadState)

        // Check if the thread state has the values we need
        if (threadState.values) {
          const { post, imageOptions, scheduleDate } = threadState.values;
          
          if (post) {
            // Split the post content by the first "\n\n" to extract title and body
            const [title, ...postBody] = post.split("\n\n");
            const postContent = postBody.join("\n\n"); // Rejoin the rest as the post body

            // Select the first image from imageOptions as primary image, and the rest as additional images
            const imageUrl = imageOptions && imageOptions.length > 0 ? imageOptions[0] : undefined;
            const additionalImages = imageOptions && imageOptions.length > 1 ? imageOptions.slice(1) : undefined;
             //Action Required, Scheduled, Completed, Error
            // Create the post response object
            const postResponse: PostResponse = {
              thread_id: thread.thread_id,
              title: title || `Post for ${new Date(scheduleDate).toLocaleDateString()}`, // Fallback title
              post: postContent || "", // Ensure post is not undefined
              image: imageUrl ? {
                imageUrl,
                mimeType: determineImageMimeType(imageUrl)
              } : undefined,
              images: additionalImages ? additionalImages.map((url: string) => ({
                imageUrl: url,
              })) : undefined,
              status: "Scheduled",
              scheduleDate // Using the scheduleDate directly from thread values
            };
            
            posts.push(postResponse);
            console.log(`Extracted post from thread ${thread.thread_id}`);
          } else {
            console.log(`No post content found in thread ${thread.thread_id}`);
          }
        } else {
          console.log(`No values found in thread state for ${thread.thread_id}`);
        }
      } catch (threadError) {
        console.error(`Error processing thread ${thread.thread_id}:`, threadError);
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

// Helper function to determine MIME type based on image URL
function determineImageMimeType(imageUrl: string): string {
  if (!imageUrl) return "image/jpeg"; // Default
  
  const extension = imageUrl.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    default:
      return 'image/jpeg'; // Default fallback
  }
}

export async function GET() {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve posts" },
      { status: 500 }
    );
  }
}













// import { NextResponse } from "next/server";
// import "dotenv/config";
// import { Client } from "@langchain/langgraph-sdk";

// // Define the PendingRun interface (this should ideally be in a types.ts file, but included here for completeness)
// interface PendingRun {
//   thread_id: string;
//   run_id: string;
//   post: string;
//   image?: {
//     imageUrl: string;
//     mimeType: string;
//   };
//   scheduleDate: string;
// }

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
//   status: string;
//   scheduleDate: string;
// }

// async function getAllPosts(): Promise<PostResponse[]> {
//   try {
//     // Initialize the LangGraph client
//     const client = new Client({
//       apiUrl: process.env.LANGGRAPH_API_URL,
//     });

//     // Fetch threads with graph_id: "generate_post"
//     const threads = await client.threads.search({
//       limit: 300,
//       metadata: {
//         graph_id: "generate_post_copilotkit_wrapper",
//       },
//     });

//     console.log("threads",threads)

//     // Filter for idle or busy threads
//     const idleAndBusyThreads = threads.filter(
//       (t: any) => t.status === "idle" || t.status === "busy"
//     );

//     // Transform threads into the desired PostResponse format
//     const posts: PostResponse[] = [];

//     for (const { thread_id } of idleAndBusyThreads) {
//       // Fetch runs for the thread
//       const runs = await client.runs.list(thread_id);
//       const run = runs[0]; // Assume the first run contains the relevant data

//       if (!run || !run.kwargs?.input) {
//         console.warn(`No valid run or input found for thread ${thread_id}`);
//         continue;
//       }

//       const input = run.kwargs.input;

//       // Extract post data (adjust based on actual input structure)
//       const postContent = input.post || "";
//       const imageUrl = input.imageUrl || "";
//       const scheduledDate = input.scheduledDate || ""; // Expected format: YYYY-MM-DD
//       const scheduledTime = input.scheduledTime || ""; // Expected format: HH:MM

//       // Skip if critical data is missing
//       if (!postContent || !scheduledDate || !scheduledTime) {
//         console.warn(`Incomplete post data for thread ${thread_id}`);
//         continue;
//       }

//       // Construct PostResponse object
//       const post: PostResponse = {
//         thread_id,
//         run_id: run.run_id || `run_${thread_id}`, // Use actual run_id or fallback
//         title: `Title for ${thread_id}`, // Generate a title since it's not provided in the input
//         post: postContent,
//         image: imageUrl
//           ? {
//               imageUrl,
//               mimeType: "image/jpeg", // Assume JPEG, adjust as needed
//             }
//           : undefined,
//         status: "Published", // Hardcoding as "Published" since the desired format requires it
//         scheduleDate: `${scheduledDate}T${scheduledTime}:00Z`, // Combine into ISO format
//       };

//       posts.push(post);
//     }

//     console.log(`Retrieved ${posts.length} scheduled posts`);
//     return posts;

//   } catch (error) {
//     console.error("Error fetching scheduled posts:", error);
//     throw new Error(
//       error instanceof Error ? error.message : "Failed to retrieve scheduled posts"
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json(await getAllPosts());
// }