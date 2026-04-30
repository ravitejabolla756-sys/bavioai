"use client";

import Link from "next/link";
import { useState } from "react";

import { PricingCards } from "@/components/pricing/pricing-cards";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";

export function PricingPreview() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="section-shell bg-black">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">Pricing</div>
          <h2 className="section-title">Pricing that scales with your calls</h2>
          <p className="section-copy">Free to start, predictable to scale, and dramatically cheaper than manual telecalling.</p>
        </SectionReveal>
        <div className="mt-8 inline-flex rounded-[10px] border border-border bg-[#0A0A0A] p-1">
          <button
            type="button"
            onClick={() => setYearly(false)}
            className={`rounded-[8px] px-4 py-2 text-[14px] ${!yearly ? "bg-primary text-white" : "text-secondary"}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setYearly(true)}
            className={`rounded-[8px] px-4 py-2 text-[14px] ${yearly ? "bg-primary text-white" : "text-secondary"}`}
          >
            Yearly
          </button>
        </div>
        <div className="mt-10">
          <PricingCards yearly={yearly} compact />
        </div>
        <div className="mt-8 flex justify-end">
          <Button variant="ghost" asChild>
            <Link href="/pricing">See full pricing →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
