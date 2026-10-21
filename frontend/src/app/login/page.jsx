"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { authApi, setAuthToken, setCurrentUser } from "../../lib/api";
import { LogIn, Mail, Lock, AlertCircle, ArrowRight, Heart } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authApi.login(email, password);
      setAuthToken(data.access_token);
      setCurrentUser(data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
        <div className="glass-panel animate-fade-in" style={{
          width: "100%",
          maxWidth: "460px",
          padding: "2.8rem 2.2rem",
          background: "rgba(15, 23, 42, 0.75)"
        }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.2rem"
            }}>
              <Heart size={24} color="#818cf8" />
            </div>
            <h1 style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
              Welcome Back
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
              Sign in to your private MoodMentor space
            </p>
          </div>

          {error && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              background: "rgba(244, 63, 94, 0.1)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              color: "#fb7185",
              fontSize: "0.88rem",
              marginBottom: "1.5rem"
            }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label htmlFor="login-email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                Work Email Address
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "42px" }}
                />
                <Mail size={18} color="var(--text-subtle)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: "42px" }}
                />
                <Lock size={18} color="var(--text-subtle)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              </div>
            </div>

            <button
              id="btn-submit-login"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", padding: "14px", marginTop: "0.6rem" }}
            >
              {loading ? "Signing in..." : "Sign In to Your Space"}
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.88rem", color: "var(--text-muted)" }}>
            New to MoodMentor?{" "}
            <Link href="/register" id="link-to-register" style={{ color: "#818cf8", fontWeight: 600 }}>
              Create an account
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
