"use client";

import type { PricingPlan } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: PricingPlan | null };

const empty: Omit<PricingPlan, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  tagline: "",
  price: "",
  pricePrefix: null,
  delivery: "",
  features: [],
  bestFor: [],
  quote: "",
  highlighted: false,
  ctaText: "Book a Meeting →",
  icon: "rocket",
  order: 0,
  published: true,
};

export function PricingForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PricingPlan>(() => (initial ? { ...initial } : ({ ...empty } as PricingPlan)));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/pricing/${initial.id}`, { method: "PUT", body: JSON.stringify(form) });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/pricing", { method: "POST", body: JSON.stringify(form) });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/pricing");
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
          <label className={adminLabelClass}>Name</label>
          <input className={adminInputClass} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
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
          <label className={adminLabelClass}>Tagline</label>
          <input className={adminInputClass} value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Price</label>
          <input className={adminInputClass} value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Price prefix</label>
          <input
            className={adminInputClass}
            value={form.pricePrefix ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, pricePrefix: e.target.value || null }))}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Delivery</label>
          <input className={adminInputClass} value={form.delivery} onChange={(e) => setForm((f) => ({ ...f, delivery: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Quote</label>
          <textarea className={`${adminInputClass} min-h-[70px]`} value={form.quote} onChange={(e) => setForm((f) => ({ ...f, quote: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput label="Features" value={form.features} onChange={(features) => setForm((f) => ({ ...f, features }))} />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput label="Best for" value={form.bestFor} onChange={(bestFor) => setForm((f) => ({ ...f, bestFor }))} />
        </div>
        <div>
          <label className={adminLabelClass}>CTA text</label>
          <input className={adminInputClass} value={form.ctaText} onChange={(e) => setForm((f) => ({ ...f, ctaText: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Icon</label>
          <input className={adminInputClass} value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} />
        </div>
        <div className="sm:col-span-2 flex flex-wrap gap-6">
          <ToggleSwitch label="Highlighted" checked={form.highlighted} onChange={(highlighted) => setForm((f) => ({ ...f, highlighted }))} />
          <ToggleSwitch label="Published" checked={form.published} onChange={(published) => setForm((f) => ({ ...f, published }))} />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save"}
        </button>
        <Link href="/admin/pricing" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
