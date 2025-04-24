import { client } from "../lib/client";

export const deleteCron = {
  name: "DeleteCron",
  description: "Deletes a cron job by its ID",
  parameters: [
    {
      name: "cronId",
      type: "string",
      description: "The ID of the cron job to delete",
      required: true,
    },
  ],
  handler: async ({ cronId }: { cronId: string }) => {
    try {
      await client.crons.delete(cronId);
      return {
        status: "Cron job deleted successfully",
        cron_id: cronId,
      };
    } catch (error: any) {
      console.error("Error deleting cron job:", error);
      return {
        status: "Error deleting cron job",
        error: error.message,
      };
    }
  },
};