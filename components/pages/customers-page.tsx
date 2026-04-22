import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CASE_STUDIES, TESTIMONIALS } from "@/lib/constants";

const verticalColors: Record<string, string> = {
  Healthcare: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
  "Real Estate": "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  EdTech: "from-purple-500/20 to-purple-500/5 border-purple-500/20"
};

export function CustomersPage() {
  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Customer stories</p>
            <h1 className="page-hero-title max-w-4xl">
              Businesses that chose Bavio{" "}
              <span className="text-gradient">never go back</span> to missed calls.
            </h1>
            <p className="page-hero-copy">
              Real results from real businesses across healthcare, real estate, EdTech, and more — built on the same platform you can start using today.
            </p>
          </SectionReveal>

          {/* Aggregate metrics */}
          <SectionReveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["2.4M+", "calls handled"],
                ["127K+", "leads captured"],
                ["98.7%", "first-call resolution"],
                ["₹23Cr+", "revenue recovered"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[20px] border border-[var(--border-base)] bg-[var(--bg-raised)] p-6 text-center">
                  <p className="text-3xl font-black tracking-[-0.04em] text-[var(--brand)]">{value}</p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-shell pt-0">
        <div className="container space-y-8">
          {CASE_STUDIES.map((cs, index) => (
            <SectionReveal key={cs.company}>
              <Card className={`overflow-hidden p-0 bg-gradient-to-br ${verticalColors[cs.vertical] ?? "from-[var(--brand-dim)] to-transparent"}`}>
                <div className={`grid gap-0 ${index % 2 === 0 ? "lg:grid-cols-[1fr_0.95fr]" : "lg:grid-cols-[0.95fr_1fr]"}`}>
                  {/* Left — main info */}
                  <div className="p-8 md:p-10">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,var(--brand),#A855F7)] text-lg font-black text-black">
                        {cs.logo}
                      </div>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">{cs.vertical}</p>
                        <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{cs.company}</h2>
                      </div>
                    </div>

                    <div className="mt-8 rounded-[18px] border border-[var(--border-brand)] bg-[var(--brand-glow-soft)] px-6 py-5">
                      <p className="text-3xl font-black tracking-[-0.04em] text-[var(--brand)]">{cs.result}</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">Primary outcome</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-center">
                        <p className="text-xl font-black text-[var(--text-primary)]">{cs.callsPerDay}</p>
                        <p className="text-xs text-[var(--text-muted)]">calls/day</p>
                      </div>
                      <div className="rounded-[14px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 py-3 text-center">
                        <p className="text-xl font-black text-[var(--text-primary)]">{cs.timeSaved}</p>
                        <p className="text-xs text-[var(--text-muted)]">time saved</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — quote */}
                  <div className="flex flex-col justify-center border-l border-[var(--border-base)] p-8 md:p-10">
                    <Quote className="h-8 w-8 text-[var(--brand)] opacity-50" />
                    <blockquote className="mt-4 text-lg leading-8 text-[var(--text-primary)] font-medium">
                      "{cs.quote}"
                    </blockquote>
                    <p className="mt-6 text-sm font-semibold text-[var(--brand)]">— {cs.responder}</p>
                    <Button asChild size="sm" className="mt-8 w-fit">
                      <Link href="/contact">
                        Get a similar result
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Testimonials strip */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">What they say</span>
            <h2 className="section-title">In their own words.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <SectionReveal key={t.name}>
                <Card className="h-full p-7">
                  <Quote className="h-6 w-6 text-[var(--brand)] opacity-40" />
                  <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--brand),#A855F7)] text-sm font-black text-black">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{t.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{t.role}, {t.company}</p>
                    </div>
                  </div>
                  {t.note && (
                    <span className="mt-4 inline-flex rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      {t.note}
                    </span>
                  )}
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(circle_at_center,rgba(123,47,190,0.14),transparent_68%)]" />
        <div className="container relative z-[1] text-center">
          <p className="eyebrow mx-auto">Join them</p>
          <h2 className="section-title mx-auto">
            Want to be our next success story?
          </h2>
          <p className="section-sub mx-auto mt-4">
            Start for free and see results in your first week. No credit card, no implementation fee.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/sign-up">Start free today</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/contact">Talk to our team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
