import CaseStudiesClient from "@/components/case-studies/CaseStudiesClient";
import { getCaseStudies } from "@/lib/db-cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — PuzzleMetrics",
  description:
    "Deep-dives into our most impactful AI projects — the challenge, our approach, and the measurable results.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return <CaseStudiesClient caseStudies={caseStudies} />;
}
