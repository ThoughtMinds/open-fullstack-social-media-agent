import { Client } from "@langchain/langgraph-sdk";

import { client } from "../lib/client";


export const threadCreation = {
  name: "ThreadCreation",
  description: "Creates a new thread",
  parameters: [],
  handler: async () => {
    const thread_id = await createThread(client);
    console.log("Thread created");

    return {
      status: "Thread created successfully",
      thread_id: thread_id,
    };
  },
};







// Function to create a thread and return the thread_id
export async function createThread(client: Client): Promise<string> {
    try {
      const { thread_id } = await client.threads.create();
      return thread_id;
    } catch (error) {
      console.error("Error creating thread:", error);
      throw new Error("Failed to create thread");
    }
  }