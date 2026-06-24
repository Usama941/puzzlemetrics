"use client";

import type { Testimonial } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ColorPalettePicker } from "@/components/admin/ColorPalettePicker";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: Testimonial | null };

const empty: Omit<Testimonial, "id" | "createdAt" | "updatedAt"> = {
  author: "",
  role: "",
  location: "",
  avatar: "",
  avatarColor: "#6055D9",
  rating: 5,
  text: "",
  platform: "clutch",
  platformLabel: "Clutch",
  platformColor: "#E44D26",
  reviewUrl: "",
  date: "",
  verified: true,
  published: true,
  order: 0,
};

export function TestimonialForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Testimonial>(() => (initial ? { ...initial } : ({ ...empty } as Testimonial)));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/testimonials/${initial.id}`, { method: "PUT", body: JSON.stringify(form) });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/testimonials", { method: "POST", body: JSON.stringify(form) });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch {
      toast({ type: "error", message: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#13122A] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={adminLabelClass}>Author</label>
          <input className={adminInputClass} value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} required />
        </div>
        <div>
          <label className={adminLabelClass}>Role</label>
          <input className={adminInputClass} value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Location</label>
          <input className={adminInputClass} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
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
        <div>
          <label className={adminLabelClass}>Avatar (initials)</label>
          <input className={adminInputClass} value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <ColorPalettePicker
            label="Avatar color"
            selectedColor={form.avatarColor}
            onChange={(avatarColor) => setForm((f) => ({ ...f, avatarColor }))}
            compact
          />
        </div>
        <div>
          <label className={adminLabelClass}>Rating</label>
          <input
            type="number"
            min={1}
            max={5}
            className={adminInputClass}
            value={form.rating}
            onChange={(e) => setForm((f) => ({ ...f, rating: parseInt(e.target.value, 10) || 5 }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Date (display)</label>
          <input className={adminInputClass} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Platform id</label>
          <input className={adminInputClass} value={form.platform} onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Platform label</label>
          <input className={adminInputClass} value={form.platformLabel} onChange={(e) => setForm((f) => ({ ...f, platformLabel: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <ColorPalettePicker
            label="Platform color"
            selectedColor={form.platformColor}
            onChange={(platformColor) => setForm((f) => ({ ...f, platformColor }))}
            compact
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Review URL</label>
          <input className={adminInputClass} value={form.reviewUrl} onChange={(e) => setForm((f) => ({ ...f, reviewUrl: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Quote</label>
          <textarea className={`${adminInputClass} min-h-[120px]`} value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} required />
        </div>
        <div className="sm:col-span-2 flex flex-wrap gap-6">
          <ToggleSwitch label="Verified" checked={form.verified} onChange={(verified) => setForm((f) => ({ ...f, verified }))} />
          <ToggleSwitch label="Published" checked={form.published} onChange={(published) => setForm((f) => ({ ...f, published }))} />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save"}
        </button>
        <Link href="/admin/testimonials" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
