"use client";

import { motion } from "framer-motion";
import { User, Sparkles, CheckCircle2, Server, Database, ArrowRight } from "lucide-react";

const messages = [
  { role: "user", text: "I need to book an appointment tomorrow." },
  { role: "ai", text: "I can help with that. Would 2 PM or 4 PM work?" },
  { role: "user", text: "3 PM works." },
  { role: "ai", text: "Great. Your appointment is confirmed for tomorrow at 3 PM. I've sent a calendar invite." },
];

const reasoningSteps = [
  { icon: <Database size={16} />, title: "Intent Detected", desc: "Appointment Booking", active: true },
  { icon: <Server size={16} />, title: "Workflow Triggered", desc: "Check Availability", active: true },
  { icon: <CheckCircle2 size={16} />, title: "Action Executed", desc: "Calendar API Updated", active: false },
  { icon: <Sparkles size={16} />, title: "Response Generated", desc: "Confirmation Sent", active: false },
];

export function ConversationDemo() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden transform-gpu border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7B61FF]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay -z-20" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7B61FF]/20 bg-[#7B61FF]/10 backdrop-blur-md mb-6">
               <span className="text-xs font-semibold text-[#9B8CFF] tracking-wide uppercase">
                Live Demonstration
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Agents that <span className="text-gradient">close deals.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Experience how our agents intelligently process natural language, execute logic, and integrate with your CRM during a live call.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left: Conversation UI */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-[2rem] p-6 md:p-10 relative overflow-hidden transform-gpu bg-[#111116]/60">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF]/30 to-transparent" />
              
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20 border border-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-500/50" />
                <span className="ml-2 text-xs font-mono text-zinc-500">Call Transcript</span>
              </div>

              <div className="flex flex-col gap-6 relative">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20, x: msg.role === "user" ? -10 : 10 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.4, type: "spring", stiffness: 100 }}
                    className={`flex gap-4 ${msg.role === "ai" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
                      msg.role === "ai" 
                        ? "bg-gradient-to-br from-[#7B61FF] to-[#9B8CFF] text-white shadow-[#7B61FF]/20" 
                        : "bg-[#0A0A0E] border border-white/10 text-zinc-400"
                    }`}>
                      {msg.role === "ai" ? <Sparkles size={18} /> : <User size={18} />}
                    </div>
                    
                    <div className={`py-3.5 px-5 rounded-2xl max-w-[80%] backdrop-blur-md relative overflow-hidden ${
                      msg.role === "ai" 
                        ? "bg-[#7B61FF]/10 border border-[#7B61FF]/20 text-zinc-100 rounded-tr-sm" 
                        : "bg-white/[0.02] border border-white/5 text-zinc-300 rounded-tl-sm"
                    }`}>
                      <p className="text-[0.95rem] leading-relaxed relative z-10 font-light">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI Reasoning Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card rounded-[2rem] p-6 md:p-8 relative overflow-hidden bg-[#0A0A0E]/80 border-white/5"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-[#7B61FF]/10 text-[#9B8CFF]">
                  <Server size={18} />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight">AI Runtime Engine</h3>
              </div>

              <div className="space-y-6 relative">
                {/* Connecting Line for steps */}
                <div className="absolute left-[15px] top-[24px] bottom-[24px] w-px bg-gradient-to-b from-[#7B61FF]/50 to-transparent -z-10" />
                
                {reasoningSteps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + (idx * 0.4) }}
                    className="flex gap-4 relative"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border z-10 ${
                      step.active 
                        ? "bg-[#0A0A0E] border-[#7B61FF] text-[#9B8CFF]" 
                        : "bg-[#0A0A0E] border-white/10 text-zinc-600"
                    }`}>
                      {step.active && <div className="absolute inset-0 rounded-full bg-[#7B61FF]/20 animate-ping" />}
                      {step.icon}
                    </div>
                    
                    <div className="pt-1">
                      <p className={`text-xs font-mono uppercase tracking-wider mb-1 ${step.active ? "text-[#9B8CFF]" : "text-zinc-500"}`}>
                        {step.title}
                      </p>
                      <p className={`text-sm ${step.active ? "text-zinc-200" : "text-zinc-600"}`}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Fake API payload visual */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 3 }}
                className="mt-8 pt-6 border-t border-white/5"
              >
                <div className="bg-[#050507] rounded-xl p-4 font-mono text-[0.65rem] leading-relaxed text-zinc-400 border border-white/5">
                  <span className="text-[#9B8CFF]">{"{"}</span><br/>
                  &nbsp;&nbsp;<span className="text-zinc-300">"action"</span>: <span className="text-emerald-400">"calendar.book"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-zinc-300">"time"</span>: <span className="text-emerald-400">"15:00:00"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-zinc-300">"status"</span>: <span className="text-emerald-400">200</span><br/>
                  <span className="text-[#9B8CFF]">{"}"}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
