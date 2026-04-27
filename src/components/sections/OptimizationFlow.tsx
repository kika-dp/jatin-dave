"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Cpu, ShieldCheck, TrendingUp } from "lucide-react";
import { useRef } from "react";

const steps = [
  { id: "01", name: "Diagnosis", icon: Search, desc: "Audit existing workflows, identify bottlenecks, and quantify error rates." },
  { id: "02", name: "System Design", icon: PenTool, desc: "Architect a scalable financial ecosystem tailored to operational goals." },
  { id: "03", name: "Automation", icon: Cpu, desc: "Deploy scripts and integrations to eliminate manual data entry." },
  { id: "04", name: "Compliance", icon: ShieldCheck, desc: "Embed ATO regulations and internal controls directly into the system logic." },
  { id: "05", name: "Optimization", icon: TrendingUp, desc: "Monitor KPIs, refine processes, and scale operations efficiently." },
];

export default function OptimizationFlow() {
  const containerRef = useRef(null);

  return (
    <section className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/5 rounded-[100%] blur-3xl -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            The Optimization Protocol
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            My systematic approach to transforming chaotic accounting functions into streamlined, high-performance engines.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-800 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-2xl glass flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300 border border-slate-700/50 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-slate-900">
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">{step.id}</div>
                  <step.icon className="text-slate-300 group-hover:text-emerald-400 transition-colors" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed px-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
