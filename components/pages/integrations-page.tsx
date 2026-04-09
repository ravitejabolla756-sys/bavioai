"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, Zap } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Category = "All" | "CRM" | "Calendar" | "SMS" | "Telephony" | "Support" | "Payments" | "Analytics";

const categories: Category[] = ["All", "CRM", "Calendar", "SMS", "Telephony", "Support", "Payments", "Analytics"];

const integrations: { name: string; category: Category; description: string; setup: string; status: "live" | "beta" | "coming-soon"; }[] = [
  { name: "Exotel", category: "Telephony", description: "Native Indian telephony — call routing, recording sync, and live transcript streaming in one connection.", setup: "2 min", status: "live" },
  { name: "Twilio", category: "Telephony", description: "Global voice and SMS infrastructure. Supports toll-free, SIP trunk, and call forwarding worldwide.", setup: "5 min", status: "live" },
  { name: "WhatsApp Business", category: "SMS", description: "Send booking confirmations, payment links, and follow-up messages automatically after every call.", setup: "3 min", status: "live" },
  { name: "HubSpot", category: "CRM", description: "Push qualified leads, call notes, and disposition tags directly into HubSpot contacts and deals.", setup: "3 min", status: "live" },
  { name: "Salesforce", category: "CRM", description: "Sync enterprise leads and call outcomes into Salesforce opportunities with field-level mapping.", setup: "8 min", status: "live" },
  { name: "Zoho CRM", category: "CRM", description: "Map Bavio lead fields to your Zoho schema. Auto-create contacts and update lead stages post-call.", setup: "4 min", status: "live" },
  { name: "Google Calendar", category: "Calendar", description: "Book appointments in real time during calls. Checks agent availability and creates calendar events.", setup: "2 min", status: "live" },
  { name: "Outlook Calendar", category: "Calendar", description: "Connect Microsoft scheduling workflows. Supports Exchange and M365 business accounts.", setup: "4 min", status: "live" },
  { name: "cal.com", category: "Calendar", description: "Open-source scheduling integration. Supports round-robin, collective, and one-on-one booking types.", setup: "2 min", status: "live" },
  { name: "Slack", category: "Support", description: "Push real-time alerts for high-intent calls, missed calls, and workflow failures to any Slack channel.", setup: "2 min", status: "live" },
  { name: "Freshdesk", category: "Support", description: "Auto-create and enrich support tickets from call transcripts. Attach recordings and sentiment scores.", setup: "5 min", status: "live" },
  { name: "Zendesk", category: "Support", description: "Create Zendesk tickets automatically and populate caller context from the call transcript.", setup: "5 min", status: "beta" },
  { name: "Razorpay", category: "Payments", description: "Trigger payment links mid-call via WhatsApp. Supports UPI, cards, and NetBanking.", setup: "6 min", status: "live" },
  { name: "Stripe", category: "Payments", description: "Send Stripe payment links globally. Supports INR and 130+ currencies for international deployments.", setup: "4 min", status: "live" },
  { name: "Google Analytics", category: "Analytics", description: "Track call events, conversion triggers, and lead capture outcomes in GA4 via server-side events.", setup: "3 min", status: "beta" },
  { name: "PostHog", category: "Analytics", description: "Send call funnel events and A/B test conversation flows with product analytics from PostHog.", setup: "3 min", status: "beta" },
  { name: "Webhooks", category: "All", description: "Connect any internal or third-party system with real-time webhook events, custom payloads, and retry logic.", setup: "1 min", status: "live" },
  { name: "Intercom", category: "Support", description: "Create Intercom conversations from missed or complex calls. Attach transcript for seamless handoff.", setup: "6 min", status: "coming-soon" },
  { name: "Zapier", category: "All", description: "Connect Bavio to 6,000+ apps via Zapier triggers and actions. No code required.", setup: "5 min", status: "coming-soon" },
  { name: "Make (Integromat)", category: "All", description: "Build complex automation scenarios with Make's visual builder and Bavio's webhook triggers.", setup: "5 min", status: "coming-soon" }
];

const statusBadge: Record<string, string> = {
  "live": "text-[var(--accent-green)] border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)]",
  "beta": "text-amber-400 border-amber-400/30 bg-amber-400/08",
  "coming-soon": "text-[var(--text-muted)] border-[var(--border-base)] bg-transparent"
};

const statusLabel: Record<string, string> = {
  "live": "Live",
  "beta": "Beta",
  "coming-soon": "Coming soon"
};

export function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(
    () => integrations.filter((i) => activeCategory === "All" || i.category === activeCategory || i.category === "All"),
    [activeCategory]
  );

  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Integrations</p>
            <h1 className="page-hero-title max-w-4xl">
              Connect Bavio to your{" "}
              <span className="text-gradient">entire stack.</span>
            </h1>
            <p className="page-hero-copy">
              CRM, calendar, telephony, WhatsApp, payments, and webhooks — all designed to plug into the systems your team already runs. No extra middleware.
            </p>
          </SectionReveal>

          <SectionReveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["20+", "Live integrations"],
                ["1 min", "Fastest setup time"],
                ["Webhook", "Connect anything else"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-5 py-4 text-center">
                  <p className="text-2xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Category Filter */}
      <div className="sticky top-[64px] z-20 border-b border-[var(--border-base)] bg-[rgba(8,6,0,0.92)] backdrop-blur-[20px]">
        <div className="container">
          <div className="flex gap-1 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-[var(--brand)] text-black"
                    : "border border-[var(--border-base)] bg-[var(--bg-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Integration Grid */}
      <section className="section-shell pt-10">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((integration) => (
              <SectionReveal key={integration.name}>
                <Card className="h-full p-6 surface-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] text-sm font-black text-[var(--brand)]">
                      {integration.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className={`mt-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold`} style={{ color: "inherit" }}>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusBadge[integration.status]}`}>
                        {integration.status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                        {statusLabel[integration.status]}
                      </span>
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{integration.name}</h3>
                      <span className="rounded-full border border-[var(--border-base)] px-2 py-0.5 text-[10px] font-semibold text-[var(--text-muted)]">{integration.category}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{integration.description}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <Zap className="h-3.5 w-3.5 text-[var(--brand)]" />
                      Setup in {integration.setup}
                    </span>
                    {integration.status === "live" ? (
                      <Button asChild size="sm" variant="ghost" className="h-8 text-xs">
                        <Link href="/sign-up">Connect <ArrowRight className="ml-1 h-3 w-3" /></Link>
                      </Button>
                    ) : (
                      <span className="text-xs text-[var(--text-muted)]">{statusLabel[integration.status]}</span>
                    )}
                  </div>
                </Card>
              </SectionReveal>
            ))}
          </div>

          {/* Custom webhook CTA */}
          <SectionReveal>
            <Card className="mt-12 p-8 md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow">Build your own</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    Don't see your tool? Use Webhooks.
                  </h2>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    Bavio's webhook system supports any internal or third-party system. Define your payload, test in real time, and connect it in under a minute.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/docs">
                      Read webhook docs
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost">
                    <Link href="/contact">Request an integration</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
