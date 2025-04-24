import { Client } from "@langchain/langgraph-sdk";






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