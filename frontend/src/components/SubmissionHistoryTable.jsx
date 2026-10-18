"use client";

import { useState } from "react";
import { FileText, Clock, ChevronDown, ChevronUp, History, Lock } from "lucide-react";

export default function SubmissionHistoryTable({ history, loading }) {
  const [expandedId, setExpandedId] = useState(null);

  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading your check-in history...</p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return null;
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getBadgeMeta = (tag) => {
    if (tag === "Positive") return { label: "Positive", className: "badge badge-positive" };
    if (tag === "Negative") return { label: "Stressed / Low", className: "badge badge-negative" };
    return { label: "Neutral / Balanced", className: "badge badge-neutral" };
  };

  const formatSource = (source, filename) => {
    switch (source) {
      case "txt_file":
        return `Note: ${filename || "Uploaded text"}`;
      case "csv_file":
        return `Survey: ${filename || "Uploaded CSV"}`;
      case "pdf_file":
        return `Document: ${filename || "Uploaded PDF"}`;
      default:
        return "Daily Text";
    }
  };

  return (
    <div className="glass-panel" id="submission-history-section" style={{ padding: "2rem", marginTop: "2rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.8rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <History size={20} color="#818cf8" />
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Recent Reflections & Check-in History ({history.length})
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "var(--text-subtle)" }}>
          <Lock size={12} color="#34d399" />
          <span>Encrypted & Private</span>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--bg-card-border)", color: "var(--text-muted)" }}>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Date & Time</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Method</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Reflection Excerpt</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Emotional Tone</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Energy Score</th>
              <th style={{ padding: "12px 14px", fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => {
              const isExpanded = expandedId === item.id;
              const dateStr = new Date(item.created_at).toLocaleString();
              const scores = item.vader_scores || {};
              const badge = getBadgeMeta(item.sentiment_tag);

              return (
                <tr key={item.id} style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  background: isExpanded ? "rgba(99, 102, 241, 0.04)" : "transparent",
                  transition: "background 0.15s ease"
                }}>
                  <td style={{ padding: "14px", whiteSpace: "nowrap", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={13} color="var(--text-subtle)" />
                      <span>{dateStr}</span>
                    </div>
                  </td>

                  <td style={{ padding: "14px", whiteSpace: "nowrap" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      background: "rgba(255, 255, 255, 0.05)",
                      fontSize: "0.78rem"
                    }}>
                      {formatSource(item.source_type, item.source_filename)}
                    </span>
                  </td>

                  <td style={{ padding: "14px", maxWidth: "340px" }}>
                    <div style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "var(--text-main)"
                    }}>
                      {item.preprocessed_text}
                    </div>
                  </td>

                  <td style={{ padding: "14px" }}>
                    <span className={badge.className}>
                      {badge.label}
                    </span>
                  </td>

                  <td style={{ padding: "14px", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                    <span style={{
                      color: item.sentiment_tag === "Positive" ? "#34d399" : item.sentiment_tag === "Negative" ? "#fb7185" : "#38bdf8"
                    }}>
                      {scores.compound !== undefined ? (scores.compound > 0 ? `+${scores.compound.toFixed(2)}` : scores.compound.toFixed(2)) : "0.00"}
                    </span>
                  </td>

                  <td style={{ padding: "14px" }}>
                    <button
                      id={`btn-expand-${item.id}`}
                      onClick={() => toggleExpand(item.id)}
                      className="btn-secondary"
                      style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      <span>{isExpanded ? "Close" : "View"}</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expanded Detail View */}
      {expandedId && (
        (() => {
          const item = history.find((h) => h.id === expandedId);
          if (!item) return null;
          const scores = item.vader_scores || {};

          return (
            <div style={{
              marginTop: "1.5rem",
              padding: "1.5rem",
              background: "rgba(10, 15, 25, 0.95)",
              border: "1px solid rgba(99, 102, 241, 0.25)",
              borderRadius: "var(--radius-md)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#818cf8" }}>
                  Reflection Details
                </h4>
                <div style={{ display: "flex", gap: "12px", fontSize: "0.82rem" }}>
                  <span>Positive: <strong style={{ color: "#34d399" }}>{(scores.pos * 100).toFixed(0)}%</strong></span>
                  <span>Balanced: <strong style={{ color: "#38bdf8" }}>{(scores.neu * 100).toFixed(0)}%</strong></span>
                  <span>Stress: <strong style={{ color: "#fb7185" }}>{(scores.neg * 100).toFixed(0)}%</strong></span>
                </div>
              </div>

              <div style={{
                padding: "14px",
                background: "rgba(0,0,0,0.35)",
                borderRadius: "8px",
                fontSize: "0.88rem",
                lineHeight: 1.6,
                color: "#e2e8f0"
              }}>
                {item.raw_text}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
