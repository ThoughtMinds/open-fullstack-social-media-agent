import { Client } from "@langchain/langgraph-sdk";

export const client = new Client({
  apiUrl: process.env.LANGGRAPH_API_URL || "http://localhost:54367",
});

