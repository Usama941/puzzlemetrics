"use client";

import type { HeroContent } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial: HeroContent };

export function HeroForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initial);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminJson("/api/admin/hero", {
        method: "PUT",
        body: JSON.stringify({
          headline1: form.headline1,
          headline2: form.headline2,
          subtext: form.subtext,
          ctaPrimary: form.ctaPrimary,
          ctaSecondary: form.ctaSecondary,
          badge: form.badge,
        }),
      });
      toast({ type: "success", message: "Hero saved" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#13122A] p-6">
      <div className="space-y-4">
        <div>
          <label className={adminLabelClass}>Headline line 1</label>
          <input className={adminInputClass} value={form.headline1} onChange={(e) => setForm((f) => ({ ...f, headline1: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Headline line 2</label>
          <input className={adminInputClass} value={form.headline2} onChange={(e) => setForm((f) => ({ ...f, headline2: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Subtext</label>
          <textarea className={`${adminInputClass} min-h-[100px]`} value={form.subtext} onChange={(e) => setForm((f) => ({ ...f, subtext: e.target.value }))} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={adminLabelClass}>Primary CTA</label>
            <input className={adminInputClass} value={form.ctaPrimary} onChange={(e) => setForm((f) => ({ ...f, ctaPrimary: e.target.value }))} />
          </div>
          <div>
            <label className={adminLabelClass}>Secondary CTA</label>
            <input className={adminInputClass} value={form.ctaSecondary} onChange={(e) => setForm((f) => ({ ...f, ctaSecondary: e.target.value }))} />
          </div>
        </div>
        <div>
          <label className={adminLabelClass}>Badge</label>
          <input className={adminInputClass} value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save"}
        </button>
        <Link href="/admin" className={adminBtnGhostClass}>
          Back to dashboard
        </Link>
      </div>
    </form>
  );
}
