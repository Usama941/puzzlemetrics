import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

/** Public content: 60s ISR-style cache; bust with revalidateTag from admin APIs */

export async function getTeamMembers() {
  return unstable_cache(
    async () =>
      prisma.teamMember.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    ["team-members"],
    { revalidate: 60, tags: ["team"] },
  )();
}

export async function getTestimonials() {
  return unstable_cache(
    async () =>
      prisma.testimonial.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    ["testimonials"],
    { revalidate: 60, tags: ["testimonials"] },
  )();
}

export async function getPricingPlans() {
  return unstable_cache(
    async () =>
      prisma.pricingPlan.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    ["pricing-plans"],
    { revalidate: 60, tags: ["pricing"] },
  )();
}

export async function getServicesPublished() {
  return unstable_cache(
    async () =>
      prisma.service.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    ["services-published"],
    { revalidate: 60, tags: ["services"] },
  )();
}

export async function getServiceBySlug(slug: string) {
  return unstable_cache(
    async () => prisma.service.findUnique({ where: { slug } }),
    ["service-by-slug", slug],
    { revalidate: 60, tags: ["services"] },
  )();
}

export async function getPortfolioProjects() {
  return unstable_cache(
    async () =>
      prisma.portfolioProject.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    ["portfolio-projects"],
    { revalidate: 60, tags: ["portfolio"] },
  )();
}

export async function getPortfolioBySlug(slug: string) {
  return unstable_cache(
    async () => prisma.portfolioProject.findUnique({ where: { slug } }),
    ["portfolio-by-slug", slug],
    { revalidate: 60, tags: ["portfolio"] },
  )();
}

export async function getCaseStudies() {
  return unstable_cache(
    async () =>
      prisma.caseStudy.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    ["case-studies"],
    { revalidate: 60, tags: ["case-studies"] },
  )();
}

export async function getCaseStudyBySlug(slug: string) {
  return unstable_cache(
    async () => prisma.caseStudy.findUnique({ where: { slug } }),
    ["case-study-by-slug", slug],
    { revalidate: 60, tags: ["case-studies"] },
  )();
}

export async function getBlogPosts() {
  return unstable_cache(
    async () =>
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      }),
    ["blog-posts"],
    { revalidate: 60, tags: ["blog"] },
  )();
}

export async function getBlogPostBySlug(slug: string) {
  return unstable_cache(
    async () => prisma.blogPost.findUnique({ where: { slug } }),
    ["blog-post-by-slug", slug],
    { revalidate: 60, tags: ["blog"] },
  )();
}

export async function getBlogRelatedPosts(currentSlug: string) {
  return unstable_cache(
    async () =>
      prisma.blogPost.findMany({
        where: { published: true, slug: { not: currentSlug } },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ["blog-related", currentSlug],
    { revalidate: 60, tags: ["blog"] },
  )();
}

/** Single row for hero + homepage payload merge */
export async function getHeroContentRow() {
  return unstable_cache(
    async () => prisma.heroContent.findFirst(),
    ["hero-content-row"],
    { revalidate: 60, tags: ["hero"] },
  )();
}

export async function getStatCards() {
  return unstable_cache(
    async () => prisma.statCard.findMany({ orderBy: { order: "asc" } }),
    ["stat-cards"],
    { revalidate: 60, tags: ["stats"] },
  )();
}

export async function getSocialLinks() {
  return unstable_cache(
    async () =>
      prisma.socialLink.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
        select: { id: true, platform: true, url: true, order: true },
      }),
    ["social-links"],
    { revalidate: 60, tags: ["social-links"] },
  )();
}

export async function getCompanyLogos(type: "trusted" | "partner") {
  return unstable_cache(
    async () =>
      prisma.companyLogo.findMany({
        where: { type, active: true },
        orderBy: { order: "asc" },
      }),
    [`company-logos-${type}`],
    { revalidate: 60, tags: ["logos"] },
  )();
}
