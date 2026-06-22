"use client";

import type { CaseStudy } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: CaseStudy | null };

const empty: Omit<CaseStudy, "id" | "createdAt" | "updatedAt"> = {
  slug: "",
  title: "",
  client: "",
  industry: "",
  location: "",
  year: "",
  service: "",
  duration: "",
  tagline: "",
  summary: "",
  problem: "",
  approach: "",
  execution: "",
  outcome: "",
  heroMetric: "",
  heroMetricLabel: "",
  metrics: [],
  testimonial: null,
  tags: [],
  accentColor: "#6055D9",
  accentBg: "rgba(96,85,217,0.08)",
  bgGradient: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)",
  featured: false,
  published: true,
  order: 0,
};

export function CaseStudyForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CaseStudy>(() => (initial ? { ...initial } : ({ ...empty } as CaseStudy)));
  const [metricsStr, setMetricsStr] = useState(() => JSON.stringify(initial?.metrics ?? [], null, 2));
  const [testimonialStr, setTestimonialStr] = useState(() => JSON.stringify(initial?.testimonial ?? {}, null, 2));

  const payload = useMemo(() => {
    let metrics: CaseStudy["metrics"] = [];
    let testimonial: CaseStudy["testimonial"] = null;
    try {
      metrics = JSON.parse(metricsStr || "[]") as CaseStudy["metrics"];
    } catch {
      metrics = [];
    }
    try {
      const t = JSON.parse(testimonialStr || "{}");
      testimonial = Object.keys(t).length ? t : null;
    } catch {
      testimonial = null;
    }
    return { ...form, metrics, testimonial };
  }, [form, metricsStr, testimonialStr]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/case-studies/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/case-studies", { method: "POST", body: JSON.stringify(payload) });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/case-studies");
      router.refresh();
    } catch {
      toast({ type: "error", message: "Save failed — check JSON fields" });
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
          <input className={adminInputClass} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        {(
          [
            "client",
            "industry",
            "location",
            "year",
            "service",
            "duration",
          ] as const
        ).map((k) => (
          <div key={k}>
            <label className={adminLabelClass}>{k}</label>
            <input className={adminInputClass} value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Tagline</label>
          <input className={adminInputClass} value={form.tagline} onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))} />
        </div>
        {(["summary", "problem", "approach", "execution", "outcome"] as const).map((k) => (
          <div key={k} className="sm:col-span-2">
            <label className={adminLabelClass}>{k}</label>
            <textarea className={`${adminInputClass} min-h-[90px]`} value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))} />
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
          <label className={adminLabelClass}>Metrics (JSON)</label>
          <textarea className={`${adminInputClass} min-h-[120px] font-mono text-xs`} value={metricsStr} onChange={(e) => setMetricsStr(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Testimonial (JSON object)</label>
          <textarea className={`${adminInputClass} min-h-[100px] font-mono text-xs`} value={testimonialStr} onChange={(e) => setTestimonialStr(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput label="Tags" value={form.tags} onChange={(tags) => setForm((f) => ({ ...f, tags }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Accent color</label>
          <input className={adminInputClass} value={form.accentColor} onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Accent BG</label>
          <input className={adminInputClass} value={form.accentBg} onChange={(e) => setForm((f) => ({ ...f, accentBg: e.target.value }))} />
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
        <Link href="/admin/case-studies" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
