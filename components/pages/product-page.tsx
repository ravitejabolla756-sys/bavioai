import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, Mic, Network, PhoneCall, ShieldCheck, Sparkles, Waves, Workflow } from "lucide-react";

import { CodeBlock } from "@/components/shared/code-block";
import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const productSections = [
  {
    title: "Real-Time Voice Processing",
    copy: "Run low-latency speech-to-speech pipelines with interrupt handling, confidence scoring, and call-state memory.",
    points: ["Latency architecture: STT -> LLM -> TTS", "Streaming turn detection and barge-in", "Production telemetry and fallback routes"],
    visual: ["45ms STT", "180ms reasoning", "65ms synthesis"],
    icon: Waves
  },
  {
    title: "Visual Workflow Builder",
    copy: "Design production call flows with intent routing, external APIs, lead scoring, and escalation to human agents.",
    points: ["Drag-and-drop node canvas", "Conditional branching and retries", "Publish versioning with rollback"],
    visual: ["Intent node", "CRM action", "Calendar booking"],
    icon: Workflow
  },
  {
    title: "Knowledge Base Management",
    copy: "Upload documents, crawl URLs, and train response behavior with structured business context.",
    points: ["PDF, docs, and URL ingestion", "Source freshness and re-indexing", "Control retrieval boundaries per agent"],
    visual: ["Upload", "Index", "Answer"],
    icon: Network
  },
  {
    title: "Analytics Dashboard",
    copy: "Track call volume, resolutions, sentiment, and revenue outcomes in one operational layer.",
    points: ["Call funnel and conversion views", "CSAT and sentiment distribution", "Cost-per-call and ROI reporting"],
    visual: ["Volume chart", "Sentiment graph", "CSAT score"],
    icon: Sparkles
  },
  {
    title: "Voice Library and Cloning",
    copy: "Use production-ready voices or train custom branded voices with multilingual support.",
    points: ["Inline voice previews", "Voice profile controls", "Enterprise voice cloning pipeline"],
    visual: ["Aarav", "Mira", "Anika", "Nila", "Raghav", "Vikram"],
    icon: Mic
  },
  {
    title: "Integrations Hub",
    copy: "Connect CRM, calendar, telephony, helpdesk, and messaging stacks without brittle glue code.",
    points: ["Native connectors for major tools", "Webhook-first extension support", "Connection health monitoring"],
    visual: ["HubSpot", "Salesforce", "Twilio", "Zendesk"],
    icon: Network
  },
  {
    title: "Phone Number Provisioning",
    copy: "Search, purchase, route, and govern phone numbers with SIP and regional compliance settings.",
    points: ["Regional number provisioning", "SIP trunk setup", "Failover and routing controls"],
    visual: ["Search numbers", "Buy", "Route calls"],
    icon: PhoneCall
  },
  {
    title: "Enterprise Security",
    copy: "Meet procurement and compliance requirements with SSO, RBAC, audit logs, and data residency controls.",
    points: ["SAML SSO and access controls", "Policy and audit readiness", "Region-aware deployment strategy"],
    visual: ["SSO", "RBAC", "Audit", "Residency"],
    icon: ShieldCheck
  }
];

export function ProductPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Product"
        title="Build Voice Agents That Actually Work"
        description="From first proof-of-concept to enterprise scale, Bavio provides the full stack for production voice automation."
      >
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Card className="p-6 md:p-8">
            <p className="eyebrow">Product demo</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Live call orchestration in one view.</h2>
            <div className="mt-6 rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {["Incoming call", "AI reasoning", "Workflow action"].map((item) => (
                  <div key={item} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-3 py-4 text-center text-xs text-[var(--text-secondary)]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex h-12 items-end gap-1">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span key={i} className="w-1 rounded-full bg-[var(--brand)]" style={{ height: `${8 + ((i * 9) % 28)}px` }} />
                ))}
              </div>
            </div>
          </Card>
          <Card className="p-6 md:p-8">
            <p className="eyebrow">Architecture</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["45ms", "STT"],
                ["180ms", "LLM"],
                ["65ms", "TTS"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-4">
                  <p className="text-2xl font-black text-[var(--brand)]">{value}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-sm text-[var(--text-secondary)]">
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" /> Real-time interrupt support</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" /> Multi-language execution</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--accent-green)]" /> Production-grade observability</p>
            </div>
          </Card>
        </div>
      </PageHero>

      <section className="section-shell pt-0">
        <div className="container space-y-6">
          {productSections.map((section, index) => {
            const Icon = section.icon;
            const reverse = index % 2 === 1;
            return (
              <div key={section.title} className={`grid gap-6 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <Card className="p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{section.title}</h2>
                  <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{section.copy}</p>
                  <div className="mt-5 space-y-3">
                    {section.points.map((point) => (
                      <div key={point} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                        <Sparkles className="mt-1 h-4 w-4 text-[var(--brand)]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-8">
                  <p className="eyebrow">Feature preview</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {section.visual.map((item) => (
                      <div key={item} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="p-8">
            <p className="eyebrow">Developer API</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Clean API and webhook model.</h2>
            <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
              Launch agents programmatically, attach workflows, and ingest call events using production-safe primitives.
            </p>
          </Card>
          <CodeBlock
            language="JavaScript"
            code={`import axios from "axios";

const client = axios.create({
  baseURL: "https://api.bavio.ai/v1",
  headers: { Authorization: "Bearer <token>" }
});

await client.post("/agents", {
  name: "Support Voice Agent",
  language: "English",
  workflow: ["detect_intent", "book_slot", "send_summary"]
});`}
          />
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[320px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.16),transparent_68%)]" />
        <div className="container relative z-[1]">
          <Card className="p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow">Start now</p>
                <h2 className="text-[clamp(34px,5vw,60px)] font-black leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
                  Start with our free plan - no credit card required.
                </h2>
                <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">
                  Build your first production-ready voice workflow today and scale without rebuilding the stack.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Start Building Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/enterprise">
                    <Lock className="mr-2 h-4 w-4" />
                    Talk to Enterprise Sales
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
