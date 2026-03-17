"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

export function VoiceDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number>(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden transform-gpu border-t border-white/5">
      <div className="absolute inset-0 bg-noise opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9B8CFF]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Hear the <span className="text-gradient">difference.</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed mb-12">
                Listen to a real AI voice agent handling a complex customer call with natural pauses, filler words, and perfect intonation.
              </p>
            </motion.div>

            {/* Audio Player UI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden group max-w-3xl mx-auto bg-[#0A0A0E]/80 border-white/5 shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7B61FF]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                
                {/* Play Button */}
                <button 
                  onClick={togglePlay}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7B61FF] to-[#9B8CFF] text-white flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(123,97,255,0.3)] hover:scale-105 hover:shadow-[0_0_60px_rgba(123,97,255,0.5)] transition-all duration-300 relative group/btn"
                >
                  {isPlaying && (
                    <span className="absolute inset-0 rounded-full border border-[#7B61FF] animate-ping opacity-50 block duration-1000" />
                  )}
                  {isPlaying ? (
                    <Pause size={32} className="fill-white" />
                  ) : (
                    <Play size={32} className="fill-white ml-2" />
                  )}
                </button>

                {/* Waveform & Info */}
                <div className="flex-grow w-full">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white tracking-tight">Inbound Real Estate Inquiry</h3>
                      <p className="text-sm text-zinc-400 font-light mt-1 text-left">Bavio AI Model • English (US)</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <Volume2 size={16} className="text-zinc-500" />
                      <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div className="w-3/4 h-full bg-zinc-400 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Animated Waveform Visual */}
                  <div className="h-16 flex items-center gap-1 w-full relative group/wave cursor-pointer" onClick={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect();
                     const x = e.clientX - rect.left;
                     setProgress((x / rect.width) * 100);
                  }}>
                    <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-transparent to-[#7B61FF]/20 pointer-events-none transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
                    
                    {[...Array(40)].map((_, i) => {
                      const isActive = (i / 40) * 100 <= progress;
                      // Generate a pseudo-random height based on index for the static waveform look
                      const height = Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.2)) * 80 + 20;
                      
                      return (
                        <div 
                          key={i} 
                          className="flex-1 rounded-full transition-all duration-100 ease-in-out relative"
                          style={{ height: `${height}%` }}
                        >
                          <div className={`absolute inset-0 rounded-full transition-colors duration-200 ${isActive ? 'bg-[#9B8CFF]' : 'bg-white/10'}`} />
                          
                          {/* Active playing animation */}
                          {isPlaying && isActive && Math.abs((progress / 100 * 40) - i) < 2 && (
                            <motion.div
                              animate={{ scaleY: [1, 1.5, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="absolute inset-0 bg-white rounded-full z-10"
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex justify-between mt-3 text-xs font-mono text-zinc-500">
                    <span>{Math.floor((progress / 100) * 85 / 60).toString().padStart(2, '0')}:{(Math.floor((progress / 100) * 85) % 60).toString().padStart(2, '0')}</span>
                    <span>01:25</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
