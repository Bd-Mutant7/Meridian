import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["Landing", "Portfolio", "Dashboard", "App"];

// ─── tiny sparkline ───────────────────────────────────────────────
function Sparkline({ data, color = "#e8a030", h = 40 }) {
  const w = 120;
  const min = Math.min(...data), max = Math.max(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

// ─── bar chart ────────────────────────────────────────────────────
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, padding: "8px 0" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%", borderRadius: 4,
            height: `${(d.v / max) * 100}px`,
            background: i === data.length - 1
              ? "linear-gradient(180deg,#e8a030,#c47a18)"
              : "linear-gradient(180deg,#2e2e36,#23232b)",
            transition: "height 0.6s cubic-bezier(.4,0,.2,1)",
            border: "1px solid rgba(255,255,255,0.06)"
          }} />
          <span style={{ fontSize: 10, color: "#5a5a6e" }}>{d.l}</span>
        </div>
      ))}
    </div>
  );
}

// ─── donut ────────────────────────────────────────────────────────
function Donut({ segments }) {
  const r = 40, cx = 50, cy = 50, stroke = 12;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const total = segments.reduce((s, x) => s + x.v, 0);
  return (
    <svg width={100} height={100} viewBox="0 0 100 100">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e1e26" strokeWidth={stroke} />
      {segments.map((seg, i) => {
        const dash = (seg.v / total) * circ;
        const gap = circ - dash;
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset + circ * 0.25}
            strokeLinecap="round"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        );
        offset += dash;
        return el;
      })}
    </svg>
  );
}

// ─── LANDING ─────────────────────────────────────────────────────
function Landing() {
  const features = [
    { icon: "◈", title: "Analytics Engine", desc: "Real-time data processing with sub-millisecond latency across distributed nodes." },
    { icon: "⬡", title: "Secure by Default", desc: "End-to-end encryption and zero-knowledge architecture baked into every layer." },
    { icon: "⊕", title: "Team Workflows", desc: "Collaborative tools designed for async teams across every timezone." },
    { icon: "◉", title: "Automation", desc: "Build and deploy intelligent automations without writing a single line of code." },
    { icon: "⬢", title: "Integrations", desc: "Connect to 200+ tools your team already uses, in minutes." },
    { icon: "◌", title: "Global Scale", desc: "Infrastructure that scales from a startup to enterprise without any configuration." },
  ];

  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{ minHeight: "100vh", padding: "0 0 80px" }}>
      {/* Hero */}
      <div style={{
        padding: "100px 48px 80px",
        textAlign: "center",
        maxWidth: 760,
        margin: "0 auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.7s cubic-bezier(.4,0,.2,1)"
      }}>
        <div style={{
          display: "inline-block",
          fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
          color: "#e8a030", background: "rgba(232,160,48,0.1)",
          border: "1px solid rgba(232,160,48,0.25)",
          borderRadius: 99, padding: "5px 16px", marginBottom: 36,
          textTransform: "uppercase"
        }}>Introducing Meridian 2.0</div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 400,
          color: "#f0ede8", lineHeight: 1.12,
          letterSpacing: "-0.02em", margin: "0 0 24px"
        }}>
          The platform that<br />
          <span style={{
            background: "linear-gradient(135deg, #e8a030 0%, #f5c870 50%, #e8a030 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>thinks with you</span>
        </h1>
        <p style={{
          fontSize: 18, color: "#8a8790", lineHeight: 1.7,
          maxWidth: 520, margin: "0 auto 44px"
        }}>
          Meridian unifies your data, your team, and your workflows into one calm,
          intelligent surface — so you can focus on the work that matters.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: "linear-gradient(135deg,#e8a030,#c47a18)",
            border: "none", borderRadius: 10, padding: "14px 32px",
            color: "#0f0f11", fontWeight: 700, fontSize: 15, cursor: "pointer",
            letterSpacing: "0.01em",
            boxShadow: "0 8px 32px rgba(232,160,48,0.3)"
          }}>Get started free</button>
          <button style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10,
            padding: "14px 32px", color: "#c8c4be", fontSize: 15,
            cursor: "pointer", fontWeight: 500
          }}>Watch demo →</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 0,
        maxWidth: 700, margin: "0 auto 80px",
        background: "#161618", border: "1px solid #2a2a2f",
        borderRadius: 16, overflow: "hidden"
      }}>
        {[
          { n: "40M+", l: "Events/day" },
          { n: "99.99%", l: "Uptime SLA" },
          { n: "12ms", l: "Avg latency" },
          { n: "8,400+", l: "Companies" },
        ].map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: "28px 20px", textAlign: "center",
            borderRight: i < 3 ? "1px solid #2a2a2f" : "none"
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#f0ede8", fontFamily: "'DM Serif Display', serif" }}>{s.n}</div>
            <div style={{ fontSize: 12, color: "#5a5a6e", marginTop: 4, letterSpacing: "0.05em" }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Features grid */}
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 16
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            background: "#161618", border: "1px solid #2a2a2f",
            borderRadius: 14, padding: "28px 28px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s cubic-bezier(.4,0,.2,1) ${0.15 + i * 0.07}s`,
            cursor: "default"
          }}>
            <div style={{ fontSize: 24, color: "#e8a030", marginBottom: 14 }}>{f.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#f0ede8", marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: "#6a6a7e", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PORTFOLIO ───────────────────────────────────────────────────
function Portfolio() {
  const [active, setActive] = useState(null);
  const projects = [
    { tag: "Brand Identity", title: "Noma Studio", year: "2024", desc: "Complete visual identity system for a Copenhagen-based architecture firm — wordmark, motion guidelines, and digital presence.", color: "#6b8cde" },
    { tag: "Web Design", title: "Etera Finance", year: "2024", desc: "Product design for a fintech platform serving emerging markets. Focused on clarity, trust, and low-bandwidth performance.", color: "#4ade80" },
    { tag: "Product", title: "Lumen OS", year: "2023", desc: "Operating system UI concept exploring spatial computing and ambient intelligence for ambient work environments.", color: "#e8a030" },
    { tag: "Campaign", title: "Polar Expeditions", year: "2023", desc: "Digital campaign for a climate NGO: interactive data visualizations, editorial photography, and social content system.", color: "#f472b6" },
    { tag: "App Design", title: "Solis Health", year: "2022", desc: "Mobile app for chronic illness management. Built around gentle habit tracking and patient-provider communication.", color: "#a78bfa" },
    { tag: "Exhibition", title: "Fade to Archive", year: "2022", desc: "Interactive installation exploring collective memory through generative typography and ambient sound design.", color: "#22d3ee" },
  ];
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 24px 80px" }}>
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#e8a030", textTransform: "uppercase", marginBottom: 12 }}>Selected Works</p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: "#f0ede8", fontWeight: 400, margin: 0, letterSpacing: "-0.02em" }}>
          Craft over<br />convention.
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid #2a2a2f" }}>
        {projects.map((p, i) => (
          <div key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{
              padding: "28px 0",
              borderBottom: "1px solid #2a2a2f",
              display: "grid",
              gridTemplateColumns: "90px 1fr auto",
              gap: 24, alignItems: "start",
              cursor: "pointer",
              transition: "background 0.2s",
              borderRadius: active === i ? 0 : 0,
              background: active === i ? "rgba(255,255,255,0.015)" : "transparent"
            }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: "0.1em", color: "#5a5a6e", textTransform: "uppercase" }}>{p.year}</span>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{
                  fontSize: 18, fontWeight: 600, color: active === i ? "#f0ede8" : "#c8c4be",
                  fontFamily: "'DM Serif Display', serif",
                  transition: "color 0.2s"
                }}>{p.title}</span>
                <span style={{
                  fontSize: 10, color: p.color, background: `${p.color}18`,
                  border: `1px solid ${p.color}33`,
                  borderRadius: 99, padding: "2px 10px", letterSpacing: "0.06em"
                }}>{p.tag}</span>
              </div>
              <p style={{
                fontSize: 13, color: "#5a5a6e", lineHeight: 1.6, margin: 0,
                maxWidth: 480,
                maxHeight: active === i ? 60 : 0,
                overflow: "hidden",
                opacity: active === i ? 1 : 0,
                transition: "all 0.3s ease"
              }}>{p.desc}</p>
            </div>
            <span style={{
              fontSize: 18, color: active === i ? "#e8a030" : "#2a2a2f",
              transition: "all 0.2s", transform: active === i ? "translateX(0)" : "translateX(-8px)"
            }}>→</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, display: "flex", gap: 16 }}>
        <div style={{
          flex: 1, background: "#161618", border: "1px solid #2a2a2f",
          borderRadius: 14, padding: 28
        }}>
          <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "#5a5a6e", textTransform: "uppercase", marginBottom: 6 }}>Currently available for</p>
          <p style={{ fontSize: 16, color: "#f0ede8", fontWeight: 600, margin: "0 0 16px" }}>Brand & Product Design</p>
          <button style={{
            background: "transparent", border: "1px solid #e8a030",
            borderRadius: 8, padding: "9px 20px", color: "#e8a030",
            fontSize: 13, cursor: "pointer", fontWeight: 500
          }}>Let's talk →</button>
        </div>
        <div style={{
          flex: 2, background: "#161618", border: "1px solid #2a2a2f",
          borderRadius: 14, padding: 28
        }}>
          <p style={{ fontSize: 13, color: "#6a6a7e", lineHeight: 1.7, margin: 0 }}>
            "Working with this studio transformed how we think about our product's
            visual language. The attention to detail and strategic thinking elevated
            every touchpoint." — <strong style={{ color: "#c8c4be" }}>CEO, Etera Finance</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────
function Dashboard() {
  const [tab, setTab] = useState("overview");
  const spark1 = [12, 19, 14, 22, 18, 28, 24, 33, 29, 38, 35, 44];
  const spark2 = [8, 12, 9, 16, 14, 11, 18, 22, 19, 25, 21, 28];
  const spark3 = [55, 60, 58, 63, 67, 62, 70, 68, 74, 72, 78, 80];
  const bars = [
    { l: "Jan", v: 42 }, { l: "Feb", v: 58 }, { l: "Mar", v: 51 },
    { l: "Apr", v: 73 }, { l: "May", v: 67 }, { l: "Jun", v: 89 },
    { l: "Jul", v: 94 },
  ];
  const donutSegs = [
    { v: 44, color: "#e8a030" },
    { v: 28, color: "#6b8cde" },
    { v: 18, color: "#4ade80" },
    { v: 10, color: "#2a2a2f" },
  ];
  const rows = [
    { name: "Acme Corp", plan: "Enterprise", mrr: "$4,200", status: "active", change: "+12%" },
    { name: "Blue Ridge Co", plan: "Growth", mrr: "$890", status: "active", change: "+3%" },
    { name: "Orion Labs", plan: "Starter", mrr: "$290", status: "trial", change: "—" },
    { name: "Vega Systems", plan: "Enterprise", mrr: "$6,100", status: "active", change: "+8%" },
    { name: "Lumi Health", plan: "Growth", mrr: "$1,200", status: "at-risk", change: "-2%" },
  ];
  const statusColor = { active: "#4ade80", trial: "#e8a030", "at-risk": "#f87171" };

  return (
    <div style={{ maxWidth: 1020, margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#f0ede8", fontWeight: 400, margin: "0 0 4px" }}>Analytics</h2>
          <p style={{ fontSize: 13, color: "#5a5a6e", margin: 0 }}>Monday, March 9 · Q1 2026</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["overview", "revenue", "users"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: tab === t ? "rgba(232,160,48,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${tab === t ? "rgba(232,160,48,0.35)" : "#2a2a2f"}`,
              borderRadius: 8, padding: "7px 16px",
              color: tab === t ? "#e8a030" : "#6a6a7e",
              fontSize: 12, cursor: "pointer", fontWeight: 500,
              textTransform: "capitalize", letterSpacing: "0.04em"
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Monthly Revenue", value: "$142,800", sub: "+18.4% vs last month", spark: spark1, color: "#e8a030" },
          { label: "Active Users", value: "28,441", sub: "+2,103 this week", spark: spark2, color: "#6b8cde" },
          { label: "Retention Rate", value: "80.2%", sub: "+2.1pp month-over-month", spark: spark3, color: "#4ade80" },
        ].map((c, i) => (
          <div key={i} style={{
            background: "#161618", border: "1px solid #2a2a2f",
            borderRadius: 14, padding: "22px 22px 18px"
          }}>
            <p style={{ fontSize: 11, color: "#5a5a6e", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>{c.label}</p>
            <p style={{ fontSize: 26, fontWeight: 700, color: "#f0ede8", margin: "0 0 6px", fontFamily: "'DM Serif Display', serif" }}>{c.value}</p>
            <p style={{ fontSize: 11, color: c.color, margin: "0 0 14px" }}>{c.sub}</p>
            <Sparkline data={c.spark} color={c.color} />
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 14, marginBottom: 20 }}>
        <div style={{ background: "#161618", border: "1px solid #2a2a2f", borderRadius: 14, padding: "22px 22px 10px" }}>
          <p style={{ fontSize: 12, color: "#5a5a6e", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>MRR by Month</p>
          <BarChart data={bars} />
        </div>
        <div style={{ background: "#161618", border: "1px solid #2a2a2f", borderRadius: 14, padding: "22px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "#5a5a6e", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 14px", alignSelf: "flex-start" }}>Plan Mix</p>
          <Donut segments={donutSegs} />
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
            {[["Enterprise", "#e8a030", "44%"], ["Growth", "#6b8cde", "28%"], ["Starter", "#4ade80", "18%"]].map(([l, c, p]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
                <span style={{ fontSize: 11, color: "#6a6a7e", flex: 1 }}>{l}</span>
                <span style={{ fontSize: 11, color: "#c8c4be", fontWeight: 600 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#161618", border: "1px solid #2a2a2f", borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #2a2a2f", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "#8a8790", fontWeight: 600, margin: 0 }}>Top Accounts</p>
          <span style={{ fontSize: 11, color: "#e8a030", cursor: "pointer" }}>View all →</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e1e26" }}>
              {["Company", "Plan", "MRR", "Status", "Change"].map(h => (
                <th key={h} style={{ padding: "11px 22px", textAlign: "left", fontSize: 10, color: "#3a3a4e", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: i < rows.length - 1 ? "1px solid #1a1a22" : "none" }}>
                <td style={{ padding: "13px 22px", fontSize: 13, color: "#d0ccc8", fontWeight: 500 }}>{r.name}</td>
                <td style={{ padding: "13px 22px", fontSize: 12, color: "#5a5a6e" }}>{r.plan}</td>
                <td style={{ padding: "13px 22px", fontSize: 13, color: "#f0ede8", fontWeight: 600 }}>{r.mrr}</td>
                <td style={{ padding: "13px 22px" }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                    color: statusColor[r.status],
                    background: `${statusColor[r.status]}18`,
                    border: `1px solid ${statusColor[r.status]}33`,
                    borderRadius: 99, padding: "3px 10px", textTransform: "capitalize"
                  }}>{r.status}</span>
                </td>
                <td style={{ padding: "13px 22px", fontSize: 12, color: r.change.startsWith("+") ? "#4ade80" : r.change === "—" ? "#3a3a4e" : "#f87171", fontWeight: 600 }}>{r.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── APP (tool) ───────────────────────────────────────────────────
function AppTool() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm your AI writing assistant. Paste any text and I'll help you refine, summarize, or expand it." }
  ]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("refine");
  const endRef = useRef(null);

  const modes = [
    { id: "refine", label: "✦ Refine" },
    { id: "summarize", label: "◎ Summarize" },
    { id: "expand", label: "⊕ Expand" },
    { id: "tone", label: "◈ Adjust Tone" },
  ];

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const prompts = {
      refine: `Refine and improve the following text for clarity, flow, and impact. Return only the improved text:\n\n${input}`,
      summarize: `Write a crisp, clear summary of the following text in 2–3 sentences:\n\n${input}`,
      expand: `Thoughtfully expand the following text with relevant detail, examples, and nuance. Keep the same voice:\n\n${input}`,
      tone: `Rewrite the following text in a professional, warm, and confident tone:\n\n${input}`,
    };

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompts[mode] }]
        })
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", text }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Something went wrong. Please try again." }]);
    }
    setLoading(false);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", color: "#e8a030", textTransform: "uppercase", marginBottom: 8 }}>AI Writing Tool</p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#f0ede8", fontWeight: 400, margin: 0 }}>
          Write with intelligence.
        </h2>
      </div>

      {/* Mode selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {modes.map(m => (
          <button key={m.id} onClick={() => setMode(m.id)} style={{
            background: mode === m.id ? "rgba(232,160,48,0.12)" : "#161618",
            border: `1px solid ${mode === m.id ? "rgba(232,160,48,0.4)" : "#2a2a2f"}`,
            borderRadius: 8, padding: "8px 16px",
            color: mode === m.id ? "#e8a030" : "#6a6a7e",
            fontSize: 12, cursor: "pointer", fontWeight: 500,
            transition: "all 0.2s"
          }}>{m.label}</button>
        ))}
      </div>

      {/* Chat window */}
      <div style={{
        background: "#161618", border: "1px solid #2a2a2f",
        borderRadius: 16, overflow: "hidden"
      }}>
        <div style={{ height: 340, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((m, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: m.role === "user" ? "row-reverse" : "row",
              gap: 12, alignItems: "flex-start"
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: m.role === "user" ? "rgba(232,160,48,0.15)" : "rgba(107,140,222,0.15)",
                border: `1px solid ${m.role === "user" ? "rgba(232,160,48,0.3)" : "rgba(107,140,222,0.3)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: m.role === "user" ? "#e8a030" : "#6b8cde"
              }}>
                {m.role === "user" ? "U" : "A"}
              </div>
              <div style={{
                maxWidth: "78%",
                background: m.role === "user" ? "rgba(232,160,48,0.07)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${m.role === "user" ? "rgba(232,160,48,0.15)" : "#2a2a2f"}`,
                borderRadius: 12, padding: "12px 16px",
                fontSize: 13, color: "#c8c4be", lineHeight: 1.65,
                whiteSpace: "pre-wrap"
              }}>{m.text}</div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(107,140,222,0.15)", border: "1px solid rgba(107,140,222,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: "#6b8cde"
              }}>A</div>
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid #2a2a2f",
                borderRadius: 12, padding: "14px 16px", display: "flex", gap: 5, alignItems: "center"
              }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{
                    width: 6, height: 6, borderRadius: "50%", background: "#4a4a5e",
                    animation: "bounce 1.2s infinite",
                    animationDelay: `${j * 0.2}s`
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ borderTop: "1px solid #2a2a2f", padding: 16, display: "flex", gap: 10 }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder={`Paste text to ${mode}... (Enter to send)`}
            style={{
              flex: 1, background: "#0f0f11", border: "1px solid #2a2a2f",
              borderRadius: 10, padding: "11px 14px",
              color: "#c8c4be", fontSize: 13, resize: "none", height: 68,
              outline: "none", fontFamily: "inherit", lineHeight: 1.5
            }}
          />
          <button onClick={send} disabled={loading || !input.trim()} style={{
            background: "linear-gradient(135deg,#e8a030,#c47a18)",
            border: "none", borderRadius: 10, padding: "0 20px",
            color: "#0f0f11", fontWeight: 700, fontSize: 18,
            cursor: loading || !input.trim() ? "not-allowed" : "pointer",
            opacity: loading || !input.trim() ? 0.5 : 1,
            transition: "opacity 0.2s"
          }}>→</button>
        </div>
      </div>

      {/* Tools row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 16 }}>
        {[
          { label: "Word Count", value: input ? input.trim().split(/\s+/).length + " words" : "—" },
          { label: "Reading time", value: input ? Math.ceil(input.trim().split(/\s+/).length / 200) + " min" : "—" },
          { label: "Mode", value: mode.charAt(0).toUpperCase() + mode.slice(1) },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#161618", border: "1px solid #2a2a2f",
            borderRadius: 10, padding: "12px 16px"
          }}>
            <div style={{ fontSize: 10, color: "#3a3a4e", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 15, color: "#e8a030", fontWeight: 600 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Landing");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f11; }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #0f0f11; }
        ::-webkit-scrollbar-thumb { background: #2a2a2f; border-radius: 4px; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#0f0f11",
        fontFamily: "'DM Sans', sans-serif",
        color: "#f0ede8"
      }}>
        {/* Nav */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(15,15,17,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #1e1e26",
          padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 56
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 6,
              background: "linear-gradient(135deg,#e8a030,#c47a18)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#0f0f11" }}>M</span>
            </div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#f0ede8", letterSpacing: "-0.02em" }}>Meridian</span>
          </div>

          <div style={{ display: "flex", gap: 2 }}>
            {NAV_ITEMS.map(n => (
              <button key={n} onClick={() => setPage(n)} style={{
                background: page === n ? "rgba(232,160,48,0.1)" : "transparent",
                border: `1px solid ${page === n ? "rgba(232,160,48,0.25)" : "transparent"}`,
                borderRadius: 7, padding: "6px 14px",
                color: page === n ? "#e8a030" : "#6a6a7e",
                fontSize: 13, cursor: "pointer", fontWeight: 500,
                transition: "all 0.15s"
              }}>{n}</button>
            ))}
          </div>

          <button style={{
            background: "linear-gradient(135deg,#e8a030,#c47a18)",
            border: "none", borderRadius: 8, padding: "7px 18px",
            color: "#0f0f11", fontWeight: 700, fontSize: 12, cursor: "pointer",
            letterSpacing: "0.02em"
          }}>Sign up</button>
        </nav>

        {/* Page content */}
        {page === "Landing" && <Landing />}
        {page === "Portfolio" && <Portfolio />}
        {page === "Dashboard" && <Dashboard />}
        {page === "App" && <AppTool />}

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #1a1a22", padding: "28px 40px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontSize: 12, color: "#3a3a4e" }}>© 2026 Meridian Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy", "Terms", "Status"].map(l => (
              <span key={l} style={{ fontSize: 12, color: "#3a3a4e", cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
