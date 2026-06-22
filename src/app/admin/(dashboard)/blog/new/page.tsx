import { BlogForm } from "@/components/admin/blog/BlogForm";

export const dynamic = 'force-dynamic';
export default function NewBlogPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-white">New Blog Post</h1>
      <BlogForm />
    </div>
  );
}
