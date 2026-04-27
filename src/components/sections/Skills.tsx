"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Database, ShieldAlert, Users, Settings, LineChart, UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
  {
    id: "systems",
    name: "Financial Systems",
    icon: Database,
    level: 95,
    color: "emerald",
    tools: ["Xero", "QuickBooks", "NetSuite", "MYOB"],
    desc: "Architecting scalable ledger environments with automated bank feeds, custom chart-of-accounts, and real-time dashboards.",
  },
  {
    id: "compliance",
    name: "Compliance & Tax",
    icon: ShieldAlert,
    level: 100,
    color: "blue",
    tools: ["ATO Regulations", "BAS", "IAS", "GST"],
    desc: "Building 100% compliant, automated tax workflows with embedded validation rules for zero-penalty outcomes.",
  },
  {
    id: "audit",
    name: "Audit & Risk",
    icon: UserCheck,
    level: 88,
    color: "purple",
    tools: ["Internal Controls", "Reconciliation", "Exception Alerts"],
    desc: "Designing bulletproof validation processes and internal control frameworks that surface anomalies before they compound.",
  },
  {
    id: "payroll",
    name: "Payroll Systems",
    icon: Users,
    level: 82,
    color: "emerald",
    tools: ["KeyPay", "Xero Payroll", "Award Interpretation"],
    desc: "Streamlining multi-entity payroll operations with automated award compliance and real-time super calculations.",
  },
  {
    id: "automation",
    name: "Process Automation",
    icon: Settings,
    level: 90,
    color: "blue",
    tools: ["Zapier", "Custom Scripts", "API Integrations"],
    desc: "Systematically eliminating manual data entry through automated pipelines, OCR rules, and scheduled reconciliation.",
  },
  {
    id: "leadership",
    name: "Team Leadership",
    icon: LineChart,
    level: 85,
    color: "purple",
    tools: ["KPI Frameworks", "SOP Development", "Team Scaling"],
    desc: "Structuring high-performance accounting teams around measurable outcomes rather than hours billed.",
  },
];

const COLOR_MAP = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bar: "bg-gradient-to-r from-emerald-600 to-emerald-400",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    active: "glass-emerald border-emerald-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/30",
    bar: "bg-gradient-to-r from-blue-600 to-blue-400",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    active: "glass-blue border-blue-500/30",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/30",
    bar: "bg-gradient-to-r from-purple-600 to-purple-400",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
    active: "glass-purple border-purple-500/30",
  },
};

export default function Skills() {
  const [activeId, setActiveId] = useState<string>("systems");
  const active = CAPABILITIES.find((c) => c.id === activeId)!;
  const colors = COLOR_MAP[active.color as keyof typeof COLOR_MAP];

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-slate-950/30">
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
              Capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Capability{" "}
            <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Six core domains — each a system I&apos;ve designed, deployed, and optimized across real client environments.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Capability grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-3"
          >
            {CAPABILITIES.map((cap, i) => {
              const c = COLOR_MAP[cap.color as keyof typeof COLOR_MAP];
              const isActive = activeId === cap.id;
              return (
                <motion.button
                  key={cap.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setActiveId(cap.id)}
                  className={cn(
                    "text-left p-5 rounded-2xl border transition-all duration-300",
                    isActive
                      ? `${c.active} ${c.glow}`
                      : "glass border-white/5 hover:border-white/10"
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                      isActive ? `${c.bg} ${c.text}` : "bg-slate-800 text-slate-500"
                    )}
                  >
                    <cap.icon size={19} />
                  </div>

                  <div
                    className={cn(
                      "text-sm font-semibold mb-3 transition-colors",
                      isActive ? "text-white" : "text-slate-300"
                    )}
                  >
                    {cap.name}
                  </div>

                  {/* Level bar */}
                  <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", c.bar)}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cap.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.07 + 0.2, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px]">
                    <span className={isActive ? c.text : "text-slate-600"}>Proficiency</span>
                    <span className={isActive ? c.text : "text-slate-600"}>{cap.level}%</span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "rounded-3xl border p-6 space-y-5 transition-all duration-300",
                colors.active,
                colors.glow
              )}
            >
              {/* Cap header */}
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    colors.bg,
                    colors.text
                  )}
                >
                  <active.icon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{active.name}</h3>
                  <div className={cn("text-sm font-semibold", colors.text)}>
                    {active.level}% proficiency
                  </div>
                </div>
              </div>

              {/* HUD progress ring (CSS-only) */}
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      strokeWidth="8"
                      strokeLinecap="round"
                      className={cn(
                        active.color === "emerald"
                          ? "stroke-emerald-400"
                          : active.color === "blue"
                          ? "stroke-blue-400"
                          : "stroke-purple-400"
                      )}
                      strokeDasharray={`${2 * Math.PI * 44}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 44 }}
                      animate={{
                        strokeDashoffset:
                          2 * Math.PI * 44 * (1 - active.level / 100),
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className={cn("text-2xl font-bold", colors.text)}>{active.level}%</span>
                    <span className="text-[10px] text-slate-500">proficiency</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed">{active.desc}</p>

              {/* Tools */}
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-600 font-semibold mb-2">
                  Tools & Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {active.tools.map((tool) => (
                    <span
                      key={tool}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-mono",
                        colors.bg,
                        colors.text,
                        "border",
                        colors.border
                      )}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
