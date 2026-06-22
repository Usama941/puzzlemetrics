import type { Metadata } from "next";
import PortfolioClient from "@/components/portfolio/PortfolioClient";
import { getPortfolioProjects } from "@/lib/db-cache";

export const metadata: Metadata = {
  title: "Portfolio — PuzzleMetrics",
  description: "AI projects, SaaS platforms, and client solutions built by PuzzleMetrics. Real results from real work.",
};

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();

  return <PortfolioClient projects={projects} />;
}
