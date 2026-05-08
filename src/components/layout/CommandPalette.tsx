"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Briefcase, Cpu, LayoutGrid, Mail, FileText,
  Link2, ArrowRight, Terminal, Search, X, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  group: string;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: "nav-hero",
      label: "Go to Hero",
      description: "Jump to the top of the page",
      icon: ArrowRight,
      group: "Navigate",
      action: () => { scrollTo("hero"); onClose(); },
      keywords: ["home", "top", "start"],
    },
    {
      id: "nav-about",
      label: "About",
      description: "My story and philosophy",
      icon: User,
      group: "Navigate",
      action: () => { scrollTo("about"); onClose(); },
    },
    {
      id: "nav-experience",
      label: "Experience",
      description: "Timeline of financial systems I've built",
      icon: Briefcase,
      group: "Navigate",
      action: () => { scrollTo("experience"); onClose(); },
    },
    {
      id: "nav-skills",
      label: "Skills",
      description: "Capabilities and technical stack",
      icon: Cpu,
      group: "Navigate",
      action: () => { scrollTo("skills"); onClose(); },
      keywords: ["capabilities", "tools", "tech"],
    },
    {
      id: "nav-projects",
      label: "Projects",
      description: "Featured case studies and impact",
      icon: LayoutGrid,
      group: "Navigate",
      action: () => { scrollTo("projects"); onClose(); },
      keywords: ["work", "case studies", "systems"],
    },
    {
      id: "nav-contact",
      label: "Contact",
      description: "Open the terminal and say hello",
      icon: Terminal,
      group: "Navigate",
      action: () => { scrollTo("contact"); onClose(); },
      keywords: ["terminal", "reach out"],
    },
    {
      id: "action-email",
      label: "Send an Email",
      description: "jatindave369@gmail.com",
      icon: Mail,
      group: "Actions",
      action: () => {
        window.open("mailto:jatindave369@gmail.com");
        onClose();
      },
      keywords: ["mail", "reach"],
    },
    {
      id: "action-resume",
      label: "Download Resume",
      description: "Get my latest CV as PDF",
      icon: FileText,
      group: "Actions",
      action: () => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Jatin_Dave_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      },
      keywords: ["cv", "download"],
    },
    {
      id: "action-linkedin",
      label: "View LinkedIn",
      description: "Connect professionally",
      icon: Link2,
      group: "Actions",
      action: () => {
        window.open("https://linkedin.com", "_blank");
        onClose();
      },
    },
  ];

  const filtered = query.trim()
    ? commands.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.label.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.group.toLowerCase().includes(q) ||
          (c.keywords || []).some((k) => k.includes(q))
        );
      })
    : commands;

  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  const flatFiltered = groups.flatMap((g) => filtered.filter((c) => c.group === g));

  const execute = useCallback(
    (index: number) => {
      if (flatFiltered[index]) flatFiltered[index].action();
    },
    [flatFiltered]
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        execute(selectedIndex);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, selectedIndex, flatFiltered, onClose, execute]);

  let globalIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 cmd-overlay" />

          {/* Palette */}
          <motion.div
            initial={{ scale: 0.95, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -10, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
            style={{
              background: "rgba(8, 14, 28, 0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
              <Search size={16} className="text-slate-500 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands…"
                className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm outline-none terminal-text"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-slate-600 hover:text-slate-400">
                  <X size={14} />
                </button>
              )}
              <kbd className="px-2 py-0.5 rounded text-[10px] text-slate-600 bg-slate-800 font-mono">ESC</kbd>
            </div>

            {/* Commands list */}
            <div className="max-h-[360px] overflow-y-auto py-2">
              {flatFiltered.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-500 text-sm">
                  No commands found for &quot;{query}&quot;
                </div>
              ) : (
                groups.map((group) => {
                  const groupItems = filtered.filter((c) => c.group === group);
                  return (
                    <div key={group}>
                      <div className="px-4 py-1.5 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                        {group}
                      </div>
                      {groupItems.map((cmd) => {
                        globalIndex++;
                        const idx = globalIndex;
                        const isSelected = selectedIndex === idx;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => execute(idx)}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={cn(
                              "w-full flex items-center gap-3 px-4 py-3 text-left transition-all",
                              isSelected
                                ? "bg-emerald-500/10 text-white"
                                : "text-slate-300 hover:bg-white/5"
                            )}
                          >
                            <div
                              className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                isSelected
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-slate-800 text-slate-500"
                              )}
                            >
                              <cmd.icon size={15} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate">{cmd.label}</div>
                              <div className="text-xs text-slate-500 truncate">{cmd.description}</div>
                            </div>
                            {isSelected && (
                              <ChevronRight size={14} className="text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4 text-[10px] text-slate-600">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-slate-800 font-mono">↑↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-slate-800 font-mono">↵</kbd> select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-slate-800 font-mono">esc</kbd> close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
