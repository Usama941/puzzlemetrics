"use client";

import type { PortfolioProject } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ColorPalettePicker } from "@/components/admin/ColorPalettePicker";
import ImageManager from "@/components/admin/portfolio/ImageManager";
import { parsePortfolioMetrics, PortfolioMetricsInput, type PortfolioMetricItem } from "@/components/admin/portfolio/PortfolioMetricsInput";
import { TagInput } from "@/components/admin/TagInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: PortfolioProject | null };

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const empty: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt"> = {
  slug: "",
  title: "",
  client: "",
  category: "",
  industry: "",
  location: "",
  year: "",
  tagline: "",
  description: "",
  challenge: "",
  solution: "",
  results: "",
  heroMetric: "",
  heroMetricLabel: "",
  metrics: [],
  tags: [],
  images: [],
  accentColor: "#6055D9",
  bgGradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)",
  featured: false,
  published: true,
  order: 0,
};

export function PortfolioForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<PortfolioProject>(() => (initial ? { ...initial } : ({ ...empty } as PortfolioProject)));
  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [metrics, setMetrics] = useState<PortfolioMetricItem[]>(() => parsePortfolioMetrics(initial?.metrics));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, images, metrics };
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/portfolio/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/portfolio", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/portfolio");
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
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Title</label>
          <input
            className={adminInputClass}
            value={form.title}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
                slug: generateSlug(e.target.value),
              }));
            }}
            required
          />
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
            URL: puzzlemetrics.com/portfolio/{form.slug || "…"}
          </p>
        </div>
        <div>
          <label className={adminLabelClass}>Client</label>
          <input className={adminInputClass} value={form.client} onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Category</label>
          <input className={adminInputClass} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Industry</label>
          <input className={adminInputClass} value={form.industry} onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Location</label>
          <input className={adminInputClass} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Year</label>
          <input className={adminInputClass} value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Tagline</label>
          <input className={adminInputClass} value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
        </div>
        {(["description", "challenge", "solution", "results"] as const).map((k) => (
          <div key={k} className="sm:col-span-2">
            <label className={adminLabelClass}>{k}</label>
            <textarea className={`${adminInputClass} min-h-[80px]`} value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} />
          </div>
        ))}
        <div>
          <label className={adminLabelClass}>Hero metric</label>
          <input className={adminInputClass} value={form.heroMetric} onChange={(e) => setForm((f) => ({ ...f, heroMetric: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Hero metric label</label>
          <input className={adminInputClass} value={form.heroMetricLabel} onChange={(e) => setForm((f) => ({ ...f, heroMetricLabel: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <PortfolioMetricsInput value={metrics} onChange={setMetrics} />
        </div>
        <div className="sm:col-span-2">
          <TagInput label="Tags" value={form.tags} onChange={(tags) => setForm((f) => ({ ...f, tags }))} />
        </div>
        <div className="sm:col-span-2">
          <ImageManager images={images} onChange={setImages} />
        </div>
        <div className="sm:col-span-2">
          <ColorPalettePicker
            label="Accent color"
            selectedColor={form.accentColor}
            onChange={(accentColor) => setForm((f) => ({ ...f, accentColor }))}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>BG gradient</label>
          <input className={adminInputClass} value={form.bgGradient} onChange={(e) => setForm((f) => ({ ...f, bgGradient: e.target.value }))} />
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
        <Link href="/admin/portfolio" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
