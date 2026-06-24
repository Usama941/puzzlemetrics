"use client";

import type { StatCard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { adminBtnPrimaryClass, adminInputClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial: StatCard[] };

const presetColors = [
  "#6055D9",
  "#10B981",
  "#0EA5E9",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
];

const DEFAULT_COLOR = "#6055D9";

export function StatsTable({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [rows, setRows] = useState(initial);
  const [pending, setPending] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ label: "", value: "", color: DEFAULT_COLOR });

  async function saveRow(row: StatCard) {
    try {
      setPending(row.id);
      await adminJson(`/api/admin/stats/${row.id}`, { method: "PUT", body: JSON.stringify(row) });
      toast({ type: "success", message: "Saved" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not save" });
    } finally {
      setPending(null);
    }
  }

  function updateStat(id: string, field: "label" | "value" | "color", value: string) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  }

  function updateStatColor(row: StatCard, color: string) {
    const updated = { ...row, color };
    setRows((r) => r.map((x) => (x.id === row.id ? updated : x)));
    void saveRow(updated);
  }

  async function addRow() {
    if (!draft.label.trim() || !draft.value.trim()) {
      toast({ type: "error", message: "Label and value are required" });
      return;
    }
    try {
      setPending("new");
      const row = await adminJson<StatCard>("/api/admin/stats", {
        method: "POST",
        body: JSON.stringify({
          label: draft.label,
          value: draft.value,
          color: draft.color,
          icon: "chart",
          order: rows.length,
        }),
      });
      setRows((r) => [...r, row]);
      setDraft({ label: "", value: "", color: DEFAULT_COLOR });
      toast({ type: "success", message: "Stat added" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not add stat" });
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
        reordered.map((r) => adminJson(`/api/admin/stats/${r.id}`, { method: "PUT", body: JSON.stringify(r) })),
      );
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not reorder" });
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await adminJson(`/api/admin/stats/${deleteId}`, { method: "DELETE" });
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
      <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#13122A]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/45">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Label</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Color</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white/85">
            {rows.map((row, i) => (
              <tr key={row.id} className="border-b border-white/[0.06]">
                <td className="px-4 py-3">
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
                <td className="px-4 py-3">
                  <input
                    className={adminInputClass}
                    value={row.label}
                    placeholder="Active Users"
                    onChange={(e) => updateStat(row.id, "label", e.target.value)}
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    className={adminInputClass}
                    value={row.value}
                    placeholder="1,200+"
                    onChange={(e) => updateStat(row.id, "value", e.target.value)}
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3">
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <input
                      type="color"
                      value={row.color || DEFAULT_COLOR}
                      onChange={(e) => updateStatColor(row, e.target.value)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.15)",
                        cursor: "pointer",
                        padding: 2,
                        background: "transparent",
                      }}
                    />
                    <input
                      type="text"
                      value={row.color || DEFAULT_COLOR}
                      onChange={(e) => updateStat(row.id, "color", e.target.value)}
                      onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                      placeholder="#6055D9"
                      style={{
                        width: 90,
                        padding: "8px 10px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 8,
                        color: "white",
                        fontSize: 12,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                    {presetColors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => updateStatColor(row, c)}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: c,
                          border: (row.color || DEFAULT_COLOR) === c ? "2px solid white" : "2px solid transparent",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
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

      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#13122A] p-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">Add stat</p>
        <div className="grid gap-3 sm:grid-cols-4">
          <input
            className={adminInputClass}
            placeholder="Label (e.g. Active Users)"
            value={draft.label}
            onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
          />
          <input
            className={adminInputClass}
            placeholder="Value (e.g. 1,200+)"
            value={draft.value}
            onChange={(e) => setDraft((d) => ({ ...d, value: e.target.value }))}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              type="color"
              value={draft.color}
              onChange={(e) => setDraft((d) => ({ ...d, color: e.target.value }))}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                padding: 2,
                background: "transparent",
              }}
            />
            <input
              type="text"
              value={draft.color}
              onChange={(e) => setDraft((d) => ({ ...d, color: e.target.value }))}
              placeholder="#6055D9"
              style={{
                width: 90,
                padding: "8px 10px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                color: "white",
                fontSize: 12,
              }}
            />
          </div>
          <button type="button" onClick={addRow} disabled={pending === "new"} className={adminBtnPrimaryClass}>
            <Plus className="mr-1 inline h-4 w-4" />
            Add
          </button>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {presetColors.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setDraft((d) => ({ ...d, color: c }))}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: c,
                border: draft.color === c ? "2px solid white" : "2px solid transparent",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <DeleteConfirmModal open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </>
  );
}
