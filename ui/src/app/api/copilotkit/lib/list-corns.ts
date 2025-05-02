import { client } from "../lib/client";

export const listCrons = {
  name: "ListCrons",
  description: "Retrieves a list of all configured cron jobs",
  handler: async () => {
    try {
      const crons = await client.crons.search();
      console.log("Crons",crons);

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
    } catch (error) {
      console.error("Error listing cron jobs:", error);
      return {
        status: "Error listing cron jobs",
        error: error instanceof Error ? error.message : "Unknown error",
        crons: [],
      };
    }
  },
};