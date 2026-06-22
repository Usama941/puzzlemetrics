"use client";

import type { EmailSettings } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminBtnPrimaryClass, adminInputClass, adminLabelClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = { initial: EmailSettings | null };

export function EmailSettingsForm({ initial }: Props) {
  const router = useRouter();
  const toast = useAdminToast();
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [form, setForm] = useState(
    () =>
      initial ?? {
        id: "",
        smtpHost: "send.one.com",
        smtpPort: 587,
        smtpUser: "website@puzzlemetrics.com",
        smtpPass: "",
        fromName: "PuzzleMetrics",
        fromEmail: "website@puzzlemetrics.com",
        adminEmail: "admin@puzzlemetrics.com",
        replyTo: null,
        updatedAt: new Date(),
      },
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await adminJson("/api/admin/email-settings", {
        method: "PUT",
        body: JSON.stringify({
          smtpHost: form.smtpHost,
          smtpPort: form.smtpPort,
          smtpUser: form.smtpUser,
          smtpPass: form.smtpPass,
          fromName: form.fromName,
          fromEmail: form.fromEmail,
          adminEmail: form.adminEmail,
          replyTo: form.replyTo,
        }),
      });
      toast({ type: "success", message: "Settings saved" });
      router.refresh();
    } catch {
      toast({ type: "error", message: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  async function sendTest() {
    setTesting(true);
    try {
      await adminJson("/api/admin/email-settings/test", { method: "POST", body: "{}" });
      toast({ type: "success", message: "Test email sent (check admin inbox)" });
    } catch {
      toast({ type: "error", message: "Test send failed — check SMTP settings" });
    } finally {
      setTesting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-white/[0.08] bg-[#13122A] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>SMTP host</label>
          <input className={adminInputClass} value={form.smtpHost} onChange={(e) => setForm((f) => ({ ...f, smtpHost: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>SMTP port</label>
          <input
            type="number"
            className={adminInputClass}
            value={form.smtpPort}
            onChange={(e) => setForm((f) => ({ ...f, smtpPort: parseInt(e.target.value, 10) || 587 }))}
          />
        </div>
        <div>
          <label className={adminLabelClass}>SMTP user</label>
          <input className={adminInputClass} value={form.smtpUser} onChange={(e) => setForm((f) => ({ ...f, smtpUser: e.target.value }))} />
        </div>
        <div className="sm:col-span-2">
          <label className={adminLabelClass}>SMTP password</label>
          <input
            type="password"
            className={adminInputClass}
            value={form.smtpPass}
            onChange={(e) => setForm((f) => ({ ...f, smtpPass: e.target.value }))}
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className={adminLabelClass}>From name</label>
          <input className={adminInputClass} value={form.fromName} onChange={(e) => setForm((f) => ({ ...f, fromName: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>From email</label>
          <input className={adminInputClass} value={form.fromEmail} onChange={(e) => setForm((f) => ({ ...f, fromEmail: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Admin notification email</label>
          <input className={adminInputClass} value={form.adminEmail} onChange={(e) => setForm((f) => ({ ...f, adminEmail: e.target.value }))} />
        </div>
        <div>
          <label className={adminLabelClass}>Reply-to (optional)</label>
          <input
            className={adminInputClass}
            value={form.replyTo ?? ""}
            onChange={(e) => setForm((f) => ({ ...f, replyTo: e.target.value || null }))}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 pt-4">
        <button type="submit" disabled={saving} className={adminBtnPrimaryClass}>
          {saving ? "Saving…" : "Save settings"}
        </button>
        <button type="button" disabled={testing} onClick={sendTest} className={adminBtnPrimaryClass}>
          {testing ? "Sending…" : "Send test email"}
        </button>
      </div>
    </form>
  );
}
