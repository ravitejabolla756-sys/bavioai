"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, PlugZap } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Category = "All" | "CRM" | "Calendar" | "SMS" | "Telephony" | "Helpdesk" | "Analytics" | "Custom";

const categories: Category[] = ["All", "CRM", "Calendar", "SMS", "Telephony", "Helpdesk", "Analytics", "Custom"];

type Integration = {
  name: string;
  category: Category;
  description: string;
  setup: string;
  featured?: boolean;
};

const integrations: Integration[] = [
  { name: "HubSpot", category: "CRM", description: "Sync qualified leads and call notes to contacts and deals.", setup: "3 min", featured: true },
  { name: "Salesforce", category: "CRM", description: "Map call outcomes into enterprise opportunity workflows.", setup: "8 min", featured: true },
  { name: "Zoho CRM", category: "CRM", description: "Push lead stages, metadata, and disposition tags automatically.", setup: "4 min" },

  { name: "Google Calendar", category: "Calendar", description: "Book appointments in real time during live calls.", setup: "2 min", featured: true },
  { name: "Outlook", category: "Calendar", description: "Connect Microsoft calendar availability and booking actions.", setup: "4 min", featured: true },
  { name: "Cal.com", category: "Calendar", description: "Use open scheduling flows with custom booking logic.", setup: "2 min", featured: true },

  { name: "Twilio", category: "Telephony", description: "Global voice/SMS infrastructure for inbound and outbound calls.", setup: "5 min", featured: true },
  { name: "Vonage", category: "Telephony", description: "Carrier-grade call routing and telephony controls.", setup: "6 min" },
  { name: "Exotel", category: "Telephony", description: "Native telephony integration optimized for India-first deployments.", setup: "2 min" },

  { name: "MessageBird", category: "SMS", description: "Send SMS/WhatsApp notifications and handoff alerts.", setup: "4 min" },
  { name: "WhatsApp Business", category: "SMS", description: "Deliver summaries, reminders, and payment links post-call.", setup: "3 min" },

  { name: "Zendesk", category: "Helpdesk", description: "Create support tickets with transcript context attached.", setup: "5 min", featured: true },
  { name: "Freshdesk", category: "Helpdesk", description: "Automate ticket creation with sentiment and priority tags.", setup: "5 min" },
  { name: "Slack", category: "Helpdesk", description: "Post real-time call events and escalation alerts to channels.", setup: "2 min", featured: true },

  { name: "Google Analytics", category: "Analytics", description: "Track conversion and call event funnels in GA4.", setup: "3 min" },
  { name: "PostHog", category: "Analytics", description: "Analyze outcomes across experiments and workflows.", setup: "3 min" },

  { name: "Zapier", category: "Custom", description: "Connect Bavio to thousands of tools with low-code automation.", setup: "5 min", featured: true },
  { name: "Make", category: "Custom", description: "Build advanced multi-step scenarios with visual orchestration.", setup: "5 min", featured: true },
  { name: "Webhooks", category: "Custom", description: "Trigger any custom backend with signed real-time event payloads.", setup: "1 min", featured: true }
];

const heroLogos = ["HubSpot", "Salesforce", "Twilio", "Google Calendar", "Outlook", "Cal.com", "Zendesk", "Slack", "Zapier", "Make", "Webhooks"];

export function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return integrations;
    return integrations.filter((i) => i.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-[var(--bg-base)]">
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Integrations</p>
            <h1 className="page-hero-title max-w-4xl">Connect Bavio to Your Entire Stack</h1>
            <p className="page-hero-copy">
              Native integrations for CRM, calendar, messaging, telephony, helpdesk, analytics, and custom workflows.
            </p>
          </SectionReveal>

          <SectionReveal>
            <Card className="mt-10 p-8">
              <div className="flex flex-col items-center">
                <div className="rounded-[14px] border border-[var(--border-brand)] bg-[var(--brand-dim)] px-5 py-3 text-sm font-bold text-[var(--light-accent)]">
                  Bavio AI
                </div>
                <div className="mt-6 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {heroLogos.map((item) => (
                    <div key={item} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-center text-xs text-[var(--text-secondary)]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>

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

      <section className="section-shell pt-10">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((integration) => (
              <SectionReveal key={integration.name}>
                <Card className="h-full p-6 surface-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] text-[var(--brand)]">
                      <PlugZap className="h-4 w-4" />
                    </div>
                    <span className="rounded-full border border-[var(--border-base)] px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {integration.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{integration.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{integration.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">Setup in {integration.setup}</span>
                    <Button asChild size="sm" variant={integration.featured ? "default" : "ghost"}>
                      <Link href="/signup">
                        Connect
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal>
            <Card className="mt-12 p-8 md:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow">Custom integration</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    Don't see your tool?
                  </h2>
                  <p className="mt-3 text-sm text-[var(--text-secondary)]">
                    Build a custom integration with our Webhook API and connect Bavio to any internal or third-party service.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/docs/webhooks">Read Webhook API</Link>
                  </Button>
                  <Button asChild size="lg" variant="ghost">
                    <Link href="/contact">Request Integration</Link>
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
