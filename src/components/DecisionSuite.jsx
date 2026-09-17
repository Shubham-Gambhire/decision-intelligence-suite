import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import "../styles/suite.css";
import suiteLogo from "../assets/decision-intelligence-suite-logo.png.asset.json";

/* ---------------------------------------------------------
   INLINE ICONS (Lucide-compatible paths, visual parity)
--------------------------------------------------------- */
const Icon = ({ children, size = 24, color = "currentColor", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>{children}</svg>
);
const Gauge = (p) => <Icon {...p}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></Icon>;
const Table2 = (p) => <Icon {...p}><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></Icon>;
const Fingerprint = (p) => <Icon {...p}><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></Icon>;
const Zap = (p) => <Icon {...p}><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></Icon>;
const SlidersHorizontal = (p) => <Icon {...p}><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></Icon>;
const BookOpen = (p) => <Icon {...p}><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></Icon>;
const AlertTriangle = (p) => <Icon {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></Icon>;
const XCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></Icon>;
const X = (p) => <Icon {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>;
const Plus = (p) => <Icon {...p}><path d="M5 12h14"/><path d="M12 5v14"/></Icon>;
const RotateCcw = (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></Icon>;
const Info = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></Icon>;
const Target = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Icon>;
const Compass = (p) => <Icon {...p}><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/><circle cx="12" cy="12" r="10"/></Icon>;
const ScrollText = (p) => <Icon {...p}><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></Icon>;
const Save = (p) => <Icon {...p}><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></Icon>;
const ArrowUpRight = (p) => <Icon {...p}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></Icon>;
const ChevronRight = (p) => <Icon {...p}><path d="m9 18 6-6-6-6"/></Icon>;
const CheckCircle2 = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Icon>;
const HelpCircle = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></Icon>;
const Download = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></Icon>;
const Upload = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></Icon>;

/* ---------------------------------------------------------
   DESIGN TOKENS - unchanged
--------------------------------------------------------- */
const C = {
  bg: "var(--suite-canvas)",
  panel: "var(--suite-panel)",
  panelRaised: "var(--suite-field)",
  panelTint: "var(--suite-accent-soft)",
  border: "var(--suite-border)",
  borderSoft: "var(--suite-border-soft)",
  ink: "var(--suite-ink)",
  inkMuted: "var(--suite-ink-muted)",
  inkFaint: "var(--suite-ink-faint)",
  rust: "var(--suite-alert)",
  amber: "var(--suite-ink-muted)",
  slate: "var(--suite-accent)",
  moss: "var(--suite-accent)",
};

const F_DISPLAY = "'Playfair Display', serif";
const F_LABEL = "'Inter', sans-serif";
const F_BODY = "'Inter', sans-serif";
const F_MONO = "'JetBrains Mono', monospace";

/* ---------------------------------------------------------
   SCENARIO DATA - unchanged defaults
--------------------------------------------------------- */
const COMPANY = "Thistlewood Foods";
const DIVISION = "Specialty Confections";
const DECISION_NAME = "Festive Allocation Decision";

const DEFAULT_OPTIONS = [
  { id: "protect", name: "Protect Core Accounts", short: "Protect Core",
    desc: "Hold festive capacity for long-standing wholesale partners with existing volume commitments." },
  { id: "surge", name: "Capture Surge Demand", short: "Capture Surge",
    desc: "Redirect capacity toward an unplanned demand spike outside the committed order book." },
];

const DEFAULT_SCENARIOS = [
  { id: "base", name: "Base Case", probability: 25,
    trigger: "Current plan assumptions hold - no material disruption to supply, logistics, or regulation.",
    values: { protect: 514.7, surge: 1686.5 } },
  { id: "rawmat", name: "Raw Material Shock", probability: 20,
    trigger: "A key input, sourced from two concentrated origins, faces a sudden shortfall and a spot-price spike.",
    values: { protect: 430.2, surge: 612.4 } },
  { id: "logistics", name: "Logistics Corridor Disruption", probability: 20,
    trigger: "A primary shipping corridor becomes unusable; industry-wide rerouting extends lead times for weeks.",
    values: { protect: 468.9, surge: 381.6 } },
  { id: "regulatory", name: "Regulatory Disruption", probability: 15,
    trigger: "A cross-border rule restricts a specialty ingredient, forcing reformulation of several SKUs.",
    values: { protect: 501.3, surge: 349.8 } },
  { id: "compound", name: "Compound Shock", probability: 20,
    trigger: "Raw Material Shock and Logistics Corridor Disruption occur together - the correlated case.",
    values: { protect: 276.5, surge: 142.1 } },
];

const DEFAULT_FACTORS = [
  { id: "f1", name: "Core Partner Trust", type: "hard", impact: "High", confidence: "High", reversibility: "Irreversible",
    evidence: "Long-standing wholesale partners have already logged festive pre-orders and volume commitments for the season.",
    violates: { protect: false, surge: true }, active: false },
  { id: "f2", name: "Contractual Festive Fill-Rate", type: "hard", impact: "High", confidence: "High", reversibility: "Irreversible",
    evidence: "Two strategic distributors carry contractual minimum fill-rate clauses, with financial penalties for shortfall.",
    violates: { protect: false, surge: true }, active: false },
  { id: "f3", name: "Brand Momentum from Surge", type: "soft", impact: "Medium", confidence: "High", reversibility: "Partially reversible",
    evidence: "Search and mention volume for the trend has held steady for three consecutive weeks - a stronger signal than a single viral spike, though the impact on sustained sales is still Medium rather than certain.",
    favors: "surge" },
  { id: "f4", name: "Competitor Shelf-Space Capture", type: "contextual", impact: "High", confidence: "Medium", reversibility: "Irreversible",
    evidence: "If the surge window is missed, regional competitors are expected to fill the shelf space and keep it." },
  { id: "f5", name: "Regulatory Reformulation Exposure", type: "contextual", impact: "Medium", confidence: "Medium", reversibility: "Partially reversible",
    evidence: "Several SKUs would need reformulation and re-approval if the affected ingredient becomes restricted." },
  { id: "f6", name: "Workforce Overtime Strain", type: "contextual", impact: "Low", confidence: "Medium", reversibility: "Reversible",
    evidence: "Meeting full surge volume would require sustained overtime at two plants through peak season." },
];

const STORAGE_KEY = "decision-robustness-full-state-v1";
const STORAGE_VERSION = 1;

const NEV_BASE = 514.7;
const NEV_SLOPE = 0.21305;
const TOTAL_CAPACITY = 18316;
const MAX_SURGE = 5500;

function nevForQs(qs) { return NEV_BASE + NEV_SLOPE * qs; }
function qcForQs(qs) { return TOTAL_CAPACITY - qs; }

const IMPACT_LEVELS = ["Low", "Medium", "High"];
const CONF_LEVELS = ["Low", "Medium", "High"];
const REV_LEVELS = ["Reversible", "Partially reversible", "Irreversible"];
const TYPE_META = {
  hard: { label: "Hard Constraint", color: C.rust, blurb: "Enters the math directly - can disqualify an option outright." },
  soft: { label: "Soft Preference", color: C.amber, blurb: "Nudges the robustness-adjusted position, scaled by the Strategic Weight in Settings." },
  contextual: { label: "Contextual", color: C.slate, blurb: "Displayed for judgment only - never enters the math." },
};

function impactWeight(impact) { return impact === "High" ? 1 : impact === "Medium" ? 0.6 : 0.3; }
function confidenceWeight(confidence) { return confidence === "High" ? 1 : confidence === "Medium" ? 0.7 : 0.4; }
function reversibilityWeight(rev) {
  if (rev === "Irreversible") return 1;
  if (rev === "Partially reversible") return 0.7;
  return 0.4; // Reversible
}
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function safeNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

/* ---------------------------------------------------------
   PURE METRICS ENGINE (extracted, testable)
--------------------------------------------------------- */
function computeMetrics(scenarios, options) {
  const list = Array.isArray(scenarios) ? scenarios : [];
  const opts = Array.isArray(options) ? options : [];
  const totalProb = list.reduce((a, s) => a + Math.max(0, safeNum(s.probability)), 0) || 1;

  const result = {};
  opts.forEach((o) => {
    result[o.id] = {
      ev: 0, winProb: 0, worst: Infinity, worstScenario: null,
      worstRegret: -Infinity, worstRegretScenario: null, rows: [],
    };
  });

  list.forEach((s) => {
    const prob = Math.max(0, safeNum(s.probability)) / totalProb;
    const vals = opts.map((o) => ({ id: o.id, v: safeNum(s.values?.[o.id]) }));
    if (vals.length === 0) return;
    const best = Math.max(...vals.map((v) => v.v));
    const tied = vals.filter((v) => v.v === best);
    const share = tied.length > 0 ? 1 / tied.length : 0;

    vals.forEach((v) => {
      const r = result[v.id];
      if (!r) return;
      r.ev += v.v * prob;
      if (v.v === best) {
        r.winProb += (Math.max(0, safeNum(s.probability)) * share);
      }
      if (v.v < r.worst) { r.worst = v.v; r.worstScenario = s.id; }
      const regret = best - v.v;
      if (regret > r.worstRegret) { r.worstRegret = regret; r.worstRegretScenario = s.id; }
      r.rows.push({ scenarioId: s.id, name: s.name, value: v.v, regret, isBest: v.v === best });
    });
  });

  opts.forEach((o) => {
    const r = result[o.id];
    if (!r) return;
    if (!isFinite(r.worst)) r.worst = 0;
    if (!isFinite(r.worstRegret)) r.worstRegret = 0;
    // winProb is stored as raw percentage points (0-100 scale) for display consistency
  });
  return result;
}

function computeDisqualified(factors) {
  const list = Array.isArray(factors) ? factors : [];
  return {
    protect: list.some((f) => f.type === "hard" && f.active && f.violates?.protect),
    surge: list.some((f) => f.type === "hard" && f.active && f.violates?.surge),
  };
}

function computeDerived({ metrics, factors, riskPosture, softWeight, disqualified, financialOptimumId, options }) {
  const evP = safeNum(metrics?.protect?.ev);
  const evS = safeNum(metrics?.surge?.ev);
  const worstP = safeNum(metrics?.protect?.worst);
  const worstS = safeNum(metrics?.surge?.worst);

  const tiltEV = clamp((evS - evP) / ((Math.abs(evS) + Math.abs(evP)) || 1), -1, 1);
  const tiltWorst = clamp((worstS - worstP) / ((Math.abs(worstS) + Math.abs(worstP)) || 1), -1, 1);

  let netSoft = 0;
  (Array.isArray(factors) ? factors : []).filter((f) => f.type === "soft").forEach((f) => {
    const dir = f.favors === "surge" ? 1 : -1;
    netSoft += dir * impactWeight(f.impact) * confidenceWeight(f.confidence) * reversibilityWeight(f.reversibility);
  });
  netSoft = clamp(netSoft, -1, 1);

  const r = clamp(safeNum(riskPosture), 0, 100) / 100;
  const lam = clamp(safeNum(softWeight), 0, 100) / 100;
  const softContribution = lam * netSoft * 0.3; // exposed for transparency
  let combined = clamp((1 - r) * tiltEV + r * tiltWorst + softContribution, -1, 1);

  if (disqualified.surge && !disqualified.protect) combined = -1;
  if (disqualified.protect && !disqualified.surge) combined = 1;
  if (disqualified.protect && disqualified.surge) combined = 0; // no viable side

  const financialPct = ((tiltEV + 1) / 2) * 100;
  const robustPct = ((combined + 1) / 2) * 100;

  const leaderId = financialOptimumId || "surge";
  const winProb = safeNum(metrics?.[leaderId]?.winProb);
  const avgEv = (Math.abs(evP) + Math.abs(evS)) / 2 || 1;
  const gapRatio = Math.abs(evS - evP) / avgEv;
  const distTo50 = Math.abs(robustPct - 50);

  const highFragilityReasons = [];
  const mediumFragilityReasons = [];
  if (disqualified.protect && disqualified.surge) {
    highFragilityReasons.push("Both options are blocked by active hard constraints.");
  } else if (disqualified[leaderId]) {
    highFragilityReasons.push("The financial leader is blocked by an active hard constraint.");
  }
  if (winProb < 55) highFragilityReasons.push(`The financial leader wins only ${winProb.toFixed(0)}% of weighted scenarios (below 55%).`);
  else if (winProb < 70) mediumFragilityReasons.push(`The financial leader wins ${winProb.toFixed(0)}% of weighted scenarios (below 70%).`);
  if (gapRatio < 0.05) highFragilityReasons.push("The expected-value advantage is under 5%, so a small change can reverse the ranking.");
  else if (gapRatio < 0.15) mediumFragilityReasons.push("The expected-value advantage is under 15%, leaving a limited margin.");
  if (distTo50 < 5) highFragilityReasons.push("The robustness position is within 5 points of neutral, indicating an almost even decision.");
  else if (distTo50 < 15) mediumFragilityReasons.push("The robustness position is within 15 points of neutral.");

  let fragility = "LOW";
  if (disqualified[leaderId] || (disqualified.protect && disqualified.surge)) {
    fragility = "HIGH";
  } else if (winProb < 55 || gapRatio < 0.05 || distTo50 < 5) {
    fragility = "HIGH";
  } else if (winProb < 70 || gapRatio < 0.15 || distTo50 < 15) {
    fragility = "MEDIUM";
  }

  return {
    financialPct,
    robustPct,
    robustPctRaw: robustPct.toFixed(0),
    fragility,
    fragilityReasons: fragility === "HIGH"
      ? highFragilityReasons
      : fragility === "MEDIUM"
        ? mediumFragilityReasons
        : ["The leader has at least a 70% scenario win rate, a 15% expected-value margin, and a clear robustness lean."],
    netSoftTilt: netSoft,
    softContribution,
    combined,
  };
}

/* ---------------------------------------------------------
   STORAGE HELPERS (localStorage, versioned)
--------------------------------------------------------- */
function loadFullState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STORAGE_VERSION || !parsed.data) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function saveFullState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, data, savedAt: new Date().toISOString() }));
    return true;
  } catch {
    return false;
  }
}

function exportFullState(data) {
  const blob = new Blob([JSON.stringify({ version: STORAGE_VERSION, exportedAt: new Date().toISOString(), data }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `decision-intelligence-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function validateImport(obj) {
  if (!obj || typeof obj !== "object") return null;
  const data = obj.data || obj;
  if (!data || typeof data !== "object") return null;
  const result = {};
  if (Array.isArray(data.scenarios) && data.scenarios.length) {
    result.scenarios = data.scenarios.map((s, i) => ({
      id: String(s.id || `imp-s-${i}`),
      name: String(s.name || "Imported Scenario"),
      probability: clamp(safeNum(s.probability), 0, 100),
      trigger: String(s.trigger || ""),
      values: {
        protect: safeNum(s.values?.protect),
        surge: safeNum(s.values?.surge),
      },
    }));
  }
  if (Array.isArray(data.factors)) {
    result.factors = data.factors.map((f, i) => ({
      id: String(f.id || `imp-f-${i}`),
      name: String(f.name || "Imported Factor"),
      type: ["hard", "soft", "contextual"].includes(f.type) ? f.type : "contextual",
      impact: IMPACT_LEVELS.includes(f.impact) ? f.impact : "Medium",
      confidence: CONF_LEVELS.includes(f.confidence) ? f.confidence : "Medium",
      reversibility: REV_LEVELS.includes(f.reversibility) ? f.reversibility : "Partially reversible",
      evidence: String(f.evidence || ""),
      violates: { protect: !!f.violates?.protect, surge: !!f.violates?.surge },
      favors: f.favors === "protect" ? "protect" : "surge",
      active: !!f.active,
    }));
  }
  if (typeof data.qsAllocation === "number") result.qsAllocation = clamp(safeNum(data.qsAllocation), 0, MAX_SURGE);
  if (typeof data.riskPosture === "number") result.riskPosture = clamp(safeNum(data.riskPosture), 0, 100);
  if (typeof data.softWeight === "number") result.softWeight = clamp(safeNum(data.softWeight), 0, 100);
  if (typeof data.constraintActive === "boolean") result.constraintActive = data.constraintActive;
  if (typeof data.serviceFloorPct === "number") result.serviceFloorPct = clamp(safeNum(data.serviceFloorPct), 0, 100);
  if (typeof data.coreCommitment === "number") result.coreCommitment = Math.max(0, safeNum(data.coreCommitment));
  if (Array.isArray(data.options) && data.options.length >= 2) {
    result.options = data.options.slice(0, 2).map((o, i) => ({
      id: i === 0 ? "protect" : "surge",
      name: String(o.name || (i === 0 ? "Option A" : "Option B")),
      short: String(o.short || (i === 0 ? "A" : "B")),
      desc: String(o.desc || ""),
    }));
  }
  return result;
}

/* ---------------------------------------------------------
   UI PRIMITIVES - visual system preserved
--------------------------------------------------------- */
function BracketFrame({ children, style, accent = C.border, className = "", variant = "panel" }) {
  const seg = (pos) => {
    const base = { position: "absolute", width: 11, height: 11, borderColor: accent };
    const m = {
      tl: { top: -1, left: -1, borderTop: "2px solid", borderLeft: "2px solid" },
      tr: { top: -1, right: -1, borderTop: "2px solid", borderRight: "2px solid" },
      bl: { bottom: -1, left: -1, borderBottom: "2px solid", borderLeft: "2px solid" },
      br: { bottom: -1, right: -1, borderBottom: "2px solid", borderRight: "2px solid" },
    };
    return { ...base, ...m[pos] };
  };
  return (
    <div className={`relative suite-frame suite-frame-${variant} ${className}`} style={{ background: C.panel, borderColor: accent, ...style }}>
      {variant === "anchor" && <><span style={seg("tl")} /><span style={seg("tr")} /><span style={seg("bl")} /><span style={seg("br")} /></>}
      {children}
    </div>
  );
}

function Stamp({ children, color = C.inkMuted, framed, onClick }) {
  const inner = <span style={{ fontFamily: F_MONO, fontSize: 10.5, letterSpacing: 1.2, color, whiteSpace: "nowrap" }}>[ {children} ]</span>;
  if (!framed) return inner;
  const Tag = onClick ? "button" : "span";
  return (
    <Tag onClick={onClick} className="inline-flex items-center gap-2" style={{ border: `1.5px solid ${color}`, padding: "4px 10px", background: "transparent", cursor: onClick ? "pointer" : "default" }}>
      <span style={{ width: 6, height: 6, background: color, flexShrink: 0 }} />
      {inner}
    </Tag>
  );
}

function Eyebrow({ children, color = C.inkFaint }) {
  return <div style={{ fontFamily: F_LABEL, fontWeight: 600, fontSize: 11, letterSpacing: 2, color, textTransform: "uppercase" }}>{children}</div>;
}

function IconBadge({ icon: IconComp, color = C.ink, size = 14, animKey }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 suite-icon-badge" style={{ color }}>
      {animKey !== undefined ? (
        <span key={animKey} className="scale-anim"><IconComp size={size} color={color} /></span>
      ) : (
        <IconComp size={size} color={color} />
      )}
    </span>
  );
}

function Intro({ children }) {
  return (
    <BracketFrame style={{ padding: 24 }}>
      <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink, lineHeight: 1.55 }}>{children}</p>
    </BracketFrame>
  );
}

function Pulse({ value, children }) {
  const [flash, setFlash] = useState(false);
  const prevRef = useRef(value);
  useEffect(() => {
    if (prevRef.current !== value) {
      prevRef.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 650);
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <span style={{ display: "inline-block", transition: "transform 0.25s ease, opacity 0.2s ease", transform: flash ? "scale(1.14)" : "scale(1)", opacity: flash ? 0.8 : 1 }}>
      {children}
    </span>
  );
}

function Ticker({ items }) {
  return (
    <div className="flex flex-wrap" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
      {items.map((it, i) => {
        const Tag = it.onClick ? "button" : "div";
        return (
          <Tag key={i} onClick={it.onClick} className="flex-1 text-left" style={{ minWidth: 128, padding: "10px 14px", borderRight: `1px solid ${C.borderSoft}`, borderBottom: `1px solid ${C.borderSoft}`, background: "transparent", cursor: it.onClick ? "pointer" : "default" }}>
            <div className="flex items-center gap-1" style={{ fontFamily: F_MONO, fontSize: 9.5, color: C.inkFaint, letterSpacing: 1 }}>
              {it.label}{it.onClick && <ArrowUpRight size={10} />}
            </div>
            <Pulse value={it.value}>
              <div style={{ fontFamily: F_MONO, fontWeight: 600, fontSize: 21, color: it.color || C.ink, letterSpacing: 0, lineHeight: 1.2 }}>{it.value}</div>
            </Pulse>
          </Tag>
        );
      })}
    </div>
  );
}

function fld(extra = {}) {
  return { background: C.panelRaised, border: `1px solid ${C.border}`, color: C.ink, fontFamily: F_MONO, fontVariantNumeric: "tabular-nums", fontSize: 12.5, minHeight: 40, padding: "9px 11px", borderRadius: 3, outline: "none", ...extra };
}
function fldBody(extra = {}) { return { ...fld(extra), fontFamily: F_BODY }; }

function IconBtn({ onClick, children, title, danger }) {
  return (
    <button onClick={onClick} title={title} className="flex items-center justify-center"
      style={{ width: 26, height: 26, border: `1px solid ${danger ? C.rust : C.border}`, color: danger ? C.rust : C.inkMuted, background: "transparent" }}>
      {children}
    </button>
  );
}

function SaveButton({ onClick, status }) {
  const saving = status === "saving";
  const saved = status === "saved";
  const error = status === "error";
  const color = saved ? C.moss : error ? C.rust : C.inkMuted;
  return (
    <button onClick={onClick} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 shrink-0" style={{
      fontFamily: F_MONO, fontSize: 11, letterSpacing: 0.5,
      color: saved ? C.panel : color,
      background: saved ? C.moss : "transparent",
      border: `1px solid ${color}`,
      opacity: saving ? 0.55 : 1,
      cursor: saving ? "wait" : "pointer",
      transform: saved ? "scale(1.04)" : "scale(1)",
      transition: "background 0.2s ease, color 0.2s ease, transform 0.2s ease, opacity 0.2s ease",
    }}>
      {saved ? <CheckCircle2 size={12} /> : <Save size={12} />}
      {saving ? "SAVING…" : saved ? "SAVED" : error ? "SAVE FAILED" : "SAVE"}
    </button>
  );
}

function PositionLine({ financialPct, robustPct, disqualified, protectLabel, surgeLabel, bothDisqualified }) {
  const gap = Math.abs(financialPct - robustPct);
  const finLeft = clamp(financialPct, 2, 98);
  const robLeft = clamp(robustPct, 2, 98);
  return (
    <div className="w-full suite-position-line">
      <div className="flex items-center justify-between mb-3" style={{ fontFamily: F_LABEL, fontSize: 12, textTransform: "uppercase", fontWeight: 600 }}>
        <span style={{ color: C.slate }}>◀ {protectLabel}</span>
        <span style={{ color: C.rust }}>{surgeLabel} ▶</span>
      </div>
      <div className="relative" style={{ height: 92 }}>
        {/* Track */}
        <div className="absolute left-0 right-0 suite-position-track" style={{ top: 40 }} />
        {/* Tick marks */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="absolute" style={{ left: `${i * 10}%`, top: 33, width: 1, height: i === 5 ? 24 : 16, background: i === 5 ? C.inkFaint : C.border }} />
        ))}
        {/* Financial optimum - hollow diamond, above track */}
        <div className="absolute transition-all duration-300 ease-out flex flex-col items-center" style={{ left: `${finLeft}%`, top: 4, transform: "translateX(-50%)" }} title="Financial optimum (pure expected value)">
          <div style={{ width: 14, height: 14, transform: "rotate(45deg)", background: C.panel, border: `2.5px solid ${C.ink}`, boxShadow: "0 0 0 1px " + C.panel }} />
          <div style={{ width: 2, height: 10, background: C.ink, marginTop: -1 }} />
        </div>
        {/* Gap callout */}
        <div className="absolute flex items-center justify-center" style={{ left: "50%", top: 7, transform: "translateX(-50%)" }}>
          <span style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkMuted, background: C.panel, padding: "1px 6px", border: `1px solid ${C.borderSoft}`, whiteSpace: "nowrap" }}>Δ {gap.toFixed(0)} pt</span>
        </div>
        {/* Robustness-adjusted - solid flag, below track */}
        {!bothDisqualified && (
          <div className="absolute transition-all duration-300 ease-out flex flex-col items-center" style={{ left: `${robLeft}%`, top: 46, transform: "translateX(-50%)" }} title="Robustness-adjusted position">
            <div style={{ width: 2, height: 10, background: disqualified ? C.rust : C.slate }} />
            <div style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `12px solid ${disqualified ? C.rust : C.slate}` }} />
            {disqualified && (
              <span className="mt-1" style={{ fontFamily: F_MONO, fontSize: 9.5, letterSpacing: 1, color: C.rust, border: `1px solid ${C.rust}`, padding: "1px 5px", whiteSpace: "nowrap", background: C.panel }}>VETO</span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-5 flex-wrap" style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkMuted }}>
        <span className="flex items-center gap-2">
          <span style={{ width: 10, height: 10, border: `2.5px solid ${C.ink}`, transform: "rotate(45deg)", display: "inline-block", background: C.panel }} />
          Financial optimum
        </span>
        <span className="flex items-center gap-2">
          <span style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `8px solid ${C.slate}`, display: "inline-block" }} />
          Robustness-adjusted
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   SITUATION BOARD
--------------------------------------------------------- */
function SituationBoard({ metrics, financialOptimumId, disqualified, financialPct, robustPct, fragility, fragilityReasons, factors, robustPctRaw, goTo, options, softContribution }) {
  const evP = metrics.protect?.ev ?? 0, evS = metrics.surge?.ev ?? 0;
  const advantage = Math.abs(evS - evP);
  const leader = options.find((o) => o.id === financialOptimumId) || options[0];
  const bothDisqualified = disqualified.protect && disqualified.surge;
  const robustLeaderId = bothDisqualified ? null : (robustPct >= 50 ? "surge" : "protect");
  const robustLeader = robustLeaderId ? options.find((o) => o.id === robustLeaderId) : null;
  const anyDisqualified = disqualified.protect || disqualified.surge;
  const recommended = bothDisqualified ? null : (anyDisqualified ? (disqualified.protect ? options.find(o => o.id === "surge") : options.find(o => o.id === "protect")) : robustLeader);
  const recId = recommended?.id;

  const flaggedFactors = [...factors].sort((a, b) => {
    const order = { hard: 0, soft: 1, contextual: 2 };
    if (order[a.type] !== order[b.type]) return order[a.type] - order[b.type];
    return impactWeight(b.impact) - impactWeight(a.impact);
  }).slice(0, 4);

  const fragColor = fragility === "HIGH" ? C.rust : fragility === "MEDIUM" ? C.amber : C.moss;
  const winP = metrics[financialOptimumId]?.winProb ?? 0;

  // Build a clear one-sentence rationale
  let rationale = "";
  if (bothDisqualified) {
    rationale = "Both options are blocked by active hard constraints. No viable path until constraints are revisited.";
  } else if (anyDisqualified) {
    rationale = `${disqualified.protect ? "Protect Core" : "Capture Surge"} is vetoed by an active hard constraint. Recommendation follows the surviving option.`;
  } else if (leader?.id === robustLeader?.id) {
    rationale = `Financial optimum and robustness-adjusted position agree on ${leader?.short}. Expected advantage ₹${advantage.toFixed(1)} Cr with ${winP.toFixed(0)}% scenario win rate.`;
  } else {
    rationale = `Numbers favor ${leader?.short} (+₹${advantage.toFixed(1)} Cr), but risk posture and qualitative factors pull the robustness-adjusted position toward ${robustLeader?.short}.`;
  }

  return (
    <div className="flex flex-col gap-5">
      {/* SCENARIO CONTEXT - who this decision belongs to */}
      <section className="suite-company-note" aria-label="About this scenario">
        <Eyebrow color={C.slate}>About this scenario</Eyebrow>
        <div className="suite-company-note-title">Thistlewood Foods</div>
        <p>
          Thistlewood Foods is a fictional specialty foods company created for this decision scenario. Its Specialty Confections division enters every festive season with a fixed production capacity that must be allocated between two competing demands.
        </p>
        <p>
          The choice is between <strong>Protect Core Accounts</strong>, which keeps existing contracted partners fully served at predictable margins, and <strong>Capture Surge Demand</strong>, which diverts capacity toward high-margin festive orders that may not repeat next year. This suite weighs both paths across weighted demand scenarios, applies hard constraints and qualitative factors, and recommends the option most likely to hold up under pressure.
        </p>
        <p>
          Every company, division, partner and figure here is illustrative. Nothing corresponds to a real business; the numbers exist to demonstrate the decision framework itself.
        </p>
      </section>
      {/* PRIMARY RECOMMENDATION - the "so what" */}
      <BracketFrame variant="anchor" className="suite-recommendation" style={{ padding: 24 }} accent={bothDisqualified ? C.rust : C.slate}>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
          <Eyebrow color={bothDisqualified ? C.rust : C.slate}>Primary recommendation</Eyebrow>
          <Stamp color={fragColor} framed onClick={() => goTo("trip")}>FRAGILITY: {fragility}</Stamp>
        </div>

        {bothDisqualified ? (
          <div className="flex items-start gap-3">
            <XCircle size={28} color={C.rust} className="mt-0.5 shrink-0" />
            <div>
              <div className="suite-recommendation-title" style={{ color: C.rust }}>No viable option</div>
              <p className="suite-body-copy" style={{ color: C.ink, marginTop: 8 }}>{rationale}</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="suite-recommendation-title" style={{ color: C.ink }}>
              {recommended?.name || "-"}
            </div>
            <p className="suite-body-copy" style={{ color: C.inkMuted, marginTop: 8, maxWidth: 680 }}>{rationale}</p>
          </div>
        )}

        <details className="fragility-explainer" open>
          <summary style={{ color: fragColor }}>What {fragility.toLowerCase()} fragility means</summary>
          <p>
            Fragility measures how easily the current recommendation could change, not how risky the business is overall.
            {fragility === "HIGH" && " High means the recommendation needs stress-testing before commitment."}
            {fragility === "MEDIUM" && " Medium means the recommendation is credible but should be monitored."}
            {fragility === "LOW" && " Low means the recommendation is comparatively stable across the current inputs."}
          </p>
          <ul>{fragilityReasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
        </details>

        {/* Compact key numbers under the recommendation */}
        <div className="flex flex-wrap gap-4 mt-4 pt-3" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint, letterSpacing: 1 }}>FINANCIAL OPTIMUM</div>
            <div style={{ fontFamily: F_MONO, fontSize: 15, fontWeight: 600, color: C.ink }}>{leader?.short || "-"}</div>
          </div>
          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint, letterSpacing: 1 }}>EXPECTED ADVANTAGE</div>
            <div style={{ fontFamily: F_MONO, fontSize: 15, fontWeight: 600, color: C.ink }}>+₹{advantage.toFixed(1)} Cr</div>
          </div>
          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint, letterSpacing: 1 }}>ROBUSTNESS LEAN</div>
            <div style={{ fontFamily: F_MONO, fontSize: 15, fontWeight: 600, color: bothDisqualified || anyDisqualified ? C.rust : C.slate }}>
              {bothDisqualified ? "NONE" : anyDisqualified ? "OVERRIDDEN" : `${robustPctRaw}% → ${robustLeader?.short || "-"}`}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint, letterSpacing: 1 }}>WIN RATE (FIN. LEADER)</div>
            <div style={{ fontFamily: F_MONO, fontSize: 15, fontWeight: 600, color: winP < 55 ? C.rust : winP < 70 ? C.amber : C.moss }}>{winP.toFixed(0)}%</div>
          </div>
        </div>
      </BracketFrame>

      {/* Position Line */}
      <BracketFrame className="suite-position-panel" style={{ padding: 24 }}>
        <Eyebrow>Position line</Eyebrow>
        <div className="mt-3">
          <PositionLine
            financialPct={financialPct}
            robustPct={robustPct}
            disqualified={anyDisqualified && robustLeaderId && disqualified[robustLeaderId]}
            protectLabel={options.find((o) => o.id === "protect")?.short || "Protect"}
            surgeLabel={options.find((o) => o.id === "surge")?.short || "Surge"}
            bothDisqualified={bothDisqualified}
          />
        </div>
      </BracketFrame>

      {/* Option comparison - equal structure, winner highlight */}
      <div className="grid sm:grid-cols-2 gap-4">
        {options.map((o) => {
          const m = metrics[o.id] || { ev: 0, winProb: 0, worst: 0, worstRegret: 0 };
          const dq = disqualified[o.id];
          const isRec = recId === o.id && !bothDisqualified;
          return (
            <BracketFrame key={o.id} className={isRec ? "suite-option-recommended" : ""} style={{ padding: 24, opacity: dq ? 0.55 : 1, background: isRec ? C.panelTint : C.panel }} accent={dq ? C.rust : isRec ? C.slate : C.borderSoft}>
              <div className="flex items-center justify-between mb-1 gap-2">
                <span style={{ fontFamily: F_LABEL, fontSize: 15, color: C.ink, letterSpacing: 0.3, fontWeight: 600 }}>{o.name}</span>
                <div className="flex items-center gap-1.5">
                  {isRec && <Stamp color={C.slate}>RECOMMENDED</Stamp>}
                  {dq && <XCircle size={16} color={C.rust} />}
                </div>
              </div>
              <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.5 }} className="mb-3">{o.desc}</p>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 1, background: C.borderSoft, border: `1px solid ${C.borderSoft}` }}>
                {[
                  { label: "EXPECTED VALUE", value: `₹${m.ev.toFixed(0)} Cr` },
                  { label: "WIN RATE", value: `${m.winProb.toFixed(0)}%` },
                  { label: "WORST VALUE", value: `₹${m.worst.toFixed(0)} Cr` },
                  { label: "WORST REGRET", value: `₹${m.worstRegret.toFixed(0)} Cr` },
                ].map((cell) => (
                  <div key={cell.label} style={{ background: "transparent", padding: "12px 14px" }}>
                    <div style={{ fontFamily: F_MONO, fontSize: 9.5, color: C.inkFaint, letterSpacing: 0.8 }}>{cell.label}</div>
                    <div style={{ fontFamily: F_MONO, fontSize: 16, fontWeight: 600, color: C.ink, marginTop: 2 }}>{cell.value}</div>
                  </div>
                ))}
              </div>
            </BracketFrame>
          );
        })}
      </div>

      {/* Flagged factors - tighter */}
      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-1">
          <Eyebrow>Key factors</Eyebrow>
          <button onClick={() => goTo("intel")} style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkMuted, background: "transparent", border: "none", cursor: "pointer" }}>
            View all →
          </button>
        </div>
        <div className="flex flex-col mt-2">
          {flaggedFactors.map((f, i) => (
            <button key={f.id} onClick={() => goTo("intel")} className="flex items-start justify-between gap-3 py-3 flex-wrap w-full text-left" style={{ borderTop: i > 0 ? `1px solid ${C.borderSoft}` : "none", background: "transparent", cursor: "pointer" }}>
              <div className="flex-1 min-w-[180px]">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.ink }}>{f.name}</span>
                  <Stamp color={TYPE_META[f.type].color}>{TYPE_META[f.type].label.toUpperCase()}</Stamp>
                  {f.type === "hard" && <Stamp color={f.active ? C.rust : C.inkFaint}>{f.active ? "ACTIVE" : "INACTIVE"}</Stamp>}
                </div>
                <div style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }}>{f.evidence}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint, whiteSpace: "nowrap" }}>IMPACT: {f.impact.toUpperCase()}</span>
                <ChevronRight size={13} color={C.inkFaint} />
              </div>
            </button>
          ))}
        </div>
      </BracketFrame>
    </div>
  );
}

/* ---------------------------------------------------------
   SCENARIO LOG
--------------------------------------------------------- */
function ScenarioLog({ scenarios, setScenarios, options }) {
  const counter = useRef(100);
  const totalProb = scenarios.reduce((a, s) => a + Math.max(0, safeNum(s.probability)), 0);
  const probWarning = Math.abs(totalProb - 100) > 1;

  const update = (id, field, value) => {
    let v = value;
    if (field === "probability") v = clamp(safeNum(value), 0, 100);
    setScenarios((prev) => prev.map((s) => s.id === id ? { ...s, [field]: v } : s));
  };
  const updateValue = (id, optId, value) => {
    const v = safeNum(value);
    setScenarios((prev) => prev.map((s) => s.id === id ? { ...s, values: { ...s.values, [optId]: v } } : s));
  };
  const remove = (id) => {
    if (!window.confirm("Delete this scenario? This cannot be undone.")) return;
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  };
  const add = () => {
    counter.current += 1;
    const newId = `custom-${counter.current}-${Date.now()}`;
    setScenarios((prev) => [...prev, { id: newId, name: "New Scenario", probability: 0, trigger: "Describe the trigger condition…", values: { protect: 0, surge: 0 } }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.5, maxWidth: 620 }}>
            This is the MILP's output, not a live solver - each row is a scenario with a value already computed for each option. Edit freely; every other tab recalculates from this table.
          </div>
          <Stamp color={probWarning ? C.amber : C.moss} framed>SUM: {totalProb.toFixed(0)}%</Stamp>
        </div>
        {probWarning && (
          <div className="mt-2 p-2" style={{ borderLeft: `3px solid ${C.amber}`, background: C.panelRaised, fontFamily: F_BODY, fontSize: 12, color: C.ink }}>
            Probabilities currently sum to {totalProb.toFixed(1)}%. EV calculations still normalize, but results are easier to interpret when the sum is ~100%.
          </div>
        )}
      </BracketFrame>

      <div className="flex flex-col gap-3">
        {scenarios.length === 0 && (
          <BracketFrame style={{ padding: 24, textAlign: "center" }}>
            <div style={{ fontFamily: F_LABEL, fontSize: 14, letterSpacing: 0.5, color: C.inkMuted }}>No scenarios logged</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkFaint, lineHeight: 1.5 }} className="mt-1">Nothing to compare yet - every metric on Overview and Tripwires depends on at least one row here. Add one below.</p>
          </BracketFrame>
        )}
        {scenarios.map((s) => (
          <BracketFrame key={s.id} style={{ padding: 16 }}>
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <input value={s.name} onChange={(e) => update(s.id, "name", e.target.value)} style={fld({ fontFamily: F_LABEL, fontSize: 14.5, letterSpacing: 0.5, flex: "1 1 220px", background: "transparent", border: "none", padding: "2px 0" })} />
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>PROB</span>
                <input type="number" min={0} max={100} value={s.probability} onChange={(e) => update(s.id, "probability", e.target.value)} style={fld({ width: 56, textAlign: "right" })} />
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>%</span>
                <IconBtn onClick={() => remove(s.id)} title="Remove scenario" danger><X size={13} /></IconBtn>
              </div>
            </div>
            <textarea value={s.trigger} onChange={(e) => update(s.id, "trigger", e.target.value)} rows={2} style={fldBody({ width: "100%", fontSize: 12.5, resize: "vertical" })} />
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {options.map((o) => (
                <label key={o.id} className="flex items-center justify-between gap-2 p-2.5" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
                  <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted }}>{o.short}</span>
                  <div className="flex items-center gap-1">
                    <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>₹</span>
                    <input type="number" value={s.values[o.id]} onChange={(e) => updateValue(s.id, o.id, e.target.value)} style={fld({ width: 84, textAlign: "right" })} />
                    <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>Cr</span>
                  </div>
                </label>
              ))}
            </div>
          </BracketFrame>
        ))}
      </div>

      <button onClick={add} className="flex items-center justify-center gap-2 py-2.5" style={{ fontFamily: F_LABEL, fontSize: 13, letterSpacing: 1, color: C.inkMuted, border: `1px dashed ${C.border}`, background: "transparent" }}>
        <Plus size={15} /> ADD SCENARIO
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   QUALITATIVE FACTORS
--------------------------------------------------------- */
function FieldIntel({ factors, setFactors, onSave, saveStatus, options }) {
  const counter = useRef(100);
  const update = (id, field, value) => setFactors((prev) => prev.map((f) => f.id === id ? { ...f, [field]: value } : f));
  const updateViolates = (id, optId, value) => setFactors((prev) => prev.map((f) => f.id === id ? { ...f, violates: { ...f.violates, [optId]: value } } : f));
  const remove = (id) => {
    if (!window.confirm("Delete this factor? This cannot be undone.")) return;
    setFactors((prev) => prev.filter((f) => f.id !== id));
  };
  const add = () => {
    counter.current += 1;
    const newId = `custom-${counter.current}-${Date.now()}`;
    setFactors((prev) => [...prev, { id: newId, name: "New Factor", type: "contextual", impact: "Medium", confidence: "Medium", reversibility: "Partially reversible", evidence: "Describe the evidence behind this factor…", violates: { protect: false, surge: false }, favors: "surge", active: false }]);
  };

  return (
    <div className="flex flex-col gap-4">
      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.5, maxWidth: 560 }}>
            <span style={{ color: C.ink, fontWeight: 600 }}>Not every risk can be priced.</span> This is where judgment calls get written down instead of guessed at. Three ways a factor can enter the picture - set with the <strong style={{ color: C.ink }}>Type</strong> field on each card:{" "}
            <span style={{ color: C.rust }}>Hard constraints</span> can disqualify an option outright when active.{" "}
            <span style={{ color: C.amber }}>Soft preferences</span> nudge the recommendation by a weight you control in Settings - Impact, Confidence and Reversibility all scale how strongly.{" "}
            <span style={{ color: C.slate }}>Contextual</span> factors are shown for judgment and never touch the math.
          </div>
          <SaveButton onClick={onSave} status={saveStatus} />
        </div>
        <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mt-2">Saves full decision state to this browser (localStorage). Reload to confirm it held.</div>
      </BracketFrame>

      <div className="flex flex-col gap-3">
        {factors.length === 0 && (
          <BracketFrame style={{ padding: 24, textAlign: "center" }}>
            <div style={{ fontFamily: F_LABEL, fontSize: 14, letterSpacing: 0.5, color: C.inkMuted }}>No qualitative factors recorded</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkFaint, lineHeight: 1.5 }} className="mt-1">This is where judgment calls that don't fit a spreadsheet get written down. Add one below.</p>
          </BracketFrame>
        )}
        {factors.map((f) => (
          <BracketFrame key={f.id} style={{ padding: 24, opacity: f.type === "hard" && !f.active ? 0.72 : 1 }} accent={f.type === "hard" && f.active ? C.rust : TYPE_META[f.type].color}>
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <input value={f.name} onChange={(e) => update(f.id, "name", e.target.value)} style={fldBody({ fontWeight: 600, fontSize: 14, flex: "1 1 200px", background: "transparent", border: "none", padding: "2px 0" })} />
              <div className="flex items-center gap-2">
                <select value={f.type} onChange={(e) => update(f.id, "type", e.target.value)} style={fldBody()}>
                  <option value="hard">Hard Constraint</option>
                  <option value="soft">Soft Preference</option>
                  <option value="contextual">Contextual</option>
                </select>
                <IconBtn onClick={() => remove(f.id)} title="Remove factor" danger><X size={13} /></IconBtn>
              </div>
            </div>
            <textarea value={f.evidence} onChange={(e) => update(f.id, "evidence", e.target.value)} rows={2} style={fldBody({ width: "100%", fontSize: 12.5, resize: "vertical" })} />

            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              <div className="p-2.5" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
                <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mb-1">IMPACT</div>
                <select value={f.impact} onChange={(e) => update(f.id, "impact", e.target.value)} style={fldBody({ width: "100%" })}>{IMPACT_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}</select>
              </div>
              <div className="p-2.5" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
                <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mb-1">CONFIDENCE</div>
                <select value={f.confidence} onChange={(e) => update(f.id, "confidence", e.target.value)} style={fldBody({ width: "100%" })}>{CONF_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}</select>
              </div>
              <div className="p-2.5" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
                <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mb-1">REVERSIBILITY</div>
                <select value={f.reversibility} onChange={(e) => update(f.id, "reversibility", e.target.value)} style={fldBody({ width: "100%" })}>{REV_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}</select>
              </div>
            </div>

            {f.type === "hard" && (
              <div className="mt-3 p-3 flex flex-wrap items-center gap-4" style={{ borderLeft: `3px solid ${C.rust}`, background: C.panelRaised }}>
                <label className="flex items-center gap-2" style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.ink }}>
                  <input type="checkbox" checked={f.active} onChange={(e) => update(f.id, "active", e.target.checked)} /> Active
                </label>
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>DISQUALIFIES:</span>
                {options.map((o) => (
                  <label key={o.id} className="flex items-center gap-1.5" style={{ fontFamily: F_BODY, fontSize: 12, color: C.ink }}>
                    <input type="checkbox" checked={!!f.violates?.[o.id]} onChange={(e) => updateViolates(f.id, o.id, e.target.checked)} /> {o.short}
                  </label>
                ))}
                <span style={{ fontFamily: F_BODY, fontSize: 11, color: C.inkFaint, fontStyle: "italic" }}>Impact/Confidence don't change this - a hard constraint is a veto, not a matter of degree.</span>
              </div>
            )}
            {f.type === "soft" && (
              <div className="mt-3 p-3 flex items-center gap-3 flex-wrap" style={{ borderLeft: `3px solid ${C.amber}`, background: C.panelRaised }}>
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>FAVORS:</span>
                <select value={f.favors} onChange={(e) => update(f.id, "favors", e.target.value)} style={fldBody()}>{options.map((o) => <option key={o.id} value={o.id}>{o.short}</option>)}</select>
              </div>
            )}
          </BracketFrame>
        ))}
      </div>

      <button onClick={add} className="flex items-center justify-center gap-2 py-2.5" style={{ fontFamily: F_LABEL, fontSize: 13, letterSpacing: 1, color: C.inkMuted, border: `1px dashed ${C.border}`, background: "transparent" }}>
        <Plus size={15} /> ADD FACTOR
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   TRIPWIRES
--------------------------------------------------------- */
function Tripwires({ scenarios, metrics, constraintActive, serviceFloorPct, coreCommitment, goTo, qs, setQs, onSaveQs, qsSaveStatus, options }) {
  const safeCore = Math.max(0, safeNum(coreCommitment));
  const floorQc = constraintActive && safeCore > 0 ? (clamp(safeNum(serviceFloorPct), 0, 100) / 100) * safeCore : 0;
  const capQs = constraintActive ? clamp(TOTAL_CAPACITY - floorQc, 0, MAX_SURGE) : MAX_SURGE;
  const effectiveQs = Math.min(clamp(safeNum(qs), 0, MAX_SURGE), capQs);
  const nev = nevForQs(effectiveQs);
  const qc = qcForQs(effectiveQs);
  const servicePct = safeCore > 0 ? (qc / safeCore) * 100 : 0;
  const foregone = constraintActive ? nevForQs(MAX_SURGE) - nevForQs(capQs) : 0;

  const base = scenarios.find((s) => s.id === "base") || scenarios[0];
  const baseLeader = base && safeNum(base.values?.surge) >= safeNum(base.values?.protect) ? "surge" : "protect";

  return (
    <div className="flex flex-col gap-5">
      <Intro>
        This tab stress-tests the recommendation: how often each option actually wins, how bad its worst case is, and exactly what would need to change for the recommendation to flip.
      </Intro>

      <BracketFrame style={{ padding: 24 }}>
        <Eyebrow>Robustness metrics</Eyebrow>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-sm" style={{ fontFamily: F_BODY }}>
            <thead>
              <tr style={{ color: C.inkFaint, fontSize: 10.5 }} className="text-left">
                <th className="pb-2 font-normal" style={{ fontFamily: F_MONO }}>METRIC</th>
                {options.map((o) => <th key={o.id} className="pb-2 font-normal text-right" style={{ fontFamily: F_MONO }}>{o.short.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody style={{ fontFamily: F_MONO, fontSize: 13 }}>
              {[
                ["Expected value", (o) => `₹${(metrics[o]?.ev ?? 0).toFixed(1)} Cr`, () => (metrics.protect?.ev ?? 0) > (metrics.surge?.ev ?? 0)],
                ["Scenario win rate", (o) => `${(metrics[o]?.winProb ?? 0).toFixed(0)}%`, () => (metrics.protect?.winProb ?? 0) > (metrics.surge?.winProb ?? 0)],
                ["Worst-case value", (o) => `₹${(metrics[o]?.worst ?? 0).toFixed(1)} Cr`, () => (metrics.protect?.worst ?? 0) > (metrics.surge?.worst ?? 0)],
                ["Worst-case regret", (o) => `₹${(metrics[o]?.worstRegret ?? 0).toFixed(1)} Cr`, () => (metrics.protect?.worstRegret ?? 0) < (metrics.surge?.worstRegret ?? 0)],
              ].map(([label, fmt, better], i) => {
                const aWins = better();
                return (
                  <tr key={i} onClick={() => goTo("log")} className="cursor-pointer" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
                    <td className="py-2" style={{ fontFamily: F_BODY, color: C.inkMuted, fontSize: 12.5 }}>{label}</td>
                    <td className="py-2 text-right"><Pulse value={fmt("protect")}><span style={{ color: aWins ? C.moss : C.ink }}>{fmt("protect")}</span></Pulse></td>
                    <td className="py-2 text-right"><Pulse value={fmt("surge")}><span style={{ color: !aWins ? C.moss : C.ink }}>{fmt("surge")}</span></Pulse></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-2 mt-4 p-3" style={{ borderLeft: `3px solid ${C.slate}`, background: C.panelRaised }}>
          <Info size={14} color={C.slate} className="mt-0.5 shrink-0" />
          <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted, lineHeight: 1.55 }}>
            These two numbers can point at different options, and that's expected, not a bug. Worst-case value asks "how bad does it get." Worst-case regret asks "how much would I wish I'd chosen differently." Protect Core is safer by the first measure; Capture Surge is safer by the second. Which one matters more here is a judgment call, not something this tool decides for you. <span style={{ color: C.inkFaint }}>(For reference: these correspond to Wald's maximin and Savage's minimax-regret criteria in decision theory.)</span>
          </p>
        </div>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <Eyebrow>Continuous tripwire - Base Case allocation</Eyebrow>
          <SaveButton onClick={onSaveQs} status={qsSaveStatus} />
        </div>
        <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.5 }} className="mt-2 mb-4">
          The only slider here backed by a real formula. Qs = 0 reproduces Protect Core's base-case value; Qs = {MAX_SURGE.toLocaleString()} MT reproduces Capture Surge's. Everything between is a hybrid allocation.
        </p>
        <input type="range" min={0} max={capQs} step={50} value={effectiveQs} onChange={(e) => setQs(Number(e.target.value))} style={{ width: "100%" }} />
        <Ticker items={[
          { label: "Qs ALLOCATED", value: `${effectiveQs.toLocaleString()}MT` },
          { label: "Qc REMAINING", value: `${qc.toLocaleString()}MT` },
          { label: "CORE SERVICE", value: `${servicePct.toFixed(1)}%`, color: constraintActive && servicePct < serviceFloorPct - 0.5 ? C.rust : C.ink },
          { label: "NET VALUE", value: `₹${nev.toFixed(0)}CR`, color: C.amber },
        ]} />
        <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mt-2">Saves to this browser. This is illustrative only - it doesn't feed back into the Overview recommendation, which is driven by the Scenario Log.</div>
        {qs > capQs && (
          <div className="flex items-start gap-2 mt-3 p-3" style={{ borderLeft: `3px solid ${C.rust}`, background: C.panelRaised }}>
            <AlertTriangle size={14} color={C.rust} className="mt-0.5 shrink-0" />
            <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.ink, lineHeight: 1.5 }}>
              Capped at {capQs.toLocaleString()} MT by the active Core Service Floor constraint - going further would breach the {serviceFloorPct}% floor. Enforcing it costs an estimated <strong>₹{foregone.toFixed(1)} Cr</strong> versus the unconstrained maximum.
            </p>
          </div>
        )}
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <Eyebrow>Discrete tripwires - scenario-driven flips</Eyebrow>
        <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.5 }} className="mt-2 mb-3">
          No formula links these scenarios to a value - each is a separate MILP re-run. A flip here means the scenario itself, not a sliding number, changes which option wins.
        </p>
        <div className="flex flex-col">
          {scenarios.filter((s) => s.id !== "base").map((s, i) => {
            const leader = safeNum(s.values?.surge) >= safeNum(s.values?.protect) ? "surge" : "protect";
            const flips = leader !== baseLeader;
            return (
              <div key={s.id} onClick={() => goTo("log")} className="flex items-center justify-between gap-3 py-3 flex-wrap cursor-pointer" style={{ borderTop: i > 0 ? `1px solid ${C.borderSoft}` : "none", borderLeft: flips ? `3px solid ${C.rust}` : "none", paddingLeft: flips ? 10 : 0 }}>
                <div>
                  <div style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink, fontWeight: 600 }}>{s.name} <span style={{ color: C.inkFaint, fontFamily: F_MONO, fontSize: 11 }}>· {s.probability}% likelihood</span></div>
                  <div style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted }}>{s.trigger}</div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Stamp color={flips ? C.rust : C.inkFaint}>{flips ? `TRIPS TO ${options.find((o) => o.id === leader)?.short?.toUpperCase() || leader}` : "NO FLIP"}</Stamp>
                  <ChevronRight size={13} color={C.inkFaint} />
                </div>
              </div>
            );
          })}
        </div>
      </BracketFrame>
    </div>
  );
}

/* ---------------------------------------------------------
   SETTINGS
--------------------------------------------------------- */
function CommandSettings({ riskPosture, setRiskPosture, softWeight, setSoftWeight, constraintActive, setConstraintActive, serviceFloorPct, setServiceFloorPct, coreCommitment, setCoreCommitment, onReset, options, setOptions, onSave, saveStatus, onExport, onImport }) {
  const updateOption = (id, field, value) => setOptions((prev) => prev.map((o) => o.id === id ? { ...o, [field]: value } : o));
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result);
        onImport(obj);
      } catch {
        alert("Could not parse the selected file as valid JSON.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-5">
      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
          <Eyebrow>Decision options</Eyebrow>
          <SaveButton onClick={onSave} status={saveStatus} />
        </div>
        <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }} className="mb-3">
          Rename the two options being compared to fit your own decision. This covers every label across the tool - Position Line, Scenario Log, Qualitative Factors, and Tripwires all read from here.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {options.map((o) => (
            <div key={o.id} className="p-3" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
              <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mb-1">{o.id === "protect" ? "OPTION A" : "OPTION B"}</div>
              <input value={o.name} onChange={(e) => updateOption(o.id, "name", e.target.value)} placeholder="Full name" style={fldBody({ width: "100%", fontWeight: 600, marginBottom: 6 })} />
              <input value={o.short} onChange={(e) => updateOption(o.id, "short", e.target.value)} placeholder="Short label" style={fld({ width: "100%", marginBottom: 6 })} />
              <textarea value={o.desc} onChange={(e) => updateOption(o.id, "desc", e.target.value)} rows={2} placeholder="Description" style={fldBody({ width: "100%", fontSize: 12, resize: "vertical" })} />
            </div>
          ))}
        </div>
        <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }} className="mt-2">The internal roles (which one is "protect", which is "surge") stay fixed - only the labels shown throughout the tool change.</div>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center justify-between mb-4">
          <Eyebrow>Adjustments</Eyebrow>
          <button onClick={onReset} className="flex items-center gap-1.5 px-3 py-1.5" style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkMuted, border: `1px solid ${C.border}` }}>
            <RotateCcw size={11} /> RESET
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink }}>Risk Posture</span>
              <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.slate }}>{riskPosture}</span>
            </div>
            <p style={{ fontFamily: F_BODY, fontSize: 11.5, color: C.inkMuted, lineHeight: 1.5 }} className="mb-2">
              0 = trust the financial optimum (expected value). 100 = trust whichever option is safer in the worst case. The robustness-adjusted marker on the Position Line blends the two.
            </p>
            <input type="range" min={0} max={100} value={riskPosture} onChange={(e) => setRiskPosture(Number(e.target.value))} style={{ width: "100%" }} />
            <div className="flex justify-between" style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkFaint }}><span>AGGRESSIVE</span><span>DEFENSIVE</span></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink }}>Strategic Weight</span>
              <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.slate }}>{softWeight}</span>
            </div>
            <p style={{ fontFamily: F_BODY, fontSize: 11.5, color: C.inkMuted, lineHeight: 1.5 }} className="mb-2">
              How much Soft Preference factors (Qualitative Factors tab) are allowed to nudge the robustness-adjusted position. At 0, soft factors are display-only. Impact, Confidence and Reversibility all scale the nudge.
            </p>
            <input type="range" min={0} max={100} value={softWeight} onChange={(e) => setSoftWeight(Number(e.target.value))} style={{ width: "100%" }} />
          </div>
        </div>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <Eyebrow>Core service floor</Eyebrow>
        <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }} className="mt-2 mb-3">
          The one numeric, formula-enforced constraint in this tool - caps the Qs slider on the Tripwires tab. Everything else in Qualitative Factors is a manual judgment call by design.
        </p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2" style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink }}>
            <input type="checkbox" checked={constraintActive} onChange={(e) => setConstraintActive(e.target.checked)} /> Active
          </label>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="flex items-center justify-between gap-2 p-2.5" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
              <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted }}>Service floor</span>
              <div className="flex items-center gap-1"><input type="number" min={0} max={100} value={serviceFloorPct} onChange={(e) => setServiceFloorPct(clamp(safeNum(e.target.value), 0, 100))} style={fld({ width: 60, textAlign: "right" })} /><span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>%</span></div>
            </label>
            <label className="flex items-center justify-between gap-2 p-2.5" style={{ background: C.panelRaised, border: `1px solid ${C.borderSoft}` }}>
              <span style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted }}>Core commitment</span>
              <div className="flex items-center gap-1"><input type="number" min={0} value={coreCommitment} onChange={(e) => setCoreCommitment(Math.max(0, safeNum(e.target.value)))} style={fld({ width: 80, textAlign: "right" })} /><span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkFaint }}>MT</span></div>
            </label>
          </div>
        </div>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <Eyebrow>Export / Import</Eyebrow>
        <p style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }} className="mt-2 mb-3">
          Download the full decision package (scenarios, factors, settings, options) as JSON, or restore one previously exported. Import validates shape and falls back gracefully on bad data.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={onExport} className="flex items-center gap-1.5 px-3 py-1.5" style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkMuted, border: `1px solid ${C.border}`, background: "transparent" }}>
            <Download size={12} /> EXPORT JSON
          </button>
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5" style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkMuted, border: `1px solid ${C.border}`, background: "transparent" }}>
            <Upload size={12} /> IMPORT JSON
          </button>
          <input ref={fileRef} type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleFile} />
        </div>
      </BracketFrame>
    </div>
  );
}

/* ---------------------------------------------------------
   METHODOLOGY (updated only for factual persistence / scoring notes)
--------------------------------------------------------- */
function FieldManual() {
  return (
    <div className="flex flex-col gap-5">
      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center gap-2 mb-3"><IconBadge icon={Target} color={C.rust} /><h3 style={{ fontFamily: F_LABEL, fontSize: 16, color: C.ink, letterSpacing: 0.5 }}>What this tool is for</h3></div>
        <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkMuted, lineHeight: 1.65 }}>
          A mathematically optimal decision and a robust one are not always the same decision. Decision Intelligence Suite takes an optimizer's output - a value per option, per scenario - and asks whether that optimum survives contact with uncertainty, hard constraints, and factors nobody can honestly price in dollars. It does not run an optimizer itself. The Scenario Log is where that output gets typed in, exactly the way a stock-ageing report gets typed into a spreadsheet.
        </p>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center gap-2 mb-3"><IconBadge icon={Compass} color={C.slate} /><h3 style={{ fontFamily: F_LABEL, fontSize: 16, color: C.ink, letterSpacing: 0.5 }}>What's real math vs. illustrative</h3></div>
        <div className="flex flex-col">
          <div className="py-3" style={{ borderLeft: `3px solid ${C.moss}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.moss }} className="mb-1">Real, computed live</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>Expected value, scenario win rate (ties split probability mass equally), worst-case value, worst-case regret - all computed directly from the Scenario Log. Soft-factor scoring multiplies Impact × Confidence × Reversibility weights. The Base Case allocation formula (Qs slider on Tripwires) reproduces both named endpoints exactly (₹514.7 Cr at Qs=0, ₹1,686.5 Cr at Qs=5,500); everything between is linear interpolation, not invention.</p>
          </div>
          <div className="py-3 mt-2" style={{ borderTop: `1px solid ${C.borderSoft}`, borderLeft: `3px solid ${C.amber}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.amber }} className="mb-1">Illustrative, not derived</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>The four non-base scenarios and their values are fictional. The four scenario tripwires are discrete lookups, not derived from a continuous variable - a slider there would imply precision that doesn't exist.</p>
          </div>
          <div className="py-3 mt-2" style={{ borderTop: `1px solid ${C.borderSoft}`, borderLeft: `3px solid ${C.rust}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.rust }} className="mb-1">Deliberately manual, not automated</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>Every impact / confidence / reversibility tag in Qualitative Factors is typed in by a person, on purpose. Having software silently assign "High impact" to retailer trust would just relocate the black box, not remove it. The weight each level carries is a ranking, not a valuation - it's deliberately never converted into ₹, and it's capped so it can only ever nudge the recommendation, never override the financial numbers on its own. Only an active hard constraint can do that.</p>
          </div>
        </div>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center gap-2 mb-3"><IconBadge icon={ScrollText} color={C.amber} /><h3 style={{ fontFamily: F_LABEL, fontSize: 16, color: C.ink, letterSpacing: 0.5 }}>What it deliberately does not do</h3></div>
        <ul style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkMuted, lineHeight: 1.9 }} className="list-disc pl-5">
          <li>It does not run or replace an optimizer - the Scenario Log is an input surface, not a solver.</li>
          <li>It does not convert goodwill, trust, or brand equity into ₹ - that's precisely what the qualitative-factor typing is for.</li>
          <li>It does not collapse robustness into one black-box score. Win rate, worst-case value, and worst-case regret are shown separately because they can disagree.</li>
          <li>It does not use AI to assign impact, confidence, or reversibility scores. Those stay a named person's call, on record.</li>
        </ul>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center gap-2 mb-3"><IconBadge icon={HelpCircle} color={C.slate} /><h3 style={{ fontFamily: F_LABEL, fontSize: 16, color: C.ink, letterSpacing: 0.5 }}>Isn't scoring a factor still quantifying it?</h3></div>
        <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.ink, lineHeight: 1.65 }} className="mb-4">
          Yes - technically, it is a form of quantification. Assigning weights to a factor and multiplying it into a formula puts a number on something qualitative. Pretending otherwise would undercut the credibility this tool depends on. The distinction that actually matters isn't numbers versus no numbers - it's what kind of number, and what it's allowed to do.
        </p>
        <div className="flex flex-col">
          <div className="py-3" style={{ borderLeft: `3px solid ${C.moss}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.moss }} className="mb-1">Ordinal, not cardinal</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>The weight scale is a ranking - count this for more than that - not a valuation. It never claims a factor is "worth ₹150 Cr." Converting to ₹ would make a far stronger, far less defensible claim: an exact magnitude, in the same unit as real revenue.</p>
          </div>
          <div className="py-3 mt-2" style={{ borderTop: `1px solid ${C.borderSoft}`, borderLeft: `3px solid ${C.amber}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.amber }} className="mb-1">Structurally capped</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>The soft-preference term is bounded to at most a 30% share of the tilt, no matter how many factors are stacked or how high the Strategic Weight is set. It can nudge the recommendation but never outvote the real financial data. A dollar figure folded into an objective function has no such ceiling - it could flip the recommendation on its own.</p>
          </div>
          <div className="py-3 mt-2" style={{ borderTop: `1px solid ${C.borderSoft}`, borderLeft: `3px solid ${C.rust}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.rust }} className="mb-1">Never merged into one number</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>The financial optimum and the robustness-adjusted position stay two separate markers on the Position Line, always. Merging qualitative weight into the same ₹ figure as the Scenario Log's output would make it impossible to tell how much of the final number is math and how much is judgment. Keeping them visibly apart is the actual audit trail.</p>
          </div>
          <div className="py-3 mt-2" style={{ borderTop: `1px solid ${C.borderSoft}`, borderLeft: `3px solid ${C.slate}`, paddingLeft: 12 }}>
            <div style={{ fontFamily: F_BODY, fontWeight: 600, fontSize: 13, color: C.slate }} className="mb-1">A veto, not a price</div>
            <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>Disqualifying an option via a hard constraint isn't "this factor is worth negative infinity dollars" - it's a categorical "this option is off the table." That's handled in the code as a boolean override, not a number in a sum.</p>
          </div>
        </div>
        <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }} className="mt-4">
          So the honest claim isn't that qualitative factors stay untouched by numbers - it's that the numbers touching them are ordinal, bounded, kept visibly separate, and overridable by you at every step. That's a narrower, more defensible claim than "we don't quantify qualitative factors," and it's the one this tool actually makes.
        </p>
      </BracketFrame>

      <BracketFrame style={{ padding: 24 }}>
        <div className="flex items-center gap-2 mb-3"><IconBadge icon={Info} color={C.inkMuted} /><h3 style={{ fontFamily: F_LABEL, fontSize: 16, color: C.ink, letterSpacing: 0.5 }}>Provenance & persistence</h3></div>
        <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkMuted, lineHeight: 1.6 }}>
          Thistlewood Foods, its Specialty Confections division, and every named scenario in this prototype are fictional. The two base-case endpoint values and the capacity-allocation formula carry over the numeric structure from a supply-chain case exercise; nothing here corresponds to any real company's figures. Full decision state (scenarios, factors, settings, options) is persisted to the browser's localStorage and can be exported/imported as JSON.
        </p>
      </BracketFrame>
    </div>
  );
}

/* ---------------------------------------------------------
   APP SHELL
--------------------------------------------------------- */
const TABS = [
  { key: "board", label: "Overview", icon: Gauge },
  { key: "log", label: "Scenario Log", icon: Table2 },
  { key: "intel", label: "Qualitative Factors", icon: Fingerprint },
  { key: "trip", label: "Tripwires", icon: Zap },
  { key: "settings", label: "Settings", icon: SlidersHorizontal },
  { key: "manual", label: "Methodology", icon: BookOpen },
];

function App() {
  const [tab, setTab] = useState("board");
  const [scenarios, setScenarios] = useState(DEFAULT_SCENARIOS);
  const [factors, setFactors] = useState(DEFAULT_FACTORS);
  const [saveStatus, setSaveStatus] = useState("idle");
  const userEditedRef = useRef(false);
  const [qsAllocation, setQsAllocation] = useState(MAX_SURGE);
  const [scaleAnimKey, setScaleAnimKey] = useState(0);
  const [riskPosture, setRiskPosture] = useState(40);
  const [softWeight, setSoftWeight] = useState(50);
  const [constraintActive, setConstraintActive] = useState(false);
  const [serviceFloorPct, setServiceFloorPct] = useState(90);
  const [coreCommitment, setCoreCommitment] = useState(15000);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  // Load full state once on mount
  useEffect(() => {
    let cancelled = false;
    try {
      const data = loadFullState();
      if (!cancelled && data && !userEditedRef.current) {
        if (Array.isArray(data.scenarios) && data.scenarios.length) setScenarios(data.scenarios);
        if (Array.isArray(data.factors)) setFactors(data.factors);
        if (typeof data.qsAllocation === "number") setQsAllocation(data.qsAllocation);
        if (typeof data.riskPosture === "number") setRiskPosture(data.riskPosture);
        if (typeof data.softWeight === "number") setSoftWeight(data.softWeight);
        if (typeof data.constraintActive === "boolean") setConstraintActive(data.constraintActive);
        if (typeof data.serviceFloorPct === "number") setServiceFloorPct(data.serviceFloorPct);
        if (typeof data.coreCommitment === "number") setCoreCommitment(data.coreCommitment);
        if (Array.isArray(data.options) && data.options.length) setOptions(data.options);
      }
    } catch { /* keep defaults */ }
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { setScaleAnimKey((k) => k + 1); }, []);

  const markEdit = (setter) => (value) => {
    userEditedRef.current = true;
    setter(value);
  };

  const getFullState = useCallback(() => ({
    scenarios, factors, qsAllocation, riskPosture, softWeight,
    constraintActive, serviceFloorPct, coreCommitment, options,
  }), [scenarios, factors, qsAllocation, riskPosture, softWeight, constraintActive, serviceFloorPct, coreCommitment, options]);

  const saveAll = () => {
    setSaveStatus("saving");
    const ok = saveFullState(getFullState());
    if (ok) {
      setSaveStatus("saved");
      setScaleAnimKey(Date.now());
    } else {
      setSaveStatus("error");
    }
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const handleExport = () => exportFullState(getFullState());

  const handleImport = (obj) => {
    const validated = validateImport(obj);
    if (!validated) {
      alert("Import failed: file does not contain a recognizable decision package.");
      return;
    }
    userEditedRef.current = true;
    if (validated.scenarios) setScenarios(validated.scenarios);
    if (validated.factors) setFactors(validated.factors);
    if (validated.qsAllocation != null) setQsAllocation(validated.qsAllocation);
    if (validated.riskPosture != null) setRiskPosture(validated.riskPosture);
    if (validated.softWeight != null) setSoftWeight(validated.softWeight);
    if (validated.constraintActive != null) setConstraintActive(validated.constraintActive);
    if (validated.serviceFloorPct != null) setServiceFloorPct(validated.serviceFloorPct);
    if (validated.coreCommitment != null) setCoreCommitment(validated.coreCommitment);
    if (validated.options) setOptions(validated.options);
    setScaleAnimKey(Date.now());
    alert("Import successful. Review the tabs to confirm the restored state.");
  };

  const metrics = useMemo(() => computeMetrics(scenarios, options), [scenarios, options]);
  const financialOptimumId = (metrics.surge?.ev ?? 0) >= (metrics.protect?.ev ?? 0) ? "surge" : "protect";
  const disqualified = useMemo(() => computeDisqualified(factors), [factors]);

  const derived = useMemo(() => computeDerived({
    metrics, factors, riskPosture, softWeight, disqualified, financialOptimumId, options,
  }), [metrics, factors, riskPosture, softWeight, disqualified, financialOptimumId, options]);

  const handleReset = () => {
    if (!window.confirm("Reset all scenarios, factors, and settings to defaults? This cannot be undone.")) return;
    userEditedRef.current = true;
    setScenarios(DEFAULT_SCENARIOS);
    setFactors(DEFAULT_FACTORS);
    setRiskPosture(40);
    setSoftWeight(50);
    setConstraintActive(false);
    setServiceFloorPct(90);
    setCoreCommitment(15000);
    setOptions(DEFAULT_OPTIONS);
    setQsAllocation(MAX_SURGE);
  };

    return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink }}>
      <style>{`
        * { box-sizing: border-box; }
        input:focus-visible, select:focus-visible, button:focus-visible, textarea:focus-visible { outline: 2px solid ${C.slate}; outline-offset: 1px; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
        @keyframes seesaw {
          0% { transform: rotate(0deg); }
          15% { transform: rotate(-16deg); }
          35% { transform: rotate(11deg); }
          55% { transform: rotate(-7deg); }
          75% { transform: rotate(3deg); }
          90% { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        .scale-anim { display: inline-flex; transform-origin: 50% 85%; animation: seesaw 1.4s cubic-bezier(0.36,0.07,0.19,0.97) both; }
        input[type="range"] { -webkit-appearance: none; height: 3px; background: ${C.border}; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; background: ${C.slate}; cursor: pointer; transform: rotate(45deg); border: 1px solid ${C.bg}; }
        input[type="range"]::-moz-range-thumb { width: 13px; height: 13px; background: ${C.slate}; cursor: pointer; transform: rotate(45deg); border: 1px solid ${C.bg}; border-radius:0; }
      `}</style>

      <header className="sticky top-0 z-10" style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div className="suite-header-main px-4 sm:px-6 lg:px-8 pt-3 pb-2 flex items-center gap-3">
          <div className="suite-brand flex items-center gap-3 min-w-0">
            <img className="suite-brand-logo shrink-0" src={suiteLogo.url} alt="Decision Intelligence Suite diamond logo" />
            <div className="suite-brand-copy min-w-0">
              <div style={{ fontFamily: F_DISPLAY, fontWeight: 600, fontSize: 20, letterSpacing: 0.4 }} className="suite-brand-title">
                <span className="suite-title-short" aria-hidden="true">DIS</span>
                <span>DECISION INTELLIGENCE SUITE</span>
              </div>
            </div>
          </div>
        </div>
        <div className="suite-tabs-shell">
          <div className="suite-tabs px-4 sm:px-6 lg:px-8 flex overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
          {TABS.map((t) => {
            const IconComp = t.icon; const active = tab === t.key;
            return (
              <button key={t.key} onClick={(event) => { setTab(t.key); event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); }} className="suite-tab flex items-center gap-1.5 px-3 whitespace-nowrap shrink-0"
                aria-current={active ? "page" : undefined}
                style={{ fontFamily: F_LABEL, letterSpacing: 0.5, fontSize: 12, background: "transparent", borderBottom: `2px solid ${active ? C.slate : "transparent"}`, borderRight: `1px solid ${C.borderSoft}`, color: active ? C.slate : C.inkMuted }}>
                <IconComp size={13} /> <span>{t.label.toUpperCase()}</span>
              </button>
            );
          })}
          </div>
        </div>
        <div style={{ height: 3, backgroundImage: `repeating-linear-gradient(135deg, ${C.rust}66 0 6px, transparent 6px 12px)` }} />
      </header>

      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl lg:max-w-5xl mx-auto">
        {tab === "board" && <SituationBoard metrics={metrics} financialOptimumId={financialOptimumId} disqualified={disqualified} financialPct={derived.financialPct} robustPct={derived.robustPct} robustPctRaw={derived.robustPctRaw} fragility={derived.fragility} fragilityReasons={derived.fragilityReasons} factors={factors} goTo={setTab} options={options} softContribution={derived.softContribution} />}
        {tab === "log" && <ScenarioLog scenarios={scenarios} setScenarios={markEdit(setScenarios)} options={options} />}
        {tab === "intel" && <FieldIntel factors={factors} setFactors={markEdit(setFactors)} onSave={saveAll} saveStatus={saveStatus} options={options} />}
        {tab === "trip" && <Tripwires scenarios={scenarios} metrics={metrics} constraintActive={constraintActive} serviceFloorPct={serviceFloorPct} coreCommitment={coreCommitment} goTo={setTab} qs={qsAllocation} setQs={markEdit(setQsAllocation)} onSaveQs={saveAll} qsSaveStatus={saveStatus} options={options} />}
        {tab === "settings" && <CommandSettings riskPosture={riskPosture} setRiskPosture={markEdit(setRiskPosture)} softWeight={softWeight} setSoftWeight={markEdit(setSoftWeight)} constraintActive={constraintActive} setConstraintActive={markEdit(setConstraintActive)} serviceFloorPct={serviceFloorPct} setServiceFloorPct={markEdit(setServiceFloorPct)} coreCommitment={coreCommitment} setCoreCommitment={markEdit(setCoreCommitment)} onReset={handleReset} options={options} setOptions={markEdit(setOptions)} onSave={saveAll} saveStatus={saveStatus} onExport={handleExport} onImport={handleImport} />}
        {tab === "manual" && <FieldManual />}
      </main>

      <footer className="px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between flex-wrap gap-2" style={{ borderTop: `1px solid ${C.borderSoft}` }}>
        <span style={{ fontFamily: F_LABEL, fontWeight: 600, fontSize: 10.5, letterSpacing: 2.5, color: C.inkMuted, textTransform: "uppercase" }}>Discern · Decide · Direct</span>
        <span style={{ fontFamily: F_LABEL, fontSize: 10.5, letterSpacing: 0.5, color: C.inkFaint, textTransform: "uppercase" }}>Clarity through structure. Confidence through discernment.</span>
      </footer>
    </div>
  );
}

export default App;
