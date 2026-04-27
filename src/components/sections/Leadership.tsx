"use client";

import { motion } from "framer-motion";
import { Network, Users, Activity, Crosshair, ShieldCheck, GitBranch, Target, Layers } from "lucide-react";

const SATELLITE_NODES = [
  { angle: 0, label: "Tax Team", icon: Users, color: "emerald" },
  { angle: 72, label: "Audit", icon: Crosshair, color: "blue" },
  { angle: 144, label: "Payroll", icon: Users, color: "purple" },
  { angle: 216, label: "Advisors", icon: Activity, color: "blue" },
  { angle: 288, label: "Compliance", icon: ShieldCheck, color: "emerald" },
];

const STATS = [
  {
    icon: Users,
    title: "Team of 10+ Accountants",
    desc: "Restructured a decentralised department into specialised, agile pods focused on specific financial verticals — each with clear KPIs.",
    color: "emerald",
    metric: "10+",
    metricLabel: "team members led",
  },
  {
    icon: Target,
    title: "KPI-Driven Performance",
    desc: "Shifted management from 'hours billed' to 'value delivered' — dashboards tracking error rates, processing times, and client outcomes.",
    color: "blue",
    metric: "0",
    metricLabel: "hours-based reviews",
  },
  {
    icon: Layers,
    title: "Standardised Workflows",
    desc: "Created comprehensive SOP libraries eliminating single-points-of-failure and enabling any team member to own any process.",
    color: "purple",
    metric: "30+",
    metricLabel: "SOPs documented",
  },
  {
    icon: GitBranch,
    title: "Knowledge Architecture",
    desc: "Built internal training systems that upskilled junior accountants into financial analysts within 12 months of joining.",
    color: "emerald",
    metric: "12mo",
    metricLabel: "junior → analyst path",
  },
];

const COLOR_MAP = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-l-emerald-500",
    metric: "text-emerald-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-l-blue-500",
    metric: "text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-l-purple-500",
    metric: "text-purple-400",
  },
};

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 md:py-32 relative overflow-hidden bg-slate-950/50">
      <div className="absolute inset-0 bg-grid-sm opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px section-separator" />

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
              Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl">
            Scaling{" "}
            <span className="gradient-text">Human Capital</span>
          </h2>
          <p className="text-slate-400 mt-3 max-w-xl">
            A system is only as strong as the team running it. I build frameworks that
            transform data-entry clerks into financial analysts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Org network visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[420px] glass rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center"
          >
            {/* Grid background */}
            <div className="absolute inset-0 bg-grid-sm opacity-60" />

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-radial from-emerald-500/5 via-transparent to-transparent" />

            <div className="relative z-10 w-[280px] h-[280px]">
              {/* SVG for all lines */}
              <svg
                className="absolute inset-0 w-full h-full overflow-visible"
                viewBox="-140 -140 280 280"
              >
                {SATELLITE_NODES.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const r = 110;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  return (
                    <motion.line
                      key={i}
                      x1="0"
                      y1="0"
                      x2={x}
                      y2={y}
                      stroke={
                        node.color === "emerald"
                          ? "rgba(16,185,129,0.25)"
                          : node.color === "blue"
                          ? "rgba(59,130,246,0.25)"
                          : "rgba(139,92,246,0.25)"
                      }
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      initial={{ opacity: 0, pathLength: 0 }}
                      whileInView={{ opacity: 1, pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    />
                  );
                })}
              </svg>

              {/* Central node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center z-20 text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.5)] float"
              >
                <Network size={28} />
              </motion.div>

              {/* Satellite nodes */}
              {SATELLITE_NODES.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const r = 110;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                const c = COLOR_MAP[node.color as keyof typeof COLOR_MAP];
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4 + i * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                    whileHover={{ scale: 1.15 }}
                    className="absolute top-1/2 left-1/2 flex flex-col items-center gap-1"
                    style={{
                      transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                    }}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl ${c.bg} ${c.text} border border-current border-opacity-20 flex items-center justify-center backdrop-blur-sm`}
                    >
                      <node.icon size={18} />
                    </div>
                    <span className="text-[9px] text-slate-500 whitespace-nowrap font-medium">
                      {node.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {STATS.map((stat, i) => {
              const c = COLOR_MAP[stat.color as keyof typeof COLOR_MAP];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -3 }}
                  className={`glass p-5 rounded-2xl border-l-4 ${c.border} border border-white/5 transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.text} flex items-center justify-center`}>
                      <stat.icon size={16} />
                    </div>
                    <div className={`text-xl font-bold ${c.metric}`}>{stat.metric}</div>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{stat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
                  <div className={`text-[10px] ${c.text} mt-2 font-mono opacity-70`}>
                    {stat.metricLabel}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
