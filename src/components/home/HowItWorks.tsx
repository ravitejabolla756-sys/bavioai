"use client";

import { motion } from "framer-motion";
import { Plug, Zap, Rocket, ChevronRight } from "lucide-react";

const steps = [
  {
    icon: <Plug className="text-zinc-400" size={24} />,
    title: "1. Connect Phone System",
    description: "Link your existing SIP trunk or Twilio numbers in seconds. Native integrations mean zero downtime.",
  },
  {
    icon: <Zap className="text-[#9B8CFF]" size={24} />,
    title: "2. Train AI Agent",
    description: "Provide system prompts, upload knowledge bases, and define exact workflows using our visual builder.",
  },
  {
    icon: <Rocket className="text-emerald-400" size={24} />,
    title: "3. Deploy to Production",
    description: "Test in sandbox mode, then push to live. Handle 10 or 10,000 concurrent calls instantly.",
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden transform-gpu border-t border-white/5">
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              From zero to <span className="text-gradient">production.</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Skip the raw API calls and infrastructure headache. Our pipeline is designed for speed.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal Connection Line */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-[#7B61FF]/30 to-transparent -z-10" />
          
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative group"
              >
                <div className="glass-card rounded-[2rem] p-8 h-full relative z-10 bg-[#0A0A0E]/80 border-white/5 hover:border-[#7B61FF]/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-[#111116] border border-white/5 flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-noise opacity-[0.05]" />
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connecting mobile stacked view */}
                {idx < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-6">
                    <ChevronRight size={24} className="text-zinc-700 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
