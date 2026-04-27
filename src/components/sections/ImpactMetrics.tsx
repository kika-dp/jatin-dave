"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

const impactData = [
  { name: 'Q1', errorRate: 15, efficiency: 60 },
  { name: 'Q2', errorRate: 12, efficiency: 65 },
  { name: 'Q3', errorRate: 8, efficiency: 75 },
  { name: 'Q4', errorRate: 5, efficiency: 85 },
  { name: 'Q1(Y2)', errorRate: 2, efficiency: 95 },
];

const metrics = [
  { value: 30, suffix: "%", label: "Reduction in Compliance Errors", color: "text-emerald-400" },
  { value: 25, suffix: "%", label: "Faster Processing Time", color: "text-blue-400" },
  { value: 40, suffix: "%", label: "Faster Client Onboarding", color: "text-purple-400" },
  { value: 20, suffix: "%", label: "Increase in Client Retention", color: "text-amber-400" },
];

// Simple counter component
function Counter({ value, suffix, color }: { value: number, suffix: string, color: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeProgress));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span className={`text-4xl md:text-5xl font-bold ${color}`}>{count}{suffix}</span>;
}

export default function ImpactMetrics() {
  return (
    <section className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Measurable Impact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl"
          >
            I quantify success not by hours worked, but by the percentage of errors eliminated and time recovered.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Number Cards */}
          <div className="grid grid-cols-2 gap-4">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-6 rounded-2xl flex flex-col justify-center border border-slate-800"
              >
                <div className="mb-2"><Counter value={metric.value} suffix={metric.suffix} color={metric.color} /></div>
                <div className="text-sm text-slate-400 font-medium leading-snug">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 md:p-8 rounded-3xl border border-slate-800 h-[400px] flex flex-col"
          >
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">System Performance</h3>
                <p className="text-sm text-slate-400">Post-implementation trajectory</p>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Efficiency</div>
                <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500" /> Error Rate</div>
              </div>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEfficiency)" />
                  <Area type="monotone" dataKey="errorRate" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorError)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
