"use client";

import { useState } from "react";

interface ImageManagerProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageManager({ images, onChange }: ImageManagerProps) {
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);

  const addUrl = () => {
    if (urlInput.trim()) {
      onChange([...images, urlInput.trim()]);
      setUrlInput("");
    }
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData, credentials: "include" });
      const data = (await res.json()) as { url?: string };
      if (data.url) onChange([...images, data.url]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const remove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const arr = [...images];
    [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
    onChange(arr);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const arr = [...images];
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    onChange(arr);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        Project Images (shown in slider on detail page)
      </label>

      {images.map((img, i) => (
        <div
          key={`${img}-${i}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "8px 12px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt=""
            style={{
              width: 64,
              height: 42,
              objectFit: "cover",
              borderRadius: 6,
              flexShrink: 0,
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <span
            style={{
              flex: 1,
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {img.length > 55 ? `${img.slice(0, 55)}...` : img}
          </span>
          <button
            type="button"
            onClick={() => moveUp(i)}
            disabled={i === 0}
            style={{
              padding: "4px 8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "white",
              cursor: "pointer",
              opacity: i === 0 ? 0.3 : 1,
            }}
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() => moveDown(i)}
            disabled={i === images.length - 1}
            style={{
              padding: "4px 8px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              color: "white",
              cursor: "pointer",
              opacity: i === images.length - 1 ? 0.3 : 1,
            }}
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => remove(i)}
            style={{
              padding: "4px 10px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 6,
              color: "#ef4444",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      ))}

      <label
        style={{
          display: "block",
          padding: "12px",
          background: "rgba(255,255,255,0.03)",
          border: "1.5px dashed rgba(255,255,255,0.12)",
          borderRadius: 10,
          textAlign: "center",
          color: "rgba(255,255,255,0.4)",
          cursor: "pointer",
          fontSize: 13,
        }}
      >
        {uploading ? "⏳ Uploading..." : "⬆ Upload Image"}
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
      </label>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="url"
          placeholder="Or paste image URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          style={{
            flex: 1,
            padding: "10px 14px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            color: "white",
            fontSize: 13,
          }}
        />
        <button
          type="button"
          onClick={addUrl}
          style={{
            padding: "10px 16px",
            background: "#6055D9",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
