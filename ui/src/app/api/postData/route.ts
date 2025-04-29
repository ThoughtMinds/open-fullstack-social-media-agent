import { NextResponse } from "next/server";

// The response structure matches the actual API response with data nested in a "data" array
const postData = {
  "status": "success",
  "data": [
    {
      "thread_id": "thread_123",
      "run_id": "run_456",
      "title": "Title 2",
      "post": "Announcing our revolutionary new product that will change the industry forever! Join us for an exclusive first look.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=1",
        "mimeType": "image/jpeg"
      },
      "images": [
        "https://unsplash.it/200/200?id=1",
        "https://unsplash.it/200/200?id=9",
        "https://unsplash.it/200/200?id=10",
        "https://unsplash.it/200/200?id=11"
      ],
      "status": "Action Required",
      "scheduleDate": "2025-05-15T09:00:00Z"
    },
    {
      "thread_id": "thread_789",
      "run_id": "run_012",
      "title": "Title 1",
      "post": "Beat the heat with our biggest summer sale yet! Get up to 50% off on all summer essentials.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=2",
        "mimeType": "image/jpeg"
      },
      "status": "Scheduled",
      "scheduleDate": "2025-05-20T10:30:00Z"
    },
    {
      "thread_id": "thread_321",
      "run_id": "run_654",
      "title": "Title 3",
      "post": "Get ready for the future of fitness – our smart gym gear is here to transform your workouts.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=3",
        "mimeType": "image/jpeg"
      },
      "status": "Completed",
      "scheduleDate": "2025-05-22T08:00:00Z"
    },
    {
      "thread_id": "thread_987",
      "run_id": "run_210",
      "title": "Title 4",
      "post": "Experience gourmet like never before – our chef-curated meal kits are launching soon.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=4",
        "mimeType": "image/jpeg"
      },
      "images": [
        "https://unsplash.it/200/200?id=4",
        "https://unsplash.it/200/200?id=12",
        "https://unsplash.it/200/200?id=13",
        "https://unsplash.it/200/200?id=14"
      ],
      "status": "Action Required",
      "scheduleDate": "2025-05-18T17:00:00Z"
    },
    {
      "thread_id": "thread_456",
      "run_id": "run_789",
      "title": "Title 5",
      "post": "Sneak peek: The latest in wearable tech is about to hit the market. Don't miss the reveal.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=5",
        "mimeType": "image/jpeg"
      },
      "status": "Completed",
      "scheduleDate": "2025-05-19T14:00:00Z"
    },
    {
      "thread_id": "thread_654",
      "run_id": "run_321",
      "title": "Title 6",
      "post": "Join our livestream Q&A to learn everything about our upcoming eco-friendly product line.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=6",
        "mimeType": "image/jpeg"
      },
      "status": "Scheduled",
      "scheduleDate": "2025-05-21T12:00:00Z"
    },
    {
      "thread_id": "thread_111",
      "run_id": "run_222",
      "title": "Title 7",
      "post": "Limited edition alert! Our artist collaboration tees drop this weekend only.",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=17",
        "mimeType": "image/jpeg"
      },
      "images": [
        "https://unsplash.it/200/200?id=17",
        "https://unsplash.it/200/200?id=16",
        "https://unsplash.it/200/200?id=19",
        "https://unsplash.it/200/200?id=14"
      ],
      "status": "Action Required",
      "scheduleDate": "2025-05-17T16:30:00Z"
    },
    {
      "thread_id": "thread_333",
      "run_id": "run_444",
      "title": "Title 8",
      "post": "Celebrate with us: It's our anniversary and we've got surprises in store!",
      "image": {
        "imageUrl": "https://unsplash.it/200/200?id=8",
        "mimeType": "image/jpeg"
      },
      "status": "Scheduled",
      "scheduleDate": "2025-05-25T11:45:00Z"
    }
  ]
};

export async function GET() {
  return NextResponse.json(postData);
}
