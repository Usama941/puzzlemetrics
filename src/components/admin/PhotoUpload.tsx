"use client";

import { useRef, useState } from "react";

interface PhotoUploadProps {
  value: string;
  onChange: (url: string) => void;
  memberName?: string;
  gradient?: string;
  initials?: string;
}

export default function PhotoUpload({
  value,
  onChange,
  memberName = "",
  gradient = "linear-gradient(135deg, #6055D9, #4038B0)",
  initials = "?",
}: PhotoUploadProps) {
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

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };

      if (!res.ok) {
        if (res.status === 400 || res.status === 401) {
          setError(data.error || (res.status === 401 ? "Unauthorized" : "Upload rejected"));
          return;
        }
        throw new Error(data.error || "Upload failed");
      }

      if (!data.url) throw new Error("No URL in response");
      onChange(data.url);
    } catch (err) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onChange(base64);
      };
      reader.readAsDataURL(file);
      setError(
        err instanceof Error && err.message !== "Upload failed"
          ? err.message
          : "Note: Using local preview (upload API unavailable or server error).",
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleUrlChange = (url: string) => {
    setError("");
    onChange(url);
  };

  const hasPhoto = Boolean(value && value.length > 0);
  const displayUrl = value.startsWith("data:") ? "" : value;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            overflow: "hidden",
            flexShrink: 0,
            border: "2px solid rgba(255,255,255,0.1)",
            position: "relative",
            background: gradient,
          }}
        >
          {hasPhoto ? (
            <img
              src={value}
              alt={memberName || "Team member"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 24,
                fontWeight: 800,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {initials}
            </div>
          )}
        </div>

        <div>
          <div
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.8)",
              marginBottom: 4,
            }}
          >
            {hasPhoto ? "Photo set" : "No photo — showing initials"}
          </div>
          <div
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {hasPhoto
              ? (value.length > 40 ? `${value.substring(0, 40)}...` : value)
              : "Upload or paste a URL below"}
          </div>
          {hasPhoto && (
            <button
              type="button"
              onClick={() => onChange("")}
              style={{
                marginTop: 6,
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#EF4444",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              × Remove photo
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          background: "rgba(255,255,255,0.04)",
          borderRadius: 10,
          padding: 3,
          gap: 2,
        }}
      >
        {(["upload", "url"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "7px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              background: tab === t ? "#6055D9" : "transparent",
              color: tab === t ? "white" : "rgba(255,255,255,0.45)",
              transition: "all 0.15s",
            }}
          >
            {t === "upload" ? "⬆ Upload File" : "🔗 Paste URL"}
          </button>
        ))}
      </div>

      {tab === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              width: "100%",
              padding: "14px",
              background: "rgba(255,255,255,0.04)",
              border: "1.5px dashed rgba(255,255,255,0.15)",
              borderRadius: 10,
              cursor: uploading ? "not-allowed" : "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(96,85,217,0.5)";
                el.style.background = "rgba(96,85,217,0.08)";
              }
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.15)";
              el.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            {uploading ? (
              <>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.2)",
                    borderTopColor: "#6055D9",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                  Uploading...
                </span>
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span
                  style={{
                    fontFamily: "Inter Tight, sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Click to upload
                </span>
                <span style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  JPG, PNG, WebP — max 5MB
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {tab === "url" && (
        <div>
          <input
            type="text"
            value={displayUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="/team1.jpeg  or  https://example.com/photo.jpg"
            style={{
              width: "100%",
              padding: "11px 14px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 13,
              color: "white",
              outline: "none",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#6055D9";
              e.target.style.boxShadow = "0 0 0 3px rgba(96,85,217,0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(255,255,255,0.12)";
              e.target.style.boxShadow = "none";
            }}
          />
          <p
            style={{
              fontFamily: "Inter Tight, sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              marginTop: 6,
            }}
          >
            Use /team1.jpeg for files in the public folder, or paste any full URL
          </p>
        </div>
      )}

      {error && (
        <p
          style={{
            fontFamily: "Inter Tight, sans-serif",
            fontSize: 12,
            color: "#F59E0B",
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: 8,
            padding: "8px 12px",
          }}
        >
          ⚠ {error}
        </p>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
