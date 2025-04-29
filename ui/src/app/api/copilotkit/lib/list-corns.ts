import { client } from "../lib/client";

export const listCrons = {
  name: "ListCrons",
  description: "Retrieves a list of all configured cron jobs",
  parameters: [
    {
      name: "query",
      type: "object",
      description: "Optional query parameters for filtering cron jobs",
      required: false,
      parameters: [
        {
          name: "assistantId",
          type: "string",
          description: "Filter by assistant ID",
          required: false,
        },
        {
          name: "threadId",
          type: "string",
          description: "Filter by thread ID",
          required: false,
        },
        {
          name: "limit",
          type: "number",
          description: "Maximum number of cron jobs to return",
          required: false,
        },
        {
          name: "offset",
          type: "number",
          description: "Offset to start from",
          required: false,
        },
      ],
    },
  ],
  handler: async ({ query }: { query?: any }) => {
    try {
      const crons = await client.crons.search(query);
      if (!crons || crons.length === 0) {
        return {
          status: "No cron jobs found",
          crons: [],
        };
      }
      return {
        status: "Cron jobs retrieved",
        crons,
      };
    } catch (error: any) {
      console.error("Error listing cron jobs:", error);
      return {
        status: "Error listing cron jobs",
        error: error.message,
        crons: [],
      };
    }
  },
};