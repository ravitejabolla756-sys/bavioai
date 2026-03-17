"use client";

import { motion } from "framer-motion";
import { Zap, Activity, Repeat, CalendarCheck, Database, MessageSquare, Volume2, ShieldAlert } from "lucide-react";

export function Features() {
  const features = [
    {
      title: "Real-Time Call Handling",
      description: "Handles interruptions gracefully, understands deep context, and processes conversational speech with sub-500ms latency.",
      icon: <Zap className="text-[#9B8CFF]" size={24} />,
    },
    {
      title: "Workflow Automation",
      description: "Books appointments directly into your calendar, updates CRM records, sends SMS confirmations, and triggers external APIs automatically.",
      icon: <Repeat className="text-emerald-400" size={24} />,
    },
    {
      title: "Conversation Intelligence",
      description: "Generates structured summaries, detects customer sentiment, extracts actionable insights, and provides detailed analytics for every call.",
      icon: <MessageSquare className="text-blue-400" size={24} />,
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden transform-gpu">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#7B61FF]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Platform <span className="text-gradient">Capabilities.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Built on enterprise-grade infrastructure to deliver unmatched reliability and conversational fluency.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          
          {/* Panel 1: Real-Time Call Handling */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#7B61FF]/10 border border-[#7B61FF]/20 flex items-center justify-center mb-8 shadow-lg shadow-[#7B61FF]/10">
                 {features[0].icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">{features[0].title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">
                  {features[0].description}
                </p>
                <ul className="space-y-4">
                  {['Sub-500ms voice-to-voice latency', 'Interruptible at any point', 'End-of-turn detection algorithms'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-medium tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7B61FF] shadow-[0_0_10px_rgba(123,97,255,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* UI Visual */}
              <div className="bg-[#0A0A0E] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <span className="text-xs font-mono text-zinc-500">Latency Monitor</span>
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">Healthy</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Speech to Text</p>
                      <p className="text-2xl font-mono text-white">45<span className="text-sm text-zinc-500 ml-1">ms</span></p>
                    </div>
                    <div className="w-1/2 h-8 flex items-end gap-1">
                      {[30, 45, 25, 60, 45, 30, 40].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/10 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">LLM Routing</p>
                      <p className="text-2xl font-mono text-white">180<span className="text-sm text-zinc-500 ml-1">ms</span></p>
                    </div>
                    <div className="w-1/2 h-8 flex items-end gap-1">
                      {[50, 60, 55, 180, 50, 55, 45].map((h, i) => (
                        <div key={i} className={`flex-1 rounded-t-sm ${h > 100 ? 'bg-[#7B61FF]' : 'bg-white/10'}`} style={{ height: h > 100 ? '100%' : `${h}%` }} />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Text to Speech</p>
                      <p className="text-2xl font-mono text-white">65<span className="text-sm text-zinc-500 ml-1">ms</span></p>
                    </div>
                    <div className="w-1/2 h-8 flex items-end gap-1">
                      {[40, 65, 50, 45, 70, 60, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-white/10 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel 2: Workflow Automation */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* UI Visual */}
              <div className="bg-[#0A0A0E] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden order-2 lg:order-1">
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <span className="text-xs font-mono text-zinc-500">Active Workflows</span>
                </div>
                
                <div className="space-y-3 relative">
                   <div className="absolute left-[20px] top-[30px] bottom-[30px] w-px bg-gradient-to-b from-emerald-500/50 to-transparent -z-10" />

                   <div className="bg-[#111116] border border-white/5 rounded-xl p-3 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                       <CalendarCheck size={18} />
                     </div>
                     <div>
                       <p className="text-sm text-zinc-200 font-medium">Book Appointment</p>
                       <p className="text-xs text-zinc-500 font-mono mt-0.5">cal.com/api/v1/bookings</p>
                     </div>
                   </div>

                   <div className="bg-[#111116] border border-white/5 rounded-xl p-3 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-lg bg-[#7B61FF]/10 border border-[#7B61FF]/20 flex items-center justify-center text-[#9B8CFF] shrink-0">
                       <Database size={18} />
                     </div>
                     <div>
                       <p className="text-sm text-zinc-200 font-medium">Update HubSpot CRM</p>
                       <p className="text-xs text-zinc-500 font-mono mt-0.5">api.hubapi.com/crm/v3</p>
                     </div>
                   </div>

                   <div className="bg-[#111116] border border-white/5 rounded-xl p-3 flex items-center gap-4 relative overflow-hidden group/item">
                     <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                     <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 relative z-10">
                       <MessageSquare size={18} />
                     </div>
                     <div className="relative z-10">
                       <p className="text-sm text-zinc-200 font-medium">Send SMS Confirmation</p>
                       <p className="text-xs text-zinc-500 font-mono mt-0.5">api.twilio.com/2010</p>
                     </div>
                   </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/10">
                 {features[1].icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">{features[1].title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">
                  {features[1].description}
                </p>
                <ul className="space-y-4">
                  {['Native integration with 50+ tools', 'Custom webhook support', 'Dynamic conditional logic routing'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-medium tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Panel 3: Conversation Intelligence */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/10">
                 {features[2].icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">{features[2].title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">
                  {features[2].description}
                </p>
                <ul className="space-y-4">
                  {['Automatic detailed summaries', 'Call sentiment processing', 'Custom data extraction fields'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300 font-medium tracking-wide">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* UI Visual */}
              <div className="bg-[#0A0A0E] rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                  <span className="text-xs font-mono text-zinc-500">Post-Call Analysis</span>
                  <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] rounded font-medium uppercase tracking-widest">
                    Positive
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                     <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">Summary</p>
                     <p className="text-sm text-zinc-300 leading-relaxed font-light bg-white/5 p-3 rounded-lg border border-white/5">
                       Customer called regarding onboarding issues. Agent successfully guided them through SSO setup and scheduled a follow-up consultation with technical support.
                     </p>
                  </div>

                  <div>
                     <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">Extracted Data</p>
                     <div className="grid grid-cols-2 gap-2">
                       <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="block text-[10px] text-zinc-500 uppercase">Intent</span>
                         <span className="text-xs text-white">Technical Support</span>
                       </div>
                       <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="block text-[10px] text-zinc-500 uppercase">Action Taken</span>
                         <span className="text-xs text-white">Booked Meeting</span>
                       </div>
                       <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="block text-[10px] text-zinc-500 uppercase">User ID</span>
                         <span className="text-xs text-zinc-400 font-mono">usr_98xP2</span>
                       </div>
                       <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                         <span className="block text-[10px] text-zinc-500 uppercase">Resolution</span>
                         <span className="text-xs text-emerald-400">Resolved</span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
