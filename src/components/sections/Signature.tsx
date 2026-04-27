"use client";

import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle2, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const transformations = [
  {
    title: "Data Processing",
    before: { text: "Manual Entry & Verification", icon: Clock, type: "negative" },
    after: { text: "Automated Bank Feeds & OCR rules", icon: Zap, type: "positive" },
  },
  {
    title: "Compliance Checking",
    before: { text: "Error-prone spot checks", icon: AlertTriangle, type: "negative" },
    after: { text: "100% Validated ATO Workflows", icon: CheckCircle2, type: "positive" },
  },
  {
    title: "Reporting",
    before: { text: "Static, delayed spreadsheets", icon: Clock, type: "negative" },
    after: { text: "Real-time Financial Dashboards", icon: Zap, type: "positive" },
  }
];

export default function Signature() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/50">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Financial System Transformation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            I don't just maintain ledgers. I identify bottlenecks and architect solutions that scale operations without increasing headcount.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Tabs */}
          <div className="md:col-span-4 flex flex-col gap-3">
            {transformations.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "text-left px-6 py-4 rounded-xl transition-all duration-300 border",
                  activeTab === idx 
                    ? "glass-emerald border-emerald-500/30 text-white" 
                    : "glass border-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </button>
            ))}
          </div>

          {/* Transformation Display */}
          <div className="md:col-span-8 glass p-8 md:p-12 rounded-2xl relative overflow-hidden">
            {/* Decorative connection line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2 hidden md:block" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              
              {/* Before State */}
              <motion.div 
                key={`before-${activeTab}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col items-center text-center w-full"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                  <AlertTriangle className="text-red-400" size={28} />
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Before</div>
                <div className="text-lg text-slate-300 font-medium">
                  {transformations[activeTab].before.text}
                </div>
              </motion.div>

              {/* Arrow */}
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center rotate-90 md:rotate-0 z-10 bg-slate-900 border-slate-700">
                <ArrowRight className="text-slate-400" size={20} />
              </div>

              {/* After State */}
              <motion.div 
                key={`after-${activeTab}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 flex flex-col items-center text-center w-full"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20 relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
                  <Zap className="text-emerald-400 relative z-10" size={28} />
                </div>
                <div className="text-xs uppercase tracking-wider text-emerald-500 font-semibold mb-2">Optimized System</div>
                <div className="text-xl text-white font-semibold">
                  {transformations[activeTab].after.text}
                </div>
              </motion.div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
