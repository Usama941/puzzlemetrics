"use client";

import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { adminInputClass } from "@/components/admin/admin-ui";

type LogoUploadProps = {
  value: string;
  onChange: (url: string) => void;
  /** Called after a successful upload or URL commit — use to persist to DB immediately. */
  onSaved?: (url: string) => void;
  compact?: boolean;
};

export const LogoUpload = ({ value, onChange, onSaved, compact = false }: LogoUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "logos");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
      onSaved?.(data.url);
    } catch {
      setError("Upload failed — try pasting a URL instead");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const hasLogo = Boolean(value?.trim());

  if (compact) {
    return (
      <div className="flex min-w-[200px] flex-col gap-2">
        {hasLogo ? (
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.startsWith("/") || value.startsWith("http") ? value : `/${value}`}
              alt=""
              className="h-8 w-auto max-w-[64px] rounded object-contain"
            />
            <button
              type="button"
              onClick={() => {
                onChange("");
                onSaved?.("");
              }}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ) : null}
        <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5">
          {(["upload", "url"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                tab === t ? "bg-[#6055D9] text-white" : "text-white/45 hover:text-white/70"
              }`}
            >
              {t === "upload" ? "Upload" : "URL"}
            </button>
          ))}
        </div>
        {tab === "upload" ? (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/60 transition hover:border-[#6055D9]/50 hover:bg-[#6055D9]/10 disabled:opacity-50"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading…" : "Upload Logo"}
            </button>
          </>
        ) : (
          <input
            className={adminInputClass}
            value={value}
            placeholder="https://..."
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => onSaved?.(e.target.value)}
          />
        )}
        {error ? <p className="text-[11px] text-amber-400">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {hasLogo ? (
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-28 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.startsWith("/") || value.startsWith("http") ? value : `/${value}`}
              alt=""
              className="max-h-12 w-auto object-contain"
            />
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium text-red-400 hover:text-red-300"
          >
            Remove logo
          </button>
        </div>
      ) : null}

      <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5">
        {(["upload", "url"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              tab === t ? "bg-[#6055D9] text-white" : "text-white/45 hover:text-white/70"
            }`}
          >
            {t === "upload" ? "Upload" : "URL"}
          </button>
        ))}
      </div>

      {tab === "upload" ? (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center gap-1.5 rounded-xl border border-dashed border-white/15 bg-white/[0.04] px-4 py-4 text-sm transition hover:border-[#6055D9]/50 hover:bg-[#6055D9]/10 disabled:opacity-50"
          >
            <Upload className="h-5 w-5 text-white/40" />
            <span className="font-medium text-white/70">{uploading ? "Uploading…" : "Upload Logo"}</span>
            <span className="text-[11px] text-white/35">JPG, PNG, WebP — max 5MB</span>
          </button>
        </>
      ) : (
        <input
          className={adminInputClass}
          value={value}
          placeholder="https://example.com/logo.png"
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {error ? <p className="text-xs text-amber-400">{error}</p> : null}
    </div>
  );
};
