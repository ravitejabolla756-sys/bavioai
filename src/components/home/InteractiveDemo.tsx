"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Mic, Volume2 } from "lucide-react";

export function InteractiveDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <section className="py-32 bg-[#050505] relative border-y border-white/[0.05] overflow-hidden transform-gpu">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay -z-20"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 rounded-[100%] blur-[120px] -z-10 transform-gpu will-change-transform pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Hear the <span className="text-gradient">difference.</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-light">
                Listen to a real voice agent handling a complex customer request, managing interruptions, and successfully gathering all required information without hallucination.
              </p>
              
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#050505] text-base font-bold transition-all hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] w-[220px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">
                  {isPlaying ? <Square size={18} className="fill-current" /> : <Play size={18} className="fill-current" />}
                  {isPlaying ? "Stop Demo" : "Run Audio Demo"}
                </span>
              </button>
              
              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 10 }}
                    className="mt-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3 backdrop-blur-md"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    <p className="font-medium text-sm">Live stream: Negotiating appointment time.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-[2.5rem] p-8 relative min-h-[350px] flex flex-col justify-center items-center overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            {isPlaying ? (
              <div className="flex flex-col items-center justify-center h-full w-full gap-12">
                <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-xs">
                  {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      animate={{
                        height: ["20%", "100%", "40%", "80%", "20%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center justify-between w-full mt-4 px-4 relative">
                  <div className="flex flex-col items-center gap-3 z-10 bg-[#050505] py-2 px-4 rounded-full border border-white/5 shadow-2xl">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.05] flex items-center justify-center text-zinc-400">
                      <Mic size={16} />
                    </div>
                    <span className="text-xs text-zinc-500 font-medium tracking-wide">Customer</span>
                  </div>
                  
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent hidden sm:block">
                    <motion.div
                      className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-indigo-400 -translate-y-1/2 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  
                  <div className="flex flex-col items-center gap-3 z-10 bg-[#050505] py-2 px-4 rounded-full border border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-white/10 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                      <Volume2 size={16} />
                    </div>
                    <span className="text-xs text-indigo-400 font-medium tracking-wide">Bavio AI</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-zinc-500 flex flex-col items-center justify-center h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                <div className="w-24 h-24 rounded-full bg-white/[0.02] flex items-center justify-center mx-auto mb-6 border border-white/[0.05] group-hover:bg-white/[0.05] group-hover:border-indigo-500/30 transition-all duration-500 relative">
                  <div className="absolute inset-0 rounded-full border border-indigo-500/0 group-hover:animate-ping opacity-20" />
                  <Play size={36} className="ml-2 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <p className="text-sm tracking-wide">Click to experience the demo</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
