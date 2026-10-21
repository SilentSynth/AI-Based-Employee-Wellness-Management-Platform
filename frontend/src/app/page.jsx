import Link from "next/link";
import Navbar from "../components/Navbar";
import { 
  ArrowRight, 
  Heart, 
  Smile, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  TrendingUp, 
  Lock, 
  Users, 
  CheckCircle2, 
  EyeOff
} from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          {/* Hero Section */}
          <section style={{ textAlign: "center", padding: "5rem 1rem 4rem" }}>
            
            {/* Pill Tag */}
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px", 
              padding: "6px 18px", 
              borderRadius: "9999px", 
              background: "rgba(99, 102, 241, 0.12)", 
              border: "1px solid rgba(99, 102, 241, 0.28)", 
              marginBottom: "1.8rem" 
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6366f1" }} className="pulse-glow" />
              <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a5b4fc", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                A GENTLER WAY TO CHECK IN
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: "clamp(2.5rem, 5.2vw, 4.4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              maxWidth: "880px",
              margin: "0 auto 1.5rem",
              background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 45%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Understand team sentiment. Support your people.
            </h1>

            {/* Sub-headline */}
            <p style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "var(--text-muted)",
              maxWidth: "680px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.65,
              fontWeight: 400
            }}>
              A private, intelligent space for employees to share reflections, track emotional well-being, and build healthier workplace habits.
            </p>

            {/* Primary CTAs */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
              <Link href="/dashboard" id="hero-cta-checkin" className="btn-primary" style={{ padding: "14px 30px", fontSize: "1.05rem" }}>
                <span>Start Daily Check-in</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard" id="hero-cta-dashboard" className="btn-secondary" style={{ padding: "14px 30px", fontSize: "1.05rem" }}>
                <span>Explore Dashboard</span>
              </Link>
            </div>

            {/* Trust and Values Row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.2rem",
              maxWidth: "980px",
              margin: "0 auto 4.5rem"
            }}>
              <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
                  <Heart size={20} color="#34d399" />
                  <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Safe & Confidential</span>
                </div>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  Your reflections are treated with the highest standard of privacy and respect.
                </div>
              </div>

              <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
                  <Sparkles size={20} color="#818cf8" />
                  <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Empathetic Intelligence</span>
                </div>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  Gentle, instant emotional tone insights that help you reflect without judgment.
                </div>
              </div>

              <div className="glass-panel" style={{ padding: "1.5rem", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
                  <TrendingUp size={20} color="#38bdf8" />
                  <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Continuous Care</span>
                </div>
                <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                  Notice shifts in stress or positivity over time before burnout occurs.
                </div>
              </div>
            </div>

          </section>

          {/* Section: Features */}
          <section id="features" style={{ padding: "2rem 0 5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#818cf8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Designed For People
              </div>
              <h2 style={{ fontSize: "2.1rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.02em" }}>
                Thoughtfully crafted for everyday well-being
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "560px", margin: "0 auto" }}>
                Everything you need to voice your experience and cultivate a balanced, supportive workplace culture.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.6rem"
            }}>
              {/* Feature 1 */}
              <div className="glass-panel" style={{ padding: "2.2rem" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background: "rgba(99, 102, 241, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.4rem"
                }}>
                  <MessageSquare size={24} color="#818cf8" />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                  Seamless Check-ins
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.65, marginBottom: "1.2rem" }}>
                  Share quick daily thoughts via direct text or upload notes from documents seamlessly. No tedious surveys or rigid multiple-choice forms.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#a5b4fc", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#818cf8" /> Freeform expression anytime
                </div>
              </div>

              {/* Feature 2 */}
              <div className="glass-panel" style={{ padding: "2.2rem" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background: "rgba(6, 182, 212, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.4rem"
                }}>
                  <Sparkles size={24} color="#06b6d4" />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                  Instant Tone Insights
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.65, marginBottom: "1.2rem" }}>
                  Automatically understand emotional tone, energy levels, and mood shifts in real time. Gain instant perspective on how you are really feeling.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#67e8f9", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#06b6d4" /> Calm, objective feedback
                </div>
              </div>

              {/* Feature 3 */}
              <div className="glass-panel" style={{ padding: "2.2rem" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "14px",
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.4rem"
                }}>
                  <ShieldCheck size={24} color="#10b981" />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.6rem" }}>
                  Private & Secure Analytics
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.94rem", lineHeight: 1.65, marginBottom: "1.2rem" }}>
                  Track wellness trends over time with end-to-end privacy and enterprise-grade data security. Built around employee trust from day one.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#6ee7b7", fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="#10b981" /> Confidential longitudinal trends
                </div>
              </div>
            </div>
          </section>

          {/* Section: How it Works */}
          <section id="how-it-works" style={{ padding: "3rem 0 5rem" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                Simple Workflow
              </div>
              <h2 style={{ fontSize: "2.1rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.02em" }}>
                How MoodMentor Works
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "540px", margin: "0 auto" }}>
                Three intuitive steps to foster emotional awareness and mutual workplace support.
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}>
              <div className="glass-panel" style={{ padding: "2rem", position: "relative" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "rgba(99, 102, 241, 0.3)", marginBottom: "0.5rem" }}>01</div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Express Freely</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  Write a candid update about your day or attach reflections from notes or journals. Express workload, wins, or challenges in your own words.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: "2rem", position: "relative" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "rgba(6, 182, 212, 0.3)", marginBottom: "0.5rem" }}>02</div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Thoughtful Understanding</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  Our gentle intelligence analyzes underlying sentiment, clarifying positivity, neutrality, or signs of elevated strain with nuanced care.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: "2rem", position: "relative" }}>
                <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "rgba(16, 185, 129, 0.3)", marginBottom: "0.5rem" }}>03</div>
                <h4 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Nurture Well-being</h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  Review your personalized Emotional Snapshot and historical trends, helping you and your leaders build a supportive workplace atmosphere.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Privacy Commitment */}
          <section id="privacy" className="glass-panel" style={{
            padding: "3.5rem 2.5rem",
            marginBottom: "4.5rem",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.25)"
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem", alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "4px 12px", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.12)", border: "1px solid rgba(16, 185, 129, 0.3)", marginBottom: "1rem" }}>
                  <Lock size={14} color="#34d399" />
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase" }}>Privacy First Promise</span>
                </div>
                <h3 style={{ fontSize: "1.9rem", fontWeight: 800, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
                  Your well-being data belongs to you.
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.96rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  MoodMentor is designed to support individuals, not monitor them. Submissions are encrypted, reflections are private, and aggregated insights are used solely to foster organizational empathy and balanced workloads.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#e2e8f0" }}>
                    <CheckCircle2 size={18} color="#34d399" /> Zero intrusive keystroke monitoring or surveillance
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#e2e8f0" }}>
                    <CheckCircle2 size={18} color="#34d399" /> Enterprise-grade cryptographic security
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "#e2e8f0" }}>
                    <CheckCircle2 size={18} color="#34d399" /> Full personal control over historical check-in records
                  </div>
                </div>
              </div>

              <div style={{
                background: "rgba(8, 11, 17, 0.6)",
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--bg-card-border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(99, 102, 241, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <EyeOff size={22} color="#818cf8" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>Confidential by Design</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Built on ethical workplace principles</div>
                  </div>
                </div>
                <blockquote style={{ fontSize: "0.94rem", color: "var(--text-muted)", fontStyle: "italic", lineHeight: 1.7, borderLeft: "3px solid #818cf8", paddingLeft: "1rem" }}>
                  &ldquo;A healthy organization begins with genuine listening. MoodMentor provides a quiet sanctuary where voices can be heard and respected without fear of evaluation.&rdquo;
                </blockquote>
              </div>
            </div>
          </section>

          {/* Bottom Banner */}
          <section className="glass-panel" style={{
            padding: "3.5rem 2rem",
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            marginBottom: "3rem"
          }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.8rem", letterSpacing: "-0.02em" }}>
              Take a mindful moment for yourself today.
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "580px", margin: "0 auto 2rem", fontSize: "0.96rem", lineHeight: 1.6 }}>
              Join thousands of team members using MoodMentor to check in, reflect, and stay attuned to their mental wellness.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/register" id="banner-cta-register" className="btn-primary" style={{ padding: "12px 28px" }}>
                Create Free Account
              </Link>
              <Link href="/login" id="banner-cta-login" className="btn-secondary" style={{ padding: "12px 28px" }}>
                Sign In
              </Link>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--bg-card-border)",
        padding: "2.2rem 1.5rem",
        textAlign: "center",
        color: "var(--text-subtle)",
        fontSize: "0.88rem"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Heart size={16} color="#818cf8" />
            <span style={{ fontWeight: 600, color: "var(--text-muted)" }}>MoodMentor</span>
          </div>
          <div>
            © 2026 MoodMentor Inc. All rights reserved. • Privacy Policy • Terms of Service
          </div>
        </div>
      </footer>
    </>
  );
}
