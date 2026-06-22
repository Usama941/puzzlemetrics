import Link from "next/link";
import { TestimonialTable } from "@/components/admin/testimonials/TestimonialTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminTestimonialsPage() {
  const rows = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-white/45">Social proof cards.</p>
        </div>
        <Link href="/admin/testimonials/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <TestimonialTable initial={rows} />
    </div>
  );
}
