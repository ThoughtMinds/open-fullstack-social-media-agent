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
  const thread_state=await client.threads.getState(thread_id);
  console.log("thread_id",thread_id)
  console.log("state",JSON.stringify(thread_state.tasks[0].interrupts[0].value))
}

invoke().catch(console.error);
