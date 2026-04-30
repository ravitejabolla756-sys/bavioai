"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Linkedin } from "lucide-react";

import { SectionReveal } from "@/components/shared/section-reveal";
import { AwardsGrid, PressMentions } from "@/components/shared/trust-elements";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const founders = [
  {
    name: "Raviteja Bolla",
    role: "Co-Founder & CEO",
    description:
      "Built enterprise software at scale and now leads Bavio's product and market strategy for global voice AI deployments.",
    linkedin: "https://www.linkedin.com/in/ravitejabolla/",
    image: "/images/founder-raviteja.svg"
  },
  {
    name: "Praneeth",
    role: "Co-Founder & CTO",
    description:
      "Leads real-time systems, voice architecture, and production reliability across Bavio's core AI infrastructure.",
    linkedin: "https://www.linkedin.com/in/praneeth-bavio/",
    image: "/images/founder-praneeth.svg"
  }
];

const timeline = [
  { year: "2024", event: "Founded at SRM Trichy. First proof-of-concept shipped for real-estate call intake." },
  { year: "Q1 2025", event: "Native telephony integrations launched with first production deployments." },
  { year: "Q4 2025", event: "Bavio platform v1 launched with workflows, analytics, and multilingual support." },
  { year: "Q2 2026", event: "Launching globally - join the waitlist for enterprise rollout access." },
  { year: "Q3 2026", event: "Expansion across North America, UK, and APAC partner channels." }
];

const backedBy = ["Founder Operators Network", "AI Infrastructure Angels", "B2B SaaS Leaders Circle", "Early Design Partners"];

const values = [
  { title: "Clarity Over Complexity", copy: "We simplify high-stakes voice automation into reliable workflows teams can trust." },
  { title: "Customer Outcomes First", copy: "Every release is judged by measurable customer impact, not feature count." },
  { title: "Reliability by Design", copy: "Performance, observability, and fallback behavior are built in from day one." },
  { title: "Security as a Baseline", copy: "Enterprise readiness starts with governance, compliance, and controlled access." },
  { title: "Speed with Accountability", copy: "We ship quickly, validate in production, and own results with full transparency." },
  { title: "Global Standards, Local Insight", copy: "We build from deep regional context while meeting world-class platform expectations." }
];

export function CompanyPage() {
  return (
    <div className="bg-[var(--bg-base)]">
      <section className="page-hero">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <div className="container page-hero-inner">
          <SectionReveal>
            <p className="eyebrow">Company</p>
            <h1 className="page-hero-title max-w-4xl">From SRM Trichy to Solving Voice AI for the World.</h1>
            <p className="page-hero-copy max-w-3xl">
              Bavio is building enterprise-grade voice infrastructure for modern businesses that cannot afford missed calls.
            </p>
            <div className="mt-8 inline-flex rounded-full border border-[var(--border-brand)] bg-[var(--brand-dim)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--light-accent)]">
              Launching Q2 2026 - join the waitlist.
            </div>
          </SectionReveal>
        </div>
      </section>

      <AwardsGrid />

      <section className="section-shell pt-0">
        <div className="container grid gap-6 lg:grid-cols-2">
          {founders.map((founder) => (
            <Card key={founder.name} className="p-7">
              <div className="flex items-start gap-5">
                <Image src={founder.image} alt={founder.name} width={80} height={80} className="rounded-[14px] border border-[var(--border-base)]" />
                <div>
                  <h2 className="text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">{founder.name}</h2>
                  <p className="mt-1 text-sm text-[var(--brand)]">{founder.role}</p>
                  <Link href={founder.linkedin} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <Linkedin className="h-3 w-3" />
                    LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              <p className="mt-5 text-sm leading-8 text-[var(--text-secondary)]">{founder.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <PressMentions />

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Backed by</span>
            <h2 className="section-title">Supported by experienced operators and early enterprise partners.</h2>
          </SectionReveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {backedBy.map((item) => (
              <div key={item} className="rounded-[12px] border border-[var(--border-base)] bg-[var(--bg-raised)] px-4 py-3 text-center text-sm text-[var(--text-secondary)]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal>
            <p className="eyebrow">Story</p>
            <h2 className="section-title">Timeline</h2>
          </SectionReveal>
          <div className="mt-8 space-y-5">
            {timeline.map((item) => (
              <Card key={item.year} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">{item.year}</p>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.event}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <SectionReveal className="section-header text-center">
            <span className="eyebrow">Culture and Values</span>
            <h2 className="section-title">How we build.</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="p-6">
                <h3 className="text-2xl font-black tracking-[-0.03em] text-[var(--brand)]">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{value.copy}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container">
          <Card className="p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">Press</p>
                <h3 className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Media kit and company assets</h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  Access logos, founder bios, product screenshots, and approved brand resources for media coverage.
                </p>
              </div>
              <Button asChild size="lg">
                <Link href="/contact">
                  Download Media Kit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 bottom-0 h-[340px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.14),transparent_68%)]" />
        <div className="container relative z-[1]">
          <Card className="p-8 md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="eyebrow">We're hiring</p>
                <h3 className="text-4xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Join us and build the future of voice AI.</h3>
                <p className="mt-3 text-sm text-[var(--text-secondary)]">Open roles across product, engineering, and go-to-market teams.</p>
              </div>
              <Button asChild size="lg">
                <Link href="/careers">
                  View Open Roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
