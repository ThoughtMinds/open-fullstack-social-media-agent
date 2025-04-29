import { Client } from "@langchain/langgraph-sdk";
import { client } from "../lib/client";

async function getThreadStateFunc(client: Client, threadId: string) {
  try {
    const threadState = await client.threads.getState(threadId);
    if (!threadState) {
      return {
        status: "Thread not found",
        thread_id: threadId,
        state: null,
      };
    }
    return {
      status: "Thread state retrieved",
      thread_id: threadId,
      state: threadState,
    };
  } catch (error: any) {
    console.error("Error retrieving thread state:", error);
    return {
      status: "Error retrieving thread state",
      thread_id: threadId,
      error: error.message,
    };
  }
}



export const getThreadState = {
  name: "GetThreadState",
  description: "Retrieves the current state of a thread by its thread ID",
  parameters: [
    {
      name: "thread_id",
      type: "string",
      description: "The ID of the thread to retrieve the state for",
      required: true,
    },
  ],
  handler: async ({ thread_id }: { thread_id: string }) => {
    console.log("genereting thread id")
    return await getThreadStateFunc(client, thread_id);
  },
};



