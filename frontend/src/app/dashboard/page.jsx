"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import EmotionReportCard from "../../components/EmotionReportCard";
import SubmissionHistoryTable from "../../components/SubmissionHistoryTable";
import { checkinApi, analyticsApi, getAuthToken, getCurrentUser } from "../../lib/api";
import { 
  Send, 
  UploadCloud, 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Heart
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("text"); // "text" or "file"

  // Text Ingestion State
  const [checkinText, setCheckinText] = useState("");
  const [textSubmitting, setTextSubmitting] = useState(false);

  // File Ingestion State
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSubmitting, setFileSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Analytics & History State
  const [report, setReport] = useState(null);
  const [loadingReport, setLoadingReport] = useState(true);

  // Feedback State
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setUser(getCurrentUser());
    loadEmotionReport();
  }, [router]);

  const loadEmotionReport = async () => {
    setLoadingReport(true);
    try {
      const data = await analyticsApi.getEmotionReport();
      setReport(data);
    } catch (err) {
      console.error("Error fetching emotion report:", err);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!checkinText.trim()) return;

    setTextSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await checkinApi.submitText(checkinText);
      const toneLabel = result.sentiment_tag === "Positive" ? "Uplifted" : result.sentiment_tag === "Negative" ? "Needs Attention" : "Balanced";
      setSuccessMessage(
        `Thank you for checking in. Your reflection has been saved and your emotional snapshot updated (${toneLabel}).`
      );
      setCheckinText("");
      await loadEmotionReport();
    } catch (err) {
      setErrorMessage(err.message || "Failed to submit check-in reflection.");
    } finally {
      setTextSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["txt", "csv", "pdf"].includes(ext)) {
        setErrorMessage("Please select a supported document (.txt, .csv, or .pdf).");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setErrorMessage("");
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setFileSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await checkinApi.uploadFile(selectedFile);
      setSuccessMessage(
        `Document '${result.source_filename}' uploaded successfully. Your emotional snapshot has been updated.`
      );
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await loadEmotionReport();
    } catch (err) {
      setErrorMessage(err.message || "Failed to process uploaded document.");
    } finally {
      setFileSubmitting(false);
    }
  };

  const applySamplePrompt = (sample) => {
    setCheckinText(sample);
  };

  return (
    <>
      <Navbar />
      <main style={{ flex: 1, padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto" }}>

          {/* Page Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.2rem",
            marginBottom: "2rem"
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Heart size={20} color="#818cf8" />
                <h1 style={{ fontSize: "2.1rem", fontWeight: 800, letterSpacing: "-0.025em" }}>
                  Your Daily Space
                </h1>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                Share your reflections, check in with yourself, and view your personal emotional well-being trends.
              </p>
            </div>

            <button
              id="btn-refresh-report"
              onClick={loadEmotionReport}
              className="btn-secondary"
              style={{ padding: "9px 18px", fontSize: "0.85rem" }}
              title="Refresh Your Emotional Snapshot"
            >
              <RefreshCw size={15} />
              <span>Refresh Insights</span>
            </button>
          </div>

          {/* Feedback Banners */}
          {successMessage && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 18px",
              borderRadius: "var(--radius-md)",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              fontSize: "0.92rem",
              marginBottom: "1.8rem"
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 18px",
              borderRadius: "var(--radius-md)",
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#fb7185",
              fontSize: "0.92rem",
              marginBottom: "1.8rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Ingestion Panel (Text + Document Upload) */}
          <div className="glass-panel" style={{ padding: "2.2rem", marginBottom: "2.5rem" }}>
            
            {/* Tabs for Ingestion Mode */}
            <div style={{
              display: "flex",
              gap: "0.8rem",
              borderBottom: "1px solid var(--bg-card-border)",
              paddingBottom: "1.2rem",
              marginBottom: "1.8rem"
            }}>
              <button
                id="tab-direct-text"
                onClick={() => setActiveTab("text")}
                style={{
                  background: activeTab === "text" ? "rgba(99, 102, 241, 0.16)" : "transparent",
                  color: activeTab === "text" ? "#a5b4fc" : "var(--text-muted)",
                  border: activeTab === "text" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                  padding: "9px 20px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease"
                }}
              >
                <Send size={16} />
                <span>Daily Reflection</span>
              </button>

              <button
                id="tab-file-upload"
                onClick={() => setActiveTab("file")}
                style={{
                  background: activeTab === "file" ? "rgba(99, 102, 241, 0.16)" : "transparent",
                  color: activeTab === "file" ? "#a5b4fc" : "var(--text-muted)",
                  border: activeTab === "file" ? "1px solid rgba(99, 102, 241, 0.4)" : "1px solid transparent",
                  padding: "9px 20px",
                  borderRadius: "var(--radius-md)",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.2s ease"
                }}
              >
                <UploadCloud size={16} />
                <span>Upload Notes / Documents</span>
              </button>
            </div>

            {/* Mode 1: Daily Reflection Text */}
            {activeTab === "text" && (
              <form onSubmit={handleTextSubmit}>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label htmlFor="checkin-textarea" style={{ display: "block", fontSize: "0.92rem", fontWeight: 600, marginBottom: "0.6rem" }}>
                    How are you feeling about work, workload, and team collaboration today?
                  </label>
                  <textarea
                    id="checkin-textarea"
                    rows={4}
                    required
                    value={checkinText}
                    onChange={(e) => setCheckinText(e.target.value)}
                    placeholder="Write freely about what is going well, what feels challenging, or how energized you feel..."
                    className="form-textarea"
                    style={{ resize: "vertical", minHeight: "120px" }}
                  />
                </div>

                {/* Quick Prompts */}
                <div style={{ marginBottom: "1.8rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-subtle)", display: "block", marginBottom: "8px" }}>
                    Prompt Ideas:
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    <button
                      type="button"
                      id="sample-positive-btn"
                      onClick={() => applySamplePrompt("Feeling energized and proud of the teamwork on our release today! Everyone communicated openly and supported each other.")}
                      style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", color: "#34d399", padding: "5px 12px", borderRadius: "9999px", fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Feeling energized & supported
                    </button>
                    <button
                      type="button"
                      id="sample-neutral-btn"
                      onClick={() => applySamplePrompt("Completed the scheduled sprint planning tasks and answered follow-up questions. A standard, focused workday.")}
                      style={{ background: "rgba(56, 189, 248, 0.08)", border: "1px solid rgba(56, 189, 248, 0.25)", color: "#38bdf8", padding: "5px 12px", borderRadius: "9999px", fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Steady & focused workday
                    </button>
                    <button
                      type="button"
                      id="sample-negative-btn"
                      onClick={() => applySamplePrompt("Feeling quite drained and anxious about the upcoming deadline. A lot of context switching is making it hard to focus.")}
                      style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.25)", color: "#fb7185", padding: "5px 12px", borderRadius: "9999px", fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      Stretched thin & need a breather
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    id="btn-submit-text"
                    type="submit"
                    disabled={textSubmitting || !checkinText.trim()}
                    className="btn-primary"
                    style={{ padding: "12px 26px" }}
                  >
                    <Sparkles size={16} />
                    <span>{textSubmitting ? "Understanding Reflection..." : "Save Daily Check-in"}</span>
                  </button>
                </div>
              </form>
            )}

            {/* Mode 2: Document Upload (.txt, .csv, .pdf) */}
            {activeTab === "file" && (
              <form onSubmit={handleFileSubmit}>
                <div
                  id="drop-zone-container"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: "2px dashed rgba(99, 102, 241, 0.35)",
                    borderRadius: "var(--radius-lg)",
                    padding: "3.2rem 1.5rem",
                    textAlign: "center",
                    cursor: "pointer",
                    background: selectedFile ? "rgba(99, 102, 241, 0.08)" : "rgba(13, 18, 29, 0.5)",
                    transition: "all 0.2s ease",
                    marginBottom: "1.5rem"
                  }}
                >
                  <input
                    ref={fileInputRef}
                    id="file-upload-input"
                    type="file"
                    accept=".txt,.csv,.pdf"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />

                  <UploadCloud size={46} color="#818cf8" style={{ margin: "0 auto 1rem" }} />
                  
                  {selectedFile ? (
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#e2e8f0" }}>
                        Selected: {selectedFile.name}
                      </div>
                      <div style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        {(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                        Click to select or drag and drop reflection notes
                      </div>
                      <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                        Supports <strong>.txt</strong> notes, <strong>.csv</strong> survey tables, and <strong>.pdf</strong> documents
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "1.8rem", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    <FileText size={15} color="#818cf8" /> Plain Text (.txt)
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    <FileSpreadsheet size={15} color="#34d399" /> Survey Exports (.csv)
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                    <FileCode size={15} color="#fb7185" /> Summaries (.pdf)
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    id="btn-submit-file"
                    type="submit"
                    disabled={fileSubmitting || !selectedFile}
                    className="btn-primary"
                    style={{ padding: "12px 26px" }}
                  >
                    <UploadCloud size={16} />
                    <span>{fileSubmitting ? "Reading Document..." : "Upload & Reflect"}</span>
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Emotional Snapshot Card */}
          <EmotionReportCard report={report} loading={loadingReport} />

          {/* Recent Reflections Table */}
          {report && report.history && (
            <SubmissionHistoryTable history={report.history} loading={loadingReport} />
          )}

        </div>
      </main>
    </>
  );
}
