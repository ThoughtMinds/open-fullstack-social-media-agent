import { NextResponse } from "next/server";

const postData = [
  {
    id: 1,
    type: "Scheduled",
    title: "Title 1",
    description: "This is a scheduled post that will go live soon.",
    image: "https://unsplash.it/200/200?id=4",
    date: "12/25/2024 10:00 AM PST",
  },
  {
    id: 4,
    type: "Action Required",
    title: "Title",
    content: "Select the most appropriate image for your post.",
    images: [
      "https://unsplash.it/200/200?id=1",
      "https://unsplash.it/200/200?id=2",
      "https://unsplash.it/200/200?id=3",
      "https://unsplash.it/200/200?id=5",
    ],
  },
  {
    id: 2,
    type: "Error",
    title: "Post Failed to Publish",
    url: "https://example.com/error-post",
    image: "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png",
  },
  {
    id: 3,
    type: "Scheduled",
    title: "Title 1",
    description: "This is a scheduled post that will go live soon.",
    image: "https://unsplash.it/200/200?id=4",
    date: "12/25/2024 10:00 AM PST",
  },
  {
    id: 6,
    type: "Action Required",
    title: "Title",
    content: "Select the most appropriate image for your post.",
    images: [
      "https://unsplash.it/200/200?id=1",
      "https://unsplash.it/200/200?id=2",
      "https://unsplash.it/200/200?id=3",
      "https://unsplash.it/200/200?id=5",
    ],
  },
  {
    id: 5,
    type: "Error",
    title: "Post Failed to Publish",
    url: "https://example.com/error-post",
    image: "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png",
  },
  {
    id: 7,
    type: "Error",
    title: "Post Failed to Publish",
    url: "https://example.com/error-post",
    image: "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png",
  },
  {
    id: 8,
    type: "Error",
    title: "Post Failed to Publish",
    url: "https://example.com/error-post",
    image: "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png",
  },
  {
    id: 9,
    type: "Error",
    title: "Post Failed to Publish",
    url: "https://example.com/error-post",
    image: "https://www.beautylabinternational.com/wp-content/uploads/2020/03/Hero-Banner-Placeholder-Light-1024x480-1.png",
  },
];

export async function GET() {
  return NextResponse.json(postData);
}
