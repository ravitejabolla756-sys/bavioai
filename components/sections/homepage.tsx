"use client";

import Link from "next/link";
import { ArrowRight, Check, CirclePlay } from "lucide-react";
import { useState } from "react";

import { LiveDemoModal } from "@/components/home/live-demo-modal";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

const stats = [
  ["<500ms", "Response speed"],
  ["24/7", "Always answering"],
  ["60%", "Calls go unanswered"],
  ["₹1.32", "Average cost / min"],
  ["63M", "Indian SMBs"]
];

const features = [
  { title: "Real-time Voice AI", copy: "Answers instantly with context-aware, natural conversation handling." },
  { title: "Multi-language", copy: "Understands Hindi, English, and Hinglish without rigid menu trees." },
  { title: "24/7 Automation", copy: "Keeps your business live after hours without hiring another shift." },
  { title: "Lead Capture", copy: "Collects name, phone, budget, and intent while the call is happening." },
  { title: "WhatsApp Alerts", copy: "Sends follow-up and handoff context straight to your team." },
  { title: "Analytics Dashboard", copy: "Shows minutes, call outcomes, and lead performance in one place." }
];

const pricingPlans = [
  {
    name: "Starter",
    price: 1999,
    href: "/signup?plan=starter",
    description: "For early teams that want to stop missing calls fast.",
    features: ["200 minutes included", "Hindi + English support", "Lead capture", "WhatsApp alerts"]
  },
  {
    name: "Growth",
    price: 3999,
    href: "/signup?plan=growth",
    description: "For live businesses that need automation and deeper analytics.",
    features: ["500 minutes included", "Advanced analytics", "CRM sync", "Priority onboarding"],
    featured: true
  },
  {
    name: "Scale",
    price: 7999,
    href: "/signup?plan=scale",
    description: "For high-volume teams that need multi-number coverage.",
    features: ["1,500 minutes included", "Custom AI persona", "Priority support", "Dedicated setup"]
  }
];

export function Homepage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="bg-[var(--bg-base)]">
      <LiveDemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />

      <section className="relative overflow-hidden pt-16">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute left-1/2 top-20 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.1),transparent_68%)] blur-[72px]" />
        <div className="container relative z-[1] grid min-h-[calc(100vh-120px)] items-center gap-14 py-16 lg:grid-cols-[0.55fr_0.45fr]">
          <SectionReveal className="max-w-[680px]">
            <Badge className="gap-2 rounded-full border border-[rgba(192,132,252,0.22)] bg-[rgba(124,58,237,0.1)] px-4 py-2 text-[13px] text-[var(--text-primary)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--brand)]" />
              Now live for Indian businesses
            </Badge>
            <h1 className="mt-7 font-heading text-[clamp(46px,8vw,88px)] font-[800] leading-[0.92] tracking-[-0.06em] text-[var(--text-primary)]">
              Your AI that answers{" "}
              <span className="text-gradient">every call. Forever.</span>
            </h1>
            <p className="mt-6 max-w-[580px] text-[18px] font-light leading-[1.8] text-[var(--text-secondary)]">
              Bavio answers every business call, captures the lead, books the next step, and keeps your team updated on WhatsApp.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" type="button" onClick={() => setDemoOpen(true)}>
                <CirclePlay className="mr-2 h-4 w-4" />
                Hear a live demo
              </Button>
            </div>
          </SectionReveal>

          <SectionReveal>
            <Card className="overflow-hidden border-[var(--border-base)] p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(239,68,68,0.2)] bg-[rgba(239,68,68,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#fca5a5]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
                  Live
                </div>
                <span className="text-xs uppercase tracking-[0.14em] text-[var(--text-faint)]">00:47</span>
              </div>
              <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
                <div className="space-y-3">
                  {[
                    { speaker: "Caller", copy: "Hi, I need pricing details for my clinic.", bubble: "border-[var(--text-faint)] bg-[#130f22] text-[var(--text-primary)]" },
                    { speaker: "Bavio AI", copy: "Absolutely. Are you looking for appointment booking, reminders, or lead capture?", bubble: "border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.08)] text-[var(--light-accent)]" },
                    { speaker: "Caller", copy: "Mostly after-hours booking and WhatsApp follow-up.", bubble: "border-[var(--text-faint)] bg-[#130f22] text-[var(--text-primary)]" },
                    { speaker: "Bavio AI", copy: "Perfect. Growth plan fits best. I can also share the plan summary with your team on WhatsApp.", bubble: "border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.08)] text-[var(--light-accent)]" }
                  ].map((message) => (
                    <div key={message.copy} className={`rounded-[16px] border px-4 py-3 text-sm leading-7 ${message.bubble}`}>
                      <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">{message.speaker}</p>
                      {message.copy}
                    </div>
                  ))}
                </div>

                <div className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--light-accent)]">AI actions</p>
                  <div className="mt-5 space-y-3">
                    {[
                      { label: "Call answered", done: true },
                      { label: "Language detected", done: true },
                      { label: "Intent recognized", done: true },
                      { label: "Lead data captured", done: true },
                      { label: "WhatsApp follow-up queued", done: false }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-overlay)] px-4 py-3 text-sm">
                        <div className="flex items-center gap-3">
                          <span className={item.done ? "h-2.5 w-2.5 rounded-full bg-[var(--accent-green)]" : "h-2.5 w-2.5 rounded-full bg-[var(--text-faint)]"} />
                          <span className={item.done ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}>{item.label}</span>
                        </div>
                        <span className="text-[var(--text-faint)]">{item.done ? "Done" : "Pending"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>

      <section className="border-y border-[var(--border-base)] py-6">
        <div className="container grid gap-4 md:grid-cols-5">
          {stats.map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-heading text-[28px] font-[800] tracking-[-0.04em] text-white">{value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[var(--text-secondary)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Features</span>
            <h2 className="section-title">Everything your voice workflow needs to go live fast.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <SectionReveal key={feature.title} delay={index * 70}>
                <Card className="h-full p-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-[rgba(124,58,237,0.24)] bg-[rgba(124,58,237,0.2)] text-[var(--light-accent)]">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{feature.copy}</p>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="section-title">From signup to live in four simple steps.</h2>
          </SectionReveal>
          <div className="relative mt-12 grid gap-5 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-[var(--text-faint)] lg:block" />
            {[
              ["01", "Sign Up", "Create your workspace and choose the plan that fits your volume."],
              ["02", "Configure AI", "Set your business context, language, and first-response behavior."],
              ["03", "Get Your Number", "Connect your number and route inbound calls through Bavio."],
              ["04", "Go Live", "Start answering every call and capture every lead automatically."]
            ].map(([number, title, copy]) => (
              <Card key={title} className="relative z-[1] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--text-faint)] bg-[#130f22] font-heading text-sm font-bold text-[var(--light-accent)]">
                  {number}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Pricing</span>
            <h2 className="section-title">Simple plans for every stage of growth.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`relative p-7 ${plan.featured ? "border-[var(--brand)]" : ""}`}>
                {plan.featured ? (
                  <div className="absolute left-6 top-0 -translate-y-1/2 rounded-full bg-[var(--brand)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                    Most Popular
                  </div>
                ) : null}
                <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-secondary)]">{plan.name}</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-4xl font-heading font-[800] tracking-[-0.05em] text-white">₹{formatNumber(plan.price)}</span>
                  <span className="mb-1 text-sm text-[var(--text-secondary)]">/mo</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{plan.description}</p>
                <div className="mt-5 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                      <Check className="h-4 w-4 text-[var(--accent-green)]" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button asChild className="mt-7 w-full" variant={plan.featured ? "default" : "ghost"}>
                  <Link href={plan.href}>Get Started</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.16),transparent_65%)]" />
        <div className="container relative z-[1] text-center">
          <SectionReveal>
            <h2 className="font-heading text-[clamp(40px,6vw,72px)] font-[800] leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
              Ready to stop missing calls?
            </h2>
            <p className="mx-auto mt-5 max-w-[720px] text-lg leading-8 text-[var(--text-secondary)]">
              Bavio gives your business an AI front desk that stays on, sounds natural, and never drops a lead.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" type="button" onClick={() => setDemoOpen(true)}>
                Hear a live demo
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
