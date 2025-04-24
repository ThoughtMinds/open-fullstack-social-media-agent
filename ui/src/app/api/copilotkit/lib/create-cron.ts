import { client } from "../lib/client";
import {
  SKIP_CONTENT_RELEVANCY_CHECK,
  SKIP_USED_URLS_CHECK,
} from "../lib/constants";

export const createCron = {
  name: "CreateCron",
  description: "Creates a new cron job for a specified agent with a given schedule",
  parameters: [
    {
      name: "agentId",
      type: "string",
      description: "The ID of the agent to run the cron job (e.g., 'upload_post')",
      required: true,
    },
    {
      name: "schedule",
      type: "string",
      description: "Cron schedule for the job (e.g., '0 8 * * *' for 8:00 AM UTC daily)",
      required: true,
    },
    {
      name: "input",
      type: "object",
      description: "Optional input data for the cron job (e.g., post content or image)",
      required: false,
    },
    {
      name: "slackChannelId",
      type: "string",
      description: "Optional Slack channel ID for notifications",
      required: false,
    },
  ],
  handler: async ({
    agentId,
    schedule,
    input,
    slackChannelId,
  }: {
    agentId: string;
    schedule: string;
    input?: any;
    slackChannelId?: string;
  }) => {
    try {
      const cronResponse = await client.crons.create(agentId, {
        schedule,
        config: {
          configurable: {
            slackChannelId: slackChannelId || "default_channel",
            maxDaysHistory: 1,
            [SKIP_CONTENT_RELEVANCY_CHECK]: true,
            [SKIP_USED_URLS_CHECK]: true,
          },
        },
        input: input || {},
      });
      return {
        status: "Cron job created successfully",
        cron_id: cronResponse.cron_id,
        schedule,
        agentId,
      };
    } catch (error: any) {
      console.error("Error creating cron job:", error);
      return {
        status: "Error creating cron job",
        error: error.message,
      };
    }
  },
};