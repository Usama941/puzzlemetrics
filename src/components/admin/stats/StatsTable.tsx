"use client";

import type { StatCard } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ColorPalettePicker, DEFAULT_PALETTE_COLOR } from "@/components/admin/ColorPalettePicker";
import { DeleteConfirmModal } from "@/components/admin/DeleteConfirmModal";
import { adminBtnPrimaryClass, adminInputClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial: StatCard[] };

function normalizeStatRow(row: StatCard): StatCard {
  return {
    ...row,
    color: row.color?.trim() || DEFAULT_PALETTE_COLOR,
  };
}

function statPayload(row: StatCard) {
  return {
    label: row.label,
    value: row.value,
    color: row.color?.trim() || DEFAULT_PALETTE_COLOR,
    icon: row.icon || "chart",
    order: row.order,
  };
}

export function StatsTable({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [rows, setRows] = useState(() => initial.map(normalizeStatRow));
  const rowsRef = useRef(rows);
  const [pending, setPending] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [draft, setDraft] = useState({ label: "", value: "", color: DEFAULT_PALETTE_COLOR });

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  useEffect(() => {
    const normalized = initial.map(normalizeStatRow);
    setRows(normalized);
    rowsRef.current = normalized;
  }, [initial]);

  const saveRow = useCallback(
    async (row: StatCard) => {
      const payload = statPayload(row);
      try {
        setPending(row.id);
        const saved = await adminJson<StatCard>(`/api/admin/stats/${row.id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        const normalized = normalizeStatRow(saved);
        setRows((current) => {
          const next = current.map((x) => (x.id === row.id ? normalized : x));
          rowsRef.current = next;
          return next;
        });
        toast({ type: "success", message: "Saved" });
        router.refresh();
      } catch {
        toast({ type: "error", message: "Could not save" });
      } finally {
        setPending(null);
      }
    },
    [router, toast],
  );

  function updateStat(id: string, field: "label" | "value", value: string) {
    setRows((prev) => {
      const next = prev.map((x) => (x.id === id ? { ...x, [field]: value } : x));
      rowsRef.current = next;
      return next;
    });
  }

  function handleColorChange(statId: string, newColor: string) {
    const next = rowsRef.current.map((s) => (s.id === statId ? { ...s, color: newColor } : s));
    rowsRef.current = next;
    setRows(next);
    const updated = next.find((s) => s.id === statId);
    if (updated) void saveRow(updated);
  }

  function saveRowById(statId: string) {
    const row = rowsRef.current.find((s) => s.id === statId);
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
          color: draft.color?.trim() || DEFAULT_PALETTE_COLOR,
          icon: "chart",
          order: rowsRef.current.length,
        }),
      });
      const normalized = normalizeStatRow(row);
      setRows((current) => {
        const next = [...current, normalized];
        rowsRef.current = next;
        return next;
      });
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
    if (j < 0 || j >= rowsRef.current.length) return;
    const next = [...rowsRef.current];
    [next[index], next[j]] = [next[j], next[index]];
    const reordered = next.map((r, i) => ({ ...r, order: i }));
    rowsRef.current = reordered;
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
      setRows((current) => {
        const next = current.filter((x) => x.id !== deleteId);
        rowsRef.current = next;
        return next;
      });
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
            {rows.map((row, i) => {
              const selectedColor = row.color || DEFAULT_PALETTE_COLOR;
              return (
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
                      onBlur={() => saveRowById(row.id)}
                      disabled={pending === row.id}
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <input
                      className={adminInputClass}
                      value={row.value}
                      placeholder="1,200+"
                      onChange={(e) => updateStat(row.id, "value", e.target.value)}
                      onBlur={() => saveRowById(row.id)}
                      disabled={pending === row.id}
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <ColorPalettePicker
                      label="Color"
                      selectedColor={selectedColor}
                      onChange={(color) => handleColorChange(row.id, color)}
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
              );
            })}
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
