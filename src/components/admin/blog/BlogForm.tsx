"use client";

import type { BlogPost } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ColorPalettePicker } from "@/components/admin/ColorPalettePicker";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: BlogPost | null };

const empty: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> = {
  slug: "",
  title: "",
  excerpt: "",
  category: "",
  author: "",
  authorRole: "",
  authorInitials: "",
  authorColor: "#6055D9",
  date: "",
  readTime: "",
  featured: false,
  published: false,
  accentColor: "#6055D9",
  accentBg: "rgba(96,85,217,0.08)",
  tags: [],
  content: { intro: "", sections: [], conclusion: "" },
};

export function BlogForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<BlogPost>(() => (initial ? { ...initial } : ({ ...empty } as BlogPost)));
  const [contentStr, setContentStr] = useState(() => JSON.stringify(initial?.content ?? empty.content, null, 2));

  const payload = useMemo(() => {
    let content: BlogPost["content"] = empty.content;
    try {
      content = JSON.parse(contentStr || "{}") as BlogPost["content"];
    } catch {
      content = empty.content;
    }
    return { ...form, content };
  }, [form, contentStr]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/blog/${initial.id}`, { method: "PUT", body: JSON.stringify(payload) });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/blog", { method: "POST", body: JSON.stringify(payload) });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/blog");
      router.refresh();
    } catch {
      toast({ type: "error", message: "Save failed — check content JSON" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#13122A] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input className={adminInputClass} value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        </div>
        <div>
          <label className={adminLabelClass}>Category</label>
          <input className={adminInputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Title</label>
          <input className={adminInputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Excerpt</label>
          <textarea className={`${adminInputClass} min-h-[80px]`} value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Author</label>
          <input className={adminInputClass} value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Author role</label>
          <input className={adminInputClass} value={form.authorRole} onChange={(e) => setForm((f) => ({ ...f, authorRole: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Initials</label>
          <input className={adminInputClass} value={form.authorInitials} onChange={(e) => setForm((f) => ({ ...f, authorInitials: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <ColorPalettePicker
            label="Author color"
            selectedColor={form.authorColor}
            onChange={(authorColor) => setForm((f) => ({ ...f, authorColor }))}
            compact
          />
        </div>
        <div>
          <label className={adminLabelClass}>Date (display)</label>
          <input className={adminInputClass} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Read time</label>
          <input className={adminInputClass} value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <ColorPalettePicker
            label="Accent color"
            selectedColor={form.accentColor}
            onChange={(accentColor) => setForm((f) => ({ ...f, accentColor }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Accent BG</label>
          <input className={adminInputClass} value={form.accentBg} onChange={(e) => setForm((f) => ({ ...f, accentBg: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput label="Tags" value={form.tags} onChange={(tags) => setForm((f) => ({ ...f, tags }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Content (JSON)</label>
          <textarea className={`${adminInputClass} min-h-[220px] font-mono text-xs`} value={contentStr} onChange={(e) => setContentStr(e.target.value)} />
        </div>
        <div className="sm:col-span-2 flex flex-wrap gap-6">
          <ToggleSwitch label="Featured" checked={form.featured} onChange={(featured) => setForm((f) => ({ ...f, featured }))} />
          <ToggleSwitch label="Published" checked={form.published} onChange={(published) => setForm((f) => ({ ...f, published }))} />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save"}
        </button>
        <Link href="/admin/blog" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
