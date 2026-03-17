"use client";

import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocsCodeBlock } from "@/components/docs/DocsCodeBlock";
import { Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

export default function DocsPage() {
  const tocItems = [
    { id: "intro", label: "Introduction" },
    { id: "what-you-can-build", label: "What you can build" },
    { id: "getting-started", label: "Getting Started" },
    { id: "create", label: "Create Your Agent" },
    { id: "connect", label: "Connect Telephony" },
    { id: "manage", label: "Manage Conversations" },
  ];

  return (
    <DocsLayout tocItems={tocItems}>
      {/* Intro Section */}
      <section id="intro" className="mb-20 scroll-mt-32">
        <div className="inline-flex items-center px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md text-[10px] font-bold uppercase tracking-widest mb-6">
          Version 2.0 Platform API
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Introduction to Bavio</h1>
        <p className="text-lg text-zinc-400 leading-relaxed font-light max-w-2xl">
          Learn how to build, deploy, and manage production-grade AI voice agents with the Bavio platform. Our API provides hyper-realistic low-latency voice interaction for any business workflow.
        </p>
      </section>

      {/* What you can build Section */}
      <section id="what-you-can-build" className="mb-20 scroll-mt-32 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-bold mb-8 text-white tracking-tight flex items-center gap-3">
          <Sparkles size={20} className="text-indigo-400" />
          What you can build
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { 
              title: "Inbound Support", 
              desc: "Fully autonomous customer support lines.",
              color: "bg-indigo-500",
              icon: <Activity size={16} />
            },
            { 
              title: "Lead Qualification", 
              desc: "High-volume outbound qualification bots.",
              color: "bg-purple-500",
              icon: <Zap size={16} />
            },
            { 
              title: "Scheduling", 
              desc: "Integrated reservation and booking systems.",
              color: "bg-emerald-500",
              icon: <Activity size={16} />
            }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
              <div className={`w-8 h-8 rounded-lg ${item.color}/10 flex items-center justify-center mb-4 text-[#9B8CFF]`}>
                {item.icon}
              </div>
              <h4 className="font-semibold text-white mb-2 text-sm">{item.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="mb-20 scroll-mt-32 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Getting Started</h2>
        <p className="text-zinc-400 font-light mb-8">
          To start using Bavio, generate an API key from the developer dashboard. This key securely authenticates your requests to our REST and WebSocket APIs.
        </p>
        <DocsCodeBlock 
          label="SDK Initialization"
          language="typescript"
          code={`import { Bavio } from '@bavio/sdk';

const client = new Bavio({
  apiKey: process.env.BAVIO_API_KEY,
  environment: 'production'
});`}
        />
      </section>

      {/* Create Agent Section */}
      <section id="create" className="mb-20 scroll-mt-32 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Create Your First AI Agent</h2>
        <p className="text-zinc-400 font-light mb-8">
          Creating an agent requires defining its system prompt, knowledge base (RAG), and the specific function calls (tools) it is allowed to execute.
        </p>
        <div className="space-y-4">
          {[
            { title: "System Prompt", desc: "Define personality, constraints, and objective." },
            { title: "Knowledge Base", desc: "Upload PDFs or link URLs for RAG context." },
            { title: "Function Tools", desc: "Define JSON schemas for API calls." }
          ].map((step, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01]">
              <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-zinc-500 shrink-0 border border-white/10">
                {i + 1}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">{step.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Telephony Section */}
      <section id="connect" className="mb-20 scroll-mt-32 border-t border-white/5 pt-12">
        <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Connect Telephony</h2>
        <p className="text-zinc-400 font-light mb-8">
          Port your existing Twilio, Plivo, or Telnyx numbers directly into the platform workspace, or purchase new numbers instantly. All numbers support high-quality SIP interconnects.
        </p>
        <div className="p-8 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between gap-8">
           <div className="space-y-2">
             <h4 className="text-zinc-200 font-semibold">Ready to scale?</h4>
             <p className="text-xs text-zinc-500">Enable high-throughput SIP trunks for enterprise call volumes.</p>
           </div>
           <button className="bg-white text-zinc-950 px-4 py-2 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-colors">
             View Integration Guide
           </button>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-20 scroll-mt-32 border-t border-white/5 pt-12">
         <h2 className="text-2xl font-bold mb-6 text-white tracking-tight flex items-center gap-2">
           <ShieldCheck size={20} className="text-emerald-400" />
           Security & Compliance
         </h2>
         <p className="text-zinc-400 font-light mb-8">
           Bavio is built with security at its core. We maintain SOC2 Type II compliance and provide end-to-end encryption for all conversation data and API keys.
         </p>
      </section>
    </DocsLayout>
  );
}
