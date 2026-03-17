import { 
  Target, 
  Globe, 
  Cpu, 
  Users, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Layout,
  MessageSquare,
  Calendar,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Hospital,
  Utensils,
  Building2,
  Wrench,
  Rocket,
  CheckCircle2,
  Activity,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Company | Bavio",
  description: "Pioneering the future of voice communication with intelligent AI voice agents.",
};

export default function CompanyPage() {
  return (
    <div className="bg-[#050507] min-h-screen pt-32 pb-24 relative overflow-hidden text-zinc-400 font-sans selection:bg-indigo-500/30">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_20%,rgba(120,80,255,0.08),transparent_60%)]" />
      </div>

      {/* 1. HERO */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-[700px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md mb-8 animate-fade-in">
              <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase">
                The Future of Voice
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white mb-8 leading-[1.05]">
              Pioneering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">voice communication.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 font-light leading-relaxed max-w-[600px] mx-auto">
              Bavio builds AI voice agents that handle real business calls in real time. From answering customers to booking appointments, every call becomes automated, intelligent, and instant.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                href="/sign-up"
                className="group relative px-8 py-4 rounded-xl bg-white text-black text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] w-full sm:w-[200px]"
              >
                Start Building
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-[200px] text-center"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR MISSION */}
      <section id="mission" className="py-24 relative">
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-6">Our Mission</h2>
          <div className="glass-card p-12 md:p-16 rounded-[2.5rem] border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">To eliminate missed calls.</h3>
            <p className="text-xl text-zinc-400 font-light leading-relaxed">
              We eliminate missed calls, reduce operational overhead, and replace outdated systems with intelligent voice agents that operate 24/7 without delay.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM SECTION */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold text-red-500 tracking-[0.3em] uppercase mb-6">The Problem</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Businesses lose revenue every day because calls go unanswered.</h3>
              <p className="text-lg text-zinc-400 mb-10 font-light">Hospitals miss patient inquiries. Restaurants lose reservations. Service businesses fail to capture high-intent customers.</p>
              
              <div className="space-y-4">
                {[
                  "IVR systems are rigid and frustrating",
                  "Hiring staff is expensive and inconsistent",
                  "Support is limited by time and availability"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/20 transition-colors group">
                    <div className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500 transition-colors" />
                    <span className="text-zinc-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
              <div className="glass-card p-8 rounded-3xl border-red-500/10 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(239,68,68,0.05)] transition-all duration-300">
                <div className="text-4xl font-bold text-white mb-2">60%</div>
                <div className="text-zinc-500 text-sm leading-relaxed">Of calls to small businesses go unanswered, leading to direct loss in revenue.</div>
              </div>
              <div className="glass-card p-8 rounded-3xl border-red-500/10 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(239,68,68,0.05)] transition-all duration-300 mt-6 sm:mt-12">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-zinc-500 text-sm leading-relaxed">Modern customers expect immediate responses at any hour, every single day.</div>
              </div>
              <div className="sm:col-span-2 glass-card p-8 rounded-3xl border-red-500/10 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(239,68,68,0.05)] transition-all duration-300">
                <div className="flex items-center gap-4 mb-2">
                  <TrendingUp className="text-red-500" size={24} />
                  <div className="text-2xl font-bold text-white">Lost Intent</div>
                </div>
                <div className="text-zinc-500 text-sm leading-relaxed">Voice is the highest-intent channel. A missed call is a missed customer captured by a competitor.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW BAVIO WORKS → UPGRADE FLOW */}
      <section className="py-32 relative border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-6">Execution</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">How Bavio Works</h3>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent hidden lg:block" />
            
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {[
                { title: "Select a Plan", desc: "A business signs up and selects a volume-based plan.", icon: <Layout /> },
                { title: "Share Data", desc: "Provide services, timings, and business knowledge.", icon: <CheckCircle2 /> },
                { title: "AI Creation", desc: "Bavio creates a dedicated voice agent for your brand.", icon: <Cpu /> },
                { title: "Go Live", desc: "A number is assigned and the AI starts handling calls.", icon: <Rocket /> }
              ].map((step, i) => (
                <div key={i} className="glass-card p-8 rounded-[2rem] hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-zinc-500 mb-2 font-mono italic">Phase 0{i+1}</div>
                  <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-12">
             {[
               { label: "Answers questions", icon: <MessageSquare className="text-indigo-400" /> },
               { label: "Books appointments", icon: <Calendar className="text-purple-400" /> },
               { label: "Captures leads", icon: <UserPlus className="text-emerald-400" /> }
             ].map((item, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">{item.icon}</div>
                 <span className="text-zinc-300 font-medium">{item.label}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE BUILD → PREMIUM PANEL */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-6">Solutions</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight">What We Build</h3>
              {[
                { title: "AI-powered call handling", desc: "Advanced natural language processing for real conversations.", icon: <Cpu /> },
                { title: "Appointment automation", desc: "Seamless booking flows without human intervention.", icon: <Calendar /> },
                { title: "Lead qualification", desc: "Categorize and rank leads live on the call.", icon: <Target /> },
                { title: "Conversational workflows", desc: "Dynamic scripts that adapt to user input.", icon: <Zap /> }
              ].map((item, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border-white/5 hover:border-indigo-500/30 hover:scale-[1.02] transition-all duration-300 group flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-zinc-500 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-white/10 flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,80,255,0.1),transparent_70%)] group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 flex flex-col items-center">
                   <div className="flex items-center gap-1 mb-6">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-1 bg-indigo-500/40 rounded-full animate-wave" style={{ height: `${Math.random() * 40 + 10}px`, animationDelay: `${i * 0.05}s` }} />
                      ))}
                   </div>
                   <div className="w-24 h-24 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center animate-pulse">
                      <Activity className="text-indigo-400 w-10 h-10" />
                   </div>
                   <div className="mt-8 text-indigo-400 font-mono text-xs tracking-widest uppercase">Processing Real-time Voice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDING STORY → STRONG BLOCK */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass-card p-12 md:p-20 rounded-[3rem] border-white/5 border-l-4 border-l-purple-500 relative overflow-hidden group">
            <div className="absolute top-8 right-10">
              <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold text-purple-400 uppercase tracking-widest">
                Built by 2 founders • Early stage
              </span>
            </div>
            <h2 className="text-sm font-bold text-purple-500 tracking-[0.3em] uppercase mb-10">How Bavio Started</h2>
            <div className="prose prose-invert prose-lg max-w-none text-zinc-400 font-light leading-relaxed">
              <p className="text-2xl text-white font-medium mb-8 leading-snug">
                &ldquo;We decided to build a system where every call is answered, understood, and acted upon.&rdquo;
              </p>
              <p className="mb-6">Bavio started from a simple observation: businesses are losing customers because they cannot handle calls efficiently. We saw hospitals missing calls, restaurants losing bookings, and service businesses unable to respond in time.</p>
              <p>Built by two Computer Science students from SRM Institute of Science and Technology, Trichy, focused on solving real-world problems through practical systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MERGED GRID (BUILD & USERS) */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* How We Build */}
            <div>
              <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-12">Product Philosophy</h2>
              <div className="space-y-8">
                {[
                  { title: "Real-time response", desc: "Over delayed systems", icon: <Clock /> },
                  { title: "Automation", desc: "Over manual processes", icon: <Zap /> },
                  { title: "Simplicity", desc: "For end users", icon: <Layout /> },
                  { title: "Reliability", desc: "At scale", icon: <ShieldCheck /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0 group-hover:border-indigo-500/30 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-500 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Who It's For */}
            <div>
              <h2 className="text-sm font-bold text-emerald-500 tracking-[0.3em] uppercase mb-12">Who It&apos;s For</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: "Hospitals", icon: <Hospital /> },
                  { title: "Restaurants", icon: <Utensils /> },
                  { title: "Real Estate", icon: <Building2 /> },
                  { title: "Service Providers", icon: <Wrench /> }
                ].map((item, i) => (
                  <div key={i} className="glass-card p-8 rounded-2xl flex flex-col gap-6 hover:scale-[1.05] transition-transform duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/5">
                      {item.icon}
                    </div>
                    <div className="text-lg font-bold text-white">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY BAVIO → PREMIUM CARDS */}
      <section className="py-32 relative bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-6">Benefits</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Why Bavio</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "24/7 Calls", icon: <Clock /> },
              { title: "Reduced Cost", icon: <TrendingUp /> },
              { title: "No Missed Leads", icon: <Target /> },
              { title: "Instant Setup", icon: <Zap /> },
              { title: "Built for Biz", icon: <ShieldCheck /> }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl text-center flex flex-col items-center gap-6 group hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)] transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-white font-bold leading-tight tracking-tight">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. VISION → HERO-LEVEL */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="glass-card p-16 md:p-24 rounded-[4rem] border-white/5 flex flex-col items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.05] to-transparent" />
            <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-10 relative z-10">The Future Vision</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-white mb-12 tracking-tight leading-tight relative z-10">Every interaction becomes seamless.</h3>
            
            <div className="grid md:grid-cols-3 gap-12 w-full relative z-10 pt-12 border-t border-white/5">
              {[
                { title: "No missed calls", desc: "Every inquiry captured" },
                { title: "No waiting", desc: "Instant human-like talk" },
                { title: "No bottlenecks", desc: "Scales with demand" }
              ].map((pill, i) => (
                <div key={i} className="group/pill">
                  <div className="text-xl font-bold text-white mb-2 group-hover/pill:text-indigo-400 transition-colors uppercase tracking-widest text-xs font-mono">{pill.title}</div>
                  <p className="text-zinc-500 font-light">{pill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOUNDERS → TRUST SECTION */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-indigo-500 tracking-[0.3em] uppercase mb-6">Leadership</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-sans">Founders</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Raviteja", role: "Founder", focus: "Core product and technical systems", icon: <Cpu /> },
              { name: "Praneeth", role: "Co-founder", focus: "Business strategy and growth", icon: <TrendingUp /> }
            ].map((founder, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 hover:scale-[1.02] transition-all duration-300 group flex items-start gap-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
                  {founder.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">{founder.name}</h4>
                  <p className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-4 font-mono">{founder.role}</p>
                  <p className="text-zinc-500 font-light leading-relaxed">{founder.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CURRENT STAGE → VISUAL STATUS */}
      <section className="py-32 relative border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="glass-card p-12 rounded-[2.5rem] border-white/5">
             <h2 className="text-xl font-bold text-white mb-12 flex items-center gap-3">
                <Activity className="text-indigo-500" />
                Current Roadmap
             </h2>
             <div className="space-y-8">
                {[
                  { text: "Product in active development", done: true },
                  { text: "Expected launch: 2–3 months", done: false },
                  { text: "Team: 2 dedicated builders", done: true }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-400' : 'bg-white/5 border border-white/10 text-zinc-600'}`}>
                      {item.done ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />}
                    </div>
                    <span className={`text-lg font-medium transition-colors ${item.done ? 'text-zinc-200' : 'text-zinc-500'}`}>{item.text}</span>
                  </div>
                ))}
             </div>
             <div className="mt-12 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[65%] h-full bg-gradient-to-r from-indigo-600 to-indigo-400" />
             </div>
          </div>
        </div>
      </section>

      {/* 12. CTA → STRONG CONVERSION */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/10 to-indigo-900/20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] -z-10" />
        
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tight">Build with Bavio</h2>
          <p className="text-xl text-zinc-400 mb-12 font-light max-w-2xl mx-auto">Be part of the future of voice automation. Start your journey with us today.</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              href="/sign-up"
              className="group h-16 w-full sm:w-[240px] rounded-2xl bg-white text-black font-bold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.05] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] active:scale-[0.98]"
            >
              Start Building
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="h-16 w-full sm:w-[240px] rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg flex items-center justify-center transition-all hover:bg-white/10 hover:border-white/20 hover:scale-[1.05] active:scale-[0.98]"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}