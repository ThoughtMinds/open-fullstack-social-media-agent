import { client } from "../lib/client";
import {
  SKIP_CONTENT_RELEVANCY_CHECK,
  SKIP_USED_URLS_CHECK,
} from "../lib/constants";

export const schedulePost = {
  name: "SchedulePost",
  description: "Schedules a social media post to be uploaded at a specified time",
  parameters: [
    {
      name: "post",
      type: "string",
      description: "The content of the social media post",
      required: true,
    },
    {
      name: "schedule",
      type: "string",
      description: "Cron schedule for the post (e.g., '0 8 * * *' for 8:00 AM UTC daily)",
      required: true,
    },
    {
      name: "imageUrl",
      type: "string",
      description: "Optional URL of an image to include with the post",
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
    post,
    schedule,
    imageUrl,
    slackChannelId,
  }: {
    post: string;
    schedule: string;
    imageUrl?: string;
    slackChannelId?: string;
  }) => {
    try {
      const cronResponse = await client.crons.create("upload_post", {
        schedule,
        config: {
          configurable: {
            slackChannelId: slackChannelId || "default_channel",
            maxDaysHistory: 1,
            [SKIP_CONTENT_RELEVANCY_CHECK]: true,
            [SKIP_USED_URLS_CHECK]: true,
          },
        },
        input: {
          post,
          image: imageUrl ? { imageUrl, mimeType: "image/jpeg" } : undefined,
        },
      });
      return {
        status: "Post scheduled successfully",
        cron_id: cronResponse.cron_id,
        schedule,
      };
    } catch (error: any) {
      console.error("Error scheduling post:", error);
      return {
        status: "Error scheduling post",
        error: error.message,
      };
    }
  },
};