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
  threadCreation,
  getThreadState,
  // updateThreadState,
  // listThreads,
  schedulePost,
  // createCron,
  // deleteCron,
  // listCrons,
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
    console.log("\nmessages",messages)
    // console.log("\n***tools",tools)
    return model.bindTools(tools, { strict: true }).stream(messages);
  },
});







// Initialize CopilotRuntime
const runtime = new CopilotRuntime({
  actions: ({ properties, url }) => [
    generatePostForBlog,
    threadCreation,
    getThreadState,
    // updateThreadState,
    // listThreads,
    schedulePost,
    // createCron,
    // deleteCron,
    // listCrons
    
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



