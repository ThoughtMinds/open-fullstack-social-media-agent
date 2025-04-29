import { client } from "../lib/client";
import { createThread } from "../lib/thread-genaration";
import {
  SKIP_CONTENT_RELEVANCY_CHECK,
  SKIP_USED_URLS_CHECK,
  TEXT_ONLY_MODE,
} from "../lib/constants";

export const generatePostForBlog = {
  name: "GeneratePostForBlog",
  description: "Generates a social media post for a given website link",
  parameters: [
    {
      name: "link",
      type: "string",
      description: "URL of the blog the user wants to create a post for",
      required: true,
    },
    {
      name: "thread_id",
      type: "string",
      description: "the thread_id of the post creation process",
      required: true,
    },


  ],
  handler: async ({ link, thread_id }: { link: string, thread_id:string }) => {
    // Use the createThread function
    // const thread_id = await createThread(client);
    
    const run = await client.runs.create(thread_id, "generate_post", {
      input: {
        links: [link],
      },
      config: {
        configurable: {
          [TEXT_ONLY_MODE]: false,
          [SKIP_CONTENT_RELEVANCY_CHECK]: true,
          [SKIP_USED_URLS_CHECK]: true,
        },
      },
    });
    console.log("generate post called")

    return { 
      status: "Post generation started", 
      run_id: run.run_id,
      thread_id: thread_id 
    };
  },
};


