"use client";

import type { StatCard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ColorPalettePicker, DEFAULT_PALETTE_COLOR, normalizeColor } from "@/components/admin/ColorPalettePicker";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { adminBtnPrimaryClass, adminInputClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial: StatCard[] };

function normalizeStatRow(row: StatCard): StatCard {
  return {
    ...row,
    color: normalizeColor(row.color),
  };
}

function statPayload(row: StatCard) {
  return {
    label: row.label,
    value: row.value,
    color: normalizeColor(row.color),
    icon: row.icon || "chart",
    order: row.order,
  };
}

export function StatsTable({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [rows, setRows] = useState(() => initial.map(normalizeStatRow));
  const [pending, setPending] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ label: "", value: "", color: DEFAULT_PALETTE_COLOR });

  useEffect(() => {
    setRows(initial.map(normalizeStatRow));
  }, [initial]);

  async function saveRow(row: StatCard) {
    const payload = statPayload(row);
    try {
      setPending(row.id);
      const saved = await adminJson<StatCard>(`/api/admin/stats/${row.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setRows((r) => r.map((x) => (x.id === row.id ? normalizeStatRow(saved) : x)));
      toast({ type: "success", message: "Saved" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Could not save" });
    } finally {
      setPending(null);
    }
  }

  function updateStat(id: string, field: "label" | "value", value: string) {
    setRows((r) => r.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  }

  function updateStatColor(statId: string, newColor: string) {
    const updated = rows.map((s) => (s.id === statId ? { ...s, color: newColor } : s));
    const row = updated.find((s) => s.id === statId);
    setRows(updated);
    if (row) void saveRow(row);
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
          color: normalizeColor(draft.color),
          icon: "chart",
          order: rows.length,
        }),
      });
      setRows((r) => [...r, normalizeStatRow(row)]);
      setDraft({ label: "", value: "", color: DEFAULT_PALETTE_COLOR });
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
        reordered.map((r) =>
          adminJson(`/api/admin/stats/${r.id}`, { method: "PUT", body: JSON.stringify(statPayload(r)) }),
        ),
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
        <table className="w-full min-w-[900px] text-left text-sm">
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
                    value={row.label}
                    placeholder="Active Users"
                    onChange={(e) => updateStat(row.id, "label", e.target.value)}
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3 align-top">
                  <input
                    className={adminInputClass}
                    value={row.value}
                    placeholder="1,200+"
                    onChange={(e) => updateStat(row.id, "value", e.target.value)}
                    onBlur={() => saveRow(rows.find((x) => x.id === row.id) ?? row)}
                    disabled={pending === row.id}
                  />
                </td>
                <td className="px-4 py-3 align-top">
                  <ColorPalettePicker
                    label="Color"
                    selectedColor={row.color || DEFAULT_PALETTE_COLOR}
                    onChange={(color) => updateStatColor(row.id, color)}
                    compact
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
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-white/40">Add stat</p>
        <div className="grid gap-4 sm:grid-cols-2">
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
        </div>
        <div className="mt-4">
          <ColorPalettePicker
            label="Color"
            selectedColor={draft.color}
            onChange={(color) => setDraft((d) => ({ ...d, color }))}
            compact
          />
        </div>
        <button type="button" onClick={addRow} disabled={pending === "new"} className={`${adminBtnPrimaryClass} mt-4`}>
          <Plus className="mr-1 inline h-4 w-4" />
          Add
        </button>
      </div>

      <DeleteConfirmModal open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </>
  );
}
