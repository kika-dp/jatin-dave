"use client";

import { useState } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CursorEffect from "@/components/layout/CursorEffect";
import Navigation from "@/components/layout/Navigation";
import CommandPalette from "@/components/layout/CommandPalette";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Leadership from "@/components/sections/Leadership";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <SmoothScroll>
      <CursorEffect />
      <Navigation onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main className="min-h-screen bg-[#050b14] text-slate-50 selection:bg-emerald-500/20 selection:text-emerald-200 overflow-x-hidden">
        <Hero />
        <div className="section-separator" />
        <About />
        <div className="section-separator" />
        <Experience />
        <div className="section-separator" />
        <Skills />
        <div className="section-separator" />
        <Projects />
        <div className="section-separator" />
        <Leadership />
        <div className="section-separator" />
        <Contact />

        {/* Footer */}
        <footer className="py-8 border-t border-white/5">
          <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-slate-600 font-mono">
              © {new Date().getFullYear()} Jatin Dave. Crafted with precision.
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-700 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}
