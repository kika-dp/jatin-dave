"use client";

import { motion } from "framer-motion";
import ProfileImage from "@/components/ui/ProfileImage";
import { Brain, Target, Zap, BarChart3, ArrowRight, MapPin, Calendar } from "lucide-react";

const MINDSET_CARDS = [
  {
    icon: Brain,
    title: "Systems Thinker",
    desc: "I don't fix symptoms — I redesign the underlying process. Every financial problem is a systems problem waiting to be architected.",
    color: "emerald",
  },
  {
    icon: Target,
    title: "Precision Focused",
    desc: "In finance, error rates are not a metric — they're a liability. I build workflows where 100% accuracy isn't a goal, it's the baseline.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Automation First",
    desc: "If a human is doing something a machine can verify, that's wasted talent. I systematically eliminate manual touchpoints.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Impact Obsessed",
    desc: "I measure success in hours recovered, errors eliminated, and clients retained — not in reports filed or hours billed.",
    color: "emerald",
  },
];

const TRANSFORMATIONS = [
  { before: "Manual Entry & Spot Checks", after: "Automated Bank Feeds + OCR Rules" },
  { before: "Error-prone Compliance", after: "100% Validated ATO Workflows" },
  { before: "Delayed Spreadsheet Reports", after: "Real-time Financial Dashboards" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/40" />
      <div className="absolute inset-0 bg-grid-sm opacity-50" />

      {/* Ambient glow behind photo */}
      <div className="absolute top-1/4 left-[15%] w-80 h-80 bg-emerald-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
              About
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
            I think in systems,{" "}
            <span className="gradient-text">not spreadsheets.</span>
          </h2>
        </motion.div>

        {/* Main 3-col layout: photo | story | cards */}
        <div className="grid lg:grid-cols-[280px_1fr_1fr] gap-10 lg:gap-12 items-start">

          {/* ── Column 1: Profile photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col items-center lg:items-start gap-4"
          >
            {/* Photo frame */}
            <div className="relative float">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-b from-emerald-500/20 to-blue-500/10 blur-xl" />

              {/* Animated border ring */}
              <div className="absolute -inset-[2px] rounded-3xl gradient-border" />

              {/* Photo */}
              <div className="relative w-[240px] h-[320px] lg:w-[280px] lg:h-[373px] rounded-3xl overflow-hidden">
                <ProfileImage
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 240px, 280px"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>

              {/* Available badge — bottom overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-emerald-500/30 text-xs font-medium text-emerald-300 whitespace-nowrap">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Available
              </div>
            </div>

            {/* Name + meta chips */}
            <div className="text-center lg:text-left w-[240px] lg:w-full">
              <div className="text-lg font-bold text-white mb-0.5">Jatin Dave</div>
              <div className="text-sm text-slate-400 mb-3">Senior Accountant & Systems Lead</div>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="flex items-center gap-1 text-[11px] text-slate-500 glass px-2 py-1 rounded-lg">
                  <MapPin size={10} className="text-emerald-400" /> Surat, India
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 glass px-2 py-1 rounded-lg">
                  <Calendar size={10} className="text-blue-400" /> 9+ yrs exp.
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Column 2: Bio + transformation table ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-6"
          >
            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>
                Over 9 years in financial operations taught me one thing:{" "}
                <span className="text-white font-medium">
                  most accounting problems are really architecture problems.
                </span>{" "}
                The reconciliation that takes 3 days, the compliance check that fails
                every quarter — these aren&apos;t just mistakes. They&apos;re signals that
                the system itself needs redesigning.
              </p>
              <p>
                My approach blends deep accounting expertise with an engineer&apos;s
                mindset. I&apos;ve migrated 50+ clients onto unified cloud ecosystems,
                built ATO-compliant automation pipelines, and rebuilt entire
                departments around measurable outcomes rather than billable hours.
              </p>
              <p className="text-slate-500 text-sm">
                Based in Surat, India — operating globally for Australian and
                international clients.
              </p>
            </div>

            {/* Transformation table */}
            <div className="rounded-2xl glass border border-white/5 overflow-hidden">
              <div className="grid grid-cols-2 text-[11px] font-semibold uppercase tracking-widest text-slate-500 px-5 py-3 border-b border-white/5">
                <span>Before</span>
                <span className="text-emerald-500">Optimized</span>
              </div>
              {TRANSFORMATIONS.map((t, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 px-5 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm text-slate-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-500/60 shrink-0" />
                    {t.before}
                  </span>
                  <span className="text-sm text-emerald-300 flex items-center gap-1.5 pl-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                    {t.after}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Column 3: Mindset cards ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3"
          >
            {MINDSET_CARDS.map((card, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className={`p-4 rounded-2xl border transition-all duration-300 group ${
                  card.color === "emerald"
                    ? "glass-emerald hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : card.color === "blue"
                    ? "glass-blue hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                    : "glass-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      card.color === "emerald"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : card.color === "blue"
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-purple-500/15 text-purple-400"
                    }`}
                  >
                    <card.icon size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1">{card.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.button
              variants={itemVariants}
              onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              className="p-4 rounded-2xl glass border border-white/5 hover:border-emerald-500/30 flex items-center justify-between group transition-all duration-300"
              whileHover={{ y: -2 }}
            >
              <div className="text-left">
                <div className="text-sm font-semibold text-white mb-0.5">See the work</div>
                <div className="text-xs text-slate-500">3 case studies, measurable impact</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                <ArrowRight size={14} />
              </div>
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
