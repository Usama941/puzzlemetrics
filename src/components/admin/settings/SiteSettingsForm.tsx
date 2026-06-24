"use client";

import { useEffect, useState } from "react";
import { adminBtnPrimaryClass, adminInputClass } from "@/components/admin/admin-ui";
import { useAdminToast } from "@/components/admin/AdminToast";
import { adminJson } from "@/lib/admin-fetch";

type Props = {
  initialCompanyNumber: string;
  initialPhone: string;
  initialEmail: string;
};

export const SiteSettingsForm = ({ initialCompanyNumber, initialPhone, initialEmail }: Props) => {
  const toast = useAdminToast();
  const [companyNumber, setCompanyNumber] = useState(initialCompanyNumber);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setCompanyNumber(initialCompanyNumber);
    setPhone(initialPhone);
    setEmail(initialEmail);
  }, [initialCompanyNumber, initialPhone, initialEmail]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    try {
      setPending(true);
      await adminJson("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify({ companyNumber, phone, email }),
      });
      toast({ type: "success", message: "Settings saved" });
    } catch {
      toast({ type: "error", message: "Could not save settings" });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSave} className="max-w-lg space-y-4 rounded-2xl border border-white/[0.08] bg-[#13122A] p-6">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Company Registration Number</label>
        <input
          className={adminInputClass}
          value={companyNumber}
          onChange={(e) => setCompanyNumber(e.target.value)}
          placeholder="e.g. 12345678"
        />
        <p className="mt-2 text-xs text-white/40">Displayed in website footer under copyright line</p>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Phone Number</label>
        <input
          type="tel"
          className={adminInputClass}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+44 7700 000000"
        />
        <p className="mt-2 text-xs text-white/40">Shown in website footer</p>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">Contact Email</label>
        <input
          type="email"
          className={adminInputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="hello@puzzlemetrics.com"
        />
        <p className="mt-2 text-xs text-white/40">Shown in website footer</p>
      </div>
      <button type="submit" disabled={pending} className={adminBtnPrimaryClass}>
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
};
