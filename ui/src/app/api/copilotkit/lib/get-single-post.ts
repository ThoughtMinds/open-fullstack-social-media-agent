import { client } from "./client";

// Add this to your lib/types.ts file
export interface ScheduledPost {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  scheduledDate: string; // Format: YYYY-MM-DD
  scheduledTime: string; // Format: HH:MM
  status?: "draft" | "scheduled" | "published" | "failed";
  platformIds?: string[]; // IDs of platforms where this will be posted (e.g., "twitter", "facebook")
  createdAt?: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update
  engagementStats?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

// Define the PendingRun type
export interface PendingRun {
  thread_id: string;
  run_id: string;
  post: string;
  image?: {
    imageUrl: string;
    mimeType: string;
  };
  scheduleDate: string;
}

export const getSinglePost = {
  name: "GetSinglePost",
  description: "Retrieves details of a single post by its ID",
  parameters: [
    {
      name: "post_id",
      type: "string",
      description: "Unique identifier of the post to retrieve",
      required: true,
    },
  ],
  handler: async ({ post_id }: { post_id: string }) => {
    try {
      // Sample posts database (in a real app, this would be a database query)
      const posts: Record<string, ScheduledPost> = {
        "post-1": {
          id: "post-1",
          name: "New Product Launch",
          imageUrl: "https://example.com/images/product-launch.jpg",
          description:
            "Announcing our revolutionary new product that will change the industry forever! Join us for an exclusive first look.",
          scheduledDate: "2025-05-15",
          scheduledTime: "09:00",
          status: "scheduled",
          platformIds: ["twitter", "linkedin"],
          createdAt: "2025-04-10T12:34:56Z",
          updatedAt: "2025-04-10T15:22:33Z",
          engagementStats: {
            likes: 0,
            shares: 0,
            comments: 0,
          },
        },
        "post-2": {
          id: "post-2",
          name: "Summer Sale Promotion",
          imageUrl: "https://example.com/images/summer-sale.jpg",
          description:
            "Beat the heat with our biggest summer sale yet! Get up to 50% off on all summer essentials.",
          scheduledDate: "2025-05-20",
          scheduledTime: "10:30",
          status: "scheduled",
          platformIds: ["facebook", "instagram"],
          createdAt: "2025-04-12T09:15:22Z",
          updatedAt: "2025-04-12T09:15:22Z",
          engagementStats: {
            likes: 0,
            shares: 0,
            comments: 0,
          },
        },
        "post-3": {
          id: "post-3",
          name: "Customer Spotlight: Success Story",
          imageUrl: "https://example.com/images/customer-story.jpg",
          description:
            "Read how our platform helped Company X increase their productivity by 200% in just three months.",
          scheduledDate: "2025-05-25",
          scheduledTime: "14:00",
          status: "draft",
          platformIds: ["linkedin"],
          createdAt: "2025-04-15T16:45:12Z",
          updatedAt: "2025-04-16T10:22:45Z",
          engagementStats: {
            likes: 0,
            shares: 0,
            comments: 0,
          },
        },
      };

      // Check if the post exists
      if (!posts[post_id]) {
        return {
          status: "error",
          message: `Post with ID ${post_id} not found`,
        };
      }

      // Transform the post to match PendingRun type
      const post = posts[post_id];
      const pendingRunPost: PendingRun = {
        thread_id: `thread_${post_id}`, // Generate a thread_id (modify as per your logic)
        run_id: `run_${post_id}`, // Generate a run_id (modify as per your logic)
        post: post.description, // Map description to post
        image: post.imageUrl
          ? {
              imageUrl: post.imageUrl,
              mimeType: "image/jpeg", // Assume JPEG, adjust based on actual image type
            }
          : undefined,
        scheduleDate: `${post.scheduledDate}T${post.scheduledTime}:00Z`, // Combine date and time into ISO format
      };

      console.log(`Retrieved post with ID: ${post_id}`);

      return {
        status: "success",
        data: pendingRunPost,
      };
    } catch (error) {
      console.error(`Error fetching post ${post_id}:`, error);
      return {
        status: "error",
        message: "Failed to retrieve post",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
};






