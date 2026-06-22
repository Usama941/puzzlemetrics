"use client";

import type { Service } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: Service | null };

const empty: Omit<Service, "id" | "createdAt" | "updatedAt"> = {
  number: "01",
  slug: "",
  title: "",
  shortTitle: "",
  tagline: "",
  description: "",
  longDescription: null,
  outcomes: [],
  tags: [],
  icon: "agent",
  accentColor: "#6055D9",
  accentBg: "rgba(96,85,217,0.08)",
  accentBorder: "rgba(96,85,217,0.2)",
  useCases: null,
  process: null,
  faqs: null,
  published: true,
  order: 0,
};

export function ServiceForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Service>(() => (initial ? { ...initial } : ({ ...empty } as Service)));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/services/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/services", {
          method: "POST",
          body: JSON.stringify({
            number: form.number,
            slug: form.slug,
            title: form.title,
            shortTitle: form.shortTitle,
            tagline: form.tagline,
            description: form.description,
            longDescription: form.longDescription,
            outcomes: form.outcomes,
            tags: form.tags,
            icon: form.icon,
            accentColor: form.accentColor,
            accentBg: form.accentBg,
            accentBorder: form.accentBorder,
            useCases: form.useCases,
            process: form.process,
            faqs: form.faqs,
            published: form.published,
            order: form.order,
          }),
        });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/services");
      router.refresh();
    } catch {
      toast({ type: "error", message: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-4xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#13122A] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={adminLabelClass}>Number</label>
          <input className={adminInputClass} value={form.number} onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Slug</label>
          <input className={adminInputClass} value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Title</label>
          <input className={adminInputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        <div>
          <label className={adminLabelClass}>Short title</label>
          <input className={adminInputClass} value={form.shortTitle} onChange={(e) => setForm((f) => ({ ...f, shortTitle: e.target.value }))} required />
        </div>
        <div>
          <label className={adminLabelClass}>Icon</label>
          <input className={adminInputClass} value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Tagline</label>
          <input className={adminInputClass} value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} required />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Description</label>
          <textarea className={`${adminInputClass} min-h-[90px]`} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} required />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Long description (optional)</label>
          <textarea
            className={`${adminInputClass} min-h-[80px]`}
            value={form.longDescription ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value || null }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Accent color</label>
          <input className={adminInputClass} value={form.accentColor} onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Order</label>
          <input
            type="number"
            className={adminInputClass}
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value, 10) || 0 }))}
          />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput label="Outcomes" value={form.outcomes} onChange={(outcomes) => setForm((f) => ({ ...f, outcomes }))} />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput label="Tags" value={form.tags} onChange={(tags) => setForm((f) => ({ ...f, tags }))} />
        </div>
        <div className="sm:col-span-2">
          <ToggleSwitch label="Published" checked={form.published} onChange={(published) => setForm((f) => ({ ...f, published }))} />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save"}
        </button>
        <Link href="/admin/services" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
