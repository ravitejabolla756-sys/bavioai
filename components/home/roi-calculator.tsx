"use client";

import { useMemo, useState } from "react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function ROICalculator() {
  const [calls, setCalls] = useState(2000);
  const [handleTime, setHandleTime] = useState(5);
  const [agentCost, setAgentCost] = useState(25000);

  const results = useMemo(() => {
    const agentsNeeded = Math.max(1, Math.ceil((calls * handleTime) / 9000));
    const monthlySpend = agentsNeeded * agentCost;
    const bavioCost = Math.max(4999, Math.round(calls * 1.8));
    const savings = Math.max(0, monthlySpend - bavioCost);
    return { monthlySpend, bavioCost, savings };
  }, [agentCost, calls, handleTime]);

  return (
    <section className="section-shell bg-[#0A0A0A]">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">ROI Calculator</div>
          <h2 className="section-title">Model the economics before you deploy</h2>
        </SectionReveal>
        <div className="mx-auto mt-10 max-w-[860px] rounded-[20px] border border-border bg-black p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-8">
              {[
                {
                  label: "Calls/month",
                  value: formatNumber(calls),
                  min: 100,
                  max: 10000,
                  step: 100,
                  state: calls,
                  setState: setCalls
                },
                {
                  label: "Avg call time in min",
                  value: String(handleTime),
                  min: 2,
                  max: 15,
                  step: 1,
                  state: handleTime,
                  setState: setHandleTime
                },
                {
                  label: "Agent cost/month ₹",
                  value: formatCurrency(agentCost),
                  min: 15000,
                  max: 50000,
                  step: 1000,
                  state: agentCost,
                  setState: setAgentCost
                }
              ].map((slider) => (
                <div key={slider.label}>
                  <div className="mb-3 flex items-center justify-between text-[13px] text-secondary">
                    <span>{slider.label}</span>
                    <span className="text-white">{slider.value}</span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={slider.state}
                    onChange={(event) => slider.setState(Number(event.target.value))}
                    className="h-1 w-full appearance-none rounded-full bg-[#1A1A1A] accent-primary"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="rounded-[16px] border border-[#3F0000] bg-[#1A0000] p-5">
                <p className="text-sm text-secondary">You&apos;re spending</p>
                <p className="mt-2 text-[32px] font-bold tracking-[-0.03em] text-red-400">{formatCurrency(results.monthlySpend)}/month</p>
              </div>
              <div className="rounded-[16px] border border-[#001A3F] bg-[#00001A] p-5">
                <p className="text-sm text-secondary">Bavio costs</p>
                <p className="mt-2 text-[32px] font-bold tracking-[-0.03em] text-blue-400">{formatCurrency(results.bavioCost)}/month</p>
              </div>
              <div className="rounded-[16px] border border-[#003F00] bg-[#001A00] p-5">
                <p className="text-sm text-secondary">You save</p>
                <p className="mt-2 text-[32px] font-bold tracking-[-0.03em] text-success">{formatCurrency(results.savings)}/month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
