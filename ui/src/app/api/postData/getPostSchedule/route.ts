import { NextResponse } from "next/server";
import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";

// Define the response format to match the desired output
interface PostResponse {
  thread_id: string;
  title: string;
  post: string;
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
        graph_id: "upload_post",
      },
    });
        // Filter for idle or busy threads
    const busyThreads = threads.filter(
            (t: any) => t.status === "busy"
    );
    // const busyThreads = await client.threads.search({
    //     limit: 300,
    //     metadata: {
    //       graph_id: "generate_post_copilotkit_wrapper",
    //     },
    //   });

    console.log(`Found ${busyThreads.length} threads`);

    // Array to store the posts
    const posts: PostResponse[] = [];
    
    // Process each thread to extract values
    for (const thread of busyThreads) {
      try {
        // Get the thread state to access the values
        const threadState = await client.threads.getState(thread.thread_id);
        
        console.log("threadState",threadState)

        // Check if the thread state has the values we need
        if (threadState.values) {
          const { post, scheduleDate } = threadState.values;
          
          if (post) {
            // Split the post content by the first "\n\n" to extract title and body
            const [title, ...postBody] = post.split("\n\n");
            const postContent = postBody.join("\n\n"); // Rejoin the rest as the post body
             //Action Required, Scheduled, Completed, Error
            // Create the post response object
            const postResponse: PostResponse = {
              thread_id: thread.thread_id,
              title: title || `Post for ${new Date(scheduleDate).toLocaleDateString()}`, // Fallback title
              post: postContent || "", // Ensure post is not undefined
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









































