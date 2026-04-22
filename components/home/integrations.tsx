import { CheckCircle2, PlugZap } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Card } from "@/components/ui/card";
import { INTEGRATIONS } from "@/lib/constants";

export function Integrations() {
  return (
    <section className="section-shell bg-black">
      <div className="container">
        <SectionReveal>
          <div className="eyebrow">Integrations</div>
          <h2 className="section-title">Plug into your existing stack</h2>
          <p className="section-copy">Telephony, CRM, scheduling, payments, and support workflows fit into one automation layer.</p>
        </SectionReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {INTEGRATIONS.slice(0, 12).map((integration, index) => (
            <SectionReveal key={integration} delay={index * 60}>
              <Card className="flex items-center justify-between px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#111111] text-white">
                    <PlugZap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-white">{integration}</p>
                    <div className="mt-1 inline-flex items-center gap-1 text-[12px] text-success">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Connected
                    </div>
                  </div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </Card>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
