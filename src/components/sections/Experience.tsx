"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Target, Settings, TrendingUp, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    id: 1,
    year: "2021 — Present",
    role: "Senior Accountant & Systems Lead",
    company: "Australian Financial Group",
    location: "Remote · Australia",
    badge: "Current",
    badgeColor: "emerald",
    tags: ["Xero", "ATO", "Automation", "Compliance"],
    problem:
      "Manual compliance checks were causing a 15% error rate and delaying month-end close by 5 days, creating cascading downstream risks.",
    solution:
      "Architected a validated ATO compliance workflow integrating Xero with custom automation scripts, establishing systematic validation checkpoints at every data entry stage.",
    outcome:
      "Reduced compliance errors by 30% and accelerated month-end close by 40%. Zero audit penalties in 3 consecutive financial years.",
    metrics: [
      { label: "Error Reduction", value: "30%" },
      { label: "Faster Close", value: "40%" },
      { label: "Audit Penalties", value: "0" },
    ],
  },
  {
    id: 2,
    year: "2018 — 2021",
    role: "Financial Controller",
    company: "TechScale Partners",
    location: "Surat · India",
    badge: "3 years",
    badgeColor: "blue",
    tags: ["NetSuite", "Xero", "Cloud Migration", "Payroll"],
    problem:
      "Disparate payroll and taxation systems across 50+ clients led to reconciliation discrepancies consuming 20+ hours per week in manual correction.",
    solution:
      "Migrated all clients to a unified cloud ecosystem (NetSuite & Xero) with automated reconciliation rules, standardised chart-of-accounts templates, and real-time exception alerts.",
    outcome:
      "Achieved 100% reconciliation accuracy across all clients and saved 20 hours per week in manual entry — time redirected to advisory work.",
    metrics: [
      { label: "Reconciliation Accuracy", value: "100%" },
      { label: "Hours Saved / Week", value: "20h" },
      { label: "Clients Migrated", value: "50+" },
    ],
  },
  {
    id: 3,
    year: "2015 — 2018",
    role: "Taxation & Audit Specialist",
    company: "Enterprise Advisory",
    location: "Surat · India",
    badge: "3 years",
    badgeColor: "purple",
    tags: ["BAS", "IAS", "Audit Prep", "Client Onboarding"],
    problem:
      "Client onboarding was a manual, 3-week process with inconsistent data quality and high early drop-off rates that eroded firm revenue.",
    solution:
      "Designed an automated intake and audit-prep portal using standardised data templates, digital checklists, and guided document collection flows.",
    outcome:
      "Decreased onboarding time from 21 days to 4 days and increased client retention rate by 20% in the first year of deployment.",
    metrics: [
      { label: "Onboarding Time", value: "4d" },
      { label: "Retention Increase", value: "20%" },
      { label: "Time Reduction", value: "80%" },
    ],
  },
];

export default function Experience() {
  const [activeId, setActiveId] = useState<number>(1);
  const active = EXPERIENCES.find((e) => e.id === activeId)!;

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
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
              Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Systems I&apos;ve Built &{" "}
            <span className="gradient-text">Optimized</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-start">
          {/* Sidebar timeline */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 lg:sticky lg:top-28">
            {EXPERIENCES.map((exp, i) => (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveId(exp.id)}
                className={cn(
                  "flex-shrink-0 lg:flex-shrink text-left px-5 py-4 rounded-2xl border transition-all duration-300 relative overflow-hidden",
                  activeId === exp.id
                    ? "glass-emerald border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "glass border-white/5 hover:border-white/10"
                )}
              >
                {activeId === exp.id && (
                  <motion.div
                    layoutId="exp-indicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-emerald-500 rounded-r"
                  />
                )}
                <div
                  className={cn(
                    "text-xs font-mono mb-1 font-semibold",
                    activeId === exp.id ? "text-emerald-400" : "text-slate-500"
                  )}
                >
                  {exp.year}
                </div>
                <div
                  className={cn(
                    "font-semibold text-sm leading-tight",
                    activeId === exp.id ? "text-white" : "text-slate-300"
                  )}
                >
                  {exp.role}
                </div>
                <div
                  className={cn(
                    "text-xs mt-0.5",
                    activeId === exp.id ? "text-slate-400" : "text-slate-600"
                  )}
                >
                  {exp.company}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl border border-white/5 overflow-hidden"
            >
              {/* Card header */}
              <div className="p-6 sm:p-8 border-b border-white/5">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{active.role}</h3>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span>{active.company}</span>
                      <span className="text-slate-700">·</span>
                      <span>{active.location}</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      active.badgeColor === "emerald"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : active.badgeColor === "blue"
                        ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                        : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                    )}
                  >
                    {active.badge}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Case study body */}
              <div className="p-6 sm:p-8 space-y-5">
                {[
                  { icon: Target, color: "red", label: "The Challenge", text: active.problem },
                  { icon: Settings, color: "blue", label: "System Architecture", text: active.solution },
                  { icon: TrendingUp, color: "emerald", label: "Measurable Outcome", text: active.outcome },
                ].map(({ icon: Icon, color, label, text }) => (
                  <div key={label} className="flex gap-4">
                    <div
                      className={cn(
                        "mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                        color === "red"
                          ? "bg-red-500/10 text-red-400"
                          : color === "blue"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      )}
                    >
                      <Icon size={15} />
                    </div>
                    <div>
                      <div
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wider mb-1.5",
                          color === "red"
                            ? "text-red-400/70"
                            : color === "blue"
                            ? "text-blue-400/70"
                            : "text-emerald-400/70"
                        )}
                      >
                        {label}
                      </div>
                      <p
                        className={cn(
                          "text-sm leading-relaxed",
                          color === "emerald" ? "text-white font-medium" : "text-slate-300"
                        )}
                      >
                        {text}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Metrics strip */}
                <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-3">
                  {active.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="text-center p-3 rounded-xl bg-slate-900/60"
                    >
                      <div className="text-xl font-bold text-emerald-400 mb-0.5">{m.value}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next case study button */}
              <div className="px-6 sm:px-8 pb-6 flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  {EXPERIENCES.indexOf(active) + 1} / {EXPERIENCES.length}
                </span>
                {EXPERIENCES.indexOf(active) < EXPERIENCES.length - 1 && (
                  <button
                    onClick={() =>
                      setActiveId(EXPERIENCES[EXPERIENCES.indexOf(active) + 1].id)
                    }
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors group"
                  >
                    Next case study
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                )}
                {EXPERIENCES.indexOf(active) === EXPERIENCES.length - 1 && (
                  <button
                    onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
                    className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors group"
                  >
                    View capabilities
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
