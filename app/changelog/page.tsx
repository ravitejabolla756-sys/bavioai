import Link from "next/link";
import { Rss } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CHANGELOG_ENTRIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/shared/page-transition";

export const metadata = buildMetadata({
  title: "Changelog | Bavio AI — What We're Shipping",
  description:
    "A public record of every product improvement, platform upgrade, and new feature shipped across Bavio AI.",
  path: "/changelog"
});

const typeColors: Record<string, string> = {
  Feature: "text-[var(--brand)] border-[var(--border-brand)] bg-[var(--brand-glow-soft)]",
  Improvement: "text-blue-400 border-blue-400/30 bg-blue-400/08",
  Fix: "text-amber-400 border-amber-400/30 bg-amber-400/08"
};

export default function ChangelogPage() {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Changelog</p>
            <h1 className="page-hero-title">What we're shipping.</h1>
            <p className="page-hero-copy">
              A public record of every product improvement, platform upgrade, and new capability we ship. We release every week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/signup">Try what&apos;s new</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="#subscribe">
                  <Rss className="mr-2 h-4 w-4" />
                  Subscribe to updates
                </Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { label: "Feature", count: "6" },
                { label: "Improvement", count: "2" },
                { label: "Fix", count: "2" }
              ].map((item) => (
                <div key={item.label} className={`rounded-full border px-4 py-2 text-sm font-semibold ${typeColors[item.label]}`}>
                  {item.count} {item.label}{item.count !== "1" ? "s" : ""} this year
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Changelog timeline */}
      <section className="section-shell pt-0">
        <div className="container">
          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[var(--border-base)] lg:left-[calc(200px_+_20px)]" />

            <div className="space-y-8">
              {CHANGELOG_ENTRIES.map((entry, index) => (
                <SectionReveal key={entry.version}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
                    {/* Date / version */}
                    <div className="flex items-start gap-4 lg:w-[200px] lg:flex-shrink-0 lg:flex-col lg:gap-1 lg:pt-6">
                      <div className={`relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 ${index === 0 ? "border-[var(--brand)] bg-[var(--brand)]" : "border-[var(--border-base)] bg-[var(--bg-raised)]"}`}>
                        {index === 0 && <div className="h-2 w-2 rounded-full bg-black" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">{entry.version}</p>
                        <p className="text-xs text-[var(--text-muted)]">{entry.date}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 lg:pt-0">
                      <Card className="p-7">
                        <div className="flex flex-wrap items-start gap-3">
                          <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${typeColors[entry.type]}`}>
                            {entry.type}
                          </span>
                          <h2 className="flex-1 text-xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{entry.title}</h2>
                        </div>
                        <p className="mt-4 text-sm leading-8 text-[var(--text-secondary)]">{entry.description}</p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-[var(--border-base)] bg-[var(--bg-base)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe section */}
      <section className="section-shell pt-0" id="subscribe">
        <div className="container">
          <Card className="p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">Stay updated</p>
                <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Get notified when we ship.</h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">We email once a week with what shipped, what&apos;s coming, and what we learned.</p>
              </div>
              <form className="flex w-full max-w-sm gap-2" method="POST" action="/api/subscribe">
                <input type="email" name="email" placeholder="you@company.in"
                  className="h-11 flex-1 rounded-[8px] border border-[var(--border-base)] bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--brand)] focus:outline-none" />
                <button type="submit" className="h-11 rounded-[8px] bg-[var(--brand)] px-4 text-sm font-semibold text-black transition hover:bg-[var(--brand-hover)]">
                  Subscribe
                </button>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </PageTransition>
  );
}

