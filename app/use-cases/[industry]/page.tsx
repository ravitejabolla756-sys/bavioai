import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/shared/page-transition";
import { INDUSTRY_USE_CASES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

type Params = {
  params: { industry: string };
};

const industryAliases: Record<string, string> = {
  clinics: "healthcare"
};

export async function generateStaticParams() {
  return [...INDUSTRY_USE_CASES.map((item) => ({ industry: item.id })), { industry: "clinics" }];
}

export async function generateMetadata({ params }: Params) {
  const resolvedIndustry = industryAliases[params.industry] || params.industry;
  const item = INDUSTRY_USE_CASES.find((entry) => entry.id === resolvedIndustry);

  if (!item) return {};

  return buildMetadata({
    title: `${item.title} Use Case | Bavio AI`,
    description: item.summary,
    path: `/use-cases/${item.id}`
  });
}

export default function IndustryUseCasePage({ params }: Params) {
  const resolvedIndustry = industryAliases[params.industry] || params.industry;
  const item = INDUSTRY_USE_CASES.find((entry) => entry.id === resolvedIndustry);

  if (!item) notFound();

  return (
    <PageTransition>
      <section className="section-shell">
        <div className="container space-y-12">
          <div className="max-w-4xl">
            <p className="eyebrow">For {item.title}</p>
            <h1 className="text-[clamp(42px,6vw,72px)] font-black leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
              {item.title === "Real Estate" ? "Never lose a buyer lead again." : item.summary}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">{item.scenario[0]}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {item.metrics.map((metric) => (
              <Card key={metric} className="p-5">
                <p className="text-2xl font-black tracking-[-0.04em] text-[var(--brand)]">{metric.split(" ").slice(0, 2).join(" ")}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{metric}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <Card className="p-8">
              <p className="eyebrow">Live demo</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">What Bavio captures on every call</h2>
              <div className="mt-6 space-y-3">
                {[
                  "Buyer or caller name and contact",
                  "Budget range or urgency",
                  "Preferred location or category",
                  "Intent and follow-up timing",
                  "Availability for visit, booking, or callback"
                ].map((line) => (
                  <div key={line} className="rounded-[16px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                    {line}
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-base)] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Workflow</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                  {["Call received", "AI answers", "Language detected", "Intent qualified", "Data captured", "Lead saved", "WhatsApp alert"].map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="rounded-full border border-[var(--border-base)] bg-[var(--bg-overlay)] px-3 py-2">{step}</span>
                      {index < 6 ? <span className="text-[var(--brand)]">-&gt;</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">Transcript</p>
              <div className="mt-5 space-y-3">
                {item.transcript.map(([speaker, line], index) => (
                  <div key={`${speaker}-${line}`} className={`rounded-[16px] px-4 py-3 text-sm leading-7 ${index % 2 === 0 ? "border border-[var(--border-brand)] bg-[var(--brand-subtle)] text-[var(--text-primary)]" : "bg-[var(--bg-base)] text-[var(--text-secondary)]"}`}>
                    <p className="mb-1 text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">{speaker}</p>
                    {line}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <p className="eyebrow">Pricing callout</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
              For {item.title.toLowerCase()} teams starting at INR 1,999/month
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              Keep every inbound enquiry answered, qualified, and routed to the next human step.
            </p>
            <Button asChild className="mt-6">
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}
