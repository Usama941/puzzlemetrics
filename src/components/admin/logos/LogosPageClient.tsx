"use client";

import type { CompanyLogo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { LogoUpload } from "@/components/admin/logos/LogoUpload";
import { ToggleSwitch } from "@/components/admin/ToggleSwitch";
import { adminBtnPrimaryClass, adminInputClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = {
  trusted: CompanyLogo[];
  partners: CompanyLogo[];
};

type Tab = "trusted" | "partner";

export function LogosPageClient({ trusted, partners }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [tab, setTab] = useState<Tab>("trusted");
  const [trustedRows, setTrustedRows] = useState(trusted);
  const [partnerRows, setPartnerRows] = useState(partners);
  const [pending, setPending] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ name: "", logo: "", websiteUrl: "" });

  const rows = tab === "trusted" ? trustedRows : partnerRows;
  const setRows = tab === "trusted" ? setTrustedRows : setPartnerRows;

  async function saveRow(row: CompanyLogo) {
    try {
      setPending(row.id);
      await adminJson(`/api/admin/logos/${row.id}`, { method: "PUT", body: JSON.stringify(row) });
      toast({ type: "success", message: "Saved" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not save" });
    } finally {
      setPending(null);
    }
  }

  async function addRow() {
    if (!draft.name.trim()) {
      toast({ type: "error", message: "Company name is required" });
      return;
    }
    try {
      setPending("new");
      const row = await adminJson<CompanyLogo>("/api/admin/logos", {
        method: "POST",
        body: JSON.stringify({
          name: draft.name.trim(),
          logo: draft.logo.trim(),
          websiteUrl: draft.websiteUrl.trim(),
          type: tab,
          order: rows.length,
          active: true,
        }),
      });
      setRows((r) => [...r, row]);
      setDraft({ name: "", logo: "", websiteUrl: "" });
      toast({ type: "success", message: "Logo added" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not add logo" });
    } finally {
      setPending(null);
    }
  }

  async function moveRow(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= rows.length) return;
    const next = [...rows];
    [next[index], next[j]] = [next[j], next[index]];
    const reordered = next.map((r, i) => ({ ...r, order: i }));
    setRows(reordered);
    try {
      await Promise.all(
        reordered.map((r) => adminJson(`/api/admin/logos/${r.id}`, { method: "PUT", body: JSON.stringify(r) })),
      );
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not reorder" });
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await adminJson(`/api/admin/logos/${deleteId}`, { method: "DELETE" });
      setTrustedRows((r) => r.filter((x) => x.id !== deleteId));
      setPartnerRows((r) => r.filter((x) => x.id !== deleteId));
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
      <div className="mb-6 flex gap-2">
        {(["trusted", "partner"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t ? "bg-[#6055D9] text-white" : "bg-white/[0.06] text-white/60 hover:text-white/90"
            }`}
          >
            {t === "trusted" ? "Trusted By" : "Partners"}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#13122A]">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Logo</th>
              <th className="px-4 py-3 font-medium">Website URL</th>
              <th className="px-4 py-3 font-medium">Active</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white/85">
            {rows.map((row, i) => (
              <tr key={row.id} className="border-b border-white/[0.06]">
                <td className="px-4 py-3 align-top">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={i === 0}
                      onClick={() => moveRow(i, -1)}
                      className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/5 disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      disabled={i === rows.length - 1}
                      onClick={() => moveRow(i, 1)}
                      className="rounded px-2 py-1 text-xs text-white/60 hover:bg-white/5 disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 align-top">
                  <input
                    className={adminInputClass}
                    value={row.name}
                    onChange={(e) => setRows((r) => r.map((x) => (x.id === row.id ? { ...x, name: e.target.value } : x)))}
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3 align-top">
                  <LogoUpload
                    compact
                    value={row.logo}
                    onChange={(logo) => setRows((r) => r.map((x) => (x.id === row.id ? { ...x, logo } : x)))}
                    onSaved={(logo) => {
                      const updated = { ...row, logo };
                      setRows((r) => r.map((x) => (x.id === row.id ? updated : x)));
                      void saveRow(updated);
                    }}
                  />
                </td>
                <td className="px-4 py-3 align-top">
                  <input
                    className={adminInputClass}
                    value={row.websiteUrl}
                    placeholder="https://company.com"
                    onChange={(e) =>
                      setRows((r) => r.map((x) => (x.id === row.id ? { ...x, websiteUrl: e.target.value } : x)))
                    }
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3 align-top">
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
                <td className="px-4 py-3 text-right align-top">
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

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#13122A] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">
          Add {tab === "trusted" ? "trusted company" : "partner"}
        </p>
        <div className="grid gap-4 lg:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/45">Company name</label>
            <input
              className={adminInputClass}
              placeholder="Company name"
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/45">Website URL</label>
            <input
              className={adminInputClass}
              placeholder="https://company.com"
              value={draft.websiteUrl}
              onChange={(e) => setDraft((d) => ({ ...d, websiteUrl: e.target.value }))}
            />
          </div>
          <div className="flex items-end">
            <button type="button" onClick={addRow} disabled={pending === "new"} className={`${adminBtnPrimaryClass} w-full`}>
              <Plus className="mr-1 inline h-4 w-4" />
              Add
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-medium text-white/45">Logo</label>
          <LogoUpload
            value={draft.logo}
            onChange={(logo) => setDraft((d) => ({ ...d, logo }))}
            onSaved={(logo) => setDraft((d) => ({ ...d, logo }))}
          />
        </div>
      </div>

      <DeleteConfirmModal open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </>
  );
}
