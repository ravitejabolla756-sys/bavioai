"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-transparent min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 transform-gpu will-change-transform pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -z-10 transform-gpu will-change-transform pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Setup */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Let's build your <span className="text-gradient">agent.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 font-light leading-relaxed">
              Whether you need a custom enterprise solution, a quick demo, or just have technical questions about our API, our engineering team is ready to help.
            </p>
            
            <div className="glass-card p-8 rounded-[2rem] space-y-8">
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">What happens next?</h3>
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 font-bold border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">1</div>
                <div className="pt-1.5">
                  <h4 className="text-zinc-100 font-semibold mb-1">Architecture Review</h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">We review your use case and determine the feasibility and required integrations.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 font-bold border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">2</div>
                <div className="pt-1.5">
                   <h4 className="text-zinc-100 font-semibold mb-1">Live Demonstration</h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">We schedule a personalized, interactive demo tailored to your specific industry constraints.</p>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 font-bold border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]">3</div>
                <div className="pt-1.5">
                   <h4 className="text-zinc-100 font-semibold mb-1">Sandbox Access</h4>
                  <p className="text-sm text-zinc-400 font-light leading-relaxed">You receive trial credits and API keys to test out the agent's capabilities yourself.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Form */}
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            {submitted ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-20" />
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white mb-4">Request Received</h3>
                <p className="text-zinc-400 font-light leading-relaxed max-w-sm">Thank you for reaching out. An engineer will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">First Name</label>
                    <input required type="text" id="firstName" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Last Name</label>
                    <input required type="text" id="lastName" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Work Email</label>
                  <input required type="email" id="email" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light" placeholder="jane@company.com" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Company Name</label>
                    <input required type="text" id="company" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light" placeholder="Acme Inc" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="useCase" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Primary Use Case</label>
                    <select required defaultValue="" id="useCase" className="w-full bg-[#050505] border border-white/5 rounded-2xl px-5 py-4 text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light appearance-none cursor-pointer">
                      <option value="" disabled className="text-zinc-600">Select an option...</option>
                      <option value="inbound">Inbound Customer Support</option>
                      <option value="outbound">Outbound Lead Qualification</option>
                      <option value="scheduling">Appointment Scheduling</option>
                      <option value="other">Other / Custom Enterprise</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 pt-2">
                  <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-zinc-500 ml-1">Project Details</label>
                  <textarea required id="message" rows={4} className="w-full bg-[#050505] border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-light resize-none" placeholder="Tell us about your call volume, integrations needed, and timeline..."></textarea>
                </div>
                
                <button type="submit" className="group relative w-full flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white text-[#050505] text-base font-bold transition-all hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] overflow-hidden mt-8">
                   <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-in-out" />
                  <span className="relative z-10">Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
