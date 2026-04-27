"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Search, PenTool, Cpu, ShieldCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURED = [
  {
    id: "compliance-engine",
    number: "01",
    title: "ATO Compliance Engine",
    subtitle: "Australian Financial Group · 2022",
    color: "emerald",
    summary: "Transformed a 15%-error-rate manual compliance process into a fully automated, zero-penalty validation system.",
    tags: ["Xero API", "Automation", "ATO", "Python Scripts"],
    stats: [
      { label: "Error Rate", before: "15%", after: "0.3%" },
      { label: "Month-End Close", before: "7 days", after: "4 days" },
      { label: "Audit Penalties", before: "$12k/yr", after: "$0" },
    ],
    impact: "100% ATO compliance maintained across 3 consecutive financial years with zero escalations.",
  },
  {
    id: "cloud-migration",
    number: "02",
    title: "50-Client Cloud Migration",
    subtitle: "TechScale Partners · 2019–2020",
    color: "blue",
    summary: "Migrated a fragmented, multi-system client portfolio to a unified cloud ecosystem with automated reconciliation.",
    tags: ["NetSuite", "Xero", "API Integration", "Data Migration"],
    stats: [
      { label: "Reconciliation Accuracy", before: "~82%", after: "100%" },
      { label: "Manual Hours / Week", before: "20+ hrs", after: "2 hrs" },
      { label: "Clients Migrated", before: "0", after: "50+" },
    ],
    impact: "Recovered 18 hours per week across the team — redirected entirely to advisory revenue.",
  },
  {
    id: "onboarding-portal",
    number: "03",
    title: "Automated Onboarding Portal",
    subtitle: "Enterprise Advisory · 2017",
    color: "purple",
    summary: "Reduced a 3-week manual onboarding process to 4 days using standardised templates and digital intake flows.",
    tags: ["Workflow Design", "Digital Forms", "Audit Prep", "SOPs"],
    stats: [
      { label: "Onboarding Duration", before: "21 days", after: "4 days" },
      { label: "Client Retention", before: "baseline", after: "+20%" },
      { label: "Drop-off Rate", before: "High", after: "Near zero" },
    ],
    impact: "20% retention uplift generated significant recurring revenue growth in year one.",
  },
];

const METHODOLOGY = [
  { id: "01", icon: Search, name: "Diagnose", desc: "Audit existing workflows and quantify the cost of the problem." },
  { id: "02", icon: PenTool, name: "Design", desc: "Architect a scalable solution tailored to operational goals." },
  { id: "03", icon: Cpu, name: "Automate", desc: "Deploy integrations to eliminate manual touchpoints." },
  { id: "04", icon: ShieldCheck, name: "Validate", desc: "Embed compliance rules directly into system logic." },
  { id: "05", icon: TrendingUp, name: "Optimize", desc: "Monitor KPIs and iterate for maximum efficiency." },
];

function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const end = value;
          const duration = 1800;
          const startTime = performance.now();

          const animate = (now: number) => {
            const pct = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(2, -10 * pct);
            setCount(Math.floor(end * ease));
            if (pct < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
}

const COLOR_MAP = {
  emerald: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    accent: "text-emerald-400",
    bar: "bg-emerald-500",
    active: "border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]",
    tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  blue: {
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    accent: "text-blue-400",
    bar: "bg-blue-500",
    active: "border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]",
    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-500",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    accent: "text-purple-400",
    bar: "bg-purple-500",
    active: "border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.1)]",
    tag: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    dot: "bg-purple-500",
  },
};

export default function Projects() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
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
              Projects
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Featured{" "}
            <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            Three systems that fundamentally changed how their organisations operate — with numbers to prove it.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-4 mb-24">
          {FEATURED.map((project, i) => {
            const c = COLOR_MAP[project.color as keyof typeof COLOR_MAP];
            const isOpen = activeId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "glass rounded-3xl border border-white/5 overflow-hidden transition-all duration-500",
                  isOpen && c.active
                )}
              >
                {/* Card header (always visible) */}
                <button
                  onClick={() => setActiveId(isOpen ? null : project.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <span
                      className={cn(
                        "text-4xl font-bold font-mono shrink-0 opacity-30 transition-opacity",
                        isOpen && "opacity-100",
                        c.accent
                      )}
                    >
                      {project.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight truncate">
                        {project.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">{project.subtitle}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300",
                      isOpen
                        ? `${c.tag} rotate-45`
                        : "border-white/10 text-slate-500 hover:text-slate-300"
                    )}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </button>

                {/* Expanded case study */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 border-t border-white/5 pt-6 space-y-6">
                        {/* Summary */}
                        <p className="text-slate-300 leading-relaxed">{project.summary}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "px-2.5 py-1 rounded-lg text-xs font-mono border",
                                c.tag
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Before / After stats */}
                        <div className="grid sm:grid-cols-3 gap-3">
                          {project.stats.map((stat) => (
                            <div key={stat.label} className="bg-slate-900/60 rounded-2xl p-4">
                              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                                {stat.label}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-600 text-sm line-through font-mono">
                                  {stat.before}
                                </span>
                                <span className="text-slate-600 text-xs">→</span>
                                <span className={cn("font-bold text-base font-mono", c.accent)}>
                                  {stat.after}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Impact callout */}
                        <div
                          className={cn(
                            "flex items-start gap-3 p-4 rounded-2xl border",
                            c.tag
                          )}
                        >
                          <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", c.dot)} />
                          <p className="text-sm leading-relaxed">{project.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Methodology section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              The Optimization Protocol
            </h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              My systematic 5-step approach to transforming financial chaos into high-performance systems.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-px bg-slate-800 z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
              {METHODOLOGY.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 rounded-2xl glass border border-slate-700/50 flex items-center justify-center mb-4 relative group-hover:border-emerald-500/40 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 bg-slate-900">
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono text-slate-600">
                      {step.id}
                    </span>
                    <step.icon
                      size={24}
                      className="text-slate-400 group-hover:text-emerald-400 transition-colors"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{step.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Impact numbers bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: 30, suffix: "%", label: "Compliance Error Reduction" },
            { value: 25, suffix: "%", label: "Faster Processing Time" },
            { value: 40, suffix: "%", label: "Faster Month-End Close" },
            { value: 20, suffix: "h", label: "Saved Per Week" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="glass p-6 rounded-2xl text-center border border-white/5 hover:border-emerald-500/20 transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <AnimatedNumber value={stat.value} />
                <span className="text-emerald-400">{stat.suffix}</span>
              </div>
              <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
