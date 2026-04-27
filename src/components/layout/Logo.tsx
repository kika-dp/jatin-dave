"use client";

import { motion } from "framer-motion";

interface LogoProps {
  onClick?: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 group focus:outline-none"
      aria-label="Go to top"
    >
      {/* ── SVG Mark ── */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="relative shrink-0"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(16,185,129,0.0)] group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all duration-300"
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="logo-grad-dim" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
            </linearGradient>
            <clipPath id="logo-clip">
              <rect width="40" height="40" rx="11" />
            </clipPath>
          </defs>

          {/* Background */}
          <rect width="40" height="40" rx="11" fill="#0a1628" />
          <rect width="40" height="40" rx="11" fill="url(#logo-grad-dim)" />

          {/* Border */}
          <rect
            x="0.75"
            y="0.75"
            width="38.5"
            height="38.5"
            rx="10.25"
            stroke="url(#logo-grad)"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />

          {/* ── J stroke ── */}
          {/* Top serif bar */}
          <line x1="8.5" y1="10" x2="16" y2="10" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
          {/* Vertical stem */}
          <line x1="14" y1="10" x2="14" y2="25.5" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
          {/* Hook at bottom — curves left */}
          <path
            d="M14 25.5 Q14 30.5 9.5 30.5 Q7 30.5 7 28"
            stroke="url(#logo-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* ── D stroke ── */}
          {/* Vertical stem */}
          <line x1="20" y1="10" x2="20" y2="30.5" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" />
          {/* Outer arc — bulges to the right */}
          <path
            d="M20 10 Q33 10 33 20.25 Q33 30.5 20 30.5"
            stroke="url(#logo-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Subtle inner glow dot */}
          <circle cx="20" cy="20" r="1.5" fill="url(#logo-grad)" opacity="0.4" />
        </svg>
      </motion.div>

      {/* ── Wordmark ── */}
      <div className="hidden sm:flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
          Jatin{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            Dave
          </span>
        </span>
        <span className="text-[9px] font-mono text-slate-600 tracking-[0.18em] uppercase mt-0.5 group-hover:text-slate-500 transition-colors">
          Financial Systems
        </span>
      </div>
    </button>
  );
}
