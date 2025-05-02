import { LangGraphRunnableConfig } from "@langchain/langgraph";
import {WrapperStateAnnotation} from "../index.js"
export async function generatePost(
  state: typeof WrapperStateAnnotation.State,
  config: LangGraphRunnableConfig,
): Promise<Partial<typeof WrapperStateAnnotation.State>> {
  console.log(state)

  return {};
}