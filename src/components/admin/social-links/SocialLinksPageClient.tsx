"use client";

import type { SocialLink } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnPrimaryClass, adminInputClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { SocialPlatformIcon, socialPlatformLabel } from "@/components/shared/SocialPlatformIcon";
import { adminJson } from "@/lib/admin-fetch";

const PLATFORMS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "youtube", label: "YouTube" },
  { value: "github", label: "GitHub" },
  { value: "tiktok", label: "TikTok" },
] as const;

type Platform = (typeof PLATFORMS)[number]["value"];

type Props = { initial: SocialLink[] };

export function SocialLinksPageClient({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [rows, setRows] = useState(initial);
  const [pending, setPending] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<{ platform: Platform; url: string; active: boolean }>({
    platform: "linkedin",
    url: "",
    active: true,
  });

  async function saveRow(row: SocialLink) {
    try {
      setPending(row.id);
      await adminJson(`/api/admin/social-links/${row.id}`, { method: "PUT", body: JSON.stringify(row) });
      toast({ type: "success", message: "Saved" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not save" });
    } finally {
      setPending(null);
    }
  }

  async function addRow() {
    if (!draft.url.trim()) {
      toast({ type: "error", message: "URL is required" });
      return;
    }
    try {
      setPending("new");
      const row = await adminJson<SocialLink>("/api/admin/social-links", {
        method: "POST",
        body: JSON.stringify({ ...draft, url: draft.url.trim(), order: rows.length }),
      });
      setRows((r) => [...r, row]);
      setDraft({ platform: "linkedin", url: "", active: true });
      setShowForm(false);
      toast({ type: "success", message: "Social link added" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not add link" });
    } finally {
      setPending(null);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await adminJson(`/api/admin/social-links/${deleteId}`, { method: "DELETE" });
      setRows((r) => r.filter((x) => x.id !== deleteId));
      toast({ type: "success", message: "Deleted" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not delete" });
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={() => setShowForm((v) => !v)} className={adminBtnPrimaryClass}>
          <Plus className="mr-1 inline h-4 w-4" />
          Add New
        </button>
      </div>

      {showForm ? (
        <div className="mb-6 rounded-2xl border border-white/[0.08] bg-[#13122A] p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">New social link</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <select
              className={adminInputClass}
              value={draft.platform}
              onChange={(e) => setDraft((d) => ({ ...d, platform: e.target.value as Platform }))}
            >
              {PLATFORMS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              className={adminInputClass}
              placeholder="https://..."
              value={draft.url}
              onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
            />
            <div className="flex items-center gap-3">
              <ToggleSwitch
                label="Active"
                checked={draft.active}
                onChange={() => setDraft((d) => ({ ...d, active: !d.active }))}
              />
              <button type="button" onClick={addRow} disabled={pending === "new"} className={adminBtnPrimaryClass}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#13122A]">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-medium">Platform</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Active</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white/85">
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/[0.06]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/70">
                      <SocialPlatformIcon platform={row.platform} size={16} />
                    </span>
                    <span>{socialPlatformLabel(row.platform)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <input
                    className={adminInputClass}
                    value={row.url}
                    onChange={(e) => setRows((r) => r.map((x) => (x.id === row.id ? { ...x, url: e.target.value } : x)))}
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    label=""
                    aria-label="Active"
                    checked={row.active}
                    disabled={pending === row.id}
                    onChange={() => {
                      const updated = { ...row, active: !row.active };
                      setRows((r) => r.map((x) => (x.id === row.id ? updated : x)));
                      saveRow(updated);
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="inline-flex rounded-lg p-2 text-red-400 hover:bg-white/5"
                    onClick={() => setDeleteId(row.id)}
                  >
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
