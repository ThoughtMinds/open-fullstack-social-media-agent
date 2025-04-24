import { Client } from "@langchain/langgraph-sdk";
import { DefaultValues } from "./schema.js";
import { client } from "./client";

async function updateThreadStateFunc<ValuesType = DefaultValues>(
  client: Client,
  threadId: string,
  options: {
    values: ValuesType;
    checkpoint?: any;
    checkpointId?: string;
    asNode?: string;
  }
) {
  try {
    const updatedConfig = await client.threads.updateState<ValuesType>(threadId, options);
    if (!updatedConfig) {
      return {
        status: "Failed to update thread state",
        thread_id: threadId,
        config: null,
      };
    }
    return {
      status: "Thread state updated",
      thread_id: threadId,
      config: updatedConfig,
    };
  } catch (error: any) {
    console.error("Error updating thread state:", error);
    return {
      status: "Error updating thread state",
      thread_id: threadId,
      error: error.message,
    };
  }
}

export const updateThreadState = {
  name: "UpdateThreadState",
  description: "Updates the state of a thread with new values",
  parameters: [
    {
      name: "thread_id",
      type: "string",
      description: "The ID of the thread to update",
      required: true,
    },
    {
      name: "values",
      type: "object",
      description: "The new state values to update",
      required: true,
    },
    {
      name: "checkpoint",
      type: "object",
      description: "Optional checkpoint data",
      required: false,
    },
    {
      name: "checkpointId",
      type: "string",
      description: "Optional checkpoint ID",
      required: false,
    },
    {
      name: "asNode",
      type: "string",
      description: "Optional node identifier",
      required: false,
    },
  ],
  handler: async ({
    thread_id,
    values,
    checkpoint,
    checkpointId,
    asNode,
  }: {
    thread_id: string;
    values: any;
    checkpoint?: any;
    checkpointId?: string;
    asNode?: string;
  }) => {
    return await updateThreadStateFunc(client, thread_id, {
      values,
      checkpoint,
      checkpointId,
      asNode,
    });
  },
};