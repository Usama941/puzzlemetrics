import ImageSlider from "@/components/portfolio/ImageSlider";
import { PortfolioDetailContent, PortfolioHeroSection } from "@/components/portfolio/PortfolioDetailClient";
import { getPortfolioBySlug, getPortfolioProjects } from "@/lib/db-cache";
import { resolvePortfolioImages } from "@/lib/portfolio-images";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await getPortfolioProjects();
  return items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — PuzzleMetrics`,
    description: project.description,
  };
}

export default async function PortfolioProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) notFound();

  const ordered = await getPortfolioProjects();
  const idx = ordered.findIndex((p) => p.id === project.id);
  const prevProject = idx > 0 ? ordered[idx - 1] : null;
  const nextProject = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

  const images = resolvePortfolioImages(project.images);

  return (
    <>
      <PortfolioHeroSection project={project} />
      <ImageSlider images={images} title={project.title} />
      <PortfolioDetailContent project={project} prevProject={prevProject} nextProject={nextProject} />
    </>
  );
}
