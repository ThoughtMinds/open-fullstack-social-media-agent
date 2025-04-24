import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  langGraphPlatformEndpoint,
  LangChainAdapter,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";
import {
  generatePostForBlog,
  getThreadState,
  updateThreadState,
  listThreads,
  schedulePost,
  createCron,
  deleteCron,
  listCrons,
} from "./lib";

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables.");
}

// Initialize the OpenAI model
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

// LangChain service adapter
const serviceAdapter = new LangChainAdapter({
  chainFn: async ({ messages, tools }) => {
    return model.bindTools(tools, { strict: true }).stream(messages);
  },
});

// Initialize CopilotRuntime
const runtime = new CopilotRuntime({
  actions: ({ properties, url }) => [
    generatePostForBlog,
    getThreadState,
    updateThreadState,
    listThreads,
    schedulePost,
    createCron,
    deleteCron,
    listCrons
    
  ],
  remoteEndpoints: [
    langGraphPlatformEndpoint({
      deploymentUrl: process.env.AGENT_DEPLOYMENT_URL || "http://127.0.0.1:54367",
      langsmithApiKey: process.env.LANGSMITH_API_KEY,
      agents: [
        {
          name: "generate_post",
          description: "Help the user as much as you can",
        },
      ],
    }),
  ],
});

// POST handler for the API route
export const POST = async (req: NextRequest) => {
  try {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter,
      endpoint: "/api/copilotkit",
    });
    const response = await handleRequest(req);
    return response;
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};




// import {
//   CopilotRuntime,
//   copilotRuntimeNextJSAppRouterEndpoint,
//   langGraphPlatformEndpoint,
//   LangChainAdapter,
// } from "@copilotkit/runtime";
// import { NextRequest } from "next/server";
// import { ChatOpenAI } from "@langchain/openai";
// import "dotenv/config";
// import { Client } from "@langchain/langgraph-sdk";
// import {
//   SKIP_CONTENT_RELEVANCY_CHECK,
//   SKIP_USED_URLS_CHECK,
//   TEXT_ONLY_MODE,
// } from "./lib/constants";
// import { client } from "./lib/client";
// import { createThread } from "./lib/thread-genaration";
// import { getThreadState } from "./lib/get-thread-state";
// import { updateThreadState } from "./lib/update-thread-state";
// import { listThreads } from "./lib/list-threads";


// // Validate environment variables
// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("OPENAI_API_KEY is not set in the environment variables.");
// }

// // Initialize the OpenAI model
// const model = new ChatOpenAI({
//   modelName: "gpt-4o-mini",
//   temperature: 0,
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // LangChain service adapter
// const serviceAdapter = new LangChainAdapter({
//   chainFn: async ({ messages, tools }) => {
//     return model.bindTools(tools, { strict: true }).stream(messages);
//   },
// });

// // Initialize CopilotRuntime
// const runtime = new CopilotRuntime({
//   actions: ({ properties, url }) => [
  
//     {
//       name: "GetThreadState",
//       description: "Retrieves the current state of a thread by its thread ID",
//       parameters: [
//         {
//           name: "thread_id",
//           type: "string",
//           description: "The ID of the thread to retrieve the state for",
//           required: true,
//         },
//       ],
//       handler: async ({ thread_id }: { thread_id: string }) => {
//         return await getThreadState(client, thread_id);
//       },
//     },
//     {
//       name: "UpdateThreadState",
//       description: "Updates the state of a thread with new values",
//       parameters: [
//         {
//           name: "thread_id",
//           type: "string",
//           description: "The ID of the thread to update",
//           required: true,
//         },
//         {
//           name: "values",
//           type: "object",
//           description: "The new state values to update",
//           required: true,
//         },
//         {
//           name: "checkpoint",
//           type: "object",
//           description: "Optional checkpoint data",
//           required: false,
//         },
//         {
//           name: "checkpointId",
//           type: "string",
//           description: "Optional checkpoint ID",
//           required: false,
//         },
//         {
//           name: "asNode",
//           type: "string",
//           description: "Optional node identifier",
//           required: false,
//         },
//       ],
//       handler: async ({
//         thread_id,
//         values,
//         checkpoint,
//         checkpointId,
//         asNode,
//       }: {
//         thread_id: string;
//         values: any;
//         checkpoint?: any;
//         checkpointId?: string;
//         asNode?: string;
//       }) => {
//         return await updateThreadState(client, thread_id, {
//           values,
//           checkpoint,
//           checkpointId,
//           asNode,
//         });
//       },
//     },
//     {
//       name: "ListThreads",
//       description: "Lists threads with optional filtering by metadata, limit, offset, or status",
//       parameters: [
//         {
//           name: "query",
//           type: "object",
//           description: "Optional query parameters for filtering threads",
//           required: false,
//           parameters: [
//             {
//               name: "metadata",
//               type: "object",
//               description: "Metadata to filter threads by",
//               required: false,
//             },
//             {
//               name: "limit",
//               type: "number",
//               description: "Maximum number of threads to return",
//               required: false,
//             },
//             {
//               name: "offset",
//               type: "number",
//               description: "Offset to start from",
//               required: false,
//             },
//             {
//               name: "status",
//               type: "string",
//               description: "Thread status to filter on (idle, busy, interrupted, error)",
//               required: false,
//             },
//           ],
//         },
//       ],
//       handler: async ({ query }: { query?: any }) => {
//         return await listThreads(client, query);
//       },
//     },


//   ],
//   remoteEndpoints: [
//     langGraphPlatformEndpoint({
//       deploymentUrl: process.env.AGENT_DEPLOYMENT_URL || "http://127.0.0.1:54367",
//       langsmithApiKey: process.env.LANGSMITH_API_KEY,
//       agents: [
//         {
//           name: "generate_post",
//           description: "Help the user as much as you can",
//         },
//       ],
//     }),
//   ],
// });

// // POST handler for the API route
// export const POST = async (req: NextRequest) => {
//   try {
//     const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
//       runtime,
//       serviceAdapter,
//       endpoint: "/api/copilotkit",
//     });
//     const response = await handleRequest(req);
//     return response;
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };











// import {
//   CopilotRuntime,
//   copilotRuntimeNextJSAppRouterEndpoint,
//   langGraphPlatformEndpoint,
//   LangChainAdapter,
// } from "@copilotkit/runtime";
// import { NextRequest } from "next/server";
// import { ChatOpenAI } from "@langchain/openai";

// // Initialize the OpenAI model
// const model = new ChatOpenAI({
//   modelName: "gpt-4o-mini",
//   temperature: 0,
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Validate environment variables
// if (!process.env.OPENAI_API_KEY) {
//   throw new Error("OPENAI_API_KEY is not set in the environment variables.");
// }

// // Service adapter for LangChain
// const serviceAdapter = new LangChainAdapter({
//   chainFn: async ({ messages, tools }) => {
//     // Validate inputs
//     console.log("here is the message",messages)
//     console.log("here is the tools",tools)
//     if (!messages || !Array.isArray(messages)) {
//       throw new Error("Messages must be a valid array.");
//     }
//     if (tools && !Array.isArray(tools)) {
//       throw new Error("Tools must be a valid array.");
//     }

//     // Log inputs for debugging
//     console.log("Messages:", messages);
//     console.log("Tools:", tools);

//     try {
//       // Bind tools (if provided) and stream the response
//       const modelWithTools = tools?.length
//         ? model.bindTools(tools, { strict: true })
//         : model;

//       // Stream the response
//       // return modelWithTools.stream(messages);

//       return modelWithTools.stream(messages, { timeout: 60000 }); // 60 seconds
//     } catch (error) {
//       console.error("Error in chainFn:", error);
//       throw error;
//     }
//   },
// });

// // Initialize CopilotRuntime
// const runtime = new CopilotRuntime({
//   remoteEndpoints: [
//     langGraphPlatformEndpoint({
//       deploymentUrl: process.env.AGENT_DEPLOYMENT_URL || "http://localhost:54367",
//       langsmithApiKey: process.env.LANGSMITH_API_KEY,
//       agents: [
//         {
//           name: "generate_post",
//           description: "Generates posts based on provided url content.",
//         },
//         {
//           name: "ingest_data",
//           description: "Ingests and processes data for further use.",
//         },
//         {
//           name: "upload_post",
//           description: "Uploads generated posts to specified platforms.",
//         },
//         {
//           name: "reflection",
//           description: "Reflects on past actions or data to improve future performance.",
//         },
//         {
//           name: "generate_thread",
//           description: "Creates threads for organizing conversations or workflows.",
//         },
//         {
//           name: "curate_data",
//           description: "Curates and filters data for relevance and quality.",
//         },
//         {
//           name: "verify_reddit_post",
//           description: "Verifies and validates Reddit posts for compliance.",
//         },
//         {
//           name: "verify_tweet",
//           description: "Verifies and validates tweets for compliance.",
//         },
//         {
//           name: "supervisor",
//           description: "Supervises and coordinates multiple agents or workflows.",
//         },
//         {
//           name: "generate_report",
//           description: "Generates reports based on processed data or actions.",
//         },
//         {
//           name: "repurposer",
//           description: "Repurposes content for different platforms or formats.",
//         },
//         {
//           name: "curated_post_interrupt",
//           description: "Interrupts curated post workflows for human review.",
//         },
//         {
//           name: "ingest_repurposed_data",
//           description: "Ingests and processes repurposed data.",
//         },
//         {
//           name: "repurposer_post_interrupt",
//           description: "Interrupts repurposer workflows for human review.",
//         },
//       ],

//     }),
//   ],
// });

// // POST handler for the API route
// export const POST = async (req: NextRequest) => {
//   console.log("\n\nreq",req)
//   try {
//     const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
//       runtime,
//       serviceAdapter,
//       endpoint: "/api/copilotkit",
//     });
//     const response = await handleRequest(req);
//     console.log("##response",response)
//     return response
//   } catch (error) {
//     console.error("Error handling POST request:", error);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };







