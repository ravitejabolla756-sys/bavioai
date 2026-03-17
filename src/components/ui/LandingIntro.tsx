"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
const TARGET_TEXT = "BAVIO AI";
const DURATION_PHASE_1 = 1000; // 1s Chaos
const DURATION_PHASE_2 = 1000; // 1s Convergence
const TOTAL_DURATION = 4000; // 4s total

export function LandingIntro() {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [phase, setPhase] = useState(1);
  const requestRef = useRef<number>(null);
  const startTimeRef = useRef<number>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = time - startTimeRef.current;

      if (elapsed < DURATION_PHASE_1) {
        setPhase(1);
        setDisplayText(
          TARGET_TEXT.split("")
            .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
            .join("")
        );
      } else if (elapsed < DURATION_PHASE_1 + DURATION_PHASE_2) {
        setPhase(2);
        const progress = (elapsed - DURATION_PHASE_1) / DURATION_PHASE_2;
        const lockedCount = Math.floor(progress * TARGET_TEXT.length);
        
        setDisplayText(
          TARGET_TEXT.split("")
            .map((char, i) => {
              if (i < lockedCount) return char;
              return Math.random() > 0.05 ? CHARS[Math.floor(Math.random() * CHARS.length)] : char;
            })
            .join("")
        );
      } else if (elapsed < TOTAL_DURATION) {
        setPhase(3);
        setDisplayText(TARGET_TEXT);
      } else {
        setIsComplete(true);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        return;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Noise */}
          <motion.div 
            animate={{ 
              opacity: phase === 1 ? [0.05, 0.08, 0.05] : 0.03 
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" 
          />
          
          {/* Radial depth glow */}
          <motion.div 
            animate={{ 
              opacity: phase === 3 ? 0.2 : 0.05,
              scale: phase === 3 ? 1.5 : 1.2,
              background: phase === 3 
                ? "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(123, 97, 255, 0.1) 0%, transparent 70%)"
            }}
            className="absolute w-[800px] h-[800px] rounded-full pointer-events-none blur-[140px]"
          />

          <div className="relative flex flex-col items-center">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0, letterSpacing: "1em" }}
              animate={{ 
                scale: phase === 3 ? 1.05 : 1, 
                opacity: 1,
                letterSpacing: "0.25em",
                filter: phase === 3 ? "drop-shadow(0 0 25px rgba(123, 97, 255, 0.6))" : "none"
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-white font-sans text-center transition-all duration-500 select-none"
              style={{
                textShadow: phase === 3 ? "0 0 30px rgba(123, 97, 255, 0.4)" : "none"
              }}
            >
              {displayText}
            </motion.h1>

            {/* Glowing Accent Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: phase === 3 ? "120%" : "0%", 
                opacity: phase === 3 ? 0.6 : 0 
              }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-12 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: phase === 3 ? 1 : 0,
                y: phase === 3 ? 0 : 10
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-6 text-purple-400 font-mono text-xs tracking-[0.5em] uppercase"
            >
              Intelligence Activated
            </motion.div>
          </div>

          {/* Glitch Overlay for Phase 1 */}
          {phase === 1 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-20">
               <div className="absolute top-1/4 left-0 w-full h-[1px] bg-indigo-500 animate-glitch-line" />
               <div className="absolute top-3/4 left-0 w-full h-[1px] bg-purple-500 animate-glitch-line-delay" />
            </div>
          )}

          {/* Identity Pulse effect in lock phase */}
          {phase === 3 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-[400px] h-[400px] border border-indigo-500/40 rounded-full pointer-events-none"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
