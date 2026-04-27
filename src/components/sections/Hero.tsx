"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ProfileImage from "@/components/ui/ProfileImage";
import { ArrowDown, ArrowRight, ShieldCheck, Users, Zap, TrendingUp } from "lucide-react";

const NAME = "Jatin Dave";
const ROLES = [
  "Financial Systems Optimizer",
  "ATO Compliance Architect",
  "Automation Strategist",
  "Senior Accountant",
];

const METRICS = [
  { value: "100%", label: "ATO Compliance", icon: ShieldCheck, color: "emerald" },
  { value: "50+", label: "Clients Managed", icon: Users, color: "blue" },
  { value: "30%", label: "Error Reduction", icon: Zap, color: "purple" },
  { value: "25%", label: "Efficiency Gain", icon: TrendingUp, color: "emerald" },
];

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && display === word) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && display === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else if (deleting) {
      timeout = setTimeout(() => setDisplay((d) => d.slice(0, -1)), 40);
    } else {
      timeout = setTimeout(
        () => setDisplay(word.slice(0, display.length + 1)),
        60
      );
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, index, words]);

  return (
    <span>
      <span className="gradient-text">{display}</span>
      <span className="terminal-cursor ml-0.5" />
    </span>
  );
}

const charVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_30%,transparent_100%)]" />

      {/* Glow orbs */}
      <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px] float-slow pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px] float-delayed pointer-events-none" />
      <div className="absolute top-[60%] left-[40%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] float pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-28 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Avatar + status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4 mb-10"
          >
            {/* Circular avatar */}
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-emerald-500/40 to-blue-500/20 blur-md" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/40">
                <ProfileImage
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="96px"
                />
              </div>
              {/* Online dot */}
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#050b14] flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              </span>
            </div>

            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-emerald text-emerald-300 text-sm font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Available for opportunities
            </div>
          </motion.div>

          {/* Animated name */}
          <div className="mb-4 overflow-hidden" style={{ perspective: "600px" }}>
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex items-center justify-center flex-wrap gap-x-[0.35em] gap-y-1"
            >
              {NAME.split(" ").map((word, wi) => (
                <span key={wi} className="flex">
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={`${wi}-${ci}`}
                      custom={wi * 5 + ci}
                      variants={charVariants}
                      className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-300 mb-6 min-h-[2.5rem] flex items-center justify-center"
          >
            <Typewriter words={ROLES} />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            9+ years transforming accounting chaos into high-performance financial
            systems — from compliance workflows to automated ecosystems that scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Explore My Systems
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl glass border border-white/10 hover:border-emerald-500/40 text-slate-200 font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Let&apos;s Connect
            </button>
          </motion.div>

          {/* Metrics row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {METRICS.map((metric, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`glass p-5 rounded-2xl flex flex-col items-center text-center group border transition-all duration-300 ${
                  metric.color === "emerald"
                    ? "border-slate-800 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : metric.color === "blue"
                    ? "border-slate-800 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "border-slate-800 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                }`}
              >
                <metric.icon
                  size={22}
                  className={`mb-2.5 group-hover:scale-110 transition-transform ${
                    metric.color === "emerald"
                      ? "text-emerald-400"
                      : metric.color === "blue"
                      ? "text-blue-400"
                      : "text-purple-400"
                  }`}
                />
                <div className="text-2xl font-bold text-white mb-0.5">{metric.value}</div>
                <div className="text-[11px] text-slate-500 font-medium leading-tight">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-600 uppercase tracking-widest font-medium">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
