import { Activity, Globe2, Workflow } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Card } from "@/components/ui/card";
import { CAPABILITIES } from "@/lib/constants";

const icons = [Activity, Globe2, Workflow];

export function Capabilities() {
  return (
    <section className="section-shell bg-black">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">Platform</div>
          <h2 className="section-title">Voice infrastructure designed for realtime execution</h2>
          <p className="section-copy">
            Bavio combines low-latency speech, multilingual understanding, and workflow automation in a single dark,
            enterprise-grade surface.
          </p>
        </SectionReveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {CAPABILITIES.map((capability, index) => {
            const Icon = icons[index];
            return (
              <SectionReveal key={capability.title} delay={index * 100}>
                <Card className="h-full p-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-border bg-[#111111] text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-[18px] font-bold text-white">{capability.title}</h3>
                  <div className="mt-5 space-y-3">
                    {capability.points.map((point) => (
                      <div key={point} className="flex gap-3 text-[14px] leading-7 text-secondary">
                        <span className="mt-[11px] h-1 w-1 rounded-full bg-primary" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 rounded-[14px] border border-border bg-black p-4">
                    {index === 0 ? (
                      <div className="space-y-4">
                        {(capability.telemetry || []).map((item) => (
                          <div key={item.label}>
                            <div className="mb-2 flex items-center justify-between text-[12px] text-secondary">
                              <span>{item.label}</span>
                              <span className={item.label === "LLM" ? "text-primary" : "text-success"}>{item.value}</span>
                            </div>
                            <div className="h-2 rounded-full bg-[#111111]">
                              <div
                                className={`h-full rounded-full ${item.label === "LLM" ? "bg-primary" : "bg-success"}`}
                                style={{ width: item.label === "LLM" ? "76%" : "42%" }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {index === 1 ? (
                      <div className="flex flex-wrap gap-2">
                        {["Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "English"].map((item) => (
                          <div key={item} className="rounded-full border border-border px-3 py-1 text-[12px] text-secondary">
                            {item}
                          </div>
                        ))}
                        <div className="rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.08)] px-3 py-1 text-[12px] text-success">
                          Auto-detect
                        </div>
                      </div>
                    ) : null}
                    {index === 2 ? (
                      <div className="flex items-center justify-between gap-3">
                        {["Exotel", "WhatsApp", "CRM"].map((item, itemIndex) => (
                          <div key={item} className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] border border-border bg-[#111111] text-[12px] font-semibold text-white">
                              {item}
                            </div>
                            {itemIndex < 2 ? <span className="text-primary">→</span> : null}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Card>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
