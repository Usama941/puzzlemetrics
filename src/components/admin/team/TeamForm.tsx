"use client";

import type { TeamMember } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhotoUpload from "@/components/admin/PhotoUpload";
import { ArrayInput } from "@/components/admin/ArrayInput";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnGhostClass, adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial?: TeamMember | null };

const empty: Omit<TeamMember, "id" | "createdAt" | "updatedAt"> = {
  name: "",
  role: "",
  bio: "",
  gradient: "linear-gradient(135deg, #6055D9, #4038B0)",
  initials: "",
  skills: [],
  linkedin: "#",
  photo: "",
  avatarBg: "6055D9",
  order: 0,
  published: true,
};

export function TeamForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const edit = !!initial;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() =>
    initial
      ? { ...initial }
      : ({ ...empty, id: "" } as TeamMember & { id?: string }),
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (edit && initial) {
        await adminJson(`/api/admin/team/${initial.id}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        toast({ type: "success", message: "Saved" });
      } else {
        await adminJson("/api/admin/team", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            role: form.role,
            bio: form.bio,
            gradient: form.gradient,
            initials: form.initials,
            skills: form.skills,
            linkedin: form.linkedin || "#",
            photo: form.photo || null,
            avatarBg: form.avatarBg,
            order: form.order,
            published: form.published,
          }),
        });
        toast({ type: "success", message: "Created" });
      }
      router.push("/admin/team");
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
          <label className={adminLabelClass}>Role</label>
          <input
            className={adminInputClass}
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>Bio</label>
          <textarea
            className={`${adminInputClass} min-h-[100px]`}
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className={adminLabelClass}>Initials</label>
          <input
            className={adminInputClass}
            value={form.initials}
            onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value }))}
            required
          />
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
          <label className={adminLabelClass}>Gradient</label>
          <input
            className={adminInputClass}
            value={form.gradient}
            onChange={(e) => setForm((f) => ({ ...f, gradient: e.target.value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            style={{
              display: "block",
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            Profile Photo
          </label>
          <PhotoUpload
            value={form.photo ?? ""}
            onChange={(url) => setForm((prev) => ({ ...prev, photo: url }))}
            memberName={form.name}
            gradient={form.gradient}
            initials={form.initials || "?"}
          />
        </div>
        <div>
          <label className={adminLabelClass}>Avatar BG (hex no #)</label>
          <input
            className={adminInputClass}
            value={form.avatarBg}
            onChange={(e) => setForm((f) => ({ ...f, avatarBg: e.target.value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>LinkedIn</label>
          <input
            className={adminInputClass}
            value={form.linkedin}
            onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
          />
        </div>
        <div className="sm:col-span-2">
          <ArrayInput
            label="Skills"
            value={form.skills}
            onChange={(skills) => setForm((f) => ({ ...f, skills }))}
          />
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
        <Link href="/admin/team" className={adminBtnGhostClass}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
