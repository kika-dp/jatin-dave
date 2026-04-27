"use client";

import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Database, ShieldAlert, UserCheck, Settings, LineChart, Users } from "lucide-react";

const capabilitiesData = [
  { subject: "Financial Systems", A: 95, fullMark: 100 },
  { subject: "Automation", A: 90, fullMark: 100 },
  { subject: "Audit & Risk", A: 85, fullMark: 100 },
  { subject: "Compliance", A: 100, fullMark: 100 },
  { subject: "Payroll Ops", A: 80, fullMark: 100 },
  { subject: "Leadership", A: 85, fullMark: 100 },
];

const capabilities = [
  { name: "Financial Systems", icon: Database, tools: "Xero, QuickBooks, NetSuite, MYOB", desc: "Architecting scalable ledger environments." },
  { name: "Compliance & Taxation", icon: ShieldAlert, tools: "ATO Regulations, BAS, IAS", desc: "Building 100% compliant, automated workflows." },
  { name: "Audit & Risk Control", icon: UserCheck, tools: "Internal Controls, Recon", desc: "Designing bulletproof validation processes." },
  { name: "Payroll Systems", icon: Users, tools: "KeyPay, Xero Payroll", desc: "Streamlining multi-state payroll ops." },
  { name: "Process Automation", icon: Settings, tools: "Zapier, Custom Scripts, APIs", desc: "Eliminating manual data entry." },
  { name: "Leadership", icon: LineChart, tools: "KPI Tracking, Team Scaling", desc: "Structuring high-performance accounting teams." }
];

export default function CapabilityDashboard() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Capability Architecture
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            My technical stack and operational capabilities, mapped as interconnected systems.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass p-6 rounded-3xl h-[400px] flex flex-col"
          >
            <h3 className="text-lg font-semibold text-white mb-4 text-center">System Proficiencies</h3>
            <div className="flex-1 w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={capabilitiesData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-5 rounded-2xl hover:bg-slate-800/50 transition-colors group border border-slate-800 hover:border-emerald-500/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                    <cap.icon size={20} />
                  </div>
                  <h4 className="font-semibold text-white">{cap.name}</h4>
                </div>
                <p className="text-sm text-slate-400 mb-3 h-10">{cap.desc}</p>
                <div className="text-xs font-mono text-emerald-500/80 bg-emerald-500/5 py-1 px-2 rounded inline-block">
                  {cap.tools}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
