"use client";

import type { BlogPost } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminJson } from "@/lib/admin-fetch";
import { useAdminToast } from "@/components/admin/AdminToast";

type Props = { initial: BlogPost[] };

export function BlogTable({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [rows, setRows] = useState(initial);
  const [pending, setPending] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function patch(row: BlogPost, patch: Partial<BlogPost>) {
    try {
      setPending(row.id);
      const next = { ...row, ...patch };
      await adminJson(`/api/admin/blog/${row.id}`, { method: "PUT", body: JSON.stringify(next) });
      setRows((r) => r.map((x) => (x.id === row.id ? next : x)));
      toast({ type: "success", message: "Updated" });
    } catch {
      toast({ type: "error", message: "Could not update" });
    } finally {
      setPending(null);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await adminJson(`/api/admin/blog/${deleteId}`, { method: "DELETE" });
      setRows((r) => r.filter((x) => x.id !== deleteId));
      toast({ type: "success", message: "Deleted" });
    } catch {
      toast({ type: "error", message: "Could not delete" });
    } finally {
      setDeleteId(null);
      router.refresh();
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#13122A]">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white/85">
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/[0.06]">
                <td className="px-4 py-3 font-medium text-white">{row.title}</td>
                <td className="px-4 py-3 text-white/55">{row.slug}</td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    label=""
                    aria-label="Featured"
                    checked={row.featured}
                    disabled={pending === row.id}
                    onChange={() => patch(row, { featured: !row.featured })}
                  />
                </td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    label=""
                    aria-label="Published"
                    checked={row.published}
                    disabled={pending === row.id}
                    onChange={() => patch(row, { published: !row.published })}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blog/${row.id}/edit`} className="mr-2 inline-flex rounded-lg p-2 text-[#7B6EE8] hover:bg-white/5">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button type="button" className="inline-flex rounded-lg p-2 text-red-400 hover:bg-white/5" onClick={() => setDeleteId(row.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmModal open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </>
  );
}
