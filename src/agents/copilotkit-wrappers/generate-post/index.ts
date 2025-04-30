import { StateGraph, Annotation, LangGraphRunnableConfig, START, END} from "@langchain/langgraph";
import {generatePostGraph} from "../../generate-post/generate-post-graph.js"
import { CopilotKitStateAnnotation } from "@copilotkit/sdk-js/langgraph";


const WrapperStateAnnotation = Annotation.Root({
    // foo: Annotation<string>,
    // ...CopilotKitStateAnnotation.spec,
    links: Annotation<string[]>
  });
  const WrapperStateInputAnnotation = Annotation.Root({
    // ...CopilotKitStateAnnotation.spec,
    links: Annotation<string[]>
  });

  const WrapperConfigurableAnnotation=Annotation.Root({
    ...CopilotKitStateAnnotation.spec,
  })


// export async function generatePostWrapper(
//   state: typeof WrapperStateAnnotation.State,
//   config: LangGraphRunnableConfig,
// ): Promise<Partial<typeof WrapperStateAnnotation.State>> {
  
// }


const generatePostWrapperBuilder = new StateGraph({stateSchema:WrapperStateAnnotation,input:WrapperStateInputAnnotation})
  .addNode("generate_post_graph",generatePostGraph)
  .addEdge(START, "generate_post_graph")
  .addEdge("generate_post_graph", END)

export const generatePostWrapperGraph = generatePostWrapperBuilder.compile();

