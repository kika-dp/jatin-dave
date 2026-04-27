"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = ["hero", "about", "experience", "skills", "projects", "leadership", "contact"];

interface NavigationProps {
  onOpenPalette: () => void;
}

export default function Navigation({ onOpenPalette }: NavigationProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenPalette]);

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-slate-900">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 origin-left"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Main nav */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-2 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 mx-4 rounded-2xl transition-all duration-500",
          scrolled
            ? "glass border border-white/5 shadow-xl shadow-black/20"
            : "bg-transparent border border-transparent"
        )}
      >
        {/* Logo */}
        <Logo onClick={() => scrollToSection("#hero")} />

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "text-emerald-400"
                    : "text-slate-400 hover:text-slate-100"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Cmd+K button + mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-white/5 text-xs text-slate-400 hover:text-slate-200 hover:border-emerald-500/30 transition-all duration-200 group"
          >
            <Terminal size={13} className="text-emerald-400 group-hover:animate-pulse" />
            <span>Command</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono text-[10px]">⌘K</kbd>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-0.5 bg-slate-400 rounded"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-slate-400 rounded"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-5 h-0.5 bg-slate-400 rounded"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-4 right-4 z-40 glass rounded-2xl border border-white/5 p-4 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-white/5 transition-all text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="mt-2 pt-2 border-t border-white/5">
              <button
                onClick={() => { onOpenPalette(); setMobileOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-all text-sm"
              >
                <Terminal size={14} />
                Open Command Palette
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section progress dots — right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {SECTION_IDS.map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(`#${id}`)}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            className="group flex items-center gap-2 justify-end"
          >
            <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity capitalize tracking-wider">
              {id}
            </span>
            <div
              className={cn(
                "rounded-full transition-all duration-300",
                activeSection === id
                  ? "w-2 h-2 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  : "w-1.5 h-1.5 bg-slate-700 group-hover:bg-slate-500"
              )}
            />
          </button>
        ))}
      </div>
    </>
  );
}
