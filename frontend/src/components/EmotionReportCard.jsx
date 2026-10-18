"use client";

import { Smile, Meh, Frown, Sparkles, Activity } from "lucide-react";

export default function EmotionReportCard({ report, loading }) {
  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
        <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Gathering your latest wellness reflections...
        </div>
      </div>
    );
  }

  if (!report || report.total_submissions === 0) {
    return (
      <div className="glass-panel" style={{ padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "rgba(99, 102, 241, 0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.2rem"
        }}>
          <Sparkles size={24} color="#818cf8" />
        </div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          Welcome to Your Emotional Space
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "440px", margin: "0 auto", lineHeight: 1.6 }}>
          Take a quiet moment to share how work and collaboration feel today, or upload notes above to generate your first Emotional Snapshot.
        </p>
      </div>
    );
  }

  const { overall_sentiment_tag, average_scores, total_submissions, positive_count, neutral_count, negative_count } = report;

  // Sentiment styling helper
  const getTagMeta = (tag) => {
    switch (tag) {
      case "Positive":
        return {
          icon: <Smile size={20} color="#34d399" />,
          color: "#34d399",
          label: "Uplifted & Engaged",
          badgeClass: "badge-positive",
          bgGlow: "rgba(16, 185, 129, 0.12)",
          description: "Your recent reflections reflect high optimism, healthy momentum, and strong team satisfaction."
        };
      case "Negative":
        return {
          icon: <Frown size={20} color="#fb7185" />,
          color: "#fb7185",
          label: "Needs Support & Care",
          badgeClass: "badge-negative",
          bgGlow: "rgba(244, 63, 94, 0.12)",
          description: "Elevated indicators of stress, fatigue, or friction detected. Consider stepping back or seeking team support."
        };
      default:
        return {
          icon: <Meh size={20} color="#38bdf8" />,
          color: "#38bdf8",
          label: "Balanced & Calm",
          badgeClass: "badge-neutral",
          bgGlow: "rgba(56, 189, 248, 0.12)",
          description: "Your reflections show a steady, objective, and grounded workplace experience."
        };
    }
  };

  const meta = getTagMeta(overall_sentiment_tag);

  // Normalize compound from [-1, 1] to [0, 100]% for visual bar
  const compoundPercent = Math.max(0, Math.min(100, ((average_scores.compound + 1) / 2) * 100));

  return (
    <div className="glass-panel animate-fade-in" id="emotional-snapshot-card" style={{ padding: "2.2rem" }}>
      
      {/* Header with Title and Overall Sentiment Tag */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.2rem",
        marginBottom: "2rem",
        borderBottom: "1px solid var(--bg-card-border)",
        paddingBottom: "1.5rem"
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <Sparkles size={22} color="#818cf8" />
            <h2 style={{ fontSize: "1.45rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
              Emotional Snapshot
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            A clear summary of your emotional tone and workplace well-being
          </p>
        </div>

        {/* Overall Sentiment Badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: meta.bgGlow,
          padding: "8px 18px",
          borderRadius: "9999px",
          border: `1px solid ${meta.color}40`
        }}>
          {meta.icon}
          <div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Current Wellness State
            </span>
            <span style={{ fontWeight: 700, fontSize: "0.98rem", color: meta.color }}>
              {meta.label}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Energy Level + Tone Breakdown */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
        gap: "2rem",
        marginBottom: "2.2rem"
      }}>
        
        {/* Emotional Valence Card */}
        <div style={{
          background: "rgba(13, 18, 29, 0.6)",
          padding: "1.6rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--bg-card-border)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
            <span style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 600 }}>
              Emotional Energy Index
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: meta.color
            }}>
              {average_scores.compound > 0 ? `+${average_scores.compound.toFixed(2)}` : average_scores.compound.toFixed(2)}
            </span>
          </div>

          {/* Progress Bar from Strained to Uplifted */}
          <div style={{
            position: "relative",
            height: "10px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "9999px",
            overflow: "hidden",
            marginBottom: "0.8rem"
          }}>
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${compoundPercent}%`,
              background: `linear-gradient(90deg, #f43f5e 0%, #38bdf8 50%, #10b981 100%)`,
              borderRadius: "9999px",
              transition: "width 0.5s ease"
            }} />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 500 }}>
            <span>Strained (-1.0)</span>
            <span>Balanced (0.0)</span>
            <span>Uplifted (+1.0)</span>
          </div>

          <p style={{ marginTop: "1.2rem", fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {meta.description}
          </p>
        </div>

        {/* Tone Breakdown */}
        <div style={{
          background: "rgba(13, 18, 29, 0.6)",
          padding: "1.6rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--bg-card-border)"
        }}>
          <h4 style={{ fontSize: "0.88rem", color: "var(--text-muted)", fontWeight: 600, marginBottom: "1.2rem" }}>
            Emotional Tone Breakdown
          </h4>

          {/* Positive Bar */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#34d399", fontWeight: 600 }}>Positive & Uplifting</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#34d399" }}>
                {(average_scores.pos * 100).toFixed(0)}%
              </span>
            </div>
            <div style={{ height: "8px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(100, average_scores.pos * 100)}%`, background: "#10b981", borderRadius: "9999px" }} />
            </div>
          </div>

          {/* Neutral Bar */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#38bdf8", fontWeight: 600 }}>Calm & Objective</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#38bdf8" }}>
                {(average_scores.neu * 100).toFixed(0)}%
              </span>
            </div>
            <div style={{ height: "8px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(100, average_scores.neu * 100)}%`, background: "#06b6d4", borderRadius: "9999px" }} />
            </div>
          </div>

          {/* Negative Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
              <span style={{ color: "#fb7185", fontWeight: 600 }}>Stress & Concern Indicators</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "#fb7185" }}>
                {(average_scores.neg * 100).toFixed(0)}%
              </span>
            </div>
            <div style={{ height: "8px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(100, average_scores.neg * 100)}%`, background: "#f43f5e", borderRadius: "9999px" }} />
            </div>
          </div>
        </div>

      </div>

      {/* Aggregate Counts Summary Pills */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: "1rem"
      }}>
        <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "12px", borderRadius: "var(--radius-sm)", textAlign: "center", border: "1px solid var(--bg-card-border)" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-subtle)", textTransform: "uppercase" }}>Total Reflections</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, marginTop: "2px" }}>{total_submissions}</div>
        </div>
        <div style={{ background: "rgba(16, 185, 129, 0.05)", padding: "12px", borderRadius: "var(--radius-sm)", textAlign: "center", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
          <div style={{ fontSize: "0.75rem", color: "#34d399", textTransform: "uppercase" }}>Positive Days</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#34d399", marginTop: "2px" }}>{positive_count}</div>
        </div>
        <div style={{ background: "rgba(56, 189, 248, 0.05)", padding: "12px", borderRadius: "var(--radius-sm)", textAlign: "center", border: "1px solid rgba(56, 189, 248, 0.2)" }}>
          <div style={{ fontSize: "0.75rem", color: "#38bdf8", textTransform: "uppercase" }}>Balanced Days</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#38bdf8", marginTop: "2px" }}>{neutral_count}</div>
        </div>
        <div style={{ background: "rgba(244, 63, 94, 0.05)", padding: "12px", borderRadius: "var(--radius-sm)", textAlign: "center", border: "1px solid rgba(244, 63, 94, 0.2)" }}>
          <div style={{ fontSize: "0.75rem", color: "#fb7185", textTransform: "uppercase" }}>Needs Attention</div>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fb7185", marginTop: "2px" }}>{negative_count}</div>
        </div>
      </div>

    </div>
  );
}
