"use client";

import type { Product } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GradientThemePicker from "@/components/admin/GradientThemePicker";
import { ProductMockupInput } from "@/components/admin/products/ProductMockupInput";
import { ProductStatsInput } from "@/components/admin/products/ProductStatsInput";
import { TagInput } from "@/components/admin/TagInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";
import { emptyProductMockup, parseProductMockup, parseProductStats } from "@/types/product";

type Props = { initial?: Product | null };

const empty: Omit<Product, "id" | "createdAt" | "updatedAt"> = {
  badge: "LIVE",
  label: "",
  name: "",
  tagline: "",
  description: "",
  features: [],
  stats: [],
  primaryCtaText: "",
  primaryCtaUrl: "",
  secondaryCtaText: "",
  secondaryCtaUrl: "",
  theme: "violet",
  mockup: emptyProductMockup(),
  mockupSide: "right",
  published: true,
  order: 0,
};

function buildPayload(
  form: Product,
  features: string[],
  stats: ReturnType<typeof parseProductStats>,
  mockup: ReturnType<typeof parseProductMockup>,
) {
  return {
    badge: form.badge?.trim() || null,
    label: form.label?.trim() || null,
    name: form.name.trim(),
    tagline: form.tagline?.trim() || null,
    description: form.description?.trim() || null,
    features,
    stats,
    primaryCtaText: form.primaryCtaText?.trim() || null,
    primaryCtaUrl: form.primaryCtaUrl?.trim() || null,
    secondaryCtaText: form.secondaryCtaText?.trim() || null,
    secondaryCtaUrl: form.secondaryCtaUrl?.trim() || null,
    theme: form.theme?.trim() || null,
    mockup,
    mockupSide: form.mockupSide?.trim() || "right",
    order: form.order,
    published: form.published,
  };
}

export function ProductForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Product>(() =>
    initial ? { ...initial } : ({ ...empty } as Product),
  );
  const [features, setFeatures] = useState<string[]>(initial?.features ?? []);
  const [stats, setStats] = useState(() => parseProductStats(initial?.stats));
  const [mockup, setMockup] = useState(() =>
    initial ? parseProductMockup(initial.mockup) : emptyProductMockup(),
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = buildPayload(form, features, stats, mockup);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/products/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/products");
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
          <label className={adminLabelClass}>Order</label>
          <input
            type="number"
            className={adminInputClass}
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value, 10) || 0 }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Mockup side</label>
          <select
            className={adminInputClass}
            value={form.mockupSide ?? "right"}
            onChange={(e) => setForm((f) => ({ ...f, mockupSide: e.target.value }))}
          >
            <option value="right">Right (copy left)</option>
            <option value="left">Left (copy right)</option>
          </select>
        </div>
        <div>
          <label className={adminLabelClass}>Badge / status</label>
          <input
            className={adminInputClass}
            value={form.badge ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
            placeholder="LIVE"
          />
        </div>
        <div>
          <label className={adminLabelClass}>Label</label>
          <input
            className={adminInputClass}
            value={form.label ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            placeholder="PRODUCT 01"
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Name</label>
          <input
            className={adminInputClass}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Tagline</label>
          <input
            className={adminInputClass}
            value={form.tagline ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Description</label>
          <textarea
            className={`${adminInputClass} min-h-[100px]`}
            value={form.description ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <TagInput label="Features" value={features} onChange={setFeatures} placeholder="Feature bullet, press Enter" />
        </div>
        <div className="sm:col-span-2">
          <ProductStatsInput label="Product stats" value={stats} onChange={setStats} />
        </div>
        <div className="sm:col-span-2">
          <GradientThemePicker
            value={form.theme ?? "violet"}
            onChange={(theme) => setForm((f) => ({ ...f, theme }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Primary CTA text</label>
          <input
            className={adminInputClass}
            value={form.primaryCtaText ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, primaryCtaText: e.target.value }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Primary CTA URL</label>
          <input
            className={adminInputClass}
            value={form.primaryCtaUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, primaryCtaUrl: e.target.value }))}
            placeholder="Leave empty for booking button"
          />
        </div>
        <div>
          <label className={adminLabelClass}>Secondary CTA text</label>
          <input
            className={adminInputClass}
            value={form.secondaryCtaText ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, secondaryCtaText: e.target.value }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Secondary CTA URL</label>
          <input
            className={adminInputClass}
            value={form.secondaryCtaUrl ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, secondaryCtaUrl: e.target.value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <ProductMockupInput value={mockup} onChange={setMockup} />
        </div>
        <div className="sm:col-span-2">
          <ToggleSwitch
            label="Published"
            checked={form.published}
            onChange={(published) => setForm((f) => ({ ...f, published }))}
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save"}
        </button>
        <Link href="/admin/products" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
