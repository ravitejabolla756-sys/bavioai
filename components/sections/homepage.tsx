"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Check, CirclePlay, Globe2, Mic, ShieldCheck, Sparkles, Waves, Workflow } from "lucide-react";

import { LiveDemoModal } from "@/components/home/live-demo-modal";
import { SectionReveal } from "@/components/shared/section-reveal";
import { CustomerLogosBar, PressMentions, TestimonialQuotes } from "@/components/shared/trust-elements";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";

const trustStats = [
  ["<500ms", "Latency"],
  ["99.9%", "Uptime SLA"],
  ["SOC 2 Type II", "In Progress"]
];

const integrationPills = ["HubSpot", "Twilio", "Cal.com", "Google Calendar", "Salesforce", "Zoho"];

const marqueeStats = ["2,000+ agents deployed", "1,284,233 calls handled today", "742 agents active now", "Trusted by global teams"];

const features = [
  { title: "Real-time Voice Processing", copy: "Natural turn-taking and low-latency responses for live production calls.", icon: Waves },
  { title: "Workflow Automation", copy: "Execute CRM updates, bookings, and handoff logic directly from conversations.", icon: Workflow },
  { title: "Lead Qualification", copy: "Capture intent, budget, urgency, and next-best action during the call itself.", icon: Sparkles },
  { title: "Multilingual Support", copy: "Deploy AI agents in 20+ languages with regional switching and fallback behavior.", icon: Globe2 },
  { title: "Custom Voice Cloning", copy: "Train AI on your brand voice for consistent customer-facing communication.", icon: Mic }
];

const integrationGrid = [
  "HubSpot", "Salesforce", "Zoho CRM", "Pipedrive", "Google Calendar", "Outlook", "Cal.com", "Twilio", "MessageBird", "Vonage",
  "Zendesk", "Freshdesk", "Intercom", "Slack", "WhatsApp", "Stripe", "Razorpay", "Zapier", "Make", "Shopify",
  "Exotel", "Plivo", "RingCentral", "Airtable"
];

const caseStudies = [
  {
    company: "MedCenter Clinic",
    vertical: "Healthcare",
    metric: "78% fewer missed appointments",
    quote: "Bavio became our 24/7 front desk in under a week."
  },
  {
    company: "UrbanEstate Group",
    vertical: "Real Estate",
    metric: "2.3x more qualified calls",
    quote: "Lead quality improved immediately because every call gets qualified."
  },
  {
    company: "FixFast Field Ops",
    vertical: "Field Service",
    metric: "41% faster dispatch conversion",
    quote: "The AI books jobs and routes details before a human even picks up."
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: 1999,
    href: "/signup?plan=starter",
    features: ["200 minutes", "Core workflows", "Email support"]
  },
  {
    name: "Professional",
    price: 4999,
    href: "/signup?plan=professional",
    features: ["500 minutes", "Advanced analytics", "Integrations", "Priority support"],
    featured: true
  },
  {
    name: "Enterprise",
    price: 14999,
    href: "/signup?plan=enterprise",
    features: ["Custom volume", "SSO + RBAC", "Dedicated success", "SLA options"]
  }
];

export function Homepage() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [roiCalls, setRoiCalls] = useState(100);
  const [roiTicket, setRoiTicket] = useState(1500);
  const [roiMissed, setRoiMissed] = useState(35);
  const [callLive, setCallLive] = useState(false);

  const roi = useMemo(() => {
    const dailyLoss = roiCalls * (roiMissed / 100) * roiTicket;
    const monthlyLoss = dailyLoss * 30;
    return { dailyLoss, monthlyLoss };
  }, [roiCalls, roiMissed, roiTicket]);

  return (
    <div className="bg-[var(--bg-base)]">
      <LiveDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <section className="relative overflow-hidden pt-16">
        <div className="hero-grid absolute inset-0" />
        <div className="container relative z-[1] grid min-h-[calc(100vh-120px)] items-center gap-10 py-16 lg:grid-cols-[0.55fr_0.45fr]">
          <SectionReveal className="max-w-[720px]">
            <Badge className="gap-2 rounded-full border border-[rgba(192,132,252,0.22)] bg-[rgba(255,107,0,0.1)] px-4 py-2 text-[13px] text-[var(--text-primary)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand)]" />
              Clarity Over Complexity
            </Badge>
            <h1 className="mt-7 font-heading text-[clamp(44px,8vw,86px)] font-[800] leading-[0.92] tracking-[-0.05em] text-white">
              Autonomous Voice Agents{" "}
              <span className="text-gradient">for Business Calls</span>
            </h1>
            <p className="mt-6 max-w-[640px] text-[18px] leading-[1.8] text-[var(--text-secondary)]">
              Deploy AI that answers calls, reduces missed calls, qualifies leads, books appointments, and executes workflows in real time.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Building Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" type="button" onClick={() => setDemoOpen(true)}>
                <CirclePlay className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {integrationPills.map((item) => (
                <span key={item} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {trustStats.map(([value, label]) => (
                <span key={label} className="rounded-full border border-[var(--border-brand)] bg-[var(--brand-dim)] px-3 py-1 text-xs text-[var(--light-accent)]">
                  {value} {label}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-[var(--text-secondary)]">
              <Link href="/status" className="underline underline-offset-4">
                Public status page
              </Link>
              <Link href="/benchmarks/voice-latency" className="underline underline-offset-4">
                Voice latency benchmarks
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal>
            <Card className="overflow-hidden p-6">
              <p className="eyebrow">Live call simulation</p>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Incoming call</p>
                  <p className="mt-2 text-sm text-[var(--text-primary)]">+1 (415) 555 0197</p>
                  <div className="mt-4 flex h-12 items-end gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i} className="w-1 rounded-full bg-[var(--brand)]" style={{ height: `${10 + ((i * 7) % 24)}px` }} />
                    ))}
                  </div>
                </div>
                <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">AI processing</p>
                  <div className="mt-2 space-y-2 text-sm">
                    <p className="text-[var(--text-primary)]">Intent: appointment booking</p>
                    <p className="text-[var(--text-secondary)]">Language: English</p>
                    <p className="text-[var(--accent-green)]">Action: Calendar slot suggested</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="button" onClick={() => setCallLive((v) => !v)}>
                  Try It Now - Call Our AI
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/playground">Open Playground</Link>
                </Button>
              </div>
              {callLive ? (
                <div className="mt-4 rounded-[14px] border border-[var(--border-brand)] bg-[var(--brand-dim)] p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--light-accent)]">Real-time transcript</p>
                  <p className="mt-2 text-[var(--text-primary)]">Caller: I need to schedule a service visit tomorrow.</p>
                  <p className="mt-1 text-[var(--text-secondary)]">Bavio AI: I found slots at 10:30 AM and 2:00 PM. Which one works best?</p>
                </div>
              ) : null}
            </Card>
          </SectionReveal>
        </div>
      </section>

      <CustomerLogosBar />

      <section className="border-y border-[var(--border-base)] py-4">
        <div className="container overflow-hidden">
          <div className="flex min-w-max animate-marquee-left gap-8 text-sm text-[var(--text-secondary)]">
            {[...marqueeStats, ...marqueeStats, ...marqueeStats].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Platform capabilities</span>
            <h2 className="section-title">Everything needed to run production voice automation.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="h-full p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--border-brand)] bg-[var(--brand-dim)] text-[var(--light-accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.copy}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialQuotes />

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Integrations showcase</span>
            <h2 className="section-title">Connect instantly with your existing stack.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {integrationGrid.map((item) => (
              <div key={item} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-4 py-3 text-center text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="ghost" asChild>
              <Link href="/integrations">
                See All 50+ Integrations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PressMentions />

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Case studies</span>
            <h2 className="section-title">Measured outcomes from production deployments.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <Card key={item.company} className="p-6">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-faint)]">{item.vertical}</p>
                <h3 className="mt-2 text-2xl font-bold text-white">{item.company}</h3>
                <p className="mt-3 text-sm font-semibold text-[var(--accent-green)]">{item.metric}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">"{item.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <Card className="p-8">
            <SectionReveal className="section-header text-center">
              <span className="eyebrow">ROI calculator</span>
              <h2 className="section-title">How much are unanswered calls costing you?</h2>
            </SectionReveal>
            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-sm text-[var(--text-secondary)]">Calls per day: {roiCalls}</p>
                  <input className="w-full accent-[var(--brand)]" type="range" min={10} max={500} step={10} value={roiCalls} onChange={(e) => setRoiCalls(Number(e.target.value))} />
                </div>
                <div>
                  <p className="mb-2 text-sm text-[var(--text-secondary)]">Average ticket value: INR {formatNumber(roiTicket)}</p>
                  <input className="w-full accent-[var(--brand)]" type="range" min={500} max={10000} step={100} value={roiTicket} onChange={(e) => setRoiTicket(Number(e.target.value))} />
                </div>
                <div>
                  <p className="mb-2 text-sm text-[var(--text-secondary)]">% currently missed: {roiMissed}%</p>
                  <input className="w-full accent-[var(--brand)]" type="range" min={5} max={80} step={1} value={roiMissed} onChange={(e) => setRoiMissed(Number(e.target.value))} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-5">
                  <p className="text-sm text-[var(--text-secondary)]">Estimated monthly loss</p>
                  <p className="mt-2 text-3xl font-black text-[var(--accent-red)]">INR {formatNumber(Math.round(roi.monthlyLoss))}</p>
                </div>
                <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] p-5">
                  <p className="text-sm text-[var(--text-secondary)]">Bavio Professional plan</p>
                  <p className="mt-2 text-3xl font-black text-[var(--accent-green)]">INR 4,999 / month</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Pricing preview</span>
            <h2 className="section-title">Simple pricing with clear upgrade paths.</h2>
          </SectionReveal>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className="relative h-full pt-4">
                {plan.featured ? (
                  <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-full bg-[var(--brand)] px-5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_12px_28px_rgba(255,107,0,0.28)]">
                    Most Popular
                  </div>
                ) : null}
                <Card
                  tilt={false}
                  className={`flex h-full min-h-[380px] flex-col rounded-[16px] p-8 shadow-[0_28px_70px_rgba(0,0,0,0.28)] ${
                    plan.featured
                      ? "border-[var(--brand)] bg-[linear-gradient(180deg,rgba(255,107,0,0.08),rgba(255,255,255,0.02)),var(--card-bg)]"
                      : "border-[var(--border-base)]"
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">{plan.name}</p>
                  <div className="mt-5 flex flex-wrap items-end gap-x-2 gap-y-1">
                    <span className="font-heading text-[clamp(34px,4vw,48px)] font-[800] leading-none text-white">
                      INR {formatNumber(plan.price)}
                    </span>
                    <span className="pb-1 text-sm text-[var(--text-secondary)]">/mo</span>
                  </div>
                  <div className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-[15px] font-semibold text-[var(--text-primary)]">
                        <Check className="h-4 w-4 shrink-0 text-[var(--accent-green)]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-7">
                    <p className="rounded-[10px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                      Cancel anytime, no questions asked.
                    </p>
                    <Link
                      href={plan.href}
                      className={cn(buttonVariants({ variant: plan.featured ? "default" : "ghost" }), "mt-5 w-full")}
                    >
                      Choose {plan.name}
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="ghost" asChild>
              <Link href="/pricing">View full pricing details</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
