import BlogClient from "@/components/blog/BlogClient";
import { getBlogPosts } from "@/lib/db-cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — PuzzleMetrics",
  description: "AI insights, technical guides, and real case study breakdowns from the engineers actually building AI.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogClient posts={posts} />;
}
