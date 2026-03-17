"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Stethoscope, Utensils, Building2, Wrench, Headphones, Server, Database, MessageSquare } from "lucide-react";

const useCases = [
  { 
    icon: <Stethoscope size={18} />, 
    title: "Healthcare", 
    desc: "Automate appointment scheduling, patient intake, and post-op reminders.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    workflow: ["Verify Patient", "Check Schedule", "Book Slot"]
  },
  { 
    icon: <Utensils size={18} />, 
    title: "Restaurants", 
    desc: "Manage reservations, take out orders, and answer FAQ seamlessly.",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/20",
    workflow: ["Check Tables", "Confirm Time", "Send SMS"]
  },
  { 
    icon: <Building2 size={18} />, 
    title: "Real Estate", 
    desc: "Qualify inbound leads, answer property questions, and schedule viewings 24/7.",
    color: "from-[#7B61FF]/20 to-[#9B8CFF]/20",
    border: "border-[#7B61FF]/20",
    workflow: ["Capture Lead", "Check MLS", "Book Agent"]
  },
  { 
    icon: <Wrench size={18} />, 
    title: "Service Businesses", 
    desc: "Dispatch technicians, provide instant quotes, and triage emergencies.",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    workflow: ["Triage Issue", "Find Tech", "Dispatch"]
  },
  { 
    icon: <Headphones size={18} />, 
    title: "Customer Support", 
    desc: "Instantly resolve Tier 1 inquiries and route complex issues to human agents.",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    workflow: ["Lookup Account", "Resolve Auto", "or Route"]
  },
];

export function UseCasesPreview() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden transform-gpu border-t border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7B61FF]/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 md:mb-20 gap-8">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Built for <span className="text-gradient">every industry.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-light leading-relaxed">
              Bavio AI adapts instantly to your business logic, handling deep industry-specific knowledge and complex operational workflows with ease.
            </p>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/use-cases" className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05] text-zinc-300 font-medium hover:bg-white/[0.08] hover:text-white transition-all backdrop-blur-sm">
              Explore all industries
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                 <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card glass-card-hover p-8 rounded-[2rem] group flex flex-col h-full bg-[#0A0A0E]/60 border-white/5"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${uc.color} border ${uc.border} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                  {uc.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-zinc-100 mb-3 tracking-tight">{uc.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light flex-grow mb-8">{uc.desc}</p>
              
              {/* Mini Workflow Example */}
              <div className="bg-[#050507] border border-white/5 rounded-xl p-4 mt-auto">
                <p className="text-[10px] uppercase font-semibold text-zinc-600 tracking-widest mb-3">Workflow</p>
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span className="truncate">{uc.workflow[0]}</span>
                  <ArrowRight size={10} className="text-zinc-600 shrink-0 mx-1" />
                  <span className="truncate">{uc.workflow[1]}</span>
                  <ArrowRight size={10} className="text-zinc-600 shrink-0 mx-1" />
                  <span className="truncate text-[#9B8CFF]">{uc.workflow[2]}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
           <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="p-8 rounded-[2rem] border border-white/[0.05] border-dashed flex flex-col items-center justify-center text-center group hover:bg-white/[0.02] transition-colors cursor-pointer min-h-[300px]"
            >
              <div className="w-12 h-12 rounded-full border border-zinc-700 border-dashed flex items-center justify-center text-zinc-500 mb-4 group-hover:border-zinc-500 group-hover:text-zinc-300 transition-colors">
                <MessageSquare size={16} />
              </div>
              <h3 className="text-sm font-medium text-zinc-300 group-hover:text-white">Don't see your industry?</h3>
              <p className="text-xs text-zinc-500 mt-2 font-light">Bavio AI can be trained on any data.</p>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
