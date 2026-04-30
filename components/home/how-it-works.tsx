import { Cable, BrainCircuit, Rocket } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { HOW_IT_WORKS } from "@/lib/constants";

const icons = [Cable, BrainCircuit, Rocket];

export function HowItWorks() {
  return (
    <section className="section-shell bg-black">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">How it works</div>
          <h2 className="section-title">Launch from number to live AI agent in minutes</h2>
        </SectionReveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = icons[index];
            return (
              <div key={step.step} className="contents">
                <SectionReveal delay={index * 120}>
                  <div className="relative h-full overflow-hidden rounded-[16px] border border-border bg-[#0A0A0A] p-8">
                    <div className="pointer-events-none absolute right-4 top-0 text-[80px] font-extrabold tracking-[-0.04em] text-[#FFB380]">
                      {step.step}
                    </div>
                    <div className="relative z-[1]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#4A4540] bg-[#111111] text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-6 text-[20px] font-bold text-white">{step.title}</h3>
                      <p className="mt-4 text-[14px] leading-7 text-secondary">{step.description}</p>
                      <div className="mt-8 rounded-[12px] border border-border bg-black p-4 text-[12px] text-muted">
                        {index === 0 && "Exotel Number • SIP Trunk • API"}
                        {index === 1 && "Scripts • FAQs • Workflows"}
                        {index === 2 && "Realtime Monitoring • Analytics"}
                      </div>
                    </div>
                  </div>
                </SectionReveal>
                {index < HOW_IT_WORKS.length - 1 ? <div className="dash-connector hidden self-center lg:block" /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
