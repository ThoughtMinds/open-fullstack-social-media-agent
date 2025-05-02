import { client } from "../lib/client";
import {
  POST_TO_LINKEDIN_ORGANIZATION,
  SKIP_CONTENT_RELEVANCY_CHECK,
  SKIP_USED_URLS_CHECK,
  TEXT_ONLY_MODE,
} from "../lib/constants";

export const generateCronForPostBlog = {
  name: "GenerateCronForPostBlog",
  description: "Creates a new cron job for the Social Media Agent to process a blog post",
  parameters: [
    {
      name: "slack_channel_id",
      type: "string",
      description: "Slack channel ID where notifications should be sent",
      required: true,
    }
  ],
  handler: async ({ slack_channel_id}: { slack_channel_id: string}) => {
    try {
      // Create the cron job for Social Media Agent
      const cronResponse = await client.crons.create("ingest_data", {
        schedule: "0 8 * * *", // Runs at 8:00 AM UTC every day (1:00 AM PST)
        config: {
          configurable: {
            slackChannelId: slack_channel_id,
            maxDaysHistory: 1,
            [POST_TO_LINKEDIN_ORGANIZATION]: false,
            [TEXT_ONLY_MODE]: true,
            [SKIP_CONTENT_RELEVANCY_CHECK]: true,
            [SKIP_USED_URLS_CHECK]: true,
          },
        },
      });

      console.log("\n\nCreated cron\n\n", cronResponse);
      
      // Fetch all crons for verification
      const crons = await client.crons.search();
      console.log("\n\nAll Crons\n\n", crons);

      return {
        status: "Post generation started",
        cron_id: cronResponse.id,
      };
    } catch (error) {
      console.error("\n\nError creating cron job\n\n", error);
      return {
        status: "Error starting post generation",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};











// import { client } from "../lib/client";
// import { createThread } from "../lib/thread-generation";
// import {
//   SKIP_CONTENT_RELEVANCY_CHECK,
//   SKIP_USED_URLS_CHECK,
//   TEXT_ONLY_MODE,
// } from "../lib/constants";

// export const generateCronForPostBlog = {
//   name: "GenerateCronForPostBlog",
//   description: "Creates a new cron job for a specified agent with a given schedule",
//   parameters: [
//     {
//       name: "link",
//       type: "string",
//       description: "URL of the blog the user wants to create a post for",
//       required: true,
//     },
//     {
//       name: "thread_id",
//       type: "string",
//       description: "The thread_id of the post creation process",
//       required: true,
//     },
//   ],
//   handler: async ({ link, thread_id }: { link: string; thread_id: string }) => {
//     try {
//       // Create thread for post generation
//       await createThread(thread_id, {
//         link,
//         mode: TEXT_ONLY_MODE,
//       });

//       // Create the cron job
//       const cronResponse = await client.crons.create("ingest_data", {
//         schedule: "0 8 * * *", // Runs at 8:00 AM UTC every day (1:00 AM PST)
//         config: {
//           configurable: {
//             slackChannelId: "ADD_SLACK_CHANNEL_ID_HERE",
//             maxDaysHistory: 1,
//             [SKIP_CONTENT_RELEVANCY_CHECK]: true,
//             [SKIP_USED_URLS_CHECK]: true,
//             thread_id, // Associate cron with thread
//             source_url: link, // Include source URL
//           },
//         },
//         input: {
//           url: link,
//           thread_id,
//         },
//       });

//       console.log("\n\nCreated cron\n\n");
//       console.dir(cronResponse, { depth: null });

//       // Fetch all crons for verification
//       const crons = await client.crons.search();
//       console.log("\n\nAll Crons\n\n");
//       console.dir(crons, { depth: null });

//       return {
//         status: "Post generation started",
//         thread_id,
//         cron_id: cronResponse.id,
//       };
//     } catch (error) {
//       console.error("\n\nError creating cron job\n\n", error);
//       return {
//         status: "Error starting post generation",
//         thread_id,
//         error: error instanceof Error ? error.message : "Unknown error",
//       };
//     }
//   },
// };