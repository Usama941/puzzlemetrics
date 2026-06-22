import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/testimonials/TestimonialForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditTestimonialPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.testimonial.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Testimonial</h1>
      <TestimonialForm initial={row} />
    </div>
  );
}
