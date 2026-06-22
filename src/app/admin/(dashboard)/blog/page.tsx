import Link from "next/link";
import { BlogTable } from "@/components/admin/blog/BlogTable";
import { adminBtnPrimaryClass } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export default async function AdminBlogPage() {
  const rows = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="mt-1 text-sm text-white/45">Articles and long reads.</p>
        </div>
        <Link href="/admin/blog/new" className={adminBtnPrimaryClass}>
          Add New
        </Link>
      </div>
      <BlogTable initial={rows} />
    </div>
  );
}
