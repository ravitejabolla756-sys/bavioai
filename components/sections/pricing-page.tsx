"use client";

import Link from "next/link";
import { useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    monthly: 1999,
    yearly: 1599,
    minutes: "200 minutes",
    extra: "INR 5 per extra minute",
    cta: "Get Started",
    ghost: true,
    description: "For prototypes and small teams handling live inbound calls.",
    features: ["1 AI agent phone number", "Hindi + English + Hinglish", "WhatsApp lead alerts", "Call transcripts", "Basic analytics dashboard", "Email support"]
  },
  {
    name: "Growth",
    monthly: 3999,
    yearly: 3199,
    minutes: "500 minutes",
    extra: "INR 4 per extra minute",
    cta: "Start Free Trial",
    featured: true,
    description: "For production call flows that need sync, reporting, and more volume.",
    features: ["1 AI agent phone number", "Hindi + English + Hinglish", "WhatsApp lead alerts", "CRM + Google Sheets sync", "Full call transcripts", "Advanced analytics", "WhatsApp support"]
  },
  {
    name: "Scale",
    monthly: 7999,
    yearly: 6399,
    minutes: "1,500 minutes",
    extra: "INR 3 per extra minute",
    cta: "Contact Us",
    ghost: true,
    description: "For multi-number teams that need priority support and deeper customization.",
    features: ["3 AI agent phone numbers", "Custom AI persona and voice", "Priority onboarding call", "Full dashboard access", "CRM integration", "Dedicated WhatsApp support", "Custom prompt configuration"]
  }
];

const faqs = [
  ["What counts as a minute?", "A minute is billed based on total connected talk time for the call, rounded according to your plan policy."],
  ["What happens if I exceed my plan minutes?", "Your assistant keeps working and extra usage is billed at the overage rate shown on your plan."],
  ["Can I change my plan anytime?", "Yes. You can move between plans as your call volume changes."],
  ["Is there a free trial?", "Yes. You can start without a credit card and upgrade when you are ready to go live."],
  ["What payment methods are accepted?", "We support cards and local payment methods through our billing stack."],
  ["Do I need a registered company to sign up?", "No. Solo operators and early teams can start immediately."],
  ["Can I use my existing phone number?", "Yes. Existing number setups can be forwarded or integrated into your Bavio workflow."],
  ["Is my call data secure?", "Yes. Calls, transcripts, and account data are handled on the existing secured backend and infrastructure stack."]
];

const comparisonGroups = [
  {
    title: "Calling",
    rows: [
      ["Included minutes", "200", "500", "1,500"],
      ["Extra minute rate", "INR 5", "INR 4", "INR 3"],
      ["AI phone numbers", "1", "1", "3"],
      ["24/7 answering", "Yes", "Yes", "Yes"]
    ]
  },
  {
    title: "Automation",
    rows: [
      ["WhatsApp lead alerts", "Yes", "Yes", "Yes"],
      ["CRM sync", "No", "Yes", "Yes"],
      ["Custom AI prompt", "No", "No", "Yes"],
      ["Call transcripts", "Yes", "Yes", "Yes"]
    ]
  },
  {
    title: "Support",
    rows: [
      ["Email support", "Yes", "Yes", "Priority"],
      ["WhatsApp support", "No", "Yes", "Dedicated"],
      ["Onboarding call", "No", "No", "Yes"],
      ["Advanced analytics", "No", "Yes", "Yes"]
    ]
  }
];

export function PricingPageContent() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section-shell">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Pricing</span>
          <h1 className="section-title">Simple. Honest. No surprises.</h1>
          <p className="section-sub">Hybrid pricing with a flat monthly base and clear overage rates. Cancel anytime.</p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[var(--border-base)] bg-[var(--bg-raised)] p-1">
            <button type="button" onClick={() => setYearly(false)} className={`rounded-full px-4 py-2 text-sm font-medium ${!yearly ? "bg-[var(--brand)] text-black" : "text-[var(--text-secondary)]"}`}>
              Monthly
            </button>
            <button type="button" onClick={() => setYearly(true)} className={`rounded-full px-4 py-2 text-sm font-medium ${yearly ? "bg-[var(--brand)] text-black" : "text-[var(--text-secondary)]"}`}>
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative p-8 ${plan.featured ? "border-[var(--border-brand)] bg-[rgba(123,47,190,0.05)]" : ""}`}>
              {plan.featured ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--brand)] px-4 py-1 text-xs font-bold uppercase tracking-[0.12em] text-black">
                  Most Popular
                </div>
              ) : null}
              <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">{plan.name}</p>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-sm text-[var(--text-primary)]">INR</span>
                <span className="text-5xl font-black tracking-[-0.05em] text-[var(--text-primary)]">{formatNumber(yearly ? plan.yearly : plan.monthly)}</span>
                <span className="mb-1 text-sm text-[var(--text-muted)]">/mo</span>
              </div>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{plan.description}</p>
              <div className="mt-6 rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                {plan.minutes} included | {plan.extra}
              </div>
              <div className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--accent-green)]">+</span>
                    {feature}
                  </div>
                ))}
              </div>
              <Button asChild variant={plan.ghost ? "ghost" : "default"} className="mt-8 w-full">
                <Link
                  href={
                    plan.name === "Starter"
                      ? "/signup?plan=starter"
                      : plan.name === "Growth"
                        ? "/signup?plan=growth"
                        : "/signup?plan=scale"
                  }
                >
                  Get Started
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-10 rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-6">
          <p className="text-sm uppercase tracking-[0.16em] text-[var(--text-muted)]">Global pricing</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              "India - INR 1,999/mo",
              "USA - USD 29/mo",
              "UK - GBP 25/mo",
              "UAE - AED 89/mo",
              "Singapore - SGD 35/mo",
              "Australia - AUD 35/mo"
            ].map((item) => (
              <div key={item} className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[20px] border border-[var(--border-base)]">
          <div className="grid grid-cols-4 bg-[var(--bg-overlay)] px-6 py-4 text-sm font-semibold text-[var(--text-primary)]">
            <span>Feature</span>
            <span>Starter</span>
            <span>Growth</span>
            <span>Scale</span>
          </div>
          {comparisonGroups.map((group) => (
            <div key={group.title}>
              <div className="bg-[rgba(255,255,255,0.02)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">{group.title}</div>
              {group.rows.map(([feature, starter, growth, scale], index) => (
                <div key={feature} className={`grid grid-cols-4 px-6 py-4 text-sm ${index % 2 === 0 ? "bg-[var(--bg-raised)]" : "bg-[var(--bg-base)]"}`}>
                  <span className="text-[var(--text-primary)]">{feature}</span>
                  <span className="text-[var(--text-secondary)]">{starter}</span>
                  <span className="text-[var(--text-secondary)]">{growth}</span>
                  <span className="text-[var(--text-secondary)]">{scale}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">Questions teams ask before going live.</h2>
            <Accordion type="single" collapsible className="mt-8 space-y-3">
              {faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`item-${index}`}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <Card className="h-fit border-[var(--border-brand)] p-8">
            <p className="eyebrow">Need help choosing?</p>
            <h3 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">We'll recommend the right plan.</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Share your current call volume, industry, and workflow needs. We'll tell you whether Starter, Growth, or Scale is the right fit.
            </p>
            <div className="mt-6 space-y-3">
              <Button asChild className="w-full">
                <Link href="/contact">Book a call</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full">
                <Link href="/contact">Chat on WhatsApp</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
