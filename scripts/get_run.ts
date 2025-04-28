import "dotenv/config";
import { Client } from "@langchain/langgraph-sdk";
/**
 * Generate a post based on a LangChain blog post.
 * This may be modified to generate posts for other content.
 */
async function invoke() {
  const client = new Client({
    apiUrl: process.env.LANGGRAPH_API_URL || "http://localhost:54367",
  });

//   const { thread_id } = await client.threads.create();
  const thread_id="46bbd332-840a-402c-952e-97efcee38a05"
  const run_id="3b5dbd5b-b394-4762-9189-bb20077f5ff8"
  const run=await client.runs.get(thread_id, run_id);
  console.log("thread_id",thread_id)
  console.log("run",run)
}

invoke().catch(console.error);
