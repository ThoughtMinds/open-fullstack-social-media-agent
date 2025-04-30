// Import dotenv and configure environment variables
import dotenv from 'dotenv';
dotenv.config();

// Import LangGraph Client
import { Client } from '@langchain/langgraph-sdk';
import fs from 'fs';

async function extractPostContent() {
  try {
    const client = new Client({
      apiUrl: process.env.LANGGRAPH_API_URL || 'http://localhost:54367',
    });

    // Search for threads with the specified graph_id
    const threads = await client.threads.search({
      metadata: {
        graph_id: 'generate_post_copilotkit_wrapper',
      },
    });

    console.log(`Found ${threads.length} threads`);
    
    // Array to store extracted data from all threads
    const extractedData = [];
    
    // Process each thread to extract specific values
    for (const thread of threads) {
      try {
        const threadState = await client.threads.getState(thread.thread_id);
        
        // Extract only the values we're interested in
        if (threadState.values) {
          const { post, imageOptions, scheduleDate } = threadState.values;
          
          if (post) {
            const threadData = {
              threadId: thread.thread_id,
              post,
              imageOptions: imageOptions || [],
              scheduleDate
            };
            
            extractedData.push(threadData);
            console.log(`Extracted data from thread ${thread.thread_id}`);
          }
        }
      } catch (threadError) {
        console.error(`Error processing thread ${thread.thread_id}:`, threadError);
      }
    }
    
    // Save the extracted data to a JSON file
    if (extractedData.length > 0) {
      fs.writeFileSync('extracted_posts.json', JSON.stringify(extractedData, null, 2));
      console.log(`Saved ${extractedData.length} post(s) to extracted_posts.json`);
    } else {
      console.log('No post data found in any threads');
    }
    
    return extractedData;
  } catch (error) {
    console.error('Error extracting post content:', error);
    return [];
  }
}

// Run the function
extractPostContent();










// // Import dotenv and configure environment variables
// import dotenv from 'dotenv';
// dotenv.config();

// // Import LangGraph Client
// import { Client } from '@langchain/langgraph-sdk';

// async function getThreadValues() {
//   try {
//     const client = new Client({
//       apiUrl: process.env.LANGGRAPH_API_URL || 'http://localhost:54367',
//     });

//     // Search for threads with the specified graph_id
//     const threads = await client.threads.search({
//       metadata: {
//         graph_id: 'generate_post_copilotkit_wrapper',
//       },
//     });

//     console.log(`Found ${threads.length} threads`);
    
//     // Process each thread to extract values
//     for (const thread of threads) {
//       console.log("thread", thread);
      
//       try {
//         const threadState = await client.threads.getState(thread.thread_id);
//         console.log("\n\nthread state", threadState);
        
//         // Check if tasks and interrupts exist before accessing
//         if (threadState.tasks && 
//             threadState.tasks.length > 0 && 
//             threadState.tasks[0].interrupts && 
//             threadState.tasks[0].interrupts.length > 0) {
//           console.log("\n\nstate", JSON.stringify(threadState.tasks[0].interrupts[0].value));
//         } else {
//           console.log("No interrupts found in this thread state");
//         }
//       } catch (threadError) {
//         console.error(`Error processing thread ${thread.thread_id}:`, threadError);
//       }
//     }
//   } catch (error) {
//     console.error('Error getting thread values:', error);
//   }
// }

// // Run the function
// getThreadValues();