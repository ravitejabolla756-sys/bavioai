import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CAREER_BENEFITS, OPEN_ROLES } from "@/lib/constants";

const departments = [
  { name: "Engineering", roles: ["Backend Engineer", "ML Engineer"] },
  { name: "Go-to-Market", roles: ["Sales — India"] },
  { name: "Always open", roles: ["Send your portfolio"] }
];

export function CareersPage() {
  return (
    <div className="bg-[var(--bg-base)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="absolute left-1/3 top-0 h-[420px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(123,47,190,0.12),transparent_65%)] blur-3xl" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)] px-4 py-2 text-sm font-semibold text-[var(--accent-green)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--accent-green)]" />
              3 open positions
            </div>
            <h1 className="page-hero-title mt-6 max-w-4xl">
              Build the future of{" "}
              <span className="text-gradient">business communication.</span>
            </h1>
            <p className="page-hero-copy">
              We are a small, high-conviction team solving a real problem for millions of Indian businesses. Fast iteration. Real equity. Work that ships every week.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="#open-roles">
                  See open roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="mailto:careers@bavio.in">Send cold email</Link>
              </Button>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Why Bavio */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Why Bavio</span>
            <h2 className="section-title">Work that means something.</h2>
            <p className="section-sub mx-auto">
              We move fast, ship constantly, and take every hire seriously. These are not just perks — they are how we operate every day.
            </p>
          </SectionReveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CAREER_BENEFITS.map((benefit) => (
              <SectionReveal key={benefit.title}>
                <Card className="h-full p-7 surface-hover">
                  <div className="text-4xl">{benefit.icon}</div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{benefit.description}</p>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture section */}
      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <Card className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <p className="eyebrow">Culture</p>
                  <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                    We say what we think. We ship what we plan.
                  </h2>
                  <div className="mt-6 space-y-4 text-sm leading-8 text-[var(--text-secondary)]">
                    <p>Bavio operates with radical transparency. If something isn't working, we say it immediately and fix it the same day. There's no hierarchy between good ideas.</p>
                    <p>We review every deployment together, celebrate wins openly, and treat every user complaint as a product priority. Small team, large responsibility, immense ownership.</p>
                    <p>If you're the kind of person who would rather build than talk about building, you'll feel at home here.</p>
                  </div>
                </div>
                <div className="border-l border-[var(--border-base)] p-8 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand)]">A typical week</p>
                  <div className="mt-5 space-y-4">
                    {[
                      ["Monday", "Team sync — priorities, blockers, decisions"],
                      ["Tue–Thu", "Build, ship, iterate. No unnecessary meetings."],
                      ["Friday", "Demo what shipped. Retro. Weekend energy begins."],
                      ["Always", "Async Slack. PRs reviewed same day. Real mentorship."]
                    ].map(([day, desc]) => (
                      <div key={day} className="flex gap-4">
                        <span className="w-20 flex-shrink-0 text-xs font-semibold text-[var(--brand)] pt-0.5">{day}</span>
                        <span className="text-sm text-[var(--text-secondary)]">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </SectionReveal>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section-shell pt-0" id="open-roles">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Open positions</span>
            <h2 className="section-title">Find your role.</h2>
          </SectionReveal>

          <div className="mt-14 space-y-5">
            {OPEN_ROLES.map((role) => (
              <SectionReveal key={role.title}>
                <Card className="p-0 overflow-hidden surface-hover">
                  <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-base)] text-xs font-black text-[var(--brand)]">
                        {role.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{role.title}</h3>
                        <p className="mt-1 text-sm text-[var(--text-muted)]">{role.location}</p>
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">{role.description}</p>
                      </div>
                    </div>
                    <Button asChild className="flex-shrink-0">
                      <Link href="/contact">
                        Apply
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="border-t border-[var(--border-base)] bg-[var(--bg-raised)] px-6 py-3">
                    <div className="flex flex-wrap gap-3 text-xs text-[var(--text-muted)]">
                      {["Competitive salary + equity", "Remote-friendly", "Health insurance", "₹60K learning budget"].map((perk) => (
                        <span key={perk} className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-green)]" />
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </SectionReveal>
            ))}
          </div>

          {/* No open role CTA */}
          <SectionReveal>
            <Card className="mt-8 p-8 text-center">
              <p className="text-2xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
                Don't see your role?
              </p>
              <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--text-secondary)]">
                We are always looking for exceptional engineers, product thinkers, and operators. Send us a note — if the fit is right, we'll create the role around you.
              </p>
              <Button asChild className="mt-6">
                <Link href="mailto:careers@bavio.in">
                  Send your portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
