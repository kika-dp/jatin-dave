"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Circle, Minus, Square } from "lucide-react";

interface TerminalLine {
  id: string | number;
  type: "input" | "output" | "error" | "success" | "system" | "easter";
  content: string;
}

const HELP_OUTPUT = [
  "  Available commands:",
  "  ──────────────────────────────────────",
  "  help          Show this help menu",
  "  about         Brief introduction",
  "  email         Contact email address",
  "  phone         Phone number",
  "  location      Where I'm based",
  "  skills        Core capabilities",
  "  resume        Download my CV",
  "  clear         Clear the terminal",
  "  ──────────────────────────────────────",
  "  💡 Hint: Try something unexpected...",
];

const COMMANDS: Record<
  string,
  { type: TerminalLine["type"]; lines: string[] }
> = {
  help: {
    type: "output",
    lines: HELP_OUTPUT,
  },
  about: {
    type: "output",
    lines: [
      "  Jatin Dave — Financial Systems Optimizer",
      "  9+ years transforming accounting chaos into",
      "  high-performance financial systems.",
      "  From ATO compliance to cloud automation,",
      "  I build systems that scale without adding headcount.",
    ],
  },
  email: {
    type: "success",
    lines: [
      "  📧  jatindave369@gmail.com",
      "  ↳   Click to open your mail client",
    ],
  },
  phone: {
    type: "success",
    lines: ["  📱  +91 9537274463"],
  },
  location: {
    type: "success",
    lines: [
      "  📍  Surat, Gujarat, India",
      "  🌏  Available for remote work — AU, global",
    ],
  },
  skills: {
    type: "output",
    lines: [
      "  ● Financial Systems    [████████████] 95%",
      "  ● ATO Compliance       [████████████] 100%",
      "  ● Process Automation   [███████████░] 90%",
      "  ● Audit & Risk         [██████████░░] 88%",
      "  ● Leadership           [███████████░] 85%",
    ],
  },
  resume: {
    type: "success",
    lines: [
      "  📄  Preparing download...",
      "  ↳   /public/resume.pdf",
      "  ✓   Ready — opening in new tab",
    ],
  },
  clear: { type: "system", lines: [] },
};

const EASTER_LINES = [
  "",
  "   ╔══════════════════════════════════════╗",
  "   ║                                      ║",
  "   ║   🚀  ACCESS GRANTED                 ║",
  "   ║                                      ║",
  "   ║   Initiating hiring sequence...      ║",
  "   ║   Checking availability:  ✓ Open     ║",
  "   ║   Checking salary range:  ✓ Great    ║",
  "   ║   Checking vibe:          ✓ Immense  ║",
  "   ║                                      ║",
  "   ║   Welcome aboard. 🎉                 ║",
  "   ╚══════════════════════════════════════╝",
  "",
  "   Run 'email' to make it official.",
];

const INITIAL_LINES: TerminalLine[] = [
  { id: 0, type: "system", content: "Portfolio Terminal v2.0.0" },
  { id: 1, type: "system", content: "Type 'help' to see available commands." },
  { id: 2, type: "system", content: "" },
];

const generateUniqueId = (): string => {
  return `term-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export default function Contact() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 50);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const addLines = useCallback(
    (newLines: TerminalLine[]) => {
      setLines((prev) => [...prev, ...newLines]);
    },
    []
  );

  const execute = useCallback(
    (raw: string, isChipClick = false) => {
      const cmd = raw.trim().toLowerCase();
      if (!cmd) return;

      const inputLine: TerminalLine = {
        id: generateUniqueId(),
        type: "input",
        content: raw,
      };

      if (cmd === "clear") {
        setLines([]);
        return;
      }

      if (cmd === "sudo hire-me" || cmd === "hire-me" || cmd === "hire") {
        const easterLines: TerminalLine[] = EASTER_LINES.map((l) => ({
          id: generateUniqueId(),
          type: "easter" as const,
          content: l,
        }));
        addLines([inputLine, ...easterLines]);
        return;
      }

      const command = COMMANDS[cmd];
      if (!command) {
        addLines([
          inputLine,
          {
            id: generateUniqueId(),
            type: "error",
            content: `  command not found: ${cmd}`,
          },
          {
            id: generateUniqueId(),
            type: "error",
            content: "  Type 'help' to see available commands.",
          },
        ]);
        return;
      }

      setIsProcessing(true);
      addLines([inputLine]);

      // Trigger actual download synchronously ONLY if this is NOT a chip click
      if (cmd === "resume" && !isChipClick) {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Jatin_Dave_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        if (cmd === "email") {
          setTimeout(() => window.open("mailto:jatindave369@gmail.com"), 800);
        }

        const outputLines: TerminalLine[] = command.lines.map((l) => ({
          id: generateUniqueId(),
          type: command.type,
          content: l,
        }));
        addLines(outputLines);
        setIsProcessing(false);
      }, 200);
    },
    [addLines]
  );

  const handleSubmit = useCallback(() => {
    if (!input.trim() || isProcessing) return;
    const cmd = input.trim();
    setHistory((h) => [cmd, ...h].slice(0, 50));
    setHistoryIndex(-1);
    setInput("");
    execute(cmd);
  }, [input, isProcessing, execute]);

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSubmit();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.max(historyIndex - 1, -1);
        setHistoryIndex(next);
        setInput(next === -1 ? "" : history[next] ?? "");
      }
    },
    [handleSubmit, history, historyIndex]
  );

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input": return "text-white";
      case "success": return "text-emerald-400";
      case "error": return "text-red-400";
      case "system": return "text-slate-500";
      case "easter": return "text-yellow-300";
      default: return "text-slate-300";
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-[100%] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-sm opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px section-separator" />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
              Contact
            </span>
            <div className="h-px w-8 bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s{" "}
            <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Open the terminal below. Type <code className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-sm">help</code> to get started,
            or try something unexpected.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden border border-white/8 shadow-2xl shadow-black/40"
          style={{ background: "rgba(5, 9, 18, 0.97)" }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal titlebar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5"
               style={{ background: "rgba(15, 23, 42, 0.8)" }}>
            <div className="flex items-center gap-1.5">
              <Circle size={12} className="text-red-500 fill-red-500" />
              <Circle size={12} className="text-yellow-500 fill-yellow-500" />
              <Circle size={12} className="text-green-500 fill-green-500" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <Terminal size={12} className="text-slate-500" />
              <span className="text-xs text-slate-500 font-mono">portfolio — bash — 80×24</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-0">
              <Minus size={12} />
              <Square size={10} />
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalBodyRef}
            className="h-[420px] overflow-y-auto p-4 sm:p-5 space-y-0.5 font-mono text-sm leading-relaxed"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(16,185,129,0.2) transparent" }}
          >
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`${lineColor(line.type)} whitespace-pre-wrap`}
                >
                  {line.type === "input" ? (
                    <span>
                      <span className="text-emerald-400 select-none">visitor@portfolio</span>
                      <span className="text-slate-600 select-none">:</span>
                      <span className="text-blue-400 select-none">~</span>
                      <span className="text-slate-600 select-none">$ </span>
                      {line.content}
                    </span>
                  ) : line.type === "system" && line.content === "" ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.content || <span>&nbsp;</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Processing indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-emerald-400"
              >
                <span className="inline-flex gap-1">
                  <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                </span>
              </motion.div>
            )}


          </div>

          {/* Input row */}
          <div className="flex items-center gap-2 px-4 sm:px-5 py-3 border-t border-white/5">
            <span className="text-emerald-400 font-mono text-sm select-none shrink-0">
              visitor@portfolio:~$
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="type a command..."
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="flex-1 bg-transparent text-white text-sm font-mono outline-none placeholder-slate-700 caret-emerald-400"
            />
            <span className="terminal-cursor shrink-0" />
          </div>
        </motion.div>

        {/* Quick contact chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { label: "email", cmd: "email" },
            { label: "phone", cmd: "phone" },
            { label: "location", cmd: "location" },
            { label: "resume", cmd: "resume" },
          ].map((chip) => (
            <button
              key={chip.cmd}
              onClick={() => {
                if (chip.cmd === "resume") {
                  const link = document.createElement("a");
                  link.href = "/resume.pdf";
                  link.download = "Jatin_Dave_Resume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }
                setInput(chip.cmd);
                setTimeout(() => {
                  execute(chip.cmd, true);
                  setInput("");
                }, 50);
              }}
              className="px-4 py-2 rounded-xl glass border border-white/5 hover:border-emerald-500/30 text-sm text-slate-400 hover:text-emerald-400 transition-all font-mono"
            >
              ./{chip.label}
            </button>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-600 mt-6"
        >
          Based in Surat, India · Available globally for remote engagements · Response within 24h
        </motion.p>
      </div>
    </section>
  );
}
