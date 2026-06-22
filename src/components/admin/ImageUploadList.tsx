"use client";

import { useRef, useState } from "react";

type ImageUploadListProps = {
  images: string[];
  onChange: (images: string[]) => void;
  accentColor?: string;
};

export const ImageUploadList = ({ images, onChange, accentColor = "#6055D9" }: ImageUploadListProps) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        onChange([...images, data.url]);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result;
        if (typeof result === "string") onChange([...images, result]);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const addUrl = () => {
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const remove = (i: number) => {
    onChange(images.filter((_, idx) => idx !== i));
  };

  const move = (i: number, dir: -1 | 1) => {
    const arr = [...images];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    onChange(arr);
  };

  return (
    <div className="flex flex-col gap-3.5 sm:col-span-2">
      <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/50">
        Project Images (shown in slider on detail page)
      </label>

      {images.length > 0 && (
        <div className="flex flex-col gap-2">
          {images.map((img, i) => (
            <div
              key={`${img}-${i}`}
              className="flex items-center gap-2.5 rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-3 py-2"
            >
              <div className="h-10 w-[60px] shrink-0 overflow-hidden rounded-md bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>

              <span className="min-w-0 flex-1 truncate text-xs text-white/50">
                {img.length > 50 ? `${img.substring(0, 50)}...` : img}
              </span>

              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="cursor-pointer rounded-lg border border-white/[0.12] bg-white/[0.06] px-2 py-1 text-xs text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === images.length - 1}
                className="cursor-pointer rounded-lg border border-white/[0.12] bg-white/[0.06] px-2 py-1 text-xs text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                ↓
              </button>

              <button
                type="button"
                onClick={() => remove(i)}
                className="cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="w-full cursor-pointer rounded-[10px] border-[1.5px] border-dashed border-white/15 bg-white/[0.04] px-3 py-3 text-[13px] text-white/50 disabled:cursor-not-allowed"
        >
          {uploading ? "⏳ Uploading..." : "⬆ Upload Image"}
        </button>
      </div>

      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Or paste image URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          className="flex-1 rounded-[10px] border border-white/[0.12] bg-white/[0.06] px-3.5 py-2.5 text-[13px] text-white outline-none"
        />
        <button
          type="button"
          onClick={addUrl}
          className="cursor-pointer rounded-[10px] px-4 py-2.5 text-[13px] font-semibold text-white"
          style={{ background: accentColor }}
        >
          Add
        </button>
      </div>
    </div>
  );
};
