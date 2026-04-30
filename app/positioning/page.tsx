import { Brain, CheckCircle2, Gauge, Gem, ShieldCheck, Zap } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { PageTransition } from "@/components/shared/page-transition";
import { Card } from "@/components/ui/card";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Positioning | Bavio AI",
  description: "Bavio AI competitive positioning, differentiation, brand pillars, and market landscape.",
  path: "/positioning"
});

const competitors = [
  ["Vapi.ai", "Developer-first, strong docs", "Complex for non-developers", "Simpler onboarding and better India pricing"],
  ["Retell AI", "Low-latency voice", "Limited workflow builder", "Richer workflow automation and integrations"],
  ["Bland AI", "Enterprise sales focus", "Expensive, less flexible", "Better value, faster setup, India-first support"],
  ["Twilio Voice", "Massive scale, telco trust", "Not AI-native, requires heavy coding", "AI-native, no-code setup, instant deployment"],
  ["Traditional IVR", "Familiar legacy footprint", "Rigid and frustrating for users", "Conversational AI with natural language and 24/7 intelligence"]
];

const brandPillars = [
  { title: "Clarity", copy: "We eliminate complexity. Every feature, interface, and conversation is designed to be instantly understood.", icon: Gem },
  { title: "Intent", copy: "No bloat. No noise. Built with purpose for intent-driven businesses.", icon: CheckCircle2 },
  { title: "Speed", copy: "Sub-500ms voice responses, 5-minute agent deployment, and instant onboarding.", icon: Zap },
  { title: "Reliability", copy: "99.9% uptime is a promise, with enterprise-grade infrastructure for every size of business.", icon: ShieldCheck },
  { title: "Intelligence", copy: "Voice that understands, reasons, and acts. Real AI, not scripted IVR with new packaging.", icon: Brain },
  { title: "Execution", copy: "Fast setup, deep workflows, and measurable operational outcomes.", icon: Gauge }
];

export default function PositioningPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Positioning"
        title="Built between raw APIs and enterprise-only incumbents."
        description="Bavio gives businesses instant deployment, real-time intelligence, and deep workflow automation without raw API complexity or enterprise-only pricing."
      />

      <section className="section-shell pt-0">
        <div className="container">
          <Card className="border-[var(--border-brand)] p-8">
            <p className="eyebrow">Positioning statement</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[var(--text-primary)]">
              Bavio is the voice AI platform for businesses that want instant deployment, real-time intelligence, and deep workflow automation.
            </h2>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Competitive landscape</span>
            <h2 className="section-title">Where Bavio wins.</h2>
          </div>
          <div className="mt-10 overflow-hidden rounded-[20px] border border-[var(--border-base)]">
            <div className="grid grid-cols-4 bg-[var(--bg-overlay)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              <span>Competitor</span>
              <span>Strength</span>
              <span>Weakness</span>
              <span>Bavio advantage</span>
            </div>
            {competitors.map(([name, strength, weakness, advantage], index) => (
              <div key={name} className={`grid grid-cols-4 gap-4 px-6 py-4 text-sm ${index % 2 === 0 ? "bg-[var(--bg-raised)]" : "bg-[var(--bg-base)]"}`}>
                <span className="font-semibold text-[var(--text-primary)]">{name}</span>
                <span className="text-[var(--text-secondary)]">{strength}</span>
                <span className="text-[var(--text-secondary)]">{weakness}</span>
                <span className="text-[var(--accent-green)]">{advantage}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {brandPillars.map(({ title, copy, icon: Icon }) => (
            <Card key={title} className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-2xl font-black text-[var(--text-primary)]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
            </Card>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
