import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  langGraphPlatformEndpoint,
  LangChainAdapter,
} from "@copilotkit/runtime";
import { NextRequest } from "next/server";
import { ChatOpenAI } from "@langchain/openai";

// Initialize the OpenAI model
const model = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in the environment variables.");
}

// Service adapter for LangChain
const serviceAdapter = new LangChainAdapter({
  chainFn: async ({ messages, tools }) => {
      return model.bindTools(tools, { strict: true }).stream(messages);
  },
});

// Initialize CopilotRuntime
const runtime = new CopilotRuntime({
  remoteEndpoints: [
    langGraphPlatformEndpoint({
      deploymentUrl: process.env.AGENT_DEPLOYMENT_URL || "http://localhost:54367",
      langsmithApiKey: process.env.LANGSMITH_API_KEY,
      agents: [
        {
          name: "generate_post",
          description: "Generates posts based on provided url content.",
          assistantId:"generate_post"
        },
        // {
        //   name: "ingest_data",
        //   description: "Ingests and processes data for further use.",
        // },
        // {
        //   name: "upload_post",
        //   description: "Uploads generated posts to specified platforms.",
        // },
        // {
        //   name: "reflection",
        //   description: "Reflects on past actions or data to improve future performance.",
        // },
        // {
        //   name: "generate_thread",
        //   description: "Creates threads for organizing conversations or workflows.",
        // },
        // {
        //   name: "curate_data",
        //   description: "Curates and filters data for relevance and quality.",
        // },
        // {
        //   name: "verify_reddit_post",
        //   description: "Verifies and validates Reddit posts for compliance.",
        // },
        // {
        //   name: "verify_tweet",
        //   description: "Verifies and validates tweets for compliance.",
        // },
        // {
        //   name: "supervisor",
        //   description: "Supervises and coordinates multiple agents or workflows.",
        // },
        // {
        //   name: "generate_report",
        //   description: "Generates reports based on processed data or actions.",
        // },
        // {
        //   name: "repurposer",
        //   description: "Repurposes content for different platforms or formats.",
        // },
        // {
        //   name: "curated_post_interrupt",
        //   description: "Interrupts curated post workflows for human review.",
        // },
        // {
        //   name: "ingest_repurposed_data",
        //   description: "Ingests and processes repurposed data.",
        // },
        // {
        //   name: "repurposer_post_interrupt",
        //   description: "Interrupts repurposer workflows for human review.",
        // },
      ],

    }),
  ],
});

// POST handler for the API route
export const POST = async (req: NextRequest) => {
  console.log("\n\nreq",req)
  try {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      serviceAdapter,
      endpoint: "/api/copilotkit",
    });
    const response = await handleRequest(req);
    console.log("##response",response)
    return response
  } catch (error) {
    console.error("Error handling POST request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};







