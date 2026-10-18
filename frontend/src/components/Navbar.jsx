"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, removeAuthToken } from "../lib/api";
import { Heart, LogOut, User as UserIcon, LogIn, Sparkles } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
    router.push("/login");
  };

  return (
    <header style={{
      borderBottom: "1px solid var(--bg-card-border)",
      background: "rgba(8, 11, 17, 0.82)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "0 1.5rem"
    }}>
      <div style={{
        maxWidth: "1240px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "72px"
      }}>
        {/* Brand */}
        <Link href="/" id="brand-link" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px rgba(99, 102, 241, 0.45)"
          }}>
            <Heart size={20} color="#ffffff" fill="rgba(255, 255, 255, 0.25)" />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em", color: "#ffffff" }}>
              Aura<span style={{ color: "#818cf8" }}>Wellness</span>
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/#features" id="nav-features" style={{ color: "var(--text-muted)", fontSize: "0.92rem", fontWeight: 500, transition: "color 0.2s" }}>
            Features
          </Link>
          <Link href="/#how-it-works" id="nav-how-it-works" style={{ color: "var(--text-muted)", fontSize: "0.92rem", fontWeight: 500, transition: "color 0.2s" }}>
            How it Works
          </Link>
          <Link href="/#privacy" id="nav-privacy" style={{ color: "var(--text-muted)", fontSize: "0.92rem", fontWeight: 500, transition: "color 0.2s" }}>
            Privacy
          </Link>
          <Link href="/dashboard" id="nav-dashboard" style={{ color: "var(--text-muted)", fontSize: "0.92rem", fontWeight: 500, transition: "color 0.2s" }}>
            Dashboard
          </Link>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginLeft: "0.8rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "0.85rem",
                color: "var(--text-muted)"
              }}>
                <UserIcon size={14} color="#818cf8" />
                <span>{user.email}</span>
              </div>
              <button
                id="btn-logout"
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: "8px 14px", fontSize: "0.85rem" }}
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginLeft: "0.8rem" }}>
              <Link href="/login" id="nav-login" className="btn-secondary" style={{ padding: "8px 18px", fontSize: "0.88rem" }}>
                <LogIn size={15} />
                <span>Sign In</span>
              </Link>
              <Link href="/register" id="nav-register" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.88rem" }}>
                <Sparkles size={15} />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
