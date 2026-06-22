import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";

export const dynamic = 'force-dynamic';
export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
