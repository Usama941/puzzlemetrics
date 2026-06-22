"use client";

import { useCallback, useEffect, useState } from "react";

type SubmissionData = {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  message?: string;
  services?: string[];
  subject?: string;
  confirmedAt?: string;
  calendarLink?: string;
  meetingNotes?: string;
};

type Submission = {
  id: string;
  type: string;
  status: string;
  createdAt: string;
  data: SubmissionData;
};

const STATUS_COLORS: Record<string, string> = {
  new: "#F59E0B",
  read: "rgba(255,255,255,0.35)",
  replied: "#10B981",
  archived: "rgba(255,255,255,0.2)",
};

const STATUS_BG: Record<string, string> = {
  new: "rgba(245,158,11,0.15)",
  read: "rgba(255,255,255,0.06)",
  replied: "rgba(16,185,129,0.15)",
  archived: "rgba(255,255,255,0.04)",
};

const fetchOpts: RequestInit = { credentials: "include" };

export default function SubmissionsPageClient() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [calendarLink, setCalendarLink] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }, []);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/submissions", fetchOpts);
      if (!res.ok) throw new Error("Unauthorized");
      const data = (await res.json()) as Submission[];
      setSubmissions(data);
    } catch (e) {
      console.error(e);
      showToast("Could not load submissions");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchSubmissions();
  }, [fetchSubmissions]);

  const updateStatus = async (id: string, status: string, silent?: boolean) => {
    const res = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      if (!silent) showToast("Could not update status");
      return;
    }
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    if (!silent) showToast("Status updated");
  };

  const confirmBooking = async (id: string) => {
    if (!calendarLink.trim()) {
      showToast("⚠ Please enter a calendar link");
      return;
    }
    setSendingId(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ calendarLink, meetingNotes }),
      });
      const result = (await res.json()) as {
        success?: boolean;
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        showToast("❌ " + (result.error || "Failed"));
        return;
      }
      if (result.success) {
        showToast(result.message || "✅ Confirmation sent!");
        setConfirmingId(null);
        setCalendarLink("");
        setMeetingNotes("");
        await fetchSubmissions();
      } else {
        showToast("❌ " + (result.error || "Failed"));
      }
    } catch {
      showToast("❌ Network error");
    } finally {
      setSendingId(null);
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm("Delete this submission? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("delete failed");
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      showToast("Submission deleted");
    } catch {
      showToast("❌ Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const TABS = [
    { id: "all", label: "All" },
    { id: "booking", label: "Bookings" },
    { id: "contact", label: "Contact" },
    { id: "newsletter", label: "Newsletter" },
  ];

  const filtered =
    activeTab === "all" ? submissions : submissions.filter((s) => s.type === activeTab);

  const newCount = submissions.filter((s) => s.status === "new").length;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    fontFamily: "Inter Tight, sans-serif",
    fontSize: 13,
    color: "white",
    outline: "none",
    boxSizing: "border-box",
  };

  const openConfirmPanel = (sub: Submission) => {
    setConfirmingId(sub.id);
    setExpandedId(sub.id);
    const d = sub.data;
    setCalendarLink(typeof d.calendarLink === "string" ? d.calendarLink : "");
    setMeetingNotes(typeof d.meetingNotes === "string" ? d.meetingNotes : "");
  };

  return (
    <div style={{ padding: 32, fontFamily: "Inter Tight, sans-serif" }}>
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            background: "#1A1940",
            border: "1px solid rgba(96,85,217,0.4)",
            borderRadius: 12,
            padding: "12px 20px",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {toast}
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "white", margin: 0 }}>Form Submissions</h1>
          {newCount > 0 && (
            <span
              style={{
                background: "#F59E0B",
                color: "#0a0a14",
                borderRadius: 9999,
                padding: "2px 10px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {newCount} new
            </span>
          )}
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>
          Bookings, contact requests, and newsletter signups
        </p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
        {TABS.map((tab) => {
          const count =
            tab.id === "all" ? submissions.length : submissions.filter((s) => s.type === tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "8px 16px",
                borderRadius: 9999,
                border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                background: isActive ? "#6055D9" : "rgba(255,255,255,0.04)",
                color: isActive ? "white" : "rgba(255,255,255,0.5)",
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {tab.label}
              <span
                style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
                  borderRadius: 9999,
                  padding: "1px 7px",
                  fontSize: 11,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: 60 }}>Loading submissions...</div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 24px",
            color: "rgba(255,255,255,0.3)",
            fontSize: 15,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          No {activeTab === "all" ? "" : activeTab} submissions yet
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((sub) => {
            const isExpanded = expandedId === sub.id;
            const isConfirming = confirmingId === sub.id;
            const isBooking = sub.type === "booking";
            const isAlreadyConfirmed = sub.status === "replied";

            return (
              <div
                key={sub.id}
                style={{
                  background: "#13122A",
                  border: `1px solid ${isExpanded ? "rgba(96,85,217,0.4)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedId(isExpanded ? null : sub.id);
                      setConfirmingId(null);
                      if (!isExpanded && sub.status === "new") void updateStatus(sub.id, "read", true);
                    }
                  }}
                  onClick={() => {
                    setExpandedId(isExpanded ? null : sub.id);
                    setConfirmingId(null);
                    if (!isExpanded && sub.status === "new") void updateStatus(sub.id, "read", true);
                  }}
                  style={{
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: isBooking ? "rgba(96,85,217,0.15)" : "rgba(14,165,233,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                    }}
                  >
                    {isBooking ? "📅" : sub.type === "newsletter" ? "📧" : "💬"}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: "white" }}>
                        {sub.data.name || sub.data.email || "Unknown"}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: isBooking ? "#7B6EE8" : "#0EA5E9",
                          background: isBooking ? "rgba(96,85,217,0.12)" : "rgba(14,165,233,0.12)",
                          borderRadius: 9999,
                          padding: "1px 8px",
                          textTransform: "capitalize",
                        }}
                      >
                        {sub.type}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                      {sub.data.email}
                      {sub.data.company ? ` · ${sub.data.company}` : ""}
                      {sub.data.budget ? ` · ${sub.data.budget}` : ""}
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>
                      {new Date(sub.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: STATUS_COLORS[sub.status] || "white",
                        background: STATUS_BG[sub.status] || "rgba(255,255,255,0.06)",
                        borderRadius: 9999,
                        padding: "3px 10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      flexShrink: 0,
                      transform: isExpanded ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <title>Expand</title>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                        marginBottom: 20,
                      }}
                    >
                      {(
                        [
                          { label: "Full Name", value: sub.data.name },
                          { label: "Email", value: sub.data.email },
                          { label: "Company", value: sub.data.company },
                          { label: "Budget", value: sub.data.budget },
                          { label: "Subject", value: sub.data.subject },
                          { label: "Services", value: sub.data.services?.join(", ") },
                        ] as const
                      )
                        .filter((f) => f.value)
                        .map((field) => (
                          <div
                            key={field.label}
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              borderRadius: 10,
                              padding: "12px 14px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: "rgba(255,255,255,0.3)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                marginBottom: 5,
                              }}
                            >
                              {field.label}
                            </div>
                            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                              {field.value}
                            </div>
                          </div>
                        ))}
                    </div>

                    {sub.data.message && (
                      <div
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          borderRadius: 10,
                          padding: "14px 16px",
                          marginBottom: 20,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.3)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 8,
                          }}
                        >
                          Message
                        </div>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>
                          {sub.data.message}
                        </p>
                      </div>
                    )}

                    {isAlreadyConfirmed && sub.data.calendarLink && (
                      <div
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          border: "1px solid rgba(16,185,129,0.25)",
                          borderRadius: 10,
                          padding: "12px 16px",
                          marginBottom: 20,
                        }}
                      >
                        <p style={{ fontSize: 13, color: "#10B981", margin: 0, fontWeight: 600 }}>
                          ✅ Confirmation sent{" "}
                          {sub.data.confirmedAt
                            ? `on ${new Date(sub.data.confirmedAt).toLocaleDateString("en-GB")}`
                            : ""}
                        </p>
                        <p style={{ fontSize: 12, color: "rgba(16,185,129,0.7)", margin: "4px 0 0" }}>
                          Calendar: {sub.data.calendarLink}
                        </p>
                      </div>
                    )}

                    {isBooking && isConfirming && (
                      <div
                        style={{
                          background: "rgba(96,85,217,0.08)",
                          border: "1px solid rgba(96,85,217,0.25)",
                          borderRadius: 12,
                          padding: "18px",
                          marginBottom: 16,
                        }}
                      >
                        <p style={{ fontSize: 13, fontWeight: 700, color: "#7B6EE8", margin: "0 0 14px" }}>
                          📅 Send calendar confirmation to {sub.data.name || sub.data.email}
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                          <div>
                            <label
                              style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.4)",
                                display: "block",
                                marginBottom: 5,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700,
                              }}
                            >
                              Calendar Link *
                            </label>
                            <input
                              type="url"
                              placeholder="https://calendly.com/puzzlemetrics/30min"
                              value={calendarLink}
                              onChange={(e) => setCalendarLink(e.target.value)}
                              style={inputStyle}
                            />
                          </div>
                          <div>
                            <label
                              style={{
                                fontSize: 11,
                                color: "rgba(255,255,255,0.4)",
                                display: "block",
                                marginBottom: 5,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                                fontWeight: 700,
                              }}
                            >
                              Note to client (optional)
                            </label>
                            <textarea
                              rows={2}
                              placeholder="e.g. Looking forward to speaking with you about your AI project..."
                              value={meetingNotes}
                              onChange={(e) => setMeetingNotes(e.target.value)}
                              style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }}
                            />
                          </div>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <button
                              type="button"
                              onClick={() => confirmBooking(sub.id)}
                              disabled={sendingId === sub.id}
                              style={{
                                padding: "10px 20px",
                                background: "#6055D9",
                                color: "white",
                                border: "none",
                                borderRadius: 9999,
                                fontFamily: "Inter Tight, sans-serif",
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: sendingId === sub.id ? "wait" : "pointer",
                                opacity: sendingId === sub.id ? 0.6 : 1,
                              }}
                            >
                              {sendingId === sub.id ? "Sending…" : "✉ Send confirmation email"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmingId(null)}
                              style={{
                                padding: "10px 16px",
                                background: "transparent",
                                color: "rgba(255,255,255,0.4)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: 9999,
                                fontFamily: "Inter Tight, sans-serif",
                                fontSize: 13,
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      {isBooking && !isConfirming && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmPanel(sub);
                          }}
                          style={{
                            padding: "9px 18px",
                            background: isAlreadyConfirmed ? "rgba(16,185,129,0.1)" : "#6055D9",
                            color: isAlreadyConfirmed ? "#10B981" : "white",
                            border: isAlreadyConfirmed ? "1px solid rgba(16,185,129,0.3)" : "none",
                            borderRadius: 9999,
                            fontFamily: "Inter Tight, sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          {isAlreadyConfirmed ? "✅ Resend confirmation" : "📅 Confirm & send calendar"}
                        </button>
                      )}

                      {(["read", "replied", "archived"] as const).map((s) =>
                        sub.status !== s ? (
                          <button
                            key={s}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              void updateStatus(sub.id, s);
                            }}
                            style={{
                              padding: "9px 16px",
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: 9999,
                              color: "rgba(255,255,255,0.5)",
                              fontFamily: "Inter Tight, sans-serif",
                              fontSize: 12,
                              fontWeight: 500,
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                          >
                            Mark as {s}
                          </button>
                        ) : null,
                      )}

                      <div style={{ flex: 1 }} />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          void deleteSubmission(sub.id);
                        }}
                        disabled={deletingId === sub.id}
                        style={{
                          padding: "9px 16px",
                          background: "rgba(239,68,68,0.08)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: 9999,
                          color: "#EF4444",
                          fontFamily: "Inter Tight, sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          opacity: deletingId === sub.id ? 0.5 : 1,
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}
