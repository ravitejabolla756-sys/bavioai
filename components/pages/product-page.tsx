import Link from "next/link";
import { ArrowRight, CheckCircle2, Network, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";

import { CodeBlock } from "@/components/shared/code-block";
import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { VoiceWaveform } from "@/components/shared/voice-waveform";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const featureSections = [
  {
    icon: Zap,
    title: "Real-time voice processing",
    body:
      "Bavio keeps latency low enough for natural business conversations. Speech-to-text, reasoning, and text-to-speech are coordinated for live calls instead of chatbot-style pauses.",
    points: ["Sub-500ms response target", "Interruptible turn-taking", "Fallback and routing controls"]
  },
  {
    icon: Workflow,
    title: "Visual workflow builder",
    body:
      "Turn every conversation into action. Trigger CRM updates, booking steps, qualification logic, WhatsApp follow-ups, and escalation rules from one workflow layer.",
    points: ["Branch by intent", "Call external APIs", "Capture custom fields"]
  },
  {
    icon: Network,
    title: "Knowledge and integrations",
    body:
      "Upload documents, map FAQs, and connect the tools your team already uses. Bavio brings operational context into every call so the assistant can answer with confidence.",
    points: ["Knowledge base ingestion", "Calendar and CRM sync", "Webhook-first extension layer"]
  },
  {
    icon: ShieldCheck,
    title: "Enterprise controls",
    body:
      "Built for teams that need security, observability, and governance from day one. Review transcripts, control access, and align deployments with regional compliance needs.",
    points: ["Role-aware access", "Audit-friendly call history", "Security and data controls"]
  }
];

export function ProductPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Product"
        title="The AI voice stack, complete."
        description="Every layer of the Bavio platform is built to help businesses deploy voice agents that answer calls, capture intent, and trigger real workflows."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-6 md:p-8">
            <p className="eyebrow">Architecture</p>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {["Exotel", "STT", "LLM", "TTS", "Caller"].map((item, index) => (
                <div key={item} className="relative">
                  <div className="rounded-[18px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-5 text-center text-sm font-semibold text-[var(--text-primary)]">
                    {item}
                  </div>
                  {index < 4 ? (
                    <div className="absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-[linear-gradient(90deg,var(--brand),transparent)] md:block" />
                  ) : null}
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["45ms", "Speech to text"],
                ["180ms", "Reasoning"],
                ["65ms", "Speech synthesis"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-4">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{label}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 md:p-8">
            <p className="eyebrow">Live voice preview</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Production-ready voice interactions.</h2>
            <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
              Listen to the waveform, inspect the action trace, and see how Bavio routes each call into the right next step.
            </p>
            <div className="mt-6 rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
              <VoiceWaveform />
            </div>
            <div className="mt-6 space-y-3">
              {["Detect intent", "Capture context", "Trigger workflow", "Sync outcome"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" />
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PageHero>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 xl:grid-cols-2">
          {featureSections.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--brand)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{feature.title}</h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{feature.body}</p>
                <div className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Sparkles className="mt-1 h-4 w-4 text-[var(--brand)]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="p-8">
            <p className="eyebrow">Developer experience</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">API-first where it matters.</h2>
            <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
              Launch a call flow from the dashboard, or wire it into your internal tools with clean API primitives and webhook triggers.
            </p>
          </Card>
          <CodeBlock
            language="JavaScript"
            code={`import axios from "axios";

const client = axios.create({
  baseURL: "https://api.bavio.in/v1",
  headers: { Authorization: "Bearer <token>" }
});

await client.post("/agents", {
  name: "Real Estate Qualifier",
  language: "Hinglish",
  prompt: "Capture budget, location, and timeline.",
  workflow: ["detect_intent", "score_lead", "send_whatsapp"]
});`}
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.16),transparent_68%)]" />
        <div className="container relative z-[1]">
          <Card className="p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Build with confidence</p>
                <h2 className="text-[clamp(34px,5vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
                  Start with the platform that ships from first call to enterprise scale.
                </h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
                  No dead-end demos, no placeholder workflows, and no confusing stack decisions between telephony, AI, and operations.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/sign-up">
                    Start Building Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/enterprise">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
