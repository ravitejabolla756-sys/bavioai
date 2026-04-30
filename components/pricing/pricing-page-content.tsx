"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { FeatureTable } from "@/components/pricing/feature-table";
import { PricingFAQ } from "@/components/pricing/pricing-faq";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";

export function PricingPageContent() {
  const [yearly, setYearly] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  return (
    <div className="bg-black">
      <section className="section-shell pb-16">
        <div className="container text-center">
          <SectionReveal>
            <div className="eyebrow justify-center">Pricing</div>
            <h1 className="display-title mx-auto max-w-[900px]">Pricing that scales with your calls</h1>
            <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-8 text-secondary">
              Launch your first agent for free, then move to production concurrency, analytics, and governance when you
              need it.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="inline-flex rounded-[10px] border border-border bg-[#0A0A0A] p-1">
                <button
                  type="button"
                  onClick={() => setCurrency("INR")}
                  className={`rounded-[8px] px-4 py-2 text-[14px] font-medium ${currency === "INR" ? "bg-primary text-white" : "text-secondary"}`}
                >
                  INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`rounded-[8px] px-4 py-2 text-[14px] font-medium ${currency === "USD" ? "bg-primary text-white" : "text-secondary"}`}
                >
                  USD
                </button>
              </div>
              <div className="inline-flex rounded-[10px] border border-border bg-[#0A0A0A] p-1">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  className={`rounded-[8px] px-4 py-2 text-[14px] font-medium ${!yearly ? "bg-primary text-white" : "text-secondary"}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  className={`rounded-[8px] px-4 py-2 text-[14px] font-medium ${yearly ? "bg-primary text-white" : "text-secondary"}`}
                >
                  Yearly
                </button>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["99.9% uptime SLA", "SOC 2 Type II in progress", "No contracts", "Cancel anytime"].map((item) => (
                <span key={item} className="rounded-full border border-border bg-[#0A0A0A] px-3 py-1 text-xs text-secondary">
                  {item}
                </span>
              ))}
            </div>
          </SectionReveal>
          <div className="mt-12">
            <PricingCards yearly={yearly} currency={currency} />
          </div>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/contact">
                <MessageCircle className="mr-2 h-4 w-4" />
                Talk to Sales (Live Chat)
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <div className="eyebrow">Compare features</div>
            <h2 className="section-title">Everything included, clearly mapped</h2>
          </SectionReveal>
          <div className="mt-10">
            <FeatureTable />
          </div>
          <div className="mt-8 grid gap-4 rounded-[16px] border border-border bg-[#0A0A0A] p-6 text-left text-sm text-secondary md:grid-cols-2">
            <div>
              <p className="font-semibold text-white">Usage-based pricing details</p>
              <p className="mt-2">Professional overage: INR 2.25/min or USD 0.03/min</p>
              <p className="mt-1">Enterprise overage: INR 1.75/min or USD 0.02/min</p>
            </div>
            <div>
              <p className="font-semibold text-white">Large-scale custom contracts</p>
              <p className="mt-2">Committed volume discounts, dedicated infra, and custom SLAs are available on the Custom tier.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell pt-0">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionReveal>
              <div className="eyebrow">FAQ</div>
              <h2 className="section-title">Answers for evaluation, procurement, and launch</h2>
            </SectionReveal>
            <div className="mt-10">
              <PricingFAQ />
            </div>
          </div>
          <SectionReveal>
            <div className="rounded-[16px] border border-border bg-[#0A0A0A] p-8">
              <div className="eyebrow">Need guidance?</div>
              <h3 className="text-[32px] font-bold tracking-[-0.03em] text-white">Not sure which plan fits?</h3>
              <p className="mt-4 text-[15px] leading-8 text-secondary">
                Use the floating WhatsApp chat or book a sales walkthrough. We&apos;ll recommend a plan based on
                concurrency, languages, and integrations.
              </p>
              <div className="mt-6 rounded-[12px] border border-border bg-black p-5 text-sm text-muted">
                Professional is the default fit for teams launching live Exotel and WhatsApp workflows.
              </div>
              <Button asChild className="mt-6 w-full">
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
