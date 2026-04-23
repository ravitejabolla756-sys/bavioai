"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

export function PricingCards({
  yearly = false,
  compact = false
}: {
  yearly?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PRICING_TIERS.map((tier) => {
        const featured = tier.featured;
        const price = yearly ? tier.yearly : tier.monthly;
        const signupHref =
          tier.name === "Starter"
            ? "/signup?plan=starter"
            : tier.name === "Growth"
              ? "/signup?plan=growth"
              : "/signup?plan=scale";
        return (
          <div key={tier.slug} className="relative pt-5">
            {featured ? (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                Most Popular
              </div>
            ) : null}
            <div
              className={`h-full rounded-[16px] border p-8 ${
                featured
                  ? "border-[rgba(37,99,235,0.2)] bg-[linear-gradient(135deg,#0A0A0A,#0D1A2E)] shadow-[0_0_60px_rgba(37,99,235,0.15)]"
                  : "border-border bg-[#0A0A0A]"
              }`}
            >
              <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-secondary">{tier.name}</div>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-[56px] font-extrabold tracking-[-0.05em] text-white">{formatCurrency(price)}</span>
                <span className="pb-2 text-[18px] text-muted">/mo</span>
              </div>
              <p className="mt-3 text-[14px] text-muted">{tier.description}</p>
              <div className="my-6 h-px bg-border" />
              <div className="space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-[14px] leading-6 text-secondary">
                    <Check className="mt-1 h-4 w-4 text-success" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                variant={featured ? "default" : "ghost"}
                className="mt-8 w-full"
                size={compact ? "default" : "lg"}
                asChild
              >
                <Link href={signupHref}>
                  {tier.name === "Enterprise" ? "Talk to sales" : compact ? "Start free" : `Choose ${tier.name}`}
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
