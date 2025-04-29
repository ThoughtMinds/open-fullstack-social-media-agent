import { Client } from "@langchain/langgraph-sdk";
// import { DefaultValues } from "./schema.js";
import { client } from "./client";

async function listThreadsFunc(
    client: Client,
    query?: {
      metadata?: Record<string, any>;
      limit?: number;
      offset?: number;
      status?: "idle" | "busy" | "interrupted" | "error";
    }
  ) {
    try {
      const threads = await client.threads.search(query);
      if (!threads || threads.length === 0) {
        return {
          status: "No threads found",
          threads: [],
        };
      }
      return {
        status: "Threads retrieved",
        threads: threads,
      };
    } catch (error: any) {
      console.error("Error listing threads:", error);
      return {
        status: "Error listing threads",
        error: error.message,
        threads: [],
      };
    }
  }


  export const listThreads = {
    name: "ListThreads",
    description: "Lists threads with optional filtering by metadata, limit, offset, or status",
    parameters: [
      {
        name: "query",
        type: "object",
        description: "Optional query parameters for filtering threads",
        required: false,
        parameters: [
          {
            name: "metadata",
            type: "object",
            description: "Metadata to filter threads by",
            required: false,
          },
          {
            name: "limit",
            type: "number",
            description: "Maximum number of threads to return",
            required: false,
          },
          {
            name: "offset",
            type: "number",
            description: "Offset to start from",
            required: false,
          },
          {
            name: "status",
            type: "string",
            description: "Thread status to filter on (idle, busy, interrupted, error)",
            required: false,
          },
        ],
      },
    ],
    handler: async ({ query }: { query?: any }) => {
      return await listThreadsFunc(client, query);
    },
  };