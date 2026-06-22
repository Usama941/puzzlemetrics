import { getTestimonials } from "@/lib/db-cache";
import { TestimonialsSectionClient } from "./TestimonialsSectionClient";

export async function TestimonialsSection() {
  const reviews = await getTestimonials();

  return <TestimonialsSectionClient reviews={reviews} />;
}

export default TestimonialsSection;
