import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Zap, Shield, Activity, Mic, AudioWaveform } from "lucide-react";
import { SlidingTextButton } from "@/components/ui/sliding-text-button";

export function Hero() {
  const router = useRouter();
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden transform-gpu">
      {/* Ambient glow blobs — hero-specific decorations on top of global grid */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#7B61FF]/8 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-[#9B8CFF]/4 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col relative z-20"
          >
            <div className="inline-flex items-center self-start gap-2 px-3 py-1.5 rounded-full border border-[#7B61FF]/30 bg-[#7B61FF]/10 backdrop-blur-md mb-8">
              <Sparkles className="w-4 h-4 text-[#9B8CFF]" />
              <span className="text-xs font-medium text-[#9B8CFF] tracking-wide uppercase">
                Enterprise AI Infrastructure
              </span>
            </div>
            
            <h1 className="text-5xl md:text-[5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold tracking-tighter text-white mb-6 leading-[1.05]">
              Autonomous <br className="hidden md:block" />
              Voice Agents for <br />
              <span className="text-gradient">Business Calls.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-lg leading-relaxed font-light tracking-wide">
              Deploy AI agents that answer calls, qualify leads, book appointments, and execute workflows in real time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-10 w-full sm:w-auto">
              <SlidingTextButton
                onClick={() => router.push("/sign-up")}
                variant="primary"
                hoverText="Start Building →"
                className="px-8 py-4 w-full sm:w-auto rounded-xl text-base font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Start Building
              </SlidingTextButton>
              <SlidingTextButton
                onClick={() => router.push("/contact")}
                variant="outline"
                hoverText="Talk to Sales"
                className="px-8 py-4 w-full sm:w-auto rounded-xl glass-card text-base font-medium"
              >
                Book Demo
              </SlidingTextButton>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#9B8CFF]" />
                <span>&lt;500ms latency</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-emerald-400" />
                <span>99.9% uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-indigo-400" />
                <span>Enterprise ready</span>
              </div>
            </div>
          </motion.div>

          {/* Right AI Call Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:ml-auto w-full max-w-lg"
          >
            {/* Glow Behind */}
            <div className="absolute inset-0 bg-[#7B61FF]/20 rounded-[2.5rem] blur-[60px] -z-10" />
            
            {/* Main Demo Card */}
            <div className="glass-card rounded-[2rem] p-6 sm:p-8 relative overflow-hidden transform-gpu flex flex-col gap-6 shadow-2xl border-white/10 bg-[#111116]/80">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7B61FF]/50 to-transparent" />
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-[#7B61FF]/10 border border-[#7B61FF]/20">
                    <AudioWaveform size={20} className="text-[#9B8CFF]" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-zinc-100 font-medium tracking-tight">Live Voice Agent</h3>
                    <div className="flex items-center gap-2 text-xs text-[#9B8CFF]/80 mt-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#9B8CFF]"></span>
                      </span>
                      Listening & Thinking...
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs text-zinc-500 bg-[#0A0A0E] px-2 py-1 rounded-md border border-white/5">
                  00:14
                </div>
              </div>

              {/* Visualization Area */}
              <div className="h-32 rounded-xl bg-[#0A0A0E]/50 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-[0.02]" />
                
                {/* Waveform animation */}
                <div className="flex items-end gap-1 h-12">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: ["20%", "80%", "30%", "100%", "40%"],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: i * 0.05,
                      }}
                      className="w-1.5 bg-gradient-to-t from-[#7B61FF] to-[#9B8CFF] rounded-full opacity-80"
                      style={{ height: "40%" }}
                    />
                  ))}
                </div>
                
                <p className="text-xs text-zinc-500 mt-4 tracking-widest uppercase font-medium">Bavio AI Model V2</p>
              </div>

              {/* Call Transcription & Action Panel */}
              <div className="space-y-4">
                <div className="bg-[#0A0A0E]/80 border border-white/5 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic size={14} className="text-zinc-500" />
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">User speaking</span>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed font-light">
                    "Hi, I'm calling to inquire about upgrading our current tier to include custom SSO."
                  </p>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="bg-[#7B61FF]/10 border border-[#7B61FF]/20 p-4 rounded-xl relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-noise opacity-[0.03]" />
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2">
                      <Sparkles size={14} className="text-[#9B8CFF]" />
                      <span className="text-xs font-medium text-[#9B8CFF] uppercase tracking-wide">Action Triggered</span>
                    </div>
                    <CheckCircle2 size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <div className="bg-[#0A0A0E] rounded-lg p-3 font-mono text-xs text-zinc-300 border border-white/5 relative z-10">
                    <span className="text-[#7B61FF]">execute</span>.<span className="text-emerald-400">upgrade_tier</span>({`{`}<br/>
                    &nbsp;&nbsp;intent: <span className="text-orange-300">"SSO Upgrade"</span>,<br/>
                    &nbsp;&nbsp;confidence: <span className="text-blue-300">0.98</span><br/>
                    {`}`})
                  </div>
                </motion.div>
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
