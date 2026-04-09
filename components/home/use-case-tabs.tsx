"use client";

import Link from "next/link";
import { useState } from "react";

import { CallTranscript } from "@/components/shared/call-transcript";
import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { INDUSTRY_USE_CASES } from "@/lib/constants";

type UseCaseId = (typeof INDUSTRY_USE_CASES)[number]["id"];

export function UseCaseTabs() {
  const [active, setActive] = useState<UseCaseId>(INDUSTRY_USE_CASES[0].id);
  const item = INDUSTRY_USE_CASES.find((entry) => entry.id === active) || INDUSTRY_USE_CASES[0];

  return (
    <section className="section-shell bg-[#0A0A0A]">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">Use cases</div>
          <h2 className="section-title">High-conversion call flows for the teams that answer phones at scale</h2>
        </SectionReveal>
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {INDUSTRY_USE_CASES.map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => setActive(entry.id)}
              className={`shrink-0 rounded-full px-5 py-2 text-[14px] transition ${
                active === entry.id
                  ? "bg-primary text-white"
                  : "border border-border bg-[#0A0A0A] text-muted hover:text-white"
              }`}
            >
              {entry.title}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <SectionReveal key={`${item.id}-copy`}>
            <div className="h-full">
              <div className="eyebrow">{item.title}</div>
              <h3 className="text-[clamp(28px,4vw,48px)] font-bold tracking-[-0.03em] text-white">{item.summary}</h3>
              <div className="mt-5 space-y-4 text-[16px] leading-8 text-secondary">
                {item.scenario.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {item.metrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric}
                    className="rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] px-4 py-2 text-[13px] font-medium text-success"
                  >
                    {metric}
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8">
                <Link href={`/use-cases#${item.id}`}>Deploy for {item.title} -&gt;</Link>
              </Button>
            </div>
          </SectionReveal>
          <SectionReveal key={`${item.id}-transcript`}>
            <div className="surface p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">Live call transcript</p>
              <CallTranscript
                className="mt-5"
                lines={item.transcript.map(([speaker, line]) => `${speaker}: ${line}`)}
                alternating
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
