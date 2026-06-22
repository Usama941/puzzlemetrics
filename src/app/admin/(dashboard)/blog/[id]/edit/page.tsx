import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPage(props: Props) {
  const { id } = await props.params;
  const row = await prisma.blogPost.findUnique({ where: { id } });
  if (!row) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">Edit Blog Post</h1>
      <BlogForm initial={row} />
    </div>
  );
}
