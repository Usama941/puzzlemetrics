import Link from "next/link";
import { TestimonialCard } from "@/components/testimonials/TestimonialCard";
import { getTestimonials } from "@/lib/db-cache";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials — PuzzleMetrics",
  description: "Real results from real businesses using PuzzleMetrics AI.",
};

export default async function TestimonialsPage() {
  const reviews = await getTestimonials();

  return (
    <div className="bg-[var(--bg-primary)]">
      <section className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 pb-14 pt-24 text-center md:pt-28">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-muted)] no-underline transition-colors duration-200 hover:text-[#6055D9]"
          >
            ← Back to homepage
          </Link>
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
            What Our Clients Say
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
            Real results from real businesses
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </div>
  );
}
